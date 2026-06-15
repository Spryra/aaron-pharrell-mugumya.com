import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Page Not Found - Aaron Pharrell',
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-light-accent dark:text-dark-accent mb-4">
            404
          </h1>
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-light-accent dark:bg-dark-accent text-white rounded-lg hover:shadow-lg transition-shadow font-medium"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>
    </main>
  )
}
