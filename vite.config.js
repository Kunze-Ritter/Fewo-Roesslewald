import { defineConfig } from "vite";

export default defineConfig({
  server: {
    /**
     * Erlaubt Tunnel-Hosts (Cloudflare quick tunnels etc.) für externe
     * Audits wie MotionScore Pro gegen den Dev-Server.
     */
    allowedHosts: [".trycloudflare.com", ".ngrok.io", ".ngrok-free.app"],
  },
});
