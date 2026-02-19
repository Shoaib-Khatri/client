import mongoose, { Schema } from "mongoose";

export interface ICar {
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: "Petrol" | "Diesel" | "EV" | "Hybrid";
  transmission: "Manual" | "Automatic";
  bodyType: "SUV" | "Sedan" | "Hatchback";
  images: string[];
  description: string;
}

const CarSchema = new Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number, required: true, default: 0 },
    fuel: {
      type: String,
      required: true,
      enum: ["Petrol", "Diesel", "EV", "Hybrid"],
      default: "Petrol",
    },
    transmission: {
      type: String,
      required: true,
      enum: ["Manual", "Automatic"],
      default: "Automatic",
    },
    bodyType: {
      type: String,
      required: true,
      enum: ["SUV", "Sedan", "Hatchback"],
      default: "Sedan",
    },
    images: { type: [String], default: [] },
    description: { type: String, default: "" },
  },
  { timestamps: true },
);

// Delete cached model in development to pick up schema changes
if (mongoose.models.Car) {
  delete mongoose.models.Car;
}

export default mongoose.model("Car", CarSchema);
