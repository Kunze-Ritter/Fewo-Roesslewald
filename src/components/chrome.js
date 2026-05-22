/**
 * Gemeinsamer Page-Chrome: HTML-Escape, Header, Footer, Buchungs-Link.
 *
 * Wird von allen Routes verwendet (Home, Blog-Archiv, Blog-Single,
 * Activities-Archiv, Activities-Single, 404). Die NAV verwendet absolute
 * Pfade — Hash-Anker werden mit `/`-Präfix versehen, damit ein Klick
 * von einer Sub-Page (`/reisefuehrer/`) korrekt auf die Home springt
 * und anschließend zum Anker scrollt.
 */
import { SITE, NAV } from "../data/site.js";

export function escHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * UTM-Tracking — hängt Standard-UTM-Parameter an externe http(s)-Links
 * an, damit das Buchungs-Backend bzw. Partner-Sites erkennen können,
 * dass ein Lead von der Rösslewald-Site kommt.
 *
 * - Interne Pfade, `tel:`, `mailto:`, `#`-Anker bleiben unberührt.
 * - Eigene Domain (fewo-roesslewald.de) wird nicht getaggt.
 * - Bestehende UTMs auf der Ziel-URL werden respektiert (kein Overwrite),
 *   damit ggf. manuell gesetzte Tracking-Parameter erhalten bleiben.
 */
const UTM_DEFAULTS = {
  utm_source: "roesslewald.de",
  utm_medium: "referral",
  utm_campaign: "website",
};

export function withUtm(href, content) {
  if (!href || typeof href !== "string") return href;
  if (!/^https?:\/\//i.test(href)) return href;
  try {
    const url = new URL(href);
    if (/(^|\.)fewo-roesslewald\.de$/i.test(url.hostname)) return href;
    for (const [key, value] of Object.entries(UTM_DEFAULTS)) {
      if (!url.searchParams.has(key)) url.searchParams.set(key, value);
    }
    if (content && !url.searchParams.has("utm_content")) {
      url.searchParams.set("utm_content", content);
    }
    return url.toString();
  } catch {
    return href;
  }
}

/**
 * Normalisiert Nav-`href`s so, dass reine Hash-Anker (`#xyz`) als
 * absolute Pfade auf die Home verweisen. Andere Pfade bleiben so wie
 * sie sind. Dadurch funktioniert die Hauptnavigation einheitlich auf
 * allen Seiten — und der Router weiß, dass er erst nach Home pushen
 * muss, bevor zum Anker gescrollt wird.
 */
function normalizeNavHref(href) {
  if (typeof href !== "string") return href;
  if (href.startsWith("#")) return `/${href}`;
  return href;
}

function navLink(item) {
  const ext = item.external ? ' target="_blank" rel="noopener noreferrer"' : "";
  const extHint = item.external
    ? ' <span class="visually-hidden">(öffnet in neuem Tab)</span>'
    : "";
  const href = normalizeNavHref(item.href);
  return `<a href="${escHtml(href)}"${ext}>${escHtml(item.label)}${extHint}</a>`;
}

/**
 * Standard-Buchungs-Button. Öffnet immer in neuem Tab (externer Host).
 * `content` landet als `utm_content` an der Ziel-URL, damit wir später
 * sehen können, von welcher Position der Lead kam (z. B. "header-cta",
 * "footer-cta", "rooms-card").
 */
export function bookLink(label = "Verfügbarkeit prüfen", className = "btn--primary", content = "book-cta") {
  const href = withUtm(SITE.bookUrl, content);
  return `<a class="${className}" href="${escHtml(href)}" target="_blank" rel="noopener noreferrer">${escHtml(label)}<span class="visually-hidden"> (öffnet in neuem Tab)</span></a>`;
}

/**
 * Hauptnavigation. Zwei Varianten (Desktop + Mobile) teilen sich die
 * gleichen NAV-Items, damit Pflege an einer Stelle liegt.
 */
export function headerMarkup() {
  return `
    <header class="home-header" data-motion-header>
      <div class="home-header__row">
        <a class="home-logo" href="/" aria-label="${escHtml(SITE.name)} — Startseite">${escHtml(SITE.name)}</a>
        <nav class="home-nav" aria-label="Hauptnavigation">${NAV.map(navLink).join("")}</nav>
        ${bookLink("Verfügbarkeit prüfen", "btn--primary home-header__cta", "header-cta")}
        <button type="button" class="home-nav-toggle" aria-expanded="false" aria-controls="home-mobile-nav" aria-label="Menü">
          <span></span><span></span><span></span>
        </button>
      </div>
      <nav id="home-mobile-nav" class="home-mobile-nav" hidden aria-label="Mobile Navigation">
        ${NAV.map(navLink).join("")}
        ${bookLink("Verfügbarkeit prüfen", "btn--primary", "mobile-nav-cta")}
      </nav>
    </header>
  `;
}

/**
 * Footer mit globalem Closing-CTA (dunkle, full-bleed Sektion) oben und
 * Brand-Zeile, Quick-Nav, Legal darunter.
 *
 * Der Closing-CTA ist die *eine* Stelle, an der „Verfügbarkeit prüfen"
 * über alle Seiten konsistent vorkommt — Sticky-Boxes und einzelne
 * Sektionen verzichten bewusst darauf, um den Button nicht zu spammen.
 * Same Markup wie früher auf der Home, jetzt jedoch global im Footer.
 */
export function footerMarkup() {
  return `
    <footer id="kontakt" class="home-footer">
      <section class="home-block home-block--cta" aria-labelledby="footer-cta-heading" data-etch-element="section">
        <div class="home-closing" data-etch-element="container" data-motion-intro>
          <h2 id="footer-cta-heading" class="home-closing__title">Bereit für <em>den Schwarzwald?</em></h2>
          <p class="home-closing__lead">Schreiben Sie uns. Wir antworten persönlich.</p>
          <p class="home-closing__cta">${bookLink("Verfügbarkeit prüfen", "btn--primary", "footer-cta")}</p>
        </div>
      </section>
      <div class="home-footer__grid">
        <p class="home-footer__brand">${escHtml(SITE.name)} · ${escHtml(SITE.tagline)}</p>
        <nav class="home-footer__nav" aria-label="Footer">
          <a href="/#ferienhaus">Ferienhaus</a>
          <a href="/#wohnungen">Wohnungen</a>
          <a href="/reisefuehrer/">Reiseführer</a>
          <a href="/aktivitaeten/">Aktivitäten</a>
          <a href="/#bewertungen">Bewertungen</a>
        </nav>
        <p class="home-footer__legal">© ${new Date().getFullYear()} · <a href="/datenschutz/">Datenschutz</a> · <a href="/impressum/">Impressum</a></p>
      </div>
    </footer>
  `;
}

/**
 * Skip-Link, der auf jeder Seite oben stehen sollte.
 */
export function skipLinkMarkup() {
  return `<a class="skip-link" href="#main">Zum Inhalt</a>`;
}

/**
 * Setzt `<title>` + `<meta name="description">` dynamisch pro Route.
 * Wird vom jeweiligen `render*`-Modul aufgerufen, bevor das Markup in
 * den DOM geschrieben wird.
 */
export function setPageMeta({ title, description }) {
  if (title) document.title = title;
  if (description) {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }
}

/**
 * Injiziert ein `<script type="application/ld+json">` mit einer
 * stabilen `data-page-schema`-ID, damit aufeinanderfolgende Routen das
 * Schema sauber überschreiben statt zu duplizieren.
 */
export function setPageSchema(jsonLd) {
  const id = "page-schema";
  let node = document.head.querySelector(`script[data-page-schema="${id}"]`);
  if (!node) {
    node = document.createElement("script");
    node.type = "application/ld+json";
    node.setAttribute("data-page-schema", id);
    document.head.appendChild(node);
  }
  node.textContent = JSON.stringify(jsonLd);
}

/**
 * Setzt `<link rel="canonical">` auf die aktuelle Route. Wichtig für
 * Sub-Pages, damit Suchmaschinen z. B. `?cat=`-Varianten nicht als
 * Duplikate sehen.
 */
export function setCanonical(pathname) {
  const href = `${window.location.origin}${pathname}`;
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}
