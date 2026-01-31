"use client";
import React from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Search, Menu } from 'lucide-react';
import { useCart } from "@/context/CartContext";


const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav className="bg-[#6B4F3F] ">
      <div>
        <div>

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

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
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
