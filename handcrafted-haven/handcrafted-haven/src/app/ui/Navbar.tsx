"use client";

import Link from 'next/link';
import { ShoppingBag, User, Search, Menu, LogOut } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-6 pt-4 flex items-center justify-between text-[#f5e6d3]">
        <div className="flex gap-8 text-lg font-medium ">
          <Link href="/" className="hover:text-blue-300 text-2xl">
            Home
          </Link>
          <Link href="/products" className="hover:text-blue-300 text-2xl">
            Products
          </Link>
          <Link href="/artisans" className="hover:text-blue-300 text-2xl">
            Artisans
          </Link>
          <Link href="/community" className="hover:text-blue-300 text-2xl">
            Our Community
          </Link>

          {isArtisan && (
            <Link href="/dashboard" className="hover:text-blue-300 text-2xl">
              Add a Product
            </Link>
          )}
        </div>

        <div className="flex items-center gap-5">
          <button className="relative">
            <Link href="/cart" className="relative">
              <ShoppingBag size={22} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </Link>
          </button>

          <Link href="/account">
            <div className="flex gap-2 items-center">
              {profileImage && (
                <Image
                  src={profileImage}
                  alt="Profile preview"
                  width={96}
                  height={96}
                  className="w-12 h-12 rounded-full object-cover mx-auto my-2"
                />
              )}
              My Account
            </div>
          </Link>

          {/* Auth */}
          <div className='ml-8 -mr-20'>
            {isAuthenticated ? (
              <div className="flex gap-5">
                <button onClick={() => signOut()}>
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <button className="flex gap-3">
                <Link href="/login">Login</Link>
                <Link href="/signup">Sign up</Link>
              </button>
            )}
          </div>
          {/* <button>
            <Menu size={24} />
          </button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
