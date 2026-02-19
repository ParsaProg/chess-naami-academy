"use client";

import DialogTrigger from "@/components/ui/dialogs/PuzzleDialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoPlayOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";

interface PuzzlesDataShcema {
  puzzleImage: string;
  level: string;
  rating: number;
  title: string;
  solved: number;
  cats: [];
  answers: [];
  correctAnswer: string;
}

interface PuzzlesDataShcemaContainer {
  puzzleImage: string;
  level: string;
  rating: number;
  title: string;
  solved: number;
  cats: [];
  answers: [];
  correctAnswer: string;
  setIsShowDialog: (value: boolean) => void;
  setPuzzleDialogData: (value: PuzzleDialogData) => void;
}

interface PuzzleDialogData {
  title: string;
  puzzleImage: string;
  answers: [];
  correctAnswer: string;
}

export default function Puzzles() {
  const [puzzleDialogData, setPuzzleDialogData] = useState<PuzzleDialogData>({
    title: "",
    puzzleImage: "",
    answers: [],
    correctAnswer: "",
  });
  const [puzzlesData, setPuzzlesData] = useState<PuzzlesDataShcema[]>([]);
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);

  useEffect(() => {
    const puzzlesDataItems = localStorage.getItem("puzzlesDataEducation");
    const parsedPuzzles = puzzlesDataItems ? JSON.parse(puzzlesDataItems) : [];
    setPuzzlesData(parsedPuzzles);
    const getPuzzlesData = async () => {
      try {
        if (puzzlesData.length === 0) {
          const response = await fetch("/admin/api/puzzles", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
            },
          });
          if (!response.ok) throw new Error("Can't fetch data");
          const puzzleData = await response.json();
          if (puzzlesDataItems !== puzzleData) {
            setPuzzlesData(puzzleData);
            localStorage.setItem(
              "puzzlesDataEducation",
              JSON.stringify(puzzleData)
            );
          }
        }
      } catch (error: unknown) {
        console.log(error);
      }
    };
    getPuzzlesData();
  }, [puzzlesData.length]);
  return (
    <div className="w-full mt-8">
      <DialogTrigger
        show={isShowDialog}
        setIsShowDialog={setIsShowDialog}
        value={puzzleDialogData}
      />
      <div className="w-full mt-8">
        <h1 className="font-bold text-black text-2xl">پازل‌های شطرنج</h1>
        <h3 className="mt-2 text-slate-600 text-lg font-[400]">
          مهارت‌های تاکتیکی خود را با حل پازل‌های متنوع تقویت کنید
        </h3>
        <div className="flex items-start justify-start grow-[2] flex-wrap gap-8 mt-5">
          {Array.isArray(puzzlesData) &&
            puzzlesData.length > 0 &&
            puzzlesData.map((val, _i) => {
              return (
                <PuzzlesContainer
                  title={val.title}
                  level={val.level}
                  rating={val.rating}
                  answers={val.answers}
                  cats={val.cats}
                  correctAnswer={val.correctAnswer}
                  puzzleImage={val.puzzleImage}
                  solved={val.solved}
                  setIsShowDialog={setIsShowDialog}
                  setPuzzleDialogData={setPuzzleDialogData}
                  key={_i}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

function PuzzlesContainer({
  puzzleImage,
  title,
  level,
  rating,
  solved,
  cats,
  answers,
  correctAnswer,
  setIsShowDialog,
  setPuzzleDialogData,
}: PuzzlesDataShcemaContainer) {
  return (
    <div className="shadow-xl rounded-lg border-[1px] border-slate-200 w-[360px]">
      <div className="p-3 relative items-start w-full h-[300px] bg-[#0000004a] rounded-tl-lg rounded-tr-lg">
        <Image
          width={800}
          height={800}
          unoptimized
          alt="آموزش شطرنج, شطرنج ایران, باشگاه شطرنج ایران, شطرنج تهران, شطرنج مرزداران, شطرنج آنلاین, ویدیو آموزشی شطرنجو, پازل شطرنج ایران, پازل شطرنج , (پازل شطرنج)"
          src={puzzleImage}
          className="opacity-[0.8] z-10 absolute top-0 right-0 w-full h-[300px]"
        ></Image>
        <section className=" flex flex-row justify-between ">
          <div className="z-20 bg-blue-600 rounded-full text-white px-3 text-sm flex items-center justify-center">
            {level === "easy" ? "آسان" : level === "medium" ? "متوسط" : "سخت"}
          </div>
          <div className="z-20 bg-slate-900 text-sm rounded-sm py-2 px-3 text-white flex items-center gap-x-2">
            {rating}
          </div>
        </section>
      </div>
      <div className="w-full p-3">
        <h1 className=" text-black font-bold text-xl">{title}</h1>
        <div className="flex items-center text-md mt-2 text-slate-700 justify-between">
          <div className="flex items-center gap-x-2">
            <IoEyeOutline size={18} />
            {solved} حل شده
          </div>
          <div className="flex items-center gap-x-2">
            {cats.map((v, _i) => {
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
          <button
            onClick={() => {
              setIsShowDialog(true);
              setPuzzleDialogData({
                title: title,
                puzzleImage: puzzleImage,
                answers: answers,
                correctAnswer: correctAnswer,
              });
            }}
            className="transition-colors duration-100 hover:bg-slate-800 gap-x-2 cursor-pointer w-[100%] py-3 text-white bg-slate-950 rounded-lg flex items-center justify-center"
          >
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
