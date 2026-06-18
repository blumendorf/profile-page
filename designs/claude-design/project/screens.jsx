// Engineer's Notebook — screen recreations
const { useState: useStateS, useRef: useRefS, useEffect: useEffectS } = React;

// ---------- Shared atmospheric network background ----------
const NetworkBg = ({ density = 24 }) => {
  // Static decorative SVG — quiet, dotted, low contrast.
  const points = React.useMemo(() => {
    const arr = [];
    let seed = 7;
    const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (let i = 0; i < density; i++) {
      arr.push({ x: rand() * 100, y: rand() * 100, r: rand() * 1.2 + 0.4 });
    }
    return arr;
  }, [density]);
  const lines = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      if (dx * dx + dy * dy < 220) lines.push([points[i], points[j]]);
    }
  }
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.35, pointerEvents: "none" }}
    >
      {lines.map(([a, b], i) => (
        <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#44403c" strokeWidth="0.08" />
      ))}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r * 0.18} fill="#57534e" />
      ))}
    </svg>
  );
};

// ---------- Navbar (rendered absolute inside artboards) ----------
const ScreenNavbar = ({ scrolled = true, active = "about", showLogo = true, jsonMode = false }) => (
  <nav className={"nb-screen-nav" + (scrolled ? " nb-screen-nav-scrolled" : "")}>
    <div className="nb-screen-nav-inner">
      {showLogo ? (
        <span className="nb-screen-nav-logo">Dr Marco Blumendorf<span style={{ color: "#f59e0b" }}>.</span></span>
      ) : <span style={{ width: 1 }} />}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {["About", "Expertise", "Tech Stack", "Journey", "Lab", "Contact"].map((label) => {
          const id = label.toLowerCase().replace(" ", "-");
          const isActive = id === active;
          return <a key={label} className={"nb-nav-link" + (isActive ? " nb-nav-link-active" : "")}>{label}</a>;
        })}
        <span style={{ width: 1, height: 16, background: "#44403c", margin: "0 8px" }} />
        <button className={"nb-json-toggle" + (jsonMode ? " nb-json-toggle-active" : "")}>{jsonMode ? "{JSON}" : "JSON"}</button>
      </div>
    </div>
  </nav>
);

// ---------- Hero screen ----------
const HeroScreen = () => {
  const ringRef = useRefS(null);
  const [angle, setAngle] = useStateS(0);
  const [hovering, setHovering] = useStateS(false);
  useEffectS(() => {
    if (hovering) return;
    let raf, last = performance.now(), a = angle;
    const tick = (t) => { a = (a + (t - last) * (360 / 8000)) % 360; last = t; setAngle(a); raf = requestAnimationFrame(tick); };
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
    <div className="nb-screen" style={{ width: 1280, height: 800 }}>
      <NetworkBg density={28} />
      <ScreenNavbar scrolled={false} active="home" showLogo={false} />
      <div className="nb-screen-inner" style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 72 }}>
        <div style={{ width: 896, display: "flex", alignItems: "center", gap: 64, padding: "0 32px" }}>
          {/* Ring + portrait */}
          <div
            ref={ringRef}
            onPointerEnter={() => setHovering(true)}
            onPointerLeave={() => setHovering(false)}
            onPointerMove={handleMove}
            style={{ position: "relative", width: 200, height: 200, borderRadius: "50%", flexShrink: 0 }}
          >
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `conic-gradient(from ${angle.toFixed(2)}deg, transparent, #f59e0b, transparent)` }} />
            <div style={{ position: "absolute", inset: 2, borderRadius: "50%", background: "#1a1814" }} />
            <div style={{
              position: "absolute", inset: 12, borderRadius: "50%",
              background: "repeating-linear-gradient(45deg, #2e2a24, #2e2a24 8px, #242019 8px, #242019 16px)",
              border: "2px solid #44403c",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'JetBrains Mono', monospace", color: "#78716c", fontSize: 12,
            }}>marco-small.jpg</div>
          </div>
          {/* Text */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <h1 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 60, fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.02em", color: "#fafaf9", margin: 0 }}>
              Dr Marco<br />Blumendorf
            </h1>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, color: "#f59e0b", fontWeight: 500, margin: "16px 0 0" }}>
              Director of Software Engineering
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 18, color: "#d6d3d1", lineHeight: 1.6, margin: "20px 0 24px", maxWidth: 480 }}>
              I build software systems and the teams that ship them — calmly, deliberately, and over the long term.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
              {["20+ years", "PhD · Distributed AI", "Berlin", "AI publishing"].map((t) => (
                <span key={t} className="nb-badge">{t}</span>
              ))}
            </div>
            <button className="nb-btn-primary"><span>Learn more</span><span className="nb-icon-arrow-down" /></button>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 1, background: "linear-gradient(to right, transparent, #44403c, transparent)" }} />
    </div>
  );
};

// ---------- About + Tech Stack screen ----------
const AboutScreen = () => (
  <div className="nb-screen" style={{ width: 1280, height: 1100 }}>
    <ScreenNavbar active="about" />
    <div className="nb-screen-inner" style={{ paddingTop: 96 }}>
      <section style={{ width: 768, margin: "0 auto", padding: "64px 32px 80px" }}>
        <span className="nb-section-label">// about</span>
        <h2 className="nb-headline-lg" style={{ marginTop: 12, marginBottom: 24 }}>Twenty years of patient engineering.</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p className="nb-body">
            I started writing software in research labs — multi-agent systems, ambient intelligence, the slow
            patient kind of distributed AI that took years to feel real. Today I lead engineering for AI-powered
            publishing products, but the instincts haven't changed: small surface area, clear contracts, and
            teams who understand why before they understand how.
          </p>
          <p className="nb-body">
            Most of my best work has been quiet. Migrations that didn't break anything. Architectures that
            survived three product pivots. Teams that grew by half each year without losing their character.
            I'm interested in the long middle of building — the part after the demo and before the success.
          </p>
        </div>
      </section>

      <section style={{ borderTop: "1px solid #2e2a24", borderBottom: "1px solid #2e2a24", background: "rgba(46,42,36,0.3)" }}>
        <div style={{ width: 1024, margin: "0 auto", padding: "80px 32px" }}>
          <span className="nb-section-label">// tech stack</span>
          <h2 className="nb-headline-lg" style={{ marginTop: 12, marginBottom: 12 }}>Working materials</h2>
          <p className="nb-body" style={{ color: "#a8a29e", marginBottom: 32 }}>
            The tools I reach for first — chosen for fit, not novelty.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { name: "Languages", items: ["TypeScript", "Python", "Go", "SQL"] },
              { name: "Frontend", items: ["React", "Tailwind", "Motion", "Vite"] },
              { name: "AI / Inference", items: ["WebLLM", "Transformers.js", "OpenAI", "Anthropic"] },
              { name: "Backend", items: ["Node", "FastAPI", "PostgreSQL", "Redis"] },
              { name: "Cloud", items: ["GCP", "Cloud Run", "BigQuery", "Pub/Sub"] },
              { name: "Practice", items: ["Trunk-based", "Playwright", "Vitest", "Observability"] },
            ].map((cat) => (
              <div key={cat.name}>
                <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 500, color: "#f59e0b", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 12px" }}>
                  {cat.name}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {cat.items.map((it) => <span key={it} className="nb-badge">{it}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </div>
);

// ---------- Expertise screen ----------
const ExpertiseScreen = () => {
  const areas = [
    { icon: "cpu", title: "Engineering craft", description: "Architecture that survives pivots. Clear contracts, small surfaces, observable systems. Code I can hand off without a manual." },
    { icon: "users", title: "Team leadership", description: "Hiring slowly, growing roles, and protecting focus. Small teams that ship. Quiet feedback loops." },
    { icon: "briefcase", title: "AI products", description: "From research artifacts to shippable features. WebGPU inference, prompt evaluation, and agent-style workflows in production." },
  ];
  return (
    <div className="nb-screen" style={{ width: 1280, height: 760 }}>
      <ScreenNavbar active="expertise" />
      <div className="nb-screen-inner" style={{ paddingTop: 96 }}>
        <section style={{ width: 1024, margin: "0 auto", padding: "64px 32px" }}>
          <span className="nb-section-label">// expertise</span>
          <h2 className="nb-headline-lg" style={{ marginTop: 12, marginBottom: 12 }}>What I focus on.</h2>
          <p className="nb-body" style={{ color: "#a8a29e", marginBottom: 40 }}>
            Three threads that have run through the work, in roughly equal measure.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            {areas.map((a) => (
              <div key={a.title} className="nb-card-interactive">
                <div className="nb-icon-well"><span className={"nb-icon-" + a.icon} /></div>
                <h3 className="nb-headline-md" style={{ margin: "16px 0 12px" }}>{a.title}</h3>
                <p className="nb-body-sm" style={{ color: "#a8a29e" }}>{a.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// ---------- Timeline screen ----------
const TimelineScreen = () => {
  const phases = [
    { period: "2024 — present", title: "Director of Software Engineering · CHAPTR", description: "Leading engineering at CHAPTR, building AI-powered publishing products inside Holtzbrinck. Hiring, architecture, and the long quiet middle.", isCurrent: true },
    { period: "2018 — 2024", title: "Engineering Lead · reedy.ai", description: "From prototype to product. Multi-team coordination, platform decisions, and the parts of the work that don't show up in screenshots." },
    { period: "2010 — 2018", title: "Senior Engineer · Holtzbrinck", description: "Distributed systems, content platforms, and the first real AI features in publishing pipelines." },
    { period: "2006 — 2010", title: "PhD · TU Berlin · DAI-Labor", description: "Distributed AI research — multi-agent systems, ambient intelligence, and software that learned to negotiate." },
  ];
  return (
    <div className="nb-screen" style={{ width: 1280, height: 900 }}>
      <ScreenNavbar active="journey" />
      <div className="nb-screen-inner" style={{ paddingTop: 96 }}>
        <section style={{ width: 768, margin: "0 auto", padding: "64px 32px" }}>
          <span className="nb-section-label">// journey</span>
          <h2 className="nb-headline-lg" style={{ marginTop: 12, marginBottom: 48 }}>How I got here.</h2>
          <div style={{ position: "relative", paddingLeft: 28 }}>
            <div className="nb-timeline-line" />
            {phases.map((p, i) => (
              <div key={p.title} style={{ position: "relative", paddingBottom: i === phases.length - 1 ? 0 : 40 }}>
                <div className={"nb-timeline-dot" + (p.isCurrent ? " nb-timeline-dot-active" : "")} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#f59e0b" }}>{p.period}</span>
                <h3 className="nb-headline-md" style={{ margin: "4px 0 8px" }}>{p.title}</h3>
                <p className="nb-body-sm" style={{ color: "#a8a29e" }}>{p.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// ---------- Lab section + Contact + Footer screen ----------
const LabContactScreen = () => (
  <div className="nb-screen" style={{ width: 1280, height: 1200 }}>
    <ScreenNavbar active="contact" />
    <div className="nb-screen-inner" style={{ paddingTop: 96 }}>
      {/* Lab teaser */}
      <section style={{ width: 768, margin: "0 auto", padding: "64px 32px" }}>
        <span className="nb-section-label">// lab</span>
        <h2 className="nb-headline-lg" style={{ marginTop: 12, marginBottom: 16 }}>The Lab</h2>
        <p className="nb-body" style={{ marginBottom: 24, maxWidth: 640 }}>
          A place for experiments and writeups — things I'm tinkering with, exploring, or just curious about. Some
          ideas turn into real projects, others stay as notes on what I've learned.
        </p>
        <button className="nb-btn-secondary"><span className="nb-icon-flask" /><span>Explore the Lab</span><span className="nb-icon-arrow-right" /></button>
      </section>

      {/* Contact */}
      <section style={{ width: 1024, margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "flex-start" }}>
          <div>
            <span className="nb-section-label">// connect</span>
            <h2 className="nb-headline-lg" style={{ marginTop: 12, marginBottom: 16 }}>Always happy to talk.</h2>
            <p className="nb-body" style={{ marginBottom: 24 }}>
              I read every message. Slowest replies are weekends, longest replies are Monday mornings.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, color: "#f59e0b" }}>
              <span className="nb-icon-message" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#a8a29e" }}>Things I like talking about</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                "Engineering leadership at small / mid scale",
                "Browser-based local LLMs and on-device inference",
                "Migrating teams without losing momentum",
                "Quiet products with deep mechanics",
              ].map((t) => (
                <li key={t} style={{ paddingLeft: 16, borderLeft: "2px solid #44403c", fontFamily: "Inter, sans-serif", fontSize: 14, color: "#d6d3d1", lineHeight: 1.6 }}>{t}</li>
              ))}
            </ul>
          </div>
          <div style={{ paddingTop: 56, display: "flex", flexDirection: "column", gap: 12 }}>
            <a className="nb-contact-row nb-contact-row-primary">
              <span className="nb-contact-icon-amber"><span className="nb-icon-mail" /></span>
              <div><div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#fafaf9" }}>Email</div><div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#a8a29e" }}>The best way to reach me</div></div>
            </a>
            <a className="nb-contact-row">
              <span className="nb-contact-icon"><span className="nb-icon-link" /></span>
              <div><div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#fafaf9" }}>LinkedIn</div><div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#a8a29e" }}>Career and credentials</div></div>
            </a>
            <a className="nb-contact-row">
              <span className="nb-contact-icon"><span className="nb-icon-code" /></span>
              <div><div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#fafaf9" }}>GitHub</div><div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#a8a29e" }}>Code and side experiments</div></div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #2e2a24", padding: "32px 24px", marginTop: 32 }}>
        <div style={{ width: 768, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <button className="nb-pill"><span className="nb-icon-flask" /><span>The Lab</span></button>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#a8a29e" }}>© 2026 Dr Marco Blumendorf. All rights reserved.</span>
          <a style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#78716c" }}>Impressum</a>
        </div>
      </footer>
    </div>
  </div>
);

// ---------- Lab Index screen ----------
const LabIndexScreen = () => {
  const exps = [
    { title: "Browser AI: HTML", description: "What happens when every web page runs an LLM locally to influence its appearance? A model generates HTML/CSS, rendered live in an iframe.", icon: "code", c: "#06b6d4", bg: "rgba(6,182,212,0.18)", tag: "WebGPU" },
    { title: "Prompt Evaluation", description: "Automated testing for HTML generation. Constraint-based tests measure prompt quality and model consistency across runs.", icon: "tube", c: "#22c55e", bg: "rgba(34,197,94,0.18)", tag: "Testing" },
    { title: "Compare Views", description: "Adaptive content presentation. The same content tailored for different audiences — drag the divider to compare technical vs. non-technical perspectives.", icon: "split", c: "#a855f7", bg: "rgba(168,85,247,0.18)", tag: "UX" },
  ];
  return (
    <div className="nb-screen" style={{ width: 1280, height: 800 }}>
      <NetworkBg density={20} />
      <div className="nb-screen-inner" style={{ paddingTop: 64, padding: 32 }}>
        <section style={{ width: 768, margin: "0 auto" }}>
          <a style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#a8a29e", marginBottom: 32 }}>
            <span className="nb-icon-arrow-left" /> Back to profile
          </a>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#f59e0b", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, marginBottom: 12 }}>
              <span className="nb-icon-flask" /><span>// lab</span>
            </div>
            <h1 className="nb-headline-lg" style={{ fontSize: 40, margin: "8px 0 16px" }}>The Lab</h1>
            <p className="nb-body" style={{ color: "#a8a29e", maxWidth: 520, margin: "0 auto" }}>
              A collection of experiments and writeups — things I'm tinkering with, exploring, or just documenting for future reference.
            </p>
          </div>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#a8a29e", margin: "0 0 16px" }}>Experiments</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {exps.map((e) => (
              <div key={e.title} className="nb-card-standard" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 8, background: e.bg, display: "grid", placeItems: "center" }}>
                    <span className={"nb-icon-" + e.icon} style={{ color: e.c, borderColor: e.c }} />
                  </div>
                  <span className="nb-mono-chip">{e.tag}</span>
                </div>
                <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 600, color: "#fafaf9", margin: "4px 0 0" }}>{e.title}</h3>
                <p className="nb-body-sm" style={{ color: "#a8a29e" }}>{e.description}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: "#f59e0b" }}>
                  <span>View</span><span className="nb-icon-arrow-right" style={{ borderColor: "#f59e0b" }} />
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontFamily: "Inter, sans-serif", fontSize: 13, color: "#78716c", marginTop: 32 }}>More experiments and writeups coming soon.</p>
        </section>
      </div>
    </div>
  );
};

// ---------- JSON View screen ----------
const JsonViewScreen = () => {
  return (
    <div style={{ width: 1280, height: 900, position: "relative", background: "#1e1e1e", overflow: "hidden" }}>
      <ScreenNavbar active="about" jsonMode={true} />
      <div style={{ paddingTop: 96, padding: "96px 24px 48px" }}>
        <div style={{ maxWidth: 768, margin: "0 auto", fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
          <div style={{ marginBottom: 24, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, color: "#a8a29e" }}>
            <span style={{ color: "#22c55e", fontWeight: 700 }}>GET</span>
            <span style={{ background: "#27272a", padding: "4px 8px", borderRadius: 2, color: "#d6d3d1" }}>/api/v1/profile.json</span>
            <span style={{ color: "#78716c" }}>200 OK</span>
            <span style={{ color: "#78716c" }}>· application/json</span>
          </div>
          <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
            <span className="nb-terminal-chip"><span className="nb-icon-copy" />curl</span>
            <span className="nb-terminal-chip"><span className="nb-icon-copy" />URL</span>
            <span className="nb-terminal-chip"><span className="nb-icon-copy" />JSON</span>
            <span style={{ marginLeft: 8, color: "#f59e0b", fontSize: 12 }}>Focused: <code style={{ background: "#27272a", padding: "2px 6px", borderRadius: 2 }}>about</code></span>
          </div>
          <div style={{
            background: "#1e1e1e",
            border: "1px solid #27272a",
            borderRadius: 8,
            boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
            padding: 16,
            lineHeight: 1.7,
            color: "#d6d3d1",
            overflow: "hidden",
          }}>
            <div>{"{"}</div>
            <div style={{ paddingLeft: 20, color: "#78716c" }}>
              <span style={{ color: "#d6d3d1" }}>"profile"</span>: {"{ name, title, headline... },"}
            </div>
            <div style={{
              paddingLeft: 20, marginLeft: -2,
              borderLeft: "2px solid #f59e0b",
              background: "rgba(245,158,11,0.08)",
            }}>
              <div><span style={{ color: "#f59e0b", fontWeight: 600 }}>"about"</span><span style={{ color: "#78716c" }}>: {"{"}</span></div>
              <div style={{ paddingLeft: 20 }}>
                <span style={{ color: "#d6d3d1" }}>"heading"</span>: <span style={{ color: "#fcd34d" }}>"Twenty years of patient engineering."</span>,
              </div>
              <div style={{ paddingLeft: 20 }}>
                <span style={{ color: "#d6d3d1" }}>"paragraphs"</span>: <span style={{ color: "#78716c" }}>[</span>
              </div>
              <div style={{ paddingLeft: 40, color: "#fcd34d" }}>"I started writing software in research labs — multi-agent systems...",</div>
              <div style={{ paddingLeft: 40, color: "#fcd34d" }}>"Most of my best work has been quiet. Migrations that didn't break..."</div>
              <div style={{ paddingLeft: 20, color: "#78716c" }}>],</div>
              <div style={{ paddingLeft: 20 }}>
                <span style={{ color: "#d6d3d1" }}>"yearsActive"</span>: <span style={{ color: "#60a5fa" }}>20</span>,
              </div>
              <div style={{ paddingLeft: 20 }}>
                <span style={{ color: "#d6d3d1" }}>"available"</span>: <span style={{ color: "#c084fc" }}>true</span>,
              </div>
              <div style={{ paddingLeft: 20 }}>
                <span style={{ color: "#d6d3d1" }}>"hiring"</span>: <span style={{ color: "#78716c" }}>null</span>
              </div>
              <div style={{ color: "#78716c" }}>{"},"}</div>
            </div>
            <div style={{ paddingLeft: 20, color: "#78716c" }}>
              <span style={{ color: "#d6d3d1" }}>"expertise"</span>: {"{ ... },"}
            </div>
            <div style={{ paddingLeft: 20, color: "#78716c" }}>
              <span style={{ color: "#d6d3d1" }}>"techStack"</span>: {"{ ... },"}
            </div>
            <div style={{ paddingLeft: 20, color: "#78716c" }}>
              <span style={{ color: "#d6d3d1" }}>"journey"</span>: {"{ ... },"}
            </div>
            <div style={{ paddingLeft: 20, color: "#78716c" }}>
              <span style={{ color: "#d6d3d1" }}>"contact"</span>: {"{ ... }"}
            </div>
            <div>{"}"}</div>
          </div>
          <p style={{ textAlign: "center", color: "#78716c", fontSize: 12, marginTop: 16 }}>
            Click on objects to expand/collapse • Use nav links to focus sections
          </p>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, {
  HeroScreen, AboutScreen, ExpertiseScreen, TimelineScreen,
  LabContactScreen, LabIndexScreen, JsonViewScreen, NetworkBg, ScreenNavbar,
});
