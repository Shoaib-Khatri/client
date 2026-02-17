"use client";

import { useStore } from "@/store/useStore";
import { CarCard } from "@/components/car-card";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-red-100 text-red-600 rounded-full">
            <Heart size={32} />
          </div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border shadow-sm">
            <Heart size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Start browsing to find your dream car.
            </p>
            <Link
              href="/cars"
              className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition bg-blue-600"
            >
              Browse Inventory
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
