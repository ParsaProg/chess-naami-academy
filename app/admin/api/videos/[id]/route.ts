// app/api/admin/videos/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Video from "@/models/Videos";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: "10mb",
  },
};

const s3 = new S3Client({
  region: process.env.LIARA_REGION,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY!,
    secretAccessKey: process.env.LIARA_SECRET_KEY!,
  },
});

// ---------------- Helper: Upload poster image ----------------
async function savePosterImage(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `video_poster_${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
  const bucketName = process.env.LIARA_BUCKET_NAME!;

  await s3.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: `videos/${filename}`,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read",
    })
  );

  return `https://${bucketName}.liara.space/videos/${filename}`;
}

// ---------------- GET single video ----------------
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (token !== process.env.NEXT_API_SECRET_TOKEN) {
    return NextResponse.json({ success: false, message: "دسترسی غیرمجاز" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const video = await Video.findById(params.id);
    if (!video) {
      return NextResponse.json({ success: false, message: "ویدیو پیدا نشد" }, { status: 404 });
    }
    return NextResponse.json(video);
  } catch (error) {
    console.error("خطا در دریافت ویدیو:", error);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}

// ---------------- DELETE video ----------------
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (token !== process.env.NEXT_API_SECRET_TOKEN) {
    return NextResponse.json({ success: false, message: "دسترسی غیرمجاز" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const deletedVideo = await Video.findByIdAndDelete(params.id);
    if (!deletedVideo) {
      return NextResponse.json({ success: false, message: "ویدیو پیدا نشد" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "ویدیو حذف شد" });
  } catch (error) {
    console.error("خطا در حذف ویدیو:", error);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}

// ---------------- PUT: Update video ----------------
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ success: false, message: "دسترسی غیرمجاز" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  if (token !== process.env.NEXT_API_SECRET_TOKEN) {
    return NextResponse.json({ success: false, message: "توکن نامعتبر" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const level = formData.get("level") as string;
    const time = formData.get("time") as string;
    const views = parseInt((formData.get("views") as string) || "0");
    const publisher = formData.get("publisher") as string;
    const videoLink = formData.get("videoLink") as string;
    const posterImageFile = formData.get("posterImage") as File | null;

    if (!title || !level || !time || !publisher || !videoLink) {
      return NextResponse.json(
        { success: false, message: "تمامی فیلدهای ضروری را پر کنید" },
        { status: 400 }
      );
    }

    const updateData: any = { title, level, time, views, publisher, videoLink };

    if (posterImageFile) {
      const posterImagePath = await savePosterImage(posterImageFile);
      updateData.posterImage = posterImagePath;
    }

    const updatedVideo = await Video.findByIdAndUpdate(params.id, updateData, { new: true });
    if (!updatedVideo) {
      return NextResponse.json({ success: false, message: "ویدیو پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedVideo }, { status: 200 });
  } catch (error) {
    console.error("خطا در بروزرسانی ویدیو:", error);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}
