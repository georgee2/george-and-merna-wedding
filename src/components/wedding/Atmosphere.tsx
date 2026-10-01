import { useEffect, useRef } from "react";
import { useParallax } from "@/hooks/use-parallax";

type Particle = {
  x: number;
  y: number;
  r: number;
  a: number;
  tw: number;
  depth: number;
  vy: number;
  vx: number;
  gold: boolean;
};

/** Layered cinematic night sky: stars, drifting dust, glowing motes. */
export function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parallax = useParallax();
  const parallaxRef = useRef(parallax);
  parallaxRef.current = parallax;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles: Particle[] = [];

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.min(190, Math.round((w * h) / 9000));
      particles = Array.from({ length: density }, () => {
        const depth = Math.random();
        const gold = Math.random() > 0.78;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: (gold ? 1.1 : 0.5) + depth * 1.5,
          a: 0.15 + Math.random() * 0.6,
          tw: 0.0005 + Math.random() * 0.0025,
          depth,
          vy: -(0.02 + depth * 0.12),
          vx: (Math.random() - 0.5) * 0.06,
          gold,
        };
      });
    };

    build();
    window.addEventListener("resize", build);

    let raf = 0;
    let t = 0;
    const render = () => {
      t += 16;
      ctx.clearRect(0, 0, w, h);
      const px = parallaxRef.current.x;
      const py = parallaxRef.current.y;

      for (const p of particles) {
        if (!reduced) {
          p.y += p.vy;
          p.x += p.vx;
          if (p.y < -10) p.y = h + 10;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
        }
        const shift = 6 + p.depth * 26;
        const x = p.x - px * shift;
        const y = p.y - py * shift;
        const twinkle = reduced ? 1 : 0.65 + Math.sin(t * p.tw + p.x) * 0.35;
        const alpha = p.a * twinkle;

        if (p.gold) {
          const g = ctx.createRadialGradient(x, y, 0, x, y, p.r * 7);
          g.addColorStop(0, `rgba(238, 206, 148, ${alpha})`);
          g.addColorStop(1, "rgba(238, 206, 148, 0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, p.r * 7, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = p.gold
          ? `rgba(255, 234, 196, ${alpha})`
          : `rgba(222, 232, 255, ${alpha * 0.85})`;
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[var(--gradient-night)]" />
      <div
        className="absolute -left-[20%] top-[-10%] h-[70vmax] w-[70vmax] rounded-full opacity-70 blur-[120px]"
        style={{
          background: "var(--glow-deep)",
          transform: `translate3d(${parallax.x * -22}px, ${parallax.y * -18}px, 0)`,
        }}
      />
      <div
        className="absolute -right-[25%] top-[30%] h-[60vmax] w-[60vmax] rounded-full opacity-60 blur-[140px]"
        style={{
          background: "var(--glow-gold)",
          transform: `translate3d(${parallax.x * 30}px, ${parallax.y * 22}px, 0)`,
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-[var(--vignette)]" />
    </div>
  );
}
