import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default {
  base: "/curb-your-bins/", // Replace with your GitHub repository name
  build: {
    outDir: "dist",
  },
};
