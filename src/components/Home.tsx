import { Hero } from "./Hero";
import { ProductCard } from "./Products";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useStore } from "../lib/StoreContext";

export function Home() {
  const { products } = useStore();
  const featuredProducts = products.slice(0, 4); // Display first 4 products

  return (
    <>
      <Hero />
      <section className="py-[60px] bg-white border-b border-[#eaeaea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-[40px]">
          <div className="flex justify-between items-end mb-[32px]">
            <div>
              <h2 className="text-[28px] font-[800] text-brand-blue mb-[8px]">Featured Products</h2>
              <p className="text-[14px] text-[#64748b]">Handpicked fragrances perfect for any occasion.</p>
            </div>
            <Link 
              to="/products"
              className="hidden sm:flex items-center gap-[6px] text-brand-blue font-[600] text-[14px] hover:underline"
            >
              View all <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-[32px] sm:hidden flex justify-center">
             <Link 
              to="/products"
              className="flex items-center gap-[6px] bg-[#f8fafc] px-[20px] py-[10px] rounded-[6px] text-brand-blue font-[600] text-[14px] border border-[#eaeaea]"
            >
              View all signature scents <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
