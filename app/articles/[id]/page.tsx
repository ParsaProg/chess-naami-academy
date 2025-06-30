"use client";

import SpecialArticleContainer from "@/components/ui/articles/special-articles-container";
import { CiCalendar } from "react-icons/ci";
import { FiHeart } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { LuHeart } from "react-icons/lu";
import { TiStopwatch } from "react-icons/ti";
import { FaRegComments } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

export default function MainArticlesDetailsPage() {
  const publisherImage =
    "https://avatars.githubusercontent.com/u/122119546?v=4";
  return (
    <div className="flex flex-col items-start w-[90%] mx-auto">
      <div className="mt-10 w-full">
        <SpecialArticleContainer
          imageTitle="https://images.squarespace-cdn.com/content/v1/653fb5d32fff802e836e2b03/1698826828450-M5MJEVGULQBV5W8LVGIH/boy-in-thinking-on-the-next-move-in-the-chess-game.jpg"
          title="آموزش کامل گشایش‌های شطرنج از مبتدی یا پیشرفته"
          cats={["استراتژی", "مهره‌ها"]}
          desc="یادگیری اصول بنیادی گشایش‌های شطرنج و تکنیک‌های پیشرفته برای بهبود بازی"
          publishDate="7 آذر 1403"
          time="12 دقیقه"
          views="1054"
          likes="50"
          isSpecial={false}
        />
      </div>
      <div className="flex [@media(max-width:940px)]:flex-col [@media(max-width:940px)]:gap-y-5 [@media(max-width:940px)]:items-start items-center justify-between mt-8 w-full rounded-lg shadow-xl border-[1px] border-slate-300 p-[20px]">
        <section className="flex flex-row items-center gap-x-2">
          <div
            style={{
              backgroundImage: `url(${publisherImage})`,
              backgroundSize: "cover",
              backgroundPosition: "cenetr",
              backgroundRepeat: "no-repeat",
            }}
            className="rounded-full border-[1px] border-slate-400 w-14 h-14 "
          ></div>
          <div className="flex flex-col">
            <span className="text-lg font-[600] text-slate-900">
              ابراهیم نعامی
            </span>
            <span className="text-md text-slate-600">استاد شطرنج</span>
          </div>
        </section>
        <section className="flex flex-row [@media(max-width:940px)]:items-start gap-x-3  items-center">
          <div className="flex items-center gap-x-5">
            <div className="flex gap-x-1 items-center">
              <CiCalendar size={18} />
              {"1403/5/1"}
            </div>
            <div className="flex gap-x-1 items-center">
              <TiStopwatch size={18} />
              {"12 دقیقه"}
            </div>
          </div>
          <div className="flex items-center gap-x-5">
            <div className="flex gap-x-1 items-center">
              <LuEye size={18} />
              {"1054"}
            </div>
            <div className="flex gap-x-1 items-center">
              <FiHeart size={18} />
              {"50"}
            </div>
          </div>
        </section>
      </div>
      <div className="items-start mt-8 w-full rounded-lg shadow-xl border-[1px] border-slate-300 p-[20px]">
        <p>
          شطرنج یکی از قدیمی‌ترین و محبوب‌ترین بازی‌های ذهنی جهان است که هزاران
          سال است مردم را مجذوب خود کرده است. یادگیری اصول صحیح گشایش در شطرنج،
          اولین قدم برای تبدیل شدن به یک بازیکن ماهر محسوب می‌شود. ## اهمیت
          گشایش در شطرنج گشایش در شطرنج مرحله‌ای است که پایه و اساس کل بازی را
          تشکیل می‌دهد. در این مرحله، هدف اصلی توسعه سریع مهره‌ها، کنترل مرکز
          صفحه و ایمن کردن شاه است.
        </p>
        <div className="mt-5 border-r-4 border-r-[#FBBF24] rounded-lg bg-[#FFFBEB] px-8 py-[50px]">
          <h1 className="font-bold text-xl text-amber-950">نکته مهم:</h1>
          <h5 className="font-[400] text-amber-700 mt-5">
            برای تسلط بر مطالب این مقاله، حتماً تمرین عملی انجام دهید و با
            بازیکنان مختلف تجربه کسب کنید.
          </h5>
        </div>
      </div>
      <div className="[@media(max-width:792px)]:justify-center text-center flex items-center gap-5 mt-8 w-full rounded-lg shadow-xl border-[1px] border-slate-300 p-[20px] justify-between">
        <section className="flex items-center gap-x-5 [@media(max-width:792px)]:hidden">
          <button className="justify-center hover:bg-slate-100 transition-colors duration-150 cursor-pointer rounded-lg border-[1px] border-slate-300 p-3 flex items-center gap-x-2">
            <LuHeart size={20} />
            پسندیدن (153)
          </button>
          <button className="justify-center hover:bg-slate-100 transition-colors duration-150 cursor-pointer rounded-lg border-[1px] border-slate-300 p-3 flex items-center gap-x-2">
            <FaRegComments size={20} />
            نظرات (50)
          </button>
          <button className="justify-center hover:bg-slate-100 transition-colors duration-150 cursor-pointer rounded-lg border-[1px] border-slate-300 p-3 flex items-center gap-x-2">
            <IoShareSocialOutline size={20} />
            اشتراک گذاری
          </button>
        </section>
        <button className="[@media(max-width:792px)]:hidden justify-center hover:bg-white hover:text-black text-white bg-black transition-colors duration-150 cursor-pointer rounded-lg border-[1px] border-slate-300 p-3 flex items-center gap-x-2">
          <FaUser size={20} />
          دنبال کردن نویسنده
        </button>
        <section className="w-full m-auto justify-center grid grid-cols-2 gap-5 items-center gap-x-5 [@media(min-width:792px)]:hidden">
          <button className="justify-center hover:bg-slate-100 transition-colors duration-150 cursor-pointer rounded-lg border-[1px] border-slate-300 p-3 flex items-center gap-x-2">
            <LuHeart size={20} />
            پسندیدن (153)
          </button>
          <button className="justify-center hover:bg-slate-100 transition-colors duration-150 cursor-pointer rounded-lg border-[1px] border-slate-300 p-3 flex items-center gap-x-2">
            <FaRegComments size={20} />
            نظرات (50)
          </button>
          <button className="justify-center hover:bg-slate-100 transition-colors duration-150 cursor-pointer rounded-lg border-[1px] border-slate-300 p-3 flex items-center gap-x-2">
            <IoShareSocialOutline size={20} />
            اشتراک گذاری
          </button>
          <button className="justify-center hover:bg-white hover:text-black text-white bg-black transition-colors duration-150 cursor-pointer rounded-lg border-[1px] border-slate-300 p-3 flex items-center gap-x-2">
          <FaUser size={20} />
          دنبال کردن نویسنده
        </button>
        </section>
        
      </div>
    </div>
  );
}
