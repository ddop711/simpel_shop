"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCartStore } from "@/useCartStore";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  category: string;
  brand?: string;
  rating?: number;
  stock?: number;
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params ? params.id : null;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    fetch("https://dummyjson.com/products/" + id)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen text-black flex items-center justify-center">
        <p className="text-gray-500 font-medium">Henter produktdetaljer...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white min-h-screen text-black p-8 text-center">
        <p className="text-gray-500 mb-4">Produktet blev ikke fundet.</p>
        <Link href="/products" className="text-red-600 font-bold hover:underline">
          ← Tilbage til alle produkter
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/products" className="text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors">
            ← Tilbage til alle produkter
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-12 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center h-96">
              <img src={product.thumbnail} alt={product.title} className="max-w-full max-h-full object-contain" />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2.5 py-1 rounded-full w-fit block mb-4">{product.category}</span>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">{product.title}</h1>
                {product.brand && (
                  <p className="text-sm text-gray-400 mb-6">
                    Mærke: <span className="font-semibold text-gray-600">{product.brand}</span>
                  </p>
                )}
                <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
                <div className="border-t border-b border-gray-50 py-4 my-6 flex gap-6 text-sm text-gray-500">
                  <p>
                    Lagerstatus: <span className="font-bold text-green-600">{product.stock} stk.</span>
                  </p>
                  <p>
                    Rating: <span className="font-bold text-yellow-500">★ {product.rating}</span>
                  </p>
                </div>
              </div>
              <div>
                <p className="text-3xl font-black text-black mb-6">${product.price}</p>
                <button onClick={() => addToCart(product)} className="w-full sm:w-auto bg-red-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-sm cursor-pointer block text-center">
                  Læg i kurv
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/4 bg-gray-50 border border-gray-100 p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">Indkøbskurv</h2>
            {cart.length === 0 ? (
              <p className="text-gray-500 text-sm">Kurven er tom.</p>
            ) : (
              <>
                <div className="space-y-3 max-h-96 overflow-y-auto mb-4 pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-100 text-sm">
                      <div className="truncate pr-2">
                        <p className="font-semibold truncate">{item.title}</p>
                        <p className="text-gray-500 text-xs">
                          ${item.price} x {item.quantity}
                        </p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-xs font-bold cursor-pointer shrink-0">
                        Fjern
                      </button>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-3 mb-4">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <Link href="/payment" className="block w-full bg-black text-white text-center py-2.5 rounded-lg font-bold hover:bg-gray-800 transition-colors text-sm shadow-sm">
                  Gå til kassen
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
