"use client";

import { LayoutGrid, Package, Car } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: "overview" | "cars" | "orders";
  setActiveTab: (tab: "overview" | "cars" | "orders") => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutGrid },
    { id: "orders", label: "Orders", icon: Package },
    { id: "cars", label: "Cars", icon: Car },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 w-[4rem] bg-white rounded-[1.25rem] shadow-xl shadow-gray-200/50 flex flex-col items-center py-8 z-50 border border-gray-100 h-fit">
      {/* Navigation Items */}
      <nav className="flex flex-col gap-6 w-full px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 relative group",
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-600",
              )}
              title={item.label}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />

              {/* Tooltip */}
              <span className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-[60]">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
