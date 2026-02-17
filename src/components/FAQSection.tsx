import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How much does laptop repair cost?", a: "Repair costs depend on the issue. We charge a ₹350 inspection fee which is adjustable against the final repair cost. You get a detailed estimate before any work begins." },
  { q: "What are your AC service charges?", a: "AC service starts from ₹499 for basic servicing. Gas refilling, installation, and repairs are priced based on the AC type and brand. We provide transparent pricing upfront." },
  { q: "Do you offer same-day repair service?", a: "Yes! Most laptop and AC repairs are completed within the same day. For complex motherboard repairs, it may take 24-48 hours." },
  { q: "What warranty do you provide?", a: "We provide a 90-day warranty on all repairs and replaced parts. If the same issue recurs within the warranty period, we fix it for free." },
  { q: "Is pickup and delivery free?", a: "Yes, we offer free pickup and delivery for laptop repairs across Vile Parle East and surrounding areas in Mumbai." },
  { q: "Is my data safe during repair?", a: "Absolutely. Data safety is our top priority. We never access, copy, or delete any personal data. Your files remain untouched throughout the repair process." },
];

const FAQSection = () => (
  <section id="faq" className="py-16 md:py-20">
    <div className="container max-w-3xl">
      <div className="text-center">
        <h2 className="section-heading">Frequently Asked Questions</h2>
        <p className="section-subheading">Quick answers to common questions about our repair services.</p>
      </div>

      <div className="mt-10">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="service-card border-0 px-6">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FAQSection;
