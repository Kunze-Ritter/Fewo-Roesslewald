/** Gemeinsame URLs & Medien — später in Etch 1:1 übernehmen */
export const SITE = {
  name: "Rösslewald",
  tagline: "Ferienhaus · Hinterzarten",
  bookUrl: "https://fewo-roesslewald.holiduhost.com/",
  hero: {
    rating: "5-Sterne-Ferienhaus",
    title: "Ankommen im Schwarzwald.",
    titleEm: "Durchatmen.",
    lead:
      "Zwei Ferienwohnungen am Rösslewald — ruhig gelegen, mit Bergblick, Sauna und hochwertiger Ausstattung.",
  },
  story: {
    label: "Ferienhaus",
    heading: "Wo der Schwarzwald zu Hause wird",
    body:
      "Zwischen Hinterzarten und Breitnau bieten wir mehr als eine Übernachtung: hochwertige Betten, eine Küche zum Kochen und Balkone, auf denen der Schwarzwald einfach wirken darf.",
  },
  logo: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/cropped-Favicon.png",
  video: {
    src: "/media/Sequenz-02_3.mp4",
    poster: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/1.jpg",
    title: "Rundgang Ferienhaus am Rösslewald",
    kicker: "Rundgang",
    heading: "Schon mal",
    headingEm: "hineinschauen.",
  },
  img: {
    hero: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/1.jpg",
    sonnentau: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/Fewo-Sonnentau.jpg",
    weisstanne: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/Fewo-Weisstanne2.jpg",
    titisee: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/Umgebung2.jpg",
    feldberg: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/4.jpg",
    wandern: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/2.jpg",
    hosts: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/3.jpg",
    gallery: [
      {
        src: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/1.jpg",
        alt: "Ferienhaus am Rösslewald mit Schwarzwald-Blick",
      },
      {
        src: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/2.jpg",
        alt: "Wohnbereich mit gemütlicher Einrichtung",
      },
      {
        src: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/3.jpg",
        alt: "Balkon mit Blick in die Natur",
      },
      {
        src: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/4.jpg",
        alt: "Umgebung und Landschaft bei Hinterzarten",
      },
    ],
  },
};

export const NAV = [
  { label: "Ferienhaus", href: "#ferienhaus" },
  { label: "Ausstattung", href: "#ausstattung" },
  { label: "Wohnungen", href: "#wohnungen" },
  { label: "Umgebung", href: "#umgebung" },
  { label: "Reiseführer", href: "#reisefuehrer" },
  { label: "Kontakt", href: "#kontakt" },
];

export const USPS = [
  { title: "Sauna", desc: "Termin · Gebühr in Gästemappe" },
  { title: "Wallbox", desc: "E-Mobilität" },
  { title: "Konus-Karte", desc: "ÖPNV inklusive" },
  { title: "Bergblick", desc: "Schwarzwald-Feeling" },
  { title: "Ausstattung", desc: "Hochwertig & durchdacht" },
  { title: "Ruhige Lage", desc: "Hinterzarten & Breitnau" },
];

export const APARTMENTS = [
  {
    id: "sonnentau",
    name: "Sonnentau",
    slug: "sonnentau",
    area: "95 m²",
    guests: "2–6 Personen",
    ideal: "Familien & längere Aufenthalte",
    image: SITE.img.sonnentau,
  },
  {
    id: "weisstanne",
    name: "Weißtanne",
    slug: "weisstanne",
    area: "68 m²",
    guests: "2–4 Personen",
    ideal: "Paare & kleine Familien",
    image: SITE.img.weisstanne,
  },
];

export const FEATURES = [
  { title: "Schlafkomfort", desc: "Boxspring 180×200" },
  { title: "Küche", desc: "Induktion, Ofen, Spülmaschine, Nespresso" },
  { title: "Wellness", desc: "Private Sauna (Termin)" },
  { title: "Komfort", desc: "WLAN, Waschmaschine/Trockner" },
  { title: "Winter", desc: "Skischuhtrockner" },
  { title: "E-Mobilität", desc: "Wallbox" },
];

export const REVIEWS = [
  {
    quote:
      "Deutlich weniger Stress – alles da, was man braucht. Super auch mit kleinem Kind.",
    author: "Simone R.",
    context: "Familie · 5 Nächte",
  },
  {
    quote:
      "Mit viel Liebe hergerichtet, tolle Ausstattung – perfekte Basis für Wandern & Feldberg.",
    author: "Pascal N.",
    context: "Paar · Herbst",
  },
  {
    quote:
      "Toller Blick, super Betten, hochwertige Ausstattung – wir kommen gerne wieder.",
    author: "Vera P.",
    context: "Freunde · Winter",
  },
];

/**
 * Reiseführer / Blog-Teaser für die Startseite
 * Quelle: Notion „Hochschwarzwald-Reiseführer (Blog)" — 20 Themen-Plan
 * 3 starke Einstiegs-Themen ausgewählt.
 */
export const BLOG = {
  kicker: "Reiseführer",
  heading: "Hochschwarzwald,",
  headingEm: "in kurzen Geschichten.",
  lead:
    "Tipps für Ausflüge, Touren und Genuss — direkt aus der Region. Damit Sie wissen, was Sie erwartet.",
  ctaLabel: "Alle Artikel im Reiseführer",
  ctaHref: "/reisefuehrer/",
  posts: [
    {
      slug: "hinterzarten-an-einem-tag",
      category: "Ausflüge",
      title: "Hinterzarten an einem Tag",
      excerpt:
        "Die perfekte Route für Erstbesucher — kompakt, ruhig und mit den schönsten Ausblicken.",
      readMinutes: 4,
      image: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/Umgebung2.jpg",
      imageAlt: "Hinterzarten im Hochschwarzwald",
    },
    {
      slug: "feldberg-panorama-touren",
      category: "Wandern",
      title: "Feldberg im Sommer: Panorama-Touren",
      excerpt:
        "Sieben leichte Wege mit großer Wirkung — vom Gipfelblick bis zum stillen Moorwanderpfad.",
      readMinutes: 6,
      image: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/4.jpg",
      imageAlt: "Feldberg mit Panoramablick",
    },
    {
      slug: "konus-karte-erklaert",
      category: "Praktisches",
      title: "Konus-Karte: ÖPNV inklusive",
      excerpt:
        "So nutzen Sie Bus & Bahn im Hochschwarzwald kostenlos — und sparen sich das Parken am Wegrand.",
      readMinutes: 3,
      image: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/2.jpg",
      imageAlt: "Schwarzwaldbahn-Strecke",
    },
  ],
};

export const REGION = [
  {
    title: "Titisee",
    desc: "Spaziergang, See, Cafés.",
    image: SITE.img.titisee,
    alt: "Titisee und Umgebung im Schwarzwald",
  },
  {
    title: "Feldberg",
    desc: "Wandern, Skifahren, Panorama.",
    image: SITE.img.feldberg,
    alt: "Feldberg mit Panoramablick",
  },
  {
    title: "Wandern",
    desc: "Touren für jedes Level.",
    image: SITE.img.wandern,
    alt: "Wanderweg in der Schwarzwald-Natur",
  },
];
