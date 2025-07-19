// app/api/online-tournaments/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Tournament from "@/models/OnlineT";
import { isValidObjectId } from "mongoose";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
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
    
    // Validate ID format
    if (!isValidObjectId(params.id)) {
      return NextResponse.json(
        { success: false, message: "Invalid tournament ID format" },
        { status: 400 }
      );
    }

    // Find tournament by ID
    const tournament = await Tournament.findById(params.id).lean();

    if (!tournament) {
      return NextResponse.json(
        { success: false, message: "Tournament not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(tournament);

  } catch (error: unknown) {
    console.error("Error fetching tournament:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
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
    const body = await req.json();

    // Validate ID format
    if (!isValidObjectId(params.id)) {
      return NextResponse.json(
        { success: false, message: "Invalid tournament ID format" },
        { status: 400 }
      );
    }

    // Find and update tournament
    const updatedTournament = await Tournament.findByIdAndUpdate(
      params.id,
      {
        $set: {
          ...body,
          ...(body.startTime && { startTime: new Date(body.startTime) }),
          ...(body.endTime && { endTime: new Date(body.endTime) }),
          ...(body.participants && { participants: Number(body.participants) }),
          ...(body.minRating && { minRating: Number(body.minRating) }),
          ...(body.maxRating && { maxRating: Number(body.maxRating) })
        }
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

  } catch (error: unknown) {
    console.error("Error updating tournament:", error);
    return NextResponse.json(
      { 
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
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

    // Validate ID format
    if (!isValidObjectId(params.id)) {
      return NextResponse.json(
        { success: false, message: "Invalid tournament ID format" },
        { status: 400 }
      );
    }

    // Delete tournament
    const deletedTournament = await Tournament.findByIdAndDelete(params.id);

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

  } catch (error: unknown) {
    console.error("Error deleting tournament:", error);
    return NextResponse.json(
      { 
        success: false,
      },
      { status: 500 }
    );
  }
}