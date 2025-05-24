import Link from "next/link";

export default function LetsSignUp() {
  return (
    <Link href={"/sign-up"}>
      <div className="py-12 md:py-[50px] text-white w-full mt-10 md:mt-[60px] lg:mt-[80px] mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8 bg-[#F49E0B]">
        <h1 className="font-bold text-3xl">آمادۀ شروع یادگیری شطرنج هستید؟</h1>
        <h3 className="font-[400] text-lg mt-5">
          همین امروز ثبت نام کنید و اولین جلسه مشاوره رایگان خود را رزرو کنید
        </h3>
        <button className="bg-white text-[#F49E0B] rounded-lg p-3 font-bold mt-5 shadow-amber-600 shadow-2xl cursor-pointer">
          ثبت‌نام در کلاس‌های آنلاین
        </button>
      </div>
    </Link>
  );
}
