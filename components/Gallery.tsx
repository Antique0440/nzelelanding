import Image from "next/image";

interface ArtworkPreview {
  id: string;
  artist: string;
  title: string;
  medium: string;
  year: string;
  dimensions: string;
  imageSrc: string;
}

const PREVIEW_ARTWORKS: ArtworkPreview[] = [
  {
    id: "art-1",
    artist: "Elena Rostova",
    title: "Silent Resonance",
    medium: "Bronze and Travertine Stone",
    year: "2026",
    dimensions: "45 x 32 x 30 cm",
    imageSrc: "/artwork1.jpg",
  },
  {
    id: "art-2",
    artist: "Marcello Vercetti",
    title: "Fragmented Earth",
    medium: "Textured Oil on Linen",
    year: "2025",
    dimensions: "120 x 100 cm",
    imageSrc: "/artwork2.jpg",
  },
  {
    id: "art-3",
    artist: "Aiko Tanaka",
    title: "Tension in Ink II",
    medium: "Charcoal & Wash on Washi Paper",
    year: "2026",
    dimensions: "75 x 55 cm",
    imageSrc: "/artwork3.jpg",
  },
  {
    id: "art-4",
    artist: "Christian Keller",
    title: "Structure and Illusion",
    medium: "Archival Pigment Print",
    year: "2025",
    dimensions: "90 x 90 cm",
    imageSrc: "/artwork4.jpg",
  },
];

export default function Gallery() {
  return (
    <section className="py-24 md:py-36 bg-luxury-ivory border-b border-luxury-obsidian/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Block */}
        <div className="space-y-4 mb-16 md:mb-24">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-8 bg-luxury-bronze" />
            <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-luxury-bronze">
              Acquisition Preview
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-luxury-obsidian leading-none tracking-tight">
              Pre-Launch Acquisitions
            </h2>
            <p className="text-xs uppercase tracking-widest text-luxury-obsidian/60 font-sans max-w-xs md:text-right">
              A private teaser of singular pieces releasing in our inaugural catalog.
            </p>
          </div>
        </div>

        {/* Artwork Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8 xl:gap-12">
          {PREVIEW_ARTWORKS.map((art) => (
            <div key={art.id} className="group space-y-4">
              {/* Image Container */}
              <div className="editorial-image-container aspect-[4/5] relative border border-luxury-obsidian/5 bg-neutral-200">
                <Image
                  src={art.imageSrc}
                  alt={`${art.title} by ${art.artist}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center"
                />
                
                {/* Coming Soon / Preview Overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-luxury-ivory/95 backdrop-blur-sm border border-luxury-obsidian/5 text-[8px] uppercase tracking-[0.2em] font-semibold text-luxury-obsidian px-2.5 py-1">
                    Preview
                  </span>
                </div>
              </div>

              {/* Artwork Metadata */}
              <div className="space-y-1.5 pt-1">
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-luxury-obsidian">
                  {art.artist}
                </p>
                <h3 className="text-sm font-serif font-medium text-luxury-obsidian/90 italic">
                  {art.title}
                </h3>
                <div className="flex justify-between text-[11px] text-luxury-obsidian/50 font-light font-sans">
                  <span>{art.medium}</span>
                  <span className="text-[10px] uppercase tracking-wider text-luxury-bronze font-normal">Coming Soon</span>
                </div>
                <div className="text-[10px] text-luxury-obsidian/45 font-light font-sans">
                  {art.dimensions} • {art.year}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
