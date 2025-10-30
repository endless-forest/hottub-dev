"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // ✅ Highlights parent section even for nested routes
  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  const linkClass = (path: string) =>
    `relative transition ${
      isActive(path)
        ? "text-blue-700 font-semibold after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-blue-700 after:rounded-full"
        : "text-gray-700 hover:text-blue-700"
    }`;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-800 hover:text-blue-900 transition"
          onClick={closeMenu}
        >
          Santa Rosa Spas
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 font-medium items-center">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/models" className={linkClass("/models")}>
            Hot Tubs
          </Link>
          <Link href="/book-visit" className={linkClass("/book-visit")}>
            Book Visit
          </Link>
          <Link href="/about" className={linkClass("/about")}>
            About
          </Link>
          <Link href="/contact" className={linkClass("/contact")}>
            Contact
          </Link>
          <Link href="/faq" className={linkClass("/faq")}>
            FAQ
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-blue-800 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col space-y-3 px-6 py-4 font-medium">
            <Link href="/" onClick={closeMenu} className={linkClass("/")}>
              Home
            </Link>
            <Link
              href="/models"
              onClick={closeMenu}
              className={linkClass("/models")}
            >
              Hot Tubs
            </Link>
            <Link
              href="/book-visit"
              onClick={closeMenu}
              className={linkClass("/book-visit")}
            >
              Book Visit
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className={linkClass("/about")}
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className={linkClass("/contact")}
            >
              Contact
            </Link>
            <Link href="/faq" onClick={closeMenu} className={linkClass("/faq")}>
              FAQ
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
