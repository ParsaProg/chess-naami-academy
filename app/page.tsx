import LinksContainers from "@/components/main/landing/linksContainers";
import TopLandingSection from "@/components/main/landing/topLanding";
import WhyUs from "@/components/main/landing/whyUs";

export default function Home() {
  return (
    <div className="text-black w-full mt-5 mx-auto">
      <TopLandingSection />
      <LinksContainers />
      <WhyUs />
      <div className="pb-[20px]"></div>
    </div>
  );
}
