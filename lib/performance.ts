// Performance monitoring utilities
export const measurePerformance = () => {
  if (typeof window === 'undefined') return

  // LCP (Largest Contentful Paint)
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1]
    
    if (lastEntry) {
      trackPerformance('LCP', lastEntry.startTime)
    }
  })
  
  observer.observe({ entryTypes: ['largest-contentful-paint'] })

  // FID (First Input Delay)
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      const fidEntry = entry as PerformanceEventTiming
      trackPerformance('FID', fidEntry.processingStart - fidEntry.startTime)
    })
  })
  
  fidObserver.observe({ entryTypes: ['first-input'] })

  // CLS (Cumulative Layout Shift)
  let clsValue = 0
  const clsObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value
      }
    })
  })
  
  clsObserver.observe({ entryTypes: ['layout-shift'] })

  // Report CLS on page unload
  window.addEventListener('beforeunload', () => {
    trackPerformance('CLS', clsValue)
  })
}

export const trackPerformance = (metric: string, value: number) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'performance',
      metric_name: metric,
      metric_value: value,
      page_location: window.location.pathname,
    })
  }
}

export const measurePageLoadTime = () => {
  if (typeof window === 'undefined') return

  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigation) {
      trackPerformance('PageLoadTime', navigation.loadEventEnd - navigation.loadEventStart)
    }
  })
}

export const measureResourceTiming = () => {
  if (typeof window === 'undefined') return

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      const resourceEntry = entry as PerformanceResourceTiming
      if (resourceEntry.initiatorType === 'img' || resourceEntry.initiatorType === 'script') {
        trackPerformance(`${resourceEntry.initiatorType}LoadTime`, resourceEntry.duration)
      }
    })
  })
  
  observer.observe({ entryTypes: ['resource'] })
} 