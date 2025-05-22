import Link from "next/link";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-medium text-gray-700 mb-2">
          صفحه مورد نظر یافت نشد
        </h2>
        <p className="text-gray-500 mb-6">
          به نظر می‌رسد صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            بازگشت
          </button>

          <Link
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}
