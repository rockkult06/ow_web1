// Otomatik Site Haritası ve XML Yönetimi Sistemi
export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number; // 0.0 - 1.0
  images?: SitemapImage[];
  videos?: SitemapVideo[];
  news?: SitemapNews;
  mobile?: boolean;
}

export interface SitemapImage {
  loc: string;
  title?: string;
  caption?: string;
  geoLocation?: string;
  license?: string;
}

export interface SitemapVideo {
  thumbnail_loc: string;
  title: string;
  description: string;
  content_loc?: string;
  duration?: string;
  family_friendly?: boolean;
  restriction?: string;
  gallery_loc?: string;
  price?: string;
  requires_subscription?: boolean;
  uploader?: string;
  live?: boolean;
}

export interface SitemapNews {
  publication_name: string;
  publication_language: string;
  access?: 'subscription' | 'registration';
  genres?: string;
  publication_date: string;
  title: string;
  keywords?: string;
  stock_tickers?: string;
}

export interface SitemapIndex {
  sitemaps: SitemapIndexEntry[];
  lastUpdated: Date;
}

export interface SitemapIndexEntry {
  loc: string;
  lastmod?: string;
}

export interface SitemapConfig {
  baseUrl: string;
  outputPath: string;
  includeImages: boolean;
  includeVideos: boolean;
  includeNews: boolean;
  maxUrlsPerSitemap: number;
  compression: boolean;
  autoUpdate: boolean;
  updateFrequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
  excludePatterns: string[];
  includePatterns: string[];
  priorityRules: PriorityRule[];
  changefreqRules: ChangefreqRule[];
}

export interface PriorityRule {
  pattern: string;
  priority: number;
  condition?: 'exact' | 'contains' | 'regex';
}

export interface ChangefreqRule {
  pattern: string;
  changefreq: SitemapUrl['changefreq'];
  condition?: 'exact' | 'contains' | 'regex';
}

export interface SitemapStats {
  totalUrls: number;
  totalSitemaps: number;
  totalSize: number; // bytes
  lastGenerated: Date;
  nextUpdate: Date;
  compressionRatio?: number;
  errors: SitemapError[];
  warnings: SitemapWarning[];
}

export interface SitemapError {
  type: 'url' | 'xml' | 'validation' | 'generation';
  message: string;
  url?: string;
  line?: number;
}

export interface SitemapWarning {
  type: 'url' | 'priority' | 'changefreq' | 'image' | 'video';
  message: string;
  url?: string;
  suggestion?: string;
}

export interface RobotsTxt {
  userAgents: RobotsUserAgent[];
  sitemaps: string[];
  crawlDelay?: number;
  disallow: string[];
  allow: string[];
}

export interface RobotsUserAgent {
  name: string;
  disallow: string[];
  allow: string[];
  crawlDelay?: number;
}

export class SitemapManager {
  private config: SitemapConfig;
  private urls: SitemapUrl[] = [];
  private sitemaps: Map<string, SitemapUrl[]> = new Map();
  private stats: SitemapStats;

  constructor(config: Partial<SitemapConfig> = {}) {
    this.config = {
      baseUrl: 'https://optimizeworld.net',
      outputPath: './public',
      includeImages: true,
      includeVideos: false,
      includeNews: false,
      maxUrlsPerSitemap: 50000,
      compression: true,
      autoUpdate: true,
      updateFrequency: 'daily',
      excludePatterns: ['/admin/*', '/private/*', '/temp/*'],
      includePatterns: ['/*'],
      priorityRules: [
        { pattern: '/', priority: 1.0 },
        { pattern: '/solutions/*', priority: 0.9 },
        { pattern: '/blog/*', priority: 0.8 },
        { pattern: '/about', priority: 0.7 },
        { pattern: '/contact', priority: 0.6 }
      ],
      changefreqRules: [
        { pattern: '/', changefreq: 'daily' },
        { pattern: '/blog/*', changefreq: 'weekly' },
        { pattern: '/solutions/*', changefreq: 'monthly' },
        { pattern: '/about', changefreq: 'monthly' }
      ],
      ...config
    };

    this.stats = {
      totalUrls: 0,
      totalSitemaps: 0,
      totalSize: 0,
      lastGenerated: new Date(),
      nextUpdate: this.calculateNextUpdate(),
      errors: [],
      warnings: []
    };

    this.initializeSampleUrls();
  }

  private initializeSampleUrls(): void {
    this.urls = [
      {
        loc: 'https://optimizeworld.net',
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 1.0
      },
      {
        loc: 'https://optimizeworld.net/about',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: 'https://optimizeworld.net/contact',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.6
      },
      {
        loc: 'https://optimizeworld.net/solutions/smart-city',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.9,
        images: [
          {
            loc: 'https://optimizeworld.net/images/smart-city-solution.jpg',
            title: 'Akıllı Şehir Çözümleri',
            caption: 'Akıllı şehir teknolojileri ve optimizasyon çözümleri'
          }
        ]
      },
      {
        loc: 'https://optimizeworld.net/solutions/transport',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.9,
        images: [
          {
            loc: 'https://optimizeworld.net/images/transport-solution.jpg',
            title: 'Ulaşım Optimizasyonu',
            caption: 'Toplu taşıma ve ulaşım optimizasyon çözümleri'
          }
        ]
      },
      {
        loc: 'https://optimizeworld.net/blog/seo-optimization-guide',
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        loc: 'https://optimizeworld.net/blog/backlink-strategies',
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.8
      }
    ];
  }

  // URL Ekleme
  addUrl(url: SitemapUrl): void {
    // URL'yi filtrele
    if (this.shouldExcludeUrl(url.loc)) {
      return;
    }

    // Öncelik ve değişim sıklığını belirle
    url.priority = this.determinePriority(url.loc);
    url.changefreq = this.determineChangefreq(url.loc);

    // Son güncelleme tarihini ayarla
    if (!url.lastmod) {
      url.lastmod = new Date().toISOString();
    }

    this.urls.push(url);
    this.updateStats();
  }

  // URL Filtreleme
  private shouldExcludeUrl(url: string): boolean {
    // Dışlama kalıplarını kontrol et
    for (const pattern of this.config.excludePatterns) {
      if (this.matchesPattern(url, pattern)) {
        return true;
      }
    }

    // Dahil etme kalıplarını kontrol et
    if (this.config.includePatterns.length > 0) {
      let shouldInclude = false;
      for (const pattern of this.config.includePatterns) {
        if (this.matchesPattern(url, pattern)) {
          shouldInclude = true;
          break;
        }
      }
      if (!shouldInclude) {
        return true;
      }
    }

    return false;
  }

  // Kalıp Eşleştirme
  private matchesPattern(url: string, pattern: string): boolean {
    if (pattern.includes('*')) {
      const regexPattern = pattern.replace(/\*/g, '.*');
      const regex = new RegExp(regexPattern);
      return regex.test(url);
    }
    return url === pattern;
  }

  // Öncelik Belirleme
  private determinePriority(url: string): number {
    for (const rule of this.config.priorityRules) {
      if (this.matchesPattern(url, rule.pattern)) {
        return rule.priority;
      }
    }
    return 0.5; // Varsayılan öncelik
  }

  // Değişim Sıklığı Belirleme
  private determineChangefreq(url: string): SitemapUrl['changefreq'] {
    for (const rule of this.config.changefreqRules) {
      if (this.matchesPattern(url, rule.pattern)) {
        return rule.changefreq;
      }
    }
    return 'monthly'; // Varsayılan değişim sıklığı
  }

  // Site Haritası Oluşturma
  generateSitemap(): string {
    const sitemapUrls = this.urls.map(url => this.formatSitemapUrl(url));
    const sitemapContent = this.createSitemapXML(sitemapUrls);
    
    this.stats.lastGenerated = new Date();
    this.stats.nextUpdate = this.calculateNextUpdate();
    this.stats.totalUrls = this.urls.length;
    this.stats.totalSize = new Blob([sitemapContent]).size;

    return sitemapContent;
  }

  // Çoklu Site Haritası Oluşturma
  generateSitemapIndex(): SitemapIndex {
    const sitemaps: SitemapIndexEntry[] = [];
    const maxUrls = this.config.maxUrlsPerSitemap;
    const totalSitemaps = Math.ceil(this.urls.length / maxUrls);

    for (let i = 0; i < totalSitemaps; i++) {
      const startIndex = i * maxUrls;
      const endIndex = startIndex + maxUrls;
      const sitemapUrls = this.urls.slice(startIndex, endIndex);
      
      const sitemapName = `sitemap-${i + 1}.xml`;
      const sitemapContent = this.createSitemapXML(sitemapUrls.map(url => this.formatSitemapUrl(url)));
      
      this.sitemaps.set(sitemapName, sitemapUrls);
      sitemaps.push({
        loc: `${this.config.baseUrl}/${sitemapName}`,
        lastmod: new Date().toISOString()
      });
    }

    this.stats.totalSitemaps = sitemaps.length;
    this.stats.lastGenerated = new Date();
    this.stats.nextUpdate = this.calculateNextUpdate();

    return {
      sitemaps,
      lastUpdated: new Date()
    };
  }

  // Site Haritası XML Oluşturma
  private createSitemapXML(urls: string[]): string {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
    
    let namespaces = '';
    if (this.config.includeImages) {
      namespaces += ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';
    }
    if (this.config.includeVideos) {
      namespaces += ' xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"';
    }
    if (this.config.includeNews) {
      namespaces += ' xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"';
    }
    
    const urlsetClose = '</urlset>';
    
    return `${xmlHeader}\n${urlsetOpen}${namespaces}>\n${urls.join('\n')}\n${urlsetClose}`;
  }

  // URL Formatı
  private formatSitemapUrl(url: SitemapUrl): string {
    let formattedUrl = `  <url>\n    <loc>${url.loc}</loc>`;
    
    if (url.lastmod) {
      formattedUrl += `\n    <lastmod>${url.lastmod}</lastmod>`;
    }
    
    if (url.changefreq) {
      formattedUrl += `\n    <changefreq>${url.changefreq}</changefreq>`;
    }
    
    if (url.priority) {
      formattedUrl += `\n    <priority>${url.priority}</priority>`;
    }

    // Görseller
    if (url.images && this.config.includeImages) {
      url.images.forEach(image => {
        formattedUrl += `\n    <image:image>\n      <image:loc>${image.loc}</image:loc>`;
        if (image.title) {
          formattedUrl += `\n      <image:title>${image.title}</image:title>`;
        }
        if (image.caption) {
          formattedUrl += `\n      <image:caption>${image.caption}</image:caption>`;
        }
        formattedUrl += `\n    </image:image>`;
      });
    }

    // Videolar
    if (url.videos && this.config.includeVideos) {
      url.videos.forEach(video => {
        formattedUrl += `\n    <video:video>\n      <video:thumbnail_loc>${video.thumbnail_loc}</video:thumbnail_loc>`;
        formattedUrl += `\n      <video:title>${video.title}</video:title>`;
        formattedUrl += `\n      <video:description>${video.description}</video:description>`;
        if (video.duration) {
          formattedUrl += `\n      <video:duration>${video.duration}</video:duration>`;
        }
        formattedUrl += `\n    </video:video>`;
      });
    }

    // Haberler
    if (url.news && this.config.includeNews) {
      formattedUrl += `\n    <news:news>\n      <news:publication>`;
      formattedUrl += `\n        <news:name>${url.news.publication_name}</news:name>`;
      formattedUrl += `\n        <news:language>${url.news.publication_language}</news:language>`;
      formattedUrl += `\n      </news:publication>`;
      formattedUrl += `\n      <news:publication_date>${url.news.publication_date}</news:publication_date>`;
      formattedUrl += `\n      <news:title>${url.news.title}</news:title>`;
      formattedUrl += `\n    </news:news>`;
    }

    formattedUrl += `\n  </url>`;
    return formattedUrl;
  }

  // Site Haritası İndeksi XML Oluşturma
  generateSitemapIndexXML(): string {
    const index = this.generateSitemapIndex();
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    const sitemapindexOpen = '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    const sitemapindexClose = '</sitemapindex>';
    
    const sitemaps = index.sitemaps.map(sitemap => {
      let formatted = `  <sitemap>\n    <loc>${sitemap.loc}</loc>`;
      if (sitemap.lastmod) {
        formatted += `\n    <lastmod>${sitemap.lastmod}</lastmod>`;
      }
      formatted += `\n  </sitemap>`;
      return formatted;
    }).join('\n');

    return `${xmlHeader}\n${sitemapindexOpen}\n${sitemaps}\n${sitemapindexClose}`;
  }

  // Robots.txt Oluşturma
  generateRobotsTxt(): string {
    const robots: RobotsTxt = {
      userAgents: [
        {
          name: '*',
          disallow: ['/admin/', '/private/', '/temp/'],
          allow: ['/'],
          crawlDelay: 1
        }
      ],
      sitemaps: [
        `${this.config.baseUrl}/sitemap.xml`,
        `${this.config.baseUrl}/sitemap-index.xml`
      ],
      crawlDelay: 1,
      disallow: ['/admin/', '/private/', '/temp/'],
      allow: ['/']
    };

    let robotsContent = '';
    
    // User-agent kuralları
    robots.userAgents.forEach(agent => {
      robotsContent += `User-agent: ${agent.name}\n`;
      agent.disallow.forEach(path => {
        robotsContent += `Disallow: ${path}\n`;
      });
      agent.allow.forEach(path => {
        robotsContent += `Allow: ${path}\n`;
      });
      if (agent.crawlDelay) {
        robotsContent += `Crawl-delay: ${agent.crawlDelay}\n`;
      }
      robotsContent += '\n';
    });

    // Sitemap referansları
    robots.sitemaps.forEach(sitemap => {
      robotsContent += `Sitemap: ${sitemap}\n`;
    });

    return robotsContent;
  }

  // Site Haritası Doğrulama
  validateSitemap(xmlContent: string): {
    isValid: boolean;
    errors: SitemapError[];
    warnings: SitemapWarning[];
  } {
    const errors: SitemapError[] = [];
    const warnings: SitemapWarning[] = [];

    // XML formatı kontrolü
    if (!xmlContent.includes('<?xml version="1.0"')) {
      errors.push({
        type: 'xml',
        message: 'Geçersiz XML formatı',
        line: 1
      });
    }

    // URL kontrolü
    const urlMatches = xmlContent.match(/<loc>(.*?)<\/loc>/g);
    if (urlMatches) {
      urlMatches.forEach((match, index) => {
        const url = match.replace(/<\/?loc>/g, '');
        if (!this.isValidUrl(url)) {
          errors.push({
            type: 'url',
            message: 'Geçersiz URL formatı',
            url,
            line: index + 1
          });
        }
      });
    }

    // Öncelik kontrolü
    const priorityMatches = xmlContent.match(/<priority>(.*?)<\/priority>/g);
    if (priorityMatches) {
      priorityMatches.forEach((match, index) => {
        const priority = parseFloat(match.replace(/<\/?priority>/g, ''));
        if (priority < 0 || priority > 1) {
          warnings.push({
            type: 'priority',
            message: 'Öncelik değeri 0.0-1.0 arasında olmalıdır',
            suggestion: 'Öncelik değerini 0.0-1.0 arasında ayarlayın'
          });
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  // URL Geçerlilik Kontrolü
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Sonraki Güncelleme Tarihi Hesaplama
  private calculateNextUpdate(): Date {
    const now = new Date();
    switch (this.config.updateFrequency) {
      case 'hourly':
        return new Date(now.getTime() + 60 * 60 * 1000);
      case 'daily':
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
      case 'weekly':
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      case 'monthly':
        return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
    }
  }

  // İstatistikleri Güncelleme
  private updateStats(): void {
    this.stats.totalUrls = this.urls.length;
    this.stats.totalSitemaps = Math.ceil(this.urls.length / this.config.maxUrlsPerSitemap);
  }

  // Public Methods
  getUrls(): SitemapUrl[] {
    return this.urls;
  }

  getConfig(): SitemapConfig {
    return this.config;
  }

  getStats(): SitemapStats {
    return this.stats;
  }

  updateConfig(updates: Partial<SitemapConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  clearUrls(): void {
    this.urls = [];
    this.updateStats();
  }

  removeUrl(url: string): void {
    this.urls = this.urls.filter(u => u.loc !== url);
    this.updateStats();
  }

  // URL Toplu Ekleme
  addUrls(urls: SitemapUrl[]): void {
    urls.forEach(url => this.addUrl(url));
  }

  // Site Haritası İndeksleme
  getSitemapIndex(): SitemapIndex {
    return this.generateSitemapIndex();
  }
}

// Sitemap Manager Hook
export const useSitemapManager = () => {
  const manager = new SitemapManager();

  const addUrl = (url: SitemapUrl) => {
    return manager.addUrl(url);
  };

  const addUrls = (urls: SitemapUrl[]) => {
    return manager.addUrls(urls);
  };

  const generateSitemap = () => {
    return manager.generateSitemap();
  };

  const generateSitemapIndex = () => {
    return manager.generateSitemapIndex();
  };

  const generateSitemapIndexXML = () => {
    return manager.generateSitemapIndexXML();
  };

  const generateRobotsTxt = () => {
    return manager.generateRobotsTxt();
  };

  const validateSitemap = (xmlContent: string) => {
    return manager.validateSitemap(xmlContent);
  };

  const getUrls = () => {
    return manager.getUrls();
  };

  const getConfig = () => {
    return manager.getConfig();
  };

  const getStats = () => {
    return manager.getStats();
  };

  return {
    addUrl,
    addUrls,
    generateSitemap,
    generateSitemapIndex,
    generateSitemapIndexXML,
    generateRobotsTxt,
    validateSitemap,
    getUrls,
    getConfig,
    getStats
  };
}; 