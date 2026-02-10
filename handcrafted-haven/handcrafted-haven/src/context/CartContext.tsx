"use client";

import { createContext, useContext, useState, useEffect  } from "react";
import { Product } from "@/types/product";

type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);


export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Sync cart with localStorage
  useEffect(() => {
    if (!hasHydrated) return;
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, hasHydrated]);




  // ➕ Increase quantity
  const increaseQuantity = (id: string) => {
    setCart(prev => 
      prev.map(item => 
        item._id === id 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
      )
    );
  };

  // ➖ Decrease quantity (auto-remove at 0)
  const decreaseQuantity = (id: string) => {
    setCart(prev => 
      prev.map(item =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
    );
  };

  // ADD TO CART
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find(item => item._id === product._id);

      if (existingItem) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // REMOVE FROM CART
  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item._id !== id));
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
