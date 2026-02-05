"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-yellow-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-white p-4 rounded shadow"
            >
              {/* PRODUCT IMAGE */}
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded"
              />

              {/* PRODUCT INFO */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">
                  ${item.price} × {item.quantity}
                </p>
                <p className="font-medium">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* QUANTITY CONTROLS */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQuantity(item._id!)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  −
                </button>

                <span className="font-medium">{item.quantity}</span>

                <button
                  onClick={() => increaseQuantity(item._id!)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item._id!)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CART TOTAL */}
      {cart.length > 0 && (
        <div className="mt-6 text-right">
          <p className="text-xl font-bold">
            Cart Total: ${total.toFixed(2)}
          </p>
        </div>
      )}

      {/* CHECKOUT BUTTON */}
      <Link 
        href="/checkout" 
        className="inline-block bg-[#6B4F3F] text-white px-6 py-3 rounded hover:opacity-90"
      >
        Proceed to Checkout
      </Link>

    </main>
  );
}