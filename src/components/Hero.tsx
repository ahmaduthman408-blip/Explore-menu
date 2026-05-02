import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Truck, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section id="home" className="bg-[#f8fafc] pt-[20px] pb-[32px] border-b border-[#eaeaea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-[40px] w-full grid lg:grid-cols-2 gap-[40px] items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-[42px] leading-[1.1] text-brand-blue font-[800] mb-[16px] max-w-xl">
            Discover Luxury Fragrances That Define You
          </h1>
          <p className="text-[16px] text-[#64748b] leading-[1.5] mb-[32px] max-w-lg">
            Affordable, long-lasting premium perfumes curated for every personality. Elevate your presence today.
          </p>

          <div className="flex flex-wrap items-center gap-[12px] mb-[40px]">
            <Link 
              to="/products" 
              className="px-[24px] py-[12px] bg-brand-blue text-white rounded-[6px] font-[600] text-[14px] text-center transition-all duration-200 hover:opacity-90 flex items-center gap-2"
            >
              Shop Now <ArrowRight size={16} />
            </Link>
            <Link 
              to="/about" 
              className="px-[24px] py-[12px] bg-transparent border-2 border-brand-blue text-brand-blue rounded-[6px] font-[600] text-[14px] text-center transition-all duration-200 hover:bg-brand-blue hover:text-white"
            >
              View Collection
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-[16px]">
            <div className="flex items-center gap-[6px] text-[11px] text-[#475569] font-[600]">
              <div className="w-[16px] h-[16px] bg-brand-gold rounded-full flex items-center justify-center text-white"><Truck size={10} /></div>
              Fast Delivery
            </div>
            <div className="flex items-center gap-[6px] text-[11px] text-[#475569] font-[600]">
              <div className="w-[16px] h-[16px] bg-brand-gold rounded-full flex items-center justify-center text-white"><ShieldCheck size={10} /></div>
              Quality Assured
            </div>
            <div className="flex items-center gap-[6px] text-[11px] text-[#475569] font-[600]">
              <div className="w-[16px] h-[16px] bg-brand-gold rounded-full flex items-center justify-center text-white"><Clock size={10} /></div>
              Long-Lasting Focus
            </div>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="hidden lg:flex justify-center"
        >
          <div className="relative w-full max-w-md aspect-[4/5] rounded-[12px] overflow-hidden border border-[#eaeaea] bg-white p-4 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)]">
            <img 
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800" 
              alt="Premium Perfume Bottle" 
              className="w-full h-full object-cover rounded-[8px]"
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-sm p-4 rounded-[8px] border border-[#f1f5f9] shadow-lg flex items-center justify-between"
            >
              <div>
                <div className="text-[12px] font-[700] text-[#94a3b8]">24K LUXE</div>
                <div className="text-[16px] font-[700] text-[#111]">24K Gold</div>
              </div>
              <div className="text-brand-blue font-[800] text-[18px]">₦35,000</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
