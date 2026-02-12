"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Product } from "@/types/product";
import SortableProductCard from "./SortableProductCard";

type Props = {
  allProducts: Product[];
  initialSelected: string[];
  artisanId: string;
};

export default function ProductCurationEditor({
  allProducts,
  initialSelected,
  artisanId,
}: Props) {
  const [orderedIds, setOrderedIds] = useState<string[]>(() => {
    const selectedSet = new Set(initialSelected);
    const unselected = allProducts
      .filter((p) => !selectedSet.has(p._id!))
      .map((p) => p._id)
      .filter((id): id is string => id !== undefined);
    return [...initialSelected, ...unselected];
  });

  const [selectedSet, setSelectedSet] = useState<Set<string>>(
    () => new Set(initialSelected),
  );

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setOrderedIds((prev) => {
        const oldIndex = prev.indexOf(active.id as string);
        const newIndex = prev.indexOf(over.id as string);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  function handleToggle(productId: string) {
    setSelectedSet((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");
    const profileProducts = orderedIds.filter((id) => selectedSet.has(id));

    const res = await fetch(`/api/artisans/${artisanId}/profile-products`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileProducts }),
    });

    setMessage(res.ok ? "Saved!" : "Failed to save. Please try again.");
    setSaving(false);
  }

  const productMap = new Map(allProducts.map((p) => [p._id!, p]));

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Curate Your Products</h3>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#6B4F3F] text-white px-6 py-2 rounded hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      {message && (
        <p
          className={`mb-3 text-sm ${message === "Saved!" ? "text-green-800" : "text-red-600"}`}
        >
          {message}
        </p>
      )}

      <p className="text-sm text-gray-500 mb-4">
        Check products to feature them on your profile. Drag to reorder.
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={orderedIds}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {orderedIds.map((id) => {
              const product = productMap.get(id);
              if (!product) return null;
              return (
                <SortableProductCard
                  key={id}
                  product={product}
                  isSelected={selectedSet.has(id)}
                  onToggle={handleToggle}
                />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
