import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Review from "@/models/Review";

import mongoose from "mongoose";



// POST - Creates Review
export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { productId, userId, rating, comment } = await req.json();;

    // Basic validation
    if (!productId || !userId || !rating || !comment) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ObjectId validation
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { message: "Invalid productId" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid userId" },
        { status: 400 },
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
      { message: "Failed to create review" },
      { status: 500 }
    );
  }
}

// GET - Fetchs a Review
export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { message: "productId is required" },
        { status: 400 }
      )
    }

    const reviews = await Review.find({ productId })
    .sort({ createdAt: -1 }); // newest first

    return NextResponse.json(reviews, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}