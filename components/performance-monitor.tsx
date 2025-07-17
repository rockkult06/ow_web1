"use client"

import { useEffect } from 'react'
import { measurePerformance, measurePageLoadTime, measureResourceTiming } from '@/lib/performance'
import { setupErrorTracking } from '@/lib/error-tracking'

export function PerformanceMonitor() {
  useEffect(() => {
    measurePerformance()
    measurePageLoadTime()
    measureResourceTiming()
    setupErrorTracking()
  }, [])

  return null
} 