'use client';

import { BlogPost } from '@/lib/db/schema';
import BlogCard from '@/components/BlogCard';

interface RelatedBlogPostsProps {
  posts: BlogPost[];
}

export default function RelatedBlogPosts({ posts }: RelatedBlogPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-light-border dark:border-dark-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold font-display text-light-text dark:text-dark-text mb-10">
          More Posts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
