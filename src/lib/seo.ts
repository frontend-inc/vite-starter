import { siteConfig } from '@/lib/site';

type SeoOptions = {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
};

const absolute = (path: string) =>
  siteConfig.url && path.startsWith('/') ? `${siteConfig.url}${path}` : path;

// Builds the title, description, Open Graph and Twitter meta tags for a route's
// `head`. Tags with no value are left out rather than rendered empty.
export function seo({ title, description, image, path }: SeoOptions = {}) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const desc = description ?? siteConfig.description;
  const img = image ?? siteConfig.ogImage;
  const url = siteConfig.url && path !== undefined ? `${siteConfig.url}${path}` : '';

  const meta = [
    { title: fullTitle },
    { name: 'description', content: desc },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: siteConfig.name },
    { property: 'og:locale', content: siteConfig.locale },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: desc },
    { property: 'og:url', content: url },
    { property: 'og:image', content: img && absolute(img) },
    { name: 'twitter:card', content: img ? 'summary_large_image' : 'summary' },
    { name: 'twitter:site', content: siteConfig.twitter },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: desc },
    { name: 'twitter:image', content: img && absolute(img) },
  ].filter((tag) => !('content' in tag) || tag.content);

  const links = url ? [{ rel: 'canonical', href: url }] : [];

  return { meta, links };
}
