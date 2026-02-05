import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import Product from "@/models/Product";


export async function GET(
    request: Request,
    {params}: {params: Promise<{id: string}>}
) {
    try {
      const { id } = await params;

      await connectToDatabase();

      // Get artisan info (without password)
      const artisan = await User.findById(id).select(
        "_id name email bio specialty profileImage profileProducts",
      );

      if (!artisan) {
        return NextResponse.json(
          { error: "Artisan not found" },
          { status: 404 },
        );
      }

        // Get products created by this artisan
        const products = await Product.find({ artisanId: id });

        return NextResponse.json({
            artisan,
            products,
        });


    } catch (error) {
        console.error("Error fetching artisan:", error);
        return NextResponse.json(
            { error: "Failed to fetch artisan" },
            { status: 500 }
        );
    }
}