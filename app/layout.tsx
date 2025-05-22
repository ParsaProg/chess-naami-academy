import type { Metadata } from "next";
import "./globals.css";
import SEO from "../components/SEO";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "آکادمی شطرنج نعامی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <head>
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
        <Footer />
      </body>
    </html>
  );
}
