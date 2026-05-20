/**
 * Vista-Slider — Cross-Fade-Carousel mit Motion.dev
 *
 * Übernimmt das API-Design von Motion+ <Carousel> (nextPage / prevPage /
 * gotoPage / currentPage / totalPages), aber als Vanilla-Vanilla-Komponente
 * ohne externe Carousel-Dependency. Nutzt nur `animate()` aus motion.
 *
 * Features:
 * - Auto-Advance mit Progress-Bar (animate({ scaleX: [0, 1] }) gesteuert)
 * - Pause on Hover / Focus-Within / document.visibilityState !== "visible"
 * - Touch-Swipe via Pointer-Events (links/rechts wischen)
 * - Keyboard: ← → Home End  +  Space/Enter auf Pause-Button
 * - A11y: ARIA Carousel Pattern (aria-roledescription, aria-live, tablist)
 * - prefers-reduced-motion: instant Swap, kein Autoplay
 *
 * Lifecycle:
 *   const slider = createVistaSlider(rootEl);
 *   slider.destroy();   // räumt alle Listener, Animationen, Timer ab
 */

import { animate, scroll } from "motion";

const EASE_FADE = [0.4, 0, 0.2, 1];
const EASE_OUT = [0.22, 1, 0.36, 1];

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function createVistaSlider(root) {
  if (!root || root.dataset.vistaSliderReady === "true") return null;

  const slides = [...root.querySelectorAll(".home-vista__slide")];
  const dots = [...root.querySelectorAll("[data-vista-goto]")];
  const prevBtn = root.querySelector("[data-vista-prev]");
  const nextBtn = root.querySelector("[data-vista-next]");
  const playPauseBtn = root.querySelector("[data-vista-playpause]");
  const progressEl = root.querySelector("[data-vista-progress]");
  const captionEl = root.querySelector(".home-vista__caption");

  const total = slides.length;
  if (total < 2) return null;

  const autoplayMs = Number(root.dataset.autoplayMs) || 5000;
  const reduceMotion = prefersReducedMotion();
  const fadeDur = reduceMotion ? 0.01 : 1.2;
  const captionDur = reduceMotion ? 0.01 : 0.7;

  let current = 0;
  let userPaused = false;
  let hoverPaused = false;
  let visibilityPaused = document.visibilityState !== "visible";

  // Aktive Animationen, damit wir sie beim Wechsel/Destroy stoppen können
  let progressAnim = null;
  const slideAnims = new Map();
  let parallaxCleanup = null;

  // ---------- Parallax — alle Slides gleichzeitig ----------
  // Ein einziger scroll()-Listener für alle Parallax-Divs. So haben
  // versteckte Slides immer die korrekte Position, bevor sie eingeblendet
  // werden → kein Positions-Sprung beim Slide-Wechsel.
  function initAllParallax() {
    if (reduceMotion) return;
    const inners = slides
      .map((s) => s.querySelector("[data-motion-parallax]"))
      .filter(Boolean);
    if (!inners.length) return;

    inners.forEach((el) => {
      el.style.willChange = "transform";
    });

    parallaxCleanup = scroll(
      animate(
        inners,
        { transform: ["translateY(-15%)", "translateY(15%)"] },
        { ease: "linear" },
      ),
      { target: root, offset: ["start end", "end start"] },
    );
  }

  // ---------- Slide-Transition (reines Cross-Fade) ----------
  function animateSlide(el, kind) {
    const prev = slideAnims.get(el);
    if (prev) prev.stop();

    if (reduceMotion) {
      el.style.opacity = kind === "enter" ? "1" : "0";
      el.style.visibility = kind === "enter" ? "visible" : "hidden";
      return;
    }

    if (kind === "enter") {
      el.classList.add("is-active");
      el.style.visibility = "visible";
      const a = animate(
        el,
        { opacity: [0, 1] },
        { duration: fadeDur, ease: EASE_FADE },
      );
      slideAnims.set(el, a);
      animateCaption(el);
    } else {
      const a = animate(
        el,
        { opacity: [1, 0] },
        { duration: fadeDur, ease: EASE_FADE },
      );
      slideAnims.set(el, a);
      a.finished
        .catch(() => {})
        .finally(() => {
          el.classList.remove("is-active");
          el.style.visibility = "hidden";
        });
    }
  }

  // Slide-Daten aus den `data-*`-Attributen der <li>-Elemente auslesen,
  // die wir beim Rendern eingebettet haben — kein zusätzliches JS-Array nötig.
  // Die Strings kommen aus den data-Attributen, die wir vom Server-Template mitgeben.
  // Alternativ: Dataset aus dem aria-label parsen.

  function getSlideData(slideEl) {
    return {
      season: slideEl.dataset.season || "",
      caption: slideEl.dataset.caption || "",
      location: slideEl.dataset.location || "",
    };
  }

  // Caption-Inhalt aktualisieren + Blur-Fade-Stagger-Animation (wie Heading-Reveal)
  function animateCaption(slideEl) {
    if (!captionEl) return;

    // Texte aktualisieren — aus data-Attributen des aktiven Slide
    const data = getSlideData(slideEl);
    const seasonEl = captionEl.querySelector(".home-vista__season");
    const labelEl = captionEl.querySelector(".home-vista__caption-label");
    const metaEl = captionEl.querySelector(".home-vista__caption-meta");
    if (seasonEl) seasonEl.textContent = data.season;
    if (labelEl) labelEl.textContent = data.caption;
    if (metaEl) metaEl.textContent = data.location;

    if (reduceMotion) return;

    const parts = [...captionEl.children];
    if (!parts.length) return;

    parts.forEach((p, i) => {
      animate(
        p,
        {
          opacity: [0, 1],
          transform: ["translateY(14px)", "translateY(0px)"],
          filter: ["blur(8px)", "blur(0px)"],
        },
        {
          duration: captionDur,
          delay: 0.15 + i * 0.08,
          ease: EASE_OUT,
        },
      );
    });
  }

  // ---------- Progress-Bar / Autoplay ----------
  function startProgress() {
    if (progressAnim) progressAnim.stop();
    if (!progressEl || reduceMotion) return;
    progressEl.style.transform = "scaleX(0)";

    progressAnim = animate(
      progressEl,
      { transform: ["scaleX(0)", "scaleX(1)"] },
      { duration: autoplayMs / 1000, ease: "linear" },
    );

    progressAnim.finished
      .then(() => {
        if (!isPaused()) gotoPage(current + 1);
      })
      .catch(() => {});
  }

  function pauseProgress() {
    if (progressAnim && progressAnim.pause) progressAnim.pause();
  }

  function resumeProgress() {
    if (!progressAnim || reduceMotion) {
      startProgress();
      return;
    }
    if (progressAnim.play) progressAnim.play();
  }

  function isPaused() {
    return userPaused || hoverPaused || visibilityPaused || reduceMotion;
  }

  function syncAutoplay() {
    if (isPaused()) {
      pauseProgress();
    } else {
      resumeProgress();
    }
  }

  // ---------- Pagination ----------
  function gotoPage(index) {
    const target = ((index % total) + total) % total;
    if (target === current) return;

    const prevSlide = slides[current];
    const nextSlide = slides[target];

    animateSlide(prevSlide, "exit");
    animateSlide(nextSlide, "enter");
    prevSlide.setAttribute("aria-hidden", "true");
    nextSlide.setAttribute("aria-hidden", "false");

    current = target;
    updateDots();

    if (!isPaused()) startProgress();
  }

  function nextPage() {
    gotoPage(current + 1);
  }
  function prevPage() {
    gotoPage(current - 1);
  }

  function updateDots() {
    dots.forEach((d, i) => {
      const active = i === current;
      d.classList.toggle("is-active", active);
      d.setAttribute("aria-selected", active ? "true" : "false");
      d.setAttribute("tabindex", active ? "0" : "-1");
    });
  }

  // ---------- Pause-Toggle ----------
  function setUserPaused(flag) {
    userPaused = flag;
    if (playPauseBtn) {
      playPauseBtn.setAttribute("aria-pressed", flag ? "true" : "false");
      playPauseBtn.setAttribute(
        "aria-label",
        flag ? "Auto-Wechsel starten" : "Auto-Wechsel pausieren",
      );
    }
    syncAutoplay();
  }

  // ---------- Event-Listener ----------
  const listeners = [];
  function on(el, ev, fn, opts) {
    if (!el) return;
    el.addEventListener(ev, fn, opts);
    listeners.push(() => el.removeEventListener(ev, fn, opts));
  }

  on(prevBtn, "click", prevPage);
  on(nextBtn, "click", nextPage);
  on(playPauseBtn, "click", () => setUserPaused(!userPaused));

  dots.forEach((dot) => {
    on(dot, "click", () => {
      const idx = Number(dot.dataset.vistaGoto);
      gotoPage(idx);
    });
  });

  // Hover-Pause (nur Pointer-Geräte)
  on(root, "pointerenter", (e) => {
    if (e.pointerType === "mouse") {
      hoverPaused = true;
      syncAutoplay();
    }
  });
  on(root, "pointerleave", (e) => {
    if (e.pointerType === "mouse") {
      hoverPaused = false;
      syncAutoplay();
    }
  });

  // Focus-Within Pause für Keyboard-Nutzer
  on(root, "focusin", () => {
    hoverPaused = true;
    syncAutoplay();
  });
  on(root, "focusout", (e) => {
    if (!root.contains(e.relatedTarget)) {
      hoverPaused = false;
      syncAutoplay();
    }
  });

  // Page-Visibility (Tab-Switch / Browser im Hintergrund)
  const onVis = () => {
    visibilityPaused = document.visibilityState !== "visible";
    syncAutoplay();
  };
  on(document, "visibilitychange", onVis);

  // Keyboard auf der Dot-Tablist (ARIA-Pattern: ← → Home End)
  const dotList = root.querySelector(".home-vista__dots");
  on(dotList, "keydown", (e) => {
    let target = null;
    switch (e.key) {
      case "ArrowLeft":
        target = (current - 1 + total) % total;
        break;
      case "ArrowRight":
        target = (current + 1) % total;
        break;
      case "Home":
        target = 0;
        break;
      case "End":
        target = total - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    gotoPage(target);
    dots[target] && dots[target].focus();
  });

  // Touch/Pointer-Swipe — links/rechts wischen
  let pointerDownX = 0;
  let pointerDownT = 0;
  let isSwiping = false;
  const SWIPE_MIN_PX = 50;
  const SWIPE_MAX_MS = 600;

  on(root, "pointerdown", (e) => {
    if (e.pointerType === "mouse") return;
    pointerDownX = e.clientX;
    pointerDownT = performance.now();
    isSwiping = true;
  });
  on(root, "pointerup", (e) => {
    if (!isSwiping) return;
    isSwiping = false;
    const dx = e.clientX - pointerDownX;
    const dt = performance.now() - pointerDownT;
    if (Math.abs(dx) >= SWIPE_MIN_PX && dt <= SWIPE_MAX_MS) {
      if (dx < 0) nextPage();
      else prevPage();
    }
  });
  on(root, "pointercancel", () => {
    isSwiping = false;
  });

  // Initial: erstes Slide ist aktiv, Caption animieren, Parallax + Autoplay starten
  updateDots();
  animateCaption(slides[0]);
  initAllParallax();
  syncAutoplay();

  root.dataset.vistaSliderReady = "true";

  return {
    nextPage,
    prevPage,
    gotoPage,
    pause: () => setUserPaused(true),
    play: () => setUserPaused(false),
    get currentPage() {
      return current;
    },
    get totalPages() {
      return total;
    },
    destroy() {
      listeners.forEach((off) => off());
      if (progressAnim) progressAnim.stop();
      slideAnims.forEach((a) => a.stop && a.stop());
      slideAnims.clear();
      if (parallaxCleanup) parallaxCleanup();
      delete root.dataset.vistaSliderReady;
    },
  };
}

export function initVistaSliders(root = document) {
  return [...root.querySelectorAll("[data-vista-slider]")]
    .map((el) => createVistaSlider(el))
    .filter(Boolean);
}
