import { supabase } from "./supabaseClient";

/**
 * Safely returns an optimized Supabase Storage image URL.
 * - Removes duplicate bucket prefixes
 * - Adds optional width/quality transforms
 * - Falls back to the standard public URL if transform unavailable
 */
export function getPublicUrl(
  path: string,
  bucket: string,
  opts?: { w?: number; q?: number }
): string {
  if (!path) return "";

  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!projectUrl) return "";

  // 🧹 Remove any accidental "bucket/" prefix (defensive)
  const cleanPath = path.replace(new RegExp(`^${bucket}/`), "");

  const projectRef = projectUrl.replace(/^https?:\/\//, "");
  const base = `https://${projectRef}/storage/v1/render/image/public/${bucket}/${cleanPath}`;

  const params = new URLSearchParams();
  if (opts?.w) params.set("width", opts.w.toString());
  if (opts?.q) params.set("quality", opts.q.toString());

  // Construct the optimized CDN URL
  const optimizedUrl = params.toString()
    ? `${base}?${params.toString()}`
    : base;

  // Fallback (for non-image or legacy buckets)
  const { data } = supabase.storage.from(bucket).getPublicUrl(cleanPath);
  return optimizedUrl || data.publicUrl;
}
