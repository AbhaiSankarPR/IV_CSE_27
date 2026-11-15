import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      devOptions: {
        enabled: false,
      },
      registerType: "autoUpdate",
      workbox: {
        // Delete files from older builds and switch to a new build right away.
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        // Never answer a request for a page file with index.html.
        navigateFallbackDenylist: [/^\/assets\//],
      },
      manifest: {
        name: "Odyssey",
        short_name: "Odyssey",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "/favicon-16x16.png",
            type: "image/png",
            sizes: "16x16",
          },
          {
            src: "/favicon-32x32.png",
            type: "image/png",
            sizes: "32x32",
          },
          {
            src: "/android-chrome-192x192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "/android-chrome-512x512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "any maskable",
          },
          {
            src: "/apple-touch-icon.png",
            type: "image/png",
            sizes: "180x180",
          },
        ],
        theme_color: "#000000",
        background_color: "#ffffff",
        display: "standalone",
      },
    }),
  ],
  mode: "production",
});
