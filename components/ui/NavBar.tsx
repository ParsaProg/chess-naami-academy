"use client";

import { FiHome } from "react-icons/fi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { GrArticle, GrContactInfo } from "react-icons/gr";
import "../../styles/navbar-res.css";
import { FiMenu } from "react-icons/fi";
import { FaChessKnight } from "react-icons/fa";
import { CiShoppingBasket } from "react-icons/ci";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import Drawer from "./Drawer";
import { useEffect, useState } from "react";
import { MdCastForEducation } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

export default function NavBar() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    setIsMobile(window?.innerWidth <= 1370 ? true : false);
    window.addEventListener("resize", () => {
      setIsMobile(window?.innerWidth <= 1370 ? true : false);
    });
  }, [isMobile, setIsMobile]);
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathName = usePathname();
  function foundRoute(route: string) {
    if (route === pathName) {
      return true;
    } else {
      return false;
    }
  }
  const [isHoverMenuShow, setIsHoverMenuShow] = useState<boolean>(false);
  const navTextClass =
    "hover:text-black font-bold text-lg cursor-pointer rounded-md gap-x-1 flex items-center transition-all duration-200 px-3 py-2 font-medium";
  return (
    <div
      style={{
        backdropFilter: "blur(20px)",
      }}
      className="fixed right-[0] top-0 w-full z-[9999] bg-[#ffffffb5] transition-all duration-200 border-b-[1px] border-b-slate-300 pt-3 mx-auto"
    >
      <Drawer setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />
      {drawerOpen && isMobile && (
        <div className="z-[99999] fixed top-0 right-[0] w-full h-screen bg-[#00000076]"></div>
      )}
      <div className="main-container w-[95%] mx-auto flex items-center gap-x-[30px] h-[50px] mb-3 justify-between">
        <section className="flex items-center gap-x-5">
          <Link href={"/"}>
            <div className="flex items-center gap-x-3 font-bold text-lg md:text-2xl text-[#F69B0D]">
              <FaChessKnight size={30} />
              شطرنج نعامی
            </div>
          </Link>
          <section className="flex items-center gap-x-2 links">
            <Link href={"/"}>
              <div
                className={`${navTextClass} ${
                  foundRoute("/") ? "text-black" : "text-gray-700"
                }`}
              >
                <FiHome size={16} />
                صفحه اصلی
              </div>
            </Link>
            <Link href={"/online-classes"}>
              <div
                className={`${navTextClass} ${
                  foundRoute("/online-classes") ? "text-black" : "text-gray-700"
                }`}
              >
                <LiaChalkboardTeacherSolid size={16} />
                دوره‌ها
              </div>
            </Link>
            <div
              className={`${navTextClass} ${
                foundRoute("/shop") ? "text-black" : "text-gray-700"
              }`}
            >
              <CiShoppingBasket size={16} />
              فروشگاه
            </div>
            <Link href={"/articles"}>
              <div
                className={`${navTextClass} ${
                  foundRoute("/articles") ? "text-black" : "text-gray-700"
                }`}
              >
                <GrArticle size={16} />
                مقالات
              </div>
            </Link>

            <div onMouseEnter={() => setIsHoverMenuShow(true)} onMouseLeave={() => setIsHoverMenuShow(false)} className={`${navTextClass} text-gray-700 relative`}>
              <MdCastForEducation size={16} />
              آموزش‌ها
              <AnimatePresence>
                {isHoverMenuShow && (
                  <motion.div initial={{opacity: 0, top: "30px"}} animate={{opacity: 1, top: "40px"}} exit={{opacity: 0, top: "30px"}} transition={{duration: 0.1}} className="absolute top-[40px] p-1 w-[170px] text-center text-md flex flex-col right-0 bg-white shadow-lg border-[1px] border-slate-200 rounded-lg">
                    <h1 onClick={() => router.push("/online-touroments")} className="p-2 rounded-lg transition-colors hover:bg-slate-200">مسابقات آنلاین</h1>
                    <h1 onClick={() => router.push("/educations")} className="p-2 rounded-lg transition-colors hover:bg-slate-200">پازل‌ها و مطالب</h1>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href={"/?contact-us=true"}>
              <div
                className={`${navTextClass} ${
                  foundRoute("/?contact-us=true")
                    ? "text-black"
                    : "text-slate-700"
                }`}
              >
                <GrContactInfo size={16} />
                تماس با‌ ما
              </div>
            </Link>
          </section>
        </section>
        <section className="flex items-center gap-x-2">
          <Link href={"/sign-up"}>
            <div
              className={
                "hover:bg-slate-300 transition-all duration-200 flex items-center justify-center gap-x-2 border-[1px] border-slate-300 rounded-lg bg-transparent text-black px-3 py-2"
              }
            >
              <FaUser size={15} />
              ثبت‌نام
            </div>
          </Link>
          <div
            onClick={() => setDrawerOpen(true)}
            className="cursor-pointer menu rounded-lg border-[1px] border-slate-300 p-3"
          >
            <FiMenu size={16} />
          </div>
        </section>
      </div>
    </div>
  );
}
