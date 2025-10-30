import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const data = await req.formData();
  const from = data.get("From");
  const body = data.get("Body");

  console.log(`📱 Reply from ${from}: ${body}`);

  // ✅ Insert into Supabase as a 'client' message
  await supabase.from("contact_chats").insert({
    sender: "client",
    message: body,
  });

  return new NextResponse("OK", { status: 200 });
}
