import "../../../styles/top-containers.css";
import { IoExtensionPuzzleSharp } from "react-icons/io5";
import { IoCube } from "react-icons/io5";
import { FaChess } from "react-icons/fa";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import { FaBagShopping } from "react-icons/fa6";
import Link from "next/link";

export default function LinksContainers() {
  return (
    <div className="links-containers w-[95%] max-w-[1400px] mt-[40px] md:mt-[60px] lg:mt-[80px] mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <h1 className="font-bold text-black text-2xl sm:text-3xl md:text-4xl text-center">
        دوره‌های آموزشی و محتوا‌های{" "}
        <strong className="text-[#F39F08]">حرفه‌ای</strong>
      </h1>

      {/* Description */}
      <p className="w-full md:w-[90%] lg:w-[800px] text-slate-700 font-bold text-base sm:text-lg text-center mt-3 sm:mt-4 md:mt-5">
        دوره‌های ما برای تمامی سطوح از مبتدی تا پیشرفته طراحی شده‌اند. با مربیان
        محبوب و برنامه‌های آموزشی استاندارد، مسیر موفقیت خود را آسان کنید
      </p>

      {/* Cards Grid */}
      <section className="w-full mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-[30px] items-center justify-center">
        {/* Card 1 */}
        <div className="container-counter rounded-lg w-full max-w-[450px] h-auto  cursor-pointer mx-auto">
          <div className="flex items-center justify-center w-full h-[150px] sm:h-[200px] bg-[#F49E0B] rounded-tl-lg rounded-tr-lg text-white">
            <IoExtensionPuzzleSharp className="text-[60px] sm:text-[80px]" />
          </div>
          <Link href={"/online-classes"}>
            <div className="m-4 sm:m-5">
              <h1 className="font-bold text-black text-xl sm:text-2xl">
                کلاس آنلاین
              </h1>
              <p className="mt-2 sm:mt-3 text-base sm:text-lg font-[600] text-slate-600">
                دوره‌های آموزشی به صورت آنلاین و حضوری، خصوصی، مقدماتی و پیشرفته
                و سطح متوسط
              </p>
              <button className="cursor-pointer flex items-center gap-x-2 text-sm sm:text-base p-2 sm:p-3 rounded-lg border-[1px] border-slate-400 mt-2 sm:mt-3 hover:bg-slate-200 transition-all duration-200">
                ورود کنید
                <IoArrowUpCircleOutline className="text-[18px] sm:text-[20px] rotate-[-45deg]" />
              </button>
            </div>
          </Link>
        </div>

        {/* Card 2 */}
        <div className="container-counter rounded-lg w-full max-w-[450px] h-auto  cursor-pointer mx-auto">
          <div className="flex items-center justify-center w-full h-[150px] sm:h-[200px] bg-[#2563EA] rounded-tl-lg rounded-tr-lg text-white">
            <IoCube className="text-[60px] sm:text-[80px]" />
          </div>
          <div className="m-4 sm:m-5">
            <h1 className="font-bold text-black text-xl sm:text-2xl">
              مسابقات انلاین
            </h1>
            <p className="mt-2 sm:mt-3 text-base sm:text-lg font-[600] text-slate-600">
              مقالات علمی برای سطوح مقدماتی ، متوسط و پیشرفته، بسیار غنی برای
              آموختن
            </p>
            <button className="cursor-pointer flex items-center gap-x-2 text-sm sm:text-base p-2 sm:p-3 rounded-lg border-[1px] border-slate-400 mt-2 sm:mt-3 hover:bg-slate-200 transition-all duration-200">
              ورود کنید
              <IoArrowUpCircleOutline className="text-[18px] sm:text-[20px] rotate-[-45deg]" />
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="container-counter rounded-lg w-full max-w-[450px] h-auto  cursor-pointer mx-auto">
          <div className="flex items-center justify-center w-full h-[150px] sm:h-[200px] bg-[#9334EA] rounded-tl-lg rounded-tr-lg text-white">
            <FaChess className="text-[60px] sm:text-[80px]" />
          </div>
          <div className="m-4 sm:m-5">
            <h1 className="font-bold text-black text-xl sm:text-2xl">
              پازل ها و مطالب آموزشی
            </h1>
            <p className="mt-2 sm:mt-3 text-base sm:text-lg font-[600] text-slate-600">
              ویدیو‌های آموزشی برای سطوح مقدماتی ، متوسط و پیشرفته، بسیار غنی
              برای آموختن
            </p>
            <button className="cursor-pointer flex items-center gap-x-2 text-sm sm:text-base p-2 sm:p-3 rounded-lg border-[1px] border-slate-400 mt-2 sm:mt-3 hover:bg-slate-200 transition-all duration-200">
              ورود کنید
              <IoArrowUpCircleOutline className="text-[18px] sm:text-[20px] rotate-[-45deg]" />
            </button>
          </div>
        </div>

        {/* Card 4 */}
        <div className="container-counter rounded-lg w-full max-w-[450px] h-auto  cursor-pointer mx-auto">
          <div className="flex items-center justify-center w-full h-[150px] sm:h-[200px] bg-[#e2237f] rounded-tl-lg rounded-tr-lg text-white">
            <FaBagShopping className="text-[60px] sm:text-[80px]" />
          </div>
          <div className="m-4 sm:m-5">
            <h1 className="font-bold text-black text-xl sm:text-2xl">
              فروشگاه
            </h1>
            <p className="mt-2 sm:mt-3 text-base sm:text-lg font-[600] text-slate-600">
              فروشگاه عوامل مختلف شطرنج از جمله کتاب و جزوات با مقرون به صرفه
              ترین هزینه
            </p>
            <button className="cursor-pointer flex items-center gap-x-2 text-sm sm:text-base p-2 sm:p-3 rounded-lg border-[1px] border-slate-400 mt-2 sm:mt-3 hover:bg-slate-200 transition-all duration-200">
              ورود کنید
              <IoArrowUpCircleOutline className="text-[18px] sm:text-[20px] rotate-[-45deg]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
