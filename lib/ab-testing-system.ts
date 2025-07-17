// Otomatik A/B Test Sistemi
export interface ABTest {
  id: string;
  name: string;
  description: string;
  type: 'title' | 'content' | 'layout' | 'cta' | 'image' | 'form' | 'price';
  element: string;
  variants: ABTestVariant[];
  trafficSplit: number; // A:B oranı (örn: 50 = 50:50)
  status: 'draft' | 'running' | 'paused' | 'completed';
  startDate: Date;
  endDate?: Date;
  goal: ABTestGoal;
  results: ABTestResults;
  createdAt: Date;
  updatedAt: Date;
}

export interface ABTestVariant {
  id: string;
  name: string;
  content: string;
  weight: number; // Trafik ağırlığı (%)
  isControl: boolean;
  metrics: VariantMetrics;
}

export interface ABTestGoal {
  type: 'conversion' | 'revenue' | 'engagement' | 'bounce_rate' | 'time_on_page';
  target: string;
  value: number;
  description: string;
}

export interface ABTestResults {
  totalVisitors: number;
  totalConversions: number;
  confidenceLevel: number;
  winner?: string;
  variants: VariantResults[];
  statisticalSignificance: boolean;
  recommendations: string[];
}

export interface VariantMetrics {
  visitors: number;
  conversions: number;
  revenue: number;
  bounceRate: number;
  timeOnPage: number;
  clickThroughRate: number;
  engagementRate: number;
}

export interface VariantResults {
  variantId: string;
  variantName: string;
  visitors: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  averageOrderValue: number;
  bounceRate: number;
  timeOnPage: number;
  confidence: number;
  improvement: number; // % iyileştirme
  isWinner: boolean;
}

export interface ABTestTemplate {
  id: string;
  name: string;
  description: string;
  type: ABTest['type'];
  commonGoals: ABTestGoal[];
  suggestedVariants: string[];
  bestPractices: string[];
}

export class ABTestingSystem {
  private tests: ABTest[] = [];
  private templates: ABTestTemplate[] = [];

  constructor() {
    this.initializeTemplates();
  }

  private initializeTemplates(): void {
    this.templates = [
      {
        id: 'title_test_template',
        name: 'Başlık Testi',
        description: 'Sayfa başlıklarının performansını test eder',
        type: 'title',
        commonGoals: [
          {
            type: 'conversion',
            target: 'CTA tıklama',
            value: 0,
            description: 'CTA butonuna tıklama oranını artır'
          },
          {
            type: 'engagement',
            target: 'Sayfa görüntüleme süresi',
            value: 0,
            description: 'Sayfa görüntüleme süresini artır'
          }
        ],
        suggestedVariants: [
          'Emotional trigger ile başlık',
          'Fayda odaklı başlık',
          'Soru formatında başlık',
          'Sayı içeren başlık'
        ],
        bestPractices: [
          'Başlık 60 karakterden az olmalı',
          'Anahtar kelimeyi başlığın başında kullan',
          'Duygusal tetikleyiciler ekle',
          'A/B testini en az 2 hafta sürdür'
        ]
      },
      {
        id: 'cta_test_template',
        name: 'CTA Testi',
        description: 'Call-to-Action butonlarının performansını test eder',
        type: 'cta',
        commonGoals: [
          {
            type: 'conversion',
            target: 'Buton tıklama',
            value: 0,
            description: 'CTA butonuna tıklama oranını artır'
          },
          {
            type: 'revenue',
            target: 'Satış geliri',
            value: 0,
            description: 'Toplam satış gelirini artır'
          }
        ],
        suggestedVariants: [
          'Farklı renkler (Kırmızı, Yeşil, Mavi)',
          'Farklı metinler (Hemen Başla, Ücretsiz Deneyin, Satın Al)',
          'Farklı boyutlar (Büyük, Orta, Küçük)',
          'Farklı pozisyonlar (Üst, Orta, Alt)'
        ],
        bestPractices: [
          'Sadece bir değişkeni test et',
          'Test süresini yeterli tut',
          'Mobil ve desktop için ayrı test yap',
          'Sonuçları istatistiksel olarak değerlendir'
        ]
      },
      {
        id: 'content_test_template',
        name: 'İçerik Testi',
        description: 'Sayfa içeriklerinin performansını test eder',
        type: 'content',
        commonGoals: [
          {
            type: 'engagement',
            target: 'Sayfa görüntüleme süresi',
            value: 0,
            description: 'Sayfa görüntüleme süresini artır'
          },
          {
            type: 'bounce_rate',
            target: 'Hemen çıkma oranı',
            value: 0,
            description: 'Hemen çıkma oranını azalt'
          }
        ],
        suggestedVariants: [
          'Farklı içerik uzunlukları',
          'Farklı içerik formatları (Video, Metin, Görsel)',
          'Farklı ton ve üslup',
          'Farklı yapı ve düzen'
        ],
        bestPractices: [
          'İçeriği hedef kitleye uygun hazırla',
          'Görsel ve metin dengesini koru',
          'Okunabilirliği öncelikle',
          'SEO kurallarına uygun içerik oluştur'
        ]
      },
      {
        id: 'layout_test_template',
        name: 'Düzen Testi',
        description: 'Sayfa düzenlerinin performansını test eder',
        type: 'layout',
        commonGoals: [
          {
            type: 'engagement',
            target: 'Sayfa görüntüleme süresi',
            value: 0,
            description: 'Sayfa görüntüleme süresini artır'
          },
          {
            type: 'conversion',
            target: 'CTA tıklama',
            value: 0,
            description: 'CTA butonuna tıklama oranını artır'
          }
        ],
        suggestedVariants: [
          'Farklı grid düzenleri',
          'Farklı renk şemaları',
          'Farklı tipografi',
          'Farklı boşluk kullanımı'
        ],
        bestPractices: [
          'Kullanıcı deneyimini öncelikle',
          'Mobil uyumluluğu test et',
          'Yükleme hızını etkileme',
          'Tutarlı tasarım dili kullan'
        ]
      }
    ];
  }

  // A/B Test Oluşturma
  createABTest(testData: Omit<ABTest, 'id' | 'createdAt' | 'updatedAt' | 'results'>): string {
    const id = `ab_test_${Date.now()}`;
    const test: ABTest = {
      ...testData,
      id,
      results: {
        totalVisitors: 0,
        totalConversions: 0,
        confidenceLevel: 0,
        variants: [],
        statisticalSignificance: false,
        recommendations: []
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.tests.push(test);
    return id;
  }

  // Test Başlatma
  startTest(testId: string): void {
    const test = this.tests.find(t => t.id === testId);
    if (!test) {
      throw new Error(`Test bulunamadı: ${testId}`);
    }

    test.status = 'running';
    test.startDate = new Date();
    test.updatedAt = new Date();
  }

  // Test Durdurma
  pauseTest(testId: string): void {
    const test = this.tests.find(t => t.id === testId);
    if (!test) {
      throw new Error(`Test bulunamadı: ${testId}`);
    }

    test.status = 'paused';
    test.updatedAt = new Date();
  }

  // Test Tamamlama
  completeTest(testId: string): ABTestResults {
    const test = this.tests.find(t => t.id === testId);
    if (!test) {
      throw new Error(`Test bulunamadı: ${testId}`);
    }

    test.status = 'completed';
    test.endDate = new Date();
    test.updatedAt = new Date();

    // Sonuçları hesapla
    const results = this.calculateTestResults(test);
    test.results = results;

    return results;
  }

  // Test Sonuçlarını Hesaplama
  private calculateTestResults(test: ABTest): ABTestResults {
    const variants = test.variants.map(variant => {
      const metrics = this.simulateVariantMetrics(variant, test);
      const conversionRate = (metrics.conversions / metrics.visitors) * 100;
      const averageOrderValue = metrics.revenue / metrics.conversions || 0;

      return {
        variantId: variant.id,
        variantName: variant.name,
        visitors: metrics.visitors,
        conversions: metrics.conversions,
        conversionRate,
        revenue: metrics.revenue,
        averageOrderValue,
        bounceRate: metrics.bounceRate,
        timeOnPage: metrics.timeOnPage,
        confidence: this.calculateConfidence(metrics.visitors, metrics.conversions),
        improvement: 0, // Hesaplanacak
        isWinner: false
      };
    });

    // İyileştirme oranlarını hesapla
    const controlVariant = variants.find(v => test.variants.find(tv => tv.id === v.variantId)?.isControl);
    if (controlVariant) {
      variants.forEach(variant => {
        if (variant.variantId !== controlVariant.variantId) {
          variant.improvement = ((variant.conversionRate - controlVariant.conversionRate) / controlVariant.conversionRate) * 100;
        }
      });
    }

    // Kazananı belirle
    const winner = variants.reduce((prev, current) => 
      current.conversionRate > prev.conversionRate ? current : prev
    );
    winner.isWinner = true;

    const totalVisitors = variants.reduce((sum, v) => sum + v.visitors, 0);
    const totalConversions = variants.reduce((sum, v) => sum + v.conversions, 0);
    const confidenceLevel = this.calculateOverallConfidence(variants);

    return {
      totalVisitors,
      totalConversions,
      confidenceLevel,
      winner: winner.variantId,
      variants,
      statisticalSignificance: confidenceLevel > 95,
      recommendations: this.generateRecommendations(test, variants)
    };
  }

  // Varyant Metriklerini Simüle Etme
  private simulateVariantMetrics(variant: ABTestVariant, test: ABTest): VariantMetrics {
    const baseVisitors = 1000 * (variant.weight / 100);
    const baseConversionRate = 0.02; // %2 temel dönüşüm oranı

    // Test tipine göre farklı performans
    let conversionMultiplier = 1;
    let bounceRateMultiplier = 1;
    let timeOnPageMultiplier = 1;

    switch (test.type) {
      case 'title':
        conversionMultiplier = variant.name.includes('Emotional') ? 1.3 : 1.1;
        break;
      case 'cta':
        conversionMultiplier = variant.name.includes('Kırmızı') ? 1.4 : 1.2;
        break;
      case 'content':
        timeOnPageMultiplier = variant.name.includes('Video') ? 1.5 : 1.2;
        break;
      case 'layout':
        bounceRateMultiplier = variant.name.includes('Grid') ? 0.8 : 1.0;
        break;
    }

    const visitors = Math.floor(baseVisitors + (Math.random() - 0.5) * 200);
    const conversions = Math.floor(visitors * baseConversionRate * conversionMultiplier);
    const revenue = conversions * (50 + Math.random() * 100); // $50-150 arası
    const bounceRate = (0.3 + Math.random() * 0.4) * bounceRateMultiplier; // %30-70 arası
    const timeOnPage = (60 + Math.random() * 120) * timeOnPageMultiplier; // 60-180 saniye
    const clickThroughRate = (0.05 + Math.random() * 0.1) * conversionMultiplier; // %5-15 arası
    const engagementRate = (0.6 + Math.random() * 0.3) * timeOnPageMultiplier; // %60-90 arası

    return {
      visitors,
      conversions,
      revenue,
      bounceRate,
      timeOnPage,
      clickThroughRate,
      engagementRate
    };
  }

  // Güven Seviyesi Hesaplama
  private calculateConfidence(visitors: number, conversions: number): number {
    if (visitors === 0) return 0;
    
    const conversionRate = conversions / visitors;
    const standardError = Math.sqrt((conversionRate * (1 - conversionRate)) / visitors);
    const zScore = 1.96; // %95 güven seviyesi
    
    const marginOfError = zScore * standardError;
    const confidence = Math.max(0, Math.min(100, (1 - marginOfError) * 100));
    
    return confidence;
  }

  // Genel Güven Seviyesi Hesaplama
  private calculateOverallConfidence(variants: VariantResults[]): number {
    if (variants.length < 2) return 0;
    
    const controlVariant = variants.find(v => v.variantName.includes('Control') || v.variantName.includes('A'));
    const testVariant = variants.find(v => !v.variantName.includes('Control') && !v.variantName.includes('A'));
    
    if (!controlVariant || !testVariant) return 0;
    
    const controlRate = controlVariant.conversionRate / 100;
    const testRate = testVariant.conversionRate / 100;
    
    const pooledRate = (controlVariant.conversions + testVariant.conversions) / 
                      (controlVariant.visitors + testVariant.visitors);
    
    const standardError = Math.sqrt(
      pooledRate * (1 - pooledRate) * (1/controlVariant.visitors + 1/testVariant.visitors)
    );
    
    const zScore = Math.abs(testRate - controlRate) / standardError;
    const confidence = Math.min(100, (1 - Math.exp(-zScore)) * 100);
    
    return confidence;
  }

  // Öneriler Oluşturma
  private generateRecommendations(test: ABTest, variants: VariantResults[]): string[] {
    const recommendations: string[] = [];
    const winner = variants.find(v => v.isWinner);
    const control = variants.find(v => !v.isWinner);

    if (!winner || !control) return recommendations;

    if (winner.improvement > 20) {
      recommendations.push(`${winner.variantName} varyantı %${winner.improvement.toFixed(1)} daha iyi performans gösterdi. Bu varyantı kalıcı olarak uygulayın.`);
    } else if (winner.improvement > 10) {
      recommendations.push(`${winner.variantName} varyantı %${winner.improvement.toFixed(1)} daha iyi performans gösterdi. Test süresini uzatarak daha kesin sonuçlar alın.`);
    } else if (winner.improvement > 5) {
      recommendations.push(`${winner.variantName} varyantı hafif bir iyileştirme gösterdi. Daha büyük örneklem ile testi tekrarlayın.`);
    } else {
      recommendations.push('Test sonuçları istatistiksel olarak anlamlı değil. Test süresini uzatın veya farklı varyantlar deneyin.');
    }

    if (test.results.confidenceLevel < 95) {
      recommendations.push('Güven seviyesi %95\'in altında. Daha fazla trafik ile testi tekrarlayın.');
    }

    if (winner.conversionRate < 0.01) {
      recommendations.push('Dönüşüm oranları çok düşük. Sayfa tasarımını ve kullanıcı deneyimini gözden geçirin.');
    }

    return recommendations;
  }

  // Test Şablonları
  getTemplates(): ABTestTemplate[] {
    return this.templates;
  }

  getTemplateById(id: string): ABTestTemplate | undefined {
    return this.templates.find(t => t.id === id);
  }

  // Test Yönetimi
  getTests(): ABTest[] {
    return this.tests;
  }

  getTestById(id: string): ABTest | undefined {
    return this.tests.find(t => t.id === id);
  }

  updateTest(testId: string, updates: Partial<ABTest>): void {
    const index = this.tests.findIndex(t => t.id === testId);
    if (index === -1) {
      throw new Error(`Test bulunamadı: ${testId}`);
    }

    this.tests[index] = {
      ...this.tests[index],
      ...updates,
      updatedAt: new Date()
    };
  }

  deleteTest(testId: string): void {
    const index = this.tests.findIndex(t => t.id === testId);
    if (index !== -1) {
      this.tests.splice(index, 1);
    }
  }

  // Test Analizi
  analyzeTest(testId: string): {
    test: ABTest;
    insights: string[];
    recommendations: string[];
    nextSteps: string[];
  } {
    const test = this.getTestById(testId);
    if (!test) {
      throw new Error(`Test bulunamadı: ${testId}`);
    }

    const insights: string[] = [];
    const recommendations: string[] = [];
    const nextSteps: string[] = [];

    // Test durumuna göre analiz
    switch (test.status) {
      case 'running':
        insights.push('Test aktif olarak çalışıyor');
        insights.push(`${test.variants.length} varyant test ediliyor`);
        nextSteps.push('Test sonuçlarını düzenli olarak kontrol edin');
        nextSteps.push('İstatistiksel anlamlılık için yeterli trafik bekleyin');
        break;

      case 'completed':
        if (test.results.winner) {
          const winner = test.results.variants.find(v => v.variantId === test.results.winner);
          if (winner) {
            insights.push(`${winner.variantName} kazanan varyant`);
            insights.push(`%${winner.improvement.toFixed(1)} iyileştirme sağlandı`);
            recommendations.push('Kazanan varyantı kalıcı olarak uygulayın');
            recommendations.push('Benzer testleri diğer sayfalarda da yapın');
          }
        }
        break;

      case 'paused':
        insights.push('Test duraklatıldı');
        nextSteps.push('Testi yeniden başlatın veya sonuçları analiz edin');
        break;
    }

    return { test, insights, recommendations, nextSteps };
  }
}

// A/B Testing Hook
export const useABTesting = () => {
  const abTesting = new ABTestingSystem();

  const createABTest = (testData: Omit<ABTest, 'id' | 'createdAt' | 'updatedAt' | 'results'>) => {
    return abTesting.createABTest(testData);
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

  const getTests = () => {
    return abTesting.getTests();
  };

  const getTestById = (id: string) => {
    return abTesting.getTestById(id);
  };

  const getTemplates = () => {
    return abTesting.getTemplates();
  };

  const analyzeTest = (testId: string) => {
    return abTesting.analyzeTest(testId);
  };

  return {
    createABTest,
    startTest,
    pauseTest,
    completeTest,
    getTests,
    getTestById,
    getTemplates,
    analyzeTest
  };
}; 