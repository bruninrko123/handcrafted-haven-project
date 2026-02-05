"use client";

import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-yellow-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map(item => (
              <li key={item._id} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right text-xl font-bold">
            Total: ${total.toFixed(2)}
          </div>

          <button
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            onClick={() => alert("Order placed! (placeholder)")}
          >
            Place Order
          </button>
        </>
      )}
    </main>
  );
}