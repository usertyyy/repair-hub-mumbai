import { useState } from "react";
import { WashingMachine, Phone, ChevronDown, Star, CheckCircle, ArrowRight, MapPin, Clock, Shield, Wrench, Droplets, Volume2, Power, Settings, AlertTriangle, Send, RotateCcw, Timer } from "lucide-react";
import BookingSection from "../BookingSection";

const BRANDS = ["LG", "Samsung", "Whirlpool", "IFB", "Bosch", "Haier", "Godrej", "Panasonic", "Videocon", "Electrolux", "Siemens", "Onida"];
const WM_TYPES = ["Front Load", "Top Load", "Semi-Automatic", "Fully Automatic", "Twin Tub"];

const ISSUES = [
  { icon: Power, label: "Not Starting" },
  { icon: Droplets, label: "Water Leakage" },
  { icon: Volume2, label: "Noisy / Vibrating" },
  { icon: RotateCcw, label: "Drum Not Spinning" },
  { icon: Droplets, label: "Not Draining" },
  { icon: AlertTriangle, label: "Error Code" },
  { icon: Settings, label: "Door Lock Issue" },
  { icon: Timer, label: "Cycle Not Completing" },
];

const STEPS = [
  { n: "1", title: "Book Online", desc: "Fill the form with your machine details" },
  { n: "2", title: "Get Confirmed", desc: "We call back within 30 minutes" },
  { n: "3", title: "Tech Visits", desc: "Expert arrives at your doorstep" },
  { n: "4", title: "All Fixed", desc: "Machine repaired and fully tested" },
];

const REVIEWS = [
  { name: "Neha J.", city: "Pune", stars: 5, brand: "IFB", text: "IFB front loader was leaking. Technician came in 3 hours and fixed a drum seal issue the same day. Excellent service." },
  { name: "Manoj K.", city: "Chennai", stars: 5, brand: "Samsung", text: "Samsung top load was making horrible noise. Very professional, explained the problem clearly. Highly recommend." },
  { name: "Kavita P.", city: "Kolkata", stars: 5, brand: "LG", text: "LG machine stopped draining. Fixed within an hour. Very reasonable rates and courteous technician." },
];

const FAQS = [
  ["How fast can you send a technician?", "Within 1–4 hours of booking in major cities. Same-day availability in most service areas."],
  ["Which brands do you service?", "All brands: LG, Samsung, IFB, Whirlpool, Bosch, Haier, Godrej, Panasonic, and more."],
  ["Do you repair front load and top load both?", "Yes — front load, top load, semi-automatic, fully automatic, and twin tub machines."],
  ["What does a repair typically cost?", "Minor repairs from ₹500. Motor or drum repairs ₹1,500–₹4,000. We quote before starting any work."],
  ["Is there a warranty on the repair?", "Yes, all repairs come with a 30-day service warranty on labor and replaced parts."],
];

export default function WashingMachineRepairPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#fff", color: "#111827" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .btn-primary { background: #047857; color: #fff; border: none; border-radius: 8px; padding: 12px 22px; font-size: 15px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; transition: background 0.2s; }
        .btn-primary:hover { background: #065f46; }
        .btn-outline { background: #fff; color: #047857; border: 1.5px solid #047857; border-radius: 8px; padding: 11px 22px; font-size: 15px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; transition: all 0.2s; }
        .btn-outline:hover { background: #f0fdf4; }
        .field-label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
        .field-input { width: 100%; border: 1.5px solid #d1d5db; border-radius: 8px; padding: 10px 13px; font-size: 14px; color: #111827; outline: none; transition: border 0.2s; background: #fff; font-family: inherit; }
        .field-input:focus { border-color: #047857; box-shadow: 0 0 0 3px rgba(4,120,87,0.08); }
        select.field-input option { background: #fff; }
        .issue-card { border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 20px; text-align: center; background: #fff; transition: all 0.2s; }
        .issue-card:hover { border-color: #6ee7b7; background: #f0fdf4; }
        .brand-tag { border: 1.5px solid #e5e7eb; border-radius: 6px; padding: 7px 15px; font-size: 14px; font-weight: 500; color: #374151; background: #fff; transition: all 0.2s; }
        .brand-tag:hover { border-color: #6ee7b7; color: #047857; }
        .review-card { border: 1.5px solid #e5e7eb; border-radius: 12px; padding: 22px; background: #fff; }
        .faq-row { border: 1.5px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
        .faq-q { width: 100%; background: #fff; border: none; padding: 16px 18px; display: flex; justify-content: space-between; align-items: center; font-size: 14px; font-weight: 600; color: #111827; cursor: pointer; text-align: left; gap: 10px; font-family: inherit; }
        .faq-a { padding: 0 18px 16px; font-size: 14px; color: #6b7280; line-height: 1.65; }
        .sec-tag { font-size: 12px; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 6px; }
        .sec-h { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 700; color: #111827; margin-bottom: 10px; }
        .sec-sub { font-size: 15px; color: #6b7280; }
        @media(max-width:640px){ .hero-grid{grid-template-columns:1fr!important} .form-grid{grid-template-columns:1fr!important} .hero-icon-wrap{display:none!important} }
      `}</style>

      {/* NAV */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 20px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 7, background: "#047857", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Wrench size={16} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 16 }}>Customer Service Center</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a href="tel:+919876543210" style={{ display: "flex", alignItems: "center", gap: 6, color: "#047857", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
              <Phone size={14} /> +918282822265            </a>
            <a href="#booking" className="btn-primary" style={{ padding: "8px 18px", fontSize: 14 }}>Book Now</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "#f0fdf4", borderBottom: "1px solid #bbf7d0", padding: "72px 20px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }} className="hero-grid">
          <div>
            <div className="sec-tag">Washing Machine Repair</div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, color: "#111827", lineHeight: 1.2, marginBottom: 16 }}>
              Get Your Washing<br />Machine Fixed Today
            </h1>
            <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.7, marginBottom: 28, maxWidth: 480 }}>
              Front load, top load, semi-automatic — all brands repaired at your doorstep. Same-day service with a 30-day warranty.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <a href="#booking" className="btn-primary">Book a Repair <ArrowRight size={16} /></a>
              <a href="tel:+919876543210" className="btn-outline"><Phone size={15} /> Call Now</a>
            </div>
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
              {[["60,000+", "Machines Repaired"], ["4.9 / 5", "Customer Rating"], ["< 3 hrs", "Avg Response"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#047857" }}>{v}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-icon-wrap" style={{ width: 180, height: 180, borderRadius: 20, background: "#dcfce7", border: "2px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <WashingMachine size={88} color="#047857" strokeWidth={1.3} />
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ padding: "14px 20px", borderBottom: "1px solid #e5e7eb", background: "#fff" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          {([[Shield, "30-Day Warranty"], [Clock, "Same-Day Service"], [MapPin, "10+ Cities"], [CheckCircle, "Certified Technicians"]] as const).map(([Icon, t]) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "#374151" }}>
              <Icon size={15} color="#047857" /> {t}
            </div>
          ))}
        </div>
      </section>

      {/* MACHINE TYPES */}
      <section style={{ padding: "48px 20px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div className="sec-tag">What We Service</div>
          <h2 className="sec-h">All Machine Types Covered</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}>
            {WM_TYPES.map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 7, border: "1.5px solid #e5e7eb", borderRadius: 7, padding: "8px 16px", fontSize: 14, fontWeight: 500, color: "#374151" }}>
                <RotateCcw size={13} color="#047857" /> {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "#f3f4f6" }} />

      {/* ISSUES */}
      <section style={{ padding: "48px 20px 64px", background: "#f9fafb" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div className="sec-tag">Problems We Fix</div>
          <h2 className="sec-h">Common Washing Machine Issues</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 14, marginTop: 28 }}>
            {ISSUES.map(({ icon: Icon, label }) => (
              <div key={label} className="issue-card">
                <div style={{ width: 42, height: 42, borderRadius: 9, background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                  <Icon size={20} color="#047857" />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "#f3f4f6" }} />

      {/* HOW IT WORKS */}
      <section style={{ padding: "64px 20px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div className="sec-tag">Our Process</div>
          <h2 className="sec-h">How It Works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20, marginTop: 32 }}>
            {STEPS.map(s => (
              <div key={s.n} style={{ display: "flex", gap: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 9, background: "#047857", color: "#fff", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 4 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "#f3f4f6" }} />

      {/* BRANDS */}
      <section style={{ padding: "64px 20px", background: "#f9fafb" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div className="sec-tag">Brands</div>
          <h2 className="sec-h">All Brands We Repair</h2>
          <p className="sec-sub" style={{ marginBottom: 24 }}>Certified technicians for every major washing machine brand</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {BRANDS.map(b => <div key={b} className="brand-tag">{b}</div>)}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "#f3f4f6" }} />

      {/* REVIEWS */}
      <section style={{ padding: "64px 20px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div className="sec-tag">Customer Reviews</div>
          <h2 className="sec-h">What People Are Saying</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 18, marginTop: 30 }}>
            {REVIEWS.map(r => (
              <div key={r.name} className="review-card">
                <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                  {[...Array(r.stars)].map((_, i) => <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, marginBottom: 14 }}>{r.text}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: "#9ca3af" }}>{r.city}</div>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#047857", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 5, padding: "3px 9px" }}>{r.brand}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "#f3f4f6" }} />

      {/* FAQ */}
      <section style={{ padding: "64px 20px", background: "#f9fafb" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="sec-tag">FAQ</div>
          <h2 className="sec-h">Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 28 }}>
            {FAQS.map(([q, a], i) => (
              <div key={i} className="faq-row">
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{q}</span>
                  <ChevronDown size={15} color="#9ca3af" style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "0.2s", flexShrink: 0 }} />
                </button>
                {openFaq === i && <div className="faq-a">{a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "#f3f4f6" }} />

      <BookingSection />

      <footer style={{ background: "#1e293b", padding: "24px 20px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: "#047857", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Wrench size={13} color="#fff" />
          </div>
          <span style={{ fontWeight: 600, color: "#fff", fontSize: 14 }}>Customer Service Center</span>
        </div>
        <p style={{ color: "#64748b", fontSize: 12 }}>© 2025 Customer Service Center. All rights reserved.</p>
      </footer>
    </div>
  );
}