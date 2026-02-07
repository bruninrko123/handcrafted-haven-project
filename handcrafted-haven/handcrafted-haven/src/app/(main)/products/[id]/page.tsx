"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ReviewForm from "@/app/ui/ReviewForm";
import ReviewList from "@/app/ui/ReviewList";
import StarDisplay from "@/app/ui/StarDisplay";
import { Product } from "@/types/product";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const productId = params?.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // TEMP – later comes from auth
  const userId = "65f123abc456def789012345";
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, refreshKey]); // refresh after new review

  if (!productId) return <p>Loading product...</p>;
  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Product info */}
      <h1 className="text-2xl font-bold mb-1">{product.name}</h1>

      {/* ⭐ Average rating */}
      <div className="mb-3">
        {typeof product.reviewCount === "number" &&
        product.reviewCount > 0 &&
        typeof product.averageRating === "number" ? (
          <StarDisplay rating={product.averageRating} />
        ) : (
            <p className="text-sm text-gray-500">No reviews yet</p>
         )}
      </div>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-64 h-64 object-cover mb-4"
      />

      <p className="mb-2">{product.description}</p>
      <p className="font-bold mb-6">${product.price}</p>

      {/* Reviews */}
      <ReviewForm
        productId={productId}
        userId={userId}
        onReviewAdded={() => setRefreshKey((prev) => prev + 1)}
      />

      <ReviewList key={refreshKey} productId={productId} />
    </div>
  );
}
