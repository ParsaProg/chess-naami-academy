"use client";
import { useState } from "react";
import TabSelect from "./widgets/TabSelect";

export default function EducationPage() {
  const [selectedTapIndex, setSelectedTapIndex] = useState<number>(0);
 
  return (
    <div className="flex flex-col w-[90%] mt-[50px] mx-auto">
      <TabSelect selectedTapIndex={selectedTapIndex} setSelectedTapIndex={setSelectedTapIndex}/>
    </div>
  );
}
