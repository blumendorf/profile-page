---
version: alpha
name: Engineer's Notebook
description: A warm dark personal engineering site with amber accents, monospace structure, quiet technical motion, and notebook-like restraint.
colors:
  primary: "#f59e0b"
  primary-hover: "#fbbf24"
  on-primary: "#1a1814"
  secondary: "#78716c"
  neutral: "#d6d3d1"
  background: "#1a1814"
  on-background: "#fafaf9"
  surface: "#242019"
  surface-container: "#2e2a24"
  surface-container-high: "#3a342c"
  on-surface: "#fafaf9"
  on-surface-variant: "#d6d3d1"
  text-primary: "#fafaf9"
  text-secondary: "#d6d3d1"
  text-muted: "#a8a29e"
  outline: "#44403c"
  outline-variant: "#57534e"
  inverse-surface: "#fafaf9"
  inverse-on-surface: "#1a1814"
  terminal-background: "#1e1e1e"
  terminal-surface: "#27272a"
  terminal-outline: "#27272a"
  syntax-key: "#d6d3d1"
  syntax-string: "#fcd34d"
  syntax-number: "#60a5fa"
  syntax-boolean: "#c084fc"
  syntax-null: "#78716c"
  lab-cyan: "#06b6d4"
  lab-green: "#22c55e"
  lab-purple: "#a855f7"
  success: "#34d399"
  warning: "#f59e0b"
  error: "#f87171"
typography:
  display-lg:
    fontFamily: JetBrains Mono
    fontSize: 56px
    fontWeight: "600"
    lineHeight: 60px
    letterSpacing: -0.02em
  display-md:
    fontFamily: JetBrains Mono
    fontSize: 48px
    fontWeight: "600"
    lineHeight: 53px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: JetBrains Mono
    fontSize: 32px
    fontWeight: "600"
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: "500"
    lineHeight: 27px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "500"
    lineHeight: 26px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 30px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 26px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 22px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: "500"
    lineHeight: 20px
    letterSpacing: 0em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
    letterSpacing: 0.08em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 14px
    letterSpacing: 0.12em
spacing:
  base: 8px
  "0": 0px
  "0-5": 2px
  "1": 4px
  "1-5": 6px
  "2": 8px
  "2-5": 10px
  "3": 12px
  "4": 16px
  "5": 20px
  "6": 24px
  "8": 32px
  "10": 40px
  "12": 48px
  "16": 64px
  "20": 80px
  "24": 96px
  "28": 112px
  page-gutter: 24px
  page-gutter-wide: 32px
  content-measure: 768px
  content-wide: 1024px
  hero-content-wide: 896px
  section-padding-mobile: 80px
  section-padding-desktop: 112px
  card-padding: 24px
  card-gap: 16px
  grid-gap: 24px
rounded:
  none: 0px
  sm: 2px
  md: 6px
  lg: 8px
  xl: 12px
  squircle: 16px
  full: 9999px
radii:
  none: 0px
  sm: 2px
  md: 6px
  lg: 8px
  xl: 12px
  squircle: 16px
  full: 9999px
shadows:
  none: "none"
  nav: "0 1px 0 #44403c"
  card-hover: "0 0 0 1px #f59e0b"
  amber-glow: "0 0 8px #f59e0b"
  divider-handle: "0 2px 8px #000000"
  elevated-panel: "0 25px 50px #000000"
  focus-ring: "0 0 0 2px #f59e0b"
elevation:
  base:
    backgroundColor: "{colors.background}"
    shadow: "{shadows.none}"
  raised-card:
    backgroundColor: "{colors.surface}"
    shadow: "{shadows.none}"
  interactive-card:
    backgroundColor: "{colors.surface}"
    shadow: "{shadows.card-hover}"
  overlay:
    backgroundColor: "{colors.background}"
    shadow: "{shadows.elevated-panel}"
motion:
  duration-instant: 0ms
  duration-fast: 150ms
  duration-normal: 200ms
  duration-slow: 300ms
  duration-enter: 500ms
  duration-hero: 600ms
  duration-ring-spin: 8000ms
  duration-loader-spin: 1000ms
  ease-standard: ease-out
  ease-emphasized: cubic-bezier(0.16, 1, 0.3, 1)
  scale-pressed: "0.98"
  fade-offset: 10px
  reduced-motion-duration: 0.01ms
components:
  page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
  section:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-secondary}"
    padding: "{spacing.section-padding-desktop}"
  surface-band:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.text-secondary}"
  card-standard:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-padding}"
  card-interactive:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card-padding}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    padding: 10px 20px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    padding: 10px 20px
  badge:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 6px 12px
  nav-link:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-muted}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 6px 12px
  nav-link-active:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    typography: "{typography.body-sm}"
  json-toggle:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-muted}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.md}"
    padding: 4px 8px
  json-toggle-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  terminal-panel:
    backgroundColor: "{colors.terminal-background}"
    textColor: "{colors.syntax-key}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    padding: "{spacing.4}"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 12px 16px
  muted-metadata:
    textColor: "{colors.secondary}"
    typography: "{typography.label-sm}"
  neutral-body:
    textColor: "{colors.neutral}"
    typography: "{typography.body-md}"
  background-copy:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-background}"
    typography: "{typography.body-md}"
  elevated-surface:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-padding}"
  tonal-surface:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.lg}"
    padding: "{spacing.4}"
  subtle-divider:
    backgroundColor: "{colors.outline}"
    height: 1px
  active-divider:
    backgroundColor: "{colors.outline-variant}"
    height: 1px
  inverse-mark:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.inverse-on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 2px 6px
  terminal-toolbar:
    backgroundColor: "{colors.terminal-surface}"
    textColor: "{colors.text-muted}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 4px 8px
  terminal-rule:
    backgroundColor: "{colors.terminal-outline}"
    height: 1px
  json-key:
    textColor: "{colors.syntax-key}"
    typography: "{typography.label-md}"
  json-string:
    textColor: "{colors.syntax-string}"
    typography: "{typography.label-md}"
  json-number:
    textColor: "{colors.syntax-number}"
    typography: "{typography.label-md}"
  json-boolean:
    textColor: "{colors.syntax-boolean}"
    typography: "{typography.label-md}"
  json-null:
    textColor: "{colors.syntax-null}"
    typography: "{typography.label-md}"
  lab-cyan-accent:
    textColor: "{colors.lab-cyan}"
    typography: "{typography.label-sm}"
  lab-green-accent:
    textColor: "{colors.lab-green}"
    typography: "{typography.label-sm}"
  lab-purple-accent:
    textColor: "{colors.lab-purple}"
    typography: "{typography.label-sm}"
  status-success:
    textColor: "{colors.success}"
    typography: "{typography.label-sm}"
  status-warning:
    textColor: "{colors.warning}"
    typography: "{typography.label-sm}"
  status-error:
    textColor: "{colors.error}"
    typography: "{typography.label-sm}"
---

## Overview

The visual identity is a warm, dark engineer's notebook: personal, precise, and quietly interactive. It should feel like a senior engineer's well-organized workspace rather than a corporate portfolio or a glossy SaaS landing page.

The dominant mood is grounded and thoughtful. Warm charcoal surfaces, muted stone text, amber highlights, and monospace headings create a technical atmosphere without turning the page into a cold terminal. Motion and interactivity are present, but they are restrained and purposeful: the interface should reward attention without feeling busy.

The system has two complementary modes. The primary mode is a narrative profile with generous spacing and readable sections. The secondary mode is a developer-flavored structured data view, using the same amber and stone palette inside a darker editor-like surface.

## Colors

The palette is dark-only and warm. Avoid pure black as the page foundation; use warm charcoal so the experience feels more like paper, coffee, and low light than a generic dashboard.

- **Primary amber (#f59e0b):** Use for primary actions, active navigation, section labels, key icons, timeline emphasis, and focused structured-data highlights.
- **Warm charcoal background (#1a1814):** The page foundation. It should be visible between content blocks and behind the ambient network.
- **Card brown-black (#242019):** The default container fill for cards, badges, panels, and controls.
- **Surface clay (#2e2a24):** A slightly lighter layer for badges, icon wells, hover fills, and section bands.
- **Stone text:** Use near-white for headings, stone-300 for body copy, and stone-400 for metadata and secondary affordances.
- **Lab accents:** Cyan, green, and purple may appear in experimental tooling, but they are secondary to the core amber identity. They should mark experiment categories or technical states, not replace the primary brand accent.
- **Terminal colors:** The structured data view uses a colder near-black editor background with amber strings, stone keys, blue numbers, purple booleans, and muted null values.

## Typography

Typography carries most of the personality. Headings and labels use JetBrains Mono to make the site feel technical and authored. Body text uses Inter for readability and a softer reading rhythm.

- **Large headings:** Use monospace, semibold, tight tracking, and compact line-height. They should feel deliberate and slightly mechanical, not decorative.
- **Section labels:** Use small uppercase monospace with wide tracking and amber color. The labels may use code-comment language such as slashes or short technical markers.
- **Body copy:** Use a comfortable sans-serif with generous line-height. Long paragraphs should feel calm and readable.
- **Metadata and chips:** Use monospace at small sizes. This gives tags, dates, technical categories, and structured data a consistent engineered character.
- **Avoid ornate typography:** No serif display faces, no ultra-thin weights, no oversized marketing-style gradients in text.

## Layout

The layout is single-column first, centered, and intentionally spacious. Most narrative sections should stay within a readable measure of about 768px, while dense card grids may expand to about 1024px.

Use generous vertical rhythm. Sections need enough space to feel like separate notebook entries, with 80px vertical padding on small screens and about 112px on larger screens. Content should breathe; do not compress paragraphs, cards, and labels into a dense dashboard.

The hero is the widest and most expressive composition. It pairs a portrait focal point with a text block, switching from stacked mobile layout to side-by-side desktop layout. The rest of the page becomes quieter and more linear.

The ambient network should sit behind the content as a low-contrast layer. It is atmosphere, not decoration that competes with reading.

## Elevation & Depth

Depth is created through tonal layering, borders, and subtle glows rather than heavy shadows. The base page is warm charcoal, cards sit one level above on a slightly lighter brown-black surface, and active or hover states are expressed by border changes or a thin amber glow.

Shadows should be rare. Use them for overlays, draggable handles, focus depth, or a small amber glow around a current timeline dot. Cards should usually remain flat, with a 1px border doing most of the separation work.

The structured data view is the deepest visual layer: a darker editor-like panel, a contained border, and a soft large shadow. It should feel like a tool view placed on top of the same underlying identity.

## Shapes

The shape language is modestly rounded. Standard buttons and cards use small to medium radii, while pills and portrait rings use fully rounded geometry.

Use sharper small radii for technical controls and labels, and slightly larger radii for cards that need to feel approachable. Where supported, interactive shine cards may use a subtle squircle feel, but the overall system should not become bubbly or playful.

Line work should be thin and precise: 1px borders for cards, section dividers, and terminal panels; 2px borders only for focal elements like the portrait ring, timeline dots, or draggable handles.

## Components

### Navigation

Navigation is minimal and almost invisible at rest. It becomes a softly blurred sticky bar after scrolling, with a thin lower border. The site name appears only after the hero has passed and uses a small amber period as a signature mark.

Active navigation uses amber text. Inactive links stay muted stone and become brighter on hover. The JSON toggle is intentionally small, squared-off, and monospace so it reads as a developer control rather than a marketing CTA.

### Hero

The hero should be the one memorable visual moment. The portrait sits inside an amber conic ring that rotates slowly and responds to pointer movement. The ring is expressive but still thin enough to feel engineered.

Hero text uses a large stacked monospace name, an amber monospace title, readable body copy, muted technical badges, and a single amber primary action. Keep the composition calm: one portrait, one title block, one action.

### Cards And Badges

Cards use warm dark surfaces, thin stone borders, and restrained hover feedback. Interactive cards may show a subtle shine border or amber outline, but do not add strong drop shadows or large transforms.

Badges are compact, monospace, and slightly inset. Their role is metadata, not decoration. On hover-capable devices, badges may shift toward amber, but they should stay quiet by default.

### Timeline

The timeline is a simple vertical list with a thin muted connector and small dots. The current role is emphasized with amber border and glow. Avoid alternating timelines, large date blocks, or anything that interrupts scanning.

### Contact And Lab Tools

Contact rows use the same border-and-surface system as cards, with icons moving from muted to amber on hover. Lab tools may introduce cyan, green, or purple category accents, but their containers, spacing, typography, and borders should remain consistent with the main site.

### Structured Data View

The structured data view should feel like an API response inspector. Use an editor-dark background, monospace everywhere, syntax-colored values, compact copy buttons, collapsible indentation, and amber focus highlights. Keep it functional and legible, not neon or game-like.

### Motion And Interaction

Motion should be subtle and purposeful. Use short 150ms to 300ms transitions for hover states, 500ms fade-ins for section entry, and a 600ms emphasized ease for the hero entrance. The portrait ring is the one slow ambient animation, rotating over 8 seconds.

Respect reduced-motion preferences by reducing animation and transition duration to near-zero. The ambient network and decorative motion should never be required to understand or use the interface.

## Do's and Don'ts

- Do keep the dark palette warm, muted, and low-glare.
- Do use amber as the main thread through actions, labels, active states, and highlights.
- Do preserve generous vertical spacing and readable line lengths.
- Do use monospace for headings, labels, metadata, and structured data.
- Do let borders and tonal contrast create most of the hierarchy.
- Do keep motion small, slow where ambient, and quick where interactive.
- Don't introduce bright blue or cyan as the primary brand color outside experiment-specific contexts.
- Don't use heavy glassmorphism, strong drop shadows, or glossy gradients.
- Don't overcrowd sections with dense grids or decorative UI chrome.
- Don't replace body copy with monospace; it should remain readable sans-serif.
- Don't add more showpiece interactions that compete with the portrait ring or structured data mode.
