"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import type { Product } from "@/types/Product";
import Link from "next/link";

export default function ComparePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const idsParam = searchParams.get("ids");
  const ids = idsParam
    ? idsParam
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean)
    : [];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      if (!ids.length) {
        setLoading(false);
        return;
      }

      const numericIds = ids.map((id) => Number(id)).filter((n) => !isNaN(n));
      let { data, error } = await supabase
        .from("products")
        .select("*")
        .in("id", numericIds);

      if (!data?.length) {
        const retry = await supabase.from("products").select("*").in("id", ids);
        if (retry.data?.length) data = retry.data;
      }

      if (error) console.error("Error fetching comparison products:", error);
      setProducts(data || []);
      setLoading(false);
    }

    fetchProducts();
  }, [ids]);

  if (loading)
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-600">
        Loading comparison...
      </main>
    );

  if (!products.length)
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="text-gray-600 mb-4">No matching products found.</p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
        >
          Back to Models
        </button>
      </main>
    );

  return (
    <main className="min-h-screen bg-gray-50 py-[clamp(2rem,5vw,5rem)] px-[clamp(1rem,4vw,3rem)]">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 mb-8">
        <div className="max-w-[90rem] mx-auto flex justify-between items-center px-[clamp(1rem,3vw,2rem)]">
          <h1 className="text-[clamp(1.5rem,2vw,2.5rem)] font-bold text-blue-800">
            Compare Models
          </h1>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-700 text-white px-[clamp(1rem,2vw,2rem)] py-2 rounded hover:bg-blue-800 transition text-[clamp(0.9rem,1.1vw,1rem)]"
          >
            ← Back to Models
          </button>
        </div>
      </div>

      {/* Product Cards (above table) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,2vw,2rem)] max-w-[90rem] mx-auto mb-[clamp(2rem,4vw,3rem)]">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/models/${product.id}`}
            className="group block bg-white rounded-xl shadow-lg p-[clamp(1rem,2vw,1.5rem)] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-blue-500 focus:outline-none"
          >
            <div className="relative w-full aspect-[4/3] mb-4 rounded-md overflow-hidden">
              <Image
                src={
                  product.getPublicUrl(product.storage_path) ||
                  "/placeholder.jpg"
                }
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <h2 className="text-[clamp(1.1rem,1.5vw,1.3rem)] font-semibold mb-2 text-gray-800 group-hover:text-blue-700 transition-colors">
              {product.name}
            </h2>

            <p className="text-gray-600 text-sm mb-3 flex-grow line-clamp-3">
              {product.description}
            </p>

            <p className="text-blue-700 font-bold mb-1 text-[clamp(1rem,1.3vw,1.2rem)]">
              ${product.price.toLocaleString()}
            </p>

            {product.rating && (
              <p className="text-yellow-500 text-[clamp(0.9rem,1vw,1rem)]">
                ⭐ {product.rating.toFixed(1)}
              </p>
            )}
          </Link>
        ))}
      </div>

      {/* Comparison Table */}
      <section className="max-w-[90rem] mx-auto bg-white shadow-lg rounded-2xl p-[clamp(1.5rem,3vw,2.5rem)]">
        <h2 className="text-[clamp(1.5rem,2vw,2rem)] font-semibold text-blue-800 mb-6 text-center">
          Feature Highlights
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-[clamp(0.8rem,1vw,0.95rem)] text-left">
            <thead className="bg-blue-50">
              <tr>
                <th className="border-b px-4 py-3 font-semibold">Feature</th>
                {products.map((p) => (
                  <th
                    key={p.id}
                    className="border-b px-4 py-3 font-semibold text-blue-800"
                  >
                    {p.name}
                    <div>
                      <a
                        href={`/book-visit?model=${encodeURIComponent(p.name)}`}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Book Visit →
                      </a>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Price", key: "price" },
                { label: "Rating", key: "rating" },
                { label: "Seating Capacity", key: "seating_capacity" },
                { label: "Jet Count", key: "jet_count" },
                { label: "Color Options", key: "color_options" },
                { label: "Dimensions", key: "dimensions" },
                { label: "Warranty (years)", key: "warranty_years" },
              ].map((feature, rowIndex) => (
                <tr
                  key={feature.key}
                  className={rowIndex % 2 === 1 ? "bg-gray-50" : ""}
                >
                  <td className="border-t px-4 py-3 font-medium text-gray-700">
                    {feature.label}
                  </td>
                  {products.map((p) => (
                    <td key={p.id} className="border-t px-4 py-3 text-gray-800">
                      {feature.key === "price" &&
                        `$${p.price.toLocaleString()}`}
                      {feature.key === "rating" &&
                        (p.rating ? `⭐ ${p.rating.toFixed(1)}` : "–")}
                      {feature.key === "seating_capacity" && p.seating_capacity}
                      {feature.key === "jet_count" && p.jet_count}
                      {feature.key === "color_options" && p.color_options}
                      {feature.key === "dimensions" && p.dimensions}
                      {feature.key === "warranty_years" && p.warranty_years}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
