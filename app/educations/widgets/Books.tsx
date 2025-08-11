import { FaBookOpen } from "react-icons/fa6";
import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";

export default function Books() {
  return (
    <div className="w-full mt-8">
      <h1 className="font-bold text-black text-2xl">کتاب‌های رایگان</h1>
      <h3 className="mt-2 text-slate-600 text-lg font-[400]">
        مجموعه‌ای از بهترین کتاب‌های شطرنج به صورت رایگان
      </h3>
      <div className="flex items-center gap-8 flex-wrap mt-8">
        <BookContainer />
        <BookContainer />
        <BookContainer />
        <BookContainer />
      </div>
    </div>
  );
}

function BookContainer() {
  return (
    <div className="shadow-xl rounded-lg border-[1px] border-slate-200 w-[550px] p-5">
      <div className="flex items-center justify-between gap-x-3">
        <section className="flex flex-col items-start">
          <h1 className="font-bold text-xl text-black">
            مبانی شطرنج برای مبتدیان
          </h1>
          <h3 className="font-[400] text-lg text-slate-600 mt-1">
            کتاب جامع برای یادگیری اصول پایه شطرنج
          </h3>
        </section>
        <div className="bg-gradient-to-tl from-blue-600 to-purple-600 text-3xl text-white flex items-center justify-center p-5 rounded-full">
          <FaBookOpen size={60} className="size-6" />
        </div>
      </div>
      <div className="flex-wrap flex items-center gap-x-3 text-slate-600">
        <h5 className="">نوسینده: استاد نعامی</h5>
        <h5 className="">۱۲۰ صفحه</h5>
        <h5 className="">۲.۵ مگابایت</h5>
      </div>
      <div className="flex items-center justify-between mt-2">
        <section className="flex items-center gap-x-1">
          <div className="flex items-center gap-x-1">
            {["f", "f", "f", "f", "u"].map((v, _i) => {
              return v === "f" ? (
                <TiStarFullOutline color="#FACC15" key={_i} size={20} />
              ) : (
                <TiStarOutline key={_i} size={20} />
              );
            })}
          </div>

          <h1 className="mt-1 text-black text-md font-bold">۴.۸</h1>
        </section>
        <section className="flex items-center text-slate-600 gap-x-2">
          <MdOutlineFileDownload size={20} />
          ۶۰۰ دانلود
        </section>
      </div>
      <div className="w-[100%] mt-5 flex items-center gap-x-3">
        <button className="transition-colors duration-100 hover:bg-slate-800 gap-x-2 cursor-pointer w-[100%] py-3 text-white bg-slate-950 rounded-lg flex items-center justify-center">
          <MdOutlineFileDownload size={20} />
          دانلود رایگان
        </button>
        <button className="cursor-pointer transition-colors duration-100 hover:bg-slate-200 p-3 rounded-lg border-[1px] border-slate-200 flex items-center text-center text-black gap-x-2 justify-center">
          <IoEyeOutline size={20} />
        </button>
      </div>
    </div>
  );
}
