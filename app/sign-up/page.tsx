"use client";

import "../../styles/loaderSpinner.css";
import Swal from "sweetalert2";
import {
  FaFacebookF,
  FaPhone,
  FaTelegramPlane,
  FaYoutube,
} from "react-icons/fa";
import "../../styles/top-containers.css";
import { IoLogoInstagram } from "react-icons/io";
import { BsStopwatch } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import emailjs from "emailjs-com";
import { useState } from "react";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [info, setInfo] = useState("");
  const [message, setMessage] = useState("");
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    emailjs
      .send(
        "service_nlwn8p9",
        "template_fjushj8",
        {
          name: name,
          time: `
          شماره تماس: ${phoneNumber}
          کشور + شهر: ${country} + ${city} 
          توضیحات دربارۀ سطح شطرنجی: ${info}
          `,
          message: message,
          email: email,
        },
        "XrY58odnGPh0YXCFL" // اینو دقیق از داشبورد کپی کن
      )
      .then(
        () => {
          setName("");
          setEmail("");
          setCity("");
          setCountry("");
          setPhoneNumber("");
          setInfo("");
          setMessage("");
          Swal.fire({
            position: "top-start",
            icon: "success",
            title: "ثبت‌نام شما با موفقیت انجام شد",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            customClass: {
              container: "!z-[9999999999999]"
            }
          });
          setIsLoading(false);
        },
        (error) => {
          Swal.fire({
            position: "top-start",
            icon: "error",
            title: "ثبت‌نام شما با مشکل مواجه شد",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
          setIsLoading(false);
          console.log(error);
        }
      );
  };

  return (
    <div className="contact-us links-containers w-[95%] max-w-[1400px] mt-[40px] md:mt-[60px] lg:mt-[80px] mx-auto flex flex-col lg:flex-row items-start px-4 sm:px-6 lg:px-8 gap-6 lg:gap-[50px]">
      {/* Contact Form - Now comes first on mobile */}
      <form
        onSubmit={sendEmail}
        className="container-counter border-[1px] border-slate-200 p-5 rounded-xl w-full"
      >
        <h1 className="text-black font-bold text-xl sm:text-2xl">
          فرم تماس با ما
        </h1>
        <div className="mt-4 sm:mt-6">
          <h3 className="text-black font-[400] text-base sm:text-lg">
            نام و نام خانوادگی
          </h3>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            name="name"
            type="text"
            className="border-[1px] border-slate-300 rounded-lg p-3 text-base sm:text-lg w-full mt-2 outline-none"
            placeholder="نام و نام خانوادگی خود را وارد کنید"
          />
        </div>
        <div className="mt-5">
          <h3 className="text-black font-[400] text-base sm:text-lg">ایمیل</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            type="email"
            name="email"
            className="border-[1px] border-slate-300 rounded-lg p-3 text-base sm:text-lg w-full mt-2 outline-none"
            placeholder="ایمیل خود را وارد کنید"
          />
        </div>
        <div className="mt-5">
          <h3 className="text-black font-[400] text-base sm:text-lg">
            شماره تماس
          </h3>
          <input
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            autoComplete="phoneNumber"
            type="text"
            className="border-[1px] border-slate-300 rounded-lg p-3 text-base sm:text-lg w-full mt-2 outline-none"
            placeholder="شماره تماس خود را وارد کنید"
          />
        </div>
        <div className="mt-3 flex items-center gap-x-5">
          <div className="flex flex-col w-full">
            <h3 className="text-black font-[400] text-base sm:text-lg">کشور</h3>
            <input
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              autoComplete="country"
              type="text"
              className="border-[1px] border-slate-300 rounded-lg p-3 text-base sm:text-lg w-full mt-2 outline-none"
              placeholder="کشور را وارد کنید"
            />
          </div>
          <div className="w-full flex flex-col">
            <h3 className="text-black font-[400] text-base sm:text-lg">شهر</h3>
            <input
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              autoComplete="city"
              type="text"
              className="border-[1px] border-slate-300 rounded-lg p-3 text-base sm:text-lg w-full mt-2 outline-none"
              placeholder="شهر را وارد کنید"
            />
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-black font-[400] text-base sm:text-lg">
            توضیح <strong className="text-[#F09F0A] font-bold">کوتاه</strong>{" "}
            دربارۀ سطح شطرنجتون
          </h3>
          <textarea
            required
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            autoComplete="info"
            style={{ resize: "none" }}
            maxLength={100}
            className="border-[1px] border-slate-300 rounded-lg p-3 text-base sm:text-lg w-full mt-2 outline-none h-[80px]"
            placeholder="توضیح سطح را بنویسید"
          />
        </div>
        <div className="mt-5">
          <h3 className="text-black font-[400] text-base sm:text-lg">پیام</h3>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete="message"
            name="message"
            maxLength={500}
            className="border-[1px] border-slate-300 rounded-lg p-3 text-base sm:text-lg w-full mt-2 outline-none h-[150px] sm:h-[200px]"
            placeholder="پیام خود را بنویسید"
          />
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="flex items-center justify-center h-[50px] disabled:bg-slate-500 disabled:cursor-not-allowed disabled:border-slate-400 text-center w-full p-2 sm:p-3 rounded-lg outline-none cursor-pointer transition-all duration-200 hover:bg-[#f37209] mt-3 bg-[#F39F09] text-white text-base sm:text-lg"
        >
          {isLoading ? <span className="loader"></span> : "ارسال پیام"}
        </button>
      </form>

      {/* Contact Info - Now stacks below form on mobile */}
      <div className="flex flex-col w-full gap-6">
        <section className="container-counter border-[1px] bg-[#F9FAFC] border-slate-200 p-5 rounded-xl w-full">
          <h1 className="text-black font-bold text-xl sm:text-2xl">
            اطلاعات تماس
          </h1>

          <div className="flex items-start mt-4 sm:mt-6 gap-3">
            <div className="flex items-center justify-center rounded-full min-w-[45px] sm:min-w-[55px] h-[45px] sm:h-[55px] bg-[#F9F3C3] text-[#F09F0A]">
              <FaLocationDot className="text-lg sm:text-xl" />
            </div>
            <div className="flex flex-col items-start gap-y-1">
              <h1 className="font-bold text-black text-lg sm:text-xl">آدرس</h1>
              <h4 className="font-[400] text-slate-600 text-sm sm:text-lg">
                تهران پونک بلوار عدل خیابان کمالی آموزشگاه شطرنج استاد نعامی
              </h4>
            </div>
          </div>

          <div className="flex items-start mt-4 sm:mt-6 gap-3">
            <div className="flex items-center justify-center rounded-full min-w-[45px] sm:min-w-[55px] h-[45px] sm:h-[55px] bg-[#F9F3C3] text-[#F09F0A]">
              <FaPhone className="text-lg sm:text-xl" />
            </div>
            <div className="flex flex-col items-start gap-y-1">
              <h1 className="font-bold text-black text-lg sm:text-xl">
                تلفن تماس
              </h1>
              <h4 className="font-[400] text-slate-600 text-sm sm:text-lg">
                ۰۹۳۳۴۰۱۳۰۰۶
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
              <h1 className="font-bold text-black text-lg sm:text-xl">
                ساعات کاری
              </h1>
              <h4 className="font-[400] text-slate-600 text-sm sm:text-lg">
                شنبه تا پنجشنبه ۹ صبح تا ۸ شب
              </h4>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="container-counter border-[1px] bg-[#F9FAFC] border-slate-200 p-5 rounded-xl w-full">
          <h1 className="text-black font-bold text-xl sm:text-2xl">
            شبکه‌های اجتماعی
          </h1>
          <section className="flex items-center justify-center sm:justify-start gap-3 mt-4 sm:mt-5">
            <a
              href="#"
              className="bg-[#2462E6] rounded-full p-2 sm:p-3 text-white"
            >
              <FaFacebookF className="text-lg sm:text-xl" />
            </a>
            <a
              href="#"
              className="bg-[#DA2879] rounded-full p-2 sm:p-3 text-white"
            >
              <IoLogoInstagram className="text-lg sm:text-xl" />
            </a>
            <a
              href="#"
              className="bg-[#5CA5F9] rounded-full p-2 sm:p-3 text-white"
            >
              <FaTelegramPlane className="text-lg sm:text-xl" />
            </a>
            <a
              href="#"
              className="bg-[#DA2622] rounded-full p-2 sm:p-3 text-white"
            >
              <FaYoutube className="text-lg sm:text-xl" />
            </a>
          </section>
        </section>
      </div>
    </div>
  );
}
