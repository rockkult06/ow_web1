// Dynamic Meta Tag Generator for SEO

export interface PageMeta {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonical?: string
  noIndex?: boolean
  noFollow?: boolean
  structuredData?: any
}

export function generatePageMeta(pageMeta: PageMeta, language: string = 'tr') {
  const baseUrl = 'https://optimizeworld.net'
  
  return {
    title: pageMeta.title,
    description: pageMeta.description,
    keywords: pageMeta.keywords.join(', '),
    robots: {
      index: !pageMeta.noIndex,
      follow: !pageMeta.noFollow,
      googleBot: {
        index: !pageMeta.noIndex,
        follow: !pageMeta.noFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: language === 'tr' ? 'tr_TR' : language === 'en' ? 'en_US' : 'de_DE',
      url: pageMeta.canonical || baseUrl,
      title: pageMeta.title,
      description: pageMeta.description,
      siteName: 'OW - Optimize the World',
      images: pageMeta.ogImage ? [
        {
          url: pageMeta.ogImage.startsWith('http') ? pageMeta.ogImage : `${baseUrl}${pageMeta.ogImage}`,
          width: 1200,
          height: 630,
          alt: pageMeta.title,
          type: 'image/png',
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageMeta.title,
      description: pageMeta.description,
      images: pageMeta.ogImage ? [
        pageMeta.ogImage.startsWith('http') ? pageMeta.ogImage : `${baseUrl}${pageMeta.ogImage}`
      ] : undefined,
      creator: '@optimizeworld',
      site: '@optimizeworld',
    },
    alternates: {
      canonical: pageMeta.canonical || baseUrl,
      languages: {
        'tr-TR': `${baseUrl}/tr`,
        'en-US': `${baseUrl}/en`,
        'de-DE': `${baseUrl}/de`,
      },
    },
  }
}

// Predefined meta for different page types
export const pageMetaTemplates = {
  home: {
    title: 'OW - Optimize the World | Akıllı Şehir Çözümleri',
    description: 'OW, akıllı şehirler için veri odaklı çözümler sunan teknoloji şirketi. Toplu taşıma optimizasyonu, akıllı hareketlilik ve ulaşım teknolojileri.',
    keywords: ['akıllı şehir', 'toplu taşıma optimizasyonu', 'veri analizi', 'ulaşım teknolojileri', 'OW', 'Optimize the World'],
    ogImage: '/images/og-home.png',
  },
  
  products: {
    title: 'Çözümlerimiz | OW - Akıllı Şehir Teknolojileri',
    description: 'OW TransitOpt™, OW FleetOpt™, OW RiderSense™ ve diğer akıllı şehir çözümlerimizi keşfedin.',
    keywords: ['OW TransitOpt', 'OW FleetOpt', 'OW RiderSense', 'akıllı şehir çözümleri', 'toplu taşıma optimizasyonu'],
    ogImage: '/images/og-products.png',
  },
  
  about: {
    title: 'Hakkımızda | OW - Optimize the World',
    description: 'OW ekibi hakkında bilgi edinin. Veri odaklı akıllı şehir çözümleri geliştiren uzman ekibimiz.',
    keywords: ['OW ekibi', 'hakkımızda', 'vizyon', 'misyon', 'akıllı şehir teknolojileri'],
    ogImage: '/images/og-about.png',
  },
  
  contact: {
    title: 'İletişim | OW - Optimize the World',
    description: 'OW ile iletişime geçin. Demo talebi, işbirliği ve teknik destek için bizimle iletişime geçin.',
    keywords: ['iletişim', 'demo talebi', 'işbirliği', 'teknik destek', 'OW iletişim'],
    ogImage: '/images/og-contact.png',
  },
  
  team: {
    title: 'Ekibimiz | OW - Optimize the World',
    description: 'OW ekibini tanıyın. İstatistik uzmanları, veri mühendisleri, şehir plancıları ve sistem mühendislerinden oluşan uzman ekibimiz.',
    keywords: ['OW ekibi', 'uzmanlar', 'istatistik uzmanı', 'veri mühendisi', 'şehir plancısı'],
    ogImage: '/images/og-team.png',
  },
}

// Generate meta for specific products
export function generateProductMeta(productId: string, language: string = 'tr') {
  const productMeta = {
    'ow-transitopt': {
      title: 'OW TransitOpt™ | Frekans Optimizasyonu',
      description: 'Gerçek talebe dayalı hassas planlama ile toplu taşıma frekansını optimize edin.',
      keywords: ['OW TransitOpt', 'frekans optimizasyonu', 'toplu taşıma planlama', 'yolcu akış analizi'],
      ogImage: '/solutions/transitOpt.PNG',
    },
    'ow-fleetopt': {
      title: 'OW FleetOpt™ | Filo Optimizasyonu',
      description: 'Daha akıllı kaynak tahsisi ile filo optimizasyonu ve maliyet azaltma.',
      keywords: ['OW FleetOpt', 'filo optimizasyonu', 'kaynak tahsisi', 'maliyet azaltma'],
      ogImage: '/solutions/FleetOpt.jpg',
    },
    'ow-ridersense': {
      title: 'OW RiderSense™ | Yolcu Yoğunluğu Tahmini',
      description: 'Yolcu yoğunluğunu önceden tahmin edin ve dinamik sefer planlaması yapın.',
      keywords: ['OW RiderSense', 'yolcu yoğunluğu', 'tahmin', 'dinamik planlama'],
      ogImage: '/solutions/RiderSense.jpg',
    },
    'ow-costlogic': {
      title: 'OW CostLogic™ | Maliyet Analizi',
      description: 'Ulaşım yatırımlarını doğru yere yönlendirin ve maliyet analizi yapın.',
      keywords: ['OW CostLogic', 'maliyet analizi', 'yatırım planlama', 'kaynak verimliliği'],
      ogImage: '/solutions/CostLogic.jpg',
    },
  }

  const meta = productMeta[productId as keyof typeof productMeta] || {
    title: 'OW Çözümleri',
    description: 'Akıllı şehir çözümleri',
    keywords: ['OW', 'akıllı şehir'],
    ogImage: '/images/og-products.png',
  }

  return generatePageMeta(meta, language)
}

// Generate breadcrumb structured data
export function generateBreadcrumbData(path: string, language: string = 'tr') {
  const baseUrl = 'https://optimizeworld.net'
  const segments = path.split('/').filter(Boolean)
  
  const breadcrumbs = [
    { name: language === 'tr' ? 'Ana Sayfa' : language === 'en' ? 'Home' : 'Startseite', url: baseUrl }
  ]

  let currentPath = ''
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    
    const segmentNames: { [key: string]: { [key: string]: string } } = {
      'solutions': { tr: 'Çözümler', en: 'Solutions', de: 'Lösungen' },
      'about': { tr: 'Hakkımızda', en: 'About', de: 'Über uns' },
      'contact': { tr: 'İletişim', en: 'Contact', de: 'Kontakt' },
      'team': { tr: 'Ekibimiz', en: 'Team', de: 'Team' },
    }

    const name = segmentNames[segment]?.[language] || segment
    breadcrumbs.push({ name, url: `${baseUrl}${currentPath}` })
  })

  return breadcrumbs
} 