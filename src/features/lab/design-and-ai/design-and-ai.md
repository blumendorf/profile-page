# Design-and-AI Lab Series

> Source of truth for the seven-part Lab research series at `/lab/design-and-ai`.

## Purpose

A long-form research series on what changes in UI/UX work when AI agents become first-class readers and writers of the same files humans produce. The experiment runs on this site itself.

The reader lands on Part 1 from the Lab index and reads the whole thing front to back via the prev/next navigation that wraps every part. No detour back to the Lab hub between parts.

## Series order

| # | Slug | Path | Title |
|---|------|------|-------|
| 1 | (root) | `/lab/design-and-ai` | UI/UX design in the age of AI-assisted engineering |
| 2 | `design-md` | `/lab/design-and-ai/design-md` | DESIGN.md: history and 2026 reframing |
| 3 | `storybook` | `/lab/design-and-ai/storybook` | Storybook as verification layer and agent registry |
| 4 | `components-and-tokens` | `/lab/design-and-ai/components-and-tokens` | Components and design tokens |
| 5 | `figma-jobs` | `/lab/design-and-ai/figma-jobs` | Removing Figma: the four jobs it was bundling |
| 6 | `tools` | `/lab/design-and-ai/tools` | Tools for AI-assisted UI work, surveyed |
| 7 | `workflow` | `/lab/design-and-ai/workflow` | The 2026 workflow |

The order is fixed in [parts/index.ts](./parts/index.ts). Reordering or inserting a part is a single edit there; routes, navigation, and the Part 1 inline TOC follow.

## Structure

```
src/features/lab/design-and-ai/
├── design-and-ai.md         # This file
├── SeriesPart/              # Reusable shell used by every part
├── SeriesNav/               # The prev/next pair (top strip and bottom cards)
├── parts/                   # Markdown source of truth
│   ├── 01-intro.md
│   ├── 02-design-md.md
│   ├── 03-storybook.md
│   ├── 04-components-and-tokens.md
│   ├── 05-figma-jobs.md
│   ├── 06-tools.md
│   ├── 07-workflow.md
│   └── index.ts             # Ordered manifest with raw imports
├── pages/                   # One thin wrapper per route
│   ├── IntroPage.tsx
│   ├── DesignMdPage.tsx
│   ├── StorybookPage.tsx
│   ├── ComponentsAndTokensPage.tsx
│   ├── FigmaJobsPage.tsx
│   ├── ToolsPage.tsx
│   └── WorkflowPage.tsx
└── index.ts                 # Public exports for src/main.tsx
```

## Editing copy

The markdown files in `parts/` are the source. The TSX never duplicates the prose. Edits to voice, structure, or content happen in markdown; the page re-renders.

`react-markdown` (with `remark-gfm`) renders the body. The map from markdown elements to Tailwind classes lives in [SeriesPart/SeriesPart.tsx](./SeriesPart/SeriesPart.tsx).

## Internal cross-links

The original notes were authored with relative links like `(../)`, `(../storybook/)`, `(../tools/)`. `SeriesPart` rewrites these against the manifest at render time so they resolve to `/lab/design-and-ai/<slug>`. Rendered as `react-router-dom` `<Link>` for in-app navigation.

## Adding a part

1. Add a new `NN-slug.md` file in `parts/`.
2. Append an entry to the array in `parts/index.ts` (slug, title, shortTitle, description, raw import).
3. Add a wrapper component under `pages/`.
4. Register the route in `src/main.tsx`.
5. Add the URL to `public/sitemap.xml`.
6. Update this document.

The series is intentionally append-only; reordering existing parts breaks shared URLs.
