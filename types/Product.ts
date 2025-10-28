export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  rating?: number;
  seating_capacity?: number | string;
  jet_count?: number | string;
  color_options?: string;
  dimensions?: string;
  warranty_years?: number | string;
  brand?: string;
}
