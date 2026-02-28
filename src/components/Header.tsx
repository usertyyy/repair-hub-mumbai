import { useState } from "react";
import { Phone, Menu, X, Wrench, ChevronDown, Refrigerator, WashingMachine, Wind } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Brands", href: "#brands" },
  { label: "Why Us", href: "#why-us" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const serviceItems = [
  { label: "Refrigerator Repair", href: "/refrigerator-repair", icon: Refrigerator },
  { label: "Washing Machine Repair", href: "/washing-machine-repair", icon: WashingMachine },
  { label: "AC Repair", href: "/ac-repair", icon: Wind },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between py-1.5 text-sm">
          <span className="hidden sm:inline">📍Mumbai | Mon–Sun: 9AM–9PM</span>
          <span className="sm:hidden text-xs">📍Mumbai's trusted Repair service since 2009</span>
          <a href="tel:+918282822265" className="flex items-center gap-1 font-semibold hover:underline">
            <Phone className="h-3 w-3" /> +918282822265
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="container flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Wrench className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <span className="text-lg font-bold text-foreground">Customer Service</span>
            <span className="block text-xs text-muted-foreground">Centre</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary py-2">
              Services <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            
            {servicesOpen && (
              <div className="absolute left-0 top-full w-64 rounded-xl border border-border bg-card p-2 shadow-xl animate-in fade-in slide-in-from-top-2">
                {serviceItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {l.label}
            </a>
          ))}
          <a href="tel:+918282822265" className="btn-cta text-sm">
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
        <nav className="border-t border-border bg-card px-4 pb-4 lg:hidden animate-slide-in-bottom max-h-[80vh] overflow-y-auto">
          {/* Mobile Services Accordion */}
          <div className="border-b border-border">
            <button 
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex w-full items-center justify-between py-3 text-sm font-medium text-foreground"
            >
              Services <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <div className="bg-muted/30 px-4 pb-2">
                {serviceItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-medium text-foreground border-b border-border last:border-0">
              {l.label}
            </a>
          ))}
          <a href="tel:+918282822265" className="btn-cta mt-3 w-full text-sm">
            <Phone className="h-4 w-4" /> Call Now
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
