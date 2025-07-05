import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Article from "@/models/Article";
import { checkAuth } from "@/lib/auth";

// GET: دریافت یک مقاله خاص
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const authError = await checkAuth(req);
  if (authError) return authError;

  try {
    await connectToDatabase();
    const article = await Article.findById(context.params.id);
    if (!article) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json(article);
  } catch (error) {
    console.error("GET Article Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT: ویرایش مقاله
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const authError = await checkAuth(req);
  if (authError) return authError;

  try {
    await connectToDatabase();
    const data = await req.json();
    const updated = await Article.findByIdAndUpdate(context.params.id, data, {
      new: true,
    });
    if (!updated) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT Article Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE: حذف مقاله
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const authError = await checkAuth(req);
  if (authError) return authError;

  try {
    await connectToDatabase();
    const deleted = await Article.findByIdAndDelete(context.params.id);
    if (!deleted) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE Article Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
