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

- **All agent-facing docs live in [`agent-context/`](agent-context/).** Iterate on the existing files; only add a new doc when the task explicitly requires it. Do not duplicate guidance into other tooling folders.
- **No `.cursor/` directory.** Cursor rules and similar config should not live in this repo — guidance belongs in `agent-context/` (and is discoverable via this `AGENTS.md`).
- **`.claude/` stays minimal:** [`settings.json`](.claude/settings.json) for Claude Code permissions and a single [`skills`](.claude/skills) symlink pointing at [`.agents/skills/`](.agents/skills). Do not duplicate skill contents or add per-skill symlinks.
- **Project skills:** author shared skills in `.agents/skills/<skill-name>/SKILL.md`. They are exposed to Claude (and Cursor, which reads the Claude skill path in this repo) through the single `.claude/skills` symlink above.
- **Root [`CLAUDE.md`](CLAUDE.md):** short pointer to this file.
