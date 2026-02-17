import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  customerName: string;
  customerEmail: string;
  address: string;
  city: string;
  postalCode: string;
  phoneNumber?: string;
  items: any[];
  total: number;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    phoneNumber: { type: String },
    items: { type: Array, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);

// Check if model exists to prevent overwrite error in hot reload
export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
