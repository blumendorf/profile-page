# Generative UI & Ephemeral Interfaces - Concept for Profile Page

**Created:** December 31, 2024
**Reference:** [Generative UI and the Ephemeral Interface](https://rogerwong.me/2025/11/generative-ui-and-the-ephemeral-interface/) by Roger Wong

---

## Executive Summary

This document explores how the emerging paradigm of **Generative UI** and **Ephemeral Interfaces** could be applied to Marco Blumendorf's profile page. The timing is particularly apt: Marco's PhD research at TU-Berlin focused on adaptive user interfaces across devices and modalities-what was then called "multimodal interaction" is now closer to what we call "generative UI."

The core insight from Roger Wong's analysis: the valuable application of generative UI is not changing the "chrome" (navigation, layout structure) but generating **content experiences** dynamically. For a profile page, this means creating interactive, contextual, and personalized presentations of professional information while maintaining the stable, navigable structure visitors expect.

---

## Key Concepts from the Article

### What Is Generative UI?

From NN/g's definition:
> A generative UI (genUI) is a user interface that is dynamically generated in real time by artificial intelligence to provide an experience customized to fit the user's needs and context.

### The Critical Distinction: Chrome vs. Content

The article identifies that Google Gemini's successful approach generates **content** UI, not **chrome** UI:

| Type | Description | Example |
|------|-------------|---------|
| **Chrome UI** | Navigation, layout structure, app shell | Navbar, footer, section order |
| **Content UI** | Information presentation within the shell | How tech stack is visualized, how timeline is rendered |

Changing chrome creates usability problems (violates Nielsen's consistency heuristic). Generating content creates delight and personalization.

### Ephemeral = Temporary, Contextual

These generated interfaces are not persistent-they're created for a specific user, query, or moment. Like a New York Times interactive data visualization, they exist to communicate a specific idea, then fade away.

---

## Why This Fits Marco's Profile

### 1. Direct Academic Connection

Marco's PhD research was literally on adaptive user interfaces:

> "I spent over a decade at TU-Berlin researching how to build adaptive user interfaces-systems that work across phones, tablets, smart homes, and respond to voice, touch, gestures. We called it multimodal interaction. Today, it's closer to what people mean by generative UI."

A profile page that demonstrates these concepts isn't just a portfolio-it's a **living proof of expertise**.

### 2. Current Work Relevance

At CHAPTR, Marco builds AI products. The profile page could showcase the same principles applied to personal presence: AI-enhanced presentation of professional information.

### 3. Philosophy Alignment

Marco's thesis: "AI is the next level of abstraction in software development." A generatively-enhanced profile page embodies this philosophy.

---

## Proposed Applications

### Tier 1: Low-Risk, High-Value (Near-Term)

These applications maintain the stable structure but add dynamic content presentation.

#### 1.1 Contextual Tech Stack Visualization

**Current:** Static grid of technology pills organized by category.

**Generative Approach:**
- Detect visitor context (referrer, time on page, scroll behavior)
- For a visitor from LinkedIn with "React" in their profile → expand Frontend section, show code samples
- For a visitor from an academic publication → emphasize AI/ML tools, connect to research background
- Generate an interactive diagram showing how the technologies relate in Marco's actual projects

**Implementation Sketch:**
```typescript
interface VisitorContext {
  referrer: string;
  scrollDepth: number;
  dwellTime: Record<string, number>;
  preferredTheme: 'light' | 'dark';
}

const TechStackView = ({ context }: { context: VisitorContext }) => {
  const presentation = generatePresentation(context, siteData.techStack);
  // Returns: prioritized categories, expanded sections, visualization type
  return <DynamicTechViz {...presentation} />;
};
```

#### 1.2 Timeline Depth Control

**Current:** Fixed timeline entries with consistent detail level.

**Generative Approach:**
- Surface-level summary for casual visitors (badges, years, key highlights)
- On hover/tap, generate expanded narratives for interested visitors
- "Tell me more about yetu" → AI-generated contextual expansion using background data
- Progressive disclosure: brief → detailed → story-form

**Interaction Pattern:**
```
User hovers on "smartB"
↓
System generates: "At smartB, Marco raised funding as CTO,
building an IoT platform for commercial energy management.
This was his first time leading a company's technical strategy
while also managing investor relationships..."
↓
Ephemeral: disappears on mouse leave, regenerated fresh next time
```

#### 1.3 Dynamic Quote Selection

**Current:** Single static quote.

**Generative Approach:**
- Pool of Marco's quotes from interview, blog posts, talks
- Select/generate contextually relevant quote based on which section user just read
- After reading Tech Stack → show quote about AI as abstraction level
- After reading Journey → show quote about greenfield projects

---

### Tier 2: Medium Complexity (Mid-Term)

These require more infrastructure but offer differentiated experiences.

#### 2.1 "Ask Marco's Work" Interface

An ephemeral chat interface that appears contextually, trained on Marco's background data.

**Trigger Points:**
- Long dwell time on a section (user is interested but confused)
- Scroll back-and-forth (user comparing information)
- Direct click on "Ask me anything" floating element

**Capabilities:**
- "What technologies does Marco use for AI?" → Generates card with AI/ML stack
- "Has Marco worked with startups?" → Timeline filter + narrative
- "What's reedy.ai?" → Product explanation with visual

**Ephemeral Nature:**
- Each conversation starts fresh
- No history stored
- Tailored to what user has already seen on the page

**Implementation Notes:**
```typescript
// System prompt excerpt (inspired by Google's Gemini approach)
const systemPrompt = `
You are helping visitors learn about Marco Blumendorf's professional background.
You have access to his career history, tech stack, and published views on engineering.
When answering, prefer to generate interactive visualizations where helpful.
Do not provide personal opinions Marco hasn't expressed.
Focus on facts from the provided background documents.
`;
```

#### 2.2 Visitor-Type Adaptive Views

Different audiences need different information prioritized.

**Detected Visitor Types:**
| Type | Signals | Adaptation |
|------|---------|------------|
| Recruiter | LinkedIn referrer, quick scanning | Highlight timeline, role progression, download resume |
| Peer Engineer | GitHub referrer, tech stack focus | Expand technical details, show code philosophy |
| Academic | .edu referrer, publication links | Emphasize PhD work, research connections |
| Business | Company domain, contact focus | Leadership experience, consulting background |

**Generated Elements:**
- Section ordering remains stable (consistency)
- Content density and emphasis adapts (personalization)
- Ephemeral "recommended reading order" sidebar

#### 2.3 Project Case Study Generator

**Concept:** When user shows interest in a topic (AI, publishing, IoT), generate an ephemeral deep-dive page.

**Trigger:** "See how this works in practice" button on Expertise cards.

**Generated Page Includes:**
- Problem statement (from background data)
- Tech stack used (from structured data)
- Outcomes/learnings (from interview content)
- Interactive diagram of architecture
- Related timeline entries

**Ephemeral Nature:** Not a static page that exists-generated on demand, tailored to visitor context, not cached long-term.

---

### Tier 3: Experimental (Future Vision)

These push the boundaries and serve as demonstrations of the concept itself.

#### 3.1 Voice-Interactive Mode

Honoring Marco's PhD work on multimodal interaction.

**Concept:**
- Activate with keyboard shortcut or accessibility preference
- Navigate profile by voice: "Tell me about Marco's education"
- AI generates spoken response + highlights relevant section
- Screen reader enhanced mode with AI-generated summaries

#### 3.2 "Generate My Introduction" Tool

For visitors who need to introduce Marco in their own context.

**Input:** "I'm writing a conference bio" or "I need a tweet about Marco"

**Output:** AI-generated, context-appropriate introduction using verified background data.

**Examples:**
```
Conference Speaker Bio (150 words):
"Dr. Marco Blumendorf brings a rare combination of academic depth and
practical experience to discussions of AI in software engineering.
His PhD research at TU-Berlin on adaptive user interfaces anticipated
what we now call generative UI..."

Tweet:
"@marcoblu - Director of Engineering at CHAPTR, building AI tools
for publishers. PhD in adaptive UI before it was cool.
Prefers greenfield projects and has chickens. 🐔"
```

#### 3.3 Meta-Commentary Mode

The most "on brand" feature for someone who researched adaptive UI.

**Concept:** Toggle that reveals how the page is adapting.

**Display:**
- Subtle indicators showing "This section expanded because you spent 45s on Tech Stack"
- "Quote selected because you scrolled back to the About section"
- "Visitor type detected: Engineering peer (GitHub referrer)"

**Purpose:** Educational, demonstrates the concept, appeals to technically curious visitors.

---

## Technical Architecture

### Data Layer

```
/public/api/v1/profile.json     # Structured profile data (exists)
/agent-context/content.md       # Source of truth (exists)
/agent-context/background/      # Deep background (exists)
                │
                ▼
        ┌─────────────────┐
        │  Context API    │  ← Visitor signals, interaction data
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │  Gen AI Layer   │  ← Claude API, OpenAI, or local model
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │  UI Components  │  ← React + Motion + Tailwind
        └─────────────────┘
```

### Key Considerations

1. **Privacy First:**
   - No PII collection required
   - Visitor "type" detected from public signals only
   - Opt-in for any personalization beyond defaults

2. **Graceful Degradation:**
   - Page works fully without JS
   - AI features enhance, don't gate content
   - Static fallback for all generated content

3. **Performance:**
   - Pre-generate common variations at build time
   - Lazy-load AI features
   - Cache generated content with short TTL

4. **Cost Control:**
   - Most "generation" is actually selection from pre-written variations
   - True generation reserved for interactive features
   - Rate limiting on AI API calls

---

## Implementation Phases

### Phase 1: Foundation (No AI Required)

- Add visitor context detection (referrer, scroll, dwell time)
- Implement progressive disclosure on timeline
- Create multiple quote variations with selection logic
- Build component variants for different information densities

### Phase 2: Smart Selection

- Implement visitor type classification
- Create A/B testing for section emphasis
- Add "expand to learn more" ephemeral content
- Analytics on which adaptations improve engagement

### Phase 3: Generative Features

- Integrate AI API for "Ask Marco's Work" feature
- Generate contextual summaries
- Build case study generator
- Implement voice mode (accessibility focus)

### Phase 4: Meta & Experimental

- Add transparency mode showing adaptations
- Build "Generate My Introduction" tool
- Create API endpoint for embedding Marco's info in other contexts

---

## Design Principles for Implementation

Drawing from Roger Wong's analysis and Marco's design philosophy:

### 1. Content, Not Chrome

> The generative UI in Gemini isn't the chrome or frame around the experience, it's the content.

- Never change navigation structure dynamically
- Never reorder sections based on prediction
- Generate within the stable container, not the container itself

### 2. Ephemeral Means No Attachment

Generated content should feel:
- Fresh and contextual
- Not precious or permanent
- Regeneratable without loss

### 3. Solid B+ Is Perfect

From the article:
> The resulting generated interfaces look like the work of about three or four mid designers but lack the sophistication of seasoned pros. But you know what? That's OK for this use case.

Don't over-engineer generated UI aesthetics. Good enough for ephemeral content is actually better than over-polished (sets wrong expectations).

### 4. Honor the Research

Marco's PhD was on this exact topic. The implementation should:
- Demonstrate multimodal awareness (voice, gesture, different devices)
- Show adaptive capability without disrupting usability
- Make the academic-to-practical connection visible

---

## Success Metrics

| Metric | Baseline | Target |
|--------|----------|--------|
| Time on page | Current average | +20% for engaged visitors |
| Contact click rate | Current | +15% |
| Section engagement | Even distribution | Contextual clustering |
| Return visits | Current | +10% |
| "How does this work?" inquiries | 0 | Organic curiosity indicator |

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Over-personalization creeps out visitors | Clear opt-in, transparency mode |
| Generated content inaccuracy | All generation from verified background data only |
| Performance degradation | Aggressive caching, lazy loading, static fallbacks |
| Maintenance burden | Simple selection logic > complex generation |
| "AI slop" aesthetic | Constrained generation within established design system |

---

## Closing Thought

From the article:

> Google Gemini's implementation of generative UI might be 2025's answer to HyperCard that I've been asking for. Although all these UIs are ephemeral rather than lasting like HyperCard stacks.

Marco's profile page could be a small but meaningful demonstration: a static site that feels alive, adapts to visitors, and demonstrates expertise not just through content but through the experience itself.

The key insight is that we're not replacing the carefully designed "Engineer's Notebook" aesthetic-we're adding a layer of contextual intelligence within it. The warm amber tones, the monospace headings, the considered whitespace all remain. What changes is how deeply and in what direction the content reveals itself based on who's looking.

This is what Marco's PhD research anticipated. Now we have the tools to build it.

---

## References

- [Generative UI and the Ephemeral Interface](https://rogerwong.me/2025/11/generative-ui-and-the-ephemeral-interface/) - Roger Wong
- [The Future of UX: Generative UI](https://www.nngroup.com/) - Nielsen Norman Group
- [Google Gemini Generative UI Research Paper](https://research.google/) - Google Research
- Marco's PhD Research - Adaptive UI & Distributed AI, DAI-Labor, TU Berlin

---

## Change Log

| Date | Changes |
|------|---------|
| Dec 31, 2024 | Initial concept document |

