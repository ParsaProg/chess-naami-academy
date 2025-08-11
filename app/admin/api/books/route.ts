import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Book from "@/models/Books";

export async function GET(req: NextRequest) {
  // Authorization with admin token
  const token = req.headers.get('Authorization')?.split(' ')[1];
  if (token !== process.env.NEXT_API_SECRET_TOKEN) {
    return NextResponse.json(
      { success: false, message: "دسترسی غیرمجاز" },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();
    const books = await Book.find({}).sort({ createdAt: -1 });
    return NextResponse.json(books);
  } catch (error: unknown) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Simple authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: "دسترسی غیرمجاز" },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    if (token !== process.env.NEXT_API_SECRET_TOKEN) {
      return NextResponse.json(
        { success: false, message: "توکن نامعتبر" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const body = await req.json();

    const { 
      title, 
      subTitle, 
      author, 
      pages, 
      size, 
      level, 
      downlaods, 
      pdfLink 
    } = body;

    if (!title || !subTitle || !author || !pages || !size || !level || !pdfLink) {
      return NextResponse.json(
        { success: false, message: "Please fill all required fields" },
        { status: 400 }
      );
    }

    const newBook = await Book.create({
      title,
      subTitle,
      author,
      pages,
      size,
      level,
      downlaods: downlaods || "0",
      pdfLink
    });

    return NextResponse.json(
      { success: true, data: newBook },
      { status: 201 }
    );

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}