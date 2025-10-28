"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import type { Product } from "@/types/Product";

export default function ComparePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const idsParam = searchParams.get("ids");
  const ids = idsParam ? idsParam.split(",") : [];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      if (!ids.length) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .in("id", ids);

      if (error) console.error("Error fetching comparison products:", error);
      else setProducts(data || []);

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

  if (!ids.length)
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="text-gray-600 mb-4">No products selected for comparison.</p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
        >
          Back to Models
        </button>
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
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 mb-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800">
            Compare Models
          </h1>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-700 text-white px-5 py-2 rounded hover:bg-blue-800 transition"
          >
            ← Back to Models
          </button>
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col"
          >
            <div className="relative w-full h-48 mb-4">
              <Image
                src={product.image_url || "/placeholder.jpg"}
                alt={product.name}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       33vw"
                priority={false}
              />
            </div>

            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-3 flex-grow">
              {product.description}
            </p>
            <p className="text-blue-700 font-bold mb-2">
              ${product.price.toLocaleString()}
            </p>
            {product.rating !== undefined && (
              <p className="text-yellow-500">⭐ {product.rating.toFixed(1)}</p>
            )}
          </div>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <section className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
          Feature Highlights
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm text-left">
            <thead className="bg-blue-50">
              <tr>
                <th className="border-b px-4 py-2 font-semibold">Feature</th>
                {products.map((p) => (
                  <th
                    key={p.id}
                    className="border-b px-4 py-2 font-semibold text-blue-800"
                  >
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Price", key: "price" },
                { label: "Rating", key: "rating" },
                { label: "Description", key: "description" },
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
                  <td className="border-t px-4 py-2 font-medium text-gray-700">
                    {feature.label}
                  </td>
                  {products.map((p) => (
                    <td key={p.id} className="border-t px-4 py-2">
                      {feature.key === "price" && `$${p.price?.toLocaleString()}`}
                      {feature.key === "rating" &&
                        (p.rating ? `⭐ ${p.rating.toFixed(1)}` : "–")}
                      {feature.key === "description" &&
                        `${p.description.slice(0, 60)}...`}
                      {feature.key === "seating_capacity" &&
                        (p.seating_capacity ?? "–")}
                      {feature.key === "jet_count" && (p.jet_count ?? "–")}
                      {feature.key === "color_options" &&
                        (p.color_options ?? "–")}
                      {feature.key === "dimensions" && (p.dimensions ?? "–")}
                      {feature.key === "warranty_years" &&
                        (p.warranty_years ?? "–")}
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
