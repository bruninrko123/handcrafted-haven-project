import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";


export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, price, category, imageUrl } =
      await request.json();

    if (!category || !imageUrl || !name || !price) {
      return NextResponse.json(
        { error: "Missing required fields to add a product" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    //create  product in the db

    const product = await Product.create({
      category,
      description,
      imageUrl,
      name,
      price,
    });

    return NextResponse.json(
      {
        message: "Product added successfully",
        productId: product._id,
        productName: product.name,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding product", error);
      return NextResponse.json(
      { error: "Something went wrong adding the product", error },
      { status: 500 },
    );
  }
}
