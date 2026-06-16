'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { animateCardsCascade } from '@/lib/animations/cards';
import { Project } from '@/lib/db/schema';

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  useEffect(() => {
    animateCardsCascade('[data-featured-projects]').catch(() => {
      // Silently fail if animation fails to load
    });
  }, []);

  if (projects.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-dark-bg rounded-xl overflow-hidden shadow-sm border border-light-border dark:border-dark-border">
          <div className="aspect-video bg-light-accent/10 dark:bg-dark-accent/10" />
          <div className="p-6">
            <h3 className="text-xl font-bold font-display">No projects yet</h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm mt-2">
              Check back soon for featured projects.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-featured-projects className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.slug}`}
          className="bg-white dark:bg-dark-bg rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border border-light-border dark:border-dark-border hover:border-light-accent dark:hover:border-dark-accent"
          data-animate-card
        >
          {/* Project Image */}
          {project.imageUrl ? (
            <div className="aspect-video relative overflow-hidden bg-light-surface dark:bg-dark-surface">
              <Image
                src={project.imageUrl}
                alt={project.imageAlt || project.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={false}
              />
            </div>
          ) : (
            <div className="aspect-video bg-light-accent/10 dark:bg-dark-accent/10" />
          )}

          {/* Project Info */}
          <div className="p-6 space-y-3">
            <h3 className="text-xl font-bold font-display line-clamp-2">{project.title}</h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm line-clamp-2">
              {project.description}
            </p>

            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="flex gap-2 flex-wrap pt-2">
                {project.techStack.slice(0, 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="text-xs px-2 py-1 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded">
                    +{project.techStack.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
