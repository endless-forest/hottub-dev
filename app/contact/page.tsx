"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { HotTubGuideChat } from "@/components/HotTubGuideChat";
import { getPublicUrl } from "@/lib/getPublicUrl";
import Image from "next/image";

interface ChatMessage {
  sender: "visitor" | "client";
  message: string;
}

export default function ContactPage() {
  const [sessionId] = useState(uuidv4());
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const leftImage = getPublicUrl("contact/contact-hero.jpg", "site-images");
  const rightImage = getPublicUrl("contact/contact-chat.jpg", "site-images");

  useEffect(() => {
    const channel = supabase
      .channel("contact_chats")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "contact_chats" },
        (payload: { new: ChatMessage }) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    // ✅ FIX: cleanup should not be async
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = input.trim();
    setMessages((prev) => [...prev, { sender: "visitor", message: msg }]);
    setInput("");

    await fetch("/api/sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg, session_id: sessionId }),
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <NavBar />

      <main className="flex-1 flex items-center justify-center px-6 py-[clamp(2rem,5vw,5rem)]">
        {/* ✅ Real four-column grid */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-10 items-stretch">
          {/* Left image */}
          <div className="hidden lg:block relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={leftImage}
              alt="Showroom exterior"
              fill
              sizes="25vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL="/placeholder-blur.jpg"
            />
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-800 mb-4 text-center">
                Get in Touch
              </h1>
              <p className="text-gray-700 text-center mb-8">
                We’re here to help you find your perfect hot tub. Whether you
                have a question, need advice, or want to book a visit, we’d love
                to hear from you.
              </p>

              <form className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 rounded-lg shadow-sm"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Live chat */}
          <div className="bg-white rounded-2xl shadow-lg flex flex-col justify-between p-6 border border-blue-100">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_0_3px_rgba(16,185,129,0.25)]"></span>
                </span>
                <h2 className="text-xl font-semibold text-blue-800">
                  Talk with a Representative
                </h2>
              </div>
              <p className="text-gray-600 text-center text-sm">
                Our team replies in real time during showroom hours.
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 py-4 px-2 scrollbar-thin scrollbar-thumb-blue-200">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg w-fit max-w-[80%] ${
                    m.sender === "visitor"
                      ? "bg-blue-700 text-white ml-auto"
                      : "bg-blue-50 text-gray-800 border border-blue-100"
                  }`}
                >
                  {m.message}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={sendMessage}
              className="border-t border-gray-200 bg-blue-50/40 p-3 flex gap-3 rounded-b-2xl backdrop-blur-md"
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                rows={2}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                style={{ maxHeight: "8rem" }}
              />
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg text-sm font-medium flex-shrink-0 transition shadow-sm"
              >
                Send
              </button>
            </form>
          </div>

          {/* Right image */}
          <div className="hidden lg:block relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={rightImage}
              alt="Customer service team"
              fill
              sizes="25vw"
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
