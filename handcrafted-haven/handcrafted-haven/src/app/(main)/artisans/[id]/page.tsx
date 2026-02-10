"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Product } from "@/types/product";




type Artisan = {
    _id: string;
    name: string;
    email: string;
    bio: string;
    specialty: string;
    profileImage: string;
}

export default function ArtisanProfilePage() {
    const params = useParams();
    const id = params.id as string;

    const [artisan, setArtisan] = useState<Artisan | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtisan = async () => {
            
            const res = await fetch(`/api/artisans/${id}`);
            const data = await res.json();
            setArtisan(data.artisan);
            setProducts(data.products);
            setLoading(false);
        };

        if (id) {
            fetchArtisan();
        }
    }, [id]);


    if (loading) return <p className="p-6">Loading...</p>;
    if (!artisan) return <p className="p-6">Artisan not found</p>
    
    return (
      <main className="bg-white p-6 rounded shadow mb-6">
        {/* profile header */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <div className="flex items-center gap-6 mb-6">
            {artisan.profileImage && (
              <Image
                src={artisan.profileImage}
                alt={artisan.name}
                width={50}
                height={50}
                className="rounded-full"
              />
            )}
            <div>
                        <h1 className=" text-3xl font-bold">{artisan.name}</h1>
                        {artisan.specialty && (
                            <p className="text-lg text-gray-600">{artisan.specialty }</p>
                        )}
                        <p className="text-gray-500">{artisan.email}</p>
            </div>
                </div>
                {artisan.bio && (
                    <p className="mt-4 text-gray-700">{artisan.bio}</p>
                )}
            </div>
            
            {/* products section */}

            <h2 className="text-2xl font-bold mb-4">Products by {artisan.name}</h2>
            
            {products.length === 0 ? (

                <p className="text-gray-500">No products yet</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <div key={product._id} className="bg-white p-4 rounded shadow">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                width={200}
                                height={200}
                                className="w-full h-48 object-cover rounded mb-2"
                            />
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-gray-600">{product.price}</p>
                        </div>
                    ))}
                </div>
            )}
            
      </main>
    );
}
