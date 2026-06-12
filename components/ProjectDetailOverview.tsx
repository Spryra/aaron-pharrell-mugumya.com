'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '@/lib/db/schema';

interface ProjectDetailOverviewProps {
  project: Project;
}

export default function ProjectDetailOverview({ project }: ProjectDetailOverviewProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surface dark:bg-dark-surface">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 bg-white dark:bg-dark-bg rounded-xl border border-light-border dark:border-dark-border"
          >
            <h3 className="text-2xl font-bold font-display mb-6 text-light-accent dark:text-dark-accent">
              Tech Stack
            </h3>

            {project.techStack && project.techStack.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {(() => {
                  const displayTechs = project.techStack.slice(0, 4);
                  const hiddenCount = project.techStack.length - displayTechs.length;

                  return (
                    <>
                      {displayTechs.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded-lg border border-light-accent/20 dark:border-dark-accent/20 font-medium text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                      {hiddenCount > 0 && (
                        <span className="px-4 py-2 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded-lg border border-light-accent/20 dark:border-dark-accent/20 font-medium text-sm">
                          +{hiddenCount} more
                        </span>
                      )}
                    </>
                  );
                })()}
              </div>
            ) : (
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                No technologies listed.
              </p>
            )}
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 bg-white dark:bg-dark-bg rounded-xl border border-light-border dark:border-dark-border"
          >
            <h3 className="text-2xl font-bold font-display mb-6 text-light-accent dark:text-dark-accent">
              Quick Links
            </h3>

            <div className="space-y-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded-lg hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent dark:hover:text-dark-bg transition duration-300 font-medium"
                >
                  <Github size={20} />
                  View Code
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-light-accent text-white dark:bg-dark-accent dark:text-dark-bg rounded-lg hover:opacity-90 transition duration-300 font-medium"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </a>
              )}

              {!project.githubUrl && !project.liveUrl && (
                <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                  No external links available for this project.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
