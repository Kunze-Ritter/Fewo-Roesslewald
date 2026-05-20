/**
 * Video.js v10 (@videojs/html) — Web Components, lokales MP4.
 * Etch: gleiches Markup + Script-Enqueue nach Skin-Import.
 */
import "@videojs/html/video/skin";

/**
 * Registriert Video.js-v10-Custom-Elements (Import oben).
 * @param {ParentNode} [root]
 */
export function initVideoPlayers(root = document) {
  root.querySelectorAll(".fewo-video-player").forEach((player) => {
    const video = player.querySelector("video");
    if (!video || video.dataset.fewoReady) return;
    video.dataset.fewoReady = "true";
    video.setAttribute("playsinline", "");
    video.setAttribute("preload", "metadata");
  });
}
