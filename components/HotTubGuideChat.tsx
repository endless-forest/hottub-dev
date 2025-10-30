"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function HotTubGuideChat() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // Initial greeting depending on route
  useEffect(() => {
    if (pathname?.includes("/models/")) {
      setMessages([
        { role: "assistant", content: "Curious about this hot tub’s features or best uses?" },
      ]);
    } else if (pathname === "/models") {
      setMessages([{ role: "assistant", content: "Looking for something with 5 seats or more?" }]);
    } else if (pathname === "/compare") {
      setMessages([{ role: "assistant", content: "Want me to highlight the key differences?" }]);
    } else {
      setMessages([{ role: "assistant", content: "Hi there! How can I help you choose your perfect hot tub?" }]);
    }
  }, [pathname]);

  // Send message to API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "user" as const, content: input },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (data.message) {
        setMessages((prev) => [...prev, data.message]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, I had trouble connecting. Please try again." },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!pathname?.includes("/models") && pathname !== "/compare") return null;

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-bubble"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-[9999] bg-blue-700 hover:bg-blue-800 text-white rounded-full p-4 shadow-lg"
            aria-label="Open AI Hot Tub Guide"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Slide-Up Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 right-0 left-0 md:right-6 md:left-auto md:w-[380px] h-[60vh] md:h-[50vh] bg-gradient-to-b from-blue-50 to-white border-t md:border border-gray-200 rounded-t-2xl md:rounded-2xl shadow-2xl z-[9999] flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200 bg-white/70 backdrop-blur-sm">
              <h2 className="font-semibold text-blue-800 text-lg">Ask our AI Hot Tub Guide</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 text-sm text-gray-700">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg max-w-[85%] shadow-sm ${
                    m.role === "assistant"
                      ? "bg-blue-100 text-gray-800 self-start"
                      : "bg-blue-700 text-white self-end ml-auto"
                  }`}
                >
                  {m.content}
                </div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="bg-blue-100 text-gray-700 p-3 rounded-lg inline-block shadow-sm animate-pulse">
                  <span className="flex items-center gap-2">
                    <span className="text-blue-700 font-medium">Thinking</span>
                    <span className="flex gap-1">
                      <span className="animate-bounce delay-75">.</span>
                      <span className="animate-bounce delay-150">.</span>
                      <span className="animate-bounce delay-300">.</span>
                    </span>
                  </span>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-gray-200 bg-white/70 backdrop-blur-sm p-3 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about models, sizes, or features..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  loading
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-700 hover:bg-blue-800 text-white"
                }`}
              >
                {loading ? "..." : "Send"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
