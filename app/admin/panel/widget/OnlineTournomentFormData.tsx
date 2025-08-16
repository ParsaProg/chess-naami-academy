import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";

type TournamentFormData = {
  title: string;
  status: string;
  startTime: string;
  endTime: string;
  description: string;
  participants: number | string;
  ratingCategory: string;
  minRating: number | string;
  maxRating: number | string;
  lichessUrl: string;
};

const TournamentAdminPanel = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<TournamentFormData>({
    title: "",
    status: "",
    startTime: "",
    endTime: "",
    description: "",
    participants: "",
    ratingCategory: "",
    minRating: "",
    maxRating: "",
    lichessUrl: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/admin/api/online-tournoments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
        },
        body: JSON.stringify({
          ...formData,
          participants: Number(formData.participants),
          minRating: formData.minRating
            ? Number(formData.minRating)
            : undefined,
          maxRating: formData.maxRating
            ? Number(formData.maxRating)
            : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("خطا در ارسال اطلاعات");
      }

      toast.success("تورنمنت با موفقیت ایجاد شد!");
      setFormData({
        title: "",
        status: "",
        startTime: "",
        endTime: "",
        description: "",
        participants: "",
        ratingCategory: "",
        minRating: "",
        maxRating: "",
        lichessUrl: "",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`خطا: ${error.message}`);
      } else {
        toast.error("خطای ناشناخته رخ داده است");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-right">
        ایجاد تورنمنت جدید
      </h1>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {/* اطلاعات اصلی */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-right">
            اطلاعات اصلی
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 text-right"
              >
                عنوان تورنمنت *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                placeholder="عنوان تورنمنت"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 text-right"
              >
                وضعیت *
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
              >
                <option value="">انتخاب وضعیت</option>
                <option value="live">شروع شده</option>
                <option value="upcoming">آینده</option>
                <option value="finished">پایان یافته</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="startTime"
                className="block text-sm font-medium text-gray-700 text-right"
              >
                زمان شروع *
              </label>
              <input
                type="datetime-local"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="endTime"
                className="block text-sm font-medium text-gray-700 text-right"
              >
                زمان پایان *
              </label>
              <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="participants"
                className="block text-sm font-medium text-gray-700 text-right"
              >
                تعداد شرکت‌کنندگان *
              </label>
              <input
                type="number"
                id="participants"
                name="participants"
                value={formData.participants}
                onChange={handleNumberChange}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                placeholder="تعداد شرکت‌کنندگان"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="ratingCategory"
                className="block text-sm font-medium text-gray-700 text-right"
              >
                دسته‌بندی ریتینگ *
              </label>
              <select
                id="ratingCategory"
                name="ratingCategory"
                value={formData.ratingCategory}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
              >
                <option value="">انتخاب دسته‌بندی</option>
                <option value="classical">کلاسیک</option>
                <option value="rapid">رپید</option>
                <option value="blitz">بلیتز</option>
                <option value="bullet">بولت</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="minRating"
                className="block text-sm font-medium text-gray-700 text-right"
              >
                حداقل ریتینگ (اختیاری)
              </label>
              <input
                type="number"
                id="minRating"
                name="minRating"
                value={formData.minRating}
                onChange={handleNumberChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                placeholder="حداقل ریتینگ"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="maxRating"
                className="block text-sm font-medium text-gray-700 text-right"
              >
                حداکثر ریتینگ (اختیاری)
              </label>
              <input
                type="number"
                id="maxRating"
                name="maxRating"
                value={formData.maxRating}
                onChange={handleNumberChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                placeholder="حداکثر ریتینگ"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="lichessUrl"
                className="block text-sm font-medium text-gray-700 text-right"
              >
                لینک Lichess *
              </label>
              <input
                type="url"
                id="lichessUrl"
                name="lichessUrl"
                value={formData.lichessUrl}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                placeholder="https://lichess.org/tournament/..."
              />
            </div>
          </div>
        </div>

        {/* توضیحات */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-right">
            توضیحات
          </h2>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 text-right"
            >
              توضیحات تورنمنت *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
              placeholder="توضیحات کامل درباره تورنمنت"
            />
          </div>
        </div>

        {/* دکمه ارسال */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? "در حال ارسال..." : "ایجاد تورنمنت"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TournamentAdminPanel;
