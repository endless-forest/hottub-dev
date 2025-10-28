import { Layout } from "@/components/Layout";
import { ProductGrid } from "@/components/ProductGrid";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      {/* Hero banner */}
      <section
        className="bg-cover bg-center relative text-white py-32"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Relax. Renew. Restore.</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 mb-8">
            Discover premium hot tubs built for comfort, beauty, and everyday renewal.
          </p>
          <Link
            href="/book-visit"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md shadow-lg"
          >
            Book Your Visit
          </Link>
        </div>
      </section>

      <ProductGrid />

      {/* Mid-page CTA strip will be rendered by ProductGrid below the grid */}
    </Layout>
  );
}
