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
          📝 عنوان مقاله (سئو شده): کلاس شطرنج کودکان در غرب تهران | حضوری و
          آنلاین با آموزش حرفه‌ای و امکانات ویژه ✅ ساختار مقاله: با سئو و تجربه
          کاربری (UX Writing) طراحی شده: مقدمه: چرا شطرنج برای کودکان اهمیت
          دارد؟ شطرنج فقط یک بازی نیست؛ یک ابزار قدرتمند برای رشد ذهنی، تقویت
          تمرکز و تصمیم‌گیری در کودکان است. بسیاری از والدین غرب تهران از جمله
          ساکنان مرزداران، جنت‌آباد، شهران، باغ فیض، سعادت‌آباد، صادقیه و مخبری
          به دنبال کلاس شطرنج مناسب برای فرزندانشان هستند. اما چگونه یک آموزشگاه
          معتبر و تخصصی را انتخاب کنیم؟ 🧠 مزایای شطرنج برای کودکان چیست؟ تقویت
          تمرکز و دقت بالا افزایش هوش منطقی و قدرت حل مسئله افزایش اعتماد به‌نفس
          در تصمیم‌گیری تقویت صبر و برنامه‌ریزی آشنایی با رقابت سالم 🎓 چرا
          کلاس‌های شطرنج از سنین پایین توصیه می‌شوند؟ تحقیقات نشان داده که
          کودکانی که از ۵ تا ۷ سالگی وارد کلاس شطرنج می‌شوند، در دروس مدرسه نیز
          عملکرد بهتری دارند. شطرنج با فعال‌سازی هر دو نیمکره مغز، درک ریاضی،
          حافظه تصویری و حتی مهارت‌های اجتماعی را افزایش می‌دهد. 🏫 کلاس شطرنج
          حضوری یا آنلاین؟ مزایا و تفاوت‌ها نوع کلاس مزایا حضوری تعامل با مربی،
          بازی‌های فیزیکی، تمرکز بالا آنلاین انعطاف زمانی، دسترسی راحت از هر
          نقطه، بدون نیاز به رفت‌وآمد در آموزشگاه شطرنج ما، هر دو مدل را با
          کیفیت بالا ارائه می‌دهیم. والدین می‌توانند بسته به شرایط خانواده، کلاس
          مناسب را انتخاب کنند. ⭐ چرا آموزشگاه ما یکی از بهترین‌ها در غرب تهران
          است؟ ما با تجربه بالا در آموزش شطرنج کودکان، یکی از تخصصی‌ترین مراکز
          آموزش شطرنج در مناطق زیر هستیم: کلاس شطرنج کودکان در مرزداران آموزش
          شطرنج جنت‌آباد (مرکزی، جنوبی و شمالی) کلاس شطرنج سعادت‌آباد، شهران،
          باغ فیض، صادقیه، مخبری کلاس آنلاین شطرنج برای کودکان سراسر تهران 💼
          امکانات ویژه آموزشگاه: سالن تمرین رایگان برگزاری مسابقات حضوری و
          آنلاین رایگان اعزام شاگردان به مسابقات فدراسیون، استانی و کشوری آموزش
          توسط مربیان فدراسیونی مجرب با تجربه‌ی کار تخصصی با کودکان کلاس‌های
          خصوصی، گروهی و آنلاین برای سنین مختلف 💸 هزینه کلاس‌های شطرنج در تهران
          چقدر است؟ هزینه کلاس‌های ما بسیار مقرون‌به‌صرفه و مطابق با نرخ مصوب
          فدراسیون است. کلاس‌ها به صورت: خصوصی (حضوری/آنلاین) گروهی (با ظرفیت
          محدود) و آزمون‌محور (برای شرکت در مسابقات رسمی) برگزار می‌شود. برای
          اطلاع دقیق از هزینه‌ها با ما تماس بگیرید. 📞 چگونه ثبت‌نام کنیم؟ برای
          ثبت‌نام در کلاس‌های شطرنج حضوری یا آنلاین در مناطق مرزداران، جنت‌آباد،
          شهران، باغ‌فیض، سعادت‌آباد و صادقیه کافیست با ما تماس بگیرید یا فرم
          ثبت‌نام آنلاین را در سایت پر کنید. ✨ نتیجه‌گیری: شطرنج یک
          سرمایه‌گذاری بلندمدت برای ذهن کودک شماست. اگر به دنبال بهترین آموزشگاه
          شطرنج کودکان در غرب تهران هستید، ما با امکانات حرفه‌ای، مربیان متخصص،
          و مسیر پیشرفت واقعی برای فرزندتان آماده‌ایم.
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
