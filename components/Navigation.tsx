import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-light-border dark:border-dark-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary bg-clip-text text-transparent hover:opacity-80 transition"
        >
          Aaron
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/about" className="hover:text-light-accent dark:hover:text-dark-accent transition font-medium text-sm">
            About
          </Link>
          <Link href="/projects" className="hover:text-light-accent dark:hover:text-dark-accent transition font-medium text-sm">
            Projects
          </Link>
          <Link href="/blog" className="hover:text-light-accent dark:hover:text-dark-accent transition font-medium text-sm">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-light-accent dark:hover:text-dark-accent transition font-medium text-sm">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
