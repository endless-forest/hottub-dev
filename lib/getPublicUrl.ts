import { supabase } from "@/lib/supabaseClient";

/**
 * Returns a valid public URL for a file in the "product-images" bucket.
 * Automatically strips any leading "product-images/" to avoid duplication.
 */
export function getPublicUrl(path?: string | null): string {
  if (!path) return "/placeholder.jpg";

  // remove accidental double prefix
  const cleanPath = path.replace(/^product-images\//, "");

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(cleanPath);

  return data?.publicUrl || "/placeholder.jpg";
}
