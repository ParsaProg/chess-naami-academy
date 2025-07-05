"use client";

import SpecialArticleContainer from "@/components/ui/articles/special-articles-container";
import "../../../styles/loaderSpinner.css";
import { LuHeart } from "react-icons/lu";
import { FaRegComments } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";

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
  let pathParts = null;
  let id = "";
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [article, setArticle] = useState<Article>();

  // when the page loads, fetch the articl data
  useEffect(() => {
    pathParts = window.location.pathname.split("/");
    id = decodeURIComponent(pathParts[pathParts.length - 1]);
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
        const mainArticle = data.filter((article: Article) => article.title === id);
        setArticle(mainArticle[0]);
      } catch (error) {
        console.error("Error fetching article data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return !isLoading && article ? (
    <div className="flex flex-col items-start w-[90%] mx-auto">
      <div className="mt-10 w-full">
        <SpecialArticleContainer
          imageTitle={article.titleImage}
          title={article.title}
          cats={article.cats}
          desc={article.content}
          publishDate={article.publishDate}
          time={article.time}
          views={article.views}
          likes={article.likes}
          isSpecial={article.isSpecial}
        />
      </div>
      <div className="flex [@media(max-width:940px)]:flex-col [@media(max-width:940px)]:gap-y-5 [@media(max-width:940px)]:items-start items-center justify-between mt-8 w-full rounded-lg shadow-xl border-[1px] border-slate-300 p-[20px]">
        <section className="flex flex-row items-center gap-x-2">
          <div
            style={{
              backgroundImage: `url(${article.publisherImage})`,
              backgroundSize: "cover",
              backgroundPosition: "cenetr",
              backgroundRepeat: "no-repeat",
            }}
            className="rounded-full border-[1px] border-slate-400 w-14 h-14 "
          ></div>
          <div className="flex flex-col">
            <span className="text-lg font-[600] text-slate-900">
              {article.publisherName}
            </span>
            <span className="text-md text-slate-600">
              {article.publisherTag}
            </span>
          </div>
        </section>
      </div>
      <div className="items-start mt-8 w-full rounded-lg shadow-xl border-[1px] border-slate-300 p-[20px]">
        <p className="text-justify text-lg leading-[40px]">{article.desc}</p>
        <div className="mt-5 border-r-4 border-r-[#FBBF24] rounded-lg bg-[#FFFBEB] px-8 py-[50px]">
          <h1 className="font-bold text-xl text-amber-950">نکته مهم:</h1>
          <h5 className="font-[400] text-amber-700 mt-3">
            {article.importantText}
          </h5>
        </div>
      </div>
      <div className="[@media(max-width:792px)]:justify-center text-center flex items-center gap-5 mt-8 w-full rounded-lg shadow-xl border-[1px] border-slate-300 p-[20px] justify-between">
        <section className="flex items-center gap-x-5 [@media(max-width:792px)]:hidden">
          <button className="justify-center hover:bg-slate-100 transition-colors duration-150 cursor-pointer rounded-lg border-[1px] border-slate-300 p-3 flex items-center gap-x-2">
            <LuHeart size={20} />
            پسندیدن (153)
          </button>
          <button className="justify-center hover:bg-slate-100 transition-colors duration-150 cursor-pointer rounded-lg border-[1px] border-slate-300 p-3 flex items-center gap-x-2">
            <FaRegComments size={20} />
            نظرات (50)
          </button>
          <button className="justify-center hover:bg-slate-100 transition-colors duration-150 cursor-pointer rounded-lg border-[1px] border-slate-300 p-3 flex items-center gap-x-2">
            <IoShareSocialOutline size={20} />
            اشتراک گذاری
          </button>
        </section>
        <button className="[@media(max-width:792px)]:hidden justify-center hover:bg-white hover:text-black text-white bg-black transition-colors duration-150 cursor-pointer rounded-lg border-[1px] border-slate-300 p-3 flex items-center gap-x-2">
          <FaUser size={20} />
          دنبال کردن نویسنده
        </button>
        <section className="w-full m-auto justify-center grid grid-cols-2 gap-5 items-center gap-x-5 [@media(min-width:792px)]:hidden">
          <button className="justify-center hover:bg-slate-100 transition-colors duration-150 cursor-pointer rounded-lg border-[1px] border-slate-300 p-3 flex items-center gap-x-2">
            <LuHeart size={20} />
            پسندیدن (153)
          </button>
          <button className="justify-center hover:bg-slate-100 transition-colors duration-150 cursor-pointer rounded-lg border-[1px] border-slate-300 p-3 flex items-center gap-x-2">
            <FaRegComments size={20} />
            نظرات (50)
          </button>
          <button className="justify-center hover:bg-slate-100 transition-colors duration-150 cursor-pointer rounded-lg border-[1px] border-slate-300 p-3 flex items-center gap-x-2">
            <IoShareSocialOutline size={20} />
            اشتراک گذاری
          </button>
          <button className="justify-center hover:bg-white hover:text-black text-white bg-black transition-colors duration-150 cursor-pointer rounded-lg border-[1px] border-slate-300 p-3 flex items-center gap-x-2">
            <FaUser size={20} />
            دنبال کردن نویسنده
          </button>
        </section>
      </div>
    </div>
  ) : !isLoading ? (
    <h1 className="text-black mt-[50px] w-full text-center font-bold text-3xl ">
      مقاله‌ای با این نام یافت نشد
    </h1>
  ) : (
    <div className="flex items-center justify-center w-[100%] mx-auto">
      <span className="loader mt-[50px] mx-auto"></span>
    </div>
  );
}
