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

- Baselines under `e2e/snapshots/visual-regression.spec.ts/`.
- After **intentional** visual changes: `pnpm test:e2e:update-snapshots`, then review diffs before committing.

## Before committing (recommended)

1. `pnpm test`
2. `pnpm test:e2e` if you touched home/nav/JSON/responsive/a11y/visual surfaces
3. `pnpm lint` or `pnpm lint:fix`
