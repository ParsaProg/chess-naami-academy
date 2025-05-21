import "../../../styles/top-containers.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsStopwatch } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export default function ContactUs() {
  return (
   <div className="links-containers w-[95%] max-w-[1400px] mt-[40px] md:mt-[60px] lg:mt-[80px] mx-auto flex flex-col lg:flex-row items-start px-4 sm:px-6 lg:px-8 gap-6 lg:gap-[50px]">
  {/* Contact Form - Now comes first on mobile */}
  <section className="container-counter border-[1px] border-slate-200 p-5 rounded-xl w-full">
    <h1 className="text-black font-bold text-xl sm:text-2xl">فرم تماس</h1>
    <div className="mt-4 sm:mt-6">
      <h3 className="text-black font-[400] text-base sm:text-lg">نام و نام خانوادگی</h3>
      <input
        type="text"
        className="border-[1px] border-slate-300 rounded-lg p-2 sm:p-3 text-base sm:text-lg w-full mt-2 outline-none"
        placeholder="نام و نام خانوادگی خود را وارد کنید"
      />
    </div>
    <div className="mt-3">
      <h3 className="text-black font-[400] text-base sm:text-lg">ایمیل</h3>
      <input
        type="text"
        className="border-[1px] border-slate-300 rounded-lg p-2 sm:p-3 text-base sm:text-lg w-full mt-2 outline-none"
        placeholder="ایمیل خود را وارد کنید"
      />
    </div>
    <div className="mt-3">
      <h3 className="text-black font-[400] text-base sm:text-lg">شماره تماس</h3>
      <input
        type="text"
        className="border-[1px] border-slate-300 rounded-lg p-2 sm:p-3 text-base sm:text-lg w-full mt-2 outline-none"
        placeholder="شماره تماس خود را وارد کنید"
      />
    </div>
    <div className="mt-3">
      <h3 className="text-black font-[400] text-base sm:text-lg">پیام</h3>
      <textarea
        maxLength={500}
        className="border-[1px] border-slate-300 rounded-lg p-2 sm:p-3 text-base sm:text-lg w-full mt-2 outline-none h-[150px] sm:h-[200px]"
        placeholder="پیام خود را بنویسید"
      />
    </div>
    <button
      type="submit"
      className="text-center w-full p-2 sm:p-3 rounded-lg outline-none cursor-pointer transition-all duration-200 hover:bg-[#f37209] mt-3 bg-[#F39F09] text-white text-base sm:text-lg"
    >
      ارسال پیام
    </button>
  </section>

  {/* Contact Info - Now stacks below form on mobile */}
  <div className="flex flex-col w-full gap-6">
    <section className="container-counter border-[1px] bg-[#F9FAFC] border-slate-200 p-5 rounded-xl w-full">
      <h1 className="text-black font-bold text-xl sm:text-2xl">اطلاعات تماس</h1>
      
      <div className="flex items-start mt-4 sm:mt-6 gap-3">
        <div className="flex items-center justify-center rounded-full min-w-[45px] sm:min-w-[55px] h-[45px] sm:h-[55px] bg-[#F9F3C3] text-[#F09F0A]">
          <FaLocationDot className="text-lg sm:text-xl" />
        </div>
        <div className="flex flex-col items-start gap-y-1">
          <h1 className="font-bold text-black text-lg sm:text-xl">آدرس</h1>
          <h4 className="font-[400] text-slate-600 text-sm sm:text-lg">
            تهران، پونک، خیابان بهشتی، پلاک ۱۲۳ باشگاه شطرنج نعامی
          </h4>
        </div>
      </div>

      <div className="flex items-start mt-4 sm:mt-6 gap-3">
        <div className="flex items-center justify-center rounded-full min-w-[45px] sm:min-w-[55px] h-[45px] sm:h-[55px] bg-[#F9F3C3] text-[#F09F0A]">
          <FaPhone className="text-lg sm:text-xl" />
        </div>
        <div className="flex flex-col items-start gap-y-1">
          <h1 className="font-bold text-black text-lg sm:text-xl">تلفن تماس</h1>
          <h4 className="font-[400] text-slate-600 text-sm sm:text-lg">
            ۰۲۱-۸۸۷۷۶۶۵۵
          </h4>
          <h4 className="font-[400] text-slate-600 text-sm sm:text-lg">
            ۰۹۱۷۱۸۰۶۷۲۵
          </h4>
        </div>
      </div>

      <div className="flex items-start mt-4 sm:mt-6 gap-3">
        <div className="flex items-center justify-center rounded-full min-w-[45px] sm:min-w-[55px] h-[45px] sm:h-[55px] bg-[#F9F3C3] text-[#F09F0A]">
          <MdEmail className="text-lg sm:text-xl" />
        </div>
        <div className="flex flex-col items-start gap-y-1">
          <h1 className="font-bold text-black text-lg sm:text-xl">ایمیل</h1>
          <h4 className="font-[400] text-slate-600 text-sm sm:text-lg">
            infochessnaami@gmail.com
          </h4>
        </div>
      </div>

      <div className="flex items-start mt-4 sm:mt-6 gap-3">
        <div className="flex items-center justify-center rounded-full min-w-[45px] sm:min-w-[55px] h-[45px] sm:h-[55px] bg-[#F9F3C3] text-[#F09F0A]">
          <BsStopwatch className="text-lg sm:text-xl" />
        </div>
        <div className="flex flex-col items-start gap-y-1">
          <h1 className="font-bold text-black text-lg sm:text-xl">ساعات کاری</h1>
          <h4 className="font-[400] text-slate-600 text-sm sm:text-lg">
            شنبه تا چهارشنبه ۹ صبح تا ۸ شب
            <br />
            پنجشنبه ۹ صبح تا ۵ عصر
            <br />
            جمعه تعطیل
          </h4>
        </div>
      </div>
    </section>

    {/* Social Media Section */}
    <section className="container-counter border-[1px] bg-[#F9FAFC] border-slate-200 p-5 rounded-xl w-full">
      <h1 className="text-black font-bold text-xl sm:text-2xl">شبکه‌های اجتماعی</h1>
      <section className="flex items-center justify-center sm:justify-start gap-3 mt-4 sm:mt-5">
        <a href="#" className="bg-[#2462E6] rounded-full p-2 sm:p-3 text-white">
          <FaFacebookF className="text-lg sm:text-xl" />
        </a>
        <a href="#" className="bg-[#DA2879] rounded-full p-2 sm:p-3 text-white">
          <IoLogoInstagram className="text-lg sm:text-xl" />
        </a>
        <a href="#" className="bg-[#5CA5F9] rounded-full p-2 sm:p-3 text-white">
          <FaTelegramPlane className="text-lg sm:text-xl" />
        </a>
        <a href="#" className="bg-[#DA2622] rounded-full p-2 sm:p-3 text-white">
          <FaYoutube className="text-lg sm:text-xl" />
        </a>
      </section>
    </section>
  </div>
</div>
  );
}
