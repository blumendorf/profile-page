# Agent Instructions

**blumendorf.info profile page** — Vite, React 19, TypeScript, Tailwind v4, static deploy to GitHub Pages.

Use this file as the **root entrypoint**. Keep context lean: open only the `agent-context` docs that match the task.

## Context map

| Document | When to read |
|----------|----------------|
| [agent-context/coding/repository.md](agent-context/coding/repository.md) | Repo stack, routes, data flow, commands |
| [agent-context/coding/conventions.md](agent-context/coding/conventions.md) | TypeScript, React, Tailwind, structure, a11y |
| [agent-context/coding/testing.md](agent-context/coding/testing.md) | Vitest, Playwright, visual regression |
| [agent-context/content/workflow.md](agent-context/content/workflow.md) | Profile JSON, SEO, sitemap, lab docs, Impressum |
| [agent-context/content/site.md](agent-context/content/site.md) | Voice, meta/SEO notes, legal context, section guidelines |
| [DESIGN.md](DESIGN.md) | Design system, tokens, motion, section UX specs |
| [agent-context/content/background/overview.md](agent-context/content/background/overview.md) | Biography and tone research (content accuracy) |
| [agent-context/content/background/tech-stack.md](agent-context/content/background/tech-stack.md) | **Background only** — professional stack context; not the profile-site dependency list |

## Quick facts

- **Structured site copy (edit):** `src/lib/data/profile.json` → sync to `public/api/v1/profile.json` via `pnpm sync:profile` (also run by `pnpm dev` / `pnpm build`).
- **Routes:** `src/main.tsx` — keep `public/sitemap.xml` in sync when routes change.

## Optional tooling

- Claude Code may use [`.claude/settings.json`](.claude/settings.json) for permissions only — not a second copy of these conventions.
- **Project skills:** author shared skills in `.agents/skills/<skill-name>/SKILL.md`, then expose them via a symlink at `.claude/skills/<skill-name>`. Cursor reads the Claude skill path in this repo; do not create `.cursor/skills` or duplicate skill contents.
- **Root [`CLAUDE.md`](CLAUDE.md):** short pointer to this file.
