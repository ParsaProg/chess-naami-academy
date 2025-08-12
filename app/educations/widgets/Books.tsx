import { FaBookOpen } from "react-icons/fa6";
import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

interface BooksDataSchema {
  title: string;
  subTitle: string;
  author: string;
  pages: number;
  size: string;
  level: string;
  downlaods: string;
  pdfLink: string;
}

interface BooksContainerDataSchema {
  title: string;
  subTitle: string;
  author: string;
  pages: number;
  size: string;
  level: string;
  downlaods: string;
  pdfLink: string;
  handleDownload: (value: string) => void
}

export default function Books() {
  const [booksData, setBooksData] = useState<BooksDataSchema[]>([]);
  useEffect(() => {
    const booksDataItems = localStorage.getItem("booksDataEducation");
    const parsedBooks = booksDataItems ? JSON.parse(booksDataItems) : [];
    setBooksData(parsedBooks);
    const getVideosData = async () => {
      try {
        if (booksData.length === 0) {
          const response = await fetch("/admin/api/books", {
            method: "GET",
            headers: {
              Authorization: `Bearer mysecrettoken123`,
            },
          });
          const bookData = await response.json();
          if (booksDataItems !== bookData) {
            setBooksData(bookData);
            localStorage.setItem(
              "booksDataEducation",
              JSON.stringify(bookData)
            );
          }
        }
      } catch (error: unknown) {
        console.log(error);
      }
    };
    getVideosData();
  }, [booksData.length]);
  const handleDownload = (pdfLink: string) => {
    const link = document.createElement("a");
    link.href = pdfLink;
    link.download = "book.pdf"; // or extract filename from URL
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full mt-8">
      <h1 className="font-bold text-black text-2xl">کتاب‌های رایگان</h1>
      <h3 className="mt-2 text-slate-600 text-lg font-[400]">
        مجموعه‌ای از بهترین کتاب‌های شطرنج به صورت رایگان
      </h3>
      <div className="flex items-center gap-8 flex-wrap mt-8">
        {booksData.map((val, _i) => {
          return (
            <BookContainer
              title={val.title}
              pdfLink={val.pdfLink}
              subTitle={val.subTitle}
              downlaods={val.downlaods}
              author={val.author}
              level={val.level}
              pages={val.pages}
              size={val.size}
              handleDownload={handleDownload}
              key={_i}
            />
          );
        })}
      </div>
    </div>
  );
}

function BookContainer({
  title,
  subTitle,
  author,
  downlaods,
  level,
  pages,
  pdfLink,
  size,
  handleDownload
}: BooksContainerDataSchema) {
  return (
    <div className="shadow-xl rounded-lg border-[1px] border-slate-200 w-[550px] p-5">
      <div className="flex items-center justify-between gap-x-3">
        <section className="flex flex-col items-start">
          <h1 className="font-bold text-xl text-black">{title}</h1>
          <h3 className="font-[400] text-lg text-slate-600 mt-1">{subTitle}</h3>
        </section>
        <div className="bg-gradient-to-tl from-blue-600 to-purple-600 text-3xl text-white flex items-center justify-center p-5 rounded-full">
          <FaBookOpen size={60} className="size-6" />
        </div>
      </div>
      <div className="mt-3 flex-wrap flex items-center gap-x-3 text-slate-600">
        <h5 className="">نوسینده: {author}</h5>
        <h5 className="">{pages} صفحه</h5>
        <h5 className="">{size} مگابایت</h5>
      </div>
      <div className="flex items-center justify-between mt-2">
        <section className="flex items-center gap-x-1">
          <div className="flex items-center gap-x-1">
            {["f", "f", "f", "f", "u"].map((v, _i) => {
              return v === "f" ? (
                <TiStarFullOutline color="#FACC15" key={_i} size={20} />
              ) : (
                <TiStarOutline key={_i} size={20} />
              );
            })}
          </div>

          <h1 className="mt-1 text-black text-md font-bold">{level}</h1>
        </section>
        <section className="flex items-center text-slate-600 gap-x-2">
          <MdOutlineFileDownload size={20} />
          {downlaods} دانلود
        </section>
      </div>
      <div className="w-[100%] mt-5 flex items-center gap-x-3">
        <button
          onClick={() => handleDownload(pdfLink)}
          className="transition-colors duration-100 hover:bg-slate-800 gap-x-2 cursor-pointer w-[100%] py-3 text-white bg-slate-950 rounded-lg flex items-center justify-center"
        >
          <MdOutlineFileDownload size={20} />
          دانلود رایگان
        </button>
        <a
          target="_blank"
          download={`${title}.pdf`}
          href={pdfLink}
          className="cursor-pointer transition-colors duration-100 hover:bg-slate-200 p-3 rounded-lg border-[1px] border-slate-200 flex items-center text-center text-black gap-x-2 justify-center"
        >
          <IoEyeOutline size={20} />
        </a>
      </div>
    </div>
  );
}
