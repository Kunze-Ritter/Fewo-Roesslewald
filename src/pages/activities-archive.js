/**
 * Aktivitäten-Archiv `/aktivitaeten/`
 *
 * Gleiche Magazin-Logik wie das Blog-Archiv, leicht andere Karten-Anzeige
 * (Anfahrt-Zeit und Schwierigkeit statt Lesezeit), und Schema.org als
 * `ItemList` von `TouristAttraction`-Einträgen.
 *
 * Filter: ?cat=wandern|see|kultur|genuss + ?page=N (für künftig).
 */
import {
  ACTIVITIES,
  ACTIVITY_CATEGORIES,
  ACTIVITIES_INDEX,
  getActivityCategoryLabel,
} from "../data/activities.js";
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
  return {
    cat: params.get("cat") ?? null,
    page: Math.max(1, Number.parseInt(params.get("page") ?? "1", 10) || 1),
  };
}

function buildUrl({ cat, page }) {
  const params = new URLSearchParams();
  if (cat) params.set("cat", cat);
  if (page > 1) params.set("page", String(page));
  const q = params.toString();
  return q ? `/aktivitaeten/?${q}` : "/aktivitaeten/";
}

function filterActivities(all, cat) {
  return cat ? all.filter((a) => a.category === cat) : all;
}

function pickFeatured(filtered, page) {
  if (page !== 1) return null;
  return filtered.find((a) => a.featured) ?? filtered[0] ?? null;
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
  const items = ACTIVITY_CATEGORIES.map(
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

function metaLine(activity) {
  const parts = [];
  if (activity.travelMinutes) parts.push(`${activity.travelMinutes} Min. ab Rösslewald`);
  if (activity.duration) parts.push(activity.duration);
  if (activity.difficulty) parts.push(activity.difficulty);
  return parts.join(" · ");
}

function renderFeatured(act) {
  if (!act) return "";
  return `
    <article class="blog-featured" data-motion-reveal>
      <a class="blog-featured__media" href="/aktivitaeten/${esc(act.slug)}/" aria-labelledby="featured-${esc(act.slug)}" data-motion-curtain>
        <img src="${esc(act.hero.src)}" alt="${esc(act.hero.alt)}" width="1600" height="900" loading="eager" fetchpriority="high" decoding="async" />
        <span class="motion-curtain" aria-hidden="true"></span>
      </a>
      <div class="blog-featured__body">
        <p class="blog-meta">
          <span class="blog-meta__cat">${esc(getActivityCategoryLabel(act.category))}</span>
          <span aria-hidden="true">·</span>
          <span>${esc(metaLine(act))}</span>
        </p>
        <h2 id="featured-${esc(act.slug)}" class="blog-featured__title">
          <a href="/aktivitaeten/${esc(act.slug)}/">${esc(act.title)}</a>
        </h2>
        <p class="blog-featured__excerpt">${esc(act.excerpt)}</p>
        <a class="home-link" href="/aktivitaeten/${esc(act.slug)}/">Details ansehen →</a>
      </div>
    </article>
  `;
}

function renderCard(act) {
  return `
    <article class="blog-card">
      <a class="blog-card__media" href="/aktivitaeten/${esc(act.slug)}/" aria-labelledby="card-${esc(act.slug)}" data-motion-curtain>
        <img src="${esc(act.hero.src)}" alt="${esc(act.hero.alt)}" width="800" height="600" loading="lazy" decoding="async" />
        <span class="motion-curtain" aria-hidden="true"></span>
      </a>
      <div class="blog-card__body">
        <p class="blog-meta">
          <span class="blog-meta__cat">${esc(getActivityCategoryLabel(act.category))}</span>
          <span aria-hidden="true">·</span>
          <span>${esc(metaLine(act))}</span>
        </p>
        <h3 id="card-${esc(act.slug)}" class="blog-card__title">
          <a href="/aktivitaeten/${esc(act.slug)}/">${esc(act.title)}</a>
        </h3>
        <p class="blog-card__excerpt">${esc(act.excerpt)}</p>
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

export function renderActivitiesArchive(root) {
  const { cat, page } = readUrlState();
  const filtered = filterActivities(ACTIVITIES, cat);
  const featured = pickFeatured(filtered, page);
  const rest = featured
    ? filtered.filter((a) => a.slug !== featured.slug)
    : filtered;
  const { pageItems, totalPages, page: safePage } = paginate(rest, page, PER_PAGE);

  const categoryLabel = cat ? getActivityCategoryLabel(cat) : null;
  const titleSuffix = categoryLabel ? ` · ${categoryLabel}` : "";
  setPageMeta({
    title: `Aktivitäten${titleSuffix} — Ferienhaus am Rösslewald`,
    description:
      "Aktivitäten im Hochschwarzwald — Wanderungen, See, Kultur, Genuss. Persönlich ausgewählt von Ihren Gastgebern am Rösslewald.",
  });
  setCanonical(buildUrl({ cat, page: safePage }).split("?")[0]);

  setPageSchema({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Aktivitäten im Hochschwarzwald",
    itemListElement: ACTIVITIES.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "TouristAttraction",
        name: a.title,
        description: a.excerpt,
        url: `${window.location.origin}/aktivitaeten/${a.slug}/`,
        image: a.hero.src,
        geo: a.coordinates
          ? {
              "@type": "GeoCoordinates",
              latitude: a.coordinates.lat,
              longitude: a.coordinates.lng,
            }
          : undefined,
      },
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
            <p class="home-kicker">${esc(ACTIVITIES_INDEX.kicker)}</p>
            <h1 class="blog-hero__title">
              ${esc(ACTIVITIES_INDEX.heading)} <em>${esc(ACTIVITIES_INDEX.headingEm)}</em>
            </h1>
            <p class="blog-hero__lead">${esc(ACTIVITIES_INDEX.lead)}</p>
          </div>
        </section>

        <section class="blog-archive" data-etch-element="section" aria-labelledby="archive-heading">
          <div data-etch-element="container">
            <h2 id="archive-heading" class="visually-hidden">Alle Aktivitäten</h2>
            <nav class="blog-pills" aria-label="Nach Kategorie filtern" data-motion-reveal>
              ${renderPills(cat)}
            </nav>

            ${
              empty
                ? `<p class="blog-empty">Noch keine Aktivitäten in dieser Kategorie.</p>`
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
