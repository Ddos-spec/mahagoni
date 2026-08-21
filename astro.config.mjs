import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ddos-spec.github.io',
  base: '/mahagoni',
  output: 'static',
  trailingSlash: 'always',
  prefetch: false
});
