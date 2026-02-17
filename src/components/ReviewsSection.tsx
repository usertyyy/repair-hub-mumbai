import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  { name: "Rajesh Sharma", review: "Excellent laptop repair service! My Dell laptop was fixed within 3 hours. Very professional team.", service: "Laptop Motherboard Repair" },
  { name: "Priya Mehta", review: "Best AC service in Vile Parle. Technician was on time and fixed the cooling issue perfectly.", service: "AC Gas Refilling" },
  { name: "Amit Patel", review: "Got my MacBook screen replaced at a very reasonable price. Genuine parts and great warranty.", service: "Screen Replacement" },
  { name: "Sneha Desai", review: "Free pickup and delivery was a great convenience. My laptop came back as good as new!", service: "SSD Upgrade" },
  { name: "Vikram Joshi", review: "They fixed my AC water leakage problem that two other services couldn't. Highly recommended!", service: "AC Water Leakage Fix" },
  { name: "Neha Kulkarni", review: "Very honest pricing. They told me upfront what the issue was and the cost. No hidden charges at all.", service: "Laptop Battery Replacement" },
];

const ReviewsSection = () => (
  <section id="reviews" className="bg-secondary py-16 md:py-20">
    <div className="container">
      <div className="text-center">
        <h2 className="section-heading">What Our Customers Say</h2>
        <p className="section-subheading mx-auto max-w-xl">Trusted by 25,000+ happy customers across Mumbai.</p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r, i) => (
          <motion.div key={r.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="service-card">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, si) => (
                <Star key={si} className="h-4 w-4 fill-star text-star" />
              ))}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">"{r.review}"</p>
            <div className="mt-4 border-t border-border pt-3">
              <div className="font-bold text-foreground">{r.name}</div>
              <div className="text-xs text-muted-foreground">{r.service}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ReviewsSection;
