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
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CartDrawer from "./cart-drawer";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { wishlist, compareList } = useStore();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="w-full bg-[#1176C8] text-white text-center py-2 text-sm font-medium">
        Welcome to WCARS 1959 UK - The Best Custom Number Plates!
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <Car className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl tracking-tight">
                WCARS 1959 UK
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
            {/* Desktop Icons */}
            <div className="hidden sm:flex items-center gap-2">
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
            </div>

            {/* Cart - Always Visible */}
            <CartDrawer>
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none relative">
                <ShoppingCart className="h-6 w-6" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </CartDrawer>

            {/* Hamburger Button */}
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

      {/* Mobile menu - Full Screen Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[100] bg-white transform transition-transform duration-300 ease-in-out sm:hidden flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2"
          >
            <Car className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl tracking-tight text-gray-900">
              WCARS 1959 UK
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
          >
            <X className="h-8 w-8" />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center space-y-8 p-8 overflow-y-auto bg-gray-50/50">
          <Link
            href="/cars"
            onClick={() => setIsOpen(false)}
            className="text-3xl font-bold text-gray-900 hover:text-[#1176C8] transition-colors"
          >
            Buy a Car
          </Link>
          <Link
            href="/plates"
            onClick={() => setIsOpen(false)}
            className="text-3xl font-bold text-gray-900 hover:text-[#1176C8] transition-colors"
          >
            Plate Builder
          </Link>

          <div className="w-16 h-1 bg-gray-200 rounded-full my-6"></div>

          <div className="flex flex-col gap-6 items-center">
            <Link
              href="/wishlist"
              className="flex items-center text-xl font-medium text-gray-600 hover:text-[#1176C8] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Heart className="w-6 h-6 mr-3" />
              Wishlist ({wishlist.length})
            </Link>
            <Link
              href="/compare"
              className="flex items-center text-xl font-medium text-gray-600 hover:text-[#1176C8] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <GitCompare className="w-6 h-6 mr-3" />
              Compare ({compareList.length})
            </Link>
            <Link
              href="/admin"
              className="flex items-center text-xl font-medium text-gray-600 hover:text-[#1176C8] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-6 h-6 mr-3" />
              Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
