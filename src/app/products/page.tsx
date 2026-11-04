"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/useCartStore";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  category: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Hent funktioner fra jeres Zustand-kurv
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Klippesolide API-kald der rent faktisk virker hos DummyJSON nu
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []));

    // Vi bruger det opdaterede endpoint for at undgå fejl
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data || []));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());

    // Tjekker både om kategorien matcher som objekt (slug) eller tekst
    const productCategory = product.category?.toLowerCase();
    const categoryFilter = selectedCategory?.toLowerCase();

    const matchesCategory = selectedCategory === "" || productCategory === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold mb-10 tracking-tight">Alle produkter</h1>

        {/* LAYOUT: Delt op i Produktliste (Venstre) og Fast Kurv (Højre) */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* VENSTRE SIDE: Søg, Filter og Produkter */}
          <div className="flex-grow lg:w-3/4">
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <input type="text" placeholder="Søg efter produkter..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-3 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-black" />
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-3 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-black">
                <option value="">Alle kategorier</option>
                {categories.map((category, index) => {
                  // Håndterer om API'et sender objekter eller rå tekststrenge
                  const catSlug = category.slug || category;
                  const catName = category.name || category;
                  return (
                    <option key={index} value={catSlug}>
                      {typeof catName === "string" ? catName.charAt(0).toUpperCase() + catName.slice(1) : catName}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Produkt-grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <Link href={`/products/${product.id}`}>
                    <div className="bg-gray-50 p-6 flex items-center justify-center h-48 hover:opacity-80 transition-opacity cursor-pointer">
                      <img src={product.thumbnail} alt={product.title} className="w-full h-full object-contain" />
                    </div>
                  </Link>

                  <div className="p-6 flex flex-col flex-grow border-t border-gray-50">
                    <Link href={`/products/${product.id}`}>
                      <h2 className="font-bold text-lg text-gray-900 mb-1 truncate hover:text-red-600 transition-colors cursor-pointer">{product.title}</h2>
                    </Link>
                    <p className="text-gray-500 text-sm mb-4 flex-grow">{product.description?.substring(0, 50)}...</p>
                    <p className="text-xl font-extrabold text-black mb-4">${product.price}</p>

                    <div className="mt-auto">
                      <button onClick={() => addToCart(product)} className="block w-full bg-red-600 text-white text-center py-2.5 rounded-lg hover:bg-red-700 transition-colors font-bold shadow-sm cursor-pointer">
                        Læg i kurv
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HØJRE SIDE: Den faste og statiske indkøbskurv */}
          <div className="w-full lg:w-1/4 h-fit sticky top-6 bg-gray-50 border border-gray-100 p-6 rounded-2xl shadow-sm">
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
