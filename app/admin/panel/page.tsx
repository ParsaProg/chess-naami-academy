"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ArticleUploadForm from "./widget/ArticleFormData";

export default function AdminPanelPage() {
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
      router.push("/admin/panel/auth"); // یا از replace استفاده کنید برای جلوگیری از برگشت
    }
  }, [router]);
  return <div className="mt-[50px] w-full"><ArticleUploadForm /></div>;
}
