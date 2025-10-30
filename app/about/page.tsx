"use client";

import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { HotTubGuideChat } from "@/components/HotTubGuideChat";
import Image from "next/image";
import { getPublicUrl } from "@/lib/getPublicUrl";

const aboutStory = getPublicUrl("about/about-story.jpg", "site-images");
const aboutValues = getPublicUrl("about/about-values.jpg", "site-images");
const aboutShowroom = getPublicUrl("about/about-showroom.jpg", "site-images");

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* ✅ NavBar */}
      <NavBar />

      <main className="flex-1">
        {/* ===== Hero Section ===== */}
        <section className="bg-gradient-to-b from-blue-700 to-blue-500 text-white py-20 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Santa Rosa Spas
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Relaxation. Craftsmanship. Community. Our mission is to bring the
            joy of wellness to every backyard in Sonoma County.
          </p>
        </section>

        {/* ===== Main Content ===== */}
        <section className="px-6 py-16 max-w-5xl mx-auto space-y-16">
          {/* Our Story */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-blue-800 mb-4">
                Our Story
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Founded right here in Santa Rosa, our company began with a
                simple goal: to help people unwind, reconnect, and find balance
                through quality craftsmanship and comfort. Each hot tub we offer
                reflects years of dedication to superior design, durability, and
                energy efficiency.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Whether you’re looking for a peaceful solo soak or a family
                gathering space, our team is committed to helping you find the
                perfect fit. We proudly serve local communities with honesty,
                expertise, and care.
              </p>
            </div>
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={aboutStory}
                alt="Luxury outdoor hot tub"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Our Values */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg order-2 md:order-1">
              {/* ✅ Updated image (stable Unsplash link) */}
              <Image
                src={aboutValues}
                alt="Hot tub craftsmanship"
                fill
                className="object-cover"
              />
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-semibold text-blue-800 mb-4">
                Our Values
              </h2>
              <ul className="space-y-3 text-gray-700 leading-relaxed">
                <li>
                  🌿 <strong>Wellness First:</strong> Every design choice we
                  make aims to enhance physical and mental well-being.
                </li>
                <li>
                  🔧 <strong>Quality Craftsmanship:</strong> We partner only
                  with trusted brands known for long-lasting performance.
                </li>
                <li>
                  💬 <strong>Local Connection:</strong> We’re proud to serve the
                  Santa Rosa and Sonoma County community, with personalized
                  service and local support.
                </li>
                <li>
                  ♻️ <strong>Sustainability:</strong> We prioritize
                  energy-efficient systems that are kind to both your wallet and
                  the planet.
                </li>
              </ul>
            </div>
          </div>

          {/* Our Showroom */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-blue-800 mb-6">
              Visit Our Showroom
            </h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the difference in person. Step into our Santa Rosa
              showroom to explore our collection of premium hot tubs and learn
              more about what makes each model unique.
            </p>
            <div className="relative max-w-3xl mx-auto aspect-[16/9] rounded-xl overflow-hidden shadow-lg mb-8">
              <Image
                src={aboutShowroom}
                alt="Hot tub showroom"
                fill
                className="object-cover"
              />
            </div>
            <a
              href="/book-visit"
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Schedule Your Visit →
            </a>
          </div>
        </section>
      </main>

      {/* ✅ Floating AI Chat + Footer */}
      <HotTubGuideChat />
      <Footer />
    </div>
  );
}
