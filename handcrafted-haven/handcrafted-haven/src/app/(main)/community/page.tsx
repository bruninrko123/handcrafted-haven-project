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
  const [uploading, setUploading] = useState(false);
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, imageUrl }),
    });

    if (res.ok) {
      setContent("");
      setImageUrl("");
      fetchPosts();
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <section className="min-h-screen bg-yellow-50 full-bleed py-8 sm:py-10">
      <div className="page-wrapper">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Community</h1>

        {isArtisan && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 sm:p-5 rounded shadow mb-6"
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

            {imageUrl && (
              <div className="relative mt-3">
                <Image
                  src={imageUrl}
                  alt="Profile preview"
                  width={384}
                  height={384}
                  className="w-40 h-40 sm:w-48 sm:h-48 object-cover mx-auto my-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full px-2"
                >
                  X
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-gray-100 px-4 py-3">
              <label className="flex gap-2 items-center cursor-pointer bg-[#6B4F3F]/10 text-[#6B4F3F] hover:opacity-80 text-sm font-medium px-4 py-2 rounded-full w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7h2l2-3h10l2 3h2a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1z"
                  />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                Add Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setUploading(true);
                    const formData = new FormData();
                    formData.append("file", file);

                    const res = await fetch("/api/upload", {
                      method: "POST",
                      body: formData,
                    });

                    const data = await res.json();
                    if (data.url) {
                      setImageUrl(data.url);
                    }

                    setUploading(false);
                  }}
                  className="hidden"
                />
              </label>

              <button
                disabled={uploading}
                type="submit"
                className="bg-[#6B4F3F] text-white px-4 py-2 rounded hover:opacity-90 w-full sm:w-auto"
              >
                Post
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4 max-w-2xl mx-auto">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4">
                {post.artisanId?.profileImage && (
                  <Image
                    src={post.artisanId.profileImage}
                    alt={post.artisanId.name ?? "Artisan"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <Link
                  href={`/artisans/${post.artisanId?._id ?? ""}`}
                  className="font-semibold hover:underline"
                >
                  {post.artisanId?.name ?? "Unknown artisan"}
                </Link>
                <span className="text-gray-500 text-sm ml-auto">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="mb-3 px-4 break-words">{post.content}</p>
              {post.imageUrl && (
                <Image
                  src={post.imageUrl}
                  alt="Post Image"
                  width={400}
                  height={400}
                  className="mb-3 w-full object-cover"
                />
              )}

              {post.linkUrl && (
                <a
                  href={post.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline px-4 pb-4 inline-block break-all"
                >
                  {post.linkUrl}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
