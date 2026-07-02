import fs from "fs";
import path from "path";

export interface WaitlistSubmissionResult {
  success: boolean;
  message: string;
  provider?: "mock" | "resend_audience" | "resend_email";
}

/**
 * Handles the registration of waitlist emails.
 * Abstracts the implementation so switching providers is straightforward.
 */
export async function submitWaitlistEmail(email: string): Promise<WaitlistSubmissionResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const isMock = process.env.NEXT_PUBLIC_MOCK_WAITLIST === "true" || !apiKey || apiKey === "re_mock_key";

  // 1. Mock Mode (Local Development / Testing)
  if (isMock) {
    try {
      const logDir = process.cwd();
      const logFilePath = path.join(logDir, "waitlist-signups.log");
      const timestamp = new Date().toISOString();
      const logEntry = `[${timestamp}] EMAIL: ${email}\n`;

      fs.appendFileSync(logFilePath, logEntry, "utf-8");

      console.log(`[Waitlist Mock] Registered: ${email} (written to ${logFilePath})`);
      return {
        success: true,
        message: "Successfully joined the waitlist (Mock Mode).",
        provider: "mock",
      };
    } catch (error) {
      console.error("[Waitlist Mock Error]", error);
      return {
        success: false,
        message: "Failed to record waitlist signup locally.",
      };
    }
  }

  // 2. Resend Production Mode
  if (!apiKey) {
    return {
      success: false,
      message: "Resend API key is missing. Please configure RESEND_API_KEY.",
    };
  }

  // A. Resend Audience API (Recommended default)
  if (audienceId) {
    try {
      const response = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "User-Agent": "nzele-art-landing/1.0",
        },
        body: JSON.stringify({
          email: email,
          unsubscribed: false,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || `HTTP error! status: ${response.status}`);
      }

      return {
        success: true,
        message: "Thank you for joining the Nzele waitlist.",
        provider: "resend_audience",
      };
    } catch (error: any) {
      console.error("[Resend Contacts Error]", error);
      return {
        success: false,
        message: error.message || "Failed to add email to waitlist audience.",
      };
    }
  }

  // B. Resend Email Notification Fallback (if Audience ID is not yet configured)
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "nzele-art-landing/1.0",
      },
      body: JSON.stringify({
        from: "Nzele Waitlist <onboarding@resend.dev>",
        to: "delivered@resend.dev", // Resend delivers to the account owner by default in sandbox/onboarding
        subject: "New Waitlist Registration",
        html: `<p>A new collector has joined the Nzele waitlist: <strong>${email}</strong></p>`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || `HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      message: "Thank you for joining the Nzele waitlist. Notification sent.",
      provider: "resend_email",
    };
  } catch (error: any) {
    console.error("[Resend Email Notification Error]", error);
    return {
      success: false,
      message: error.message || "Failed to send waitlist email notification.",
    };
  }
}
