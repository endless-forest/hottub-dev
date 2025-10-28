"use client";

import Link from "next/link";
import { useCallback } from "react";
import type { Product } from "@/types/Product";

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
  const id = product.id?.toString();
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
