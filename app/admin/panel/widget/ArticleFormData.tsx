// components/ArticleFormData.tsx
"use client";

import { useState, useRef, ChangeEvent } from "react";
import axios from "axios";
import Image from "next/image";

export default function ArticleUploadForm() {
  // State برای فیلدهای متنی
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    cats: [] as string[],
    importantText: "",
    desc: "",
    time: "",
    publishDate: new Date().toISOString().split('T')[0],
    publisherName: "",
    publisherTag: "",
    isSpecial: false,
  });

  // State برای فایل‌ها
  const [titleImage, setTitleImage] = useState<File | null>(null);
  const [publisherImage, setPublisherImage] = useState<File | null>(null);
  const [preview, setPreview] = useState({
    titleImage: "",
    publisherImage: "",
  });

  // State برای آپلود
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Refs برای inputهای فایل
  const titleImageRef = useRef<HTMLInputElement>(null);
  const publisherImageRef = useRef<HTMLInputElement>(null);

  // مدیریت تغییر فیلدهای متنی
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // مدیریت تغییر دسته‌بندی‌ها
  const handleCatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      cats: checked 
        ? [...prev.cats, value] 
        : prev.cats.filter(cat => cat !== value)
    }));
  };

  // مدیریت تغییر فایل‌ها
  const handleFileChange = (
    type: "titleImage" | "publisherImage",
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "titleImage") setTitleImage(file);
    else setPublisherImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(prev => ({ ...prev, [type]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  // ارسال فرم
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // اعتبارسنجی
    if (!titleImage || !publisherImage) {
      setMessage({ text: "هر دو تصویر الزامی هستند", type: "error" });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setMessage({ text: "", type: "" });

    const formDataToSend = new FormData();

    // افزودن فیلدهای متنی
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "cats") {
        formDataToSend.append(key, JSON.stringify(value));
      } else {
        formDataToSend.append(key, value as string);
      }
    });

    // افزودن فایل‌ها
    formDataToSend.append("titleImage", titleImage);
    formDataToSend.append("publisherImage", publisherImage);

    try {
      await axios.post("/admin/api/articles", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer mysecrettoken123"
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            setUploadProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          }
        },
      });

      setMessage({ text: "مقاله با موفقیت ذخیره شد!", type: "success" });
      
      // ریست فرم
      setFormData({
        title: "",
        content: "",
        cats: [],
        importantText: "",
        desc: "",
        time: "",
        publishDate: new Date().toISOString().split('T')[0],
        publisherName: "",
        publisherTag: "",
        isSpecial: false,
      });
      setTitleImage(null);
      setPublisherImage(null);
      setPreview({ titleImage: "", publisherImage: "" });
      if (titleImageRef.current) titleImageRef.current.value = "";
      if (publisherImageRef.current) publisherImageRef.current.value = "";

    } catch (error: unknown) {
      console.error("خطا در ارسال مقاله:", error);
      setMessage({
        text: "خطا در ارسال مقاله",
        type: "error"
      });
    } finally {
      setIsUploading(false);
    }
  };

  // لیست دسته‌بندی‌ها
  const categories = [
    "تکنولوژی",
    "سلامتی",
    "ورزش",
    "سیاست",
    "اقتصاد",
    "فرهنگ و هنر",
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        افزودن مقاله جدید
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* عنوان */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            عنوان مقاله *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* محتوا */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            محتوای مقاله *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={8}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* دسته‌بندی‌ها */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            دسته‌بندی‌ها *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={`cat-${category}`}
                  value={category}
                  checked={formData.cats.includes(category)}
                  onChange={handleCatsChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`cat-${category}`}
                  className="mr-2 text-sm text-gray-700"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* متن مهم */}
        <div>
          <label
            htmlFor="importantText"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            متن مهم *
          </label>
          <input
            id="importantText"
            name="importantText"
            type="text"
            value={formData.importantText}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* توضیحات کوتاه */}
        <div>
          <label
            htmlFor="desc"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            توضیحات کوتاه *
          </label>
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* زمان مطالعه */}
        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            زمان مطالعه (دقیقه) *
          </label>
          <input
            id="time"
            name="time"
            type="text"
            value={formData.time}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* تاریخ انتشار */}
        <div>
          <label
            htmlFor="publishDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            تاریخ انتشار *
          </label>
          <input
            id="publishDate"
            name="publishDate"
            type="date"
            value={formData.publishDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* نام ناشر */}
        <div>
          <label
            htmlFor="publisherName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            نام ناشر *
          </label>
          <input
            id="publisherName"
            name="publisherName"
            type="text"
            value={formData.publisherName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* تگ ناشر */}
        <div>
          <label
            htmlFor="publisherTag"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            تگ ناشر *
          </label>
          <input
            id="publisherTag"
            name="publisherTag"
            type="text"
            value={formData.publisherTag}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* مقاله ویژه */}
        <div className="flex items-center">
          <input
            id="isSpecial"
            name="isSpecial"
            type="checkbox"
            checked={formData.isSpecial}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, isSpecial: e.target.checked }))
            }
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isSpecial" className="mr-2 text-sm text-gray-700">
            مقاله ویژه
          </label>
        </div>

        {/* تصویر عنوان */}
        <div>
          <label
            htmlFor="titleImage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            تصویر عنوان *
          </label>
          <input
            id="titleImage"
            type="file"
            ref={titleImageRef}
            onChange={(e) => handleFileChange("titleImage", e)}
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {preview.titleImage && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">
                پیش نمایش تصویر عنوان:
              </p>
              <Image
                src={preview.titleImage}
                alt="Preview Title"
                className="max-w-full h-auto max-h-48 rounded-md border border-gray-200"
              />
            </div>
          )}
        </div>

        {/* تصویر ناشر */}
        <div>
          <label
            htmlFor="publisherImage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            تصویر ناشر
          </label>
          <input
            id="publisherImage"
            type="file"
            ref={publisherImageRef}
            onChange={(e) => handleFileChange("publisherImage", e)}
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {preview.publisherImage && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">
                پیش نمایش تصویر ناشر:
              </p>
              <Image
                src={preview.publisherImage}
                alt="Preview Publisher"
                className="max-w-full h-auto max-h-48 rounded-md border border-gray-200"
              />
            </div>
          )}
        </div>

        {/* نوار پیشرفت آپلود */}
        {isUploading && (
          <div className="pt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">
                پیشرفت آپلود: {uploadProgress}%
              </span>
              <span className="text-xs text-gray-500">
                {titleImage &&
                  Math.round(
                    (titleImage.size * (uploadProgress / 100)) / 1024
                  )}{" "}
                KB / {titleImage && Math.round(titleImage.size / 1024)} KB
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* پیام‌ها */}
        {message.text && (
          <div
            className={`p-3 rounded-md ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* دکمه ارسال */}
        <button
          type="submit"
          disabled={isUploading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isUploading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition-colors`}
        >
          {isUploading ? "در حال آپلود..." : "ذخیره مقاله"}
        </button>
      </form>
    </div>
  );
}