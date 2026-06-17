import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import Navigation from '@/components/Navigation';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import ClientHomeWrapper from '@/components/ClientHomeWrapper';
import { db } from '@/lib/db/client';
import { projects as projectsTable } from '@/lib/db/schema';
import { eq, desc, count } from 'drizzle-orm';

export const revalidate = 3600; // Cache for 1 hour

// Aaron's ISBAT cumulative GPA — shown in the hero stats.
const ISBAT_CGPA = 4.38;

// Fetch featured projects from database
async function getFeaturedProjects() {
  try {
    const featured = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.featured, true))
      .orderBy(desc(projectsTable.sortOrder))
      .limit(2);
    return featured;
  } catch (error) {
    console.error('Failed to fetch featured projects:', error);
    return [];
  }
}

// Total number of projects — drives the "Live Projects" hero stat.
async function getProjectCount(): Promise<number> {
  try {
    const [row] = await db.select({ value: count() }).from(projectsTable);
    return row?.value ?? 0;
  } catch (error) {
    console.error('Failed to count projects:', error);
    return 0;
  }
}

export const metadata = {
  title: 'Aaron Pharrell Mugumya | AI Engineer & Full-Stack Developer',
  description: 'AI Engineer and Full-Stack Developer building intelligent automation systems for East Africa. Founder of JuniorReactive.',
};

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();
  const projectCount = await getProjectCount();

  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg text-dark-bg dark:text-dark-text transition-colors">
      <Navigation />

      {/* Hero Section - Wrapped in client component for animations */}
      <ClientHomeWrapper>
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left: Text */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-5xl sm:text-6xl font-bold font-display leading-tight" data-hero-heading>
                    AI Engineer &<br />
                    <span className="bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary bg-clip-text text-transparent">
                      Full-Stack Builder
                    </span>
                  </h1>
                  <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-lg">
                    Founder of{' '}
                    <a
                      href="https://jrcom.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-light-accent dark:text-dark-accent hover:underline font-semibold"
                    >
                      JuniorReactive
                    </a>
                    . Building intelligent automation and production AI systems for East Africa.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-light-border dark:border-dark-border" data-stats-container>
                  <div>
                    <div
                      className="text-2xl font-bold text-light-accent dark:text-dark-accent"
                      data-counter-cgpa
                      data-target={ISBAT_CGPA}
                    >
                      {ISBAT_CGPA.toFixed(2)}
                    </div>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">ISBAT CGPA</p>
                  </div>
                  <div>
                    <div
                      className="text-2xl font-bold text-light-accent dark:text-dark-accent"
                      data-counter-projects
                      data-target={projectCount}
                    >
                      {projectCount}
                    </div>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Live Projects</p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    href="/projects"
                    className="px-8 py-3 bg-light-accent dark:bg-dark-accent text-white rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    View My Work <ArrowRight size={18} />
                  </Link>
                  <a
                    href="/cv.pdf"
                    className="px-8 py-3 border-2 border-light-accent dark:border-dark-accent text-light-accent dark:text-dark-accent rounded-lg font-semibold hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent dark:hover:text-dark-bg transition w-full sm:w-auto text-center"
                  >
                    Download CV
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 pt-4">
                  <a
                    href="https://github.com/Spryra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-light-surface dark:bg-dark-surface rounded-lg hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent transition"
                    aria-label="GitHub"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/aaron-mugumya-pharrell"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-light-surface dark:bg-dark-surface rounded-lg hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent transition"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="mailto:aaronmugumya04@gmail.com"
                    className="p-3 bg-light-surface dark:bg-dark-surface rounded-lg hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent transition"
                    aria-label="Email"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>

              {/* Right: Hero Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/Pharrell.jpeg"
                  alt="Aaron Pharrell Mugumya"
                  fill
                  className="object-cover"
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
      </ClientHomeWrapper>

      {/* Featured Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surface dark:bg-dark-surface">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold font-display">Featured Projects</h2>
            <Link
              href="/projects"
              className="text-light-accent dark:text-dark-accent hover:underline font-semibold flex items-center gap-1 text-sm"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>
          {/* Featured projects component with live database data */}
          <FeaturedProjects projects={featuredProjects} />
        </div>
      </section>

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
