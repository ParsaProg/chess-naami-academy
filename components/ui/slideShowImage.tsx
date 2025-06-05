import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import Image from "next/image";
import NaamiImage1 from "../../public/assets/images/naami/naami-1.png";
import NaamiImage2 from "../../public/assets/images/naami/naami-2.png";
import NaamiImage3 from "../../public/assets/images/naami/naami-3.png";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const images = [
  NaamiImage1.src,
  NaamiImage2.src,
  NaamiImage3.src
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
        setSwiperHeight("400px");
        setImageHeight("400px");
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
        setSwiperHeight("700px");
        setImageHeight("700px");
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
              width={1000}
              height={1000}
              src={src}
              alt={`slide-${idx}`}
              style={{
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
