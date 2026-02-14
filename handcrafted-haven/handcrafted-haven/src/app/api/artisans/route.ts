import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();
    // Find all users with role "artisan". Do not select password (we don't want to show it)
    const artisans = await User.find({ role: "artisan" }).select(
      "_id name email bio specialty profileImage story",
    );

    return NextResponse.json(artisans);
  } catch (error) {
    console.error("Error fetching artisans");
    return NextResponse.json(
      { error: "Failed to fetch artisans" },
      { status: 500 },
    );
  }
}
