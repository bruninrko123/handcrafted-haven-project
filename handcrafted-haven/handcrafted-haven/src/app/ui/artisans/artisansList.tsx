'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ArtisansList() {

  type Artisan = {
    _id: string;
    name: string;
    email: string;
    bio: string;
    specialty: string;
    profileImage: string;
  };

  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const res = await fetch("/api/artisans");
        const data = await res.json();
        setArtisans(data);
      } catch (error) {
        console.error("Failed to fetch artisans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f5f2]">
        <p className="text-lg text-[#6B4F3F] animate-pulse">
          Loading artisans...
        </p>
      </div>
    );

  return (
    <section className="bg-[#f8f5f2] min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-14">
          <p className="uppercase tracking-widest text-sm text-[#6B4F3F] mb-3">
            Meet the Makers
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#3e2c23]">
            Our Artisans
          </h1>
          <div className="w-24 h-1 bg-[#e2cdb4] mx-auto mt-5 rounded-full"></div>
        </div>

        {/* Artisan List */}
        <div className="space-y-10">
          {artisans.map((artisan) => (
            <section
              key={artisan._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center"
            >
              {/* Image */}
              <div className="relative w-40 h-40 shrink-0">
                <Image
                  src={artisan.profileImage}
                  alt={artisan.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <Link href={`/artisans/${artisan._id}`}>
                  <h2 className="text-2xl md:text-3xl font-semibold text-[#3e2c23] hover:text-[#6B4F3F] transition">
                    {artisan.name}
                  </h2>
                </Link>

                <p className="mt-2 inline-block px-4 py-1 text-sm bg-[#e2cdb4]/40 text-[#6B4F3F] rounded-full">
                  {artisan.specialty}
                </p>

                <p className="text-gray-600 mt-4 leading-relaxed line-clamp-3">
                  {artisan.bio}
                </p>

                <p className="text-sm text-gray-400 mt-4">
                  {artisan.email}
                </p>

                <Link
                  href={`/artisans/${artisan._id}`}
                  className="inline-block mt-6 px-6 py-2 bg-[#3e2c23] text-white rounded-full hover:bg-[#6B4F3F] transition"
                >
                  View Profile →
                </Link>
              </div>
            </section>
          ))}
        </div>

      </div>
    </section>
  );
}
