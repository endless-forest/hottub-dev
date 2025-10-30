"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { Layout } from "@/components/Layout";

interface ChatMessage {
  sender: "visitor" | "client";
  message: string;
}

export default function ContactPage() {
  // ----- Chat State -----
  const [sessionId] = useState(uuidv4());
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  // ----- Subscribe to new messages -----
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

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ----- Send message -----
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
    <Layout>
      {/* ======= Hero Section ======= */}
      <section className="bg-gradient-to-b from-blue-700 to-blue-500 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
          We’re here to help you find your perfect hot tub. Whether you have a
          question, need advice, or want to book a visit, we’d love to hear from you.
        </p>
      </section>

      {/* ======= Main Contact & Chat Sections ======= */}
      <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-20">
          {/* ======= Contact Form ======= */}
          <div>
            <h2 className="text-3xl font-semibold text-blue-800 mb-4 text-center">
              Send Us a Message
            </h2>
            <p className="text-gray-700 text-center mb-8 max-w-2xl mx-auto">
              Fill out the form below and our team will get back to you as soon as possible.
            </p>

            <form className="bg-white rounded-xl shadow-md p-6 space-y-4 max-w-lg mx-auto">
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
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 rounded-lg"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* ======= Live Chat Section ======= */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center flex items-center justify-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Talk Directly with a Representative
            </h2>
            <p className="text-gray-700 text-center mb-6">
              Prefer to chat? Type below to start a live text conversation with our team.
            </p>

            <div className="bg-white rounded-xl shadow-md p-4 max-w-lg mx-auto flex flex-col">
              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-3 h-64 border border-gray-100 rounded-lg p-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-lg max-w-[80%] ${
                      m.sender === "visitor"
                        ? "bg-blue-700 text-white ml-auto"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {m.message}
                  </div>
                ))}
              </div>

              {/* Chat input */}
              <form onSubmit={sendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
