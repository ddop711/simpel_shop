"use client";
import Link from "next/link";
import { useCartStore } from "@/useCartStore";

export default function PaymentPage() {
  const { cart, removeFromCart, clearCart } = useCartStore();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-50 min-h-screen text-black py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold mb-8 tracking-tight">Kasse / Betaling</h1>

        {cart.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center shadow-sm">
            <p className="text-gray-500 mb-6">Din kurv er tom.</p>
            <Link href="/products" className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
              Gå til produkter
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-4">
                    <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-contain bg-gray-50 rounded-lg" />
                    <div>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="text-gray-500 text-sm">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-semibold text-sm cursor-pointer">
                    Fjern
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
              <h2 className="text-xl font-bold mb-4">Oversigt</h2>
              <div className="flex justify-between border-b border-gray-100 pb-4 mb-4">
                <span className="text-gray-600">Total pris:</span>
                <span className="text-xl font-extrabold">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={() => {
                  alert("Tak for dit køb!");
                  clearCart();
                }}
                className="w-full bg-red-600 text-white text-center py-3 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-sm cursor-pointer mb-3"
              >
                Gennemfør betaling
              </button>
              <Link href="/products" className="block text-center text-sm text-gray-600 hover:underline">
                Fortsæt med at handle
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
