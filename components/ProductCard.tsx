"use client";

import Link from "next/link";
import { useCallback } from "react";
import type { Product } from "@/types/Product"; // ✅ shared type import

interface ProductCardProps {
  product: Product;
  compareList?: string[];
  setCompareList?: React.Dispatch<React.SetStateAction<string[]>>;
}

export function ProductCard({
  product,
  compareList = [],
  setCompareList,
}: ProductCardProps) {
  const id = product.id?.toString(); // ensure it's a string
  const isCompared = compareList.includes(id);

  const toggleCompare = useCallback(() => {
    if (!setCompareList) return;
    if (isCompared) {
      setCompareList(compareList.filter((pid) => pid !== id));
    } else {
      setCompareList([...compareList, id]);
    }
  }, [compareList, isCompared, id, setCompareList]);

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 p-4 flex flex-col justify-between">
      {/* clickable image + title */}
      <Link href={`/models/${id}`} className="block group">
        <div className="overflow-hidden rounded-md">
          <img
            src={product.image_url || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <h3 className="text-lg font-semibold mt-3 text-gray-800 group-hover:text-blue-700 transition-colors">
          {product.name}
        </h3>
      </Link>

      <p className="text-gray-600 text-sm flex-grow mt-1">{product.description}</p>

      <div className="mt-3 text-blue-700 font-bold text-lg">
        ${product.price.toLocaleString()}
      </div>

      {product.rating !== undefined && (
        <div className="flex mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill={i < Math.round(product.rating!) ? "gold" : "#e5e7eb"}
              className="w-4 h-4"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.2 3.692a1 1 0 00.95.69h3.884c.969 0 1.371 1.24.588 1.81l-3.14 2.28a1 1 0 00-.364 1.118l1.2 3.692c.3.921-.755 1.688-1.54 1.118l-3.14-2.28a1 1 0 00-1.176 0l-3.14 2.28c-.785.57-1.84-.197-1.54-1.118l1.2-3.692a1 1 0 00-.364-1.118L2.427 9.12c-.783-.57-.38-1.81.588-1.81h3.884a1 1 0 00.95-.69l1.2-3.692z" />
            </svg>
          ))}
        </div>
      )}

      <label className="flex items-center mt-3 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={isCompared}
          onChange={toggleCompare}
          className="mr-2 accent-blue-600"
        />
        Compare
      </label>
    </div>
  );
}
