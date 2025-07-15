"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChessKnight, FaRegCommentDots } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { GrArticle, GrContactInfo } from "react-icons/gr";
import { CiShoppingBasket } from "react-icons/ci";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TfiCup } from "react-icons/tfi";

export default function Drawer({
  setDrawerOpen,
  drawerOpen,
}: {
  setDrawerOpen: (open: boolean) => void;
  drawerOpen?: boolean;
}) {
  const navTextClass =
    "hover:text-black font-bold text-xl cursor-pointer rounded-md gap-x-2 flex items-center transition-all duration-200 font-medium";
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    setIsMobile(window?.innerWidth <= 1370 ? true : false);
    window.addEventListener("resize", () => {
      setIsMobile(window?.innerWidth <= 1370 ? true : false);
    });
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    function handleClickOutside(event: MouseEvent) {
      // Check if the click is outside the drawer
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setDrawerOpen(false);
      }
    }

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDrawerOpen, drawerOpen]);
  const drawerRef = useRef<HTMLDivElement>(null);
  return (
    <AnimatePresence>
      {drawerOpen && isMobile && (
        <motion.div
          initial={{ right: "-300px", opacity: 0 }}
          animate={{ right: "0px", opacity: 1 }}
          exit={{
            right: "-300px",
            opacity: 0,
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          ref={drawerRef}
          className="z-[999999] shadow-xl fixed top-0 right-0 h-screen w-[250px] bg-white rounded-tl-lg rounded-bl-lg border-[1px] border-slate-300 flex flex-col items-start p-5 "
        >
          <div className="flex items-center justify-between gap-x-3 font-bold text-[#F69B0D] w-full">
            <Link
              onClick={() => {
                setDrawerOpen(false);
              }}
              href={"/"}
            >
              <FaChessKnight size={30} />
            </Link>
            <div
              onClick={() => {
                setDrawerOpen(false);
              }}
              className="cursor-pointer rounded-xl border-[1px] border-slate-400 p-2 flex items-center justify-center text-black"
            >
              <IoMdClose size={20} />
            </div>
          </div>
          <section className="gap-y-6 w-full flex flex-col items-start mt-8 text-black">
            <Link
              onClick={() => {
                setDrawerOpen(false);
              }}
              href={"/online-classes"}
            >
              <div className={`${navTextClass}`}>
                <LiaChalkboardTeacherSolid size={20} />
                دوره‌ها
              </div>
            </Link>
            <div className={`${navTextClass}`}>
              <CiShoppingBasket size={20} />
              فروشگاه
            </div>
            <Link
              onClick={() => {
                setDrawerOpen(false);
              }}
              href={"/articles"}
            >
              <div className={`${navTextClass}`}>
                <GrArticle size={20} />
                مقالات
              </div>
            </Link>
            <Link
              onClick={() => {
                setDrawerOpen(false);
              }}
              href={"/educations"}
            >
              <div className={`${navTextClass}`}>
                <IoDocumentTextOutline size={20} />
                پازل‌ها و مطالب
              </div>
            </Link>
            <Link
              onClick={() => {
                setDrawerOpen(false);
              }}
              href={"/online-touroments"}
            >
              <div className={`${navTextClass}`}>
                <TfiCup size={20} />
                مسابقات آنلاین
              </div>
            </Link>
            <Link
              onClick={() => {
                setDrawerOpen(false);
              }}
              href={"/?comments=true"}
            >
              <div className={`${navTextClass}`}>
                <FaRegCommentDots size={20} />
                نظرات
              </div>
            </Link>

            <Link
              onClick={() => {
                setDrawerOpen(false);
              }}
              href={"/?contact-us=true"}
            >
              <div className={`${navTextClass}`}>
                <GrContactInfo size={20} />
                تماس با‌ ما
              </div>
            </Link>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
