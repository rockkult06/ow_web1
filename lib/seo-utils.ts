// SEO Utility Functions

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonical?: string
  noIndex?: boolean
  noFollow?: boolean
}

export function generateSEOMeta(data: SEOData) {
  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
    robots: {
      index: !data.noIndex,
      follow: !data.noFollow,
      googleBot: {
        index: !data.noIndex,
        follow: !data.noFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: data.title,
      description: data.description,
      images: data.ogImage ? [
        {
          url: data.ogImage,
          width: 1200,
          height: 630,
          alt: data.title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: data.ogImage ? [data.ogImage] : undefined,
    },
    alternates: {
      canonical: data.canonical,
    },
  }
}

export function generateProductStructuredData(product: {
  name: string
  description: string
  category: string
  url: string
  image: string
  brand: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": product.name,
    "description": product.description,
    "category": product.category,
    "url": product.url,
    "image": product.image,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web-based",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "TRY"
    }
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

export function generateLocalBusinessStructuredData(business: {
  name: string
  url: string
  logo: string
  description: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  contactPoint: {
    telephone: string
    contactType: string
    email: string
  }
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.name,
    "url": business.url,
    "logo": business.logo,
    "description": business.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address.streetAddress,
      "addressLocality": business.address.addressLocality,
      "addressRegion": business.address.addressRegion,
      "postalCode": business.address.postalCode,
      "addressCountry": business.address.addressCountry
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": business.contactPoint.telephone,
      "contactType": business.contactPoint.contactType,
      "email": business.contactPoint.email
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$"
  }
}

// Performance monitoring
export function trackCoreWebVitals() {
  if (typeof window !== 'undefined') {
    // LCP (Largest Contentful Paint)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime)
          // Send to analytics
          if (window.dataLayer) {
            window.dataLayer.push({
              event: 'core_web_vitals',
              metric_name: 'LCP',
              metric_value: entry.startTime
            })
          }
        }
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] })

    // FID (First Input Delay)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.entryType === 'first-input') {
          const firstInput = entry as PerformanceEventTiming
          console.log('FID:', firstInput.processingStart - firstInput.startTime)
          // Send to analytics
          if (window.dataLayer) {
            window.dataLayer.push({
              event: 'core_web_vitals',
              metric_name: 'FID',
              metric_value: firstInput.processingStart - firstInput.startTime
            })
          }
        }
      }
    }).observe({ entryTypes: ['first-input'] })

    // CLS (Cumulative Layout Shift)
    new PerformanceObserver((entryList) => {
      let cls = 0
      for (const entry of entryList.getEntries()) {
        if (entry.entryType === 'layout-shift') {
          cls += (entry as any).value
        }
      }
      console.log('CLS:', cls)
      // Send to analytics
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'core_web_vitals',
          metric_name: 'CLS',
          metric_value: cls
        })
      }
    }).observe({ entryTypes: ['layout-shift'] })
  }
} 