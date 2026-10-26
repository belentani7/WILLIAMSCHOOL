import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// Use Vite's built-in JSX transform; the React plugin is not declared.
export default defineConfig({
  plugins: [tailwindcss()],
  esbuild: { jsx: 'automatic' },
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  preview: {
    port: 4173,
  },
});
