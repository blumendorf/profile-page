# Website Content - Agent Context

This file provides voice guidelines, implementation notes, and context for AI agents working on blumendorf.info.

**Structured content source of truth:** [`/public/api/v1/profile.json`](/public/api/v1/profile.json)

---

## Content Architecture

The website content is split between two files:

| File | Purpose | Contains |
|------|---------|----------|
| `profile.json` | Structured data for UI components | Profile, About, Expertise, Tech Stack, Journey, Lab, Contact |
| `content.md` (this file) | Agent context | Meta/SEO, voice guidelines, implementation notes, legal content, reference material |

**When updating content:**
1. Update `profile.json` for any text that appears in UI components
2. Update this file for meta/SEO, voice guidelines, or legal content
3. Sync components as needed

---

## Meta & SEO

> **Component:** `index.html`
> **Context:** Used in meta tags, OpenGraph, Twitter cards, and structured data. Not in profile.json.

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

## Section Guidelines

These notes provide voice and implementation context for sections whose content lives in `profile.json`.

### Hero Section

> **Component:** `src/components/Hero.tsx`
> **Voice:** Direct introduction. No marketing speak.
> **Content:** `profile.profile.name`, `profile.profile.title`, `profile.profile.headline`

**Why the headline works:** Connects PhD research to current work. Specific about the domain. No buzzwords.

**Supporting Text (optional, currently not shown):**
```
At CHAPTR, part of Holtzbrinck's AI strategy, we build tools that help publishers manage and optimize their catalogs at scale.
```

**CTA Button:** `Learn More`

### About Section

> **Component:** `src/components/About.tsx`
> **Voice:** Personal background. First person. Conversational but professional.
> **Content:** `profile.about`

### Expertise Section

> **Component:** `src/components/Expertise.tsx`
> **Voice:** What he actually does, not what sounds impressive. Ordered by daily relevance.
> **Content:** `profile.expertise`

### Tech Stack Section

> **Component:** `src/components/TechStack.tsx`
> **Context:** Based on actual stack at CHAPTR (see tech-stack.md). Shows breadth and depth.
> **Content:** `profile.techStack`

> **Note:** This is the actual production stack, not aspirational. See tech-stack.md for full details.

### Timeline Section

> **Component:** `src/components/Timeline.tsx`
> **Voice:** Career story with specifics. Numbers and names add credibility.
> **Content:** `profile.journey`

**Personal element not shown:** After PhD, spent two years traveling the world. (Could add if desired, but may be too casual for main timeline.)

### Lab Section

> **Component:** `src/components/Lab.tsx`
> **Voice:** Inviting. Shows curiosity and willingness to share.
> **Content:** `profile.lab`

> **Note:** The Lab is a general-purpose space, not themed around any specific topic. See `src/pages/lab/lab.md` for structure and details.

### Contact Section

> **Component:** `src/components/Contact.tsx`
> **Voice:** Direct but personal. Shows what conversations are welcome.
> **Content:** `profile.contact`

**Implementation note:** Email is obfuscated (base64) in profile.json for spam protection.

---

## Footer

> **Component:** `src/components/Footer.tsx`
> **Not in profile.json**

```
© 2025 Dr Marco Blumendorf
Impressum
```

---

## Impressum (Legal Notice)

> **Component:** `src/features/home/components/Impressum.tsx`
> **Route:** `/impressum`
> **Context:** Legally required disclosure for German websites per § 5 DDG
> **Not in profile.json**

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

**For profile.json changes:**
- [ ] Update `public/api/v1/profile.json`
- [ ] Sync affected components (Hero, About, Expertise, TechStack, Timeline, Lab, Contact)
- [ ] Run tests

**For meta/legal changes:**
- [ ] Update this file
- [ ] Sync index.html meta tags if needed
- [ ] Sync Impressum.tsx if legal content changes
- [ ] Sync Footer.tsx if needed

- [ ] Update "Last synced" date in this file
