import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import loadVersion from "vite-plugin-package-version";
import { VitePWA } from "vite-plugin-pwa";
import checker from "vite-plugin-checker";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "inline",
      workbox: {
        globIgnores: ["**ping.txt**"],
      },
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "safari-pinned-tab.svg",
      ],
      manifest: {
        name: "movie-web",
        short_name: "movie-web",
        description: "The place for your favourite movies & shows",
        theme_color: "#120f1d",
        background_color: "#120f1d",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
    loadVersion(),
    checker({
      typescript: true, // check typescript build errors in dev server
      eslint: {
        // check lint errors in dev server
        lintCommand: "eslint --ext .tsx,.ts src",
        dev: {
          logLevel: ["error"],
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  test: {
    environment: "jsdom",
  },
});
