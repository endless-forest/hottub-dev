"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export function HotTubGuideChat() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    if (pathname?.includes("/models/")) {
      setGreeting("Curious about this hot tub’s features or best uses?");
    } else if (pathname?.includes("/models")) {
      setGreeting("Looking for something with 5 seats or more?");
    } else if (pathname === "/compare") {
      setGreeting(
        "Would you like me to highlight key differences between these hot tubs?"
      );
    } else {
      setGreeting("");
    }
  }, [pathname]);

  if (!pathname?.includes("/models") && pathname !== "/compare") return null;

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-bubble"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-[99999] bg-blue-700 hover:bg-blue-800 text-white rounded-full p-4 shadow-xl focus:outline-none"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 right-0 left-0 md:right-6 md:left-auto md:w-[380px] h-[50vh] md:h-[40vh] bg-gradient-to-b from-blue-50 to-white border-t md:border border-gray-200 rounded-t-2xl md:rounded-2xl shadow-2xl z-[99999] overflow-hidden flex flex-col"
          >
            <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200 bg-white/70 backdrop-blur-sm">
              <h2 className="font-semibold text-blue-800 text-lg">
                Ask our AI Hot Tub Guide
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 text-sm text-gray-700">
              <div className="bg-blue-100 text-gray-800 p-3 rounded-lg inline-block max-w-[85%] shadow-sm">
                {greeting ||
                  "Hi there! How can I help you choose your perfect hot tub?"}
              </div>
            </div>

            <div className="border-t border-gray-200 bg-white/70 backdrop-blur-sm p-3">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask about models, sizes, or features..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Send
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
