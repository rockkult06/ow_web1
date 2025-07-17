// Structured Data (JSON-LD) for SEO
export interface OrganizationData {
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
  sameAs: string[]
  foundingDate: string
  industry: string
}

export interface ProductData {
  name: string
  description: string
  category: string
  url: string
  image: string
  brand: string
  offers: {
    price: string
    priceCurrency: string
    availability: string
  }
}

export interface WebSiteData {
  name: string
  url: string
  description: string
  potentialAction: {
    target: string
    queryInput: string
  }
}

export interface BreadcrumbData {
  name: string
  url: string
}

// Organization Schema
export function generateOrganizationSchema(data: OrganizationData) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": data.name,
    "url": data.url,
    "logo": {
      "@type": "ImageObject",
      "url": data.logo
    },
    "description": data.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": data.address.streetAddress,
      "addressLocality": data.address.addressLocality,
      "addressRegion": data.address.addressRegion,
      "postalCode": data.address.postalCode,
      "addressCountry": data.address.addressCountry
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": data.contactPoint.telephone,
      "contactType": data.contactPoint.contactType,
      "email": data.contactPoint.email
    },
    "sameAs": data.sameAs,
    "foundingDate": data.foundingDate,
    "industry": data.industry
  }
}

// Product Schema
export function generateProductSchema(data: ProductData) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": data.name,
    "description": data.description,
    "category": data.category,
    "url": data.url,
    "image": data.image,
    "brand": {
      "@type": "Brand",
      "name": data.brand
    },
    "offers": {
      "@type": "Offer",
      "price": data.offers.price,
      "priceCurrency": data.offers.priceCurrency,
      "availability": data.offers.availability
    },
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web-based"
  }
}

// Website Schema
export function generateWebsiteSchema(data: WebSiteData) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": data.name,
    "url": data.url,
    "description": data.description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": data.potentialAction.target,
      "query-input": data.potentialAction.queryInput
    }
  }
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(items: BreadcrumbData[]) {
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

// Local Business Schema
export function generateLocalBusinessSchema(data: OrganizationData) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": data.name,
    "url": data.url,
    "logo": data.logo,
    "description": data.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": data.address.streetAddress,
      "addressLocality": data.address.addressLocality,
      "addressRegion": data.address.addressRegion,
      "postalCode": data.address.postalCode,
      "addressCountry": data.address.addressCountry
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": data.contactPoint.telephone,
      "contactType": data.contactPoint.contactType,
      "email": data.contactPoint.email
    },
    "sameAs": data.sameAs,
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$"
  }
}

// FAQ Schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
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

// Service Schema
export function generateServiceSchema(data: {
  name: string
  description: string
  provider: string
  areaServed: string
  serviceType: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.name,
    "description": data.description,
    "provider": {
      "@type": "Organization",
      "name": data.provider
    },
    "areaServed": {
      "@type": "Country",
      "name": data.areaServed
    },
    "serviceType": data.serviceType
  }
} 