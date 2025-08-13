import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Puzzle from "@/models/Puzzles";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: '10mb'
  },
};

// Helper function to save uploaded file
async function saveUploadedFile(file: File, subfolder: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${subfolder}_${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
  const uploadDir = path.join(process.cwd(), 'public/uploads');

  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, filename);
  await writeFile(filePath, buffer);
  return `/uploads/${filename}`;
}

// GET: Get all puzzles
export async function GET(req: NextRequest) {
  // Authentication
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

// POST: Create new puzzle
export async function POST(req: NextRequest) {
  // Authentication
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

    // Get text fields
    const title = formData.get("title") as string;
    const level = formData.get("level") as string;
    const rating = parseFloat(formData.get("rating") as string);
    const solved = parseInt(formData.get("solved") as string);
    const cats = JSON.parse(formData.get("cats") as string) as string[];
    const answers = JSON.parse(formData.get("answers") as string) as string[];
    const correctAnswer = formData.get("correctAnswer") as string;

    // Get image file
    const puzzleImageFile = formData.get("puzzleImage") as File;

    // Validate required fields
    if (!title || !level || isNaN(rating) || isNaN(solved) || !cats || 
        !answers || !correctAnswer || !puzzleImageFile) {
      return NextResponse.json(
        { success: false, message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Upload image
    const puzzleImagePath = await saveUploadedFile(puzzleImageFile, 'puzzle');

    // Create new puzzle
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