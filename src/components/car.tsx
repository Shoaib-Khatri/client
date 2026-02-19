"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpCircle, Loader2 } from "lucide-react";
import { Car } from "@/lib/data";

const CarCards = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await fetch("/api/cars");
        const data = await res.json();
        setCars(data.slice(0, 3)); // Show first 3 on homepage
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  return (
    <section className="w-full py-20 bg-white flex flex-col items-center px-6">
      {/* --- Section Heading --- */}
      <div className="max-w-7xl w-full flex justify-between items-end mb-16">
        <div className="text-left">
          <h2 className="text-2xl md:text-2xl font-extrabold text-slate-900 mb-4 tracking-tight uppercase">
            Available Inventory
          </h2>
          <div className="w-20 h-1 bg-blue-600 rounded-full" />
        </div>

        <Link
          href="/listing"
          className="text-blue-600 font-bold uppercase tracking-widest text-sm hover:underline decoration-2 underline-offset-8 transition-all"
        >
          See Listing
        </Link>
      </div>

      {/* --- Cards Grid --- */}
      <div className="w-full flex justify-center">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={32} className="text-primary animate-spin" />
          </div>
        ) : cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl">
            {cars.map((car) => (
              <div
                key={car._id}
                className="group bg-slate-50 rounded-[2.5rem] p-6 border border-slate-200 flex flex-col w-full transition-colors hover:border-blue-200"
              >
                {/* Image Container */}
                <div className="relative w-full h-64 bg-slate-50 rounded-[2rem] overflow-hidden flex items-center justify-center mb-6">
                  <Image
                    src={car.images?.[0] || "/placeholder-car.png"}
                    alt={`${car.make} ${car.model}`}
                    width={350}
                    height={180}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Text Content */}
                <div className="px-2 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-800 leading-tight">
                      {car.make} {car.model}
                    </h3>
                    <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg shrink-0">
                      <span className="text-xs font-bold text-blue-600 uppercase">
                        {car.fuel}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-500 text-sm mb-6 line-clamp-1 font-light italic">
                    {car.description}
                  </p>

                  <div className="mt-auto">
                    <p className="text-3xl font-black text-slate-900 mb-6">
                      £{car.price.toLocaleString()}
                    </p>

                    {/* Primary Action Button */}
                    <Link
                      href={`/cars/${car._id}`}
                      className="w-full bg-blue-600 text-white py-5 px-8 rounded-2xl flex justify-between items-center hover:bg-blue-700 transition-all"
                    >
                      <span className="text-sm font-bold uppercase tracking-[0.2em]">
                        See Details
                      </span>
                      <ArrowUpCircle size={26} className="text-white/90" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 py-12">
            No vehicles in inventory yet. Check back soon!
          </p>
        )}
      </div>
    </section>
  );
};

export default CarCards;
