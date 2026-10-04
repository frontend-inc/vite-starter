// The API surface, mounted ahead of TanStack Start in src/server.ts.
// Add routes here, or mount a sub-app with `app.route('/name', subApp)`.
import { Hono } from 'hono';

const app = new Hono().basePath('/api');

app.get('/health', (c) => c.json({ ok: true }));

app.notFound((c) => c.json({ error: 'Not found' }, 404));

export default app;
