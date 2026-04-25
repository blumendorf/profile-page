# Repository Overview

Personal profile site for **blumendorf.info**: a static **Vite + React + TypeScript** app, deployed to **GitHub Pages** (`pnpm deploy` / `gh-pages`).

## Tech stack (this repo)

| Area | Technology |
|------|------------|
| Build | Vite 7, pnpm |
| UI | React 19, TypeScript 5.9+ |
| Styling | Tailwind CSS v4, `cn()` for class merging |
| Routing | `react-router-dom` (`src/main.tsx`) |
| Motion | `motion` |
| Tests | Vitest, Testing Library, Playwright (`e2e/`) |

Exact versions: see [`package.json`](../../package.json).

## Source of truth for site copy

- **Edit:** [`src/lib/data/profile.json`](../../src/lib/data/profile.json) — canonical JSON consumed by the app.
- **Generated:** `public/api/v1/profile.json` — created by `pnpm sync:profile` (runs before `dev` and `build`). The JSON view and public URL mirror this file.

## Routes

Defined in [`src/main.tsx`](../../src/main.tsx):

| Path | Purpose |
|------|---------|
| `/` | Home (profile sections) |
| `/lab` | Lab index |
| `/lab/html`, `/lab/eval`, `/lab/compare` | Lab experiments |
| `/impressum` | Legal (Impressum) |

## Layout

Feature-based structure under `src/features/` (`home`, `lab`, `shared`), shared UI in `src/components/ui/`, utilities in `src/lib/`.

## Common commands

| Command | Use |
|---------|-----|
| `pnpm dev` | Dev server (syncs profile JSON first) |
| `pnpm build` | Production build |
| `pnpm lint` / `pnpm lint:fix` | Typecheck + ESLint |
| `pnpm lint:design` | Validate root `DESIGN.md` |
| `pnpm test` | Unit/component tests (Vitest) |
| `pnpm test:e2e` | Playwright E2E |
| `pnpm test:e2e:update-snapshots` | Update visual regression baselines |

## Base URL

Vite `base` is `/` in [`vite.config.ts`](../../vite.config.ts). GitHub Pages project sites may use a subpath; `import.meta.env.BASE_URL` is used for the router basename.
