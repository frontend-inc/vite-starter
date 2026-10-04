// Site-wide metadata. __root.tsx turns this into the <head> meta tags; pages
// can override title/description with their own `head`.
export const siteConfig = {
  name: 'Starter',
  title: 'Starter',
  description: 'A Vite, TanStack Start, Hono and shadcn/ui starter.',
  // Absolute origin for canonical and Open Graph URLs, e.g. https://example.com.
  url: '',
  // Path (from public/) or absolute URL of the social share image, if any.
  ogImage: '',
  locale: 'en_US',
  // Browser UI color; TanStack dedupes meta by name, so only one theme-color.
  themeColor: '#ffffff',
  twitter: '',
};
