"use client";

import Link from "next/link";

export function CompareBar({ ids }: { ids: string[] }) {
  if (!ids || ids.length < 2) return null;

  const href = `/compare?ids=${ids.join(",")}`;

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <Link
        href={href}
        className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-full shadow-lg"
      >
        Compare Selected ({ids.length})
      </Link>
    </div>
  );
}
