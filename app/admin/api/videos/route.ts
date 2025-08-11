// app/api/admin/videos/route.ts
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

export async function GET(req: NextRequest) {
  // Authorzation with admin token
  const token = req.headers.get('Authorization')?.split(' ')[1];
  if (token !== process.env.NEXT_API_SECRET_TOKEN) {
    return NextResponse.json(
      { success: false, message: "دسترسی غیرمجاز" },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();
    const videos = await Video.find({}).sort({ createdAt: -1 });
    return NextResponse.json(videos);
  } catch (error: unknown) {
    console.error("خطا در دریافت ویدیوها:", error);
    return NextResponse.json(
      { success: false, message: "خطای سرور" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // احراز هویت ساده
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: "دسترسی غیرمجاز" },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    if (token !== process.env.NEXT_API_SECRET_TOKEN) {
      return NextResponse.json(
        { success: false, message: "توکن نامعتبر" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const level = formData.get("level") as string;
    const time = formData.get("time") as string;
    const views = formData.get("views") as string || "0";
    const publisher = formData.get("publisher") as string;
    const videoLink = formData.get("videoLink") as string;
    const posterImageFile = formData.get("posterImage") as File;

    if (!title || !level || !time || !publisher || !videoLink || !posterImageFile) {
      return NextResponse.json(
        { success: false, message: "تمامی فیلدهای ضروری را پر کنید" },
        { status: 400 }
      );
    }

    const posterImagePath = await savePosterImage(posterImageFile);

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

  } catch (error) {
    console.error("خطا در سمت سرور:", error);
    return NextResponse.json(
      { success: false, message: "خطای سرور" },
      { status: 500 }
    );
  }
}