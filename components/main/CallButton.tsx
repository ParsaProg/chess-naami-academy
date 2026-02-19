"use client";

import { FiPhoneCall } from "react-icons/fi";
import { motion } from "framer-motion";

export default function CallButton() {
  return (
    <motion.a
    href={"tel:+989334013006"}
      whileTap={{ scale: 0.95 }}
      className="font-bold gap-x-2 z-99999 flex items-center rounded-full p-3 text-white bg-blue-600 animate-pulse fixed right-5 bottom-5"
    >
      <FiPhoneCall size={18} />
      تماس
    </motion.a>
  );
}
