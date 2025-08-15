// app/api/admin/videos/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Video from "@/models/Videos";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.LIARA_REGION,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY!,
    secretAccessKey: process.env.LIARA_SECRET_KEY!,
  },
});

async function uploadImageToLiara(
  file: File,
  folder: string = "videos"
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${folder}_poster_${Date.now()}_${file.name.replace(
    /\s+/g,
    "_"
  )}`;
  const bucketName = process.env.LIARA_BUCKET_NAME!;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: `${folder}/${filename}`,
    Body: buffer,
    ContentType: file.type,
    ACL: "public-read",
  });

  await s3.send(command);

  return `https://${bucketName}.liara.space/${folder}/${filename}`;
}

// ===== GET SINGLE VIDEO =====
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (token !== process.env.NEXT_API_SECRET_TOKEN) {
    return NextResponse.json(
      { success: false, message: "دسترسی غیرمجاز" },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();
    const video = await Video.findById(params.id);
    if (!video) {
      return NextResponse.json(
        { success: false, message: "ویدیو پیدا نشد" },
        { status: 404 }
      );
    }
    return NextResponse.json(video);
  } catch (error) {
    console.error("خطا در دریافت ویدیو:", error);
    return NextResponse.json(
      { success: false, message: "خطای سرور" },
      { status: 500 }
    );
  }
}

// ===== DELETE VIDEO =====
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (token !== process.env.NEXT_API_SECRET_TOKEN) {
    return NextResponse.json(
      { success: false, message: "دسترسی غیرمجاز" },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();
    const deletedVideo = await Video.findByIdAndDelete(params.id);
    if (!deletedVideo) {
      return NextResponse.json(
        { success: false, message: "ویدیو پیدا نشد" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "ویدیو حذف شد" });
  } catch (error) {
    console.error("خطا در حذف ویدیو:", error);
    return NextResponse.json(
      { success: false, message: "خطای سرور" },
      { status: 500 }
    );
  }
}

// ===== UPDATE VIDEO =====
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { success: false, message: "دسترسی غیرمجاز" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  if (token !== process.env.NEXT_API_SECRET_TOKEN) {
    return NextResponse.json(
      { success: false, message: "توکن نامعتبر" },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const level = formData.get("level") as string;
    const time = formData.get("time") as string;
    const views = (formData.get("views") as string) || "0";
    const publisher = formData.get("publisher") as string;
    const videoLink = formData.get("videoLink") as string;
    const posterImageFile = formData.get("posterImage") as File | null;

    const updateData: any = { title, level, time, views, publisher, videoLink };

    if (posterImageFile) {
      const posterImagePath = await uploadImageToLiara(posterImageFile);
      updateData.posterImage = posterImagePath;
    }

    const updatedVideo = await Video.findByIdAndUpdate(params.id, updateData, {
      new: true,
    });
    if (!updatedVideo) {
      return NextResponse.json(
        { success: false, message: "ویدیو پیدا نشد" },
        { status: 404 }
      );
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
