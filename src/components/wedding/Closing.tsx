import { Reveal } from "./Reveal";
import { wedding, displayTitle } from "@/config/wedding";

export function Details() {
  const items = [wedding.dressCode, wedding.story].filter(Boolean) as { title: string; body: string }[];
  if (!items.length && !wedding.additionalMessage) return null;
  return (
    <section className="px-6 py-20 text-center">
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 150} className="mx-auto mb-12 max-w-md">
          <p className="eyebrow">{it.title}</p>
          <p className="mt-4 text-lg text-ivory/85" style={{ fontFamily: "var(--font-display)" }}>{it.body}</p>
        </Reveal>
      ))}
      {wedding.additionalMessage && (
        <Reveal className="mx-auto max-w-md">
          <p className="text-2xl italic text-gold/80" style={{ fontFamily: "var(--font-display)" }}>
            {wedding.additionalMessage}
          </p>
        </Reveal>
      )}
    </section>
  );
}

export function Closing() {
  const lines = wedding.closing?.lines ?? ["Here's to love,", "laughter,", "and everything that comes next."];
  return (
    <footer className="relative flex min-h-[90svh] flex-col items-center justify-center px-6 pb-16 text-center">
      {lines.map((l, i) => (
        <Reveal key={l} delay={i * 400}>
          <p className="text-[clamp(1.8rem,6vw,3.4rem)] font-light italic leading-tight text-ivory/90" style={{ fontFamily: "var(--font-display)" }}>
            {l}
          </p>
        </Reveal>
      ))}
      <Reveal delay={1500} className="mt-20 flex flex-col items-center">
        <span aria-hidden="true" className="relative mb-8 block h-2 w-2 rounded-full bg-gold-soft animate-breathe" style={{ boxShadow: "0 0 18px 6px color-mix(in oklab, var(--gold) 60%, transparent), 0 0 80px 30px color-mix(in oklab, var(--gold) 20%, transparent)" }} />
        <p className="text-gold-gradient text-[clamp(2rem,7vw,3.6rem)] font-light" style={{ fontFamily: "var(--font-display)" }}>
          {displayTitle}
        </p>
        {wedding.dateLabel && <p className="eyebrow mt-5">{wedding.dateLabel}</p>}
      </Reveal>
    </footer>
  );
}
