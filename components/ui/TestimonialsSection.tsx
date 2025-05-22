import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Testimonial {
  id: number;
  initial: string;
  name: string;
  role: string;
  text: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => (
  <div className="rounded-lg bg-[#3A434C] p-4 md:p-6 text-white h-full">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 md:w-14 md:h-14 font-bold text-lg md:text-xl rounded-full bg-[#F49E0B] text-white flex items-center justify-center">
        {testimonial.initial}
      </div>
      <div>
        <h1 className="text-lg md:text-xl font-bold">{testimonial.name}</h1>
        <h2 className="text-base md:text-lg text-[#F49E0B]">
          {testimonial.role}
        </h2>
      </div>
    </div>
    <p className="font-normal mt-4 md:mt-5 text-slate-300">
      {testimonial.text}
    </p>
    <div className="flex gap-1 mt-3 md:mt-4">
      {[1, 2, 3, 4, 5].map((val) => (
        <FaStar key={val} size={20} color="#F4C52D" />
      ))}
    </div>
  </div>
);

const TestimonialsSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      initial: "م",
      name: "محمد احمدی",
      role: "دانش آموز پیشرفته",
      text: "«پسرم بعد از شرکت در کلاسهای آکادمی علاقه زیادی به شطرنج پیدا کرده و تمرکزش در درسها هم بهتر شده از نحوه برخورد مربیان با بچه ها بسیار راضی هستم.»",
    },
    {
      id: 2,
      initial: "س",
      name: "سارا محمدی",
      role: "والد دانش‌آموز نوجوان",
      text: "«پس از گذراندن دوره پیشرفته، توانستم در مسابقات استانی رتبه دوم را کسب کنم مربیان آکادمی با صبر و حوصله تمام نکات ریز و کلیدی را آموزش میدهند.»",
    },
    {
      id: 3,
      initial: "ع",
      name: "علی رضایی",
      role: "دانش‌آموز دورۀ مبتدی",
      text: "«من بدون هیچ پیش زمینه ای وارد آکادمی شدم و در مدت کوتاهی توانستم اصول اولیه شطرنج را یاد بگیرم. محیط آکادمی بسیار دوستانه و حرفه ای است.»",
    },

    {
      id: 4,
      initial: "آ",
      name: "امیررضا توسلی",
      role: "دانش‌آموز دورۀ پیشرفته",
      text: "من ۵ سال به صورت آنلاین دارم با آموزشگاه شطرنج استاد نعامی کار میکنم مقام های زیادی  تو شهر و استان خودم دارم واین آموزشگاه به دیگران پیشنهاد میدهم.",
    },
    {
      id: 5,
      initial: "ک",
      name: "کیان خوش بین",
      role: "دانش‌آموز دورۀ پیشرفته",
      text: "فرزند من ۸ ساله هست دوسال به صورت آنلاین و حضوری با آموزشگاه استاد دارن کار میکنند و از کادر آموزشی و اخلاق حرفه ای ایشان خیلی راضی هستیم.",
    },
    {
      id: 6,
      initial: "س",
      name: "سام منصوریان‌فرد",
      role: "دانش‌آموز دورۀ مبتدی",
      text: "فرزند من ۶ ساله هست ۳ ماهه داره آنلاین آموزش میبینه واز آموزش کاملاا تخصصی کودکانه که همراه با شعر میباشد هم خودم لذت میبرم و هم فرزندم و فکر نمیکردم بتونه آنقدر خوب با آنلاین آموزش ببیند",
    },
  ];

  const handleSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;

    if (swiper.params.navigation && prevRef.current && nextRef.current) {
      Object.assign(swiper.params.navigation, {
        prevEl: prevRef.current,
        nextEl: nextRef.current,
        disabledClass: "swiper-button-disabled",
      });
      swiper.navigation.init();
      swiper.navigation.update();
    }
  };

  return (
    <section className="relative w-full max-w-[1400px] mt-8 md:mt-12 mx-auto px-4 sm:px-6 lg:px-8">
      {isMobile ? (
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            onInit={handleSwiperInit}
            className="!pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            ref={nextRef}
            className="absolute left-0 bottom-[-25px] z-10 transform bg-white/30 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white/50 transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <IoIosArrowBack className="text-2xl text-[#F49E0B]" />
          </button>
          <button
            ref={prevRef}
            className="absolute right-0 bottom-[-25px] z-10 transform bg-white/30 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white/50 transition-all duration-300"
            aria-label="Next testimonial"
          >
            <IoIosArrowForward className="text-2xl text-[#F49E0B]" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;
