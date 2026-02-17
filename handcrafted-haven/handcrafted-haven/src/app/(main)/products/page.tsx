"use client";
import { useState } from "react";
import ProductCard from "@/app/ui/ProductCard";
import { useProducts } from "@/context/ProductContext";

export default function ProductsPage() {
  const { products } = useProducts();

  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(5000); // Adjust later to fit your price range

  const filteredProducts = products.filter((product) => {
    const categoryMatch = category === "All" || product.category === category;

    const priceMatch = product.price <= maxPrice;
    const visibleInStore = product.showInStore !== false;
    return categoryMatch && priceMatch && visibleInStore;
  });


  return (
    <section className="p-8 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold">
        Products
      </h1>
      

      {/* Filters */}

      <section className="mt-6 mb-8 flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-md p-2 w-full sm:w-72"
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
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full lg:w-auto">
          <label className="text-sm text-gray-600 whitespace-nowrap">
            Max Price: ${maxPrice}
          </label>
          <input
            type="range"
            min="0"
            max="5000"
            step="5"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full sm:w-56"
          />
        </div>
      </section>
        
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </section>
    </section>
  );
}