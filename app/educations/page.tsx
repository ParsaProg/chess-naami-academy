"use client";
import { useState } from "react";
import TabSelect from "./widgets/TabSelect";
import Videos from "./widgets/Videos";
import Books from "./widgets/Books";
import Puzzles from "./widgets/Puzzles";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export default function EducationPage() {
  const [selectedTapIndex, setSelectedTapIndex] = useState<number>(0);

  return (
    <div className="flex flex-col w-[90%] mt-[50px] mx-auto">
      <TabSelect
        selectedTapIndex={selectedTapIndex}
        setSelectedTapIndex={setSelectedTapIndex}
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
