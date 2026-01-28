# Website Content - Source of Truth

This file contains the target text for each section of blumendorf.info. Keep this file aligned with the actual implementation. When updating content, update here first, then sync to components.

**Last synced:** January 2, 2026 (added Impressum)

---

## Meta & SEO

> **Component:** `index.html`
> **Context:** Used in meta tags, OpenGraph, Twitter cards, and structured data.

### Page Title
```
Dr Marco Blumendorf | Director of Software Engineering
```

### Meta Description (155 characters max)
```
Director of Software Engineering at CHAPTR. PhD in Distributed AI. 20+ years building software, from academic research to AI-powered publishing products.
```

### Keywords
```
Software Engineering, Engineering Leadership, AI Development, CHAPTR, Holtzbrinck, reedy.ai, React, TypeScript, Python, GCP
```

### Structured Data Notes
- Job title: Director of Software Engineering
- Organization: CHAPTR (part of Holtzbrinck Publishing Group)
- Alumni: Technische Universität Berlin, DAI-Labor
- Location: Germany

---

## Hero Section

> **Component:** `src/components/Hero.tsx`
> **Voice:** Direct introduction. No marketing speak.

### Name & Title
```
Dr Marco Blumendorf
Director of Software Engineering
```

### Headline
```
I spent a decade at TU Berlin researching adaptive UIs and distributed AI. Now I lead engineering teams, rethinking how we build software alongside AI.
```

> **Why this works:** Connects PhD research to current work. Specific about the domain (publishers). No buzzwords.

### Supporting Text (optional, currently not shown)
```
At CHAPTR, part of Holtzbrinck's AI strategy, we build tools that help publishers manage and optimize their catalogs at scale.
```

### CTA Button
```
Learn More
```

---

## About Section

> **Component:** `src/components/About.tsx`
> **Voice:** Personal background. First person. Conversational but professional.

### Heading
```
About Me
```

### Personal Background
```
I spent over a decade at TU-Berlin researching how to build adaptive user interfaces-systems that work across phones, tablets, smart homes, and respond to voice, touch, gestures. We called it multimodal interaction. Today, it's closer to what people mean by generative UI.

After my PhD, I spent two years traveling, then moved into startups. I built engineering teams from scratch, scaled a smart home company, raised funding as CTO of an IoT energy platform, and worked as a freelance consultant across sustainability and tech. I've always preferred greenfield projects-building something new from nothing.

Now I'm Director of Software Engineering at CHAPTR, a startup within the Holtzbrinck Publishing Group. We're Holtzbrinck's AI strategy. I work mainly on reedy.ai, a platform that uses AI to improve book metadata, optimize discoverability, and make large catalogs semantically searchable.
```

### Quote
```
Your job hasn't changed: deliver code that you've proven works. What's changed is how you get there.
```

### Pillars (no heading, displayed as cards)

**Pillar 1**
```
Title: Code that AI can reason about
Description: Simple architecture, clear patterns, documentation about the why-not just the what.
```

**Pillar 2**
```
Title: Engineers using AI as a multiplier
Description: Working alongside a fast junior developer who's read everything but knows nothing about your product.
```

**Pillar 3**
```
Title: Tests as the ultimate lifeline
Description: The one thing that still proves your code works, whether you wrote it or AI did.
```

---

## Expertise Section

> **Component:** `src/components/Expertise.tsx`
> **Voice:** What he actually does, not what sounds impressive. Ordered by daily relevance.

### Heading
```
Areas of Focus
```

### Intro
```
What I spend my time on.
```

### Area 1: Developer Experience
```
Title: Developer Experience
Description: Ensuring the team can deliver their best work by structuring codebases for quality and AI-compatibility, integrating AI tools into daily workflows, and building development environments that scale.
```

### Area 2: Team & Culture
```
Title: Team & Culture
Description: Building environments where engineers grow, adapting processes as tooling evolves, mentoring career development, and maintaining quality as velocity increases.
```

### Area 3: Technical Leadership
```
Title: Technical Leadership
Description: Collaborating with product on roadmaps, making architecture decisions for new systems, managing delivery and timelines, and keeping technical debt under control.
```

---

## Tech Stack Section

> **Component:** `src/components/TechStack.tsx`
> **Context:** Based on actual stack at CHAPTR (see tech-stack.md). Shows breadth and depth.

### Heading
```
Technical Foundation
```

### Intro
```
Tools I work with daily.
```

### Categories

**Frontend**
```
React, TypeScript, Vite, Tailwind CSS, TanStack Query
```

**Backend**
```
Python, Firebase Functions, Pydantic, GCP Cloud Functions
```

**Data & Search**
```
Firestore, BigQuery, Typesense, Elasticsearch, PostgreSQL
```

**AI & ML**
```
OpenAI, Anthropic Claude, LangChain, Cohere, Google GenAI
```

**Infrastructure**
```
GCP, Terraform, Cloud Tasks, Pub/Sub, Firebase Auth
```

**Practices**
```
Vitest, Playwright, Cypress, CI/CD, Feature Flags
```

> **Note:** This is the actual production stack, not aspirational. See tech-stack.md for full details.

---

## Timeline Section

> **Component:** `src/components/Timeline.tsx`
> **Voice:** Career story with specifics. Numbers and names add credibility.

### Heading
```
Professional Journey
```

### Academic Foundations (1999–2010)
```
Period: 1999–2010
Title: Academic Foundations
Description: PhD at TU-Berlin's DAI-Labor, researching adaptive user interfaces across devices and modalities-voice, touch, gestures, smart environments. Led the Human-Computer Interaction workgroup. Advised PhD students. What we worked on then is now called generative UI.
```

> **Personal element:** After PhD, spent two years traveling the world. (Could add if desired, but may be too casual for main timeline.)

### Startup Building (2010–2017)
```
Period: 2010–2017
Title: Startup Building
Description: Built engineering teams from scratch. Scaled yetu AG's smart home development. Led smartB as CTO-raised funding, built an IoT platform for commercial energy management.
```

### Independent Practice (2017–2023)
```
Period: 2017–2023
Title: Independent Practice
Description: Freelance CTO and consultant. Led engineering for startups in sustainability and IoT. Technical leadership, React coaching, strategic advisory. Lots of greenfield projects.
```

### GreenBuzz Berlin (2014–2025)
```
Period: 2014–2025
Title: GreenBuzz Berlin
Description: Co-founded as Sustainability Drinks at yetu in 2014. Became GreenBuzz Berlin in 2015, part of a global network for sustainability professionals.
```

### CHAPTR (2023–Present)
```
Period: 2023–Present
Title: CHAPTR - AI in Publishing
Description: Senior Engineer → Director of Software Engineering. CHAPTR is the AI strategy of Holtzbrinck Publishing Group. I lead the team building reedy.ai-AI-powered metadata optimization, discoverability, and semantic search for publishers.
```

---

## Lab Section

> **Component:** `src/components/Lab.tsx`
> **Voice:** Inviting. Shows curiosity and willingness to share.

### Heading
```
The Lab
```

### Intro Text
```
A place for experiments and writeups-things I'm tinkering with, exploring, or just curious about. Some ideas turn into real projects, others stay as notes on what I've learned along the way.
```

> **Note:** The Lab is a general-purpose space, not themed around any specific topic. See `src/pages/lab/lab.md` for structure and details.

---

## Contact Section

> **Component:** `src/components/Contact.tsx`
> **Voice:** Direct but personal. Shows what conversations are welcome.

### Heading
```
Get in Touch
```

### Intro Text
```
I enjoy conversations about where software engineering is headed-especially the intersection of AI tooling, team culture, and building products that matter.
```

### Things I Like Talking About
```
- How AI is changing engineering
- Building developer experience that scales
- Greenfield projects and when to start fresh
- The publishing industry meets AI
```

### Contact Options
- **Email:** marco@blumendorf.info (obfuscated in implementation) - "Best for longer conversations"
- **LinkedIn:** linkedin.com/in/marcoblu - "Let's connect professionally"
- **GitHub:** github.com/blumendorf - "See what I'm building"


---

## Footer

> **Component:** `src/components/Footer.tsx`

```
© 2025 Dr Marco Blumendorf
Impressum
```

---

## Impressum (Legal Notice)

> **Component:** `src/features/home/components/Impressum.tsx`
> **Route:** `/impressum`
> **Context:** Legally required disclosure for German websites per § 5 DDG

### Legal Information

```
Angaben gemäß § 5 DDG

Dr. Marco Blumendorf
Adresse auf Anfrage
Deutschland

Kontakt:
E-Mail: marco@blumendorf.info
Website: https://blumendorf.info

Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
Dr. Marco Blumendorf
```

### Sections Included
- Legal entity information (§ 5 DDG compliance)
- Contact details (email, website)
- Content responsibility declaration
- Liability disclaimer (Haftungsausschluss) for content and external links
- Copyright notice (Urheberrecht)
- Data protection notice (Datenschutz)
- EU Online Dispute Resolution link (Streitbeilegung)

> **Legal Note:** This Impressum complies with German legal requirements under the Digital Services Act (DDG), which replaced the Telemediengesetz (TMG) in May 2024. The Impressum is accessible within 2 clicks from any page via the footer link.

---

## Content NOT on Site (Reference Only)

Personal details from interview. Use sparingly or not at all-depends on desired tone.

### Location
- Lives in a village near Neuruppin, Brandenburg (moved out of Berlin)
- Has chickens

### Hobbies
- Skiing (certified instructor)
- Mountain biking
- Climbing

### Post-PhD
- Traveled the world for 2 years after completing PhD

> **Recommendation:** The greenfield preference and world travel could work in the About section to add personality. The chickens and skiing are fun but probably don't add professional value unless going for a more personal blog-style page.

---

## Voice & Tone Guidelines

### Marco's Core Framing
AI is the next level of abstraction in software development's long history:
1. Punch cards → Assembler
2. Higher-level languages
3. Frameworks and libraries (open source)
4. **Generative AI** ← we are here

### Phrases That Sound Like Marco
- "AI is like a junior developer who's read a lot of code but knows nothing about your product"
- "Tests are your ultimate lifeline"
- "Your job hasn't changed: deliver code that you've proven works"
- "We trusted code we didn't write. Now we're trusting code we didn't even ask for."

### Things to Avoid
- Generic "AI transformation" language without specifics
- "Thrive," "leverage," "unlock potential"
- Fear-mongering about job replacement
- Making it sound like consulting services

### Authenticity Markers
- Specific numbers: "13 PhD students," "2 to 18 engineers"
- Named products: reedy.ai, not "AI products"
- Named companies: yetu AG, smartB, CHAPTR, Holtzbrinck
- Actual tech stack, not aspirational lists

---

## Sync Checklist

When updating content:

- [ ] Update this file first
- [ ] Sync Hero.tsx
- [ ] Sync About.tsx (contains merged The Shift + About Me content)
- [ ] Sync Expertise.tsx
- [ ] Sync TechStack.tsx
- [ ] Sync Timeline.tsx
- [ ] Sync Lab.tsx
- [ ] Sync Contact.tsx
- [ ] Sync Footer.tsx
- [ ] Sync Impressum.tsx (if legal content changes)
- [ ] Update index.html meta tags if needed
- [ ] Run tests
- [ ] Update "Last synced" date

