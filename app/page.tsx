import { Layout } from "@/components/Layout";
import { ProductGrid } from "@/components/ProductGrid";

export default function Home() {
  return (
    <Layout>
      <section className="text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-blue-800 leading-tight">
          Santa Rosa Spas
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed">
          Relax. Renew. Restore. Explore our collection of premium hot tubs built
          for comfort, beauty, and everyday renewal.
        </p>
      </section>
      <ProductGrid />
    </Layout>
  );
}
