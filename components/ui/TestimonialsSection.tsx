import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TestimonialsSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const testimonials = [
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
  ];
  const swiperRef = useRef<any>(null);

  const handleSwiperInit = (swiper: any) => {
    swiperRef.current = swiper;

    // Safe navigation initialization
    if (prevRef.current && nextRef.current) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
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
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
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

          {/* Custom Navigation Buttons */}
          <button
            ref={prevRef}
            className="absolute left-0 b bottom-[-25px] z-10 -translate-y-1/2 transform bg-white/30 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white/50 transition-all duration-300"
          >
            <IoIosArrowBack className="text-2xl text-[#F49E0B]" />
          </button>
          <button
            ref={nextRef}
            className="absolute right-0 bottom-[-25px] z-10 -translate-y-1/2 transform bg-white/30 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white/50 transition-all duration-300"
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

const TestimonialCard = ({ testimonial }: any) => (
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

export default TestimonialsSection;
