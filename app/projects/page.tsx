import Link from 'next/link';
import { db } from '@/lib/db/client';
import { projects as projectsTable } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import ProjectsHero from '@/components/sections/ProjectsHero';
import ProjectsCTA from '@/components/sections/ProjectsCTA';
import ProjectsGrid from '@/components/ProjectsGrid';

async function getProjects() {
  try {
    const projects = await db
      .select()
      .from(projectsTable)
      .orderBy(desc(projectsTable.sortOrder));
    return projects;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

export const metadata = {
  title: 'Projects | Aaron Pharrell Mugumya',
  description:
    'Explore my AI/ML and full-stack development projects including voice cloning, e-commerce platforms, and game AI.',
};

export default async function ProjectsPage() {
  const allProjects = await getProjects();
  const featuredProjects = allProjects.filter((p) => p.featured);

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

      {/* Section 1: Projects Hero */}
      <ProjectsHero />

      {/* Section 2: Projects Grid */}
      <ProjectsGrid projects={featuredProjects} />

      {/* Section 3: Call to Action */}
      <ProjectsCTA />

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
