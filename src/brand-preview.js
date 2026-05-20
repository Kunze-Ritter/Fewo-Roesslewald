/**
 * Interne Brand-Vorschau — nutzt generiertes ACSS aus WP.
 */
export function renderBrandPreview(root) {
  const logo =
    "https://fewo-roesslewald.de/wp-content/uploads/2022/09/cropped-Favicon.png";

  root.innerHTML = `
    <header class="brand-header">
      <div class="brand-header__inner">
        <div class="brand-logo">
          <img class="brand-logo__img" src="${logo}" width="48" height="48" alt="FeWo Rösslewald" />
          <div>
            <p class="brand-logo__eyebrow">Ferienhaus · Hinterzarten</p>
            <p class="brand-logo__title">Rösslewald</p>
          </div>
        </div>
        <a class="btn--primary" href="https://fewo-roesslewald.holiduhost.com/" target="_blank" rel="noopener">Verfügbarkeit prüfen</a>
      </div>
    </header>

    <main class="brand-main">
      <p class="brand-kicker">Live-ACSS · fewo.tobiashaas.dev · DE only</p>
      <h1>Ruhiger, echter Schwarzwald-Urlaub.</h1>
      <p class="brand-lead">Styles aus <code>src/styles/acss/automatic.css</code> (Kopie vom WP-Export).</p>
      <p class="brand-actions">
        <a class="btn--primary" href="https://fewo-roesslewald.holiduhost.com/" target="_blank" rel="noopener">Verfügbarkeit prüfen</a>
        <a class="btn--secondary btn--outline" href="#farben">Farben ansehen</a>
      </p>

      <section id="farben" class="brand-section">
        <h2>Main Colors (ACSS)</h2>
        <div class="brand-swatches">
          ${swatch("Primary", "var(--primary)")}
          ${swatch("Secondary", "var(--secondary)")}
          ${swatch("Base", "var(--base)")}
          ${swatch("Neutral", "var(--neutral)")}
          ${swatch("Body BG", "var(--body-bg-color)")}
        </div>
      </section>

      <section class="brand-section">
        <h2>Typografie</h2>
        <h3>Sonnentau · 95 m² · 2–6 Personen</h3>
        <p>Body: <code>var(--text-m)</code> · Farbe: <code>var(--text-color)</code> (= muted) · H1: <code>var(--h1)</code></p>
      </section>

      <section class="brand-quote bg--ultra-dark">
        <p class="brand-quote__text">Nicht höher, schneller, weiter — sondern ruhiger, echter, näher bei sich.</p>
        <p class="brand-quote__sub">Willkommen im Schwarzwald.</p>
      </section>

      <p class="brand-note">
        <code>--content-width</code> · <code>--space-m</code> · <code>--radius</code> — alle aus ACSS.
        Nach Dashboard-Änderung: CSS von
        <a href="https://fewo.tobiashaas.dev/wp-content/uploads/automatic-css/automatic.css">WP exportieren</a>
        und nach <code>src/styles/acss/automatic.css</code> kopieren.
      </p>
    </main>
  `.replaceAll("<div", "<div").replaceAll("</div>", "</div>");
}
