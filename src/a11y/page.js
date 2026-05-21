/**
 * Barrierefreiheit — Mobile-Menü mit Focus-Trap + Escape
 *
 * Focus-Visible wird nicht mehr per JS gesteuert, da CSS-`:focus-visible`
 * in allen modernen Browsern Maus-/Tastatur-Fokus korrekt unterscheidet
 * und so robust ggü. JS-Fehlern bleibt.
 */
export function initPageA11y(root = document) {
  initMobileNav(root);
}

function initMobileNav(root) {
  const toggle = root.querySelector(".home-nav-toggle");
  const nav = root.querySelector("#home-mobile-nav");
  const main = root.querySelector("#main");
  if (!toggle || !nav) return;

  const focusable = () => {
    if (nav.hidden) return [];
    return [...nav.querySelectorAll('a[href], button:not([disabled])')];
  };

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    nav.hidden = !open;
    if (main) main.inert = open;
    toggle.inert = false;

    if (open) {
      const first = focusable()[0];
      first?.focus();
    } else {
      toggle.focus();
    }
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("keydown", (e) => {
    if (nav.hidden) return;

    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      return;
    }

    if (e.key !== "Tab") return;

    const items = focusable();
    if (items.length < 2) return;

    const first = items[0];
    const last = items[items.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  window.matchMedia("(width >= 56rem)").addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });
}
