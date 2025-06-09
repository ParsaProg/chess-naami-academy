import SpecialArticleContainer from "@/components/ui/articles/special-articles-container";

export default function ArticlesPage() {
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
    </div>
  );
}
