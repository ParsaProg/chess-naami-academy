"use client";

import { MdOutlineArticle } from "react-icons/md";
import { TfiCup } from "react-icons/tfi";
import { MdOndemandVideo } from "react-icons/md";
import { MdOutlineMenuBook } from "react-icons/md";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { SlMenu } from "react-icons/sl";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import "./selectMenu.css";

export default function SelectTabMenu({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: number;
  setSelectedTab: (value: number) => void;
}) {
  const [isShowDialog, setIsShoowDialog] = useState<boolean>(false);
  return (
    <div className="gap-y-2 py-5 sm:border-b-[0px] sm:border-l-[1px] sm:border-l-slate-300 w-full sm:w-[500px] flex flex-col items-start px-[10px] sm:px-[30px] sm:h-[100vh]">
      <div className="relative sm:hidden visible">
        <div
          onClick={() => setIsShoowDialog(!isShowDialog)}
          className="p-3 border-[1.6px] border-slate-300 rounded-full flex items-center justify-center"
        >
          <SlMenu size={23} />
        </div>
        <AnimatePresence>
          {isShowDialog && (
            <motion.div
              initial={{ opacity: 0, top: -10, scale: 0.9 }}
              animate={{ opacity: 1, top: "60px", scale: 1 }}
              exit={{
                transition: { duration: 0.1, ease: "easeInOut" },
                opacity: 0,
                scale: 0.9,
                top: -10,
              }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              className="absolute bg-white top-[60px] w-[250px] right-[0] shadow-lg shadow-slate-500 rounded-lg border-[1px] border-slate-300 p-3"
            >
              <div
                onClick={() => {
                  setSelectedTab(0);
                }}
                className={`flex items-center gap-x-2 font-bold text-xl cursor-pointer rounded-lg transition-all duration-200 w-full px-3 py-3 select-none sm:justify-start justify-start ${
                  selectedTab === 0 ? "bg-[#6363C6] text-white" : "text-black"
                }`}
              >
                <MdOutlineArticle size={20} />
                مقالات
              </div>
              <div
                onClick={() => {
                  setSelectedTab(1);
                }}
                className={`flex items-center gap-x-2 font-bold text-xl cursor-pointer rounded-lg transition-all duration-200 w-full px-3 py-3 select-none sm:justify-start justify-start ${
                  selectedTab === 1 ? "bg-[#6363C6] text-white" : "text-black"
                }`}
              >
                <TfiCup size={20} />
                مسابقات آنلاین
              </div>
              <div
                onClick={() => {
                  setSelectedTab(2);
                }}
                className={`flex items-center gap-x-2 font-bold text-xl cursor-pointer rounded-lg transition-all duration-200 w-full px-3 py-3 select-none sm:justify-start justify-start ${
                  selectedTab === 2 ? "bg-[#6363C6] text-white " : "text-black"
                }`}
              >
                <MdOndemandVideo size={20} />
                ویدیو‌های آموزشی
              </div>
              <div
                onClick={() => {
                  setSelectedTab(3);
                }}
                className={`flex items-center gap-x-2 font-bold text-xl cursor-pointer rounded-lg transition-all duration-200 w-full px-3 py-3 select-none sm:justify-start justify-start ${
                  selectedTab === 3 ? "bg-[#6363C6] text-white " : "text-black"
                }`}
              >
                <MdOutlineMenuBook size={20} />
                کتابخانه
              </div>
              <div
                onClick={() => {
                  setSelectedTab(4);
                }}
                className={`flex items-center gap-x-2 font-bold text-xl cursor-pointer rounded-lg transition-all duration-200 w-full px-3 py-3 select-none sm:justify-start justify-start ${
                  selectedTab === 4
                    ? "bg-[#6363C6] text-white "
                    : "bg-white text-black"
                }`}
              >
                <IoExtensionPuzzleOutline size={20} />
                پازل‌های شطرنجی
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <section className="select-menu w-full h-[100vh]">
        <div
          onClick={() => {
            setSelectedTab(0);
          }}
          className={`flex items-center gap-x-2 font-bold text-xl cursor-pointer rounded-lg transition-all duration-200 w-full px-3 py-3 select-none sm:justify-start justify-start ${
            selectedTab === 0 ? "bg-[#6363C6] text-white" : "text-black"
          }`}
        >
          <MdOutlineArticle size={20} />
          مقالات
        </div>
        <div
          onClick={() => {
            setSelectedTab(1);
          }}
          className={`flex items-center gap-x-2 font-bold text-xl cursor-pointer rounded-lg transition-all duration-200 w-full px-3 py-3 select-none sm:justify-start justify-start ${
            selectedTab === 1 ? "bg-[#6363C6] text-white" : "text-black"
          }`}
        >
          <TfiCup size={20} />
          مسابقات آنلاین
        </div>
        <div
          onClick={() => {
            setSelectedTab(2);
          }}
          className={`flex items-center gap-x-2 font-bold text-xl cursor-pointer rounded-lg transition-all duration-200 w-full px-3 py-3 select-none sm:justify-start justify-start ${
            selectedTab === 2 ? "bg-[#6363C6] text-white " : "text-black"
          }`}
        >
          <MdOndemandVideo size={20} />
          ویدیو‌های آموزشی
        </div>
        <div
          onClick={() => {
            setSelectedTab(3);
          }}
          className={`flex items-center gap-x-2 font-bold text-xl cursor-pointer rounded-lg transition-all duration-200 w-full px-3 py-3 select-none sm:justify-start justify-start ${
            selectedTab === 3 ? "bg-[#6363C6] text-white " : "text-black"
          }`}
        >
          <MdOutlineMenuBook size={20} />
          کتابخانه
        </div>
        <div
          onClick={() => {
            setSelectedTab(4);
          }}
          className={`flex items-center gap-x-2 font-bold text-xl cursor-pointer rounded-lg transition-all duration-200 w-full px-3 py-3 select-none sm:justify-start justify-start ${
            selectedTab === 4
              ? "bg-[#6363C6] text-white "
              : "bg-white text-black"
          }`}
        >
          <IoExtensionPuzzleOutline size={20} />
          پازل‌های شطرنجی
        </div>
      </section>
    </div>
  );
}
