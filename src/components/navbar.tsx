"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Menu,
  Car,
  Hammer,
  Heart,
  GitCompare,
  User,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { wishlist, compareList } = useStore();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <Car className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl tracking-tight">
                AutoPlates UK
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/cars"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Buy a Car
              </Link>
              <Link
                href="/plates"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <Hammer className="w-4 h-4 mr-1" />
                Plate Builder
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/wishlist"
              className="p-2 rounded-full text-gray-400 hover:text-red-500 focus:outline-none relative"
            >
              <Heart className="h-6 w-6" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              href="/compare"
              className="p-2 rounded-full text-gray-400 hover:text-indigo-500 focus:outline-none relative"
            >
              <GitCompare className="h-6 w-6" />
              {compareList.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 transform translate-x-1/4 -translate-y-1/4 bg-indigo-600 rounded-full">
                  {compareList.length}
                </span>
              )}
            </Link>
            <Link
              href="/admin"
              className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <User className="h-6 w-6" />
            </Link>
            <Link
              href="/cart"
              className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <div className="-mr-2 flex items-center sm:hidden ml-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("sm:hidden", isOpen ? "block" : "hidden")}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/cars"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
          >
            Buy a Car
          </Link>
          <Link
            href="/plates"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
          >
            Plate Builder
          </Link>
        </div>
      </div>
    </nav>
  );
}
