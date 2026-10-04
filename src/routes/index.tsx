import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';

export const Route = createFileRoute('/')({
  head: () => seo({ path: '/' }),
  component: Home,
});

function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6">
      <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
        Start prompting.
      </h1>
    </main>
  );
}
