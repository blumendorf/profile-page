# Design Concept — "The Engineer's Notebook"

## 1. Design Philosophy

**Core Concept:** A warm, personal, slightly playful design that feels like looking at an engineer's well-organized workspace. Not corporate tech. Not startup hype. An individual who builds things.

**Personality Traits to Reflect:**
- **Grounded:** PhD → startups → village life with chickens
- **Adventurous:** World traveler, ski instructor, mountain biker
- **Pragmatic:** "AI is like a junior developer who reads a lot but knows nothing about your product"
- **Builder:** Thrives in greenfield projects, prefers creating over maintaining

**Design Principles:**
1. **Clear & Scannable:** Single-column focus, generous whitespace, obvious hierarchy
2. **Technical:** Monospace accents, terminal-inspired elements, code-like structures
3. **Playful:** Warm colors, personality peeks through, not corporate stiff
4. **One Fancy Highlight:** Terminal typing animation in the hero

---

## 2. Visual Identity

### Color Palette

**Theme:** Warm earth tones + amber accent. Feels like a coffee-stained notebook, not a sterile SaaS dashboard.

```css
/* Dark Mode (Default) */
--bg-page: #1a1814;        /* Warm charcoal */
--bg-card: #242019;        /* Lighter charcoal */
--bg-surface: #2e2a24;     /* Surface for cards */

--accent-primary: #f59e0b; /* Amber - warm, inviting */
--accent-secondary: #78716c; /* Stone gray */

--text-primary: #fafaf9;   /* Stone 50 */
--text-secondary: #d6d3d1; /* Stone 300 */
--text-muted: #a8a29e;     /* Stone 400 */

--border-subtle: #44403c;  /* Stone 700 */
--border-active: #57534e;  /* Stone 600 */

/* Light Mode */
--bg-page: #fafaf9;        /* Stone 50 */
--bg-card: #ffffff;
--bg-surface: #f5f5f4;     /* Stone 100 */

--text-primary: #1c1917;   /* Stone 900 */
--text-secondary: #44403c; /* Stone 700 */
--text-muted: #78716c;     /* Stone 500 */
```

### Typography

**Font Stack:**
- **Headings:** `JetBrains Mono` or similar monospace — technical, distinctive
- **Body:** System sans-serif (Inter fallback) — readable, clean
- **Code/Accents:** `JetBrains Mono` — consistency with headings

**Hierarchy:**
- Hero name: Large, monospace, bold
- Section headings: Monospace, uppercase tracking
- Body: Sans-serif, comfortable reading size
- Labels/Metadata: Small monospace

### Layout

**Structure:**
- Max-width: 720px for text-heavy sections (optimal reading)
- Full-width: Hero only
- Generous vertical rhythm: `py-24` between sections
- Mobile-first, single column

---

## 3. The Fancy Highlight: Terminal Hero

The hero features an **animated terminal/code block** that types out a "config file" about Marco. This is:
- **Technical:** Looks like actual code
- **Playful:** Reveals personality in an unexpected way
- **Memorable:** Different from typical portfolio heroes

### Terminal Content

```typescript
// marco.config.ts
export default {
  name: "Marco Blumendorf",
  title: "Director of Software Engineering",
  location: "Village near Neuruppin 🐔",

  current: {
    company: "CHAPTR",
    product: "reedy.ai",
    focus: ["AI in Publishing", "Developer Experience"]
  },

  background: {
    phd: "Adaptive UI & Distributed AI",
    experience: "20+ years",
    superpower: "Greenfield projects"
  },

  philosophy: "AI is like a junior developer who reads a lot but knows nothing about your product."
}
```

**Animation:**
- Types character by character with realistic timing
- Slight randomness in typing speed
- Cursor blinks at end
- Optional: syntax highlighting (amber for strings, muted for structure)

---

## 4. Section Specifications

### 4.1 Navbar

**Approach:** Minimal, almost invisible. Let the content speak.

**Elements:**
- Logo: `marco.` in monospace (or just `M.`)
- Links: Text only, horizontal on desktop, hamburger on mobile
- Theme toggle: Simple sun/moon icon

**Behavior:**
- Transparent by default
- Subtle background blur on scroll
- No heavy borders

### 4.2 Hero Section

**Layout:**
- Full viewport height
- Terminal block centered
- Name/title above terminal (or integrated into terminal content)
- Subtle scroll indicator at bottom

**No photo** — the terminal IS the visual interest. (Or small photo in corner if desired)

### 4.3 About Section

**Heading:** "The Shift" (no change in topic, cleaner presentation)

**Layout:**
- Two paragraphs of thesis text
- Three pillars as simple cards (no heavy effects)
- Closing quote with left border accent
- Personal background below with clear separator

**Style:**
- Cards have very subtle borders, amber accent on hover
- Pull quote styled differently (larger, italic, border-left)

### 4.4 Expertise Section

**Heading:** Simple, left-aligned

**Layout:**
- Three cards in a row (stack on mobile)
- Icon + title + description
- Hover: subtle amber glow

**Style:**
- No heavy spotlight effects
- Clean, scannable

### 4.5 Tech Stack Section

**Heading:** `// technical-foundation`

**Layout:**
- Categories as collapsible sections or simple grid
- Tags/pills for technologies
- Monospace category labels

**Style:**
- Minimal borders
- Tags: outlined style, amber fill on hover

### 4.6 Timeline Section

**Heading:** `// journey`

**Layout:**
- Simple vertical list (no alternating left/right on desktop)
- Year on left, content on right
- Connecting line between entries

**Style:**
- Clean, easy to scan
- Current role (CHAPTR) highlighted with amber accent

### 4.7 Contact Section

**Heading:** `// connect`

**Layout:**
- Centered text
- Three buttons: Email, LinkedIn, GitHub
- Simple, clear CTAs

**Style:**
- Primary button (Email) in amber
- Secondary buttons outlined

### 4.8 Footer

**Minimal:**
- Copyright text only
- Optional: Privacy link

---

## 5. Motion Strategy

**Philosophy:** Subtle, purposeful. Not distracting.

**Hero Terminal:**
- Character-by-character typing animation
- Cursor blink effect
- This is the ONE showy animation

**Sections:**
- Fade in on scroll (opacity only, minimal y-movement)
- Stagger children slightly

**Interactions:**
- Buttons: scale(0.98) on click
- Links: underline expansion
- Cards: subtle border color change on hover

**ShineCard Component:**
- Reusable card with animated "shine" border effect
- Uses CSS pseudo-element with inset box-shadow
- Masked at an angle with linear-gradient for subtle highlight
- Pointer tracking rotates the shine angle based on mouse position
- Falls back to static angle when pointer leaves
- Supports `corner-shape: squircle` for modern browsers
- Light/dark mode variants with appropriate shadow intensity

**Reduce Motion:**
- Respect `prefers-reduced-motion`
- Static terminal for accessibility

---

## 6. Accessibility

- Semantic HTML throughout
- Focus rings on all interactive elements
- Sufficient color contrast (test amber on both themes)
- Keyboard navigable
- Screen reader friendly (terminal has aria-label describing content)

---

## 7. Implementation Notes

### Dependencies
- Keep Motion library for animations
- Add `JetBrains Mono` via Google Fonts or self-host
- Consider `react-type-animation` or custom hook for terminal effect

### Performance
- Terminal animation should not block interaction
- Lazy load sections below the fold
- No heavy background effects

### Mobile
- Terminal scales down nicely
- Single column throughout
- Touch-friendly tap targets

---

## 8. What Makes This Design Different

| Old Design | New Design |
|------------|------------|
| Cold cyan/blue tech aesthetic | Warm amber/stone palette |
| Spotlight cards with mouse tracking | Clean cards with subtle hover |
| Corporate "Director" feel | Personal "builder/engineer" feel |
| Generic hero layout | Unique terminal typing animation |
| Heavy glassmorphism | Minimal, paper-like texture |
| Dense information | Generous breathing room |

---

## 9. Mood References

- **Raycast** — Clean, dark, monospace headings
- **Linear** — Generous spacing, purposeful motion
- **Stripe docs** — Readable, well-organized
- **Personal blogs of senior engineers** — Authentic, not polished to death
