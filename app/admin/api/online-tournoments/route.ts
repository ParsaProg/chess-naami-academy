// app/api/online-tournaments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Tournament from "@/models/OnlineT";

export async function GET(req: NextRequest) {
  // Authentication
  const token = req.headers.get('Authorization')?.split(' ')[1];
  if (token !== process.env.NEXT_PUBLIC_API_SECRET_TOKEN) {
    return NextResponse.json(
      { success: false, message: "Unauthorized access" },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();
    
    // Get all tournaments sorted by start time (newest first)
    const tournaments = await Tournament.find({})
      .sort({ startTime: -1 })
      .lean();

    return NextResponse.json(tournaments);

  } catch (error: unknown) {
    console.error("Error fetching tournaments:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  // Authentication
  const token = req.headers.get('Authorization')?.split(' ')[1];
  if (token !== process.env.NEXT_PUBLIC_API_SECRET_TOKEN) {
    return NextResponse.json(
      { success: false, message: "Unauthorized access" },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();
    const body = await req.json();

    // Validate required fields
    const requiredFields = [
      'title', 'status', 'startTime', 'endTime', 
      'description', 'participants', 'ratingCategory', 'lichessUrl'
    ];
    
    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    // Create new tournament
    const newTournament = await Tournament.create({
      title: body.title,
      status: body.status,
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
      description: body.description,
      participants: Number(body.participants),
      ratingCategory: body.ratingCategory,
      minRating: body.minRating ? Number(body.minRating) : null,
      maxRating: body.maxRating ? Number(body.maxRating) : null,
      lichessUrl: body.lichessUrl
    });

    return NextResponse.json(
      { success: true, data: newTournament },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error("Error creating tournament:", error);
    return NextResponse.json(
      { 
        success: false,
      },
      { status: 500 }
    );
  }
}