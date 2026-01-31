import Image from "next/image";

import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <Image 
        src={product.imageUrl}
        alt={product.name}
        width={300}
        height={200}
        className="rounded-md object-cover"
      />

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
    </div>
  );
}