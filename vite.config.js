import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

const nonBlockingCssPlugin = () => ({
  name: "non-blocking-css",
  enforce: "post",
  transformIndexHtml(html) {
    return html.replace(
      /<link\s+rel="stylesheet"\s+crossorigin\s+href="([^"]+\.css)">/g,
      (match, href) =>
        `<link rel="preload" as="style" crossorigin href="${href}">\n    ` +
        `<link rel="stylesheet" crossorigin href="${href}" media="print" onload="this.media='all'">\n    ` +
        `<noscript>${match}</noscript>`
    );
  },
});

export default defineConfig({
  base: "./",
  publicDir: "public",
  plugins: [nonBlockingCssPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
            return "vendor-react";
          }
          if (id.includes("node_modules/framer-motion")) {
            return "vendor-motion";
          }
          if (id.includes("node_modules/react-icons") || id.includes("node_modules/lucide-react")) {
            return "vendor-icons";
          }
        },
      },
    },
  },
});
