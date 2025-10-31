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
        {
          role: "assistant",
          content: "Curious about this hot tub’s features or best uses?",
        },
      ]);
    } else if (pathname === "/models") {
      setMessages([
        { role: "assistant", content: "Looking for something with 5 seats or more?" },
      ]);
    } else if (pathname === "/compare") {
      setMessages([
        { role: "assistant", content: "Want me to highlight the key differences?" },
      ]);
    } else {
      setMessages([
        {
          role: "assistant",
          content: "Hi there! How can I help you choose your perfect hot tub?",
        },
      ]);
    }
  }, [pathname]);

  // Send message to API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages: ChatMessage[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, route: pathname }),
      });
      const data = await res.json();
      if (data.message) {
        setMessages((prev) => [...prev, data.message]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I had trouble connecting. Please try again.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection error. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Only show on certain routes
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
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-4 right-4 md:right-6 md:w-[400px] h-[65vh] md:h-[55vh] bg-white/90 backdrop-blur-lg border border-blue-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-[9999] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-3 bg-gradient-to-r from-blue-700 to-sky-600 text-white shadow-sm">
              <h2 className="font-semibold text-lg">AI Hot Tub Guide</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/90 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 text-sm text-gray-700 scrollbar-thin scrollbar-thumb-blue-100">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.role === "assistant"
                      ? "bg-blue-50 text-gray-800 border border-blue-100"
                      : "bg-blue-700 text-white ml-auto shadow-md"
                  }`}
                >
                  {m.content}
                </motion.div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="bg-blue-100 text-gray-700 p-3 rounded-2xl inline-block shadow-sm animate-pulse">
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
              className="p-3 flex gap-2 border-t border-blue-100 bg-blue-50/40 backdrop-blur-md"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about models, sizes, or features..."
                className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm transition ${
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
