// app/admin/api/books/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Book from "@/models/Books";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: "100mb",
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

// ---------------- Helper: Upload PDF to Liara Bucket ----------------
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

export async function GET(req: NextRequest) {
  // Authorization
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (token !== process.env.NEXT_PUBLIC_API_SECRET_TOKEN) {
    return NextResponse.json(
      { success: false, message: "دسترسی غیرمجاز" },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();
    const books = await Book.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { success: false, message: "خطای سرور" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  // Authorization
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (token !== process.env.NEXT_PUBLIC_API_SECRET_TOKEN) {
    return NextResponse.json(
      { success: false, message: "دسترسی غیرمجاز" },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();
    const formData = await req.formData();

    // دریافت فایل PDF
    const pdfFile = formData.get("pdfFile") as File;
    if (!pdfFile || pdfFile.type !== "application/pdf") {
      return NextResponse.json(
        { success: false, message: "فایل PDF معتبر ارسال نشده است" },
        { status: 400 }
      );
    }

    // آپلود PDF به لیارا
    const pdfLink = await saveUploadedPdf(pdfFile);

    // ایجاد کتاب جدید
    const newBook = await Book.create({
      title: formData.get("title") as string,
      subTitle: formData.get("subTitle") as string,
      author: formData.get("author") as string,
      pages: Number(formData.get("pages")),
      size: formData.get("size") as string,
      level: formData.get("level") as string,
      downlaods: formData.get("downlaods") as string || "0",
      pdfLink: pdfLink,
    });

    return NextResponse.json(
      { success: true, data: newBook },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json(
      { success: false, message: "خطا در ایجاد کتاب" },
      { status: 500 }
    );
  }
}