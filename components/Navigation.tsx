'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { initNavLinkAnimation, animateNavLogo, animateNavLinksEntrance } from '@/lib/animations/nav';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
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
      aria-label="Toggle theme"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

function isActive(pathname: string, href: string): boolean {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname.startsWith(href);
}

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize nav link animations on mount
    initNavLinkAnimation();
    animateNavLogo('[data-nav-logo]');
    animateNavLinksEntrance();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    }

    if (mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
    return undefined;
  }, [mobileOpen]);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-light-border dark:border-dark-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary bg-clip-text text-transparent hover:opacity-80 transition"
          prefetch={true}
          data-nav-logo
        >
          Aaron
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={true}
              data-nav-link
              className={`transition font-medium text-sm ${
                isActive(pathname, link.href)
                  ? 'text-light-accent dark:text-dark-accent underline'
                  : 'hover:text-light-accent dark:hover:text-dark-accent'
              }`}
              aria-current={isActive(pathname, link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-light-surface dark:hover:bg-dark-surface transition"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        ref={menuRef}
        className={`lg:hidden absolute top-full left-0 w-full bg-white dark:bg-dark-bg border-b border-light-border dark:border-dark-border overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={true}
              onClick={handleLinkClick}
              className={`block px-3 py-2 rounded-lg transition font-medium ${
                isActive(pathname, link.href)
                  ? 'bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent underline'
                  : 'hover:bg-light-surface dark:hover:bg-dark-surface'
              }`}
              aria-current={isActive(pathname, link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-light-border dark:border-dark-border">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
