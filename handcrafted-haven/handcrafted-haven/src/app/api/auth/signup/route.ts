import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";


export async function POST(request: Request) {
    try {
        const { email, password, name, role } = await request.json();

        //Valiadation
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        //check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "Email already registered" },
                { status: 400 }
            );
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        //Create User
        const user = await User.create({
            email,
            password: hashedPassword,
            name,
            role: role || "buyer" || "seller" || "artisan",
        })

        return NextResponse.json(
            { message: "User created successfully", userId: user._id },
            { status: 201 }
        );

    } catch (error) {
        console.error("Signup error", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}