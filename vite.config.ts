import { defineConfig } from "vite";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import vue from '@vitejs/plugin-vue'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  base: '/instagram-unfollowers/',
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/styles/variables" as *;
          @use "@/assets/styles/reset";
          @use "@/assets/styles/global";
        `
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'vue-i18n', 'pinia'],
        }
      }
    }
  },
  json: {
    stringify: true
  },
  server: {
    port: 3000,
  },
});
