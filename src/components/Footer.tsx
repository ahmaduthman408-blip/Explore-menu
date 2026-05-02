import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-[#050C17] text-gray-400 pt-12 pb-2 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-serif font-bold text-white mb-4">
            EXPLORE <span className="text-brand-orange">MENU</span>
          </h3>
          <p className="max-w-md text-sm leading-relaxed mb-6">
            Luxury fragrances curated for perfection. Elevate your presence with our premium collection of long-lasting perfumes crafted to leave a memorable trail.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-brand-orange transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-brand-orange transition-colors">Shop</Link></li>
            <li><Link to="/about" className="hover:text-brand-orange transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-brand-orange transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-brand-orange transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Refund Policy</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Shipping Info</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/10 text-center text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} EXPLORE MENU. All rights reserved.</p>
        <div className="flex gap-4">
          <span className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer">Instagram</span>
          <span className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer">Twitter</span>
          <span className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer">Facebook</span>
        </div>
      </div>
    </footer>
  );
}
