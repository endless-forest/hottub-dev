import { supabase } from "@/lib/supabaseClient";

export function getPublicUrl(
  path?: string | null,
  bucket: string = "product-images"
): string {
  if (!path) return "/placeholder.jpg";

  // Remove accidental prefix
  const cleanPath = path.replace(new RegExp(`^${bucket}/`), "");

  const { data } = supabase.storage.from(bucket).getPublicUrl(cleanPath);

  return data?.publicUrl || "/placeholder.jpg";
}
