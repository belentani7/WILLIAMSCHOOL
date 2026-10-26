import { defineConfig } from 'vite';

// Use Vite's built-in JSX transform; @vitejs/plugin-react is not declared
// in this repository's manifest/lockfile and cannot be imported at build time.
export default defineConfig({
  esbuild: { jsx: 'automatic' },
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  preview: {
    port: 4173,
  },
});
