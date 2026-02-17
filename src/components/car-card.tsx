"use client";

import Image from "next/image";
import Link from "next/link";
import { Fuel, Gauge, Calendar, Cog, Heart } from "lucide-react";
import { Car } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    addToCompare,
    removeFromCompare,
    isInCompare,
  } = useStore();
  const isWishlisted = isInWishlist(car.id);
  const isCompared = isInCompare(car.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(car.id);
    } else {
      addToCompare(car);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition flex flex-col h-full relative group">
      <div className="relative h-48 w-full bg-gray-200">
        <Image
          src={car.image}
          alt={`${car.make} ${car.model}`}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-bold">
            £{car.price.toLocaleString()}
          </div>
        </div>
        <button
          onClick={toggleWishlist}
          className={cn(
            "absolute top-2 left-2 p-2 rounded-full shadow-sm transition hover:scale-110",
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-white/80 text-gray-600 hover:bg-white",
          )}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900">
          {car.make} {car.model}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {car.description}
        </p>

        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={14} /> <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge size={14} /> <span>{car.mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel size={14} /> <span>{car.fuel}</span>
          </div>
          <div className="flex items-center gap-1">
            <Cog size={14} /> <span>{car.transmission}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t flex gap-2">
          <Link
            href={`/cars/${car.id}`}
            className="flex-1 bg-primary text-white text-center py-2 rounded-lg font-semibold hover:bg-primary/90 transition bg-blue-600"
          >
            View Details
          </Link>
          <button
            onClick={toggleCompare}
            className={cn(
              "px-3 py-2 border rounded-lg text-sm font-semibold transition",
              isCompared
                ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                : "hover:bg-gray-50 text-gray-700",
            )}
          >
            {isCompared ? "Added" : "Compare"}
          </button>
        </div>
      </div>
    </div>
  );
}
