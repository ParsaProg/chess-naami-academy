import type { Metadata } from "next";
import "./globals.css";
import SEO from "../components/SEO";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import LetsSignUp from "@/components/ui/SignUp";
import favicon from "./favicon.ico";
import Head from "next/head";
import NProgressProvider from "@/components/transition/NProgressProvider";
import ToastProvider from "@/components/toastProvider";

const siteName = "آکادمی شطرنج نعامی";
const siteUrl = "https://chessnaami.ir";
const siteDesc =
  "آموزشگاه شطرنج استاد نعامی با ۱۴ سال فعالیت مستمر در زمینه آموزش شطرنج، به صورت حضوری و آنلاین";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDesc,
  applicationName: siteName,
  alternates: {
    canonical: siteUrl,
    languages: {
      fa: siteUrl + "/fa",
    },
    types: { "application/rss+xml": siteUrl + "/rss.xml" },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDesc,
    images: ["https://chessnaami.ir/assets/images/mr-naami.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDesc,
    images: ["https://chessnaami.ir/assets/images/mr-naami.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "theme-color": "#ffffff",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="rtl">
      <Head>
        <link rel="icon" href={`${favicon.src}/?v=2`} type="image/x-icon" />
        <link rel="icon" href={favicon.src} sizes="any" />
        <link rel="icon" href={favicon.src} type="image/svg+xml" />
        <link rel="icon" type="image/png" sizes="32x32" href={favicon.src} />
        <link rel="icon" type="image/png" sizes="16x16" href={favicon.src} />
        ّ
        <meta
          name="description"
          content="آموزشگاه شطرنج استاد نعامی با ۱۴ سال فعالیت مستمر در زمینه آموزش شطرنج، به صورت حضوری و آنلاین"
        />
        {/* Basic Meta Tags */}
        <meta
          name="description"
          content="آموزشگاه شطرنج استاد نعامی با ۱۴ سال فعالیت مستمر در زمینه آموزش شطرنج، به صورت حضوری و آنلاین"
        />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Parsa Shaabani Portfolio" />
        <meta
          property="og:description"
          content="آموزشگاه شطرنج استاد نعامی با ۱۴ سال فعالیت مستمر در زمینه آموزش شطرنج، به صورت حضوری و آنلاین"
        />
        <meta
          property="og:image"
          content="https://chessnaami.ir/assets/images/mr-naami.png"
        />
        <meta property="og:url" content="https://www.chessnaami.ir/" />
        <meta property="og:type" content="website" />
        {/* Twitter Card Meta Tags */}
        <meta
          name="twitter:card"
          content="https://chessnaami.ir/assets/images/mr-naami.png"
        />
        <meta name="twitter:title" content="آکادمی شطرنج ابراهیم نعامی" />
        <meta
          name="twitter:description"
          content="آموزشگاه شطرنج استاد نعامی با ۱۴ سال فعالیت مستمر در زمینه آموزش شطرنج، به صورت حضوری و آنلاین"
        />
        <meta
          name="twitter:image"
          content="https://chessnaami.ir/assets/images/mr-naami.png"
        />
        {/* Favicon */}
        <title>آکادمی شطرنج نعامی</title>
        <meta
          name="description"
          content="آموزشگاه شطرنج استاد نعامی با ۱۴ سال فعالیت مستمر در زمینه آموزش شطرنج، به صورت حضوری و آنلاین"
        />
        <meta property="og:locale" content="fa_IR" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/ico" sizes="16x16" />
        <link rel="icon" href="/favicon.ico" type="image/ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://chessnaami.ir",
              "@type": "LocalBusiness",
              name: "آموزش شطرنج مرزداران",
              address: {
                "@type": "PostalAddress",
                addressLocality: "تهران",
                streetAddress: "شطرنج جنت‌آباد، شطرنج مرزداران",
              },
              description:
                "آموزش تخصصی شطرنج کودکان و نوجوانان. آموزش شطرنج سن 5 تا 99 سال",
              url: "https://chessnaami.ir",
              telephone: "‪+98-21-12345678‬",
            }),
          }}
        />
      </Head>
      <body className="select-none w-full">
        <SEO
          title="آکادمی شطرنج نعامی"
          description="آموزشگاه شطرنج استاد نعامی با ۱۴ سال فعالیت مستمر در زمینه آموزش شطرنج، به صورت حضوری و آنلاین"
          ogImage="https://chessnaami.ir/assets/images/mr-naami.png"
        />

        <NavBar />
        <div className="h-[50px]"></div>
        <NProgressProvider />
        <ToastProvider />
        {children}

        <LetsSignUp />
        <Footer />
      </body>
    </html>
  );
}
