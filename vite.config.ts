import react from "@vitejs/plugin-react"
import fixReactVirtualized from "esbuild-plugin-react-virtualized"
import path from "path"
import { defineConfig } from "vite"
import checker from "vite-plugin-checker"
import eslint from "vite-plugin-eslint"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  envDir: "./env",
  plugins: [
    react(),
    eslint({
      include: "./src/**/*.{js,jsx,ts,tsx,json}",
    }),
    checker({
      typescript: true,
    }),
    svgr({
      include: "**/*.svg",
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [fixReactVirtualized],
    },
  },
  server: { host: false, port: 3000 },
  preview: { open: true },
  resolve: {
    alias: {
      "@app": path.resolve("src/app"),
      "@pages": path.resolve("src/pages"),
      "@features": path.resolve("src/features"),
      "@services": path.resolve("src/services"),
      "@assets": path.resolve("src/assets"),
      "@styles": path.resolve("src/styles"),
      "@shared": path.resolve("src/shared"),
    },
  },
})
