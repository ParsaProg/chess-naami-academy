// app/admin/api/articles/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Article from "@/models/Article";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: '10mb'
  },
};

// تابع کمکی برای ذخیره فایل
async function saveUploadedFile(file: File, subfolder: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${subfolder}_${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
  const uploadDir = path.join(process.cwd(), 'public/uploads');

  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, filename);
  await writeFile(filePath, buffer);
  return `/uploads/${filename}`;
}

// GET: دریافت همه مقالات
export async function GET(req: NextRequest) {
  // احراز هویت
  const token = req.headers.get('Authorization')?.split(' ')[1];
  if (token !== 'mysecrettoken123') {
    return NextResponse.json(
      { success: false, message: "دسترسی غیرمجاز" },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();
    
    // دریافت تمام مقالات به صورت مستقیم (بدون ساختار data تودرتو)
    const articles = await Article.find({})
      .sort({ createdAt: -1 })
      .lean();

    // پاسخ به همان شکل مورد انتظار صفحه مقالات
    return NextResponse.json(articles);

  } catch (error: unknown) {
    console.error("خطا در دریافت مقالات:", error);
    return NextResponse.json(
      [], // بازگرداندن آرایه خالی در صورت خطا
      { status: 500 }
    );
  }
}
// POST: ساخت مقاله جدید
export async function POST(req: NextRequest) {
  // احراز هویت
  const token = req.headers.get('Authorization')?.split(' ')[1];
  if (token !== 'mysecrettoken123') {
    return NextResponse.json(
      { success: false, message: "دسترسی غیرمجاز" },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();
    const formData = await req.formData();

    // دریافت فیلدهای متنی
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const cats = JSON.parse(formData.get("cats") as string) as string[];
    const importantText = formData.get("importantText") as string;
    const desc = formData.get("desc") as string;
    const time = formData.get("time") as string;
    const publishDate = formData.get("publishDate") as string;
    const publisherName = formData.get("publisherName") as string;
    const publisherTag = formData.get("publisherTag") as string;
    const isSpecial = formData.get("isSpecial") === "true";

    // دریافت فایل‌ها
    const titleImageFile = formData.get("titleImage") as File;
    const publisherImageFile = formData.get("publisherImage") as File;

    // اعتبارسنجی فیلدهای اجباری
    if (!title || !content || !cats || !importantText || !desc || !time || 
        !publishDate || !publisherName || !publisherTag || !titleImageFile || !publisherImageFile) {
      return NextResponse.json(
        { success: false, message: "تمام فیلدهای اجباری باید پر شوند" },
        { status: 400 }
      );
    }

    // آپلود همزمان دو تصویر
    const [titleImagePath, publisherImagePath] = await Promise.all([
      saveUploadedFile(titleImageFile, 'title'),
      saveUploadedFile(publisherImageFile, 'publisher')
    ]);

    // ایجاد مقاله جدید
    const newArticle = await Article.create({
      title,
      content,
      cats,
      titleImage: titleImagePath,
      views: "0",
      likes: "0",
      importantText,
      desc,
      time,
      publishDate,
      publisherName,
      publisherImage: publisherImagePath,
      publisherTag,
      comments: "0",
      isSpecial,
    });

    return NextResponse.json(
      { success: true, data: newArticle },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error("خطا در ایجاد مقاله:", error);
    return NextResponse.json(
      { 
        success: false,
      },
      { status: 500 }
    );
  }
}