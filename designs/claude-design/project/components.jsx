// Engineer's Notebook — component library
const { useState: useStateC, useRef: useRefC, useEffect: useEffectC } = React;

// ---------- Buttons ----------
const ButtonsCard = () => {
  const [pressed, setPressed] = useStateC(false);
  return (
    <div className="nb-card-frame" style={{ width: 720 }}>
      <header className="nb-card-header">
        <span className="nb-section-label">// components / buttons</span>
        <h3 className="nb-headline-md">Actions</h3>
      </header>
      <div className="nb-card-body" style={{ display: "grid", gridTemplateColumns: "120px 1fr", rowGap: 20, columnGap: 24, alignItems: "center" }}>
        <span className="nb-mono-tag">primary</span>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button className="nb-btn-primary"><span>Learn more</span><span className="nb-icon-arrow-down" /></button>
          <button className="nb-btn-primary nb-btn-hover"><span>Hovered</span><span className="nb-icon-arrow-down" /></button>
        </div>

        <span className="nb-mono-tag">secondary</span>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button className="nb-btn-secondary"><span className="nb-icon-flask" /><span>Explore the Lab</span><span className="nb-icon-arrow-right" /></button>
        </div>

        <span className="nb-mono-tag">json toggle</span>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="nb-json-toggle">JSON</button>
          <button className="nb-json-toggle nb-json-toggle-active">{`{JSON}`}</button>
        </div>

        <span className="nb-mono-tag">pill link</span>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="nb-pill"><span className="nb-icon-flask" /><span>The Lab</span></button>
        </div>

        <span className="nb-mono-tag">pressed</span>
        <div>
          <button
            className="nb-btn-primary"
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseLeave={() => setPressed(false)}
            style={{ transform: pressed ? "scale(0.98)" : "none" }}
          >
            <span>Press me</span>
          </button>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#78716c", marginLeft: 12 }}>
            scale 0.98 · 150ms
          </span>
        </div>
      </div>
    </div>
  );
};

// ---------- Badges & nav links ----------
const BadgesCard = () => (
  <div className="nb-card-frame" style={{ width: 720 }}>
    <header className="nb-card-header">
      <span className="nb-section-label">// components / metadata</span>
      <h3 className="nb-headline-md">Badges &amp; nav</h3>
    </header>
    <div className="nb-card-body" style={{ display: "grid", gridTemplateColumns: "120px 1fr", rowGap: 20, columnGap: 24, alignItems: "center" }}>
      <span className="nb-mono-tag">badges</span>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span className="nb-badge">React</span>
        <span className="nb-badge">TypeScript</span>
        <span className="nb-badge">GCP</span>
        <span className="nb-badge nb-badge-hover">Hover · amber</span>
      </div>

      <span className="nb-mono-tag">tags inline</span>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span className="nb-badge">Berlin</span>
        <span className="nb-badge">PhD · Distributed AI</span>
        <span className="nb-badge">20+ yrs</span>
      </div>

      <span className="nb-mono-tag">nav links</span>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <a className="nb-nav-link">About</a>
        <a className="nb-nav-link">Expertise</a>
        <a className="nb-nav-link nb-nav-link-active">Journey</a>
        <a className="nb-nav-link">Lab</a>
        <span style={{ width: 1, height: 16, background: "#44403c", margin: "0 6px" }} />
        <button className="nb-json-toggle">JSON</button>
      </div>

      <span className="nb-mono-tag">section label</span>
      <span className="nb-section-label">// expertise</span>

      <span className="nb-mono-tag">period</span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#f59e0b" }}>2024 — present</span>
    </div>
  </div>
);

// ---------- Cards ----------
const CardsShowcase = () => (
  <div className="nb-card-frame" style={{ width: 1100 }}>
    <header className="nb-card-header">
      <span className="nb-section-label">// components / cards</span>
      <h3 className="nb-headline-md">Surfaces</h3>
    </header>
    <div className="nb-card-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
      {/* Standard */}
      <div className="nb-card-standard">
        <div className="nb-icon-well"><span className="nb-icon-cpu" /></div>
        <h4 className="nb-headline-md" style={{ marginTop: 16, marginBottom: 8 }}>Standard card</h4>
        <p className="nb-body-sm" style={{ color: "#a8a29e" }}>
          Surface clay fill, thin stone border. Used for expertise areas, contact rows, and content tiles.
        </p>
      </div>
      {/* Interactive */}
      <div className="nb-card-interactive">
        <div className="nb-icon-well"><span className="nb-icon-users" /></div>
        <h4 className="nb-headline-md" style={{ marginTop: 16, marginBottom: 8 }}>Interactive · hover</h4>
        <p className="nb-body-sm" style={{ color: "#a8a29e" }}>
          On hover, a subtle amber outline appears. No heavy shadow, no transform.
        </p>
      </div>
      {/* Lab */}
      <div className="nb-card-standard" style={{ borderColor: "#44403c" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div className="nb-icon-well" style={{ background: "rgba(6,182,212,0.18)" }}>
            <span className="nb-icon-code" style={{ color: "#06b6d4" }} />
          </div>
          <span className="nb-mono-chip">WebGPU</span>
        </div>
        <h4 className="nb-headline-md" style={{ marginTop: 16, marginBottom: 8 }}>Lab experiment</h4>
        <p className="nb-body-sm" style={{ color: "#a8a29e" }}>
          Same card system, lab-cyan icon well marks the category.
        </p>
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8, fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: "#f59e0b" }}>
          <span>View</span><span className="nb-icon-arrow-right" style={{ borderColor: "#f59e0b" }} />
        </div>
      </div>
    </div>
  </div>
);

// ---------- Timeline component ----------
const TimelineCard = () => {
  const phases = [
    { period: "2024 — present", title: "Director of Software Engineering", description: "Leading engineering at CHAPTR — building AI-powered publishing products with a focus on craft and team health.", isCurrent: true },
    { period: "2018 — 2024", title: "Engineering Lead, reedy.ai", description: "From prototype to product. Hiring, architecture, and the long quiet middle of shipping." },
    { period: "2010 — 2018", title: "Senior Engineer · Holtzbrinck", description: "Distributed systems, content platforms, and the first AI features." },
    { period: "2006 — 2010", title: "PhD · TU Berlin · DAI-Labor", description: "Distributed AI research — multi-agent systems and ambient intelligence." },
  ];
  return (
    <div className="nb-card-frame" style={{ width: 720 }}>
      <header className="nb-card-header">
        <span className="nb-section-label">// components / timeline</span>
        <h3 className="nb-headline-md">Journey</h3>
      </header>
      <div className="nb-card-body" style={{ position: "relative", paddingLeft: 28 }}>
        <div className="nb-timeline-line" />
        {phases.map((p, i) => (
          <div key={p.title} style={{ position: "relative", paddingBottom: i === phases.length - 1 ? 0 : 32 }}>
            <div className={"nb-timeline-dot" + (p.isCurrent ? " nb-timeline-dot-active" : "")} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#f59e0b" }}>{p.period}</span>
            <h4 className="nb-headline-md" style={{ margin: "4px 0 8px" }}>{p.title}</h4>
            <p className="nb-body-sm" style={{ color: "#a8a29e" }}>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------- Inputs / contact rows ----------
const FormCard = () => (
  <div className="nb-card-frame" style={{ width: 540 }}>
    <header className="nb-card-header">
      <span className="nb-section-label">// components / input</span>
      <h3 className="nb-headline-md">Field</h3>
    </header>
    <div className="nb-card-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#a8a29e", letterSpacing: "0.08em" }}>EMAIL</span>
        <input className="nb-input" defaultValue="hello@blumendorf.info" />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#a8a29e", letterSpacing: "0.08em" }}>MESSAGE</span>
        <textarea className="nb-input" rows={3} defaultValue="Long paragraphs feel calm and readable here." />
      </label>
    </div>
  </div>
);

const ContactRowsCard = () => (
  <div className="nb-card-frame" style={{ width: 540 }}>
    <header className="nb-card-header">
      <span className="nb-section-label">// components / contact rows</span>
      <h3 className="nb-headline-md">Channels</h3>
    </header>
    <div className="nb-card-body" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <a className="nb-contact-row nb-contact-row-primary">
        <span className="nb-contact-icon-amber"><span className="nb-icon-mail" /></span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#fafaf9" }}>Email</span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#a8a29e" }}>For long-form questions and intros</span>
        </div>
      </a>
      <a className="nb-contact-row">
        <span className="nb-contact-icon"><span className="nb-icon-link" /></span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#fafaf9" }}>LinkedIn</span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#a8a29e" }}>Career and credentials</span>
        </div>
      </a>
      <a className="nb-contact-row">
        <span className="nb-contact-icon"><span className="nb-icon-code" /></span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#fafaf9" }}>GitHub</span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#a8a29e" }}>Code, sketches, side experiments</span>
        </div>
      </a>
    </div>
  </div>
);

// ---------- Profile ring (signature interaction) ----------
const ProfileRingCard = () => {
  const ringRef = useRefC(null);
  const [angle, setAngle] = useStateC(0);
  const [hovering, setHovering] = useStateC(false);
  useEffectC(() => {
    if (hovering) return;
    let raf, last = performance.now(), a = angle;
    const tick = (t) => {
      a = (a + (t - last) * (360 / 8000)) % 360;
      last = t;
      setAngle(a);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hovering]);
  const handleMove = (e) => {
    if (!ringRef.current) return;
    const r = ringRef.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    let deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    setAngle((deg + 360) % 360);
  };
  return (
    <div className="nb-card-frame" style={{ width: 360 }}>
      <header className="nb-card-header">
        <span className="nb-section-label">// components / profile ring</span>
        <h3 className="nb-headline-md">Signature mark</h3>
      </header>
      <div className="nb-card-body" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: 32 }}>
        <div
          ref={ringRef}
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={() => setHovering(false)}
          onPointerMove={handleMove}
          style={{ position: "relative", width: 168, height: 168, borderRadius: "50%" }}
        >
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: `conic-gradient(from ${angle.toFixed(2)}deg, transparent, #f59e0b, transparent)`,
          }} />
          <div style={{ position: "absolute", inset: 2, borderRadius: "50%", background: "#1a1814" }} />
          <div style={{
            position: "absolute", inset: 12, borderRadius: "50%",
            background: "repeating-linear-gradient(45deg, #2e2a24, #2e2a24 6px, #242019 6px, #242019 12px)",
            border: "2px solid #44403c",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'JetBrains Mono', monospace", color: "#78716c", fontSize: 12,
          }}>portrait</div>
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#78716c" }}>
          conic ring · 8s spin · pointer-tracking on hover
        </span>
      </div>
    </div>
  );
};

// ---------- Terminal / JSON tokens ----------
const JsonTokensCard = () => (
  <div className="nb-card-frame" style={{ width: 720 }}>
    <header className="nb-card-header">
      <span className="nb-section-label">// components / structured data</span>
      <h3 className="nb-headline-md">Syntax tokens</h3>
    </header>
    <div className="nb-card-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="nb-terminal-toolbar">
        <span style={{ color: "#22c55e", fontWeight: 700 }}>GET</span>
        <span className="nb-terminal-chip">/api/v1/profile.json</span>
        <span style={{ color: "#78716c" }}>200 OK</span>
        <span style={{ color: "#78716c" }}>· application/json</span>
      </div>
      <pre className="nb-terminal-pre">
{`{`}
{`  `}<span style={{ color: "#d6d3d1" }}>"profile"</span>: <span style={{ color: "#78716c" }}>{`{`}</span>
{`    `}<span style={{ color: "#d6d3d1" }}>"name"</span>: <span style={{ color: "#fcd34d" }}>"Dr Marco Blumendorf"</span>,
{`    `}<span style={{ color: "#d6d3d1" }}>"title"</span>: <span style={{ color: "#fcd34d" }}>"Director of Software Engineering"</span>,
{`    `}<span style={{ color: "#d6d3d1" }}>"yearsActive"</span>: <span style={{ color: "#60a5fa" }}>20</span>,
{`    `}<span style={{ color: "#d6d3d1" }}>"available"</span>: <span style={{ color: "#c084fc" }}>true</span>,
{`    `}<span style={{ color: "#d6d3d1" }}>"hiring"</span>: <span style={{ color: "#78716c" }}>null</span>,
{`  `}<span style={{ color: "#78716c" }}>{`}`}</span>
{`}`}
      </pre>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
        {[
          { name: "key", c: "#d6d3d1" },
          { name: "string", c: "#fcd34d" },
          { name: "number", c: "#60a5fa" },
          { name: "boolean", c: "#c084fc" },
          { name: "null", c: "#78716c" },
        ].map((t) => (
          <div key={t.name} className="nb-syntax-chip">
            <span style={{ background: t.c }} className="nb-syntax-dot" />
            <span style={{ color: t.c, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ---------- Lab accent chips ----------
const LabAccentsCard = () => (
  <div className="nb-card-frame" style={{ width: 540 }}>
    <header className="nb-card-header">
      <span className="nb-section-label">// components / lab accents</span>
      <h3 className="nb-headline-md">Experiment categories</h3>
    </header>
    <div className="nb-card-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
      {[
        { name: "WebGPU", c: "#06b6d4", bg: "rgba(6,182,212,0.18)" },
        { name: "Testing", c: "#22c55e", bg: "rgba(34,197,94,0.18)" },
        { name: "UX", c: "#a855f7", bg: "rgba(168,85,247,0.18)" },
      ].map((t) => (
        <div key={t.name} style={{
          padding: 16,
          border: "1px solid #44403c",
          borderRadius: 8,
          background: "#242019",
          display: "flex", flexDirection: "column", gap: 10,
        }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: t.bg, display: "grid", placeItems: "center" }}>
            <span style={{ width: 14, height: 14, borderRadius: 3, background: t.c }} />
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: t.c }}>{t.name}</span>
        </div>
      ))}
    </div>
  </div>
);

Object.assign(window, {
  ButtonsCard, BadgesCard, CardsShowcase, TimelineCard, FormCard,
  ContactRowsCard, ProfileRingCard, JsonTokensCard, LabAccentsCard,
});
