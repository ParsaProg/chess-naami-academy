import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Puzzle from "@/models/Puzzles";
import { checkAuth } from "@/lib/auth";
import mongoose from "mongoose";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

// Extract ID from URL
function getIdFromUrl(request: NextRequest): string | null {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split("/");
    return parts[parts.length - 1] || null;
  } catch {
    return null;
  }
}

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

export async function GET(request: NextRequest) {
  const authError = await checkAuth(request);
  if (authError) return authError;

  const id = getIdFromUrl(request);
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const puzzle = await Puzzle.findById(id);
    if (!puzzle) {
      return NextResponse.json({ message: "Puzzle not found" }, { status: 404 });
    }
    return NextResponse.json(puzzle);
  } catch (error) {
    console.error("GET Puzzle Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
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

    // Get existing puzzle
    const existingPuzzle = await Puzzle.findById(id);
    if (!existingPuzzle) {
      return NextResponse.json({ message: "Puzzle not found" }, { status: 404 });
    }

    // Prepare update data
    const updateData: any = {
      title: formData.get("title") as string || existingPuzzle.title,
      level: formData.get("level") as string || existingPuzzle.level,
      rating: parseFloat(formData.get("rating") as string) || existingPuzzle.rating,
      solved: parseInt(formData.get("solved") as string) || existingPuzzle.solved,
      cats: JSON.parse(formData.get("cats") as string) || existingPuzzle.cats,
      answers: JSON.parse(formData.get("answers") as string) || existingPuzzle.answers,
      correctAnswer: formData.get("correctAnswer") as string || existingPuzzle.correctAnswer,
    };

    // Handle image update if provided
    const puzzleImageFile = formData.get("puzzleImage") as File | null;
    if (puzzleImageFile && puzzleImageFile.size > 0) {
      updateData.puzzleImage = await saveUploadedFile(puzzleImageFile, 'puzzle');
    }

    // Update puzzle
    const updatedPuzzle = await Puzzle.findByIdAndUpdate(id, updateData, { new: true });

    return NextResponse.json(updatedPuzzle);
  } catch (error) {
    console.error("PUT Puzzle Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
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
    const deleted = await Puzzle.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Puzzle not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Puzzle deleted successfully" });
  } catch (error) {
    console.error("DELETE Puzzle Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}