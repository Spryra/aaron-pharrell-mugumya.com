'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/db/schema';
import { formatDateShort } from '@/lib/utils/date';
import { calculateReadTime } from '@/lib/utils/readTime';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const readTime = calculateReadTime(post.content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="group h-full"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="h-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-light-accent dark:hover:border-dark-accent cursor-pointer flex flex-col">
          {/* Image Section */}
          <div className="relative w-full aspect-video overflow-hidden bg-light-surface dark:bg-dark-surface">
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
            />
          </div>

          {/* Content Section */}
          <div className="p-6 flex flex-col flex-grow">
            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold font-display text-light-text dark:text-dark-text mb-2 line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary mb-4 flex-grow line-clamp-3">
              {post.excerpt}
            </p>

            {/* Metadata */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-light-text-secondary dark:text-dark-text-secondary mb-3">
              <time dateTime={post.publishedAt?.toISOString()}>
                {post.publishedAt ? formatDateShort(post.publishedAt) : 'Not published'}
              </time>
              <span>·</span>
              <span>{readTime} min read</span>
              {post.tags && post.tags.length > 0 && (
                <>
                  <span>·</span>
                  <span>{post.tags.length} tag{post.tags.length !== 1 ? 's' : ''}</span>
                </>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded-full border border-light-accent/20 dark:border-dark-accent/20 font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 2 && (
                  <span className="text-xs px-2.5 py-1 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded-full border border-light-accent/20 dark:border-dark-accent/20 font-medium">
                    +{post.tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
