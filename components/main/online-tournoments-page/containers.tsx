"use client"

import OnlineTournoments from "@/interfaces/online-tournoments";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { LuUsers } from "react-icons/lu";
import { MdOpenInNew } from "react-icons/md";
import "./live-button.css";
import { useEffect, useState } from "react";

export default function Container({
  title,
  status,
  startTime,
  endTime,
  description,
  participants,
  ratingCategory,
  minRating,
  maxRating,
  lichessUrl,
}: OnlineTournoments) {
  const [currentTime, setCurrentTime] = useState(new Date());

  const getTimeUntilStart = (startTime: Date) => {
    const diff = startTime.getTime() - currentTime.getTime();
    if (diff <= 0) return null;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours} ساعت و ${minutes} دقیقه`;
    }
    return `${minutes} دقیقه`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };
  return (
    <div className="w-full p-5 flex flex-col gap-y-3 rounded-lg border-[1px] border-slate-300">
      <div className="flex items-center justify-between w-full">
        <h1 className="font-[600] text-lg">{title}</h1>
        <div
          className={`${
            status === "live" && "live-in text-white"
          } rounded-full px-2 py-1 text-sm border-[1px] border-slate-300`}
        >
          {status === "finished"
            ? "تمام شده"
            : status === "live"
            ? "در حال برگزاری ..."
            : `شروع در ${formatTime(startTime)}`}
        </div>
      </div>
      <h3 className="text-slate-600 font-[600] text-md">
        {description}
      </h3>
      <div className="flex items-center gap-x-2 text-slate-600 font-[600] text-md">
        <HiOutlineCalendarDateRange size={18} />
        شروع: {formatTime(startTime)}
      </div>
      <div className="flex items-center gap-x-2 text-slate-600 font-[600] text-md">
        <LuUsers size={18} />
        شرکت کننده {participants} نفر
      </div>
      <div className="flex items-center gap-x-2 text-slate-600 font-[600] text-md">
        <div className={`rounded-full px-2 py-1 ${ratingCategory === "متوسط"? "bg-[#DBEAFE] text-blue-900": ratingCategory === "مبتدی"? "bg-[#0afcb356] text-green-900": ratingCategory === "آزاد"? "bg-[#0000000c] text-black": ratingCategory === "حرفه‌ای"? "bg-[#fc05633e] text-pink-900": "bg-[#DBEAFE] text-blue-900"} font-[400] text-sm`}>
          {ratingCategory}
        </div>
        {minRating}-{maxRating}
      </div>
      <a href={lichessUrl} target="_blank" className={`mt-3 cursor-pointer w-full ${status === "live"? "bg-black text-white": status === "finished"? "bg-transparent border-[1px] border-slate-400 text-black": "bg-gray-700 text-white"} flex items-center justify-center gap-x-2 text-center p-3 rounded-lg`}>
        {status === "live"? "ورود به مسابقه": status === "finished"? "مشاهده نتایج": "مشاهده در لیچس"}
        <MdOpenInNew size={18} />
      </a>
    </div>
  );
}
