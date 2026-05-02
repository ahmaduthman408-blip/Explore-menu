import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../lib/CartContext";
import { useAuth } from "../lib/AuthContext";
import { motion, AnimatePresence } from "motion/react";
import { usePaystackPayment } from "react-paystack";
import { useState } from "react";

export function Cart({ onOpenAuth }: { onOpenAuth: () => void }) {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, totalPrice, totalItems, clearCart } = useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const { user } = useAuth();

  const config = {
    email: user?.email || "uthmanahmad378@gmail.com",
    amount: totalPrice * 100, // Paystack amount is in kobo
    publicKey: 'pk_live_e5b70f1b56437bb00b89ba158b1958a2d6176214',
    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: user?.fullName || "Guest"
        },
        {
          display_name: "Phone Number",
          variable_name: "phone_number",
          value: user?.phone || "N/A"
        }
      ]
    }
  };

  const initializePayment = usePaystackPayment(config);

  const handleCheckout = () => {
    if (!user) {
      setIsCartOpen(false);
      onOpenAuth();
      return;
    }
    
    setCheckoutLoading(true);
    initializePayment({
      onSuccess: () => {
        setCheckoutLoading(false);
        const productNames = items.map(i => `${i.quantity}x ${i.product.name}`).join(', ');
        const message = encodeURIComponent(`I just paid ₦${totalPrice.toLocaleString()} for ${productNames}. My email is ${user.email}`);
        clearCart();
        window.location.href = `https://wa.me/2349135670770?text=${message}`;
      },
      onClose: () => {
        setCheckoutLoading(false);
      }
    });
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.05)] z-[101] flex flex-col border-l border-[#eaeaea]"
          >
            <div className="flex items-center justify-between p-[24px] border-b border-[#eaeaea]">
              <h2 className="text-[18px] font-[800] text-brand-blue flex items-center gap-2">
                <ShoppingBag size={20} /> Your Cart <span className="text-[#94a3b8] font-[600]">({totalItems})</span>
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-[8px] hover:bg-[#f8fafc] text-[#94a3b8] hover:text-brand-blue rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-[24px] flex flex-col gap-[24px]">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-[#94a3b8] gap-4">
                  <ShoppingBag size={48} className="opacity-50" />
                  <p className="text-[14px]">Your cart is empty.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-[16px] px-[24px] py-[12px] bg-brand-blue text-white rounded-[6px] font-[600] text-[14px] hover:opacity-90 transition-opacity"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.product.id} className="flex gap-[16px] border-b border-[#eaeaea] pb-[16px] last:border-0">
                    <div className="w-[80px] h-[80px] rounded-[8px] bg-[#f8fafc] flex-shrink-0 overflow-hidden border border-[#eaeaea]">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="font-[700] text-[14px] text-brand-blue line-clamp-1">{item.product.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#94a3b8] hover:text-[#ef4444] transition-colors p-1"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <div className="text-[14px] font-[800] text-brand-blue">
                        ₦{item.product.price.toLocaleString()}
                      </div>
                      
                      <div className="flex items-center justify-between mt-[8px]">
                        <div className="flex items-center border border-[#eaeaea] rounded-[6px] bg-[#f8fafc]">
                          <button 
                            className="p-[6px] text-[#64748b] hover:text-brand-blue hover:bg-[#f1f5f9] transition-colors rounded-l-[5px]"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-[32px] text-center font-[600] text-[12px] text-[#111]">{item.quantity}</span>
                          <button 
                            className="p-[6px] text-[#64748b] hover:text-brand-blue hover:bg-[#f1f5f9] transition-colors rounded-r-[5px]"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="font-[800] text-[14px] text-[#111]">
                          ₦{(item.product.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-[24px] border-t border-[#eaeaea] bg-white">
                <div className="flex justify-between items-center mb-[8px] text-[16px] font-[800] text-[#111]">
                  <span>Subtotal</span>
                  <span className="text-brand-blue">₦{totalPrice.toLocaleString()}</span>
                </div>
                <p className="text-[12px] text-[#64748b] mb-[24px]">Delivery and taxes calculated at checkout.</p>
                
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full bg-brand-blue text-white py-[14px] rounded-[6px] font-[600] text-[14px] flex justify-center items-center gap-[8px] hover:opacity-90 transition-opacity disabled:opacity-70"
                >
                  {checkoutLoading ? "Processing..." : user ? "Pay securely via Paystack" : "Login to Checkout"}
                  {!checkoutLoading && <ArrowRight size={16} />}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
