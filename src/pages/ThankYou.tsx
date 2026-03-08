import React, { useEffect } from "react";
import { CheckCircle2, Home, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ThankYou = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Booking Confirmed | Customer Service Centre";
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-success/20 blur-3xl rounded-full scale-150" />
            <CheckCircle2 className="relative mx-auto h-24 w-24 text-success" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Booking Confirmed!
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Thank you for choosing Customer Service Centre. Your request has been received, and our expert technician will call you within <span className="text-foreground font-semibold">30 minutes</span> to confirm your appointment.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 max-w-md mx-auto pt-8">
            <Link
              to="/"
              className="btn-ghost flex items-center justify-center gap-2 py-4"
            >
              <Home className="h-5 w-5" />
              Go to Home
            </Link>
            <a
              href="tel:+918282822265"
              className="btn-cta flex items-center justify-center gap-2 py-4"
            >
              <Phone className="h-5 w-5" />
              Call Support
            </a>
          </div>

          <div className="pt-12 border-t border-border mt-12">
            <p className="text-sm text-muted-foreground mb-4">Need immediate assistance?</p>
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="https://wa.me/918282822265?text=Hi%2C%20I%20just%20booked%20a%20repair%20and%20need%20urgent%20help." 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-success hover:underline font-medium"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                Technicians are available now
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;
