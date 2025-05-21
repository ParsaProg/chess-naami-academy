import ContactUs from "@/components/main/landing/contactUs";
import LinksContainers from "@/components/main/landing/linksContainers";
import ReadyToStartLearning from "@/components/main/landing/readyToStartLearning";
import StudentComments from "@/components/main/landing/studentsComment";
import TopLandingSection from "@/components/main/landing/topLanding";
import WhyUs from "@/components/main/landing/whyUs";

export default function Home() {
  return (
    <div className="text-black w-full mt-5 mx-auto">
      <TopLandingSection />
      <LinksContainers />
      <WhyUs />
      <StudentComments />
      <ContactUs />
      <ReadyToStartLearning />
      <div className="pb-[20px]"></div>
    </div>
  );
}
