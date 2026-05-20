import "./styles/acss/automatic.css";
import "./styles/fonts.css";
import "./styles/a11y.css";
import "./styles/home.css";
import "./styles/video.css";
import "./styles/motion.css";
import { renderHome } from "./pages/home.js";
import { initPageAnimations } from "./motion/init.js";
import { initPageA11y } from "./a11y/page.js";
import { initVideoPlayers } from "./media/video.js";
import { initVistaSliders } from "./components/vista-slider.js";

if (import.meta.env.DEV && import.meta.env.VITE_CSS_STUDIO === "true") {
  const { startStudio } = await import("cssstudio");
  startStudio();
}

const app = document.querySelector("#app");
renderHome(app);
initPageA11y(app);
initVideoPlayers(app);
initVistaSliders(app);
initPageAnimations(app);
