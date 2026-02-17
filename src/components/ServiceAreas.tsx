import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

const areas = [
  { name: "Vile Parle East", badge: "Main Hub" },
  { name: "Andheri" },
  { name: "Santacruz" },
  { name: "Bandra" },
  { name: "Juhu" },
  { name: "Goregaon" },
  { name: "Malad" },
  { name: "Borivali" },
];

const ServiceAreas = () => (
  <section id="areas" className="py-16 md:py-20">
    <div className="container">
      <div className="text-center">
        <h2 className="section-heading">Service Areas in Mumbai</h2>
        <p className="section-subheading mx-auto max-w-xl">We serve all major areas across Mumbai with free pickup & delivery.</p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {areas.map((a, i) => (
          <motion.div key={a.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
            className="service-card flex items-center gap-3">
            <MapPin className="h-5 w-5 shrink-0 text-accent" />
            <div>
              <span className="font-bold text-foreground">{a.name}</span>
              {a.badge && <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">{a.badge}</span>}
              <div className="text-xs text-muted-foreground">Laptop & AC Repair</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Map embed */}
      <div className="mt-10 overflow-hidden rounded-2xl" style={{ boxShadow: "var(--card-shadow)" }}>
        <iframe
          title="Customer Service Center Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.5836832769996!2d72.8491!3d19.0987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA1JzU1LjMiTiA3MsKwNTAnNTYuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </section>
);

export default ServiceAreas;
