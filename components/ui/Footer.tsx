import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <div className="w-full bg-[#111828] text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Academy */}
        <section className="flex flex-col">
          <h1 className="font-bold text-xl sm:text-2xl">دربارۀ آکادمی</h1>
          <p className="font-[400] text-sm sm:text-base text-slate-400 mt-3 leading-relaxed max-w-[300px]">
            آکادمی شطرنج ما با هدف آموزش اصولی و حرفه‌ای شطرنج به علاقه‌مندان در
            تمامی سنین و سطوح تاسیس شده است.
          </p>
          <div className="flex items-center gap-3 mt-4 text-slate-300">
            <a href="#" className="hover:text-[#EC971A] transition-colors">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="hover:text-[#EC971A] transition-colors">
              <IoLogoInstagram size={18} />
            </a>
            <a href="#" className="hover:text-[#EC971A] transition-colors">
              <FaTelegramPlane size={18} />
            </a>
            <a href="#" className="hover:text-[#EC971A] transition-colors">
              <FaYoutube size={18} />
            </a>
          </div>
        </section>

        {/* Quick Links */}
        <section className="flex flex-col">
          <h1 className="font-bold text-xl sm:text-2xl">لینک‌های سریع</h1>
          <ul className="mt-3 space-y-2">
            {[
              "صفحه اصلی",
              "دوره‌ها",
              "فروشگاه",
              "ویژگی‌ها",
              "نظرات",
              "دربارۀ‌ما",
            ].map((item) => (
              <li key={item}>
                <a
                  className="font-[400] text-sm sm:text-base text-slate-400 hover:text-[#EC971A] transition-colors block"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Courses */}
        <section className="flex flex-col">
          <h1 className="font-bold text-xl sm:text-2xl">دوره‌های آموزشی</h1>
          <ul className="mt-3 space-y-2">
            {[
              "دوره‌های آموزشی",
              "دورۀ مبتدی",
              "دورۀ متوسط",
              "دورۀ پیشرفته",
              "دورۀ کودکان",
              "آمادگی مسابقات",
              "کلاس‌های خصوصی",
            ].map((item) => (
              <li key={item}>
                <a
                  className="font-[400] text-sm sm:text-base text-slate-400 hover:text-[#EC971A] transition-colors block"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact Us */}
        <section className="flex flex-col">
          <h1 className="font-bold text-xl sm:text-2xl">تماس با ما</h1>
          <div className="mt-3 space-y-3">
            <div className="flex items-start gap-2">
              <FaLocationDot
                size={16}
                className="text-[#EC971A] mt-1 flex-shrink-0"
              />
              <p className="text-slate-400 text-sm sm:text-base">
                تهران پونک بلوار عدل خیابان کمالی آموزشگاه شطرنج استاد نعامی
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone size={16} className="text-[#EC971A] flex-shrink-0" />
              <p className="text-slate-400 text-sm sm:text-base">
                ۰۹۳۳۴۰۱۳۰۰۶
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MdEmail size={16} className="text-[#EC971A] flex-shrink-0" />
              <p className="text-slate-400 text-sm sm:text-base">
                infochessnaami@gmail.com
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
