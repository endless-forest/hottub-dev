"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import { supabase } from "@/lib/supabaseClient";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string | null;
  rating?: number | null;
  seating_capacity?: number | null;
  jet_count?: number | null;
  color_options?: string | null;
  dimensions?: string | null;
  warranty_years?: number | null;
  image_gallery?: string[] | null;
};

export default function ModelDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch the product
  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error("Error fetching product:", error);
      setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  // Always build at least one image (so thumbnails render)
  const images = useMemo(() => {
    const gallery =
      Array.isArray(product?.image_gallery) && product?.image_gallery.length
        ? product.image_gallery
        : [];
    const mainImage = product?.image_url
      ? [product.image_url]
      : ["/placeholder.jpg"];
    return [...gallery, ...mainImage];
  }, [product]);

  // Preload next and previous
  useEffect(() => {
    if (typeof document === "undefined" || images.length < 2) return;
    const preload = (src: string) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
      return link;
    };
    const next = images[(currentIndex + 1) % images.length];
    const prev = images[(currentIndex - 1 + images.length) % images.length];
    const l1 = preload(next);
    const l2 = preload(prev);
    return () => {
      l1?.remove();
      l2?.remove();
    };
  }, [currentIndex, images]);

  const handleNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard support
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isModalOpen, handleNext, handlePrev]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  if (loading)
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-600">
        Loading model details...
      </main>
    );

  if (!product)
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

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Hero */}
      <div className="relative h-[40vh] w-full">
        <Image
          src={images[0]}
          alt={product.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
          <h1 className="text-[clamp(1.75rem,3vw,3rem)] font-bold text-white drop-shadow-lg">
            {product.name}
          </h1>
        </div>
      </div>

      {/* Main */}
      <section className="max-w-6xl mx-auto mt-10 px-4 grid lg:grid-cols-2 gap-[clamp(1.25rem,3vw,2.5rem)] items-start">
        {/* Image viewer with thumbnails */}
        <div className="flex flex-col gap-4">
          <div
            onClick={() => setModalOpen(true)}
            className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg group cursor-zoom-in"
          >
            <Image
              src={images[currentIndex]}
              alt={`${product.name} main image`}
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* ✅ Always render thumbnails */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {images.map((src, idx) => (
              <button
                key={src + idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                  idx === currentIndex
                    ? "border-blue-600 scale-105"
                    : "border-transparent hover:opacity-80"
                }`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="text-gray-700 text-[clamp(1rem,1.6vw,1.125rem)] mb-4 leading-relaxed">
            {product.description}
          </p>

          <p className="text-[clamp(1.25rem,2vw,1.5rem)] text-blue-700 font-bold mb-2">
            ${product.price.toLocaleString()}
          </p>

          {typeof product.rating === "number" && (
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

          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">
              Specifications
            </h2>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-2 font-medium text-gray-700">Seating Capacity</td>
                  <td className="py-2 text-gray-600">{product.seating_capacity ?? "–"}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-2 font-medium text-gray-700">Jet Count</td>
                  <td className="py-2 text-gray-600">{product.jet_count ?? "–"}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-gray-700">Color Options</td>
                  <td className="py-2 text-gray-600">{product.color_options ?? "–"}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-2 font-medium text-gray-700">Dimensions</td>
                  <td className="py-2 text-gray-600">{product.dimensions ?? "–"}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-gray-700">Warranty</td>
                  <td className="py-2 text-gray-600">
                    {product.warranty_years ? `${product.warranty_years} years` : "–"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Back */}
      <div className="mt-10 text-center">
        <button
          onClick={() => router.push("/")}
          className="text-blue-700 font-semibold hover:underline"
        >
          ← Back to all models
        </button>
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div
          {...swipeHandlers}
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
        >
          <div
            className="relative w-[92vw] max-w-5xl aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex]}
              alt={`${product.name} – image ${currentIndex + 1}`}
              fill
              className="object-contain select-none"
              priority
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 backdrop-blur-sm transition"
                >
                  ←
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 backdrop-blur-sm transition"
                >
                  →
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setModalOpen(false)}
            aria-label="Close"
            className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 text-white text-xl px-3 py-1 rounded-md"
          >
            ✕
          </button>
        </div>
      )}
    </main>
  );
}
