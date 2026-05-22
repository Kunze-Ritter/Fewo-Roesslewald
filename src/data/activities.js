/**
 * Aktivitäten — Datenmodell für den Custom-Post-Type "aktivitaet".
 *
 * Anders als Blog-Posts haben Aktivitäten:
 *  - geografische Koordinaten (für Leaflet-/Etch-Map)
 *  - distanceKm / travelMinutes ab Rösslewald
 *  - season[] (mehrfach), duration, difficulty (wo sinnvoll)
 *  - practicalInfo (Adresse, Parken, Kosten)
 *
 * Sonst gleiche Block-Content-Struktur wie Blog — der gemeinsame
 * Renderer im Single-Template kommt mit beiden klar.
 *
 * Koordinaten-Quelle: OpenStreetMap (Nominatim-Such-Ergebnisse, manuell
 * verifiziert).
 */

export const ACTIVITY_CATEGORIES = [
  { slug: "wandern", label: "Wandern" },
  { slug: "see", label: "See" },
  { slug: "kultur", label: "Kultur" },
  { slug: "genuss", label: "Genuss" },
  { slug: "sport", label: "Sport" },
];

/** Anker-Koordinaten Rösslewald / Hinterzarten — Map-Default-Center. */
export const ROESSLEWALD_COORDS = { lat: 47.9069, lng: 8.0972 };

export const ACTIVITIES_INDEX = {
  kicker: "Aktivitäten",
  heading: "Was Sie",
  headingEm: "vor der Haustür erwartet.",
  lead:
    "Wandern, Schwimmen, Skifahren, Genießen — der Hochschwarzwald liefert für jede Jahreszeit. Unsere Auswahl ist persönlich, nicht touristisch.",
};

export const ACTIVITIES = [
  {
    slug: "feldberg-gipfeltour",
    title: "Feldberg-Gipfeltour",
    excerpt:
      "Höchster Punkt des Schwarzwalds — bei klarem Wetter Blick bis zu den Alpen.",
    category: "wandern",
    featured: true,
    hero: {
      src: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/4.jpg",
      alt: "Feldberg-Gipfel mit Panorama über den Hochschwarzwald",
    },
    coordinates: { lat: 47.8728, lng: 8.0042 },
    distanceKm: 12,
    travelMinutes: 20,
    duration: "2,5 Std.",
    difficulty: "Leicht",
    season: ["Frühjahr", "Sommer", "Herbst"],
    highlights: [
      "8 km Rundweg · 250 Hm",
      "Familientauglich bis Gipfelplateau",
      "Anfahrt mit Konus-Karte gratis",
    ],
    practicalInfo: {
      address: "Haus der Natur, 79868 Feldberg (Schwarzwald)",
      parking: "Großer P+R am Haus der Natur, kostenpflichtig",
      bestTime: "Mai bis Oktober · früh morgens am leersten",
      transit: "Dreiseenbahn → Bärental → Bus 7300 zum Haus der Natur",
    },
    content: [
      {
        type: "paragraph",
        text:
          "Der Feldberg ist der höchste Berg außerhalb der Alpen — und trotzdem familientauglich. Die klassische Gipfelrunde startet am Haus der Natur, führt über den Bismarckdenkmal-Turm und kommt über die Todtnauer Hütte zurück.",
      },
      {
        type: "list",
        items: [
          "Strecke: 8 km · 250 Höhenmeter",
          "Gehzeit: ca. 2,5 Stunden",
          "Schwierigkeit: leicht, gut markiert",
          "Einkehr: Todtnauer Hütte (Mitte der Tour)",
        ],
      },
      { type: "heading", level: 2, text: "Was Sie sehen" },
      {
        type: "paragraph",
        text:
          "Bei klarem Wetter reicht der Blick vom Gipfelplateau bis zu den Schweizer und französischen Alpen. Im Vordergrund liegen Titisee und Schluchsee, der Rheingraben mit Freiburg, dahinter die Vogesen.",
      },
      {
        type: "callout",
        title: "Anreise-Tipp",
        text:
          "Mit der Dreiseenbahn ab Hinterzarten — Sie fahren mit Konus-Karte gratis und sparen sich die Parkgebühr (5 €/Tag).",
      },
    ],
  },
  {
    slug: "titisee-rundgang",
    title: "Titisee — Rundweg & Cafés",
    excerpt:
      "Spaziergang am See, Tretboot, Café — Klassiker mit Souvenir-Charakter.",
    category: "see",
    featured: false,
    hero: {
      src: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/Umgebung2.jpg",
      alt: "Titisee mit Promenade und Bergblick",
    },
    coordinates: { lat: 47.9012, lng: 8.1463 },
    distanceKm: 8,
    travelMinutes: 12,
    duration: "1,5–3 Std.",
    difficulty: "Leicht",
    season: ["Frühjahr", "Sommer", "Herbst", "Winter"],
    highlights: [
      "6 km Seerundweg · komplett eben",
      "Tretboote, Sauna, Schwimmbad",
      "Mit Bahn 4 Min. ab Hinterzarten",
    ],
    practicalInfo: {
      address: "Strandbadstraße, 79822 Titisee-Neustadt",
      parking: "Mehrere kostenpflichtige Plätze am Ortseingang",
      bestTime: "Vormittags oder unter der Woche — Wochenenden sind voll",
      transit: "Dreiseenbahn ab Hinterzarten Bf, 4 Min.",
    },
    content: [
      {
        type: "paragraph",
        text:
          "Der Titisee ist berühmt — und manchmal genau deshalb unterschätzt. Außerhalb der Hauptzeit ist der Rundweg ein meditativer Spaziergang, mit immer wieder neuen Perspektiven auf den See und die umliegenden Berge.",
      },
      { type: "heading", level: 2, text: "Die Runde" },
      {
        type: "paragraph",
        text:
          "Der Seerundweg ist 6 km lang, komplett eben und auch mit Kinderwagen oder Rollstuhl machbar. Auf halber Strecke liegt das Strandbad mit kleinen Buchten zum Baden — das Wasser ist im Sommer angenehm warm.",
      },
      { type: "heading", level: 2, text: "Genuss am See" },
      {
        type: "paragraph",
        text:
          "Die Promenade lebt von ihren Cafés. Unser Tipp: der Schwarzwälder Kirsch im Café Kuckuck — und für Schwarzwald-Spielereien das Drubba-Center mit echter Kuckucksuhren-Werkstatt.",
      },
      {
        type: "callout",
        title: "Wenn's voll wird",
        text:
          "An schönen Wochenenden parken Autos bis weit raus. Mit dem Zug (4 Minuten ab Hinterzarten Bf) sparen Sie sich den Stress komplett.",
      },
    ],
  },
  {
    slug: "ravennaschlucht-rundweg",
    title: "Ravennaschlucht-Rundweg",
    excerpt:
      "Postkarten-Schwarzwald: Bach, Mühle, Viadukt — in 90 Minuten.",
    category: "wandern",
    featured: false,
    hero: {
      src: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/3.jpg",
      alt: "Ravennaschlucht mit Viadukt der Höllentalbahn",
    },
    coordinates: { lat: 47.9067, lng: 8.0231 },
    distanceKm: 5,
    travelMinutes: 8,
    duration: "1,5 Std.",
    difficulty: "Leicht",
    season: ["Frühjahr", "Sommer", "Herbst", "Winter"],
    highlights: [
      "4,5 km Rundweg",
      "Großjockenmühle + Ravennabrücke",
      "Advent: Weihnachtsmarkt unter dem Viadukt",
    ],
    practicalInfo: {
      address: "Hofgut Sternen, 79874 Breitnau",
      parking: "Großer Parkplatz am Hofgut Sternen, kostenpflichtig",
      bestTime: "Vormittag oder im Herbstlaub",
      transit: "Bus 7216 ab Hinterzarten → Höllsteig",
    },
    content: [
      {
        type: "paragraph",
        text:
          "Die Ravennaschlucht ist das Postkarten-Motiv des Schwarzwalds — eine schmale Schlucht mit Wildbach, überspannt vom 224-Meter-Viadukt der Höllentalbahn. Der Rundweg ist kurz, leicht und ganzjährig begehbar.",
      },
      {
        type: "list",
        items: [
          "Strecke: 4,5 km · 80 Höhenmeter",
          "Gehzeit: ca. 90 Minuten",
          "Schwierigkeit: leicht, festes Schuhwerk genügt",
          "Highlight: Großjockenmühle (Vorführungen im Sommer)",
        ],
      },
      { type: "heading", level: 2, text: "Einkehr im Hofgut Sternen" },
      {
        type: "paragraph",
        text:
          "Das Hofgut Sternen am Eingang der Schlucht ist eine kleine Schwarzwaldwelt — Glasbläserei, Schinkenräucherei, Café, alles unter einem Dach. Der Schwarzwälder Kirsch ist herausragend.",
      },
      {
        type: "callout",
        title: "Im Advent",
        text:
          "Während der Adventszeit verwandelt sich die Schlucht in einen romantischen Weihnachtsmarkt unter dem Viadukt. Tickets unbedingt online vorbestellen.",
      },
    ],
  },
  {
    slug: "schauinsland-bergbahn",
    title: "Schauinsland — Bergbahn & Aussicht",
    excerpt:
      "Mit Deutschlands längster Umlauf-Seilbahn auf 1.284 m — Sonnenuntergang inklusive.",
    category: "kultur",
    featured: false,
    hero: {
      src: "https://fewo-roesslewald.de/wp-content/uploads/2022/09/1.jpg",
      alt: "Schauinslandbahn mit Blick auf Freiburg und den Rheingraben",
    },
    coordinates: { lat: 47.9078, lng: 7.9026 },
    distanceKm: 28,
    travelMinutes: 40,
    duration: "Halbtag",
    difficulty: "Sehr leicht",
    season: ["Frühjahr", "Sommer", "Herbst"],
    highlights: [
      "Längste Umlauf-Seilbahn Deutschlands",
      "Aussichtsturm mit Rundblick",
      "Bergstation auf 1.284 m",
    ],
    practicalInfo: {
      address: "Talstation Schauinslandbahn, 79100 Freiburg-Horben",
      parking: "Direkt an der Talstation, kostenpflichtig",
      bestTime: "Spätnachmittag — Sonnenuntergang vom Gipfel ist legendär",
      transit: "Mit Konus bis Freiburg, dann Tram 2 + Bus 21",
    },
    content: [
      {
        type: "paragraph",
        text:
          "Der Schauinsland ist der Hausberg Freiburgs — und mit der historischen Umlauf-Seilbahn auch ohne Wandern erreichbar. Die Fahrt selbst ist schon ein Erlebnis: 3,6 km Strecke, 750 Höhenmeter, 20 Minuten in der Gondel.",
      },
      { type: "heading", level: 2, text: "Oben angekommen" },
      {
        type: "paragraph",
        text:
          "Vom Aussichtsturm an der Bergstation reicht der Blick über den ganzen Rheingraben — Freiburg liegt einem zu Füßen, dahinter Vogesen und Kaiserstuhl, bei klarer Sicht die Alpen.",
      },
      { type: "heading", level: 2, text: "Was Sie noch tun können" },
      {
        type: "list",
        items: [
          "Bergstation-Restaurant mit Sonnenterrasse",
          "Wanderwege ab Bergstation (verschiedene Längen)",
          "Im Winter: kleines Skigebiet + Rodelbahn",
        ],
      },
      {
        type: "callout",
        title: "Sonnenuntergangs-Tipp",
        text:
          "Letzte Bergfahrt prüfen — bei guter Sicht ist der Sonnenuntergang vom Turm ein Höhepunkt der Reise. Warme Jacke einpacken, oben ist es immer kühler.",
      },
    ],
  },
  {
    slug: "golfen-am-hochschwarzwald",
    title: "Golfen am Hochschwarzwald — als Partner-Gast greenfeefrei",
    excerpt:
      "Als anerkannter Premium-Gastgeber des Golfclub Hochschwarzwald e.V. spielen unsere Gäste ohne Greenfee auf der 18-Loch-Anlage „Himmlische Hölle“.",
    category: "sport",
    featured: false,
    hero: {
      src: "/img/partner-gc-hsw-platz.webp",
      alt: "18-Loch-Anlage des Golfclub Hochschwarzwald am Titisee",
    },
    coordinates: { lat: 47.8916, lng: 8.1762 },
    distanceKm: 14,
    travelMinutes: 20,
    duration: "Halbtag bis Ganztag",
    difficulty: "Für Anfänger geeignet",
    season: ["Frühjahr", "Sommer", "Herbst"],
    highlights: [
      "Greenfee-frei für unsere Gäste · Mo–So",
      "18 Loch · 500 m vom Titisee",
      "Schnupperkurs, Platzreife & Golfstüble",
    ],
    practicalInfo: {
      address: "Golfclub Hochschwarzwald e.V., Oberaltenweg 7, 79822 Titisee-Neustadt",
      parking: "Direkt am Clubhaus, kostenfrei",
      bestTime: "Mai bis Oktober · Startzeit vorab online reservieren",
      transit: "Mit Konus-Karte bis Titisee, dann ~10 Min. Taxi",
    },
    content: [
      {
        type: "paragraph",
        text:
          "Der Golfclub Hochschwarzwald e.V. ist eine 18-Loch-Anlage zwischen Titisee und Hinterzarten — eingebettet in sanfte Hügel, mit Biotopen, Bachläufen und Blick auf den Schwarzwald. „Himmlische Hölle“ heißt der Platz nicht ohne Grund: technisch anspruchsvoll, aber landschaftlich so schön, dass auch Anfänger sich willkommen fühlen.",
      },
      { type: "heading", level: 2, text: "Greenfeefrei — und das heißt was?" },
      {
        type: "paragraph",
        text:
          "Die Greenfee ist die Tagesgebühr, die Gäste eines Golfclubs für eine Runde bezahlen — bei vergleichbaren 18-Loch-Anlagen je nach Wochentag 60 bis 90 € pro Person. Als anerkannter Premium-Gastgeber des Golfclubs Hochschwarzwald e.V. entfällt sie für unsere Gäste komplett: ab der ersten Übernachtung, an allen Wochentagen, ohne Tagesbegrenzung. Sie bezahlen lediglich Trolley oder E-Cart, wenn gewünscht — bei einem Wochenaufenthalt spart das schnell mehrere hundert Euro pro Person.",
      },
      {
        type: "list",
        items: [
          "Greenfee-frei für unsere Gäste · Mo–So · keine Tagesbegrenzung",
          "10 % Rabatt auf den Mitgliedsbeitrag für GC-HSW-Mitglieder bei Direktbuchung",
          "Startzeiten direkt beim Club online reservieren",
          "Bei Buchung „Aufenthalt am Rösslewald“ angeben — wir sind dort als Premium-Gastgeber hinterlegt",
        ],
      },
      { type: "heading", level: 2, text: "Auch für Einsteiger & Nichtgolfer" },
      {
        type: "paragraph",
        text:
          "Der Club bietet Schnupperkurse und Platzreifekurse (deutsche und schweizer Platzreife) mit Golfprofessional Cédric Steiner an — perfekt für Erstbesucher, die mal hineinschnuppern wollen. Und wer nicht spielen mag: das „Golfstüble“ mit Sonnenterrasse ist auch für Nichtgolfer geöffnet — selbstgebackene Kuchen, Aussicht inklusive.",
      },
      { type: "heading", level: 3, text: "So planen Sie Ihren Golftag" },
      {
        type: "list",
        ordered: true,
        items: [
          "Bei uns am Rösslewald buchen.",
          "Beim Club online eine Startzeit reservieren — oder kurz anrufen: 07651 / 935777.",
          "Bei der Ankunft im Sekretariat „Premium-Gastgeber Rösslewald“ angeben.",
        ],
      },
      {
        type: "paragraph",
        italic: true,
        text: "Schläger und E-Cart können vor Ort geliehen werden.",
      },
    ],
  },
];

export function getActivity(slug) {
  return ACTIVITIES.find((a) => a.slug === slug) ?? null;
}

export function getActivityCategoryLabel(slug) {
  return ACTIVITY_CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

export function getRelatedActivities(currentSlug, limit = 3) {
  const current = getActivity(currentSlug);
  if (!current) return [];
  const sameCategory = ACTIVITIES.filter(
    (a) => a.slug !== currentSlug && a.category === current.category,
  );
  const others = ACTIVITIES.filter(
    (a) => a.slug !== currentSlug && a.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
