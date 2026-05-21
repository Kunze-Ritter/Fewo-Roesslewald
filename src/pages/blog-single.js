/**
 * Blog-Single `/reisefuehrer/:slug/`
 *
 * Magazin-kompakt: Full-Width-Hero mit überlappendem Titel-Block, dann
 * Zwei-Spalten — links die Prose-Spalte, rechts ein sticky-„Auf einen
 * Blick"-Aside mit Lesezeit/Datum, Highlights, Teilen-Buttons und einem
 * Buchen-CTA, der sich beim Scrollen mitnimmt.
 *
 * Schema.org `BlogPosting` + `BreadcrumbList` werden pro Render
 * dynamisch gesetzt.
 */
import {
  getBlogPost,
  getRelatedPosts,
  getBlogCategoryLabel,
} from "../data/blog.js";
import { SITE } from "../data/site.js";
import { renderBlocks } from "../components/content-blocks.js";
import { renderNotFound } from "./not-found.js";
import {
  escHtml as esc,
  headerMarkup,
  footerMarkup,
  skipLinkMarkup,
  setPageMeta,
  setCanonical,
  setPageSchema,
} from "../components/chrome.js";

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function renderHighlights(highlights = []) {
  if (highlights.length === 0) return "";
  return `
    <ul class="prose-aside__highlights">
      ${highlights.map((h) => `<li>${esc(h)}</li>`).join("")}
    </ul>
  `;
}

/**
 * Teilen-Buttons. Nutzen `Web Share API` als progressives Enhancement,
 * fallen aber auf direkte Mailto-/X-Links zurück, sodass Klicks immer
 * funktionieren — auch ohne JavaScript-Side-Effects.
 */
function renderShare(post) {
  const url = `${window.location.origin}/reisefuehrer/${post.slug}/`;
  const text = encodeURIComponent(post.title);
  const u = encodeURIComponent(url);
  return `
    <div class="prose-aside__share" aria-label="Artikel teilen">
      <button type="button" class="prose-aside__share-btn" data-share="${esc(url)}" data-share-title="${esc(post.title)}" aria-label="Teilen">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
        <span>Teilen</span>
      </button>
      <a class="prose-aside__share-btn" href="mailto:?subject=${text}&body=${u}" aria-label="Per E-Mail teilen">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>
        </svg>
        <span>E-Mail</span>
      </a>
    </div>
  `;
}

function renderRelated(currentSlug) {
  const related = getRelatedPosts(currentSlug, 3);
  if (related.length === 0) return "";
  /**
   * Identisches Card-Markup wie im Archive — der Unterschied liegt nur
   * im Container-Modifier (`.blog-grid` ohne `--magazine`), der das
   * Featured-Verhalten in der Related-Sektion deaktiviert. So bleibt
   * das Template (in WP: `loop-card.php`) wiederverwendbar.
   */
  const items = related
    .map(
      (p) => `
        <li class="blog-grid__item">
          <article class="blog-card">
            <a class="blog-card__media" href="/reisefuehrer/${esc(p.slug)}/" aria-labelledby="related-${esc(p.slug)}" data-motion-curtain>
              <img src="${esc(p.hero.src)}" alt="${esc(p.hero.alt)}" width="1600" height="1000" loading="lazy" decoding="async" />
              <span class="motion-curtain" aria-hidden="true"></span>
            </a>
            <div class="blog-card__body">
              <p class="blog-meta">
                <span class="blog-meta__cat">${esc(getBlogCategoryLabel(p.category))}</span>
                <span aria-hidden="true">·</span>
                <span>${esc(String(p.readMinutes))} Min. Lesezeit</span>
              </p>
              <h2 id="related-${esc(p.slug)}" class="blog-card__title">
                <a href="/reisefuehrer/${esc(p.slug)}/">${esc(p.title)}</a>
              </h2>
              <p class="blog-card__excerpt">${esc(p.excerpt)}</p>
              <a class="blog-card__cta home-link" href="/reisefuehrer/${esc(p.slug)}/">Artikel lesen →</a>
            </div>
          </article>
        </li>
      `,
    )
    .join("");
  return `
    <section class="blog-related" aria-labelledby="related-heading" data-etch-element="section">
      <div data-etch-element="container">
        <header class="home-section-head" data-motion-reveal>
          <p class="home-kicker">Weiterlesen</p>
          <h2 id="related-heading" class="home-h2">Auch interessant</h2>
        </header>
        <ul class="blog-grid" data-motion-curtain-group>${items}</ul>
      </div>
    </section>
  `;
}

/**
 * Bindet die `Web Share API` an den Teilen-Button. Wird nach jedem
 * Render aufgerufen.
 */
function attachShareHandler(root) {
  const btn = root.querySelector("[data-share]");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    const url = btn.getAttribute("data-share");
    const title = btn.getAttribute("data-share-title") ?? document.title;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* User-Abbruch ist erwartet, kein Error-Reporting nötig. */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      btn.querySelector("span").textContent = "Link kopiert";
      setTimeout(() => {
        btn.querySelector("span").textContent = "Teilen";
      }, 2000);
    } catch {
      window.prompt("Link kopieren:", url);
    }
  });
}

export function renderBlogSingle(root, { params }) {
  const post = getBlogPost(params.slug);
  if (!post) {
    renderNotFound(root, { path: window.location.pathname });
    return;
  }

  const canonical = `/reisefuehrer/${post.slug}/`;
  setPageMeta({
    title: `${post.title} — Reiseführer Rösslewald`,
    description: post.excerpt,
  });
  setCanonical(canonical);

  setPageSchema({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.hero.src,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Person", name: post.author?.name ?? "Familie Rösslewald" },
    publisher: {
      "@type": "Organization",
      name: "Ferienhaus am Rösslewald",
      logo: { "@type": "ImageObject", url: SITE.logo },
    },
    mainEntityOfPage: `${window.location.origin}${canonical}`,
  });

  root.innerHTML = `
    <div class="home">
      ${skipLinkMarkup()}
      ${headerMarkup()}

      <main id="main">
        <article class="prose-single">
          <header class="prose-hero" data-etch-element="section" data-motion-curtain>
            <img class="prose-hero__image" src="${esc(post.hero.src)}" alt="${esc(post.hero.alt)}" width="1920" height="1080" fetchpriority="high" decoding="async" />
            <span class="motion-curtain" aria-hidden="true"></span>
            <div class="prose-hero__overlay" data-etch-element="container" data-motion-intro>
              <nav class="prose-breadcrumbs" aria-label="Breadcrumb">
                <a href="/">Start</a>
                <span aria-hidden="true">›</span>
                <a href="/reisefuehrer/">Reiseführer</a>
                <span aria-hidden="true">›</span>
                <span aria-current="page">${esc(post.title)}</span>
              </nav>
              <p class="home-kicker prose-hero__kicker">${esc(getBlogCategoryLabel(post.category))}</p>
              <h1 class="prose-hero__title">${esc(post.title)}</h1>
              <p class="prose-hero__lead">${esc(post.excerpt)}</p>
            </div>
          </header>

          <div class="prose-body" data-etch-element="section">
            <div class="prose-body__inner" data-etch-element="container">
              <div class="prose">
                ${renderBlocks(post.content)}

                <p class="prose__signature">— ${esc(post.author?.name ?? "Ihre Gastgeber")}</p>
              </div>

              <aside class="prose-aside" aria-label="Auf einen Blick">
                <div class="prose-aside__inner">
                  <p class="prose-aside__meta">
                    <span>${esc(String(post.readMinutes))} Min. Lesezeit</span>
                    <span aria-hidden="true">·</span>
                    <time datetime="${esc(post.updatedAt ?? post.publishedAt)}">
                      ${esc(formatDate(post.updatedAt ?? post.publishedAt))}
                    </time>
                  </p>
                  <p class="prose-aside__kicker">Auf einen Blick</p>
                  ${renderHighlights(post.highlights)}
                  ${renderShare(post)}
                </div>
              </aside>
            </div>
          </div>

          ${renderRelated(post.slug)}
        </article>
      </main>

      ${footerMarkup()}
    </div>
  `;

  attachShareHandler(root);
}
