"use client";

import Image from "next/image";
import Link from "next/link";
import { Fuel, Gauge, Calendar, Cog } from "lucide-react";
import { Car } from "@/lib/data";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition flex flex-col h-full relative group">
      <div className="relative h-48 w-full bg-gray-200">
        <Image
          src={car.images?.[0] || "/placeholder-car.png"}
          alt={`${car.make} ${car.model}`}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-bold">
            £{car.price.toLocaleString()}
          </div>
        </div>
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
            href={`/cars/${car._id}`}
            className="flex-1 bg-primary text-white text-center py-2 rounded-lg font-semibold hover:bg-primary/90 transition bg-blue-600"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
