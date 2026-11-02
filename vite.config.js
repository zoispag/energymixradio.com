import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

const nowPlayingProxy = {
  "/api/now-playing": {
    target: "https://cast.magicstreams.gr",
    changeOrigin: true,
    rewrite: () => "/sc/jziwpfyo/currentsong?sid=1",
  },
};

// https://vite.dev/config/
export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.js"],
    setupFiles: ["src/test-setup.js"],
  },
  plugins: [vue(), tailwindcss()],
  // Mirrors the Netlify proxy rule in netlify.toml so dev/preview get the fresh title too
  server: { proxy: nowPlayingProxy },
  preview: { proxy: nowPlayingProxy },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
