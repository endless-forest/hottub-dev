"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface CompareBarProps {
  compareList?: string[]; // optional for safety
}

export function CompareBar({ compareList = [] }: CompareBarProps) {
  // ✅ Safe fallback if undefined
  const show = compareList.length >= 2;
  const compareUrl = `/compare?ids=${compareList.join(",")}`;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 bg-blue-700 text-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-lg z-50"
        >
          <p className="text-center sm:text-left mb-2 sm:mb-0">
            {compareList.length} model
            {compareList.length > 1 ? "s" : ""} selected for comparison
          </p>

          <div className="flex justify-center sm:justify-end">
            <Link
              href={compareUrl}
              className="bg-white text-blue-700 px-5 py-2 rounded font-semibold hover:bg-gray-100 transition"
            >
              Compare Selected
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
