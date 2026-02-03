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
        {errors.name && (
          <p className="text-red-500 text-sm -mt-4 mb-4">{errors.name}</p>
        )}

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
          placeholder="Type your password"
          required
        />
        {errors.password && (
          <p className="text-red-500 text-sm -mt-4 mb-4">{errors.password}</p>
        )}

        {serverError && <p className="text-red-500">{serverError}</p>}

        <button
          type="submit"
          className=" bg-blue-600 p-4 rounded w-full hover:bg-blue-700 text-white font-medium py-3"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
