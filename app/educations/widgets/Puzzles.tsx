"use client";

import DialogTrigger from "@/components/ui/dialogs/PuzzleDialog";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { IoPlayOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";

interface PuzzlesDataSchema {
  _id?: string;
  puzzleImage: string;
  level: string;
  rating: number;
  title: string;
  solved: number;
  cats: string[];
  answers: string[];
  correctAnswer: string;
}

interface PuzzlesDataSchemaContainer extends PuzzlesDataSchema {
  setIsShowDialog: (value: boolean) => void;
  setPuzzleDialogData: (value: PuzzleDialogData) => void;
}

interface PuzzleDialogData {
  title: string;
  puzzleImage: string;
  answers: string[];
  correctAnswer: string;
}

interface ApiResponse {
  success: boolean;
  data: PuzzlesDataSchema[];
  message?: string;
}

export default function Puzzles() {
  const [puzzleDialogData, setPuzzleDialogData] = useState<PuzzleDialogData>({
    title: "",
    puzzleImage: "",
    answers: [],
    correctAnswer: "",
  });
  const [puzzlesData, setPuzzlesData] = useState<PuzzlesDataSchema[]>([]);
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPuzzlesData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // First check localStorage
      const cachedData = localStorage.getItem("puzzlesDataEducation");
      
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setPuzzlesData(parsedData);
        setIsLoading(false);
        
        // Still fetch in background to update cache
        fetchAndUpdateData();
      } else {
        // No cache, fetch directly
        await fetchAndUpdateData();
      }
    } catch (error) {
      console.error("Error loading puzzles:", error);
      setError("خطا در بارگذاری پازل‌ها");
      setIsLoading(false);
    }
  }, []);

  const fetchAndUpdateData = async () => {
    try {
      const token = process.env.NEXT_PUBLIC_API_SECRET_TOKEN;
      
      if (!token) {
        throw new Error("API token is missing");
      }

      const response = await fetch("/admin/api/puzzles", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("دسترسی غیرمجاز");
        } else if (response.status === 500) {
          throw new Error("خطای سرور");
        } else {
          throw new Error(`خطا: ${response.status}`);
        }
      }

      const result: ApiResponse = await response.json();
      
      // Check if response has data property (based on your API response structure)
      const puzzleData = result.data || result;
      
      if (Array.isArray(puzzleData) && puzzleData.length > 0) {
        setPuzzlesData(puzzleData);
        localStorage.setItem("puzzlesDataEducation", JSON.stringify(puzzleData));
      } else if (Array.isArray(puzzleData) && puzzleData.length === 0) {
        setPuzzlesData([]);
        localStorage.removeItem("puzzlesDataEducation");
      }
      
    } catch (error) {
      console.error("Error fetching from API:", error);
      setError(error instanceof Error ? error.message : "خطا در دریافت اطلاعات");
      
      // If we have cached data, keep using it
      const cachedData = localStorage.getItem("puzzlesDataEducation");
      if (cachedData) {
        setPuzzlesData(JSON.parse(cachedData));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPuzzlesData();
  }, [fetchPuzzlesData]); // Only run once on mount

  if (isLoading && puzzlesData.length === 0) {
    return (
      <div className="w-full mt-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">در حال بارگذاری پازل‌ها...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && puzzlesData.length === 0) {
    return (
      <div className="w-full mt-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => fetchPuzzlesData()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        
        {puzzlesData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">هنوز پازلی اضافه نشده است</p>
          </div>
        ) : (
          <div className="flex items-start justify-start grow-[2] flex-wrap gap-8 mt-5">
            {puzzlesData.map((val, index) => (
              <PuzzlesContainer
                key={val._id || index}
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
              />
            ))}
          </div>
        )}
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
}: PuzzlesDataSchemaContainer) {
  // Function to get level text in Persian
  const getLevelText = (level: string) => {
    switch (level) {
      case "easy":
        return "آسان";
      case "medium":
        return "متوسط";
      case "hard":
        return "سخت";
      default:
        return level;
    }
  };

  return (
    <div className="shadow-xl rounded-lg border-[1px] border-slate-200 w-[360px] bg-white">
      <div className="p-3 relative items-start w-full h-[300px] bg-[#0000004a] rounded-tl-lg rounded-tr-lg">
        <Image
          width={800}
          height={800}
          unoptimized
          alt={`پازل شطرنج: ${title}`}
          src={puzzleImage}
          className="opacity-[0.8] z-10 absolute top-0 right-0 w-full h-[300px] object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            e.currentTarget.src = "/images/placeholder-puzzle.jpg";
          }}
        />
        <section className="flex flex-row justify-between relative z-20">
          <div className="bg-blue-600 rounded-full text-white px-3 py-1 text-sm flex items-center justify-center">
            {getLevelText(level)}
          </div>
          <div className="bg-slate-900 text-sm rounded-sm py-2 px-3 text-white flex items-center gap-x-2">
            {rating} ★
          </div>
        </section>
      </div>
      
      <div className="w-full p-3">
        <h1 className="text-black font-bold text-xl line-clamp-2">{title}</h1>
        
        <div className="flex items-center text-md mt-2 text-slate-700 justify-between">
          <div className="flex items-center gap-x-2">
            <IoEyeOutline size={18} />
            <span>{solved} حل شده</span>
          </div>
          
          <div className="flex items-center gap-x-2 flex-wrap justify-end">
            {Array.isArray(cats) && cats.slice(0, 2).map((v, index) => (
              <div
                key={index}
                className="rounded-lg px-2 py-1 text-xs text-black font-bold bg-slate-200"
              >
                {v}
              </div>
            ))}
            {cats.length > 2 && (
              <div className="rounded-lg px-2 py-1 text-xs text-black font-bold bg-slate-200">
                +{cats.length - 2}
              </div>
            )}
          </div>
        </div>
        
        <div className="w-full mt-5 flex items-center gap-x-3">
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
            className="transition-colors duration-100 hover:bg-slate-800 gap-x-2 cursor-pointer flex-1 py-3 text-white bg-slate-950 rounded-lg flex items-center justify-center"
          >
            <IoPlayOutline size={20} />
            حل پازل
          </button>
          
          <button 
            className="cursor-pointer transition-colors duration-100 hover:bg-slate-200 p-3 rounded-lg border-[1px] border-slate-200 text-center text-black"
            onClick={() => {
              // Share functionality
              if (navigator.share) {
                navigator.share({
                  title: title,
                  text: `پازل شطرنج: ${title}`,
                  url: window.location.href,
                }).catch(console.error);
              } else {
                // Fallback: copy link
                navigator.clipboard.writeText(window.location.href);
                alert("لینک کپی شد");
              }
            }}
          >
            <IoShareSocialOutline size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}