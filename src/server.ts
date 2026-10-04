// TanStack Start's custom server entry. Hono owns request routing: /api/* goes
// to the API (src/server/app.ts), and everything else falls through to
// TanStack Start for SSR, routes and server functions.
import start from '@tanstack/react-start/server-entry';
import { Hono } from 'hono';
import api from '@/server/app';

const server = new Hono();

server.route('/', api);
// Unknown API paths stay JSON 404s rather than rendering the app's 404 page.
server.all('/api/*', (c) => c.json({ error: 'Not found' }, 404));
server.all('*', (c) => start.fetch(c.req.raw));

export default {
  fetch(request: Request): Promise<Response> {
    return Promise.resolve(server.fetch(request));
  },
};
