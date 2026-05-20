# Motion + Motion+ DOM — Etch-Übernahme

Lokal nutzen wir **vanilla JavaScript** (kein React):

| Paket | Rolle |
|--------|--------|
| [`motion`](https://motion.dev) | `animate`, `inView`, `stagger`, `scroll` |
| [`motion-plus-dom`](https://motion.dev/docs/split-text) | `splitText` (Motion+), optional `scrambleText` |

Installiert in `package.json`. In **Etch** dasselbe per npm oder gebündeltes Script einbinden.

## Start im Projekt

```javascript
import { initPageAnimations } from "./motion/init.js";

// Nach dem Rendern der Seite:
initPageAnimations(document);
```

## Data-Attribute (Markup-Konvention)

| Attribut | Effekt |
|----------|--------|
| `data-motion-header` | Header fade-in beim Laden |
| `data-motion-hero-title` | `splitText` + Zeichen-Stagger (Motion+) |
| `data-motion-hero-lead` | Fade-up nach Titel |
| `data-motion-hero-actions` | Buttons gestaffelt |
| `data-motion-hero-media` | Bild fade + leichter Scroll-Parallax |
| `data-motion-reveal` | Fade-up beim Scrollen ins Viewport |
| `data-motion-stagger` | Direkte Kinder gestaffelt (USP, Features, Reviews, …) |
| `data-motion-reveal-scale` | Fade + leichter Scale (Wohnungskarten, Region) |

## CSS

Initialzustände nur bei `prefers-reduced-motion: no-preference` — siehe `src/styles/motion.css`.

Split-Zeichen: Klasse `.motion-char` (inline-block).

## Etch Checkliste

1. `motion` + `motion-plus-dom` installieren (Motion+ Mitgliedschaft für volle Docs/Support; `motion-plus-dom` ist auf npm).
2. Custom Script: `initPageAnimations()` nach DOM-Ready.
3. Gleiche `data-motion-*` Attribute an Etch-Komponenten setzen.
4. `prefers-reduced-motion` respektieren (bereits in `init.js`).

## Weitere Motion+ APIs (optional)

- `scrambleText(selector, { duration: 1 })` — Akzent-Texte
- `wheel(element, { onSwipe })` — Karussell per Rad

Dokumentation: https://motion.dev/docs
