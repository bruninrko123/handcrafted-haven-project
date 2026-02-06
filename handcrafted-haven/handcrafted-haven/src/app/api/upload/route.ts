import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";


export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file found" },
                { status: 404 }
            );
        }

        // convert file to base64 so that Cloudinary is able to read it
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

        // Upload to cloudinary
        const result = await cloudinary.uploader.upload(base64, {
            folder: "handcrafted-haven",
        });

        //Return the picture's URL
        return NextResponse.json({ url: result.secure_url });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Failed to upload image" },
            { status: 500 }
        );
    }
}