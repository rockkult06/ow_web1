// Advanced Schema Markup for SEO

export interface ProductSchema {
  name: string
  description: string
  image: string
  url: string
  category: string
  price?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  brand: string
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  }
}

export interface ServiceSchema {
  name: string
  description: string
  provider: {
    name: string
    url: string
  }
  areaServed: string[]
  serviceType: string
  url: string
}

export interface ArticleSchema {
  headline: string
  description: string
  image: string
  author: {
    name: string
    url?: string
  }
  publisher: {
    name: string
    logo: string
  }
  datePublished: string
  dateModified: string
  url: string
}

export interface FAQSchema {
  question: string
  answer: string
}

export interface BreadcrumbSchema {
  name: string
  url: string
}

// Generate Product Schema
export function generateProductSchema(product: ProductSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    url: product.url,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    ...(product.price && {
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'TRY',
        availability: `https://schema.org/${product.availability || 'InStock'}`,
        url: product.url
      }
    }),
    ...(product.aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.aggregateRating.ratingValue,
        reviewCount: product.aggregateRating.reviewCount
      }
    })
  }
}

// Generate Service Schema
export function generateServiceSchema(service: ServiceSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: service.provider.name,
      url: service.provider.url
    },
    areaServed: service.areaServed.map(area => ({
      '@type': 'Country',
      name: area
    })),
    serviceType: service.serviceType,
    url: service.url
  }
}

// Generate Article Schema
export function generateArticleSchema(article: ArticleSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image,
    author: {
      '@type': 'Person',
      name: article.author.name,
      ...(article.author.url && { url: article.author.url })
    },
    publisher: {
      '@type': 'Organization',
      name: article.publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: article.publisher.logo
      }
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    url: article.url
  }
}

// Generate FAQ Schema
export function generateFAQSchema(faqs: FAQSchema[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

// Generate Breadcrumb Schema
export function generateBreadcrumbSchema(breadcrumbs: BreadcrumbSchema[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url
    }))
  }
}

// Generate Local Business Schema
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'OW - Optimize the World',
    description: 'Akıllı şehirler için veri odaklı çözümler sunan teknoloji şirketi',
    url: 'https://optimizeworld.net',
    telephone: '+90-232-235-3535',
    email: 'info@ow.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Gazi Mustafa Kemal District, Kaynaklar Street Seyrek',
      addressLocality: 'Menemen',
      addressRegion: 'İzmir',
      postalCode: '35660',
      addressCountry: 'TR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.4237,
      longitude: 27.1428
    },
    openingHours: 'Mo-Fr 09:00-18:00',
    sameAs: [
      'https://www.linkedin.com/company/ow-optimize-world',
      'https://twitter.com/optimizeworld',
      'https://www.facebook.com/optimizeworld'
    ]
  }
}

// Generate Software Application Schema
export function generateSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'OW TransitOpt™',
    description: 'Frekans optimizasyonu ile toplu taşıma verimliliğini artıran yazılım çözümü',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: 'https://optimizeworld.net/solutions/transitopt',
    author: {
      '@type': 'Organization',
      name: 'OW - Optimize the World'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock'
    }
  }
}

// Generate WebSite Schema with Search
export function generateWebsiteSchemaWithSearch() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'OW - Optimize the World',
    url: 'https://optimizeworld.net',
    description: 'Akıllı şehirler için veri odaklı çözümler',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://optimizeworld.net/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }
}

// Generate HowTo Schema
export function generateHowToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Akıllı Şehir Çözümleri Nasıl Uygulanır?',
    description: 'OW çözümlerini kullanarak akıllı şehir projelerinizi nasıl optimize edebileceğinizi öğrenin',
    image: 'https://optimizeworld.net/images/how-to-smart-city.jpg',
    totalTime: 'PT30M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'TRY',
      value: '0'
    },
    step: [
      {
        '@type': 'HowToStep',
        name: 'İhtiyaç Analizi',
        text: 'Şehrinizin mevcut ulaşım sistemini analiz edin ve iyileştirme alanlarını belirleyin',
        url: 'https://optimizeworld.net/solutions#analysis'
      },
      {
        '@type': 'HowToStep',
        name: 'OW Çözümlerini Seçin',
        text: 'OW TransitOpt™, OW FleetOpt™ veya OW RiderSense™ çözümlerinden size uygun olanı seçin',
        url: 'https://optimizeworld.net/solutions'
      },
      {
        '@type': 'HowToStep',
        name: 'Demo Talep Edin',
        text: 'Seçtiğiniz çözüm için demo talep edin ve uzmanlarımızla görüşün',
        url: 'https://optimizeworld.net/contact'
      }
    ]
  }
}

// Generate Video Schema
export function generateVideoSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'OW Akıllı Şehir Çözümleri Tanıtımı',
    description: 'OW\'nin akıllı şehir çözümlerini tanıtan video',
    thumbnailUrl: 'https://optimizeworld.net/images/video-thumbnail.jpg',
    uploadDate: '2024-01-15T10:00:00Z',
    duration: 'PT3M30S',
    contentUrl: 'https://optimizeworld.net/videos/ow-intro.mp4',
    embedUrl: 'https://optimizeworld.net/videos/embed/ow-intro',
    publisher: {
      '@type': 'Organization',
      name: 'OW - Optimize the World',
      logo: {
        '@type': 'ImageObject',
        url: 'https://optimizeworld.net/images/logo.png'
      }
    }
  }
} 