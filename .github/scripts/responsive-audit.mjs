import { chromium } from 'playwright';

const origin = 'https://ddos-spec.github.io/mahagoni/';
const routes = [
  'en/','en/about/','en/services/','en/services/oem-and-odm-product/','en/services/interior-contractor/','en/services/home-and-commercial/','en/clients/','en/blog/','en/contact-us/',
  'id/','id/about/','id/services/','id/services/oem-and-odm-product/','id/services/interior-contractor/','id/services/home-and-commercial/','id/clients/','id/blog/','id/contact-us/'
];
const viewports = [
  { name:'phone-360', width:360, height:800 },
  { name:'phone-390', width:390, height:844 },
  { name:'phone-430', width:430, height:932 },
  { name:'tablet-768', width:768, height:1024 },
];

const browser = await chromium.launch({ headless:true });
let failures = 0;
for (const viewport of viewports) {
  const context = await browser.newContext({ viewport, deviceScaleFactor:1, isMobile:viewport.width < 600, hasTouch:viewport.width < 600 });
  for (const route of routes) {
    const page = await context.newPage();
    const consoleErrors = [];
    page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
    let response;
    try {
      response = await page.goto(origin + route, { waitUntil:'networkidle', timeout:30000 });
      await page.waitForTimeout(350);
    } catch (error) {
      console.error(`FAIL ${viewport.name} ${route}: navigation error ${error.message}`);
      failures += 1;
      await page.close();
      continue;
    }
    const result = await page.evaluate(() => {
      const root = document.documentElement;
      const main = document.querySelector('main');
      const broken = [...document.images]
        .filter((img) => img.complete && img.naturalWidth === 0 && !img.classList.contains('image-failed'))
        .map((img) => img.getAttribute('src') || img.getAttribute('alt') || 'unknown image')
        .slice(0, 10);
      const visibleWide = [...document.querySelectorAll('main *')].filter((el) => {
        const style = getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
        const rect = el.getBoundingClientRect();
        return rect.width > innerWidth + 3;
      }).slice(0, 8).map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].join('.')}`);
      return {
        scrollWidth: root.scrollWidth,
        clientWidth: root.clientWidth,
        mainWidth: main?.getBoundingClientRect().width || 0,
        broken,
        visibleWide,
      };
    });
    const status = response?.status() || 0;
    const overflow = result.scrollWidth - result.clientWidth;
    const bad = status >= 400 || overflow > 3 || result.mainWidth > viewport.width + 3 || result.broken.length > 0 || result.visibleWide.length > 0;
    if (bad) {
      failures += 1;
      console.error(`FAIL ${viewport.name} ${route}`, { status, overflow, broken:result.broken, visibleWide:result.visibleWide, consoleErrors:consoleErrors.slice(0,4) });
    } else {
      console.log(`PASS ${viewport.name} ${route}`);
    }
    await page.close();
  }
  await context.close();
}
await browser.close();
if (failures) {
  console.error(`Responsive QA found ${failures} failing route/viewport combinations.`);
  process.exit(1);
}
console.log('Responsive QA passed all routes at 360, 390, 430, and 768 px.');
