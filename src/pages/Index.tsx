import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import ServicesSection from "@/components/ServicesSection";
import BrandsSection from "@/components/BrandsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import RepairProcess from "@/components/RepairProcess";
import ServiceAreas from "@/components/ServiceAreas";
import CommonIssues from "@/components/CommonIssues";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import BookingSection from "@/components/BookingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Customer Service Center",
  description: "Expert Laptop & AC Repair Service in Vile Parle East, Mumbai. Same-day service, 90-day warranty, genuine parts, free pickup & delivery.",
  url: "https://customerservicecenter.in",
  telephone: "+919999999999",
  email: "info@customerservicecenter.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Vile Parle East",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400057",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 19.0987, longitude: 72.8491 },
  openingHours: "Mo-Su 09:00-21:00",
  priceRange: "₹₹",
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "25000" },
  image: "https://customerservicecenter.in/hero.jpg",
  sameAs: [],
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How much does laptop repair cost?", acceptedAnswer: { "@type": "Answer", text: "Repair costs depend on the issue. We charge a ₹350 inspection fee which is adjustable against the final repair cost." } },
    { "@type": "Question", name: "Do you offer same-day repair service?", acceptedAnswer: { "@type": "Answer", text: "Yes! Most laptop and AC repairs are completed within the same day." } },
    { "@type": "Question", name: "What warranty do you provide?", acceptedAnswer: { "@type": "Answer", text: "We provide a 90-day warranty on all repairs and replaced parts." } },
    { "@type": "Question", name: "Is pickup and delivery free?", acceptedAnswer: { "@type": "Answer", text: "Yes, we offer free pickup and delivery for laptop repairs across Vile Parle East and surrounding areas." } },
  ],
};

const Index = () => {
  useEffect(() => {
    // Inject structured data
    const script1 = document.createElement("script");
    script1.type = "application/ld+json";
    script1.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.type = "application/ld+json";
    script2.textContent = JSON.stringify(faqStructuredData);
    document.head.appendChild(script2);

    // Update meta
    document.title = "Laptop & AC Repair in Vile Parle East | Customer Service Center Mumbai";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Expert laptop & AC repair in Vile Parle East, Mumbai. Same-day service, 90-day warranty, genuine parts. Free pickup & delivery. Call now!");
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "Expert laptop & AC repair in Vile Parle East, Mumbai. Same-day service, 90-day warranty, genuine parts. Free pickup & delivery. Call now!";
      document.head.appendChild(meta);
    }

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TrustBadges />
        <ServicesSection />
        <BrandsSection />
        <WhyChooseUs />
        <RepairProcess />
        <BookingSection />
        <ServiceAreas />
        <CommonIssues />
        <ReviewsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;
