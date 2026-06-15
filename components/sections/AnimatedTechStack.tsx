'use client';

import { Code, Layers, Database, Brain, Cloud, Package } from 'lucide-react';
import { animateTechBadges } from '@/lib/animations/badges';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';

function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block px-3 py-1.5 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent text-sm font-medium rounded-full border border-light-accent/20 dark:border-dark-accent/20"
      data-tech-badge
    >
      {children}
    </span>
  );
}

interface TechSection {
  icon: React.ElementType;
  title: string;
  badges: string[];
}

const techSections: TechSection[] = [
  {
    icon: Code,
    title: 'Languages',
    badges: ['Python', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    icon: Layers,
    title: 'Frontend',
    badges: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    icon: Database,
    title: 'Backend',
    badges: ['Node.js', 'PostgreSQL', 'FastAPI', 'Drizzle ORM'],
  },
  {
    icon: Brain,
    title: 'ML/AI',
    badges: ['TensorFlow', 'PyTorch', 'Hugging Face', 'Scikit-learn', 'Prophet'],
  },
  {
    icon: Cloud,
    title: 'DevOps & Cloud',
    badges: ['Docker', 'AWS EC2', 'GCP', 'GitHub Actions', 'Vercel'],
  },
  {
    icon: Package,
    title: 'Tools & Platforms',
    badges: ['Git', 'VS Code', 'Figma', 'Cloudinary', 'Neon'],
  },
];

export default function AnimatedTechStack() {
  const stackRef = useAnimateOnScroll<HTMLElement>(() => {
    animateTechBadges('[data-tech-stack]');
  }, { threshold: 0.3 });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" ref={stackRef} data-tech-stack>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold font-display mb-12">My Toolkit</h2>

        <div className="space-y-10">
          {techSections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title}>
                <div className="flex items-center gap-3 mb-4">
                  <Icon size={24} className="text-light-accent dark:text-dark-accent" />
                  <h3 className="text-xl font-bold font-display">{section.title}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {section.badges.map((badge) => (
                    <TechBadge key={badge}>{badge}</TechBadge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
