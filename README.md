# Ferienhaus am Rösslewald

Vite-Prototyp für die neue Website von **Ferienhaus am Rösslewald** in
Hinterzarten / Breitnau im Hochschwarzwald — zwei Ferienwohnungen mit
Bergblick, Sauna und Direktbuchung.

Der Prototyp validiert Inhalt, Layout, Animationen und Schema-Auszeichnung,
bevor das Ganze in **WordPress + [Etch](https://docs.etchwp.com/) +
[Automatic.css](https://docs.automaticcss.com/)** umgezogen wird. Markup,
Klassenstruktur und ACSS-Token-Namen sind so gewählt, dass eine spätere
1:1-Übernahme als Etch-Templates möglich ist.

**Live-Original:** [fewo-roesslewald.de](https://fewo-roesslewald.de)

## Stack

- **Vite 8** — Dev-Server & Build
- **Vanilla JS** — kein Framework; lightweight SPA-Router auf Basis der History-API
- **Automatic.css 4.x** — Design-Tokens (`src/styles/acss/automatic.css`,
  identisch mit dem WP-Export)
- **Motion + Motion+ DOM** — `data-motion-*`-Attribute für Scroll-Reveals,
  Curtain-Effekte, Stagger und SplitText
- **Video.js 10 beta** — lokales MP4, siehe `docs/video-etch.md`
- **Leaflet + OpenStreetMap** — Karten auf Aktivitäts-Detailseiten (lazy)

## Quick Start

```bash
npm install
npm run dev      # http://localhost:5173 (oder nächster freier Port)
npm run build    # Production-Build nach ./dist
npm run preview  # Preview des Builds
```

## Routen (SPA)

| Pfad                          | Beschreibung                                 |
|-------------------------------|----------------------------------------------|
| `/`                           | Startseite (Hero, Trust, Ferienhaus, Wohnungen, Video, Ausstattung, Bewertungen, Vista-Slider, Reiseführer, Golf-Partner, CTA) |
| `/reisefuehrer/`              | Blog-Archiv (Magazin-Layout mit Featured + Pagination) |
| `/reisefuehrer/:slug/`        | Blog-Einzelartikel (Hero + Sticky-Box)       |
| `/aktivitaeten/`              | Aktivitäten-Archiv (Magazin-Layout)          |
| `/aktivitaeten/:slug/`        | Aktivitäts-Detail mit Leaflet-Karte          |
| _alles andere_                | 404                                          |

Router siehe `src/router.js` — Routes sind als Path-Pattern mit
`:slug`-Parametern definiert, Links werden global abgefangen und ohne
Page-Reload gerendert.

## Projektstruktur

```
src/
  data/              # Single Source of Truth (später WP-CPTs / ACF)
    site.js          # Site-Inhalte, Navigation, Apartments, Partner
    blog.js          # Reiseführer-Posts (Block-Content)
    activities.js    # Aktivitäten + Koordinaten
  pages/             # Pro Route eine render()-Funktion
    home.js
    blog-archive.js
    blog-single.js
    activities-archive.js
    activities-single.js
    not-found.js
  components/
    chrome.js        # Header, Footer, Skip-Link, Meta/Canonical/Schema
    content-blocks.js# Block-Renderer (heading/paragraph/image/list/callout/quote)
    vista-slider.js  # Schwarzwald-Slider
  motion/init.js     # Alle Motion-Initialisierungen (zentral)
  media/video.js     # Video.js-Setup
  styles/
    acss/automatic.css  # ACSS-Export (Token-Quelle)
    home.css, blog.css, activities.css, motion.css, video.css, …
  router.js          # History-API-SPA-Router
  main.js            # Entry
docs/                # brand.md, motion-etch.md, video-etch.md
public/              # Statische Assets (Bilder, Fonts, Video)
```

## Datenmodell

Alle Inhalte leben in `src/data/`. Diese Module sind bewusst so geschnitten,
dass sie später als WordPress-CPT-Loops gerendert werden können:

- **`site.js`** → ACF-Optionsseite + Theme-Settings
- **`blog.js`** → CPT `reisefuehrer`
- **`activities.js`** → CPT `aktivitaeten` (mit `coordinates` für die Karte)

Posts/Aktivitäten verwenden ein **Block-Content-Schema**
(`heading`, `paragraph`, `image`, `list`, `callout`, `quote`), das von
`renderBlocks()` zu HTML expandiert wird — analog zum späteren
Gutenberg/Etch-Block-Output.

## Magazin-Pattern (Archive)

Archive-Listen nutzen **einheitliches Card-Markup** (`<article class="blog-card">`)
für *alle* Items. Das Featured-Verhalten (erstes Item voll-breit, 2-Spalten innen,
größere Type, sichtbares CTA) wird ausschließlich per Container-Modifier
`.blog-grid--magazine > :first-child` aktiviert — keine Modifier-Klasse am
einzelnen Item. So genügt im WP-Theme ein einziges `loop-card.php` ohne
`if ($i === 0)`-Verzweigung.

## Motion / Animationen

Zentral in `src/motion/init.js`. Wird nach jedem Route-Render neu
initialisiert. Reduzierte Bewegung (`prefers-reduced-motion`) respektiert.

| Attribut                  | Effekt                                            |
|---------------------------|---------------------------------------------------|
| `data-motion-intro`       | Hero-Intro (Stagger fade+rise)                    |
| `data-motion-reveal`      | Scroll-getriggertes Reveal                        |
| `data-motion-curtain`     | Bild-Reveal mit „Vorhang"-Wisch                   |
| `data-motion-curtain-group` | Stagger über Curtain-Kinder                     |
| `data-motion-split`       | Heading per Wort/Char animieren (Motion+ DOM)     |

Details: `docs/motion-etch.md`.

## SEO & Strukturierte Daten

- Dynamische `<title>`, `<meta name="description">`, `<link rel="canonical">`
  pro Route (`setPageMeta`, `setCanonical` in `components/chrome.js`)
- JSON-LD je Routentyp: `BlogPosting`, `TouristAttraction`, `ItemList`,
  `BreadcrumbList`
- Heading-Hierarchie pro Seite einzeln korrekt (eine `<h1>` pro Route)

## WordPress-Migration (Plan)

| Vite-Prototyp                    | WordPress / Etch                          |
|----------------------------------|-------------------------------------------|
| `src/data/site.js`               | ACF Optionsseite                          |
| `src/data/blog.js`               | CPT `reisefuehrer` + Felder               |
| `src/data/activities.js`         | CPT `aktivitaeten` + Felder + Map-Lat/Lng |
| `src/pages/blog-archive.js`      | `archive-reisefuehrer.php` (Etch-Loop)    |
| `src/pages/blog-single.js`       | `single-reisefuehrer.php`                 |
| `src/pages/activities-*`         | analog für Aktivitäten                    |
| `src/components/chrome.js`       | `header.php` + `footer.php`               |
| ACSS-Tokens (`automatic.css`)    | ACSS-Dashboard (Werte identisch)          |
| Motion-Init (`motion/init.js`)   | Eigenes Theme-JS-Bundle                   |

## Weiterführende Dokumentation

- [`docs/brand.md`](docs/brand.md) — Farben, Typografie, Spacing, ACSS-Mapping
- [`docs/motion-etch.md`](docs/motion-etch.md) — Motion-Attribute & Übernahme nach Etch
- [`docs/video-etch.md`](docs/video-etch.md) — Video.js-Setup & WP-Übernahme

## Lizenz

Privates Projekt — alle Inhalte (Texte, Bilder, Markenelemente) gehören
Familie Rösslewald. Code-Basis intern.
