'use client';

import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/db/schema';
import BlogCard from '@/components/BlogCard';

interface BlogGridProps {
  posts: BlogPost[];
  title?: string;
}

export default function BlogGrid({ posts, title = 'All Posts' }: BlogGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold font-display text-light-text dark:text-dark-text mb-10">
          {title}
        </h2>

        {posts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {posts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-lg">
              No blog posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
