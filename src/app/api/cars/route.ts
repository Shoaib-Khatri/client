import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Car from "@/models/Car";

// GET /api/cars — List all cars
export async function GET() {
  try {
    await connectDB();
    const cars = await Car.find({}).sort({ createdAt: -1 }).lean();

    // Backward compatibility: map old `image` field to `images` array
    const normalized = cars.map((car: Record<string, unknown>) => {
      if (!car.images || (car.images as string[]).length === 0) {
        if (car.image) {
          car.images = [car.image as string];
        } else {
          car.images = [];
        }
      }
      return car;
    });

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { error: "Failed to fetch cars" },
      { status: 500 },
    );
  }
}

// POST /api/cars — Create a new car
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const requiredFields = ["make", "model", "year", "price"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    // Ensure images is an array
    if (!body.images) {
      body.images = [];
    }

    const car = await Car.create(body);
    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.error("Error creating car:", error);
    return NextResponse.json(
      { error: "Failed to create car" },
      { status: 500 },
    );
  }
}
