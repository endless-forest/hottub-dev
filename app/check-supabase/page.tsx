"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Check() {
  const [out, setOut] = useState("loading...");
  useEffect(() => {
    supabase.from("products").select("*").limit(1)
      .then(({ data, error }) => setOut(JSON.stringify(data ?? error, null, 2)));
  }, []);
  return <pre className="p-4 bg-gray-100 rounded">{out}</pre>;
}
