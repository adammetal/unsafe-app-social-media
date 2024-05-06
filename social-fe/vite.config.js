import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      '/auth': 'http://localhost:8000',
      '/api': 'http://localhost:8000'
    }
  }
});
