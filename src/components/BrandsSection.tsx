import { motion } from "framer-motion";
import { AC_BRANDS, FRIDGE_BRANDS, WASHING_MACHINE_BRANDS } from "@/lib/constants";

const BrandChip = ({ name, index, onClick }: { name: string; index: number; onClick: (name: string) => void }) => (
  <motion.button
    onClick={() => onClick(name)}
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.02 }}
    className="service-card flex items-center justify-center px-4 py-3 text-center text-sm font-semibold text-foreground hover:text-accent cursor-pointer w-full"
  >
    {name}
  </motion.button>
);

const BrandsSection = ({ onBrandSelect }: { onBrandSelect: (brand: string) => void }) => (
  <section id="brands" className="bg-secondary py-16 md:py-20">
    <div className="container">
      <div className="text-center">
        <h2 className="section-heading">All Major Brands We Service</h2>
        <p className="section-subheading mx-auto max-w-2xl">Authorized service for 40+ leading AC and home appliance brands with genuine spare parts.</p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 text-lg font-bold text-foreground">AC Brands</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {AC_BRANDS.map((b, i) => <BrandChip key={b} name={b} index={i} onClick={onBrandSelect} />)}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 text-lg font-bold text-foreground">Fridge Brands</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {FRIDGE_BRANDS.map((b, i) => <BrandChip key={b} name={b} index={i} onClick={onBrandSelect} />)}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 text-lg font-bold text-foreground">Washing Machine Brands</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {WASHING_MACHINE_BRANDS.map((b, i) => <BrandChip key={b} name={b} index={i} onClick={onBrandSelect} />)}
        </div>
      </div>
    </div>
  </section>
);

export default BrandsSection;
