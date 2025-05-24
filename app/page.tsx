"use client";

import ContactUs from "@/components/main/landing/contactUs";
import LinksContainers from "@/components/main/landing/linksContainers";
import NaamiAbout from "@/components/main/landing/NaamiAbout";
import ReadyToStartLearning from "@/components/main/landing/readyToStartLearning";
import StudentComments from "@/components/main/landing/studentsComment";
import TopLandingSection from "@/components/main/landing/topLanding";
import WhyUs from "@/components/main/landing/whyUs";
import { useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const whyUsComponentRef = useRef<HTMLDivElement>(null);

  const ContactUsComponentRef = useRef<HTMLDivElement>(null);
  const ContactUsComponentScroll = () => {
    if (ContactUsComponentRef.current) {
      const elementPosition =
        ContactUsComponentRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100; // 50 پیکسل بالاتر
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
 useEffect(() => {
    const contactUs: string | null = searchParams?.get('contact-us') ?? null;
    if (contactUs === 'true') {
      const contactSection = document.querySelector('.contact-us');
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop - 100; // 100 پیکسل بالاتر
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    }
  }, [searchParams]);

  const whyUsComponentScroll = () => {
    if (whyUsComponentRef.current) {
      const elementPosition =
        whyUsComponentRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100; // 50 پیکسل بالاتر
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="text-black w-full mt-5 mx-auto relative">
      <TopLandingSection
        ContactUsComponentScroll={ContactUsComponentScroll}
        whyUsComponentScroll={whyUsComponentScroll}
      />
      <NaamiAbout />
      <LinksContainers />
      <WhyUs whyUsComponentRef={whyUsComponentRef} />
      <StudentComments />
      <ContactUs ContactUsComponentRef={ContactUsComponentRef} />
      {/* <ReadyToStartLearning /> */}
      <div className="pb-[20px]"></div>
    </div>
  );
}
