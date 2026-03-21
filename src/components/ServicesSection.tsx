import { Wrench, CircuitBoard, Droplets, Calendar, WashingMachine } from "lucide-react";
import { motion } from "framer-motion";

const washingMachineServices = [
  { icon: Wrench, title: "Drum & Motor Repair", desc: "Fixing spinning issues and motor replacement." },
  { icon: Droplets, title: "Water Leakage", desc: "Resolving inlet, outlet, and door seal leaks." },
  { icon: CircuitBoard, title: "PCB Repair", desc: "Expert motherboard repair for all fully automatic models." },
  { icon: Calendar, title: "Installation & Service", desc: "Professional setup and deep cleaning service." },
];

const ServiceCard = ({ icon: Icon, title, desc, index }: { icon: any; title: string; desc: string; index: number }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="service-card flex flex-col">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
      <Icon className="h-6 w-6 text-accent" />
    </div>
    <h3 className="text-lg font-bold text-foreground">{title}</h3>
    <p className="mt-2 flex-1 text-sm text-muted-foreground">{desc}</p>
    <a href="#booking" className="mt-4 text-sm font-semibold text-accent hover:underline">
      Book Now →
    </a>
  </motion.div>
);

const ServicesSection = () => (
  <section id="services" className="py-16 md:py-20">
    <div className="container">
      <div className="text-center">
        <h2 className="section-heading">Our Expert Washing Machine Repair Services</h2>
        <p className="section-subheading mx-auto max-w-2xl">Professional repair solutions for washing machines with genuine parts and 90-day warranty.</p>
      </div>

      {/* Washing Machine */}
      <div className="mt-14">
        <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-foreground">
          <WashingMachine className="h-5 w-5 text-accent" /> Washing Machine Repair
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {washingMachineServices.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
        </div>
      </div>
    </div>
  </section>
);

export default ServicesSection;
