"use client";
import { IoPersonAddOutline, IoBookOutline } from "react-icons/io5";
type ClassData = {
  title: string;
  endpoint: string;
  linkList: number[];
};

export default function OnlineClassesPage() {
  const toPersianDigits = (number: number | string): string => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return number
      .toString()
      .replace(/\d/g, (d: string) => persianDigits[parseInt(d)]);
  };

  const onlineClassData: Record<string, ClassData> = {
    privateClass: {
      title: "کلاس خصوصی",
      endpoint: "https://www.skyroom.online/ch/iamalisalehi/chess",
      linkList: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    seniorClass: {
      title: "کلاس تخصصی",
      endpoint: "https://skyroom.online/ch/iamalisalehi/naami",
      linkList: [1, 2, 3, 4],
    },
    preliminaryClass: {
      title: "کلاس مقدماتی",
      endpoint: "https://www.skyroom.online/ch/iamalisalehi/chessbasic",
      linkList: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    midClass: {
      title: "کلاس متوسط",
      endpoint: "https://skyroom.online/ch/iamalisalehi/chessm",
      linkList: [1, 2, 3, 4, 5],
    },
    advanceClass: {
      title: "کلاس پیشرفته",
      endpoint: "https://skyroom.online/ch/iamalisalehi/chesst",
      linkList: [1, 2, 3, 4, 5],
    },
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
        کلاس‌های آنلاین آکادمی نعامی
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {/* Private & Senior Class Card */}
        <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 bg-[#70e7db62] cursor-pointer">
            <div className="flex items-center gap-3 text-[#01B29F]">
              <IoPersonAddOutline className="text-2xl" />
              <h2 className="text-lg md:text-xl font-bold">
                کلاس خصوصی و تخصصی
              </h2>
            </div>
          </div>

          <div className="p-4">
            <p className="text-gray-600 mb-4">
              کلاس‌های خصوصی و تخصصی با توجه به نیاز شما
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {onlineClassData.seniorClass.linkList.map((_, index) => (
                <a
                  target="_blank"
                  key={`senior-${index}`}
                  href={`${index - 0 ? onlineClassData.seniorClass.endpoint + (index - 0).toString(): "https://skyroom.online/ch/iamalisalehi/chesst"}`}
                  className={`${index !== 0? "hover:bg-[#00cce6] bg-[#00e1ff] border-[#2A94E2] text-gray-800": "bg-black text-white"} text-center rounded-md border  py-2 px-3 transition-colors`}
                >
                  {index !== 0? onlineClassData.seniorClass.title +" "+ toPersianDigits(index).toString(): "کلاس سطح‌بندی"}
                  {}
                </a>
              ))}
            </div>
            <div className="space-t-4 mt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {onlineClassData.privateClass.linkList.map((_, index) => (
                  <a
                    target="_blank"
                    key={`private-${index}`}
                    href={`${onlineClassData.privateClass.endpoint}${
                      index + 1
                    }`}
                    className="bg-[#06ffb0] text-center rounded-md border border-[#26C49A] py-2 px-1 text-gray-800 hover:bg-[#05e6a0] transition-colors"
                  >
                    {onlineClassData.privateClass.title}{" "}
                    {toPersianDigits(index + 1)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Preliminary Class Card */}
        <div className="h-auto border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 bg-[#ECFDF5] cursor-pointer">
            <div className="flex items-center gap-3 text-[#01b254]">
              <IoBookOutline className="text-2xl" />
              <h2 className="text-lg md:text-xl font-bold">کلاس مقدماتی</h2>
            </div>
          </div>

          <div className="p-4">
            <p className="text-gray-600 mb-4">
              کلاس‌های مقدماتی شطرنج، آغاز راهی جذاب برای یادگیری شطرنج است.
            </p>

            {
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {onlineClassData.preliminaryClass.linkList.map((_, index) => (
                  <a
                    target="_blank"
                    key={`preliminary-${index}`}
                    href={`${
                      index === 2
                        ? "https://www.skyroom.online/ch/iamalisalehi/chessbacic3"
                        : onlineClassData.preliminaryClass.endpoint +
                          (index + 1).toString()
                    }`}
                    className="bg-[#00c8ff] text-center rounded-md border border-[#26C49A] py-2 px-3 text-gray-800 hover:bg-[#00b4e6] transition-colors"
                  >
                    {onlineClassData.preliminaryClass.title}{" "}
                    {toPersianDigits(index + 1)}
                  </a>
                ))}
              </div>
            }
          </div>
        </div>

        {/* Mid Level Class Card */}
        <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 bg-[#F5F3FF] cursor-pointer">
            <div className="flex items-center gap-3 text-[#8655F6]">
              <IoBookOutline className="text-2xl" />
              <h2 className="text-lg md:text-xl font-bold">کلاس متوسط</h2>
            </div>
          </div>

          <div className="p-4">
            <p className="text-gray-600 mb-4">
              کلاس‌های متوسط شطرنج، برای تقویت مهارت و آشنایی با تاکتیک‌های
              پیشرفته‌تر.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {onlineClassData.midClass.linkList.map((_, index) => (
                <a
                  target="_blank"
                  key={`mid-${index}`}
                  href={`${onlineClassData.midClass.endpoint}${index + 1}`}
                  className="bg-[#7947ef] text-center rounded-md border border-[#F5F3FF] py-2 px-3 text-white hover:bg-[#6a3ed6] transition-colors"
                >
                  {onlineClassData.midClass.title} {toPersianDigits(index + 1)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Class Card */}
        <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 bg-[#ea1df51f] cursor-pointer">
            <div className="flex items-center gap-3 text-[#ef09ff]">
              <IoBookOutline className="text-2xl" />
              <h2 className="text-lg md:text-xl font-bold">کلاس پیشرفته</h2>
            </div>
          </div>

          <div className="p-4">
            <p className="text-gray-600 mb-4">
              کلاس‌های پیشرفته شطرنج، برای کسانی که به دنبال مهارت‌های حرفه‌ای
              هستند.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {onlineClassData.advanceClass.linkList.map((_, index) => (
                <a
                  target="_blank"
                  key={`advance-${index}`}
                  href={`${onlineClassData.advanceClass.endpoint}${index + 1}`}
                  className="bg-[#ef09ff] text-center rounded-md border border-[#F5F3FF] py-2 px-3 text-white hover:bg-[#d808e6] transition-colors"
                >
                  {onlineClassData.advanceClass.title}{" "}
                  {toPersianDigits(index + 1)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
