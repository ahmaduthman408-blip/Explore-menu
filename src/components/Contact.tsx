import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useState, FormEvent } from "react";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    const subject = encodeURIComponent(`New Contact Message from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    
    setTimeout(() => {
      window.location.href = `mailto:uthmanahmad378@gmail.com?subject=${subject}&body=${body}`;
      setStatus("sent");
    }, 800);
  };

  return (
    <section id="contact" className="py-[80px] bg-[#f8fafc] text-[#111] relative border-t border-[#eaeaea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-[40px] relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-[40px]">
          <h2 className="text-[36px] font-[800] mb-[16px] text-brand-blue">Get In Touch</h2>
          <p className="text-[16px] text-[#64748b]">
            Have questions about a fragrance or need help with a large order? Our luxury concierge team is here to assist you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-[40px]">
          {/* Contact Info */}
          <div className="lg:col-span-1 flex flex-col gap-[32px]">
            <div className="flex items-start gap-[16px]">
              <div className="w-[48px] h-[48px] bg-brand-orange/10 rounded-full text-brand-orange flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="font-[700] text-[16px] mb-[4px] text-brand-blue">Call / WhatsApp</h4>
                <p className="text-[#555] font-[500]">0913 567 0770</p>
                <p className="text-[#94a3b8] text-[12px] mt-[4px]">Mon-Sat, 9am - 8pm</p>
              </div>
            </div>

            <div className="flex items-start gap-[16px]">
              <div className="w-[48px] h-[48px] bg-brand-orange/10 rounded-full text-brand-orange flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-[700] text-[16px] mb-[4px] text-brand-blue">Email Us</h4>
                <p className="text-[#555] font-[500]">uthmanahmad378@gmail.com</p>
                <p className="text-[#94a3b8] text-[12px] mt-[4px]">Online support 24/7</p>
              </div>
            </div>

            <div className="flex items-start gap-[16px]">
              <div className="w-[48px] h-[48px] bg-brand-orange/10 rounded-full text-brand-orange flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-[700] text-[16px] mb-[4px] text-brand-blue">Our Location</h4>
                <p className="text-[#555] font-[500]">Lagos, Nigeria</p>
                <p className="text-[#94a3b8] text-[12px] mt-[4px]">Nationwide Delivery Available</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white p-[30px] rounded-[12px] border border-[#eaeaea] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)]"
          >
            {status === "sent" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-[48px]">
                <div className="w-[64px] h-[64px] bg-[#25D366] rounded-full flex items-center justify-center mb-[16px] text-white">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-[24px] font-[800] mb-[8px] text-brand-blue">Message Sent!</h3>
                <p className="text-[#64748b]">We'll get back to you within 24 hours.</p>
                <button 
                  onClick={() => setStatus("idle")} 
                  className="mt-[24px] text-brand-blue font-[600] hover:text-brand-orange transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
                <div className="grid sm:grid-cols-2 gap-[20px]">
                  <div>
                    <label className="block text-[12px] font-[700] text-[#94a3b8] mb-[8px] uppercase tracking-wide">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                      className="w-full px-[16px] py-[12px] bg-[#f8fafc] border border-[#eaeaea] rounded-[6px] outline-none text-[#111] transition-all focus:border-brand-blue"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-[700] text-[#94a3b8] mb-[8px] uppercase tracking-wide">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                      className="w-full px-[16px] py-[12px] bg-[#f8fafc] border border-[#eaeaea] rounded-[6px] outline-none text-[#111] transition-all focus:border-brand-blue"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-[700] text-[#94a3b8] mb-[8px] uppercase tracking-wide">Message</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
                    className="w-full px-[16px] py-[12px] bg-[#f8fafc] border border-[#eaeaea] rounded-[6px] outline-none text-[#111] transition-all focus:border-brand-blue resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={status === "sending"}
                  className="self-end px-[24px] py-[12px] bg-brand-blue text-white font-[600] text-[14px] rounded-[6px] hover:opacity-90 transition-opacity flex items-center gap-[8px] disabled:opacity-70"
                >
                  {status === "sending" ? "Sending..." : "Send Message"} 
                  {!status && <Send size={16} />}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
