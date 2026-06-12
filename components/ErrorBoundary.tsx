'use client'

import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error in experience timeline:', error)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 dark:bg-red-950 p-8 rounded-lg text-center">
          <h3 className="text-red-800 dark:text-red-200 font-bold mb-2">
            Something went wrong
          </h3>
          <p className="text-red-700 dark:text-red-300">
            {this.props.fallback || 'Unable to display experiences. Please refresh the page.'}
          </p>
        </div>
      )
    }

    return this.props.children
  }
}
