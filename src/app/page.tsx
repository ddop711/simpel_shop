import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden flex flex-col justify-end items-start p-8 md:p-16 bg-gray-900 shadow-xl">
      <img
        src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2000&auto=format&fit=crop"
        alt="Moderne webshop"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      <div className="relative z-10 max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md">
          Den simple shop
        </h1>
        <Link
          href="/products"
          className="inline-block bg-red-600 text-white rounded-full px-8 py-4 font-bold text-lg hover:bg-red-700 transition-colors shadow-lg hover:scale-105 transform duration-200"
        >
          Udforsk produkterne
        </Link>
      </div>
    </div>
  );
}
