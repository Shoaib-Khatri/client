"use client";

import { useState, useEffect, useCallback } from "react";
import { CARS } from "@/lib/data";
import { Plus, Trash2, Edit, Package, DollarSign, Clock } from "lucide-react";

// Types
interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: string;
  createdAt: string;
  items: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface DashboardStats {
  totalOrders: number;
  totalEarnings: number;
  pendingOrders: number;
  recentSalesChart: { date: string; sales: number }[];
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "cars" | "orders">(
    "overview",
  );
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalEarnings: 0,
    pendingOrders: 0,
    recentSalesChart: [],
  });
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, []);

  const updateOrderStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchOrders(); // Refresh orders
      fetchStats(); // Refresh stats
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Fetch Data
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchStats();
      fetchOrders();
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const StatusBadge = ({ status }: { status: string }) => {
    const colors: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-800",
      PROCESSING: "bg-blue-100 text-blue-800",
      SHIPPED: "bg-purple-100 text-purple-800",
      DELIVERED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[status] || "bg-gray-100 text-gray-800"}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {/* Tabs */}
          <div className="border-b flex">
            {["overview", "cars", "orders"].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setActiveTab(tab as "overview" | "cars" | "orders")
                }
                className={`flex-1 py-4 font-semibold text-center capitalize ${
                  activeTab === tab
                    ? "bg-gray-50 text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div>
                <h2 className="text-xl font-bold mb-6">Dashboard Overview</h2>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-blue-800 font-medium">
                        Total Earnings
                      </h3>
                      <DollarSign className="text-blue-500" />
                    </div>
                    <p className="text-3xl font-bold text-blue-900">
                      £{stats?.totalEarnings?.toLocaleString() || 0}
                    </p>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-purple-800 font-medium">
                        Total Orders
                      </h3>
                      <Package className="text-purple-500" />
                    </div>
                    <p className="text-3xl font-bold text-purple-900">
                      {stats?.totalOrders || 0}
                    </p>
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-yellow-800 font-medium">
                        Pending Orders
                      </h3>
                      <Clock className="text-yellow-500" />
                    </div>
                    <p className="text-3xl font-bold text-yellow-900">
                      {stats?.pendingOrders || 0}
                    </p>
                  </div>
                </div>

                {/* Recent Orders Preview */}
                <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Total</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order._id} className="border-b">
                          <td className="p-3 font-mono text-sm text-gray-500">
                            {order._id.substring(0, 8)}...
                          </td>
                          <td className="p-3">{order.customerName}</td>
                          <td className="p-3 text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-3 font-medium">£{order.total}</td>
                          <td className="p-3">
                            <StatusBadge status={order.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-bold mb-6">Order Management</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="p-4 font-semibold text-gray-600">
                          Order ID
                        </th>
                        <th className="p-4 font-semibold text-gray-600">
                          Customer
                        </th>
                        <th className="p-4 font-semibold text-gray-600">
                          Details
                        </th>
                        <th className="p-4 font-semibold text-gray-600">
                          Total
                        </th>
                        <th className="p-4 font-semibold text-gray-600">
                          Status
                        </th>
                        <th className="p-4 font-semibold text-gray-600">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {orders.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-50">
                          <td className="p-4 font-mono text-sm text-gray-500">
                            #{order._id.substring(0, 6)}
                          </td>
                          <td className="p-4">
                            <div className="font-medium">
                              {order.customerName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.customerEmail}
                            </div>
                          </td>
                          <td className="p-4 text-sm">
                            {order.items.length} items
                          </td>
                          <td className="p-4 font-bold">£{order.total}</td>
                          <td className="p-4">
                            <StatusBadge status={order.status} />
                          </td>
                          <td className="p-4">
                            <select
                              className="border rounded p-1 text-sm bg-white"
                              value={order.status}
                              onChange={(e) =>
                                updateOrderStatus(order._id, e.target.value)
                              }
                            >
                              <option value="PENDING">Pending</option>
                              <option value="PROCESSING">Processing</option>
                              <option value="SHIPPED">Shipped</option>
                              <option value="DELIVERED">Delivered</option>
                              <option value="CANCELLED">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                      {orders.length === 0 && (
                        <tr>
                          <td
                            colSpan={6}
                            className="p-8 text-center text-gray-500"
                          >
                            No orders found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* CARS TAB (Preserved) */}
            {activeTab === "cars" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Car Listings</h2>
                  <button className="bg-custom-green text-white px-4 py-2 rounded-lg flex items-center font-semibold bg-green-600 hover:bg-green-700">
                    <Plus size={18} className="mr-2" /> Add New Car
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-3 text-gray-600 font-medium">
                          Image
                        </th>
                        <th className="pb-3 text-gray-600 font-medium">
                          Make/Model
                        </th>
                        <th className="pb-3 text-gray-600 font-medium">
                          Price
                        </th>
                        <th className="pb-3 text-gray-600 font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {CARS.map((car) => (
                        <tr key={car.id}>
                          <td className="py-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={car.image}
                              alt={car.model}
                              className="h-12 w-20 object-cover rounded"
                            />
                          </td>
                          <td className="py-4 font-medium">
                            {car.make} {car.model}
                          </td>
                          <td className="py-4">
                            £{car.price.toLocaleString()}
                          </td>
                          <td className="py-4 flex gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                              <Edit size={18} />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
