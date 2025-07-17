import { useEffect, useState } from 'react';

// SEO A/B Test Interface'leri
export interface SEOABTest {
  id: string;
  name: string;
  description: string;
  type: 'title' | 'meta-description' | 'heading' | 'content' | 'url' | 'internal-linking' | 'schema';
  status: 'draft' | 'running' | 'paused' | 'completed' | 'cancelled';
  priority: 'critical' | 'high' | 'medium' | 'low';
  url: string;
  element: string; // CSS selector
  variants: SEOVariant[];
  trafficSplit: number; // percentage for variant A
  startDate?: Date;
  endDate?: Date;
  duration: number; // days
  sampleSize: number;
  confidenceLevel: number; // 0.90, 0.95, 0.99
  metrics: {
    primary: string;
    secondary: string[];
  };
  results?: SEOABTestResults;
  settings: {
    autoStop: boolean;
    minimumSampleSize: number;
    statisticalSignificance: number;
    maxDuration: number;
  };
}

export interface SEOVariant {
  id: string;
  name: string;
  type: 'A' | 'B' | 'C' | 'D';
  content: string;
  isControl: boolean;
  traffic: number; // percentage
  impressions: number;
  clicks: number;
  ctr: number;
  rankings: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  performance: {
    score: number;
    improvement: number;
    confidence: number;
  };
}

export interface SEOABTestResults {
  winner: string; // variant ID
  confidence: number;
  lift: number; // percentage improvement
  statisticalSignificance: boolean;
  sampleSize: number;
  duration: number;
  recommendations: string[];
  detailedMetrics: {
    variant: string;
    impressions: number;
    clicks: number;
    ctr: number;
    rankings: number;
    conversions: number;
    revenue: number;
    roi: number;
  }[];
  insights: {
    keyFinding: string;
    explanation: string;
    actionItems: string[];
  };
}

export interface SEOABTestTemplate {
  id: string;
  name: string;
  description: string;
  category: 'title' | 'meta' | 'content' | 'technical' | 'local';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedImpact: number;
  setupTime: number; // minutes
  variants: {
    name: string;
    description: string;
    content: string;
  }[];
  metrics: string[];
  bestPractices: string[];
}

export interface SEOABTestReport {
  id: string;
  testId: string;
  timestamp: Date;
  summary: {
    totalTests: number;
    runningTests: number;
    completedTests: number;
    successfulTests: number;
    averageLift: number;
  };
  topPerformers: SEOABTest[];
  recommendations: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  insights: {
    trends: string[];
    patterns: string[];
    opportunities: string[];
  };
}

export class SEOABTesting {
  private static instance: SEOABTesting;
  private tests: SEOABTest[] = [];
  private templates: SEOABTestTemplate[] = [];
  private observers: Set<(data: any) => void> = new Set();

  private constructor() {
    this.initializeTemplates();
  }

  static getInstance(): SEOABTesting {
    if (!SEOABTesting.instance) {
      SEOABTesting.instance = new SEOABTesting();
    }
    return SEOABTesting.instance;
  }

  // Varsayılan test şablonlarını oluştur
  private initializeTemplates(): void {
    this.templates = [
      {
        id: 'title-optimization',
        name: 'Başlık Optimizasyonu',
        description: 'Sayfa başlıklarını optimize et ve CTR\'yi artır',
        category: 'title',
        difficulty: 'easy',
        estimatedImpact: 15,
        setupTime: 30,
        variants: [
          {
            name: 'Kontrol',
            description: 'Mevcut başlık',
            content: 'OptimizeWorld - Veri Entegrasyonu Çözümleri'
          },
          {
            name: 'Anahtar Kelime Odaklı',
            description: 'Ana anahtar kelimeyi başa al',
            content: 'Veri Entegrasyonu - OptimizeWorld Çözümleri'
          },
          {
            name: 'Aksiyon Odaklı',
            description: 'Aksiyon kelimesi ekle',
            content: 'Veri Entegrasyonu Çözümleri - Hemen Başlayın'
          }
        ],
        metrics: ['CTR', 'Rankings', 'Conversions'],
        bestPractices: [
          '50-60 karakter arasında tutun',
          'Ana anahtar kelimeyi başa alın',
          'Aksiyon kelimesi ekleyin',
          'Benzersiz ve açıklayıcı yapın'
        ]
      },
      {
        id: 'meta-description',
        name: 'Meta Açıklama Testi',
        description: 'Meta açıklamaları optimize et ve tıklama oranını artır',
        category: 'meta',
        difficulty: 'easy',
        estimatedImpact: 10,
        setupTime: 20,
        variants: [
          {
            name: 'Kontrol',
            description: 'Mevcut meta açıklama',
            content: 'OptimizeWorld ile veri entegrasyonu çözümleri. Güvenilir ve hızlı veri işleme.'
          },
          {
            name: 'Fayda Odaklı',
            description: 'Müşteri faydalarını vurgula',
            content: 'Veri entegrasyonu ile %50 daha hızlı işlem. OptimizeWorld ile zamandan tasarruf edin.'
          },
          {
            name: 'CTA Odaklı',
            description: 'Call-to-action ekle',
            content: 'Veri entegrasyonu çözümleri. Ücretsiz demo için hemen iletişime geçin.'
          }
        ],
        metrics: ['CTR', 'Bounce Rate', 'Time on Page'],
        bestPractices: [
          '120-160 karakter arasında tutun',
          'Ana anahtar kelimeyi kullanın',
          'Müşteri faydalarını vurgulayın',
          'Call-to-action ekleyin'
        ]
      },
      {
        id: 'heading-optimization',
        name: 'Başlık Optimizasyonu',
        description: 'H1, H2, H3 başlıklarını optimize et',
        category: 'content',
        difficulty: 'medium',
        estimatedImpact: 12,
        setupTime: 45,
        variants: [
          {
            name: 'Kontrol',
            description: 'Mevcut başlık yapısı',
            content: 'Veri Entegrasyonu Çözümleri'
          },
          {
            name: 'Anahtar Kelime Odaklı',
            description: 'Ana anahtar kelimeyi H1\'de kullan',
            content: 'Veri Entegrasyonu - En İyi Çözümler'
          },
          {
            name: 'Soru Odaklı',
            description: 'Soru formatında başlık',
            content: 'Veri Entegrasyonu Nasıl Yapılır?'
          }
        ],
        metrics: ['Rankings', 'Time on Page', 'Scroll Depth'],
        bestPractices: [
          'H1\'de ana anahtar kelimeyi kullanın',
          'Hiyerarşik yapı oluşturun',
          'Açıklayıcı ve ilgi çekici yapın',
          'Kullanıcı niyetini karşılayın'
        ]
      },
      {
        id: 'internal-linking',
        name: 'İç Linkleme Testi',
        description: 'İç linkleme stratejisini optimize et',
        category: 'technical',
        difficulty: 'medium',
        estimatedImpact: 8,
        setupTime: 60,
        variants: [
          {
            name: 'Kontrol',
            description: 'Mevcut linkleme',
            content: 'Standart iç linkleme'
          },
          {
            name: 'Yoğun Linkleme',
            description: 'Daha fazla iç link ekle',
            content: 'Her 100 kelimede 2-3 link'
          },
          {
            name: 'Akıllı Linkleme',
            description: 'AI destekli linkleme',
            content: 'İlgili sayfalara otomatik link'
          }
        ],
        metrics: ['Page Views', 'Time on Site', 'Bounce Rate'],
        bestPractices: [
          'İlgili sayfalara link verin',
          'Anchor text\'i optimize edin',
          'Aşırı linkleme yapmayın',
          'Kullanıcı deneyimini koruyun'
        ]
      }
    ];
  }

  // Test oluştur
  createTest(test: Omit<SEOABTest, 'id' | 'results'>): SEOABTest {
    const newTest: SEOABTest = {
      ...test,
      id: `test-${Date.now()}`,
      results: undefined
    };

    this.tests.push(newTest);
    this.notifyObservers({ type: 'test-created', data: newTest });
    return newTest;
  }

  // Test başlat
  startTest(testId: string): boolean {
    const test = this.tests.find(t => t.id === testId);
    if (test && test.status === 'draft') {
      test.status = 'running';
      test.startDate = new Date();
      test.endDate = new Date(Date.now() + test.duration * 24 * 60 * 60 * 1000);
      this.notifyObservers({ type: 'test-started', data: test });
      return true;
    }
    return false;
  }

  // Test durdur
  pauseTest(testId: string): boolean {
    const test = this.tests.find(t => t.id === testId);
    if (test && test.status === 'running') {
      test.status = 'paused';
      this.notifyObservers({ type: 'test-paused', data: test });
      return true;
    }
    return false;
  }

  // Test tamamla
  completeTest(testId: string): boolean {
    const test = this.tests.find(t => t.id === testId);
    if (test && (test.status === 'running' || test.status === 'paused')) {
      test.status = 'completed';
      test.results = this.calculateResults(test);
      this.notifyObservers({ type: 'test-completed', data: test });
      return true;
    }
    return false;
  }

  // Test sonuçlarını hesapla
  private calculateResults(test: SEOABTest): SEOABTestResults {
    const variants = test.variants;
    const control = variants.find(v => v.isControl);
    const challengers = variants.filter(v => !v.isControl);

    if (!control || challengers.length === 0) {
      return {
        winner: '',
        confidence: 0,
        lift: 0,
        statisticalSignificance: false,
        sampleSize: 0,
        duration: 0,
        recommendations: [],
        detailedMetrics: [],
        insights: {
          keyFinding: 'Yeterli veri yok',
          explanation: 'Test için yeterli trafik toplanamadı',
          actionItems: ['Test süresini uzatın', 'Daha fazla trafik sağlayın']
        }
      };
    }

    // En iyi performans gösteren varyantı bul
    let winner = control;
    let maxLift = 0;

    challengers.forEach(challenger => {
      const lift = this.calculateLift(control, challenger);
      if (lift > maxLift) {
        maxLift = lift;
        winner = challenger;
      }
    });

    const confidence = this.calculateConfidence(control, winner);
    const statisticalSignificance = confidence >= test.confidenceLevel;

    return {
      winner: winner.id,
      confidence,
      lift: maxLift,
      statisticalSignificance,
      sampleSize: variants.reduce((sum, v) => sum + v.impressions, 0),
      duration: test.duration,
      recommendations: this.generateRecommendations(test, winner),
      detailedMetrics: variants.map(v => ({
        variant: v.name,
        impressions: v.impressions,
        clicks: v.clicks,
        ctr: v.ctr,
        rankings: v.rankings,
        conversions: v.conversions,
        revenue: v.revenue,
        roi: v.revenue / (v.impressions * 0.01) // Basit ROI hesaplama
      })),
      insights: {
        keyFinding: `${winner.name} varyantı %${maxLift.toFixed(1)} daha iyi performans gösterdi`,
        explanation: statisticalSignificance 
          ? 'Sonuç istatistiksel olarak anlamlı'
          : 'Daha fazla veri gerekli',
        actionItems: [
          'Kazanan varyantı uygulayın',
          'Benzer testler yapın',
          'Performansı sürekli izleyin'
        ]
      }
    };
  }

  // Lift hesapla
  private calculateLift(control: SEOVariant, challenger: SEOVariant): number {
    const controlMetric = control.conversionRate;
    const challengerMetric = challenger.conversionRate;
    
    if (controlMetric === 0) return 0;
    return ((challengerMetric - controlMetric) / controlMetric) * 100;
  }

  // Güven seviyesi hesapla
  private calculateConfidence(control: SEOVariant, challenger: SEOVariant): number {
    // Basit güven seviyesi hesaplama (gerçek implementasyonda daha karmaşık)
    const controlSamples = control.impressions;
    const challengerSamples = challenger.impressions;
    
    if (controlSamples < 100 || challengerSamples < 100) {
      return 0.7; // Düşük güven
    }
    
    const lift = this.calculateLift(control, challenger);
    if (lift > 20) return 0.95;
    if (lift > 10) return 0.90;
    if (lift > 5) return 0.85;
    return 0.80;
  }

  // Öneriler oluştur
  private generateRecommendations(test: SEOABTest, winner: SEOVariant): string[] {
    const recommendations: string[] = [];

    recommendations.push(`${winner.name} varyantını uygulayın`);

    if (test.type === 'title') {
      recommendations.push('Başlık optimizasyonu için benzer testler yapın');
      recommendations.push('Ana anahtar kelimeleri başlıkta kullanın');
    } else if (test.type === 'meta-description') {
      recommendations.push('Meta açıklamaları düzenli olarak test edin');
      recommendations.push('Call-to-action ekleyin');
    } else if (test.type === 'heading') {
      recommendations.push('Başlık hiyerarşisini optimize edin');
      recommendations.push('Ana anahtar kelimeleri H1\'de kullanın');
    }

    recommendations.push('Performansı sürekli izleyin');
    recommendations.push('Benzer sayfalar için test yapın');

    return recommendations;
  }

  // Varyant güncelle
  updateVariant(testId: string, variantId: string, updates: Partial<SEOVariant>): boolean {
    const test = this.tests.find(t => t.id === testId);
    if (test) {
      const variant = test.variants.find(v => v.id === variantId);
      if (variant) {
        Object.assign(variant, updates);
        this.notifyObservers({ type: 'variant-updated', data: { testId, variant } });
        return true;
      }
    }
    return false;
  }

  // Test güncelle
  updateTest(testId: string, updates: Partial<SEOABTest>): boolean {
    const testIndex = this.tests.findIndex(t => t.id === testId);
    if (testIndex !== -1) {
      this.tests[testIndex] = { ...this.tests[testIndex], ...updates };
      this.notifyObservers({ type: 'test-updated', data: this.tests[testIndex] });
      return true;
    }
    return false;
  }

  // Test sil
  deleteTest(testId: string): boolean {
    const initialLength = this.tests.length;
    this.tests = this.tests.filter(t => t.id !== testId);
    if (this.tests.length < initialLength) {
      this.notifyObservers({ type: 'test-deleted', data: testId });
      return true;
    }
    return false;
  }

  // Şablon tabanlı test oluştur
  createTestFromTemplate(templateId: string, url: string, element: string): SEOABTest | null {
    const template = this.templates.find(t => t.id === templateId);
    if (!template) return null;

    const variants: SEOVariant[] = template.variants.map((v, index) => ({
      id: `variant-${Date.now()}-${index}`,
      name: v.name,
      type: index === 0 ? 'A' : index === 1 ? 'B' : index === 2 ? 'C' : 'D',
      content: v.content,
      isControl: index === 0,
      traffic: index === 0 ? 50 : 50 / (template.variants.length - 1),
      impressions: 0,
      clicks: 0,
      ctr: 0,
      rankings: 0,
      conversions: 0,
      conversionRate: 0,
      revenue: 0,
      performance: { score: 0, improvement: 0, confidence: 0 }
    }));

    const test: SEOABTest = {
      id: `test-${Date.now()}`,
      name: template.name,
      description: template.description,
      type: template.category as any,
      status: 'draft',
      priority: 'medium',
      url,
      element,
      variants,
      trafficSplit: 50,
      duration: 14,
      sampleSize: 1000,
      confidenceLevel: 0.95,
      metrics: {
        primary: template.metrics[0],
        secondary: template.metrics.slice(1)
      },
      settings: {
        autoStop: true,
        minimumSampleSize: 1000,
        statisticalSignificance: 0.95,
        maxDuration: 30
      }
    };

    this.tests.push(test);
    this.notifyObservers({ type: 'test-created', data: test });
    return test;
  }

  // Test raporu oluştur
  generateReport(): SEOABTestReport {
    const completedTests = this.tests.filter(t => t.status === 'completed');
    const runningTests = this.tests.filter(t => t.status === 'running');
    const successfulTests = completedTests.filter(t => t.results?.statisticalSignificance);

    const averageLift = completedTests.length > 0
      ? completedTests.reduce((sum, t) => sum + (t.results?.lift || 0), 0) / completedTests.length
      : 0;

    const topPerformers = completedTests
      .filter(t => t.results?.lift && t.results.lift > 10)
      .sort((a, b) => (b.results?.lift || 0) - (a.results?.lift || 0))
      .slice(0, 5);

    return {
      id: `report-${Date.now()}`,
      testId: '',
      timestamp: new Date(),
      summary: {
        totalTests: this.tests.length,
        runningTests: runningTests.length,
        completedTests: completedTests.length,
        successfulTests: successfulTests.length,
        averageLift
      },
      topPerformers,
      recommendations: {
        immediate: [
          'Kazanan varyantları uygulayın',
          'Yeni testler başlatın',
          'Performansı izleyin'
        ],
        shortTerm: [
          'Benzer testler yapın',
          'Test süreçlerini optimize edin',
          'Daha fazla trafik sağlayın'
        ],
        longTerm: [
          'A/B test kültürü oluşturun',
          'Otomatik test sistemi kurun',
          'AI destekli optimizasyonlar yapın'
        ]
      },
      insights: {
        trends: [
          'Başlık optimizasyonu en etkili',
          'Meta açıklama testleri yüksek ROI',
          'İçerik testleri uzun vadeli etki'
        ],
        patterns: [
          'Kısa ve net başlıklar daha iyi',
          'Call-to-action\'lar CTR\'yi artırıyor',
          'Ana anahtar kelimeler önemli'
        ],
        opportunities: [
          'Daha fazla sayfa test edilmeli',
          'Mobil optimizasyon testleri yapılmalı',
          'Yerel SEO testleri eklenmeli'
        ]
      }
    };
  }

  // Observer ekle
  addObserver(observer: (data: any) => void): void {
    this.observers.add(observer);
  }

  // Observer kaldır
  removeObserver(observer: (data: any) => void): void {
    this.observers.delete(observer);
  }

  // Observer'ları bilgilendir
  private notifyObservers(data: any): void {
    this.observers.forEach(observer => {
      try {
        observer(data);
      } catch (error) {
        console.error('Observer hatası:', error);
      }
    });
  }

  // Getter metodları
  getTests(): SEOABTest[] {
    return [...this.tests];
  }

  getTemplates(): SEOABTestTemplate[] {
    return [...this.templates];
  }

  getTestById(id: string): SEOABTest | undefined {
    return this.tests.find(t => t.id === id);
  }

  getTemplateById(id: string): SEOABTestTemplate | undefined {
    return this.templates.find(t => t.id === id);
  }
}

// React Hook
export function useSEOABTesting() {
  const [tests, setTests] = useState<SEOABTest[]>([]);
  const [templates, setTemplates] = useState<SEOABTestTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abTesting = SEOABTesting.getInstance();

  useEffect(() => {
    const observer = (data: any) => {
      if (data.type.includes('test')) {
        setTests(abTesting.getTests());
      }
    };

    abTesting.addObserver(observer);
    setTests(abTesting.getTests());
    setTemplates(abTesting.getTemplates());

    return () => {
      abTesting.removeObserver(observer);
    };
  }, [abTesting]);

  const createTest = (test: Omit<SEOABTest, 'id' | 'results'>) => {
    return abTesting.createTest(test);
  };

  const startTest = (testId: string) => {
    return abTesting.startTest(testId);
  };

  const pauseTest = (testId: string) => {
    return abTesting.pauseTest(testId);
  };

  const completeTest = (testId: string) => {
    return abTesting.completeTest(testId);
  };

  const createTestFromTemplate = (templateId: string, url: string, element: string) => {
    return abTesting.createTestFromTemplate(templateId, url, element);
  };

  const generateReport = () => {
    return abTesting.generateReport();
  };

  return {
    tests,
    templates,
    isLoading,
    error,
    createTest,
    startTest,
    pauseTest,
    completeTest,
    createTestFromTemplate,
    generateReport,
    getTestById: abTesting.getTestById.bind(abTesting),
    getTemplateById: abTesting.getTemplateById.bind(abTesting)
  };
}

export default SEOABTesting; 