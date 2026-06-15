'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/db/schema';
import { formatDate, formatDateShort } from '@/lib/utils/date';
import { calculateReadTime } from '@/lib/utils/readTime';

interface BlogPostHeaderProps {
  post: BlogPost;
}

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  const readTime = calculateReadTime(post.content);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Cover Image */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 bg-light-surface dark:bg-dark-surface">
          <Image
            src={post.coverImageUrl}
            alt={post.coverImageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 70vw"
            priority={true}
          />
        </div>

        {/* Post Metadata and Title */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
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

          <h1 className="text-4xl sm:text-5xl font-bold font-display text-light-text dark:text-dark-text mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-light-text-secondary dark:text-dark-text-secondary">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-light-text dark:text-dark-text">Aaron Pharrell</span>
            </div>
            <span>·</span>
            <time dateTime={post.publishedAt?.toISOString()}>
              {post.publishedAt ? formatDate(post.publishedAt) : 'Not published'}
            </time>
            <span>·</span>
            <span>{readTime} min read</span>
            {post.updatedAt && post.updatedAt.getTime() !== post.publishedAt?.getTime() && (
              <>
                <span>·</span>
                <span className="text-xs">Updated {formatDateShort(post.updatedAt)}</span>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
