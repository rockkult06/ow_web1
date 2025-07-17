import { trackError } from './analytics'

// Error tracking utilities
export const setupErrorTracking = () => {
  if (typeof window === 'undefined') return

  // Global error handler
  window.addEventListener('error', (event) => {
    trackError('JavaScript Error', event.message)
  })

  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    trackError('Unhandled Promise Rejection', event.reason)
  })

  // Network error tracking
  window.addEventListener('online', () => {
    trackError('Network Status', 'Online')
  })

  window.addEventListener('offline', () => {
    trackError('Network Status', 'Offline')
  })

  // Resource loading error tracking
  window.addEventListener('error', (event) => {
    if (event.target && (event.target as HTMLElement).tagName) {
      const target = event.target as HTMLElement
      if (target.tagName === 'IMG' || target.tagName === 'SCRIPT' || target.tagName === 'LINK') {
        const imgTarget = target as HTMLImageElement
        const linkTarget = target as HTMLLinkElement
        const src = imgTarget.src || linkTarget.href || 'unknown'
        trackError('Resource Load Error', `${target.tagName} failed to load: ${src}`)
      }
    }
  }, true)
}

// Custom error boundary hook
export const useErrorBoundary = () => {
  const handleError = (error: Error, errorInfo?: any) => {
    trackError('React Error Boundary', error.message)
    console.error('Error caught by boundary:', error, errorInfo)
  }

  return { handleError }
}

// API error tracking
export const trackApiError = (endpoint: string, status: number, message: string) => {
  trackError('API Error', `${endpoint} - ${status}: ${message}`)
}

// Form validation error tracking
export const trackValidationError = (formName: string, fieldName: string, errorMessage: string) => {
  trackError('Validation Error', `${formName}.${fieldName}: ${errorMessage}`)
} 