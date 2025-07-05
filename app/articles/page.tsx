"use client";

import MainArticlesContainer from "@/components/ui/articles/mainArticlesContainer";
import SpecialArticleContainer from "@/components/ui/articles/special-articles-container";
import { ArticlesCategorysTitle } from "@/data/articlesCatsTitle";
import { useEffect, useState } from "react";

type Article = {
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
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState<number>(0);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/admin/api/articles", {
          headers: {
            Authorization: "Bearer mysecrettoken123",
          },
        });
        if (!res.ok) throw new Error("Unauthorized or server error");
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.error("❌ Error loading articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);
  return (
    <div className="w-[85%] mt-[50px] mx-auto">
      <div className="special-container">
        <h1 className="flex font-bold text-3xl text-black">مقالات ویژه</h1>
        <div className="w-full flex [@media(max-width:940px)]:flex-col gap-y-3 mt-8 gap-x-5">
          {articles.some((article) => article.isSpecial) ? (
            articles
              .filter((article) => article.isSpecial)
              .map((article) => (
                <SpecialArticleContainer
                  key={article._id}
                  imageTitle={article.titleImage}
                  title={article.title}
                  cats={article.cats}
                  desc={article.desc}
                  publishDate={article.publishDate}
                  time={article.time}
                  views={article.views}
                  likes={article.likes}
                />
              ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <section className="overflow-x-scroll flex items-center justify-start gap-x-3 mt-[50px]">
        {ArticlesCategorysTitle.map((val, index) => (
          <div
            onClick={() => setSelectedCat(index)}
            key={index}
            className={`transition-all duration-200 hover:bg-black hover:text-white py-2 px-3 cursor-pointer rounded-full border-[1px] border-slate-300 text-black ${
              selectedCat === index && "bg-black text-white"
            }`}
          >
            {val}
          </div>
        ))}
      </section>
      <section className="flex items-center justify-between mt-8">
        <h1 className="font-bold text-2xl text-black">تمام مقالات</h1>
        <h3 className="font-[500] text-black text-lg">6 مقاله</h3>
      </section>
      <div className="flex flex-col items-start w-full">
        {articles.map((article, _index) => (
          <MainArticlesContainer
            key={article._id}
            cats={article.cats}
            titleImage={article.titleImage}
            titleText={article.title}
            time={article.time}
            views={article.views}
            publishDate={article.publishDate}
            publisherImage={article.publisherImage}
            publisherName={article.publisherName}
            desc={article.desc}
          />
        ))}
      </div>
    </div>
  );
}
