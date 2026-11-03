"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

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

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));

    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold mb-10 tracking-tight">
          Alle produkter
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Søg efter produkter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-black"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-black"
          >
            <option value="">Alle kategorier</option>
            {categories.map((category, index) => (
              <option key={index} value={category.slug || category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <Link href={`/products/${product.id}`}>
                <div className="bg-gray-50 p-6 flex items-center justify-center h-56 hover:opacity-80 transition-opacity cursor-pointer">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>

              <div className="p-6 flex flex-col flex-grow border-t border-gray-50">
                <Link href={`/products/${product.id}`}>
                  <h2 className="font-bold text-lg text-gray-900 mb-1 truncate hover:text-red-600 transition-colors cursor-pointer">
                    {product.title}
                  </h2>
                </Link>
                <p className="text-gray-500 text-sm mb-6 flex-grow">
                  {product.description.substring(0, 60)}...
                </p>
                <p className="text-xl font-extrabold text-black mb-6">
                  ${product.price}
                </p>

                <div className="mt-auto">
                  <Link
                    href={`/payment?items=${product.id}`}
                    className="block w-full bg-red-600 text-white text-center py-2.5 rounded-lg hover:bg-red-700 transition-colors font-bold shadow-sm"
                  >
                    Læg i kurv
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
