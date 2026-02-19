import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Plate from "@/models/Plate";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    const plate = await Plate.findById(params.id);
    if (!plate) {
      return NextResponse.json({ error: "Plate not found" }, { status: 404 });
    }
    return NextResponse.json(plate);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch plate" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    const body = await req.json();
    const plate = await Plate.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(plate);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update plate" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    await Plate.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Plate deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete plate" },
      { status: 500 },
    );
  }
}
