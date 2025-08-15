import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Puzzle from "@/models/Puzzles";
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
    sizeLimit: '10mb'
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
    ACL: "public-read", // فایل رو public می‌کنه
  }));

  return `${process.env.LIARA_ENDPOINT}/${process.env.LIARA_BUCKET_NAME}/${uploadKey}`;
}

// ---------------- GET: Get all puzzles ----------------
export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1];
  if (token !== process.env.NEXT_API_SECRET_TOKEN) {
    return NextResponse.json(
      { success: false, message: "Unauthorized access" },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();
    const puzzles = await Puzzle.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(puzzles);
  } catch (error: unknown) {
    console.error("Error fetching puzzles:", error);
    return NextResponse.json([], { status: 500 });
  }
}

// ---------------- POST: Create new puzzle ----------------
export async function POST(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1];
  if (token !== process.env.NEXT_API_SECRET_TOKEN) {
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
    const rating = parseFloat(formData.get("rating") as string);
    const solved = parseInt(formData.get("solved") as string);
    const cats = JSON.parse(formData.get("cats") as string) as string[];
    const answers = JSON.parse(formData.get("answers") as string) as string[];
    const correctAnswer = formData.get("correctAnswer") as string;
    const puzzleImageFile = formData.get("puzzleImage") as File;

    if (!title || !level || isNaN(rating) || isNaN(solved) || !cats ||
        !answers || !correctAnswer || !puzzleImageFile) {
      return NextResponse.json(
        { success: false, message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Upload to Liara Bucket
    const puzzleImagePath = await saveUploadedFile(puzzleImageFile, 'puzzle');

    const newPuzzle = await Puzzle.create({
      title,
      level,
      rating,
      solved,
      cats,
      answers,
      correctAnswer,
      puzzleImage: puzzleImagePath
    });

    return NextResponse.json(
      { success: true, data: newPuzzle },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error("Error creating puzzle:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
