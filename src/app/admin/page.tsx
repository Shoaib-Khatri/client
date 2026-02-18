"use client";

import { useState, useEffect, useCallback } from "react";
import { CARS } from "@/lib/data";
import { Plus, Trash2, Edit } from "lucide-react";
import Plate from "@/components/plate-preview";
import Overview from "@/components/admin/Overview";
import Sidebar from "@/components/admin/Sidebar";
import { cn } from "@/lib/utils";

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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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

  const printInvoice = (order: Order) => {
    const invoiceContent = `
      <html>
        <head>
          <title>Invoice #${order._id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px; }
            .details { margin-bottom: 20px; }
            .items { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .items th, .items td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .items th { background-color: #f2f2f2; }
            .total { text-align: right; font-weight: bold; font-size: 1.2em; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>INVOICE</h1>
              <p><strong>WCARS 1959 UK</strong></p>
            </div>
            <div>
              <p>Invoice #: ${order._id}</p>
              <p>Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div class="details">
            <h3>Bill To:</h3>
            <p>${order.customerName}</p>
            <p>${order.customerEmail}</p>
          </div>

          <table class="items">
            <thead>
              <tr>
                <th>Item</th>
                <th>Details</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${order.items
                .map(
                  (item) => `
                <tr>
                  <td>${item.reg || item.make + " " + item.model || "Product"}</td>
                  <td>
                    ${
                      item.config
                        ? `
                      Type: ${item.config.plateType || "N/A"}<br>
                      Style: ${item.config.style || "Standard"}<br>
                      Size: ${item.config.size || "Standard"}<br>
                      Badge: ${item.config.badge || "None"}<br>
                      Border: ${item.config.border || "None"}
                    `
                        : "N/A"
                    }
                  </td>
                  <td>£${item.price}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>

          <div class="total">
            Total: £${order.total.toFixed(2)}
          </div>

          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(invoiceContent);
      printWindow.document.close();
    }
  };

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
        className={`px-3 py-1 rounded-full text-xs font-bold ${colors[status] || "bg-gray-100 text-gray-800"}`}
      >
        {status}
      </span>
    );
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "orders", label: "Orders" },
    { id: "cars", label: "Cars" },
  ];

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-gray-900 font-sans relative">
      {/* Sidebar Navigation (Compact) */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="pl-32 pr-8 py-10 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header with Title and Tabs (No Search/Bell) */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4 ">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
                A
              </div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                WCARS 1959 UK
              </h1>
            </div>

            {/* Tab System (Finexy Style) */}
            <div className="flex items-center gap-2 bg-white rounded-full p-1.5 shadow-sm border border-gray-100">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                    activeTab === tab.id
                      ? "bg-gray-900 text-white shadow-md glow"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === "overview" && (
              <Overview stats={stats} orders={orders} />
            )}

            {activeTab === "orders" && (
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 space-y-6">
                <h2 className="text-2xl font-bold">Order Management</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="p-4 font-bold text-gray-500 uppercase text-xs tracking-wider">
                          Order ID
                        </th>
                        <th className="p-4 font-bold text-gray-500 uppercase text-xs tracking-wider">
                          Customer
                        </th>
                        <th className="p-4 font-bold text-gray-500 uppercase text-xs tracking-wider">
                          Details
                        </th>
                        <th className="p-4 font-bold text-gray-500 uppercase text-xs tracking-wider">
                          Total
                        </th>
                        <th className="p-4 font-bold text-gray-500 uppercase text-xs tracking-wider">
                          Status
                        </th>
                        <th className="p-4 font-bold text-gray-500 uppercase text-xs tracking-wider">
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
                          <td className="p-4 font-bold text-gray-900">
                            £{order.total}
                          </td>
                          <td className="p-4">
                            <StatusBadge status={order.status} />
                          </td>
                          <td className="p-4 flex gap-2">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-100 transition-colors font-medium"
                            >
                              View
                            </button>
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

            {activeTab === "cars" && (
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Car Listings</h2>
                  <button className="bg-primary text-white px-4 py-2 rounded-xl flex items-center font-semibold hover:bg-primary/90 shadow-lg shadow-primary/30 transition-all">
                    <Plus size={18} className="mr-2" /> Add New Car
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-3 text-gray-500 font-bold uppercase text-xs tracking-wider">
                          Image
                        </th>
                        <th className="pb-3 text-gray-500 font-bold uppercase text-xs tracking-wider">
                          Make/Model
                        </th>
                        <th className="pb-3 text-gray-500 font-bold uppercase text-xs tracking-wider">
                          Price
                        </th>
                        <th className="pb-3 text-gray-500 font-bold uppercase text-xs tracking-wider">
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
                              className="h-12 w-20 object-cover rounded-lg shadow-sm"
                            />
                          </td>
                          <td className="py-4 font-bold text-gray-900">
                            {car.make} {car.model}
                          </td>
                          <td className="py-4 text-gray-600">
                            £{car.price.toLocaleString()}
                          </td>
                          <td className="py-4 flex gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Edit size={18} />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b flex justify-between items-center bg-gray-50/50">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Order #{selectedOrder._id.substring(0, 8)}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
              >
                &times;
              </button>
            </div>

            <div className="p-8 space-y-8">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div>
                  <label className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1 block">
                    Customer Details
                  </label>
                  <p className="font-bold text-lg text-gray-900">
                    {selectedOrder.customerName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.customerEmail}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1 block">
                    Current Status
                  </label>
                  <div className="mt-1">
                    <StatusBadge status={selectedOrder.status} />
                  </div>
                </div>
              </div>

              {/* Items */}
              <div>
                <label className="text-xs text-gray-500 uppercase font-bold mb-4 block tracking-wider">
                  Order Items
                </label>
                <div className="space-y-6">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-0 rounded-xl border border-gray-100 overflow-hidden shadow-sm"
                    >
                      <div className="bg-gray-50/50 p-4 border-b border-gray-100 flex justify-between items-center">
                        <span className="font-bold text-lg text-gray-900">
                          {item.reg ||
                            item.make + " " + item.model ||
                            "Product"}
                        </span>
                        <span className="font-bold text-lg text-primary">
                          £{item.price}
                        </span>
                      </div>

                      {item.config && (
                        <div className="p-6">
                          <div className="flex flex-col gap-8">
                            {/* Visual Previews */}
                            <div className="space-y-6">
                              {item.config.includeFront && (
                                <div className="w-full">
                                  <p className="text-xs font-bold text-gray-400 uppercase mb-3 text-center tracking-wider">
                                    Front Plate Preview
                                  </p>
                                  <div className="flex justify-center">
                                    <div className="transform scale-75 sm:scale-90 origin-center transition-transform hover:scale-100 duration-300">
                                      <Plate
                                        variant="front"
                                        reg={item.config.reg}
                                        sizeId={item.config.sizeFront}
                                        style={item.config.style}
                                        border={item.config.border}
                                        badge={item.config.badge}
                                        evStrip={item.config.evStrip}
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}

                              {item.config.includeRear && (
                                <div className="w-full">
                                  <p className="text-xs font-bold text-gray-400 uppercase mb-3 text-center tracking-wider">
                                    Rear Plate Preview
                                  </p>
                                  <div className="flex justify-center">
                                    <div className="transform scale-75 sm:scale-90 origin-center transition-transform hover:scale-100 duration-300">
                                      <Plate
                                        variant="rear"
                                        reg={item.config.reg}
                                        sizeId={item.config.sizeRear}
                                        style={item.config.style}
                                        border={item.config.border}
                                        badge={item.config.badge}
                                        evStrip={item.config.evStrip}
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Specs Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <span className="block text-xs uppercase font-bold text-gray-400 mb-1">
                                  Style
                                </span>
                                <span className="font-semibold text-gray-900">
                                  {item.config.style}
                                </span>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <span className="block text-xs uppercase font-bold text-gray-400 mb-1">
                                  Badge
                                </span>
                                <span className="font-semibold text-gray-900">
                                  {item.config.badge}
                                </span>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <span className="block text-xs uppercase font-bold text-gray-400 mb-1">
                                  Border
                                </span>
                                <span className="font-semibold text-gray-900">
                                  {item.config.border}
                                </span>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <span className="block text-xs uppercase font-bold text-gray-400 mb-1">
                                  Fixing
                                </span>
                                <span className="font-semibold text-gray-900">
                                  {item.config.fixingKit}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                <span className="font-bold text-xl text-gray-900">
                  Total Amount
                </span>
                <span className="font-bold text-3xl text-primary">
                  £{selectedOrder.total}
                </span>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t flex justify-end gap-3 rounded-b-3xl">
              <button
                onClick={() => printInvoice(selectedOrder)}
                className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-black transition-all shadow-lg shadow-gray-900/20 flex items-center gap-2 font-bold"
              >
                Downloads Invoice
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors font-bold"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
