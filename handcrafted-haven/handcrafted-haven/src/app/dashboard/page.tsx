"use client";

import { useState } from "react";
import { Product } from "@/types/product";


export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const [formData, setFormData] = useState<Product>({
    id: Date.now(),
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setProducts((prev) => [...prev, formData]);

    // Reset form
    setFormData({
      id: Date.now(),
      name: "",
      description: "",
      price: 0,
      category: "",
      image: "",
    });
  };

  return (
    <main className="min-h-screen bg-yellow-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>

      <p className="text-gray-600 mb-4">
        Manage your products
      </p>
      
      <form onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow mb-8 space-y-4"
      >
        <h2 className="text-xl font-semibold">Add New Product</h2>

        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        <textarea
          name="description"
          placeholder="Product description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded p-2"
          rows={3}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-[#6B4F3F] text-white px-6 py-2 rounded hover:opacity-90"
        >
          Add Product
        </button>
      </form>


      <div className="space-y-4">
        {products.map(product => (
          <div 
            key={product.id} 
            className="bg-white p-4 rounded shadow flex gap-4">

            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-20 h-20 object-cover rounded"
            />

            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="font-medium">${product.price}</p>
              <p className="text-xs text-gray-500">{product.category}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
