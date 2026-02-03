"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    //successful signup
    router.push("/login");
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
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="block  h-[45px] rounded mb-5 w-full p-2"
        />

        <label htmlFor="role">Select your role: </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block h-[45px] rounded mb-5 w-full p-2"
        >
          <option value="buyer">Buyer</option>
          <option value="artisan">Artisan</option>
        </select>

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="block h-[45px] rounded mb-5 w-full p-2"
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="block h-[45px] rounded mb-5 w-full p-2"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button type="submit" className=" bg-blue-600 p-4 rounded w-full hover:bg-blue-700 text-white font-medium py-3">
          Sign Up
        </button>
      </form>
    </div>
  );
}
