"use client";


type Props = {
  rating: number;
};

export default function StarDisplay({ rating }: Props) {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex items-center gap-1">
      <span className="text-yellow-500">
        {"⭐".repeat(fullStars)}
        {"☆".repeat(emptyStars)}
      </span>
      <span className="text-sm text-gray-600">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
}
