/* ═══════════════════════════════════════════════════════════════
   PIXEL-PERFECT RENDER — Static Script
   Parallax, starfield canvas, countdown, scroll reveals
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  // ── Wedding config ──
  const WEDDING_DATE = new Date("2026-11-10T17:00:00").getTime();

  // ── Reduced motion check ──
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ═══════════════════════════════════════
  // PARALLAX (pointer / device orientation)
  // ═══════════════════════════════════════
  const parallax = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };

  if (!prefersReducedMotion) {
    window.addEventListener("pointermove", function (e) {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });

    window.addEventListener("deviceorientation", function (e) {
      if (e.gamma == null || e.beta == null) return;
      target.x = Math.max(-1, Math.min(1, e.gamma / 35));
      target.y = Math.max(-1, Math.min(1, (e.beta - 45) / 35));
    }, true);
  }

  function updateParallax() {
    parallax.x += (target.x - parallax.x) * 0.06;
    parallax.y += (target.y - parallax.y) * 0.06;

    // Apply to atmosphere glows
    var glowDeep = document.getElementById("glow-deep");
    var glowGold = document.getElementById("glow-gold");
    var heroGlow = document.getElementById("hero-glow");
    var heroTitle = document.getElementById("hero-title");

    if (glowDeep) {
      glowDeep.style.transform = "translate3d(" + (parallax.x * -22) + "px, " + (parallax.y * -18) + "px, 0)";
    }
    if (glowGold) {
      glowGold.style.transform = "translate3d(" + (parallax.x * 30) + "px, " + (parallax.y * 22) + "px, 0)";
    }
    if (heroGlow) {
      heroGlow.style.transform =
        "translate3d(calc(-50% + " + (parallax.x * 18) + "px), calc(-50% + " + (parallax.y * 14) + "px), 0)";
    }
    if (heroTitle) {
      heroTitle.style.transform =
        "translate3d(" + (parallax.x * -10) + "px, " + (parallax.y * -8) + "px, 0)";
    }

    // Apply to location cards
    document.querySelectorAll(".location-card").forEach(function (card) {
      var depth = parseFloat(card.getAttribute("data-depth")) || 0;
      card.style.transform = "translate3d(" + (parallax.x * depth) + "px, " + (parallax.y * depth) + "px, 0)";
    });
  }

  // ═══════════════════════════════════════
  // STARFIELD CANVAS
  // ═══════════════════════════════════════
  var canvas = document.getElementById("starfield");
  var ctx = canvas ? canvas.getContext("2d") : null;
  var particles = [];
  var canvasW = 0, canvasH = 0;

  function buildParticles() {
    if (!canvas || !ctx) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvasW = window.innerWidth;
    canvasH = window.innerHeight;
    canvas.width = canvasW * dpr;
    canvas.height = canvasH * dpr;
    canvas.style.width = canvasW + "px";
    canvas.style.height = canvasH + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var density = Math.min(190, Math.round((canvasW * canvasH) / 9000));
    particles = [];
    for (var i = 0; i < density; i++) {
      var depth = Math.random();
      var gold = Math.random() > 0.78;
      particles.push({
        x: Math.random() * canvasW,
        y: Math.random() * canvasH,
        r: (gold ? 1.1 : 0.5) + depth * 1.5,
        a: 0.15 + Math.random() * 0.6,
        tw: 0.0005 + Math.random() * 0.0025,
        depth: depth,
        vy: -(0.02 + depth * 0.12),
        vx: (Math.random() - 0.5) * 0.06,
        gold: gold,
      });
    }
  }

  var frameT = 0;
  function renderStarfield() {
    if (!ctx) return;
    frameT += 16;
    ctx.clearRect(0, 0, canvasW, canvasH);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      if (!prefersReducedMotion) {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -10) p.y = canvasH + 10;
        if (p.x < -10) p.x = canvasW + 10;
        if (p.x > canvasW + 10) p.x = -10;
      }

      var shift = 6 + p.depth * 26;
      var x = p.x - parallax.x * shift;
      var y = p.y - parallax.y * shift;
      var twinkle = prefersReducedMotion ? 1 : 0.65 + Math.sin(frameT * p.tw + p.x) * 0.35;
      var alpha = p.a * twinkle;

      if (p.gold) {
        var g = ctx.createRadialGradient(x, y, 0, x, y, p.r * 7);
        g.addColorStop(0, "rgba(238, 206, 148, " + alpha + ")");
        g.addColorStop(1, "rgba(238, 206, 148, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, p.r * 7, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = p.gold
        ? "rgba(255, 234, 196, " + alpha + ")"
        : "rgba(222, 232, 255, " + (alpha * 0.85) + ")";
      ctx.beginPath();
      ctx.arc(x, y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  buildParticles();
  window.addEventListener("resize", buildParticles);

  // ═══════════════════════════════════════
  // COUNTDOWN
  // ═══════════════════════════════════════
  function updateCountdown() {
    var ms = Math.max(0, WEDDING_DATE - Date.now());
    var s = Math.floor(ms / 1000);
    var days = Math.floor(s / 86400);
    var hours = Math.floor((s % 86400) / 3600);
    var minutes = Math.floor((s % 3600) / 60);
    var seconds = s % 60;

    var dEl = document.getElementById("cd-days");
    var hEl = document.getElementById("cd-hours");
    var mEl = document.getElementById("cd-minutes");
    var sEl = document.getElementById("cd-seconds");

    if (dEl) dEl.textContent = String(days).padStart(3, "0");
    if (hEl) hEl.textContent = String(hours).padStart(2, "0");
    if (mEl) mEl.textContent = String(minutes).padStart(2, "0");
    if (sEl) sEl.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ═══════════════════════════════════════
  // SCROLL REVEAL (IntersectionObserver)
  // ═══════════════════════════════════════
  var revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    revealElements.forEach(function (el) {
      el.classList.add("revealed");
    });
  }

  // ═══════════════════════════════════════
  // ANIMATION LOOP
  // ═══════════════════════════════════════
  function loop() {
    if (!prefersReducedMotion) {
      updateParallax();
    }
    renderStarfield();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
