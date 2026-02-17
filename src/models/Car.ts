import mongoose, { Document, Schema } from "mongoose";

export interface ICar extends Document {
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
}

const CarSchema: Schema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

export default mongoose.models.Car || mongoose.model<ICar>("Car", CarSchema);
