import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Book from "@/models/Books";
import mongoose from "mongoose";

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

export async function GET(request: NextRequest) {
  // Authorization
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (token !== process.env.NEXT_PUBLIC_API_SECRET_TOKEN) {
    return NextResponse.json(
      { success: false, message: "دسترسی غیرمجاز" },
      { status: 401 }
    );
  }

  const id = getIdFromUrl(request);
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid ID" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    const book = await Book.findById(id);
    
    if (!book) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(book);
  } catch (error) {
    console.error("GET Book Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  // Authorization
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (token !== process.env.NEXT_PUBLIC_API_SECRET_TOKEN) {
    return NextResponse.json(
      { success: false, message: "دسترسی غیرمجاز" },
      { status: 401 }
    );
  }

  const id = getIdFromUrl(request);
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid ID" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    const body = await request.json();
    
    const updatedBook = await Book.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedBook) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
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
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  // Authorization
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (token !== process.env.NEXT_PUBLIC_API_SECRET_TOKEN) {
    return NextResponse.json(
      { success: false, message: "دسترسی غیرمجاز" },
      { status: 401 }
    );
  }

  const id = getIdFromUrl(request);
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid ID" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    
    const deletedBook = await Book.findByIdAndDelete(id);
    
    if (!deletedBook) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Book deleted successfully",
    });

  } catch (error) {
    console.error("DELETE Book Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}