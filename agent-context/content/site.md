# Website Content - Agent Context

Voice guidelines, meta/SEO copy, and legal text for blumendorf.info. For the JSON sync mechanics, see [`workflow.md`](workflow.md).

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

## Section Voice Cues

Voice guidance for sections whose copy lives in `profile.json`. The component path and JSON keys are obvious from the codebase; only the voice direction is durable.

| Section | Voice cue |
|---------|-----------|
| Hero | Direct introduction; no marketing speak |
| About | First person; conversational but professional |
| Expertise | What he actually does, not what sounds impressive; ordered by daily relevance |
| Tech Stack | Actual production stack, not aspirational |
| Timeline | Career story with specifics; numbers and names add credibility |
| Lab | Inviting; shows curiosity and willingness to share |
| Contact | Direct but personal; shows what conversations are welcome |

### Section notes

- **Hero headline:** Connects PhD research to current work. Specific about the domain. No buzzwords.
- **Hero supporting text** (currently not shown): *"At CHAPTR, part of Holtzbrinck's AI strategy, we build tools that help publishers manage and optimize their catalogs at scale."*
- **Hero CTA:** `Learn More`
- **Tech Stack source:** Based on actual stack at CHAPTR. See [`background/tech-stack.md`](background/tech-stack.md).
- **Timeline omission:** Two years of post-PhD travel are not in the timeline (could add for personality, may read too casual).
- **Lab framing:** General-purpose space, not themed. See [`../../src/features/lab/lab.md`](../../src/features/lab/lab.md) for structure.
- **Contact email:** Obfuscated (base64) in `profile.json` for spam protection.

---

## Footer

> **Component:** `src/features/home/components/Footer.tsx`
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
