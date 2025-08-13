// components/PuzzleFormData.tsx
"use client";

import { useState, useRef, ChangeEvent } from "react";
import axios from "axios";
import Image from "next/image";

export default function PuzzleUploadForm() {
  // State for text fields
  const [formData, setFormData] = useState({
    title: "",
    level: "easy",
    rating: 3,
    solved: 0,
    cats: [] as string[],
    answers: ["", "", "", ""],
    correctAnswer: "",
  });

  // State for files
  const [puzzleImage, setPuzzleImage] = useState<File | null>(null);
  const [preview, setPreview] = useState({
    puzzleImage: "",
  });

  // State for upload
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Refs for file inputs
  const puzzleImageRef = useRef<HTMLInputElement>(null);

  // Categories for puzzles
  const puzzleCategories = [
    "ریاضی",
    "منطق",
    "هوش",
    "تصویری",
    "کلمه",
    "عدد",
  ];

  // Handle text input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle category changes
  const handleCatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      cats: checked 
        ? [...prev.cats, value] 
        : prev.cats.filter(cat => cat !== value)
    }));
  };

  // Handle answer changes
  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...formData.answers];
    newAnswers[index] = value;
    setFormData(prev => ({ ...prev, answers: newAnswers }));
  };

  // Handle file changes
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPuzzleImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(prev => ({ ...prev, puzzleImage: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!puzzleImage) {
      setMessage({ text: "تصویر پازل الزامی است", type: "error" });
      return;
    }

    if (formData.answers.some(answer => answer.trim() === "")) {
      setMessage({ text: "تمام گزینه‌های پاسخ باید پر شوند", type: "error" });
      return;
    }

    if (!formData.correctAnswer) {
      setMessage({ text: "لطفاً پاسخ صحیح را انتخاب کنید", type: "error" });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setMessage({ text: "", type: "" });

    const formDataToSend = new FormData();

    // Add text fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "cats" || key === "answers") {
        formDataToSend.append(key, JSON.stringify(value));
      } else {
        formDataToSend.append(key, value as string);
      }
    });

    // Add file
    formDataToSend.append("puzzleImage", puzzleImage);

    try {
      await axios.post("/admin/api/puzzles", formDataToSend, {
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

      setMessage({ text: "پازل با موفقیت ذخیره شد!", type: "success" });
      
      // Reset form
      setFormData({
        title: "",
        level: "easy",
        rating: 3,
        solved: 0,
        cats: [],
        answers: ["", "", "", ""],
        correctAnswer: "",
      });
      setPuzzleImage(null);
      setPreview({ puzzleImage: "" });
      if (puzzleImageRef.current) puzzleImageRef.current.value = "";

    } catch (error: unknown) {
      console.error("خطا در ارسال پازل:", error);
      setMessage({
        text: "خطا در ارسال پازل",
        type: "error"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        افزودن پازل جدید
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* عنوان */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            عنوان پازل *
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

        {/* سطح دشواری */}
        <div>
          <label
            htmlFor="level"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            سطح دشواری *
          </label>
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="easy">آسان</option>
            <option value="medium">متوسط</option>
            <option value="hard">سخت</option>
          </select>
        </div>

        {/* امتیاز */}
        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            امتیاز (۱ تا ۵) *
          </label>
          <input
            id="rating"
            name="rating"
            type="number"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* تعداد حل‌شده */}
        <div>
          <label
            htmlFor="solved"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            تعداد حل‌شده
          </label>
          <input
            id="solved"
            name="solved"
            type="number"
            min="0"
            value={formData.solved}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* دسته‌بندی‌ها */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            دسته‌بندی‌ها *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {puzzleCategories.map((category) => (
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

        {/* گزینه‌های پاسخ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            گزینه‌های پاسخ *
          </label>
          <div className="space-y-2">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`correctAnswer-${index}`}
                  name="correctAnswer"
                  value={index}
                  checked={formData.correctAnswer === index.toString()}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={formData.answers[index]}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder={`گزینه ${index + 1}`}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ))}
          </div>
        </div>

        {/* تصویر پازل */}
        <div>
          <label
            htmlFor="puzzleImage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            تصویر پازل *
          </label>
          <input
            id="puzzleImage"
            type="file"
            ref={puzzleImageRef}
            onChange={handleFileChange}
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {preview.puzzleImage && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">
                پیش نمایش تصویر پازل:
              </p>
              <Image
                src={preview.puzzleImage}
                alt="Preview Puzzle"
                width={300}
                height={200}
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
                {puzzleImage &&
                  Math.round(
                    (puzzleImage.size * (uploadProgress / 100)) / 1024
                  )}{" "}
                KB / {puzzleImage && Math.round(puzzleImage.size / 1024)} KB
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
          {isUploading ? "در حال آپلود..." : "ذخیره پازل"}
        </button>
      </form>
    </div>
  );
}