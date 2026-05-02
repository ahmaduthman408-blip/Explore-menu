import { ShoppingBag, Menu, X, User, Settings as SettingsIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../lib/CartContext";
import { useAuth } from "../lib/AuthContext";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../lib/StoreContext";

export function Header({ onOpenAuth }: { onOpenAuth: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const { settings } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#eaeaea] h-[72px] flex flex-col justify-center transition-all duration-300"
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-[40px] flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-[20px] font-black tracking-[2px] text-brand-blue uppercase">
          {settings.logo ? <img src={settings.logo} alt="Logo" className="h-8 object-contain" /> : null}
          {settings.websiteName}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-[32px]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn("text-[14px] font-medium no-underline transition-all duration-200 hover:scale-105", location.pathname === link.href ? "text-brand-orange" : "text-[#555] hover:text-brand-blue")}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-[20px]">
          <Link to="/admin" className="flex items-center justify-center text-[#555] hover:text-brand-blue transition-all hover:scale-105">
            <SettingsIcon size={20} />
          </Link>
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm font-bold text-brand-blue uppercase">{user.fullName.split(" ")[0]}</span>
              <button onClick={logout} className="text-xs text-brand-orange hover:underline font-semibold">LOGOUT</button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="hidden md:flex items-center gap-2 font-bold text-[12px] text-brand-blue uppercase hover:opacity-80 transition-opacity"
            >
              LOGIN
            </button>
          )}

          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center justify-center w-[32px] h-[32px] bg-brand-blue rounded-full text-white text-[12px] font-medium hover:bg-opacity-90 transition-all hover:scale-105"
          >
            {totalItems > 0 ? totalItems : <ShoppingBag size={16} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-brand-blue"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl flex flex-col md:hidden border-t"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-4 border-b text-brand-blue hover:bg-brand-orange/10 hover:text-brand-orange font-medium"
              >
                {link.name}
              </Link>
            ))}
            <div className="px-6 py-4">
              {user ? (
                <div className="flex justify-between items-center">
                  <span className="font-medium text-brand-blue">Hi, {user.fullName}</span>
                  <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-sm text-brand-orange font-bold">Logout</button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full bg-brand-blue text-white py-3 rounded text-center font-medium hover:bg-brand-orange transition-colors"
                >
                  Sign In / Register
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
