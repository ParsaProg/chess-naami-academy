import TestimonialsSection from "@/components/ui/TestimonialsSection";
import { FaStar } from "react-icons/fa";

export default function StudentComments() {
  return (
    <div className="py-12 md:py-[80px] text-white w-full mt-10 md:mt-[60px] lg:mt-[80px] mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1A1B1D] to-[#2C3D4F]">
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center">
        نظرات <strong className="text-[#F39F08]">دانش آموزان</strong> ما
      </h1>

      <p className="w-full md:w-[90%] lg:w-[800px] text-slate-300 font-medium text-base sm:text-lg text-center mt-3 sm:mt-4 md:mt-5">
        ما با ارایه‌ی خدمات آموزشی با کیفیت و محیطی حرفه‌ای بهترین تجربه‌ی
        یادگیری شطرنج را برای شما فراهم می‌کنیم.
      </p>

      {/* Grid Container */}
      <TestimonialsSection />
    </div>
  );
}
