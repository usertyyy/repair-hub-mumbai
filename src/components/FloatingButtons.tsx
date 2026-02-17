import { Phone, MessageCircle } from "lucide-react";

const FloatingButtons = () => (
  <>
    {/* WhatsApp floating */}
    <a href="https://wa.me/919999999999?text=Hi%2C%20I%20need%20repair%20service" target="_blank" rel="noopener noreferrer"
      className="floating-btn bottom-24 right-4 h-14 w-14 md:bottom-6 md:right-6" style={{ background: "linear-gradient(135deg, hsl(142 70% 40%), hsl(142 70% 32%))" }}
      aria-label="Chat on WhatsApp">
      <MessageCircle className="h-6 w-6 text-primary-foreground" />
    </a>

    {/* Mobile sticky call bar */}
    <div className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden" style={{ background: "var(--cta-gradient)" }}>
      <a href="tel:+919999999999" className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-primary-foreground">
        <Phone className="h-4 w-4" /> Call Now
      </a>
      <div className="w-px bg-primary-foreground/20" />
      <a href="https://wa.me/919999999999?text=Hi%2C%20I%20need%20repair%20service" target="_blank" rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-primary-foreground">
        <MessageCircle className="h-4 w-4" /> WhatsApp
      </a>
    </div>
  </>
);

export default FloatingButtons;
