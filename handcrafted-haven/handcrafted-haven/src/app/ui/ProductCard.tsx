import Image from "next/image";

import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white flex flex-col">
      {/* Image container */}

      <div className="relative w-full aspect-[4/3] bg-gray-100 flex items-center justify-center">
        <Image 
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-cover rounded-md"
      />
      </div>

      <h3 className="mt-3 text-lg font-semibold">
        {product.name}
      </h3>

      <p className="text-sm text-gray-600">
        {product.description}
      </p>

      <p className="mt-2 font-bold text-lg">
        ${product.price}
      </p>

      <span className="inline-block mt-1 text-xs text-gray-500">
        {product.category}
      </span>

      {/* Add to Cart button */}
      <button
        onClick={() => addToCart(product)}
        className="mt-auto w-full bg-[#6B4F3F] text-white py-2 rounded-md hover:opacity-90"
      >
        Add to Cart
      </button>
    </div>
  );
}