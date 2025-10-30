"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { HotTubGuideChat } from "@/components/HotTubGuideChat";
import { getPublicUrl } from "@/lib/getPublicUrl";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  location: string | null;
  message: string;
  rating: number | null;
  created_at: string;
}

const testimonialHero = getPublicUrl(
  "testimonials/testimonial-hero.jpg",
  "site-images"
);

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching testimonials:", error);
      setTestimonials(data || []);
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <NavBar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-700 to-blue-500 text-white py-20 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Customer Testimonials
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Real stories from our Santa Rosa community — because nothing speaks
            louder than relaxation that lasts.
          </p>
        </section>

        {/* Testimonials Grid */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          {loading ? (
            <p className="text-center text-gray-600">Loading testimonials...</p>
          ) : testimonials.length === 0 ? (
            <p className="text-center text-gray-600">
              No testimonials yet — check back soon!
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
                >
                  <div>
                    {t.rating && (
                      <p className="text-yellow-500 mb-2">
                        {"⭐".repeat(t.rating)}{" "}
                        <span className="text-gray-400 text-sm">
                          ({t.rating}/5)
                        </span>
                      </p>
                    )}
                    <p className="text-gray-700 leading-relaxed mb-4 italic">
                      “{t.message}”
                    </p>
                  </div>
                  <div className="mt-auto">
                    <p className="font-semibold text-blue-800">{t.name}</p>
                    {t.location && (
                      <p className="text-sm text-gray-500">{t.location}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="text-center bg-blue-700 text-white py-12 px-6">
          <h2 className="text-3xl font-semibold mb-3">
            Ready to experience it yourself?
          </h2>
          <p className="text-blue-100 mb-6">
            Book a personalized visit and see why our customers love their new
            hot tubs.
          </p>
          <a
            href="/book-visit"
            className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition"
          >
            Book Your Visit →
          </a>
        </section>
        <div className="relative max-w-3xl mx-auto aspect-[16/9] rounded-xl overflow-hidden shadow-lg mb-8 mt-10">
          <Image
            src={testimonialHero}
            alt="Relaxing spa"
            fill
            className="object-cover"
          />
        </div>
      </main>

      <HotTubGuideChat />
      <Footer />
    </div>
  );
}
