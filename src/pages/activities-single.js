/**
 * Aktivität-Single `/aktivitaeten/:slug/`
 *
 * Magazin-kompakt mit zusätzlicher OSM-Karte (Leaflet) in der Sticky-Box.
 *
 * Die Karte zentriert auf der Aktivitäts-Koordinate, setzt einen Pin auf
 * den Ort sowie einen zweiten, dezenten Pin auf den Rösslewald — so sieht
 * der Gast sofort die räumliche Beziehung zwischen Haus und Ausflug.
 *
 * Leaflet wird per `lazy import` geladen, damit die Karte das initiale
 * Page-Bundle nicht belastet. Die OSM-Kacheln laden ohne API-Key, mit
 * Standard-Attribution (Pflicht laut OSM-Lizenz).
 *
 * Schema.org `TouristAttraction` + `BreadcrumbList`.
 */
import {
  getActivity,
  getRelatedActivities,
  getActivityCategoryLabel,
  ROESSLEWALD_COORDS,
} from "../data/activities.js";
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

function renderInfoTable(activity) {
  const rows = [];
  if (activity.travelMinutes) {
    rows.push(["Anfahrt", `${activity.travelMinutes} Min. · ${activity.distanceKm} km ab Rösslewald`]);
  }
  if (activity.duration) rows.push(["Dauer", activity.duration]);
  if (activity.difficulty) rows.push(["Schwierigkeit", activity.difficulty]);
  if (activity.season?.length) rows.push(["Saison", activity.season.join(", ")]);
  if (activity.practicalInfo?.address) rows.push(["Adresse", activity.practicalInfo.address]);
  if (activity.practicalInfo?.parking) rows.push(["Parken", activity.practicalInfo.parking]);
  if (activity.practicalInfo?.transit) rows.push(["ÖPNV", activity.practicalInfo.transit]);
  if (activity.practicalInfo?.bestTime) rows.push(["Beste Zeit", activity.practicalInfo.bestTime]);

  return `
    <dl class="prose-aside__info">
      ${rows
        .map(
          ([k, v]) => `
            <dt>${esc(k)}</dt>
            <dd>${esc(v)}</dd>
          `,
        )
        .join("")}
    </dl>
  `;
}

function renderRelated(currentSlug) {
  const related = getRelatedActivities(currentSlug, 3);
  if (related.length === 0) return "";
  /**
   * Identisches Card-Markup wie im Archive — kein Featured-Modifier auf
   * dem Container (`.blog-grid` ohne `--magazine`), damit alle Related-
   * Karten gleich groß bleiben.
   */
  const items = related
    .map(
      (a) => `
        <li class="blog-grid__item">
          <article class="blog-card">
            <a class="blog-card__media" href="/aktivitaeten/${esc(a.slug)}/" aria-labelledby="related-${esc(a.slug)}" data-motion-curtain>
              <img src="${esc(a.hero.src)}" alt="${esc(a.hero.alt)}" width="1600" height="1000" loading="lazy" decoding="async" />
              <span class="motion-curtain" aria-hidden="true"></span>
            </a>
            <div class="blog-card__body">
              <p class="blog-meta">
                <span class="blog-meta__cat">${esc(getActivityCategoryLabel(a.category))}</span>
              </p>
              <h2 id="related-${esc(a.slug)}" class="blog-card__title">
                <a href="/aktivitaeten/${esc(a.slug)}/">${esc(a.title)}</a>
              </h2>
              <p class="blog-card__excerpt">${esc(a.excerpt)}</p>
              <a class="blog-card__cta home-link" href="/aktivitaeten/${esc(a.slug)}/">Details ansehen →</a>
            </div>
          </article>
        </li>
      `,
    )
    .join("");
  return `
    <section class="blog-related" aria-labelledby="related-activities-heading" data-etch-element="section">
      <div data-etch-element="container">
        <header class="home-section-head" data-motion-reveal>
          <p class="home-kicker">Auch in der Nähe</p>
          <h2 id="related-activities-heading" class="home-h2">Mehr Aktivitäten</h2>
        </header>
        <ul class="blog-grid" data-motion-curtain-group>${items}</ul>
      </div>
    </section>
  `;
}

/**
 * Initialisiert die Leaflet-Karte nach dem Render.
 *
 * Lazy-Import: das Modul wird erst geladen, wenn diese Seite tatsächlich
 * angezeigt wird. Verhindert ~150 kB Karten-Bibliothek im Home-Bundle.
 *
 * Bei `prefers-reduced-motion` blenden wir aus Höflichkeit das
 * Zoom-Verhalten nicht aus — Leaflet zoomt ohnehin ohne Auto-Animation,
 * sobald der User mit der Karte interagiert.
 */
async function initActivityMap(root, activity) {
  const mapEl = root.querySelector("[data-activity-map]");
  if (!mapEl || !activity.coordinates) return;

  // Leaflet CSS einmalig im Document-Head registrieren — Vite löst den
  // Pfad zu node_modules/leaflet/dist/leaflet.css auf.
  if (!document.querySelector('link[data-leaflet-css]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.setAttribute("data-leaflet-css", "");
    link.href = (await import("leaflet/dist/leaflet.css?url")).default;
    document.head.appendChild(link);
  }

  const L = (await import("leaflet")).default;

  // Standard-Marker-Icon umkonfigurieren: Leaflet versucht sonst,
  // marker-icon.png relativ zum Bundle-Output zu laden — was im Vite
  // Dev-Modus fehlschlägt. Wir setzen die URLs explizit auf den Modul-
  // Pfad, der vom Bundler korrekt aufgelöst wird.
  const iconUrl = (await import("leaflet/dist/images/marker-icon.png?url")).default;
  const iconRetina = (await import("leaflet/dist/images/marker-icon-2x.png?url")).default;
  const shadowUrl = (await import("leaflet/dist/images/marker-shadow.png?url")).default;
  L.Icon.Default.mergeOptions({
    iconUrl,
    iconRetinaUrl: iconRetina,
    shadowUrl,
  });

  const map = L.map(mapEl, {
    center: [activity.coordinates.lat, activity.coordinates.lng],
    zoom: 12,
    scrollWheelZoom: false, // Höflichkeits-Default — sonst frisst die Karte den Page-Scroll
    attributionControl: true,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // Aktivitäts-Pin (Standard-Marker)
  L.marker([activity.coordinates.lat, activity.coordinates.lng])
    .addTo(map)
    .bindPopup(`<strong>${activity.title}</strong>`);

  // Rösslewald-Pin (dezenter Kreis, damit der Schwerpunkt beim
  // Aktivitäts-Pin bleibt)
  L.circleMarker([ROESSLEWALD_COORDS.lat, ROESSLEWALD_COORDS.lng], {
    radius: 8,
    color: "#1a2320",
    fillColor: "#a09d6a",
    fillOpacity: 0.9,
    weight: 2,
  })
    .addTo(map)
    .bindPopup("<strong>Ferienhaus am Rösslewald</strong>");

  // Beide Pins ins Viewport — fitBounds mit etwas Padding
  const bounds = L.latLngBounds([
    [activity.coordinates.lat, activity.coordinates.lng],
    [ROESSLEWALD_COORDS.lat, ROESSLEWALD_COORDS.lng],
  ]);
  map.fitBounds(bounds, { padding: [24, 24] });
}

export function renderActivitiesSingle(root, { params }) {
  const activity = getActivity(params.slug);
  if (!activity) {
    renderNotFound(root, { path: window.location.pathname });
    return;
  }

  const canonical = `/aktivitaeten/${activity.slug}/`;
  setPageMeta({
    title: `${activity.title} — Aktivitäten Hochschwarzwald`,
    description: activity.excerpt,
  });
  setCanonical(canonical);

  setPageSchema({
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: activity.title,
    description: activity.excerpt,
    image: activity.hero.src,
    url: `${window.location.origin}${canonical}`,
    geo: activity.coordinates
      ? {
          "@type": "GeoCoordinates",
          latitude: activity.coordinates.lat,
          longitude: activity.coordinates.lng,
        }
      : undefined,
    address: activity.practicalInfo?.address
      ? {
          "@type": "PostalAddress",
          streetAddress: activity.practicalInfo.address,
        }
      : undefined,
  });

  root.innerHTML = `
    <div class="home">
      ${skipLinkMarkup()}
      ${headerMarkup()}

      <main id="main">
        <article class="prose-single">
          <header class="prose-hero" data-etch-element="section" data-motion-curtain>
            <img class="prose-hero__image" src="${esc(activity.hero.src)}" alt="${esc(activity.hero.alt)}" width="1920" height="1080" fetchpriority="high" decoding="async" />
            <span class="motion-curtain" aria-hidden="true"></span>
            <div class="prose-hero__overlay" data-etch-element="container" data-motion-intro>
              <nav class="prose-breadcrumbs" aria-label="Breadcrumb">
                <a href="/">Start</a>
                <span aria-hidden="true">›</span>
                <a href="/aktivitaeten/">Aktivitäten</a>
                <span aria-hidden="true">›</span>
                <span aria-current="page">${esc(activity.title)}</span>
              </nav>
              <p class="home-kicker prose-hero__kicker">${esc(getActivityCategoryLabel(activity.category))}</p>
              <h1 class="prose-hero__title">${esc(activity.title)}</h1>
              <p class="prose-hero__lead">${esc(activity.excerpt)}</p>
            </div>
          </header>

          <div class="prose-body" data-etch-element="section">
            <div class="prose-body__inner" data-etch-element="container">
              <div class="prose">
                ${renderBlocks(activity.content)}
              </div>

              <aside class="prose-aside" aria-label="Auf einen Blick">
                <div class="prose-aside__inner">
                  <p class="prose-aside__kicker">Auf einen Blick</p>
                  ${renderInfoTable(activity)}

                  <div class="prose-aside__map" data-activity-map role="application" aria-label="Karte: ${esc(activity.title)} und Rösslewald"></div>
                  <p class="prose-aside__map-hint">
                    <span aria-hidden="true">📍</span>
                    ${esc(activity.distanceKm ?? "—")} km vom Rösslewald entfernt
                  </p>
                </div>
              </aside>
            </div>
          </div>

          ${renderRelated(activity.slug)}
        </article>
      </main>

      ${footerMarkup()}
    </div>
  `;

  initActivityMap(root, activity);
}
