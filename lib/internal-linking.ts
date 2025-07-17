// Internal Linking Strategy for SEO

export interface InternalLink {
  id: string
  text: string
  url: string
  category: 'product' | 'solution' | 'content' | 'team'
  priority: 'high' | 'medium' | 'low'
  anchorText: string
  relatedKeywords: string[]
  relevanceScore?: number
}

export const internalLinks: InternalLink[] = [
  // High Priority Product Links
  {
    id: 'transitopt',
    text: 'OW TransitOpt™',
    url: '/solutions/transitopt',
    category: 'product',
    priority: 'high',
    anchorText: 'frekans optimizasyonu',
    relatedKeywords: ['toplu taşıma optimizasyonu', 'frekans planlama', 'yolcu akış analizi']
  },
  {
    id: 'fleetopt',
    text: 'OW FleetOpt™',
    url: '/solutions/fleetopt',
    category: 'product',
    priority: 'high',
    anchorText: 'filo optimizasyonu',
    relatedKeywords: ['kaynak tahsisi', 'maliyet azaltma', 'araç yönetimi']
  },
  {
    id: 'ridersense',
    text: 'OW RiderSense™',
    url: '/solutions/ridersense',
    category: 'product',
    priority: 'high',
    anchorText: 'yolcu yoğunluğu tahmini',
    relatedKeywords: ['dinamik planlama', 'yolcu analizi', 'yoğunluk tahmini']
  },
  {
    id: 'costlogic',
    text: 'OW CostLogic™',
    url: '/solutions/costlogic',
    category: 'product',
    priority: 'high',
    anchorText: 'maliyet analizi',
    relatedKeywords: ['yatırım planlama', 'kaynak verimliliği', 'maliyet optimizasyonu']
  },

  // Medium Priority Content Links
  {
    id: 'about',
    text: 'Hakkımızda',
    url: '/about',
    category: 'content',
    priority: 'medium',
    anchorText: 'OW ekibi',
    relatedKeywords: ['vizyon', 'misyon', 'deneyim']
  },
  {
    id: 'team',
    text: 'Ekibimiz',
    url: '/team',
    category: 'team',
    priority: 'medium',
    anchorText: 'uzman ekibimiz',
    relatedKeywords: ['istatistik uzmanı', 'veri mühendisi', 'şehir plancısı']
  },
  {
    id: 'contact',
    text: 'İletişim',
    url: '/contact',
    category: 'content',
    priority: 'medium',
    anchorText: 'bizimle iletişime geçin',
    relatedKeywords: ['demo talebi', 'işbirliği', 'teknik destek']
  },

  // Low Priority Solution Links
  {
    id: 'solutions',
    text: 'Çözümlerimiz',
    url: '/solutions',
    category: 'solution',
    priority: 'low',
    anchorText: 'akıllı şehir çözümleri',
    relatedKeywords: ['teknoloji', 'inovasyon', 'veri odaklı']
  }
]

// Get related links based on content
export function getRelatedLinks(content: string, maxLinks: number = 3): InternalLink[] {
  const contentLower = content.toLowerCase()
  const relevantLinks: InternalLink[] = []

  internalLinks.forEach(link => {
    const relevanceScore = link.relatedKeywords.reduce((score, keyword) => {
      if (contentLower.includes(keyword.toLowerCase())) {
        return score + 1
      }
      return score
    }, 0)

    if (relevanceScore > 0) {
      relevantLinks.push({
        ...link,
        relevanceScore
      })
    }
  })

  return relevantLinks
    .sort((a, b) => (b as any).relevanceScore - (a as any).relevanceScore)
    .slice(0, maxLinks)
}

// Generate contextual links for a specific page
export function generateContextualLinks(pageType: string, currentUrl: string): InternalLink[] {
  const excludeCurrent = (link: InternalLink) => link.url !== currentUrl

  switch (pageType) {
    case 'home':
      return internalLinks
        .filter(link => link.priority === 'high')
        .filter(excludeCurrent)
        .slice(0, 4)

    case 'product':
      return internalLinks
        .filter(link => link.category === 'product')
        .filter(excludeCurrent)
        .slice(0, 3)

    case 'about':
      return internalLinks
        .filter(link => link.category === 'team' || link.category === 'content')
        .filter(excludeCurrent)
        .slice(0, 3)

    case 'solutions':
      return internalLinks
        .filter(link => link.category === 'product')
        .filter(excludeCurrent)
        .slice(0, 4)

    default:
      return internalLinks
        .filter(link => link.priority === 'medium')
        .filter(excludeCurrent)
        .slice(0, 3)
  }
}

// Generate breadcrumb links
export function generateBreadcrumbLinks(currentPath: string): InternalLink[] {
  const segments = currentPath.split('/').filter(Boolean)
  const breadcrumbs: InternalLink[] = []

  let currentUrl = ''
  segments.forEach((segment, index) => {
    currentUrl += `/${segment}`
    
    const link = internalLinks.find(l => l.url === currentUrl)
    if (link) {
      breadcrumbs.push(link)
    } else {
      // Create dynamic breadcrumb
      breadcrumbs.push({
        id: `breadcrumb-${index}`,
        text: segment.charAt(0).toUpperCase() + segment.slice(1),
        url: currentUrl,
        category: 'content',
        priority: 'low',
        anchorText: segment,
        relatedKeywords: []
      })
    }
  })

  return breadcrumbs
}

// Generate footer links
export function generateFooterLinks(): InternalLink[] {
  return internalLinks
    .filter(link => link.priority === 'medium' || link.priority === 'high')
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
}

// Generate sitemap links
export function generateSitemapLinks(): InternalLink[] {
  return internalLinks.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })
}

// Track internal link clicks
export function trackInternalLinkClick(link: InternalLink) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'internal_link_click', {
      event_category: 'navigation',
      event_label: link.text,
      link_url: link.url,
      link_category: link.category,
      link_priority: link.priority
    })
  }
}

// Generate link with tracking
export function createTrackedLink(link: InternalLink, className?: string): string {
  return `<a href="${link.url}" class="${className || ''}" title="${link.text}">${link.anchorText}</a>`
} 