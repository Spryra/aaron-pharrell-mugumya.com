'use client';

import Link from 'next/link';
import { BlogPost } from '@/lib/db/schema';

interface BlogPostNavigationProps {
  previous: BlogPost | null;
  next: BlogPost | null;
}

export default function BlogPostNavigation({ previous, next }: BlogPostNavigationProps) {
  if (!previous && !next) return null;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-light-border dark:border-dark-border">
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {next ? (
          <Link href={`/blog/${next.slug}`} className="group">
            <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
              ← Newer Post
            </div>
            <div className="text-lg font-semibold text-light-text dark:text-dark-text group-hover:text-light-accent dark:group-hover:text-dark-accent transition line-clamp-2">
              {next.title}
            </div>
          </Link>
        ) : (
          <div />
        )}

        {previous ? (
          <Link href={`/blog/${previous.slug}`} className="group text-right sm:text-left">
            <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
              Older Post →
            </div>
            <div className="text-lg font-semibold text-light-text dark:text-dark-text group-hover:text-light-accent dark:group-hover:text-dark-accent transition line-clamp-2">
              {previous.title}
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </section>
  );
}
