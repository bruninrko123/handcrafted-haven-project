"use client";
import React from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Search, Menu } from 'lucide-react';
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";


const Navbar = () => {

  const { isSeller, loginAsSeller, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="bg-[#6B4F3F] ">
      <div>
        <div>

          {isSeller ? (
            <button
            onClick={logout}
            className="text-sm text-white underline"
          >
            Logout Seller
          </button>
        ) : (
          <button
            onClick={loginAsSeller}
            className="text-sm text-white underline"
          >
            Seller Login
          </button>
        )}

          <div className="flex justify-around">
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

            {isSeller && (
              <Link
                href="/dashboard"
                className="hover:text-blue-300 text-2xl"
              >
                Dashboard
              </Link>
            )}
          </div>

          <div>
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

      </div>
    </nav>
  );
};

export default Navbar;
