"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { Product } from "@/types/product";
import { GripVertical } from "lucide-react";

type Props = {
  product: Product;
  isSelected: boolean;
  onToggle: (productId: string) => void;
};

export default function SortableProductCard({
  product,
  isSelected,
  onToggle,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: product._id! });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3 rounded border ${isSelected ? "border-[#6B4F3F] bg-amber-50" : "border-gray-200 bg-white opacity-60"}`}
    >
      {/* This is the handle, where the user will click to drag the product */}
      <button
        {...attributes}
        {...listeners}
        className="cursos-grab text-gray-400"
      >
        <GripVertical size={20} />
      </button>

      {/* This is the checkbox to toggle whether the product is selected or not  */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggle(product._id!)}
        className="w-5 h-5"
      />

      <Image
        src={
          product.imageUrl?.startsWith("http")
            ? product.imageUrl
            : "placeholder.png"
        }
        alt={product.name}
        width={60}
        height={60}
        className="w-15 h-15 object-cover rounded"
      />

      <div className="flex-1">
        <p className="font-semibold">{product.name}</p>
        <p className="text-sm text-gray-500">${product.price}</p>
      </div>
    </div>
  );
}
