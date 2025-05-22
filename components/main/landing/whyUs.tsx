import "../../../styles/top-containers.css";
import { FaUsers } from "react-icons/fa6";
import { MdCastForEducation } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { HiFire } from "react-icons/hi";
import { HiUsers } from "react-icons/hi";

export default function WhyUs({whyUsComponentRef}: any) {
  return (
   <div ref={whyUsComponentRef} className="links-containers w-[95%] max-w-[1400px] mt-[40px] md:mt-[60px] lg:mt-[80px] mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8">
  {/* Heading */}
  <h1  className="font-bold text-black text-2xl sm:text-3xl md:text-4xl text-center">
    چرا <strong className="text-[#F39F08]">آکادمی شطرنج </strong> ما؟
  </h1>

  {/* Description */}
  <p className="w-full md:w-[90%] lg:w-[800px] text-slate-700 font-bold text-base sm:text-lg text-center mt-3 sm:mt-4 md:mt-5">
    ما با ارایه‌ی خدمات آموزشی با کیفیت و محیطی حرفه‌ای بهترین تجربه‌ی
    یادگیری شطرنج را برای شما فراهم می‌کنیم.
  </p>

  {/* Features Grid */}
  <div className="mt-[30px] sm:mt-[50px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-[30px] w-full">
    {/* Feature 1 */}
    <div className="bg-white rounded-lg p-4 sm:p-5 container-counter flex flex-col items-start h-full">
      <div className="w-auto p-3 sm:p-4 rounded-full bg-[#FEF3C5] text-[#F6A009]">
        <FaUsers className="text-lg sm:text-xl" />
      </div>
      <h1 className="text-black text-lg sm:text-xl font-bold mt-2 sm:mt-3">مربیان حرفه‌ای</h1>
      <p className="text-slate-500 text-sm sm:text-base font-[500] mt-2 sm:mt-3">
        تیم مربیان ما متشکل از استادان بین‌المللی و مربیان با تجربه در سطح
        ملی و بین المللی است
      </p>
    </div>

    {/* Feature 2 */}
    <div className="bg-white rounded-lg p-4 sm:p-5 container-counter flex flex-col items-start h-full">
      <div className="w-auto p-3 sm:p-4 rounded-full bg-[#DDE8FE] text-[#3380F6]">
        <MdCastForEducation className="text-lg sm:text-xl" />
      </div>
      <h1 className="text-black text-lg sm:text-xl font-bold mt-2 sm:mt-3">
        برنامه‌ی آموزشی استاندارد
      </h1>
      <p className="text-slate-500 text-sm sm:text-base font-[500] mt-2 sm:mt-3">
        برنامه‌ی آموزشی ما مطابق استاندارد‌های جهانی و با توجه به نیاز‌های
        فردی هر دانش آموز طراحی شده اند
      </p>
    </div>

    {/* Feature 3 */}
    <div className="bg-white rounded-lg p-4 sm:p-5 container-counter flex flex-col items-start h-full">
      <div className="w-auto p-3 sm:p-4 rounded-full bg-[#DCFCE7] text-[#1CC65C]">
        <FaCalendar className="text-lg sm:text-xl" />
      </div>
      <h1 className="text-black text-lg sm:text-xl font-bold mt-2 sm:mt-3">زمان بندی منعطف</h1>
      <p className="text-slate-500 text-sm sm:text-base font-[500] mt-2 sm:mt-3">
        امکان انتخاب زمان کلاس‌ها متناسب با برنامه شخصی شما و برگزاری
        کلاس‌های آنلاین و حضوری
      </p>
    </div>

    {/* Feature 4 */}
    <div className="bg-white rounded-lg p-4 sm:p-5 container-counter flex flex-col items-start h-full">
      <div className="w-auto p-3 sm:p-4 rounded-full bg-[#F3E8FF] text-[#AA57F0]">
        <FaBookOpen className="text-lg sm:text-xl" />
      </div>
      <h1 className="text-black text-lg sm:text-xl font-bold mt-2 sm:mt-3">
        منابع آموزشی غنی
      </h1>
      <p className="text-slate-500 text-sm sm:text-base font-[500] mt-2 sm:mt-3">
        دسترسی به کتابخانه دیجیتال، ویدیو‌های آموزشی، تحلیل بازی‌های حرفه‌ای
        و نرم‌افزار های تخصصی شطرنج
      </p>
    </div>

    {/* Feature 5 */}
    <div className="bg-white rounded-lg p-4 sm:p-5 container-counter flex flex-col items-start h-full">
      <div className="w-auto p-3 sm:p-4 rounded-full bg-[#FFE1DF] text-[#ED443E]">
        <HiFire className="text-lg sm:text-xl" />
      </div>
      <h1 className="text-black text-lg sm:text-xl font-bold mt-2 sm:mt-3">برگزاری مسابقات</h1>
      <p className="text-slate-500 text-sm sm:text-base font-[500] mt-2 sm:mt-3">
        برگزاری منظم مسابقات داخلی و آماده‌سازی دانش‌آموزان برای شرکت در
        رقابت‌های ملی و بین المللی
      </p>
    </div>

    {/* Feature 6 */}
    <div className="bg-white rounded-lg p-4 sm:p-5 container-counter flex flex-col items-start h-full">
      <div className="w-auto p-3 sm:p-4 rounded-full bg-[#FEF9C1] text-[#EAB009]">
        <HiUsers className="text-lg sm:text-xl" />
      </div>
      <h1 className="text-black text-lg sm:text-xl font-bold mt-2 sm:mt-3">جلسات تمرین گروهی</h1>
      <p className="text-slate-500 text-sm sm:text-base font-[500] mt-2 sm:mt-3">
        امکان شرکت در جلسات تمرین گروهی و بازی با سایر دانش‌آموزان برای تقویت مهارت‌های عملی.
      </p>
    </div>
  </div>
</div>
  );
}
