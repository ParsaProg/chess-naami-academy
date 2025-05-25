import type { Metadata } from "next";
import "./globals.css";
import SEO from "../components/SEO";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import LetsSignUp from "@/components/ui/SignUp";
import favicon from "./favicon.ico"

export const metadata: Metadata = {
  title: "آکادمی شطرنج نعامی",
  description: "آموزشگاه شطرنج استاد نعامی با ۱۴ سال فعالیت مستمر در زمینه آموزش شطرنج، به صورت حضوری و آنلاین"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <head>
        <link rel="icon" href={`${favicon.src}/?v=2`} type="image/x-icon" />
        <link rel="icon" href={favicon.src} sizes="any" />
        <link rel="icon" href={favicon.src} type="image/svg+xml" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={favicon.src}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={favicon.src}
        />
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
          content="https://github.com/ParsaProg/tecama_images/blob/main/IMG_20241227_163947.jpg?raw=true"
        />
        <meta property="og:url" content="https://www.parsashaabani.ir/" />
        <meta property="og:type" content="website" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Parsa Shaabani Portfolio" />
        <meta
          name="twitter:description"
          content="Welcome to Parsa Shaabani's portfolio! 🚀 Explore creative projects, coding adventures, and a timeline of achievements. Connect and build something amazing together! 💡"
        />
        <meta
          name="twitter:image"
          content="https://github.com/ParsaProg/tecama_images/blob/main/IMG_20241227_163947.jpg?raw=true"
        />
        {/* Favicon */}
        <title>پارسا شعبانی | برنامه‌نویس حرفه‌ای و توسعه‌دهنده وب</title>
        <meta
          name="description"
          content="پارسا شعبانی - متخصص برنامه‌نویسی با سابقه درخشان در توسعه وب و نرم‌افزار. نمونه کارها و اطلاعات تماس."
        />
        <meta property="og:locale" content="fa_IR" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/ico" sizes="16x16" />
        <link rel="icon" href="/favicon.ico" type="image/ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className="select-none w-full">
        <SEO
          title="آکادمی شطرنج نعامی"
          description="آموزشگاه شطرنج استاد نعامی با ۱۴ سال فعالیت مستمر در زمینه آموزش شطرنج، به صورت حضوری و آنلاین"
          ogImage="https://raw.githubusercontent.com/ParsaProg/chess-naami-academy/refs/heads/main/app/favicon.ico"
        />
        <NavBar />
        <div className="h-[50px]"></div>
        {children}
        <LetsSignUp />
        <Footer />
      </body>
    </html>
  );
}
