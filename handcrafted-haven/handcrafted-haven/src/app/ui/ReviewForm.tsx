"use client";

import { useState } from "react";
import StarRatingInput from "@/app/ui/StarRatingInput";

export default function ReviewForm({
  productId,
  userId,
  onReviewAdded,
}: {
  productId: string;
  userId: string;
  onReviewAdded: () => void;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!userId) {
      setError("You must be logged in to leave a review.");
      return;
    }

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        userId,
        rating,
        comment,
      }),
    });

    if (res.status === 409) {
      setError("You have already reviewed this product.");
      setDisabled(true);
      return;
    }

    if (!res.ok) {
      setError("Failed to submit review.");
      return;
    }

    setRating(5);
    setComment("");
    onReviewAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3">
      <fieldset disabled={disabled} className="space-y-3">
        <StarRatingInput rating={rating} onChange={setRating} />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Submit Review
        </button>
      </fieldset>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  );
}
