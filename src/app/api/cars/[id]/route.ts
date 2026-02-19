import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Car from "@/models/Car";

// GET /api/cars/[id] — Get a single car
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const car = await Car.findById(id).lean();
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // Backward compatibility: map old `image` field to `images` array
    const carObj = car as Record<string, unknown>;
    if (!carObj.images || (carObj.images as string[]).length === 0) {
      if (carObj.image) {
        carObj.images = [carObj.image as string];
      } else {
        carObj.images = [];
      }
    }

    return NextResponse.json(carObj);
  } catch (error) {
    console.error("Error fetching car:", error);
    return NextResponse.json({ error: "Failed to fetch car" }, { status: 500 });
  }
}

// PUT /api/cars/[id] — Update a car
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const car = await Car.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }
    return NextResponse.json(car);
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json(
      { error: "Failed to update car" },
      { status: 500 },
    );
  }
}

// DELETE /api/cars/[id] — Delete a car
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const car = await Car.findByIdAndDelete(id);
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error);
    return NextResponse.json(
      { error: "Failed to delete car" },
      { status: 500 },
    );
  }
}
