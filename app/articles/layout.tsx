import { Metadata } from "next";
import { ReactNode } from "react";

// بخش متادیتا (اختیاری - می‌توانید در page.tsx هم قرار دهید)
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "مقالات تخصصی",
    description: "جدیدترین مقالات در حوزه شطرنج",
    openGraph: {
      title: "مقالات تخصصی شطرنج | آکادمی نعامی",
      description: "بهترین مقالات آموزشی و تخصصی در زمینه شطرنج",
      images: [
        {
          url: "https://chessnaami.ir/assets/images/mr-naami.png",
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
      images: ["https://chessnaami.ir/assets/images/mr-naami.png"],
    },
  };
}

// بخش اصلی Layout که حتماً باید وجود داشته باشد
export default function ArticlesLayout({ children }: { children: ReactNode }) {
  return <div className="articles-layout">{children}</div>;
}
