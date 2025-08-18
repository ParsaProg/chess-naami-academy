import { Metadata } from "next";
import { ReactNode } from "react";

// بخش متادیتا (اختیاری - می‌توانید در page.tsx هم قرار دهید)
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "مقالات تخصصی",
    description: "جدیدترین مقالات در حوزه شطرنج",
    openGraph: {
      title: "مقالات تخصصی | مجله شما",
      description:
        "بهترین مقالات آموزشی و تخصصی در زمینه برنامه نویسی و تکنولوژی",
      images: [
        {
          url: `${
            process.env.NEXT_PUBLIC_SITE_URL
          }/api/og?title=${encodeURIComponent(
            "مقالات تخصصی"
          )}&description=${encodeURIComponent(
            "مجموعه کامل مقالات آموزشی و تخصصی"
          )}&type=list`,
          width: 1200,
          height: 630,
          alt: "مقالات تخصصی",
        },
      ],
      type: "website",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/articles`,
    },
    twitter: {
      card: "summary_large_image",
      title: "مقالات تخصصی | مجله شما",
      description:
        "بهترین مقالات آموزشی و تخصصی در زمینه برنامه نویسی و تکنولوژی",
      images: [
        "https://chessnaami.ir/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmr-naami.e37d5607.png&w=750&q=75",
      ],
    },
  };
}

// بخش اصلی Layout که حتماً باید وجود داشته باشد
export default function ArticlesLayout({ children }: { children: ReactNode }) {
  return <div className="articles-layout">{children}</div>;
}
