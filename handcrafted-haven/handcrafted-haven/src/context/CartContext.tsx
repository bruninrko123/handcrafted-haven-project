"use client";

import { createContext, useContext, useState, useEffect  } from "react";
import { Product } from "@/types/product";

type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  // Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ➕ Increase quantity
  const increaseQuantity = (id: number) => {
    setCart(prev => 
      prev.map(item => 
        item.id === id 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
      )
    );
  };

  // ➖ Decrease quantity (auto-remove at 0)
  const decreaseQuantity = (id: number) => {
    setCart(prev => 
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
    );
  };

  // ADD TO CART
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find(item => item.id === product.id);

      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // REMOVE FROM CART
  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider 
    value={{ 
      cart, 
      addToCart, 
      removeFromCart,
      increaseQuantity,
      decreaseQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};