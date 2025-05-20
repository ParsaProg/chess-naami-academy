import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SEO from "../components/SEO";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "آکادمی شطرنج نعامی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SEO
          title="آکادمی شطرنج نعامی"
          description="آموزشگاه شطرنج استاد نعامی با ۱۴ سال فعالیت مستمر در زمینه آموزش شطرنج، به صورت حضوری و آنلاین"
          ogImage="https://raw.githubusercontent.com/ParsaProg/chess-naami-academy/refs/heads/main/app/favicon.ico"
        />
        {children}
      </body>
    </html>
  );
}
