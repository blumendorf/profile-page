---
title: "Storybook as verification layer and agent registry"
date: 2026-04-27
section: lab
parent: ui-ux-design-ai-assisted-engineering
description: "What Storybook is for now that agents read it, including the limits real teams hit when components stop being reusable."
---

# Storybook as verification layer and agent registry

*Part of [UI/UX design in the age of AI-assisted engineering](../).*

A 2024 thesis from the University of Oulu surveyed real Storybook adoption across several teams. Davidsson and Hennings found that not all UI library code components were previewable in their team's Storybook, and that the components had grown too project-specific to be reusable across products. The Storybook had become a crowded list of bespoke variants. The component library it was supposed to surface had quietly stopped being a library.

That is the failure mode Storybook hits in practice, and it is the failure mode that gets twice as bad once an agent is reading the same Storybook to figure out what components already exist.

## What Storybook is, in its own words

From storybook.js.org: *"Storybook is a single source of truth for UI."* And: *"Storybook is a powerful frontend workshop environment tool that allows teams to design, build, and organize UI components (and even full screens!) without getting tripped up over business logic and plumbing."*

The mental model is "frontend workshop": every component, in every state, rendered in isolation, browsable in a tree, hot-reloading as code changes. That's the surface case. The deeper case is what the workshop enables: hard-to-reach states (loading, empty, error, edge cases) that you can build without exercising the full app; living documentation that's auto-generated from props and stories; and visual regression plus accessibility testing via Chromatic, the a11y addon, and play functions.

Storybook's blog post *How Storybook helps designers & developers stay in sync* is the most direct on-point reference: *"A component workbench such as Storybook connects components coded in JavaScript frameworks such as React to design tools such as Figma. That allows you to spot inconsistencies earlier in the process and ensure that designs and code mirror each other."*

Supernova's framing is sharper: Storybook helps teams build a shared vocabulary between design and engineering, give real-time feedback during component development, and reduce handoff issues by *"making the component itself the spec."*

That last phrase is the unifying claim. Once a component exists in Storybook, any disagreement between Figma and production is a disagreement *about reality*, not about an aspiration.

## Workshop and registry

There's a distinction worth drawing between Storybook as **workshop** and Storybook as **registry**.

As a workshop, Storybook is where humans build and inspect components. The audience is the developer iterating on a button, the designer reviewing whether the implementation matches Figma, the QA engineer regression-testing visual changes. The artifact's value is in the building.

As a registry, Storybook is the catalogue of components that already exist, organised by name and described by stories. The audience here is anyone who needs to discover what's available before adding something new. Historically that audience was a developer joining the team or a designer checking whether a pattern already exists. In 2026 it's also an agent: Claude Design's onboarding scans the codebase and the Storybook to derive the design system; Claude Code reads stories to understand component APIs before generating new code that uses them.

Most Storybook discussion focuses on the workshop side. The registry side is what makes Storybook useful when the agent is one of the readers. A workshop with no registry is a private notebook. A registry that nobody maintains as a workshop becomes the Oulu thesis failure mode: stories accumulate, drift from production, and stop being trustworthy.

Both modes are necessary; neither is sufficient.

## The Oulu failure mode, with agents in the loop

The Oulu thesis surveyed humans drifting away from a design system. Components grew too project-specific to be reusable; the Storybook crowded with bespoke variants; reuse stopped happening because nobody could find what they needed.

The same observation applies at twice the speed once an agent is generating new components. The agent only sees what is surfaced in stories. If the project's button has eleven prop-based variants and only the default is exported as a story, the agent will reinvent the missing ten. If the variants exist as stories but the file structure is opaque, the agent will produce something plausible-looking that doesn't compose with the rest of the system. If the stories exist and document the props, the agent reuses; if they don't, the agent reinvents.

This raises the need for what I'd call a **registry hygiene** discipline. Every component the team commits to keeping has a story. Every story documents the props that matter. Every story has a reasonable name (`Button.Default`, `Button.Loading`, not `Button.Demo` or `Storybook test`). The MDX docs page for each component states what the component is for and what it isn't. None of this is new advice. What's new is the cost of skipping it.

## Storybook in practice on this site

The Storybook this PR adds is small. There are five components in it as of today: button, link, code-block, callout, headline. Each has a story per state I care about (default, focused, disabled where applicable, dark-mode where applicable). Each has a one-paragraph MDX docs page that says what the component is for and which props are load-bearing.

The five components match the list in the DESIGN.md exactly. That is deliberate. The DESIGN.md commits the team (in this case, me) to maintaining these components and not building variants outside the list. The Storybook surfaces the components so that an agent reading the codebase can find them. The two files reference each other; neither is the source of truth, but together they form the constraint surface.

What I'm watching for over the next few months: whether Claude Code, given the same prompt that previously produced a bespoke component, now correctly picks up the existing one from Storybook. If it does, the registry is doing its job. If it doesn't, the Storybook is missing something the agent expected to find, and the gap is informative.

## Open

The most interesting question to me is whether agents end up needing a richer registry format than Storybook provides. Stories are great for humans (visual, browsable, interactive) but agents arguably want something more structured: a JSON manifest of components, props, slots, and constraints that's faster to parse than rendering a story and reading the DOM. The MCP servers shipped by Paper, Pencil, and Magic Patterns are early answers; whether one of them becomes the standard, or whether Storybook itself ships a machine-readable companion, is open.

The next experiment on this site is to drop a Storybook addon that exposes the component catalogue as JSON over MCP, and watch whether agents prefer that surface to the rendered HTML. My current bet is that they will.
