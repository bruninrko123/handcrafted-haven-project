import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Review from "@/models/Review";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { productId, userId, rating, comment } = body;

    // Basic validation
    if (!productId || !userId || !rating || !comment) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ⭐ Rating validation
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // ✍️ Comment length safety
    if (comment.length > 300) {
      return NextResponse.json(
        { message: "Comment is too long" },
        { status: 400 }
      );
    }

    // 💾 Save review
    const newReview = await Review.create({
      productId,
      userId,
      rating,
      comment,
    });

    return NextResponse.json(newReview, { status: 201 });

  } catch (error) {
    console.error("Review POST error:", error);

    return NextResponse.json(
      { message: "Failed to create rview" },
      { status: 500 }
    );
  }
}