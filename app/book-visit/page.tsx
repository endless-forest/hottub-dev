"use client";

import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Calendar, Clock } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Booking() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modelFromUrl = searchParams?.get("model") ?? "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    model_interest: "",
    notes: "",
  });

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  // ✅ Prefill model from query param
  useEffect(() => {
    if (modelFromUrl) {
      setForm((prev) => ({ ...prev, model_interest: modelFromUrl }));
    }
  }, [modelFromUrl]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Booking your appointment...");

    try {
      // 1️⃣ Save appointment to Supabase
      const { error } = await supabase.from("appointments").insert([form]);
      if (error) throw error;

      // 2️⃣ Send confirmation email via Edge Function
      const emailResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-confirmation-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (!emailResponse.ok) {
        console.warn("Email not sent (non-fatal):", await emailResponse.text());
      }

      // 3️⃣ Redirect to thank-you page
      router.push("/thank-you");
    } catch (err) {
      console.error("Booking error:", err);
      setStatus(
        "❌ There was a problem booking your appointment. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            Book a Showroom Visit
          </h1>
          <p className="text-lg text-gray-600">
            Schedule a time to visit our showroom and experience our hot tubs in
            person. Our expert team will guide you through the selection
            process.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Name *
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="(707) 555-1234"
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <Calendar className="w-4 h-4 inline mr-1" />
                Preferred Date *
              </label>
              <input
                id="date"
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                min={today}
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <Clock className="w-4 h-4 inline mr-1" />
                Preferred Time *
              </label>
              <select
                id="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              >
                <option value="">Select a time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="model_interest"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Model of Interest{" "}
              <span className="text-gray-400">(optional)</span>
            </label>
            <input
              id="model_interest"
              name="model_interest"
              value={form.model_interest}
              onChange={handleChange}
              placeholder="e.g., Serenity 4000"
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Additional Notes <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any specific questions or requirements?"
              rows={4}
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white px-6 py-4 rounded-lg w-full font-semibold transition-colors text-lg"
          >
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </button>

          {status && (
            <p
              className={`text-sm text-center ${
                status.includes("Error") ? "text-red-600" : "text-green-600"
              }`}
            >
              {status}
            </p>
          )}
        </form>

        <div className="mt-8 bg-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold text-gray-800 mb-3">What to Expect</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">•</span>
              <span>Tour our showroom and see multiple hot tub models</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">•</span>
              <span>
                Get expert advice on choosing the right spa for your needs
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">•</span>
              <span>
                Discuss installation, maintenance, and financing options
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">•</span>
              <span>
                No pressure — just helpful guidance and answers to your
                questions
              </span>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
