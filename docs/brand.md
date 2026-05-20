# FeWo Rösslewald — Brand & Style Guide (v1, ACSS-ready)

Stand: Neustart visuell · **nur DE** · Umsetzung später in **WordPress + [Etch](https://docs.etchwp.com/) + [Automatic.css 4.x](https://docs.automaticcss.com/)** (Flagship-Integration).

Dieses Dokument listet **normale, runde Werte** zum direkten Eintragen im ACSS-Dashboard. Der Vite-Prototyp nutzt dieselben **Variablennamen** wie ACSS (`--primary`, `--space-m`, `--h1`, …).

**Vorschau im Browser:** `npm run dev` — lädt **`src/styles/acss/automatic.css`** (Kopie vom [WP-Export](https://fewo.tobiashaas.dev/wp-content/uploads/automatic-css/automatic.css)). Nach ACSS-Änderungen: Datei neu exportieren und ersetzen.

**Schriften:** lokal als Variable **woff2** in `public/fonts/` — `src/styles/fonts.css`. Fraunces **latin-ext** (~33 KB), Source Sans 3 **latin** (~28 KB) — **~61 KB gesamt**. In WP dieselben Dateien hochladen.

**Video:** Video.js **v10 beta** (`@videojs/html`), lokales MP4 — siehe **`docs/video-etch.md`**, Sektion `#video` auf der Startseite.

**Fonts im Prototyp:** `main.js` lädt `automatic.css` **vor** `fonts.css`. `fonts.css` setzt `"Source Sans 3"` in Quotes und `font-variation-settings: "wght" 400` (Variable-Font-Default ist sonst 200/ExtraLight).

**Animationen:** Motion (JS) + Motion+ DOM (`splitText`) — siehe **`docs/motion-etch.md`**, Modul `src/motion/init.js`, Attribute `data-motion-*`.

**Legacy:** `src/styles/tokens.css` — nur noch Referenz/Fallback, nicht mehr im Build aktiv.

---

## ACSS-Dashboard — wo was eintragen?

Übersicht: **Menüpunkt im ACSS-Dashboard** → **Abschnitt unten in dieser Datei** → **konkrete Werte**.

| Im ACSS-Dashboard | Was du dort einträgst | Details unten |
|-------------------|------------------------|---------------|
| **Palette › Main Colors** | Primary, Secondary, Base, Neutral (Hex) | [Main Colors](#acss--palette--main-colors) |
| **Palette › Palette Options** | Unified Lightness: **beide aus** | [Unified Lightness](#unified-lightness-palette-options) |
| **Backgrounds & Text › Backgrounds** | Standard-Hintergrund `#F7F5F1` | [Color Assignments](#base-vs-neutral--tauschen) |
| **Backgrounds & Text › Text** | `--text-dark`, `--text-dark-muted` | [Color Assignments](#base-vs-neutral--tauschen) |
| **Typography › Headings** (Tab) | Fraunces, H4 min/max, Scale 1.25, Weight 500 | [Headings](#headings) |
| **Typography › Text** (Tab) | Source Sans 3, Text M min/max, Scale 1.2 | [Text (Body)](#text-body) |
| **Layout › Website Dimensions** | Content Width `1200px`, Min Width `360px` | [Layout](#acss--layout--website-dimensions) |
| **Spacing › Standard Spacing** | Base 24px / 20px, Scale 1.5 | [Spacing](#acss--spacing--standard-spacing) |
| **Borders** | Radius `8px`, Border 1px solid | [Borders](#acss--borders) |
| **Buttons** | Primary-Button nutzt Primary-Farbe (nach Palette) | [Buttons](#acss--buttons-kurz) |

### Body Text & Headings — die wichtigsten Felder

**1. Schriften & Größen (Fluid)** — **Typography** im Dashboard, zwei Tabs:

| Tab | Feld im Dashboard | Wert Rösslewald |
|-----|-------------------|-----------------|
| **Headings** | Font Family | `Fraunces` — Variable **wght**, Subset **latin-ext** (`public/fonts/Fraunces-VariableFont_wght.woff2`) |
| **Headings** | Root Font Size | `100%` |
| **Headings** | Base Heading Size (H4) Min / Max | `20px` / `24px` |
| **Headings** | Type Scale | `1.25` |
| **Headings** | Font Weight (All) | `500` |
| **Headings** | Letter Spacing (All) | `-0.02em` |
| **Headings** | Text Wrap | `pretty` |
| **Headings** | Line Height | Smart Line Height (Default lassen) |
| **Text** | Font Family | `Source Sans 3` — Variable **wght**, Subset **latin** (`public/fonts/SourceSans3-VariableFont_wght.woff2`) |
| **Text** | Base Text Size (M) Min / Max | `16px` / `17px` |
| **Text** | Type Scale | `1.2` |
| **Text** | Font Weight (All) | `400` |
| **Text** | Line Height | Smart Line Height (Default lassen) |

ACSS berechnet daraus automatisch `--h1` … `--h6` und `--text-xs` … `--text-xxl`. Du musst H1/H2 **nicht** einzeln in px eintragen, außer du willst eine Stufe überschreiben.

**2. Textfarbe (Body)** — **Backgrounds & Text › Text**:

| Feld | Eintrag |
|------|---------|
| Default text color | `var(--text-dark)` (ACSS-Standard) |
| Color assigned to `--text-dark` | `var(--base-dark)` oder `var(--base)` |
| Color assigned to `--text-dark-muted` | `var(--neutral-dark)` oder `var(--neutral)` |

**3. Überschriften-Farbe** — optional unter **Typography › Headings › All: Heading Color**:

| Option | Eintrag |
|--------|---------|
| Heading Color | leer lassen (= erbt Body) **oder** `var(--base)` / `var(--text-dark)` |

**4. Seiten-Hintergrund** — **Backgrounds & Text › Backgrounds**:

| Feld | Eintrag |
|------|---------|
| Default background | `#F7F5F1` oder `var(--white)` |

**5. Im Etch / auf der Seite nutzen** (nach ACSS-Setup):

| Element | Klasse / Variable |
|---------|-------------------|
| Fließtext | Standard (Body) oder `var(--text-m)` |
| Überschrift H1 | `<h1>` oder `font-size: var(--h1)` |
| Meta / klein | `var(--text-s)` oder `.text--dark-muted` |
| Link | Primary / ACSS-Link-Styling |

---

## Positionierung

| | |
|---|---|
| **Was** | Ferienhaus am Rösslewald — Sonnentau (95 m², 2–6) & Weißtanne (68 m², 2–4) |
| **Ziel** | Mehr Direktbuchungen, transparente Entscheidungsinfos |
| **Ton** | Ruhig, echt, bodenständig — **Sie**, konkrete Fakten |
| **Nicht** | KI-Landingpage, lila Verläufe, leere „Luxus“-Floskeln |

**Leitbild:** *Nicht höher, schneller, weiter — sondern ruhiger, echter, näher bei sich. Willkommen im Schwarzwald.*

---

## Logo

- **Bleibt** das bestehende Signet (Bäume + Haus): [cropped-Favicon.png](https://fewo-roesslewald.de/wp-content/uploads/2022/09/cropped-Favicon.png)
- **Kein Redesign** — nur sauberer beschneiden/exportieren (SVG/PNG für Header)
- Im Header: Logo + optional Textzeile „Ferienhaus · Hinterzarten“ in `--text-s`

---

## ACSS — Palette › Main Colors

Nur die Rollen aktivieren, die ihr braucht ([Main Colors](https://docs.automaticcss.com/colors/main-colors)). ACSS erzeugt automatisch Shades (ultra-light … ultra-dark, hover); Shades bei Bedarf im Dashboard feinjustieren.

| ACSS-Rolle | Hex (Dashboard) | Rolle bei Rösslewald |
|------------|-----------------|----------------------|
| **Primary** ✅ | `#2F5D4A` | CTAs, Links, „Verfügbarkeit prüfen“, Fokus |
| **Secondary** ✅ | `#8B7355` | Warme Akzente (Holz), sekundäre Buttons, Tags |
| **Tertiary** ⬜ | — | **Aus** (nicht nötig) |
| **Accent** ⬜ | — | **Aus** (selten genug → Secondary reicht) |
| **Base** ✅ | `#1A2320` | Fließtext, Überschriften (dunkle Base auf hellem UI) |
| **Neutral** ✅ | `#6B7280` | Rahmen, Meta, dezente Flächen |

**Hintergrund (warm):** In ACSS über **Base-Shades** / Color Assignments, nicht als eigene „Farbe 7“. Zielton **`#F7F5F1`** — im Dashboard z. B. Base **ultra-light** oder Body-Hintergrund auf `#F7F5F1` setzen, bis es passt.

**Semantic Colors** (Warning, Info, Success, Danger): ACSS-Defaults belassen ([Semantic Colors](https://docs.automaticcss.com/colors/semantic-colors)).

**Nicht übernehmen:** altes WP-Pink `#CC3366`, knalliges Elementor-Grün `#167B35` als Primary.

### Base vs. Neutral — tauschen?

**Nein** — die Hex-Werte **nicht** zwischen Base und Neutral tauschen. In ACSS sind das unterschiedliche Rollen ([Main Colors](https://docs.automaticcss.com/colors/main-colors)):

| Rolle | Dashboard-Seed (bei uns) | Was ACSS daraus macht |
|--------|---------------------------|------------------------|
| **Base** | `#1A2320` (dunkel, leicht warm) | Volle Skala `base-ultra-light` … `base-ultra-dark` — **Standard für Fließtext & UI-Canvas** auf hellem Site |
| **Neutral** | `#6B7280` (Mittelgrau) | Graustufen **von hell bis dunkel** — Rahmen, Meta, dezente Flächen |

**Neutral ist nicht „die eine dunkelste Farbe“.** Neutral ist die **Grauskala** (weiß → schwarz). Am dunkelsten wirkt oft `var(--neutral-ultra-dark)` oder `var(--base-ultra-dark)` — je nach Shade-Einstellung im Dashboard, nicht weil der Neutral-Slot per Definition schwarz ist.

**Base** auf hellen Sites ist laut Doku oft ein **dunkler Seed** für Text *oder* ein **heller Seed** für Hintergründe — wir nutzen den dunklen Seed für lesbaren Haupttext; Hintergrund `#F7F5F1` kommt über **Color Assignments** (Body Background / `bg-ultra-light`), nicht durch Base = Grau zu setzen.

**Color Assignments** ([Background & Text](https://docs.automaticcss.com/color-assignments/background-text-assignments)) — Empfehlung für Rösslewald:

| Kontext | Zuweisung |
|---------|-----------|
| Body-Hintergrund | `#F7F5F1` oder `var(--white)` |
| `--text-dark` (Haupttext) | `var(--base-dark)` oder `var(--base)` |
| `--text-dark-muted` (Meta) | `var(--neutral-dark)` oder `var(--neutral)` |
| Footer / sehr dunkel | `var(--neutral-ultra-dark)` oder `var(--base-ultra-dark)` |

Wenn der Footer wärmer/dunkler sein soll als reines Grau: Shade **Base** oder **Neutral** im Dashboard leicht Richtung `#3D4549` ziehen — nicht die beiden Hauptfarben tauschen.

### Unified Lightness (Palette Options)

| Option | Empfehlung Rösslewald | Warum |
|--------|----------------------|--------|
| **Unify Brand Lightness** | **Aus** | Primary (dunkelgrün), Secondary (Holz) und Base (sehr dunkel für Text) sollen **unterschiedliche** Helligkeit behalten ([Unified Lightness](https://docs.automaticcss.com/colors/unified-lightness)). Mit „An“ würden alle Basis-Swatches dieselbe OKLCH-Lightness (Default 0,65) bekommen — Base wäre nicht mehr sinnvoll als dunkler Text-Seed. |
| **Unify Semantic Lightness** | **Aus** | Success/Warning/Danger sollen als Status erkennbar bleiben; keine Anpassung ans Brand-Gewicht nötig. |
| **Unified Lightness** (Wert) | — | Nur relevant, wenn ein Toggle an ist. |

**Neutral** ist von Unify Brand Lightness nicht betroffen (laut Doku: Primary, Secondary, Tertiary, Accent, Base). Shades (ultra-light … ultra-dark) bleiben ohnehin unangetastet — nur der Basis-Swatch pro Farbe.

---

## ACSS — Layout › Website Dimensions

| Einstellung | Wert | Hinweis |
|-------------|------|---------|
| **Content Width** | `1200px` | Für ACSS-Fluid-Typo/Spacing ([Content Width](https://docs.automaticcss.com/dimension/content-width)); in Etch z. B. `width: min(1200px, 100% - 2rem)` oder `var(--content-width)` |
| **Minimum Width** | `360px` | ACSS-Fluid-Berechnung (Viewport-Untergrenze) |

### Responsive: Etch (keine festen Builder-Breakpoints)

In **Etch** arbeiten wir **nicht** mit festen Breakpoint-Namen wie in Bricks/Oxygen. Stattdessen ([Etch: Responsive Development](https://docs.etchwp.com/responsive-development/)):

1. **Zuerst intrinsisch** — Layout passt sich von selbst an ([Intrinsic Responsiveness](https://docs.etchwp.com/responsive-development/intrinsic-responsiveness)): `min()`, `clamp()`, `aspect-ratio`, Flex/Grid mit `wrap`, ACSS-Fluid-Variablen (`--h1`, `--space-m`, …).
2. **Container Queries** — bevorzugt für Komponenten ([Container Queries](https://docs.etchwp.com/responsive-development/container-queries)): z. B. Karten, Wohnungs-Vergleich, Trust-Leiste reagieren auf **Containerbreite**, nicht nur Viewport.
3. **Media Queries** — nur wenn nötig (z. B. Navigation Mobile, große Layout-Umschaltung).

**ACSS-Breakpoints (XL/L/M/S):** Im ACSS-Dashboard weiter relevant für **Fluid-Typografie/Spacing** und ggf. SCSS `@include breakpoint()`. In Etch müssen sie **nicht** 1:1 als Builder-Breakpoints gespiegelt werden — dort Queries nach Bedarf schreiben.

**Orientierung** (nur wenn du eine Media Query brauchst, nicht als Pflicht-Matrix):

| Situation | Ca. Viewport |
|-----------|----------------|
| Enges Phone | `< 480px` |
| Phone / kleines Tablet | `480px – 767px` |
| Tablet | `768px – 991px` |
| Desktop | `≥ 992px` |
| Wide (optional) | `≥ 1200px` (= Content Width) |

---

## ACSS — Spacing › Standard Spacing

([Standard Spacing Setup](https://docs.automaticcss.com/spacing/standard-spacing-setup))

| Einstellung | Desktop | Mobile | Empfehlung |
|-------------|---------|--------|------------|
| **Base Spacing** | `24px` | `20px` | = `--space-m` |
| **Base Scale** | `1.5` | `1.5` | Klassische Staffelung |
| **Desktop / Mobile Ratio** | Default | Default | Erst Default testen, dann feinjustieren |

**T-Shirt-Größen** (Variablen): `var(--space-xs)` … `var(--space-xxl)` — [Spacing Variables](https://docs.automaticcss.com/spacing/spacing-variables).

| Größe | Ca. Wert bei Base 24px / Scale 1.5 |
|-------|-------------------------------------|
| xs | ~11px |
| s | ~16px |
| **m** | **24px** |
| l | ~36px |
| xl | ~54px |
| xxl | ~81px |

**Sektionen:** `var(--section-space-m)` Standard, Hero `var(--section-space-xl)` oder `var(--section-space-l)`. Gutter: `var(--gutter)`.

---

## ACSS — Typography

([Default Typography](https://docs.automaticcss.com/typography/default-typography-styling) · [Variables](https://docs.automaticcss.com/typography/typography-variables))

### Headings

| Einstellung | Wert |
|-------------|------|
| **Root Font Size** | `100%` (16px) |
| **Font Family** | **Fraunces**, serif |
| **Base Heading Size (H4)** | Min `20px` · Max `24px` (fluid) |
| **Type Scale** | `1.25` (Desktop & Mobile) |
| **Font Weight** | `500` |
| **Letter Spacing** | `-0.02em` |
| **Text Wrap** | `pretty` (ACSS-Default) |
| **Line Height** | Smart Line Height (Default) |

Fluid-Größen erzeugt ACSS als `--h1` … `--h6`. Orientierung H1 auf Desktop ~`48–52px` (über Scale, nicht manuell clampen).

### Text (Body)

| Einstellung | Wert |
|-------------|------|
| **Font Family** | **Source Sans 3**, sans-serif |
| **Base Text Size (M)** | Min `16px` · Max `17px` |
| **Type Scale** | `1.2` |
| **Font Weight** | `400` |
| **Line Height** | Smart Line Height (Default) |

Fließtext = `var(--text-m)`. Klein = `var(--text-s)`, Meta = `var(--text-xs)`.

---

## ACSS — Borders

([Global Border System](https://docs.automaticcss.com/borders-dividers/global-border-system))

| Einstellung | Wert |
|-------------|------|
| **Global Border Radius** `var(--radius)` | `8px` |
| **Border Width** | `1px` |
| **Border Style** | `solid` |
| **Border Color (light)** | Neutral-Shade / `#E5E2DC` |

Karten/Buttons: `border-radius: var(--radius)`.

---

## ACSS — Buttons (Kurz)

Primary-Buttons = **Primary**-Farbe ([Button Styling](https://docs.automaticcss.com/buttons/button-styling)): Klasse `.btn--primary`, Text weiß, Radius `var(--radius)`.

| Variante | ACSS / Klasse |
|----------|----------------|
| Haupt-CTA | `.btn--primary` |
| Sekundär | `.btn--secondary` oder Outline Primary |

---

## Bildsprache

1. Außen: weißes Haus, Solar, Balkone  
2. Innen: Holz, Weiß, echte Polsterfarben nur in Fotos  
3. Grundriss Sonnentau auf Wohnungsseite  
4. Keine Stock-Alpen

---

## Etch + ACSS (Workflow)

| Thema | Empfehlung |
|--------|------------|
| **Setup** | [ACSS mit Etch einrichten](https://docs.automaticcss.com/setup/builder-configuration/etch) · [Etch-Doku](https://docs.etchwp.com/) |
| **Content Width** | ACSS `1200px`; in Etch Container z. B. `.content-width` oder `min(var(--content-width), 100%)` |
| **Variablen** | ACSS-Tokens (`--primary`, `--space-m`, …) in Etch Style Manager / Custom CSS |
| **Komponenten** | Wiederverwendbare Etch-Komponenten (Header, Wohnungskarte, CTA-Band) mit Container Queries |
| **Kein Bricks** | Breakpoint-Mapping Bricks ↔ ACSS entfällt |

---

## Buchung (Holidu)

„Verfügbarkeit prüfen“ → [fewo-roesslewald.holiduhost.com](https://fewo-roesslewald.holiduhost.com/) (eingebetteter Kalender auf der Live-`/buchen`-Seite). In WP/Etch: Embed beibehalten, Styling drumherum über ACSS.

---

## Mapping Prototyp ↔ ACSS

| Prototyp / Zweck | ACSS-Variable / Klasse |
|------------------|-------------------------|
| Primärfarbe | `--primary`, `--primary-hover` |
| Holz-Akzent | `--secondary` |
| Text | `--base` / Text-Color Assignments |
| Hintergrund | Base ultra-light / Body-Assignment → `#F7F5F1` |
| Abstand Standard | `var(--space-m)` |
| Sektion | `var(--section-space-m)` |
| Überschrift | `var(--h1)` … `var(--h6)` |
| Fließtext | `var(--text-m)` |
| Max. Breite | `var(--content-width)` · Klasse `.content-width` |

---

## Nächste Schritte

1. ✅ ACSS im Dashboard eingetragen  
2. ✅ `src/styles/acss/automatic.css` (WP-Export) im Prototyp  
3. Brand-Vorschau: `npm run dev`  
4. ✅ Startseite lokal: `src/pages/home.js` · `npm run dev`  
5. Weitere Seiten + Etch-Umsetzung

### ACSS-Export aktualisieren

1. Im WP/ACSS CSS neu generieren lassen  
2. URL öffnen: https://fewo.tobiashaas.dev/wp-content/uploads/automatic-css/automatic.css  
3. Inhalt nach `src/styles/acss/automatic.css` kopieren (nur CSS, ohne Markdown-Kopf)
