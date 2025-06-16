"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== prevPath) {
      setIsAnimating(true); // شروع انیمیشن خروج
    }
  }, [pathname, prevPath]);

  const handleExitComplete = () => {
    // وقتی انیمیشن خروج تموم شد، بچه جدید رو نشون بده
    setDisplayedChildren(children);
    setPrevPath(pathname);
    setIsAnimating(false);
    return isAnimating;
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      <motion.div
        key={prevPath}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{
          opacity: 0,
          y: -20,
          transition: {
            duration: 0.5,
            ease: [0.43, 0.13, 0.23, 0.96], // ease-out نرم و زیبا
          },
        }}
        transition={{
          duration: 0.5,
          ease: [0.43, 0.13, 0.23, 0.96], // ease-out نرم و زیبا
        }}
      >
        {displayedChildren}
      </motion.div>
    </AnimatePresence>
  );
}
