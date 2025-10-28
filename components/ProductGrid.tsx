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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [compareList, setCompareList] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts((data as Product[]) || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

const brands = useMemo(() => {
  const s = new Set(
    products
      .map((p) => p.brand)
      .filter((b): b is string => typeof b === "string" && b.trim().length > 0)
  );
  return Array.from(s).sort();
}, [products]);


  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBrand = !selectedBrand || product.brand === selectedBrand;

      return matchesSearch && matchesBrand;
    });
  }, [products, searchTerm, selectedBrand]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedBrand("");
  };

  const toggleCompare = (id: string) => {
    setCompareList((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
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
        searchTerm={searchTerm}
        selectedBrand={selectedBrand}
        brands={brands}
        onSearchChange={setSearchTerm}
        onBrandChange={setSelectedBrand}
        onClearFilters={handleClearFilters}
      />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No products match your search criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              compareList={compareList}
              setCompareList={setCompareList}
            />
          ))}
        </div>
      )}

      {/* Mid-page CTA strip */}
      <div className="mt-12">
        <div className="mx-auto max-w-4xl bg-gradient-to-r from-blue-700 to-indigo-600 text-white rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-lg font-semibold">
              Not sure which spa fits you? Take our 30-second quiz.
            </p>
          </div>
          <div>
            <a
              href="/quiz"
              className="inline-block bg-white text-blue-700 font-semibold px-4 py-2 rounded-md"
            >
              Take the Quiz
            </a>
          </div>
        </div>
      </div>

      <CompareBar ids={compareList} />
    </section>
  );
}
