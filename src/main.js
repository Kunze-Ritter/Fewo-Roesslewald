import "./styles/acss/automatic.css";
import "./styles/etch-defaults.css";
import "./styles/fonts.css";
import "./styles/a11y.css";
import "./styles/home.css";
import "./styles/blog.css";
import "./styles/activities.css";
import "./styles/video.css";
import "./styles/motion.css";
import { initRouter } from "./router.js";

if (import.meta.env.DEV && import.meta.env.VITE_CSS_STUDIO === "true") {
  const { startStudio } = await import("cssstudio");
  startStudio();
}

const app = document.querySelector("#app");
initRouter(app);
