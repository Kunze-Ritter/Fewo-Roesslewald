/**
 * Blog-Archiv `/reisefuehrer/`
 *
 * Magazin-Layout: 1 Featured + 6er-Grid + numerische Pagination.
 * Kategorie-Filter über URL-State (`?cat=wandern`) — pflegt SEO-saubere
 * URLs und Browser-Back funktioniert wie erwartet, weil der Router den
 * Re-Render auslöst.
 *
 * Wenn keine `featured`-Markierung vorhanden ist, fällt der erste
 * Post auf der ersten Seite automatisch in den Featured-Slot. Auf
 * Folgeseiten zeigen wir keinen Featured-Slot — sonst hätte jeder
 * mittlere Post ein verzerrtes Gewicht.
 */
import {
  BLOG_POSTS,
  BLOG_CATEGORIES,
  BLOG_INDEX,
  getBlogCategoryLabel,
} from "../data/blog.js";
import {
  escHtml as esc,
  headerMarkup,
  footerMarkup,
  skipLinkMarkup,
  setPageMeta,
  setCanonical,
  setPageSchema,
} from "../components/chrome.js";

const PER_PAGE = 6;

function readUrlState() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat") ?? null;
  const page = Math.max(1, Number.parseInt(params.get("page") ?? "1", 10) || 1);
  return { cat, page };
}

function buildUrl({ cat, page }) {
  const params = new URLSearchParams();
  if (cat) params.set("cat", cat);
  if (page > 1) params.set("page", String(page));
  const q = params.toString();
  return q ? `/reisefuehrer/?${q}` : "/reisefuehrer/";
}

function filterPosts(allPosts, cat) {
  if (!cat) return allPosts;
  return allPosts.filter((p) => p.category === cat);
}

/**
 * Picks Featured-Post für die aktuelle Seite:
 *   - Seite 1 + `featured: true` vorhanden → diesen Post
 *   - Seite 1 ohne Featured-Flag → den ersten Post
 *   - Folgeseiten → kein Featured
 */
function pickFeatured(filtered, page) {
  if (page !== 1) return null;
  return filtered.find((p) => p.featured) ?? filtered[0] ?? null;
}

function paginate(items, page, perPage) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  return {
    pageItems: items.slice(start, start + perPage),
    totalPages,
    page: safePage,
  };
}

function renderPills(activeCat) {
  const all = `
    <a class="blog-pills__item${!activeCat ? " is-active" : ""}"
       href="${esc(buildUrl({ cat: null, page: 1 }))}"
       ${!activeCat ? 'aria-current="page"' : ""}>
      Alle
    </a>`;
  const items = BLOG_CATEGORIES.map(
    (c) => `
      <a class="blog-pills__item${activeCat === c.slug ? " is-active" : ""}"
         href="${esc(buildUrl({ cat: c.slug, page: 1 }))}"
         ${activeCat === c.slug ? 'aria-current="page"' : ""}>
        ${esc(c.label)}
      </a>
    `,
  ).join("");
  return `${all}${items}`;
}

function renderFeatured(post) {
  if (!post) return "";
  /**
   * Bewusst kein `data-motion-reveal` auf der Karte — sonst staggern
   * Media und Body asynchron während der Curtain noch läuft, und der
   * Body schiebt sich später nach oben als das Bild auftaucht. Wie bei
   * den Apartment-Cards genügt das Curtain auf der Media, der Body
   * daneben ist von Anfang an stehen.
   */
  return `
    <article class="blog-featured">
      <a class="blog-featured__media" href="/reisefuehrer/${esc(post.slug)}/" aria-labelledby="featured-${esc(post.slug)}" data-motion-curtain>
        <img src="${esc(post.hero.src)}" alt="${esc(post.hero.alt)}" width="1600" height="900" loading="eager" fetchpriority="high" decoding="async" />
        <span class="motion-curtain" aria-hidden="true"></span>
      </a>
      <div class="blog-featured__body">
        <p class="blog-meta">
          <span class="blog-meta__cat">${esc(getBlogCategoryLabel(post.category))}</span>
          <span aria-hidden="true">·</span>
          <span>${esc(String(post.readMinutes))} Min. Lesezeit</span>
        </p>
        <h2 id="featured-${esc(post.slug)}" class="blog-featured__title">
          <a href="/reisefuehrer/${esc(post.slug)}/">${esc(post.title)}</a>
        </h2>
        <p class="blog-featured__excerpt">${esc(post.excerpt)}</p>
        <a class="home-link" href="/reisefuehrer/${esc(post.slug)}/">Artikel lesen →</a>
      </div>
    </article>
  `;
}

function renderCard(post) {
  return `
    <article class="blog-card">
      <a class="blog-card__media" href="/reisefuehrer/${esc(post.slug)}/" aria-labelledby="card-${esc(post.slug)}" data-motion-curtain>
        <img src="${esc(post.hero.src)}" alt="${esc(post.hero.alt)}" width="800" height="600" loading="lazy" decoding="async" />
        <span class="motion-curtain" aria-hidden="true"></span>
      </a>
      <div class="blog-card__body">
        <p class="blog-meta">
          <span class="blog-meta__cat">${esc(getBlogCategoryLabel(post.category))}</span>
          <span aria-hidden="true">·</span>
          <span>${esc(String(post.readMinutes))} Min.</span>
        </p>
        <h3 id="card-${esc(post.slug)}" class="blog-card__title">
          <a href="/reisefuehrer/${esc(post.slug)}/">${esc(post.title)}</a>
        </h3>
        <p class="blog-card__excerpt">${esc(post.excerpt)}</p>
      </div>
    </article>
  `;
}

function renderPagination({ page, totalPages, cat }) {
  if (totalPages <= 1) return "";
  const pages = [];
  for (let i = 1; i <= totalPages; i += 1) {
    const isCurrent = i === page;
    pages.push(`
      <a class="blog-pagination__item${isCurrent ? " is-active" : ""}"
         href="${esc(buildUrl({ cat, page: i }))}"
         ${isCurrent ? 'aria-current="page"' : ""}>
        ${i}
      </a>
    `);
  }
  return `
    <nav class="blog-pagination" aria-label="Seiten-Navigation">
      ${pages.join("")}
    </nav>
  `;
}

export function renderBlogArchive(root) {
  const { cat, page } = readUrlState();
  const allFiltered = filterPosts(BLOG_POSTS, cat);
  const featured = pickFeatured(allFiltered, page);
  const restItems = featured
    ? allFiltered.filter((p) => p.slug !== featured.slug)
    : allFiltered;
  const { pageItems, totalPages, page: safePage } = paginate(
    restItems,
    page,
    PER_PAGE,
  );

  const categoryLabel = cat ? getBlogCategoryLabel(cat) : null;
  const titleSuffix = categoryLabel ? ` · ${categoryLabel}` : "";
  setPageMeta({
    title: `Reiseführer${titleSuffix} — Ferienhaus am Rösslewald`,
    description:
      "Reiseführer Hochschwarzwald — Ausflüge, Wanderungen, Genuss und Praktisches direkt aus der Region.",
  });
  setCanonical(buildUrl({ cat, page: safePage }).split("?")[0]);

  setPageSchema({
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Reiseführer — Ferienhaus am Rösslewald",
    url: `${window.location.origin}/reisefuehrer/`,
    description:
      "Tipps und Geschichten aus dem Hochschwarzwald — direkt von den Gastgebern.",
    blogPost: BLOG_POSTS.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${window.location.origin}/reisefuehrer/${p.slug}/`,
      datePublished: p.publishedAt,
      dateModified: p.updatedAt ?? p.publishedAt,
      image: p.hero.src,
    })),
  });

  const empty = pageItems.length === 0 && !featured;

  root.innerHTML = `
    <div class="home">
      ${skipLinkMarkup()}
      ${headerMarkup()}

      <main id="main">
        <section class="blog-hero" data-etch-element="section">
          <div class="blog-hero__copy" data-etch-element="container" data-motion-intro>
            <p class="home-kicker">${esc(BLOG_INDEX.kicker)}</p>
            <h1 class="blog-hero__title">
              ${esc(BLOG_INDEX.heading)} <em>${esc(BLOG_INDEX.headingEm)}</em>
            </h1>
            <p class="blog-hero__lead">${esc(BLOG_INDEX.lead)}</p>
          </div>
        </section>

        <section class="blog-archive" data-etch-element="section" aria-labelledby="archive-heading">
          <div data-etch-element="container">
            <h2 id="archive-heading" class="visually-hidden">Alle Artikel im Reiseführer</h2>
            <nav class="blog-pills" aria-label="Nach Kategorie filtern" data-motion-reveal>
              ${renderPills(cat)}
            </nav>

            ${
              empty
                ? `<p class="blog-empty">Noch keine Artikel in dieser Kategorie — schauen Sie bald wieder vorbei.</p>`
                : `
                  ${renderFeatured(featured)}
                  ${pageItems.length > 0 ? `<div class="blog-grid" data-motion-curtain-group>${pageItems.map(renderCard).join("")}</div>` : ""}
                  ${renderPagination({ page: safePage, totalPages, cat })}
                `
            }
          </div>
        </section>
      </main>

      ${footerMarkup()}
    </div>
  `;
}
