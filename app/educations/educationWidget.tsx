"use client";

import { useEffect, useState } from "react";
import TabSelect from "./widgets/TabSelect";
import Videos from "./widgets/Videos";
import Books from "./widgets/Books";
import Puzzles from "./widgets/Puzzles";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
export default function EducationPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedTapIndex, setSelectedTapIndex] = useState<number>(0);

  const updateSearchParams = (param: string, value: string) => {
    const params = new URLSearchParams(searchParams!);
    params.set(param, value);
    
    // Update URL without refresh
    window.history.pushState({}, "", `${pathname}?${params.toString()}`);
    
    // Optional: Manually trigger a state update if needed
    // (e.g., if components depend on search params)
    window.dispatchEvent(new Event("popstate"));
  };

  useEffect(() => {
    const tabParam = searchParams?.get("tab");
    if (tabParam === undefined || tabParam === null || tabParam === "videos") {
      setSelectedTapIndex(0);
    } else if (tabParam === "books") {
      setSelectedTapIndex(1);
    } else if (tabParam === "puzzles") {
      setSelectedTapIndex(2);
    }
  }, [selectedTapIndex]);

  return (
    <div className="flex flex-col w-[90%] mt-[50px] mx-auto">
      <TabSelect
        selectedTapIndex={selectedTapIndex}
        setSelectedTapIndex={setSelectedTapIndex}
        updateSearchParams={updateSearchParams}
      />
      <AnimatePresence mode="wait">
        {selectedTapIndex === 0 && (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.2, ease: "easeIn" },
            }}
            transition={{ duration: 0.2, ease: "easeIn" }}
          >
            <Videos />
          </motion.div>
        )}
        {selectedTapIndex === 1 && (
          <motion.div
            key="books"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,

              transition: { duration: 0.2, ease: "easeIn" },
            }}
            transition={{ duration: 0.2, ease: "easeIn" }}
          >
            <Books />
          </motion.div>
        )}
        {selectedTapIndex === 2 && (
          <motion.div
            key="puzzles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,

              transition: { duration: 0.2, ease: "easeIn" },
            }}
            transition={{ duration: 0.2, ease: "easeIn" }}
          >
            <Puzzles />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
