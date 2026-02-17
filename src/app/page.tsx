import Link from "next/link";
import { ArrowRight, Car, Hammer } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
            Premium Cars & Custom Plates
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            Find your dream car or design the perfect 4D number plate today.
            UK&apos;s leading automotive customization shop.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/cars"
              className="bg-white text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition flex items-center"
            >
              <Car className="mr-2 h-5 w-5" />
              Browse Cars
            </Link>
            <Link
              href="/plates"
              className="bg-primary px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition text-white border border-transparent flex items-center bg-blue-600"
            >
              <Hammer className="mr-2 h-5 w-5" />
              Build Plates
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-gray-50 flex-grow">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
              <Hammer size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Number Plate Builder</h3>
            <p className="text-gray-600 mb-4">
              Create fully road-legal 3D and 4D text plates. Customize sizes,
              borders, and badges with our live preview engine.
            </p>
            <Link
              href="/plates"
              className="text-blue-600 font-semibold hover:underline flex items-center"
            >
              Start Designing <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
              <Car size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Quality Used Cars</h3>
            <p className="text-gray-600 mb-4">
              Browse our inventory of hand-picked vehicles. Detailed specs,
              high-res galleries, and competitive pricing.
            </p>
            <Link
              href="/cars"
              className="text-green-600 font-semibold hover:underline flex items-center"
            >
              View Inventory <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
