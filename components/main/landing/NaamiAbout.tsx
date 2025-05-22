import Image from "next/image";
import "../../../styles/top-containers.css";
import NaamiImage from "../../../public/assets/images/mr-naami.png";

export default function NaamiAbout() {
  return (
    <div className="w-[95%] border-b-[1px] border-b-slate-300 pb-[20px] flex flex-col lg:flex-row items-center justify-center gap-x-4 lg:gap-x-[50px] max-w-[1400px] mt-8 md:mt-12 lg:mt-16 mx-auto px-4 sm:px-6 lg:px-8">
      {/* Text Content - Comes first on mobile */}
      <div className="flex flex-col order-2 lg:order-1 w-full lg:w-1/2">
        <h1 className="font-[400] text-black text-xl text-justify">
          آموزشگاه شطرنج استاد نعامی از سال ۸۶ فعالیت مستمر در زمینه شطرنج به
          صورت تخصص محور کودکان و نوجوانان داشته و بازیکنان زیادی به این رشته
          علاقه مند کرده که باعث افتخار در این رشته تحصیلی شدند. با توجه به
          شرایط بوجود آمده از زمان کرونا تصمیم گرفته سیستم آموزش آنلاين به صورت
          کاملاا حرفه ای فعال کند از سن ۵ سال به بالا بتوانند از سراسر کشور و
          حتی کشور های مختلف از آموزشی هدف مند و آکادمی استفاده کنند و این آموزش
          در سه بخش مقدماتی و متوسطه و پیشرفته ارائه می‌شود.
        </h1>

        <div className="mt-4 sm:mt-5 space-y-3 sm:space-y-4">
          <li className="text-xl sm:text-xl lg:text-2xl font-bold text-[#F69B0D]">
            مربی رسمی فدراسیون شطرنج
          </li>
          <li className="text-lg sm:text-xl lg:text-2xl font-bold text-[#F69B0D]">
            مسئول انجمن شطرنج کانون مفتح کانون مرکزی تهران وکانون
          </li>
          <li className="text-xl sm:text-xl lg:text-2xl font-bold text-[#F69B0D]">
            منطقه یک آموزش پرورش
          </li>
        </div>
      </div>

      {/* Image - Comes first on desktop, but after text on mobile */}
      <div className="order-1 lg:order-2 w-full lg:w-1/2 mb-6 lg:mb-0">
        <Image
          src={NaamiImage.src}
          width={600}
          height={600}
          className="rounded-lg w-full h-auto object-cover"
          alt="نعامی, شطرنج نعامی, شطرنج پونک, درست اندیشیدن به فرزندانتان بیاموزید, تخصص ما کار با کودکان در کلاس های حضوری و آنلاین میباشد, آموزش ۵سال تا ۹۹ سال, (آموزش شطرنج مرزداران)"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        />
      </div>
    </div>
  );
}
