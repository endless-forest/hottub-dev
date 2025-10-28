"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ProductFilter } from "./ProductFilter";
import { ProductCard } from "./ProductCard";
import { CompareBar } from "./CompareBar";

interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price?: string | null;
  price_range?: string | null;
  rating?: number | null;
  image_url: string;
}

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
    const set = new Set(products.map((p) => p.brand));
    return Array.from(set).sort();
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
    setCompareList((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
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
          <p className="text-gray-600">No products match your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isCompared={compareList.includes(product.id)}
              onToggleCompare={() => toggleCompare(product.id)}
            />
          ))}
        </div>
      )}

      {/* Mid-page CTA strip */}
      <div className="mt-12">
        <div className="mx-auto max-w-4xl bg-gradient-to-r from-blue-700 to-indigo-600 text-white rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-lg font-semibold">Not sure which spa fits you? Take our 30-second quiz.</p>
          </div>
          <div>
            <a href="/quiz" className="inline-block bg-white text-blue-700 font-semibold px-4 py-2 rounded-md">Take the Quiz</a>
          </div>
        </div>
      </div>

      <CompareBar ids={compareList} />
    </section>
  );
}
"use client";

 "use client";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import { ProductFilter } from "./ProductFilter";

interface Product {
 import { ProductCard } from "./ProductCard";
 import { CompareBar } from "./CompareBar";
  id: string;
  name: string;
  id: string;
  name: string;
  brand: string;
  description: string;
  price?: string | null;
  price_range?: string;
  rating?: number | null;
  image_url: string;
export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
  const [compareList, setCompareList] = useState<string[]>([]);
    const fetchProducts = async () => {
      console.log("Fetching products...");
      console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        console.log("Products fetched successfully:", data?.length);
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const brands = useMemo(() => {
    const brandSet = new Set(products.map((p) => p.brand));
    const uniqueBrands = Array.from(brandSet);
    return uniqueBrands.sort();
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

  if (loading) {
    return (
  const toggleCompare = (id: string) => {
    setCompareList(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Link
            <ProductCard
              key={product.id}
              product={product}
              isCompared={compareList.includes(product.id)}
              onToggleCompare={() => toggleCompare(product.id)}
            />
        </div>
      )}
    </section>
      {/* Compare bar floating button */}
      <CompareBar ids={compareList} />
  );
}
