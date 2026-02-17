import { CalendarCheck, Search, Wrench, Truck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: CalendarCheck, title: "Book Appointment", desc: "Call, WhatsApp, or fill the form to schedule your repair." },
  { icon: Search, title: "Free Diagnosis", desc: "Our expert diagnoses the issue. ₹350 inspection fee (adjustable against repair)." },
  { icon: Wrench, title: "Expert Repair", desc: "Repair begins only after your approval of the estimated cost." },
  { icon: Truck, title: "Delivery + Warranty", desc: "Device delivered with 90-day warranty on all repairs." },
];

const RepairProcess = () => (
  <section id="process" className="bg-secondary py-16 md:py-20">
    <div className="container">
      <div className="text-center">
        <h2 className="section-heading">How It Works</h2>
        <p className="section-subheading mx-auto max-w-xl">Simple 4-step process to get your device repaired hassle-free.</p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
            className="service-card relative text-center">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-primary-foreground" style={{ background: "var(--cta-gradient)" }}>
              {i + 1}
            </div>
            <div className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
              <s.icon className="h-7 w-7 text-accent" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default RepairProcess;
