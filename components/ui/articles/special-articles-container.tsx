import "../../../styles/top-containers.css";
import { CiCalendar } from "react-icons/ci";
import { TiStopwatch } from "react-icons/ti";
import { LuEye } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";

export default function SpecialArticleContainer({
  imageTitle,
  title,
  cats,
  desc,
  publishDate,
  time,
  views,
  likes,
}: {
  imageTitle: string;
  title: string;
  cats: Array<string>;
  desc: string;
  publishDate: string;
  time: string;
  views: string;
  likes: string;
}) {
  return (
    <div className="cursor-pointer relative w-full h-[600px] rounded-lg bg-white border-[1px] border-slate-200 container-counter">
      <div className="absolute z-[50] bg-gradient-to-b from-[#3e3e3e24] to-[#5a5959b6] top-0 right-0 h-[500px] w-full"></div>
      <div
        style={{
          backgroundImage: `url(${imageTitle})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="flex flex-col items-start justify-between relative rounded-tl-lg rounded-tr-lg h-[500px] "
      >
        <div className="z-[99] m-5 flex flex-col w-auto items-start rounded-full text-white bg-orange-600 font-bold py-2 px-5 right-5 top-5">
          ویژه
        </div>
        <section className="m-5 flex flex-col gap-y-3 z-[99]">
          <section className="flex items-center gap-x-3">
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
          <div className="text-white font-bold text-xl">
            {title}
          </div>
        </section>
      </div>
      <div className="m-5 z-[999]">
        <h1 className="font-[500] text-lg text-slate-900 z-[999]">
          {desc}
        </h1>
        <section className="flex items-center justify-between mt-3">
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
  );
}
