"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Package,
  Clock,
  Wallet,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types matching the ones in page.tsx
interface DashboardStats {
  totalOrders: number;
  totalEarnings: number;
  pendingOrders: number;
  recentSalesChart: { date: string; sales: number }[];
}

interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: string;
  createdAt: string;
  items: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface OverviewProps {
  stats: DashboardStats;
  orders: Order[];
}

export default function Overview({ stats, orders }: OverviewProps) {
  // Calculate Avg Order Value
  const avgOrderValue =
    stats.totalOrders > 0 ? stats.totalEarnings / stats.totalOrders : 0;

  // Recent Orders (Last 5)
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Good morning, Admin
        </h1>
        <p className="text-gray-500 mt-1">
          Stay on top of your auto plates business.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column (Widgets) */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-6 h-fit">
          {/* Total Earnings (Primary Color) */}
          <div className="bg-primary text-white p-6 rounded-[2rem] shadow-xl shadow-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20 transform group-hover:scale-110 transition-transform">
              <Wallet size={48} />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                <span className="text-white/80 font-medium">
                  Total Earnings
                </span>
                <div className="bg-white/20 p-1.5 rounded-lg">
                  <ArrowUpRight size={16} />
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-4xl font-bold tracking-tight">
                  £{stats.totalEarnings.toLocaleString()}
                </h3>
                <div className="flex items-center mt-2 text-white/80 text-sm">
                  <ArrowUpRight size={14} className="mr-1" />
                  <span>+7% This month</span>
                </div>
              </div>
            </div>
          </div>

          {/* Total Orders (White) */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <span className="text-gray-500 font-medium">Total Orders</span>
              <div className="bg-gray-50 p-1.5 rounded-lg text-gray-400">
                <Package size={16} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-gray-900">
                {stats.totalOrders}
              </h3>
              <div className="flex items-center mt-2 text-red-500 text-sm">
                <ArrowDownRight size={14} className="mr-1" />
                <span>-2% This month</span>
              </div>
            </div>
          </div>

          {/* Pending Orders (White) */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <span className="text-gray-500 font-medium">Pending Orders</span>
              <div className="bg-gray-50 p-1.5 rounded-lg text-gray-400">
                <Clock size={16} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-gray-900">
                {stats.pendingOrders}
              </h3>
              <div className="flex items-center mt-2 text-green-500 text-sm">
                <ArrowUpRight size={14} className="mr-1" />
                <span>8% This month</span>
              </div>
            </div>
          </div>

          {/* Avg Order Value (White) */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <span className="text-gray-500 font-medium">
                Avg. Order Value
              </span>
              <div className="bg-gray-50 p-1.5 rounded-lg text-gray-400">
                <DollarSign size={16} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-gray-900">
                £{avgOrderValue.toFixed(0)}
              </h3>
              <div className="flex items-center mt-2 text-green-500 text-sm">
                <ArrowUpRight size={14} className="mr-1" />
                <span>4% This month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Chart) */}
        <div className="lg:col-span-2 bg-[#1a1a1a] p-8 rounded-[2rem] shadow-2xl text-white flex flex-col relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="flex justify-between items-center mb-8 relative z-10">
            <h3 className="text-xl font-bold">Profit and Loss</h3>
            <button className="text-gray-400 hover:text-white transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="flex-1 min-h-[200px] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={
                  stats.recentSalesChart.length > 0
                    ? stats.recentSalesChart
                    : [
                        { date: "Mon", sales: 0 },
                        { date: "Tue", sales: 0 },
                        { date: "Wed", sales: 0 },
                      ]
                }
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#333"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke="#666"
                  tick={{ fill: "#666", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#666"
                  tick={{ fill: "#666", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `£${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#262626",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
                  }}
                  itemStyle={{ color: "#fff" }}
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                />
                <Bar
                  dataKey="sales"
                  fill="var(--primary)" // Utilizing CSS variable if available, else standard primary color
                  radius={[6, 6, 0, 0]}
                  barSize={32}
                  // Using a specific color if variable fails
                  style={{ fill: "#ea580c" }} // Fallback to orange-600 if variable not found, but user asked for PRIMARY. Let's assume global css sets primary.
                  className="fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Recent Activities</h3>
          <button className="text-sm font-medium text-primary hover:text-primary/80">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="pb-4 pl-4">Customer</th>
                <th className="pb-4">Order ID</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right pr-4">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order) => (
                <tr
                  key={order._id}
                  className="group hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm">
                        {order.customerName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">
                          {order.customerName}
                        </p>
                        <p className="text-xs text-gray-400">
                          {order.customerEmail}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-sm font-mono text-gray-500">
                    #{order._id.substring(0, 8)}
                  </td>
                  <td className="py-4 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                    <br />
                    <span className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </td>
                  <td className="py-4">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold",
                        order.status === "PENDING" &&
                          "bg-yellow-100 text-yellow-700",
                        order.status === "PROCESSING" &&
                          "bg-blue-100 text-blue-700",
                        order.status === "SHIPPED" &&
                          "bg-purple-100 text-purple-700",
                        order.status === "DELIVERED" &&
                          "bg-green-100 text-green-700",
                        order.status === "CANCELLED" &&
                          "bg-red-100 text-red-700",
                      )}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-right pr-4 font-bold text-gray-900">
                    £{order.total.toFixed(2)}
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">
                    No recent activity found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
