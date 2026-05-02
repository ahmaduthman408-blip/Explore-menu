import { motion } from "motion/react";
import { Product } from "../data/products";
import { useStore, DashboardProduct } from "../lib/StoreContext";
import { useCart } from "../lib/CartContext";
import { Clock, Star, ShoppingCart, Zap } from "lucide-react";
import { useState, useEffect } from "react";

function CountdownTimer({ urgencyType }: { urgencyType: Product['urgencyType'] }) {
  const [timeLeft, setTimeLeft] = useState(
    urgencyType === '30min' ? 30 * 60 : 2 * 60 * 60
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  if (timeLeft === 0) return <span className="text-red-500 font-[700] ml-1">Expired</span>;

  return (
    <span className="bg-[#fef2f2] border border-[#fee2e2] px-[8px] py-[4px] rounded-[4px] inline-block font-mono font-[700] text-[#ef4444] ml-[4px]">
      {hours > 0 ? `${hours}:` : ''}{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </span>
  );
}

interface ProductCardProps {
  product: DashboardProduct;
  key?: string | number;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, setIsCartOpen } = useCart();

  const handleBuyNow = () => {
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group bg-white border border-[#f1f5f9] p-[16px] rounded-[12px] transition-all duration-200 relative hover:border-brand-gold hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] flex flex-col"
    >
      <div className="relative h-[180px] bg-[#f1f5f9] rounded-[8px] mb-[12px] flex items-center justify-center overflow-hidden">
        {product.videoUrl ? (
          <video 
            src={product.videoUrl} 
            className="w-full h-full object-cover"
            controls
            autoPlay
            muted
            loop
          />
        ) : (
          <img 
            src={product.images && product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        )}
        {product.tags && product.tags.includes('Best Seller') && (
          <div className="absolute top-[10px] right-[10px] bg-brand-gold text-white text-[10px] px-[8px] py-[3px] rounded-[4px] font-[700]">
            BEST SELLER
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="font-[700] text-[16px] mb-[4px] text-brand-blue">{product.name}</h3>
        
        <p className="text-[12px] text-[#64748b] mb-[8px] h-[32px] overflow-hidden">
          {product.description}
        </p>

        <div className="text-[18px] font-[800] text-brand-blue mb-[12px]">
          ₦{product.price.toLocaleString()}
        </div>
        
        {((product.stockLeft !== undefined && product.stockLeft <= 5 && product.stockLeft > 0) || product.urgencyType) && (
          <div className="text-[11px] text-[#f97316] font-[700] flex items-center gap-[4px] mb-[10px] mt-auto">
            🔥 {product.stockLeft !== undefined && product.stockLeft <= 5 ? `Only ${product.stockLeft} left` : 'Limited Offer'}
            {product.urgencyType && <CountdownTimer urgencyType={product.urgencyType} />}
          </div>
        )}

        <div className="grid grid-cols-2 gap-[8px] mt-auto">
          <button 
            onClick={() => addToCart(product)}
            className="bg-[#e0e7ff] text-brand-blue p-[8px] text-[11px] font-[600] rounded-[6px] text-center cursor-pointer hover:bg-brand-blue hover:text-white transition-colors"
          >
            Add to Cart
          </button>
          <button 
            onClick={handleBuyNow}
            className="bg-brand-orange text-white p-[8px] text-[11px] font-[600] rounded-[6px] text-center cursor-pointer hover:opacity-90 transition-opacity"
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function ProductsSection() {
  const { products } = useStore();
  
  return (
    <section id="products" className="py-[80px] bg-white border-t border-[#eaeaea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-[40px]">
        <div className="text-center max-w-2xl mx-auto mb-[40px]">
          <h2 className="text-[36px] font-[800] text-brand-blue mb-[16px]">Our Signature Collection</h2>
          <p className="text-[16px] text-[#64748b]">
            Explore our carefully curated selection of premium fragrances. Find the scent that speaks to your soul.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
