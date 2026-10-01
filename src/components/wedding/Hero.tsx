import { useParallax } from "@/hooks/use-parallax";
import { wedding, displayTitle } from "@/config/wedding";

export function Hero() {
  const p = useParallax();
  const names = wedding.coupleNames;

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[46vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 blur-[90px] animate-breathe"
        style={{
          background: "var(--glow-gold)",
          transform: `translate3d(calc(-50% + ${p.x * 18}px), calc(-50% + ${p.y * 14}px), 0)`,
        }}
        aria-hidden="true"
      />

      <p className="rise eyebrow relative" style={{ animationDelay: "0.4s" }}>
        {wedding.introMessage ?? "Two stories become one."}
      </p>

      <h1
        className="relative mt-10 flex flex-col items-center leading-[0.9]"
        style={{ transform: `translate3d(${p.x * -10}px, ${p.y * -8}px, 0)` }}
      >
        {names ? (
          <>
            <span
              className="rise text-gold-gradient text-[clamp(3.2rem,15vw,9rem)] font-light tracking-[0.02em] drop-shadow-[0_18px_40px_rgba(0,0,0,0.6)]"
              style={{ animationDelay: "1.4s", fontFamily: "var(--font-display)" }}
            >
              {names.first}
            </span>
            <span
              className="rise my-1 text-[clamp(2rem,7vw,4rem)] italic text-gold/70"
              style={{ animationDelay: "2.1s", fontFamily: "var(--font-display)" }}
              aria-hidden="true"
            >
              &amp;
            </span>
            <span
              className="rise text-gold-gradient text-[clamp(3.2rem,15vw,9rem)] font-light tracking-[0.02em] drop-shadow-[0_18px_40px_rgba(0,0,0,0.6)]"
              style={{ animationDelay: "2.6s", fontFamily: "var(--font-display)" }}
            >
              {names.second}
            </span>
          </>
        ) : (
          <span className="rise text-gold-gradient text-[clamp(2.4rem,9vw,5rem)] font-light">
            {displayTitle}
          </span>
        )}
      </h1>

      {wedding.dateLabel && (
        <p
          className="rise relative mt-12 text-sm uppercase tracking-[0.5em] text-ivory/75"
          style={{ animationDelay: "3.4s" }}
        >
          {wedding.dateLabel}
        </p>
      )}

      <span
        className="rise relative mt-6 block h-px w-24 bg-[var(--gradient-gold)] opacity-70"
        style={{ animationDelay: "3.8s" }}
        aria-hidden="true"
      />

      <div
        className="rise absolute bottom-10 flex flex-col items-center gap-3"
        style={{ animationDelay: "4.4s" }}
        aria-hidden="true"
      >
        <span className="eyebrow text-[0.55rem]">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-gold/70 to-transparent animate-scroll-hint" />
      </div>
    </section>
  );
}
