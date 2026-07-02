import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-luxury-ivory border-t border-luxury-obsidian/10 py-16 md:py-20 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-between gap-10">
        
        <div className="relative h-16 w-64 opacity-60 hover:opacity-100 transition-opacity duration-500">
          <Image
            src="/Nzele_logo_cropped.png"
            alt="Nzele Logo Mark"
            fill
            sizes="256px"
            className="object-contain"
          />
        </div>

        {/* Minimal Social & Contact Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-[0.2em] font-medium text-luxury-obsidian/60 hover:text-luxury-bronze transition-colors duration-500"
          >
            Instagram
          </a>
          <a
            href="mailto:concierge@nzele.art"
            className="text-[10px] uppercase tracking-[0.2em] font-medium text-luxury-obsidian/60 hover:text-luxury-bronze transition-colors duration-500"
          >
            concierge@nzele.art
          </a>
          <a
            href="#"
            className="text-[10px] uppercase tracking-[0.2em] font-medium text-luxury-obsidian/60 hover:text-luxury-bronze transition-colors duration-500"
          >
            Privacy Policy
          </a>
        </div>

        {/* Copyright notice */}
        <div className="text-center space-y-2">
          <p className="text-[9px] uppercase tracking-[0.15em] text-luxury-obsidian/40 font-light font-sans">
            &copy; {currentYear} Nzele. All rights reserved.
          </p>
          <p className="text-[8px] uppercase tracking-[0.1em] text-luxury-obsidian/30 font-light font-sans">
            designed in Africa • shipping globally
          </p>
        </div>

      </div>
    </footer>
  );
}
