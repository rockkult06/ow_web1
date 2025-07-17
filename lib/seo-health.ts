// SEO Health Monitoring & Alert Sistemi
export interface SEOHealthStatus {
  overall: 'healthy' | 'warning' | 'critical';
  score: number;
  issues: SEOHealthIssue[];
  alerts: SEOAlert[];
  recommendations: SEOHealthRecommendation[];
  lastChecked: Date;
}

export interface SEOHealthIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'technical' | 'content' | 'performance' | 'security' | 'indexing';
  title: string;
  description: string;
  url?: string;
  element?: string;
  impact: string;
  solution: string;
  detectedAt: Date;
  resolvedAt?: Date;
}

export interface SEOAlert {
  id: string;
  type: 'ranking_drop' | 'traffic_decline' | 'indexing_issue' | 'performance_issue' | 'security_issue';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  message: string;
  data: any;
  createdAt: Date;
  acknowledgedAt?: Date;
  resolvedAt?: Date;
}

export interface SEOHealthRecommendation {
  id: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  title: string;
  description: string;
  impact: string;
  effort: string;
  implementation: string;
  estimatedTime: string;
}

export interface SearchConsoleData {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  keywords: string[];
  pages: string[];
  lastUpdated: Date;
}

export interface AnalyticsData {
  sessions: number;
  users: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversionRate: number;
  topPages: Array<{ page: string; views: number }>;
  topSources: Array<{ source: string; sessions: number }>;
}

export class SEOHealthMonitor {
  private issues: SEOHealthIssue[] = [];
  private alerts: SEOAlert[] = [];
  private searchConsoleData: SearchConsoleData | null = null;
  private analyticsData: AnalyticsData | null = null;

  constructor() {
    this.initializeMonitoring();
  }

  private initializeMonitoring(): void {
    // Periyodik kontroller başlat
    this.startPeriodicChecks();
    
    // Event listener'lar ekle
    this.setupEventListeners();
  }

  private startPeriodicChecks(): void {
    // Her 6 saatte bir kontrol
    setInterval(() => {
      this.performHealthCheck();
    }, 6 * 60 * 60 * 1000);

    // Her gün detaylı analiz
    setInterval(() => {
      this.performDetailedAnalysis();
    }, 24 * 60 * 60 * 1000);
  }

  private setupEventListeners(): void {
    // Sayfa yükleme hatalarını izle
    window.addEventListener('error', (event) => {
      this.recordError('page_load_error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    // Performance API ile izleme
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'navigation') {
            this.checkPerformanceMetrics(entry as PerformanceNavigationTiming);
          }
        });
      });
      
      observer.observe({ entryTypes: ['navigation', 'largest-contentful-paint'] });
    }
  }

  // Ana Health Check
  async performHealthCheck(): Promise<SEOHealthStatus> {
    const checks = await Promise.all([
      this.checkTechnicalSEO(),
      this.checkContentSEO(),
      this.checkPerformanceSEO(),
      this.checkSecuritySEO(),
      this.checkIndexingSEO()
    ]);

    const allIssues = checks.flat();
    const score = this.calculateHealthScore(allIssues);
    const status = this.determineOverallStatus(score, allIssues);

    return {
      overall: status,
      score,
      issues: allIssues,
      alerts: this.alerts,
      recommendations: this.generateRecommendations(allIssues),
      lastChecked: new Date()
    };
  }

  // Teknik SEO Kontrolü
  private async checkTechnicalSEO(): Promise<SEOHealthIssue[]> {
    const issues: SEOHealthIssue[] = [];

    // Meta tags kontrolü
    const title = document.querySelector('title');
    const description = document.querySelector('meta[name="description"]');
    const viewport = document.querySelector('meta[name="viewport"]');

    if (!title || title.textContent!.length < 30) {
      issues.push({
        id: 'missing_title',
        type: 'error',
        severity: 'critical',
        category: 'technical',
        title: 'Title Tag Eksik veya Çok Kısa',
        description: 'Title tag SEO için kritik öneme sahiptir',
        element: 'title',
        impact: 'Sıralama performansında düşüş',
        solution: '30-60 karakter arasında açıklayıcı title ekleyin',
        detectedAt: new Date()
      });
    }

    if (!description) {
      issues.push({
        id: 'missing_description',
        type: 'error',
        severity: 'high',
        category: 'technical',
        title: 'Meta Description Eksik',
        description: 'Meta description arama sonuçlarında görünür',
        element: 'meta[name="description"]',
        impact: 'CTR düşüşü',
        solution: '120-160 karakter arasında meta description ekleyin',
        detectedAt: new Date()
      });
    }

    // Structured data kontrolü
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    if (jsonLdScripts.length === 0) {
      issues.push({
        id: 'missing_structured_data',
        type: 'warning',
        severity: 'medium',
        category: 'technical',
                 title: 'Structured Data Eksik',
         description: 'Structured data rich snippet\'lar için gereklidir',
        element: 'structured-data',
        impact: 'Rich snippet fırsatı kaybı',
        solution: 'JSON-LD structured data ekleyin',
        detectedAt: new Date()
      });
    }

    return issues;
  }

  // İçerik SEO Kontrolü
  private async checkContentSEO(): Promise<SEOHealthIssue[]> {
    const issues: SEOHealthIssue[] = [];

    // Heading yapısı kontrolü
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length < 2) {
      issues.push({
        id: 'poor_heading_structure',
        type: 'warning',
        severity: 'medium',
        category: 'content',
        title: 'Heading Yapısı Zayıf',
        description: 'Heading yapısı SEO ve kullanıcı deneyimi için önemlidir',
        element: 'headings',
        impact: 'SEO performansında düşüş',
        solution: 'H2, H3, H4 başlıkları ekleyin',
        detectedAt: new Date()
      });
    }

    // Alt text kontrolü
    const images = document.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
    if (imagesWithoutAlt.length > 0) {
      issues.push({
        id: 'missing_alt_text',
        type: 'warning',
        severity: 'medium',
        category: 'content',
        title: `${imagesWithoutAlt.length} Görselde Alt Text Eksik`,
        description: 'Alt text görsel arama ve erişilebilirlik için gereklidir',
        element: 'images',
        impact: 'Görsel SEO kaybı',
        solution: 'Tüm görsellere açıklayıcı alt text ekleyin',
        detectedAt: new Date()
      });
    }

    return issues;
  }

  // Performans SEO Kontrolü
  private async checkPerformanceSEO(): Promise<SEOHealthIssue[]> {
    const issues: SEOHealthIssue[] = [];

    // Core Web Vitals kontrolü
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name === 'LCP') {
            const lcp = entry.startTime;
            if (lcp > 2500) {
              issues.push({
                id: 'slow_lcp',
                type: 'error',
                severity: 'high',
                category: 'performance',
                title: 'LCP Değeri Yüksek',
                description: `LCP değeri ${lcp}ms, 2.5s altında olmalı`,
                element: 'largest-contentful-paint',
                impact: 'Core Web Vitals düşüşü',
                solution: 'Görsel optimizasyonu ve CDN kullanımı',
                detectedAt: new Date()
              });
            }
          }
        });
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }

    return issues;
  }

  // Güvenlik SEO Kontrolü
  private async checkSecuritySEO(): Promise<SEOHealthIssue[]> {
    const issues: SEOHealthIssue[] = [];

    // HTTPS kontrolü
    if (window.location.protocol !== 'https:') {
      issues.push({
        id: 'no_https',
        type: 'error',
        severity: 'critical',
        category: 'security',
        title: 'HTTPS Kullanılmıyor',
        description: 'HTTPS SEO ve güvenlik için gereklidir',
        element: 'protocol',
        impact: 'Sıralama ve güvenlik sorunu',
        solution: 'SSL sertifikası kurun',
        detectedAt: new Date()
      });
    }

    return issues;
  }

  // İndeksleme SEO Kontrolü
  private async checkIndexingSEO(): Promise<SEOHealthIssue[]> {
    const issues: SEOHealthIssue[] = [];

    // Robots.txt kontrolü
    try {
      const robotsResponse = await fetch('/robots.txt');
      if (!robotsResponse.ok) {
        issues.push({
          id: 'missing_robots',
          type: 'error',
          severity: 'high',
          category: 'indexing',
          title: 'Robots.txt Eksik',
          description: 'Robots.txt arama motorları için gereklidir',
          element: 'robots.txt',
          impact: 'İndeksleme sorunları',
          solution: 'Robots.txt dosyası oluşturun',
          detectedAt: new Date()
        });
      }
    } catch (error) {
      issues.push({
        id: 'robots_error',
        type: 'error',
        severity: 'medium',
        category: 'indexing',
        title: 'Robots.txt Erişim Hatası',
        description: 'Robots.txt dosyasına erişilemiyor',
        element: 'robots.txt',
        impact: 'İndeksleme sorunları',
        solution: 'Robots.txt dosyasını kontrol edin',
        detectedAt: new Date()
      });
    }

    // Sitemap kontrolü
    try {
      const sitemapResponse = await fetch('/sitemap.xml');
      if (!sitemapResponse.ok) {
        issues.push({
          id: 'missing_sitemap',
          type: 'warning',
          severity: 'medium',
          category: 'indexing',
          title: 'Sitemap.xml Eksik',
          description: 'Sitemap arama motorları için faydalıdır',
          element: 'sitemap.xml',
          impact: 'İndeksleme hızında düşüş',
          solution: 'Sitemap.xml dosyası oluşturun',
          detectedAt: new Date()
        });
      }
    } catch (error) {
      // Sitemap hatası kritik değil, sessizce geç
    }

    return issues;
  }

  // Performans Metrikleri Kontrolü
  private checkPerformanceMetrics(entry: PerformanceNavigationTiming): void {
    const loadTime = entry.loadEventEnd - entry.loadEventStart;
    const domContentLoaded = entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart;

    if (loadTime > 3000) {
      this.createAlert('performance_issue', 'high', 'Sayfa Yükleme Süresi Yüksek', 
        `Sayfa ${loadTime}ms'de yüklendi, 3s altında olmalı`, { loadTime });
    }

    if (domContentLoaded > 1500) {
      this.createAlert('performance_issue', 'medium', 'DOM Content Loaded Yavaş', 
        `DOM ${domContentLoaded}ms'de hazır, 1.5s altında olmalı`, { domContentLoaded });
    }
  }

  // Hata Kaydetme
  private recordError(type: string, data: any): void {
    this.createAlert('performance_issue', 'medium', 'JavaScript Hatası', 
      `Sayfa yükleme sırasında hata oluştu: ${data.message}`, data);
  }

  // Alert Oluşturma
  private createAlert(type: SEOAlert['type'], severity: SEOAlert['severity'], 
    title: string, message: string, data: any): void {
    const alert: SEOAlert = {
      id: `alert_${Date.now()}`,
      type,
      severity,
      title,
      message,
      data,
      createdAt: new Date()
    };

    this.alerts.push(alert);
    this.notifyAlert(alert);
  }

  // Alert Bildirimi
  private notifyAlert(alert: SEOAlert): void {
    // Console'a log
    console.warn(`SEO Alert: ${alert.title} - ${alert.message}`);

         // Google Analytics'e gönder
     if (typeof window !== 'undefined' && (window as any).gtag) {
       (window as any).gtag('event', 'seo_alert', {
         alert_type: alert.type,
         alert_severity: alert.severity,
         alert_title: alert.title
       });
     }

    // Kritik alert'ler için ek bildirim
    if (alert.severity === 'critical') {
      this.sendCriticalAlert(alert);
    }
  }

  // Kritik Alert Gönderimi
  private sendCriticalAlert(alert: SEOAlert): void {
    // Email, Slack, SMS gibi bildirimler burada implement edilebilir
    console.error(`CRITICAL SEO ALERT: ${alert.title}`);
  }

  // Health Score Hesaplama
  private calculateHealthScore(issues: SEOHealthIssue[]): number {
    let score = 100;

    issues.forEach(issue => {
      switch (issue.severity) {
        case 'critical':
          score -= 20;
          break;
        case 'high':
          score -= 10;
          break;
        case 'medium':
          score -= 5;
          break;
        case 'low':
          score -= 2;
          break;
      }
    });

    return Math.max(0, score);
  }

  // Genel Durum Belirleme
  private determineOverallStatus(score: number, issues: SEOHealthIssue[]): 'healthy' | 'warning' | 'critical' {
    const criticalIssues = issues.filter(issue => issue.severity === 'critical').length;
    
    if (criticalIssues > 0 || score < 50) {
      return 'critical';
    } else if (score < 80) {
      return 'warning';
    } else {
      return 'healthy';
    }
  }

  // Öneriler Oluşturma
  private generateRecommendations(issues: SEOHealthIssue[]): SEOHealthRecommendation[] {
    const recommendations: SEOHealthRecommendation[] = [];

    const criticalIssues = issues.filter(issue => issue.severity === 'critical');
    const highIssues = issues.filter(issue => issue.severity === 'high');

    if (criticalIssues.length > 0) {
      recommendations.push({
        id: 'fix_critical_issues',
        priority: 'critical',
        category: 'Technical SEO',
        title: 'Kritik SEO Sorunlarını Düzelt',
        description: `${criticalIssues.length} kritik SEO sorunu tespit edildi`,
        impact: 'Yüksek - Sıralama ve trafik kaybı',
        effort: 'Orta - 1-2 gün',
        implementation: 'Kritik sorunları öncelik sırasına göre düzeltin',
        estimatedTime: '1-2 gün'
      });
    }

    if (highIssues.length > 0) {
      recommendations.push({
        id: 'fix_high_issues',
        priority: 'high',
        category: 'Technical SEO',
        title: 'Yüksek Öncelikli Sorunları Düzelt',
        description: `${highIssues.length} yüksek öncelikli SEO sorunu tespit edildi`,
        impact: 'Orta - SEO performansında iyileşme',
        effort: 'Düşük - 1-2 saat',
        implementation: 'Yüksek öncelikli sorunları düzeltin',
        estimatedTime: '1-2 saat'
      });
    }

    return recommendations;
  }

  // Detaylı Analiz
  private async performDetailedAnalysis(): Promise<void> {
    // Search Console verilerini al
    await this.fetchSearchConsoleData();
    
    // Analytics verilerini al
    await this.fetchAnalyticsData();
    
    // Trend analizi yap
    this.analyzeTrends();
  }

  // Search Console Verilerini Alma
  private async fetchSearchConsoleData(): Promise<void> {
    // Google Search Console API entegrasyonu burada yapılacak
    // Şimdilik mock data
    this.searchConsoleData = {
      clicks: 1250,
      impressions: 15000,
      ctr: 8.33,
      position: 15.5,
      keywords: ['akıllı şehir', 'toplu taşıma', 'ulaşım optimizasyonu'],
      pages: ['/', '/solutions', '/about'],
      lastUpdated: new Date()
    };
  }

  // Analytics Verilerini Alma
  private async fetchAnalyticsData(): Promise<void> {
    // Google Analytics API entegrasyonu burada yapılacak
    // Şimdilik mock data
    this.analyticsData = {
      sessions: 5000,
      users: 3500,
      pageViews: 15000,
      bounceRate: 45.2,
      avgSessionDuration: 180,
      conversionRate: 2.5,
      topPages: [
        { page: '/', views: 5000 },
        { page: '/solutions', views: 3000 },
        { page: '/about', views: 2000 }
      ],
      topSources: [
        { source: 'google', sessions: 3000 },
        { source: 'direct', sessions: 1000 },
        { source: 'social', sessions: 500 }
      ]
    };
  }

  // Trend Analizi
  private analyzeTrends(): void {
    if (!this.searchConsoleData || !this.analyticsData) return;

    // Trafik düşüşü kontrolü
    if (this.analyticsData.sessions < 4000) {
      this.createAlert('traffic_decline', 'high', 'Trafik Düşüşü Tespit Edildi', 
        'Son dönemde trafik düşüşü yaşanıyor', { sessions: this.analyticsData.sessions });
    }

    // Sıralama düşüşü kontrolü
    if (this.searchConsoleData.position > 20) {
      this.createAlert('ranking_drop', 'medium', 'Sıralama Düşüşü', 
        'Ortalama sıralama pozisyonu düştü', { position: this.searchConsoleData.position });
    }
  }

  // Public Methods
  getHealthStatus(): Promise<SEOHealthStatus> {
    return this.performHealthCheck();
  }

  getAlerts(): SEOAlert[] {
    return this.alerts.filter(alert => !alert.resolvedAt);
  }

  acknowledgeAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.acknowledgedAt = new Date();
    }
  }

  resolveAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.resolvedAt = new Date();
    }
  }

  getSearchConsoleData(): SearchConsoleData | null {
    return this.searchConsoleData;
  }

  getAnalyticsData(): AnalyticsData | null {
    return this.analyticsData;
  }
}

// SEO Health Hook
export const useSEOHealth = () => {
  const monitor = new SEOHealthMonitor();

  const getHealthStatus = async () => {
    return await monitor.getHealthStatus();
  };

  const getAlerts = () => {
    return monitor.getAlerts();
  };

  const acknowledgeAlert = (alertId: string) => {
    monitor.acknowledgeAlert(alertId);
  };

  const resolveAlert = (alertId: string) => {
    monitor.resolveAlert(alertId);
  };

  const getSearchConsoleData = () => {
    return monitor.getSearchConsoleData();
  };

  const getAnalyticsData = () => {
    return monitor.getAnalyticsData();
  };

  return {
    getHealthStatus,
    getAlerts,
    acknowledgeAlert,
    resolveAlert,
    getSearchConsoleData,
    getAnalyticsData
  };
}; 