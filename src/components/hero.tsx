import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative w-full h-[60vh] sm:h-[75vh] md:h-[85vh] overflow-hidden flex flex-col items-center justify-center bg-[#1176C8] pb-16 sm:pb-20 md:pb-24">
      {/* --- Ghosted Backdrop Text --- */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 px-4 bottom-20">
        <h1 className="text-[17vw] sm:text-[18vw] md:text-[16vw] font-black text-white/10 leading-none uppercase tracking-tighter animate-hero-backdrop whitespace-nowrap">
          WCARS1959
        </h1>
      </div>

      {/* --- Car Image --- */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mt-8 sm:mt-10 md:mt-12 px-4 flex justify-center items-center top-8 sm:top-16 md:top-30 animate-hero-car">
        <div className="relative w-full aspect-video sm:aspect-21/9">
          <Image
            src="/heroimg.png"
            alt="Luxury Cars"
            fill
            priority
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* --- Bottom Taglines --- */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 w-full text-center text-white z-20 px-4">
        <h2 className="text-[8px] sm:text-[9px] md:text-[10px] font-black mb-1 sm:mb-2 uppercase tracking-[0.3em] sm:tracking-[0.5em] opacity-90 animate-hero-tagline">
          Make The Right Choice
        </h2>
        <p className="text-sm sm:text-base md:text-lg font-light tracking-wide italic opacity-80 animate-hero-subtitle">
          Find Your Dream Car, Which will Give You Wings
        </p>
      </div>
    </section>
  );
};

export default Hero;
