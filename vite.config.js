import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import jsconfigPaths from "vite-jsconfig-paths"

/// <reference types="vitest" />
/// <reference types="vite/client" />

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
  },
})
