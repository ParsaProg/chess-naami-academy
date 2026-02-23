"use client";

import { FiPhoneCall } from "react-icons/fi";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CallButton() {
  const [isShow, setIsShow] = useState<boolean>(false);
  useEffect(() => {
    const userDeviceOs = navigator.userAgent || navigator.vendor;
    if(/android/i.test(userDeviceOs) || /iPad|iPhone|iPod/.test(userDeviceOs)){
      setIsShow(true);
    }
    else{
      setIsShow(false);
    }
  }, []);
  if(!isShow) return null;
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
