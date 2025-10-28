import { Layout } from "@/components/Layout";
import { ProductGrid } from "@/components/ProductGrid";
import { HeroBanner } from "@/components/HeroBanner";

export default function Home() {
  return (
    <Layout>
      <HeroBanner />

      <section className="text-center py-12 px-6">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-blue-800 leading-tight">
          Santa Rosa Spas
        </h2>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed">
          Relax. Renew. Restore. Explore our collection of premium hot tubs
          built for comfort, beauty, and everyday renewal.
        </p>
      </section>

      <ProductGrid />
    </Layout>
  );
}
