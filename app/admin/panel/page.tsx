"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegChessQueen } from "react-icons/fa6";
import ManaginPanelIcon from "@/public/assets/icons/admin-avatar.png";
import SelectTabMenu from "./utils/SelectTabMenu";
import ArticleUploadForm from "./widget/ArticleFormData";
import VideoForm from "./widget/VideosFormData";
import PuzzleUploadForm from "./widget/PuzzlesFormData";

export default function AdminPanelPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // چک کردن کوکی admin_token در سمت کلاینت
    const adminToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("admin_token="))
      ?.split("=")[1];

    // اگر توکن وجود نداشت یا اشتباه بود، به صفحه لاگین ریدایرکت شود
    if (
      !adminToken ||
      adminToken !== process.env.NEXT_PUBLIC_ADMIN_PANEL_AUTH_TOKEN
    ) {
      setIsLogin(false);
      router.push("/admin/panel/auth"); // یا از replace استفاده کنید برای جلوگیری از برگشت
    } else {
      setIsLogin(true);
    }
  }, [router]);
  return (
    !isLogin === null ||
    (!isLogin === false && (
      <div className="mt-[50px] w-full mx-auto">
        {/* <ArticleUploadForm />
        <VideoForm /> */}
        {/* <PuzzleUploadForm /> */}
        <section className="px-[10px] sm:px-[30px] border-b-[1px] pb-[20px] border-b-slate-300 flex items-center justify-between w-full">
          <div className="flex items-center gap-x-2">
            <div className="bg-[#6363C6] rounded-lg p-3 flex items-center justify-center text-white">
              <FaRegChessQueen size={20} />
            </div>
            <h1 className="font-bold text-black text-xl">
              پنل مدیریت شطرنج نعامی
            </h1>
          </div>
          <div className="rounded-full w-[40px] h-[40px] overflow-hidden">
            <Image
              unoptimized
              alt="managing-panel-icon"
              src={ManaginPanelIcon}
            />
          </div>
        </section>
        <section className="flex sm:flex-row flex-col items-start">
          <SelectTabMenu
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          {selectedTab === 0 ? (
            <ArticleUploadForm />
          ) : selectedTab === 1 ? (
            <div></div>
          ) : selectedTab === 2 ? (
            <VideoForm />
          ) : selectedTab === 3 ? (
            <div></div>
          ) : (
            <PuzzleUploadForm />
          )}
        </section>
      </div>
    ))
  );
}
