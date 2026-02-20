import { useState, useEffect } from "react";
import { X, Wrench, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollPopup = () => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const handleScroll = () => {
      if (window.scrollY > 600 && !dismissed) {
        setShow(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  if (!show || dismissed) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 animate-fade-in p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-background p-6 shadow-2xl animate-scale-in">
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground hover:bg-muted"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Wrench className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Need Expert Repair?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Get <strong>same-day AC, Fridge & Washing Machine repair</strong> with 90-day warranty. Free pickup & delivery in Mumbai!
          </p>
          <p className="text-xs text-muted-foreground/70 leading-relaxed">
            <strong>Disclaimer:</strong> Customer Service Center is an independent organization, not associated or affiliated with any brand. Trademarks belong to their respective holders.
          </p>
          <div className="flex w-full gap-3">
            <Button asChild className="flex-1 bg-gradient-to-r from-primary to-accent">
              <a href="tel:+918282822265"><Phone className="h-4 w-4" /> Call Now</a>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <a href="https://wa.me/918282822265" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollPopup;
