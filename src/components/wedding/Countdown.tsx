import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { wedding } from "@/config/wedding";

function parts(ms: number) {
  const clamp = Math.max(0, ms);
  const s = Math.floor(clamp / 1000);
  return {
    DAYS: Math.floor(s / 86400),
    HOURS: Math.floor((s % 86400) / 3600),
    MINUTES: Math.floor((s % 3600) / 60),
    SECONDS: s % 60,
  };
}

export function Countdown() {
  const target = wedding.date ? new Date(wedding.date).getTime() : null;
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (!target) return;
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (!target) return null;
  const values = parts(now === null ? target - Date.now() : target - now);

  return (
    <section className="relative px-6 py-28" aria-label="Countdown to the wedding">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Counting the moments</p>
        <ul className="mt-12 flex items-stretch justify-center gap-0">
          {Object.entries(values).map(([label, value], i) => (
            <li
              key={label}
              className={`flex-1 px-2 sm:px-6 ${i > 0 ? "border-l border-gold/20" : ""}`}
            >
              <span
                className="block text-[clamp(2rem,8vw,4rem)] font-light tabular-nums text-ivory"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {String(value).padStart(2, "0")}
              </span>
              <span className="eyebrow mt-3 block text-[0.52rem] sm:text-[0.62rem]">{label}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
