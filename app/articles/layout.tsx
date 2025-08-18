import { Metadata } from "next";

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
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=${encodeURIComponent(
          "مقالات تخصصی"
        )}&description=${encodeURIComponent(
          "مجموعه کامل مقالات آموزشی و تخصصی"
        )}&type=list`,
      ],
    },
  };
}
