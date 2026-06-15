import Link from 'next/link';
import { motion } from 'framer-motion';
import { db } from '@/lib/db/client';
import { blogPosts as blogPostsTable } from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';
import BlogHero from '@/components/sections/BlogHero';
import BlogCard from '@/components/BlogCard';
import BlogGrid from '@/components/sections/BlogGrid';
import BlogCTA from '@/components/sections/BlogCTA';

async function getBlogPosts() {
  try {
    const posts = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.status, 'published'))
      .orderBy(desc(blogPostsTable.publishedAt));
    return posts;
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return [];
  }
}

export const metadata = {
  title: 'Blog | Aaron Pharrell Mugumya',
  description:
    'Thoughts on AI, full-stack development, and building great software. Read articles about modern web development, AI/ML, and technical insights.',
};

export default async function BlogPage() {
  const allPosts = await getBlogPosts();
  const featuredPosts = allPosts.filter((p) => p.featured).slice(0, 2);
  const otherPosts = allPosts.filter((p) => !p.featured);

  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-light-border dark:border-dark-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary bg-clip-text text-transparent hover:opacity-80 transition"
          >
            Aaron
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/about" className="hover:text-light-accent dark:hover:text-dark-accent transition font-medium text-sm">
              About
            </Link>
            <Link href="/projects" className="hover:text-light-accent dark:hover:text-dark-accent transition font-medium text-sm">
              Projects
            </Link>
            <Link href="/blog" className="hover:text-light-accent dark:hover:text-dark-accent transition font-medium text-sm">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-light-accent dark:hover:text-dark-accent transition font-medium text-sm">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Section 1: Blog Hero */}
      <BlogHero />

      {/* Section 2: Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="absolute -top-3 -left-3 px-3 py-1 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded-full text-xs font-semibold z-10">
                    Featured
                  </div>
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 3: Blog Grid */}
      <BlogGrid posts={otherPosts} title={featuredPosts.length > 0 ? 'Latest Posts' : 'All Posts'} />

      {/* Section 4: Call to Action */}
      <BlogCTA />

      {/* Footer */}
      <footer className="border-t border-light-border dark:border-dark-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center text-light-text-secondary dark:text-dark-text-secondary text-sm">
          <p>
            Built by{' '}
            <a
              href="https://jrcom.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-accent dark:text-dark-accent hover:underline font-semibold"
            >
              Junior Reactive Company
            </a>{' '}
            · Pharrell Aaron Mugumya
          </p>
        </div>
      </footer>
    </main>
  );
}
