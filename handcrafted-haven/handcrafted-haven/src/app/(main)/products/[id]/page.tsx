"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ReviewForm from "@/app/ui/ReviewForm";
import ReviewList from "@/app/ui/ReviewList";
import StarDisplay from "@/app/ui/StarDisplay";
import { Product } from "@/types/product";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const productId = params?.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated, user } = useAuth();
  const userId = user?.id;
  const [refreshKey, setRefreshKey] = useState(0);
  const { addToCart } = useCart();

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
    <div className="py-8 sm:py-10">
      {/* Product info */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-6 lg:gap-10 items-start">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">{product.name}</h1>

            {/* Average rating */}
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
              className="w-full max-w-md aspect-square object-cover rounded-lg mb-4"
            />

            <p className="mb-2 text-gray-700 leading-relaxed">{product.description}</p>
            <p className="font-bold mb-6 text-lg">${product.price}</p>
          </div>

          <div className="rounded-lg border border-gray-200 p-4 sm:p-5">
            <p className="text-sm text-gray-500 mb-2">Secure checkout</p>
            <button
              onClick={() => addToCart(product)}
              className="w-full rounded-md bg-[#3e2c23] text-white py-2 font-semibold hover:bg-[#6B4F3F] transition"
            >
              Add to cart
            </button>
            <p className="text-xs text-gray-500 mt-3">
              Free returns within 30 days
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        {isAuthenticated && userId ? (
          <ReviewForm
            productId={productId}
            userId={userId}
            onReviewAdded={() => setRefreshKey((prev) => prev + 1)}
          />
        ) : (
          <p className="text-sm text-gray-600">
            Please log in to leave a review.
          </p>
        )}

        <ReviewList key={refreshKey} productId={productId} />
      </div>
    </div>
  );
}
