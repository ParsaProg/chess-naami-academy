import Image from "next/image";
import "../../../styles/top-containers.css";
import NaamiImage from "../../../public/assets/images/mr-naami.png";

export default function NaamiAbout() {
  return (
    <div className="flex items-center justify-center gap-x-[50px] links-containers w-[95%] max-w-[1400px] mt-[40px] md:mt-[60px] lg:mt-[80px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col">
        <h1 className="font-[500] text-black text-xl text-justify">
          آموزشگاه شطرنج استاد نعامی از سال ۸۶ فعالیت مستمر در زمینه شطرنج به
          صورت تخصص محور کودکان و نوجوانان داشته و بازیکنان زیادی به این رشته
          علاقه مند کرده که باعث افتخار در این رشته تحصیلی شدند. با توجه به
          شرایط بوجود آمده از زمان کرونا تصمیم گرفته سیستم آموزش آنلاين به صورت
          کاملاا حرفه ای فعال کند از سن ۵ سال به بالا بتوانند از سراسر کشور و
          حتی کشور های مختلف از آموزشی هدف مند و آکادمی استفاده کنند و این آموزش
          در سه بخش مقدماتی و متوسطه و پیشرفته ارائه می‌شود.
        </h1>
        <li className="mt-5 text-2xl font-bold text-[#F69B0D]">
          مربی رسمی فدراسیون شطرنج
        </li>
        <li className="mt-5 text-2xl font-bold  text-[#F69B0D]">
          مسئول انجمن شطرنج کانون مفتح کانون مرکزی تهران وکانون
        </li>
        <li className="mt-5 text-2xl font-bold text-[#F69B0D]">
          منطقه یک آموزش پرورش
        </li>
      </div>
      <Image
        src={NaamiImage.src}
        width={600}
        height={600}
        className="rounded-lg container-count"
        alt="نعامی, شطرنج نعامی, شطرنج پونک, درست اندیشیدن به فرزندانتان بیاموزید, تخصص ما کار با کودکان در کلاس های حضوری و آنلاین میباشد, آموزش ۵سال تا ۹۹ سال, (آموزش شطرنج مرزداران)"
      />
    </div>
  );
}
