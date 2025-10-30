import OpenAI from "openai";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // use service key for server-side read access
);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // ✅ Fetch products from Supabase
    const { data: products } = await supabase
      .from("products")
      .select("name, description, seating_capacity, jet_count, price, brand");

    // Convert product data into a compact summary
    const productSummary = products
      ?.map(
        (p) =>
          `${p.name} (${p.brand}) — ${p.seating_capacity || "N/A"} seats, ${
            p.jet_count || "N/A"
          } jets. ${p.description || ""}`
      )
      .join("\n\n");

    // Create chat completion with product context
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: `You are the AI Hot Tub Guide for Santa Rosa Hot Tubs.
You answer questions about our product lineup using the data provided below.
Always ground your answers in this real data if relevant.

Here are the current hot tub models:
${productSummary}`,
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 400,
    });

    const message = completion.choices[0].message;
    return NextResponse.json({ message });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI response." },
      { status: 500 }
    );
  }
}
