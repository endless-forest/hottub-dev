import { Layout } from "@/components/Layout";
import { ProductGrid } from "@/components/ProductGrid";

export default function Models() {
  return (
    <Layout>
      <section className="text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
          Our Hot Tub Models
        </h1>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Handpicked for comfort, quality, and style. Each hot tub is designed
          to transform your backyard into a personal wellness retreat.
        </p>
      </section>
      <ProductGrid />
    </Layout>
  );
}
