"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";

export function CompareBar() {
  const { compareList, clearAll } = useCompare();
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

          <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-end">
            <Link
              href={compareUrl}
              className="bg-white text-blue-700 px-5 py-2 rounded font-semibold hover:bg-gray-100 transition text-center"
            >
              Compare Selected
            </Link>
            <button
              onClick={clearAll}
              className="bg-transparent border border-white px-4 py-2 rounded font-semibold hover:bg-white hover:text-blue-700 transition text-center"
            >
              Clear All
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
