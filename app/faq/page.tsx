"use client";

import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { HotTubGuideChat } from "@/components/HotTubGuideChat";

const faqs = [
  {
    question: "How do I schedule a showroom visit?",
    answer:
      "You can easily schedule a visit using our online booking form on the Book Visit page. Once submitted, you'll receive a confirmation email with your selected date and time.",
  },
  {
    question: "Do you offer delivery and installation?",
    answer:
      "Yes, we provide full-service delivery and installation across Sonoma County. Our team ensures proper placement, setup, and a walkthrough of your new hot tub.",
  },
  {
    question: "What kind of warranty do your hot tubs include?",
    answer:
      "Most models include multi-year warranties covering structural components, plumbing, and electrical systems. Specific coverage details vary by brand and model.",
  },
  {
    question: "Can I test a hot tub before purchasing?",
    answer:
      "Absolutely! Our showroom features several demo models available for a private test soak. Just bring a swimsuit and schedule your visit in advance.",
  },
  {
    question: "How energy-efficient are your hot tubs?",
    answer:
      "Our models use insulated shells and efficient pumps designed to maintain temperature while minimizing energy use, ensuring both comfort and savings year-round.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <NavBar />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-blue-700 to-blue-500 text-white py-20 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Find quick answers about our hot tubs, services, and showroom experience.
          </p>
        </section>

        <section className="px-6 py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-blue-800 mb-10 text-center">
            Your Questions, Answered
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center text-left px-6 py-4 focus:outline-none"
                >
                  <span className="text-lg font-medium text-gray-800">
                    {faq.question}
                  </span>
                  <span
                    className={`text-blue-700 transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-5 text-gray-700 border-t border-gray-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-blue-700 text-white text-center py-12 px-6">
          <h2 className="text-3xl font-semibold mb-4">
            Still have questions?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            We&apos;re always here to help. Reach out through our contact form or start a live chat with one of our team members.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/contact"
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition"
            >
              Contact Us
            </a>
            <a
              href="/book-visit"
              className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Book a Visit →
            </a>
          </div>
        </section>
      </main>

      <HotTubGuideChat />
      <Footer />
    </div>
  );
}
