import { useState, useEffect, useRef } from "react";
import {
  Wind, Phone, ChevronDown, Star, CheckCircle2, ArrowRight,
  MapPin, Clock, Shield, Wrench, Snowflake, Droplets,
  Volume2, Power, Settings, AlertTriangle, Send, Zap,
  ThumbsUp, Filter, BadgeCheck
} from "lucide-react";
import BookingSection from "../BookingSection";

const BRANDS = ["Daikin","LG","Samsung","Voltas","Blue Star","Carrier","Hitachi","Panasonic","O General","Lloyd","Godrej","Whirlpool"];
const AC_TYPES = ["Split AC","Window AC","Inverter AC","Cassette AC","Tower AC","Portable AC"];
const ISSUES = [
  { icon: Snowflake,     label: "Not Cooling",         desc: "Room not reaching desired temp" },
  { icon: Droplets,      label: "Water Dripping",       desc: "Leaking from indoor unit" },
  { icon: Volume2,       label: "Noisy Unit",           desc: "Unusual sounds during operation" },
  { icon: Power,         label: "Not Starting",         desc: "AC won't power on at all" },
  { icon: Filter,        label: "Gas Refill",           desc: "Low refrigerant top-up needed" },
  { icon: Settings,      label: "Servicing & Cleaning", desc: "Annual maintenance & deep clean" },
];
const STEPS = [
  { n:"01", title:"Fill the Form",     desc:"Quick 2-min booking with your details" },
  { n:"02", title:"We Confirm",        desc:"Call back within 30 min to schedule" },
  { n:"03", title:"Expert Arrives",    desc:"Certified tech at your door on time" },
  { n:"04", title:"AC Fixed",          desc:"Tested, repaired, warranty included" },
];
const REVIEWS = [
  { name:"Arjun S.", city:"Delhi",     stars:5, brand:"Voltas",    text:"Voltas split AC stopped cooling in peak summer. Team arrived in under 2 hours. Fixed gas issue on the spot. Incredible service!" },
  { name:"Deepika M.", city:"Mumbai",  stars:5, brand:"Daikin",    text:"Daikin inverter throwing error codes. Technician diagnosed a PCB fault and had it fixed same day. Very knowledgeable." },
  { name:"Vikram R.", city:"Hyderabad",stars:5, brand:"Blue Star", text:"Annual servicing done thoroughly. Blue Star is running so much better and quieter now. Fair pricing, no hidden charges." },
];
const FAQS = [
  ["How soon can you send a technician?","We dispatch within 1–3 hours in major cities. Same-day service available across all our locations."],
  ["Do you service all AC types?","Yes — split, window, inverter, cassette, tower and portable ACs across all brands."],
  ["What does gas refill cost?","Gas refill typically costs ₹1,200–₹2,500 depending on tonnage and refrigerant type (R22/R32/R410A)."],
  ["Is the visiting charge refundable?","The ₹199 visit charge is adjusted against the repair bill if you proceed with the repair."],
  ["What warranty do you offer?","30-day warranty on all parts and labor. Gas refill comes with a 60-day warranty."],
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

function AnimSection({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style
    }}>{children}</div>
  );
}

export default function ACRepairPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    const dur = 1800, steps = 60;
    let i = 0;
    const t = setInterval(() => {
      i++;
      const p = i / steps;
      const ease = 1 - Math.pow(1 - p, 3);
      setCount1(Math.floor(ease * 80000));
      setCount2(Math.floor(ease * 49) / 10);
      setCount3(Math.floor(ease * 99));
      if (i >= steps) clearInterval(t);
    }, dur / steps);
    return () => clearInterval(t);
  }, [statsVisible]);

  return (
    <div style={{ fontFamily:"'Outfit', 'Segoe UI', sans-serif", background:"#fff", color:"#0f172a", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior: smooth; }

        .ac-nav { position:fixed; top:0; left:0; right:0; z-index:200; transition: all 0.4s; }
        .ac-nav.scrolled { background:rgba(255,255,255,0.95); backdrop-filter:blur(20px); box-shadow:0 1px 20px rgba(2,132,199,0.1); }

        .ac-hero {
          min-height: 100vh;
          background: linear-gradient(135deg, #0c4a6e 0%, #0369a1 40%, #0ea5e9 100%);
          position: relative; overflow: hidden;
          display: flex; align-items: center;
        }
        .ac-hero::before {
          content:''; position:absolute; inset:0;
          background: radial-gradient(ellipse 60% 70% at 80% 50%, rgba(186,230,253,0.15) 0%, transparent 70%);
        }
        .hero-grid-lines {
          position:absolute; inset:0; opacity:0.07;
          background-image: linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .ac-blob {
          position:absolute; border-radius:50%;
          background: rgba(255,255,255,0.06);
          animation: blobFloat 8s ease-in-out infinite;
        }
        @keyframes blobFloat { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,-30px) scale(1.05)} 66%{transform:translate(-15px,20px) scale(0.95)} }

        .hero-badge {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(255,255,255,0.15); backdrop-filter:blur(10px);
          border:1px solid rgba(255,255,255,0.25); border-radius:999px;
          padding:8px 18px; font-size:13px; font-weight:600; color:#fff;
          animation: fadeSlideDown 0.8s ease forwards;
        }
        @keyframes fadeSlideDown { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }

        .hero-h1 { 
          font-size:clamp(2.6rem,6vw,4.2rem); font-weight:900; color:#fff; 
          line-height:1.08; letter-spacing:-0.02em;
          animation: fadeSlideUp 0.9s 0.2s ease both;
        }
        .hero-sub { 
          font-size:clamp(1rem,2vw,1.15rem); color:rgba(255,255,255,0.8); 
          line-height:1.7; max-width:480px;
          animation: fadeSlideUp 0.9s 0.35s ease both;
        }
        .hero-btns { animation: fadeSlideUp 0.9s 0.5s ease both; }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

        .btn-white {
          display:inline-flex; align-items:center; gap:8px;
          background:#fff; color:#0369a1; border:none;
          border-radius:12px; padding:14px 28px; font-size:15px; font-weight:700;
          cursor:pointer; text-decoration:none; transition:all 0.25s;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .btn-white:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(0,0,0,0.2); }

        .btn-ghost {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(255,255,255,0.15); color:#fff;
          border:1.5px solid rgba(255,255,255,0.35);
          border-radius:12px; padding:13px 28px; font-size:15px; font-weight:600;
          cursor:pointer; text-decoration:none; transition:all 0.25s; backdrop-filter:blur(8px);
        }
        .btn-ghost:hover { background:rgba(255,255,255,0.25); transform:translateY(-2px); }

        .btn-primary {
          display:inline-flex; align-items:center; gap:8px;
          background:linear-gradient(135deg,#0369a1,#0ea5e9); color:#fff;
          border:none; border-radius:12px; padding:14px 28px;
          font-size:15px; font-weight:700; cursor:pointer; transition:all 0.25s;
          box-shadow: 0 4px 20px rgba(3,105,161,0.35);
        }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(3,105,161,0.45); }

        .hero-visual {
          position:relative; display:flex; align-items:center; justify-content:center;
          animation: fadeSlideUp 1s 0.4s ease both;
        }
        .hero-ring {
          width:320px; height:320px; border-radius:50%;
          border:1.5px solid rgba(255,255,255,0.15);
          display:flex; align-items:center; justify-content:center;
          position:relative; animation:spinSlow 20s linear infinite;
        }
        .hero-ring-inner {
          width:240px; height:240px; border-radius:50%;
          background:rgba(255,255,255,0.1); backdrop-filter:blur(10px);
          border:1.5px solid rgba(255,255,255,0.2);
          display:flex; align-items:center; justify-content:center;
          animation:spinSlow 20s linear infinite reverse;
        }
        .hero-icon-center {
          width:140px; height:140px; border-radius:28px;
          background:rgba(255,255,255,0.15); backdrop-filter:blur(20px);
          border:1.5px solid rgba(255,255,255,0.3);
          display:flex; align-items:center; justify-content:center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
          animation:floatUpDown 4s ease-in-out infinite;
        }
        @keyframes spinSlow { to{transform:rotate(360deg)} }
        @keyframes floatUpDown { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }

        .orbit-dot {
          position:absolute; width:12px; height:12px; border-radius:50%; background:#fff;
          box-shadow:0 0 12px rgba(255,255,255,0.8);
        }

        .trust-bar {
          background:#fff; border-bottom:1px solid #e0f2fe;
          padding:16px 0;
        }

        .section { padding:88px 0; }
        .section-alt { background:#f8faff; }
        .container { max-width:1160px; margin:0 auto; padding:0 24px; }

        .section-eyebrow {
          display:inline-block; font-size:12px; font-weight:700; letter-spacing:0.1em;
          text-transform:uppercase; color:#0369a1;
          background:#e0f2fe; border-radius:999px; padding:5px 14px; margin-bottom:14px;
        }
        .section-title {
          font-size:clamp(1.7rem,3.5vw,2.4rem); font-weight:800; color:#0f172a;
          letter-spacing:-0.02em; line-height:1.2; margin-bottom:12px;
        }
        .section-sub { font-size:16px; color:#64748b; max-width:540px; line-height:1.7; }

        .issue-card {
          background:#fff; border:1.5px solid #e2e8f0; border-radius:16px;
          padding:24px 20px; text-align:center; cursor:default;
          transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          box-shadow:0 1px 4px rgba(0,0,0,0.04);
        }
        .issue-card:hover {
          border-color:#7dd3fc; transform:translateY(-6px) scale(1.02);
          box-shadow:0 16px 40px rgba(3,105,161,0.12);
        }
        .issue-icon-wrap {
          width:52px; height:52px; border-radius:14px;
          background:linear-gradient(135deg,#e0f2fe,#bae6fd);
          display:flex; align-items:center; justify-content:center;
          margin:0 auto 14px; transition:all 0.3s;
        }
        .issue-card:hover .issue-icon-wrap {
          background:linear-gradient(135deg,#0369a1,#0ea5e9);
        }
        .issue-card:hover .issue-icon { filter:brightness(0) invert(1); }

        .step-card {
          background:#fff; border-radius:20px; padding:32px 28px;
          border:1.5px solid #e2e8f0; position:relative; overflow:hidden;
          transition:all 0.3s; box-shadow:0 2px 8px rgba(0,0,0,0.04);
        }
        .step-card:hover { border-color:#7dd3fc; box-shadow:0 12px 36px rgba(3,105,161,0.1); transform:translateY(-4px); }
        .step-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:3px;
          background:linear-gradient(90deg,#0369a1,#38bdf8);
          transform:scaleX(0); transform-origin:left; transition:transform 0.4s;
        }
        .step-card:hover::before { transform:scaleX(1); }

        .brand-pill {
          border:1.5px solid #e2e8f0; border-radius:8px;
          padding:9px 18px; font-size:14px; font-weight:600; color:#334155;
          background:#fff; cursor:default; transition:all 0.25s;
          box-shadow:0 1px 3px rgba(0,0,0,0.04);
        }
        .brand-pill:hover { border-color:#0369a1; color:#0369a1; background:#f0f9ff; transform:translateY(-2px); box-shadow:0 4px 16px rgba(3,105,161,0.12); }

        .review-card {
          background:#fff; border:1.5px solid #e2e8f0; border-radius:20px;
          padding:28px; transition:all 0.3s;
          box-shadow:0 2px 8px rgba(0,0,0,0.04);
        }
        .review-card:hover { box-shadow:0 16px 48px rgba(3,105,161,0.1); transform:translateY(-4px); border-color:#bae6fd; }

        .faq-item { border:1.5px solid #e2e8f0; border-radius:14px; overflow:hidden; transition:all 0.3s; margin-bottom:10px; }
        .faq-item:hover { border-color:#7dd3fc; box-shadow:0 4px 20px rgba(3,105,161,0.08); }
        .faq-btn {
          width:100%; background:#fff; border:none; padding:20px 22px;
          display:flex; justify-content:space-between; align-items:center;
          font-size:15px; font-weight:600; color:#0f172a; cursor:pointer;
          text-align:left; gap:12px; font-family:inherit; transition:background 0.2s;
        }
        .faq-btn:hover { background:#f8faff; }
        .faq-body { padding:0 22px 18px; font-size:14px; color:#64748b; line-height:1.7; }

        .field-wrap label { display:block; font-size:13px; font-weight:600; color:#374151; margin-bottom:6px; }
        .field-input {
          width:100%; border:1.5px solid #e2e8f0; border-radius:10px;
          padding:12px 15px; font-size:14px; color:#0f172a; outline:none;
          transition:all 0.25s; background:#fff; font-family:inherit;
        }
        .field-input:focus { border-color:#0369a1; box-shadow:0 0 0 4px rgba(3,105,161,0.08); }
        select.field-input option { background:#fff; }

        .form-card {
          background:#fff; border-radius:24px; padding:36px;
          box-shadow:0 4px 6px rgba(0,0,0,0.04), 0 20px 60px rgba(3,105,161,0.08);
          border:1.5px solid #e0f2fe;
        }

        .stat-num {
          font-size:2.8rem; font-weight:900; letter-spacing:-0.03em;
          background:linear-gradient(135deg,#0369a1,#38bdf8);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
        }

        .floating-badge {
          position:absolute; background:#fff; border-radius:14px; padding:12px 16px;
          box-shadow:0 8px 32px rgba(0,0,0,0.12); display:flex; align-items:center; gap:10px;
          animation:floatBadge 3s ease-in-out infinite;
          border:1px solid #e0f2fe;
        }
        @keyframes floatBadge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

        @media(max-width:768px) {
          .hero-cols { flex-direction:column !important; }
          .hero-visual { display:none; }
          .two-col { grid-template-columns:1fr !important; }
          .three-col { grid-template-columns:1fr !important; }
          .stat-row { flex-direction:column; gap:24px !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className={`ac-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="container" style={{ height:68, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <img src="/repairlogo.png" alt="Logo" style={{ width: 38, height: 38, objectFit: "contain" }} />
            <span style={{ fontWeight:800, fontSize:18, color: scrolled ? "#0f172a" : "#fff", transition:"color 0.4s" }}>Customer Service Centre</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:20 }}>
            <a href="tel:+918282822265" style={{ display:"flex", alignItems:"center", gap:6, color: scrolled ? "#0369a1" : "#fff", fontWeight:600, fontSize:14, textDecoration:"none", transition:"color 0.4s" }}>
              <Phone size={15} /> +918282822265
            </a>
            <a href="#booking" className="btn-white" style={{ padding:"10px 22px", fontSize:14, color:"#0369a1", ...(scrolled ? {} : {}) }}>Book Now</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="ac-hero">
        <div className="hero-grid-lines" />
        <div className="ac-blob" style={{ width:500, height:500, top:"-150px", right:"-100px", animationDelay:"0s" }} />
        <div className="ac-blob" style={{ width:300, height:300, bottom:"-80px", left:"10%", animationDelay:"-4s" }} />

        <div className="container hero-cols" style={{ display:"flex", alignItems:"center", gap:60, paddingTop:80, paddingBottom:80 }} >
          <div style={{ flex:1 }}>
            <div className="hero-badge" style={{ marginBottom:24 }}>
              <Snowflake size={14} /> Expert AC Repair Service
            </div>
            <h1 className="hero-h1" style={{ marginBottom:20 }}>
              Beat the Heat.<br />
              <span style={{ color:"#7dd3fc" }}>AC Fixed</span> Today.
            </h1>
            <p className="hero-sub" style={{ marginBottom:36 }}>
              Certified technicians for all brands and all AC types. Same-day doorstep service with upfront pricing and a 30-day warranty on every repair.
            </p>
            <div className="hero-btns" style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
              <a href="#booking" className="btn-white"><Send size={16} /> Book a Repair</a>
              <a href="tel:+918282822265" className="btn-ghost"><Phone size={15} /> Call Now</a>
            </div>
          </div>

          <div className="hero-visual" style={{ flexShrink:0 }}>
            <div className="hero-ring">
              {/* orbit dots */}
              {[0,72,144,216,288].map((deg,i) => (
                <div key={i} className="orbit-dot" style={{
                  top:`calc(50% - 6px + ${Math.sin(deg*Math.PI/180)*150}px)`,
                  left:`calc(50% - 6px + ${Math.cos(deg*Math.PI/180)*150}px)`,
                  opacity: 0.4 + i*0.12,
                  width: 6+i*2, height: 6+i*2,
                  background: ["#7dd3fc","#38bdf8","#0ea5e9","#bae6fd","#e0f2fe"][i]
                }} />
              ))}
              <div className="hero-ring-inner">
                <div className="hero-icon-center">
                  <Wind size={64} color="#fff" strokeWidth={1.5} />
                </div>
              </div>
            </div>
            {/* floating badges */}
            <div className="floating-badge" style={{ top:"10%", right:"-20px", animationDelay:"0s" }}>
              <CheckCircle2 size={18} color="#0369a1" />
              <div><div style={{ fontSize:12, fontWeight:700, color:"#0f172a" }}>Same Day</div><div style={{ fontSize:11, color:"#64748b" }}>Service Available</div></div>
            </div>
            <div className="floating-badge" style={{ bottom:"15%", left:"-30px", animationDelay:"-1.5s" }}>
              <Shield size={18} color="#0369a1" />
              <div><div style={{ fontSize:12, fontWeight:700, color:"#0f172a" }}>30-Day</div><div style={{ fontSize:11, color:"#64748b" }}>Warranty</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="trust-bar" ref={statsRef}>
        <div className="container">
          <div className="stat-row" style={{ display:"flex", alignItems:"center", justifyContent:"space-around", flexWrap:"wrap", gap:16 }}>
            {[
              [count1.toLocaleString()+"+", "ACs Repaired"],
              [count2.toFixed(1)+" ★", "Customer Rating"],
              [count3+"%", "Same-Day Resolution"],
              ["60 Days", "Gas Warranty"],
            ].map(([v,l],i) => (
              <div key={i} style={{ textAlign:"center", padding:"12px 24px" }}>
                <div className="stat-num">{v}</div>
                <div style={{ fontSize:13, color:"#64748b", fontWeight:500, marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ISSUES ── */}
      <section className="section">
        <div className="container">
          <AnimSection>
            <span className="section-eyebrow">Problems We Fix</span>
            <h2 className="section-title">Common AC Issues We Solve</h2>
            <p className="section-sub" style={{ marginBottom:40 }}>From gas top-ups to PCB replacements — our certified technicians handle it all.</p>
          </AnimSection>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))", gap:16 }} className="three-col">
            {ISSUES.map(({ icon: Icon, label, desc }, i) => (
              <AnimSection key={label} delay={i * 0.08}>
                <div className="issue-card">
                  <div className="issue-icon-wrap">
                    <Icon size={24} color="#0369a1" className="issue-icon" />
                  </div>
                  <div style={{ fontWeight:700, fontSize:14, color:"#0f172a", marginBottom:6 }}>{label}</div>
                  <div style={{ fontSize:12, color:"#94a3b8", lineHeight:1.5 }}>{desc}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── AC TYPES ── */}
      <section className="section section-alt">
        <div className="container">
          <AnimSection style={{ display:"flex", gap:48, alignItems:"center", flexWrap:"wrap" }}>
            <div style={{ flex:1, minWidth:280 }}>
              <span className="section-eyebrow">What We Cover</span>
              <h2 className="section-title">All AC Types Serviced</h2>
              <p className="section-sub">Whether it's a simple window AC or a complex multi-split system, our team is trained to handle every type.</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginTop:28 }}>
                {AC_TYPES.map((t,i) => (
                  <div key={t} style={{ display:"flex", alignItems:"center", gap:7, background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:8, padding:"9px 16px", fontSize:14, fontWeight:600, color:"#0f172a", transition:"all 0.2s", cursor:"default" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor="#0369a1"; e.currentTarget.style.color="#0369a1"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor="#e2e8f0"; e.currentTarget.style.color="#0f172a"; }}>
                    <Snowflake size={13} color="#0369a1" />{t}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex:1, minWidth:280, display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              {([
                [Zap, "Fast Service", "Dispatched within hours"],
                [BadgeCheck, "Certified Techs", "Brand-trained experts"],
                [Shield, "Warranty", "30-day guarantee"],
                [ThumbsUp, "Fair Pricing", "Quoted before we start"],
              ] as const).map(([Icon, t, d]) => (
                <div key={t} style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:14, padding:"20px 18px", transition:"all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="#7dd3fc"; e.currentTarget.style.boxShadow="0 8px 24px rgba(3,105,161,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="#e2e8f0"; e.currentTarget.style.boxShadow="none"; }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:"#e0f2fe", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>
                    <Icon size={20} color="#0369a1" />
                  </div>
                  <div style={{ fontWeight:700, fontSize:14, color:"#0f172a", marginBottom:4 }}>{t}</div>
                  <div style={{ fontSize:12, color:"#94a3b8" }}>{d}</div>
                </div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section">
        <div className="container">
          <AnimSection style={{ textAlign:"center", marginBottom:48 }}>
            <span className="section-eyebrow">Simple Process</span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-sub" style={{ margin:"0 auto" }}>Book in under 2 minutes. We handle everything else.</p>
          </AnimSection>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:20 }}>
            {STEPS.map((s,i) => (
              <AnimSection key={s.n} delay={i*0.1}>
                <div className="step-card">
                  <div style={{ fontSize:"3.2rem", fontWeight:900, color:"#e0f2fe", lineHeight:1, marginBottom:20, letterSpacing:"-0.03em" }}>{s.n}</div>
                  <div style={{ fontWeight:700, fontSize:17, color:"#0f172a", marginBottom:8 }}>{s.title}</div>
                  <div style={{ fontSize:14, color:"#64748b", lineHeight:1.6 }}>{s.desc}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section className="section section-alt">
        <div className="container">
          <AnimSection style={{ marginBottom:36 }}>
            <span className="section-eyebrow">Brands</span>
            <h2 className="section-title">All Brands We Repair</h2>
            <p className="section-sub">Official-trained technicians for every major AC brand sold in India.</p>
          </AnimSection>
          <AnimSection delay={0.2}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
              {BRANDS.map(b => <div key={b} className="brand-pill">{b}</div>)}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="section">
        <div className="container">
          <AnimSection style={{ marginBottom:40 }}>
            <span className="section-eyebrow">Customer Reviews</span>
            <h2 className="section-title">What Our Customers Say</h2>
          </AnimSection>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:20 }}>
            {REVIEWS.map((r,i) => (
              <AnimSection key={r.name} delay={i*0.1}>
                <div className="review-card">
                  <div style={{ display:"flex", gap:3, marginBottom:14 }}>
                    {[...Array(r.stars)].map((_,j) => <Star key={j} size={15} fill="#f59e0b" color="#f59e0b" />)}
                  </div>
                  <p style={{ fontSize:14, color:"#374151", lineHeight:1.75, marginBottom:18 }}>"{r.text}"</p>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:16, borderTop:"1px solid #f1f5f9" }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:14 }}>{r.name}</div>
                      <div style={{ fontSize:12, color:"#94a3b8", display:"flex", alignItems:"center", gap:4, marginTop:2 }}>
                        <MapPin size={11} />{r.city}
                      </div>
                    </div>
                    <span style={{ fontSize:12, fontWeight:700, color:"#0369a1", background:"#f0f9ff", border:"1.5px solid #bae6fd", borderRadius:8, padding:"4px 12px" }}>{r.brand}</span>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section section-alt">
        <div className="container" style={{ maxWidth:720 }}>
          <AnimSection style={{ marginBottom:36 }}>
            <span className="section-eyebrow">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </AnimSection>
          {FAQS.map(([q,a],i) => (
            <AnimSection key={i} delay={i*0.07}>
              <div className="faq-item">
                <button className="faq-btn" onClick={() => setOpenFaq(openFaq===i ? null : i)}>
                  <span>{q}</span>
                  <ChevronDown size={17} color="#94a3b8" style={{ transform:openFaq===i?"rotate(180deg)":"none", transition:"0.3s", flexShrink:0 }} />
                </button>
                {openFaq===i && <div className="faq-body">{a}</div>}
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* ── BOOKING FORM ── */}
      <BookingSection />

      <footer style={{ background:"#0c1a2e", padding:"32px 24px", textAlign:"center" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:10 }}>
          <img src="/repairlogo.png" alt="Logo" style={{ width: 30, height: 30, objectFit: "contain" }} />
          <span style={{ fontWeight:800, color:"#fff", fontSize:16 }}>Customer Service Centre</span>
        </div>
        <p style={{ color:"#475569", fontSize:13 }}>© 2026 Customer Service Centre. All rights reserved.</p>
      </footer>
    </div>
  );
}