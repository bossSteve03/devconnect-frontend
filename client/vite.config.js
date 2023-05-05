import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: {
      "ts-jest": {
        tsconfig: "./tsconfig.json",
      },
    },
    environment: "jsdom",
  },
});
