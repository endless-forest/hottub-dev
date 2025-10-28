"use client";

import Image from "next/image";
import Link from "next/link";
import { StarRating } from "./StarRating";

interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price?: string | null;
  price_range?: string;
  rating?: number | null;
  image_url: string;
}

export function ProductCard({
  product,
  isCompared,
  onToggleCompare,
}: {
  product: Product;
  isCompared: boolean;
  onToggleCompare: () => void;
}) {
  const displayPrice = product.price ?? product.price_range ?? "Call for price";

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
      <Link href={`/models/${product.id}`} className="block">
        <div className="relative overflow-hidden h-56">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
          </div>
          <div className="text-lg font-bold text-gray-900">{displayPrice}</div>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed my-3">{product.description}</p>

        <div className="flex items-center justify-between mt-4">
          <StarRating rating={product.rating ?? 0} />

          <label className="inline-flex items-center text-sm">
            <input
              type="checkbox"
              checked={isCompared}
              onChange={onToggleCompare}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Compare</span>
          </label>
        </div>
      </div>
    </div>
  );
}
