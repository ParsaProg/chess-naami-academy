// app/admin/api/articles/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Article from "@/models/Article";
import { checkAuth } from "@/lib/auth";
import mongoose from "mongoose";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

interface UpdateArticleData {
  title?: string;
  content?: string;
  cats?: string[];
  importantText?: string;
  desc?: string;
  time?: string;
  publishDate?: string;
  publisherName?: string;
  publisherTag?: string;
  isSpecial?: boolean;
  titleImage?: string;
  publisherImage?: string;
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
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const article = await Article.findById(id);
    if (!article) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json(article);
  } catch (error) {
    console.error("GET Article Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const authError = await checkAuth(request);
  if (authError) return authError;

  const id = getIdFromUrl(request);
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const cats = formData.get("cats") ? JSON.parse(formData.get("cats") as string) : undefined;
    const importantText = formData.get("importantText") as string;
    const desc = formData.get("desc") as string;
    const time = formData.get("time") as string;
    const publishDate = formData.get("publishDate") as string;
    const publisherName = formData.get("publisherName") as string;
    const publisherTag = formData.get("publisherTag") as string;
    const isSpecial = formData.get("isSpecial") === "true";

    const titleImageFile = formData.get("titleImage") as File | null;
    const publisherImageFile = formData.get("publisherImage") as File | null;

    const updateData: UpdateArticleData = {
      title,
      content,
      cats,
      importantText,
      desc,
      time,
      publishDate,
      publisherName,
      publisherTag,
      isSpecial,
    };

    // آپلود فایل‌ها فقط در صورتی که فایل جدید ارسال شده باشد
    if (titleImageFile) {
      updateData.titleImage = await saveUploadedFile(titleImageFile, "title");
    }
    if (publisherImageFile) {
      updateData.publisherImage = await saveUploadedFile(publisherImageFile, "publisher");
    }

    const updatedArticle = await Article.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedArticle) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedArticle });
  } catch (error) {
    console.error("PUT Article Error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const authError = await checkAuth(request);
  if (authError) return authError;

  const id = getIdFromUrl(request);
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const deleted = await Article.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE Article Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
