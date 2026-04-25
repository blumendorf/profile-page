# Coding Conventions

## TypeScript

- Strict mode; avoid `any` — use explicit types for props and non-trivial values.
- Co-locate feature-specific types with that feature.

## React

- Function components; prefer **named exports** and arrow functions where the codebase already does.
- Destructure props in the signature.
- **Single responsibility** — one main concern per component.
- Three layers: **routes** (thin) → **feature components** → **`components/ui` primitives**.

## Project structure

- Organize by **feature** under `src/features/{home|lab|shared}/`.
- Feature folders: `components/`, `hooks/`, optional `types.ts` / `constants.ts`, `index.ts` for public exports.
- Shared primitives live in `src/components/ui/`.
- Utilities: `src/lib/utils/`; static data: `src/lib/data/`.

## Tailwind CSS v4

- Prefer theme tokens and utilities; avoid ad-hoc hex colors when a token exists.
- Use `cn()` from [`src/lib/utils/cn.ts`](../../src/lib/utils/cn.ts) for conditional classes.
- Reusable patterns: `@layer components` in CSS when it matches existing style.

## Accessibility

- Semantic regions (`<nav>`, `<main>`, `<section>`), labels on interactive controls, visible focus, keyboard use.
- Honor `prefers-reduced-motion` for motion-heavy UI (see design notes in [`../../DESIGN.md`](../../DESIGN.md)).

## Dark mode

- Tailwind `class` strategy; default toward system preference and persist as the app already does.

## Security

- Do not expose raw email in source if the project uses obfuscation; keep patterns consistent with [`../content/site.md`](../content/site.md) and profile data.

## Tests

- Add or update tests when behavior changes. See [`testing.md`](testing.md).
