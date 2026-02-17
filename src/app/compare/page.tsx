"use client";

import { useStore } from "@/store/useStore";
import { Check, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ComparePage() {
  const { compareList, removeFromCompare } = useStore();

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center py-20 bg-white rounded-xl border shadow-sm w-full max-w-2xl px-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Compare list is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Add up to 3 cars to compare them side-by-side.
          </p>
          <Link
            href="/cars"
            className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition bg-blue-600"
          >
            Browse Inventory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Compare Vehicles</h1>
          <Link
            href="/cars"
            className="text-primary hover:underline flex items-center"
          >
            Add more cars <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="overflow-x-auto pb-6">
          <div className="min-w-[800px] bg-white rounded-xl shadow-sm border">
            {/* Grid Header - Image & Name */}
            <div className="grid grid-cols-[200px_repeat(3,1fr)] border-b">
              <div className="p-4 bg-gray-50 font-semibold text-gray-500 flex items-center">
                Vehicle
              </div>
              {compareList.map((car) => (
                <div key={car.id} className="p-4 relative border-l">
                  <button
                    onClick={() => removeFromCompare(car.id)}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500"
                  >
                    <X size={16} />
                  </button>
                  <div className="relative h-32 w-full mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={car.image}
                      alt={car.model}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg">{car.make}</h3>
                  <p className="text-gray-600">{car.model}</p>
                  <p className="text-primary font-bold mt-1">
                    £{car.price.toLocaleString()}
                  </p>
                </div>
              ))}
              {/* Empty slots placeholders */}
              {[...Array(3 - compareList.length)].map((_, i) => (
                <div
                  key={i}
                  className="p-4 border-l bg-gray-50/50 flex items-center justify-center text-gray-400"
                >
                  Empty Slot
                </div>
              ))}
            </div>

            {/* Specs Rows */}
            {[
              { label: "Year", key: "year" },
              {
                label: "Mileage",
                key: "mileage",
                format: (v: number) => `${v.toLocaleString()} mi`,
              },
              { label: "Fuel Type", key: "fuel" },
              { label: "Transmission", key: "transmission" },
              { label: "Body Type", key: "bodyType" },
            ].map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[200px_repeat(3,1fr)] border-b last:border-0 hover:bg-gray-50 transition"
              >
                <div className="p-4 font-medium text-gray-600">{row.label}</div>
                {compareList.map((car) => (
                  <div key={car.id} className="p-4 border-l font-medium">
                    {/* @ts-ignore */}
                    {row.format ? row.format(car[row.key]) : car[row.key]}
                  </div>
                ))}
                {[...Array(3 - compareList.length)].map((_, i) => (
                  <div key={i} className="border-l bg-gray-50/50" />
                ))}
              </div>
            ))}

            {/* Action Row */}
            <div className="grid grid-cols-[200px_repeat(3,1fr)] bg-gray-50 rounded-b-xl">
              <div className="p-4"></div>
              {compareList.map((car) => (
                <div key={car.id} className="p-4 border-l">
                  <Link
                    href={`/cars/${car.id}`}
                    className="block w-full text-center bg-gray-900 text-white py-2 rounded font-semibold hover:bg-gray-800"
                  >
                    View Details
                  </Link>
                </div>
              ))}
              {[...Array(3 - compareList.length)].map((_, i) => (
                <div key={i} className="border-l" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
