"use client";

import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import ConfirmAlert from "@/components/ui/dialogs/ConfirmAlert";

const tabs = [
  "مقالات",
  "مسابقات آنلاین",
  "ویدیو‌های آموزشی",
  "کتابخانه",
  "پازل‌ها",
];

const RemoveDataFromApiListWidget = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [articleData, setArticleData] = useState([]);
  const getArticleData = async () => {
    const res = await fetch("/admin/api/articles/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN!}`,
      },
    });
    const mainArticles = await res.json();
    setArticleData(mainArticles);
  };
  useEffect(() => {
    getArticleData();
  }, []);
  const changeTab = (_I: number) => {
    setSelectedTab(_I);
  };
  return (
    <div className="w-full mt-5 px-2 sm:mr-5">
      <section className="flex items-center gap-3 flex-wrap">
        {tabs.map((tab, index) => {
          return (
            <div
              onClick={() => changeTab(index)}
              key={index}
              className={`${selectedTab === index ? "bg-purple-700 text-white" : "text-neutral-800 bg-slate-100"} rounded-lg px-3 py-2 transition-all duration-200 font-bold`}
            >
              {tab}
            </div>
          );
        })}
      </section>
      <section className="w-full">
        {selectedTab === 0 ? (
          <ArticleSection
            articleData={articleData}
            getArticleData={getArticleData}
          />
        ) : null}
      </section>
    </div>
  );
};

export default RemoveDataFromApiListWidget;

const ArticleSection = ({
  articleData,
  getArticleData,
}: {
  articleData: Array<any>;
  getArticleData: () => void;
}) => {
  const [confirmItem, setConfirmItem] = useState<any>(null);

  const removeArticle = async (id: string) => {
    const res = await fetch(`/admin/api/articles/${String(id)}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN!}`,
      },
    });
    if (res.ok) {
      toast.success("مقاله با موفقیت حذف شد!");
      getArticleData();
    }
  };

  const handleConfirmDelete = () => {
    if (confirmItem) {
      const id = confirmItem._id ?? confirmItem.id;
      if (id) removeArticle(String(id));
    }
    setConfirmItem(null);
  };

  return (
    <div className="w-full mt-8">
      <h1 className="font-bold text-black sm:text-2xl text-lg">
        حذف مقاله مورد نظر
      </h1>
      {articleData.length !== 0 ? (
        <div className="mt-3 m:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid grid-cols-1 w-full gap-5">
          {articleData.map((item, _i) => {
            return (
              <div
                key={_i}
                className="border border-neutral-300 overflow-hidden rounded-lg pb-3 w-full"
              >
                <div
                  className="w-full h-[200px]"
                  style={{
                    backgroundImage: `url(${item["titleImage"]!})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <h1 className="mt-3 mx-3 font-bold ">{item["title"]!}</h1>
                <motion.button
                  onClick={() => setConfirmItem(item)}
                  whileTap={{ scale: 0.95 }}
                  className="mt-3 rounded-md text-center bg-red-100 text-red-600 flex items-center gap-x-1 p-2 mx-3 text-sm"
                >
                  <BsTrash size={17} />
                  حذف این مقاله
                </motion.button>
              </div>
            );
          })}
        </div>
      ) : (
        <h1 className="mt-5 text-black text-md">
          در حال دریافت اطلاعات مقاله...
        </h1>
      )}
      <ConfirmAlert
        show={!!confirmItem}
        onClose={() => setConfirmItem(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
