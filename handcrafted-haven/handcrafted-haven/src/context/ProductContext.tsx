"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types/product";

type ProductContextType = {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  updateProduct: (product: Product) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
    try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      
      } catch (error) {
        console.log("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async (product: Omit<Product, '_id'>) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        const productsRes = await fetch("/api/products");
        const products = await productsRes.json();
        setProducts(products);
      }



    } catch (error) {
      console.error("Something went wront with adding the product", error);

    }
  };

  const removeProduct = (id: string) =>{
    setProducts((prev) => prev.filter((product) => product._id !== id));
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product,
      ),
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
