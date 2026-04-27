---
title: "Components and design tokens"
date: 2026-04-27
section: lab
parent: ui-ux-design-ai-assisted-engineering
description: "Token hierarchy, why 'the component is the spec,' how this layer reads to humans and agents differently."
---

# Components and design tokens

*Part of [UI/UX design in the age of AI-assisted engineering](../).*

The Salesforce Lightning team called their token system the Single Source of Truth and stored it as JSON files. Sönke Rohde's line, often quoted: *"It's basically a set of JSON files which contain name-value pairs describing our design tokens."* That was 2017. The pattern has held for nine years across Material, Carbon, Polaris, SAP Fiori, and most modern systems. The reason it has held is that it works, and the reason it works is mostly boring.

## The token hierarchy

A working token system has three layers, and the layers do different work.

**Primitive tokens** are raw values. `blue-500: #3b82f6`. `space-4: 1rem`. `font-size-base: 16px`. They name a value but say nothing about what the value is for. A primitive token is a label on a paint can; it doesn't tell you which wall to paint.

**Semantic tokens** are meaning-bearing aliases over primitives. `color-text-primary: {blue-900}`. `color-action: {blue-500}`. `space-section: {space-12}`. They name what something is for, in language the team can have a conversation about. Semantic tokens are where most of the design discussion lives, because they're the layer that survives a rebrand.

**Component tokens** are local to a component. `button-background-primary: {color-action}`. `card-padding: {space-section}`. They wire the semantic layer to specific UI elements and let a single component absorb a system-wide change without re-exporting.

Three is the standard count and it's not arbitrary. Two layers (primitive and semantic) leave components rebuilding the same wiring. Four (adding a "context" or "theme" layer) tends to add complexity without absorbing any new responsibility. Three is the count where each layer does one job and no two layers do the same job.

Style Dictionary is the dominant tool for compiling tokens to platform-specific outputs (CSS variables for web, UIColor for iOS, XML for Android). The W3C Design Token Community Group has a standard JSON format that most token tools converge on. SAP's framing of the role: *"Tokens enable a design system to have a single source of truth. They provide a kind of repository for recording and tracking style choices and changes. When using tokens for design and implementation, style updates will propagate consistently through an entire product or suite of products."*

That's the boring case for tokens. It is, in 2026, a more interesting case than it used to be.

## Tokens as variable, tokens as constraint

There's a distinction worth drawing between **tokens as variable** and **tokens as constraint**.

As a variable, a token is a substitutable value: `--color-primary` resolves to whatever the team has set it to today, and any component that uses the variable picks up changes for free. This is the classical case and the one Style Dictionary serves. The reader is the runtime; the failure mode is the variable not being defined or being overridden incorrectly.

As a constraint, a token is a member of a closed set of allowed choices. The team has decided there are seven colours, and adding an eighth requires a DESIGN.md change. The reader is now the developer (or agent) writing new code; the failure mode is the developer using a hex value that isn't in the token list, or an agent generating CSS with arbitrary colours pulled from a prompt.

In a human-only team, the constraint reading is enforced by code review. In a 2026 team where an agent generates components, the constraint reading needs to be visible to the agent before the code is generated. That is what Stitch's DESIGN.md format is doing with its YAML front-matter: not exporting tokens for the runtime, but declaring tokens as a constraint surface for whatever generator reads them.

The token system becomes more useful, not less, when the generator is a model. The discipline around it has to get tighter.

## The component is the spec

Anima's framing of the modern goal is what they call a *"1:1 relationship between Figma components and code components."* The implicit argument: once the primitives and the components are right, **the component itself is the design**. There is no separate Figma file that authoritatively describes what a card should look like, because the rendered `<Card>` in Storybook is more accurate than any Figma file could be.

This is the move Storybook has been pushing for years. UXPin's writeup of Merge captures the logic: *"Drift is nonexistent when everyone uses the same component library with the same constraints. Designers don't have to explain UIs or provide endless documentation explaining their prototypes; they already look and function like the final product."*

In the AI-assisted era, the same logic applies to agents. An agent that reads a component library and uses it correctly can't drift from the design system, because it has no other system to drift toward. The DESIGN.md tells the agent which components exist and why; the Storybook shows it how they render and behave; the token system constrains the available choices. The drift mode that's left is *"agent invents a new component that should have been a variant of an existing one,"* and that's the mode that registry hygiene (see the [Storybook page](../storybook/)) is supposed to prevent.

## The layer cake on a real React stack

A modern React component stack typically has four layers, and they correspond to who owns what.

A **headless primitive layer** for accessibility and behaviour: Radix UI, React Aria, Headless UI. These handle the hard parts (focus management, keyboard navigation, ARIA roles) without imposing visual design. They're maintained by people who've thought about accessibility for longer than your team will.

A **styled component library** that consumes design tokens and produces visual components: shadcn/ui, MUI, Chakra. This is where the system's visual language lives. shadcn/ui's pattern of copying components into your repo (rather than installing as a dependency) is increasingly the default in 2026 because it lets agents read and modify the styled layer directly.

An **app-specific composition layer** that combines styled components into product-meaningful units: a `<HeroSection>`, a `<PricingTable>`, an `<ArticleHeader>`. This is the layer most teams over-build and under-document. It is also the layer where agent-generated drift is most likely.

A **page or template layer** that arranges composition layers into routes. In a Next.js or Astro setup this maps to files; in older setups it's a more diffuse concept.

The token system threads through all four. Primitives and semantic tokens live in CSS variables (or the equivalent). Component tokens are usually inline in the styled component. App-specific tokens (specific spacing, specific gradients) sometimes warrant their own layer in the token system; sometimes they don't. The trade-off is between centralising every visual decision and accepting that some local decisions belong locally.

## What I'm doing on this site

The site uses shadcn/ui-style primitives copied into the repo, a small set of semantic tokens declared in CSS variables and mirrored in the DESIGN.md YAML front-matter, and exactly five committed components (see the [Storybook page](../storybook/)). There is no app-specific composition layer worth naming yet. There may not need to be one.

The token list is short on purpose: six semantic colours, three font families, six type scales, eight spacing values. Stitch's DESIGN.md format wants names and descriptions for each, so each token has a one-line rationale in the prose body of the file. *"`color-action`: the deep blue used for any clickable affordance; high contrast against background; not used for text or borders."* The rationale is for both the human reading later and the agent generating something new.

When I add a sixth component, the constraint discipline says I add a token if it needs one (probably not), update the DESIGN.md component list (definitely), add stories to Storybook (definitely), and write a docs page that says when to use it. The whole loop takes longer than the component itself. That is the right ratio for a small site, and probably the right ratio for any codebase that takes the agent reader seriously.

## Open

The question that interests me most: how granular should component tokens get before they stop earning their place? `button-background-primary` is clearly worth a token. `button-padding-x-medium-with-icon-leading` arguably is not. The line between "useful constraint" and "bureaucratic token explosion" is somewhere in that range, and I haven't found a clean rule.

The current heuristic, which I'm using on this site: a component token earns its place when changing it requires changing more than one component file. If only `<Button>` reads it, inline the value. If `<Button>` and `<Link>` and `<IconButton>` all read it, promote to a token. The heuristic is cheap and probably wrong in edge cases. It will do until I have data.
