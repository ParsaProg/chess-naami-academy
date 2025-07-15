"use client";
import { RiVideoOnAiLine } from "react-icons/ri";
import { IoBookOutline } from "react-icons/io5";
import { FcPuzzle } from "react-icons/fc";

interface TabSelectType {
  selectedTapIndex: number;
  setSelectedTapIndex: (value: number) => void;
}

export default function TabSelect({
  selectedTapIndex,
  setSelectedTapIndex,
}: TabSelectType) {
  return (
    <div className="w-full flex shadow-lg bg-slate-100 items-center justify-between rounded-lg p-2 font-bold text-black text-xl gap-x-5 text-center">
      <div
        onClick={() => {
          setSelectedTapIndex(0);
        }}
        className={`transition-all duration-200 ${
          selectedTapIndex === 0 ? "bg-slate-300" : "bg-transparent"
        } w-full rounded-md flex items-center gap-x-2 p-3 justify-center cursor-pointer`}
      >
        <RiVideoOnAiLine size={20} />
        ویدیو‌های آموزشی
      </div>
      <div
        onClick={() => {
          setSelectedTapIndex(1);
        }}
        className={`transition-all duration-200 w-full ${
          selectedTapIndex === 1 ? "bg-slate-300" : "bg-transparent"
        } rounded-md flex items-center gap-x-2 p-3 justify-center cursor-pointer`}
      >
        <IoBookOutline size={20} />
        کتاب‌های رایگان
      </div>
      <div
        onClick={() => {
          setSelectedTapIndex(2);
        }}
        className={`transition-all duration-200 w-full ${
          selectedTapIndex === 2 ? "bg-slate-300" : "bg-transparent"
        } rounded-md flex items-center gap-x-2 p-3 justify-center cursor-pointer`}
      >
        <FcPuzzle size={20} />
        پازل‌ها
      </div>
    </div>
  );
}
