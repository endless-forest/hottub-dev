import { createClient } from "@supabase/supabase-js";

console.log("🔍 Supabase URL runtime value:", process.env.NEXT_PUBLIC_SUPABASE_URL);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables!");
  console.log("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl);
  console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", supabaseAnonKey ? "Set" : "Missing");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
