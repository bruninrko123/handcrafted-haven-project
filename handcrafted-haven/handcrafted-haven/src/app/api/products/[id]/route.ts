import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import Review from "@/models/Review";

/* =========================
   GET — Single Product
   + Average Rating
   ========================= */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing product id" },
        { status: 400 }
      );
    }

    const productDoc = await Product.findById(id);
    let productObj = productDoc ? productDoc.toObject() : null;

    if (!productObj) {
      const raw = await Product.collection.findOne({ _id: id as unknown as mongoose.Types.ObjectId });
      productObj = raw as typeof productObj;
    }

    if (!productObj) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const reviews = await Review.find({ productId: id });

    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    return NextResponse.json({
      ...productObj,
      averageRating,
      reviewCount: reviews.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

/* =========================
   PUT — Update Product
   ========================= */

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const data = await request.json();
    const { name, price, category, imageUrl } = data;

    if (!category || !imageUrl || !name || !price) {
      return NextResponse.json(
        { error: "Missing required fields to update a product" },
        { status: 400 },
      );
    }
    await connectToDatabase();
    const { id } = await params;

    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

/* =========================
   DELETE — Remove Product
   ========================= */

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
