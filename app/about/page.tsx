import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { AnimatedCard } from '@/components/AnimatedCard';
import { AnimatedHeading } from '@/components/AnimatedHeading';
import { AnimatedParagraph } from '@/components/AnimatedParagraph';
import { AnimatedSection } from '@/components/AnimatedSection';
import {
  Shield,
  Users,
  Target,
  Brain,
  Code,
  Cloud,
  Database,
  Layers,
  Package
} from 'lucide-react';

// Cache for 1 hour
export const revalidate = 3600;

// Value Card Component (server component)
function ValueCard({
  icon: Icon,
  title,
  description
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <AnimatedCard
      className="group p-6 bg-light-surface dark:bg-dark-surface rounded-xl border border-light-border dark:border-dark-border hover:shadow-lg hover:border-light-accent dark:hover:border-dark-accent transition-all duration-300"
    >
      <div className="mb-4 inline-block p-3 bg-light-accent/10 dark:bg-dark-accent/10 rounded-lg group-hover:bg-light-accent group-hover:text-white dark:group-hover:bg-dark-accent dark:group-hover:text-dark-bg transition-colors duration-300">
        <Icon size={24} className="text-light-accent dark:text-dark-accent group-hover:text-white dark:group-hover:text-dark-bg transition-colors duration-300" />
      </div>
      <h3 className="text-xl font-bold font-display text-light-text dark:text-dark-text mb-2">
        {title}
      </h3>
      <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm leading-relaxed">
        {description}
      </p>
    </AnimatedCard>
  );
}

// Tech Badge Component (server component)
function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-3 py-1.5 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent text-sm font-medium rounded-full border border-light-accent/20 dark:border-dark-accent/20">
      {children}
    </span>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors">
      <Navigation />

      {/* Section 1: About Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold font-display mb-6">
            About <span className="bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary bg-clip-text text-transparent">Me</span>
          </h1>
          <p className="text-lg sm:text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed">
            I&apos;m an AI Engineer and Full-Stack Developer passionate about building intelligent systems that solve real-world problems. With deep expertise in machine learning and production-grade software, I bridge the gap between cutting-edge AI and scalable applications.
          </p>
        </AnimatedSection>
      </section>

      {/* Section 2: Personal Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-light-surface dark:bg-dark-surface">
        <div className="max-w-4xl mx-auto">
          <AnimatedHeading level={2} className="text-4xl font-bold font-display mb-12">
            My Journey
          </AnimatedHeading>

          <div className="space-y-8">
            {/* Story 1 */}
            <AnimatedParagraph
              delay={0.1}
              className="text-lg text-light-text-secondary dark:text-dark-text-secondary leading-relaxed"
            >
              My journey into technology started with curiosity—I wondered how machines could learn, reason, and automate complex tasks. This fascination led me to pursue a BSc in Artificial Intelligence and Machine Learning at ISBAT University, where I discovered my passion for building systems that don&apos;t just work, but work intelligently. From my first lines of Python code to deploying my first ML model, every project reinforced my belief that technology should serve human needs.
            </AnimatedParagraph>

            {/* Story 2 */}
            <AnimatedParagraph
              delay={0.2}
              className="text-lg text-light-text-secondary dark:text-dark-text-secondary leading-relaxed"
            >
              At ISBAT University, I immersed myself in advanced machine learning algorithms, deep learning architectures, and data-driven problem-solving. I completed projects spanning natural language processing, computer vision, and time-series forecasting. The capstone experience was learning to think in systems—understanding how to design ML pipelines that are robust, scalable, and maintainable in production. My CGPA of 4.38 reflects not just academic achievement, but genuine mastery of these foundational concepts that now guide everything I build.
            </AnimatedParagraph>

            {/* Story 3 */}
            <AnimatedParagraph
              delay={0.3}
              className="text-lg text-light-text-secondary dark:text-dark-text-secondary leading-relaxed"
            >
              In January 2026, I joined TraceCorp Solutions as an AI Specialist (Intern), where theory met production. I&apos;ve deployed Prophet-based forecasting models into live ERP systems, built an intelligent chatbot with 15+ automated workflows, and collaborated with teams to deliver ML solutions that drive business value. This experience taught me that the best AI isn&apos;t the most sophisticated—it&apos;s the one that solves real problems reliably, at scale, in production environments.
            </AnimatedParagraph>

            {/* Story 4 */}
            <AnimatedParagraph
              delay={0.4}
              className="text-lg text-light-text-secondary dark:text-dark-text-secondary leading-relaxed"
            >
              Beyond my day-to-day work, I founded JuniorReactive, an AI & IT services startup, to apply my skills to African businesses&apos; unique challenges. Whether it&apos;s building voice-cloning systems (EchoTwin), developing game AI (AceGuru), or creating full-stack platforms (HAIQ Bakery), my mission remains constant: deliver cutting-edge solutions that create tangible impact. I believe the next wave of innovation will come from founders who understand both AI and full-stack development—and that&apos;s the hybrid builder I&apos;ve committed to becoming.
            </AnimatedParagraph>
          </div>
        </div>
      </section>

      {/* Section 3: Core Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatedHeading level={2} className="text-4xl font-bold font-display mb-12">
            What I Value
          </AnimatedHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard
              icon={Brain}
              title="Innovation"
              description="Pushing boundaries with cutting-edge AI and modern development practices."
            />
            <ValueCard
              icon={Shield}
              title="Reliability"
              description="Building code you can trust in production—secure, tested, and documented."
            />
            <ValueCard
              icon={Users}
              title="Collaboration"
              description="Learning and building with great teams—sharing knowledge, solving together."
            />
            <ValueCard
              icon={Target}
              title="Impact"
              description="Solving real problems that create measurable value for businesses and people."
            />
          </div>
        </div>
      </section>

      {/* Section 4: Education & Experience Summary */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surface dark:bg-dark-surface">
        <div className="max-w-6xl mx-auto">
          <AnimatedHeading level={2} className="text-4xl font-bold font-display mb-12">
            Education & Experience
          </AnimatedHeading>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education Column */}
            <AnimatedSection variant="slide-left" className="p-8 bg-white dark:bg-dark-bg rounded-xl border border-light-border dark:border-dark-border">
              <h3 className="text-2xl font-bold font-display mb-6 text-light-accent dark:text-dark-accent">
                Education
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-bold text-light-text dark:text-dark-text">
                    ISBAT University
                  </h4>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">
                    BSc Artificial Intelligence & Machine Learning
                  </p>
                </div>

                <div className="pt-2 border-t border-light-border dark:border-dark-border">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Duration:</span>
                      <span className="font-semibold text-light-text dark:text-dark-text">Dec 2025</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">CGPA:</span>
                      <span className="font-semibold text-light-accent dark:text-dark-accent text-lg">4.38 / 5.00</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Honors:</span>
                      <span className="font-semibold text-light-text dark:text-dark-text">First Class</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-light-border dark:border-dark-border">
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary font-semibold mb-3">
                    Key Achievements
                  </p>
                  <ul className="space-y-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    <li className="flex gap-2">
                      <span className="text-light-accent dark:text-dark-accent">•</span>
                      <span>Advanced ML algorithms and deep learning architectures</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-light-accent dark:text-dark-accent">•</span>
                      <span>Natural language processing and computer vision projects</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-light-accent dark:text-dark-accent">•</span>
                      <span>Production ML pipelines and distributed systems</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* Experience Column */}
            <AnimatedSection variant="slide-right" className="p-8 bg-white dark:bg-dark-bg rounded-xl border border-light-border dark:border-dark-border">
              <h3 className="text-2xl font-bold font-display mb-6 text-light-accent dark:text-dark-accent">
                Current Role
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-bold text-light-text dark:text-dark-text">
                    TraceCorp Solutions
                  </h4>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">
                    AI Specialist (Intern)
                  </p>
                </div>

                <div className="pt-2 border-t border-light-border dark:border-dark-border">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Duration:</span>
                      <span className="font-semibold text-light-text dark:text-dark-text">Jan 2026 — Present</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Focus:</span>
                      <span className="font-semibold text-light-text dark:text-dark-text text-right">AI Model & Deployment</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-light-border dark:border-dark-border">
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary font-semibold mb-3">
                    Key Responsibilities
                  </p>
                  <ul className="space-y-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    <li className="flex gap-2">
                      <span className="text-light-accent dark:text-dark-accent">•</span>
                      <span>Deployed Prophet forecasting models to live ERP systems</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-light-accent dark:text-dark-accent">•</span>
                      <span>Built intelligent chatbot with 15+ automated workflows</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-light-accent dark:text-dark-accent">•</span>
                      <span>Collaborated on production ML deployment pipelines</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Section 5: Tech Stack */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatedHeading level={2} className="text-4xl font-bold font-display mb-12">
            My Toolkit
          </AnimatedHeading>

          <div className="space-y-10">
            {/* Languages */}
            <AnimatedSection delay={0.1}>
              <div className="flex items-center gap-3 mb-4">
                <Code size={24} className="text-light-accent dark:text-dark-accent" />
                <h3 className="text-xl font-bold font-display">Languages</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <TechBadge>Python</TechBadge>
                <TechBadge>JavaScript</TechBadge>
                <TechBadge>TypeScript</TechBadge>
                <TechBadge>SQL</TechBadge>
              </div>
            </AnimatedSection>

            {/* Frontend */}
            <AnimatedSection delay={0.2}>
              <div className="flex items-center gap-3 mb-4">
                <Layers size={24} className="text-light-accent dark:text-dark-accent" />
                <h3 className="text-xl font-bold font-display">Frontend</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <TechBadge>React</TechBadge>
                <TechBadge>Next.js</TechBadge>
                <TechBadge>Tailwind CSS</TechBadge>
                <TechBadge>Framer Motion</TechBadge>
              </div>
            </AnimatedSection>

            {/* Backend */}
            <AnimatedSection delay={0.3}>
              <div className="flex items-center gap-3 mb-4">
                <Database size={24} className="text-light-accent dark:text-dark-accent" />
                <h3 className="text-xl font-bold font-display">Backend</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <TechBadge>Node.js</TechBadge>
                <TechBadge>PostgreSQL</TechBadge>
                <TechBadge>FastAPI</TechBadge>
                <TechBadge>Drizzle ORM</TechBadge>
              </div>
            </AnimatedSection>

            {/* ML/AI */}
            <AnimatedSection delay={0.4}>
              <div className="flex items-center gap-3 mb-4">
                <Brain size={24} className="text-light-accent dark:text-dark-accent" />
                <h3 className="text-xl font-bold font-display">ML/AI</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <TechBadge>TensorFlow</TechBadge>
                <TechBadge>PyTorch</TechBadge>
                <TechBadge>Hugging Face</TechBadge>
                <TechBadge>Scikit-learn</TechBadge>
                <TechBadge>Prophet</TechBadge>
              </div>
            </AnimatedSection>

            {/* DevOps */}
            <AnimatedSection delay={0.5}>
              <div className="flex items-center gap-3 mb-4">
                <Cloud size={24} className="text-light-accent dark:text-dark-accent" />
                <h3 className="text-xl font-bold font-display">DevOps & Cloud</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <TechBadge>Docker</TechBadge>
                <TechBadge>AWS EC2</TechBadge>
                <TechBadge>GCP</TechBadge>
                <TechBadge>GitHub Actions</TechBadge>
                <TechBadge>Vercel</TechBadge>
              </div>
            </AnimatedSection>

            {/* Tools */}
            <AnimatedSection delay={0.6}>
              <div className="flex items-center gap-3 mb-4">
                <Package size={24} className="text-light-accent dark:text-dark-accent" />
                <h3 className="text-xl font-bold font-display">Tools & Platforms</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <TechBadge>Git</TechBadge>
                <TechBadge>VS Code</TechBadge>
                <TechBadge>Figma</TechBadge>
                <TechBadge>Cloudinary</TechBadge>
                <TechBadge>Neon</TechBadge>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Section 6: Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surface dark:bg-dark-surface">
        <AnimatedSection className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold font-display mb-6">
            Let&apos;s <span className="bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto mb-12">
            Whether you&apos;re looking for collaboration, investment, or just want to chat about AI and technology—I&apos;d love to hear from you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-light-accent dark:bg-dark-accent text-white rounded-lg font-semibold hover:opacity-90 transition duration-300 text-center"
            >
              Get in Touch
            </Link>
            <Link
              href="/projects"
              className="px-8 py-3 border-2 border-light-accent dark:border-dark-accent text-light-accent dark:text-dark-accent rounded-lg font-semibold hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent dark:hover:text-dark-bg transition duration-300 text-center"
            >
              View My Projects
            </Link>
          </div>
        </AnimatedSection>
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
