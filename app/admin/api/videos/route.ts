// app/admin/api/videos/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Video from "@/models/Videos";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: '10mb'
  },
};

// تابع کمکی برای ذخیره عکس پوستر
async function savePosterImage(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `video_poster_${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
  const uploadDir = path.join(process.cwd(), 'public/uploads/videos');

  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, filename);
  await writeFile(filePath, buffer);
  return `/uploads/videos/${filename}`;
}

// GET: دریافت همه ویدیوها
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
    
    const videos = await Video.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(videos);

  } catch (error: unknown) {
    console.error("خطا در دریافت ویدیوها:", error);
    return NextResponse.json(
      [],
      { status: 500 }
    );
  }
}

// POST: ایجاد ویدیو جدید
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
    const level = formData.get("level") as string;
    const time = formData.get("time") as string;
    const views = formData.get("views") as string;
    const publisher = formData.get("publisher") as string;
    const videoLink = formData.get("videoLink") as string;

    // دریافت فایل پوستر
    const posterImageFile = formData.get("posterImage") as File;

    // اعتبارسنجی فیلدهای اجباری
    if (!title || !level || !time || !views || !publisher || !videoLink || !posterImageFile) {
      return NextResponse.json(
        { success: false, message: "تمام فیلدهای اجباری باید پر شوند" },
        { status: 400 }
      );
    }

    // آپلود عکس پوستر
    const posterImagePath = await savePosterImage(posterImageFile);

    // ایجاد ویدیو جدید
    const newVideo = await Video.create({
      title,
      level,
      time,
      views,
      publisher,
      videoLink,
      posterImage: posterImagePath
    });

    return NextResponse.json(
      { success: true, data: newVideo },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error("خطا در ایجاد ویدیو:", error);
    return NextResponse.json(
      { 
        success: false,
        message: "خطای سرور در ایجاد ویدیو"
      },
      { status: 500 }
    );
  }
}