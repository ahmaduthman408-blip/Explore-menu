import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Tag } from "lucide-react";

export function ExitPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // If mouse leaves the top of the window, show popup once
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed bottom-[20px] left-[20px] z-[200] max-w-[240px] bg-white border border-brand-gold p-[12px] rounded-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        >
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-[#94a3b8] hover:text-brand-blue"
          >
            <X size={14} />
          </button>
          
          <h4 className="font-serif text-[13px] font-[700] text-brand-blue mb-[4px] pr-[16px]">Wait! Special Offer</h4>
          <p className="text-[11px] text-[#64748b]">
            Get 10% off your first order with code: <strong className="text-brand-orange">EXPLORE10</strong>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
