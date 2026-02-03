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
        }
        else {
            router.push("/") // redirect if successfull
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />

            {error && <p className="text-red-500">{error}</p>}
            <button type="submit">Login </button>
        </form>
    )
}