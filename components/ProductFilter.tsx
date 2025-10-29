"use client";

interface ProductFilterProps {
  selectedBrand: string;
  brands: string[];
  onBrandChange: (brand: string) => void;
  onClearFilters: () => void;
}

export function ProductFilter({
  selectedBrand,
  brands,
  onBrandChange,
  onClearFilters,
}: ProductFilterProps) {
  // Include “All Models” pill even if no brands exist
  const brandList = ["All Models", ...brands.filter(Boolean)];

  return (
    <div className="mb-10">
      {/* Label + Clear */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Filter by Brand
        </h3>
        {selectedBrand && (
          <button
            onClick={onClearFilters}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-full transition"
          >
            Clear
          </button>
        )}
      </div>

      {/* Pills */}
      <div className="flex flex-wrap gap-2">
        {brandList.map((brand) => {
          const isAll = brand === "All Models";
          const isActive = isAll
            ? selectedBrand === ""
            : selectedBrand === brand;

          return (
            <button
              key={brand}
              onClick={() =>
                isAll ? onClearFilters() : onBrandChange(brand)
              }
              className={`px-4 py-2 text-sm rounded-full border transition-all ${
                isActive
                  ? "bg-blue-700 text-white border-blue-700"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
              }`}
            >
              {brand}
            </button>
          );
        })}
      </div>
    </div>
  );
}
