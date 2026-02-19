"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { Filter, X, ChevronDown, Loader2 } from "lucide-react";
import { Car } from "@/lib/data";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";
import { CarCard } from "@/components/car-card";

function CarListingContent() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Filters State
  const [selectedMake, setSelectedMake] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [maxMileage, setMaxMileage] = useState<number>(100000);
  const [fuelType, setFuelType] = useState<string>("All");
  const [transmission, setTransmission] = useState<string>("All");

  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await fetch("/api/cars");
        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  // Extract unique values from fetched data
  const makes = useMemo(
    () => ["All", ...Array.from(new Set(cars.map((c) => c.make)))],
    [cars],
  );
  const fuels = useMemo(
    () => ["All", ...Array.from(new Set(cars.map((c) => c.fuel)))],
    [cars],
  );
  const transmissions = ["All", "Manual", "Automatic"];

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
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
  }, [cars, selectedMake, maxPrice, maxMileage, fuelType, transmission]);

  const clearFilters = () => {
    setSelectedMake("All");
    setMaxPrice(100000);
    setMaxMileage(100000);
    setFuelType("All");
    setTransmission("All");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Banner */}
      <div className="bg-[#1176C8] text-white py-12 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Premium Inventory
        </h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          Discover our curated collection of high-performance and luxury
          vehicles.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8">
        {/* Minimal Floating Filter Bar */}
        <div className="bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-200 p-2 mb-10 transition-all duration-300 max-w-5xl mx-auto">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden flex justify-between items-center px-4 py-2">
            <div className="font-bold text-gray-800 flex items-center gap-2">
              <Filter size={18} className="text-primary" />
              <span className="text-sm">Filters</span>
            </div>
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              {isFiltersOpen ? <X size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>

          <div
            className={cn(
              "md:flex flex-wrap gap-2 items-center justify-between",
              isFiltersOpen ? "block px-4 pb-4 pt-2" : "hidden md:flex",
            )}
          >
            <div className="flex flex-wrap gap-2 items-center flex-1 justify-center">
              {/* Make Select */}
              <div className="relative group min-w-30 flex-1 md:flex-none">
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="w-full appearance-none bg-transparent hover:bg-gray-50 border-none text-gray-700 py-2 pl-3 pr-8 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer transition-colors"
                >
                  {makes.map((m) => (
                    <option key={m} value={m}>
                      {m === "All" ? "Make: All" : m}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>

              <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

              {/* Fuel Select */}
              <div className="relative group min-w-30 flex-1 md:flex-none">
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  className="w-full appearance-none bg-transparent hover:bg-gray-50 border-none text-gray-700 py-2 pl-3 pr-8 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer transition-colors"
                >
                  {fuels.map((f) => (
                    <option key={f} value={f}>
                      {f === "All" ? "Fuel: All" : f}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>

              <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

              {/* Transmission Select */}
              <div className="relative group min-w-35 flex-1 md:flex-none">
                <select
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                  className="w-full appearance-none bg-transparent hover:bg-gray-50 border-none text-gray-700 py-2 pl-3 pr-8 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer transition-colors"
                >
                  {transmissions.map((t) => (
                    <option key={t} value={t}>
                      {t === "All" ? "Transmission: All" : t}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>

              <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

              {/* Max Price */}
              <div className="flex-1 md:flex-none min-w-25">
                <div className="flex items-center px-3 py-1.5 hover:bg-gray-50 rounded-full transition-colors">
                  <span className="text-gray-400 text-xs font-medium mr-1">
                    £
                  </span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="bg-transparent font-medium text-gray-700 w-20 text-sm outline-none placeholder-gray-400"
                    placeholder="Max Price"
                    step={1000}
                  />
                </div>
              </div>

              <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

              {/* Max Mileage */}
              <div className="flex-1 md:flex-none min-w-25">
                <div className="flex items-center px-3 py-1.5 hover:bg-gray-50 rounded-full transition-colors">
                  <input
                    type="number"
                    value={maxMileage}
                    onChange={(e) => setMaxMileage(Number(e.target.value))}
                    className="bg-transparent font-medium text-gray-700 w-20 text-sm outline-none placeholder-gray-400"
                    placeholder="Max Miles"
                    step={1000}
                  />
                  <span className="text-gray-400 text-xs font-medium ml-1">
                    mi
                  </span>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="mt-4 md:mt-0 md:ml-2">
              <button
                onClick={clearFilters}
                className="flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-black hover:bg-gray-800 transition-colors px-4 py-2 rounded-full shadow-md"
              >
                <X size={14} />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6 px-2">
          <div className="text-gray-600 font-medium">
            Showing{" "}
            <span className="font-bold text-gray-900">
              {filteredCars.length}
            </span>{" "}
            vehicles
          </div>
        </div>

        {/* Car Grid */}
        <div className="min-h-100">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 size={40} className="text-primary animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Loading vehicles...</p>
            </div>
          ) : filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Filter size={32} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No vehicles found
              </h3>
              <p className="text-gray-500 max-w-sm mb-6">
                Try adjusting your price range or filters to see more results.
              </p>
              <button
                onClick={clearFilters}
                className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition shadow-lg shadow-primary/30"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function ListingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      }
    >
      <CarListingContent />
    </Suspense>
  );
}
