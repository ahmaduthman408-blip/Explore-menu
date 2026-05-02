import { useState, FormEvent } from "react";
import { X, Mail, Phone, Lock, User } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { motion, AnimatePresence } from "motion/react";

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: ""
  });
  
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill all required fields.");
      return;
    }

    if (!isLogin && !formData.fullName) {
      setError("Full name is required for registration.");
      return;
    }
    
    // Simulate API delay
    setTimeout(() => {
      login({
        fullName: isLogin ? "Guest User" : formData.fullName,
        email: formData.email,
        phone: formData.phone || "0000000000",
      });
      onClose();
    }, 500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative bg-white rounded-[12px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] w-full max-w-sm overflow-hidden z-[101] border border-[#eaeaea]"
        >
          <div className="p-[24px] border-b border-[#eaeaea] flex justify-between items-center bg-[#f8fafc]">
            <h2 className="text-[18px] font-[800] text-brand-blue uppercase tracking-wide">
              {isLogin ? "Welcome Back" : "Join Us"}
            </h2>
            <button onClick={onClose} className="p-[8px] hover:bg-[#eaeaea] rounded-full transition-colors text-[#94a3b8] hover:text-brand-blue">
              <X size={18} />
            </button>
          </div>

          <div className="p-[24px]">
            {error && (
              <div className="bg-[#fef2f2] border border-[#fee2e2] text-[#ef4444] p-[10px] rounded-[6px] text-[12px] font-[600] mb-[16px]">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
              {!isLogin && (
                <div>
                  <label className="block text-[11px] font-[700] text-[#94a3b8] mb-[6px] uppercase tracking-wide">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#94a3b8]" size={16} />
                    <input 
                      type="text" 
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                      className="w-full pl-[36px] pr-[12px] py-[10px] border border-[#eaeaea] rounded-[6px] focus:border-brand-blue outline-none text-[14px] text-[#111] bg-white transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-[700] text-[#94a3b8] mb-[6px] uppercase tracking-wide">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#94a3b8]" size={16} />
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-[36px] pr-[12px] py-[10px] border border-[#eaeaea] rounded-[6px] focus:border-brand-blue outline-none text-[14px] text-[#111] bg-white transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-[11px] font-[700] text-[#94a3b8] mb-[6px] uppercase tracking-wide">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#94a3b8]" size={16} />
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-[36px] pr-[12px] py-[10px] border border-[#eaeaea] rounded-[6px] focus:border-brand-blue outline-none text-[14px] text-[#111] bg-white transition-colors"
                      placeholder="0913 567 0770"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-[700] text-[#94a3b8] mb-[6px] uppercase tracking-wide">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#94a3b8]" size={16} />
                  <input 
                    type="password" 
                    required
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="w-full pl-[36px] pr-[12px] py-[10px] border border-[#eaeaea] rounded-[6px] focus:border-brand-blue outline-none text-[14px] text-[#111] bg-white transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="mt-[8px] w-full bg-brand-blue text-white font-[600] text-[14px] py-[12px] rounded-[6px] hover:opacity-90 transition-opacity"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div className="mt-[24px] pt-[16px] border-t border-[#eaeaea] text-center">
              <p className="text-[#64748b] text-[12px]">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={() => { setIsLogin(!isLogin); setError(""); }}
                  className="text-brand-blue font-[700] hover:text-brand-orange hover:underline transition-colors"
                >
                  {isLogin ? "Sign Up" : "Log In"}
                </button>
              </p>
              {isLogin && (
                <button className="text-[11px] text-[#94a3b8] mt-[8px] hover:text-brand-blue underline">
                  Forgot Password?
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
