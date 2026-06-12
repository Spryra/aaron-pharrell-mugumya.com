'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project } from '@/lib/db/schema';

interface ProjectDetailHeroProps {
  project: Project;
}

export default function ProjectDetailHero({ project }: ProjectDetailHeroProps) {
  return (
    <>
      {/* Project Image */}
      <motion.div
        className="relative w-full h-80 sm:h-96 lg:h-[500px] rounded-xl overflow-hidden mb-12 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src={project.imageUrl}
          alt={project.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
        />
      </motion.div>

      {/* Project Title and Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h1 className="text-5xl sm:text-6xl font-bold font-display mb-6">
          {project.title.split(' ').map((word, idx) => {
            const isHighlighted = idx === project.title.split(' ').length - 1;
            return isHighlighted ? (
              <span
                key={idx}
                className="bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary bg-clip-text text-transparent"
              >
                {word}
              </span>
            ) : (
              <span key={idx}>{word} </span>
            );
          })}
        </h1>
        <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-3xl leading-relaxed">
          {project.description}
        </p>
      </motion.div>
    </>
  );
}
