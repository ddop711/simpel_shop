import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Din simple shop",
  description: "Webshop afleveringsopgave af Denzel & Mikkel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da">
      <body className="flex flex-col min-h-screen bg-white text-gray-900 font-sans">
        <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link href="/" className="text-2xl font-extrabold text-black">
                WEBSHOP<span className="text-red-600">.</span>
              </Link>
              <nav className="flex gap-8">
                <Link
                  href="/"
                  className="font-semibold text-gray-600 hover:text-black"
                >
                  Forside
                </Link>
                <Link
                  href="/products"
                  className="font-semibold text-gray-600 hover:text-black"
                >
                  Produkter
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-grow w-full">{children}</main>

        <footer className="bg-white border-t border-gray-100 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h2 className="text-xl font-bold mb-4 text-black">
                  Din simple shop<span className="text-red-600">.</span>
                </h2>
                <p className="text-gray-500 text-sm max-w-xs">
                  Din foretrukne webshop til gode fund og skarpe priser. Vi går
                  op i kvalitet, hastighed og en gnidningsfri købsoplevelse.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-black mb-4">Kundeservice</h3>
                <ul className="space-y-3 text-sm text-gray-500">
                  <li>
                    <Link href="#" className="hover:text-black">
                      Handelsbetingelser
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black">
                      Fragt & Levering
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black">
                      Returnering
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black">
                      Ofte stillede spørgsmål
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-black mb-4">Kontakt</h3>
                <ul className="space-y-3 text-sm text-gray-500">
                  <li>Tlf: +45 12 34 56 78</li>
                  <li>Email: hej@dinsimpleshop.dk</li>
                  <li>Adresse: Webshopgade 42, 1000 København K</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
              <p>© 2026 Din simple shop. Alle rettigheder forbeholdes.</p>
              <p className="mt-4 md:mt-0 font-medium">
                Udviklet af Denzel & Mikkel
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
