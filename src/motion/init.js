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

/** Selektor für Heading-Stack-Kinder, die einzeln animiert werden. */
const HEAD_PARTS_SELECTOR = [
  ".home-kicker",
  ".home-h1",
  ".home-h2",
  ".home-hero__title",
  ".home-hero__lead",
  ".home-hero__cta",
  ".home-lead",
  ".home-closing__title",
  ".home-about__copy .btn--outline",
].join(", ");

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getHeadParts(el) {
  return [...el.querySelectorAll(":scope > " + HEAD_PARTS_SELECTOR.split(", ").join(", :scope > "))];
}

function initHero(root) {
  const intro = root.querySelector(".home-hero__intro");
  if (intro) {
    const parts = getHeadParts(intro);
    if (parts.length >= 2) {
      animate(parts, REVEAL_HEAD, {
        duration: 0.95,
        delay: stagger(0.1, { start: 0.05 }),
        ease: EASE,
      });
    } else {
      animate(intro, REVEAL_Y, { duration: 0.7, ease: EASE });
    }
  }

  const media = root.querySelector("[data-motion-hero-media]");
  if (media) {
    animate(media, { opacity: [0, 1], y: [20, 0] }, { duration: 0.85, delay: 0.2, ease: EASE });

    const img = media.querySelector("img");
    if (img) {
      scroll(animate(img, { y: ["-4%", "4%"] }), {
        target: media,
        offset: ["start end", "end start"],
      });
    }
  }
}

/**
 * Scroll-gebundener Zoom: Element startet klein (CSS scale 0.88) und
 * fährt während es ins Viewport scrollt auf scale 1 — danach stabil.
 * Apple-Style Reveal, ideal für Video- oder Bild-Anker auf dunklem Grund.
 */
function initZoomScroll(root) {
  root.querySelectorAll("[data-motion-zoom-scroll]").forEach((el) => {
    const target = el.closest("section") || el;
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

    if (parts.length >= 2) {
      inView(
        el,
        () => {
          animate(parts, REVEAL_HEAD, {
            duration: 0.85,
            delay: stagger(0.09),
            ease: EASE,
          });
        },
        { amount: 0.25, margin: "0px 0px -8% 0px" },
      );
      return;
    }

    inView(
      el,
      () => {
        animate(el, REVEAL_Y, { duration: 0.6, ease: EASE });
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
        animate(items, REVEAL_Y, {
          duration: 0.5,
          delay: stagger(0.06),
          ease: EASE,
        });
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
        animate(el, REVEAL_SCALE, { duration: 0.65, ease: EASE });
      },
      { amount: 0.15 },
    );
  });
}

function initHeader(root) {
  const header = root.querySelector("[data-motion-header]");
  if (!header) return;
  animate(header, { opacity: [0, 1], y: [-6, 0] }, { duration: 0.45, ease: EASE });
}

export function initPageAnimations(root = document) {
  if (prefersReducedMotion()) {
    root
      .querySelectorAll(
        ".home-hero__intro > *, [data-motion-reveal], [data-motion-reveal] > *, [data-motion-stagger] > *, [data-motion-reveal-scale], [data-motion-hero-media], [data-motion-header], [data-motion-zoom-scroll]",
      )
      .forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
      });
    return;
  }

  initHeader(root);
  initHero(root);
  initReveal(root);
  initStagger(root);
  initRevealScale(root);
  initZoomScroll(root);
  initScrollTint();
}
