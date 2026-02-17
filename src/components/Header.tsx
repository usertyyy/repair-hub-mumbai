import { useState } from "react";
import { Phone, Menu, X, Wrench } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Brands", href: "#brands" },
  { label: "Why Us", href: "#why-us" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between py-1.5 text-sm">
          <span className="hidden sm:inline">📍 Vile Parle East, Mumbai | Mon–Sun: 9AM–9PM</span>
          <span className="sm:hidden text-xs">📍 Vile Parle East, Mumbai</span>
          <a href="tel:+919999999999" className="flex items-center gap-1 font-semibold hover:underline">
            <Phone className="h-3 w-3" /> +91 99999 99999
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="container flex items-center justify-between py-3">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Wrench className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <span className="text-lg font-bold text-foreground">Customer Service</span>
            <span className="block text-xs text-muted-foreground">Center</span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {l.label}
            </a>
          ))}
          <a href="tel:+919999999999" className="btn-cta text-sm">
            <Phone className="h-4 w-4" /> Call Now
          </a>
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden rounded-lg p-2 text-foreground hover:bg-muted" aria-label="Toggle menu">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-border bg-card px-4 pb-4 lg:hidden animate-slide-in-bottom">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-medium text-foreground border-b border-border last:border-0">
              {l.label}
            </a>
          ))}
          <a href="tel:+919999999999" className="btn-cta mt-3 w-full text-sm">
            <Phone className="h-4 w-4" /> Call Now
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
