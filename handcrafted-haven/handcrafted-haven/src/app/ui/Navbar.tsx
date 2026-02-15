"use client";

import Link from 'next/link';
import { ShoppingBag, Menu, X, LogOut } from 'lucide-react';
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import Image from 'next/image';



const Navbar = () => {

  const { isAuthenticated, isArtisan, user, signOut, isLoading } = useAuth();
  const { cart } = useCart();
  const { data: session } = useSession();
  const [profileImage, setProfileImage] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  
  useEffect(() => {
      const fetchUser = async () => {
        if (!session?.user?.id) return;
  
        const res = await fetch(`/api/artisans/${session.user.id}`);
        const data = await res.json();
  
       
        setProfileImage(data.artisan.profileImage || "");
      }
  
      fetchUser();
    }, [session])
 

  return (
    <nav className="bg-gradient-to-r from-[#6f4e37] to-[#7a5a45] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 flex items-center justify-between text-[#f5e6d3]">
        <div className="flex items-center gap-4 sm:gap-8 font-medium">
          <Link href="/" className="flex h-10 w-10 items-center justify-center rounded-full border border-white text-white font-semibold text-sm hover:bg-white hover:text-[#6f4e37] transition">
            HH
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-lg hover:text-[#e2cdb4] transition">
              Products
            </Link>
            <Link href="/artisans" className="text-lg hover:text-[#e2cdb4] transition">
              Artisans
            </Link>
            <Link href="/community" className="text-lg hover:text-[#e2cdb4] transition">
              Our Community
            </Link>
            {isArtisan && (
              <Link href="/dashboard" className="text-lg hover:text-[#e2cdb4] transition">
                Add a Product
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link href="/cart" className="relative">
            <ShoppingBag size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </Link>

          {session?.user && (
            <Link href="/account" className="hidden sm:flex items-center gap-2">
              {profileImage && (
                <Image
                  src={profileImage}
                  alt="Profile preview"
                  width={48}
                  height={48}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <span className="max-w-[140px] truncate">{session.user?.name}</span>
            </Link>
          )}

          {/* Auth */}
          <div className="hidden md:flex items-center gap-5 ml-2">
            {isAuthenticated ? (
              <button onClick={() => signOut()} className="flex items-center gap-2">
                <LogOut size={18} />
                Logout
              </button>
            ) : (
              <div className="flex gap-3">
                <Link href="/login">Login</Link>
                <Link href="/signup">Sign up</Link>
              </div>
            )}
          </div>

          <button
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded hover:bg-white/10"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-4 sm:px-6 pb-4 text-[#f5e6d3]">
          <div className="flex flex-col gap-3 border-t border-white/20 pt-4">
            <Link href="/products" className="text-base hover:text-[#e2cdb4] transition">
              Products
            </Link>
            <Link href="/artisans" className="text-base hover:text-[#e2cdb4] transition">
              Artisans
            </Link>
            <Link href="/community" className="text-base hover:text-[#e2cdb4] transition">
              Our Community
            </Link>
            {isArtisan && (
              <Link href="/dashboard" className="text-base hover:text-[#e2cdb4] transition">
                Add a Product
              </Link>
            )}

            {session?.user && (
              <Link href="/account" className="text-base hover:text-[#e2cdb4] transition">
                Account
              </Link>
            )}

            {isAuthenticated ? (
              <button onClick={() => signOut()} className="text-left text-base">
                Logout
              </button>
            ) : (
              <div className="flex gap-4">
                <Link href="/login">Login</Link>
                <Link href="/signup">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
