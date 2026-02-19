"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Fuel,
  Gauge,
  Cog,
  Check,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Car } from "@/lib/data";
import Footer from "@/components/footer";

export default function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    async function fetchCar() {
      try {
        const { id } = await params;
        const res = await fetch(`/api/cars/${id}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setCar(data);
      } catch (error) {
        console.error("Error fetching car:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 size={40} className="text-primary animate-spin" />
      </div>
    );
  }

  if (notFound || !car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Car Not Found</h1>
        <p className="text-gray-500 mb-6">
          The vehicle you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/listing"
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition"
        >
          Back to Listings
        </Link>
      </div>
    );
  }

  const images = car.images?.length ? car.images : ["/placeholder-car.png"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link
            href="/listing"
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Back to Inventory
          </Link>
          <div className="font-bold text-xl tracking-tight">WCARS 1959 UK</div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-100 md:h-125 w-full bg-gray-200 rounded-3xl overflow-hidden shadow-lg group">
              <Image
                src={images[selectedImage]}
                alt={`${car.make} ${car.model}`}
                fill
                className="object-cover"
                priority
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1,
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1,
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                    {selectedImage + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative h-24 bg-gray-200 rounded-xl overflow-hidden transition-all ${
                      selectedImage === i
                        ? "ring-2 ring-primary opacity-100"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`View ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div>
            <div className="mb-2">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                {car.bodyType}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
              {car.make} {car.model}
            </h1>
            <p className="text-gray-500 text-lg mb-6">{car.description}</p>

            <div className="text-4xl font-black text-gray-900 mb-8">
              £{car.price.toLocaleString()}
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Calendar size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase">
                    YEAR
                  </div>
                  <div className="font-bold text-gray-900">{car.year}</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Gauge size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase">
                    MILEAGE
                  </div>
                  <div className="font-bold text-gray-900">
                    {car.mileage.toLocaleString()} mi
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Fuel size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase">
                    FUEL
                  </div>
                  <div className="font-bold text-gray-900">{car.fuel}</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Cog size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase">
                    TRANSMISSION
                  </div>
                  <div className="font-bold text-gray-900">
                    {car.transmission}
                  </div>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Premium Features
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                {[
                  "Leather Interior",
                  "Navigation System",
                  "Heated Seats",
                  "Climate Control",
                  "Bluetooth",
                  "Parking Sensors",
                  "Alloy Wheels",
                  "Cruise Control",
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <Check size={16} className="text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button className="flex-1 bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition shadow-lg shadow-primary/30">
                Enquire Now
              </button>
              <button className="flex-1 bg-white border border-gray-200 text-gray-900 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition">
                Book Test Drive
              </button>
            </div>
          </div>
        </div>
      </main>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
