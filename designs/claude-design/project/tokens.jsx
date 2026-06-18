// Engineer's Notebook — token swatch + scale primitives
const { useState } = React;

// ---------- Color palette ----------
const PALETTE_GROUPS = [
  {
    title: "Foundation",
    note: "Warm charcoal page surface; never pure black.",
    swatches: [
      { name: "background", value: "#1a1814", role: "Page foundation" },
      { name: "surface", value: "#242019", role: "Default card fill" },
      { name: "surface-container", value: "#2e2a24", role: "Hover / band" },
      { name: "surface-container-high", value: "#3a342c", role: "Elevated panel" },
    ],
  },
  {
    title: "Brand",
    note: "Amber is the single thread through actions, labels, active states.",
    swatches: [
      { name: "primary", value: "#f59e0b", role: "Primary action / accent" },
      { name: "primary-hover", value: "#fbbf24", role: "Hover state" },
      { name: "on-primary", value: "#1a1814", role: "Text on amber" },
    ],
  },
  {
    title: "Stone text",
    note: "Near-white for headings; muted stone for body and metadata.",
    swatches: [
      { name: "text-primary", value: "#fafaf9", role: "Headings" },
      { name: "text-secondary", value: "#d6d3d1", role: "Body copy" },
      { name: "text-muted", value: "#a8a29e", role: "Metadata" },
      { name: "secondary", value: "#78716c", role: "Quiet metadata" },
    ],
  },
  {
    title: "Outline",
    note: "Borders do most of the separation work — shadows are rare.",
    swatches: [
      { name: "outline", value: "#44403c", role: "Default border" },
      { name: "outline-variant", value: "#57534e", role: "Active border" },
    ],
  },
  {
    title: "Terminal",
    note: "Editor-dark surface for the structured-data view.",
    swatches: [
      { name: "terminal-background", value: "#1e1e1e", role: "Editor surface" },
      { name: "terminal-surface", value: "#27272a", role: "Toolbar chip" },
      { name: "syntax-key", value: "#d6d3d1", role: "JSON keys" },
      { name: "syntax-string", value: "#fcd34d", role: "Strings" },
      { name: "syntax-number", value: "#60a5fa", role: "Numbers" },
      { name: "syntax-boolean", value: "#c084fc", role: "Booleans" },
      { name: "syntax-null", value: "#78716c", role: "Null" },
    ],
  },
  {
    title: "Lab accents",
    note: "Cyan, green, purple — only for experiment categories.",
    swatches: [
      { name: "lab-cyan", value: "#06b6d4", role: "WebGPU / HTML lab" },
      { name: "lab-green", value: "#22c55e", role: "Eval / testing" },
      { name: "lab-purple", value: "#a855f7", role: "UX / compare" },
    ],
  },
  {
    title: "Status",
    note: "Reserved for system feedback.",
    swatches: [
      { name: "success", value: "#34d399", role: "Success" },
      { name: "warning", value: "#f59e0b", role: "Warning" },
      { name: "error",   value: "#f87171", role: "Error" },
    ],
  },
];

const Swatch = ({ name, value, role }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <div
      style={{
        height: 64,
        background: value,
        borderRadius: 8,
        border: "1px solid #44403c",
      }}
    />
    <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#fafaf9", fontWeight: 500 }}>
        {name}
      </span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#a8a29e" }}>
        {value}
      </span>
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#78716c" }}>
        {role}
      </span>
    </div>
  </div>
);

const PaletteGroup = ({ group }) => (
  <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <header style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        fontWeight: 500,
        color: "#f59e0b",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}>
        // {group.title.toLowerCase()}
      </span>
      <p style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 14,
        color: "#a8a29e",
        margin: 0,
        maxWidth: 540,
      }}>
        {group.note}
      </p>
    </header>
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
      gap: 16,
    }}>
      {group.swatches.map((s) => <Swatch key={s.name} {...s} />)}
    </div>
  </section>
);

const ColorPalette = () => (
  <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 40,
    padding: 40,
    background: "#1a1814",
    color: "#fafaf9",
    width: 1200,
  }}>
    <header style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span className="nb-section-label">// foundations / color</span>
      <h2 className="nb-display-md">Warm charcoal & amber</h2>
      <p className="nb-body" style={{ maxWidth: 640 }}>
        A dark-only palette built from warm charcoal, stone text, and a single amber accent.
        Avoid pure black; saturations stay low so the page reads like paper, coffee, and low light.
      </p>
    </header>
    {PALETTE_GROUPS.map((g) => <PaletteGroup key={g.title} group={g} />)}
  </div>
);

// ---------- Typography ----------
const TYPE_SPECS = [
  { name: "display-lg", label: "Display L · 56/60 · JetBrains Mono 600", sample: "Engineer's Notebook", style: { fontFamily: "'JetBrains Mono', monospace", fontSize: 56, fontWeight: 600, lineHeight: "60px", letterSpacing: "-0.02em" } },
  { name: "display-md", label: "Display M · 48/53 · JetBrains Mono 600", sample: "Dr Marco Blumendorf", style: { fontFamily: "'JetBrains Mono', monospace", fontSize: 48, fontWeight: 600, lineHeight: "53px", letterSpacing: "-0.02em" } },
  { name: "headline-lg", label: "Headline L · 32/40 · JetBrains Mono 600", sample: "From research to AI products.", style: { fontFamily: "'JetBrains Mono', monospace", fontSize: 32, fontWeight: 600, lineHeight: "40px", letterSpacing: "-0.02em" } },
  { name: "headline-md", label: "Headline M · 20/27 · JetBrains Mono 500", sample: "Engineering leadership", style: { fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 500, lineHeight: "27px", letterSpacing: "-0.01em" } },
  { name: "title-md", label: "Title M · 18/26 · Inter 500", sample: "Things I like talking about", style: { fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 500, lineHeight: "26px" } },
  { name: "body-lg", label: "Body L · 18/30 · Inter 400", sample: "I build software systems and the teams that ship them — quietly, deliberately, and over the long term.", style: { fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 400, lineHeight: "30px" } },
  { name: "body-md", label: "Body M · 16/26 · Inter 400", sample: "Long paragraphs should feel calm and readable. Comfortable measure, generous leading.", style: { fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 400, lineHeight: "26px" } },
  { name: "body-sm", label: "Body S · 14/22 · Inter 400", sample: "Card body and contact descriptions sit at this size.", style: { fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 400, lineHeight: "22px" } },
  { name: "label-md", label: "Label M · 14/20 · JetBrains Mono 500", sample: "GET /api/v1/profile.json", style: { fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 500, lineHeight: "20px" } },
  { name: "label-sm", label: "Label S · 12/16 · JetBrains Mono 500 · 0.08em", sample: "// 2024 — present", style: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 500, lineHeight: "16px", letterSpacing: "0.08em" } },
  { name: "label-caps", label: "Label Caps · 12/14 · JetBrains Mono 500 · 0.12em", sample: "// JOURNEY", style: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 500, lineHeight: "14px", letterSpacing: "0.12em", textTransform: "uppercase" } },
];

const TypeRow = ({ spec }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "240px 1fr",
    gap: 32,
    paddingTop: 24,
    paddingBottom: 24,
    borderTop: "1px solid #2e2a24",
    alignItems: "baseline",
  }}>
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#f59e0b", letterSpacing: "0.08em" }}>
        {spec.name}
      </span>
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#78716c" }}>
        {spec.label}
      </span>
    </div>
    <div style={{ ...spec.style, color: "#fafaf9" }}>
      {spec.sample}
    </div>
  </div>
);

const Typography = () => (
  <div style={{
    padding: 40,
    background: "#1a1814",
    color: "#fafaf9",
    width: 1100,
    display: "flex",
    flexDirection: "column",
    gap: 24,
  }}>
    <header style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span className="nb-section-label">// foundations / type</span>
      <h2 className="nb-display-md">JetBrains Mono &amp; Inter</h2>
      <p className="nb-body" style={{ maxWidth: 640 }}>
        Headings and labels use JetBrains Mono (semibold, tight tracking) so the site feels authored.
        Body text uses Inter for readability at long measures. No serifs, no ultra-thin weights.
      </p>
    </header>
    <div>
      {TYPE_SPECS.map((s) => <TypeRow key={s.name} spec={s} />)}
    </div>
  </div>
);

// ---------- Spacing ----------
const SPACING_TOKENS = [
  { name: "0-5", px: 2 },
  { name: "1", px: 4 },
  { name: "1-5", px: 6 },
  { name: "2", px: 8 },
  { name: "2-5", px: 10 },
  { name: "3", px: 12 },
  { name: "4", px: 16 },
  { name: "5", px: 20 },
  { name: "6", px: 24 },
  { name: "8", px: 32 },
  { name: "10", px: 40 },
  { name: "12", px: 48 },
  { name: "16", px: 64 },
  { name: "20", px: 80 },
  { name: "24", px: 96 },
  { name: "28", px: 112 },
];

const SpacingRow = ({ name, px }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "60px 60px 1fr",
    alignItems: "center",
    gap: 16,
    padding: "8px 0",
    borderBottom: "1px solid #2e2a24",
  }}>
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#f59e0b" }}>{name}</span>
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#a8a29e" }}>{px}px</span>
    <div style={{ height: 12, width: px, background: "#f59e0b", borderRadius: 2 }} />
  </div>
);

const Spacing = () => (
  <div style={{ padding: 40, background: "#1a1814", color: "#fafaf9", width: 720, display: "flex", flexDirection: "column", gap: 24 }}>
    <header style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span className="nb-section-label">// foundations / spacing</span>
      <h2 className="nb-display-md">8-pt rhythm</h2>
      <p className="nb-body">
        Sections breathe — 80 mobile / 112 desktop. Cards use 24 padding, grids 16–24 gap, content sits inside a
        768 measure for narrative and 1024 for grids.
      </p>
    </header>
    <div>
      {SPACING_TOKENS.map((s) => <SpacingRow key={s.name} {...s} />)}
    </div>
    <div style={{
      marginTop: 16,
      padding: 16,
      background: "#242019",
      border: "1px solid #44403c",
      borderRadius: 8,
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      color: "#d6d3d1",
      lineHeight: 1.7,
    }}>
      <div><span style={{color:"#f59e0b"}}>page-gutter</span> &nbsp; 24 / 32</div>
      <div><span style={{color:"#f59e0b"}}>content-measure</span> &nbsp; 768</div>
      <div><span style={{color:"#f59e0b"}}>content-wide</span> &nbsp; 1024</div>
      <div><span style={{color:"#f59e0b"}}>hero-content-wide</span> &nbsp; 896</div>
      <div><span style={{color:"#f59e0b"}}>section-padding</span> &nbsp; 80 mobile · 112 desktop</div>
      <div><span style={{color:"#f59e0b"}}>card-padding</span> &nbsp; 24</div>
    </div>
  </div>
);

// ---------- Radii + Shadows + Motion ----------
const RADII = [
  { name: "none", value: 0 },
  { name: "sm", value: 2 },
  { name: "md", value: 6 },
  { name: "lg", value: 8 },
  { name: "xl", value: 12 },
  { name: "squircle", value: 16 },
  { name: "full", value: 9999, label: "full" },
];

const RadiusTile = ({ name, value, label }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
    <div style={{
      width: 72, height: 72,
      background: "#242019",
      border: "1px solid #44403c",
      borderRadius: value > 100 ? "50%" : value,
    }} />
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#fafaf9" }}>{name}</span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#78716c" }}>{label || `${value}px`}</span>
    </div>
  </div>
);

const SHADOWS = [
  { name: "none", css: "none", note: "Default — borders carry hierarchy." },
  { name: "nav", css: "0 1px 0 #44403c", note: "Sticky navbar lower border." },
  { name: "card-hover", css: "0 0 0 1px #f59e0b", note: "Interactive card outline." },
  { name: "amber-glow", css: "0 0 8px #f59e0b", note: "Active timeline dot." },
  { name: "focus-ring", css: "0 0 0 2px #f59e0b", note: "Keyboard focus." },
  { name: "elevated-panel", css: "0 25px 50px #000000", note: "Overlay / structured data view." },
];

const ShadowRow = ({ name, css, note }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "120px 1fr 1fr",
    gap: 24,
    alignItems: "center",
    padding: "16px 0",
    borderBottom: "1px solid #2e2a24",
  }}>
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#f59e0b" }}>{name}</span>
    <div style={{
      height: 56,
      background: "#242019",
      border: "1px solid #44403c",
      borderRadius: 8,
      boxShadow: css === "none" ? undefined : css,
    }} />
    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#a8a29e" }}>{note}</span>
  </div>
);

const Shapes = () => (
  <div style={{ padding: 40, background: "#1a1814", color: "#fafaf9", width: 900, display: "flex", flexDirection: "column", gap: 32 }}>
    <header style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span className="nb-section-label">// foundations / shape &amp; depth</span>
      <h2 className="nb-display-md">Borders, not shadows</h2>
      <p className="nb-body" style={{ maxWidth: 640 }}>
        Modestly rounded — small radii for technical controls, larger for cards. 1px borders carry the work;
        shadows are rare and reserved for overlays, focus, and the active timeline glow.
      </p>
    </header>

    <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <span className="nb-section-label">// radii</span>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {RADII.map((r) => <RadiusTile key={r.name} {...r} />)}
      </div>
    </section>

    <section style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span className="nb-section-label">// shadows</span>
      {SHADOWS.map((s) => <ShadowRow key={s.name} {...s} />)}
    </section>

    <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <span className="nb-section-label">// motion</span>
      <div style={{
        padding: 20,
        background: "#242019",
        border: "1px solid #44403c",
        borderRadius: 8,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
        color: "#d6d3d1",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px 32px",
      }}>
        <span><span style={{ color: "#f59e0b" }}>fast</span> &nbsp; 150ms · ease-out</span>
        <span><span style={{ color: "#f59e0b" }}>normal</span> &nbsp; 200ms · ease-out</span>
        <span><span style={{ color: "#f59e0b" }}>slow</span> &nbsp; 300ms · ease-out</span>
        <span><span style={{ color: "#f59e0b" }}>enter</span> &nbsp; 500ms · cubic(0.16,1,0.3,1)</span>
        <span><span style={{ color: "#f59e0b" }}>hero</span> &nbsp; 600ms · cubic(0.16,1,0.3,1)</span>
        <span><span style={{ color: "#f59e0b" }}>ring-spin</span> &nbsp; 8000ms · linear · infinite</span>
        <span><span style={{ color: "#f59e0b" }}>scale-pressed</span> &nbsp; 0.98</span>
        <span><span style={{ color: "#f59e0b" }}>fade-offset</span> &nbsp; 10px</span>
      </div>
    </section>
  </div>
);

Object.assign(window, { ColorPalette, Typography, Spacing, Shapes });
