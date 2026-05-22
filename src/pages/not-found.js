/**
 * 404 — Fallback-Route.
 *
 * Klein, ehrlich, mit klaren Auswegen (Home, Reiseführer, Aktivitäten,
 * Buchungs-CTA). In WP später wird das vom `404.php` übernommen.
 */
import {
  escHtml as esc,
  bookLink,
  headerMarkup,
  footerMarkup,
  skipLinkMarkup,
  setPageMeta,
  setCanonical,
} from "../components/chrome.js";

export function renderNotFound(root, { path } = {}) {
  setPageMeta({
    title: "Seite nicht gefunden — Ferienhaus am Rösslewald",
    description:
      "Die aufgerufene Seite existiert nicht. Zurück zur Startseite oder direkt Verfügbarkeit prüfen.",
  });
  setCanonical(path ?? "/404/");

  root.innerHTML = `
    <div class="home">
      ${skipLinkMarkup()}
      ${headerMarkup()}

      <main id="main">
        <section class="not-found" data-etch-element="section">
          <div class="not-found__inner" data-etch-element="container" data-motion-intro>
            <p class="home-kicker">404</p>
            <h1 class="not-found__title">Diese Spur führt ins Dickicht.</h1>
            <p class="not-found__lead">
              ${esc(path ? `„${path}"` : "Die aufgerufene Seite")} konnten wir nicht finden.
              Vielleicht hilft Ihnen ein Schritt zurück — oder gleich der direkte Weg ins Buchungs-Tool.
            </p>
            <p class="not-found__cta">
              <a class="btn btn--outline" href="/">Zur Startseite</a>
              <a class="btn btn--outline" href="/reisefuehrer/">Reiseführer</a>
              <a class="btn btn--outline" href="/aktivitaeten/">Aktivitäten</a>
              ${bookLink("Verfügbarkeit prüfen", "btn--primary", "404-cta")}
            </p>
          </div>
        </section>
      </main>

      ${footerMarkup()}
    </div>
  `;
}
