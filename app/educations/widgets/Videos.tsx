"use client";

import { IoPlayOutline } from "react-icons/io5";
import { CiStopwatch } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { useEffect, useState } from "react";
import Image from "next/image";

interface VideoContainerSchema {
  level: string;
  time: string;
  title: string;
  views: string;
  publisher: string;
  videoLink: string;
  posterImage: string;
}

export default function Videos() {
  const [videosData, setVideosData] = useState<VideoContainerSchema[]>([]);
  useEffect(() => {
    const getVideosData = async () => {
      try {
        const response = await fetch("/admin/api/videos", {
          method: "GET",
          headers: {
            Authorization: `Bearer mysecrettoken123`,
          },
        });
        const videoData = await response.json();
        setVideosData(videoData);
        console.log(videosData);
      } catch (error: unknown) {
        console.log(error);
      }
    };
    getVideosData();
  }, []);
  return (
    <div className="w-full mt-8">
      <h1 className="font-bold text-black text-2xl">ویدیو‌های آموزشی</h1>
      <h3 className="mt-2 text-slate-600 text-lg font-[400]">
        آموزش‌های تصویری از اساتید برجسته شطرنج
      </h3>
      <div className="flex items-start justify-start grow-[2] flex-wrap gap-8 mt-5">
        {videosData.map((val, _i) => {
          return (
            <VideoContainer
              key={_i}
              level={val.level}
              time={val.time}
              title={val.title}
              views={val.views}
              publisher={val.publisher}
              videoLink={val.videoLink}
              posterImage={val.posterImage}
            />
          );
        })}
      </div>
    </div>
  );
}

function VideoContainer({
  level,
  time,
  title,
  views,
  publisher,
  videoLink,
  posterImage,
}: VideoContainerSchema) {
  return (
    <div className="shadow-xl rounded-lg border-[1px] border-slate-200 w-[550px]">
      <div className="overflow-hidden p-3 relative flex flex-col items-start justify-between w-full h-[180px] transition-colors hover:bg-[#00000091] bg-[#0000004a] rounded-tl-lg rounded-tr-lg">
        <Image
          alt="bg-video-images"
          width={800}
          height={800}
          src={posterImage}
          unoptimized
          decoding="async"
          draggable={false}
        />
        <div className="bg-blue-600 rounded-full text-white py-1 px-3 text-sm">
          {level}
        </div>
        <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] p-4 rounded-full bg-white text-black cursor-pointer">
          <IoPlayOutline size={25} />
        </div>
        <div className="bg-slate-900 rounded-sm py-2 px-3 text-white flex items-center gap-x-2">
          <CiStopwatch size={20} />
          {time}
        </div>
      </div>
      <div className="w-full p-3">
        <h1 className=" text-black font-bold text-xl">{title}</h1>
        <div className="flex items-center text-md mt-2 text-slate-700 justify-between">
          <div className="flex items-center gap-x-2">
            <IoEyeOutline size={18} />
            {views} بازدید
          </div>
          <p className="font-[400]">مدرس: {publisher}</p>
        </div>
        <div className="w-[100%] mt-2 flex items-center gap-x-3">
          <button className="transition-colors duration-100 hover:bg-slate-800 gap-x-2 cursor-pointer w-[100%] py-3 text-white bg-slate-950 rounded-lg flex items-center justify-center">
            <IoPlayOutline size={20} />
            مشاهدۀ ویدیو
          </button>
          <button className="cursor-pointer transition-colors duration-100 hover:bg-slate-200 p-3 rounded-lg border-[1px] border-slate-200 text-center text-black">
            <FiHeart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
