"use client";
import React from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Search, Menu, LogOut, LogIn } from 'lucide-react';
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";



const Navbar = () => {

  const { isAuthenticated, isArtisan, user, signIn, signOut, isLoading } = useAuth();
  const { cart } = useCart();

 

  return (
    <nav className="bg-gradient-to-r from-[#6f4e37] to-[#7a5a45] shadow-md">
      <div className="max-w-7xl mx-auto px-6 pt-4 flex items-center justify-between text-[#f5e6d3]">
        {/* Auth */}
        <div>
          {isAuthenticated ? (
            <button onClick={signOut}>
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <button className='flex gap-3'>
                <Link href="/login">Login</Link>
                <Link href="/signup">Sign up</Link>
            </button>
          )}
        </div>

        <div className="flex gap-8 text-lg font-medium ">
          <Link href="/products" className="hover:text-blue-300 text-2xl">
            Products
          </Link>
          <Link href="/artisans" className="hover:text-blue-300 text-2xl">
            Artisans
          </Link>
          <Link href="/categories" className="hover:text-blue-300 text-2xl">
            Categories
          </Link>
          <Link href="/about" className="hover:text-blue-300 text-2xl">
            Our Story
          </Link>

          {isArtisan && (
            <Link href="/dashboard" className="hover:text-blue-300 text-2xl">
              Dashboard
            </Link>
          )}
        </div>

        <div className="flex items-center gap-5">
          <button>
            <Search size={22} />
          </button>

          <button className="relative">
            <Link href="/cart" className="relative">
              <ShoppingBag size={22} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </Link>
          </button>

          <button>
            <User size={22} />
          </button>
          <button>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
