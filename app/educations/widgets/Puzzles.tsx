"use client";

import DialogTrigger from "@/components/ui/dialogs/PuzzleDialog";
import { useState } from "react";
import { IoPlayOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";

export default function Puzzles() {
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  return (
    <div className="w-full mt-8">
      <DialogTrigger show={isShowDialog}/>
      <div className="w-full mt-8">
        <h1 className="font-bold text-black text-2xl">پازل‌های شطرنج</h1>
        <h3 className="mt-2 text-slate-600 text-lg font-[400]">
          مهارت‌های تاکتیکی خود را با حل پازل‌های متنوع تقویت کنید
        </h3>
        <div className="flex items-start justify-start grow-[2] flex-wrap gap-8 mt-5">
          <PuzzlesContainer />
          <PuzzlesContainer />
          <PuzzlesContainer />
          <PuzzlesContainer />
        </div>
      </div>
    </div>
  );
}

function PuzzlesContainer() {
  return (
    <div className="shadow-xl rounded-lg border-[1px] border-slate-200 w-[550px]">
      <div className="p-3 relativeitems-start w-full h-[180px]  bg-[#0000004a] rounded-tl-lg rounded-tr-lg">
        <section className=" flex flex-row justify-between ">
          <div className="bg-blue-600 rounded-full text-white px-3 text-sm flex items-center justify-center">
            آسان
          </div>
          <div className="bg-slate-900 text-sm rounded-sm py-2 px-3 text-white flex items-center gap-x-2">
            ۱۴۰۰
          </div>
        </section>
      </div>
      <div className="w-full p-3">
        <h1 className=" text-black font-bold text-xl">مات در دو حرکت</h1>
        <div className="flex items-center text-md mt-2 text-slate-700 justify-between">
          <div className="flex items-center gap-x-2">
            <IoEyeOutline size={18} />
            ۱۲۰۰۰ حل شده
          </div>
          <div className="flex items-center gap-x-2">
            {["ترکیب", "مات"].map((v, _i) => {
              return (
                <div
                  key={_i}
                  className="rounded-lg p-2 text-sm text-black font-bold bg-slate-200"
                >
                  {v}
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-[100%] mt-5 flex items-center gap-x-3">
          <button className="transition-colors duration-100 hover:bg-slate-800 gap-x-2 cursor-pointer w-[100%] py-3 text-white bg-slate-950 rounded-lg flex items-center justify-center">
            <IoPlayOutline size={20} />
            حل پازل
          </button>
          <button className="cursor-pointer transition-colors duration-100 hover:bg-slate-200 p-3 rounded-lg border-[1px] border-slate-200 text-center text-black">
            <IoShareSocialOutline size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
