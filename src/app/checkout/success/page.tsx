"use client";

import Link from "next/link";
import { Check } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center border border-green-100 shadow-sm">
            <Check size={32} />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Order Confirmed
          </h1>
          <p className="text-gray-500 font-medium">
            Thank you for your purchase. We've sent a confirmation email to your
            address.
          </p>
        </div>

        <div className="pt-4 space-y-4">
          <Link
            href="/"
            className="block w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all active:scale-[0.98]"
          >
            Continue Shopping
          </Link>
          <Link
            href="/cars"
            className="block w-full text-gray-500 font-semibold hover:text-gray-900 transition-colors text-sm"
          >
            Browse Car Listings
          </Link>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
            WCARS 1959 UK
          </p>
        </div>
      </div>
    </div>
  );
}
