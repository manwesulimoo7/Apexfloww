import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// base: "./" -> relative asset paths so the built file also works via file:// (double-click)
// viteSingleFile -> inline all JS/CSS into one self-contained index.html (no CDN, offline-capable)
export default defineConfig({
  base: "./",
  plugins: [react(), viteSingleFile()],
  build: {
    target: "es2018",
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
  },
});
