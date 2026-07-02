"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, honeypot }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "You're on the list.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "An error occurred. Please check and try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Unable to connect. Please check your connection and try again.");
    }
  };

  return (
    <section id="waitlist-section" className="py-28 md:py-40 bg-luxury-ivory scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6 text-center space-y-8 md:space-y-10">
        
        {/* Header Block */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 justify-center">
            <span className="h-[1px] w-8 bg-luxury-bronze" />
            <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-luxury-bronze">
              Membership
            </p>
            <span className="h-[1px] w-8 bg-luxury-bronze" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-light text-luxury-obsidian tracking-tight">
            Be First to Collect
          </h2>
          
          <p className="text-sm text-luxury-obsidian/70 font-light max-w-md mx-auto leading-relaxed">
            Register your email to receive private catalog previews, collector profiles, and exclusive early access to acquisitions.
          </p>
        </div>

        {/* Signup Form Container */}
        <div className="max-w-md mx-auto pt-4">
          {status === "success" ? (
            <div className="animate-fade-in py-8 px-6 bg-white border border-luxury-obsidian/5 shadow-sm space-y-2">
              <p className="text-luxury-bronze font-serif text-xl tracking-wide">
                {message}
              </p>
              <p className="text-xs text-luxury-obsidian/60 font-sans">
                A private invitation with launch details will be delivered to your inbox soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field (hidden from users) */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="flex-grow bg-white border border-luxury-obsidian/10 focus:border-luxury-bronze focus:ring-1 focus:ring-luxury-bronze/20 text-luxury-obsidian text-sm font-sans placeholder-luxury-obsidian/45 px-5 py-3.5 focus:outline-none transition-all duration-500 rounded-none"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-luxury-obsidian hover:bg-luxury-bronze text-white hover:text-white uppercase tracking-[0.2em] text-[10px] font-semibold transition-all duration-500 ease-in-out px-8 py-4 sm:py-0 whitespace-nowrap rounded-none"
                >
                  {status === "loading" ? "Registering..." : "Join Waitlist"}
                </button>
              </div>

              {/* Error feedback */}
              {status === "error" && (
                <p className="text-xs text-red-500 font-sans tracking-wider animate-fade-in text-left">
                  {message}
                </p>
              )}

              <p className="text-[11px] text-luxury-obsidian/40 font-sans tracking-wide">
                We will only email you about launch events. No spam, ever.
              </p>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
