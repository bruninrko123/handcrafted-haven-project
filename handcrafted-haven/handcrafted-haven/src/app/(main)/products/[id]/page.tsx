"use client";

import { useState } from "react";
import ReviewForm from "@/app/ui/ReviewForm"; 
import ReviewList from "@/app/ui/ReviewList";

export default function ProductDetailPage({ params }) {
  const productId = params.id;

  // TEMP – later comes from auth
  const userId = "65f123abc456def789012345";

  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      {/* Product info */}
      <h1>Product Details</h1>

      <ReviewForm
        productId={productId}
        userId={userId}
        onReviewAdded={() => setRefreshKey(prev => prev + 1)}
      />

      <ReviewList
        key={refreshKey}
        productId={productId}
      />
    </div>
  );
}