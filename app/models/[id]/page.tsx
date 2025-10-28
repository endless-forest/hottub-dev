"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  rating?: number;
  seating_capacity?: number;
  jet_count?: number;
  color_options?: string;
  dimensions?: string;
  warranty_years?: number;
}

export default function ModelDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error("Error fetching product:", error);
      else setProduct(data);

      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-600">
        Loading model details...
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center">
        <p className="text-gray-600 mb-4">Model not found.</p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
        >
          Back to Models
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Image */}
      <div className="relative h-[400px] w-full">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            {product.name}
          </h1>
        </div>
      </div>

      {/* Main Info Section */}
      <section className="max-w-6xl mx-auto mt-10 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Description */}
          <div className="flex-1">
            <p className="text-gray-700 text-lg mb-4">{product.description}</p>

            <p className="text-2xl text-blue-700 font-bold mb-6">
              ${product.price.toLocaleString()}
            </p>

            {product.rating && (
              <p className="text-yellow-500 mb-4">
                ⭐ {product.rating.toFixed(1)} / 5.0
              </p>
            )}

            <button
              onClick={() =>
                router.push(
                  `/book-visit?model=${encodeURIComponent(product.name)}`
                )
              }
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Book Your Visit
            </button>
          </div>

          {/* Specs Table */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">
              Specifications
            </h2>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-2 font-medium text-gray-700">
                    Seating Capacity
                  </td>
                  <td className="py-2 text-gray-600">
                    {product.seating_capacity ?? "–"}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-2 font-medium text-gray-700">Jet Count</td>
                  <td className="py-2 text-gray-600">
                    {product.jet_count ?? "–"}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-gray-700">
                    Color Options
                  </td>
                  <td className="py-2 text-gray-600">
                    {product.color_options ?? "–"}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-2 font-medium text-gray-700">Dimensions</td>
                  <td className="py-2 text-gray-600">
                    {product.dimensions ?? "–"}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-gray-700">Warranty</td>
                  <td className="py-2 text-gray-600">
                    {product.warranty_years
                      ? `${product.warranty_years} years`
                      : "–"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-10 text-center">
          <button
            onClick={() => router.push("/")}
            className="text-blue-700 font-semibold hover:underline"
          >
            ← Back to all models
          </button>
        </div>
      </section>
    </main>
  );
}
