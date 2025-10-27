"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/Layout";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { ArrowLeft, Phone, Mail } from "lucide-react";

interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price_range: string;
  image_url: string;
  video_url: string | null;
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", params.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
        return;
      }

      if (!data) {
        router.push("/models");
        return;
      }

      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [params.id, router]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link
          href="/models"
          className="inline-flex items-center text-blue-700 hover:text-blue-800 mb-8 font-medium transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Models
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover min-h-[400px]"
              />
            </div>

            <div className="p-8">
              <div className="mb-6">
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                  {product.brand}
                </p>
                <h1 className="text-4xl font-bold text-blue-800 mb-4">
                  {product.name}
                </h1>
                <p className="text-2xl font-bold text-gray-900">
                  {product.price_range}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  About This Model
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.video_url && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    Video Overview
                  </h2>
                  <a
                    href={product.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    Watch Demo Video →
                  </a>
                </div>
              )}

              <div className="space-y-4">
                <Link
                  href={`/contact?model=${encodeURIComponent(product.name)}`}
                  className="block w-full bg-blue-700 hover:bg-blue-800 text-white text-center px-6 py-4 rounded-lg font-semibold transition-colors"
                >
                  Request a Quote
                </Link>

                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="tel:7075551234"
                    className="flex items-center justify-center border-2 border-blue-700 text-blue-700 hover:bg-blue-50 px-4 py-3 rounded-lg font-medium transition"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Us
                  </a>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center border-2 border-blue-700 text-blue-700 hover:bg-blue-50 px-4 py-3 rounded-lg font-medium transition"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Why Choose Santa Rosa Spas?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Expert Guidance</h3>
              <p className="text-gray-600 text-sm">
                Our team helps you find the perfect spa for your needs and space.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Quality Products</h3>
              <p className="text-gray-600 text-sm">
                We only carry premium brands known for durability and comfort.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Local Service</h3>
              <p className="text-gray-600 text-sm">
                Serving Santa Rosa and surrounding areas with dedicated support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
