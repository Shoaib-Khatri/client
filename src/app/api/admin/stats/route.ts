import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

interface IOrder {
  total: number;
  status: string;
  createdAt: string | Date;
}

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find();

    const totalOrders = orders.length;
    const totalEarnings = orders.reduce(
      (sum: number, order: IOrder) => sum + (order.total || 0),
      0,
    );
    const pendingOrders = orders.filter(
      (order: IOrder) => order.status === "PENDING",
    ).length;

    // Calculate sales over time (by date)
    const salesByDate: Record<string, number> = {};

    orders.forEach((order: IOrder) => {
      const date = new Date(order.createdAt).toISOString().split("T")[0];
      salesByDate[date] = (salesByDate[date] || 0) + (order.total || 0);
    });

    const salesChartData = Object.keys(salesByDate)
      .map((date) => ({
        date,
        sales: salesByDate[date],
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Take last 7 entries
    const recentSalesChart = salesChartData.slice(-7);

    return NextResponse.json({
      totalOrders,
      totalEarnings,
      pendingOrders,
      recentSalesChart,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
