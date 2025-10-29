export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  brand?: string | null;
  image_url?: string | null;
  storage_path?: string | null;     // path in product-images bucket
  gallery_paths?: string[] | null;  // array of paths in product-images bucket
  rating?: number | null;
  seating_capacity?: number | null;
  jet_count?: number | null;
  color_options?: string | null;
  dimensions?: string | null;
  warranty_years?: number | null;
}
