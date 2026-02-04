import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
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
      { error: "Failed to update product"},
      { status: 500 },
    );
  }
}
