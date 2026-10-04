import { Link } from '@tanstack/react-router';

// Stand-ins for Next's built-in 404 and error pages.

export function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex items-center gap-6">
        <div className="text-lg font-medium whitespace-nowrap">404</div>
        <div className="h-6 border-l border-border"></div>
        <div className="max-w-lg text-sm text-muted-foreground">
          This page could not be found.{' '}
          <Link to="/" className="underline underline-offset-2">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ErrorMessage({ error }: { error: unknown }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex items-center gap-6">
        <div className="text-lg font-medium whitespace-nowrap">Something went wrong</div>
        <div className="h-6 border-l border-border"></div>
        <div className="max-w-lg text-sm text-muted-foreground">
          {error instanceof Error ? error.message : String(error)}
        </div>
      </div>
    </div>
  );
}
