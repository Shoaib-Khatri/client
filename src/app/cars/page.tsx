"use client";

import { useState, useMemo } from "react";
import { CarCard } from "@/components/car-card";
import { CARS, Car } from "@/lib/data";
import { Filter, X } from "lucide-react";

export default function CarsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filters State
  const [selectedMake, setSelectedMake] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [maxMileage, setMaxMileage] = useState<number>(100000);
  const [fuelType, setFuelType] = useState<string>("All");
  const [transmission, setTransmission] = useState<string>("All");

  // Extract unique values for dropdowns
  const makes = ["All", ...Array.from(new Set(CARS.map((c) => c.make)))];
  const fuels = ["All", ...Array.from(new Set(CARS.map((c) => c.fuel)))];

  const filteredCars = useMemo(() => {
    return CARS.filter((car) => {
      const matchMake = selectedMake === "All" || car.make === selectedMake;
      const matchPrice = car.price <= maxPrice;
      const matchMileage = car.mileage <= maxMileage;
      const matchFuel = fuelType === "All" || car.fuel === fuelType;
      const matchTransmission =
        transmission === "All" || car.transmission === transmission;

      return (
        matchMake &&
        matchPrice &&
        matchMileage &&
        matchFuel &&
        matchTransmission
      );
    });
  }, [selectedMake, maxPrice, maxMileage, fuelType, transmission]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Search Our Inventory
          </h1>
          <p className="mt-2 text-gray-500">
            Find the perfect car from our premium selection.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <button
            className="lg:hidden flex items-center gap-2 bg-white p-3 rounded-lg border shadow-sm font-semibold"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Filter size={20} /> Filters
          </button>

          {/* Sidebar Filters */}
          <aside
            className={`
            lg:w-64 flex-shrink-0 space-y-8 lg:block
            ${isSidebarOpen ? "block" : "hidden"}
          `}
          >
            <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
              <div className="flex items-center justify-between lg:hidden">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={() => setIsSidebarOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              {/* Make */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Make
                </label>
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                >
                  {makes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price: £{maxPrice.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Mileage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Mileage: {maxMileage.toLocaleString()} mi
                </label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="5000"
                  value={maxMileage}
                  onChange={(e) => setMaxMileage(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Fuel */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                >
                  {fuels.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              {/* Transmission */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transmission
                </label>
                <select
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                >
                  <option value="All">All</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSelectedMake("All");
                  setMaxPrice(100000);
                  setSelectedMake("All");
                  setFuelType("All");
                  setTransmission("All");
                }}
                className="w-full text-sm text-gray-500 hover:text-gray-900 underline"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Car Grid */}
          <main className="flex-1">
            <div className="mb-4 text-gray-500">
              Showing {filteredCars.length} results
            </div>

            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border">
                <p className="text-gray-500 text-lg">
                  No cars match your criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedMake("All");
                    setMaxPrice(100000);
                  }}
                  className="mt-4 text-primary hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
