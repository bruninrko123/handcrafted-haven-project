"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";


type Post = {
  _id: string;
  artisanId: {
    _id: string;
    name: string;
    profileImage: string;
  };
  content: string;
  imageUrl?: string;
  linkUrl?: string;
  createdAt: string;
};

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { isArtisan } = useAuth();

  //states for creating posts
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  };

  //fetch posts when the page first loads
  useEffect(() => {
    fetchPosts();
  }, []);

  //Create a new post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, imageUrl, linkUrl }),
    });

    if (res.ok) {
      setContent("");
      setImageUrl("");
      setLinkUrl("");
      fetchPosts(); //refreshing the posts so that the new one shows
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <main className="min-h-screen bg-yellow-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Community</h1>

      {/* Form to create posts */}
      {isArtisan && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded shadow mb-6"
        >
          <h2 className="font-semibold mb-2">Create a Post</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share something with the community"
            className="w-full border p-2 rounded mb-2"
            rows={3}
            required
          />

          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="http:image.example"
            className="w-full border p-2 rounded mb-2"
            required
          />

          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="http:link.example"
            className="w-full border p-2 rounded mb-2"
            required
          />

          <button
            type="submit"
            className="bg-[#6B4F3F] text-white px-4 py-2 rounded hover:opacity-90"
          >
            Post
          </button>
        </form>
          )}
          
          {/* doing the feed */}
          <div className="space-y-4">
              {posts.map((post) => (
                  <div key={post._id} className="bg-white p-4 rounded shadow">
                      {/* Artisan info */}
                      <div className="flex items-center gap-3 mb-3">
                          {post.artisanId.profileImage && (
                              <Image
                                  src={post.artisanId.profileImage}
                                  alt={post.artisanId.name}
                                  width={40}
                                  height={40}
                                  className="rounded-full"
                              />
                          )}
                          <Link
                              href={`/artisans/${post.artisanId._id}`}
                              className="font-semibold hover:underline"
                          >
                              {post.artisanId.name}
                          </Link>
                          <span className="text-gray-500 text-sm">
                              {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                      </div>
                        
                      {/* content of the post */}
                      <p className="mb-3">{post.content}</p>
                      {post.imageUrl && (
                          <Image
                              src={post.imageUrl}
                              alt="Post Image"
                              width={400}
                              height={400}
                              className="rounded mb-3"
                          />
                      )}

                      {/* optional link */}
                      {post.linkUrl && (
                          <a
                              href={post.linkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                          >
                              {post.linkUrl}
                          </a>
                      )}
                    </div>
              ))}
          </div>
    </main>
  );
}
