import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#1176C8] text-white pt-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* --- Row 1: Top Navigation --- */}
        <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-[10px] font-bold uppercase tracking-[0.2em] mb-10 opacity-80">
          <Link href="/" className="hover:opacity-100 transition-opacity">
            About Us
          </Link>
          <Link href="/" className="hover:opacity-100 transition-opacity">
            Products
          </Link>
          <Link href="/" className="hover:opacity-100 transition-opacity">
            Awards
          </Link>
          <Link href="/" className="hover:opacity-100 transition-opacity">
            Help
          </Link>
          <Link href="/" className="hover:opacity-100 transition-opacity">
            Contact
          </Link>
        </nav>

        {/* --- Row 2: Thin Divider (Matching the Hero Divider) --- */}
        <div className="w-full max-w-4xl h-[1px] bg-white/10 mb-10" />

        {/* --- Row 3: Centered Description Paragraph --- */}
        <div className="max-w-2xl text-center mb-10">
          <p className="text-sm md:text-base leading-relaxed text-white font-light italic">
            &quot;Engineering excellence since 1959. WCARS1959 is dedicated to
            providing the highest quality automotive nameplates and custom plate
            solutions for enthusiasts who demand precision and style.&quot;
          </p>
        </div>

        {/* --- Row 4: Social Media Icons --- */}
        <div className="flex justify-center gap-10 mb-14">
          <Link
            href="#"
            className="text-white/60 hover:text-white transition-all transform hover:-translate-y-1"
          >
            <Facebook size={18} />
          </Link>
          <Link
            href="#"
            className="text-white/60 hover:text-white transition-all transform hover:-translate-y-1"
          >
            <Twitter size={18} />
          </Link>
          <Link
            href="#"
            className="text-white/60 hover:text-white transition-all transform hover:-translate-y-1"
          >
            <Instagram size={18} />
          </Link>
          <Link
            href="#"
            className="text-white/60 hover:text-white transition-all transform hover:-translate-y-1"
          >
            <Linkedin size={18} />
          </Link>
          <Link
            href="#"
            className="text-white/60 hover:text-white transition-all transform hover:-translate-y-1"
          >
            <Youtube size={18} />
          </Link>
        </div>
      </div>

      {/* --- Row 5: Darker Copyright Bar --- */}
      {/* bg-black/20 darkens the existing blue gradient at the bottom */}
      <div className="w-full bg-black/10 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-medium">
            © 2026 Copyright:{" "}
            <span className="text-white/60 font-black">WCARS1959.com</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
