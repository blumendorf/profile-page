# Content & SEO Workflow

## Profile data

1. **Edit** [`src/lib/data/profile.json`](../../src/lib/data/profile.json) for any user-visible copy that comes from structured data.
2. Run **`pnpm sync:profile`** (or `pnpm dev` / `pnpm build`, which run it) so [`public/api/v1/profile.json`](../../public/api/v1/profile.json) matches for the static site and JSON view.
3. If you change text inside components without going through JSON, either move the text into `profile.json` or keep sources aligned — the project convention is to keep **JSON and UI in sync**.

## Agent-facing copy & voice

- **Voice, SEO meta, legal notes:** [`site.md`](site.md)
- **Visual/design intent:** [`../../DESIGN.md`](../../DESIGN.md)

## LLM & crawler files

Keep these aligned when routes or public-facing content change:

- [`public/llms.txt`](../../public/llms.txt) — sitemap-style summary
- [`public/llms-full.txt`](../../public/llms-full.txt) — fuller markdown for crawlers
- [`index.html`](../../index.html) — meta tags, Open Graph, **JSON-LD** (name, title, org, description)

**Triggers:**

- Section structure / URLs change → `llms.txt` (and often `llms-full.txt`).
- Substantive text changes → `llms-full.txt` (+ JSON-LD if title/role/org/description change).

## Sitemap

- [`public/sitemap.xml`](../../public/sitemap.xml) — update URLs and `<lastmod>` when routes or meaningfully important pages change.
- Every route in `src/main.tsx` should be represented.

## Lab feature

- Code under `src/features/lab/`.
- Document lab behavior in [`src/features/lab/lab.md`](../../src/features/lab/lab.md) when you change lab features.

## Impressum / legal

- Impressum route: `/impressum` (see `site.md` and components under `src/features/home/`).
- Update legal text in the component and in `site.md` when required.

## Humans

- Optional: [`public/humans.txt`](../../public/humans.txt) if you maintain it for the site.
