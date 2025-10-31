"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { HotTubGuideChat } from "@/components/HotTubGuideChat";
import { getPublicUrl } from "@/lib/getPublicUrl";

export default function BookVisitPage() {
  const searchParams = useSearchParams();
  const modelParam = searchParams.get("model");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    model_interest: modelParam || "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/book-visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) setSubmitted(true);
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Supabase images
  const leftImage = getPublicUrl("book-visit/book-visit.jpg", "site-images");
  const rightImage = getPublicUrl(
    "book-visit/showroom-interior.jpg",
    "site-images"
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <NavBar />

      <main className="flex-1 flex items-center justify-center px-6 py-[clamp(2rem,5vw,5rem)]">
        {/* ✅ 3-column balanced layout */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
          {/* Left Image */}
          <div className="hidden lg:block relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={leftImage}
              alt="Hot tub exterior"
              fill
              sizes="33vw"
              className="object-cover"
            />
          </div>

          {/* Center Form */}
          <div className="flex items-stretch">
            <div className="w-full bg-white rounded-2xl shadow-lg p-10 flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-blue-800 mb-4 text-center">
                Book a Showroom Visit
              </h1>
              <p className="text-gray-700 text-center mb-8">
                Schedule your personalized hot tub consultation and experience
                our models in person.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Phone
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Date
                      </label>
                      <input
                        name="date"
                        type="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Time
                      </label>
                      <input
                        name="time"
                        type="time"
                        required
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Hot Tub Model of Interest
                    </label>
                    <input
                      name="model_interest"
                      type="text"
                      value={formData.model_interest}
                      onChange={handleChange}
                      placeholder="Optional"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Additional Notes
                    </label>
                    <textarea
                      name="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Tell us about your preferences or questions..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Confirm Appointment"}
                  </button>
                </form>
              ) : (
                <div className="text-center py-10">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-3">
                    Thank you!
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Your visit request has been received. You’ll receive an
                    email confirmation shortly.
                  </p>
                  <button
                    onClick={() => (window.location.href = "/models")}
                    className="mt-4 bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
                  >
                    Back to Hot Tubs
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:block relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={rightImage}
              alt="Showroom interior"
              fill
              sizes="33vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL="/placeholder-blur.jpg"
            />
          </div>
        </div>
      </main>

      <HotTubGuideChat />
      <Footer />
    </div>
  );
}
