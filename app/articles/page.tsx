"use client";

import MainArticlesContainer from "@/components/ui/articles/mainArticlesContainer";
import SpecialArticleContainer from "@/components/ui/articles/special-articles-container";
import { ArticlesCategorysTitle } from "@/data/articlesCatsTitle";
import { useState } from "react";

export default function ArticlesPage() {
  const [selectedCat, setSelectedCat] = useState<number>(0);
  return (
    <div className="w-[85%] mt-[50px] mx-auto">
      <div className="special-container">
        <h1 className="flex font-bold text-3xl text-black">مقالات ویژه</h1>
        <div className="w-full flex mt-8 gap-x-5">
          <SpecialArticleContainer
            imageTitle="https://images.squarespace-cdn.com/content/v1/653fb5d32fff802e836e2b03/1698826828450-M5MJEVGULQBV5W8LVGIH/boy-in-thinking-on-the-next-move-in-the-chess-game.jpg"
            title="آموزش کامل گشایش‌های شطرنج از مبتدی یا پیشرفته"
            cats={["استراتژی", "مهره‌ها"]}
            desc="یادگیری اصول بنیادی گشایش‌های شطرنج و تکنیک‌های پیشرفته برای بهبود بازی"
            publishDate="7 آذر 1403"
            time="12 دقیقه"
            views="1054"
            likes="50"
          />
          <SpecialArticleContainer
            imageTitle="https://thumbs.dreamstime.com/b/cute-young-smart-boy-plays-chess-training-tournament-hand-makes-move-chessboard-chess-summer-camp-hobby-132042340.jpg"
            title="آموزش کامل گشایش‌های شطرنج از مبتدی یا پیشرفته"
            cats={["استراتژی", "مهره‌ها"]}
            desc="یادگیری اصول بنیادی گشایش‌های شطرنج و تکنیک‌های پیشرفته برای بهبود بازی"
            publishDate="7 آذر 1403"
            time="12 دقیقه"
            views="1054"
            likes="50"
          />
        </div>
      </div>
      <section className="flex items-center justify-start gap-x-3 mt-[50px]">
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
        <MainArticlesContainer
          cats={["آموزشی", "استراتژِی", "آموزشی"]}
          titleImage="https://thumbs.dreamstime.com/b/cute-young-smart-boy-plays-chess-training-tournament-hand-makes-move-chessboard-chess-summer-camp-hobby-132042340.jpg"
          titleText="راهنمای کامل گشایش‌های شطرنج: از مبتدی تا حرفه‌ای"
          time="۱۲ دقیقه"
          views="۲٬۳۴۵"
          publishDate="۱۵ آذر ۱۴۰۳"
          publisherImage="https://quera.org/media/CACHE/images/public/avatars/5b5d6e303d614937b5539e30ce425fd1/baa30572cb80be55e6229d37f113540e.jpg"
          publisherName="احمد محمدی"
          desc="یادگیری اصول بنیادی گشایش‌های شطرنج و تکنیک‌های پیشرفته برای بهبود بازی"
        />
        <MainArticlesContainer
          cats={["آموزشی", "استراتژِی", "آموزشی"]}
          titleImage="https://thumbs.dreamstime.com/b/cute-young-smart-boy-plays-chess-training-tournament-hand-makes-move-chessboard-chess-summer-camp-hobby-132042340.jpg"
          titleText="راهنمای کامل گشایش‌های شطرنج: از مبتدی تا حرفه‌ای"
          time="۱۲ دقیقه"
          views="۲٬۳۴۵"
          publishDate="۱۵ آذر ۱۴۰۳"
          publisherImage="https://quera.org/media/CACHE/images/public/avatars/5b5d6e303d614937b5539e30ce425fd1/baa30572cb80be55e6229d37f113540e.jpg"
          publisherName="احمد محمدی"
          desc="یادگیری اصول بنیادی گشایش‌های شطرنج و تکنیک‌های پیشرفته برای بهبود بازی"
        />
        <MainArticlesContainer
          cats={["آموزشی", "استراتژِی", "آموزشی"]}
          titleImage="https://thumbs.dreamstime.com/b/cute-young-smart-boy-plays-chess-training-tournament-hand-makes-move-chessboard-chess-summer-camp-hobby-132042340.jpg"
          titleText="راهنمای کامل گشایش‌های شطرنج: از مبتدی تا حرفه‌ای"
          time="۱۲ دقیقه"
          views="۲٬۳۴۵"
          publishDate="۱۵ آذر ۱۴۰۳"
          publisherImage="https://quera.org/media/CACHE/images/public/avatars/5b5d6e303d614937b5539e30ce425fd1/baa30572cb80be55e6229d37f113540e.jpg"
          publisherName="احمد محمدی"
          desc="یادگیری اصول بنیادی گشایش‌های شطرنج و تکنیک‌های پیشرفته برای بهبود بازی"
        />
        
      </div>
    </div>
  );
}
