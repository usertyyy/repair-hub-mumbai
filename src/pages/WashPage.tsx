import React, { useEffect, useState, useRef } from 'react';
import './WashPage.css';

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

const WashPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '⏳ Sending...';
    btn.disabled = true;

    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      const response = await fetch('https://formspree.io/f/mgollvyl', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        window.location.href = '/washing-machine-repair/thank-you';
      } else {
        btn.innerHTML = '❌ Failed. Try again.';
        btn.disabled = false;
        setTimeout(() => { btn.innerHTML = originalText; }, 3000);
      }
    } catch (error) {
      window.location.href = '/washing-machine-repair/thank-you';
    }
  };

  return (
    <div className="wash-page-container">
      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar" style={{ background: scrolled ? 'rgba(13,13,13,0.97)' : 'rgba(13,13,13,0.85)', boxShadow: scrolled ? '0 2px 30px rgba(0,0,0,0.5)' : 'none' }}>
        <div className="container">
          <div className="navbar-logo"><span>Same</span>day</div>
          <div className={`navbar-links ${isMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#how-it-works" onClick={() => setIsMenuOpen(false)}>How It Works</a>
            <a href="#testimonials" onClick={() => setIsMenuOpen(false)}>Reviews</a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </div>
          <div className="navbar-cta">
            <a href="tel:+918080803043" className="btn btn-outline btn-sm" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>📞 Call Now</a>
            <a href="#leadform" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>Get Free Quote</a>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-grid">
            <Reveal>
              <div className="hero-left">
                <div className="hero-eyebrow">
                  <span className="badge badge-red">⚡ Same Day Service – Mumbai</span>
                  <span className="badge badge-green">✔ 90-Day Warranty</span>
                </div>
                <h1 className="display hero-h1">
                  Washing Machine<br />
                  <span className="line-2">Repair in Mumbai</span>
                </h1>
                <p className="hero-sub">
                  Searching for <strong style={{ color: 'var(--white)' }}>washing machine repair near me</strong> in Mumbai? Our certified technicians come to your doorstep — same day. We fix all major brands.
                </p>
                <div className="hero-trust-row">
                  <div className="google-badge">
                    <div className="g-icon">G</div>
                    <div className="g-text">
                      <strong>⭐ 4.8 / 5</strong>
                      Rated by 1,330+ customers on Google
                    </div>
                  </div>
                </div>
                <div className="hero-cta-row">
                  <a href="tel:+918080803043" className="btn btn-call btn-lg">📞 Call Now: 8080803043</a>
                  <a href="https://wa.me/918080803043?text=Hi%2C%20I%20need%20washing%20machine%20repair%20in%20Mumbai" target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-lg">💬 WhatsApp Us</a>
                </div>
                <div className="hero-pills">
                  <span className="hero-pill"><span className="dot"></span>Certified Technicians</span>
                  <span className="hero-pill"><span className="dot"></span>Transparent Pricing</span>
                  <span className="hero-pill"><span className="dot"></span>Genuine Spare Parts</span>
                  <span className="hero-pill"><span className="dot"></span>All Mumbai Areas Covered</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="hero-right">
                <div className="form-card" id="hero-form">
                  <div className="form-title">Book Your Repair Today</div>
                  <div className="form-sub">Get a free diagnosis. Technician at your door within 2–4 hours.</div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Your Name *</label>
                      <input type="text" name="name" placeholder="e.g. Rahul Mehta" required />
                    </div>
                    <div className="form-group">
                      <label>Mobile Number *</label>
                      <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" required />
                    </div>
                    <div className="form-group">
                      <label>Area in Mumbai *</label>
                      <input type="text" name="area" placeholder="e.g. Andheri, Bandra, Thane..." required />
                    </div>
                    <div className="form-group">
                      <label>Washing Machine Type</label>
                      <select name="type">
                        <option value="">Select Type</option>
                        <option>Front Load</option>
                        <option>Top Load</option>
                        <option>Semi-Automatic</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Describe the Issue</label>
                      <textarea name="message" placeholder="e.g. Not draining, making noise, not spinning..."></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary btn-full btn-lg" style={{ marginTop: '4px' }}>🔧 Book Free Diagnosis</button>
                    <div className="warranty-note">
                      <span className="check">✓</span> 90-Day Repair Warranty &nbsp;|&nbsp;
                      <span className="check">✓</span> No Hidden Charges
                    </div>
                  </form>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="container">
          <div className="trust-item"><span className="t-icon">⚡</span><span className="t-text">Same Day Service</span></div>
          <div className="trust-item"><span className="t-icon">🛡️</span><span className="t-text">90-Day Warranty</span></div>
          <div className="trust-item"><span className="t-icon">✅</span><span className="t-text">Certified Technicians</span></div>
          <div className="trust-item"><span className="t-icon">💰</span><span className="t-text">Transparent Pricing</span></div>
          <div className="trust-item"><span className="t-icon">🔩</span><span className="t-text">Genuine Spare Parts</span></div>
          <div className="trust-item"><span className="t-icon">🗺️</span><span className="t-text">All Mumbai Areas</span></div>
        </div>
      </div>

      {/* STATS */}
      <section className="section-sm" style={{ background: 'var(--dark)' }}>
        <div className="container">
          <Reveal>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-num">10+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">50K+</div>
                <div className="stat-label">Repairs Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">33K+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">4.8★</div>
                <div className="stat-label">Google Rating</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="section" id="problems" style={{ background: 'var(--dark)' }}>
        <div className="container">
          <Reveal>
            <div className="text-center mb-40">
              <div className="section-label" style={{ justifyContent: 'center' }}>Common Problems</div>
              <h2>Is Your Washing Machine<br /><span className="text-red">Showing These Signs?</span></h2>
              <p style={{ maxWidth: '550px', margin: '14px auto 0' }}>Our certified technicians can diagnose and fix them — same day in Mumbai.</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="problems-grid">
              {[
                { icon: '🔄', title: 'Not Spinning or Draining', desc: "Drum won't spin or water stays inside after a wash cycle." },
                { icon: '📳', title: 'Excessive Vibration & Noise', desc: 'Loud banging, shaking, or unusual sounds during operation.' },
                { icon: '💧', title: 'Water Leakage', desc: 'Water pooling around or under the machine during use.' },
                { icon: '⚡', title: 'Machine Not Turning On', desc: 'No power, no lights, or completely unresponsive controls.' },
                { icon: '🖥️', title: 'Error Codes on Display', desc: 'Flashing error codes indicating internal electronic faults.' },
                { icon: '🚪', title: "Door Won't Open / Lock Issues", desc: 'Door stuck shut or latch mechanism failure preventing use.' }
              ].map((prob, i) => (
                <div key={i} className="problem-card">
                  <div className="problem-icon">{prob.icon}</div>
                  <div className="problem-title">{prob.title}</div>
                  <div className="problem-desc">{prob.desc}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="text-center mt-40">
            <p style={{ marginBottom: '16px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Whether you need emergency washing machine repair near you or same-day help — we've got Mumbai covered.</p>
            <div className="contact-row" style={{ justifyContent: 'center' }}>
              <a href="tel:+918080803043" className="btn btn-call">📞 Call Now: 8080803043</a>
              <a href="https://wa.me/918080803043" target="_blank" rel="noreferrer" className="btn btn-whatsapp">💬 WhatsApp Us</a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section" id="why-us" style={{ background: 'var(--dark-2)' }}>
        <div className="container">
          <div className="why-grid">
            <Reveal>
              <div>
                <div className="section-label">Why Choose Sameday</div>
                <h2>Mumbai's Most Trusted<br /><span className="text-red">Repair Specialists</span></h2>
                <p style={{ margin: '16px 0 28px' }}>When your washing machine breaks down, you need someone fast, reliable, and honest. Here's why 33,000+ Mumbai families choose Sameday.</p>
                <div className="why-checks">
                  {[
                    { icon: '⚡', title: 'Same Day Response – 2–4 Hour Slots', desc: 'Book before noon and your technician arrives the same day. No waiting days for a repair.' },
                    { icon: '🏆', title: '10+ Years of Expertise in Mumbai', desc: 'Thousands of repairs across Andheri, Bandra, Thane, Navi Mumbai, Dadar & beyond.' },
                    { icon: '🔩', title: '100% Genuine Spare Parts', desc: 'We never use low-quality substitutes. Genuine parts mean your machine lasts longer.' },
                    { icon: '💰', title: 'Upfront Transparent Pricing', desc: 'You know the cost before we begin. Zero hidden charges, zero surprises on your bill.' },
                    { icon: '🛡️', title: '90-Day Written Repair Warranty', desc: 'Every repair comes with a warranty. If the same issue returns, we fix it free.' }
                  ].map((item, i) => (
                    <div key={i} className="why-check-item">
                      <div className="why-check-icon">{item.icon}</div>
                      <div>
                        <div className="why-check-title">{item.title}</div>
                        <div className="why-check-desc">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div>
                <div className="img-placeholder" style={{ aspectRatio: '1/1', borderRadius: 'var(--radius-lg)' }}>
                  <div className="img-icon">🔧</div>
                  <div className="img-label">Certified Technician at Work</div>
                  <div className="stock-note">📷 Stock: "appliance repair technician home Mumbai"</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                  <div className="img-placeholder" style={{ aspectRatio: '16/9', borderRadius: 'var(--radius)' }}>
                    <div className="img-icon" style={{ fontSize: '2rem' }}>✅</div>
                    <div className="stock-note">Stock: "happy customer service"</div>
                  </div>
                  <div className="img-placeholder" style={{ aspectRatio: '16/9', borderRadius: 'var(--radius)' }}>
                    <div className="img-icon" style={{ fontSize: '2rem' }}>🔩</div>
                    <div className="stock-note">Stock: "genuine spare parts"</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RECENT WORK */}
      <section className="section" id="work" style={{ background: 'var(--dark)' }}>
        <div className="container">
          <Reveal>
            <div className="text-center mb-40">
              <div className="section-label" style={{ justifyContent: 'center' }}>Recent Repairs</div>
              <h2>Real Repairs.<br /><span className="text-red">Real Results.</span></h2>
              <p style={{ maxWidth: '500px', margin: '14px auto 0' }}>A snapshot of recent washing machine repairs completed across Mumbai.</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="cases-grid">
              {[
                { tag: 'Front Load', title: 'Front Load – Motor Replacement', val: '₹6K', label: 'Saved vs. new machine', desc: "Repaired within 3 hours at the customer's home in Andheri West. Machine running perfectly." },
                { tag: 'Top Load', title: 'Top Load – PCB Board Repair', val: '1 Day', label: 'Turnaround time', desc: "Error code resolved same day. Customer in Bandra couldn't believe how fast it was." },
                { tag: 'Service', title: 'Drainage Issue – Full Service', val: '90D', label: 'Warranty provided', desc: "Complete service + drainage pump replaced. Client in Thane, happy with transparent pricing." }
              ].map((item, i) => (
                <div key={i} className="case-card">
                  <div className="case-img">
                    🔧
                    <span className="case-tag">{item.tag}</span>
                  </div>
                  <div className="case-body">
                    <div className="case-title">{item.title}</div>
                    <div className="case-stat">
                      <div className="case-stat-num">{item.val}</div>
                      <div className="case-stat-label">{item.label}</div>
                    </div>
                    <div className="case-desc">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="text-center mt-40">
            <a href="#leadform" className="btn btn-primary btn-lg">🔧 Book Your Repair Now</a>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <div className="cta-strip">
        <div className="container">
          <div>
            <div className="cta-text">Need washing machine repair in Mumbai today?</div>
            <div className="cta-sub">Technicians available across Andheri, Bandra, Thane, Navi Mumbai, Dadar, Borivali & more.</div>
          </div>
          <div className="cta-btns">
            <a href="tel:+918080803043" className="btn btn-call">📞 8080803043</a>
            <a href="https://wa.me/918080803043" target="_blank" rel="noreferrer" className="btn btn-whatsapp">💬 WhatsApp</a>
            <a href="#leadform" className="btn btn-primary">Get Free Quote</a>
          </div>
        </div>
      </div>

      {/* BENEFITS */}
      <section className="section" id="services" style={{ background: 'var(--dark-2)' }}>
        <div className="container">
          <Reveal>
            <div className="text-center mb-40">
              <div className="section-label" style={{ justifyContent: 'center' }}>What Makes Us Different</div>
              <h2>Why Delaying Repairs<br /><span className="text-red">Costs You More</span></h2>
              <p style={{ maxWidth: '500px', margin: '14px auto 0' }}>A small issue ignored today becomes a major replacement expense tomorrow.</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="benefits-grid">
              {[
                { num: '01', icon: '⚡', title: 'Stop the Spiral of Damage', desc: 'A faulty drum bearing can destroy the motor in weeks. Early repair costs a fraction of full replacement.' },
                { num: '02', icon: '💡', title: 'Cut Your Electricity Bills', desc: 'A malfunctioning machine uses 30–40% more power. A proper repair pays for itself in months.' },
                { num: '03', icon: '🏠', title: 'Prevent Water Damage to Your Home', desc: 'A leaking machine can damage flooring, walls, and electronics. Fix it before it becomes a disaster.' },
                { num: '04', icon: '♻️', title: 'Extend Your Appliance Life by 5+ Years', desc: 'A well-maintained washing machine can easily last 12–15 years. Repair is always smarter than replace.' },
                { num: '05', icon: '🔒', title: 'Safety for Your Family', desc: 'Electrical faults in washing machines are a fire and shock risk. A certified repair removes that danger.' },
                { num: '06', icon: '💸', title: 'Save ₹15,000–₹40,000 on Replacement', desc: 'Most repairs cost ₹500–₹4,000. New machines cost ₹15K–₹40K. The math is simple.' }
              ].map((benefit, i) => (
                <div key={i} className="benefit-card">
                  <div className="benefit-number">{benefit.num}</div>
                  <div className="benefit-icon">{benefit.icon}</div>
                  <div className="benefit-title">{benefit.title}</div>
                  <div className="benefit-desc">{benefit.desc}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how-it-works" style={{ background: 'var(--dark)' }}>
        <div className="container">
          <Reveal>
            <div className="text-center mb-40">
              <div className="section-label" style={{ justifyContent: 'center' }}>Simple Process</div>
              <h2>How It Works –<br /><span className="text-red">4 Easy Steps</span></h2>
              <p style={{ maxWidth: '450px', margin: '14px auto 0' }}>From your first call to a fully repaired machine — here's exactly what happens.</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="steps-row">
              {[
                { n: '1', title: 'Call or Fill the Form', desc: 'Reach out via phone, WhatsApp, or our quick booking form. Takes under 60 seconds.' },
                { n: '2', title: 'Technician Assigned', desc: 'A certified technician in your Mumbai area is assigned within 30 minutes of your request.' },
                { n: '3', title: 'Diagnosis & Quote', desc: 'Your technician diagnoses the issue and gives you a transparent quote. No work starts without your approval.' },
                { n: '4', title: 'Repaired with Warranty', desc: 'We fix it on the spot with genuine parts and give you a 90-day written warranty. Done.' }
              ].map((step, i) => (
                <div key={i} className="step-card">
                  <div className="step-number">{step.n}</div>
                  <div className="step-title">{step.title}</div>
                  <div className="step-desc">{step.desc}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="text-center mt-40">
            <a href="#leadform" className="btn btn-primary btn-lg">Start My Repair →</a>
          </div>
        </div>
      </section>

      {/* MID FORM */}
      <section id="mid-form" style={{ background: 'var(--dark-2)', padding: '70px 0' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '50px' }}>
            <Reveal>
              <div>
                <div className="section-label">Quick Enquiry</div>
                <h2>Get a <span className="text-red">Free Callback</span><br />Within 30 Minutes</h2>
                <p style={{ margin: '16px 0 24px' }}>Leave your details and our team will call you right back to schedule your same-day repair slot.</p>
                <div className="contact-row">
                  <a href="tel:+918080803043" className="btn btn-call">📞 8080803043</a>
                  <a href="https://wa.me/918080803043" target="_blank" rel="noreferrer" className="btn btn-whatsapp">💬 WhatsApp</a>
                </div>
                <div className="img-placeholder" style={{ aspectRatio: '16/9', borderRadius: 'var(--radius)', marginTop: '24px' }}>
                  <div className="img-icon" style={{ fontSize: '2.5rem' }}>📞</div>
                  <div className="stock-note">📷 Stock: "friendly customer support agent"</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="form-card">
                <div className="form-title">Send Us a Message</div>
                <div className="form-sub">We'll respond within 15 minutes during working hours.</div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Name *</label>
                    <input type="text" name="name" placeholder="Your full name" required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" required />
                  </div>
                  <div className="form-group">
                    <label>Your Area in Mumbai</label>
                    <input type="text" name="area" placeholder="Andheri, Thane, Bandra..." />
                  </div>
                  <div className="form-group">
                    <label>Brand & Issue</label>
                    <textarea name="message" placeholder="e.g. Front load, not draining..."></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-full">📲 Get Free Callback</button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" id="testimonials" style={{ background: 'var(--dark)' }}>
        <div className="container">
          <Reveal>
            <div className="text-center mb-40">
              <div className="section-label" style={{ justifyContent: 'center' }}>Customer Reviews</div>
              <h2>What Mumbai Customers<br /><span className="text-red">Say About Us</span></h2>
              <p style={{ maxWidth: '480px', margin: '14px auto 0' }}>Real reviews from real people across Mumbai. 4.8★ on Google with 1,330+ ratings.</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="testimonials-grid">
              {[
                { name: 'Priya Nair', role: 'HR Manager, Andheri West', avatar: 'P', text: 'I searched for washing machine repair near me in Mumbai and found Sameday. My washing machine repair was done within 3 hours in Andheri. The technician was professional and the price was fair. Highly recommended!' },
                { name: 'Rohit Sharma', role: 'IT Professional, Bandra', avatar: 'R', text: 'Needed urgent washing machine repair in Mumbai. Called Sameday at 10am and the technician was at my door by 1pm in Bandra. Fixed an error code same day. Outstanding service!', avatarColor: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' },
                { name: 'Anita Rao', role: 'Homemaker, Thane West', avatar: 'A', text: 'Sameday provided the most affordable and transparent washing machine repair in Mumbai. Drainage issue fixed in one visit. The 90-day warranty gave me complete peace of mind. Very satisfied!', avatarColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
                { name: 'Suresh Kapoor', role: 'Business Owner, Borivali', avatar: 'S', text: 'My washing machine was making a terrible noise. Searched for repair near me and Sameday came up. Drum bearing replaced same day. No more noise — runs perfectly!', avatarColor: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
                { name: 'Meera Joshi', role: 'Teacher, Navi Mumbai', avatar: 'M', text: 'Water was leaking everywhere. I was worried about floor damage. Booked Sameday for washing machine repair in Navi Mumbai. The technician identified the inlet valve issue instantly. Fixed in 90 minutes. Brilliant!', avatarColor: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' },
                { name: 'Kavita Patil', role: 'Nurse, Dadar', avatar: 'K', text: "My machine stopped mid-cycle and wouldn't open the door. Sameday came in 2 hours to Dadar. Fixed the door lock mechanism and gave a 90-day warranty. Excellent washing machine repair service in Mumbai. Will call them every time!", avatarColor: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)' }
              ].map((testi, i) => (
                <div key={i} className="testi-card">
                  <div className="quote-mark">"</div>
                  <div className="stars">★★★★★</div>
                  <p className="testi-text" style={{ marginTop: '8px' }}>{testi.text}</p>
                  <div className="testi-author">
                    <div className="testi-avatar" style={{ background: testi.avatarColor }}>{testi.avatar}</div>
                    <div>
                      <div className="testi-name">{testi.name}</div>
                      <div className="testi-role">{testi.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div style={{ marginTop: '40px', textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '50px', padding: '14px 28px' }}>
                <div className="g-icon">G</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--white)' }}>⭐ 4.8 / 5 on Google</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Based on 1,330+ verified customer reviews</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OFFER BANNER */}
      <section className="section-sm" style={{ background: 'var(--dark-2)' }}>
        <div className="container">
          <Reveal>
            <div className="offer-banner">
              <div className="section-label" style={{ justifyContent: 'center', color: 'rgba(255,255,255,0.7)' }}>Limited Time Offer</div>
              <h2>FREE Appliance Health Check</h2>
              <div className="offer-value">Worth ₹499</div>
              <p>Book your <strong>washing machine repair in Mumbai today</strong> and get a complete appliance health check absolutely free. Our technician will inspect your entire machine and flag any issues before they become expensive problems.</p>
              <div className="offer-cta-row">
                <a href="#leadform" className="btn btn-lg" style={{ background: 'var(--white)', color: 'var(--primary)', fontWeight: 800 }}>🎁 Claim Free Check Now</a>
                <a href="https://wa.me/918080803043" target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-lg">💬 WhatsApp to Book</a>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '16px', marginBottom: 0 }}>*Offer valid for new customers in Mumbai. One free check per booking.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section className="section" style={{ background: 'var(--dark)' }}>
        <div className="container">
          <Reveal>
            <div className="text-center mb-40">
              <div className="section-label" style={{ justifyContent: 'center' }}>More From Sameday</div>
              <h2>We Also Repair<br /><span className="text-red">Other Home Appliances</span></h2>
              <p style={{ maxWidth: '480px', margin: '14px auto 0' }}>One call. All your home appliance repairs covered across Mumbai.</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="services-grid">
              {[
                { icon: '❄️', name: 'AC Repair', sub: 'All brands. Gas refill, coil cleaning, compressor.' },
                { icon: '🧊', name: 'Refrigerator Repair', sub: 'Cooling issues, compressor, thermostat, gas.' },
                { icon: '📺', name: 'TV Repair', sub: 'LED, LCD, Smart TV panel & board repairs.' },
                { icon: '🍳', name: 'Microwave Repair', sub: 'Magnetron, door, turntable, control panel.' },
                { icon: '🍽️', name: 'Dishwasher Repair', sub: 'Drainage, pump, door latch, spray arm issues.' },
                { icon: '🌀', name: 'Dryer Repair', sub: 'Heating element, drum belt, motor, thermostat.' }
              ].map((service, i) => (
                <a key={i} href="#leadform" className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <div>
                    <div className="service-name">{service.name}</div>
                    <div className="service-sub">{service.sub}</div>
                  </div>
                  <div className="service-arrow">→</div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq" style={{ background: 'var(--dark-2)' }}>
        <div className="container">
          <Reveal>
            <div className="text-center mb-40">
              <div className="section-label" style={{ justifyContent: 'center' }}>FAQ</div>
              <h2>Frequently Asked<br /><span className="text-red">Questions</span></h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="faq-list">
              {[
                { q: 'How much does washing machine repair cost in Mumbai?', a: 'Repair costs in Mumbai typically range from ₹500 to ₹4,000 depending on the issue, brand, and spare parts required. The diagnosis charge is adjusted in the final bill. We always give you a transparent quote before starting any work — no surprises.' },
                { q: 'Do you provide same-day washing machine repair in Mumbai?', a: 'Yes! Same-day service is our speciality. Book before 2pm and a technician will arrive the same day. We cover all major Mumbai areas including Andheri, Bandra, Thane, Navi Mumbai, Borivali, Dadar, Kurla, and more.' },
                { q: 'Do you use genuine spare parts for repairs?', a: 'Absolutely. We use 100% genuine OEM-standard spare parts for all repairs. We never compromise with cheap alternatives that reduce your machine\'s lifespan. Genuine parts are why our repairs last and why we can offer a 90-day warranty.' },
                { q: 'What warranty do you provide on repairs?', a: 'Every repair at Sameday comes with a 90-day written warranty. If the same issue reappears within 90 days of the repair, we\'ll fix it at no extra charge. That\'s our commitment to quality.' },
                { q: 'Which areas in Mumbai do you cover?', a: 'We cover all areas across Mumbai including Andheri, Bandra, Juhu, Borivali, Kandivali, Malad, Goregaon, Kurla, Dadar, Thane, Navi Mumbai, Powai, Vikhroli, Mulund, Ghatkopar, and more. If you\'re in Greater Mumbai, we\'ve got you covered.' },
                { q: 'Is it better to repair or replace my washing machine?', a: 'In most cases, repair is far more cost-effective. A new washing machine costs ₹15,000–₹40,000+. Most repairs cost ₹500–₹4,000. Unless your machine is over 10 years old and has multiple major failures, repair almost always makes more financial sense.' },
                { q: 'Which washing machine brands do you repair in Mumbai?', a: 'We repair all major brands. Front load, top load, semi-automatic — we handle them all.' }
              ].map((faq, i) => (
                <div key={i} className={`faq-item ${openFaqIndex === i ? 'open' : ''}`}>
                  <div className="faq-q" onClick={() => toggleFaq(i)}>
                    {faq.q}
                    <span className="chevron">⌄</span>
                  </div>
                  <div className="faq-a">
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* BOTTOM LEAD FORM */}
      <section className="section" id="leadform" style={{ background: 'var(--dark)' }}>
        <div className="container">
          <div className="leadform-inner">
            <Reveal>
              <div>
                <div className="section-label">Book Your Repair</div>
                <h2>Don't Wait – <span className="text-red">Fix Your Washing Machine</span> Today</h2>
                <p style={{ margin: '16px 0' }}>Get expert washing machine repair in Mumbai at your doorstep. Same day. Guaranteed.</p>
                <div className="leadform-list">
                  <div className="leadform-list-item"><span className="check">✅</span> Same day technician dispatch</div>
                  <div className="leadform-list-item"><span className="check">✅</span> 90-day warranty on all repairs</div>
                  <div className="leadform-list-item"><span className="check">✅</span> 100% genuine spare parts</div>
                  <div className="leadform-list-item"><span className="check">✅</span> Transparent pricing – no hidden charges</div>
                  <div className="leadform-list-item"><span className="check">✅</span> Free appliance health check (worth ₹499)</div>
                  <div className="leadform-list-item"><span className="check">✅</span> All Mumbai areas covered</div>
                </div>
                <div className="contact-row mt-40">
                  <a href="tel:+918080803043" className="btn btn-call btn-lg">📞 8080803043</a>
                  <a href="https://wa.me/918080803043" target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-lg">💬 WhatsApp</a>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '12px' }}>*We are an independent appliance repair service and are not affiliated with any brands mentioned.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="form-card" style={{ borderColor: 'rgba(230,51,41,0.3)' }}>
                <div className="form-title">Book Your Washing Machine Repair</div>
                <div className="form-sub">Fill in the form and we'll call you back within 30 minutes.</div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input type="text" name="name" placeholder="e.g. Rahul Mehta" required />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number *</label>
                    <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" required />
                  </div>
                  <div className="form-group">
                    <label>Area in Mumbai *</label>
                    <input type="text" name="area" placeholder="Andheri, Bandra, Thane..." required />
                  </div>
                  <div className="form-group">
                    <label>Washing Machine Type</label>
                    <select name="brand">
                      <option value="">Select Type</option>
                      <option>Front Load</option>
                      <option>Top Load</option>
                      <option>Semi-Automatic</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Describe the Problem</label>
                    <textarea name="message" placeholder="e.g. Machine not spinning, leaking water..."></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-full btn-lg">🔧 Book My Repair Now</button>
                  <div className="warranty-note" style={{ marginTop: '12px' }}>
                    <span className="check">✓</span> 90-Day Warranty &nbsp;|&nbsp;
                    <span className="check">✓</span> Free Health Check &nbsp;|&nbsp;
                    <span className="check">✓</span> No Hidden Charges
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo"><span>Same</span>day</div>
              <p className="footer-desc">Mumbai's most trusted washing machine repair service. Same day response. 90-day warranty. Certified technicians across all Mumbai areas.</p>
              <div className="footer-contact">
                <a href="tel:+918080803043">📞 8080803043</a>
                <a href="https://wa.me/918080803043" target="_blank" rel="noreferrer">💬 WhatsApp Us</a>
                <a href="mailto:service@sameday.in">✉️ service@sameday.in</a>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Services</div>
              <div className="footer-links">
                <a href="#leadform">Washing Machine Repair</a>
                <a href="#leadform">Front Load Repair</a>
                <a href="#leadform">Top Load Repair</a>
                <a href="#leadform">Semi-Automatic Repair</a>
                <a href="#leadform">PCB Board Repair</a>
                <a href="#leadform">Motor Replacement</a>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Areas We Cover</div>
              <div className="footer-links">
                <a href="#leadform">Andheri</a>
                <a href="#leadform">Bandra</a>
                <a href="#leadform">Borivali</a>
                <a href="#leadform">Thane</a>
                <a href="#leadform">Navi Mumbai</a>
                <a href="#leadform">Dadar</a>
                <a href="#leadform">Kurla</a>
                <a href="#leadform">Powai</a>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Quick Links</div>
              <div className="footer-links">
                <a href="#how-it-works">How It Works</a>
                <a href="#testimonials">Customer Reviews</a>
                <a href="#faq">FAQ</a>
                <a href="#leadform">Book a Repair</a>
              </div>
              <div style={{ marginTop: '24px' }}>
                <div className="footer-col-title">Follow Us</div>
                <div className="footer-links">
                  <a href="#google">Google Business</a>
                  <a href="#facebook">Facebook</a>
                  <a href="#instagram">Instagram</a>
                </div>
              </div>
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--white)' }}>Ready to fix your washing machine?</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Same day service across all Mumbai areas. Call or book online.</div>
            </div>
            <div className="footer-final-cta">
              <a href="tel:+918080803043" className="btn btn-call">📞 Call Now</a>
              <a href="https://wa.me/918080803043" target="_blank" rel="noreferrer" className="btn btn-whatsapp">💬 WhatsApp</a>
              <a href="#leadform" className="btn btn-primary">Book Online</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Sameday. All rights reserved. | Washing Machine Repair in Mumbai</p>
            <p>*Sameday is an independent appliance repair service and is not affiliated with any brand mentioned.</p>
          </div>
        </div>
      </footer>

      {/* FLOATING BUTTONS */}
      <div className="floating-btns">
        <a href="tel:+918080803043" className="float-btn float-call" title="Call Us">
          📞
          <span className="float-tooltip">Call Us</span>
        </a>
        <a href="https://wa.me/918080803043?text=Hi%2C%20I%20need%20washing%20machine%20repair%20in%20Mumbai" target="_blank" rel="noreferrer" className="float-btn float-wa" title="WhatsApp Us">
          💬
          <span className="float-tooltip">WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default WashPage;
