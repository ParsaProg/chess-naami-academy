// app/admin/api/articles/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Article from "@/models/Article";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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

// ---------------- GET: دریافت همه مقالات ----------------
export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (token !== process.env.NEXT_PUBLIC_API_SECRET_TOKEN) {
    return NextResponse.json(
      { success: false, message: "دسترسی غیرمجاز" },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();
    const articles = await Article.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(articles);
  } catch (error: unknown) {
    console.error("خطا در دریافت مقالات:", error);
    return NextResponse.json([], { status: 500 });
  }
}

// ---------------- POST: ساخت مقاله جدید ----------------
export async function POST(req: NextRequest) {
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
    const publisherImageFile = formData.get("publisherImage") as File;

    if (
      !title ||
      !content ||
      !cats ||
      !importantText ||
      !desc ||
      !time ||
      !publishDate ||
      !publisherName ||
      !publisherTag ||
      !titleImageFile ||
      !publisherImageFile
    ) {
      return NextResponse.json(
        { success: false, message: "تمام فیلدهای اجباری باید پر شوند" },
        { status: 400 }
      );
    }

    // آپلود تصاویر به لیارا
    const [titleImagePath, publisherImagePath] = await Promise.all([
      saveUploadedFile(titleImageFile, "title"),
      saveUploadedFile(publisherImageFile, "publisher"),
    ]);

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

    return NextResponse.json({ success: true, data: newArticle }, { status: 201 });
  } catch (error: unknown) {
    console.error("خطا در ایجاد مقاله:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
