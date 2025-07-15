"use client";
import { useState } from "react";
import TabSelect from "./widgets/TabSelect";
import Videos from "./widgets/Videos";
import Books from "./widgets/Books";
import Puzzles from "./widgets/Puzzles";
import { AnimatePresence } from "framer-motion";

export default function EducationPage() {
  const [selectedTapIndex, setSelectedTapIndex] = useState<number>(0);

  return (
    <div className="flex flex-col w-[90%] mt-[50px] mx-auto">
      <TabSelect
        selectedTapIndex={selectedTapIndex}
        setSelectedTapIndex={setSelectedTapIndex}
      />
      <AnimatePresence>
        {selectedTapIndex === 0 ? (
          <Videos />
        ) : selectedTapIndex === 1 ? (
          <Books />
        ) : (
          <Puzzles />
        )}
      </AnimatePresence>
    </div>
  );
}
