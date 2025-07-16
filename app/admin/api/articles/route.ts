// app/api/articles/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Article from "@/models/Article";
import { checkAuth } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: '100mb' // افزایش محدودیت حجم برای آپلود فایل
  },
};

// تابع کمکی برای ذخیره فایل
async function saveUploadedFile(file: File, subfolder: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${subfolder}_${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
  const uploadDir = path.join(process.cwd(), 'public/uploads');

  // ایجاد دایرکتوری اگر وجود نداشته باشد
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, filename);
  await writeFile(filePath, buffer);
  return `/uploads/${filename}`;
}

// GET: دریافت همه مقالات
export async function GET(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  try {
    await connectToDatabase();
    const articles = await Article.find().sort({ createdAt: -1 });
    return NextResponse.json(articles);
  } catch (error: any) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { 
        message: "Internal server error",
        error: process.env.NODE_ENV === 'development' ? error.message : null
      },
      { status: 500 }
    );
  }
}

// POST: ساخت مقاله جدید
export async function POST(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  try {
    await connectToDatabase();
    const formData = await req.formData();

    // اعتبارسنجی فیلدهای اجباری
    const requiredFields = [
      'title', 'content', 'cats', 'importantText', 
      'desc', 'time', 'publishDate', 'publisherName',
      'publisherTag', 'titleImage'
    ];
    
    const missingFields = requiredFields.filter(field => !formData.get(field));
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          message: "تمام فیلدهای اجباری باید پر شوند",
          missingFields
        },
        { status: 400 }
      );
    }

    // پردازش فیلدها
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
    const titleImageFile = formData.get("titleImage") as File;
    const publisherImageFile = formData.get("publisherImage") as File | null;

    // اعتبارسنجی نوع فایل
    if (!titleImageFile.type.startsWith('image/')) {
      return NextResponse.json(
        { message: "فایل تصویر عنوان باید یک تصویر معتبر باشد" },
        { status: 400 }
      );
    }

    // آپلود فایل‌ها
    const [titleImagePath, publisherImagePath] = await Promise.all([
      saveUploadedFile(titleImageFile, 'title'),
      publisherImageFile ? saveUploadedFile(publisherImageFile, 'publisher') : Promise.resolve('')
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
      publisherImage: publisherImagePath || undefined,
      publisherTag,
      comments: "0",
      isSpecial,
    });

    return NextResponse.json(newArticle, { status: 201 });

  } catch (error: any) {
    console.error("Error in POST /api/articles:", error);
    
    let errorMessage = "خطای سرور داخلی";
    let statusCode = 500;
    
    if (error instanceof SyntaxError) {
      errorMessage = "فرمت داده ارسالی نامعتبر است";
      statusCode = 400;
    } else if (error.name === 'ValidationError') {
      errorMessage = "داده‌های ارسالی معتبر نیستند";
      statusCode = 400;
    } else if (error.code === 'LIMIT_FILE_SIZE') {
      errorMessage = "حجم فایل ارسالی بیش از حد مجاز است";
      statusCode = 413;
    }

    return NextResponse.json(
      { 
        message: errorMessage,
        ...(process.env.NODE_ENV === 'development' && { 
          error: error.message,
          stack: error.stack 
        })
      },
      { status: statusCode }
    );
  }
}