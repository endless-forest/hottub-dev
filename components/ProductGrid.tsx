"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import { ProductFilter } from "./ProductFilter";

interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price_range: string;
  image_url: string;
}

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
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
              key={product.id}
              href={`/models/${product.id}`}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group block"
            >
              <div className="overflow-hidden">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  width={400}
                  height={224}
                  priority={filteredProducts.indexOf(product) < 2}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{product.brand}</p>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {product.description}
                </p>
                <p className="font-bold text-gray-900 text-lg">
                  {product.price_range}
                </p>
                <p className="text-blue-600 text-sm font-medium mt-4 group-hover:underline">
                  View Details →
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
