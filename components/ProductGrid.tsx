"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Product } from "@/types/Product";
import { ProductFilter } from "./ProductFilter";
import { ProductCard } from "./ProductCard";
import { CompareBar } from "./CompareBar";

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState("");

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching products:", error);
      setProducts((data as Product[]) || []);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Build unique brand list
  const brands = useMemo(() => {
    const s = new Set(
      products
        .map((p) => p.brand)
        .filter(
          (b): b is string => typeof b === "string" && b.trim().length > 0
        )
    );
    return Array.from(s).sort();
  }, [products]);

  // Filter by brand only
  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) => !selectedBrand || product.brand === selectedBrand
    );
  }, [products, selectedBrand]);

  const handleClearFilters = () => {
    setSelectedBrand("");
  };

  if (loading) {
    return (
      <section className="px-6 pb-12 text-center">
        <p className="text-gray-600">Loading products...</p>
      </section>
    );
  }

  return (
    <section className="px-6 pb-12 max-w-7xl mx-auto">
      <ProductFilter
        selectedBrand={selectedBrand}
        brands={brands}
        onBrandChange={setSelectedBrand}
        onClearFilters={handleClearFilters}
      />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found for this brand.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <CompareBar />
    </section>
  );
}
