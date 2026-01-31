import React from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Search, Menu } from 'lucide-react';


const Navbar = () => {
  return (
    <nav className="bg-[#6B4F3F] ">
      <div>
        <div>

          <div className="flex justify-around">
            <Link href="/marketplace" className="hover:text-green-600 text-2xl">
              Marketplace
            </Link>
            <Link href="/artisans" className="hover:text-green-600 text-2xl">
              Artisans
            </Link>
            <Link href="/categories" className="hover:text-green-600 text-2xl">
              Categories
            </Link>
            <Link href="/about" className="hover:text-green-600 text-2xl">
              Our Story
            </Link>
          </div>

          <div>
            <button>
              <Search size={22} />
            </button>
            <button>
              <ShoppingBag size={22} />
              <span>3</span>
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
