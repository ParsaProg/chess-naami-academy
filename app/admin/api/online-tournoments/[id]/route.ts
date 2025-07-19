// app/admin/api/online-tournaments/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Tournament from "@/models/OnlineT";
import { isValidObjectId } from "mongoose";

type RouteParams = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Authentication
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (token !== process.env.NEXT_API_SECRET_TOKEN) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    if (!isValidObjectId(params.id)) {
      return NextResponse.json(
        { success: false, message: "Invalid tournament ID format" },
        { status: 400 }
      );
    }

    const tournament = await Tournament.findById(params.id).lean();
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

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // Authentication
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (token !== process.env.NEXT_API_SECRET_TOKEN) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const body = await request.json();

    if (!isValidObjectId(params.id)) {
      return NextResponse.json(
        { success: false, message: "Invalid tournament ID format" },
        { status: 400 }
      );
    }

    const updatedTournament = await Tournament.findByIdAndUpdate(
      params.id,
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

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Authentication
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (token !== process.env.NEXT_API_SECRET_TOKEN) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    if (!isValidObjectId(params.id)) {
      return NextResponse.json(
        { success: false, message: "Invalid tournament ID format" },
        { status: 400 }
      );
    }

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
  } catch (error) {
    console.error("Error deleting tournament:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}