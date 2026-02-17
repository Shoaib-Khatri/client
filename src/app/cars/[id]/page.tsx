import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CARS } from "@/lib/data";
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  Cog,
  Phone,
  Mail,
  Share2,
  Heart,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";

interface CarDetailsPageProps {
  params: {
    id: string;
  };
}

// In Next.js 15, params is a Promise. But in 14 it's an object.
// Safe to assume async for future compat or just access if type allows.
// We'll treat it as standard Server Component.

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { id } = params;
  const car = CARS.find((c) => c.id === id);

  if (!car) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back */}
        <div className="mb-6">
          <Link
            href="/cars"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Inventory
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gallery Section */}
          <div className="space-y-4">
            <div className="relative h-[400px] lg:h-[500px] bg-gray-200 rounded-xl overflow-hidden shadow-sm">
              <Image
                src={car.image}
                alt={`${car.make} ${car.model}`}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {/* Placeholder for more images */}
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-video bg-gray-200 rounded-lg relative overflow-hidden cursor-pointer hover:opacity-80 transition"
                >
                  <Image
                    src={car.image}
                    alt="Gallery thumbnail"
                    className="object-cover"
                    fill
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {car.make} {car.model}
                  </h1>
                  <p className="text-gray-500 mt-1">
                    {car.year} • {car.bodyType}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">
                    £{car.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Link
                  href="#contact"
                  className="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition flex items-center justify-center bg-blue-600"
                >
                  <Phone className="w-5 h-5 mr-2" /> Contact Seller
                </Link>
                <button className="p-3 border rounded-lg hover:bg-gray-50 text-gray-600">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="p-3 border rounded-lg hover:bg-gray-50 text-gray-600">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h2 className="text-xl font-bold mb-4">Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Year</span>
                  <span className="font-bold">{car.year}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Gauge className="w-6 h-6 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Mileage</span>
                  <span className="font-bold">
                    {car.mileage.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Fuel className="w-6 h-6 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Fuel</span>
                  <span className="font-bold">{car.fuel}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Cog className="w-6 h-6 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Gearbox</span>
                  <span className="font-bold">{car.transmission}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {car.description}
                <br />
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            {/* Contact Form */}
            <div id="contact">
              <ContactForm
                carId={car.id}
                carName={`${car.make} ${car.model}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
