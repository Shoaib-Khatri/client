"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { removeItem } from "@/store/cartSlice";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
        <Link
          href="/plates"
          className="text-primary hover:underline hover:text-primary/80"
        >
          Go design a plate
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-lg shadow border flex justify-between items-center"
            >
              <div>
                <h3 className="font-mono text-2xl font-bold">{item.reg}</h3>
                <p className="text-sm text-gray-500">
                  {item.config.style.toUpperCase()} |{" "}
                  {item.config.sizeFront.toUpperCase()}
                </p>
                <div className="text-xs text-gray-400 mt-1">
                  Front: {item.config.includeFront ? "Yes" : "No"}, Rear:{" "}
                  {item.config.includeRear ? "Yes" : "No"}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-lg">£{item.price}</span>
                <button
                  onClick={() => dispatch(removeItem(item.id))}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow border h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>£{total}</span>
          </div>
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>£{total}</span>
            </div>
            <Link
              href="/checkout"
              className="block w-full bg-primary text-white text-center py-3 rounded-lg font-bold hover:opacity-90 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
