---
title: "Removing Figma: the four jobs it was bundling"
date: 2026-04-27
section: lab
parent: ui-ux-design-ai-assisted-engineering
description: "Exploration, communication, non-component design work, whole-flow thinking, and what replaces each."
---

# Removing Figma: the four jobs it was bundling

*Part of [UI/UX design in the age of AI-assisted engineering](../).*

I haven't opened Figma for this site in a month. The previous month I opened it twice, both times to copy a colour value into a CSS variable. The month before that, I made a wireframe of a page and never looked at it again because the page was easier to build than to draw. That is the empirical pattern I'm trying to make sense of, and it isn't unique to this site.

Most "should we leave Figma" arguments treat Figma as one tool. It isn't. It is four jobs in a trench coat, and the four jobs have decoupled in 2026.

## The four jobs

The argument is cleanest if I name them up front. Figma was bundling exactly four jobs for most product teams: cheap throwaway exploration before commitment; communication with non-engineers; non-component design work (marketing, illustration, brand); and whole-flow plus system thinking across multiple screens. Each used the same tool for historical reasons. None of them want to live in the same tool any more.

### Job one: cheap, throwaway exploration

The strongest historical case for Figma was iteration cost. Sketching a layout in Figma was cheaper than building it; Figma's value was that it let you be wrong fast.

In 2026 the gap has closed. Claude Code, v0, and Lovable produce working draft components in seconds. A GitHub PR with a Vercel or Netlify preview deploy gives a real, clickable artifact. The "30-minute Figma sketch" advantage compresses to a "5-minute prompt," and the preview is the actual product, so feedback is grounded in real interaction rather than interpretation of a static frame.

The cost of being wrong about an idea has dropped to roughly the cost of being wrong about it in Figma. That is the threshold the argument needed to clear, and 2026 cleared it.

### Job two: communication with non-engineers

Same mechanism. A preview URL on a draft branch is shareable, requires no install, and behaves like the thing being shipped. For stakeholder reviews or partner-side feedback, "here's the link" is now lower-friction than "here's the Figma."

The one thing lost is the deliberate low-fidelity that signals *this is not finished yet*. In Figma, a wireframe with grey rectangles obviously isn't production. A code preview can look done even when the logic underneath isn't. The fix is to label the preview ("draft, ignore the data") or to lean on the fact that drafts in code obviously look like drafts when the data is fake. Neither fix is perfect. It is, in practice, fine.

### Job three: non-component design work

Marketing pages. Email templates. Illustrations. Brand assets. Pitch decks. None of this needs Figma specifically; it needs *some* tool.

Marketing sites move into the codebase when there's engineering bandwidth, and otherwise live in Webflow, Framer, Canva, or Notion. Brand and illustration work moves to Adobe, Affinity, Procreate, or whatever the brand designer prefers. Pitch decks live in Keynote, Pitch, or now Claude Design. None of this work was the source-of-truth problem. It was just adjacent work that happened to share a tool with the design system.

The trap teams fall into is treating "we use Figma for marketing too" as an argument against leaving Figma for product UI. It isn't. The marketing team can keep their tool; product UI can move.

### Job four: whole-flow and system thinking

This is the one that didn't dissolve immediately, and it's the part of the argument most worth taking seriously.

Storybook is a component museum: every artifact in isolation, fully realised. Figma's canvas is the opposite: a dozen half-formed screens laid out in a loose journey, annotated with arrows, with the whole flow visible at once. Engineers think in components; designers think in journeys; the canvas is the bridge between the two. Removing Figma without replacing this leaves a real gap.

The honest answer is that whole-flow thinking is itself four sub-modes, and each has a cleaner answer outside Figma.

**Exploration of a flow that doesn't exist yet.** Paper, a tablet, or a lightweight whiteboarding tool: Excalidraw, tldraw, FigJam, Miro. These are *better* than Figma for this mode because they don't tempt you into pixel-pushing while you're still trying to think. Pencil sketches are provisional by default; the line weight varies with hand pressure, which carries information about confidence. Pen commits, pencil proposes.

**Documentation of a flow that exists today.** This goes in the repo. A markdown file per flow, with embedded screenshots auto-generated from Playwright or Storybook snapshots, plus a Mermaid diagram for state transitions. The screenshots stay current because CI regenerates them on every build. More accurate than Figma ever was, because Figma always lagged production.

**Review of multiple screens side-by-side.** Storybook composition handles this if the team commits to it; better still is a small internal route in the application (`/journey/onboarding`, `/journey/import-flow`) that renders the screens of a flow in a 2D grid pulling from real components. Build it once, every flow gets it for free, and it always shows current production.

**Communication of a flow to stakeholders.** A preview URL plus a short Loom walking through it. Or the journey route shared as a link. Both higher fidelity than Figma, neither requiring an install.

The meta-answer: Figma was bundling four sub-jobs that don't actually want to be in one tool. Exploration wants speed and crapness. Documentation wants to live with the code. Review wants real screens. Communication wants a link. Each has a cleaner answer than Figma already; the bundle was a historical accident of Figma being good-enough at all four.

## What this implies

If the four jobs decompose into four different tools, the question stops being *"should we leave Figma?"* and becomes *"what's the right tool for each stage of work, and how do they connect?"* The answer for me, on this site, is roughly:

Paper or whiteboard for the earliest exploration. AI-generated previews (Claude Code plus Vercel) for the next stage of exploration where I want a clickable artifact. The codebase for everything that ships. Storybook plus journey routes for cross-screen review. A short Loom or a preview link for communication. The Figma slot in the toolchain is empty.

That isn't an anti-Figma position. It's the consequence of the jobs decomposing. Figma can stay in the stack as the tool the brand designer uses; that is a different question from whether it's the source of truth for product UI.

## Open

The mode I'm least sure I've replaced is the "twenty screens on an infinite canvas, zoom to find the one you want, drag the boxes around to find a structure" exploration mode. Excalidraw and tldraw approximate it. Miro and FigJam approximate it. None of them are *better* than Figma at it, the way preview deploys are better than Figma at communication.

That's the honest gap. Whether canvas-as-code tools (Paper, Pencil; see the [tools survey](../tools/)) close it depends on whether their canvas affordances live up to a real Figma-replacement test for the exploration job. Both products are young enough that the answer isn't obvious. I'm running the experiment.
