// app/api/admin/videos/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Video from "@/models/Videos";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// ---------------- S3 Client ----------------
const s3 = new S3Client({
  region: "default",
  endpoint: process.env.LIARA_ENDPOINT,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY!,
    secretAccessKey: process.env.LIARA_SECRET_KEY!,
  },
});

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: "10mb",
  },
};

// ---------------- Helper: Upload file to Liara Bucket ----------------
async function saveUploadedFile(file: File, subfolder: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${subfolder}_${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
  const uploadKey = `${subfolder}/${filename}`;

  await s3.send(new PutObjectCommand({
    Bucket: process.env.LIARA_BUCKET_NAME!,
    Key: uploadKey,
    Body: buffer,
    ContentType: file.type,
    ACL: "public-read",
  }));

  return `${process.env.LIARA_ENDPOINT}/${process.env.LIARA_BUCKET_NAME}/${uploadKey}`;
}

// ---------------- GET: Get all videos ----------------
export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (token !== process.env.NEXT_PUBLIC_API_SECRET_TOKEN) {
    return NextResponse.json(
      { success: false, message: "Unauthorized access" },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(videos);
  } catch (error: unknown) {
    console.error("Error fetching videos:", error);
    return NextResponse.json([], { status: 500 });
  }
}

// ---------------- POST: Create new video ----------------
export async function POST(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (token !== process.env.NEXT_PUBLIC_API_SECRET_TOKEN) {
    return NextResponse.json(
      { success: false, message: "Unauthorized access" },
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
    const posterImageFile = formData.get("posterImage") as File;

    if (!title || !level || !time || !publisher || !videoLink || !posterImageFile) {
      return NextResponse.json(
        { success: false, message: "تمامی فیلدهای ضروری را پر کنید" },
        { status: 400 }
      );
    }

    // Upload poster image to S3
    const posterImagePath = await saveUploadedFile(posterImageFile, "video");

    const newVideo = await Video.create({
      title,
      level,
      time,
      views,
      publisher,
      videoLink,
      posterImage: posterImagePath,
    });

    return NextResponse.json(
      { success: true, data: newVideo },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error("Error creating video:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
