import requests, re, os, urllib.parse

base = 'https://mahoganiutama.com'
output_dir = r'D:\code\mahagoni'

missing_urls = [
    '/wp-content/plugins/ooohboi-steroids-for-elementor/assets/css/swiper.min.css',
    '/wp-content/plugins/elementor/assets/js/shared-frontend-handlers.03caa53373b56d3bab67.bundle.min.js',
    '/wp-content/plugins/elementor/assets/js/text-editor.45609661e409413f1cef.bundle.min.js',
    '/wp-content/plugins/elementor/assets/js/section-frontend-handlers.d85ab872da118940910d.bundle.min.js',
    '/wp-content/plugins/elementor/assets/js/image-carousel.6167d20b95b33386757b.bundle.min.js',
    '/wp-includes/js/wp-emoji-release.min.js',
]

# Scan all js and css in output_dir for any bundle or asset references
for root, dirs, files in os.walk(output_dir):
    for f in files:
        if f.endswith('.js') or f.endswith('.css') or f.endswith('.html'):
            filepath = os.path.join(root, f)
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as fh:
                    content = fh.read()
                    matches = re.findall(r'([a-zA-Z0-9_\-\./]+(?:\.bundle\.min\.js|\.bundle\.js|\.chunk\.js|\.woff2|\.woff|\.ttf|\.webp|\.png|\.jpg|\.svg))', content)
                    for m in matches:
                        if m.startswith('http') and 'mahoganiutama.com' in m:
                            p = urllib.parse.urlparse(m).path
                            missing_urls.append(p)
                        elif m.startswith('/wp-content') or m.startswith('/wp-includes'):
                            missing_urls.append(m)
                        elif 'bundle.min.js' in m:
                            missing_urls.append(f'/wp-content/plugins/elementor/assets/js/{os.path.basename(m)}')
            except:
                pass

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
downloaded = 0
for u in set(missing_urls):
    if not u or '..' in u:
        continue
    rel = u.lstrip('/').replace('/', os.sep)
    local = os.path.join(output_dir, rel)
    if os.path.exists(local):
        continue
    full_url = urllib.parse.urljoin(base, u)
    try:
        r = requests.get(full_url, headers=headers, timeout=10)
        if r.status_code == 200:
            os.makedirs(os.path.dirname(local), exist_ok=True)
            with open(local, 'wb') as f:
                f.write(r.content)
            print(f'[FIXED] {u} ({len(r.content)} bytes)')
            downloaded += 1
    except Exception as e:
        pass

print(f'Done fixing missing chunks. Downloaded {downloaded} extra files.')
