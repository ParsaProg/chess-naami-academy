import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const images = [
  "https://shatranjiran.com/wp-content/uploads/2023/01/01454620210906_11380320210703_%D8%B4%D8%B7%D8%B1%D9%86%D8%AC-%D8%A8%D8%B1%D8%A7%DB%8C-%DA%A9%D9%88%D8%AF%DA%A9%D8%A7%D9%86.jpg",
  "https://elie.ir/wp-content/uploads/2022/06/children-play-chess2-min.png",
  "https://img9.irna.ir/old/Image/1397/13970607/83016615/N83016615-72518246.jpg",
  // add your images here
];

export default function SwiperSlideShow() {
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [swiperHeight, setSwiperHeight] = useState("300px");
  const [imageHeight, setImageHeight] = useState("300px");

  useEffect(() => {
    const handleResize = () => {
      // For mobile devices
      if (window.innerWidth < 550) {
        setSlidesPerView(1);
        setSwiperHeight("180px");
        setImageHeight("180px");
      }
      // For tablets
      else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
        setSlidesPerView(1);
        setSwiperHeight("400px");
        setImageHeight("400px");
      }
      // For laptops and larger screens
      else {
        setSlidesPerView(1);
        setSwiperHeight("500px");
        setImageHeight("500px");
      }
    };

    // Set initial values
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="overflow-hidden swiper-container"
      style={{ width: "90%", maxWidth: "850px" }}
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={slidesPerView}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: false }}
        style={{
          width: "100%",
          height: swiperHeight,
          borderRadius: "10px",
        }}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <Image
              width={900}
              height={900}
              src={src}
              alt={`slide-${idx}`}
              style={{
                width: "100%",
                height: imageHeight,
                objectPosition: "center",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
