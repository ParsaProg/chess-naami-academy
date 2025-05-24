import "../../styles/top-containers.css";

export default function SignUp() {
  return (
    <section className="mt-[50px] mx-auto container-counter border-[1px] border-slate-200 p-5 rounded-xl w-full max-w-[800px] px-4 sm:px-6">
  <h1 className="text-black font-bold text-xl sm:text-2xl">فرم ثبت‌نام</h1>
  <div className="mt-4 sm:mt-6">
    <h3 className="text-black font-[400] text-base sm:text-lg">نام و نام خانوادگی</h3>
    <input
      type="text"
      className="border-[1px] border-slate-300 rounded-lg p-3 text-base sm:text-lg w-full mt-2 outline-none"
      placeholder="نام و نام خانوادگی خود را وارد کنید"
    />
  </div>
  <div className="mt-5">
    <h3 className="text-black font-[400] text-base sm:text-lg">ایمیل</h3>
    <input
      type="text"
      className="border-[1px] border-slate-300 rounded-lg p-3 text-base sm:text-lg w-full mt-2 outline-none"
      placeholder="ایمیل خود را وارد کنید"
    />
  </div>
  <div className="mt-5">
    <h3 className="text-black font-[400] text-base sm:text-lg">شماره تماس</h3>
    <input
      type="text"
      className="border-[1px] border-slate-300 rounded-lg p-3 text-base sm:text-lg w-full mt-2 outline-none"
      placeholder="شماره تماس خود را وارد کنید"
    />
  </div>
  <div className="mt-3 flex flex-col sm:flex-row gap-5">
    <div className="flex flex-col w-full">
      <h3 className="text-black font-[400] text-base sm:text-lg">کشور</h3>
      <input
        type="text"
        className="border-[1px] border-slate-300 rounded-lg p-3 text-base sm:text-lg w-full mt-2 outline-none"
        placeholder="کشور را وارد کنید"
      />
    </div>
    <div className="w-full flex flex-col">
      <h3 className="text-black font-[400] text-base sm:text-lg">شهر</h3>
      <input
        type="text"
        className="border-[1px] border-slate-300 rounded-lg p-3 text-base sm:text-lg w-full mt-2 outline-none"
        placeholder="شهر را وارد کنید"
      />
    </div>
  </div>
  <div className="mt-5">
    <h3 className="text-black font-[400] text-base sm:text-lg">
      توضیح <strong className="text-[#F09F0A] font-bold">کوتاه</strong> دربارۀ سطح شطرنجتون
    </h3>
    <textarea
      style={{ resize: "none" }}
      maxLength={100}
      className="border-[1px] border-slate-300 rounded-lg p-3 text-base sm:text-lg w-full mt-2 outline-none h-[80px]"
      placeholder="توضیح سطح را بنویسید"
    />
  </div>
  <div className="mt-5">
    <h3 className="text-black font-[400] text-base sm:text-lg">پیام</h3>
    <textarea
      maxLength={500}
      className="border-[1px] border-slate-300 rounded-lg p-3 text-base sm:text-lg w-full mt-2 outline-none h-[150px] sm:h-[200px]"
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
  );
}
