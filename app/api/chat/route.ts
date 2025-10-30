import OpenAI from "openai";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { messages, route } = await req.json();

    // ✅ Fetch product data
    const { data: products } = await supabase
      .from("products")
      .select("name, description, seating_capacity, jet_count, price, brand");

    const productSummary = products
      ?.map(
        (p) =>
          `${p.name} (${p.brand}) — ${p.seating_capacity || "?"} seats, ${
            p.jet_count || "?"
          } jets. ${p.description || ""}`
      )
      .join("\n\n");

    // ✅ Generate AI reply
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: `You are the AI Hot Tub Guide for Santa Rosa Hot Tubs.
You answer questions using the real product data below.

Product Data:
${productSummary}`,
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 400,
    });

    const message = completion.choices[0].message;

    // ✅ Extract last user message for logging
    const userMsg = messages[messages.length - 1]?.content || "";

    // ✅ Save to Supabase chat_logs
    await supabase.from("chat_logs").insert({
      user_message: userMsg,
      ai_response: message?.content || "",
      route: route || "unknown",
    });

    return NextResponse.json({ message });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI response." },
      { status: 500 }
    );
  }
}
