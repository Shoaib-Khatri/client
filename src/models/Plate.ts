import mongoose, { Schema } from "mongoose";

export interface IPlate {
  registration: string;
  price: number;
  style: string;
}

const PlateSchema = new Schema(
  {
    registration: { type: String, required: true },
    price: { type: Number, required: true },
    style: { type: String, required: true, default: "Standard" },
  },
  { timestamps: true },
);

// Delete cached model in development to pick up schema changes
if (mongoose.models.Plate) {
  delete mongoose.models.Plate;
}

export default mongoose.model("Plate", PlateSchema);
