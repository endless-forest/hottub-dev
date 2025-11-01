"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Product } from "@/types/Product";
import { ProductFilter } from "./ProductFilter";
import { ProductCard } from "./ProductCard";
import { CompareBar } from "./CompareBar";

interface ProductGridProps {
  categoryName: string; // 👈 pass e.g. "Hot Tub" or "Hot Tub Accessories"
}

export function ProductGrid({ categoryName }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        // 1️⃣ Find category id for the provided name
        const { data: category, error: catError } = await supabase
          .from("product_categories")
          .select("id")
          .eq("name", categoryName)
          .maybeSingle();

        if (catError) throw catError;
        if (!category) {
          console.warn(`⚠️ Category '${categoryName}' not found.`);
          setProducts([]);
          setLoading(false);
          return;
        }

        // 2️⃣ Fetch products in that category
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("category_id", category.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        setProducts(data || []);
      } catch (err) {
        console.error(`Error fetching products for '${categoryName}':`, err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  // 3️⃣ Build brand filter
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

  // 4️⃣ Filter by brand
  const filteredProducts = useMemo(() => {
    return products.filter((p) => !selectedBrand || p.brand === selectedBrand);
  }, [products, selectedBrand]);

  const handleClearFilters = () => setSelectedBrand("");

  if (loading) {
    return (
      <section className="px-6 pb-12 text-center">
        <p className="text-gray-600">Loading {categoryName.toLowerCase()}...</p>
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
          <p className="text-gray-600">
            No {categoryName.toLowerCase()} found for this brand.
          </p>
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
