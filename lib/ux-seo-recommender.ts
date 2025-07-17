// UX/SEO İyileştirme Öneri Motoru
export interface UXSEORecommendation {
  id: string;
  category: 'layout' | 'content' | 'navigation' | 'performance' | 'conversion' | 'accessibility';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: {
    seo: number; // 0-100 arası SEO etkisi
    ux: number; // 0-100 arası UX etkisi
    conversion: number; // 0-100 arası dönüşüm etkisi
  };
  effort: 'low' | 'medium' | 'high';
  implementation: string[];
  estimatedTime: string;
  cost: 'free' | 'low' | 'medium' | 'high';
  seoFactors: string[];
  uxFactors: string[];
}

export interface UserBehaviorData {
  bounceRate: number;
  avgSessionDuration: number;
  avgScrollDepth: number;
  exitIntentRate: number;
  clickMap: Record<string, number>;
  scrollMap: number[];
  heatmap: Array<{x: number, y: number, count: number}>;
  formAbandonmentRate: number;
  mobileUsage: number;
  pageLoadTime: number;
}

export interface SEOFactors {
  pageSpeed: number;
  mobileScore: number;
  accessibilityScore: number;
  contentLength: number;
  internalLinks: number;
  externalLinks: number;
  images: number;
  videos: number;
  forms: number;
}

export class UXSEORecommender {
  private recommendations: UXSEORecommendation[] = [];

  constructor() {
    this.initializeRecommendations();
  }

  private initializeRecommendations(): void {
    this.recommendations = [
      {
        id: 'high_bounce_rate',
        category: 'content',
        priority: 'high',
        title: 'Hemen Çıkma Oranını Azalt',
        description: 'Kullanıcılar sayfayı hızlıca terk ediyor. İçerik kalitesini ve açılış deneyimini iyileştirin.',
        impact: { seo: 85, ux: 90, conversion: 75 },
        effort: 'medium',
        implementation: [
          'Sayfa yükleme hızını optimize edin',
          'İlk görünen alanı (above the fold) iyileştirin',
          'Açık ve çekici başlık kullanın',
          'Görsel içerik ekleyin',
          'CTA butonlarını daha belirgin yapın'
        ],
        estimatedTime: '2-3 hafta',
        cost: 'low',
        seoFactors: ['Dwell time artışı', 'Bounce rate azalması', 'Sayfa otoritesi artışı'],
        uxFactors: ['Daha iyi ilk izlenim', 'Artırılmış etkileşim', 'Daha uzun oturum süresi']
      },
      {
        id: 'low_scroll_depth',
        category: 'content',
        priority: 'medium',
        title: 'Scroll Derinliğini Artır',
        description: 'Kullanıcılar sayfanın alt kısımlarına inmiyor. İçerik yapısını ve akışını iyileştirin.',
        impact: { seo: 70, ux: 80, conversion: 60 },
        effort: 'medium',
        implementation: [
          'İçerik yapısını gözden geçirin',
          'Alt başlıklar ekleyin',
          'Görsel içerikler ekleyin',
          'İçerik bölümlerini kısaltın',
          'İlgi çekici alt başlıklar kullanın'
        ],
        estimatedTime: '1-2 hafta',
        cost: 'low',
        seoFactors: ['Daha fazla içerik görüntüleme', 'Artırılmış sayfa süresi', 'Daha iyi içerik sinyalleri'],
        uxFactors: ['Daha iyi içerik akışı', 'Artırılmış okuma deneyimi', 'Daha fazla etkileşim']
      },
      {
        id: 'slow_page_speed',
        category: 'performance',
        priority: 'high',
        title: 'Sayfa Hızını Optimize Et',
        description: 'Sayfa yükleme süresi yavaş. Performans optimizasyonu yapın.',
        impact: { seo: 95, ux: 90, conversion: 80 },
        effort: 'high',
        implementation: [
          'Görselleri optimize edin',
          'CSS ve JS dosyalarını minify edin',
          'CDN kullanın',
          'Gereksiz eklentileri kaldırın',
          'Önbellek stratejisi uygulayın'
        ],
        estimatedTime: '3-4 hafta',
        cost: 'medium',
        seoFactors: ['Core Web Vitals iyileşmesi', 'Arama sıralaması artışı', 'Mobil uyumluluk'],
        uxFactors: ['Daha hızlı yükleme', 'Daha iyi kullanıcı deneyimi', 'Daha az sinirlenme']
      },
      {
        id: 'poor_mobile_experience',
        category: 'layout',
        priority: 'high',
        title: 'Mobil Deneyimi İyileştir',
        description: 'Mobil kullanıcılar için deneyim yetersiz. Responsive tasarımı optimize edin.',
        impact: { seo: 90, ux: 95, conversion: 85 },
        effort: 'high',
        implementation: [
          'Responsive tasarımı gözden geçirin',
          'Touch-friendly butonlar ekleyin',
          'Mobil navigasyonu iyileştirin',
          'Mobil hızını optimize edin',
          'Mobil CTA\'ları optimize edin'
        ],
        estimatedTime: '4-6 hafta',
        cost: 'medium',
        seoFactors: ['Mobil-first indeksleme', 'Mobil sıralama artışı', 'Core Web Vitals'],
        uxFactors: ['Daha iyi mobil deneyim', 'Artırılmış mobil etkileşim', 'Daha az sinirlenme']
      },
      {
        id: 'weak_cta_buttons',
        category: 'conversion',
        priority: 'medium',
        title: 'CTA Butonlarını Güçlendir',
        description: 'Call-to-action butonları yeterince etkili değil. Tasarım ve konumlandırmayı iyileştirin.',
        impact: { seo: 40, ux: 70, conversion: 90 },
        effort: 'low',
        implementation: [
          'CTA butonlarını daha belirgin yapın',
          'Renk kontrastını artırın',
          'CTA metinlerini optimize edin',
          'Buton konumlarını test edin',
          'A/B testleri yapın'
        ],
        estimatedTime: '1 hafta',
        cost: 'free',
        seoFactors: ['Daha fazla etkileşim', 'Daha iyi kullanıcı sinyalleri'],
        uxFactors: ['Daha net yönlendirme', 'Artırılmış dönüşüm', 'Daha iyi kullanıcı yolu']
      },
      {
        id: 'poor_navigation',
        category: 'navigation',
        priority: 'medium',
        title: 'Navigasyonu İyileştir',
        description: 'Kullanıcılar site içinde kayboluyor. Navigasyon yapısını optimize edin.',
        impact: { seo: 60, ux: 85, conversion: 70 },
        effort: 'medium',
        implementation: [
          'Menü yapısını gözden geçirin',
          'Breadcrumb navigasyonu ekleyin',
          'İç linkleme stratejisini iyileştirin',
          'Arama fonksiyonu ekleyin',
          'Site haritası ekleyin'
        ],
        estimatedTime: '2-3 hafta',
        cost: 'low',
        seoFactors: ['Daha iyi site yapısı', 'Artırılmış sayfa görüntüleme', 'Daha iyi crawl'],
        uxFactors: ['Daha kolay navigasyon', 'Daha az kaybolma', 'Daha iyi kullanıcı deneyimi']
      },
      {
        id: 'accessibility_issues',
        category: 'accessibility',
        priority: 'low',
        title: 'Erişilebilirlik Sorunlarını Çöz',
        description: 'Erişilebilirlik standartları karşılanmıyor. WCAG uyumluluğunu sağlayın.',
        impact: { seo: 50, ux: 80, conversion: 40 },
        effort: 'medium',
        implementation: [
          'Alt text\'leri ekleyin',
          'Renk kontrastını iyileştirin',
          'Keyboard navigasyonu ekleyin',
          'Screen reader uyumluluğu sağlayın',
          'Focus göstergelerini iyileştirin'
        ],
        estimatedTime: '2-3 hafta',
        cost: 'low',
        seoFactors: ['Daha iyi crawl', 'Daha geniş kitle', 'Yasal uyumluluk'],
        uxFactors: ['Daha kapsayıcı deneyim', 'Daha iyi kullanıcı desteği', 'Artırılmış erişilebilirlik']
      },
      {
        id: 'content_optimization',
        category: 'content',
        priority: 'medium',
        title: 'İçerik Kalitesini Artır',
        description: 'İçerik kullanıcı ihtiyaçlarını tam karşılamıyor. İçerik stratejisini iyileştirin.',
        impact: { seo: 85, ux: 75, conversion: 65 },
        effort: 'medium',
        implementation: [
          'İçerik kalitesini artırın',
          'Anahtar kelime optimizasyonu yapın',
          'Görsel içerikler ekleyin',
          'İçerik yapısını iyileştirin',
          'Kullanıcı sorularını cevaplayın'
        ],
        estimatedTime: '3-4 hafta',
        cost: 'medium',
        seoFactors: ['Daha iyi arama sıralaması', 'Artırılmış organik trafik', 'Daha iyi içerik sinyalleri'],
        uxFactors: ['Daha değerli içerik', 'Daha uzun okuma süresi', 'Daha fazla paylaşım']
      }
    ];
  }

  // Kullanıcı davranışına göre öneriler üret
  generateRecommendations(behaviorData: UserBehaviorData, seoFactors: SEOFactors): UXSEORecommendation[] {
    const recommendations: UXSEORecommendation[] = [];

    // Bounce rate analizi
    if (behaviorData.bounceRate > 60) {
      recommendations.push(this.recommendations.find(r => r.id === 'high_bounce_rate')!);
    }

    // Scroll depth analizi
    if (behaviorData.avgScrollDepth < 40) {
      recommendations.push(this.recommendations.find(r => r.id === 'low_scroll_depth')!);
    }

    // Page speed analizi
    if (seoFactors.pageSpeed < 70) {
      recommendations.push(this.recommendations.find(r => r.id === 'slow_page_speed')!);
    }

    // Mobile experience analizi
    if (behaviorData.mobileUsage > 50 && seoFactors.mobileScore < 80) {
      recommendations.push(this.recommendations.find(r => r.id === 'poor_mobile_experience')!);
    }

    // CTA analizi
    const topClickedElements = Object.entries(behaviorData.clickMap)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
    
    if (topClickedElements.length === 0 || topClickedElements[0][1] < 10) {
      recommendations.push(this.recommendations.find(r => r.id === 'weak_cta_buttons')!);
    }

    // Navigation analizi
    if (behaviorData.avgSessionDuration < 60) {
      recommendations.push(this.recommendations.find(r => r.id === 'poor_navigation')!);
    }

    // Accessibility analizi
    if (seoFactors.accessibilityScore < 70) {
      recommendations.push(this.recommendations.find(r => r.id === 'accessibility_issues')!);
    }

    // Content analizi
    if (seoFactors.contentLength < 500) {
      recommendations.push(this.recommendations.find(r => r.id === 'content_optimization')!);
    }

    // Öncelik sırasına göre sırala
    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  // Öneri detaylarını getir
  getRecommendationById(id: string): UXSEORecommendation | undefined {
    return this.recommendations.find(r => r.id === id);
  }

  // Kategori bazında öneriler
  getRecommendationsByCategory(category: string): UXSEORecommendation[] {
    return this.recommendations.filter(r => r.category === category);
  }

  // Öncelik bazında öneriler
  getRecommendationsByPriority(priority: string): UXSEORecommendation[] {
    return this.recommendations.filter(r => r.priority === priority);
  }

  // Tüm önerileri getir
  getAllRecommendations(): UXSEORecommendation[] {
    return this.recommendations;
  }

  // Öneri uygulama planı oluştur
  generateImplementationPlan(recommendations: UXSEORecommendation[]): {
    timeline: string;
    totalEffort: string;
    totalCost: string;
    phases: Array<{
      phase: number;
      title: string;
      recommendations: UXSEORecommendation[];
      duration: string;
    }>;
  } {
    const highPriority = recommendations.filter(r => r.priority === 'high');
    const mediumPriority = recommendations.filter(r => r.priority === 'medium');
    const lowPriority = recommendations.filter(r => r.priority === 'low');

    const phases = [
      {
        phase: 1,
        title: 'Acil İyileştirmeler (1-2 hafta)',
        recommendations: highPriority,
        duration: '1-2 hafta'
      },
      {
        phase: 2,
        title: 'Orta Öncelikli İyileştirmeler (2-4 hafta)',
        recommendations: mediumPriority,
        duration: '2-4 hafta'
      },
      {
        phase: 3,
        title: 'Uzun Vadeli İyileştirmeler (1-2 ay)',
        recommendations: lowPriority,
        duration: '1-2 ay'
      }
    ];

    const totalEffort = this.calculateTotalEffort(recommendations);
    const totalCost = this.calculateTotalCost(recommendations);
    const timeline = this.calculateTimeline(recommendations);

    return {
      timeline,
      totalEffort,
      totalCost,
      phases
    };
  }

  private calculateTotalEffort(recommendations: UXSEORecommendation[]): string {
    const effortCounts = recommendations.reduce((acc, rec) => {
      acc[rec.effort] = (acc[rec.effort] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    if (effortCounts.high > effortCounts.medium && effortCounts.high > effortCounts.low) {
      return 'Yüksek';
    } else if (effortCounts.medium > effortCounts.low) {
      return 'Orta';
    } else {
      return 'Düşük';
    }
  }

  private calculateTotalCost(recommendations: UXSEORecommendation[]): string {
    const costCounts = recommendations.reduce((acc, rec) => {
      acc[rec.cost] = (acc[rec.cost] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    if (costCounts.high > costCounts.medium && costCounts.high > costCounts.low) {
      return 'Yüksek';
    } else if (costCounts.medium > costCounts.low) {
      return 'Orta';
    } else {
      return 'Düşük';
    }
  }

  private calculateTimeline(recommendations: UXSEORecommendation[]): string {
    const totalWeeks = recommendations.reduce((sum, rec) => {
      const weeks = parseInt(rec.estimatedTime.match(/\d+/)?.[0] || '1');
      return sum + weeks;
    }, 0);

    if (totalWeeks <= 4) return `${totalWeeks} hafta`;
    if (totalWeeks <= 12) return `${Math.ceil(totalWeeks / 4)} ay`;
    return `${Math.ceil(totalWeeks / 12)} ay`;
  }
}

// UX/SEO Recommender Hook
export const useUXSEORecommender = () => {
  const recommender = new UXSEORecommender();

  return {
    generateRecommendations: (behaviorData: UserBehaviorData, seoFactors: SEOFactors) => 
      recommender.generateRecommendations(behaviorData, seoFactors),
    getRecommendationById: (id: string) => recommender.getRecommendationById(id),
    getRecommendationsByCategory: (category: string) => recommender.getRecommendationsByCategory(category),
    getRecommendationsByPriority: (priority: string) => recommender.getRecommendationsByPriority(priority),
    getAllRecommendations: () => recommender.getAllRecommendations(),
    generateImplementationPlan: (recommendations: UXSEORecommendation[]) => 
      recommender.generateImplementationPlan(recommendations)
  };
}; 