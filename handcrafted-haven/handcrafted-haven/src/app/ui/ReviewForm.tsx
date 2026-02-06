"use client";

import { useState } from "react";

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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        userId,
        rating,
        comment,
      }),
    });

    setComment("");
    setRating(5);
    setLoading(false);
    onReviewAdded(); // refresh reviews
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
      <h3 className="text-lg font-semibold">Leave a Review</h3>

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border p-2 rounded"
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} Stars
          </option>
        ))}
      </select>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Write a short review..."
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-[#6B4F3F] text-white px-4 py-2 rounded"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
