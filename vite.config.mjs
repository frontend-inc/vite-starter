import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(async ({ command }) => ({
  server: { port: 3000 },
  plugins: [
    // Start must come before the React plugin.
    tanstackStart(),
    // Hosting adapter for `vite build`: Nitro packages Start's server for the
    // host (a Vercel Function when building on Vercel, a Node server in
    // .output/ elsewhere). Dev never loads it, so `vite dev` — and the
    // nodesandbox runtime — run plain Vite + TanStack Start + Hono.
    ...(command === 'build' ? [(await import('nitro/vite')).nitro()] : []),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}));
