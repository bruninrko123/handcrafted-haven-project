import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import Product from "@/models/Product";
import bcrypt from "bcryptjs";
import { Product as ProductType } from "@/types/product";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await connectToDatabase();

    // Get artisan info (without password)
    const artisan = await User.findById(id).select(
      "_id name email bio specialty profileImage profileProducts",
    );

    if (!artisan) {
      return NextResponse.json({ error: "Artisan not found" }, { status: 404 });
    }

    // Get products created by this artisan
    const products = await Product.find({ artisanId: id });
    let curatedProducts: ProductType[] = [];

    if (artisan.profileProducts && artisan.profileProducts.length > 0) {
      const productMap = new Map(
        products.map((p: ProductType) => [p._id!.toString(), p]),
      );
      curatedProducts = artisan.profileProducts
        .map((pid: mongoose.Types.ObjectId) => productMap.get(pid.toString()))
        .filter(Boolean);
    }

    return NextResponse.json({
      artisan,
      products,
      curatedProducts,
    });
  } catch (error) {
    console.error("Error fetching artisan:", error);
    return NextResponse.json(
      { error: "Failed to fetch artisan" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const data = await request.json();
    const { name, email, profileImage, currentPassword } = data;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and Email are required" },
        { status: 400 },
      );
    }
    await connectToDatabase();
    const { id } = await params;

    const user = await User.findById(id).select("+password");

    if (email !== user.email) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: "Password required to change email" },
          { status: 400 },
        );
      }

      const isValid = await bcrypt.compare(currentPassword, user.password);

      if (!isValid) {
        return NextResponse.json(
          { error: "Incorrect password" },
          { status: 401 },
        );
      }
    }

    const updateData: Record<string, string> = { name, email, profileImage };

    const updatedUserInfo = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUserInfo) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUserInfo);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update account info" },
      { status: 500 },
    );
  }
}
