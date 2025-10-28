"use client";

import Link from "next/link";

export function HeroBanner() {
  return (
    <section
      className="relative bg-cover bg-center text-white py-32"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1800&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold mb-4">
          Relax. Renew. Restore.
        </h1>
        <p className="text-white/90 max-w-2xl mx-auto mb-8">
          Experience premium hot tubs that transform your backyard into a
          sanctuary.
        </p>

        <Link
          href="/book-visit"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition"
        >
          Book Your Visit
        </Link>
      </div>
    </section>
  );
}
