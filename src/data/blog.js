/**
 * Reiseblog — Datenmodell für den Custom-Post-Type "reisefuehrer".
 *
 * Inhalte als Block-Struktur, weil das später in Etch/Gutenberg
 * problemlos abgebildet werden kann. Renderer in `pages/blog-single.js`
 * kennt nur diese Block-Typen — neue Typen brauchen dort einen Case.
 *
 * Schema je Eintrag:
 *  - slug:      URL-Slug (= WP-Slug)
 *  - title:     H1
 *  - excerpt:   1-Satz-Teaser für Archiv & Meta-Description
 *  - category:  String — gleiches Vokabular wie WP-Taxonomy
 *  - readMinutes: Lesezeit (vorerst manuell)
 *  - publishedAt / updatedAt: ISO-Date (YYYY-MM-DD)
 *  - hero:      { src, alt, width?, height? }
 *  - highlights: 3 Bullet-Points für die Sticky-„Auf-einen-Blick"-Box
 *  - author:    { name }
 *  - content:   Array von Blocks (heading | paragraph | image | list |
 *               callout | quote)
 */

export const BLOG_CATEGORIES = [
  { slug: "ausfluege", label: "Ausflüge" },
  { slug: "wandern", label: "Wandern" },
  { slug: "praktisches", label: "Praktisches" },
  { slug: "genuss", label: "Genuss" },
];

export const BLOG_INDEX = {
  kicker: "Reiseführer",
  heading: "Hochschwarzwald,",
  headingEm: "in kurzen Geschichten.",
  lead:
    "Tipps für Ausflüge, Touren und Genuss — direkt aus der Region. So wissen Sie schon vor der Anreise, was Sie erwartet.",
};

export const BLOG_POSTS = [
  {
    slug: "hinterzarten-an-einem-tag",
    title: "Hinterzarten an einem Tag",
    excerpt:
      "Die perfekte Route für Erstbesucher — kompakt, ruhig und mit den schönsten Ausblicken.",
    category: "ausfluege",
    featured: true,
    readMinutes: 4,
    publishedAt: "2025-09-12",
    updatedAt: "2025-11-04",
    hero: {
      src: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/Umgebung2.jpg",
      alt: "Hinterzarten im Hochschwarzwald — Panorama-Blick vom Adlerweg",
    },
    highlights: [
      "Start am Park-Café · 09:30 Uhr",
      "Skisprungschanze + Adlerweg (≈ 2 Std.)",
      "Heimweg über das Schwarzwaldhaus-Museum",
    ],
    author: { name: "Familie [Name]" },
    content: [
      {
        type: "paragraph",
        text:
          "Wer das erste Mal in Hinterzarten ist, fragt sich oft: Was muss ich gesehen haben, ohne den Tag mit Auto-Etappen zu verbringen? Diese Route lässt sich komplett zu Fuß und mit der Konus-Karte erkunden — und gibt einen ehrlichen Eindruck vom Schwarzwald, wie er hier wirklich ist.",
      },
      { type: "heading", level: 2, text: "Vormittag: Ortskern & Schanze" },
      {
        type: "paragraph",
        text:
          "Starten Sie am Park-Café direkt am Kurpark. Der Spaziergang am Rothausbach entlang führt in wenigen Minuten zur Adler-Schanze — der Geburtsstätte vieler Olympia-Sieger. Auch ohne Sprung-Event lohnt der Aufstieg auf den Aussichtsturm: oben sehen Sie über die Tannen bis zum Feldberg.",
      },
      {
        type: "callout",
        title: "Konus-Tipp",
        text:
          "Mit Ihrer Konus-Karte fahren Bus und Bahn im Hochschwarzwald kostenlos — Karte beim Check-in bei uns abholen.",
      },
      { type: "heading", level: 2, text: "Mittag: Einkehr im Hof" },
      {
        type: "paragraph",
        text:
          "Zum Mittag empfiehlt sich der Wiesenhof am Ortsrand — ein Bauernhof-Café mit hofeigenen Kuchen und einer kleinen, ehrlichen Karte. Reservierung am Wochenende sinnvoll, unter der Woche reicht spontaner Besuch.",
      },
      { type: "heading", level: 2, text: "Nachmittag: Adlerweg & Museum" },
      {
        type: "paragraph",
        text:
          "Der Adlerweg ist die ruhige Variante des Premiumwegs — knapp zwei Stunden, kaum Höhenmeter, und mit Blick-Plattformen, die Sie zum Stehenbleiben zwingen. Wer noch Lust hat, schließt mit dem Schwarzwaldhaus-Museum ab: kleines Open-Air-Museum, das den Alltag vor hundert Jahren zeigt.",
      },
      {
        type: "list",
        items: [
          "Empfohlene Schuhe: leichte Wanderschuhe genügen",
          "Beste Zeit: Mai bis Oktober",
          "Anreise: Bus 7300 ab Hinterzarten Bf",
        ],
      },
    ],
  },
  {
    slug: "feldberg-panorama-touren",
    title: "Feldberg im Sommer: Panorama-Touren",
    excerpt:
      "Sieben leichte Wege mit großer Wirkung — vom Gipfelblick bis zum stillen Moorpfad.",
    category: "wandern",
    featured: false,
    readMinutes: 6,
    publishedAt: "2025-07-22",
    updatedAt: "2025-09-01",
    hero: {
      src: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/4.jpg",
      alt: "Feldberg im Sommer mit weitem Panorama über den Schwarzwald",
    },
    highlights: [
      "Gipfelweg: 8 km · 2,5 Std. · leicht",
      "Anfahrt: 20 Min. ab Rösslewald",
      "Bahnticket inklusive Konus-Karte",
    ],
    author: { name: "Familie [Name]" },
    content: [
      {
        type: "paragraph",
        text:
          "Der Feldberg ist mit 1.493 m der höchste Berg des Schwarzwalds — und einer der unterschätztesten. Im Winter denken die meisten an Ski, im Sommer ist hier oben angenehme Kühle, leichte Wege und eine Aussicht, die bei klarem Wetter bis zu den Alpen reicht.",
      },
      { type: "heading", level: 2, text: "Der Klassiker: Gipfelrunde" },
      {
        type: "paragraph",
        text:
          "Die Gipfelrunde startet am Haus der Natur, geht über den Bismarckdenkmal-Turm und zurück über die Todtnauer Hütte. 8 km, 250 Höhenmeter, gut 2,5 Stunden. Familientauglich — auch mit Geländekinderwagen machbar bis zum Gipfelplateau.",
      },
      { type: "heading", level: 2, text: "Für Ruhesucher: Wichtelpfad-Moor" },
      {
        type: "paragraph",
        text:
          "Wer den Trubel am Gipfel meiden will, startet stattdessen vom Bärental-Bahnhof und folgt dem Moorpfad. Drei Stunden, fast immer schattig, und ein Stück Schwarzwald, das wie aus dem Märchenbuch wirkt — Hochmoor mit Wollgras, knorrige Bergkiefern, Stille.",
      },
      {
        type: "callout",
        title: "Hinweis",
        text:
          "Im Sommer wird der Feldberg nachmittags voll. Wer früh startet (vor 09:00 Uhr), hat den schönsten Teil der Tour fast für sich.",
      },
      { type: "heading", level: 2, text: "Anreise mit der Konus-Karte" },
      {
        type: "paragraph",
        text:
          "Ab Hinterzarten fährt die Dreiseenbahn direkt zum Bahnhof Feldberg-Bärental — entspannter geht's nicht, und das Auto bleibt bei uns am Haus.",
      },
    ],
  },
  {
    slug: "konus-karte-erklaert",
    title: "Konus-Karte: ÖPNV im Hochschwarzwald inklusive",
    excerpt:
      "So nutzen Sie Bus & Bahn kostenlos — und sparen sich das Parken am Wegrand.",
    category: "praktisches",
    featured: false,
    readMinutes: 3,
    publishedAt: "2025-06-14",
    updatedAt: "2025-10-11",
    hero: {
      src: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/2.jpg",
      alt: "Schwarzwaldbahn-Strecke durch den Hochschwarzwald",
    },
    highlights: [
      "Gültig 1 Tag pro Übernachtung",
      "Alle Busse + Bahn im Hochschwarzwald",
      "Karte bei Anreise an der Haustür",
    ],
    author: { name: "Familie [Name]" },
    content: [
      {
        type: "paragraph",
        text:
          "Die Konus-Karte ist einer der besten Gründe, im Hochschwarzwald nicht alles mit dem Auto zu erkunden. Sie erhalten sie als unser Gast automatisch — ohne Aufpreis, ohne Antrag.",
      },
      { type: "heading", level: 2, text: "Was Sie damit machen können" },
      {
        type: "list",
        items: [
          "Alle Linienbusse im Hochschwarzwald — Hinterzarten, Titisee, Feldberg, Freiburg-Umland",
          "Dreiseenbahn (Hinterzarten → Feldberg → Schluchsee)",
          "Höllentalbahn bis Freiburg Hbf",
          "Bergbahnen am Feldberg im Sommer (Seilbahn)",
        ],
      },
      { type: "heading", level: 2, text: "Was Sie nicht damit machen können" },
      {
        type: "paragraph",
        text:
          "ICE und IC-Züge sind ausgenommen, ebenso Fernbusse. Innerhalb von Freiburg gilt der normale RVF-Tarif — die Konus-Karte deckt den Weg bis Freiburg Hbf, in der Stadt selbst zahlen Sie regulär.",
      },
      {
        type: "callout",
        title: "Praktischer Tipp",
        text:
          "Wenn Sie bei uns ankommen, ist die Karte in Ihrem Welcome-Ordner im Apartment. Wir aktivieren sie morgens beim Frühstück — sodass Sie direkt loslegen können.",
      },
    ],
  },
  {
    slug: "ravennaschlucht-genuss-tour",
    title: "Ravennaschlucht: Genuss-Tour mit Mühle und Brücke",
    excerpt:
      "90 Minuten Spaziergang, ein Wasserfall, eine Mühle — und zur Belohnung Kuchen.",
    category: "genuss",
    featured: false,
    readMinutes: 5,
    publishedAt: "2025-05-30",
    updatedAt: "2025-09-22",
    hero: {
      src: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/3.jpg",
      alt: "Ravennaschlucht mit Viadukt und Bach im Hochschwarzwald",
    },
    highlights: [
      "Rundweg: 4,5 km · 90 Min. · leicht",
      "Hofgut Sternen + Große Ravennabrücke",
      "Im Advent: Weihnachtsmarkt unter dem Viadukt",
    ],
    author: { name: "Familie [Name]" },
    content: [
      {
        type: "paragraph",
        text:
          "Die Ravennaschlucht ist das Stück Schwarzwald, das jeder schon mal auf Postkarten gesehen hat — eine schmale Schlucht, durch die ein Wildbach rauscht, überspannt vom monumentalen Eisenbahn-Viadukt der Höllentalbahn. Was viele nicht wissen: es ist ein einfacher Rundweg, den auch Großeltern mit Enkeln gut schaffen.",
      },
      { type: "heading", level: 2, text: "Die Runde" },
      {
        type: "paragraph",
        text:
          "Start am Hofgut Sternen (Parkplatz oder Bushaltestelle „Höllsteig“). Der Weg führt erst entlang des Baches in die Schlucht hinein, vorbei an der historischen Großjockenmühle — die im Sommer regelmäßig vorgeführt wird. Über die kleine Ravennabrücke geht's auf der anderen Bachseite zurück.",
      },
      { type: "heading", level: 2, text: "Einkehr & Atmosphäre" },
      {
        type: "paragraph",
        text:
          "Das Hofgut Sternen ist mehr als nur Gastronomie — eine kleine Schwarzwaldwelt mit Glasbläserei, Schinkenräucherei und Café. Der Schwarzwälder Kirsch-Kuchen ist hier so gut, dass er ein guter Grund ist, die Tour überhaupt zu machen.",
      },
      {
        type: "callout",
        title: "Geheimtipp",
        text:
          "Im Advent verwandelt sich die Schlucht in einen romantischen Weihnachtsmarkt — direkt unter dem Viadukt, bei Schneefall fast kitschig schön. Tickets rechtzeitig online sichern.",
      },
      {
        type: "quote",
        text:
          "Der Schwarzwald in Reinform — eine Stunde Gehen, hundert Jahre Eisenbahn-Romantik.",
        attribution: "Pascal N., Gast 2024",
      },
    ],
  },
];

/**
 * Liefert einen Post per Slug — oder `null`, wenn nicht gefunden.
 * Wird im Router-Match verwendet.
 */
export function getBlogPost(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

/**
 * Label-Lookup für Kategorie-Pills.
 */
export function getBlogCategoryLabel(slug) {
  return BLOG_CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

/**
 * „Verwandte Posts" — gleiche Kategorie zuerst, sonst nächste in der
 * Liste. Liefert max. 3, exklusive den aktuellen.
 */
export function getRelatedPosts(currentSlug, limit = 3) {
  const current = getBlogPost(currentSlug);
  if (!current) return [];
  const sameCategory = BLOG_POSTS.filter(
    (p) => p.slug !== currentSlug && p.category === current.category,
  );
  const others = BLOG_POSTS.filter(
    (p) => p.slug !== currentSlug && p.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
