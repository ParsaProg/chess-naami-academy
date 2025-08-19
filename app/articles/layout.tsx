import { Metadata } from "next";
import { ReactNode } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chessnaami.ir";

  return {
    title: "مقالات تخصصی",
    description: "جدیدترین مقالات در حوزه شطرنج",
    openGraph: {
      title: "مقالات تخصصی شطرنج | آکادمی نعامی",
      description: "بهترین مقالات آموزشی و تخصصی در زمینه شطرنج",
      images: [
        {
          url: `${baseUrl}/images/mr-naami.jpg`, // باید توی public/images باشه
          width: 1200,
          height: 630,
          alt: "مقالات تخصصی",
        },
      ],
      type: "website",
      url: `${baseUrl}/articles`,
    },
    twitter: {
      card: "summary_large_image",
      title: "مقالات تخصصی | شطرنج نعامی",
      description: "بهترین مقالات آموزشی و تخصصی در زمینه شطرنج",
      images: [`${baseUrl}/images/mr-naami.jpg`],
    },
  };
}

export default function ArticlesLayout({ children }: { children: ReactNode }) {
  return <div className="articles-layout">{children}</div>;
}
