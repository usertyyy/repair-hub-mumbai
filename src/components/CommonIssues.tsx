import { Monitor, Wind, AlertTriangle, Thermometer, MonitorX, BatteryWarning, Gauge, Snowflake, Droplets, Volume2, Cpu, Power } from "lucide-react";
import { motion } from "framer-motion";

const laptopIssues = [
  { icon: Power, title: "Laptop Not Turning On" },
  { icon: Thermometer, title: "Overheating" },
  { icon: MonitorX, title: "Blue Screen Error" },
  { icon: Monitor, title: "Broken Screen" },
  { icon: BatteryWarning, title: "Charging Issue" },
  { icon: Gauge, title: "Slow Performance" },
];

const acIssues = [
  { icon: Snowflake, title: "AC Not Cooling" },
  { icon: AlertTriangle, title: "Gas Leakage" },
  { icon: Droplets, title: "Water Dripping" },
  { icon: Cpu, title: "Compressor Problem" },
  { icon: Cpu, title: "PCB Fault" },
  { icon: Volume2, title: "Noise Issue" },
];

const CommonIssues = () => (
  <section className="py-16 md:py-20">
    <div className="container">
      <div className="text-center">
        <h2 className="section-heading">Common Issues We Fix</h2>
        <p className="section-subheading mx-auto max-w-xl">Facing any of these problems? We can fix them quickly.</p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Laptop issues */}
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
            <Monitor className="h-5 w-5 text-accent" /> Laptop Issues
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {laptopIssues.map((issue, i) => (
              <motion.a href="#booking" key={issue.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="service-card flex items-center gap-3 py-4">
                <issue.icon className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm font-medium text-foreground">{issue.title}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* AC issues */}
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
            <Wind className="h-5 w-5 text-accent" /> AC Issues
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {acIssues.map((issue, i) => (
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
