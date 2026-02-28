import { useState } from "react";
import { Wind, Phone, ChevronDown, Star, CheckCircle, ArrowRight, MapPin, Clock, Shield, Wrench, Snowflake, Droplets, Volume2, Power, Settings, AlertTriangle, Send, Filter } from "lucide-react";
import BookingSection from "../BookingSection";

const BRANDS = ["Daikin", "LG", "Samsung", "Voltas", "Blue Star", "Carrier", "Hitachi", "Panasonic", "O General", "Lloyd", "Godrej", "Whirlpool"];
const AC_TYPES = ["Split AC", "Window AC", "Inverter AC", "Cassette AC", "Tower AC", "Portable AC"];

const ISSUES = [
  { icon: Snowflake, label: "Not Cooling" },
  { icon: Droplets, label: "Water Dripping" },
  { icon: Volume2, label: "Noisy Unit" },
  { icon: Power, label: "Not Starting" },
  { icon: Filter, label: "Gas Refill" },
  { icon: Settings, label: "Service & Cleaning" },
];

const STEPS = [
  { n: "1", title: "Book Online", desc: "Fill the form with your AC details and issue" },
  { n: "2", title: "Get Confirmed", desc: "We call back within 30 minutes to confirm" },
  { n: "3", title: "Tech Visits", desc: "Expert arrives at your preferred time slot" },
  { n: "4", title: "AC Fixed", desc: "Repaired, tested, and covered by warranty" },
];

const REVIEWS = [
  { name: "Arjun S.", city: "Delhi", stars: 5, brand: "Voltas", text: "Voltas split AC stopped cooling in peak summer. These guys came in under 2 hours and fixed the gas issue. Very fast!" },
  { name: "Deepika M.", city: "Mumbai", stars: 5, brand: "Daikin", text: "Daikin inverter was showing error codes. Technician knew exactly what to do. Transparent pricing." },
  { name: "Vikram R.", city: "Hyderabad", stars: 5, brand: "Blue Star", text: "Annual servicing done properly. Blue Star AC is cooling much better now. Would recommend." },
];

const FAQS = [
  ["How soon can you send a technician?", "We dispatch within 1–3 hours of booking in major cities. Same-day service available in most areas."],
  ["Do you service all AC types?", "Yes — split, window, inverter, cassette, tower, and portable ACs across all brands."],
  ["What is the gas refill cost?", "Gas refill typically ranges from ₹1,200–₹2,500 depending on tonnage and refrigerant type."],
  ["Is the visiting charge refundable?", "The ₹199 visit charge is adjusted against the repair bill if you proceed with the repair."],
  ["What warranty do you offer?", "30-day warranty on all labor and parts. Gas refill includes a 60-day warranty."],
];

export default function ACRepairPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#fff", color: "#111827" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .btn-primary { background: #0369a1; color: #fff; border: none; border-radius: 8px; padding: 12px 22px; font-size: 15px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; transition: background 0.2s; }
        .btn-primary:hover { background: #075985; }
        .btn-outline { background: #fff; color: #0369a1; border: 1.5px solid #0369a1; border-radius: 8px; padding: 11px 22px; font-size: 15px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; transition: all 0.2s; }
        .btn-outline:hover { background: #f0f9ff; }
        .field-label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
        .field-input { width: 100%; border: 1.5px solid #d1d5db; border-radius: 8px; padding: 10px 13px; font-size: 14px; color: #111827; outline: none; transition: border 0.2s; background: #fff; font-family: inherit; }
        .field-input:focus { border-color: #0369a1; box-shadow: 0 0 0 3px rgba(3,105,161,0.08); }
        select.field-input option { background: #fff; }
        .issue-card { border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 20px; text-align: center; background: #fff; transition: all 0.2s; }
        .issue-card:hover { border-color: #7dd3fc; background: #f0f9ff; }
        .brand-tag { border: 1.5px solid #e5e7eb; border-radius: 6px; padding: 7px 15px; font-size: 14px; font-weight: 500; color: #374151; background: #fff; transition: all 0.2s; }
        .brand-tag:hover { border-color: #7dd3fc; color: #0369a1; }
        .review-card { border: 1.5px solid #e5e7eb; border-radius: 12px; padding: 22px; background: #fff; }
        .faq-row { border: 1.5px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
        .faq-q { width: 100%; background: #fff; border: none; padding: 16px 18px; display: flex; justify-content: space-between; align-items: center; font-size: 14px; font-weight: 600; color: #111827; cursor: pointer; text-align: left; gap: 10px; font-family: inherit; }
        .faq-a { padding: 0 18px 16px; font-size: 14px; color: #6b7280; line-height: 1.65; }
        .sec-tag { font-size: 12px; font-weight: 700; color: #0369a1; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 6px; }
        .sec-h { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 700; color: #111827; margin-bottom: 10px; }
        .sec-sub { font-size: 15px; color: #6b7280; }
        @media(max-width:640px){ .hero-grid{grid-template-columns:1fr!important} .form-grid{grid-template-columns:1fr!important} .hero-icon-wrap{display:none!important} }
      `}</style>

      {/* NAV */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 20px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 7, background: "#0369a1", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Wrench size={16} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 16 }}>Customer Service Centre</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a href="tel:+919876543210" style={{ display: "flex", alignItems: "center", gap: 6, color: "#0369a1", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
              <Phone size={14} /> +918282822265            </a>
            <a href="#booking" className="btn-primary" style={{ padding: "8px 18px", fontSize: 14 }}>Book Now</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "#f0f9ff", borderBottom: "1px solid #bae6fd", padding: "72px 20px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }} className="hero-grid">
          <div>
            <div className="sec-tag">AC Repair Service</div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, color: "#111827", lineHeight: 1.2, marginBottom: 16 }}>
              Expert AC Repair<br />at Your Doorstep
            </h1>
            <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.7, marginBottom: 28, maxWidth: 480 }}>
              All brands, all types. Same-day service with certified technicians and upfront pricing. No hidden charges.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <a href="#booking" className="btn-primary">Book AC Repair <ArrowRight size={16} /></a>
              <a href="tel:+919876543210" className="btn-outline"><Phone size={15} /> Call Now</a>
            </div>
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
              {[["80,000+", "ACs Repaired"], ["4.9 / 5", "Customer Rating"], ["< 2 hrs", "Avg Response"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#0369a1" }}>{v}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-icon-wrap" style={{ width: 180, height: 180, borderRadius: 20, background: "#e0f2fe", border: "2px solid #bae6fd", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Wind size={88} color="#0369a1" strokeWidth={1.3} />
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ padding: "14px 20px", borderBottom: "1px solid #e5e7eb", background: "#fff" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          {([[Shield, "30-Day Warranty"], [Clock, "Same-Day Service"], [MapPin, "10+ Cities"], [CheckCircle, "Certified Technicians"]] as const).map(([Icon, t]) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "#374151" }}>
              <Icon size={15} color="#0369a1" /> {t}
            </div>
          ))}
        </div>
      </section>

      {/* AC TYPES */}
      <section style={{ padding: "48px 20px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div className="sec-tag">What We Service</div>
          <h2 className="sec-h">All AC Types Covered</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}>
            {AC_TYPES.map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 7, border: "1.5px solid #e5e7eb", borderRadius: 7, padding: "8px 16px", fontSize: 14, fontWeight: 500, color: "#374151" }}>
                <Snowflake size={13} color="#0369a1" /> {t}
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
          <h2 className="sec-h">Common AC Issues</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 14, marginTop: 28 }}>
            {ISSUES.map(({ icon: Icon, label }) => (
              <div key={label} className="issue-card">
                <div style={{ width: 42, height: 42, borderRadius: 9, background: "#e0f2fe", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                  <Icon size={20} color="#0369a1" />
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
                <div style={{ width: 38, height: 38, borderRadius: 9, background: "#0369a1", color: "#fff", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.n}</div>
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
          <p className="sec-sub" style={{ marginBottom: 24 }}>Certified to service every major AC brand in India</p>
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
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#0369a1", background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 5, padding: "3px 9px" }}>{r.brand}</span>
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
          <div style={{ width: 26, height: 26, borderRadius: 6, background: "#0369a1", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Wrench size={13} color="#fff" />
          </div>
          <span style={{ fontWeight: 600, color: "#fff", fontSize: 14 }}>Customer Service Centre</span>
        </div>
        <p style={{ color: "#64748b", fontSize: 12 }}>© 2026 Customer Service Centre. All rights reserved.</p>
      </footer>
    </div>
  );
}