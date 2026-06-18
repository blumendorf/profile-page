---
title: "The 2026 workflow"
date: 2026-04-27
section: lab
parent: ui-ux-design-ai-assisted-engineering
description: "Staged pipeline (paper, prompt, materialise, verify, document); role redefinition; predictions worth tracking."
---

# The 2026 workflow

*Part of [UI/UX design in the age of AI-assisted engineering](../).*

I sketched a new feature on paper last week, prompted [Stitch](https://stitch.withgoogle.com/) into a five-screen draft on Wednesday, ported the parts I liked into the codebase with [Claude Code](https://www.anthropic.com/claude-code) on Thursday, refined two components in [Storybook](https://storybook.js.org/) on Friday, updated the [DESIGN.md](https://github.com/google-labs-code/design.md) on Saturday, and shipped a preview deploy on Sunday. The whole thing took about eight hours of actual work. The same feature in 2022 would have taken three days, mostly [Figma](https://www.figma.com/) plus handoff plus implementation.

The five-stage pipeline that produced that result isn't the only one that works. It is the one I keep landing on, and the one I think will hold for the next year.

## Five stages, named

The pipeline has five stages, and each stage has a different cost of being wrong. Naming them up front: **idea**, **concept**, **materialisation**, **verification**, **documentation**. Each stage uses different tools because each stage has different goals.

### Idea

The cheapest place to be wrong is paper, a tablet, or a lightweight whiteboarding tool ([Excalidraw](https://excalidraw.com/), [tldraw](https://www.tldraw.com/)). No agent in the loop. Think, mark, think. The output is a photo, a scan, or a redraw if it earns the upgrade.

This stage is short and undocumented by design. Its purpose is to discard four bad ideas before committing to one that might be wrong. Skipping it is the failure mode I see most often in AI-native teams: reaching for the prompt before the pencil produces confidently-rendered versions of half-formed thoughts, which are harder to throw away than confidently-rendered versions of well-formed thoughts. The fidelity hides the lack of thought.

### Concept

With a sketch in hand, prompt a flow-aware generator ([Stitch](https://stitch.withgoogle.com/), [Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs), [Figma Make](https://www.figma.com/make/)) to produce a multi-screen rough draft against your DESIGN.md and component library. The output is not the design. It's a forcing function that exposes which decisions you've already made implicitly and which you still have to make.

Iteration here is fast (seconds to minutes per round). Discard liberally. The job of this stage is to get from "I have a sketch" to "I have a clickable rough draft I can show someone," not to produce final UI. If you find yourself fine-tuning pixel positions in this stage, you're doing the wrong job.

### Materialisation

This is where the workflow bifurcates. **Path A** uses canvas-as-code tools ([Pencil](https://www.pencil.dev/) or [Paper](https://paper.design/)) to round-trip between visual edits and code as a single artifact, with [MCP](https://modelcontextprotocol.io/)-mediated agent assistance. **Path B** skips the canvas entirely and uses [Claude Code](https://www.anthropic.com/claude-code) or [Cursor](https://cursor.com/) with [`AGENTS.md`](https://agents.md/) and `DESIGN.md` as context to land the screens directly in the repo.

Both paths produce committable code. The difference is whether visual editing is a first-class loop or only happens in the running app. For engineers who prefer to live in the IDE, Path B is faster; for designers who want a canvas, Path A keeps the visual editing affordance.

The stage is over when the code is in the repo, the components match the system, and the flow is clickable in a preview deploy.

### Verification

Every component lives in Storybook with all states. [Chromatic](https://www.chromatic.com/) regression-tests visual changes. Preview deploys go up on every PR. Stakeholder communication happens via preview URLs plus short [Looms](https://www.loom.com/).

There is no separate "design review" stage in this pipeline because design review *is* PR review. The reviewer looks at the preview deploy, the Storybook stories, and the DESIGN.md changes in the same place where they look at the code diff. This is a real change from the 2022 pattern, where design review happened in Figma comments while implementation review happened in GitHub. Collapsing the two surfaces is the part of the workflow that took me longest to internalise, and the part that pays off most.

### Documentation

Significant decisions update DESIGN.md. The format is the durable interchange between the team's intent and the agent's execution. ADR-style: each decision is a small, dated entry; superseded rather than edited. Components self-document via Storybook. Flows self-document via journey routes in the running application (see the [Storybook page](../storybook/) for the registry argument).

The DESIGN.md update isn't an afterthought. It's the part of the loop that closes against the next iteration: when I prompt Claude Design or Stitch next time, it reads the updated DESIGN.md, and the constraint surface for the next generation is the result of the last one.

## Decision-time vs. execution-time

There's a distinction worth drawing between **decision-time** and **execution-time**, and it's the one that reorganises roles in this pipeline.

Decision-time is where humans decide what should exist, why, and within what constraints. Sketching, prompting, choosing between concepts, writing the DESIGN.md, reviewing the preview deploy. This is the work humans are still demonstrably better at than agents in 2026, and probably for a while longer. It is also the work that's underweighted in most "AI will replace designers" discussions, which tend to flatten design into pixel-pushing.

Execution-time is where the work gets done. Materialising a component into code, regenerating tokens for multiple platforms, running visual regression, propagating a design-system change across two hundred uses. This is the work that compresses dramatically with agents in the loop. A change that took two days of Find-and-Replace plus careful review now takes thirty minutes of writing the prompt and reviewing the diff.

Most workflow descriptions still implicitly assume the human does both. In a 2026 workflow, the human owns decision-time and the agent owns execution-time, and the discipline is keeping the boundary sharp. The failure mode is the human drifting into execution-time (re-doing what the agent already did, or hand-coding what the agent could have generated) or the agent drifting into decision-time (making constraint-shaped choices that should have been the human's).

## Role redefinition

This pipeline implies a different shape of work for designers and engineers. I'll be opinionated about what I think happens; I'm aware the predictions could be wrong.

**Designers become curators, prompters, and constraint-setters.** Pixel-pushing collapses into agent prompting plus inline correction. The premium skill becomes writing DESIGN.md well: articulating the reasoning behind a system clearly enough that both human collaborators and AI generators produce consistent output from it. This is closer to the "design technologist" role that has existed at the edges of design organisations for a decade than to the classical product designer. It is also closer to the role of a senior product manager than the same role was three years ago.

**Engineers become context-providers and reviewers.** Writing `AGENTS.md`, building the component library, maintaining Storybook, reviewing what the agent produces. The premium skill becomes architectural taste: knowing what should be a component, what a primitive, what an app-specific composition. The bulk of CRUD-screen implementation becomes agent work, which means the engineering job tilts toward the parts that survive automation.

**The agent does the production work, but only because the team has been clear about intent.** The pattern of failure I see most often in AI-assisted UI work is not "the agent is too dumb." It is "the team didn't write down what they actually wanted, and the agent confidently produced a plausible interpretation that nobody disagrees with strongly enough to push back on." Writing things down (DESIGN.md, AGENTS.md, component-library docs, Storybook stories) is the work that makes the agent useful. It is also the work humans benefit from independently.

**Brand, marketing, and illustration split off.** These have always been adjacent rather than central to product UI work. They will use their own tools ([Figma](https://www.figma.com/), [Adobe](https://www.adobe.com/creativecloud.html), [Webflow](https://webflow.com/), [Framer](https://www.framer.com/), [Canva](https://www.canva.com/)) outside the product engineering pipeline, because the product engineering pipeline no longer includes Figma at all. The split was always implicit; in 2026 it becomes explicit and probably formalises in org structure.

## Predictions

Some of these are confident; some are bets. I'll attach approximate confidence so I can audit myself in twelve months.

DESIGN.md as a portable format will either consolidate (probably on Stitch's spec or a successor) within twelve months or fragment into per-tool variants that share most of their structure. The current trajectory favours consolidation; AI tool builders have a strong incentive to converge on a readable interchange. **Confidence: medium-high.**

The IDE will absorb the canvas, or the canvas will absorb the IDE. Pencil's bet is the former; Paper's bet is the latter. Both can be right for different teams. The unstable middle (separate canvas, separate IDE, no shared state) hollows out. **Confidence: high on the convergence direction, uncertain on the dominant path.**

Cross-screen state reasoning will get a real first-class abstraction within eighteen months. The shape will resemble a typed graph: nodes are screens, edges are transitions, edge labels are state changes, and the whole thing is something you can version-control and validate. The first credible attempt will probably come from Figma Make, Claude Design, or a startup nobody has heard of yet. **Confidence: medium; the gap is too obvious for the category not to address it.**

Designers and engineers will partly re-merge into a single role for product UI work, especially in small teams. The split that made sense when designers needed Figma fluency and engineers needed code fluency stops making sense when both work through prompts and curation against shared agent-readable artifacts. Brand, illustration, and marketing design remain separate professions. **Confidence: high for small teams, medium for larger ones.**

Figma will evolve into either a marketing or brand tool, or an upstream exploration canvas, but lose its position as the source of truth for production UI. Whether Figma Make succeeds as a counter-move depends on whether Figma can credibly commit to a code-first integration model rather than treating code as an export target. **Confidence: medium-high on the directional shift, uncertain on Figma's specific response.**

## What would invalidate this

A research log is more useful when it states the conditions under which it would be wrong. Things I'm watching for that would make me reconsider this workflow.

If Claude Design or Stitch starts producing screens good enough that the materialisation stage doesn't need a separate Claude Code pass, the five-stage pipeline collapses to four. That's plausible by Q4 2026.

If MCP standardises a richer interchange than DESIGN.md (a JSON Schema for design systems that all tools agree to read and write), the YAML-front-matter pattern becomes a transitional hack. Worth watching the [W3C Design Token Community Group](https://www.designtokens.org/) and whatever [Anthropic](https://www.anthropic.com/), [Google](https://about.google/), and [Figma](https://www.figma.com/) converge on.

If non-engineer stakeholders start refusing preview deploys as a substitute for Figma frames ("too high-fidelity, I can't tell what's draft"), the communication job that I thought was solved comes back. So far in my own work this hasn't happened. It might.

If the canvas-as-code bet fails (Paper or Pencil don't hold up under serious production use), the workflow stays at "two tools, exploration plus materialisation" rather than collapsing to "one tool that does both." That isn't a workflow failure, just a different terminal state.

The general principle: the workflow I describe is a snapshot of where the tooling has settled in April 2026. The snapshot will be different in October. I'll update the page when it is.
