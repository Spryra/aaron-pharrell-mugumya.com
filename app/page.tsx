'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg text-dark-bg dark:text-dark-text transition-colors">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-light-border dark:border-dark-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary bg-clip-text text-transparent">
            Aaron
          </div>
          <div className="flex gap-6 items-center">
            <Link href="/about" className="hover:text-light-accent dark:hover:text-dark-accent transition">
              About
            </Link>
            <Link href="/projects" className="hover:text-light-accent dark:hover:text-dark-accent transition">
              Projects
            </Link>
            <Link href="/blog" className="hover:text-light-accent dark:hover:text-dark-accent transition">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-light-accent dark:hover:text-dark-accent transition">
              Contact
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-5xl sm:text-6xl font-bold font-display leading-tight">
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
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-light-border dark:border-dark-border">
                <div>
                  <div className="text-2xl font-bold text-light-accent dark:text-dark-accent">4.38</div>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">ISBAT CGPA</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-light-accent dark:text-dark-accent">2+</div>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Live Projects</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="px-8 py-3 bg-light-accent dark:bg-dark-accent text-white rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 w-full sm:w-auto">
                  View My Work <ArrowRight size={18} />
                </button>
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

            {/* Right: Hero Image Placeholder */}
            <div className="relative aspect-square bg-gradient-to-br from-light-accent/10 to-light-accent-secondary/10 dark:from-dark-accent/10 dark:to-dark-accent-secondary/10 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  [Profile Photo]
                </p>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-2">
                  From Cloudinary
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surface dark:bg-dark-surface">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold font-display mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white dark:bg-dark-bg rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border border-light-border dark:border-dark-border">
                <div className="aspect-video bg-light-accent/10 dark:bg-dark-accent/10" />
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold font-display">Project {i}</h3>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                    Coming soon - Full project showcase with case studies
                  </p>
                  <div className="flex gap-2 flex-wrap pt-2">
                    <span className="text-xs px-2 py-1 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded">
                      React
                    </span>
                    <span className="text-xs px-2 py-1 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded">
                      AI/ML
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggle = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    setIsDark(!isDark);
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg bg-light-surface dark:bg-dark-surface hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent transition"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
