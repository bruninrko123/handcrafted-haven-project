"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormInput } from "@/app/ui/FormInput";
import { signupSchema } from "@/lib/validations/auth";
import { z } from "zod";

//tyé for specific errors (for each field)
type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError("");


    //validate using zod
    const result = signupSchema.safeParse({ name, email, password, role });

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FieldErrors;
        fieldErrors[field] = err.message;
        
      });
      setErrors(fieldErrors);
      return;
    }


    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      setServerError(data.error || "Something went wrong");
      return;
    }

    //successful signup
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5e6d3] via-[#f0d9c2] to-[#e7c9ad] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#6b4f3f] text-[#6b4f3f] text-sm font-semibold">
            HH
          </div>
          <h1 className="text-3xl font-semibold text-[#3b2a1a]">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-[#6b4f3f]">
            Join our community of buyers and artisans.
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
          {errors.name && (
            <p className="text-red-500 text-sm -mt-4 mb-4">{errors.name}</p>
          )}

          <label htmlFor="role">Select your role: </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full rounded-lg border border-[#d9c3aa] bg-white/90 px-3 py-2 text-sm text-[#3b2a1a] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6b4f3f] focus:border-transparent mb-4"
          >
            <option value="buyer">Buyer</option>
            <option value="artisan">Artisan</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm -mt-4 mb-4">{errors.role}</p>
          )}

          <FormInput
            id="email"
            label="Email:"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm -mt-4 mb-4">{errors.email}</p>
          )}

          <FormInput
            id="password"
            label="Password:"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a strong password"
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm -mt-4 mb-4">{errors.password}</p>
          )}

          {serverError && <p className="text-red-600 text-sm mb-3">{serverError}</p>}

          <button
            type="submit"
            className=" w-full rounded-lg bg-[#6B4F3F] py-3 text-white font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
