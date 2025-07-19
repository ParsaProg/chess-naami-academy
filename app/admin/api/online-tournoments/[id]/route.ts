// app/admin/api/online-tournaments/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Tournament from "@/models/OnlineT";
import { checkAuth } from "@/lib/auth";
import mongoose from "mongoose";

// تابع استخراج ID از URL
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
  const authError = await checkAuth(request);
  if (authError) return authError;

  const id = getIdFromUrl(request);
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid tournament ID format" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    const tournament = await Tournament.findById(id).lean();
    if (!tournament) {
      return NextResponse.json(
        { success: false, message: "Tournament not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(tournament);
  } catch (error) {
    console.error("Error fetching tournament:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const authError = await checkAuth(request);
  if (authError) return authError;

  const id = getIdFromUrl(request);
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid tournament ID format" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    const body = await request.json();

    const updatedTournament = await Tournament.findByIdAndUpdate(
      id,
      {
        $set: {
          ...body,
          ...(body.startTime && { startTime: new Date(body.startTime) }),
          ...(body.endTime && { endTime: new Date(body.endTime) }),
          ...(body.participants && { participants: Number(body.participants) }),
          ...(body.minRating && { minRating: Number(body.minRating) }),
          ...(body.maxRating && { maxRating: Number(body.maxRating) }),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedTournament) {
      return NextResponse.json(
        { success: false, message: "Tournament not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedTournament },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating tournament:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const authError = await checkAuth(request);
  if (authError) return authError;

  const id = getIdFromUrl(request);
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid tournament ID format" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    const deletedTournament = await Tournament.findByIdAndDelete(id);
    if (!deletedTournament) {
      return NextResponse.json(
        { success: false, message: "Tournament not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Tournament deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting tournament:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}