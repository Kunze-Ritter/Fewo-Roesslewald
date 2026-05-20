/**
 * Lazy-Mount für <video-player> (Video.js v10 / @videojs/html).
 *
 * Statt das Custom-Element direkt im DOM zu rendern (was beim Page-Mount
 * 10 forced reflows durch interne `anchor-name`-Writes + `offsetTop`-Reads
 * im Player-Skin auslöst — vom MotionScore-CLI als "Mount Thrashing"
 * gemeldet), bleibt zunächst nur ein Bild-Placeholder im DOM.
 *
 * Sobald der Container in die Nähe des Viewports kommt (rootMargin 300px),
 * werden Skin-Module dynamisch geladen und das Custom-Element in einem
 * separaten Frame eingefügt — Reflows passieren also außerhalb des
 * kritischen Mount-Pfads.
 */
export function initVideoPlayers(root = document) {
  const placeholders = root.querySelectorAll("[data-video-lazy]");
  if (!placeholders.length) return;

  let skinPromise = null;
  const loadSkin = () => {
    if (!skinPromise) {
      skinPromise = import("@videojs/html/video/skin");
    }
    return skinPromise;
  };

  const mount = async (el) => {
    if (el.dataset.videoReady === "true") return;
    el.dataset.videoReady = "true";

    const src = el.dataset.videoSrc || "";
    const poster = el.dataset.videoPoster || "";
    const title = el.dataset.videoTitle || "";

    await loadSkin();

    /* Render in eigenem Frame, damit der vidstack-Mount nicht im
     * IntersectionObserver-Callback liegt (read-after-write entkoppelt). */
    requestAnimationFrame(() => {
      const player = document.createElement("video-player");
      player.className = "fewo-video-player";
      player.innerHTML = `
        <video-skin>
          <img slot="poster" src="${poster}" alt="Vorschaubild: ${title}" width="1200" height="675" />
          <video src="${src}" title="${title}" playsinline preload="metadata"></video>
        </video-skin>
      `;

      const placeholderImg = el.querySelector(".video-player-wrap__placeholder");
      if (placeholderImg) placeholderImg.remove();
      el.appendChild(player);
    });
  };

  if (typeof IntersectionObserver === "undefined") {
    placeholders.forEach((el) => mount(el));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        mount(entry.target);
      });
    },
    { rootMargin: "300px 0px" },
  );

  placeholders.forEach((el) => io.observe(el));
}
