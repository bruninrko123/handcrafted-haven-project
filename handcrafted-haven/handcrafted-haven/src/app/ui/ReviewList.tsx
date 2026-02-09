"use client";

import { useEffect, useState } from "react";

type Review = {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export default function ReviewList({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      const data = await res.json();
      setReviews(data);
      setLoading(false);
    };

    fetchReviews();
  }, [productId]);

  if (loading) return <p>Loading reviews...</p>;
  if (reviews.length === 0) return <p>No reviews yet.</p>

  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">
        Reviews ({reviews.length})
      </h3>

      <p className="mb-4">
        ⭐ Average Rating: {averageRating.toFixed(1)} / 5
      </p>

      <ul className="space-y-3">
        {reviews.map((review) => (
          <li key={review._id} className="border p-3 rounded">
            <p className="font-medium">
              {"⭐".repeat(review.rating)}
            </p>
            <p className="text-sm text-gray-700">{review.comment}</p>
            <p className="text-xs text-gray-400">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
 