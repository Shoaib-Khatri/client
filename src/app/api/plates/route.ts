import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Plate from "@/models/Plate";

export async function GET() {
  try {
    await connectDB();
    const plates = await Plate.find({}).sort({ createdAt: -1 });
    return NextResponse.json(plates);
  } catch (error) {
    console.error("Error fetching plates:", error);
    return NextResponse.json(
      { error: "Failed to fetch plates" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const plate = await Plate.create(body);
    return NextResponse.json(plate, { status: 201 });
  } catch (error) {
    console.error("Error creating plate:", error);
    return NextResponse.json(
      { error: "Failed to create plate" },
      { status: 500 },
    );
  }
}
