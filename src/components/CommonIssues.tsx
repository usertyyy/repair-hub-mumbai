import { Wind, AlertTriangle, Snowflake, Droplets, Cpu, Power, Refrigerator, WashingMachine, Thermometer, Waves } from "lucide-react";
import { motion } from "framer-motion";

const acIssues = [
  { icon: Snowflake, title: "AC Not Cooling" },
  { icon: AlertTriangle, title: "Gas Leakage" },
  { icon: Droplets, title: "Water Dripping" },
  { icon: Cpu, title: "Compressor Problem" },
  { icon: Cpu, title: "PCB Fault" },
];

const fridgeIssues = [
  { icon: Snowflake, title: "Not Cooling" },
  { icon: Thermometer, title: "Defrosting Issue" },
  { icon: AlertTriangle, title: "Gas Leakage" },
  { icon: Power, title: "Not Turning On" },
  { icon: Cpu, title: "PCB Fault" },
];

const washingMachineIssues = [
  { icon: Waves, title: "Not Spinning" },
  { icon: Droplets, title: "Water Leakage" },
  { icon: Power, title: "Not Starting" },
  { icon: Waves, title: "Vibration Issue" },
  { icon: Cpu, title: "PCB Problem" },
];

const CommonIssues = () => (
  <section className="py-16 md:py-20">
    <div className="container">
      <div className="text-center">
        <h2 className="section-heading">Common Issues We Fix</h2>
        <p className="section-subheading mx-auto max-w-xl">Facing any of these problems? We can fix them quickly.</p>
      </div>

      <div className="mt-10 max-w-4xl mx-auto space-y-12">
        {/* AC issues */}
        <div>
          <h3 className="mb-4 flex items-center justify-center gap-2 text-lg font-bold text-foreground">
            <Wind className="h-5 w-5 text-accent" /> Common AC Issues
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {acIssues.map((issue, i) => (
              <motion.a href="#booking" key={issue.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="service-card flex items-center gap-3 py-4">
                <issue.icon className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm font-medium text-foreground">{issue.title}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Fridge issues */}
        <div>
          <h3 className="mb-4 flex items-center justify-center gap-2 text-lg font-bold text-foreground">
            <Refrigerator className="h-5 w-5 text-accent" /> Common Fridge Issues
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {fridgeIssues.map((issue, i) => (
              <motion.a href="#booking" key={issue.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="service-card flex items-center gap-3 py-4">
                <issue.icon className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm font-medium text-foreground">{issue.title}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Washing Machine issues */}
        <div>
          <h3 className="mb-4 flex items-center justify-center gap-2 text-lg font-bold text-foreground">
            <WashingMachine className="h-5 w-5 text-accent" /> Common Washing Machine Issues
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {washingMachineIssues.map((issue, i) => (
              <motion.a href="#booking" key={issue.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="service-card flex items-center gap-3 py-4">
                <issue.icon className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm font-medium text-foreground">{issue.title}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CommonIssues;
