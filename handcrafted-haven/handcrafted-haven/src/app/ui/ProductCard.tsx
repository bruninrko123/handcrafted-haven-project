import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const productId =
    typeof product._id === "string"
      ? product._id
      : (product as { _id?: { $oid?: string } })._id?.$oid;

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white flex flex-col">
      {/* Image container */}

      <div className="relative w-full aspect-[4/3] bg-gray-100 flex items-center justify-center">
        <Image
          src={
            product.imageUrl?.startsWith("http")
              ? product.imageUrl
              : "/placeholder.png"
          }
          alt={product.name}
          fill
          className="object-cover rounded-md"
        />
      </div>

      {productId ? (
        <Link
          href={`/products/${productId}`}
          className="mt-3 text-lg font-semibold"
        >
          {product.name}
        </Link>
      ) : (
        <span className="mt-3 text-lg font-semibold">{product.name}</span>
      )}

      <div className="mt-1 text-sm text-gray-600">
        {typeof product.reviewCount === "number" &&
        product.reviewCount > 0 &&
        typeof product.averageRating === "number" ? (
          <span>
            {"★".repeat(Math.round(product.averageRating))}
            <span className="ml-2">
              {product.averageRating.toFixed(1)} ({product.reviewCount})
            </span>
          </span>
        ) : (
          <span>No reviews yet</span>
        )}
      </div>

      <p className="text-sm text-gray-600">{product.description}</p>

      <p className="mt-2 font-bold text-lg">${product.price}</p>

      <span className="inline-block mt-1 text-xs text-gray-500">
        {product.category}
      </span>

      {/* Add to Cart button */}
      <button
        onClick={() => addToCart(product)}
        className="mt-4 bg-[#6B4F3F] text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>

      {isAuthenticated && productId && (
        <Link
          href={`/products/${productId}#reviews`}
          className="mt-2 inline-block text-sm text-[#6B4F3F] underline"
        >
          Leave a Review
        </Link>
      )}
    </div>
  );
}
