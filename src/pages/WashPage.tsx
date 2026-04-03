import { useState, useEffect, useRef } from "react";

/* ── Google Fonts injected once ── */
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return null;
};

/* ── useInView hook ── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/* ── Reveal wrapper ── */
function Reveal({ children, delay = 0, dir = "up", className = "" }) {
  const [ref, inView] = useInView();
  const base = "transition-all duration-700 ease-out";
  const hidden =
    dir === "up" ? "opacity-0 translate-y-10"
    : dir === "left" ? "opacity-0 -translate-x-10"
    : dir === "right" ? "opacity-0 translate-x-10"
    : "opacity-0 scale-95";
  const visible = "opacity-100 translate-y-0 translate-x-0 scale-100";
  return (
    <div
      ref={ref}
      className={`${base} ${inView ? visible : hidden} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

/* ── Animated counter ── */
function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const [ref, inView] = useInView(0.5);
  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target.replace(/\D/g, ""));
    let start = 0;
    const step = Math.ceil(num / 50);
    const t = setInterval(() => {
      start += step;
      if (start >= num) { setVal(num); clearInterval(t); }
      else setVal(start);
    }, 30);
    return () => clearInterval(t);
  }, [inView, target]);
  return (
    <span ref={ref}>
      {val}{target.includes("+") ? "+" : ""}{suffix}
    </span>
  );
}

/* ── Ticker bar ── */
const TICKER_ITEMS = ["⚡ Same Day Repair","🛡 90-Day Warranty","✅ Certified Technicians","💰 Transparent Pricing","🔩 Genuine Parts","🗺 All Mumbai Areas","⭐ 4.8 Google Rating","📞 Available Today"];
function TickerBar() {
  return (
    <div className="overflow-hidden py-3.5" style={{ background: "linear-gradient(135deg,#0047CC,#1A6BFF)" }}>
      <div className="flex w-max" style={{ animation: "ticker 22s linear infinite" }}>
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
          <span key={i} className="text-white font-mono font-bold text-xs uppercase tracking-widest px-8">{t}<span className="mx-4 opacity-30">—</span></span>
        ))}
      </div>
    </div>
  );
}

/* ── Pill label ── */
function Pill({ children, white = false }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest border ${
        white
          ? "bg-white/15 border-white/25 text-white"
          : "border-blue-200 text-blue-700"
      }`}
      style={white ? {} : { background: "#E8F1FF" }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: white ? "#fff" : "#1A6BFF", animation: "pulseRing 1.8s ease-out infinite" }}
      />
      {children}
    </span>
  );
}

/* ── Section title ── */
function SectionTitle({ pill, h, accent, sub, center = false, light = false }: {
  pill: React.ReactNode;
  h: React.ReactNode;
  accent: React.ReactNode;
  sub?: React.ReactNode;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <Pill white={light}>{pill}</Pill>
      <h2
        className="mt-4 mb-3 leading-tight"
        style={{
          fontFamily: "'Outfit',sans-serif", fontWeight: 800,
          fontSize: "clamp(2rem,4vw,3rem)",
          color: light ? "#fff" : "#0A1628",
        }}
      >
        {h}<br />
        <span style={{
          background: light
            ? "linear-gradient(135deg,#7DD3FC,#93C5FD)"
            : "linear-gradient(135deg,#0047CC,#0080FF,#00C3FF)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
        }}>{accent}</span>
      </h2>
      {sub && <p className="text-base leading-relaxed" style={{ color: light ? "rgba(255,255,255,.75)" : "#6B7FA3", maxWidth: 460 }}>{sub}</p>}
    </div>
  );
}

/* ── NAVBAR ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["services","Process|#how-it-works","Reviews|#testimonials","FAQ|#faq"];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}
      style={{ background: "rgba(255,255,255,.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(216,228,245,.7)" }}>
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-[68px]">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 no-underline">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0047CC,#1A6BFF)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="1.5"/>
              {[0,90,180,270].map(a=>{
                const rad=a*Math.PI/180;
                const x=12+6*Math.sin(rad), y=12-6*Math.cos(rad);
                return <circle key={a} cx={x} cy={y} r="1.2" fill="#fff"/>;
              })}
            </svg>
          </div>
          <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:20, color:"#0A1628" }}>
            Rapid<span style={{ color:"#0047CC" }}>Fix</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {["Services|#services","Process|#how-it-works","Reviews|#testimonials","FAQ|#faq"].map(l => {
            const [label, href] = l.split("|");
            return <a key={label} href={href} className="text-sm font-semibold transition-colors duration-200 no-underline"
              style={{ color:"#2E3F5C", fontFamily:"'Plus Jakarta Sans',sans-serif" }}
              onMouseOver={e=>(e.target as HTMLElement).style.color="#0047CC"}
              onMouseOut={e=>(e.target as HTMLElement).style.color="#2E3F5C"}>{label}</a>;
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+918282822265" className="rounded-xl border-2 border-blue-700 text-blue-700 font-bold text-sm px-5 py-2.5 transition-all duration-200 no-underline hover:bg-blue-50"
            style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>📞 8282822265</a>
          <a href="#leadform" className="rounded-xl text-white font-bold text-sm px-5 py-2.5 no-underline transition-all duration-200"
            style={{ background:"linear-gradient(135deg,#0047CC,#1A6BFF)", boxShadow:"0 4px 16px rgba(0,71,204,.35)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}
            onMouseOver={e=>(e.currentTarget as HTMLElement).style.transform="translateY(-2px)"}
            onMouseOut={e=>(e.currentTarget as HTMLElement).style.transform=""}>Book Repair</a>
        </div>

        {/* Hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {[0,1,2].map(i => (
            <span key={i} className="block w-5 h-0.5 bg-gray-800 rounded transition-all duration-300"
              style={menuOpen ? (i===0?{transform:"translateY(8px) rotate(45deg)"}:i===1?{opacity:0}:{transform:"translateY(-8px) rotate(-45deg)"}):{}} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen?"max-h-96":"max-h-0"}`}
        style={{ borderTop:"1px solid #D8E4F5", background:"#fff" }}>
        <div className="px-5 py-4 flex flex-col gap-1">
          {["Services|#services","Process|#how-it-works","Reviews|#testimonials","FAQ|#faq"].map(l=>{
            const [label,href]=l.split("|");
            return <a key={label} href={href} className="py-3 font-semibold text-sm no-underline border-b" style={{ color:"#2E3F5C", borderColor:"#D8E4F5" }} onClick={()=>setMenuOpen(false)}>{label}</a>;
          })}
          <div className="flex gap-3 pt-3">
            <a href="tel:+918282822265" className="flex-1 text-center rounded-xl border-2 border-blue-700 text-blue-700 font-bold text-sm py-3 no-underline">📞 Call</a>
            <a href="#leadform" className="flex-1 text-center rounded-xl text-white font-bold text-sm py-3 no-underline" style={{ background:"linear-gradient(135deg,#0047CC,#1A6BFF)" }} onClick={()=>setMenuOpen(false)}>Book Now</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ── HERO ── */
function Hero() {
  const pills = ["2–4 hr Arrival","90-Day Warranty","Genuine Parts","All Mumbai Areas"];
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("https://formspree.io/f/mgollvyl", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
      });
    } catch {}
    setSending(false);
    setSubmitted(true);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-10 overflow-hidden"
      style={{ background:"radial-gradient(ellipse 90% 70% at 65% 40%,rgba(26,107,255,.09) 0%,transparent 55%),radial-gradient(ellipse 60% 80% at 15% 70%,rgba(0,71,204,.06) 0%,transparent 55%),linear-gradient(180deg,#EEF5FF 0%,#F7F9FF 60%,#fff 100%)" }}>

      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"radial-gradient(circle,rgba(0,71,204,.07) 1.5px,transparent 1.5px)", backgroundSize:"28px 28px" }} />

      {/* Animated blobs */}
      <div className="absolute pointer-events-none" style={{ width:480,height:480,top:"-10%",right:"5%",background:"radial-gradient(circle,rgba(77,159,255,.18),rgba(0,71,204,.06))",filter:"blur(60px)",animation:"blobMorph 10s ease-in-out infinite",borderRadius:"60% 40% 70% 30%/50% 60% 40% 50%" }} />
      <div className="absolute pointer-events-none" style={{ width:340,height:340,bottom:"5%",left:"-5%",background:"radial-gradient(circle,rgba(0,195,255,.14),rgba(0,71,204,.05))",filter:"blur(70px)",animation:"blobMorph 14s ease-in-out infinite 3s reverse",borderRadius:"40% 60% 50% 50%/70% 30% 60% 40%" }} />

      {/* Spinning drum decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none hidden xl:block" style={{ width:500,height:500,opacity:.05 }}>
        <svg viewBox="0 0 400 400" style={{ width:"100%",height:"100%",animation:"spinDrum 14s linear infinite" }}>
          <circle cx="200" cy="200" r="192" stroke="#0047CC" strokeWidth="1.5" fill="none" strokeDasharray="8 12"/>
          <circle cx="200" cy="200" r="152" stroke="#0047CC" strokeWidth=".8" fill="none"/>
          <circle cx="200" cy="200" r="84" stroke="#0047CC" strokeWidth="2" fill="rgba(0,71,204,.03)"/>
          <circle cx="200" cy="200" r="30" stroke="#0047CC" strokeWidth="1.5" fill="none"/>
          {[0,90,180,270].map(a=>{
            const r=a*Math.PI/180;
            return <g key={a}>
              <line x1="200" y1="200" x2={200+192*Math.sin(r)} y2={200-192*Math.cos(r)} stroke="#0047CC" strokeWidth=".5" opacity=".5"/>
              <circle cx={200+84*Math.sin(r)} cy={200-84*Math.cos(r)} r="14" stroke="#0047CC" strokeWidth="1.5" fill="rgba(0,71,204,.06)"/>
            </g>;
          })}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-5 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* LEFT */}
          <div>
            <Reveal delay={0}>
              <Pill>⚡ Same Day Repair · Mumbai</Pill>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-5 mb-5 leading-[1.06]" style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:"clamp(2.8rem,5.5vw,4.8rem)", color:"#0A1628" }}>
                Washing Machine<br/>
                <span style={{ background:"linear-gradient(135deg,#0047CC,#0080FF,#00C3FF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Repair in</span>
                <br/>Mumbai
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="text-lg leading-relaxed mb-7" style={{ color:"#2E3F5C", maxWidth:460, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                Certified technicians at your doorstep — <strong style={{ color:"#0A1628" }}>same day guaranteed</strong>. We fix all major brands with genuine parts and a written 90-day warranty.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="flex flex-wrap gap-2.5 mb-7">
                {pills.map(p => (
                  <div key={p} className="flex items-center gap-2 rounded-full px-4 py-2 bg-white border text-sm font-semibold" style={{ borderColor:"#D8E4F5", color:"#2E3F5C", fontFamily:"'Plus Jakarta Sans',sans-serif", boxShadow:"0 2px 8px rgba(0,71,204,.07)" }}>
                    <span className="w-2 h-2 rounded-full" style={{ background:"#00C566", flexShrink:0, animation:"pulseRing 2s ease-out infinite" }} />
                    {p}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-wrap gap-3 mb-7">
                <a href="tel:+918282822265" className="inline-flex items-center gap-2 rounded-xl text-white font-bold text-base px-7 py-3.5 no-underline transition-all duration-200"
                  style={{ background:"linear-gradient(135deg,#0047CC,#1A6BFF)", boxShadow:"0 4px 20px rgba(0,71,204,.38)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}
                  onMouseOver={e=>(e.currentTarget as HTMLElement).style.transform="translateY(-2px)"}
                  onMouseOut={e=>(e.currentTarget as HTMLElement).style.transform=""}>📞 Call: 8282822265</a>
                <a href="https://wa.me/918282822265" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl text-white font-bold text-base px-7 py-3.5 no-underline transition-all duration-200"
                  style={{ background:"linear-gradient(135deg,#25D366,#128C7E)", boxShadow:"0 4px 16px rgba(37,211,102,.35)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}
                  onMouseOver={e=>(e.currentTarget as HTMLElement).style.transform="translateY(-2px)"}
                  onMouseOut={e=>(e.currentTarget as HTMLElement).style.transform=""}>💬 WhatsApp</a>
              </div>
            </Reveal>

            <Reveal delay={360}>
              <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-5 py-3.5 border" style={{ borderColor:"#D8E4F5", boxShadow:"0 4px 16px rgba(0,71,204,.08)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-lg" style={{ background:"#FFC107" }}>G</div>
                <div>
                  <div className="font-bold text-base" style={{ color:"#0A1628", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>⭐ 4.8 / 5 Google Rating</div>
                  <div className="text-xs" style={{ color:"#6B7FA3", fontFamily:"'JetBrains Mono',monospace" }}>1,330+ verified reviews</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: FORM */}
          <Reveal dir="right" delay={100}>
            <div className="rounded-3xl bg-white border p-9 relative overflow-hidden" style={{ borderColor:"#D8E4F5", boxShadow:"0 20px 60px rgba(0,71,204,.12)", animation:"glowPulse 4s ease-in-out infinite" }}>
              <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl" style={{ background:"linear-gradient(90deg,#0047CC,#4D9FFF)" }} />
              <h3 className="font-bold text-2xl mb-1 mt-1" style={{ fontFamily:"'Outfit',sans-serif", color:"#0A1628" }}>Book Your Repair Today</h3>
              <p className="text-sm mb-6" style={{ color:"#6B7FA3", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Technician at your door within 2–4 hrs. Free diagnosis included.</p>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">✅</div>
                  <div className="font-bold text-xl mb-2" style={{ fontFamily:"'Outfit',sans-serif", color:"#0A1628" }}>Submitted!</div>
                  <p style={{ color:"#6B7FA3" }}>We'll call you back within 30 minutes.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {[
                    { label:"Your Name *", name:"name", type:"text", ph:"e.g. Rahul Mehta", req:true },
                    { label:"Mobile Number *", name:"phone", type:"tel", ph:"+91 XXXXX XXXXX", req:true },
                    { label:"Area in Mumbai *", name:"area", type:"text", ph:"e.g. Andheri, Bandra, Thane...", req:true },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-xs font-bold mb-1.5 uppercase tracking-widest" style={{ color:"#6B7FA3", fontFamily:"'JetBrains Mono',monospace" }}>{f.label}</label>
                      <input type={f.type} name={f.name} placeholder={f.ph} required={f.req}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                        style={{ background:"#F0F6FF", border:"1.5px solid #D8E4F5", color:"#0A1628", fontFamily:"'Plus Jakarta Sans',sans-serif" }}
                        onFocus={e=>{ (e.target as HTMLElement).style.borderColor="#1A6BFF"; (e.target as HTMLElement).style.background="#fff"; (e.target as HTMLElement).style.boxShadow="0 0 0 4px rgba(26,107,255,.1)"; }}
                        onBlur={e=>{ (e.target as HTMLElement).style.borderColor="#D8E4F5"; (e.target as HTMLElement).style.background="#F0F6FF"; (e.target as HTMLElement).style.boxShadow="none"; }} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-bold mb-1.5 uppercase tracking-widest" style={{ color:"#6B7FA3", fontFamily:"'JetBrains Mono',monospace" }}>Machine Type</label>
                    <select name="type" className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                      style={{ background:"#F0F6FF", border:"1.5px solid #D8E4F5", color:"#0A1628", fontFamily:"'Plus Jakarta Sans',sans-serif", appearance:"none", cursor:"pointer" }}>
                      <option value="">Select type...</option>
                      {["Front Load","Top Load","Semi-Automatic","Other"].map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5 uppercase tracking-widest" style={{ color:"#6B7FA3", fontFamily:"'JetBrains Mono',monospace" }}>Describe the Issue</label>
                    <textarea name="message" rows={3} placeholder="e.g. Not draining, making noise..."
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                      style={{ background:"#F0F6FF", border:"1.5px solid #D8E4F5", color:"#0A1628", fontFamily:"'Plus Jakarta Sans',sans-serif" }}
                      onFocus={e=>{ (e.target as HTMLElement).style.borderColor="#1A6BFF"; (e.target as HTMLElement).style.background="#fff"; (e.target as HTMLElement).style.boxShadow="0 0 0 4px rgba(26,107,255,.1)"; }}
                      onBlur={e=>{ (e.target as HTMLElement).style.borderColor="#D8E4F5"; (e.target as HTMLElement).style.background="#F0F6FF"; (e.target as HTMLElement).style.boxShadow="none"; }} />
                  </div>
                  <button type="submit" disabled={sending}
                    className="w-full rounded-xl text-white font-bold py-4 text-base transition-all duration-200"
                    style={{ background:"linear-gradient(135deg,#0047CC,#1A6BFF)", boxShadow:"0 4px 20px rgba(0,71,204,.35)", fontFamily:"'Plus Jakarta Sans',sans-serif", opacity:sending?.75:1 }}
                    onMouseOver={e=>!sending&&((e.currentTarget as HTMLElement).style.transform="translateY(-2px)")}
                    onMouseOut={e=>(e.currentTarget as HTMLElement).style.transform=""}>
                    {sending ? "⏳ Sending..." : "🔧 Book Free Diagnosis"}
                  </button>
                  <div className="flex justify-center gap-3 text-xs" style={{ color:"#6B7FA3", fontFamily:"'JetBrains Mono',monospace" }}>
                    <span>✓ 90-Day Warranty</span><span className="opacity-30">|</span><span>✓ No Hidden Charges</span>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── STATS ── */
const STATS = [
  { n:"10+",  suffix:"", label:"Years Experience" },
  { n:"50000",suffix:"+",label:"Repairs Done" },
  { n:"33000",suffix:"+",label:"Happy Clients" },
  { n:"4.8",  suffix:"★",label:"Google Rating" },
];
function StatsSection() {
  return (
    <section className="py-16" style={{ background:"linear-gradient(135deg,#EEF4FF,#F7F9FF,#E8F1FF)", backgroundImage:"radial-gradient(circle,rgba(0,71,204,.07) 1.5px,transparent 1.5px)", backgroundSize:"28px 28px" }}>
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {STATS.map((s,i) => (
            <Reveal key={s.label} delay={i*80}>
              <div className="bg-white rounded-2xl p-7 text-center border relative overflow-hidden group transition-all duration-300 hover:-translate-y-1"
                style={{ borderColor:"#D8E4F5", boxShadow:"0 4px 18px rgba(0,71,204,.07)" }}
                onMouseOver={e=>(e.currentTarget as HTMLElement).style.boxShadow="0 16px 40px rgba(0,71,204,.15)"}
                onMouseOut={e=>(e.currentTarget as HTMLElement).style.boxShadow="0 4px 18px rgba(0,71,204,.07)"}>
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background:"linear-gradient(90deg,#0047CC,#4D9FFF)" }} />
                <div className="font-extrabold mb-2" style={{ fontFamily:"'Outfit',sans-serif", fontSize:"2.8rem", lineHeight:1, background:"linear-gradient(135deg,#0047CC,#0080FF,#00C3FF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                  <Counter target={s.n} suffix={s.suffix} />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest" style={{ color:"#6B7FA3", fontFamily:"'JetBrains Mono',monospace" }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PROBLEMS ── */
const PROBLEMS = [
  { icon:"🔄", title:"Not Spinning or Draining", desc:"Drum won't spin or water stays inside after a wash cycle." },
  { icon:"📳", title:"Vibration & Loud Noise", desc:"Loud banging, shaking, or unusual sounds during operation." },
  { icon:"💧", title:"Water Leakage", desc:"Water pooling around or under the machine during use." },
  { icon:"⚡", title:"Machine Not Turning On", desc:"No power, no lights, or completely unresponsive controls." },
  { icon:"🖥️", title:"Error Codes on Display", desc:"Flashing error codes indicating internal electronic faults." },
  { icon:"🚪", title:"Door Won't Open / Lock", desc:"Door stuck shut or latch mechanism failure preventing use." },
];
function ProblemsSection() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <Reveal>
          <div className="text-center mb-14">
            <SectionTitle pill="Common Issues" h="Is Your Machine " accent="Showing These Signs?" sub="Certified technicians diagnose and fix them — same day across Mumbai." center />
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {PROBLEMS.map((p,i) => (
            <Reveal key={p.title} delay={i*70}>
              <div className="bg-white border rounded-2xl p-6 h-full cursor-default transition-all duration-300 group"
                style={{ borderColor:"#D8E4F5", boxShadow:"0 2px 10px rgba(0,71,204,.05)" }}
                onMouseOver={e=>{ (e.currentTarget as HTMLElement).style.transform="translateY(-6px)"; (e.currentTarget as HTMLElement).style.boxShadow="0 20px 50px rgba(0,71,204,.14)"; (e.currentTarget as HTMLElement).style.borderColor="#93C5FD"; }}
                onMouseOut={e=>{ (e.currentTarget as HTMLElement).style.transform=""; (e.currentTarget as HTMLElement).style.boxShadow="0 2px 10px rgba(0,71,204,.05)"; (e.currentTarget as HTMLElement).style.borderColor="#D8E4F5"; }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-all duration-300"
                  style={{ background:"#E8F1FF", border:"1.5px solid #D8E4F5" }}
                  onMouseOver={e=>{ (e.currentTarget as HTMLElement).style.transform="scale(1.1) rotate(-5deg)"; (e.currentTarget as HTMLElement).style.background="#DBEAFE"; }}
                  onMouseOut={e=>{ (e.currentTarget as HTMLElement).style.transform=""; (e.currentTarget as HTMLElement).style.background="#E8F1FF"; }}>
                  {p.icon}
                </div>
                <h3 className="font-bold text-base mb-2" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:"#0A1628" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color:"#6B7FA3", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="tel:+918282822265" className="inline-flex items-center gap-2 rounded-xl text-white font-bold px-7 py-3.5 no-underline transition-all duration-200"
              style={{ background:"linear-gradient(135deg,#0047CC,#1A6BFF)", boxShadow:"0 4px 20px rgba(0,71,204,.35)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}
              onMouseOver={e=>(e.currentTarget as HTMLElement).style.transform="translateY(-2px)"}
              onMouseOut={e=>(e.currentTarget as HTMLElement).style.transform=""}>📞 Call: 8282822265</a>
            <a href="https://wa.me/918282822265" className="inline-flex items-center gap-2 rounded-xl text-white font-bold px-7 py-3.5 no-underline transition-all duration-200"
              style={{ background:"linear-gradient(135deg,#25D366,#128C7E)", boxShadow:"0 4px 16px rgba(37,211,102,.35)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}
              onMouseOver={e=>(e.currentTarget as HTMLElement).style.transform="translateY(-2px)"}
              onMouseOut={e=>(e.currentTarget as HTMLElement).style.transform=""}>💬 WhatsApp</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── WHY US ── */
const WHY_ITEMS = [
  { icon:"⚡", title:"Same Day Response — 2–4 Hour Slots", desc:"Book before 2pm and your technician arrives same day." },
  { icon:"🏆", title:"10+ Years of Mumbai Expertise", desc:"Thousands of repairs across Andheri, Bandra, Thane & beyond." },
  { icon:"🔩", title:"100% Genuine Spare Parts", desc:"No cheap alternatives. Genuine parts mean longer machine life." },
  { icon:"💰", title:"Upfront Transparent Pricing", desc:"You know the cost before we begin. Zero hidden charges." },
  { icon:"🛡️", title:"90-Day Written Repair Warranty", desc:"Same issue within 90 days? We fix it free of charge." },
];
function WhyUsSection() {
  return (
    <section id="why-us" className="py-24" style={{ background:"linear-gradient(135deg,#EEF4FF,#F7F9FF,#E8F1FF)", backgroundImage:"radial-gradient(circle,rgba(0,71,204,.07) 1.5px,transparent 1.5px)", backgroundSize:"28px 28px" }}>
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image + floating badges */}
          <Reveal dir="left">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden relative" style={{ height:480, boxShadow:"0 24px 70px rgba(0,71,204,.18)" }}>
                <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80&auto=format" alt="Technician at work" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background:"linear-gradient(180deg,transparent 40%,rgba(0,20,60,.88) 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="rounded-2xl flex items-center gap-3 p-4" style={{ background:"rgba(255,255,255,.14)", backdropFilter:"blur(16px)", border:"1px solid rgba(255,255,255,.22)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background:"#00C566" }}>✓</div>
                    <div>
                      <div className="font-bold text-white text-sm">Repair Complete</div>
                      <div className="text-xs" style={{ color:"rgba(255,255,255,.7)" }}>Front Load · Andheri West · 2 hrs ago</div>
                    </div>
                    <div className="ml-auto font-bold text-xs" style={{ color:"#00C566", fontFamily:"'JetBrains Mono',monospace" }}>+90D ✓</div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute bg-white border rounded-2xl p-5" style={{ top:-20,right:-20, borderColor:"#D8E4F5", boxShadow:"0 12px 36px rgba(0,71,204,.16)", animation:"floatA 6s ease-in-out infinite" }}>
                <div className="font-extrabold" style={{ fontFamily:"'Outfit',sans-serif", fontSize:"2.4rem", lineHeight:1, background:"linear-gradient(135deg,#0047CC,#00C3FF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>50K+</div>
                <div className="text-xs mt-1" style={{ color:"#6B7FA3", fontFamily:"'JetBrains Mono',monospace" }}>Repairs Done</div>
              </div>
              <div className="absolute rounded-2xl p-5" style={{ bottom:-20,left:-20, background:"linear-gradient(135deg,#0047CC,#0066FF)", boxShadow:"0 12px 36px rgba(0,71,204,.38)", animation:"floatB 8s ease-in-out infinite 1.5s" }}>
                <div className="font-extrabold text-white" style={{ fontFamily:"'Outfit',sans-serif", fontSize:"2.4rem", lineHeight:1 }}>10+</div>
                <div className="text-xs mt-1" style={{ color:"rgba(255,255,255,.7)", fontFamily:"'JetBrains Mono',monospace" }}>Years in Mumbai</div>
              </div>
            </div>
          </Reveal>

          {/* Content */}
          <div>
            <Reveal>
              <SectionTitle pill="Why Choose Us" h="Mumbai's Most " accent="Trusted Specialists" sub="33,000+ Mumbai families trust us for fast, honest, expert repair." />
            </Reveal>
            <div className="flex flex-col gap-3 mt-10">
              {WHY_ITEMS.map((item,i) => (
                <Reveal key={item.title} delay={i*70}>
                  <div className="flex items-start gap-4 bg-white border rounded-2xl p-4 transition-all duration-200 cursor-default"
                    style={{ borderColor:"#D8E4F5" }}
                    onMouseOver={e=>{ (e.currentTarget as HTMLElement).style.borderColor="#93C5FD"; (e.currentTarget as HTMLElement).style.boxShadow="0 8px 24px rgba(0,71,204,.10)"; (e.currentTarget as HTMLElement).style.transform="translateX(5px)"; }}
                    onMouseOut={e=>{ (e.currentTarget as HTMLElement).style.borderColor="#D8E4F5"; (e.currentTarget as HTMLElement).style.boxShadow="none"; (e.currentTarget as HTMLElement).style.transform=""; }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background:"#E8F1FF", border:"1.5px solid #D8E4F5" }}>{item.icon}</div>
                    <div>
                      <div className="font-bold text-sm mb-0.5" style={{ color:"#0A1628", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{item.title}</div>
                      <div className="text-sm" style={{ color:"#6B7FA3", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{item.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── IMAGE MARQUEE ── */
const MARQUEE_IMGS = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=320&h=200&fit=crop&q=70",
  "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=320&h=200&fit=crop&q=70",
  "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=320&h=200&fit=crop&q=70",
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=320&h=200&fit=crop&q=70",
  "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=320&h=200&fit=crop&q=70",
  "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=320&h=200&fit=crop&q=70",
];
function ImageMarquee() {
  return (
    <div className="overflow-hidden py-5" style={{ background:"#F0F6FF" }}>
      <div className="flex gap-4" style={{ width:"max-content", animation:"ticker 28s linear infinite" }}>
        {[...MARQUEE_IMGS,...MARQUEE_IMGS].map((src,i)=>(
          <img key={i} src={src} alt="" className="object-cover flex-shrink-0 rounded-2xl"
            style={{ height:175, width:280, boxShadow:"0 4px 16px rgba(0,71,204,.10)" }} />
        ))}
      </div>
    </div>
  );
}

/* ── HOW IT WORKS ── */
const STEPS = [
  { n:"01", title:"Call or Fill the Form", desc:"Via phone, WhatsApp, or our quick form. Under 60 seconds." },
  { n:"02", title:"Technician Assigned", desc:"A certified technician near you is assigned within 30 minutes." },
  { n:"03", title:"Diagnosis & Quote", desc:"Transparent quote given. No work begins without approval." },
  { n:"04", title:"Repaired + Warranty", desc:"Fixed on the spot + 90-day written warranty issued." },
];
function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <Reveal>
          <div className="text-center mb-14">
            <SectionTitle pill="Simple Process" h="How It Works — " accent="4 Easy Steps" center />
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {STEPS.map((s,i) => (
            <Reveal key={s.n} delay={i*90}>
              <div className="relative bg-white border rounded-2xl p-7 text-center h-full transition-all duration-300"
                style={{ borderColor:"#D8E4F5", boxShadow:"0 4px 16px rgba(0,71,204,.06)" }}
                onMouseOver={e=>{ (e.currentTarget as HTMLElement).style.transform="translateY(-6px)"; (e.currentTarget as HTMLElement).style.boxShadow="0 20px 48px rgba(0,71,204,.14)"; }}
                onMouseOut={e=>{ (e.currentTarget as HTMLElement).style.transform=""; (e.currentTarget as HTMLElement).style.boxShadow="0 4px 16px rgba(0,71,204,.06)"; }}>
                {/* Connector line */}
                {i<3 && <div className="hidden lg:block absolute top-14 left-full w-5 h-0.5 z-10" style={{ background:"linear-gradient(90deg,#0047CC,#D8E4F5)" }} />}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background:"linear-gradient(135deg,#0047CC,#1A6BFF)", boxShadow:"0 8px 20px rgba(0,71,204,.32)" }}>
                  <span className="font-extrabold text-white text-xl" style={{ fontFamily:"'Outfit',sans-serif" }}>{s.n}</span>
                </div>
                <h3 className="font-bold text-base mb-2" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:"#0A1628" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color:"#6B7FA3", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="text-center">
            <a href="#leadform" className="inline-flex items-center gap-2 rounded-xl text-white font-bold text-base px-10 py-4 no-underline transition-all duration-200"
              style={{ background:"linear-gradient(135deg,#0047CC,#1A6BFF)", boxShadow:"0 4px 20px rgba(0,71,204,.38)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}
              onMouseOver={e=>(e.currentTarget as HTMLElement).style.transform="translateY(-2px)"}
              onMouseOut={e=>(e.currentTarget as HTMLElement).style.transform=""}>Start My Repair →</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── CTA STRIP ── */
function CTAStrip() {
  return (
    <div className="py-16 relative overflow-hidden" style={{ background:"linear-gradient(135deg,#0047CC,#0066FF,#0099FF)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"radial-gradient(circle,rgba(255,255,255,.08) 1.5px,transparent 1.5px)", backgroundSize:"28px 28px" }} />
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <Reveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-extrabold text-white mb-2" style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(1.8rem,3.5vw,2.8rem)" }}>Need Repair Today?</h3>
              <p style={{ color:"rgba(255,255,255,.8)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Technicians across Andheri, Bandra, Thane, Navi Mumbai, Dadar, Borivali & more.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label:"📞 8282822265", href:"tel:+918282822265", style:{ background:"#fff", color:"#0047CC", boxShadow:"0 4px 20px rgba(0,0,0,.15)" } },
                { label:"💬 WhatsApp",   href:"https://wa.me/918282822265", style:{ background:"linear-gradient(135deg,#25D366,#128C7E)", color:"#fff", boxShadow:"0 4px 16px rgba(37,211,102,.35)" } },
                { label:"Get Free Quote", href:"#leadform", style:{ background:"rgba(255,255,255,.15)", color:"#fff", border:"2px solid rgba(255,255,255,.4)", backdropFilter:"blur(8px)" } },
              ].map(b=>(
                <a key={b.label} href={b.href} className="inline-flex items-center gap-2 rounded-xl font-bold text-sm px-7 py-3.5 no-underline transition-all duration-200"
                  style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", ...b.style }}
                  onMouseOver={e=>(e.currentTarget as HTMLElement).style.transform="translateY(-2px)"}
                  onMouseOut={e=>(e.currentTarget as HTMLElement).style.transform=""}>{b.label}</a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ── BENEFITS ── */
const BENEFITS = [
  { num:"01", icon:"⚡", title:"Stop the Spiral of Damage",     desc:"A faulty drum bearing can destroy the motor in weeks. Early repair costs a fraction of replacement." },
  { num:"02", icon:"💡", title:"Cut Your Electricity Bills",     desc:"A malfunctioning machine uses 30–40% more power. A repair pays for itself in months." },
  { num:"03", icon:"🏠", title:"Prevent Water Damage",           desc:"A leaking machine can damage flooring, walls, and electronics. Fix before disaster strikes." },
  { num:"04", icon:"♻️", title:"Extend Life by 5+ Years",        desc:"A well-maintained machine lasts 12–15 years. Repair is always smarter than replace." },
  { num:"05", icon:"🔒", title:"Safety for Your Family",         desc:"Electrical faults are a fire and shock risk. A certified repair removes the danger." },
  { num:"06", icon:"💸", title:"Save ₹15,000–₹40,000",          desc:"Most repairs cost ₹500–₹4,000. New machines cost ₹15K–₹40K. The math is simple." },
];
function BenefitsSection() {
  return (
    <section className="py-24" style={{ background:"linear-gradient(135deg,#EEF4FF,#F7F9FF,#E8F1FF)", backgroundImage:"radial-gradient(circle,rgba(0,71,204,.07) 1.5px,transparent 1.5px)", backgroundSize:"28px 28px" }}>
      <div className="max-w-7xl mx-auto px-5">
        <Reveal>
          <div className="text-center mb-14">
            <SectionTitle pill="Why Repair Now?" h="Delaying Costs " accent="You More" sub="A small issue ignored today becomes a major replacement expense tomorrow." center />
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b,i)=>(
            <Reveal key={b.num} delay={i*70}>
              <div className="bg-white border rounded-2xl p-6 h-full transition-all duration-300"
                style={{ borderColor:"#D8E4F5", boxShadow:"0 2px 10px rgba(0,71,204,.05)" }}
                onMouseOver={e=>{ (e.currentTarget as HTMLElement).style.transform="translateY(-6px)"; (e.currentTarget as HTMLElement).style.boxShadow="0 20px 50px rgba(0,71,204,.14)"; }}
                onMouseOut={e=>{ (e.currentTarget as HTMLElement).style.transform=""; (e.currentTarget as HTMLElement).style.boxShadow="0 2px 10px rgba(0,71,204,.05)"; }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-bold text-xs" style={{ color:"#1A6BFF", fontFamily:"'JetBrains Mono',monospace" }}>{b.num}</span>
                  <span className="text-xl">{b.icon}</span>
                </div>
                <h3 className="font-bold text-base mb-2" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:"#0A1628" }}>{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color:"#6B7FA3", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ── */
const TESTIMONIALS = [
  { name:"Priya Nair",    role:"HR Manager, Andheri West",   a:"P", color:"linear-gradient(135deg,#0047CC,#1A6BFF)", text:"Repair was done within 3 hours in Andheri. Technician was professional and pricing completely transparent. Highly recommended!" },
  { name:"Rohit Sharma",  role:"IT Professional, Bandra",    a:"R", color:"linear-gradient(135deg,#3b82f6,#6366f1)", text:"Called at 10am, technician at my door by 1pm in Bandra. Fixed an error code same day. Outstanding!" },
  { name:"Anita Rao",     role:"Homemaker, Thane West",      a:"A", color:"linear-gradient(135deg,#0099CC,#00C3FF)", text:"Most affordable and transparent service. Drainage fixed in one visit. The 90-day warranty gave me complete peace of mind." },
  { name:"Suresh Kapoor", role:"Business Owner, Borivali",   a:"S", color:"linear-gradient(135deg,#f59e0b,#d97706)", text:"Machine was making terrible noise. Drum bearing replaced same day. No more noise — runs perfectly!" },
  { name:"Meera Joshi",   role:"Teacher, Navi Mumbai",       a:"M", color:"linear-gradient(135deg,#8b5cf6,#7c3aed)", text:"Water was leaking everywhere. Technician identified the inlet valve instantly. Fixed in 90 minutes. Brilliant!" },
  { name:"Kavita Patil",  role:"Nurse, Dadar",               a:"K", color:"linear-gradient(135deg,#ec4899,#be185d)", text:"Machine stopped mid-cycle. Came in 2 hours to Dadar, fixed the door lock and gave 90-day warranty. Excellent!" },
];
function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <Reveal>
          <div className="text-center mb-14">
            <SectionTitle pill="Customer Reviews" h="What Mumbai Customers " accent="Say About Us" sub="Real reviews. 4.8★ on Google with 1,330+ ratings." center />
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {TESTIMONIALS.map((t,i)=>(
            <Reveal key={t.name} delay={i*70}>
              <div className="bg-white border rounded-2xl p-7 h-full transition-all duration-300"
                style={{ borderColor:"#D8E4F5", boxShadow:"0 2px 10px rgba(0,71,204,.05)" }}
                onMouseOver={e=>{ (e.currentTarget as HTMLElement).style.transform="translateY(-5px)"; (e.currentTarget as HTMLElement).style.borderColor="#93C5FD"; (e.currentTarget as HTMLElement).style.boxShadow="0 18px 44px rgba(0,71,204,.12)"; }}
                onMouseOut={e=>{ (e.currentTarget as HTMLElement).style.transform=""; (e.currentTarget as HTMLElement).style.borderColor="#D8E4F5"; (e.currentTarget as HTMLElement).style.boxShadow="0 2px 10px rgba(0,71,204,.05)"; }}>
                <div className="text-yellow-400 text-sm mb-3">★★★★★</div>
                <p className="text-sm leading-relaxed mb-5" style={{ color:"#2E3F5C", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-base flex-shrink-0" style={{ background:t.color }}>{t.a}</div>
                  <div>
                    <div className="font-bold text-sm" style={{ color:"#0A1628", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{t.name}</div>
                    <div className="text-xs" style={{ color:"#6B7FA3", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-4 rounded-2xl px-7 py-4 border" style={{ background:"#F0F6FF", borderColor:"#D8E4F5" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-xl" style={{ background:"#FFC107" }}>G</div>
              <div>
                <div className="font-bold" style={{ color:"#0A1628", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>⭐ 4.8 / 5 on Google</div>
                <div className="text-xs" style={{ color:"#6B7FA3", fontFamily:"'JetBrains Mono',monospace" }}>Based on 1,330+ verified reviews</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── OFFER BANNER ── */
function OfferBanner() {
  return (
    <section className="py-20" style={{ background:"#F0F6FF" }}>
      <div className="max-w-3xl mx-auto px-5">
        <Reveal>
          <div className="rounded-3xl p-14 text-center relative overflow-hidden" style={{ background:"linear-gradient(135deg,#0047CC,#0066EE,#0099FF)", boxShadow:"0 28px 80px rgba(0,71,204,.42)" }}>
            {/* Decorative circles */}
            <div className="absolute pointer-events-none" style={{ width:280,height:280,top:-80,right:-80,background:"rgba(255,255,255,.06)",borderRadius:"50%" }} />
            <div className="absolute pointer-events-none" style={{ width:380,height:380,bottom:-100,left:"15%",background:"rgba(255,255,255,.04)",borderRadius:"50%" }} />

            <div className="relative z-10">
              <Pill white>Limited Time Offer</Pill>
              <h2 className="mt-5 mb-3 text-white font-extrabold" style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(2rem,4vw,3.2rem)" }}>FREE Appliance Health Check</h2>
              <div className="inline-block rounded-full px-6 py-2 font-bold text-base mb-5" style={{ background:"#FFB800", color:"#000", fontFamily:"'JetBrains Mono',monospace" }}>Worth ₹499 — FREE</div>
              <p className="text-base leading-relaxed mb-8" style={{ color:"rgba(255,255,255,.88)", maxWidth:520, margin:"0 auto 32px", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                Book your repair today and get a complete appliance health check absolutely free. Our technician inspects your entire machine and flags hidden issues.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="#leadform" className="inline-flex items-center gap-2 rounded-xl font-extrabold text-base px-9 py-4 no-underline transition-all duration-200"
                  style={{ background:"#fff", color:"#0047CC", boxShadow:"0 4px 20px rgba(0,0,0,.2)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}
                  onMouseOver={e=>(e.currentTarget as HTMLElement).style.transform="translateY(-2px)"}
                  onMouseOut={e=>(e.currentTarget as HTMLElement).style.transform=""}>🎁 Claim Free Check Now</a>
                <a href="https://wa.me/918282822265" className="inline-flex items-center gap-2 rounded-xl text-white font-bold text-base px-9 py-4 no-underline transition-all duration-200"
                  style={{ background:"linear-gradient(135deg,#25D366,#128C7E)", boxShadow:"0 4px 16px rgba(37,211,102,.35)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}
                  onMouseOver={e=>(e.currentTarget as HTMLElement).style.transform="translateY(-2px)"}
                  onMouseOut={e=>(e.currentTarget as HTMLElement).style.transform=""}>💬 WhatsApp to Book</a>
              </div>
              <p className="mt-5 text-xs" style={{ color:"rgba(255,255,255,.45)", fontFamily:"'JetBrains Mono',monospace" }}>*Valid for new customers in Mumbai. One free check per booking.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── OTHER SERVICES ── */
const OTHER_SERVICES = [
  { icon:"❄️", name:"AC Repair",           sub:"Gas refill, coil cleaning, compressor." },
  { icon:"🧊", name:"Refrigerator Repair", sub:"Cooling, compressor, thermostat, gas." },
  { icon:"📺", name:"TV Repair",           sub:"LED, LCD, Smart TV panel & board." },
  { icon:"🍳", name:"Microwave Repair",    sub:"Magnetron, door, control panel." },
  { icon:"🍽️", name:"Dishwasher Repair",   sub:"Drainage, pump, door latch." },
  { icon:"🌀", name:"Dryer Repair",        sub:"Heating element, drum belt, motor." },
];
function OtherServicesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <Reveal>
          <div className="text-center mb-14">
            <SectionTitle pill="More From Us" h="We Also Repair " accent="Other Appliances" center />
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {OTHER_SERVICES.map((s,i)=>(
            <Reveal key={s.name} delay={i*60}>
              <a href="#leadform" className="flex items-center gap-4 bg-white border rounded-2xl p-5 no-underline group transition-all duration-250"
                style={{ borderColor:"#D8E4F5" }}
                onMouseOver={e=>{ (e.currentTarget as HTMLElement).style.transform="translateY(-4px)"; (e.currentTarget as HTMLElement).style.borderColor="#93C5FD"; (e.currentTarget as HTMLElement).style.boxShadow="0 12px 30px rgba(0,71,204,.12)"; }}
                onMouseOut={e=>{ (e.currentTarget as HTMLElement).style.transform=""; (e.currentTarget as HTMLElement).style.borderColor="#D8E4F5"; (e.currentTarget as HTMLElement).style.boxShadow="none"; }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-all duration-250"
                  style={{ background:"#E8F1FF", border:"1.5px solid #D8E4F5" }}>
                  {s.icon}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm" style={{ color:"#0A1628", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{s.name}</div>
                  <div className="text-xs mt-0.5" style={{ color:"#6B7FA3", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{s.sub}</div>
                </div>
                <span className="text-xl transition-all duration-200 opacity-30 group-hover:opacity-100 group-hover:translate-x-1" style={{ color:"#0047CC" }}>→</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ── */
const FAQS = [
  { q:"How much does washing machine repair cost in Mumbai?", a:"Typically ₹500 to ₹4,000 depending on the issue, brand, and parts. We give a transparent quote before starting — no surprises ever." },
  { q:"Do you provide same-day service?", a:"Yes! Same-day is our speciality. Book before 2pm and a certified technician arrives same day across all major Mumbai areas." },
  { q:"Do you use genuine spare parts?", a:"Absolutely. 100% genuine OEM-standard parts only. No cheap alternatives — that's why we offer a confident 90-day warranty." },
  { q:"What warranty do you provide?", a:"Every repair comes with a 90-day written warranty. Same issue reappears within 90 days? We fix it at zero extra charge." },
  { q:"Which areas in Mumbai do you cover?", a:"All areas: Andheri, Bandra, Juhu, Borivali, Kandivali, Malad, Goregaon, Kurla, Dadar, Thane, Navi Mumbai, Powai, Mulund, Ghatkopar, and more." },
  { q:"Is it better to repair or replace?", a:"In most cases, repair wins easily. A new machine costs ₹15,000–₹40,000+. Most repairs cost ₹500–₹4,000. The math speaks for itself." },
  { q:"Which brands do you repair?", a:"All major brands — front load, top load, semi-automatic. We handle all models from every leading manufacturer." },
];
function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-24" style={{ background:"linear-gradient(135deg,#EEF4FF,#F7F9FF,#E8F1FF)", backgroundImage:"radial-gradient(circle,rgba(0,71,204,.07) 1.5px,transparent 1.5px)", backgroundSize:"28px 28px" }}>
      <div className="max-w-3xl mx-auto px-5">
        <Reveal>
          <div className="text-center mb-14">
            <SectionTitle pill="FAQ" h="Frequently Asked " accent="Questions" center />
          </div>
        </Reveal>
        <div className="flex flex-col gap-3">
          {FAQS.map((faq,i)=>(
            <Reveal key={i} delay={i*50}>
              <div className="bg-white border rounded-2xl overflow-hidden transition-all duration-300"
                style={{ borderColor: open===i ? "#93C5FD" : "#D8E4F5", boxShadow: open===i ? "0 8px 24px rgba(0,71,204,.10)" : "none" }}>
                <button className="w-full flex items-center justify-between gap-4 p-5 text-left bg-transparent border-none cursor-pointer"
                  onClick={()=>setOpen(open===i?-1:i)}>
                  <span className="font-semibold text-sm leading-snug" style={{ color:"#0A1628", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{faq.q}</span>
                  <span className="text-2xl flex-shrink-0 transition-transform duration-300 font-light" style={{ color:"#0047CC", transform: open===i?"rotate(180deg)":"" }}>
                    {open===i ? "−" : "+"}
                  </span>
                </button>
                <div className="overflow-hidden transition-all duration-500" style={{ maxHeight: open===i ? 260 : 0 }}>
                  <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color:"#6B7FA3", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{faq.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── BOTTOM LEAD FORM ── */
function LeadFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault(); setSending(true);
    try { await fetch("https://formspree.io/f/mgollvyl",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(e.target)))}); } catch {}
    setSending(false); setSubmitted(true);
  };
  const checklist = ["Same day technician dispatch","90-day warranty on all repairs","100% genuine spare parts used","Transparent pricing — no hidden charges","Free health check (worth ₹499)","All Mumbai areas covered"];
  return (
    <section id="leadform" className="py-24" style={{ background:"#F7F9FF" }}>
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <Reveal dir="left">
            <div>
              <SectionTitle pill="Book Your Repair" h="Don't Wait — " accent="Fix It Today" sub="Expert repair at your doorstep. Same day. Guaranteed across Mumbai." />
              <div className="flex flex-col gap-3 mt-8 mb-10">
                {checklist.map(c=>(
                  <div key={c} className="flex items-center gap-3 text-sm" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                    <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background:"#E8F1FF", border:"1.5px solid rgba(0,71,204,.2)" }}>
                      <span className="text-xs font-bold" style={{ color:"#0047CC" }}>✓</span>
                    </div>
                    <span style={{ color:"#2E3F5C", fontWeight:500 }}>{c}</span>
                  </div>
                ))}
              </div>
              <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow:"0 16px 50px rgba(0,71,204,.15)" }}>
                <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80&auto=format" alt="Technician" className="w-full object-cover" style={{ height:220 }} />
                <div className="absolute inset-0" style={{ background:"linear-gradient(180deg,transparent 20%,rgba(0,20,60,.92) 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-5 flex gap-3">
                  <a href="tel:+918282822265" className="flex-1 text-center rounded-xl text-white font-bold text-sm py-3 no-underline"
                    style={{ background:"linear-gradient(135deg,#0047CC,#1A6BFF)", boxShadow:"0 4px 16px rgba(0,71,204,.4)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>📞 8282822265</a>
                  <a href="https://wa.me/918282822265" className="flex-1 text-center rounded-xl text-white font-bold text-sm py-3 no-underline"
                    style={{ background:"linear-gradient(135deg,#25D366,#128C7E)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>💬 WhatsApp</a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal dir="right">
            <div className="rounded-3xl bg-white border p-9 relative overflow-hidden" style={{ borderColor:"rgba(0,71,204,.2)", boxShadow:"0 24px 70px rgba(0,71,204,.14)" }}>
              <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl" style={{ background:"linear-gradient(90deg,#0047CC,#4D9FFF)" }} />
              <h3 className="font-bold text-2xl mb-1 mt-1" style={{ fontFamily:"'Outfit',sans-serif", color:"#0A1628" }}>Book Your Repair</h3>
              <p className="text-sm mb-6" style={{ color:"#6B7FA3", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>We'll call you back within 30 minutes.</p>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">✅</div>
                  <div className="font-bold text-xl mb-2" style={{ fontFamily:"'Outfit',sans-serif", color:"#0A1628" }}>Submitted!</div>
                  <p style={{ color:"#6B7FA3" }}>We'll call you back within 30 minutes.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {[
                    {label:"Your Name *",name:"name",type:"text",ph:"e.g. Rahul Mehta",req:true},
                    {label:"Mobile Number *",name:"phone",type:"tel",ph:"+91 XXXXX XXXXX",req:true},
                    {label:"Area in Mumbai *",name:"area",type:"text",ph:"Andheri, Bandra, Thane...",req:true},
                  ].map(f=>(
                    <div key={f.name}>
                      <label className="block text-xs font-bold mb-1.5 uppercase tracking-widest" style={{ color:"#6B7FA3", fontFamily:"'JetBrains Mono',monospace" }}>{f.label}</label>
                      <input type={f.type} name={f.name} placeholder={f.ph} required={f.req}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                        style={{ background:"#F0F6FF", border:"1.5px solid #D8E4F5", color:"#0A1628", fontFamily:"'Plus Jakarta Sans',sans-serif" }}
                        onFocus={e=>{ (e.target as HTMLElement).style.borderColor="#1A6BFF"; (e.target as HTMLElement).style.background="#fff"; (e.target as HTMLElement).style.boxShadow="0 0 0 4px rgba(26,107,255,.10)"; }}
                        onBlur={e=>{ (e.target as HTMLElement).style.borderColor="#D8E4F5"; (e.target as HTMLElement).style.background="#F0F6FF"; (e.target as HTMLElement).style.boxShadow="none"; }} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-bold mb-1.5 uppercase tracking-widest" style={{ color:"#6B7FA3", fontFamily:"'JetBrains Mono',monospace" }}>Machine Type</label>
                    <select name="brand" className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background:"#F0F6FF", border:"1.5px solid #D8E4F5", color:"#0A1628", fontFamily:"'Plus Jakarta Sans',sans-serif", appearance:"none", cursor:"pointer" }}>
                      <option value="">Select type...</option>
                      {["Front Load","Top Load","Semi-Automatic","Other"].map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5 uppercase tracking-widest" style={{ color:"#6B7FA3", fontFamily:"'JetBrains Mono',monospace" }}>Describe the Problem</label>
                    <textarea name="message" rows={3} placeholder="e.g. Machine not spinning, leaking water..."
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                      style={{ background:"#F0F6FF", border:"1.5px solid #D8E4F5", color:"#0A1628", fontFamily:"'Plus Jakarta Sans',sans-serif" }}
                      onFocus={e=>{ (e.target as HTMLElement).style.borderColor="#1A6BFF"; (e.target as HTMLElement).style.background="#fff"; (e.target as HTMLElement).style.boxShadow="0 0 0 4px rgba(26,107,255,.10)"; }}
                      onBlur={e=>{ (e.target as HTMLElement).style.borderColor="#D8E4F5"; (e.target as HTMLElement).style.background="#F0F6FF"; (e.target as HTMLElement).style.boxShadow="none"; }} />
                  </div>
                  <button type="submit" disabled={sending}
                    className="w-full rounded-xl text-white font-bold py-4 text-base transition-all duration-200"
                    style={{ background:"linear-gradient(135deg,#0047CC,#1A6BFF)", boxShadow:"0 4px 20px rgba(0,71,204,.35)", fontFamily:"'Plus Jakarta Sans',sans-serif", opacity:sending?.7:1 }}
                    onMouseOver={e=>!sending&&((e.currentTarget as HTMLElement).style.transform="translateY(-2px)")}
                    onMouseOut={e=>(e.currentTarget as HTMLElement).style.transform=""}>
                    {sending ? "⏳ Sending..." : "🔧 Book My Repair Now"}
                  </button>
                  <div className="flex justify-center gap-3 text-xs flex-wrap" style={{ color:"#6B7FA3", fontFamily:"'JetBrains Mono',monospace" }}>
                    <span>✓ 90-Day Warranty</span><span className="opacity-30">|</span><span>✓ Free Health Check</span><span className="opacity-30">|</span><span>✓ No Hidden Charges</span>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer id="contact" className="pt-16 pb-8" style={{ background:"#0A1628" }}>
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:"linear-gradient(135deg,#0047CC,#1A6BFF)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="1.5"/>{[0,90,180,270].map(a=>{const r=a*Math.PI/180;return<circle key={a} cx={12+6*Math.sin(r)} cy={12-6*Math.cos(r)} r="1.2" fill="#fff"/>;})}</svg>
              </div>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:20, color:"#fff" }}>Rapid<span style={{ color:"#4D9FFF" }}>Fix</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color:"rgba(255,255,255,.5)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Mumbai's most trusted repair service. Same day. 90-day warranty. All Mumbai areas.</p>
            <div className="flex flex-col gap-2">
              {[["📞 8282822265","tel:+918282822265"],["💬 WhatsApp","https://wa.me/918282822265"],["✉️ service@repair.in","mailto:service@repair.in"]].map(([l,h])=>(
                <a key={l} href={h} className="text-sm no-underline transition-colors duration-200" style={{ color:"rgba(255,255,255,.55)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}
                  onMouseOver={e=>(e.target as HTMLElement).style.color="#fff"} onMouseOut={e=>(e.target as HTMLElement).style.color="rgba(255,255,255,.55)"}>{l}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color:"#4D9FFF", fontFamily:"'JetBrains Mono',monospace" }}>Services</div>
            <div className="flex flex-col gap-2">
              {["Washing Machine Repair","Front Load Repair","Top Load Repair","Semi-Automatic Repair","PCB Board Repair","Motor Replacement"].map(s=>(
                <a key={s} href="#leadform" className="text-sm no-underline transition-colors duration-200" style={{ color:"rgba(255,255,255,.5)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}
                  onMouseOver={e=>(e.target as HTMLElement).style.color="#fff"} onMouseOut={e=>(e.target as HTMLElement).style.color="rgba(255,255,255,.5)"}>{s}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color:"#4D9FFF", fontFamily:"'JetBrains Mono',monospace" }}>Areas</div>
            <div className="grid grid-cols-2 gap-2">
              {["Andheri","Bandra","Borivali","Thane","Navi Mumbai","Dadar","Kurla","Powai"].map(a=>(
                <a key={a} href="#leadform" className="text-sm no-underline transition-colors duration-200" style={{ color:"rgba(255,255,255,.5)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}
                  onMouseOver={e=>(e.target as HTMLElement).style.color="#fff"} onMouseOut={e=>(e.target as HTMLElement).style.color="rgba(255,255,255,.5)"}>{a}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color:"#4D9FFF", fontFamily:"'JetBrains Mono',monospace" }}>Quick Links</div>
            <div className="flex flex-col gap-2">
              {[["How It Works","#how-it-works"],["Reviews","#testimonials"],["FAQ","#faq"],["Book Repair","#leadform"]].map(([l,h])=>(
                <a key={l} href={h} className="text-sm no-underline transition-colors duration-200" style={{ color:"rgba(255,255,255,.5)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}
                  onMouseOver={e=>(e.target as HTMLElement).style.color="#fff"} onMouseOut={e=>(e.target as HTMLElement).style.color="rgba(255,255,255,.5)"}>{l}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 mb-8" style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)" }}>
          <div>
            <div className="font-bold text-white text-sm" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Ready to fix your washing machine?</div>
            <div className="text-xs" style={{ color:"rgba(255,255,255,.5)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Same Day Repair. All Mumbai areas.</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="tel:+918282822265" className="rounded-xl text-white font-bold text-xs px-5 py-2.5 no-underline" style={{ background:"linear-gradient(135deg,#0047CC,#1A6BFF)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>📞 Call</a>
            <a href="https://wa.me/918282822265" className="rounded-xl text-white font-bold text-xs px-5 py-2.5 no-underline" style={{ background:"linear-gradient(135deg,#25D366,#128C7E)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>💬 WhatsApp</a>
            <a href="#leadform" className="rounded-xl font-bold text-xs px-5 py-2.5 no-underline" style={{ background:"rgba(255,255,255,.1)", color:"#fff", border:"1px solid rgba(255,255,255,.2)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Book Online</a>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2 pt-6" style={{ borderTop:"1px solid rgba(255,255,255,.08)" }}>
          <p className="text-xs" style={{ color:"rgba(255,255,255,.3)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>© 2026 RapidFix. All rights reserved. | Washing Machine Repair Mumbai</p>
          <p className="text-xs" style={{ color:"rgba(255,255,255,.2)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>*Independent repair service. Not affiliated with any brand.</p>
        </div>
      </div>
    </footer>
  );
}

/* ── FLOATING BUTTONS ── */
function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <a href="tel:+918282822265" className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl no-underline transition-all duration-200"
        style={{ background:"linear-gradient(135deg,#0047CC,#1A6BFF)", boxShadow:"0 8px 24px rgba(0,71,204,.45)" }}
        onMouseOver={e=>(e.currentTarget as HTMLElement).style.transform="translateY(-3px) scale(1.05)"}
        onMouseOut={e=>(e.currentTarget as HTMLElement).style.transform=""} title="Call">📞</a>
      <a href="https://wa.me/918282822265" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl no-underline transition-all duration-200"
        style={{ background:"linear-gradient(135deg,#25D366,#128C7E)", boxShadow:"0 8px 24px rgba(37,211,102,.45)" }}
        onMouseOver={e=>(e.currentTarget as HTMLElement).style.transform="translateY(-3px) scale(1.05)"}
        onMouseOut={e=>(e.currentTarget as HTMLElement).style.transform=""} title="WhatsApp">💬</a>
    </div>
  );
}

/* ── KEYFRAMES via style tag ── */
const GlobalStyles = () => (
  <style>{`
    @keyframes ticker    { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    @keyframes spinDrum  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes blobMorph { 0%,100%{border-radius:60% 40% 70% 30%/50% 60% 40% 50%} 50%{border-radius:40% 60% 50% 50%/70% 30% 60% 40%} }
    @keyframes pulseRing { 0%{transform:scale(1);opacity:1} 100%{transform:scale(2.6);opacity:0} }
    @keyframes glowPulse { 0%,100%{box-shadow:0 20px 60px rgba(0,71,204,.12),0 4px 12px rgba(0,71,204,.05)} 50%{box-shadow:0 20px 60px rgba(0,71,204,.22),0 4px 24px rgba(0,71,204,.12)} }
    @keyframes floatA    { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(1deg)} }
    @keyframes floatB    { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(-1deg)} }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    ::-webkit-scrollbar { width:4px }
    ::-webkit-scrollbar-track { background:#E8F1FF }
    ::-webkit-scrollbar-thumb { background:#1A6BFF; border-radius:2px }
  `}</style>
);

/* ── ROOT ── */
export default function WashRepairPage() {
  return (
    <>
      <GlobalStyles />
      <FontLoader />
      <Navbar />
      <Hero />
      <TickerBar />
      <StatsSection />
      <ProblemsSection />
      <WhyUsSection />
      <ImageMarquee />
      <HowItWorksSection />
      <CTAStrip />
      <BenefitsSection />
      <TestimonialsSection />
      <OfferBanner />
      <OtherServicesSection />
      <FAQSection />
      <LeadFormSection />
      <Footer />
      <FloatingButtons />
    </>
  );
}