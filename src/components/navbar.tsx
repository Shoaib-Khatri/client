"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, Car, Hammer, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CartDrawer from "./cart-drawer";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <nav className="bg-[#1176C8] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Logo */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="WCARS 1959 UK"
                width={400}
                height={200}
                className="h-14 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden sm:flex sm:space-x-8 items-center justify-center flex-1">
            <Link
              href="/cars"
              className="text-white hover:text-white/80 px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors"
            >
              Buy a Car
            </Link>
            <Link
              href="/plates"
              className="text-white hover:text-white/80 px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors flex items-center gap-1"
            >
              <Hammer className="w-4 h-4" />
              Plate Builder
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-2">
            {/* Desktop Icons */}
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/admin"
                className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <User className="h-8 w-8 bg-white p-1.5 rounded-full text-[#1176C8]" />
              </Link>
            </div>

            {/* Cart - Always Visible */}
            <CartDrawer>
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none relative">
                <ShoppingCart className="h-8 w-8 bg-white p-1.5 rounded-full text-[#1176C8]" />
                {cartItems.length > 0 && (
                  <span className="absolute top-2 right-1 inline-flex items-center justify-center px-1.5 p-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </CartDrawer>

            {/* Mobile Menu Button */}
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "sm:hidden fixed inset-0 z-40 bg-white transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        style={{ top: "64px" }}
      >
        <div className="pt-2 pb-3 space-y-1 px-4">
          <Link
            href="/cars"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Buy a Car
          </Link>
          <Link
            href="/plates"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Plate Builder
          </Link>
          <Link
            href="/admin"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
