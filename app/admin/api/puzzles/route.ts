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

// ---------------- Helper: Upload file to Liara Bucket ----------------
async function saveUploadedFile(file: File, subfolder: string): Promise<string> {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${subfolder}_${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
    const uploadKey = `${subfolder}/${filename}`;

    console.log("Uploading to S3 with key:", uploadKey);

    await s3.send(new PutObjectCommand({
      Bucket: process.env.LIARA_BUCKET_NAME!,
      Key: uploadKey,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read",
    }));

    // Construct the correct URL for Liara
    // Format: https://BUCKETNAME.ENDPOINT/KEY
    const endpoint = process.env.LIARA_ENDPOINT?.replace('https://', '');
    const fileUrl = `https://${process.env.LIARA_BUCKET_NAME}.${endpoint}/${uploadKey}`;
    
    console.log("File uploaded successfully:", fileUrl);
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("Failed to upload file");
  }
}

// ---------------- GET: Get all puzzles ----------------
export async function GET(req: NextRequest) {
  try {
    // Check authorization
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    
    if (token !== process.env.NEXT_PUBLIC_API_SECRET_TOKEN) {
      console.log("Unauthorized access attempt");
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const puzzles = await Puzzle.find({}).sort({ createdAt: -1 }).lean();
    
    return NextResponse.json({ 
      success: true, 
      data: puzzles 
    });
    
  } catch (error: unknown) {
    console.error("Error fetching puzzles:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching puzzles" }, 
      { status: 500 }
    );
  }
}

// ---------------- POST: Create new puzzle ----------------
export async function POST(req: NextRequest) {
  try {
    // Check authorization
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    
    console.log("POST request to /admin/api/puzzles");
    console.log("Auth token present:", !!token);
    
    if (token !== process.env.NEXT_PUBLIC_API_SECRET_TOKEN) {
      console.log("Token mismatch");
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    // Connect to database
    await connectToDatabase();
    console.log("Connected to database");

    // Parse form data
    const formData = await req.formData();
    console.log("Form data received");

    // Extract fields
    const title = formData.get("title") as string;
    const level = formData.get("level") as string;
    const rating = parseFloat(formData.get("rating") as string);
    const solved = parseInt(formData.get("solved") as string);
    const cats = JSON.parse(formData.get("cats") as string) as string[];
    const answers = JSON.parse(formData.get("answers") as string) as string[];
    const correctAnswer = formData.get("correctAnswer") as string;
    const puzzleImageFile = formData.get("puzzleImage") as File;

    // Validate required fields
    if (!title || !level || isNaN(rating) || isNaN(solved) || !cats ||
        !answers || !correctAnswer || !puzzleImageFile) {
      console.log("Missing required fields");
      return NextResponse.json(
        { success: false, message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    console.log("Validation passed, uploading file...");

    // Upload to Liara Bucket
    const puzzleImagePath = await saveUploadedFile(puzzleImageFile, 'puzzles');
    console.log("File uploaded, creating puzzle in database...");

    // Create puzzle in database
    const newPuzzle = await Puzzle.create({
      title,
      level,
      rating,
      solved,
      cats,
      answers,
      correctAnswer,
      puzzleImage: puzzleImagePath,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log("Puzzle created successfully with ID:", newPuzzle._id);

    return NextResponse.json(
      { 
        success: true, 
        message: "پازل با موفقیت ذخیره شد",
        data: newPuzzle 
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error("Error creating puzzle:", error);
    
    // Return more detailed error message
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    
    return NextResponse.json(
      { 
        success: false, 
        message: "خطا در ایجاد پازل",
        error: errorMessage 
      },
      { status: 500 }
    );
  }
}

// ---------------- OPTIONS: Handle CORS preflight ----------------
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}