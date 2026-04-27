---
title: "UI/UX design in the age of AI-assisted engineering"
date: 2026-04-27
section: lab
description: "Framing piece for a set of lab notes on what changes in UI/UX work when AI agents become first-class readers of the same files humans produce."
---

# UI/UX design in the age of AI-assisted engineering

I added a DESIGN.md to this site last month. This PR adds a Storybook. Both are mid-2010s ideas, the kind of thing every serious frontend codebase has had for a decade. The reason I'm adding both to a 2026 codebase is not the reason a team would have added them in 2018.

This page is the framing piece for a set of lab notes on what changes in UI/UX work when AI agents become first-class readers and writers of the same files humans produce. The experiment runs on this site. The research notes are linked at the bottom and grow as I write them.

## The classic problem

Design and implementation drift apart by default. Designers ship Figma files; engineers ship code; both evolve on independent clocks. The "source of truth" silently becomes whichever artifact someone looked at last, which is usually whichever one is most legible to whoever's asking. Designers see Figma; managers see screenshots; engineers see what shipped. None of them are wrong, exactly. None of them are looking at the same thing.

The classic stack of Figma to handoff to engineering to Storybook leaks at three points. Decision rationale gets lost between design and implementation; nobody documented why a button is the size it is, so the next person to touch it re-litigates a settled question and probably re-litigates it wrong. Async fragmentation makes it impossible for a distributed team to keep up with each other's decisions without constant meetings, which forces more meetings. Onboarding cost compounds: new contributors have no trouble *writing* code, but can't reliably *locate* it or understand why a particular component exists at all.

Anima's writeup of this is good. As design systems scale, drift between Figma components and code components is the default state, and Storybook is where that drift becomes visible, usually after it's already done damage. The point of any serious design-implementation discipline has always been to compress that loop. Make drift either impossible by construction, or make it immediately obvious.

## What changed

What's different in 2026 isn't the problem. The cast of readers expanded.

There are now two kinds of reader for any non-trivial documentation artifact in a product codebase, not one. The first kind is the human: the engineer joining next month, the designer reviewing whether the implementation matches intent, the maintainer six months from now trying to figure out why a token is what it is. The second kind is the agent: Claude Code reading `CLAUDE.md` to orient itself before it edits anything; Claude Design reading the codebase at onboarding to derive a design system from existing components; Google Stitch's DESIGN.md, open-sourced in April 2026, parsed as a YAML manifest of design tokens with a markdown rationale alongside.

The agent gets the constraint. The human gets the why. The file is one file.

This is the move I find genuinely new. There's a distinction worth drawing between *documentation as memory* and *documentation as constraint*. As memory, a DESIGN.md captures what we decided so the team in six months can recover it. That's the classical use, the one Nygard's ADRs and matklad's *ARCHITECTURE.md* were built for. As constraint, the same DESIGN.md tells an agent, right now on this generation, what range of choices is in-bounds for our system. Most writing about DESIGN.md in 2026 still treats it as memory. The interesting work happens when you write it knowing both readers will use it.

Storybook does the symmetric thing on the implementation side. As a workshop, it's where humans inspect components. As a registry, it's where an agent discovers what components already exist before it cheerfully reinvents one. Anthropic's launch post for Claude Design has this line: *"During onboarding, Claude builds a design system for your team by reading your codebase and design files."* Read literally, the design system is something an agent extracts from what you've already built. A well-maintained Storybook is the surface from which that extraction works.

## What this site is doing

This site is small. It doesn't really need a DESIGN.md. It absolutely doesn't need a Storybook. The button is the size it is because I picked a number.

I'm running the experiment anyway. The site is a low-cost proving ground for patterns that show up at higher cost in larger codebases. The specific things I want to watch:

Does Claude Code produce different output when a DESIGN.md describes the colour and typography system, versus when it has to infer from the existing CSS? Does adding components to Storybook change what the agent reuses versus what it reinvents? How much of the DESIGN.md needs to be machine-readable (YAML front-matter, in the Stitch format) versus prose, before the difference shows up in agent output? And what happens to the workflow when I drop Figma entirely and design through prompts plus code, with the canvas-as-code tools that landed this year?

These are research questions I can't answer from a tools survey. They want a small site to actually run on.

The PRs in this series so far: a DESIGN.md describing the colour, typography, and component philosophy of the site. A Storybook with the components I've built so far. The next one introduces a workflow that regenerates flow-level documentation pages from real Storybook screens, the kind of thing a paper sketch is good for at the start of a feature but that has nowhere to live once the feature ships. After that, the question is whether I can drop Figma entirely from the loop and use canvas-as-code tools (Paper, Pencil) plus Claude Code as the full design-and-build pipeline.

## What's at stake

Most of the AI-coding discourse in 2026 is about agent reliability: benchmark scores, autonomy levels, parallel sessions, context window sizes. The question I find more useful is what those agents are reading on the way to producing output. A 2024 thesis from Oulu, surveying real Storybook adoption, found that many UI library components weren't previewable in the team's Storybook because the components had grown too project-specific to be reusable. That paper was written about humans drifting away from a design system. The same observation applies at twice the speed now, because an agent generating new components only sees what's surfaced.

Garbage in, garbage out has always been true. It got more consequential.

The bet underlying everything I'm doing on this site is that the team that writes things down (clearly, in version control, in formats both humans and agents can read) compounds advantages over teams that don't. This was true before AI-assisted engineering. It is more true now. DESIGN.md, the component library, and Storybook are not new ideas. They are old ideas whose payoff has gone up.

That's the framing for the rest of the lab notes.

## Lab notes

Linked here as I write them. The structure is roughly the order in which the questions came up:

- [DESIGN.md: history and 2026 reframing](/lab/ui-ux-ai/design-md). From Google's design-doc culture and Nygard's ADRs to matklad's *ARCHITECTURE.md*, then the April 2026 Stitch DESIGN.md specification.
- [Storybook as verification layer and agent registry](/lab/ui-ux-ai/storybook). What Storybook is for now that agents read it, including the limits real teams hit when components stop being reusable.
- [Components and design tokens](/lab/ui-ux-ai/components-and-tokens). Token hierarchy, why "the component is the spec," how this layer reads to humans and agents differently.
- [Removing Figma: the four jobs it was bundling](/lab/ui-ux-ai/figma-jobs). Exploration, communication with non-engineers, non-component design work, whole-flow thinking, and what replaces each.
- [Tools for AI-assisted UI work, surveyed](/lab/ui-ux-ai/tools). Canvas-as-code (Paper, Pencil); codebase-integrated builders (v0, Lovable, Bolt, Claude Code, Cursor, Windsurf, Builder.io, Plasmic); standalone Figma replacements (Stitch, Figma Make, Claude Design, Magic Patterns, Uizard, Framer).
- [The 2026 workflow](/lab/ui-ux-ai/workflow). Staged pipeline (paper, prompt, materialise, verify, document); role redefinition; predictions worth tracking.

## Open questions

The questions I don't have answers for yet, in roughly the order they bother me:

Whether DESIGN.md as a portable interchange format converges on the Stitch spec, fragments into per-tool variants, or gets replaced by something more constrained. The current trajectory favours convergence; AI tool builders have a strong incentive to read the same format. Twelve months feels right for an answer.

Whether the canvas-as-code bet is correct, and which version of it (Pencil's IDE-resident model, Paper's connected canvas) holds up under real production use. Both shipped in early 2026. Both are young.

Whether the role of "designer" and "engineer" partly re-merges for product UI work, or whether a new role (design technologist, product designer with code fluency, something else) absorbs both. The shape of small AI-native teams suggests merging. The shape of larger ones suggests a new role.

Whether the next year of AI-coding tooling makes me right or wrong about the previous three.
