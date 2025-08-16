// app/admin/api/books/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Book from "@/models/Books";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import mongoose from "mongoose";

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: "10mb",
  },
};

// ---------------- S3 Client ----------------
const s3 = new S3Client({
  region: "default",
  endpoint: process.env.LIARA_ENDPOINT,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY!,
    secretAccessKey: process.env.LIARA_SECRET_KEY!,
  },
});

// ---------------- Helper Functions ----------------
async function saveUploadedPdf(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `books_${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
  const uploadKey = `books/${filename}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.LIARA_BUCKET_NAME!,
      Key: uploadKey,
      Body: buffer,
      ContentType: "application/pdf",
      ACL: "public-read",
    })
  );

  return `${process.env.LIARA_ENDPOINT}/${process.env.LIARA_BUCKET_NAME}/${uploadKey}`;
}

async function deletePdfFromS3(url: string): Promise<void> {
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
    console.error("Failed to delete PDF from S3:", err);
  }
}

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
  // Authorization
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (token !== process.env.NEXT_PUBLIC_API_SECRET_TOKEN) {
    return NextResponse.json(
      { success: false, message: "دسترسی غیرمجاز" },
      { status: 401 }
    );
  }

  const id = getIdFromUrl(request);
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "شناسه نامعتبر" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    const book = await Book.findById(id);
    
    if (!book) {
      return NextResponse.json(
        { success: false, message: "کتاب یافت نشد" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(book);
  } catch (error) {
    console.error("GET Book Error:", error);
    return NextResponse.json(
      { success: false, message: "خطای سرور" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  // Authorization
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (token !== process.env.NEXT_PUBLIC_API_SECRET_TOKEN) {
    return NextResponse.json(
      { success: false, message: "دسترسی غیرمجاز" },
      { status: 401 }
    );
  }

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

    // دریافت فایل PDF جدید (اختیاری)
    const pdfFile = formData.get("pdfFile") as File | null;
    let pdfLink: string | undefined;

    if (pdfFile) {
      // حذف فایل قبلی
      const existingBook = await Book.findById(id);
      if (existingBook?.pdfLink) {
        await deletePdfFromS3(existingBook.pdfLink);
      }
      
      // آپلود فایل جدید
      pdfLink = await saveUploadedPdf(pdfFile);
    }

    // آماده‌سازی داده‌های بروزرسانی
    const updateData = {
      title: formData.get("title") as string,
      subTitle: formData.get("subTitle") as string,
      author: formData.get("author") as string,
      pages: Number(formData.get("pages")),
      size: formData.get("size") as string,
      level: formData.get("level") as string,
      downlaods: formData.get("downlaods") as string,
      ...(pdfLink && { pdfLink }), // فقط اگر pdfLink وجود داشت اضافه شود
    };

    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedBook) {
      return NextResponse.json(
        { success: false, message: "کتاب یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedBook,
    });

  } catch (error) {
    console.error("PUT Book Error:", error);
    return NextResponse.json(
      { success: false, message: "خطای سرور" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  // Authorization
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (token !== process.env.NEXT_PUBLIC_API_SECRET_TOKEN) {
    return NextResponse.json(
      { success: false, message: "دسترسی غیرمجاز" },
      { status: 401 }
    );
  }

  const id = getIdFromUrl(request);
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "شناسه نامعتبر" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    
    // پیدا کردن کتاب برای حذف فایل PDF
    const bookToDelete = await Book.findById(id);
    
    if (!bookToDelete) {
      return NextResponse.json(
        { success: false, message: "کتاب یافت نشد" },
        { status: 404 }
      );
    }

    // حذف فایل PDF از لیارا
    if (bookToDelete.pdfLink) {
      await deletePdfFromS3(bookToDelete.pdfLink);
    }

    // حذف کتاب از دیتابیس
    await Book.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "کتاب با موفقیت حذف شد",
    });

  } catch (error) {
    console.error("DELETE Book Error:", error);
    return NextResponse.json(
      { success: false, message: "خطای سرور" },
      { status: 500 }
    );
  }
}