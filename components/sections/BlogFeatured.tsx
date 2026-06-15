'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/db/schema';
import { formatDate } from '@/lib/utils/date';
import { calculateReadTime } from '@/lib/utils/readTime';

interface BlogFeaturedProps {
  post: BlogPost;
}

export default function BlogFeatured({ post }: BlogFeaturedProps) {
  const readTime = calculateReadTime(post.content);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-light-surface dark:bg-dark-surface rounded-lg overflow-hidden shadow-lg border border-light-border dark:border-dark-border hover:border-light-accent dark:hover:border-dark-accent transition-colors"
        >
          <Link href={`/blog/${post.slug}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-10 cursor-pointer group">
              {/* Featured Image */}
              <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden">
                <Image
                  src={post.coverImageUrl}
                  alt={post.coverImageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={true}
                />
              </div>

              {/* Featured Content */}
              <div className="flex flex-col justify-center">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded-full text-sm font-semibold">
                    Featured
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold font-display text-light-text dark:text-dark-text mb-3">
                  {post.title}
                </h2>
                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  <time dateTime={post.publishedAt?.toISOString()}>
                    {post.publishedAt ? formatDate(post.publishedAt) : 'Not published'}
                  </time>
                  <span>·</span>
                  <span>{readTime} min read</span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
