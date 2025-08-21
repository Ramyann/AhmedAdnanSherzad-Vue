import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  esbuild: {
    target: "es2015",
  },
  plugins: [vue(), tailwindcss(), svgLoader()],
  build: {
    rollupOptions: {
      onwarn: (warning, warn) => {
        // Suppress certain warnings
        if (warning.code === "UNUSED_EXTERNAL_IMPORT") return;
        warn(warning);
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
