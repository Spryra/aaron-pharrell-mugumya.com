import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db/client';
import { projects as projectsTable } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import ProjectDetailHero from '@/components/ProjectDetailHero';
import ProjectDetailOverview from '@/components/ProjectDetailOverview';
import RelatedProjects from '@/components/RelatedProjects';

async function getProjectBySlug(slug: string) {
  try {
    const project = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.slug, slug))
      .limit(1);
    return project[0] || null;
  } catch (error) {
    console.error('Failed to fetch project:', error);
    return null;
  }
}

async function getAllProjects() {
  try {
    const projects = await db.select().from(projectsTable);
    return projects;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

function getRelatedProjects(currentSlug: string, allProjects: any[]) {
  return allProjects.filter((p) => p.slug !== currentSlug).slice(0, 3);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Aaron Pharrell Mugumya',
    };
  }

  return {
    title: `${project.title} | Aaron Pharrell Mugumya`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getAllProjects();
  const relatedProjects = getRelatedProjects(slug, allProjects);

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
      <section className="pt-28 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            <Link href="/" className="hover:text-light-accent dark:hover:text-dark-accent transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-light-accent dark:hover:text-dark-accent transition">
              Projects
            </Link>
            <span>/</span>
            <span className="text-light-text dark:text-dark-text font-medium">{project.title}</span>
          </div>
        </div>
      </section>

      {/* Section 1: Project Hero */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ProjectDetailHero project={project} />
        </div>
      </section>

      {/* Section 2: Project Overview */}
      <ProjectDetailOverview project={project} />

      {/* Section 3: Project Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MarkdownRenderer content={project.content} />
          </div>
        </div>
      </section>

      {/* Section 4: Related Projects */}
      <RelatedProjects projects={relatedProjects} />

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
