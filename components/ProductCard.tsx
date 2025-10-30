"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/Product";
import { getPublicUrl } from "@/lib/getPublicUrl";
import { useCompare } from "@/context/CompareContext";

export function ProductCard({ product }: { product: Product }) {
  const imageUrl = getPublicUrl(product.storage_path);
  const { toggleCompare, isCompared } = useCompare();

  const isChecked = isCompared(product.id.toString());

  return (
    <div className="group bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all">
      {/* Card clickable section */}
      <Link
        href={`/models/${product.id}`}
        className="block"
      >
        <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden mb-3">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-2 mb-2">
          {product.description}
        </p>

        <p className="text-blue-700 font-bold mb-3">
          ${product.price.toLocaleString()}
        </p>
      </Link>

      {/* ✅ Compare Checkbox */}
      <div className="flex items-center justify-center mt-1">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => toggleCompare(product.id.toString())}
            className="w-4 h-4 text-blue-700 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-0"
          />
          <span className={`${isChecked ? "text-blue-700 font-medium" : ""}`}>
            {isChecked ? "Added to Compare" : "Compare"}
          </span>
        </label>
      </div>
    </div>
  );
}
