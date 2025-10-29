"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/Product";
import { getPublicUrl } from "@/lib/getPublicUrl";

export function ProductCard({ product }: { product: Product }) {
  const imageUrl = getPublicUrl(product.storage_path);

  return (
    <Link
      href={`/models/${product.id}`}
      className="group block bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all"
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
      <p className="text-gray-600 text-sm line-clamp-2 mb-2">{product.description}</p>
      <p className="text-blue-700 font-bold">${product.price.toLocaleString()}</p>
    </Link>
  );
}
