import React from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Search, Menu} from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <Link href="/" className="text-2xl font-serif font-bold text-gray-800">
            Handcrafted Haven
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/marketplace" className="text-gray-600 hover:text-amber-600 transition-colors">
            Marketplace
            </Link>
            <Link href="/artisans" className="text-gray-600 hover:text-amber-600 transition-colors">
              Artisans
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-amber-600 transition-colors">
              Categories
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-amber-600 transition-colors">
              Our Story
            </Link>
            <Link href="/community" className="text-gray-600 hover:text-amber-600 transition-colors">
              Community
            </Link>
          </div>

          {/* Right-side Actions */}
          <div className="flex items-center space-x-6">
            <button className="hidden md:block text-gray-600 hover:text-amber-600">
              <Search size={22} />
            </button>
            <button className="relative text-gray-600 hover:text-amber-600">
              <ShoppingBag size={22} />
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            <button className="text-gray-600 hover:text-amber-600">
              <User size={22} />
            </button>
            <button className="md:hidden text-gray-600">
              <Menu size={24} />
            </button>
          </div>
      </div>

              {/* Mobile Navigation (hidden by default) */}
        <div className="md:hidden mt-4 hidden">
          <div className="flex flex-col space-y-4">
            <Link href="/marketplace" className="text-gray-600 hover:text-amber-600">
              Marketplace
            </Link>
            <Link href="/artisans" className="text-gray-600 hover:text-amber-600">
              Artisans
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-amber-600">
              Categories
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-amber-600">
              Our Story
            </Link>
            <Link href="/community" className="text-gray-600 hover:text-amber-600">
              Community
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;