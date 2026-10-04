import type { ReactNode } from 'react';
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { seo } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import stylesUrl from '@/styles.css?url';

export const Route = createRootRoute({
  head: () => {
    const defaults = seo();
    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'application-name', content: siteConfig.name },
        { name: 'theme-color', content: siteConfig.themeColor },
        ...defaults.meta,
      ],
      links: [
        { rel: 'stylesheet', href: stylesUrl },
        { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
        ...defaults.links,
      ],
    };
  },
  // The document shell renders even when a route errors or 404s.
  shellComponent: RootDocument,
  component: Outlet,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
