"use client";

import ContactUs from "@/components/main/landing/contactUs";
import LinksContainers from "@/components/main/landing/linksContainers";
import NaamiAbout from "@/components/main/landing/NaamiAbout";
import ReadyToStartLearning from "@/components/main/landing/readyToStartLearning";
import StudentComments from "@/components/main/landing/studentsComment";
import TopLandingSection from "@/components/main/landing/topLanding";
import WhyUs from "@/components/main/landing/whyUs";
import { useRef } from "react";

export default function Home() {
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
      <ReadyToStartLearning />
      <div className="pb-[20px]"></div>
    </div>
  );
}
