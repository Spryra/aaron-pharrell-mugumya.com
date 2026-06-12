'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project } from '@/lib/db/schema';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="group h-full"
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="h-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-light-accent dark:hover:border-dark-accent cursor-pointer">
          {/* Image Section */}
          <div className="relative w-full h-56 sm:h-48 overflow-hidden bg-light-surface dark:bg-dark-surface">
            <Image
              src={project.imageUrl}
              alt={project.imageAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
            />
          </div>

          {/* Content Section */}
          <div className="p-6 flex flex-col h-64">
            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold font-display text-light-text dark:text-dark-text mb-2 line-clamp-2">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary mb-4 flex-grow line-clamp-3">
              {project.description}
            </p>

            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded-full border border-light-accent/20 dark:border-dark-accent/20 font-medium"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-xs px-2.5 py-1 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded-full border border-light-accent/20 dark:border-dark-accent/20 font-medium">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
