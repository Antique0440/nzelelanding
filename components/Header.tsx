"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToWaitlist = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("waitlist-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-luxury-ivory/90 backdrop-blur-md border-b border-luxury-obsidian/10 py-2 shadow-sm"
          : "bg-transparent border-b border-transparent py-2"
      }`}
    >
      <div className="max-w-full mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="relative block h-8 w-32 transition-opacity duration-300 hover:opacity-80">
          <Image
            src="/Nzele_logo_cropped.png"
            alt="Nzele Logo"
            fill
            sizes="128px"
            className="object-contain"
            priority
          />
        </a>

        {/* Navigation / CTA */}
        <nav>
          <a
            href="#waitlist-section"
            onClick={scrollToWaitlist}
            className="text-xs uppercase tracking-[0.2em] font-medium text-luxury-obsidian hover:text-luxury-bronze transition-colors duration-500 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-luxury-bronze after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-500"
          >
            Join the Waitlist
          </a>
        </nav>
      </div>
    </header>
  );
}
