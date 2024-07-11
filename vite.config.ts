import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: true,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/api": path.resolve(__dirname, "./src/api"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/config": path.resolve(__dirname, "./src/config"),
      "@/constants": path.resolve(__dirname, "./src/constants"),
      "@/helpers": path.resolve(__dirname, "./src/helpers"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/i18n": path.resolve(__dirname, "./src/i18n"),
      "@/layouts": path.resolve(__dirname, "./src/layouts"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/providers": path.resolve(__dirname, "./src/providers"),
      "@/routes": path.resolve(__dirname, "./src/routes"),
      "@/store": path.resolve(__dirname, "./src/store"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
