import Image from "next/image";

export default function About() {
  return (
    <section id="about-section" className="py-24 md:py-36 bg-luxury-ivory border-b border-luxury-obsidian/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Brand Statement Column */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center gap-3">
              <span className="h-[1px] w-8 bg-luxury-bronze" />
              <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-luxury-bronze">
                Our Philosophy
              </p>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-light text-luxury-obsidian leading-[1.2] tracking-tight">
              Curated for the <br />
              Discerning Collector
            </h2>

            {/* TODO: replace placeholder copy */}
            <div className="space-y-4 text-sm md:text-base text-luxury-obsidian/75 font-light leading-relaxed font-sans">
              <p>
                Nzele is born out of a simple conviction: that acquiring extraordinary art should be 
                an immersive, deeply personal experience. We select only the most compelling works 
                from emerging visionaries and established contemporary masters.
              </p>
              <p>
                Every piece in our catalog is fully vetted for provenance and artistic merit. We bridge 
                the gap between local studios and global collections, bringing museum-grade curations 
                directly to your private gallery space.
              </p>
              <p className="pt-2 text-xs uppercase tracking-widest font-medium text-luxury-obsidian">
                Global Shipping &amp; White-Glove Authentication
              </p>
            </div>

            <div className="pt-4">
              <a
                href="#waitlist-section"
                className="inline-flex items-center gap-3 group text-xs uppercase tracking-[0.2em] font-medium text-luxury-obsidian hover:text-luxury-bronze transition-colors duration-500"
              >
                Learn More About Access
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Asymmetric Image Column */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="editorial-image-container aspect-[4/5] md:aspect-[16/13] lg:aspect-[4/5] max-w-2xl ml-auto relative shadow-sm border border-luxury-obsidian/5">
              <Image
                src="/about-art.jpg"
                alt="Minimalist luxury art interior design with Nzele curation"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center"
              />
            </div>
            <div className="mt-2 text-right">
              <span className="text-[10px] uppercase tracking-widest text-luxury-obsidian/40 italic">
                Nzele Salon Showcase, Preview Edition
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
