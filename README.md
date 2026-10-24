# Vite Starter

The base template for new projects: Vite, TanStack Start, Hono, Nitro,
Tailwind CSS v4 and shadcn/ui, with a single "Start prompting." landing page.

Runs in the nodesandbox runtime: `npm install` → `npm run dev` → port 3000.

## Getting started

```sh
npm install
npm run dev       # http://localhost:3000
```

| Script              | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `npm run dev`       | Vite dev server with SSR                                  |
| `npm run build`     | Production build; Nitro packages the server for the host  |
| `npm run start`     | Run the Node build from `.output/`                        |
| `npm run typecheck` | `tsc`                                                     |

## Metadata

`src/lib/site.ts` holds the site name, description, URL, share image and theme
colors. `__root.tsx` turns it into the default `<head>` tags (title,
description, Open Graph, Twitter, theme-color, canonical). A route overrides
them with `seo()` from `src/lib/seo.ts`:

```tsx
export const Route = createFileRoute('/about')({
  head: () => seo({ title: 'About', description: 'Who we are.', path: '/about' }),
  component: About,
});
```

## API routes

`src/server.ts` is the server entry. Hono handles `/api/*` (defined in
`src/server/app.ts`, e.g. `GET /api/health`), and every other request falls
through to TanStack Start.

## Deploying to Vercel

Push and deploy — no dashboard settings. `vercel.json` selects the TanStack
Start preset and installs with Bun; Nitro writes
`.vercel/output/` during `vite build`.

## nodesandbox compatibility

The sandbox runs Vite's native tools as WebAssembly (`NAPI_RS_FORCE_WASI`). The
toolchain versions match `vite-shopify-storefront`:

- `vite` is pinned to **8.3.2** (rolldown 1.2.x WASI binding).
- WASI bindings (`@rolldown/binding-wasm32-wasi`, `@tailwindcss/oxide-wasm32-wasi`)
  are **not** listed: the runtime installs each package's `*-wasm32-wasi`
  optional dependency itself, and npm on other hosts rejects them.
- `@vitejs/plugin-react` (6.0.0) and Tailwind (4.3.1) match the harness samples.
- Nitro (the hosting adapter) only loads for `vite build`, never in `vite dev`.

## Layout

```
src/
  server.ts        Server entry: Hono for /api/*, TanStack Start for the rest
  server/app.ts    Hono API routes
  router.tsx       Router setup
  routes/          File routes (__root.tsx is the document shell, index.tsx the page)
  components/ui/   shadcn/ui components
  lib/site.ts      Site name and metadata
  lib/seo.ts       Per-route meta tag helper
  styles.css       Tailwind v4 theme
public/            Static assets served from /
```
