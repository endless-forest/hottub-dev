import Link from "next/link";

export function NavBar() {
  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow p-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl text-blue-700 hover:text-blue-800 transition">
        Santa Rosa Spas
      </Link>
      <div className="space-x-6">
        <Link href="/models" className="text-gray-700 hover:text-blue-700 transition font-medium">
          Models
        </Link>
        <Link href="/booking" className="text-gray-700 hover:text-blue-700 transition font-medium">
          Book Visit
        </Link>
        <Link href="/about" className="text-gray-700 hover:text-blue-700 transition font-medium">
          About
        </Link>
        <Link href="/contact" className="text-blue-600 hover:text-blue-800 transition font-semibold">
          Contact
        </Link>
      </div>
    </nav>
  );
}
