/**
 * Seiten-Animationen — Motion (JS)
 * Heading-Reveal: opacity + y + blur, gestaffelt (Editorial-Feeling).
 * Body-Reveal: opacity + y (kürzer, ruhiger).
 * Performance: animiert primär `transform`, `opacity`, `filter` (Compositor).
 */
import { animate, inView, stagger, scroll } from "motion";

const EASE = [0.22, 1, 0.36, 1];

/** Kurzer Body-Reveal (Block-Container, Cards, Listen-Items). */
const REVEAL_Y = { opacity: [0, 1], y: [16, 0] };
const REVEAL_SCALE = { opacity: [0, 1], scale: [0.98, 1] };

/** Headline-Reveal: weicher Blur-Fade — "Editorial" Anmutung. */
const REVEAL_HEAD = {
  opacity: [0, 1],
  y: [18, 0],
  filter: ["blur(10px)", "blur(0px)"],
};

/**
 * Promoviert ein Element für die Dauer der Animation auf eine eigene
 * Compositor-Layer und gibt sie danach wieder frei. Verhindert "stale
 * will-change" — empfohlen von MotionScore.
 */
function promote(target, anim, prop = "transform") {
  const els = target instanceof Element ? [target] : [...target];
  els.forEach((el) => {
    el.style.willChange = prop;
  });
  anim.finished
    .catch(() => {})
    .finally(() => {
      els.forEach((el) => {
        el.style.willChange = "";
      });
    });
  return anim;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Heading-Stack-Kinder: alle direkten Kinder eines Reveal-Containers.
 * Bewusst klassenagnostisch — neue Headings/Buttons brauchen keine
 * Anpassung in JS oder CSS, das `> *`-Pattern in motion.css greift
 * automatisch. */
function getHeadParts(el) {
  return [...el.children];
}

function initHero(root) {
  const intro = root.querySelector("[data-motion-hero]");
  if (intro) {
    const parts = getHeadParts(intro);
    if (parts.length >= 1) {
      promote(
        parts,
        animate(parts, REVEAL_HEAD, {
          duration: 0.95,
          delay: stagger(0.1, { start: 0.05 }),
          ease: EASE,
        }),
        "transform, opacity, filter",
      );
    } else {
      promote(intro, animate(intro, REVEAL_Y, { duration: 0.7, ease: EASE }));
    }
  }

  /* Hero-Bild: Reveal kommt komplett vom Curtain (data-motion-curtain).
   * Der frühere Scroll-Parallax wäre mit dem Curtain-Scale auf demselben
   * <img>-Transform kollidiert, deshalb hier bewusst nichts. */
}

/**
 * Scroll-gebundener Zoom: Element startet klein (CSS scale 0.88) und
 * fährt während es ins Viewport scrollt auf scale 1 — danach stabil.
 * Apple-Style Reveal, ideal für Video- oder Bild-Anker auf dunklem Grund.
 */
function initZoomScroll(root) {
  root.querySelectorAll("[data-motion-zoom-scroll]").forEach((el) => {
    const target = el.closest("section") || el;
    /* will-change steht im CSS (siehe motion.css) — kein JS-Style-Write
     * im Init-Path, sonst forced reflow durch direkt folgende Lese-Calls
     * im <video-player> Custom-Element. */
    scroll(
      animate(el, { scale: [0.88, 1] }, { ease: "linear" }),
      {
        target,
        offset: ["start end", "center center"],
      },
    );
  });
}

/**
 * Scroll-Tint: Body-Hintergrund interpoliert beim Scrollen von Cream zu warmem Sand.
 * Sehr dezent — ankert die Seite und gibt Tiefe, ohne dass es "auffällt".
 */
function initScrollTint() {
  const html = document.documentElement;
  scroll(
    animate(
      html,
      { backgroundColor: ["#F7F5F1", "#F2EBE0", "#EDE4D5"] },
      { ease: "linear" },
    ),
    {
      target: document.body,
      offset: ["start start", "end end"],
    },
  );
}

function initReveal(root) {
  root.querySelectorAll("[data-motion-reveal]").forEach((el) => {
    const parts = getHeadParts(el);

    if (parts.length >= 1) {
      /* Container bleibt sichtbar — nur die Heading-Parts werden animiert.
       * Sonst läge die opacity-0 Container-Layer ÜBER den Parts und würde
       * sie unsichtbar machen (composited opacity ≈ 0). */
      el.style.opacity = "1";
      el.style.transform = "none";

      inView(
        el,
        () => {
          promote(
            parts,
            animate(parts, REVEAL_HEAD, {
              duration: 0.85,
              delay: stagger(0.09),
              ease: EASE,
            }),
            "transform, opacity, filter",
          );
        },
        { amount: 0.25, margin: "0px 0px -8% 0px" },
      );
      return;
    }

    inView(
      el,
      () => {
        promote(el, animate(el, REVEAL_Y, { duration: 0.6, ease: EASE }));
      },
      { amount: 0.2, margin: "0px 0px -10% 0px" },
    );
  });
}

function initStagger(root) {
  root.querySelectorAll("[data-motion-stagger]").forEach((container) => {
    const items = [...container.children];
    if (!items.length) return;

    inView(
      container,
      () => {
        promote(
          items,
          animate(items, REVEAL_Y, {
            duration: 0.5,
            delay: stagger(0.06),
            ease: EASE,
          }),
        );
      },
      { amount: 0.15, margin: "0px 0px -8% 0px" },
    );
  });
}

function initRevealScale(root) {
  root.querySelectorAll("[data-motion-reveal-scale]").forEach((el) => {
    inView(
      el,
      () => {
        promote(el, animate(el, REVEAL_SCALE, { duration: 0.65, ease: EASE }));
      },
      { amount: 0.15 },
    );
  });
}

/**
 * Curtain-Reveal für Bilder & Videos.
 * - Overlay (.motion-curtain-Span) wird von unten nach oben weggewischt.
 * - Bild/Video zoomt parallel von scale(1.12) auf scale(1) — Ken-Burns-Style.
 * - Geschwister-Items im selben Parent werden automatisch gestaffelt
 *   (stagger 0.18s) — einzelne Items animieren ohne Delay.
 */
function initCurtain(root) {
  const all = [...root.querySelectorAll("[data-motion-curtain]")];
  if (!all.length) return;

  /* Gruppierung für den Stagger:
   * 1. Bevorzugt: nächster Vorfahre mit [data-motion-curtain-group]
   *    (für Cases, wo Curtain-Items in verschachtelten Wrappern stecken,
   *    z.B. .home-journal__media in .home-journal__post in .home-journal).
   * 2. Fallback: direktes Eltern-Element (für flache Listen wie Galerie
   *    oder Umgebung). */
  const groups = new Map();
  for (const item of all) {
    const group =
      item.closest("[data-motion-curtain-group]") || item.parentElement;
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(item);
  }

  for (const items of groups.values()) {
    const trigger = items[0];
    const curtains = items
      .map((it) => it.querySelector(".motion-curtain"))
      .filter(Boolean);
    const media = items
      .map((it) => it.querySelector("img, video"))
      .filter(Boolean);
    if (!curtains.length || !media.length) continue;

    const single = items.length === 1;

    inView(
      trigger,
      () => {
        promote(
          curtains,
          animate(
            curtains,
            { transform: ["scaleY(1)", "scaleY(0)"] },
            {
              duration: 1.2,
              delay: single ? 0 : stagger(0.18),
              ease: [0.76, 0, 0.24, 1],
            },
          ),
          "transform",
        );
        promote(
          media,
          animate(
            media,
            { transform: ["scale(1.12)", "scale(1)"] },
            {
              duration: 1.6,
              delay: single ? 0 : stagger(0.18),
              ease: EASE,
            },
          ),
          "transform",
        );
      },
      { amount: 0.15, margin: "0px 0px -8% 0px" },
    );
  }
}

function initHeader(root) {
  const header = root.querySelector("[data-motion-header]");
  if (!header) return;
  promote(
    header,
    animate(header, { opacity: [0, 1], y: [-6, 0] }, { duration: 0.45, ease: EASE }),
  );
}

export function initPageAnimations(root = document) {
  if (prefersReducedMotion()) {
    root
      .querySelectorAll(
        "[data-motion-hero], [data-motion-hero] > *, [data-motion-reveal], [data-motion-reveal] > *, [data-motion-stagger] > *, [data-motion-reveal-scale], [data-motion-hero-media], [data-motion-header], [data-motion-zoom-scroll]",
      )
      .forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
      });

    /* Curtains entfernen, Bilder/Videos ohne Ken-Burns. */
    root.querySelectorAll(".motion-curtain").forEach((c) => {
      c.style.display = "none";
    });
    root
      .querySelectorAll("[data-motion-curtain] img, [data-motion-curtain] video")
      .forEach((m) => {
        m.style.transform = "scale(1)";
      });
    return;
  }

  initHeader(root);
  initHero(root);
  initReveal(root);
  initStagger(root);
  initRevealScale(root);
  initCurtain(root);
  initZoomScroll(root);
  initScrollTint();
}
