import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useStore } from "../lib/StoreContext";

export function AboutSection() {
  const { settings } = useStore();
  const points = [
    "100% Authentic Ingredients",
    "Long-Lasting Formulations",
    "Affordable Luxury Pricing",
    "Cruelty-Free Practices"
  ];

  return (
    <section id="about" className="py-[80px] bg-white relative overflow-hidden border-t border-[#eaeaea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-[40px]">
        <div className="grid lg:grid-cols-2 gap-[40px] items-center">
          
          {/* Images Grid */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-[20px] relative"
          >
            <div className="absolute inset-0 bg-brand-gold/5 blur-3xl -z-10 transform -translate-x-1/2"></div>
            <img 
              src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600" 
              alt="Perfume Creation" 
              className="w-full h-[240px] object-cover rounded-[12px] mt-8 border border-[#eaeaea]"
            />
            <img 
              src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&q=80&w=600" 
              alt="Luxury Spray" 
              className="w-full h-[240px] object-cover rounded-[12px] border border-[#f1f5f9]"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-[36px] font-[800] text-brand-blue mb-[20px] leading-[1.1]">
              The Essence of <span className="text-brand-orange">{settings.websiteName}</span>
            </h2>
            <p className="text-[16px] text-[#64748b] mb-[20px] leading-[1.5] whitespace-pre-wrap">
              {settings.ourStory}
            </p>
            
            <ul className="grid sm:grid-cols-2 gap-[16px]">
              {points.map(point => (
                <li key={point} className="flex items-center gap-[10px] text-[#111] font-[600] text-[14px]">
                  <CheckCircle2 className="text-brand-gold" size={16} />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
