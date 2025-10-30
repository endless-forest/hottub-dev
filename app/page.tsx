import { Layout } from "@/components/Layout";
import { HeroBanner } from "@/components/HeroBanner";
import { supabase } from "@/lib/supabaseClient";
import { getPublicUrl } from "@/lib/getPublicUrl";
import Image from "next/image";
import Link from "next/link";

// ✅ Server-side data fetch for featured models
async function getFeaturedModels() {
  const { data } = await supabase.from("products").select("*").limit(3);
  return data || [];
}

export default async function Home() {
  const featured = await getFeaturedModels();

  return (
    <Layout>
      {/* 🏞️ Hero Section */}
      <HeroBanner />

      {/* 🪷 About Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://images.pexels.com/photos/3823207/pexels-photo-3823207.jpeg"
              alt="Santa Rosa Hot Tub Showroom"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-blue-800 mb-4">
              About Santa Rosa Hot Tubs
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4 text-lg">
              For over 20 years, Santa Rosa Hot Tubs has helped families create
              backyard sanctuaries. Explore hand-picked models from trusted
              brands and experience true comfort in person.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our team is passionate about connecting you with the perfect blend
              of relaxation, design, and durability — tailored for your
              lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* 🛁 Featured Models */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-blue-800 mb-8">
          Featured Models
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featured.map((product) => {
            const imageUrl = getPublicUrl(product.storage_path);
            return (
              <Link
                key={product.id}
                href={`/models/${product.id}`}
                className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 text-left">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-blue-700">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-blue-700 font-bold text-base">
                    ${product.price?.toLocaleString()}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10">
          <a
            href="/models"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            View All Models
          </a>
        </div>
      </section>

      {/* 🌿 Wellness Benefits */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-blue-800 mb-10">
          Wellness Benefits
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-gray-700">
          <div>
            <div className="text-4xl mb-3">💧</div>
            <h3 className="font-semibold text-lg">Hydrotherapy</h3>
            <p className="text-sm text-gray-600">
              Relieve stress and soothe sore muscles.
            </p>
          </div>
          <div>
            <div className="text-4xl mb-3">🌙</div>
            <h3 className="font-semibold text-lg">LED Ambience</h3>
            <p className="text-sm text-gray-600">
              Mood lighting for every evening soak.
            </p>
          </div>
          <div>
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-lg">Energy Efficient</h3>
            <p className="text-sm text-gray-600">
              Smart heating systems reduce energy use.
            </p>
          </div>
          <div>
            <div className="text-4xl mb-3">🌿</div>
            <h3 className="font-semibold text-lg">Built to Last</h3>
            <p className="text-sm text-gray-600">
              Premium materials made for California living.
            </p>
          </div>
        </div>
      </section>

      {/* 💬 Testimonials */}
      <section className="bg-white py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-blue-800 mb-10">
          What Our Customers Say
        </h2>
        <div className="max-w-3xl mx-auto space-y-10 text-gray-700">
          <blockquote>
            <p className="italic text-lg mb-2">
              “Our family spends every evening out here now. It’s the best
              purchase we’ve ever made.”
            </p>
            <footer className="text-blue-700 font-semibold">– Carla R.</footer>
          </blockquote>
          <blockquote>
            <p className="italic text-lg mb-2">
              “The staff made the process so easy, and the delivery was
              seamless. Absolutely love our new hot tub!”
            </p>
            <footer className="text-blue-700 font-semibold">
              – Mike and Sarah P.
            </footer>
          </blockquote>
        </div>
      </section>

      {/* 📅 Call to Action */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Ready to Experience It for Yourself?
        </h2>
        <p className="text-lg mb-8">
          Schedule a visit to our showroom and find your perfect hot tub.
        </p>
        <a
          href="/book-visit"
          className="inline-block bg-white text-blue-800 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition"
        >
          Book Your Visit
        </a>
      </section>
    </Layout>
  );
}
