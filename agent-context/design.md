# Design Concept - "The Engineer's Notebook"

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
4. **Interactive Highlights:** Mouse-responsive elements (hero ring, contact shine borders)

---

## 2. Visual Identity

### Color Palette

**Theme:** Warm earth tones + amber accent. Dark mode only. Feels like a coffee-stained notebook, not a sterile SaaS dashboard.

```css
/* Dark Mode */
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
```

### Typography

**Font Stack:**
- **Headings:** `JetBrains Mono` or similar monospace - technical, distinctive
- **Body:** System sans-serif (Inter fallback) - readable, clean
- **Code/Accents:** `JetBrains Mono` - consistency with headings

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

## 3. The Fancy Highlight: Interactive Profile Ring

The hero features an **interactive animated ring** around the profile image. This is:
- **Technical:** Uses conic gradients and pointer tracking
- **Playful:** Responds to mouse movement in a satisfying way
- **Memorable:** Creates an engaging focal point without being overwhelming

### Ring Behavior

**Default State:**
- Conic gradient ring (`transparent → amber → transparent`)
- Auto-rotates with 8-second CSS animation (`animate-spin-slow`)
- Creates subtle ambient movement

**On Hover:**
- Animation pauses
- Gradient position follows mouse cursor around the ring
- Uses `atan2` to calculate angle from center to pointer
- Updates `--ring-angle` CSS variable in real-time

**On Leave:**
- Saves current angle as base for animation
- Animation resumes from saved position (seamless transition)
- No jarring reset to 0°

### Implementation Notes

- Uses `useRef` to track current angle between states
- Pointer events on outer container, image has `pointer-events-none`
- Ring is composed of two layers:
  1. Outer div with conic-gradient
  2. Inner div with `bg-page` to create the ring shape

---

## 4. Section Specifications

### 4.1 Navbar

**Approach:** Minimal, almost invisible. Let the content speak.

**Elements:**
- Logo: `Dr Marco Blumendorf.` in monospace (amber accent on period)
- Links: Text only, horizontal on desktop, hamburger on mobile
- JSON Mode toggle: `JSON` / `{JSON}` button to switch views

**Behavior:**
- Transparent by default
- Subtle background blur on scroll
- No heavy borders
- Logo hidden when at hero section (slides out with opacity)
- Active section highlighted with accent color
- In JSON mode, nav links focus the corresponding section in JSON view

### 4.2 Hero Section

**Layout:**
- Full viewport min-height (centers content)
- Column layout on mobile, row on desktop (md breakpoint)
- Profile image with interactive ring on left/top
- Name, title, headline, tags, CTA on right/bottom
- Subtle scroll indicator line at bottom

**Elements:**
- **Profile Image:** 40x48 (sm) circular, border-subtle
- **Name:** Large heading (4xl → 6xl), semibold tracking-tight
- **Title:** Amber monospace, font-medium
- **Headline:** Body text, max-w-lg, text-balance
- **Tags:** Badge pills (`Engineering`, `Leadership`, `AI first`)
- **CTA:** "Learn more" button with ArrowDown icon

**Profile Image Ring:**
- See Section 3 for detailed behavior
- Outer ring with amber conic gradient
- Auto-spins, pauses on hover, tracks pointer

### 4.3 About Section

**Heading:** "About Me"

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
- Two-column grid (text left, buttons right on desktop)
- "Things I like talking about" list with accent border
- Three contact cards: Email, LinkedIn, GitHub

**Style:**
- All three cards have consistent icon styling (muted → accent on hover)
- Yellow shine border effect on hover using `useShineEffect` hook
- Shine follows mouse position around the card border
- Subtle amber border color transition on hover

### 4.8 Footer

**Minimal:**
- Copyright text only
- Optional: Privacy link

### 4.9 JSON View (Developer Easter Egg)

**Purpose:** A playful, developer-friendly alternative view that exposes the site's data structure as an interactive JSON API response. Reflects the "engineer's notebook" theme-showing that this is a site built by someone who thinks in data structures.

**Toggle:**
- `JSON` button in navbar (both desktop and mobile)
- Button text changes to `{JSON}` when active (amber background)
- Toggles between "Human" view and JSON view
- Footer hidden in JSON mode

**Layout:**
- Full dark IDE-style background (`#1e1e1e`)
- Mimics API response viewer
- Header shows: HTTP method (GET), endpoint path, status code, content-type
- Action bar with copy buttons (curl, URL, JSON)
- Interactive JSON tree below

**JSON Tree Features:**
- Collapsible/expandable objects and arrays
- Click to toggle expansion
- Chevron icons indicate expand/collapse state
- Syntax highlighting:
  - Keys: stone-300 (light gray)
  - Strings: amber-300 (warm yellow)
  - Numbers: blue-400
  - Booleans: purple-400
  - Null: stone-500 (muted)
- Hover state shows subtle white/5 background
- Preview text for collapsed objects (`{name, title, ...}`)
- Preview text for collapsed arrays (`[3 items]`)

**Section Focus:**
- Nav links in JSON mode focus corresponding JSON section
- Focused section highlighted with amber left border
- Other top-level sections collapse when one is focused
- Focused section key displayed in amber badge in action bar
- Focus clears when toggling JSON mode off

**API Endpoint:**
- Profile data exposed at `/api/v1/profile.json`
- Copy buttons provide:
  - Full curl command
  - Direct URL
  - Raw JSON content

**Style:**
- Monospace font throughout (`font-mono`)
- Dark terminal aesthetic
- Rounded container with stone-800 border
- Help text at bottom: "Click on objects to expand/collapse"

---

## 5. Motion Strategy

**Philosophy:** Subtle, purposeful. Not distracting.

**Hero Ring:**
- Conic gradient rotation animation (8s duration)
- Pointer-tracking on hover (seamless angle transitions)
- This is the ONE showy interaction

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

**useShineEffect Hook:**
- Reusable hook for mouse-tracking shine effects
- Calculates angle from element center to pointer position
- Updates `--shine-angle` CSS variable in real-time
- Used by contact cards for yellow shine border effect

**Yellow Shine Border (`.shine-border-yellow`):**
- CSS class for amber/yellow shine border on hover
- Uses inset box-shadow with `hsl(45 100% 50%)` (golden yellow)
- Masked gradient creates the moving shine sweep
- Opacity transitions from 0 to 1 on hover
- Circular variant (`.shine-border-yellow-circle`) for round elements

**Hero Ring Interaction:**
- Conic gradient ring around profile image
- Uses `--ring-angle` CSS variable for position
- Toggles between CSS animation and mouse-tracked position
- Saves angle on leave to resume animation seamlessly

**NetworkBackground:**
- Canvas-based animated constellation/network effect
- Fixed position, behind all content (`z-0`, `pointer-events-none`)
- Nodes drift slowly with velocity-based movement
- Lines connect nearby nodes (within `connectionDistance`)
- Mouse proximity creates amber highlight connections
- Nodes gently repelled when mouse is very close
- Dark mode optimized colors
- Hidden in JSON mode (performance optimization)

**Reduce Motion:**
- Respect `prefers-reduced-motion`
- Disable ring animation and background for accessibility

---

## 6. Accessibility

- Semantic HTML throughout
- Focus rings on all interactive elements
- Sufficient color contrast (amber on dark theme)
- Keyboard navigable
- Screen reader friendly (ARIA labels on interactive elements)
- JSON view is keyboard-navigable (collapsible nodes)
- NetworkBackground has `aria-hidden="true"`

---

## 7. Implementation Notes

### Dependencies
- Motion library (framer-motion) for animations
- `JetBrains Mono` via Google Fonts
- Lucide React for icons

### Performance
- JSON view is a simple toggle, no heavy re-renders
- Profile data loaded from local JSON (no API calls)
- No heavy background effects
- NetworkBackground component for ambient visual interest

### Mobile
- Single column throughout
- Touch-friendly tap targets
- JSON mode button accessible in mobile nav
- JSON tree fully scrollable and interactive

### Data Architecture
- Site data centralized in `src/data/profile.json`
- Same data exposed at `/api/v1/profile.json` (public)
- TypeScript types inferred from JSON structure
- `siteData` export used throughout components

---

## 8. What Makes This Design Different

| Old Design | New Design |
|------------|------------|
| Cold cyan/blue tech aesthetic | Warm amber/stone palette |
| Spotlight cards with mouse tracking | Clean cards with subtle hover + shine borders |
| Corporate "Director" feel | Personal "builder/engineer" feel |
| Generic hero layout | Interactive profile ring + clean layout |
| Heavy glassmorphism | Minimal, paper-like texture |
| Dense information | Generous breathing room |
| Static decorative elements | Mouse-responsive interactions (ring, shine borders) |
| Single view mode | Dual view: Human + JSON API mode |

---

## 9. Mood References

- **Raycast** - Clean, dark, monospace headings
- **Linear** - Generous spacing, purposeful motion
- **Stripe docs** - Readable, well-organized
- **Personal blogs of senior engineers** - Authentic, not polished to death
