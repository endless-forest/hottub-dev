import { Layout } from "@/components/Layout";
import { ProductGrid } from "@/components/ProductGrid";
import { HotTubGuideChat } from "@/components/HotTubGuideChat";

export default function Models() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-sky-100">
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
      <HotTubGuideChat />
    </div>
  );
}
