"use client";
import "../../../styles/top-containers.css";
import PersianCountUp from "@/lib/persianCountUpDigit";
import Link from "next/link";
import AutoSlideShow from "@/components/ui/slideShowImage";

interface ScrollFunctions {
  ContactUsComponentScroll?: () => void;
  whyUsComponentScroll?: () => void;
  CommentsComponentScroll: () => void;
}
export default function TopLandingSection({
  whyUsComponentScroll,
}: ScrollFunctions) {
  return (
    <div className="relative mt-[50px] md:mt-[100px] w-[95%] mx-auto">
      {/* Main content - flex column on mobile, row on larger screens */}
      <div className="w-full flex flex-col [@media(min-width:1500px)]:flex-row items-center justify-between lg:justify-evenly z-[20] gap-8 lg:gap-8">
        {/* Text content */}
        <div className="flex flex-col items-center [@media(min-width:1500px)]:items-start justify-center z-[20] px-4 lg:px-0 text-center lg:text-left">
          <h1 className="text-[#ea7908] text-4xl sm:text-5xl lg:text-6xl font-bold inline">
            هنر شطرنج
          </h1>{" "}
          <p className="inline mt-3 lg:mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold">
            را با ما بیاموزید
          </p>
          <p className="text-center mt-4 lg:mt-6 text-slate-900 text-lg sm:text-xl lg:text-2xl font-bold w-full lg:w-[500px] xl:w-[600px]">
            در آکادمی شطرنج ما از مبتدی تا پیشرفته، با بهترین مربیان مهارت
            شطرنجی خود را توسعه دهید و به سطح قهرمانی برسید
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={whyUsComponentScroll}
              className="w-full sm:w-[200px] lg:w-[320px] py-2 lg:py-3 rounded-lg bg-[#F39F08] text-white cursor-pointer text-lg lg:text-xl font-bold"
            >
              چرا ما را انتخاب کنید؟
            </button>
            <Link href={"/sign-up"} className="w-full sm:w-[320px]">
              <button className="w-full sm:w-[280px] lg:w-[320px] py-2 lg:py-3 rounded-lg border-[1px] border-slate-300 container-counter cursor-pointer text-lg lg:text-xl font-bold transition-all duration-200 hover:bg-[#F39F08] hover:text-white hover:border-transparent">
                تست استعدادیابی و مشاوره رایگان
              </button>
            </Link>
          </div>
        </div>

        <AutoSlideShow />
      </div>

      {/* Stats section - responsive grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 lg:gap-[50px] mt-[30px] md:mt-[50px] px-4 lg:px-0">
        <div className=" container-counter text-center bg-white rounded-xl p-3 ">
          <h1 className="text-[#ea7908] font-bold text-2xl md:text-3xl">
            <PersianCountUp num={12} duration={2} />+
          </h1>
          <p className="font-bold text-base md:text-xl">مربیان حرفه‌ای</p>
        </div>
        <div className=" container-counter text-center bg-white rounded-xl p-3  ">
          <h1 className="text-[#ea7908] font-bold text-2xl md:text-3xl">
            <PersianCountUp num={1300} duration={2} />+
          </h1>
          <p className="font-bold text-base md:text-xl">دانش‌آموز موفق</p>
        </div>
        <div className=" container-counter text-center  bg-white rounded-xl p-3  ">
          <h1 className="text-[#ea7908] font-bold text-2xl md:text-3xl">
            <PersianCountUp num={20} duration={2} />+
          </h1>
          <p className="font-bold text-base md:text-xl">دوره تخصصی</p>
        </div>
        <div className=" container-counter text-center  bg-white rounded-xl p-3  ">
          <h1 className="text-[#ea7908] font-bold text-2xl md:text-3xl">
            <PersianCountUp num={18} duration={2} />+
          </h1>
          <p className="font-bold text-base md:text-xl">سال تجربه</p>
        </div>
      </section>
    </div>
  );
}
