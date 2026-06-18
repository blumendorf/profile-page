---
title: "Tools for AI-assisted UI work, surveyed"
date: 2026-04-27
section: lab
parent: ui-ux-design-ai-assisted-engineering
description: "Canvas-as-code (Paper, Pencil); codebase-integrated builders (v0, Lovable, Bolt, Claude Code, Cursor, Windsurf, Builder.io, Plasmic); standalone Figma replacements (Stitch, Figma Make, Claude Design, Magic Patterns, Uizard, Framer)."
---

# Tools for AI-assisted UI work, surveyed

*Part of [UI/UX design in the age of AI-assisted engineering](../).*

Galileo AI was the most-cited AI design tool of 2024. Google acquired it in mid-2025, relaunched it as [Stitch](https://stitch.withgoogle.com/) under Google Labs, and in April 2026 open-sourced its [DESIGN.md format](https://github.com/google-labs-code/design.md). The most-cited brand of two years ago no longer exists as a standalone product. That's a useful baseline rate of change for thinking about the rest of this survey. Anything here is a snapshot.

I'll group the tools into three categories. The categories matter more than the specific products, because the products churn faster than the categories do. The named categories: **standalone tools** that output design artifacts (clickable prototypes, wireframes, mockups); **codebase-integrated builders** that output code into a real repo; and **canvas-as-code tools**, the 2026 breakthrough category, that collapse the design surface and the codebase into a single artifact.

Most tool surveys treat all of these as competitors for a single workflow slot. They aren't. They are three different categories doing three different jobs, and the question is which slot each one is filling, not which one wins.

A note on what I've actually used. I've used [Claude Code](https://www.anthropic.com/claude-code) daily, [Cursor](https://cursor.com/) most days, [v0](https://v0.app/) weekly, [Stitch](https://stitch.withgoogle.com/) in three exploratory sessions, [Pencil](https://www.pencil.dev/) in two. The rest I've evaluated more briefly. I'll mark direct experience where it matters; otherwise treat the entries as informed but not load-bearing.

## Canvas-as-code: the 2026 breakthrough category

The category exists because two products shipped in Q1 2026 that genuinely close the loop between the design surface and the codebase. Both bet that the future is one artifact read by humans and agents at once. They differ on where that artifact lives.

### [Pencil](https://www.pencil.dev/) (pencil.dev)

A VS Code and Cursor extension (plus a macOS desktop app) that brings an infinite design canvas inside the IDE. Tagline: *"Design on canvas. Land in code."* Design files are `.pen` files: JSON-based, version-controllable, committed to the repo alongside source. The moment you draw something on the canvas, the corresponding HTML, CSS, or React code is real. There is no export step.

[Pencil's docs](https://docs.pencil.dev/) are explicit about parallel multi-screen generation: *"You can use multiple AI agents to work on different screens at once. Need a homepage, an about page, and a pricing page? Just tell your AI to generate all three in parallel."* This is the cleanest existing implementation of agentic parallelism for design that I've seen. MCP integration spans [Claude Code](https://www.anthropic.com/claude-code), [Claude Desktop](https://claude.ai/download), Cursor, [Windsurf](https://codeium.com/windsurf), [Codex CLI](https://github.com/openai/codex), [Antigravity](https://antigravity.google/), and [OpenCode CLI](https://opencode.ai/). Two-way: design-to-code generates components from canvas, code-to-design imports existing repo components onto the canvas.

The ["Code on Canvas"](https://docs.pencil.dev/core-concepts/code-on-canvas) feature is worth calling out. Script nodes on the canvas point at `.js` files and render their output as nested layers. Useful for parametric or data-driven layouts (charts, grids, pattern variations). Closer to [Plasmic's](https://www.plasmic.app/) "register your React components as building blocks" model than to Figma's static-component model.

What it's good at: collapsing the design tool and the IDE into a single environment for engineers who design. What it's not good at, yet: stakeholder review by people who don't have the IDE. The canvas-inside-IDE model means non-engineers need IDE access to participate, which is a real friction in mixed teams.

### [Paper](https://paper.design/) (paper.design)

A dedicated canvas app built on web standards. The canvas *is* HTML and CSS, so designs export as code without a translation layer. Positioned as *"the connected canvas for teams shipping with agents."* Paper Desktop entered open alpha on March 5, 2026.

The pitch is design-to-code-and-back as a continuous loop. Agents sync design tokens, styles, and components between the codebase and the canvas [via MCP](https://paper.design/docs/mcp). From their site: *"your agents can sync design tokens, styles, and components between your codebase and your canvas: one source of truth, always current."* Real-data integration is native; the canvas pulls content from CMS, databases, and any app via MCP, so designs use actual content rather than placeholders.

Customer logos on the site include [Vercel](https://vercel.com/), [Perplexity](https://www.perplexity.ai/), [Lovable](https://lovable.dev/), [PostHog](https://posthog.com/), [Tailwind](https://tailwindcss.com/), [Dub](https://dub.co/), [Replicate](https://replicate.com/), [Zed](https://zed.dev/), [Attio](https://attio.com/), [Quartr](https://quartr.com/), [Every](https://every.to/), and [Daylight](https://daylightcomputer.com/). That is a notable concentration of design-conscious engineering teams, which is the strongest social-proof signal in the category.

Paper's bet versus Pencil's: a dedicated canvas app, separated from the IDE, connected via MCP. Better for design-led teams who want a real canvas surface. Less seamless for engineers who'd prefer everything inside their editor.

Both products are young. Both are credible. The pick depends on where the team's design culture lives.

## Codebase-integrated builders

These produce code that goes into a real repo. Less ambitious than canvas-as-code but more mature, and the right answer for several specific jobs.

### [v0](https://v0.app/) by Vercel

Has shifted from a component generator into a full development environment as of February 2026. The Git panel creates a branch per chat, opens PRs against `main`, and deploys on merge. Sandboxed runtime, database connectors, agentic workflows. Strongest in the [React](https://react.dev/) and [Next.js](https://nextjs.org/) ecosystem; assumes [shadcn/ui](https://ui.shadcn.com/) and [Tailwind](https://tailwindcss.com/).

What v0 is best for: landing pages, dashboards, one-shot internal tools. What it isn't: a journey-design tool. A v0 prompt that says "build a five-screen onboarding flow" produces five separate screens that share tokens but don't share state coherently. The unit of work is the screen.

Pricing is token-based and unpredictable for large generations. Premium $20 a month is fine for individuals; team plans get expensive fast.

### [Lovable](https://lovable.dev/)

Generates full-stack TypeScript and React apps with Tailwind and [Supabase](https://supabase.com/). Visual Edits let you click any element to modify it. GitHub sync is bidirectional and automatic.

The stack is opinionated. React plus TypeScript plus Supabase is the path of least resistance; anything off-path is friction. For an existing [Firebase](https://firebase.google.com/) or [GCP](https://cloud.google.com/) codebase, Lovable is best treated as an exploration sandbox rather than a tool that writes into your production repo.

Reviewers consistently report Lovable as the cleanest UI output among full-stack AI builders. The growth signal is real: the tool went from launch to substantial ARR in months. Whether it scales to teams or stays a solo-builder tool is open.

### [Bolt.new](https://bolt.new/)

Runs a complete app in an in-browser [WebContainer](https://webcontainers.io/) (WASM Node.js). Most useful when you write an "app brief" rather than a "screen brief"; the unit of work is a whole app. This is the closest any tool comes to natively rewarding journey-level thinking, because it forces you to specify users, data model, auth story, and pages up front.

Codebase integration is looser than v0 or Lovable. Bolt exports to GitHub but doesn't import existing repos cleanly. Best as a parallel-prototype branch tool, not a "land code in our existing monorepo" tool.

The token-cost complaint is the canonical one. Once a project grows past 15–20 components, Bolt starts spending tokens at a rate that surprises people.

### [Claude Code](https://www.anthropic.com/claude-code)

Not a "design tool" in any conventional sense. Claude Code is a terminal-resident agent that reads your codebase, edits files, and runs commands. For the question "can this scaffold a five-screen onboarding flow into an existing Next.js repo?", it is the most reliable 2026 answer I've used.

Respects `CLAUDE.md` and the now-standard [`AGENTS.md`](https://agents.md/), which [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) generates automatically as of Next.js v16.2.0-canary.37. The [Anthropic Claude Agent SDK](https://docs.anthropic.com/en/api/agent-sdk/overview) lets you embed agents as callable components inside your own app. [Subagents](https://docs.claude.com/en/docs/claude-code/sub-agents) and [skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills) compose cleanly with [App Router](https://nextjs.org/docs/app), Firebase, [GraphQL](https://graphql.org/).

This is the tool I use as the **finalizer**. Even when Stitch or Claude Design has produced a flow shape, Claude Code is what lands the actual code in the repo with style and architecture consistent with what's already there. The pairing of "exploration tool plus Claude Code" is the workflow shape that shows up most consistently in serious 2026 setups.

### [Cursor](https://cursor.com/) and [Windsurf](https://codeium.com/windsurf)

AI-native IDEs, both [VS Code](https://code.visualstudio.com/) forks. Both will scaffold connected pages if you point them at a sufficiently rich [`cursorrules`](https://docs.cursor.com/context/rules) or `AGENTS.md`. Both have agent modes that handle multi-file edits across a project.

Cursor: largest user base, strongest autocomplete, [parallel Background Agents](https://docs.cursor.com/background-agent). Windsurf: [SWE-1.5](https://codeium.com/blog/swe-1-5) proprietary model that's fast at near-frontier quality, broader IDE plugin support, better compliance story for regulated environments.

Neither has a journey or prototype abstraction. The unit of work is a feature or a diff, not a user flow. Pair one with Claude Code (or use Claude Code through one of them; both support it) for the realistic stack: 80% autocomplete, 15% medium agent tasks, 5% complex multi-file work.

### [Builder.io](https://www.builder.io/)

The tightest design-to-code bridge in 2026 if a team is *not* abandoning [Figma](https://www.figma.com/) entirely. [Visual Copilot](https://www.builder.io/m/figma) converts Figma frames to React, [Vue](https://vuejs.org/), [Svelte](https://svelte.dev/), [Angular](https://angular.dev/), or [Qwik](https://qwik.dev/) in real time. The Visual Copilot CLI analyses your codebase and writes generated code into the right files, mapping generic primitives to your component library. Round-trip Figma to Builder is supported.

For teams committed to a code-only workflow, Builder.io is over-specified for product UI but useful as a layered visual editor for non-engineers (PMs, marketers) on top of real code.

### [Plasmic](https://www.plasmic.app/)

A visual builder for React (also Next.js, [Gatsby](https://www.gatsbyjs.com/), [Remix](https://remix.run/)) where designs become production code. You can register your own React components as building blocks. Native multi-page support and bidirectional code sync.

The 2026 question for Plasmic is whether a code-only team gets value from a non-AI visual editor when v0 and Lovable and Builder already generate code from prompts. Plasmic's AI features lag the headline AI builders. Strongest case is the marketing or content team needs to ship landing pages without dev cycles.

## Standalone Figma replacements

These output design artifacts (clickable prototypes, wireframes, mockups, journey maps) rather than committable code. As a category, more flow-aware than the codebase-integrated camp, but pays for it in production fidelity.

### [Google Stitch](https://stitch.withgoogle.com/) (formerly Galileo AI)

The acquisition note: Galileo AI was acquired by Google mid-2025 and relaunched as Stitch under [Google Labs](https://labs.google/). The Galileo brand effectively no longer exists as a standalone product.

Per the March 19, 2026 Stitch 2.0 release: up to **five interconnected screens** from a single prompt, all sharing the same design language, colour palette, typography, and component style. Infinite canvas, "Play" prototype mode for clickable navigation through generated screens, Voice Canvas for live voice-directed iteration, and the [DESIGN.md format](https://github.com/google-labs-code/design.md) that imports across projects.

Tech Insider's coverage gives the canonical example: *"A product manager can describe a checkout flow, and Stitch will produce the cart page, shipping form, payment screen, confirmation page, and order tracking view in a single operation."*

Stitch is the most directly relevant tool to "design a five-screen onboarding flow with success, partial-success, and error paths" prompts. Caveats: the output tends toward generic Material-leaning aesthetics without DESIGN.md tuning; the five-screen cap is real; Google Labs durability is a question (no SLA, could disappear).

Free during the Google Labs phase. There is no paid tier yet, which is the single biggest risk for adopting it as core infrastructure.

### [Figma Make](https://www.figma.com/make/)

Figma's response to Stitch and Claude Design. Positioned explicitly as an AI multi-step prototype generator: *"Describe each step, branch, and state. Make generates screens, navigation, and transitions for complex flows automatically."* Native journey, branch, and state framing.

[Make kits](https://www.figma.com/blog/introducing-make-kits/) (April 2, 2026) bring real components, data, and constraints into Make as starting context, meaning your existing Figma component library can prime the generation. Output is a responsive, interactive prototype within Figma. Code export exists but isn't where Figma's incentives point.

The cleanest 2026 way to do journey-level prompting *if* the team isn't actually leaving Figma. For a code-only workflow, it's the wrong end of the pipeline.

### [Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs)

[Anthropic Labs](https://www.anthropic.com/labs), launched April 17, 2026. Powered by Claude Opus 4.7. Generates interactive prototypes, slides, one-pagers, mockups.

The differentiator is the codebase-aware onboarding. From [Anthropic's launch post](https://www.anthropic.com/news/claude-design-anthropic-labs): *"During onboarding, Claude builds a design system for your team by reading your codebase and design files. Every project after that uses your colors, typography, and components automatically."* This is the most explicit "AI agent that reads your existing codebase plus design files and generates matching screens" implementation I've seen.

[Brilliant](https://brilliant.org/) (the education company) reported in Anthropic's launch post: *"Our most complex pages, which took 20+ prompts to recreate in other tools, only required 2 prompts in Claude Design."* That number is marketing copy and probably cherry-picked, but the architectural bet (read the codebase, derive the system, generate against it) is the right bet.

Designs package as a "handoff bundle" structured for [Claude Code](https://www.anthropic.com/claude-code) with one instruction. Pricing: included with [Claude Pro](https://www.anthropic.com/pricing) at $20 a month. Strong candidate for the exploration-to-production pipeline once it stabilises.

### [Magic Patterns](https://www.magicpatterns.com/)

Production-ready React components and prototypes. The differentiator: prototypes that follow your existing code design system rather than producing a random React layout. MCP integration. Figma round-trip.

Closer to Builder.io's design-system-aware story than to Uizard or Stitch, and price-competitive at $15 a month for the Hobby tier. Worth a serious trial alongside v0 and Builder for the "matches our component library" requirement.

### Uizard, Visily, Framer, Relume

The second tier of standalone tools, each with a specific niche.

**[Uizard Autodesigner 2.0](https://uizard.io/autodesigner/)** generates 5–7 screen prototypes with mapped navigation links. Predates Stitch's 2026 capabilities and is now arguably surpassed. Useful for non-designer collaborators (PMs, founders) who want to prototype journeys without learning Figma.

**[Visily](https://www.visily.ai/)** is text-to-design with multi-screen wireframe support, cheapest in the category at $14 a month. Wireframes-grade output; solid for early ideation by non-designers, not a serious contender for production-quality screens.

**[Framer AI](https://www.framer.com/ai)** with [Wireframer](https://www.framer.com/wireframer/) and Workshop is the right tool if "Figma replacement" actually means "marketing-site replacement." Framer is opinionated toward marketing sites and portfolios. Wrong tool for application UI flows.

**[Relume](https://www.relume.io/)** is sitemap-to-wireframe AI focused on marketing sites. Generates full sitemap structures, page wireframes, and high-fidelity layouts; exports to Figma or [Webflow](https://webflow.com/). Strongest IA and structure tool of the bunch; not a journey or app-flow tool.

## What I'm using right now

For this site, the stack is Claude Code as the finaliser, Cursor as the editor I live in, occasional v0 prompts when I want to start from a working component rather than a blank file, and Pencil for the small amount of canvas work I still do. No Figma. No Stitch yet, though I expect to add it the next time I design a multi-screen flow.

For client and platform work that's bigger than this site, the stack is the same with two additions: Claude Design for the codebase-aware exploration step, and Builder.io for any case where a non-engineer needs to participate in the design surface (mostly marketing teams).

I expect this list to be different by Q3 2026. The category churn rate suggests at least one of these tools will pivot, get acquired, or be surpassed in the next two quarters. The categories will hold; the specific names may not.

## Open

The intersection I most want to see closed: a tool that does multi-screen flow generation *and* reads your real component library *and* lands in your repo, all in one pass. Pencil and Paper come closest by collapsing the canvas and the codebase into one artifact. Claude Design comes closest from the other direction by reading the codebase to derive a design system. Stitch with DESIGN.md plus Claude Code as the finaliser comes closest as a two-tool pipeline. None of these is yet the single tool that does the whole loop without a handoff.

The other open question is whether one of the canvas-as-code tools (Paper or Pencil) becomes the dominant new design surface, or whether the IDE absorbs that role entirely. Pencil's bet is the latter. Paper's bet is the former. Both bets can be right for different teams. The unstable middle, separate canvas and separate IDE that don't share state, is the place that hollows out.

I'll re-survey in six months.
