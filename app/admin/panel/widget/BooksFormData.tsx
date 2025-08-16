// app/admin/books/page.tsx
'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type BookFormData = {
  title: string;
  subTitle: string;
  author: string;
  pages: number | string;
  size: string;
  level: string;
  downlaods: string;
  pdfFile?: File | null;
  pdfLink?: string;
};

export default function BooksAdminPanel() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    subTitle: '',
    author: '',
    pages: '',
    size: '',
    level: '',
    downlaods: '0',
    pdfFile: null,
    pdfLink: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? '' : Number(value)
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setFormData(prev => ({
          ...prev,
          pdfFile: file,
          pdfLink: '' // Reset link if new file is uploaded
        }));
      } else {
        toast.error('لطفا فقط فایل PDF آپلود کنید');
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // اعتبارسنجی فیلدهای اجباری
    if (!formData.title || !formData.author || !formData.pdfFile) {
      toast.error('لطفا فیلدهای الزامی را پر کنید');
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('subTitle', formData.subTitle || '');
      formDataToSend.append('author', formData.author);
      formDataToSend.append('pages', formData.pages.toString());
      formDataToSend.append('size', formData.size || '0MB');
      formDataToSend.append('level', formData.level || 'مبتدی');
      formDataToSend.append('downlaods', formData.downlaods);
      
      if (formData.pdfFile) {
        formDataToSend.append('pdfFile', formData.pdfFile);
      }

      const response = await fetch('/admin/api/books', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'خطا در ارسال اطلاعات');
      }

      toast.success('کتاب با موفقیت اضافه شد!');
      router.push('/admin/books');
      router.refresh(); // برای بروزرسانی لیست کتاب‌ها
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error 
        ? error.message 
        : 'خطای ناشناخته در ارتباط با سرور');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-right">افزودن کتاب جدید</h1>
      
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {/* اطلاعات اصلی */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-right">اطلاعات اصلی کتاب</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 text-right">
                عنوان کتاب * <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                placeholder="عنوان کتاب"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subTitle" className="block text-sm font-medium text-gray-700 text-right">
                زیرعنوان
              </label>
              <input
                type="text"
                id="subTitle"
                name="subTitle"
                value={formData.subTitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                placeholder="زیرعنوان کتاب"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 text-right">
                نویسنده * <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                placeholder="نام نویسنده"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="pages" className="block text-sm font-medium text-gray-700 text-right">
                تعداد صفحات
              </label>
              <input
                type="number"
                id="pages"
                name="pages"
                value={formData.pages}
                onChange={handleNumberChange}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                placeholder="تعداد صفحات"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 text-right">
                حجم کتاب
              </label>
              <input
                type="text"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                placeholder="مثال: 5.2 مگابایت"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 text-right">
                سطح کتاب
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
              >
                <option value="">انتخاب سطح</option>
                <option value="مبتدی">مبتدی</option>
                <option value="متوسط">متوسط</option>
                <option value="پیشرفته">پیشرفته</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="downlaods" className="block text-sm font-medium text-gray-700 text-right">
                تعداد دانلودها
              </label>
              <input
                type="text"
                id="downlaods"
                name="downlaods"
                value={formData.downlaods}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                placeholder="مثال: 1000+"
              />
            </div>

            <div className="space-y-2 col-span-2">
              <label htmlFor="pdfFile" className="block text-sm font-medium text-gray-700 text-right">
                فایل PDF کتاب * <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="pdfFile"
                name="pdfFile"
                onChange={handleFileChange}
                accept=".pdf"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {formData.pdfFile && (
                <p className="text-sm text-green-600 mt-1 text-right">
                  فایل انتخاب شده: {formData.pdfFile.name}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1 text-right">فرمت مجاز: PDF - حداکثر حجم: 10MB</p>
            </div>
          </div>
        </div>

        {/* دکمه ارسال */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push('/admin/books')}
            className="px-6 py-3 bg-gray-300 text-gray-800 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            انصراف
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                در حال ارسال...
              </span>
            ) : 'ذخیره کتاب'}
          </button>
        </div>
      </form>
    </div>
  );
}