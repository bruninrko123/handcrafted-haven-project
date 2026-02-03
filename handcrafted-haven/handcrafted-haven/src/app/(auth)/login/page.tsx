"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormInput } from "@/app/ui/FormInput";



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
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-400 justify-self-center mt-5 w-[400px] rounded p-2"
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
          className=" bg-blue-600 p-4 rounded w-full hover:bg-blue-700 text-white font-medium py-3"
        >
          Login{" "}
        </button>
      </form>
    </div>
  );
}
