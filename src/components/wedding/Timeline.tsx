import { Reveal } from "./Reveal";
import { useReveal } from "@/hooks/use-reveal";
import { wedding } from "@/config/wedding";

type Event = { label: string; venue: string; time: string };

function Entry({ event, index }: { event: Event; index: number }) {
  const { ref, shown } = useReveal<HTMLLIElement>(0.5);
  return (
    <li ref={ref} className="relative pl-14 pb-20 last:pb-0">
      <span
        aria-hidden="true"
        className={`absolute left-[14px] top-2 h-3 w-3 -translate-x-1/2 rounded-full transition-all duration-700 ${
          shown ? "scale-125 bg-gold" : "scale-100 bg-muted"
        }`}
        style={{ boxShadow: shown ? "var(--shadow-gold)" : "none" }}
      />
      <div
        className={`transition-all duration-1000 ${shown ? "opacity-100 blur-0" : "opacity-35 blur-[3px]"}`}
        style={{ transitionDelay: `${index * 120}ms` }}
      >
        <p className="eyebrow">{event.label}</p>
        <p
          className="mt-3 text-[clamp(1.8rem,5vw,2.8rem)] font-light text-ivory"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {event.time}
        </p>
        <p className="mt-2 text-sm tracking-wide text-muted-foreground">{event.venue}</p>
      </div>
    </li>
  );
}

export function Timeline() {
  const events = [wedding.ceremony, wedding.reception].filter(Boolean) as Event[];
  if (events.length === 0) return null;

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-xl">
        <Reveal className="text-center">
          <p className="eyebrow">The evening</p>
          <h2 className="mt-5 text-[clamp(2rem,6vw,3rem)] text-ivory">How the day unfolds</h2>
        </Reveal>

        <div className="relative mt-16">
          <span
            aria-hidden="true"
            className="absolute left-[14px] top-2 bottom-2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/60 to-transparent"
            style={{ boxShadow: "0 0 24px color-mix(in oklab, var(--gold) 45%, transparent)" }}
          />
          <ol>
            {events.map((e, i) => (
              <Entry key={e.label} event={e} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
