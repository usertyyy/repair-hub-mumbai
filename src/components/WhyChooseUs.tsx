import { Shield, Truck, IndianRupee, Lock, Award, Clock, Ban, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  { icon: Shield, title: "Genuine OEM Parts", desc: "We only use original manufacturer-approved parts." },
  { icon: Truck, title: "Free Pickup & Delivery", desc: "We collect and deliver your device for free across Mumbai." },
  { icon: IndianRupee, title: "Transparent Pricing", desc: "No hidden charges. You approve the cost before we repair." },
  { icon: Lock, title: "Data Safety Guaranteed", desc: "Your personal data stays secure throughout the repair process." },
  { icon: Award, title: "Certified Technicians", desc: "Our team is trained and certified by leading brands." },
  { icon: Clock, title: "Same Day Repairs", desc: "Most repairs completed within the same day of booking." },
  { icon: Ban, title: "No Fix No Fee", desc: "If we can't fix it, you don't pay a single rupee." },
];

const WhyChooseUs = () => (
  <section id="why-us" className="py-16 md:py-20">
    <div className="container">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        {/* Content */}
        <div>
          <h2 className="section-heading">Why Choose Customer Service Center?</h2>
          <p className="section-subheading">Trusted by 25,000+ customers across Mumbai for reliable and honest repair services.</p>

          <div className="mt-8 space-y-4">
            {reasons.map((r, i) => (
              <motion.div key={r.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
                  <r.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{r.title}</h3>
                  <p className="text-sm text-muted-foreground">{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats card */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl p-8 lg:p-10" style={{ background: "var(--hero-gradient)" }}>
          <h3 className="text-2xl font-bold text-primary-foreground">Mumbai's Most Trusted Repair Service</h3>
          <p className="mt-2 text-primary-foreground/70">Numbers that speak for our quality and commitment.</p>
          <div className="mt-8 grid grid-cols-2 gap-6">
            {[
              { val: "15+", label: "Years of Experience" },
              { val: "25K+", label: "Happy Customers" },
              { val: "4.8★", label: "Customer Rating" },
              { val: "98%", label: "Success Rate" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-primary-foreground">{s.val}</div>
                <div className="mt-1 text-sm text-primary-foreground/70">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-2 rounded-xl bg-primary-foreground/10 p-3 text-sm text-primary-foreground">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            ISO 9001 Certified Service Center
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
