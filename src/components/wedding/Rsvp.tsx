import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";
import { wedding } from "@/config/wedding";

const field =
  "w-full border-0 border-b border-gold/30 bg-transparent px-0 py-3 text-ivory placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-0 transition-colors";

export function Rsvp() {
  const [sent, setSent] = useState(false);
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  if (!wedding.rsvp?.enabled) return null;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="relative px-6 py-28" aria-labelledby="rsvp-title">
      <Reveal className="glass-card mx-auto max-w-lg rounded-2xl px-8 py-12 sm:px-12">
        <p className="eyebrow text-center">Kindly reply</p>
        <h2 id="rsvp-title" className="mt-4 text-center text-[clamp(2rem,6vw,2.8rem)] text-ivory">
          Will you join us?
        </h2>
        {wedding.rsvp.deadlineLabel && (
          <p className="mt-3 text-center text-sm text-muted-foreground">{wedding.rsvp.deadlineLabel}</p>
        )}

        {sent ? (
          <p
            className="mt-12 text-center text-2xl italic text-gold animate-fade-in"
            style={{ fontFamily: "var(--font-display)" }}
            role="status"
          >
            {attending === "yes" ? "Thank you — we can't wait to celebrate with you." : "Thank you — you'll be missed."}
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-10 space-y-7">
            <label className="block">
              <span className="eyebrow text-[0.58rem]">Name</span>
              <input required name="name" autoComplete="name" className={field} placeholder="Your full name" />
            </label>

            <fieldset>
              <legend className="eyebrow text-[0.58rem]">Attendance</legend>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {(["yes", "no"] as const).map((v) => (
                  <button
                    type="button"
                    key={v}
                    aria-pressed={attending === v}
                    onClick={() => setAttending(v)}
                    className={`min-h-11 rounded-full border text-xs uppercase tracking-[0.25em] transition-all duration-500 ${
                      attending === v ? "border-gold bg-gold/10 text-gold" : "border-gold/25 text-muted-foreground"
                    }`}
                  >
                    {v === "yes" ? "Joyfully accept" : "Regretfully decline"}
                  </button>
                ))}
              </div>
            </fieldset>

            {attending === "yes" && (
              <label className="block">
                <span className="eyebrow text-[0.58rem]">Number of guests</span>
                <select name="guests" defaultValue="1" className={`${field} [&>option]:bg-popover`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </label>
            )}

            <label className="block">
              <span className="eyebrow text-[0.58rem]">Message</span>
              <textarea name="message" rows={3} className={`${field} resize-none`} placeholder="A note for the couple" />
            </label>

            <button
              type="submit"
              className="mt-4 min-h-12 w-full rounded-full bg-[var(--gradient-gold)] text-xs font-medium uppercase tracking-[0.35em] text-primary-foreground transition-shadow duration-500 hover:shadow-[var(--shadow-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Send reply
            </button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
