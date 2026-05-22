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
  vista: {
    autoplayMs: 5000,
    label: "Mitten im Hochschwarzwald",
    slides: [
      {
        slug: "hoellentalbahn-ravenna",
        season: "Sommer",
        caption: "Höllentalbahn",
        location: "Ravenna-Viadukt · 5 Min. von Rösslewald",
        alt:
          "Höllentalbahn auf dem Ravenna-Viadukt im Sommer — nahe Hinterzarten",
        width: 1920,
        height: 1263,
      },
      {
        slug: "hoellentalbahn-herbst",
        season: "Herbst",
        caption: "Goldener Hochschwarzwald",
        location: "Höllentalbahn im Nebel · 5 Min. von Rösslewald",
        alt:
          "Höllentalbahn auf der Steinbrücke im Herbstnebel mit goldenem Laub",
        width: 1920,
        height: 1280,
      },
      {
        slug: "hoellentalbahn-winter",
        season: "Winter",
        caption: "Ravennaschlucht-Weihnachtsmarkt",
        location: "Im Advent · 10 Min. von Rösslewald",
        alt:
          "Ravennaschlucht-Weihnachtsmarkt im Schnee unter dem Viadukt der Höllentalbahn",
        width: 1920,
        height: 1282,
      },
      {
        slug: "schwarzwald-nebel",
        season: "Stille",
        caption: "Mystisches Tannenmeer",
        location: "Hochschwarzwald · vor der Haustür",
        alt:
          "Morgennebel zieht durch tiefe Schwarzwald-Tannenwälder",
        width: 1920,
        height: 1277,
      },
    ],
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
  { label: "Wohnungen", href: "#wohnungen" },
  { label: "Ausstattung", href: "#ausstattung" },
  { label: "Reiseführer", href: "/reisefuehrer/" },
  { label: "Aktivitäten", href: "/aktivitaeten/" },
  { label: "Kontakt", href: "#kontakt" },
];

/**
 * Trust-Strip direkt unter dem Hero.
 *
 * Nur Aussagen, die wir verifizieren können — keine Bewertungs-Scores
 * oder Gäste-Zahlen als Platzhalter, weil das beim ersten Live-Gang
 * peinlich werden kann. Sobald wir reale Stats haben (Holidu-Score,
 * Anzahl Bewertungen, Eröffnungsjahr), hier ergänzen.
 */
export const TRUST = [
  {
    label: "5★ DTV-klassifiziert",
    desc: "Deutscher Tourismusverband",
  },
  {
    label: "Konus-Karte inklusive",
    desc: "Bus & Bahn im Hochschwarzwald kostenlos",
  },
  {
    label: "Direktbuchung",
    desc: "Ohne Vermittlungsgebühr",
  },
];

/**
 * Gastgeber-Block in der Ferienhaus-Sektion.
 *
 * Persönlichkeit ist bei Direkt-Vermietung der wichtigste Unterschied
 * zu Booking/Airbnb. Aktuell mit Platzhaltern — name/photo später
 * ersetzen.
 */
export const HOSTS = {
  kicker: "Ihre Gastgeber",
  name: "Familie [Name]",
  intro:
    "Wir betreiben den Rösslewald selbst — kein Hausverwalter, keine Hotline. Wenn Sie hier sind, sind wir hier. Das ist uns wichtig.",
  signature: "— Ihre Gastgeber am Rösslewald",
  /** Foto-Pfad — leer lassen für Platzhalter-Slot, später ergänzen. */
  photo: "",
  photoAlt: "Ihre Gastgeber am Rösslewald",
};

export const APARTMENTS = [
  {
    id: "sonnentau",
    name: "Sonnentau",
    slug: "sonnentau",
    area: "95 m²",
    guests: "2–6 Personen",
    bedrooms: "2 Schlafzimmer · 1 Bad",
    priceFrom: "ab € xxx / Nacht",
    ideal: "Familien & längere Aufenthalte",
    usps: ["Eigener Balkon mit Bergblick", "Boxspring 180×200", "Voll ausgestattete Küche"],
    image: SITE.img.sonnentau,
    detailHref: "/wohnungen/sonnentau/",
  },
  {
    id: "weisstanne",
    name: "Weißtanne",
    slug: "weisstanne",
    area: "68 m²",
    guests: "2–4 Personen",
    bedrooms: "1 Schlafzimmer · 1 Bad",
    priceFrom: "ab € xxx / Nacht",
    ideal: "Paare & kleine Familien",
    usps: ["Ruhige Süd-Lage", "Boxspring 180×200", "Großzügiger Wohn-Essbereich"],
    image: SITE.img.weisstanne,
    detailHref: "/wohnungen/weisstanne/",
  },
];

/**
 * Konsolidierte Ausstattungs-Liste.
 *
 * Ersatz für die früheren USPS + FEATURES — die hatten Doppelungen
 * (Sauna, Wallbox) und die nackten Titel ohne `desc` wirkten generisch.
 * 8 prägnante Punkte, jedes mit klarer Sub-Aussage.
 */
export const AMENITIES = [
  { title: "Schlafkomfort", desc: "Boxspring 180×200" },
  { title: "Küche", desc: "Induktion, Ofen, Spülmaschine, Nespresso" },
  { title: "Sauna", desc: "Im Haus · Termin nach Absprache" },
  { title: "Bergblick", desc: "Balkon mit Schwarzwald-Panorama" },
  { title: "Konus-Karte", desc: "ÖPNV im Hochschwarzwald inklusive" },
  { title: "Wallbox", desc: "Eigene E-Ladestation am Haus" },
  { title: "Komfort", desc: "WLAN, Waschmaschine, Trockner" },
  { title: "Winter", desc: "Skischuhtrockner für nasse Tage" },
];

/**
 * Premium-Partner — Golfclub Hochschwarzwald e.V.
 *
 * Bewusst nicht als generische „Partner-Liste". Aktuell ein einziger
 * Premium-Partner mit konkretem Gäste-Vorteil. Wenn später weitere
 * Partner hinzukommen, sollten sie strukturell separat behandelt werden
 * (z. B. ein Trust-Strip-ähnlicher „Weitere Vorteile"-Block).
 *
 * Inhaltliche Quellen: fewo-roesslewald.de (Original-Block) und
 * gc-hsw.de (Lage, Golfschule, Gastronomie).
 */
export const PARTNER_GOLF = {
  kicker: "Unser Partner",
  heading: "Greenfeefrei golfen",
  headingEm: "am Hochschwarzwald.",
  lead:
    "Als anerkannter Premium-Gastgeber des Golfclubs Hochschwarzwald e.V. spielen unsere Gäste auf der 18-Loch-Anlage „Himmlische Hölle“ ohne Greenfee — ab der ersten Übernachtung, an allen Wochentagen.",
  /** Hero-Bild der Anlage (vom Golfclub geladen, lokal abgelegt). */
  hero: {
    src: "/img/partner-gc-hsw-platz.webp",
    alt: "Golfplatz des GC Hochschwarzwald am Titisee — Fairway mit Schwarzwald-Panorama",
    width: 1920,
    height: 1080,
  },
  /** Drei prägnante Vorteile — kurze Stichpunkte, kein Marketing-Sprech. */
  notes: [
    "Greenfee-frei · Mo–So · keine Tagesbegrenzung",
    "Schnupperkurs & Platzreife mit Golfprofessional vor Ort",
    "Golfstüble mit Sonnenterrasse — auch für Nichtgolfer",
  ],
  bookingHint:
    "Bei der Anmeldung im Sekretariat „Premium-Gastgeber Rösslewald“ angeben.",
  /** Link auf den ausführlichen Activity-Eintrag. */
  detailHref: "/aktivitaeten/golfen-am-hochschwarzwald/",
  detailLabel: "Mehr erfahren",
  /** Vereins-Logo (vom Original gc-hsw.de geladen, lokal abgelegt). */
  logo: {
    src: "/img/partner-gc-hsw.png",
    alt: "Logo Golfclub Hochschwarzwald e.V.",
    width: 96,
    height: 96,
  },
  contact: {
    name: "Golfclub Hochschwarzwald e.V.",
    address: "Oberaltenweg 7, 79822 Titisee-Neustadt",
    phone: "+49 7651 935777",
    phoneDisplay: "07651 / 935777",
    url: "https://www.gc-hsw.de/",
    urlDisplay: "gc-hsw.de",
  },
};

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
