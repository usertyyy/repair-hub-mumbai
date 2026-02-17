import { Monitor, Cpu, HardDrive, Database, CircuitBoard, Keyboard, Thermometer, ShieldAlert, Wind, Wrench, ArrowDownUp, Snowflake, Droplets, Power, Calendar, Zap } from "lucide-react";
import { motion } from "framer-motion";

const laptopServices = [
  { icon: Monitor, title: "Screen Replacement", desc: "Cracked or damaged screen? We replace all laptop screens with OEM quality." },
  { icon: Zap, title: "Battery Replacement", desc: "Restore your laptop's battery life with genuine replacement batteries." },
  { icon: Cpu, title: "Motherboard Repair", desc: "Expert chip-level motherboard repair for all laptop brands." },
  { icon: Database, title: "Data Recovery", desc: "Recover lost data from crashed hard drives and corrupted storage." },
  { icon: HardDrive, title: "SSD Upgrade", desc: "Speed up your laptop with a high-performance SSD upgrade." },
  { icon: Keyboard, title: "Keyboard Replacement", desc: "Replace faulty or broken laptop keyboards quickly." },
  { icon: Thermometer, title: "Overheating Fix", desc: "Thermal paste, fan cleaning, and cooling system repair." },
  { icon: ShieldAlert, title: "Virus Removal", desc: "Complete virus, malware removal and system optimization." },
];

const acServices = [
  { icon: Wind, title: "AC Gas Refilling", desc: "Professional gas top-up and leak detection for all AC brands." },
  { icon: Wrench, title: "AC Installation", desc: "Expert split and window AC installation with warranty." },
  { icon: ArrowDownUp, title: "AC Uninstallation", desc: "Safe removal and shifting of AC units." },
  { icon: Snowflake, title: "Cooling Issue Repair", desc: "Fix AC not cooling properly with expert diagnosis." },
  { icon: CircuitBoard, title: "AC PCB Repair", desc: "Circuit board repair and replacement for AC units." },
  { icon: Droplets, title: "Water Leakage Fix", desc: "Resolve water dripping and drainage issues." },
  { icon: Power, title: "AC Not Turning On", desc: "Diagnose and fix power issues in your AC unit." },
  { icon: Calendar, title: "Annual Maintenance", desc: "Comprehensive yearly AC servicing for peak performance." },
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
        <h2 className="section-heading">Our Expert Repair Services</h2>
        <p className="section-subheading mx-auto max-w-2xl">Professional repair solutions for laptops and air conditioners with genuine parts and 90-day warranty.</p>
      </div>

      {/* Laptop */}
      <div className="mt-12">
        <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-foreground">
          <Monitor className="h-5 w-5 text-accent" /> Laptop Repair Services
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {laptopServices.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
        </div>
      </div>

      {/* AC */}
      <div className="mt-14">
        <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-foreground">
          <Wind className="h-5 w-5 text-accent" /> AC Repair &amp; Service
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {acServices.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
        </div>
      </div>
    </div>
  </section>
);

export default ServicesSection;
