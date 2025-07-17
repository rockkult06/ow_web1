// UX/SEO A/B Test Otomasyonu
export interface ABTest {
  id: string;
  name: string;
  description: string;
  url: string;
  status: 'draft' | 'running' | 'paused' | 'completed';
  startDate: Date;
  endDate?: Date;
  variants: ABTestVariant[];
  trafficSplit: number; // A variant'ına giden trafik yüzdesi
  metrics: ABTestMetrics;
  winner?: string;
  confidence: number;
}

export interface ABTestVariant {
  id: string;
  name: string;
  type: 'A' | 'B' | 'C';
  changes: ABTestChange[];
  traffic: number;
  conversions: number;
  conversionRate: number;
  avgSessionDuration: number;
  bounceRate: number;
  scrollDepth: number;
  seoScore: number;
}

export interface ABTestChange {
  element: string;
  type: 'text' | 'color' | 'size' | 'position' | 'image' | 'layout';
  originalValue: string;
  newValue: string;
  description: string;
}

export interface ABTestMetrics {
  totalVisitors: number;
  totalConversions: number;
  avgConversionRate: number;
  statisticalSignificance: number;
  pValue: number;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
}

export interface ABTestResult {
  testId: string;
  winner: string;
  confidence: number;
  improvement: number;
  recommendations: string[];
  nextSteps: string[];
}

export interface ABTestTemplate {
  id: string;
  name: string;
  category: 'headline' | 'cta' | 'layout' | 'content' | 'image' | 'form';
  description: string;
  changes: ABTestChange[];
  expectedImpact: {
    conversion: number;
    seo: number;
    ux: number;
  };
}

export class UXABTestAutomation {
  private tests: ABTest[] = [];
  private templates: ABTestTemplate[] = [];

  constructor() {
    this.initializeTemplates();
  }

  private initializeTemplates(): void {
    this.templates = [
      {
        id: 'headline_optimization',
        name: 'Başlık Optimizasyonu',
        category: 'headline',
        description: 'Ana sayfa başlığını optimize ederek daha fazla tıklama ve dönüşüm elde edin',
        changes: [
          {
            element: 'h1',
            type: 'text',
            originalValue: 'Akıllı Şehir Çözümleri',
            newValue: 'Geleceğin Şehirlerini Bugün İnşa Edin',
            description: 'Daha duygusal ve eylem odaklı başlık'
          }
        ],
        expectedImpact: { conversion: 15, seo: 5, ux: 10 }
      },
      {
        id: 'cta_button_optimization',
        name: 'CTA Buton Optimizasyonu',
        category: 'cta',
        description: 'Call-to-action butonlarını optimize ederek dönüşüm oranını artırın',
        changes: [
          {
            element: '.cta-button',
            type: 'text',
            originalValue: 'Daha Fazla Bilgi',
            newValue: 'Ücretsiz Demo İste',
            description: 'Daha spesifik ve değerli CTA metni'
          },
          {
            element: '.cta-button',
            type: 'color',
            originalValue: '#3B82F6',
            newValue: '#10B981',
            description: 'Daha dikkat çekici yeşil renk'
          }
        ],
        expectedImpact: { conversion: 25, seo: 3, ux: 15 }
      },
      {
        id: 'layout_improvement',
        name: 'Layout İyileştirmesi',
        category: 'layout',
        description: 'Sayfa düzenini optimize ederek kullanıcı deneyimini iyileştirin',
        changes: [
          {
            element: '.hero-section',
            type: 'layout',
            originalValue: 'vertical',
            newValue: 'horizontal',
            description: 'Hero bölümünü yatay düzende göster'
          }
        ],
        expectedImpact: { conversion: 10, seo: 8, ux: 20 }
      },
      {
        id: 'content_optimization',
        name: 'İçerik Optimizasyonu',
        category: 'content',
        description: 'İçerik yapısını ve uzunluğunu optimize edin',
        changes: [
          {
            element: '.content-section',
            type: 'text',
            originalValue: 'Uzun paragraf metni...',
            newValue: 'Kısa, öz ve madde halinde içerik',
            description: 'Daha okunabilir içerik formatı'
          }
        ],
        expectedImpact: { conversion: 12, seo: 15, ux: 18 }
      }
    ];
  }

  // Yeni A/B test oluştur
  createTest(testData: Omit<ABTest, 'id' | 'status' | 'startDate' | 'metrics'>): string {
    const testId = `test_${Date.now()}_${Math.random()}`;
    const test: ABTest = {
      ...testData,
      id: testId,
      status: 'draft',
      startDate: new Date(),
      metrics: {
        totalVisitors: 0,
        totalConversions: 0,
        avgConversionRate: 0,
        statisticalSignificance: 0,
        pValue: 1,
        confidenceInterval: { lower: 0, upper: 0 }
      }
    };

    this.tests.push(test);
    return testId;
  }

  // Template'den test oluştur
  createTestFromTemplate(templateId: string, url: string, name: string): string {
    const template = this.templates.find(t => t.id === templateId);
    if (!template) {
      throw new Error(`Template bulunamadı: ${templateId}`);
    }

    const variants: ABTestVariant[] = [
      {
        id: 'A',
        name: 'Kontrol (A)',
        type: 'A',
        changes: [],
        traffic: 0,
        conversions: 0,
        conversionRate: 0,
        avgSessionDuration: 0,
        bounceRate: 0,
        scrollDepth: 0,
        seoScore: 0
      },
      {
        id: 'B',
        name: 'Varyant (B)',
        type: 'B',
        changes: template.changes,
        traffic: 0,
        conversions: 0,
        conversionRate: 0,
        avgSessionDuration: 0,
        bounceRate: 0,
        scrollDepth: 0,
        seoScore: 0
      }
    ];

    return this.createTest({
      name,
      description: template.description,
      url,
      variants,
      trafficSplit: 50,
      confidence: 0
    });
  }

  // Test başlat
  startTest(testId: string): void {
    const test = this.tests.find(t => t.id === testId);
    if (test) {
      test.status = 'running';
      console.log(`A/B test başlatıldı: ${test.name}`);
    }
  }

  // Test durdur
  pauseTest(testId: string): void {
    const test = this.tests.find(t => t.id === testId);
    if (test) {
      test.status = 'paused';
      console.log(`A/B test duraklatıldı: ${test.name}`);
    }
  }

  // Test sonlandır
  endTest(testId: string): ABTestResult | null {
    const test = this.tests.find(t => t.id === testId);
    if (!test) return null;

    test.status = 'completed';
    test.endDate = new Date();

    const result = this.calculateResults(test);
    test.winner = result.winner;
    test.confidence = result.confidence;

    console.log(`A/B test tamamlandı: ${test.name}, Kazanan: ${result.winner}`);
    return result;
  }

  // Sonuçları hesapla
  private calculateResults(test: ABTest): ABTestResult {
    const variantA = test.variants.find(v => v.type === 'A');
    const variantB = test.variants.find(v => v.type === 'B');

    if (!variantA || !variantB) {
      throw new Error('Test varyantları bulunamadı');
    }

    // Basit istatistiksel analiz
    const conversionRateA = variantA.conversionRate;
    const conversionRateB = variantB.conversionRate;
    
    const improvement = ((conversionRateB - conversionRateA) / conversionRateA) * 100;
    const confidence = this.calculateConfidence(variantA, variantB);
    
    let winner = 'A';
    let recommendations: string[] = [];
    let nextSteps: string[] = [];

    if (conversionRateB > conversionRateA && confidence > 95) {
      winner = 'B';
      recommendations = [
        'Varyant B daha iyi performans gösteriyor',
        'Değişiklikleri kalıcı hale getirin',
        'Benzer testleri diğer sayfalarda da uygulayın'
      ];
      nextSteps = [
        'Kazanan varyantı production\'a taşıyın',
        'Sonuçları raporlayın',
        'Yeni testler planlayın'
      ];
    } else if (confidence < 95) {
      recommendations = [
        'İstatistiksel anlamlılık yetersiz',
        'Test süresini uzatın',
        'Daha fazla trafik sağlayın'
      ];
      nextSteps = [
        'Test süresini uzatın',
        'Trafik miktarını artırın',
        'Farklı varyantlar deneyin'
      ];
    } else {
      recommendations = [
        'Varyant A daha iyi performans gösteriyor',
        'Mevcut tasarımı koruyun',
        'Farklı optimizasyonlar deneyin'
      ];
      nextSteps = [
        'Mevcut tasarımı koruyun',
        'Farklı testler planlayın',
        'Sonuçları analiz edin'
      ];
    }

    return {
      testId: test.id,
      winner,
      confidence,
      improvement,
      recommendations,
      nextSteps
    };
  }

  // Güven aralığı hesapla
  private calculateConfidence(variantA: ABTestVariant, variantB: ABTestVariant): number {
    // Basit güven hesaplaması (gerçek uygulamada daha karmaşık istatistiksel testler kullanılır)
    const rateA = variantA.conversionRate / 100;
    const rateB = variantB.conversionRate / 100;
    const nA = variantA.traffic;
    const nB = variantB.traffic;

    if (nA === 0 || nB === 0) return 0;

    const pooledRate = (rateA * nA + rateB * nB) / (nA + nB);
    const standardError = Math.sqrt(pooledRate * (1 - pooledRate) * (1/nA + 1/nB));
    const zScore = Math.abs(rateB - rateA) / standardError;

    // Z-score'u güven yüzdesine çevir
    const confidence = (1 - 2 * (1 - this.normalCDF(zScore))) * 100;
    return Math.min(100, Math.max(0, confidence));
  }

  // Normal dağılım CDF (basit yaklaşım)
  private normalCDF(z: number): number {
    return 0.5 * (1 + this.erf(z / Math.sqrt(2)));
  }

  // Error function (basit yaklaşım)
  private erf(x: number): number {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
  }

  // Test verilerini güncelle
  updateTestData(testId: string, variantId: string, data: Partial<ABTestVariant>): void {
    const test = this.tests.find(t => t.id === testId);
    if (!test) return;

    const variant = test.variants.find(v => v.id === variantId);
    if (!variant) return;

    Object.assign(variant, data);

    // Test metriklerini güncelle
    this.updateTestMetrics(test);
  }

  // Test metriklerini güncelle
  private updateTestMetrics(test: ABTest): void {
    const totalVisitors = test.variants.reduce((sum, v) => sum + v.traffic, 0);
    const totalConversions = test.variants.reduce((sum, v) => sum + v.conversions, 0);
    const avgConversionRate = totalVisitors > 0 ? (totalConversions / totalVisitors) * 100 : 0;

    test.metrics = {
      totalVisitors,
      totalConversions,
      avgConversionRate,
      statisticalSignificance: 0, // Gerçek uygulamada hesaplanır
      pValue: 1, // Gerçek uygulamada hesaplanır
      confidenceInterval: { lower: 0, upper: 0 } // Gerçek uygulamada hesaplanır
    };
  }

  // Test listesini getir
  getTests(): ABTest[] {
    return this.tests;
  }

  // Test detaylarını getir
  getTestById(testId: string): ABTest | undefined {
    return this.tests.find(t => t.id === testId);
  }

  // Template listesini getir
  getTemplates(): ABTestTemplate[] {
    return this.templates;
  }

  // Template detaylarını getir
  getTemplateById(templateId: string): ABTestTemplate | undefined {
    return this.templates.find(t => t.id === templateId);
  }

  // Aktif testleri getir
  getActiveTests(): ABTest[] {
    return this.tests.filter(t => t.status === 'running');
  }

  // Tamamlanan testleri getir
  getCompletedTests(): ABTest[] {
    return this.tests.filter(t => t.status === 'completed');
  }
}

// UX A/B Test Hook
export const useUXABTest = () => {
  const abTest = new UXABTestAutomation();

  return {
    createTest: (testData: Omit<ABTest, 'id' | 'status' | 'startDate' | 'metrics'>) => 
      abTest.createTest(testData),
    createTestFromTemplate: (templateId: string, url: string, name: string) => 
      abTest.createTestFromTemplate(templateId, url, name),
    startTest: (testId: string) => abTest.startTest(testId),
    pauseTest: (testId: string) => abTest.pauseTest(testId),
    endTest: (testId: string) => abTest.endTest(testId),
    updateTestData: (testId: string, variantId: string, data: Partial<ABTestVariant>) => 
      abTest.updateTestData(testId, variantId, data),
    getTests: () => abTest.getTests(),
    getTestById: (testId: string) => abTest.getTestById(testId),
    getTemplates: () => abTest.getTemplates(),
    getTemplateById: (templateId: string) => abTest.getTemplateById(templateId),
    getActiveTests: () => abTest.getActiveTests(),
    getCompletedTests: () => abTest.getCompletedTests()
  };
}; 