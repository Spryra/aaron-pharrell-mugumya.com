'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: '/admin/messages',
    })

    if (!result?.ok) {
      setError('Invalid credentials')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 rounded-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-600 dark:text-red-400 mb-4 p-3 bg-red-50 dark:bg-red-950 rounded">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-light-text dark:text-dark-text">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-input dark:bg-dark-input text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
            required
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-light-text dark:text-dark-text">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-input dark:bg-dark-input text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-light-accent dark:bg-dark-accent text-white rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </main>
  )
}
