"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Product } from "@/types/product";
import { useSession } from "next-auth/react";
import ProductCurationEditor from "@/app/ui/ProductCurationEditor";
import ProductCard from "@/app/ui/ProductCard";

type Artisan = {
    _id: string;
    name: string;
    email: string;
    bio: string;
    specialty: string;
    profileImage: string;
    profileProducts: string[];
    story?: string;
}

export default function ArtisanProfilePage() {
    const params = useParams();
    const id = params.id as string;

    const [artisan, setArtisan] = useState<Artisan | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    const [curatedProducts, setCuratedProducts] = useState<Product[]>([]);
    const [editMode, setEditmode] = useState(false);

    const isOwner = session?.user?.id === id;


    useEffect(() => {
        const fetchArtisan = async () => {
            
            const res = await fetch(`/api/artisans/${id}`);
            const data = await res.json();
            setArtisan(data.artisan);
            setProducts(data.products);
            setCuratedProducts(data.curatedProducts);
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
                {artisan.story && (
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-gray-800">Story</h2>
                        <p className="text-gray-700">{artisan.story}</p>
                    </div>
                )}
            </div>
            
            {/* products section */}

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">
                    {editMode ? "Curate Your Products" : `Products by ${artisan.name}`}
                </h2>
                {isOwner && (
                <button onClick={() => setEditmode(!editMode)}
                    className="bg-[#6B4F3F] text-white px-4 py-2 rounded hover:opacity-90">
                    {editMode ? "Done": "Edit"}
                </button>
                )}
            </div>

            {editMode ? (
                <ProductCurationEditor
                    allProducts={products}
                    initialSelected={artisan.profileProducts || []}
                    artisanId={id}
                />
            ) : (
                    <>
                        {curatedProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {curatedProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        ) : isOwner ? (
                                <p className="text-gray-500">Click "Edit" to choose which products to feature.</p>
                            ) : (
                                    <p className="text-gray-500">No featured products yet.</p>
                        )}
                    </>
            )}



            
            
      </main>
    );
}
