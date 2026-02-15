"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormInput } from "@/app/ui/FormInput";
import Link  from "next/link";



type FieldErrors = {
    email?: string;
    password?: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<FieldErrors>({});
    const [serverError, setServerError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      setErrors({});
      setServerError("");


      
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // I wanna handle the redirect manually
    });

    if (result?.error) {
      setServerError("invalid email or password");
    } else {
      router.push("/"); // redirect if successfull
    }
  };

  return (
    <section className="min-h-screen full-bleed bg-gradient-to-br from-[#f5e6d3] via-[#f0d9c2] to-[#e7c9ad] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="w-full max-w-md sm:max-w-lg">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#6b4f3f] text-[#6b4f3f] text-sm 
          font-semibold">
            HH
          </div>
          <h1 className="text-3xl font-semibold text-[#3b2a1a]">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-[#6b4f3f]">
            Log in to continue exploring handcrafted treasures.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#e2cdb4] bg-white/80 p-5 sm:p-6 shadow-xl backdrop-blur"
        >
          <FormInput
            id="email"
            label="Email:"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
          />
        

          <FormInput
            id="password"
            label="Password:"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password"
            required
          />
          

          {serverError && <p className="text-red-500">{serverError}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#6B4F3F] py-3 text-white font-semibold hover:opacity-90 transition"
          >
            Login{" "}
          </button>

          <p className="mt-4 text-center text-sm text-[#6b4f3f]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
