import { Phone, Mail, MapPin, Clock, Wrench } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground pb-20 md:pb-0">
    <div className="container py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
              <Wrench className="h-4 w-4 text-accent-foreground" />
            </div>
            <span className="text-lg font-bold">Customer Service Center</span>
          </div>
          <p className="mt-3 text-sm text-primary-foreground/60">Mumbai's trusted home appliances & AC repair service since 2009. ISO 9001 certified with 90-day warranty on all repairs.</p>
          <div className="mt-4 flex gap-3 text-sm text-primary-foreground/60">
            <a href="#" className="hover:text-primary-foreground">Facebook</a>
            <a href="#" className="hover:text-primary-foreground">Instagram</a>
            <a href="#" className="hover:text-primary-foreground">Google</a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-bold mb-3">Services</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/60">
            <li><a href="#services" className="hover:text-primary-foreground">Washing Machine Repair</a></li>
            <li><a href="#services" className="hover:text-primary-foreground">Fridge Repair</a></li>
            <li><a href="#services" className="hover:text-primary-foreground">AC Repair</a></li>
            <li><a href="#services" className="hover:text-primary-foreground">AC Installation</a></li>
            <li><a href="#services" className="hover:text-primary-foreground">AC Gas Refilling</a></li>
            <li><a href="#services" className="hover:text-primary-foreground">Microwave Repair</a></li>
          </ul>
        </div>

        {/* Locations */}
        <div>
          <h4 className="font-bold mb-3">Locations</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/60">
            <li><a href="#areas" className="hover:text-primary-foreground">Vile Parle East</a></li>
            <li><a href="#areas" className="hover:text-primary-foreground">Andheri</a></li>
            <li><a href="#areas" className="hover:text-primary-foreground">Santacruz</a></li>
            <li><a href="#areas" className="hover:text-primary-foreground">Bandra</a></li>
            <li><a href="#areas" className="hover:text-primary-foreground">Juhu</a></li>
            <li><a href="#areas" className="hover:text-primary-foreground">Goregaon</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold mb-3">Contact Us</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/60">
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" /> <a href="tel:+918282822265" className="hover:text-primary-foreground">8282822265</a></li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" /> <a href="mailto:info@customerservicecenter.in" className="hover:text-primary-foreground">info@customerservicecenter.in</a></li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" />Mumbai, Mumbai 400057</li>
            <li className="flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5 shrink-0" /> Mon–Sun: 9AM–9PM</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/40">
        <p className="mb-4 leading-relaxed">
          <strong className="text-primary-foreground/60">Disclaimer:</strong> Any product names, logos, brands, and other trademarks or images featured or referred to within Customer Service Center are the property of their respective trademark holders. Customer Service Center is neither associated nor affiliated with any Companies. Logos and images are being used only for representation purpose of post warranty repair and service. We Have Home Appliances Parts Shop and We Provide all Brand service and Repairing. Customer Service Center is an independent organization.
        </p>
        <div className="flex flex-wrap justify-between gap-4">
          <span>© 2026 Customer Service Center. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
