import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";

export function WhatsAppFloat() {
  const phoneNumber = "2349135670770";
  const defaultMessage = encodeURIComponent("Hello, I'm interested in your perfumes");
  const link = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[30px] right-[30px] z-[200] bg-[#25D366] text-white px-[20px] py-[12px] rounded-[50px] font-[700] text-[14px] shadow-[0_8px_16px_rgba(37,211,102,0.3)] flex items-center justify-center gap-[10px] group transition-transform"
      whileHover={{ scale: 1.05 }}
      animate={{ y: [0, -5, 0] }}
      transition={{ 
        y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
        scale: { duration: 0.2 }
      }}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={20} />
      <span>Chat with Us</span>
    </motion.a>
  );
}
