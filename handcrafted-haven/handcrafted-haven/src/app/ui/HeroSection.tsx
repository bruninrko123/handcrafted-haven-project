"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const images = ["/images/heroLarge.webp", "/images/hero-image.webp"];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[80vh] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden">
      
      {/* Background Images */}
      {images.map((img, index) => (
        <Image
          key={index}
          src={img}
          alt="Hero Background"
          width={512}
          height={512}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-5xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
          Discover Unique{" "}
          <span className="text-[#e2cdb4]">Handcrafted</span> Treasures
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
          Handcrafted Haven connects passionate artisans with discerning buyers
          who appreciate the beauty, quality, and story behind every handmade
          creation.
        </p>

        {/* Statistics */}
        <div className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: "500+", label: "Artisans" },
            { value: "10K+", label: "Unique Items" },
            { value: "50K+", label: "Happy Customers" },
            { value: "4.9★", label: "Average Rating" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#e2cdb4]">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-gray-200 mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-10 mb-12 flex justify-center">
          <Link
          href="/products"
          className="px-8 py-4 bg-[#e2cdb4] text-[#3e2c23] font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Explore Products
        </Link>
        </div>


      </div>
    </section>
  );
};

export default HeroSection;
