# Design Concept & UX Strategy

## 1. Design Philosophy
**"The Shift" — Engineering in the AI Era**

The design must reflect the core thesis of the profile: **Software engineering is transforming.** The aesthetic should not be a standard "corporate portfolio" nor a "flashy creative agency" site. It must strike a balance:
- **Authoritative & Experienced:** Grounded, substantial, credible (Director level).
- **Forward-Looking:** Modern, clean, utilizing current web standards (AI-ready).
- **Engineering-First:** Function over form, high information density without clutter, respect for system preferences (Dark Mode).

## 2. Target Audience & UX Goals
**Primary Audience:** Engineering Leaders (CTOs, VPs), Senior Engineers, Tech Recruiters.

**User Persona Traits:**
- Values efficiency and clarity.
- Skeptical of marketing fluff.
- Appreciates technical craftsmanship (performance, accessibility, clean code).
- Likely browsing in Dark Mode.

**UX Goals:**
1.  **Immediate Credibility:** The Hero section must instantly establish "Director of Software Engineering" + "AI Expertise."
2.  **Scannability:** Use clear hierarchy, lists, and visual groupings. Engineers scan before they read.
3.  **Linear Storytelling:** Guide the user from the "Who" (Hero) to the "Why" (The Shift) to the "What" (Expertise/Stack) and "How" (Journey).

## 3. Visual Identity

### Color System
*Based on Tailwind CSS v4 variables*
- **Theme:** Primary Dark Mode (System preference supported).
- **Backgrounds:** Deep, rich darks (Slate/Zinc 950) rather than pure black, providing depth.
- **Surface:** Slightly lighter layers (Slate 900/800) to distinguish cards and sections.
- **Typography:** High contrast text (Slate 50/100) for readability. Muted text (Slate 400) for metadata.
- **Accents:** Subtle, professional usage of Indigo or Emerald to denote "Tech/AI" without looking generic sci-fi.
  - *Avoid:* Neon matrix green or cyber-punk aesthetic. Keep it clean and editorial.

### Typography
- **Headings:** Sans-serif, bold, tight tracking. Modern and digital. (e.g., Inter, Plus Jakarta Sans).
- **Body:** Highly readable sans-serif with good line height (1.6+).
- **Monospace:** Use sparingly for technical terms, file paths, or "code" concepts to reinforce the engineering identity.

### Layout & Spacing
- **Container:** Centered, max-width (e.g., `max-w-4xl`) for optimal reading length.
- **Vertical Rhythm:** Generous padding between sections (`py-20` or `py-24`) to give content room to breathe.
- **Grid Systems:** Use CSS Grid for the Tech Stack and Expertise cards to ensure responsiveness.

## 4. Section Design Specifications
*Content source: `concept/content.md`*

### 1. Hero Section
- **Goal:** Impact & Introduction.
- **Layout:**
  - **Desktop:** Split layout or centered with max-width.
  - **Mobile:** Vertically stacked. Image first (or top of text), followed by Name, Title, and CTA.
- **Elements:**
  - Professional Headshot (Circle or Rounded Rect).
  - Name & Title (H1).
  - "The Shift" Hook (Subtext).
  - CTA: "Read about The Shift" (Scroll anchor) — *min-height 44px for touch targets*.
- **Vibe:** Clean, focused. No background video or distractions.

### 2. "The Shift" (Concept Section)
- **Goal:** Thought Leadership. This is the differentiator.
- **Design:** Editorial style.
- **Typography:** Larger body text.
  - **Mobile:** Ensure readable line length and font size (min 16px).
- **Visuals:** Use icons or simple diagrams to illustrate the "3 Pillars" (Code, Engineers, Tests).
  - **Mobile:** Stack pillars vertically.

### 3. About & Expertise
- **Goal:** Personal Context & Professional Focus.
- **Layout:**
  - **About:** Text block with "Focus Areas" as bullet points.
  - **Expertise:** Grid of cards.
    - **Desktop:** 2 or 3 columns.
    - **Mobile:** Single column grid. Cards take full width.
- **Component:** `SpotlightCard` for Expertise areas. Subtle lighting effect on hover (desktop) / active state (mobile).

### 4. Technical Foundation (Tech Stack)
- **Goal:** Show breadth and depth.
- **Design:** Categorized lists or tags.
- **Interaction:**
  - Categories (Frontend, Backend, AI, etc.) clearly separated.
  - **Mobile:** Categories stack vertically. Consider simple accordions if content length is excessive, otherwise keep expanded for scannability.
  - Tags/Badges for individual technologies (wrap naturally).

### 5. Professional Journey (Timeline)
- **Goal:** Career narrative.
- **Design:** Vertical timeline with connecting line.
- **Layout:**
  - **Desktop:** Alternating left/right or consistent left-aligned content with timeline on left.
  - **Mobile:** Content strictly on one side of the line (or remove line and use simple vertical list with clear headers) to maximize horizontal space for text.
- **Visuals:**
  - Distinct markers for different eras.

### 6. Footer & Contact
- **Goal:** Connection.
- **Design:** Minimalist.
- **Elements:**
  - Social Links.
  - Copyright.
  - **Mobile:** Stack links vertically or use a large touch-friendly horizontal row. Ensure >48px spacing between tap targets.

## 5. Interaction & Motion Strategy
*Library: Framer Motion*

- **Entrance Animations:** Sections fade in and slide up (`y: 20 -> 0`, `opacity: 0 -> 1`) as user scrolls. Stagger children for lists/grids.
  - **Mobile:** Reduce motion distance or disable complex staggers if they impact performance or scroll feel.
- **Micro-interactions:**
  - Buttons: Scale down slightly on click (`0.95`).
  - Links: Underline expansion or color shift.
  - Cards: `Spotlight` effect (mouse tracking gradient).
    - **Mobile:** Fallback to simple border highlight or subtle background tint on tap.
- **Scroll:** Smooth scroll behavior for navigation links.

## 6. Implementation Notes
- **Tech Stack:** Vite + React + TypeScript + Tailwind v4.
- **Accessibility (A11y):**
  - Semantic HTML (`<section>`, `<article>`, `<nav>`).
  - Focus rings visible for keyboard navigation.
  - ARIA labels for icon-only buttons (social links, theme toggle).
  - **Mobile:** Ensure no horizontal scrolling (overflow-x: hidden).
- **Responsive:** Mobile-first approach.
  - **Navigation:** Hamburger menu opening a slide-out drawer or full-screen overlay for mobile.
  - **Spacing:** Adjust section padding: `py-20` (Desktop) -> `py-12` (Mobile).
  - **Typography:** Fluid typography (clamp) or adjusted font sizes for headings to prevent wrapping/orphans on small screens.
