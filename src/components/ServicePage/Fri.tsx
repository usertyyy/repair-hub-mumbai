import { useState } from "react";
import { Refrigerator, Phone, ChevronDown, Star, CheckCircle, ArrowRight, MapPin, Clock, Shield, Wrench, Thermometer, Droplets, Volume2, Power, Settings, AlertTriangle, Send } from "lucide-react";

const BRANDS = ["LG", "Samsung", "Whirlpool", "Godrej", "Haier", "Bosch", "Panasonic", "Hitachi", "Videocon", "Electrolux", "Liebherr", "Kelvinator"];

const ISSUES = [
  { icon: Thermometer, label: "Not Cooling" },
  { icon: Droplets, label: "Water Leakage" },
  { icon: Volume2, label: "Unusual Noise" },
  { icon: Power, label: "Not Starting" },
  { icon: Settings, label: "Ice Maker Issue" },
  { icon: AlertTriangle, label: "Error / Display" },
];

const STEPS = [
  { n: "1", title: "Book Online", desc: "Fill the form with your details and issue" },
  { n: "2", title: "Get Confirmed", desc: "We call back within 30 minutes to confirm" },
  { n: "3", title: "Tech Visits", desc: "Certified technician arrives at your home" },
  { n: "4", title: "Problem Solved", desc: "Repair done with 30-day service warranty" },
];

const REVIEWS = [
  { name: "Priya M.", city: "Delhi", stars: 5, brand: "Samsung", text: "My Samsung fridge stopped cooling. Technician came in 2 hours, fixed it the same day. Very professional." },
  { name: "Rajesh K.", city: "Mumbai", stars: 5, brand: "LG", text: "LG double door was leaking. Diagnosed perfectly, reasonable price. Will use again." },
  { name: "Sunita R.", city: "Bangalore", stars: 5, brand: "Whirlpool", text: "Whirlpool compressor issue. Clear explanation of the problem and fair pricing. Highly recommend." },
];

const FAQS = [
  ["How fast will the technician arrive?", "We dispatch within 1–4 hours of booking in major cities. Same-day service is available."],
  ["What brands do you repair?", "All major brands — LG, Samsung, Whirlpool, Godrej, Haier, Bosch, Panasonic, Hitachi and more."],
  ["Is there a visiting charge?", "A ₹199 visit charge applies, which is waived if you proceed with the repair."],
  ["Do repairs come with a warranty?", "Yes — all repairs include a 30-day service warranty on parts and labor."],
  ["Which cities do you serve?", "Delhi NCR, Mumbai, Bangalore, Chennai, Hyderabad, Pune, Kolkata, and Ahmedabad."],
];

export default function FridgeRepairPage() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", brand: "", issue: "", slot: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#fff", color: "#111827" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .btn-primary { background: #1d4ed8; color: #fff; border: none; border-radius: 8px; padding: 12px 22px; font-size: 15px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; transition: background 0.2s; }
        .btn-primary:hover { background: #1e40af; }
        .btn-outline { background: #fff; color: #1d4ed8; border: 1.5px solid #1d4ed8; border-radius: 8px; padding: 11px 22px; font-size: 15px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; transition: all 0.2s; }
        .btn-outline:hover { background: #eff6ff; }
        .field-label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
        .field-input { width: 100%; border: 1.5px solid #d1d5db; border-radius: 8px; padding: 10px 13px; font-size: 14px; color: #111827; outline: none; transition: border 0.2s; background: #fff; font-family: inherit; }
        .field-input:focus { border-color: #1d4ed8; box-shadow: 0 0 0 3px rgba(29,78,216,0.08); }
        select.field-input option { background: #fff; }
        .issue-card { border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 20px; text-align: center; background: #fff; transition: all 0.2s; }
        .issue-card:hover { border-color: #bfdbfe; background: #eff6ff; }
        .brand-tag { border: 1.5px solid #e5e7eb; border-radius: 6px; padding: 7px 15px; font-size: 14px; font-weight: 500; color: #374151; background: #fff; transition: all 0.2s; }
        .brand-tag:hover { border-color: #93c5fd; color: #1d4ed8; }
        .review-card { border: 1.5px solid #e5e7eb; border-radius: 12px; padding: 22px; background: #fff; }
        .faq-row { border: 1.5px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
        .faq-q { width: 100%; background: #fff; border: none; padding: 16px 18px; display: flex; justify-content: space-between; align-items: center; font-size: 14px; font-weight: 600; color: #111827; cursor: pointer; text-align: left; gap: 10px; font-family: inherit; }
        .faq-a { padding: 0 18px 16px; font-size: 14px; color: #6b7280; line-height: 1.65; }
        .sec-tag { font-size: 12px; font-weight: 700; color: #1d4ed8; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 6px; }
        .sec-h { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 700; color: #111827; margin-bottom: 10px; }
        .sec-sub { font-size: 15px; color: #6b7280; }
        @media(max-width:640px){ .hero-grid{grid-template-columns:1fr!important} .form-grid{grid-template-columns:1fr!important} .hero-icon-wrap{display:none!important} }
      `}</style>

      {/* NAV */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 20px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 7, background: "#1d4ed8", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Wrench size={16} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 16 }}>ServicePro</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a href="tel:+919876543210" style={{ display: "flex", alignItems: "center", gap: 6, color: "#1d4ed8", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
              <Phone size={14} /> +91 98765 43210
            </a>
            <a href="#book" className="btn-primary" style={{ padding: "8px 18px", fontSize: 14 }}>Book Now</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "#f0f7ff", borderBottom: "1px solid #dbeafe", padding: "72px 20px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }} className="hero-grid">
          <div>
            <div className="sec-tag">Refrigerator Repair</div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, color: "#111827", lineHeight: 1.2, marginBottom: 16 }}>
              Fast & Reliable Fridge<br />Repair at Your Door
            </h1>
            <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.7, marginBottom: 28, maxWidth: 480 }}>
              Certified technicians for all major brands. Same-day service with upfront pricing and a 30-day warranty on every repair.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <a href="#book" className="btn-primary">Book a Repair <ArrowRight size={16} /></a>
              <a href="tel:+919876543210" className="btn-outline"><Phone size={15} /> Call Now</a>
            </div>
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
              {[["50,000+", "Fridges Repaired"], ["4.9 / 5", "Customer Rating"], ["1 hr", "Avg Response Time"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#1d4ed8" }}>{v}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-icon-wrap" style={{ width: 180, height: 180, borderRadius: 20, background: "#dbeafe", border: "2px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Refrigerator size={88} color="#1d4ed8" strokeWidth={1.3} />
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ padding: "14px 20px", borderBottom: "1px solid #e5e7eb", background: "#fff" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          {([[Shield, "30-Day Warranty"], [Clock, "Same-Day Service"], [MapPin, "10+ Cities Covered"], [CheckCircle, "Verified Technicians"]] as const).map(([Icon, t]) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "#374151" }}>
              <Icon size={15} color="#1d4ed8" /> {t}
            </div>
          ))}
        </div>
      </section>

      {/* ISSUES */}
      <section style={{ padding: "64px 20px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div className="sec-tag">Problems We Fix</div>
          <h2 className="sec-h">Common Refrigerator Issues</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 14, marginTop: 28 }}>
            {ISSUES.map(({ icon: Icon, label }) => (
              <div key={label} className="issue-card">
                <div style={{ width: 42, height: 42, borderRadius: 9, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                  <Icon size={20} color="#1d4ed8" />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "#f3f4f6" }} />

      {/* HOW IT WORKS */}
      <section style={{ padding: "64px 20px", background: "#f9fafb" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div className="sec-tag">Our Process</div>
          <h2 className="sec-h">How It Works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20, marginTop: 32 }}>
            {STEPS.map(s => (
              <div key={s.n} style={{ display: "flex", gap: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 9, background: "#1d4ed8", color: "#fff", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.n}</div>
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
      <section style={{ padding: "64px 20px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div className="sec-tag">Brands</div>
          <h2 className="sec-h">All Brands Serviced</h2>
          <p className="sec-sub" style={{ marginBottom: 24 }}>Certified technicians for every major refrigerator brand</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {BRANDS.map(b => <div key={b} className="brand-tag">{b}</div>)}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "#f3f4f6" }} />

      {/* REVIEWS */}
      <section style={{ padding: "64px 20px", background: "#f9fafb" }}>
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
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#1d4ed8", background: "#eff6ff", border: "1px solid #dbeafe", borderRadius: 5, padding: "3px 9px" }}>{r.brand}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "#f3f4f6" }} />

      {/* FAQ */}
      <section style={{ padding: "64px 20px" }}>
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

      {/* FORM */}
      <section id="book" style={{ padding: "64px 20px", background: "#f0f7ff" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div className="sec-tag">Book a Repair</div>
          <h2 className="sec-h">Schedule Your Fridge Repair</h2>
          <p className="sec-sub" style={{ marginBottom: 28 }}>We'll confirm your appointment with a call within 30 minutes.</p>

          {submitted ? (
            <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 10, padding: "40px 28px", textAlign: "center" }}>
              <CheckCircle size={44} color="#16a34a" style={{ margin: "0 auto 14px" }} />
              <h3 style={{ fontWeight: 700, fontSize: 18, color: "#111827", marginBottom: 6 }}>Booking Received!</h3>
              <p style={{ color: "#6b7280", fontSize: 14 }}>Our team will call you within 30 minutes to confirm.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ background: "#fff", border: "1.5px solid #dbeafe", borderRadius: 10, padding: "28px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="form-grid">
                {[["Full Name *", "name", "text", "Your full name"], ["Phone *", "phone", "tel", "+91 98765 43210"]].map(([l, k, t, p]) => (
                  <div key={k}>
                    <label className="field-label">{l}</label>
                    <input required type={t} className="field-input" placeholder={p} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} />
                  </div>
                ))}
                <div>
                  <label className="field-label">City *</label>
                  <input required className="field-input" placeholder="Your city" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                </div>
                <div>
                  <label className="field-label">Brand *</label>
                  <select required className="field-input" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })}>
                    <option value="">Select brand</option>
                    {BRANDS.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label className="field-label">Problem *</label>
                  <select required className="field-input" value={form.issue} onChange={e => setForm({ ...form, issue: e.target.value })}>
                    <option value="">Select issue</option>
                    {ISSUES.map(i => <option key={i.label}>{i.label}</option>)}
                    <option>Other</option>
                  </select>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label className="field-label">Preferred Time</label>
                  <select className="field-input" value={form.slot} onChange={e => setForm({ ...form, slot: e.target.value })}>
                    <option value="">Any time (ASAP)</option>
                    <option>Morning (8AM – 12PM)</option>
                    <option>Afternoon (12PM – 4PM)</option>
                    <option>Evening (4PM – 8PM)</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 18, padding: "13px" }}>
                <Send size={15} /> Submit Booking Request
              </button>
              <p style={{ textAlign: "center", fontSize: 12, color: "#9ca3af", marginTop: 10 }}>🔒 Your details are safe with us</p>
            </form>
          )}
        </div>
      </section>

      <footer style={{ background: "#1e293b", padding: "24px 20px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: "#1d4ed8", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Wrench size={13} color="#fff" />
          </div>
          <span style={{ fontWeight: 600, color: "#fff", fontSize: 14 }}>ServicePro</span>
        </div>
        <p style={{ color: "#64748b", fontSize: 12 }}>© 2025 ServicePro. All rights reserved.</p>
      </footer>
    </div>
  );
}