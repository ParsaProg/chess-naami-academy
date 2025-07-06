import MainArticles from "@/interfaces/mainArticles";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { LuEye } from "react-icons/lu";
import { TiStopwatch } from "react-icons/ti";

export default function MainArticlesContainer({
  cats,
  titleImage,
  titleText,
  desc,
  publishDate,
  time,
  views,
  publisherName,
  publisherImage,
}: MainArticles) {
  const [isLoad, setIsLoad] = useState<boolean>(false);
  return (
    <Link className="w-full" href={`/articles/${titleText}`}>
      <div className="[@media(max-width:860px)]:pb-5 h-auto rounded-lg hover:shadow-xl transition-all duration-200 hover:shadow-slate-200 w-full mt-8 border-[1px] border-slate-300 flex [@media(max-width:860px)]:flex-col flex-row items-center gap-x-10">
        <section className="overflow-hidden [@media(max-width:860px)]:w-full w-[300px] [@media(max-width:860px)]:h-[50vw] h-[250px] rounded-tl-lg rounded-tr-lg [@media(max-width:860px)]:mb-5">
          <Image
            width={800}
            height={800}
            src={titleImage}
            decoding="async"
            onLoad={() => setIsLoad(true)}
            draggable={false}
            alt="special-article-image"
            className={`z-10 rounded-tl-lg rounded-tr-lg size-full object-cover rounded-[inherit] border bg-muted/40 transition-all duration-[1000ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[opacity,filter,transform]
          ${
            isLoad
              ? "opacity-100 blur-0 scale-100"
              : "opacity-100 grayscale-100 blur-lg scale-[1.2]"
          }
        `}
          />
        </section>
        <section className="flex items-start flex-col w-[95%]">
          <section className="flex gap-3 flex-wrap">
            {cats.map((val, _i) => (
              <div
                key={_i}
                className="py-2 px-3 bg-transparent border-[1px] rounded-lg border-slate-300"
              >
                {val}
              </div>
            ))}
          </section>
          <h1 className="font-bold text-black text-xl mt-5">{titleText}</h1>
          <p className="font-[500] text-black text-lg mt-3">{desc}</p>
          <div className="flex [@media(max-width:860px)]:flex-col flex-row justify-between mt-5 w-[95%]">
            <div className="flex items-center gap-x-3 [@media(max-width:860px)]:mb-5">
              <div
                style={{
                  backgroundImage: `url(${publisherImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "cenetr",
                  backgroundRepeat: "no-repeat",
                }}
                className="rounded-full border-[1px] border-slate-400 w-10 h-10 "
              ></div>
              <h2 className="font-[500] text-black text-lg">{publisherName}</h2>
            </div>
            <section className="flex items-center ">
              <div className="flex items-center gap-x-5">
                <div className="flex gap-x-1 items-center">
                  <CiCalendar size={18} />
                  {publishDate}
                </div>
                <div className="flex gap-x-1 items-center">
                  <TiStopwatch size={18} />
                  {time}
                </div>
                <div className="flex gap-x-1 items-center">
                  <LuEye size={18} />
                  {views}
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </Link>
  );
}
