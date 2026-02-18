import { Phone, MessageCircle, Truck } from "lucide-react";

const CTASection = () => (
  <section id="contact" className="py-16 md:py-20">
    <div className="container">
      <div className="rounded-3xl px-6 py-12 text-center md:px-12 md:py-16" style={{ background: "var(--hero-gradient)" }}>
        <h2 className="text-3xl font-extrabold text-primary-foreground md:text-4xl">
          Need Expert Laptop or AC Repair in Vile Parle East?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
          Get same-day repair service with 90-day warranty. Free pickup & delivery across Mumbai.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="tel:+918282822265" className="btn-cta text-base">
            <Phone className="h-5 w-5" /> Call Now
          </a>
          <a href="https://wa.me/+918282822265?text=Hi%2C%20I%20need%20repair%20service" target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-base">
            <MessageCircle className="h-5 w-5" /> WhatsApp
          </a>
          <a href="#booking" className="btn-cta-outline text-base border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
            <Truck className="h-5 w-5" /> Book Pickup
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
