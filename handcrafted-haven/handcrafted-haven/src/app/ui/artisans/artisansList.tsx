'use client'


import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";


export default function ArtisansList() {
  //creating an object to keep the artisans


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
      const res = await fetch("/api/artisans");
      const data = await res.json();

      setArtisans(data);
      setLoading(false);
    }

    fetchArtisans();
   }, [])
    
  if (loading) return <p className="p-6">Loading...</p>
  return (
    <>
      <p>List of artisans</p>

      {artisans.map((artisan) => (
        <section
          key={artisan._id}
          className="w-full grid place-items-start grid-cols-[auto_1fr] mb-10 gap-4 "
        >
          <Image
            src={artisan.profileImage}
            alt={artisan.name}
            width={500}
            height={400}
            className="col-start-1 col-end-2 "
          />
          <section>
            <Link href={`/artisans/${artisan._id}`}>
              <h1 className="bg-red-50 col-start-2 col-end-3 text-4xl">
                {artisan.name}
              </h1>
            </Link>
            <p className="col-start-2 col-end-3">{artisan.bio}</p>
            <br />
            <p className="col-start-2 col-end-3">{artisan.email}</p>
          </section>
        </section>
      ))}
    </>
  );
}