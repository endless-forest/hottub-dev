"use client";

import { Layout } from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] w-full">
        <Image
          src="https://images.pexels.com/photos/1574843/pexels-photo-1574843.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Backyard spa at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center text-center px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Relax. Renew. Restore.
            </h1>
            <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
              At Santa Rosa Spas, every soak tells a story of craftsmanship,
              care, and connection.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-gray-700 leading-relaxed">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800">
            Our Story
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6 text-lg">
          <p>
            Founded by a lifelong spa professional, <strong>Santa Rosa Spas</strong> brings
            warmth, trust, and expertise to every backyard. Our mission is simple:
            to help you relax in style with dependable products and honest service.
          </p>

          <p>
            With decades of hands-on experience, we know what makes a truly exceptional
            spa experience. From the moment you step into one of our hot tubs, you&apos;ll
            feel the difference that quality craftsmanship and thoughtful design make.
          </p>

          <p>
            We&apos;re passionate about helping families and friends reconnect, unwind,
            and create lasting memories. Whether you&apos;re soothing tired muscles after
            a long day or building your dream outdoor oasis, we&apos;re here to help you
            find the perfect spa for your lifestyle.
          </p>
        </div>

        <div className="bg-blue-50 p-8 rounded-xl mt-12 shadow-sm">
          <h2 className="text-2xl font-bold text-blue-800 mb-5">
            Why Choose Santa Rosa Spas?
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">✓</span>
              <span>Expert guidance from experienced spa professionals</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">✓</span>
              <span>Premium quality hot tubs from trusted brands</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">✓</span>
              <span>Transparent pricing with no hidden surprises</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">✓</span>
              <span>Personal, dedicated customer support</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg mb-4">
            Ready to experience the comfort and calm of your own backyard retreat?
          </p>
          <Link
            href="/book-visit"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Book a Showroom Visit
          </Link>
        </div>
      </section>
    </Layout>
  );
}
