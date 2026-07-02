import { NextRequest, NextResponse } from "next/server";
import { submitWaitlistEmail } from "@/lib/waitlist";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, honeypot } = body;

    // 1. Honeypot check (simple spam bot protection)
    // If a bot fills out the hidden field, reject it silently or return a mock success
    if (honeypot && honeypot.trim() !== "") {
      console.warn(`[Waitlist Spam Blocked] Bot filled honeypot field with: ${honeypot}`);
      return NextResponse.json({ 
        success: true, 
        message: "You have been subscribed successfully." 
      });
    }

    // 2. Validate email presence and format
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // 3. Register waitlist signup
    const result = await submitWaitlistEmail(email.trim());

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      provider: result.provider,
    });
  } catch (error: any) {
    console.error("[Waitlist API Route Error]", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
