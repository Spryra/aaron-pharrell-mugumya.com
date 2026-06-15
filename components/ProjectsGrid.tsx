'use client';

import { Project } from '@/lib/db/schema';
import ProjectCard from './ProjectCard';
import { animateProjectCards } from '@/lib/animations/cards';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const gridRef = useAnimateOnScroll<HTMLDivElement>(() => {
    animateProjectCards('[data-projects-grid]');
  }, { threshold: 0.2 });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {projects.length > 0 ? (
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            data-projects-grid
          >
            {projects.map((project) => (
              <div
                key={project.id}
                data-project-card
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-lg">
              No projects found. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
