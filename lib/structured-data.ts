// Structured Data (JSON-LD) for SEO
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OW - Optimize the World",
    "alternateName": "OW",
    "url": "https://optimizeworld.net",
    "logo": "https://optimizeworld.net/images/logo.png",
    "description": "OW, akıllı şehirler için veri odaklı çözümler sunan teknoloji şirketi. Toplu taşıma optimizasyonu, akıllı hareketlilik ve ulaşım teknolojileri.",
    "foundingDate": "2023",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "İzmir",
      "addressRegion": "İzmir",
      "addressCountry": "TR",
      "streetAddress": "Gazi Mustafa Kemal District, Kaynaklar Street Seyrek, Menemen"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+90-232-235-3535",
      "contactType": "customer service",
      "email": "info@ow.com",
      "availableLanguage": ["Turkish", "English", "German"]
    },
    "sameAs": [
      "https://linkedin.com/company/ow-optimize-world",
      "https://twitter.com/optimizeworld",
      "https://facebook.com/optimizeworld"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Smart City Solutions",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "SoftwareApplication",
            "name": "OW TransitOpt™",
            "description": "Frekans Optimizasyonu: Gerçek Talebe Dayalı Hassas Planlama"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "SoftwareApplication",
            "name": "OW FleetOpt™",
            "description": "Filo Optimizasyonu: Daha Akıllı Kaynak Tahsisi, Daha Düşük Maliyetler"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "SoftwareApplication",
            "name": "OW RiderSense™",
            "description": "Yolcu yoğunluğunu önceden tahmin edin"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "SoftwareApplication",
            "name": "OW CostLogic™",
            "description": "Ulaşım yatırımlarını doğru yere yönlendirin"
          }
        }
      ]
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Turkey"
      },
      {
        "@type": "Country",
        "name": "Germany"
      },
      {
        "@type": "Country",
        "name": "United States"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 38.4192,
        "longitude": 27.1287
      },
      "geoRadius": "1000"
    }
  }
}

export const generateWebSiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "OW - Optimize the World",
    "url": "https://optimizeworld.net",
    "description": "Akıllı şehirler için veri odaklı çözümler",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://optimizeworld.net/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": ["tr-TR", "en-US", "de-DE"],
    "publisher": {
      "@type": "Organization",
      "name": "OW - Optimize the World"
    }
  }
}

export const generateWebPageSchema = (pageTitle: string, pageDescription: string, pageUrl: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": pageUrl,
    "inLanguage": "tr-TR",
    "isPartOf": {
      "@type": "WebSite",
      "name": "OW - Optimize the World",
      "url": "https://optimizeworld.net"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": "https://optimizeworld.net"
        }
      ]
    }
  }
}

export const generateProductSchema = (product: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": product.title,
    "description": product.shortDescription,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "TRY",
      "availability": "https://schema.org/InStock"
    },
    "provider": {
      "@type": "Organization",
      "name": "OW - Optimize the World"
    },
    "featureList": [
      "Veri odaklı optimizasyon",
      "Gerçek zamanlı analiz",
      "Yapay zeka destekli çözümler",
      "Akıllı şehir entegrasyonu"
    ]
  }
}

export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "OW - Optimize the World",
    "image": "https://optimizeworld.net/images/office.jpg",
    "description": "Akıllı şehirler için veri odaklı çözümler sunan teknoloji şirketi",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gazi Mustafa Kemal District, Kaynaklar Street Seyrek, Menemen",
      "addressLocality": "İzmir",
      "addressRegion": "İzmir",
      "postalCode": "35660",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 38.4192,
      "longitude": 27.1287
    },
    "url": "https://optimizeworld.net",
    "telephone": "+90-232-235-3535",
    "email": "info@ow.com",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://linkedin.com/company/ow-optimize-world",
      "https://twitter.com/optimizeworld"
    ]
  }
}

export const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "OW nedir ve ne yapar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "OW (Optimize the World), akıllı şehirler için veri odaklı çözümler sunan teknoloji şirketidir. Toplu taşıma optimizasyonu, akıllı hareketlilik ve ulaşım teknolojileri alanlarında hizmet vermektedir."
        }
      },
      {
        "@type": "Question",
        "name": "OW TransitOpt™ nedir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "OW TransitOpt™, frekans optimizasyonu için geliştirilmiş bir çözümdür. Gerçek talebe dayalı hassas planlama yaparak toplu taşıma hizmetlerini optimize eder."
        }
      },
      {
        "@type": "Question",
        "name": "OW FleetOpt™ nasıl çalışır?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "OW FleetOpt™, filo optimizasyonu için geliştirilmiştir. Daha akıllı kaynak tahsisi yaparak maliyetleri düşürür ve verimliliği artırır."
        }
      },
      {
        "@type": "Question",
        "name": "Hangi sektörlere hizmet veriyorsunuz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Belediyeler, ulaşım daireleri, akıllı şehir projeleri, üniversiteler, araştırma kurumları, ulaşım bakanlıkları ve teknoloji girişimlerine hizmet veriyoruz."
        }
      }
    ]
  }
}

export const generateBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  }
}

export const generateBlogPostingSchema = (post: {
  title: string
  description: string
  url: string
  author: string
  datePublished: string
  dateModified: string
  image?: string
  category: string
  tags: string[]
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "url": post.url,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "OW - Optimize the World",
      "logo": {
        "@type": "ImageObject",
        "url": "https://optimizeworld.net/images/logo.png"
      }
    },
    "datePublished": post.datePublished,
    "dateModified": post.dateModified,
    "image": post.image || "https://optimizeworld.net/images/blog-default.jpg",
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.url
    }
  }
}

export const generateBlogSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "OptimizeWorld Blog",
    "description": "Lojistik optimizasyonu, sürü yönetimi ve veri analizi hakkında güncel blog yazıları",
    "url": "https://optimizeworld.net/blog",
    "publisher": {
      "@type": "Organization",
      "name": "OW - Optimize the World"
    },
    "inLanguage": "tr-TR"
  }
} 