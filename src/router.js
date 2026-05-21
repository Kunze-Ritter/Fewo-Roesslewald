/**
 * Mini-Router — pfad-basiert, History API.
 *
 * Bewusst kein Framework: das Projekt rendert serverseitig später unter
 * WordPress/Etch direkt auf den echten URLs. Im Vite-Prototyp simulieren
 * wir das gleiche URL-Layout (/, /reisefuehrer/, /reisefuehrer/:slug/,
 * /aktivitaeten/, /aktivitaeten/:slug/), damit wir 1:1 portieren können
 * und keine Hash-Routen mitschleppen müssen.
 *
 * Routen werden als Array gegen den aktuellen Pfad gematched; jede
 * Route bekommt eine `params`-Map aus benannten `:slug`-Tokens.
 * Auf erfolgreichen Match ruft der Router `render(app, { params })` —
 * die einzelne Page kümmert sich anschließend um eigene Side-Effects
 * (Motion-Init, A11y, Page-Title etc.).
 *
 * Nicht gematchte Pfade führen zur `notFound`-Route, damit der Header
 * trotzdem korrekt 404 setzen kann (in Etch später → `404.php`).
 */
import { renderHome } from "./pages/home.js";
import { renderBlogArchive } from "./pages/blog-archive.js";
import { renderBlogSingle } from "./pages/blog-single.js";
import { renderActivitiesArchive } from "./pages/activities-archive.js";
import { renderActivitiesSingle } from "./pages/activities-single.js";
import { renderNotFound } from "./pages/not-found.js";
import { initPageAnimations } from "./motion/init.js";
import { initPageA11y } from "./a11y/page.js";
import { initVideoPlayers } from "./media/video.js";
import { initVistaSliders } from "./components/vista-slider.js";

/**
 * Routen-Definition. Reihenfolge ist relevant — der erste Match gewinnt.
 * Pfade enden bewusst mit Slash, weil WP standardmäßig Trailing-Slash
 * setzt. Der Matcher toleriert beide Varianten.
 */
const ROUTES = [
  { path: "/", render: renderHome, name: "home" },
  { path: "/reisefuehrer/", render: renderBlogArchive, name: "blog-archive" },
  { path: "/reisefuehrer/:slug/", render: renderBlogSingle, name: "blog-single" },
  {
    path: "/aktivitaeten/",
    render: renderActivitiesArchive,
    name: "activities-archive",
  },
  {
    path: "/aktivitaeten/:slug/",
    render: renderActivitiesSingle,
    name: "activities-single",
  },
];

/**
 * Normalisiert Pfade auf Trailing-Slash. `/foo` → `/foo/`,
 * `/` bleibt `/`. So matcht die Routen-Definition deterministisch.
 */
function normalizePath(path) {
  if (path === "/" || path === "") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

/**
 * Versucht eine Route gegen einen Pfad zu matchen.
 * Tokens der Form `:name` werden zu Regex-Capture-Groups.
 * Liefert `{ route, params }` bei Match, sonst `null`.
 */
function matchRoute(path) {
  for (const route of ROUTES) {
    const paramNames = [];
    const pattern = route.path.replace(/:([\w-]+)/g, (_, name) => {
      paramNames.push(name);
      return "([^/]+)";
    });
    const re = new RegExp(`^${pattern}$`);
    const m = path.match(re);
    if (m) {
      const params = {};
      paramNames.forEach((n, i) => (params[n] = decodeURIComponent(m[i + 1])));
      return { route, params };
    }
  }
  return null;
}

/**
 * Initialisiert nach jedem Render die gemeinsamen Page-Subsysteme.
 * Motion und A11y arbeiten klassenagnostisch auf `data-*`-Attributen
 * und können daher pro Route blind aufgerufen werden.
 */
function initPageSubsystems(app) {
  initPageA11y(app);
  initVideoPlayers(app);
  initVistaSliders(app);
  initPageAnimations(app);
}

/**
 * Verhindert einen unschönen Scroll-Position-Sprung beim Routenwechsel.
 * Bei Anker-Links bleibt das Standardverhalten (Browser scrollt zum
 * Hash); bei normalen Navigationen setzen wir Scroll auf top zurück.
 */
function resetScroll(hash) {
  if (hash) {
    // requestAnimationFrame, damit erst gerendert wird, dann gescrollt
    requestAnimationFrame(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ block: "start" });
    });
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }
}

/**
 * Führt das eigentliche Rendering einer Route aus. Wird sowohl beim
 * initialen Aufruf als auch bei jedem Pop-/Push-State aufgerufen.
 */
function renderRoute(app) {
  const path = normalizePath(window.location.pathname);
  const match = matchRoute(path);

  if (match) {
    match.route.render(app, { params: match.params });
  } else {
    renderNotFound(app, { path });
  }

  initPageSubsystems(app);
  resetScroll(window.location.hash);
}

/**
 * Klicks auf interne Links abfangen und in History-API umleiten —
 * damit die App ohne Full-Reload zwischen Routen wechselt. Externe
 * Links, Anker-Links auf derselben Seite und modifizierte Klicks
 * (Ctrl/Cmd/Shift/Meta) bleiben unangetastet.
 */
function attachLinkInterceptor(app) {
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const anchor = e.target.closest("a[href]");
    if (!anchor) return;
    if (anchor.target && anchor.target !== "_self") return;
    if (anchor.hasAttribute("download")) return;

    const url = new URL(anchor.href, window.location.origin);
    if (url.origin !== window.location.origin) return;

    /**
     * Anker-Klick auf der aktuellen Seite (`#xyz` ohne Pfadwechsel):
     * Browser-Default beibehalten, damit der natürliche Scroll greift.
     */
    if (
      url.pathname === window.location.pathname &&
      url.search === window.location.search &&
      url.hash
    ) {
      return;
    }

    e.preventDefault();
    navigate(url.pathname + url.search + url.hash, { app });
  });
}

/**
 * Programmatische Navigation. Erlaubt Push (History) oder Replace —
 * z. B. wenn Filter-State über die URL gesteuert wird, ohne dass jeder
 * Klick eine neue History-Entry erzeugen soll.
 */
export function navigate(to, { app, replace = false } = {}) {
  const target = typeof to === "string" ? to : to.toString();
  if (replace) {
    window.history.replaceState({}, "", target);
  } else {
    window.history.pushState({}, "", target);
  }
  renderRoute(app);
}

/**
 * Public Init — wird einmal aus `main.js` aufgerufen.
 */
export function initRouter(app) {
  attachLinkInterceptor(app);
  window.addEventListener("popstate", () => renderRoute(app));
  renderRoute(app);
}
