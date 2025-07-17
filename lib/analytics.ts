// Google Analytics 4 Event Tracking
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, any>
    ) => void
    dataLayer: any[]
  }
}

// GA4 Event Types
export const GA_EVENTS = {
  PAGE_VIEW: 'page_view',
  BUTTON_CLICK: 'button_click',
  FORM_SUBMIT: 'form_submit',
  MENU_OPEN: 'menu_open',
  PRODUCT_VIEW: 'product_view',
  CONTACT_CLICK: 'contact_click',
  LANGUAGE_CHANGE: 'language_change',
  DEMO_REQUEST: 'demo_request',
} as const

// Custom event tracking
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      event_category: 'engagement',
      event_label: window.location.pathname,
      ...parameters,
    })
  }
}

// Page view tracking
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: url,
      page_title: document.title,
      measurement_id: 'G-30XM7GYBBH',
    })
  }
}

// Button click tracking
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent(GA_EVENTS.BUTTON_CLICK, {
    button_name: buttonName,
    page_location: location || window.location.pathname,
  })
}

// Form submission tracking
export const trackFormSubmit = (formName: string) => {
  trackEvent(GA_EVENTS.FORM_SUBMIT, {
    form_name: formName,
    page_location: window.location.pathname,
  })
}

// Menu interaction tracking
export const trackMenuInteraction = (menuName: string, action: 'open' | 'close') => {
  trackEvent(GA_EVENTS.MENU_OPEN, {
    menu_name: menuName,
    action: action,
    page_location: window.location.pathname,
  })
}

// Product view tracking
export const trackProductView = (productName: string, category?: string) => {
  trackEvent(GA_EVENTS.PRODUCT_VIEW, {
    product_name: productName,
    product_category: category || 'smart_city_solutions',
    page_location: window.location.pathname,
  })
}

// Contact interaction tracking
export const trackContactInteraction = (contactType: string) => {
  trackEvent(GA_EVENTS.CONTACT_CLICK, {
    contact_type: contactType,
    page_location: window.location.pathname,
  })
}

// Language change tracking
export const trackLanguageChange = (fromLang: string, toLang: string) => {
  trackEvent(GA_EVENTS.LANGUAGE_CHANGE, {
    from_language: fromLang,
    to_language: toLang,
    page_location: window.location.pathname,
  })
}

// Demo request tracking
export const trackDemoRequest = (solution?: string) => {
  trackEvent(GA_EVENTS.DEMO_REQUEST, {
    solution_requested: solution || 'general',
    page_location: window.location.pathname,
  })
}

// Performance tracking
export const trackPerformance = (metric: string, value: number) => {
  trackEvent('performance', {
    metric_name: metric,
    metric_value: value,
    page_location: window.location.pathname,
  })
}

// Error tracking
export const trackError = (errorType: string, errorMessage: string) => {
  trackEvent('error', {
    error_type: errorType,
    error_message: errorMessage,
    page_location: window.location.pathname,
  })
}

// Core Web Vitals tracking
export const trackCoreWebVitals = () => {
  if (typeof window === 'undefined') return

  // LCP
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries()
    const lcp = entries[entries.length - 1]
    if (lcp) {
      trackPerformance('LCP', lcp.startTime)
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] })

  // FID
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries()
    for (const entry of entries) {
      if (entry.entryType === 'first-input') {
        const fid = (entry as PerformanceEventTiming).processingStart - entry.startTime
        trackPerformance('FID', fid)
      }
    }
  }).observe({ entryTypes: ['first-input'] })

  // CLS
  let cls = 0
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (entry.entryType === 'layout-shift') {
        cls += (entry as any).value
        trackPerformance('CLS', cls)
      }
    }
  }).observe({ entryTypes: ['layout-shift'] })
} 