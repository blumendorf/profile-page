# Testing

## Unit and component tests

- **Runner:** Vitest (`pnpm test`, `pnpm test:watch`, `pnpm test:coverage`).
- **Setup:** `src/test/setup.ts` and colocated `*.test.tsx` / `*.test.ts` as in the project.

Run **`pnpm test`** after logic or component changes that are covered by unit tests.

## E2E (Playwright)

- **Command:** `pnpm test:e2e` (or `pnpm test:e2e:ui` / `test:e2e:headed` for debugging).
- **Location:** `e2e/`

| File | Focus |
|------|--------|
| `e2e/homepage.spec.ts` | Homepage sections |
| `e2e/navigation.spec.ts` | Nav behavior |
| `e2e/json-view.spec.ts` | JSON view mode |
| `e2e/responsive.spec.ts` | Layout breakpoints |
| `e2e/accessibility.spec.ts` | A11y checks |
| `e2e/visual-regression.spec.ts` | Screenshots |

Run **`pnpm test:e2e`** when you change the homepage, navigation, JSON view, or global layout.

## Visual regression

- **Spec:** `e2e/visual-regression.spec.ts`.
- **Run after any visual change:** `pnpm test:e2e e2e/visual-regression.spec.ts --project=chromium`.
- Baselines live under `e2e/snapshots/visual-regression.spec.ts/`.
- If a visual regression test fails, compare the actual, expected, and diff artifacts. Fix unintended differences.
- After **intentional** visual changes, run `pnpm test:e2e:update-snapshots`, then review the updated snapshots before committing. Do not update snapshots just to make a failing visual test pass.

### Screenshot coverage

`e2e/visual-regression.spec.ts` currently covers only the homepage route (`/`). It does **not** cover `/lab`, lab experiment pages, JSON mode, or `/impressum`.

Homepage screenshots currently include:

- Full page: desktop, tablet, mobile.
- Hero section: desktop, mobile.
- About section: desktop, mobile.
- Expertise section: desktop, mobile.
- Tech Stack section: desktop, mobile.
- Contact section: desktop, mobile.
- Navigation: desktop bar, mobile closed, mobile open.
- Footer: desktop, mobile.

When changing a visual surface outside this coverage (for example `/lab`, `/lab/html`, `/lab/eval`, `/lab/compare`, JSON mode, or `/impressum`), add or extend visual screenshots for that route before relying on the visual suite to catch regressions.

## Before committing (recommended)

1. `pnpm test`
2. `pnpm test:e2e e2e/visual-regression.spec.ts --project=chromium` if you touched visual styling covered by screenshots
3. `pnpm test:e2e` if you touched home/nav/JSON/responsive/a11y/E2E-covered behavior
4. `pnpm lint` or `pnpm lint:fix`
