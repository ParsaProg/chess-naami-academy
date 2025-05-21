import { FaStar } from "react-icons/fa";

export default function StudentComments() {
  return (
    <div className="py-12 md:py-[80px] text-white w-full mt-10 md:mt-[60px] lg:mt-[80px] mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1A1B1D] to-[#2C3D4F]">
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center">
        نظرات <strong className="text-[#F39F08]">دانش آموزان</strong> ما
      </h1>

      <p className="w-full md:w-[90%] lg:w-[800px] text-slate-300 font-medium text-base sm:text-lg text-center mt-3 sm:mt-4 md:mt-5">
        ما با ارایه‌ی خدمات آموزشی با کیفیت و محیطی حرفه‌ای بهترین تجربه‌ی
        یادگیری شطرنج را برای شما فراهم می‌کنیم.
      </p>

      {/* Grid Container */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-[1400px] mt-8 md:mt-12">
        {/* Testimonial 1 */}
        <div className="rounded-lg bg-[#3A434C] p-4 md:p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 md:w-14 md:h-14 font-bold text-lg md:text-xl rounded-full bg-[#F49E0B] text-white flex items-center justify-center">
              م
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold">محمد احمدی</h1>
              <h2 className="text-base md:text-lg text-[#F49E0B]">
                دانش آموز پیشرفته
              </h2>
            </div>
          </div>
          <p className="font-normal mt-4 md:mt-5 text-slate-300">
            «پسرم بعد از شرکت در کلاسهای آکادمی علاقه زیادی به شطرنج پیدا کرده و
            تمرکزش در درسها هم بهتر شده از نحوه برخورد مربیان با بچه ها بسیار
            راضی هستم.»
          </p>
          <div className="flex gap-1 mt-3 md:mt-4">
            {[1, 2, 3, 4, 5].map((val) => (
              <FaStar key={val} size={20} color="#F4C52D" />
            ))}
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="rounded-lg bg-[#3A434C] p-4 md:p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 md:w-14 md:h-14 font-bold text-lg md:text-xl rounded-full bg-[#F49E0B] text-white flex items-center justify-center">
              س
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold">سارا محمدی</h1>
              <h2 className="text-base md:text-lg text-[#F49E0B]">
                والد دانش‌آموز نوجوان
              </h2>
            </div>
          </div>
          <p className="font-normal mt-4 md:mt-5 text-slate-300">
            «پس از گذراندن دوره پیشرفته، توانستم در مسابقات استانی رتبه دوم را
            کسب کنم مربیان آکادمی با صبر و حوصله تمام نکات ریز و کلیدی را آموزش
            میدهند.»
          </p>
          <div className="flex gap-1 mt-3 md:mt-4">
            {[1, 2, 3, 4, 5].map((val) => (
              <FaStar key={val} size={20} color="#F4C52D" />
            ))}
          </div>
        </div>

        {/* Testimonial 3 */}
        <div className="rounded-lg bg-[#3A434C] p-4 md:p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 md:w-14 md:h-14 font-bold text-lg md:text-xl rounded-full bg-[#F49E0B] text-white flex items-center justify-center">
              ع
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold">علی رضایی</h1>
              <h2 className="text-base md:text-lg text-[#F49E0B]">
                دانش‌آموز دورۀ مبتدی
              </h2>
            </div>
          </div>
          <p className="font-normal mt-4 md:mt-5 text-slate-300">
            «من بدون هیچ پیش زمینه ای وارد آکادمی شدم و در مدت کوتاهی توانستم
            اصول اولیه شطرنج را یاد بگیرم. محیط آکادمی بسیار دوستانه و حرفه ای
            است.»
          </p>
          <div className="flex gap-1 mt-3 md:mt-4">
            {[1, 2, 3, 4, 5].map((val) => (
              <FaStar key={val} size={20} color="#F4C52D" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
