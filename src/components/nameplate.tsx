import React from "react";
import Image from "next/image";
import Link from "next/link";

const NamePlateCards = () => {
  const plates = [
    {
      id: 1,
      name: "Standard Front Plate",
      style: "Classic White Acrylic",
      img: "/plate1.png",
      price: "£15.99",
    },
    {
      id: 2,
      name: "Standard Rear Plate",
      style: "Classic Yellow Acrylic",
      img: "/plate2.png",
      price: "£15.99",
    },
    {
      id: 3,
      name: "4D Laser Cut",
      style: "Premium Gloss Finish",
      img: "/plate3.png",
      price: "£45.00",
    },
    {
      id: 4,
      name: "Short Plate",
      style: "Custom Width Design",
      img: "/plate4.png",
      price: "£25.00",
    },
  ];

  return (
    <section className="w-full py-20 bg-white flex flex-col items-center px-6">
      {/* Section Heading */}
      <div className="max-w-7xl w-full text-left mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight uppercase">
          UK Road Legal{" "}
          <span className="text-black bg-amber-400 rounded-md px-3 py-1">
            Plates
          </span>
        </h2>

        <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
          Bespoke craftsmanship for your vehicle. Explore our range of British
          standard compliant plates, from classic acrylic to modern 4D designs.
        </p>

        <div className="w-20 h-1 bg-blue-600 mt-6 rounded-full" />
      </div>

      {/* Plates Grid */}
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {plates.map((plate, index) => (
            <div
              key={plate.id}
              className="group bg-slate-50 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative w-full h-32 mb-6 flex items-center justify-center overflow-hidden">
                <Image
                  src={plate.img}
                  alt={plate.name}
                  width={300}
                  height={100}
                  priority={index === 0} // only first image loads with priority
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">
                  {plate.name}
                </h3>

                <p className="text-xs text-blue-600 font-semibold uppercase tracking-widest mb-1">
                  {plate.style}
                </p>

                <p className="text-sm text-slate-500 font-medium italic">
                  {plate.price}
                </p>
              </div>

              {/* Button */}
              <div className="mt-6">
                <Link
                  href="/"
                  className="block text-center px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all duration-300"
                >
                  CUSTOMIZE NOW
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NamePlateCards;
