"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // I wanna handle the redirect manually
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/"); // redirect if successfull
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-400 justify-self-center mt-5 w-[400px] rounded p-2"
      >
        <label htmlFor="name">Full Name:</label>
        <input
          id="name"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="block h-[45px] rounded mb-5 w-full p-2"
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="block h-[45px] rounded mb-5 w-full p-2"
        />

        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className=" bg-blue-600 p-4 rounded w-full hover:bg-blue-700 text-white font-medium py-3"
        >
          Login{" "}
        </button>
      </form>
    </div>
  );
}
