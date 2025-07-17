'use client'

import { useEffect, useState } from 'react'
import { trackPerformance } from '@/lib/analytics'

interface PerformanceMetrics {
  fcp: number | null
  lcp: number | null
  fid: number | null
  cls: number | null
  ttfb: number | null
}

export function usePerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    // First Contentful Paint (FCP)
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const fcp = entries[entries.length - 1]
      if (fcp) {
        setMetrics(prev => ({ ...prev, fcp: fcp.startTime }))
        trackPerformance('FCP', fcp.startTime)
      }
    })
    fcpObserver.observe({ entryTypes: ['paint'] })

    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lcp = entries[entries.length - 1]
      if (lcp) {
        setMetrics(prev => ({ ...prev, lcp: lcp.startTime }))
        trackPerformance('LCP', lcp.startTime)
      }
    })
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      for (const entry of entries) {
        if (entry.entryType === 'first-input') {
          const fid = (entry as PerformanceEventTiming).processingStart - entry.startTime
          setMetrics(prev => ({ ...prev, fid }))
          trackPerformance('FID', fid)
        }
      }
    })
    fidObserver.observe({ entryTypes: ['first-input'] })

    // Cumulative Layout Shift (CLS)
    let cls = 0
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.entryType === 'layout-shift') {
          cls += (entry as any).value
          setMetrics(prev => ({ ...prev, cls }))
          trackPerformance('CLS', cls)
        }
      }
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })

    // Time to First Byte (TTFB)
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigationEntry) {
      const ttfb = navigationEntry.responseStart - navigationEntry.requestStart
      setMetrics(prev => ({ ...prev, ttfb }))
      trackPerformance('TTFB', ttfb)
    }

    return () => {
      fcpObserver.disconnect()
      lcpObserver.disconnect()
      fidObserver.disconnect()
      clsObserver.disconnect()
    }
  }, [])

  const getPerformanceScore = () => {
    let score = 100

    // LCP scoring (0-2500ms is good)
    if (metrics.lcp && metrics.lcp > 2500) {
      score -= 25
    } else if (metrics.lcp && metrics.lcp > 4000) {
      score -= 50
    }

    // FID scoring (0-100ms is good)
    if (metrics.fid && metrics.fid > 100) {
      score -= 25
    } else if (metrics.fid && metrics.fid > 300) {
      score -= 50
    }

    // CLS scoring (0-0.1 is good)
    if (metrics.cls && metrics.cls > 0.1) {
      score -= 25
    } else if (metrics.cls && metrics.cls > 0.25) {
      score -= 50
    }

    return Math.max(0, score)
  }

  const getPerformanceGrade = () => {
    const score = getPerformanceScore()
    if (score >= 90) return 'A'
    if (score >= 80) return 'B'
    if (score >= 70) return 'C'
    if (score >= 60) return 'D'
    return 'F'
  }

  return {
    metrics,
    score: getPerformanceScore(),
    grade: getPerformanceGrade(),
  }
}

// Resource loading performance
export function useResourcePerformance() {
  const [resourceMetrics, setResourceMetrics] = useState<{
    totalResources: number
    totalSize: number
    loadTime: number
  }>({
    totalResources: 0,
    totalSize: 0,
    loadTime: 0,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const calculateResourceMetrics = () => {
      const resources = performance.getEntriesByType('resource')
      const totalSize = resources.reduce((sum, resource) => {
        return sum + (resource as PerformanceResourceTiming).transferSize || 0
      }, 0)

      const loadTime = performance.now()

      setResourceMetrics({
        totalResources: resources.length,
        totalSize,
        loadTime,
      })

      // Track resource performance
      trackPerformance('TotalResources', resources.length)
      trackPerformance('TotalSize', totalSize)
      trackPerformance('LoadTime', loadTime)
    }

    // Calculate after page load
    if (document.readyState === 'complete') {
      calculateResourceMetrics()
    } else {
      window.addEventListener('load', calculateResourceMetrics)
      return () => window.removeEventListener('load', calculateResourceMetrics)
    }
  }, [])

  return resourceMetrics
} 