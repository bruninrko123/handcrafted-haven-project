import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user.id || session.user.id !== id) {
      return NextResponse.json(
        { error: "Only profile owners can curate their projects" },
        { status: 401 },
      );
    }

    const { profileProducts } = await request.json();

    if (!profileProducts) {
      return NextResponse.json(
        { error: "No products found in this profile" },
        { status: 400 },
      );
    }

    if (!Array.isArray(profileProducts)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

      await connectToDatabase();
      
    const updated = await User.findByIdAndUpdate(
      id,
      { profileProducts },
      { new: true },
    ).select("profileProducts");

    return NextResponse.json({ profileProducts: updated.profileProducts });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update profile products" },
      { status: 500 },
    );
  }
}
