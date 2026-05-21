import {
  SITE,
  TRUST,
  HOSTS,
  AMENITIES,
  PARTNER_GOLF,
  APARTMENTS,
  REVIEWS,
  REGION,
  BLOG,
} from "../data/site.js";
import {
  escHtml as esc,
  bookLink,
  headerMarkup,
  footerMarkup,
  skipLinkMarkup,
  setPageMeta,
  setCanonical,
} from "../components/chrome.js";

function vistaSlide(slide, index, total) {
  const srcset = [1280, 1920, 2560]
    .map((w) => `/img/${slide.slug}-${w}.jpg ${w}w`)
    .join(", ");
  const src = `/img/${slide.slug}-1920.jpg`;
  const isFirst = index === 0;
  // Tabpanel-Pattern (WAI-ARIA APG, "Carousel with Tabs"):
  // Jeder Slide = tabpanel, kontrolliert vom passenden tab (Dot).
  // aria-labelledby verknüpft Panel ↔ Tab → Screen-Reader liest beim
  // Fokus auf den Tab den Slide-Inhalt sinnvoll vor.
  return `
    <li class="home-vista__slide${isFirst ? " is-active" : ""}"
        id="vista-slide-${index}"
        role="tabpanel"
        aria-roledescription="slide"
        aria-labelledby="vista-tab-${index}"
        aria-label="Slide ${index + 1} von ${total}: ${esc(slide.season)}"
        aria-hidden="${isFirst ? "false" : "true"}"
        tabindex="0"
        data-slide-index="${index}"
        data-season="${esc(slide.season)}"
        data-caption="${esc(slide.caption)}"
        data-location="${esc(slide.location)}">
      <div class="home-vista__media-inner" data-motion-parallax>
        <img src="${esc(src)}" srcset="${esc(srcset)}" sizes="100vw"
             alt="${esc(slide.alt)}"
             width="${slide.width}" height="${slide.height}"
             ${isFirst ? 'fetchpriority="high"' : 'loading="lazy"'}
             decoding="async" draggable="false" />
      </div>
    </li>
  `;
}

function vistaCaptionMarkup(slides) {
  const first = slides[0];
  // Bewusst kein aria-live: Bei 5 s-Autoplay würde der Screen-Reader im
  // Sekundentakt unterbrechen ("annoyance"). WAI-APG empfiehlt für
  // auto-rotating Carousels stattdessen: Slide-Pause beim Fokus +
  // Slides als <tabpanel> mit Label — das deckt SR-Bedürfnisse ab,
  // ohne dauerhaft zu stören.
  return `
    <figcaption class="home-vista__caption">
      <span class="home-vista__season">${esc(first.season)}</span>
      <span class="home-vista__caption-label">${esc(first.caption)}</span>
      <span class="home-vista__caption-meta">${esc(first.location)}</span>
    </figcaption>
  `;
}

export function renderHome(root) {
  const trustItems = TRUST.map(
    (t) => `
      <li class="home-trust__item">
        <strong class="home-trust__label">${esc(t.label)}</strong>
        <span class="home-trust__desc">${esc(t.desc)}</span>
      </li>
    `,
  ).join("");

  const amenities = AMENITIES.map(
    (a) => `
      <li class="home-amenity">
        <strong class="home-amenity__title">${esc(a.title)}</strong>
        <span class="home-amenity__desc">${esc(a.desc)}</span>
      </li>
    `,
  ).join("");

  const regionKicker = REGION.map(
    (r) => `<span class="home-region-kicker__item">${esc(r.title)}</span>`,
  ).join('<span class="home-region-kicker__sep" aria-hidden="true">·</span>');

  /**
   * Premium-Partner — Editorial Centered (analog Closing-CTA / Reiseführer-Head).
   * Kein Card-Layout, sondern ein ruhiger Lese-Block mit zentriertem
   * Icon, Heading, Lead, Inline-Notes und Kontakt-Footer. So leitet
   * der Block organisch in die Closing-CTA direkt darunter über.
   */
  const partnerNotes = PARTNER_GOLF.notes
    .map((n) => `<li class="home-partner__note">${esc(n)}</li>`)
    .join("");

  const partnerContact = PARTNER_GOLF.contact;

  const gallery = SITE.img.gallery
    .map((item, i, arr) => {
      const isLast = i === arr.length - 1;
      const loading = i === 0 ? "eager" : "lazy";
      if (isLast) {
        return `
          <li class="home-gallery__item home-gallery__item--cta" data-motion-curtain>
            <figure class="home-gallery__media">
              <img src="${esc(item.src)}" alt="" width="640" height="640" loading="${loading}" decoding="async" />
              <button type="button" class="home-gallery__more" aria-label="Alle Fotos ansehen">
                <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 16L7.47 11.53A1.77 1.77 0 0 1 10.03 11.53L14 15.5M15.5 17 14 15.5M21 16l-2.47-2.47A1.77 1.77 0 0 0 15.97 13.53L14 15.5" />
                  <path d="M15.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
                  <path d="M3.7 19.75C2.5 18.34 2.5 16.23 2.5 12s0-6.34 1.2-7.75A2.85 2.85 0 0 1 4.25 3.7C5.66 2.5 7.77 2.5 12 2.5s6.34 0 7.75 1.2c.2.17.38.36.55.55C21.5 5.66 21.5 7.77 21.5 12s0 6.34-1.2 7.75a2.85 2.85 0 0 1-.55.55C18.34 21.5 16.23 21.5 12 21.5s-6.34 0-7.75-1.2a2.85 2.85 0 0 1-.55-.55Z" />
                </svg>
                <span>Alle Fotos</span>
              </button>
              <span class="motion-curtain" aria-hidden="true"></span>
            </figure>
          </li>
        `;
      }
      return `
        <li class="home-gallery__item" data-motion-curtain>
          <figure class="home-gallery__media">
            <img src="${esc(item.src)}" alt="${esc(item.alt)}" width="640" height="640" loading="${loading}" decoding="async" />
            <span class="motion-curtain" aria-hidden="true"></span>
          </figure>
        </li>
      `;
    })
    .join("");

  const apartments = APARTMENTS.map(
    (apt) => `
      <article class="home-room" id="wohnung-${esc(apt.slug)}">
        <a class="home-room__media" href="${esc(apt.detailHref)}" aria-label="Details zur Wohnung ${esc(apt.name)}" data-motion-curtain>
          <img src="${esc(apt.image)}" alt="Ferienwohnung ${esc(apt.name)}" width="1200" height="900" loading="lazy" />
          <span class="motion-curtain" aria-hidden="true"></span>
          <span class="home-room__price" aria-label="Preis">${esc(apt.priceFrom)}</span>
        </a>
        <div class="home-room__body">
          <h3 class="home-room__title">${esc(apt.name)}</h3>
          <p class="home-room__meta">${esc(apt.area)} · ${esc(apt.guests)} · ${esc(apt.bedrooms)}</p>
          <p class="home-room__ideal">${esc(apt.ideal)}</p>
          <ul class="home-room__usps">
            ${apt.usps.map((u) => `<li>${esc(u)}</li>`).join("")}
          </ul>
          <p class="home-room__actions">
            <a class="btn--secondary btn--outline home-room__details" href="${esc(apt.detailHref)}">Details zur Wohnung</a>
            <a class="home-link" href="${esc(SITE.bookUrl)}" target="_blank" rel="noopener noreferrer">Verfügbarkeit prüfen →<span class="visually-hidden"> (öffnet in neuem Tab)</span></a>
          </p>
        </div>
      </article>
    `,
  ).join("");

  const reviews = REVIEWS.map(
    (r) => `
      <li class="home-quote">
        <blockquote class="home-quote__text">
          <p>${esc(r.quote)}</p>
        </blockquote>
        <footer class="home-quote__meta">
          <cite class="home-quote__author">${esc(r.author)}</cite>
          <span class="home-quote__context">${esc(r.context)}</span>
        </footer>
      </li>
    `,
  ).join("");

  const posts = BLOG.posts
    .map(
      (p) => `
      <article class="home-journal__post">
        <a class="home-journal__media" href="${esc(BLOG.ctaHref)}${esc(p.slug)}/" aria-labelledby="post-${esc(p.slug)}" data-motion-curtain>
          <img src="${esc(p.image)}" alt="${esc(p.imageAlt)}" width="800" height="600" loading="lazy" decoding="async" />
          <span class="motion-curtain" aria-hidden="true"></span>
        </a>
        <div class="home-journal__body">
          <p class="home-journal__meta">
            <span class="home-journal__cat">${esc(p.category)}</span>
            <span aria-hidden="true">·</span>
            <span>${esc(String(p.readMinutes))} Min. Lesezeit</span>
          </p>
          <h3 id="post-${esc(p.slug)}" class="home-journal__title">
            <a href="${esc(BLOG.ctaHref)}${esc(p.slug)}/">${esc(p.title)}</a>
          </h3>
          <p class="home-journal__excerpt">${esc(p.excerpt)}</p>
          <a class="home-link" href="${esc(BLOG.ctaHref)}${esc(p.slug)}/">Weiterlesen →</a>
        </div>
      </article>
    `,
    )
    .join("");

  setPageMeta({
    title: "Ferienhaus am Rösslewald — Ferienwohnungen Hinterzarten",
    description:
      "Ferienhaus am Rösslewald bei Hinterzarten: Ferienwohnungen Sonnentau (2–6) und Weißtanne (2–4). Sauna, Wallbox, Konus-Karte — jetzt Verfügbarkeit prüfen.",
  });
  setCanonical("/");

  root.innerHTML = `
    <div class="home">
      ${skipLinkMarkup()}
      ${headerMarkup()}

      <main id="main">
        <section class="home-hero" data-etch-element="section">
          <div class="home-hero__intro" data-etch-element="container" data-motion-intro>
            <p class="home-kicker">${esc(SITE.hero.rating)}</p>
            <h1 class="home-hero__title">
              ${esc(SITE.hero.title)}<br /><em>${esc(SITE.hero.titleEm)}</em>
            </h1>
            <p class="home-hero__lead">${esc(SITE.hero.lead)}</p>
            <p class="home-hero__cta">
              ${bookLink("Verfügbarkeit prüfen", "btn--primary")}
            </p>
          </div>
          <figure class="home-hero__visual" data-motion-hero-media data-motion-curtain>
            <img src="${esc(SITE.img.hero)}" alt="Ferienhaus am Rösslewald" width="1600" height="1000" fetchpriority="high" />
            <span class="motion-curtain" aria-hidden="true"></span>
          </figure>
        </section>

        <section class="home-trust" aria-label="Vertrauen & Vorteile" data-etch-element="section">
          <ul class="home-trust__list" data-etch-element="container" data-motion-stagger>
            ${trustItems}
          </ul>
        </section>

        <section id="ferienhaus" class="home-block" aria-labelledby="ferienhaus-heading" data-etch-element="section">
          <div class="home-about" data-etch-element="container">
            <div class="home-about__copy" data-motion-reveal>
              <p class="home-kicker">${esc(SITE.story.label)}</p>
              <h2 id="ferienhaus-heading" class="home-h2">${esc(SITE.story.heading)}</h2>
              <p class="home-lead">${esc(SITE.story.body)}</p>

              <div class="home-hosts">
                <figure class="home-hosts__media" ${HOSTS.photo ? "" : 'data-empty="true" aria-hidden="true"'}>
                  ${
                    HOSTS.photo
                      ? `<img src="${esc(HOSTS.photo)}" alt="${esc(HOSTS.photoAlt)}" width="240" height="240" loading="lazy" decoding="async" />`
                      : `<svg viewBox="0 0 64 64" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <circle cx="32" cy="24" r="10" />
                          <path d="M12 56c2-10 10-16 20-16s18 6 20 16" />
                        </svg>`
                  }
                </figure>
                <div class="home-hosts__copy">
                  <p class="home-kicker home-hosts__kicker">${esc(HOSTS.kicker)}</p>
                  <p class="home-hosts__name">${esc(HOSTS.name)}</p>
                  <p class="home-hosts__intro">${esc(HOSTS.intro)}</p>
                  <p class="home-hosts__signature">${esc(HOSTS.signature)}</p>
                </div>
              </div>

              <a class="btn--secondary btn--outline" href="#video">Rundgang ansehen</a>
            </div>
            <ul class="home-gallery" aria-label="Impressionen vom Ferienhaus">${gallery}</ul>
          </div>
        </section>

        <section id="wohnungen" class="home-block" aria-labelledby="wohnungen-heading" data-etch-element="section">
          <div data-etch-element="container">
            <header class="home-section-head home-section-head--center" data-motion-reveal>
              <p class="home-kicker">Wohnungen</p>
              <h2 id="wohnungen-heading" class="home-h2 home-h2--center">Zwei Wohnungen, ein Anspruch</h2>
              <p class="home-lead home-lead--narrow">Beide individuell eingerichtet — auf der Detailseite finden Sie Grundriss, alle Preise und einen vollständigen Rundgang.</p>
            </header>
            <div class="home-rooms" data-motion-curtain-group>${apartments}</div>
          </div>
        </section>

        <section id="video" class="home-block home-block--dark" aria-labelledby="video-heading" data-etch-element="section">
          <div data-etch-element="container">
            <header class="home-section-head home-section-head--center home-section-head--on-dark" data-motion-reveal>
              <p class="home-kicker">${esc(SITE.video.kicker)}</p>
              <h2 id="video-heading" class="home-h2 home-h2--center">
                ${esc(SITE.video.heading)} <em>${esc(SITE.video.headingEm)}</em>
              </h2>
            </header>
            <div
              class="video-player-wrap"
              data-motion-zoom-scroll
              data-motion-curtain
              data-video-lazy
              data-video-src="${esc(SITE.video.src)}"
              data-video-poster="${esc(SITE.video.poster)}"
              data-video-title="${esc(SITE.video.title)}"
            >
              <img
                class="video-player-wrap__placeholder"
                src="${esc(SITE.video.poster)}"
                alt="Vorschaubild: ${esc(SITE.video.title)}"
                width="1200"
                height="675"
                loading="lazy"
                decoding="async"
              />
              <span class="motion-curtain" aria-hidden="true"></span>
            </div>
          </div>
        </section>

        <section id="ausstattung" class="home-block" aria-labelledby="ausstattung-heading" data-etch-element="section">
          <div class="home-features" data-etch-element="container">
            <div class="home-features__copy" data-motion-reveal>
              <p class="home-kicker">Ausstattung</p>
              <h2 id="ausstattung-heading" class="home-h2">Was dieses Haus bietet</h2>
              <p class="home-lead">Hochwertige Betten, eine Küche zum Kochen, Sauna nach der Wanderung — und ein Balkon, auf dem der Schwarzwald einfach wirken darf.</p>
            </div>
            <ul class="home-amenities" data-motion-stagger>${amenities}</ul>
          </div>
        </section>

        <section id="bewertungen" class="home-block" aria-labelledby="bewertungen-heading" data-etch-element="section">
          <div data-etch-element="container">
            <header class="home-section-head home-section-head--center" data-motion-reveal>
              <p class="home-kicker">Gästestimmen</p>
              <h2 id="bewertungen-heading" class="home-h2 home-h2--center">Was Gäste sagen</h2>
            </header>
            <ul class="home-quotes" data-motion-stagger>${reviews}</ul>
          </div>
        </section>

        <section class="home-vista" data-etch-element="section"
                 aria-roledescription="carousel"
                 aria-label="${esc(SITE.vista.label)}"
                 data-vista-slider
                 data-autoplay-ms="${SITE.vista.autoplayMs}">
          <figure class="home-vista__media" data-motion-curtain>
            <ol class="home-vista__slides">
              ${SITE.vista.slides.map((s, i) => vistaSlide(s, i, SITE.vista.slides.length)).join("")}
            </ol>
            <span class="motion-curtain" aria-hidden="true"></span>

            ${vistaCaptionMarkup(SITE.vista.slides)}

            <div class="home-vista__controls" aria-label="Slider-Steuerung">
              <button type="button"
                      class="home-vista__nav home-vista__nav--prev"
                      data-vista-prev
                      aria-label="Voriges Bild">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>

              <div class="home-vista__dots" role="tablist" aria-label="Bild wählen">
                ${SITE.vista.slides.map((s, i) => `
                  <button type="button"
                          class="home-vista__dot${i === 0 ? " is-active" : ""}"
                          role="tab"
                          id="vista-tab-${i}"
                          aria-controls="vista-slide-${i}"
                          aria-selected="${i === 0 ? "true" : "false"}"
                          tabindex="${i === 0 ? "0" : "-1"}"
                          data-vista-goto="${i}">
                    <span class="visually-hidden">${i + 1}: ${esc(s.season)}</span>
                  </button>
                `).join("")}
              </div>

              <button type="button"
                      class="home-vista__nav home-vista__nav--next"
                      data-vista-next
                      aria-label="Nächstes Bild">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>

              <button type="button"
                      class="home-vista__playpause"
                      data-vista-playpause
                      aria-pressed="false"
                      aria-label="Auto-Wechsel pausieren">
                <svg class="home-vista__icon-pause" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="5" width="4" height="14" rx="1"/>
                  <rect x="14" y="5" width="4" height="14" rx="1"/>
                </svg>
                <svg class="home-vista__icon-play" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>

            <div class="home-vista__progress" aria-hidden="true">
              <span class="home-vista__progress-bar" data-vista-progress></span>
            </div>
          </figure>
        </section>

        <section id="reisefuehrer" class="home-block" aria-labelledby="reisefuehrer-heading" data-etch-element="section">
          <div data-etch-element="container">
            <header class="home-section-head home-section-head--center" data-motion-reveal>
              <p class="home-kicker">${esc(BLOG.kicker)}</p>
              <h2 id="reisefuehrer-heading" class="home-h2 home-h2--center">
                ${esc(BLOG.heading)} <em>${esc(BLOG.headingEm)}</em>
              </h2>
              <p class="home-lead home-lead--narrow">${esc(BLOG.lead)}</p>
              <p class="home-region-kicker" aria-label="Beliebte Ausflugsziele">
                ${regionKicker}
              </p>
            </header>
            <div class="home-journal" data-motion-curtain-group>${posts}</div>
            <p class="home-journal__cta" data-motion-reveal>
              <a class="btn btn--outline" href="${esc(BLOG.ctaHref)}">${esc(BLOG.ctaLabel)} →</a>
            </p>
          </div>
        </section>

        <section id="partner" class="home-block home-block--partner" aria-labelledby="partner-heading" data-etch-element="section">
          <div class="home-partner" data-etch-element="container" data-motion-reveal>
            <a class="home-partner__logo-link" href="${esc(PARTNER_GOLF.contact.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(PARTNER_GOLF.contact.name)} — Website öffnen (öffnet in neuem Tab)">
              <img class="home-partner__logo" src="${esc(PARTNER_GOLF.logo.src)}" alt="${esc(PARTNER_GOLF.logo.alt)}" width="${PARTNER_GOLF.logo.width}" height="${PARTNER_GOLF.logo.height}" loading="lazy" decoding="async" />
            </a>
            <p class="home-kicker">${esc(PARTNER_GOLF.kicker)}</p>
            <h2 id="partner-heading" class="home-h2 home-h2--center">
              ${esc(PARTNER_GOLF.heading)} <em>${esc(PARTNER_GOLF.headingEm)}</em>
            </h2>
            <p class="home-lead home-lead--narrow">${esc(PARTNER_GOLF.lead)}</p>
            <ul class="home-partner__notes" aria-label="Vorteile auf einen Blick">
              ${partnerNotes}
            </ul>
            <p class="home-partner__hint">${esc(PARTNER_GOLF.bookingHint)}</p>
            <p class="home-partner__contact">
              <strong>${esc(partnerContact.name)}</strong>
              <span aria-hidden="true">·</span>
              <span>${esc(partnerContact.address)}</span>
              <span aria-hidden="true">·</span>
              <a href="tel:${esc(partnerContact.phone.replace(/\s+/g, ""))}">${esc(partnerContact.phoneDisplay)}</a>
              <span aria-hidden="true">·</span>
              <a href="${esc(partnerContact.url)}" target="_blank" rel="noopener noreferrer">${esc(partnerContact.urlDisplay)}<span class="visually-hidden"> (öffnet in neuem Tab)</span></a>
            </p>
          </div>
        </section>

      </main>

      ${footerMarkup()}
    </div>
  `;
}
