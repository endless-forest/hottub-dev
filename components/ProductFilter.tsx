"use client";

import { Search, X } from "lucide-react";

interface FilterProps {
  searchTerm: string;
  selectedBrand: string;
  brands: string[];
  onSearchChange: (value: string) => void;
  onBrandChange: (value: string) => void;
  onClearFilters: () => void;
}

export function ProductFilter({
  searchTerm,
  selectedBrand,
  brands,
  onSearchChange,
  onBrandChange,
  onClearFilters,
}: FilterProps) {
  const hasActiveFilters = searchTerm || selectedBrand;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search models..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
        </div>

        <div className="md:w-64">
          <select
            value={selectedBrand}
            onChange={(e) => onBrandChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          >
            <option key="all-brands" value="">
              All Brands
            </option>
            {brands.map((brand, index) => (
              <option key={`brand-${index}-${brand}`} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClearFilters}
            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition"
          >
            Show All Models
          </button>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center justify-center px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition"
            >
              <X className="w-4 h-4 mr-2" />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
