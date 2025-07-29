import "../../../styles/top-containers.css";
import { CiCalendar } from "react-icons/ci";
import { TiStopwatch } from "react-icons/ti";
import { LuEye } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SpecialArticleContainer({
  imageTitle,
  title,
  cats,
  desc,
  publishDate,
  time,
  views,
  likes,
  isSpecial,
}: {
  imageTitle: string;
  title: string;
  cats: Array<string>;
  desc: string;
  publishDate: string;
  time: string;
  views: string;
  likes: string;
  isSpecial?: boolean;
}) {
  const [isLoad, setIsLoad] = useState<boolean>();
  return (
    <Link className="w-full" href={`/articles/${title}`}>
      <div className="cursor-pointer relative w-full h-auto rounded-lg bg-white border-[1px] border-slate-200 container-counter">
        <div className="rounded-tl-lg rounded-tr-lg absolute z-[50] bg-gradient-to-b from-[#3e3e3e24] to-[#5a5959b6] top-0 right-0 h-[500px] w-full"></div>
        <div className="flex flex-col items-start justify-between relative rounded-tl-lg rounded-tr-lg h-[500px] overflow-hidden">
          <Image
            width={800}
            height={800}
            src={imageTitle}
            decoding="async"
            onLoad={() => setIsLoad(true)}
            draggable={false}
            alt="special-article-image"
            unoptimized
            className={`absolute z-10 rounded-tl-lg rounded-tr-lg size-full object-cover rounded-[inherit] border bg-muted/40 transition-all duration-[1000ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[opacity,filter,transform]
          ${
            isLoad
              ? "opacity-100 blur-0 scale-100"
              : "opacity-100 grayscale-100 blur-lg scale-[1.2]"
          }
        `}
          />
          {isSpecial ? (
            <div className="z-[99] m-5 flex flex-col w-auto items-start rounded-full text-white bg-orange-600 font-bold py-2 px-5 right-5 top-5">
              ویژه
            </div>
          ) : (
            <div></div>
          )}
          <section className="m-5 flex flex-col gap-y-3 z-[99]">
            <section className="flex items-center gap-3 flex-wrap">
              {cats.map((val, _i) => {
                return (
                  <div
                    key={_i}
                    className="border-[1px] border-slate-300 text-sm rounded-full text-white bg-gray-500 font-bold py-2 px-5 right-5 bottom-5"
                  >
                    {val}
                  </div>
                );
              })}
            </section>
            <div className="text-white font-bold text-xl">{title}</div>
          </section>
        </div>
        <div className="m-5 z-[999]">
          <h1 className="font-[500] text-lg text-slate-900 z-[999]">{desc}</h1>
          <section className="flex flex-row [@media(max-width:940px)]:items-start gap-y-3 [@media(max-width:940px)]:flex-col items-center justify-between mt-3">
            <div className="flex items-center gap-x-5">
              <div className="flex gap-x-1 items-center">
                <CiCalendar size={18} />
                {publishDate}
              </div>
              <div className="flex gap-x-1 items-center">
                <TiStopwatch size={18} />
                {time}
              </div>
            </div>
            <div className="flex items-center gap-x-5">
              <div className="flex gap-x-1 items-center">
                <LuEye size={18} />
                {views}
              </div>
              <div className="flex gap-x-1 items-center">
                <FiHeart size={18} />
                {likes}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Link>
  );
}
