import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


// GET all posts (for community page)
export async function GET() {
    try {
      await connectToDatabase();

        // Get all posts, newest first, and populate artisan info
        const posts = await Post.find({})
            .sort({ createdAt: -1 })
            .populate("artisanId", "name profileImage");
        
        return NextResponse.json(posts);

    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json(
            { error: "Failed to fetch posts" },
            { status: 500 }
        );
    }
}


// POST - create a new post (only artisans can create)
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { error: "You myst be logged in to post" },
                { status: 401 }
            );
        }

        const { content, imageUrl, linkUrl } = await request.json();

        if (!content) {
            return NextResponse.json(
                { error: "Post content is required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const post = await Post.create({
            artisanId: session.user.id,
            content,
            imageUrl,
            linkUrl,
        });

        return NextResponse.json(
            { message: "Post created", postId: post._id },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error createing post:", error);
        return NextResponse.json(
            { error: "Failed to creaste post" },
            { status: 500 }
        );
    }
}

