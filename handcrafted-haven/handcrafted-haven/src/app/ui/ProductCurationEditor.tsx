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
  const [message, setMessage] = useState();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handlerDragEnd(event: DragEndEvent) {
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

  async function handlg save(){
    setSaving(true);
    setMessage("");
    const 
  }
}
