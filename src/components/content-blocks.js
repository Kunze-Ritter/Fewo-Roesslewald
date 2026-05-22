/**
 * Block-Content-Renderer.
 *
 * Spiegelt die Block-Typen aus `data/blog.js` und `data/activities.js`
 * in HTML. Bewusst klein und ohne Markdown-Parser: die Inhaltspflege
 * läuft später über WP/Etch — wir brauchen nur eine schmale Brücke,
 * um den Prototypen authentisch zu zeigen.
 *
 * Unterstützte Block-Typen:
 *  - heading   { level: 2|3, text }
 *  - paragraph { text }
 *  - image     { src, alt, caption? }
 *  - list      { items: string[] }            (ungeordnete Liste)
 *  - callout   { title?, text }               (Tipp-/Hinweis-Box)
 *  - quote     { text, attribution? }
 *  - steps     { title?, items: string[], footnote? } (nummerierte Anleitung)
 */
import { escHtml } from "./chrome.js";

function renderHeading(block) {
  const level = block.level === 3 ? 3 : 2;
  return `<h${level} class="prose__h${level}">${escHtml(block.text)}</h${level}>`;
}

function renderParagraph(block) {
  return `<p class="prose__p">${escHtml(block.text)}</p>`;
}

function renderImage(block) {
  const caption = block.caption
    ? `<figcaption class="prose__caption">${escHtml(block.caption)}</figcaption>`
    : "";
  return `
    <figure class="prose__figure" data-motion-curtain>
      <img class="prose__img" src="${escHtml(block.src)}" alt="${escHtml(block.alt ?? "")}" loading="lazy" decoding="async" />
      <span class="motion-curtain" aria-hidden="true"></span>
      ${caption}
    </figure>
  `;
}

function renderList(block) {
  const items = (block.items ?? [])
    .map((i) => `<li>${escHtml(i)}</li>`)
    .join("");
  return `<ul class="prose__list">${items}</ul>`;
}

function renderCallout(block) {
  const title = block.title
    ? `<p class="prose__callout-title">${escHtml(block.title)}</p>`
    : "";
  return `
    <aside class="prose__callout" role="note">
      ${title}
      <p class="prose__callout-text">${escHtml(block.text)}</p>
    </aside>
  `;
}

function renderQuote(block) {
  const attribution = block.attribution
    ? `<footer class="prose__quote-attribution">— ${escHtml(block.attribution)}</footer>`
    : "";
  return `
    <blockquote class="prose__quote">
      <p>${escHtml(block.text)}</p>
      ${attribution}
    </blockquote>
  `;
}

function renderSteps(block) {
  const items = (block.items ?? [])
    .map(
      (text) => `
      <li class="prose__steps-item">
        <span class="prose__steps-text">${escHtml(text)}</span>
      </li>
    `,
    )
    .join("");
  const title = block.title
    ? `<p class="prose__steps-title">${escHtml(block.title)}</p>`
    : "";
  const footnote = block.footnote
    ? `<p class="prose__steps-note">${escHtml(block.footnote)}</p>`
    : "";
  return `
    <section class="prose__steps">
      ${title}
      <ol class="prose__steps-list">${items}</ol>
      ${footnote}
    </section>
  `;
}

const RENDERERS = {
  heading: renderHeading,
  paragraph: renderParagraph,
  image: renderImage,
  list: renderList,
  callout: renderCallout,
  quote: renderQuote,
  steps: renderSteps,
};

/**
 * Rendert eine Block-Liste. Unbekannte Block-Typen werden stillschweigend
 * übersprungen — kein Fehler-Toast, weil sonst während der Inhaltspflege
 * unnötiges Rauschen entsteht.
 */
export function renderBlocks(blocks = []) {
  return blocks
    .map((b) => RENDERERS[b.type]?.(b) ?? "")
    .join("");
}
