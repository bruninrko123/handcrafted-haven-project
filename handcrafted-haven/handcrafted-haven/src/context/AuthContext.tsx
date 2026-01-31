"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isSeller: boolean;
  loginAsSeller: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSeller, setIsSeller] = useState(false);

  // Load seller auth from localStorage on mount
  useEffect(() => {
    const storedSeller = localStorage.getItem("isSeller");
    if (storedSeller === "true") {
      setIsSeller(true);
    }
  }, []);

  const loginAsSeller = () => {
    setIsSeller(true);
    localStorage.setItem("isSeller", "true");
  };

  const logout = () => {
    setIsSeller(false);
    localStorage.removeItem("isSeller");
  };

  return (
    <AuthContext.Provider value={{ isSeller, loginAsSeller, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};