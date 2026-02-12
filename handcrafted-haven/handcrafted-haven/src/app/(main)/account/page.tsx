"use client";
import { FormInput } from "@/app/ui/FormInput";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";



export default function Account() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [uploading, setUploading] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const { data: session } = useSession();
  const [originalEmail, setOriginalEmail] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
      const res = await fetch(`/api/artisans/${session?.user?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ name, email, profileImage, ...(password && {password}) }),
        body: JSON.stringify({
          name,
          email,
          profileImage,
          ...(email !== originalEmail && {currentPassword}),
        }),
      });
      
      if (res.ok) {
          alert("Profile updated!");
      }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.id) return;

      const res = await fetch(`/api/artisans/${session.user.id}`);
      const data = await res.json();

      setName(data.artisan.name || "");
      setEmail(data.artisan.email || "");
      setOriginalEmail(data.artisan.email);
      setProfileImage(data.artisan.profileImage || "");
    }

    fetchUser();
  }, [session])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5e6d3] via-[#f0d9c2] to-[#e7c9ad] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#6b4f3f] text-[#6b4f3f] text-sm font-semibold">
            HH
          </div>
          <h1 className="text-3xl font-semibold text-[#3b2a1a]">
            Account Settings
          </h1>
          <p className="mt-2 text-sm text-[#6b4f3f]">
            Update your profile details and preferences.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#e2cdb4] bg-white/80 p-6 shadow-xl backdrop-blur"
        >
          <FormInput
            id="name"
            label="Full Name:"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />

          <FormInput
            id="email"
            label="Email:"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
          />
          {originalEmail !== email && (
            <FormInput
              id="currentPassword"
              label="Password:"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Type your password"
              required
            />
          )}

          <Link
            href="/account/change-password"
            className="mb-4 -mt-2 block text-sm font-medium text-[#6b4f3f] underline"
          >
            Change Password
          </Link>

          {profileImage && (
            <Image
              src={profileImage}
              alt="Profile preview"
              width={96}
              height={96}
              className="mx-auto my-2 h-24 w-24 rounded-full object-cover"
            />
          )}

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
                setProfileImage(data.url);
              }
              setUploading(false);
            }}
            className="mb-4 block w-full rounded-lg border border-[#d9c3aa] bg-white/90 px-3 py-2 text-sm text-[#3b2a1a] file:mr-3 file:rounded-md file:border-0 file:bg-[#6B4F3F] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:opacity-90"
          />

          <button
            disabled={uploading}
            type="submit"
            className="w-full rounded-lg bg-[#6B4F3F] py-3 text-white font-semibold hover:opacity-90 transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? "Uploading..." : "Update account info"}
          </button>
        </form>
      </div>
    </div>
  );
}
