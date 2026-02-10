import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { currentPassword, newPassword } = data;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Missing required fields to change password" },
        { status: 400 },
      );
    }

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectToDatabase();

    const user = await User.findById(session.user.id).select("+password");

    const isValid = await bcrypt.compare(currentPassword, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Incorrect current password" },
        { status: 401 },
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(session.user.id, {
      password: hashedPassword,
    });

    return NextResponse.json({ message: "Password updated" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update password" },
      { status: 500 },
    );
  }
}
