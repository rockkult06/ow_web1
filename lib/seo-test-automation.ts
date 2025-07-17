// SEO Test Otomasyonu Sistemi
export interface SEOTest {
  id: string;
  name: string;
  description: string;
  category: 'technical' | 'content' | 'performance' | 'security' | 'indexing';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'running' | 'passed' | 'failed' | 'skipped';
  result?: SEOTestResult;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  error?: string;
}

export interface SEOTestResult {
  score: number;
  details: string[];
  recommendations: string[];
  data: any;
  screenshots?: string[];
  performance?: PerformanceMetrics;
}

export interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export interface TestSuite {
  id: string;
  name: string;
  description: string;
  tests: SEOTest[];
  status: 'pending' | 'running' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  summary: TestSummary;
}

export interface TestSummary {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  score: number;
  criticalIssues: number;
  highIssues: number;
  mediumIssues: number;
  lowIssues: number;
}

export interface TestSchedule {
  id: string;
  name: string;
  testSuiteId: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string; // HH:MM format
  enabled: boolean;
  lastRun?: Date;
  nextRun?: Date;
}

export class SEOTestAutomation {
  private tests: SEOTest[] = [];
  private testSuites: TestSuite[] = [];
  private schedules: TestSchedule[] = [];

  constructor() {
    this.initializeDefaultTests();
    this.initializeTestSuites();
  }

  private initializeDefaultTests(): void {
    this.tests = [
      // Teknik SEO Testleri
      {
        id: 'title_tag_test',
        name: 'Title Tag Testi',
        description: 'Title tag\'ın varlığı ve uzunluğu kontrol edilir',
        category: 'technical',
        priority: 'critical',
        status: 'pending',
        createdAt: new Date()
      },
      {
        id: 'meta_description_test',
        name: 'Meta Description Testi',
        description: 'Meta description\'ın varlığı ve uzunluğu kontrol edilir',
        category: 'technical',
        priority: 'high',
        status: 'pending',
        createdAt: new Date()
      },
      {
        id: 'structured_data_test',
        name: 'Structured Data Testi',
        description: 'JSON-LD structured data\'nın varlığı kontrol edilir',
        category: 'technical',
        priority: 'medium',
        status: 'pending',
        createdAt: new Date()
      },
      {
        id: 'https_test',
        name: 'HTTPS Testi',
        description: 'HTTPS kullanımı kontrol edilir',
        category: 'security',
        priority: 'critical',
        status: 'pending',
        createdAt: new Date()
      },
      {
        id: 'robots_txt_test',
        name: 'Robots.txt Testi',
        description: 'Robots.txt dosyasının varlığı kontrol edilir',
        category: 'indexing',
        priority: 'high',
        status: 'pending',
        createdAt: new Date()
      },
      {
        id: 'sitemap_test',
        name: 'Sitemap Testi',
        description: 'Sitemap.xml dosyasının varlığı kontrol edilir',
        category: 'indexing',
        priority: 'medium',
        status: 'pending',
        createdAt: new Date()
      },
      {
        id: 'page_speed_test',
        name: 'Sayfa Hızı Testi',
        description: 'Core Web Vitals metrikleri ölçülür',
        category: 'performance',
        priority: 'high',
        status: 'pending',
        createdAt: new Date()
      },
      {
        id: 'mobile_friendly_test',
        name: 'Mobil Uyumluluk Testi',
        description: 'Mobil uyumluluk kontrol edilir',
        category: 'performance',
        priority: 'high',
        status: 'pending',
        createdAt: new Date()
      },
      {
        id: 'heading_structure_test',
        name: 'Heading Yapısı Testi',
        description: 'H1, H2, H3 başlık yapısı kontrol edilir',
        category: 'content',
        priority: 'medium',
        status: 'pending',
        createdAt: new Date()
      },
      {
        id: 'alt_text_test',
        name: 'Alt Text Testi',
        description: 'Görsellerde alt text varlığı kontrol edilir',
        category: 'content',
        priority: 'medium',
        status: 'pending',
        createdAt: new Date()
      },
      {
        id: 'internal_linking_test',
        name: 'İç Linkleme Testi',
        description: 'İç linkleme yapısı kontrol edilir',
        category: 'content',
        priority: 'medium',
        status: 'pending',
        createdAt: new Date()
      },
      {
        id: 'broken_links_test',
        name: 'Bozuk Link Testi',
        description: 'Bozuk linkler tespit edilir',
        category: 'technical',
        priority: 'high',
        status: 'pending',
        createdAt: new Date()
      }
    ];
  }

  private initializeTestSuites(): void {
    this.testSuites = [
      {
        id: 'critical_seo_suite',
        name: 'Kritik SEO Test Paketi',
        description: 'En kritik SEO testlerini içerir',
        tests: this.tests.filter(t => t.priority === 'critical'),
        status: 'pending',
        createdAt: new Date(),
        summary: {
          total: 0,
          passed: 0,
          failed: 0,
          skipped: 0,
          score: 0,
          criticalIssues: 0,
          highIssues: 0,
          mediumIssues: 0,
          lowIssues: 0
        }
      },
      {
        id: 'full_seo_suite',
        name: 'Tam SEO Test Paketi',
        description: 'Tüm SEO testlerini içerir',
        tests: this.tests,
        status: 'pending',
        createdAt: new Date(),
        summary: {
          total: 0,
          passed: 0,
          failed: 0,
          skipped: 0,
          score: 0,
          criticalIssues: 0,
          highIssues: 0,
          mediumIssues: 0,
          lowIssues: 0
        }
      },
      {
        id: 'performance_suite',
        name: 'Performans Test Paketi',
        description: 'Performans odaklı testler',
        tests: this.tests.filter(t => t.category === 'performance'),
        status: 'pending',
        createdAt: new Date(),
        summary: {
          total: 0,
          passed: 0,
          failed: 0,
          skipped: 0,
          score: 0,
          criticalIssues: 0,
          highIssues: 0,
          mediumIssues: 0,
          lowIssues: 0
        }
      }
    ];
  }

  // Test Çalıştırma
  async runTest(testId: string, url: string): Promise<SEOTestResult> {
    const test = this.tests.find(t => t.id === testId);
    if (!test) {
      throw new Error(`Test bulunamadı: ${testId}`);
    }

    test.status = 'running';
    test.startedAt = new Date();

    try {
      let result: SEOTestResult;

      switch (testId) {
        case 'title_tag_test':
          result = await this.runTitleTagTest(url);
          break;
        case 'meta_description_test':
          result = await this.runMetaDescriptionTest(url);
          break;
        case 'structured_data_test':
          result = await this.runStructuredDataTest(url);
          break;
        case 'https_test':
          result = await this.runHTTPSTest(url);
          break;
        case 'robots_txt_test':
          result = await this.runRobotsTxtTest(url);
          break;
        case 'sitemap_test':
          result = await this.runSitemapTest(url);
          break;
        case 'page_speed_test':
          result = await this.runPageSpeedTest(url);
          break;
        case 'mobile_friendly_test':
          result = await this.runMobileFriendlyTest(url);
          break;
        case 'heading_structure_test':
          result = await this.runHeadingStructureTest(url);
          break;
        case 'alt_text_test':
          result = await this.runAltTextTest(url);
          break;
        case 'internal_linking_test':
          result = await this.runInternalLinkingTest(url);
          break;
        case 'broken_links_test':
          result = await this.runBrokenLinksTest(url);
          break;
        default:
          throw new Error(`Bilinmeyen test: ${testId}`);
      }

      test.status = result.score >= 80 ? 'passed' : 'failed';
      test.result = result;
      test.completedAt = new Date();

      return result;
    } catch (error) {
      test.status = 'failed';
      test.error = error instanceof Error ? error.message : 'Bilinmeyen hata';
      test.completedAt = new Date();
      throw error;
    }
  }

  // Title Tag Testi
  private async runTitleTagTest(url: string): Promise<SEOTestResult> {
    const response = await fetch(url);
    const html = await response.text();
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    
    const details: string[] = [];
    let score = 0;

    if (titleMatch) {
      const title = titleMatch[1].trim();
      details.push(`Title tag bulundu: "${title}"`);
      
      if (title.length >= 30 && title.length <= 60) {
        details.push('Title uzunluğu optimal (30-60 karakter)');
        score = 100;
      } else if (title.length < 30) {
        details.push('Title çok kısa (30 karakterden az)');
        score = 50;
      } else {
        details.push('Title çok uzun (60 karakterden fazla)');
        score = 70;
      }
    } else {
      details.push('Title tag bulunamadı');
      score = 0;
    }

    return {
      score,
      details,
      recommendations: score < 100 ? ['Title tag ekleyin veya uzunluğunu optimize edin'] : [],
      data: { title: titleMatch ? titleMatch[1].trim() : null }
    };
  }

  // Meta Description Testi
  private async runMetaDescriptionTest(url: string): Promise<SEOTestResult> {
    const response = await fetch(url);
    const html = await response.text();
    const metaMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    
    const details: string[] = [];
    let score = 0;

    if (metaMatch) {
      const description = metaMatch[1].trim();
      details.push(`Meta description bulundu: "${description}"`);
      
      if (description.length >= 120 && description.length <= 160) {
        details.push('Meta description uzunluğu optimal (120-160 karakter)');
        score = 100;
      } else if (description.length < 120) {
        details.push('Meta description çok kısa (120 karakterden az)');
        score = 60;
      } else {
        details.push('Meta description çok uzun (160 karakterden fazla)');
        score = 80;
      }
    } else {
      details.push('Meta description bulunamadı');
      score = 0;
    }

    return {
      score,
      details,
      recommendations: score < 100 ? ['Meta description ekleyin veya uzunluğunu optimize edin'] : [],
      data: { description: metaMatch ? metaMatch[1].trim() : null }
    };
  }

  // Structured Data Testi
  private async runStructuredDataTest(url: string): Promise<SEOTestResult> {
    const response = await fetch(url);
    const html = await response.text();
    const jsonLdMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
    
    const details: string[] = [];
    let score = 0;

    if (jsonLdMatches && jsonLdMatches.length > 0) {
      details.push(`${jsonLdMatches.length} adet JSON-LD structured data bulundu`);
      score = 100;
    } else {
      details.push('JSON-LD structured data bulunamadı');
      score = 0;
    }

    return {
      score,
      details,
      recommendations: score < 100 ? ['JSON-LD structured data ekleyin'] : [],
      data: { structuredDataCount: jsonLdMatches ? jsonLdMatches.length : 0 }
    };
  }

  // HTTPS Testi
  private async runHTTPSTest(url: string): Promise<SEOTestResult> {
    const isHTTPS = url.startsWith('https://');
    const details: string[] = [];
    let score = 0;

    if (isHTTPS) {
      details.push('HTTPS kullanılıyor');
      score = 100;
    } else {
      details.push('HTTPS kullanılmıyor');
      score = 0;
    }

    return {
      score,
      details,
      recommendations: score < 100 ? ['SSL sertifikası kurun ve HTTPS kullanın'] : [],
      data: { isHTTPS }
    };
  }

  // Robots.txt Testi
  private async runRobotsTxtTest(url: string): Promise<SEOTestResult> {
    const baseUrl = new URL(url).origin;
    const robotsUrl = `${baseUrl}/robots.txt`;
    
    const details: string[] = [];
    let score = 0;

    try {
      const response = await fetch(robotsUrl);
      if (response.ok) {
        details.push('Robots.txt dosyası bulundu');
        score = 100;
      } else {
        details.push('Robots.txt dosyası bulunamadı');
        score = 0;
      }
    } catch (error) {
      details.push('Robots.txt dosyasına erişilemiyor');
      score = 0;
    }

    return {
      score,
      details,
      recommendations: score < 100 ? ['Robots.txt dosyası oluşturun'] : [],
      data: { robotsUrl }
    };
  }

  // Sitemap Testi
  private async runSitemapTest(url: string): Promise<SEOTestResult> {
    const baseUrl = new URL(url).origin;
    const sitemapUrl = `${baseUrl}/sitemap.xml`;
    
    const details: string[] = [];
    let score = 0;

    try {
      const response = await fetch(sitemapUrl);
      if (response.ok) {
        details.push('Sitemap.xml dosyası bulundu');
        score = 100;
      } else {
        details.push('Sitemap.xml dosyası bulunamadı');
        score = 0;
      }
    } catch (error) {
      details.push('Sitemap.xml dosyasına erişilemiyor');
      score = 0;
    }

    return {
      score,
      details,
      recommendations: score < 100 ? ['Sitemap.xml dosyası oluşturun'] : [],
      data: { sitemapUrl }
    };
  }

  // Sayfa Hızı Testi
  private async runPageSpeedTest(url: string): Promise<SEOTestResult> {
    const details: string[] = [];
    let score = 0;

    // Basit performans ölçümü
    const startTime = performance.now();
    try {
      const response = await fetch(url);
      const endTime = performance.now();
      const loadTime = endTime - startTime;

      details.push(`Sayfa yükleme süresi: ${loadTime.toFixed(2)}ms`);

      if (loadTime < 1000) {
        details.push('Sayfa hızı mükemmel');
        score = 100;
      } else if (loadTime < 2000) {
        details.push('Sayfa hızı iyi');
        score = 80;
      } else if (loadTime < 3000) {
        details.push('Sayfa hızı orta');
        score = 60;
      } else {
        details.push('Sayfa hızı yavaş');
        score = 40;
      }
    } catch (error) {
      details.push('Sayfa yüklenemedi');
      score = 0;
    }

    return {
      score,
      details,
      recommendations: score < 80 ? ['Sayfa hızını optimize edin'] : [],
      data: { loadTime: performance.now() - startTime }
    };
  }

  // Mobil Uyumluluk Testi
  private async runMobileFriendlyTest(url: string): Promise<SEOTestResult> {
    const response = await fetch(url);
    const html = await response.text();
    const viewportMatch = html.match(/<meta[^>]*name=["']viewport["'][^>]*>/i);
    
    const details: string[] = [];
    let score = 0;

    if (viewportMatch) {
      details.push('Viewport meta tag bulundu');
      score = 100;
    } else {
      details.push('Viewport meta tag bulunamadı');
      score = 0;
    }

    return {
      score,
      details,
      recommendations: score < 100 ? ['Viewport meta tag ekleyin'] : [],
      data: { hasViewport: !!viewportMatch }
    };
  }

  // Heading Yapısı Testi
  private async runHeadingStructureTest(url: string): Promise<SEOTestResult> {
    const response = await fetch(url);
    const html = await response.text();
    
    const h1Matches = html.match(/<h1[^>]*>.*?<\/h1>/gi);
    const h2Matches = html.match(/<h2[^>]*>.*?<\/h2>/gi);
    const h3Matches = html.match(/<h3[^>]*>.*?<\/h3>/gi);
    
    const details: string[] = [];
    let score = 0;

    const h1Count = h1Matches ? h1Matches.length : 0;
    const h2Count = h2Matches ? h2Matches.length : 0;
    const h3Count = h3Matches ? h3Matches.length : 0;

    details.push(`H1: ${h1Count}, H2: ${h2Count}, H3: ${h3Count}`);

    if (h1Count === 1 && h2Count >= 1) {
      details.push('Heading yapısı optimal');
      score = 100;
    } else if (h1Count === 1) {
      details.push('H1 var ama H2 eksik');
      score = 70;
    } else if (h1Count === 0) {
      details.push('H1 başlığı eksik');
      score = 30;
    } else {
      details.push('Birden fazla H1 başlığı var');
      score = 50;
    }

    return {
      score,
      details,
      recommendations: score < 100 ? ['Heading yapısını optimize edin'] : [],
      data: { h1Count, h2Count, h3Count }
    };
  }

  // Alt Text Testi
  private async runAltTextTest(url: string): Promise<SEOTestResult> {
    const response = await fetch(url);
    const html = await response.text();
    
    const imgMatches = html.match(/<img[^>]*>/gi);
    const imgWithAltMatches = html.match(/<img[^>]*alt=["'][^"']+["'][^>]*>/gi);
    
    const details: string[] = [];
    let score = 0;

    const totalImages = imgMatches ? imgMatches.length : 0;
    const imagesWithAlt = imgWithAltMatches ? imgWithAltMatches.length : 0;

    details.push(`Toplam görsel: ${totalImages}, Alt text'li: ${imagesWithAlt}`);

    if (totalImages === 0) {
      details.push('Görsel bulunamadı');
      score = 100;
    } else if (imagesWithAlt === totalImages) {
      details.push('Tüm görsellerde alt text var');
      score = 100;
    } else if (imagesWithAlt >= totalImages * 0.8) {
      details.push('Çoğu görselde alt text var');
      score = 80;
    } else {
      details.push('Birçok görselde alt text eksik');
      score = 40;
    }

    return {
      score,
      details,
      recommendations: score < 100 ? ['Eksik alt text\'leri ekleyin'] : [],
      data: { totalImages, imagesWithAlt }
    };
  }

  // İç Linkleme Testi
  private async runInternalLinkingTest(url: string): Promise<SEOTestResult> {
    const response = await fetch(url);
    const html = await response.text();
    
    const linkMatches = html.match(/<a[^>]*href=["']([^"']+)["'][^>]*>/gi);
    const internalLinkMatches = html.match(/<a[^>]*href=["']\/([^"']+)["'][^>]*>/gi);
    
    const details: string[] = [];
    let score = 0;

    const totalLinks = linkMatches ? linkMatches.length : 0;
    const internalLinks = internalLinkMatches ? internalLinkMatches.length : 0;

    details.push(`Toplam link: ${totalLinks}, İç link: ${internalLinks}`);

    if (internalLinks >= 3) {
      details.push('İç linkleme yeterli');
      score = 100;
    } else if (internalLinks >= 1) {
      details.push('İç linkleme var ama yetersiz');
      score = 60;
    } else {
      details.push('İç linkleme eksik');
      score = 20;
    }

    return {
      score,
      details,
      recommendations: score < 100 ? ['Daha fazla iç link ekleyin'] : [],
      data: { totalLinks, internalLinks }
    };
  }

  // Bozuk Link Testi
  private async runBrokenLinksTest(url: string): Promise<SEOTestResult> {
    const response = await fetch(url);
    const html = await response.text();
    
    const linkMatches = html.match(/<a[^>]*href=["']([^"']+)["'][^>]*>/gi);
    const details: string[] = [];
    let score = 100;
    let brokenLinks = 0;

    if (linkMatches) {
      // İlk 5 linki test et (performans için)
      const testLinks = linkMatches.slice(0, 5);
      
      for (const linkMatch of testLinks) {
        const hrefMatch = linkMatch.match(/href=["']([^"']+)["']/);
        if (hrefMatch) {
          const href = hrefMatch[1];
          if (href.startsWith('http')) {
            try {
              const linkResponse = await fetch(href, { method: 'HEAD' });
              if (!linkResponse.ok) {
                brokenLinks++;
                details.push(`Bozuk link: ${href}`);
              }
            } catch (error) {
              brokenLinks++;
              details.push(`Erişilemeyen link: ${href}`);
            }
          }
        }
      }

      if (brokenLinks === 0) {
        details.push('Bozuk link bulunamadı');
      } else {
        score = Math.max(0, 100 - (brokenLinks * 20));
      }
    } else {
      details.push('Link bulunamadı');
    }

    return {
      score,
      details,
      recommendations: score < 100 ? ['Bozuk linkleri düzeltin'] : [],
      data: { brokenLinks, totalTested: linkMatches ? Math.min(linkMatches.length, 5) : 0 }
    };
  }

  // Test Suite Çalıştırma
  async runTestSuite(suiteId: string, url: string): Promise<TestSuite> {
    const suite = this.testSuites.find(s => s.id === suiteId);
    if (!suite) {
      throw new Error(`Test suite bulunamadı: ${suiteId}`);
    }

    suite.status = 'running';

    const results: SEOTestResult[] = [];
    let passed = 0;
    let failed = 0;
    let skipped = 0;

    for (const test of suite.tests) {
      try {
        const result = await this.runTest(test.id, url);
        results.push(result);
        
        if (result.score >= 80) {
          passed++;
        } else {
          failed++;
        }
      } catch (error) {
        failed++;
        console.error(`Test hatası: ${test.id}`, error);
      }
    }

    const total = suite.tests.length;
    const score = total > 0 ? (passed / total) * 100 : 0;

    const summary: TestSummary = {
      total,
      passed,
      failed,
      skipped,
      score,
      criticalIssues: suite.tests.filter(t => t.priority === 'critical' && t.status === 'failed').length,
      highIssues: suite.tests.filter(t => t.priority === 'high' && t.status === 'failed').length,
      mediumIssues: suite.tests.filter(t => t.priority === 'medium' && t.status === 'failed').length,
      lowIssues: suite.tests.filter(t => t.priority === 'low' && t.status === 'failed').length
    };

    suite.status = failed === 0 ? 'completed' : 'failed';
    suite.completedAt = new Date();
    suite.summary = summary;

    return suite;
  }

  // Test Zamanlaması
  scheduleTest(schedule: TestSchedule): void {
    this.schedules.push(schedule);
  }

  // Zamanlanmış Testleri Çalıştır
  async runScheduledTests(): Promise<void> {
    const now = new Date();
    
    for (const schedule of this.schedules) {
      if (schedule.enabled && schedule.nextRun && now >= schedule.nextRun) {
        try {
          await this.runTestSuite(schedule.testSuiteId, 'https://optimizeworld.net');
          schedule.lastRun = now;
          schedule.nextRun = this.calculateNextRun(schedule.frequency, schedule.time);
        } catch (error) {
          console.error(`Zamanlanmış test hatası: ${schedule.id}`, error);
        }
      }
    }
  }

  // Sonraki Çalışma Zamanını Hesapla
  private calculateNextRun(frequency: string, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const nextRun = new Date();
    nextRun.setHours(hours, minutes, 0, 0);

    switch (frequency) {
      case 'daily':
        nextRun.setDate(nextRun.getDate() + 1);
        break;
      case 'weekly':
        nextRun.setDate(nextRun.getDate() + 7);
        break;
      case 'monthly':
        nextRun.setMonth(nextRun.getMonth() + 1);
        break;
    }

    return nextRun;
  }

  // Public Methods
  getTests(): SEOTest[] {
    return this.tests;
  }

  getTestSuites(): TestSuite[] {
    return this.testSuites;
  }

  getSchedules(): TestSchedule[] {
    return this.schedules;
  }

  getTestById(id: string): SEOTest | undefined {
    return this.tests.find(t => t.id === id);
  }

  getTestSuiteById(id: string): TestSuite | undefined {
    return this.testSuites.find(s => s.id === id);
  }
}

// SEO Test Automation Hook
export const useSEOTestAutomation = () => {
  const automation = new SEOTestAutomation();

  const runTest = async (testId: string, url: string) => {
    return await automation.runTest(testId, url);
  };

  const runTestSuite = async (suiteId: string, url: string) => {
    return await automation.runTestSuite(suiteId, url);
  };

  const getTests = () => {
    return automation.getTests();
  };

  const getTestSuites = () => {
    return automation.getTestSuites();
  };

  const getSchedules = () => {
    return automation.getSchedules();
  };

  const scheduleTest = (schedule: TestSchedule) => {
    automation.scheduleTest(schedule);
  };

  return {
    runTest,
    runTestSuite,
    getTests,
    getTestSuites,
    getSchedules,
    scheduleTest
  };
}; 