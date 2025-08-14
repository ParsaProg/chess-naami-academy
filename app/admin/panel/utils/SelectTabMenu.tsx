import { MdOutlineArticle } from "react-icons/md";
import { TfiCup } from "react-icons/tfi";
import { MdOndemandVideo } from "react-icons/md";
import { MdOutlineMenuBook } from "react-icons/md";
import { IoExtensionPuzzleOutline } from "react-icons/io5";

export default function SelectTabMenu({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: number;
  setSelectedTab: (value: number) => void;
}) {
  return (
    <div className="gap-y-2 py-5 border-l-[1px] border-l-slate-300 w-[300px] flex flex-col items-start px-[30px]">
      <div
        onClick={() => {
          setSelectedTab(0);
        }}
        className={`flex items-center gap-x-2 font-bold text-xl cursor-pointer rounded-lg transition-all duration-200 w-full px-3 py-3 select-none ${
          selectedTab === 0
            ? "bg-[#6363C6] text-white"
            : "text-black"
        }`}
      >
        <MdOutlineArticle size={20} />
        مقالات
      </div>
      <div
        onClick={() => {
          setSelectedTab(1);
        }}
        className={`flex items-center gap-x-2 font-bold text-xl cursor-pointer rounded-lg transition-all duration-200 w-full px-3 py-3 select-none ${
          selectedTab === 1
            ? "bg-[#6363C6] text-white"
            : "text-black"
        }`}
      >
        <TfiCup size={20} />
        مسابقات آنلاین
      </div>
      <div
        onClick={() => {
          setSelectedTab(2);
        }}
        className={`flex items-center gap-x-2 font-bold text-xl cursor-pointer rounded-lg transition-all duration-200 w-full px-3 py-3 select-none ${
          selectedTab === 2
            ? "bg-[#6363C6] text-white "
            : "text-black"
        }`}
      >
        <MdOndemandVideo size={20} />
        ویدیو‌های آموزشی
      </div>
      <div
        onClick={() => {
          setSelectedTab(3);
        }}
        className={`flex items-center gap-x-2 font-bold text-xl cursor-pointer rounded-lg transition-all duration-200 w-full px-3 py-3 select-none ${
          selectedTab === 3
            ? "bg-[#6363C6] text-white "
            : "text-black"
        }`}
      >
        <MdOutlineMenuBook size={20} />
        کتابخانه
      </div>
      <div
        onClick={() => {
          setSelectedTab(4);
        }}
        className={`flex items-center gap-x-2 font-bold text-xl cursor-pointer rounded-lg transition-all duration-200 w-full px-3 py-3 select-none ${
          selectedTab === 4
            ? "bg-[#6363C6] text-white "
            : "bg-white text-black"
        }`}
      >
        <IoExtensionPuzzleOutline size={20} />
        پازل‌های شطرنجی
      </div>
    </div>
  );
}
