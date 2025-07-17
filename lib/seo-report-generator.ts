// Otomatik PDF/Excel SEO Raporu Oluşturucu
export interface SEOReportData {
  url: string;
  period: string;
  generatedAt: Date;
  summary: SEOReportSummary;
  metrics: SEOReportMetrics;
  insights: SEOReportInsight[];
  recommendations: SEOReportRecommendation[];
  charts: SEOReportChart[];
  technicalAudit: TechnicalAuditResult[];
  keywordAnalysis: KeywordAnalysisResult[];
  competitorAnalysis: CompetitorAnalysisResult[];
}

export interface SEOReportSummary {
  overallScore: number;
  organicTraffic: number;
  organicTrafficChange: number;
  conversions: number;
  conversionsChange: number;
  avgPosition: number;
  avgPositionChange: number;
  topKeywords: number;
  topKeywordsChange: number;
  status: 'excellent' | 'good' | 'needs_improvement' | 'poor';
}

export interface SEOReportMetrics {
  traffic: {
    organic: number;
    paid: number;
    direct: number;
    referral: number;
    social: number;
  };
  engagement: {
    pageviews: number;
    avgTimeOnPage: number;
    bounceRate: number;
    pagesPerSession: number;
  };
  conversions: {
    total: number;
    rate: number;
    value: number;
    goals: Record<string, number>;
  };
  technical: {
    pageSpeed: number;
    mobileScore: number;
    accessibilityScore: number;
    seoScore: number;
  };
}

export interface SEOReportInsight {
  type: 'positive' | 'negative' | 'neutral';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  metric: string;
  value: number;
  previousValue: number;
  change: number;
}

export interface SEOReportRecommendation {
  priority: 'high' | 'medium' | 'low';
  category: 'technical' | 'content' | 'backlinks' | 'performance' | 'user_experience';
  title: string;
  description: string;
  impact: string;
  effort: string;
  implementation: string[];
  estimatedImprovement: number;
}

export interface SEOReportChart {
  type: 'line' | 'bar' | 'pie' | 'donut';
  title: string;
  data: any;
  options?: any;
}

export interface TechnicalAuditResult {
  category: string;
  checks: TechnicalCheck[];
  score: number;
  status: 'pass' | 'fail' | 'warning';
}

export interface TechnicalCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  description: string;
  value?: string;
  recommendation?: string;
}

export interface KeywordAnalysisResult {
  keyword: string;
  position: number;
  searchVolume: number;
  ctr: number;
  difficulty: number;
  trend: number;
  opportunities: string[];
}

export interface CompetitorAnalysisResult {
  competitor: string;
  domainAuthority: number;
  organicTraffic: number;
  backlinks: number;
  topKeywords: number;
  strengths: string[];
  weaknesses: string[];
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  sections: ReportSection[];
  branding: ReportBranding;
  schedule?: ReportSchedule;
}

export interface ReportSection {
  id: string;
  name: string;
  type: 'summary' | 'metrics' | 'insights' | 'recommendations' | 'technical' | 'keywords' | 'competitors';
  required: boolean;
  order: number;
}

export interface ReportBranding {
  logo: string;
  companyName: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    website: string;
  };
}

export interface ReportSchedule {
  frequency: 'daily' | 'weekly' | 'monthly';
  recipients: string[];
  format: 'pdf' | 'excel' | 'both';
  autoSend: boolean;
}

export class SEOReportGenerator {
  private templates: ReportTemplate[] = [];
  private reports: SEOReportData[] = [];

  constructor() {
    this.initializeTemplates();
  }

  private initializeTemplates(): void {
    this.templates = [
      {
        id: 'comprehensive_report',
        name: 'Kapsamlı SEO Raporu',
        description: 'Tüm SEO metriklerini içeren detaylı rapor',
        sections: [
          { id: 'summary', name: 'Özet', type: 'summary', required: true, order: 1 },
          { id: 'metrics', name: 'Metrikler', type: 'metrics', required: true, order: 2 },
          { id: 'insights', name: 'İçgörüler', type: 'insights', required: true, order: 3 },
          { id: 'recommendations', name: 'Öneriler', type: 'recommendations', required: true, order: 4 },
          { id: 'technical', name: 'Teknik Audit', type: 'technical', required: true, order: 5 },
          { id: 'keywords', name: 'Anahtar Kelime Analizi', type: 'keywords', required: false, order: 6 },
          { id: 'competitors', name: 'Rakip Analizi', type: 'competitors', required: false, order: 7 }
        ],
        branding: {
          logo: '/logo.png',
          companyName: 'OW - Optimize the World',
          colors: {
            primary: '#3B82F6',
            secondary: '#1F2937',
            accent: '#10B981'
          },
          contactInfo: {
            email: 'info@optimizeworld.net',
            phone: '+90-212-555-0123',
            website: 'https://optimizeworld.net'
          }
        }
      },
      {
        id: 'executive_summary',
        name: 'Yönetici Özeti',
        description: 'Yöneticiler için kısa ve öz SEO raporu',
        sections: [
          { id: 'summary', name: 'Özet', type: 'summary', required: true, order: 1 },
          { id: 'insights', name: 'Ana İçgörüler', type: 'insights', required: true, order: 2 },
          { id: 'recommendations', name: 'Öncelikli Öneriler', type: 'recommendations', required: true, order: 3 }
        ],
        branding: {
          logo: '/logo.png',
          companyName: 'OW - Optimize the World',
          colors: {
            primary: '#3B82F6',
            secondary: '#1F2937',
            accent: '#10B981'
          },
          contactInfo: {
            email: 'info@optimizeworld.net',
            phone: '+90-212-555-0123',
            website: 'https://optimizeworld.net'
          }
        }
      }
    ];
  }

  // Rapor Oluşturma
  generateReport(url: string, period: string, templateId: string = 'comprehensive_report'): SEOReportData {
    const template = this.templates.find(t => t.id === templateId);
    if (!template) {
      throw new Error(`Rapor şablonu bulunamadı: ${templateId}`);
    }

    // Simüle edilmiş rapor verisi
    const reportData: SEOReportData = {
      url,
      period,
      generatedAt: new Date(),
      summary: this.generateSummary(),
      metrics: this.generateMetrics(),
      insights: this.generateInsights(),
      recommendations: this.generateRecommendations(),
      charts: this.generateCharts(),
      technicalAudit: this.generateTechnicalAudit(),
      keywordAnalysis: this.generateKeywordAnalysis(),
      competitorAnalysis: this.generateCompetitorAnalysis()
    };

    this.reports.push(reportData);
    return reportData;
  }

  // Özet Oluşturma
  private generateSummary(): SEOReportSummary {
    return {
      overallScore: 87,
      organicTraffic: 15420,
      organicTrafficChange: 8.6,
      conversions: 342,
      conversionsChange: 14.8,
      avgPosition: 12.4,
      avgPositionChange: -18.4,
      topKeywords: 45,
      topKeywordsChange: 12.5,
      status: 'good'
    };
  }

  // Metrikler Oluşturma
  private generateMetrics(): SEOReportMetrics {
    return {
      traffic: {
        organic: 15420,
        paid: 2800,
        direct: 4200,
        referral: 1200,
        social: 2800
      },
      engagement: {
        pageviews: 45600,
        avgTimeOnPage: 145,
        bounceRate: 42.3,
        pagesPerSession: 2.8
      },
      conversions: {
        total: 342,
        rate: 2.2,
        value: 15420,
        goals: {
          'contact_form': 156,
          'demo_request': 89,
          'newsletter_signup': 97
        }
      },
      technical: {
        pageSpeed: 89,
        mobileScore: 94,
        accessibilityScore: 82,
        seoScore: 87
      }
    };
  }

  // İçgörüler Oluşturma
  private generateInsights(): SEOReportInsight[] {
    return [
      {
        type: 'positive',
        title: 'Organik Trafik Artışı',
        description: 'Son 30 günde organik trafik %8.6 artış gösterdi',
        impact: 'high',
        metric: 'organic_traffic',
        value: 15420,
        previousValue: 14200,
        change: 8.6
      },
      {
        type: 'positive',
        title: 'Dönüşüm Oranı İyileşmesi',
        description: 'Dönüşüm oranı %14.8 artışla 2.2% seviyesine ulaştı',
        impact: 'high',
        metric: 'conversion_rate',
        value: 2.2,
        previousValue: 1.9,
        change: 14.8
      },
      {
        type: 'negative',
        title: 'Hemen Çıkma Oranı Yüksek',
        description: 'Hemen çıkma oranı %42.3 ile hedefin üzerinde',
        impact: 'medium',
        metric: 'bounce_rate',
        value: 42.3,
        previousValue: 45.1,
        change: -6.2
      },
      {
        type: 'neutral',
        title: 'Ortalama Pozisyon Stabil',
        description: 'Ortalama arama pozisyonu 12.4 ile stabil seyrediyor',
        impact: 'low',
        metric: 'avg_position',
        value: 12.4,
        previousValue: 15.2,
        change: -18.4
      }
    ];
  }

  // Öneriler Oluşturma
  private generateRecommendations(): SEOReportRecommendation[] {
    return [
      {
        priority: 'high',
        category: 'user_experience',
        title: 'Hemen Çıkma Oranını Azalt',
        description: 'Sayfa yükleme hızını artırarak ve içerik kalitesini iyileştirerek hemen çıkma oranını düşürün',
        impact: 'Yüksek - Kullanıcı deneyimini ve dönüşüm oranını artırır',
        effort: 'Orta - 2-3 hafta',
        implementation: [
          'Sayfa yükleme hızını optimize edin',
          'İçerik kalitesini artırın',
          'Kullanıcı deneyimini iyileştirin',
          'A/B testleri yapın'
        ],
        estimatedImprovement: 15
      },
      {
        priority: 'high',
        category: 'technical',
        title: 'Core Web Vitals Optimizasyonu',
        description: 'LCP, FID ve CLS metriklerini iyileştirerek Core Web Vitals skorunu artırın',
        impact: 'Yüksek - Arama sıralamasını ve kullanıcı deneyimini iyileştirir',
        effort: 'Yüksek - 3-4 hafta',
        implementation: [
          'Görsel optimizasyonu yapın',
          'JavaScript yürütme süresini azaltın',
          'Layout shift sorunlarını çözün',
          'CDN kullanın'
        ],
        estimatedImprovement: 20
      },
      {
        priority: 'medium',
        category: 'content',
        title: 'İçerik Stratejisi Geliştirme',
        description: 'Hedef anahtar kelimeler için daha kaliteli içerik üretin',
        impact: 'Orta - Organik trafiği artırır',
        effort: 'Orta - 1-2 ay',
        implementation: [
          'Anahtar kelime araştırması yapın',
          'Kaliteli içerik üretin',
          'İçerik takvimi oluşturun',
          'İçerik optimizasyonu yapın'
        ],
        estimatedImprovement: 12
      }
    ];
  }

  // Grafikler Oluşturma
  private generateCharts(): SEOReportChart[] {
    return [
      {
        type: 'line',
        title: 'Organik Trafik Trendi',
        data: {
          labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
          datasets: [{
            label: 'Organik Trafik',
            data: [12000, 13500, 14200, 14800, 15200, 15420],
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)'
          }]
        }
      },
      {
        type: 'pie',
        title: 'Trafik Kaynakları Dağılımı',
        data: {
          labels: ['Organik', 'Direkt', 'Sosyal', 'Referans', 'Ücretli'],
          datasets: [{
            data: [65, 18, 12, 3, 2],
            backgroundColor: ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444']
          }]
        }
      }
    ];
  }

  // Teknik Audit Oluşturma
  private generateTechnicalAudit(): TechnicalAuditResult[] {
    return [
      {
        category: 'Sayfa Hızı',
        score: 89,
        status: 'pass',
        checks: [
          {
            name: 'Page Speed Score',
            status: 'pass',
            description: 'Sayfa hızı 89/100 puan',
            value: '89/100',
            recommendation: 'Daha da iyileştirmek için görsel optimizasyonu yapın'
          },
          {
            name: 'Core Web Vitals',
            status: 'pass',
            description: 'Core Web Vitals metrikleri kabul edilebilir seviyede',
            value: 'LCP: 2.1s, FID: 45ms, CLS: 0.08',
            recommendation: 'LCP değerini 2.5s altına düşürün'
          }
        ]
      },
      {
        category: 'SEO Teknik',
        score: 87,
        status: 'pass',
        checks: [
          {
            name: 'Meta Tags',
            status: 'pass',
            description: 'Tüm sayfalarda meta title ve description mevcut',
            value: '100%',
            recommendation: 'Meta description uzunluklarını optimize edin'
          },
          {
            name: 'Schema Markup',
            status: 'warning',
            description: 'Bazı sayfalarda schema markup eksik',
            value: '75%',
            recommendation: 'Eksik sayfalara schema markup ekleyin'
          }
        ]
      },
      {
        category: 'Mobil Uyumluluk',
        score: 94,
        status: 'pass',
        checks: [
          {
            name: 'Mobile Friendly',
            status: 'pass',
            description: 'Tüm sayfalar mobil uyumlu',
            value: '100%',
            recommendation: 'Mobil kullanıcı deneyimini sürekli iyileştirin'
          },
          {
            name: 'Touch Elements',
            status: 'pass',
            description: 'Tüm dokunmatik elementler uygun boyutta',
            value: '98%',
            recommendation: 'Kalan %2\'yi de optimize edin'
          }
        ]
      }
    ];
  }

  // Anahtar Kelime Analizi Oluşturma
  private generateKeywordAnalysis(): KeywordAnalysisResult[] {
    return [
      {
        keyword: 'akıllı şehir çözümleri',
        position: 3,
        searchVolume: 1200,
        ctr: 8.5,
        difficulty: 65,
        trend: 12.3,
        opportunities: [
          'İçerik kalitesini artırın',
          'Backlink kampanyası başlatın',
          'Long-tail anahtar kelimeler ekleyin'
        ]
      },
      {
        keyword: 'toplu taşıma optimizasyonu',
        position: 5,
        searchVolume: 890,
        ctr: 6.2,
        difficulty: 72,
        trend: 8.7,
        opportunities: [
          'İçerik güncellemesi yapın',
          'Görsel içerik ekleyin',
          'Kullanıcı deneyimini iyileştirin'
        ]
      }
    ];
  }

  // Rakip Analizi Oluşturma
  private generateCompetitorAnalysis(): CompetitorAnalysisResult[] {
    return [
      {
        competitor: 'competitor1.com',
        domainAuthority: 78,
        organicTraffic: 25000,
        backlinks: 1500,
        topKeywords: 120,
        strengths: [
          'Yüksek domain otoritesi',
          'Güçlü backlink profili',
          'Geniş anahtar kelime portföyü'
        ],
        weaknesses: [
          'Düşük dönüşüm oranı',
          'Yavaş sayfa hızı',
          'Zayıf mobil deneyim'
        ]
      },
      {
        competitor: 'competitor2.com',
        domainAuthority: 65,
        organicTraffic: 18000,
        backlinks: 950,
        topKeywords: 85,
        strengths: [
          'Hızlı sayfa yükleme',
          'İyi mobil deneyim',
          'Güçlü içerik stratejisi'
        ],
        weaknesses: [
          'Düşük domain otoritesi',
          'Sınırlı backlink profili',
          'Az anahtar kelime çeşitliliği'
        ]
      }
    ];
  }

  // PDF Raporu Oluşturma (simülasyon)
  generatePDFReport(reportData: SEOReportData): string {
    // PDF oluşturma simülasyonu
    console.log('PDF raporu oluşturuluyor...');
    return `seo_report_${Date.now()}.pdf`;
  }

  // Excel Raporu Oluşturma (simülasyon)
  generateExcelReport(reportData: SEOReportData): string {
    // Excel oluşturma simülasyonu
    console.log('Excel raporu oluşturuluyor...');
    return `seo_report_${Date.now()}.xlsx`;
  }

  // Otomatik Rapor Gönderme
  sendReport(reportData: SEOReportData, recipients: string[], format: 'pdf' | 'excel' | 'both'): void {
    console.log(`Rapor ${recipients.join(', ')} adreslerine gönderiliyor...`);
    // E-posta gönderme simülasyonu
  }

  // Rapor Şablonları
  getTemplates(): ReportTemplate[] {
    return this.templates;
  }

  getTemplateById(id: string): ReportTemplate | undefined {
    return this.templates.find(t => t.id === id);
  }

  // Rapor Geçmişi
  getReports(): SEOReportData[] {
    return this.reports;
  }

  getReportById(id: string): SEOReportData | undefined {
    return this.reports.find(r => r.url === id);
  }
}

// SEO Report Generator Hook
export const useSEOReportGenerator = () => {
  const generator = new SEOReportGenerator();

  const generateReport = (url: string, period: string, templateId?: string) => {
    return generator.generateReport(url, period, templateId);
  };

  const generatePDFReport = (reportData: SEOReportData) => {
    return generator.generatePDFReport(reportData);
  };

  const generateExcelReport = (reportData: SEOReportData) => {
    return generator.generateExcelReport(reportData);
  };

  const sendReport = (reportData: SEOReportData, recipients: string[], format: 'pdf' | 'excel' | 'both') => {
    return generator.sendReport(reportData, recipients, format);
  };

  const getTemplates = () => {
    return generator.getTemplates();
  };

  const getReports = () => {
    return generator.getReports();
  };

  return {
    generateReport,
    generatePDFReport,
    generateExcelReport,
    sendReport,
    getTemplates,
    getReports
  };
}; 