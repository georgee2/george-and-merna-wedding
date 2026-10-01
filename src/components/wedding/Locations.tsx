import { Reveal } from "./Reveal";
import { useParallax } from "@/hooks/use-parallax";
import { wedding, venueFallback } from "@/config/wedding";

type Place = { label: string; venue: string; time: string; mapsUrl?: string };

function Card({ place, depth }: { place: Place; depth: number }) {
  const p = useParallax();
  return (
    <article
      className="glass-card relative overflow-hidden rounded-2xl p-9 text-center"
      style={{ transform: `translate3d(${p.x * depth}px, ${p.y * depth}px, 0)` }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: "var(--glow-gold)" }}
      />
      <p className="eyebrow relative">{place.label}</p>
      <h3
        className="relative mt-5 text-[clamp(1.5rem,4vw,2.1rem)] text-ivory"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {place.venue || venueFallback}
      </h3>
      <p className="relative mt-3 text-sm tracking-[0.3em] text-gold/85">{place.time}</p>
      {place.mapsUrl && (
        <a
          href={place.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-gold/40 px-7 text-xs uppercase tracking-[0.3em] text-gold transition-all duration-500 hover:border-gold hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Open in Maps
        </a>
      )}
    </article>
  );
}

export function Locations() {
  const places = [wedding.ceremony, wedding.reception].filter(Boolean) as Place[];
  if (places.length === 0) return null;

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto grid max-w-4xl gap-7 md:grid-cols-2">
        {places.map((place, i) => (
          <Reveal key={place.label} delay={i * 180}>
            <Card place={place} depth={i === 0 ? 8 : 14} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
