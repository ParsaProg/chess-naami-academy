import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModernVideoPlayer from "../VideoPlayer";
import { SlClose } from "react-icons/sl";

interface videoContainerData {
  title: string;
  videoLink: string;
}

export default function DialogTrigger({
  show,
  value,
  setIsShowDialog,
}: {
  show: boolean;
  value: videoContainerData;
  setIsShowDialog: (value: boolean) => void;
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
            onClick={() => {
              setIsShowDialog(false);
            }}
            className="fixed inset-0 bg-[#0000006b] z-[998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />

          {/* Dialog with scale and fade animation */}
          <motion.div
            className="flex-col gap-3 shadow-xl rounded-lg flex items-start justify-center shadow-[#00000063] fixed z-[999] top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] bg-white text-black lg:w-auto w-[95%]"
            initial={{ scale: 0.9, opacity: 0, y: "-48%" }}
            animate={{ scale: 1, opacity: 1, y: "0%" }}
            exit={{ scale: 0.9, opacity: 0, y: "-48%" }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
              duration: 0.3,
            }}
          >
            <div className="flex items-center gap-x-3 mt-5 mr-5 mb-2">
              <SlClose
                onClick={() => setIsShowDialog(false)}
                size={30}
                className="cursor-pointer"
              />
              <h1 className="font-bold text-xl">{value.title}</h1>
            </div>
            <ModernVideoPlayer src={value.videoLink} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
