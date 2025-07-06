"use client";

import { useEffect, useState } from "react";
import SpecialArticleContainer from "@/components/ui/articles/special-articles-container";
import "../../../styles/loaderSpinner.css";
import { LuHeart } from "react-icons/lu";
import { FaRegComments, FaUser } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";

interface Article {
  _id: string;
  title: string;
  content: string;
  cats: string[];
  titleImage: string;
  views: string;
  likes: string;
  importantText: string;
  desc: string;
  time: string;
  publishDate: string;
  publisherName: string;
  publisherImage: string;
  publisherTag: string;
  comments: string;
  createdAt: string;
  isSpecial: boolean;
}

export default function MainArticlesDetailsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [article, setArticle] = useState<Article>();

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const id = decodeURIComponent(pathParts[pathParts.length - 1]);

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/admin/api/articles", {
          headers: {
            Authorization: "Bearer mysecrettoken123",
          },
        });
        if (!response.ok) throw new Error("Unauthorized or server error");

        const data = await response.json();
        const mainArticle = data.find((article: Article) => article.title === id);
        setArticle(mainArticle);
      } catch (error) {
        console.error("Error fetching article data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full mx-auto">
        <span className="loader mt-[50px] mx-auto"></span>
      </div>
    );
  }

  if (!article) {
    return (
      <h1 className="text-black mt-[50px] w-full text-center font-bold text-3xl">
        مقاله‌ای با این نام یافت نشد
      </h1>
    );
  }

  return (
    <div className="flex flex-col items-start w-[90%] mx-auto">
      <div className="mt-10 w-full">
        <SpecialArticleContainer
          imageTitle={article.titleImage}
          title={article.title}
          cats={article.cats}
          desc={article.desc}
          publishDate={article.publishDate}
          time={article.time}
          views={article.views}
          likes={article.likes}
          isSpecial={article.isSpecial}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between mt-8 w-full rounded-lg shadow-xl border border-slate-300 p-5 gap-5 sm:gap-0">
        <section className="flex flex-row items-center gap-x-2">
          <div
            style={{
              backgroundImage: `url(${article.publisherImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="rounded-full border border-slate-400 w-14 h-14"
          ></div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-slate-900">
              {article.publisherName}
            </span>
            <span className="text-md text-slate-600">{article.publisherTag}</span>
          </div>
        </section>
      </div>

      <div className="items-start mt-8 w-full rounded-lg shadow-xl border border-slate-300 p-5">
        <p className="text-justify text-lg leading-10">{article.content}</p>
        <div className="mt-5 border-r-4 border-amber-400 rounded-lg bg-amber-50 px-8 py-12">
          <h1 className="font-bold text-xl text-amber-950">نکته مهم:</h1>
          <h5 className="font-normal text-amber-700 mt-3">
            {article.importantText}
          </h5>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-5 mt-8 w-full rounded-lg shadow-xl border border-slate-300 p-5 justify-between text-center">
        <section className="hidden md:flex items-center gap-x-2">
          <ActionButton icon={<LuHeart size={20} />} text="پسندیدن ()" />
          <ActionButton icon={<FaRegComments size={20} />} text="نظرات (50)" />
          <ActionButton icon={<IoShareSocialOutline size={20} />} text="اشتراک گذاری" />
        </section>

        <button className="hidden md:flex items-center gap-x-2 text-white bg-black hover:bg-white hover:text-black transition-colors duration-150 rounded-lg border border-slate-300 p-3">
          <FaUser size={20} />
          دنبال کردن نویسنده
        </button>

        <section className="grid grid-cols-2 gap-2 md:hidden w-full">
          <ActionButton icon={<LuHeart size={20} />} text="پسندیدن (153)" />
          <ActionButton icon={<FaRegComments size={20} />} text="نظرات (50)" />
          <ActionButton icon={<IoShareSocialOutline size={20} />} text="اشتراک گذاری" />
          <button className="flex items-center justify-center gap-x-2 text-white bg-black hover:bg-white hover:text-black transition-colors duration-150 rounded-lg border border-slate-300 p-3 text-sm">
            <FaUser size={20} />
            دنبال کردن 
          </button>
        </section>
      </div>
    </div>
  );
}

const ActionButton = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <button className="flex items-center gap-x-2 justify-center hover:bg-slate-100 transition-colors duration-150 rounded-lg border border-slate-300 p-3 cursor-pointer text-sm">
    {icon}
    {text}
  </button>
);
