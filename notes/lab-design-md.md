---
title: "DESIGN.md: history and 2026 reframing"
date: 2026-04-27
section: lab
parent: ui-ux-design-ai-assisted-engineering
description: "From Google's design-doc culture and Nygard's ADRs to matklad's ARCHITECTURE.md, then the April 2026 Stitch DESIGN.md specification."
---

# DESIGN.md: history and 2026 reframing

*Part of [UI/UX design in the age of AI-assisted engineering](../).*

Michael Nygard wrote *Documenting Architecture Decisions* on the Cognitect blog in November 2011. It is two pages long. Most ADR templates in use today are still that template, with the section names lightly edited. Nygard's opening problem was simple: developers and stakeholders couldn't see why earlier decisions had been made, and as the team turned over, the rationale was lost. His solution was to put a small markdown file in the repo (Title, Status, Context, Decision, Consequences), never edit it after acceptance, only supersede.

Fifteen years later, the convention is the deepest root of how serious teams document the why of a system. It is also, in 2026, the deepest root of how AI agents understand what a codebase is for.

## What "design doc" means in software, exactly

The phrase "design doc" picks up a few different traditions, and they're worth keeping separate.

**Google's design-doc culture.** The widely cited reference is Malte Ubl's *Design Docs at Google* on industrialempathy.com. Ubl's claim: design docs are foundational to Google engineering, written before the code starts, capturing the high-level implementation strategy and the trade-offs considered. He puts the reason for them in one line worth quoting: *"As software engineers our job is not to produce code per se, but rather to solve problems. Unstructured text, like in the form of a design doc, may be the better tool for solving problems early in a project lifecycle."* This is the "prose forces clarity" school. The doc isn't a spec; it's the planning surface.

**Architecture Decision Records.** Nygard's 2011 template, narrower than Google's design doc. ADRs document one decision each: small markdown files (`doc/arch/adr-NNN.md`), monotonically numbered, immutable after acceptance. ThoughtWorks moved ADRs to "Adopt" on its Technology Radar in 2018. The discipline scales because the unit is small and the rule is "don't edit, supersede."

**ARCHITECTURE.md.** Aleksey Kladov (matklad) published the canonical post in February 2021. The argument: in any project of 10k–200k lines, contributors don't have trouble *writing* code, they have trouble *locating* it. The fix is one short markdown file at the repo root that gives the codemap. Kladov's rules apply directly to DESIGN.md and are worth reading in full: keep it short; only specify things unlikely to change; don't try to keep it synchronized with code; revisit a couple of times a year. The rust-analyzer project's `architecture.md` is the most-cited example.

**Will Larson's strategy framing.** Larson's contribution is the synthesis: design documents are the unit of engineering strategy. His one-line summary, repeated across his blog and *Staff Engineer*: *"To write an engineering strategy, write five design documents, and pull the similarities out. That's your engineering strategy."* His length rule: *"Keep it one to two pages long. The reality is that most people don't read long documents."*

**RFCs, PEPs, KEPs.** The cross-team or cross-org proposal traditions: heavyweight, formally reviewed, project-wide. DESIGN.md is the lighter, project-local cousin.

The pragmatic distinction across all of these: **README** answers *how*, **ARCHITECTURE.md** answers *where*, **ADR** answers *why a specific call was made*, **DESIGN.md** answers *why this system is shaped this way at all*, **RFC** answers *should we as an organisation do this*.

## What goes in a DESIGN.md, in practice

Synthesising across Nygard, Larson, Ubl, and Kladov, a working DESIGN.md has six things.

A context or problem statement, saying what's true about the world that forced this decision. Goals and explicit non-goals; what is *not* being solved is often more useful than what is. Options considered, two or more, with honest trade-offs. The decision, written assertively. Consequences, both positive and negative, including what this commits the team to maintaining. Open questions or follow-ups that are deferred.

Some teams add a "scope of components affected" section to make it grep-able. Some prefix each entry with a date and a one-line summary, ADR-style. The exact shape matters less than the discipline of writing one before it's needed.

When to write it: before the code is the Google convention; alongside the code is Larson's variant; at the moment of decision is the ADR norm. The anti-pattern they all agree on is writing it after the project ships, when memory has decayed and the document is reduced to archaeology.

## The 2026 inflection

In April 2026, Google open-sourced the **DESIGN.md** format originally developed for Stitch. The format has two parts: YAML front-matter that's machine-readable (design tokens conformant to the W3C Design Token Community Group format), and a markdown body that explains the rationale.

A Medium analysis of the spec captured the move cleanly: *"YAML front matter — machine-readable design tokens. Markdown body — prose that explains the 'why' behind every decision. Not just 'primary is #1A1C1E,' but 'it is a deep ink for headlines, evoking editorial austerity.'"*

The adoption signal was striking. VoltAgent's `awesome-design-md` collection went from launch on March 31, 2026 to 35,000 stars and 4,400 forks in ten days, with a fork-to-star ratio higher than `awesome-go` or `awesome-python`. Forks imply use, not just bookmarking.

OSS Insight framed Stitch's DESIGN.md as part of a broader pattern, a **.md Protocol Layer** alongside `CLAUDE.md`, `AGENTS.md`, and similar files. From their writeup: *"Each file follows the same formula: a plain-text document at the project root, read by AI agents to understand one specific dimension of the project. Together, they form a complete specification: not for machines (that's what APIs are for), not for humans (that's what docs are for), but for the new category in between: AI agents that need to understand human intent."*

I find that framing exactly right. The agent isn't a machine in the API sense; it doesn't want a structured RPC. It isn't a human in the documentation sense; it can parse YAML faster than a person can read prose. It is a third reader, and it is fluent in both modes at once.

## Memory and constraint, drawn out

In the [framing post](../) I drew the distinction between *documentation as memory* and *documentation as constraint*. It's worth saying more here.

A classical DESIGN.md is documentation as memory. It captures what we decided so the team in six months can recover it. The reader is human, the time horizon is long, the failure mode is the document going stale. Kladov's "don't try to keep it synchronized with code" is exactly the right rule for this register: a DESIGN.md as memory is a snapshot of intent, not a live spec.

A 2026 DESIGN.md is also documentation as constraint. It tells an agent, right now on this generation, what range of choices is in-bounds for our system. The reader is the agent, the time horizon is the next prompt, the failure mode is the agent producing output that violates a rule the team had already settled. As constraint, the DESIGN.md *does* need to stay current with code, because an agent that reads stale tokens generates stale UI.

The Stitch format (YAML front-matter for the constraint, markdown body for the memory) is the cleanest expression of this dual role I've seen. Other formats will follow. The current question is whether the format converges on Stitch's spec or fragments.

## What I'm putting in mine

The DESIGN.md on this site is short, in line with Kladov's rules. It has a one-paragraph context: what this site is for, why it exists, who reads it. Two non-goals, written explicitly: this is not a portfolio site, and it is not a CMS. The colour palette and typography as YAML front-matter, in the Stitch format, with one-line rationales for each token. A short list of components I've committed to keeping (button, link, code-block, callout, headline) and one-line semantic descriptions of when to use each. A short section on the components I've chosen *not* to build, and why.

The non-goals section is the part I most expect Claude Code and Claude Design to act on. "This is not a CMS" tells an agent not to suggest a content-modelling layer. "This is not a portfolio site" tells it not to add image grids or project-card components. Both are constraints, written for the agent reader, that also happen to clarify the project for me.

I'll revisit the file every few months in line with Kladov's rule. If a token changes, the YAML changes. If the rationale for a token changes, the prose changes. I won't try to keep the prose perfectly synchronised with code. I will keep the YAML synchronised, because that's the part the agent reads.

## Open

Two questions I don't have answers to yet.

The first is how DESIGN.md scales to a multi-package or monorepo setting. One file at the root works for a small site; a publishing platform with a dozen products needs a tree of DESIGN.md files, and the format doesn't yet specify how those compose. Stitch's spec is silent on this. Notion-style nesting feels right but isn't standardised.

The second is whether DESIGN.md becomes the durable interchange format for design systems across tools, or whether something more constrained (a specific JSON schema, an extension of the W3C tokens spec) replaces it. Stitch is the current frontrunner. Convergence is the obvious bet but not the certain one.
