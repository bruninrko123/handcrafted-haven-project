"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { useProducts } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function DashboardPage() {
  const { products, addProduct, removeProduct, updateProduct } = useProducts();
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const { isArtisan } = useAuth();

  if (!isArtisan) {
    redirect("/");
  }

  const CATEGORIES = [
    "Home Decor",
    "Clothing",
    "Art",
    "Accessories",
    "Kitchen",
    "Jewelry",
    "Other",
  ];

  const [formData, setFormData] = useState<Product>(()=> ({
    name: "",
    description: "",
    price: 0,
    category: "",
    imageUrl: "",
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProductId) {
      updateProduct(formData);
      setEditingProductId(null);
    } else {
      addProduct({ ...formData });
    }

    setFormData({
      
      name: "",
      description: "",
      price: 0,
      category: "",
      imageUrl: "",
    });
  };

  return (
    <main className="min-h-screen bg-yellow-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Artisan Dashboard</h1>

      <p className="text-gray-600 mb-4">Manage your products</p>

      {/* PRODUCT FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-8 space-y-4"
      >
        <h2 className="text-xl font-semibold">
          {editingProductId ? "Edit Product" : "Add New Product"}
        </h2>

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

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded bg-white"
          required
        >
          <option value="" disabled>
            Select a category
          </option>

          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="imageUrl"
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
          {editingProductId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* PRODUCT LIST */}
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded shadow flex gap-4"
          >
            <Image
              src={product.imageUrl?.startsWith("http") ? product.imageUrl : "/placeholder.png"}
              alt={product.name}
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">
                {product.description}
              </p>
              <p className="font-medium">${product.price}</p>
              <p className="text-xs text-gray-500">{product.category}</p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setFormData(product);
                  setEditingProductId(product._id ?? null);
                }}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => product._id && removeProduct(product._id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
