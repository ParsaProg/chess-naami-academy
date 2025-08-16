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
    downlaods: '',
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
      setFormData(prev => ({
        ...prev,
        pdfFile: e.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('subTitle', formData.subTitle);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('pages', formData.pages.toString());
      formDataToSend.append('size', formData.size);
      formDataToSend.append('level', formData.level);
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
            {/* سایر فیلدها مانند قبل... */}

            <div className="space-y-2 col-span-2">
              <label htmlFor="pdfFile" className="block text-sm font-medium text-gray-700 text-right">
                فایل PDF کتاب *
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
              <p className="text-xs text-gray-500 mt-1 text-right">فرمت مجاز: PDF - حداکثر حجم: 10MB</p>
            </div>
          </div>
        </div>

        {/* دکمه ارسال */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? 'در حال ارسال...' : 'ذخیره کتاب'}
          </button>
        </div>
      </form>
    </div>
  );
}