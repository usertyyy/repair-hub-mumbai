import { Phone, MessageCircle, Truck } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden" id="hero">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Expert technician repairing laptop and AC" className="h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(215 80% 15% / 0.88) 0%, hsl(215 70% 25% / 0.75) 100%)" }} />
      </div>

      <div className="container relative z-10 py-20 md:py-28 lg:py-36">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent-foreground backdrop-blur-sm border border-accent/30">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse-gentle" />
            Same-Day Service Available
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Expert Laptop &amp; AC Repair Service in <span className="text-accent">Vile Parle East</span>
          </h1>

          <p className="mt-5 text-lg text-primary-foreground/80 md:text-xl">
            Same-Day Service &bull; 90-Day Warranty &bull; Genuine Parts &bull; Free Pickup &amp; Delivery
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="tel:+919999999999" className="btn-cta text-base">
              <Phone className="h-5 w-5" /> Call Now
            </a>
            <a href="https://wa.me/919999999999?text=Hi%2C%20I%20need%20repair%20service" target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-base">
              <MessageCircle className="h-5 w-5" /> WhatsApp
            </a>
            <a href="#booking" className="btn-cta-outline text-base border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
              <Truck className="h-5 w-5" /> Book Free Pickup
            </a>
          </div>

          {/* Mini trust */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/70">
            <span>✓ No Fix No Fee</span>
            <span>✓ Inspection ₹350 (Adjustable)</span>
            <span>✓ ISO 9001 Certified</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
