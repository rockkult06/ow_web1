// International SEO Configuration

export const SUPPORTED_LANGUAGES = {
  tr: {
    code: 'tr',
    name: 'Türkçe',
    nativeName: 'Türkçe',
    flag: '🇹🇷',
    hreflang: 'tr-TR',
    direction: 'ltr'
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    hreflang: 'en-US',
    direction: 'ltr'
  },
  de: {
    code: 'de',
    name: 'Deutsch',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    hreflang: 'de-DE',
    direction: 'ltr'
  }
} as const

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES

export const DEFAULT_LANGUAGE: SupportedLanguage = 'tr'

// SEO-friendly URL structure
export function getLocalizedPath(path: string, language: SupportedLanguage): string {
  if (language === DEFAULT_LANGUAGE) {
    return path
  }
  return `/${language}${path}`
}

// Generate hreflang tags
export function generateHreflangTags(currentPath: string): Array<{ hreflang: string; href: string }> {
  const tags = []
  
  Object.entries(SUPPORTED_LANGUAGES).forEach(([code, lang]) => {
    const localizedPath = getLocalizedPath(currentPath, code as SupportedLanguage)
    tags.push({
      hreflang: lang.hreflang,
      href: `https://optimizeworld.net${localizedPath}`
    })
  })
  
  // Add x-default
  tags.push({
    hreflang: 'x-default',
    href: `https://optimizeworld.net${currentPath}`
  })
  
  return tags
}

// Content translations
export const TRANSLATIONS = {
  tr: {
    meta: {
      title: 'OW - Optimize the World | Akıllı Şehir Çözümleri',
      description: 'OW, akıllı şehirler için veri odaklı çözümler sunan teknoloji şirketi. Toplu taşıma optimizasyonu, akıllı hareketlilik ve ulaşım teknolojileri.',
      keywords: 'akıllı şehir, toplu taşıma optimizasyonu, veri analizi, ulaşım teknolojileri, OW, Optimize the World'
    },
    navigation: {
      home: 'Ana Sayfa',
      solutions: 'Çözümlerimiz',
      about: 'Hakkımızda',
      team: 'Ekibimiz',
      contact: 'İletişim'
    },
    hero: {
      title: 'Akıllı Şehirler İçin',
      subtitle: 'Veri Odaklı Çözümler',
      description: 'OW ile şehirlerinizi optimize edin. Toplu taşıma, akıllı hareketlilik ve ulaşım teknolojileri ile geleceği şekillendirin.',
      cta: 'Demo Talep Et'
    }
  },
  en: {
    meta: {
      title: 'OW - Optimize the World | Smart City Solutions',
      description: 'OW is a technology company offering data-driven solutions for smart cities. Public transport optimization, smart mobility and transportation technologies.',
      keywords: 'smart city, public transport optimization, data analysis, transportation technologies, OW, Optimize the World'
    },
    navigation: {
      home: 'Home',
      solutions: 'Solutions',
      about: 'About',
      team: 'Team',
      contact: 'Contact'
    },
    hero: {
      title: 'Data-Driven Solutions',
      subtitle: 'For Smart Cities',
      description: 'Optimize your cities with OW. Shape the future with public transport, smart mobility and transportation technologies.',
      cta: 'Request Demo'
    }
  },
  de: {
    meta: {
      title: 'OW - Optimize the World | Intelligente Stadtlösungen',
      description: 'OW ist ein Technologieunternehmen, das datengesteuerte Lösungen für intelligente Städte anbietet. ÖPNV-Optimierung, intelligente Mobilität und Verkehrstechnologien.',
      keywords: 'intelligente stadt, öpnv optimierung, datenanalyse, verkehrstechnologien, OW, Optimize the World'
    },
    navigation: {
      home: 'Startseite',
      solutions: 'Lösungen',
      about: 'Über uns',
      team: 'Team',
      contact: 'Kontakt'
    },
    hero: {
      title: 'Datengetriebene Lösungen',
      subtitle: 'Für Intelligente Städte',
      description: 'Optimieren Sie Ihre Städte mit OW. Gestalten Sie die Zukunft mit öffentlichem Verkehr, intelligenter Mobilität und Verkehrstechnologien.',
      cta: 'Demo Anfordern'
    }
  }
} as const

// Get translation for current language
export function getTranslation(language: SupportedLanguage, key: string): string {
  const keys = key.split('.')
  let value: any = TRANSLATIONS[language]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}

// Language detection utility
export function detectLanguage(acceptLanguage: string): SupportedLanguage {
  const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].toLowerCase())
  
  for (const lang of languages) {
    if (lang.startsWith('tr')) return 'tr'
    if (lang.startsWith('en')) return 'en'
    if (lang.startsWith('de')) return 'de'
  }
  
  return DEFAULT_LANGUAGE
}

// SEO-friendly language switcher
export function generateLanguageSwitcherLinks(currentPath: string, currentLang: SupportedLanguage) {
  return Object.entries(SUPPORTED_LANGUAGES).map(([code, lang]) => ({
    code: code as SupportedLanguage,
    name: lang.name,
    nativeName: lang.nativeName,
    flag: lang.flag,
    href: getLocalizedPath(currentPath, code as SupportedLanguage),
    isActive: code === currentLang
  }))
} 