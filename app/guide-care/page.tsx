"use client";

import Image from "next/image";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { HotTubGuideChat } from "@/components/HotTubGuideChat";
import { getPublicUrl } from "@/lib/getPublicUrl";

const waterCare = getPublicUrl("guide-care/water-care.jpg", "site-images");
const coverCare = getPublicUrl("guide-care/cover-cleaning.jpg", "site-images");
const energyTips = getPublicUrl(
  "guide-care/energy-efficiency.jpg",
  "site-images"
);
const winterizing = getPublicUrl("guide-care/winterizing.jpg", "site-images");

export default function GuideCarePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <NavBar />

      <main className="flex-1">
        {/* ===== Hero Section ===== */}
        <section className="bg-gradient-to-b from-blue-700 to-blue-500 text-white py-20 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hot Tub Guide & Care
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Keep your hot tub sparkling, efficient, and relaxing for years to
            come. Simple routines make all the difference.
          </p>
        </section>

        {/* ===== Section 1: Water Care ===== */}
        <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-blue-800 mb-4">
              1. Balance and Refresh Your Water
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Clean, balanced water is the key to a healthy spa. Check pH and
              sanitizer levels weekly, and replace 25–30% of your water every
              month. Use a hose filter when refilling to reduce minerals and
              prevent cloudy buildup.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Once every 3–4 months, drain and deep-clean your hot tub to reset
              the system. Always refill before adding chemicals to avoid
              concentrated spots.
            </p>
          </div>
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={waterCare}
              alt="Balancing hot tub water chemistry"
              fill
               sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* ===== Section 2: Cover Cleaning ===== */}
        <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg order-2 md:order-1">
            <Image
              src={coverCare}
              alt="Cleaning a hot tub cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold text-blue-800 mb-4">
              2. Protect Your Cover
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Rinse your spa cover monthly and use a mild vinyl cleaner to
              prevent mildew and UV damage. Avoid harsh detergents — they break
              down protective coatings.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Keep the underside clean and dry. A well-maintained cover reduces
              evaporation, heat loss, and debris — saving you money year-round.
            </p>
          </div>
        </section>

        {/* ===== Section 3: Energy Efficiency ===== */}
        <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-blue-800 mb-4">
              3. Save Energy, Stay Warm
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Modern hot tubs are built for efficiency, but a few habits can
              help: keep your cover tight, lower your set temperature when not
              in use, and use “economy” heating mode overnight.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For outdoor tubs, adding a windbreak or partial enclosure helps
              maintain consistent heat without overworking your system.
            </p>
          </div>
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={energyTips}
              alt="Hot tub energy efficiency tips"
              fill
              sizes="(max-width:768px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        </section>

        {/* ===== Section 4: Seasonal Care ===== */}
        <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg order-2 md:order-1">
            <Image
              src={winterizing}
              alt="Winter hot tub care"
              fill
               sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL="/placeholder-blur.jpg"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold text-blue-800 mb-4">
              4. Winterizing or Year-Round Enjoyment
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Many owners enjoy their hot tubs year-round — just check your
              water more often during cold months. If you prefer to close it for
              winter, always drain and dry all plumbing lines to prevent
              freezing.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Add a spa cover cap or thermal blanket to protect against frost,
              and remember to disconnect power if the system is fully shut down.
            </p>
          </div>
        </section>

        {/* ===== CTA Section ===== */}
        <section className="bg-blue-700 text-white text-center py-16 px-6">
          <h2 className="text-3xl font-semibold mb-4">
            Need Personalized Care Advice?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our experts can help you troubleshoot, select cleaning products, or
            schedule a service visit.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/contact"
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition"
            >
              Contact Support
            </a>
            <a
              href="/book-visit"
              className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Schedule Maintenance Visit →
            </a>
          </div>
        </section>
      </main>

      <HotTubGuideChat />
      <Footer />
    </div>
  );
}
