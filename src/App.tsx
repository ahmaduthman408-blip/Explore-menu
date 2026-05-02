import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/AuthContext";
import { CartProvider } from "./lib/CartContext";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { ProductsSection } from "./components/Products";
import { AboutSection } from "./components/About";
import { ContactSection } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Cart } from "./components/Cart";
import { AuthModal } from "./components/AuthModal";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { ExitPopup } from "./components/ExitPopup";

import { StoreProvider } from "./lib/StoreContext";
import { AdminLayout } from "./components/admin/AdminLayout";

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <Router>
      <StoreProvider>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/admin/*" element={<AdminLayout />} />
              <Route path="*" element={
                <div className="relative">
                  <Header onOpenAuth={() => setIsAuthOpen(true)} />
                  
                  <main className="pt-[72px]">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<ProductsSection />} />
                      <Route path="/about" element={<AboutSection />} />
                      <Route path="/contact" element={<ContactSection />} />
                    </Routes>
                  </main>

                  <Footer />
                  
                  <Cart onOpenAuth={() => setIsAuthOpen(true)} />
                  <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
                  <WhatsAppFloat />
                  <ExitPopup />
                </div>
              } />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </StoreProvider>
    </Router>
  );
}
