# Claude Code Rules & Conventions

**CRITICAL: These rules must be kept in sync with `.cursor/rules/` at all times.**

When updating this file, you MUST also update:
- `.cursor/rules/agent-context.mdc`
- `.cursor/rules/conventions.mdc`

When updating files in `.cursor/rules/`, you MUST also update this file.

---

## Agent Context & Source of Truth

The `agent-context/` directory contains the source of truth for this project's content, design, and background.

- `agent-context/content.md`: Contains the exact text content for the website.
- `agent-context/design.md`: Contains the design philosophy, UX goals, visual identity, and specifications.
- `agent-context/background/`: Contains background information (interview questions, overview, tech stack details).

### Rules

1. **Read First**: Before starting any significant task, check `agent-context/content.md` and `agent-context/design.md` to ensure alignment with the established source of truth.
2. **Sync Content**: If you modify text in the codebase (`src/`), you MUST update `agent-context/content.md` to match, or verify it already matches. The markdown file is the master copy.
3. **Sync Design**: If you change design tokens, layout, or visual patterns in `src/`, update `agent-context/design.md` to reflect these changes.
4. **Consult Background**: When making decisions about tone, voice, or technical strategy, refer to `agent-context/background/` for context on the user's preferences and history.
5. **Update Timestamp**: When updating `agent-context/content.md`, update the "Last synced" date and the Change Log at the bottom.

### Workflow

- **When implementing content:** Copy from `content.md` -> `src/`.
- **When refining content:** Update `content.md` -> Then update `src/`.
- **When changing design:** Update `design.md` -> Then implement in `src/`.

### Important

- If you are updating the content, you MUST update the `content.md` file to keep it in sync.
- If you are modifying `src/pages/lab/**`, you MUST update `src/pages/lab/lab.md` to reflect the changes.

---

## Core Technology Stack

### Framework & Runtime
- **Build Tool**: Vite 6
- **React**: React 19
- **Language**: TypeScript 5.7+
- **Package Manager**: pnpm

### Styling
- **CSS Framework**: Tailwind v4
- **Component Library**: shadcn/ui
- **Icons**: Lucide React

### Animation
- **Primary**: Motion library
- **Simple effects**: CSS transitions

### Testing
- **Unit/Integration**: Vitest 3
- **Component Testing**: Testing Library (React)

### Deployment
- **Platform**: GitHub Pages (static export)

---

## Project Structure

### Folder Organization
Organize code by **features**, not by type. Each feature is self-contained with its own components, hooks, types, and utilities.

```
src/
├── components/ui/    # Shared UI primitives (Button, Card, etc.)
├── features/         # Feature-based modules
│   ├── home/         # Landing page feature
│   ├── lab/          # Lab experiments feature
│   └── shared/       # Cross-feature shared code
├── lib/              # Non-UI utilities & integrations
└── test/             # Test setup
```

### Feature Folder Structure
Each feature should contain only what it needs:

```
features/{feature-name}/
├── components/       # Feature-specific components
├── hooks/            # Feature-specific hooks
├── types.ts          # Feature types (if needed)
├── constants.ts      # Feature constants (if needed)
└── index.ts          # Public exports
```

### Component Hierarchy
Follow a 3-tier component architecture:

1. **Page Components** — Route entry points, minimal logic
2. **Feature Components** — Domain logic, compose UI components
3. **UI Components** — Reusable primitives in `components/ui/`

### Where Things Go

| Type | Location |
|------|----------|
| UI primitives (Button, Card) | `components/ui/` |
| Feature components | `features/{name}/components/` |
| Feature hooks | `features/{name}/hooks/` |
| Shared hooks/contexts | `features/shared/` |
| Utilities (cn, formatters) | `lib/utils/` |
| Static data | `lib/data/` |
| 3rd party integrations | `lib/{service}/` |

---

## Coding Conventions

### TypeScript
- Strict mode enabled
- Explicit types for props and complex objects
- Never use `any`
- Co-locate types with their feature

### React Components
- Function components with arrow syntax
- Named exports preferred
- Destructure props in function signature
- **Single responsibility**: each component renders one thing

### Tailwind CSS v4
- Use `@theme` in CSS for design tokens
- Prefer utilities over custom CSS
- Use `@layer components` for reusable patterns
- Always use `cn()` for conditional classes
- No hardcoded colors - use Tailwind theme tokens

### Accessibility
- Semantic HTML (`<nav>`, `<main>`, `<section>`)
- ARIA labels on interactive elements
- Visible focus states
- Keyboard accessible

### Dark Mode
- Tailwind `class` strategy
- Default to system preference
- Persist in localStorage

---

## Workflow

### Before Committing
1. Update docs in `/agent-context` when modifying content/design
2. Update `/src/features/lab/lab.md` when modifying lab features
3. Run `pnpm test`
4. Run `pnpm lint --fix` and fix remaining issues

### Code Organization Principles
- **Colocate related code** — Keep components, hooks, types together
- **Single responsibility** — Each file does one thing well
- **Explicit exports** — Use `index.ts` barrel files for public APIs
- **Keep it simple** — Don't over-abstract; refactor when needed

---

## Security

- Obfuscate email addresses in public-facing code

---

## AI Agent Synchronization Rules

**CRITICAL REQUIREMENT**: Any AI agent (Claude, Cursor, or other) working on this project MUST:

1. **Always read these rules** before starting any significant task
2. **Keep rules synchronized** across all locations:
   - `.claude/claude.md` (this file)
   - `.cursor/rules/agent-context.mdc`
   - `.cursor/rules/conventions.mdc`
3. **When updating rules**:
   - Update ALL rule files simultaneously
   - Ensure content consistency across all files
   - Preserve the specific formatting requirements of each file (frontmatter, MDC syntax, etc.)
4. **Before committing changes** that involve rules:
   - Verify all rule files are in sync
   - Include all updated rule files in the commit

### Rationale
Different AI agents may read from different rule files:
- Claude Code reads from `.claude/claude.md`
- Cursor IDE reads from `.cursor/rules/*.mdc`

Keeping these synchronized ensures consistent behavior across all AI tools working on this project.

---

**Last Updated**: 2026-01-01
**Version**: 1.0.0
