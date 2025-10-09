# Printer.tools AI Guide

## Project Snapshot
- Astro 5 + React islands + Tailwind CSS 4; Node adapter builds a standalone server (see `astro.config.mjs`).
- Core dataset lives in `src/data/resources.js`; each entry needs unique `id` and `slug`, pricing string, platform list, `tags`, optional `madeByMe` flag.
- Matching long-form copy sits in `src/content/**` markdown. `src/pages/tools/[slug].astro` glob-matches by slug fragment, so keep filenames aligned (e.g. `src/content/slicers/cura.md`).
- Global layout/SEO handled in `src/layouts/Layout.astro` via `astro-seo`; it injects structured data, Umami analytics, and Google Ads—preserve these when editing head markup.

## Interactive Islands Pattern
- `src/pages/index.astro` ships `ResourceList` with `client:visible`; keep props serializable (arrays/strings/booleans) to avoid hydration issues.
- `ResourceList.jsx` drives filtering, search, and favorites. Favorites persist in `localStorage` under `printerToolsFavorites`; changing key names breaks Quick Access.
- `FavoriteButton.jsx` (client:load) mirrors the same storage key and auto-clicks the `LikeButton` via `[data-like-button][data-resource-id]`. If you change the like button signature, update this DOM hook.
- `LikeButton.jsx` and `LikeCount.jsx` call `/api/likes/:slug`; when API is unreachable they gracefully fall back to `localStorage`. Maintain the optimistic update + confetti UX when refactoring.

## Likes API + Data Persistence
- API routes live in `src/pages/api/likes/*`. `[slug].js` reads/writes `data/likes.json`; ensure the process runs where the filesystem is writable (adapter is Node, not static).
- POST expects `{ action: "like" | "unlike", resourceName }`. Always send the slug as the path param and keep the JSON shape; analytics in `likes.json` rely on `name` and `lastUpdated` fields.
- `deploy.sh` runs `yarn build` then `rsync`'s `dist/` to the Hetzner box (`hcloud server ip websites`). Keep that script bash-compatible if adjusting.

## Styling + Utilities
- Tailwind 4 is imported via `src/styles/global.css` using `@import "tailwindcss"` and `@tailwindcss/vite`; prefer utility classes and the `cn` helper in `src/lib/utils.ts` for conditional styling.
- Background texture (`.body-bg`) comes from `/public/img/tiled-bg.png`; keep asset paths stable when swapping graphics.
- Prefer the path alias `@/` (see `tsconfig.json`) for new imports instead of long relative paths.

## Working Notes
- Use Yarn v1 (`yarn install`, `yarn dev`, `yarn build`, `yarn preview`); Node 22+ is required (declared in `package.json`).
- `PopularTools` is imported in `src/pages/index.astro` but no component exists—either implement it or remove the import before shipping changes.
- `_old/` contains the legacy 11ty site; leave untouched unless intentionally porting content.
- Generated output lives in `dist/`; ignore it during edits/tests.
