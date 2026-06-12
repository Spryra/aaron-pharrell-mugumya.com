'use client';

import { motion } from 'framer-motion';
import { Project } from '@/lib/db/schema';
import ProjectCard from '@/components/ProjectCard';

interface RelatedProjectsProps {
  projects: Project[];
}

export default function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surface dark:bg-dark-surface">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold font-display mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          You might also like
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((relProject, idx) => (
            <motion.div
              key={relProject.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard project={relProject} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
