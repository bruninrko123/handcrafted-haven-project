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
          currentPassword,
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
      setProfileImage(data.artisan.profileImage || "");
    }

    fetchUser();
  }, [session])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-400 justify-self-center mt-5 w-[400px] rounded p-2"
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
        <div>
          <FormInput
            id="currentPassword"
            label="Password:"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Type your password"
            required
          />
          <Link href="/account/change-password" className="block text-blue-800 -mt-4 text-sm">
            Change Password
          </Link>
        </div>
        {profileImage && (
          <Image
            src={profileImage}
            alt="Profile preview"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover mx-auto my-2"
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
          className="w-full border p-2 rounded"
        />

        <button
          disabled={uploading}
          type="submit"
          className=" bg-blue-600 p-4 rounded w-full hover:bg-blue-700 text-white font-medium py-3"
        >
          Update account info
        </button>
      </form>
    </div>
  );
}
