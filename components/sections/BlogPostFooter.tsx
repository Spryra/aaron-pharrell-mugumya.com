'use client';

import { BlogPost } from '@/lib/db/schema';

interface BlogPostFooterProps {
  post: BlogPost;
  slug: string;
}

export default function BlogPostFooter({ post, slug }: BlogPostFooterProps) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-light-border dark:border-dark-border">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded-full border border-light-accent/20 dark:border-dark-accent/20 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Social Share */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.SITE_URL || 'https://aaronpharrell.dev'}/blog/${slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-accent dark:text-dark-accent hover:opacity-70 transition"
              aria-label="Share on Twitter"
            >
              𝕏
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${process.env.SITE_URL || 'https://aaronpharrell.dev'}/blog/${slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-accent dark:text-dark-accent hover:opacity-70 transition"
              aria-label="Share on LinkedIn"
            >
              in
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
