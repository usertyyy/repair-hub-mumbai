import { Award, Users, Shield, Star, Clock, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  { icon: Clock, label: "15+ Years", sub: "Experience" },
  { icon: Users, label: "25,000+", sub: "Happy Customers" },
  { icon: Shield, label: "90-Day", sub: "Warranty" },
  { icon: BadgeCheck, label: "ISO 9001", sub: "Certified" },
  { icon: Star, label: "4.8 Stars", sub: "Rating" },
  { icon: Award, label: "Same-Day", sub: "Service" },
];

const TrustBadges = () => (
  <section className="bg-secondary py-8">
    <div className="container">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {badges.map((b, i) => (
          <motion.div key={b.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="trust-badge">
            <b.icon className="h-7 w-7 text-accent" />
            <span className="text-lg font-bold text-foreground">{b.label}</span>
            <span className="text-xs text-muted-foreground">{b.sub}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBadges;
