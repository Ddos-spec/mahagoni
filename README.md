# Mahogani Utama Indonesia — Astro rebuild

A static Astro rebuild of Mahogani Utama Indonesia focused on premium editorial art direction, fast loading, responsive behavior, accessible interactions and a cleaner security surface than the legacy WordPress implementation.

## Routes mapped

- `/en/`
- `/en/about/`
- `/en/services/`
- `/en/services/oem-and-odm-product/`
- `/en/services/interior-contractor/`
- `/en/services/home-and-commercial/`
- `/en/clients/`
- `/en/blog/`
- `/en/contact-us/`
- `/klien/` → mirrors the client page

`/` redirects to the English homepage.

## Assets

The current implementation intentionally references Mahogani's existing WordPress media URLs. This keeps the visual content faithful to the current brand without bundling replacement imagery. For production migration, download those approved assets into `public/media/` and replace the remote URLs in `src/data/site.ts`.

## Security note

The rebuild does **not** copy legacy page markup or WordPress plugins/themes. Only approved business content and public media URLs are carried over. This is deliberate because the current public homepage has shown injected spam links in indexed markup; rebuilding as static Astro removes that WordPress execution surface.

## Development

```bash
npm install
npm run dev
npm run build
```

## Design direction

- Industrial/editorial layout, not card-heavy SaaS styling
- Oversized typography + structured grid
- Mahogani orange used only as a controlled accent
- Existing Mahogani photography and client marks
- Native interaction + IntersectionObserver; no animation framework dependency
- Responsive and reduced-motion aware
