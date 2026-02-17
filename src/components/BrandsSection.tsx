import { motion } from "framer-motion";

const acBrands = [
  "Blue Star", "BPL", "Carrier", "Croma", "Cruise", "Daikin", "Electrolux", "Godrej",
  "Gree", "Haier", "Hisense", "Hitachi", "IFB", "Kelvinator", "Koryo", "LG",
  "Lloyd", "MarQ", "Midea", "Mitashi", "Mitsubishi Electric", "Mitsubishi Heavy",
  "O General", "Onida", "Panasonic", "Samsung", "Sansui", "TCL", "Toshiba",
  "Videocon", "Voltas", "Whirlpool",
];

const laptopBrands = [
  "Dell", "HP", "Lenovo", "Asus", "Acer", "Apple", "MSI", "Razer",
  "Samsung", "Toshiba", "Sony",
];

const BrandChip = ({ name, index }: { name: string; index: number }) => (
  <motion.a
    href={`#${name.toLowerCase().replace(/\s+/g, "-")}`}
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.02 }}
    className="service-card flex items-center justify-center px-4 py-3 text-center text-sm font-semibold text-foreground hover:text-accent cursor-pointer"
  >
    {name}
  </motion.a>
);

const BrandsSection = () => (
  <section id="brands" className="bg-secondary py-16 md:py-20">
    <div className="container">
      <div className="text-center">
        <h2 className="section-heading">All Major Brands We Service</h2>
        <p className="section-subheading mx-auto max-w-2xl">Authorized service for 40+ leading laptop and AC brands with genuine spare parts.</p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 text-lg font-bold text-foreground">AC Brands</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {acBrands.map((b, i) => <BrandChip key={b} name={b} index={i} />)}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 text-lg font-bold text-foreground">Laptop Brands</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {laptopBrands.map((b, i) => <BrandChip key={b} name={b} index={i} />)}
        </div>
      </div>
    </div>
  </section>
);

export default BrandsSection;
