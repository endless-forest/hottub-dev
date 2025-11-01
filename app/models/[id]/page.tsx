"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import { supabase } from "@/lib/supabaseClient";
import type { Product } from "@/types/Product";
import { getPublicUrl } from "@/lib/getPublicUrl";
import { HotTubGuideChat } from "@/components/HotTubGuideChat";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export default function ModelDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔹 Fetch product
  useEffect(() => {
    (async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.error("Error fetching product:", error);
      setProduct(data as Product | null);
      setLoading(false);
    })();
  }, [id]);

  // 🔹 Build all image URLs
  const images = useMemo(() => {
    if (!product) return [];
    const gallery = (product.gallery_paths ?? []) as string[];

    const urls = gallery
      .filter(Boolean)
      .map((path) => getPublicUrl(path ?? "", "product-images"));

    const main = getPublicUrl(product.storage_path ?? "", "product-images");
    return [main, ...urls].filter(Boolean);
  }, [product]);

  // 🔹 Preload next/prev images
  useEffect(() => {
    if (!isModalOpen || images.length < 2) return;
    const preload = (src: string) => {
      if (typeof window === "undefined") return;
      const i = new window.Image();
      i.src = src;
    };
    preload(images[(currentIndex + 1) % images.length]);
    preload(images[(currentIndex - 1 + images.length) % images.length]);
  }, [isModalOpen, currentIndex, images]);

  const handleNext = useCallback(
    () => setCurrentIndex((i) => (i + 1) % images.length),
    [images.length]
  );
  const handlePrev = useCallback(
    () => setCurrentIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );

  // 🔹 Keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
          onClick={() => router.push("/models")}
          className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
        >
          Back to Models
        </button>
      </main>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />

      <main className="flex-1 pb-16">
        {/* 🏞 Hero */}
        <div className="relative h-[40vh] w-full">
          <Image
            src={images[0] || "/placeholder-blur.jpg"}
            alt={product.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
            <h1 className="text-[clamp(1.75rem,3vw,3rem)] font-bold text-white drop-shadow-lg">
              {product.name}
            </h1>
          </div>
        </div>

        {/* 🔹 Info */}
        <section className="max-w-6xl mx-auto mt-10 px-4 grid lg:grid-cols-2 gap-[clamp(1.25rem,3vw,2.5rem)] items-start">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div
              onClick={() => setModalOpen(true)}
              className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg group cursor-zoom-in"
            >
              <Image
                src={images[currentIndex] || "/placeholder-blur.jpg"}
                alt={`${product.name} image ${currentIndex + 1}`}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {images.map((src, idx) => (
                <button
                  key={`${src}-${idx}`}
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
                    <td className="py-2 font-medium text-gray-700">
                      Seating Capacity
                    </td>
                    <td className="py-2 text-gray-600">
                      {product.seating_capacity ?? "–"}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 font-medium text-gray-700">
                      Jet Count
                    </td>
                    <td className="py-2 text-gray-600">
                      {product.jet_count ?? "–"}
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
            onClick={() => router.push("/models")}
            className="text-blue-700 font-semibold hover:underline"
          >
            ← Back to all models
          </button>
        </div>

        {/* 🖼 Modal viewer */}
        {isModalOpen && (
          <div
            {...swipeHandlers}
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <div
              className="relative w-full max-w-[90vw] aspect-video flex items-center justify-center rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentIndex] || "/placeholder-blur.jpg"}
                alt={`${product.name} – image ${currentIndex + 1}`}
                fill
                className="object-cover object-center"
                priority
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 backdrop-blur-sm"
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 backdrop-blur-sm"
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

      <HotTubGuideChat />
      <Footer />
    </div>
  );
}
