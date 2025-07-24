// app/admin/api/videos/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Video from "@/models/Videos";
import { checkAuth } from "@/lib/auth";
import mongoose from "mongoose";
import { unlink, writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

// استخراج id از URL
function getIdFromUrl(request: NextRequest): string | null {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split("/");
    return parts[parts.length - 1] || null;
  } catch {
    return null;
  }
}

// حذف فایل قدیمی هنگام آپدیت
async function deleteOldFile(filename: string) {
  if (filename) {
    try {
      const filePath = path.join(process.cwd(), 'public', filename);
      await unlink(filePath);
    } catch (error) {
      console.error("Error deleting old file:", error);
    }
  }
}

// تابع کمکی برای ذخیره فایل جدید
async function saveUploadedFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `video_poster_${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
  const uploadDir = path.join(process.cwd(), 'public/uploads/videos');

  // ایجاد دایرکتوری اگر وجود نداشته باشد
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, filename);
  await writeFile(filePath, buffer);
  return `/uploads/videos/${filename}`;
}

export async function GET(request: NextRequest) {
  const authError = await checkAuth(request);
  if (authError) return authError;

  const id = getIdFromUrl(request);
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "شناسه نامعتبر" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    const video = await Video.findById(id);
    
    if (!video) {
      return NextResponse.json(
        { success: false, message: "ویدیو یافت نشد" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(video);
  } catch (error) {
    console.error("GET Video Error:", error);
    return NextResponse.json(
      { success: false, message: "خطای سرور" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const authError = await checkAuth(request);
  if (authError) return authError;

  const id = getIdFromUrl(request);
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "شناسه نامعتبر" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    const formData = await request.formData();
    
    // دریافت فیلدهای متنی
    const updateData = {
      title: formData.get("title") as string,
      level: formData.get("level") as string,
      time: formData.get("time") as string,
      views: formData.get("views") as string,
      publisher: formData.get("publisher") as string,
      videoLink: formData.get("videoLink") as string,
    };

    // دریافت فایل جدید (اگر وجود دارد)
    const newPosterImage = formData.get("posterImage") as File | null;
    let posterImagePath = null;

    if (newPosterImage && newPosterImage.size > 0) {
      // ذخیره فایل جدید
      posterImagePath = await saveUploadedFile(newPosterImage);

      // حذف فایل قدیمی
      const currentVideo = await Video.findById(id);
      if (currentVideo?.posterImage) {
        await deleteOldFile(currentVideo.posterImage);
      }
    }

    // آپدیت دیتا
    const updatedData = {
      ...updateData,
      ...(posterImagePath ? { posterImage: posterImagePath } : {})
    };

    const updatedVideo = await Video.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedVideo) {
      return NextResponse.json(
        { success: false, message: "ویدیو یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedVideo,
    });

  } catch (error) {
    console.error("PUT Video Error:", error);
    return NextResponse.json(
      { success: false, message: "خطای سرور در بروزرسانی ویدیو" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const authError = await checkAuth(request);
  if (authError) return authError;

  const id = getIdFromUrl(request);
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "شناسه نامعتبر" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    
    // یافتن ویدیو برای حذف فایل مرتبط
    const videoToDelete = await Video.findById(id);
    
    if (!videoToDelete) {
      return NextResponse.json(
        { success: false, message: "ویدیو یافت نشد" },
        { status: 404 }
      );
    }

    // حذف فایل پوستر
    if (videoToDelete.posterImage) {
      await deleteOldFile(videoToDelete.posterImage);
    }

    // حذف سند از دیتابیس
    await Video.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "ویدیو با موفقیت حذف شد",
    });

  } catch (error) {
    console.error("DELETE Video Error:", error);
    return NextResponse.json(
      { success: false, message: "خطای سرور در حذف ویدیو" },
      { status: 500 }
    );
  }
}