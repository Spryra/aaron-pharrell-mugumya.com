import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db/client';
import { blogPosts as blogPostsTable } from '@/lib/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import BlogPostHeader from '@/components/sections/BlogPostHeader';
import BlogPostFooter from '@/components/sections/BlogPostFooter';
import BlogPostNavigation from '@/components/sections/BlogPostNavigation';
import RelatedBlogPosts from '@/components/sections/RelatedBlogPosts';

async function getPostBySlug(slug: string) {
  try {
    const post = await db
      .select()
      .from(blogPostsTable)
      .where(
        and(
          eq(blogPostsTable.slug, slug),
          eq(blogPostsTable.status, 'published')
        )
      )
      .limit(1);
    return post[0] || null;
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return null;
  }
}

async function getRelatedPosts(currentSlug: string, limit = 2) {
  try {
    const posts = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.status, 'published'))
      .orderBy(desc(blogPostsTable.publishedAt))
      .limit(limit + 1);

    return posts
      .filter((p) => p.slug !== currentSlug)
      .slice(0, limit);
  } catch (error) {
    console.error('Failed to fetch related posts:', error);
    return [];
  }
}

async function getPreviousAndNextPosts(currentSlug: string) {
  try {
    const allPosts = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.status, 'published'))
      .orderBy(desc(blogPostsTable.publishedAt));

    const currentIndex = allPosts.findIndex((p) => p.slug === currentSlug);
    if (currentIndex === -1) return { previous: null, next: null };

    return {
      previous: allPosts[currentIndex + 1] || null,
      next: allPosts[currentIndex - 1] || null,
    };
  } catch (error) {
    console.error('Failed to fetch adjacent posts:', error);
    return { previous: null, next: null };
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Aaron Pharrell Mugumya',
    };
  }

  return {
    title: `${post.title} | Aaron Pharrell Mugumya`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { previous, next } = await getPreviousAndNextPosts(slug);
  const relatedPosts = await getRelatedPosts(slug, 3);

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

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="pt-28 pb-8 px-4 sm:px-6 lg:px-8">
        <ol className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary flex-wrap">
          <li>
            <Link href="/" className="hover:text-light-accent dark:hover:text-dark-accent transition">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/blog" className="hover:text-light-accent dark:hover:text-dark-accent transition">
              Blog
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-light-text dark:text-dark-text font-medium truncate">
            {post.title}
          </li>
        </ol>
      </nav>

      {/* Section 1: Post Header */}
      <BlogPostHeader post={post} />

      {/* Section 2: Post Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <MarkdownRenderer content={post.content} />
        </div>
      </section>

      {/* Section 3: Post Footer - Tags and Metadata */}
      <BlogPostFooter post={post} slug={slug} />

      {/* Section 4: Navigation */}
      <BlogPostNavigation previous={previous} next={next} />

      {/* Section 5: Related Posts */}
      <RelatedBlogPosts posts={relatedPosts} />

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
