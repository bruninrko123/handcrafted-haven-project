"use client";
import { useState } from "react";
import ProductCard from "@/app/ui/ProductCard";
import { products } from "@/data/products";
import { useProducts } from "@/context/ProductContext";

export default function ProductsPage() {
  const { products } = useProducts();

  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(100); // Adjust later to fit your price range

  const filteredProducts = products.filter((product) => {
    const categoryMatch = category === "All" || product.category === category;

    const priceMatch = product.price <= maxPrice;

    return categoryMatch && priceMatch;
  });


  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">
        Products
      </h1>
      

      {/* Filters */}

      <section className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-md p-2"
        >
          <option value="All">All Categories</option>
          <option value="Home Decor">Home Decor</option>
          <option value="Clothing">Clothing</option>
          <option value="Art">Art</option>
          <option value="Accessories">Accessories</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Other">Other</option>

          
        </select>
    
        {/* Price Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">
            Max Price: ${maxPrice}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-40"
          />
        </div>
      </section>
        
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </section>
    </main>
  );
}