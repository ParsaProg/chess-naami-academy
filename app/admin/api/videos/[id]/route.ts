// app/admin/api/videos/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Videos from "@/models/Videos";
import { checkAuth } from "@/lib/auth";
import mongoose from "mongoose";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

interface UpdateVideoData {
  posterImage?: string;
  level?: string;
  time?: string;
  title?: string;
  views?: string;
  publisher?: string;
  videoLink?: string;
}

// ---------------- S3 Client ----------------
const s3 = new S3Client({
  region: "default",
  endpoint: process.env.LIARA_ENDPOINT,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY!,
    secretAccessKey: process.env.LIARA_SECRET_KEY!,
  },
});

// ---------------- Helper: Upload file to Liara Bucket ----------------
async function saveUploadedFile(file: File, subfolder: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${subfolder}_${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
  const uploadKey = `${subfolder}/${filename}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.LIARA_BUCKET_NAME!,
      Key: uploadKey,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read",
    })
  );

  return `${process.env.LIARA_ENDPOINT}/${process.env.LIARA_BUCKET_NAME}/${uploadKey}`;
}

// ---------------- Helper: Delete file from Liara Bucket ----------------
async function deleteFileFromS3(url: string): Promise<void> {
  try {
    const key = url.split(`${process.env.LIARA_BUCKET_NAME}/`)[1];
    if (key) {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.LIARA_BUCKET_NAME!,
          Key: key,
        })
      );
    }
  } catch (err) {
    console.error("Failed to delete S3 object:", err);
  }
}

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

export async function GET(request: NextRequest) {
  const authError = await checkAuth(request);
  if (authError) return authError;

  const id = getIdFromUrl(request);
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "شناسه نامعتبر است" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const video = await Videos.findById(id);
    if (!video) {
      return NextResponse.json({ message: "ویدیو یافت نشد" }, { status: 404 });
    }
    return NextResponse.json(video);
  } catch (error) {
    console.error("خطا در دریافت ویدیو:", error);
    return NextResponse.json({ message: "خطای سرور" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const authError = await checkAuth(request);
  if (authError) return authError;

  const id = getIdFromUrl(request);
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "شناسه نامعتبر است" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const formData = await request.formData();

    const posterImageFile = formData.get("posterImage") as File | null;
    const level = formData.get("level") as string;
    const time = formData.get("time") as string;
    const title = formData.get("title") as string;
    const views = formData.get("views") as string;
    const publisher = formData.get("publisher") as string;
    const videoLink = formData.get("videoLink") as string;

    const updateData: UpdateVideoData = {
      level,
      time,
      title,
      views,
      publisher,
      videoLink
    };

    // آپلود تصویر جدید اگر ارسال شده باشد
    if (posterImageFile) {
      // حذف تصویر قبلی اگر وجود داشته باشد
      const existingVideo = await Videos.findById(id);
      if (existingVideo?.posterImage) {
        await deleteFileFromS3(existingVideo.posterImage);
      }
      updateData.posterImage = await saveUploadedFile(posterImageFile, "video-posters");
    }

    const updatedVideo = await Videos.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedVideo) {
      return NextResponse.json({ message: "ویدیو یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedVideo });
  } catch (error) {
    console.error("خطا در بروزرسانی ویدیو:", error);
    return NextResponse.json(
      { success: false, message: "خطای سرور" }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const authError = await checkAuth(request);
  if (authError) return authError;

  const id = getIdFromUrl(request);
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "شناسه نامعتبر است" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    
    // پیدا کردن ویدیو قبل از حذف برای پاک کردن تصویر
    const videoToDelete = await Videos.findById(id);
    if (!videoToDelete) {
      return NextResponse.json({ message: "ویدیو یافت نشد" }, { status: 404 });
    }

    // حذف تصویر از S3
    if (videoToDelete.posterImage) {
      await deleteFileFromS3(videoToDelete.posterImage);
    }

    // حذف ویدیو از دیتابیس
    await Videos.findByIdAndDelete(id);

    return NextResponse.json({ message: "ویدیو با موفقیت حذف شد" });
  } catch (error) {
    console.error("خطا در حذف ویدیو:", error);
    return NextResponse.json({ message: "خطای سرور" }, { status: 500 });
  }
}