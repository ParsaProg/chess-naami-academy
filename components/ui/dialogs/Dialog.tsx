import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DialogTrigger({
  show,
  value,
}: {
  show: boolean;
  value: string;
}) {
  useEffect(() => {
    if (show) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      // Cleanup on unmount
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop with fade animation */}
          <motion.div
            className="fixed inset-0 bg-[#0000006b] z-[998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />

          {/* Dialog with scale and fade animation */}
          <motion.div
            className="shadow-xl rounded-lg flex items-center justify-center shadow-[#00000063] absolute z-[999] top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] bg-white text-black"
            initial={{ scale: 0.9, opacity: 0, y: "-48%" }}
            animate={{ scale: 1, opacity: 1, y: "0%" }}
            exit={{ scale: 0.9, opacity: 0, y: "-48%" }}
            transition={{ 
              type: "spring",
              damping: 20,
              stiffness: 300,
              duration: 0.3
            }}
          >
            <video className="rounded-lg" src={value} width={500} height={500} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}