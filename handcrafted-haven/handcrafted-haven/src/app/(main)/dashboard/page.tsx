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
  const [uploading, setUploading] = useState(false);
  const { isArtisan, isLoading, user } = useAuth();

  if (isLoading) {
    return <p className="p-6">Loading...</p>
  }
  if (!isArtisan) {
    redirect("/");
  }

  const myProducts = products.filter((p) => p.artisanId === user?.id);

  const CATEGORIES = [
    "Home Decor",
    "Clothing",
    "Art",
    "Accessories",
    "Kitchen",
    "Jewelry",
    "Other",
  ];

  const [formData, setFormData] = useState<Product>(() => ({
    artisanId: "",
    name: "",
    description: "",
    price: 0,
    category: "",
    imageUrl: "",
  }));

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
      artisanId: "",
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

        <div className="flex flex-col gap-3">
          {formData.imageUrl && (
            <div className="relative mt-3">
              <Image
                src={formData.imageUrl}
                alt="Profile preview"
                width={384}
                height={384}
                className="w-48 h-48 object-cover mx-auto my-2"
              />

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, imageUrl: "" }))
                }
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full"
              >
                X
              </button>
            </div>
          )}
          <div className="flex items-center justify-between">
            <label className="self-start flex gap-2 items-center cursor-pointer bg-[#6B4F3F]/10 text-[#6B4F3F] hover:opacity-80 text-sm font-medium px-4 py-2 rounded-full">
              {/* Note: The SVG was generated with AI */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7h2l2-3h10l2 3h2a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1z"
                />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Product's photo
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setUploading(true);

                  const formData = new FormData();
                  formData.append("file", file);

                  const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                  });

                  const data = await res.json();
                  if (data.url) {
                    setFormData((prev) => ({ ...prev, imageUrl: data.url }));
                  }
                  setUploading(false);
                }}
                className="hidden"
              />
            </label>
            <button
              type="submit"
              disabled={uploading}
              className="bg-[#6B4F3F] text-white px-6 py-2 rounded hover:opacity-90"
            >
              {editingProductId ? "Update Product" : "Add Product"}
            </button>
          </div>
        </div>
      </form>

      {/* PRODUCT LIST */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Products</h2>
      </div>
      <div className="grid gird-cols-1 md:grid-cols2 lg:grid-cols-3 gap-4">
        {myProducts.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded shadow">
            <Image
              src={
                product.imageUrl?.startsWith("http")
                  ? product.imageUrl
                  : "/placeholder.png"
              }
              alt={product.name}
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="font-medium">${product.price}</p>
              <p className="text-xs text-gray-500">{product.category}</p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() =>
                  updateProduct({
                    ...product,
                    showInStore: product.showInStore !== false ? false : true,
                  })
                }
                className={`text-sm ${
                  product.showInStore !== false
                    ? "text-green-600 hover:text-green-800"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {product.showInStore !== false
                  ? "visible in Store"
                  : "Hidden from Store"}
              </button>
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
