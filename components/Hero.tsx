"use client";

import { useState } from "react";
import Image from "next/image";

export default function Hero() {
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
        setMessage(data.message || "Thank you. You've been added to the preview list.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Unable to connect. Please check your connection and try again.");
    }
  };

  const scrollToAbout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("about-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen min-h-[650px] w-full flex items-center justify-start overflow-hidden bg-luxury-obsidian">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Luxury Art Gallery Backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40 animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-obsidian/85 via-luxury-obsidian/60 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-16 flex flex-col justify-center h-full">
        <div className="max-w-2xl text-white space-y-6 md:space-y-8 animate-fade-in-up">
          {/* Logo Mark or Small Title */}
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-8 bg-luxury-bronze" />
            <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-luxury-bronze">
              Nzele Fine Art
            </p>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light leading-[1.1] tracking-normal">
            Where Extraordinary Art <br className="hidden sm:inline" />
            Finds Its Home
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base font-light text-neutral-300 font-sans leading-relaxed max-w-lg">
            {/* TODO: replace placeholder copy */}
            An online destination of quiet luxury. Connecting discerning collectors with singular, 
            exquisite works of art from emerging visionaries and modern masters. Launching Autumn 2026.
          </p>

          {/* Inline Waitlist Signup / Success State */}
          <div className="pt-2 max-w-md">
            {status === "success" ? (
              <div className="animate-fade-in py-3 text-luxury-bronze font-serif text-lg tracking-wide border-l border-luxury-bronze pl-4">
                {message}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Honeypot field (hidden from users) */}
                <input
                  type="text"
                  name="fullName"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="flex flex-col sm:flex-row items-stretch border-b border-white/20 focus-within:border-luxury-bronze transition-colors duration-500 py-1">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    className="flex-grow bg-transparent border-none text-white text-sm font-sans placeholder-white/40 focus:outline-none focus:ring-0 py-3 pr-4"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-transparent hover:bg-white text-white hover:text-luxury-obsidian border border-white sm:border-none uppercase tracking-[0.2em] text-[10px] font-medium transition-all duration-500 ease-in-out px-6 py-3 sm:py-0 whitespace-nowrap"
                  >
                    {status === "loading" ? "Registering..." : "Request Invite"}
                  </button>
                </div>

                {/* Error feedback */}
                {status === "error" && (
                  <p className="text-xs text-red-400 font-sans tracking-wider animate-fade-in">
                    {message}
                  </p>
                )}

                <p className="text-[10px] text-white/40 font-sans tracking-wide">
                  Members receive advance access to private viewings.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-6 md:left-12 flex items-center gap-3 text-white/40 animate-fade-in">
          <button 
            onClick={scrollToAbout}
            className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-medium hover:text-luxury-bronze transition-colors duration-500"
          >
            Explore Nzele
            <span className="inline-block transition-transform duration-500 group-hover:translate-y-1">
              ↓
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
