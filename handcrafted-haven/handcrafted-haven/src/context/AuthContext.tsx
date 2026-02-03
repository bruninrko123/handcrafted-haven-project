"use client";

import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";



export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user,

    isLoading: status === "loading",

    isAuthenticated: status === "authenticated",

    isArtisan: session?.user.role === "artisan",

    isSeller: session?.user.role === "seller",

    isBuyer: session?.user.role === "buyer",

    //trigger login
    signIn,

    //function to log out
    signOut,


  }
}