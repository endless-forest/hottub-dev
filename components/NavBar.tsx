"use client";

import Link from "next/link";
import { useEffect } from "react";

export function NavBar() {
  // Enable smooth scrolling globally
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-xl font-bold text-blue-800 hover:text-blue-900">
          Santa Rosa Spas
        </Link>

        <div className="space-x-6 text-sm font-medium text-gray-700 hidden md:flex">
          <Link href="/#models" className="hover:text-blue-700 transition-colors">
            Models
          </Link>
          <Link href="/about" className="hover:text-blue-700 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-700 transition-colors">
            Contact
          </Link>
          <Link href="/book-visit" className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition">
            Book Visit
          </Link>
        </div>
      </div>
    </nav>
  );
}
