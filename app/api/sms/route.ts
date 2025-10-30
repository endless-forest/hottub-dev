import { NextResponse } from "next/server";
import twilio from "twilio";
import { createClient } from "@supabase/supabase-js";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { message, session_id } = await req.json();

    // ✅ Log message to Supabase
    await supabase.from("contact_chats").insert({
      sender: "visitor",
      message,
      session_id,
    });

    // ✅ Forward to client's phone
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: process.env.CLIENT_PHONE_NUMBER!,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SMS send error:", err);
    return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 });
  }
}
