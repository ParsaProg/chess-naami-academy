// components/admin/VideoForm.tsx
"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

type VideoFormData = {
  title: string;
  level: string;
  time: string;
  views: string;
  publisher: string;
  videoLink: string;
  posterImage: FileList | null;
};

export default function VideoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<VideoFormData>();

  const posterImage = watch("posterImage");

  // پیش‌نمایش عکس
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setValue("posterImage", e.target.files);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmit: SubmitHandler<VideoFormData> = async (data) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // اضافه کردن فیلدهای متنی
      formData.append("title", data.title);
      formData.append("level", data.level);
      formData.append("time", data.time);
      formData.append("views", data.views);
      formData.append("publisher", data.publisher);
      formData.append("videoLink", data.videoLink);

      // اضافه کردن فایل
      if (data.posterImage && data.posterImage[0]) {
        formData.append("posterImage", data.posterImage[0]);
      }

      // ارسال درخواست با توکن ثابت
      const response = await axios.post("/admin/api/videos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer mysecrettoken123", // توکن ثابت
        },
      });

      if (response.data.success) {
        toast.success("ویدیو با موفقیت اضافه شد");
        reset();
        setPreviewImage(null);
      }
    } catch (error) {
      console.error("خطا در ارسال فرم:", error);
      toast.error("خطا در ارسال فرم");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        افزودن ویدیو جدید
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* فیلد عنوان */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            عنوان ویدیو
          </label>
          <input
            id="title"
            type="text"
            {...register("title", { required: "عنوان ویدیو الزامی است" })}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* فیلد سطح */}
        <div>
          <label
            htmlFor="level"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            سطح
          </label>
          <select
            id="level"
            {...register("level", { required: "انتخاب سطح الزامی است" })}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.level ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">انتخاب کنید</option>
            <option value="مقدماتی">مقدماتی</option>
            <option value="متوسط">متوسط</option>
            <option value="پیشرفته">پیشرفته</option>
          </select>
          {errors.level && (
            <p className="mt-1 text-sm text-red-600">{errors.level.message}</p>
          )}
        </div>

        {/* فیلد زمان */}
        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            مدت زمان (مثال: ۱:۲۳:۴۵)
          </label>
          <input
            id="time"
            type="text"
            {...register("time", { required: "مدت زمان الزامی است" })}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.time ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.time && (
            <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
          )}
        </div>

        {/* فیلد تعداد بازدیدها */}
        <div>
          <label
            htmlFor="views"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            تعداد بازدیدها
          </label>
          <input
            id="views"
            type="text"
            {...register("views", { required: "تعداد بازدیدها الزامی است" })}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.views ? "border-red-500" : "border-gray-300"
            }`}
            defaultValue="0"
          />
          {errors.views && (
            <p className="mt-1 text-sm text-red-600">{errors.views.message}</p>
          )}
        </div>

        {/* فیلد منتشرکننده */}
        <div>
          <label
            htmlFor="publisher"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            نام منتشرکننده
          </label>
          <input
            id="publisher"
            type="text"
            {...register("publisher", {
              required: "نام منتشرکننده الزامی است",
            })}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.publisher ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.publisher && (
            <p className="mt-1 text-sm text-red-600">
              {errors.publisher.message}
            </p>
          )}
        </div>

        {/* فیلد لینک ویدیو */}
        <div>
          <label
            htmlFor="videoLink"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            لینک ویدیو (YouTube, Vimeo, etc.)
          </label>
          <input
            id="videoLink"
            type="url"
            {...register("videoLink", { required: "لینک ویدیو الزامی است" })}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.videoLink ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.videoLink && (
            <p className="mt-1 text-sm text-red-600">
              {errors.videoLink.message}
            </p>
          )}
        </div>

        {/* فیلد آپلود عکس پوستر */}
        <div>
          <label
            htmlFor="posterImage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            عکس پوستر
          </label>

          <input
            id="posterImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          <label
            htmlFor="posterImage"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
          >
            {posterImage?.[0]?.name || "انتخاب فایل"}
          </label>

          {errors.posterImage && (
            <p className="mt-1 text-sm text-red-600">عکس پوستر الزامی است</p>
          )}

          {/* پیش‌نمایش عکس */}
          {previewImage && (
            <div className="mt-2">
              <img
                src={previewImage}
                alt="پیش‌نمایش عکس پوستر"
                className="h-40 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        {/* دکمه ارسال */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "در حال ارسال..." : "ذخیره ویدیو"}
          </button>
        </div>
      </form>
    </div>
  );
}
