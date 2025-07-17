// AI Destekli Rakip Analizi Sistemi
export interface Competitor {
  id: string;
  name: string;
  domain: string;
  description: string;
  category: string;
  strength: 'weak' | 'medium' | 'strong' | 'dominant';
  lastAnalyzed: Date;
  metrics: CompetitorMetrics;
  keywords: CompetitorKeyword[];
  content: CompetitorContent[];
  backlinks: CompetitorBacklink[];
}

export interface CompetitorMetrics {
  domainAuthority: number;
  pageAuthority: number;
  organicTraffic: number;
  organicKeywords: number;
  backlinks: number;
  referringDomains: number;
  socialShares: number;
  estimatedValue: number;
}

export interface CompetitorKeyword {
  keyword: string;
  position: number;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  traffic: number;
  change: number; // % değişim
}

export interface CompetitorContent {
  url: string;
  title: string;
  type: 'blog' | 'product' | 'service' | 'landing';
  wordCount: number;
  publishDate: Date;
  socialShares: number;
  backlinks: number;
  keywords: string[];
}

export interface CompetitorBacklink {
  url: string;
  domain: string;
  authority: number;
  anchorText: string;
  followType: 'dofollow' | 'nofollow';
  firstSeen: Date;
  lastSeen: Date;
}

export interface CompetitorAnalysis {
  competitor: Competitor;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  recommendations: CompetitorRecommendation[];
  gapAnalysis: ContentGap[];
  keywordOpportunities: KeywordOpportunity[];
}

export interface CompetitorRecommendation {
  type: 'content' | 'technical' | 'link' | 'keyword';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  effort: string;
  implementation: string;
}

export interface ContentGap {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  competitors: string[];
  opportunity: number;
  suggestedContent: string;
}

export interface KeywordOpportunity {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  competition: number;
  opportunity: number;
  competitors: string[];
  suggestedStrategy: string;
}

export interface MarketAnalysis {
  marketSize: number;
  growthRate: number;
  topPlayers: Competitor[];
  emergingTrends: string[];
  marketShare: { [competitor: string]: number };
  opportunities: string[];
  threats: string[];
}

export class CompetitorAnalyzer {
  private competitors: Competitor[] = [];
  private marketData: MarketAnalysis | null = null;

  constructor() {
    this.initializeCompetitors();
    this.initializeMarketData();
  }

  private initializeCompetitors(): void {
    this.competitors = [
      {
        id: 'competitor_1',
        name: 'Smart City Solutions',
        domain: 'smartcitysolutions.com',
        description: 'Akıllı şehir teknolojileri ve çözümleri',
        category: 'Smart City Technology',
        strength: 'strong',
        lastAnalyzed: new Date(),
        metrics: {
          domainAuthority: 65,
          pageAuthority: 58,
          organicTraffic: 45000,
          organicKeywords: 2800,
          backlinks: 8500,
          referringDomains: 1200,
          socialShares: 3200,
          estimatedValue: 125000
        },
        keywords: [
          {
            keyword: 'akıllı şehir',
            position: 3,
            searchVolume: 12000,
            difficulty: 45,
            cpc: 2.50,
            traffic: 8500,
            change: 15
          },
          {
            keyword: 'toplu taşıma optimizasyonu',
            position: 1,
            searchVolume: 3500,
            difficulty: 38,
            cpc: 1.80,
            traffic: 2800,
            change: 8
          }
        ],
        content: [
          {
            url: 'https://smartcitysolutions.com/akilli-sehir-teknolojileri',
            title: 'Akıllı Şehir Teknolojileri ve Geleceği',
            type: 'blog',
            wordCount: 2500,
            publishDate: new Date('2024-01-15'),
            socialShares: 450,
            backlinks: 120,
            keywords: ['akıllı şehir', 'teknoloji', 'gelecek']
          }
        ],
        backlinks: [
          {
            url: 'https://techcrunch.com/smart-city-innovations',
            domain: 'techcrunch.com',
            authority: 92,
            anchorText: 'akıllı şehir çözümleri',
            followType: 'dofollow',
            firstSeen: new Date('2024-01-10'),
            lastSeen: new Date('2024-01-15')
          }
        ]
      },
      {
        id: 'competitor_2',
        name: 'Urban Mobility Pro',
        domain: 'urbanmobilitypro.com',
        description: 'Kentsel hareketlilik ve ulaşım çözümleri',
        category: 'Urban Mobility',
        strength: 'medium',
        lastAnalyzed: new Date(),
        metrics: {
          domainAuthority: 52,
          pageAuthority: 45,
          organicTraffic: 28000,
          organicKeywords: 1800,
          backlinks: 5200,
          referringDomains: 850,
          socialShares: 2100,
          estimatedValue: 85000
        },
        keywords: [
          {
            keyword: 'kentsel hareketlilik',
            position: 2,
            searchVolume: 8500,
            difficulty: 42,
            cpc: 2.20,
            traffic: 6200,
            change: 12
          }
        ],
        content: [],
        backlinks: []
      },
      {
        id: 'competitor_3',
        name: 'TransportTech',
        domain: 'transporttech.io',
        description: 'Ulaşım teknolojileri ve optimizasyon',
        category: 'Transport Technology',
        strength: 'weak',
        lastAnalyzed: new Date(),
        metrics: {
          domainAuthority: 38,
          pageAuthority: 32,
          organicTraffic: 15000,
          organicKeywords: 950,
          backlinks: 2800,
          referringDomains: 450,
          socialShares: 1200,
          estimatedValue: 45000
        },
        keywords: [],
        content: [],
        backlinks: []
      }
    ];
  }

  private initializeMarketData(): void {
    this.marketData = {
      marketSize: 2500000000, // 2.5 milyar USD
      growthRate: 12.5,
      topPlayers: this.competitors.slice(0, 3),
      emergingTrends: [
        'AI destekli trafik yönetimi',
        'Elektrikli araç altyapısı',
        'Mikro-mobilite çözümleri',
        'Veri odaklı şehir planlama',
        'Sürdürülebilir ulaşım sistemleri'
      ],
      marketShare: {
        'Smart City Solutions': 25,
        'Urban Mobility Pro': 18,
        'TransportTech': 12,
        'OW': 8,
        'Others': 37
      },
      opportunities: [
        'Gelişmekte olan pazarlar',
        'Yeni teknoloji entegrasyonu',
        'Partnership fırsatları',
        'Ürün çeşitlendirme'
      ],
      threats: [
        'Büyük teknoloji şirketlerinin girişi',
        'Regülasyon değişiklikleri',
        'Ekonomik belirsizlik',
        'Teknoloji hızlı değişimi'
      ]
    };
  }

  // Rakip Analizi
  analyzeCompetitor(competitorId: string): CompetitorAnalysis {
    const competitor = this.competitors.find(c => c.id === competitorId);
    if (!competitor) {
      throw new Error(`Rakip bulunamadı: ${competitorId}`);
    }

    const strengths = this.identifyStrengths(competitor);
    const weaknesses = this.identifyWeaknesses(competitor);
    const opportunities = this.identifyOpportunities(competitor);
    const threats = this.identifyThreats(competitor);
    const recommendations = this.generateRecommendations(competitor);
    const gapAnalysis = this.analyzeContentGaps(competitor);
    const keywordOpportunities = this.analyzeKeywordOpportunities(competitor);

    return {
      competitor,
      strengths,
      weaknesses,
      opportunities,
      threats,
      recommendations,
      gapAnalysis,
      keywordOpportunities
    };
  }

  // Güçlü Yönleri Belirleme
  private identifyStrengths(competitor: Competitor): string[] {
    const strengths: string[] = [];

    if (competitor.metrics.domainAuthority > 60) {
      strengths.push('Yüksek domain otoritesi');
    }

    if (competitor.metrics.organicTraffic > 40000) {
      strengths.push('Yüksek organik trafik');
    }

    if (competitor.metrics.backlinks > 8000) {
      strengths.push('Güçlü backlink profili');
    }

    if (competitor.keywords.some(k => k.position <= 3)) {
      strengths.push('Yüksek sıralama anahtar kelimeler');
    }

    if (competitor.content.length > 5) {
      strengths.push('Zengin içerik portföyü');
    }

    return strengths;
  }

  // Zayıf Yönleri Belirleme
  private identifyWeaknesses(competitor: Competitor): string[] {
    const weaknesses: string[] = [];

    if (competitor.metrics.domainAuthority < 50) {
      weaknesses.push('Düşük domain otoritesi');
    }

    if (competitor.metrics.organicTraffic < 20000) {
      weaknesses.push('Düşük organik trafik');
    }

    if (competitor.metrics.backlinks < 5000) {
      weaknesses.push('Zayıf backlink profili');
    }

    if (competitor.keywords.some(k => k.position > 10)) {
      weaknesses.push('Düşük sıralama anahtar kelimeler');
    }

    if (competitor.content.length < 3) {
      weaknesses.push('Sınırlı içerik');
    }

    return weaknesses;
  }

  // Fırsatları Belirleme
  private identifyOpportunities(competitor: Competitor): string[] {
    const opportunities: string[] = [];

    // Rakibin zayıf olduğu alanlar
    if (competitor.metrics.socialShares < 2000) {
      opportunities.push('Sosyal medya varlığını artırma fırsatı');
    }

    if (competitor.content.length < 10) {
      opportunities.push('İçerik boşluklarını doldurma fırsatı');
    }

    // Pazar fırsatları
    opportunities.push('Gelişmekte olan pazarlar');
    opportunities.push('Yeni teknoloji entegrasyonu');

    return opportunities;
  }

  // Tehditleri Belirleme
  private identifyThreats(competitor: Competitor): string[] {
    const threats: string[] = [];

    if (competitor.metrics.organicTraffic > 50000) {
      threats.push('Güçlü rakip varlığı');
    }

    if (competitor.keywords.some(k => k.change < 0)) {
      threats.push('Düşen anahtar kelime performansı');
    }

    threats.push('Büyük teknoloji şirketlerinin girişi');
    threats.push('Regülasyon değişiklikleri');

    return threats;
  }

  // Öneriler Oluşturma
  private generateRecommendations(competitor: Competitor): CompetitorRecommendation[] {
    const recommendations: CompetitorRecommendation[] = [];

    // İçerik önerileri
    if (competitor.content.length < 10) {
      recommendations.push({
        type: 'content',
        priority: 'high',
        title: 'İçerik Portföyünü Genişlet',
        description: 'Rakibin zayıf olduğu konularda içerik üret',
        impact: 'Organik trafik artışı',
        effort: 'Orta - 2-3 ay',
        implementation: 'Haftalık blog yazıları ve kapsamlı rehberler'
      });
    }

    // Teknik öneriler
    if (competitor.metrics.domainAuthority < 60) {
      recommendations.push({
        type: 'technical',
        priority: 'medium',
        title: 'Teknik SEO İyileştirmeleri',
        description: 'Site hızı ve teknik optimizasyon',
        impact: 'Domain otoritesi artışı',
        effort: 'Düşük - 1 ay',
        implementation: 'Core Web Vitals optimizasyonu'
      });
    }

    // Link önerileri
    if (competitor.metrics.backlinks < 8000) {
      recommendations.push({
        type: 'link',
        priority: 'high',
        title: 'Backlink Stratejisi',
        description: 'Kaliteli backlink kazanımı',
        impact: 'Domain otoritesi artışı',
        effort: 'Yüksek - 3-6 ay',
        implementation: 'Guest posting ve partnership'
      });
    }

    // Anahtar kelime önerileri
    const lowRankingKeywords = competitor.keywords.filter(k => k.position > 10);
    if (lowRankingKeywords.length > 0) {
      recommendations.push({
        type: 'keyword',
        priority: 'medium',
        title: 'Anahtar Kelime Optimizasyonu',
        description: 'Düşük sıralama anahtar kelimeleri iyileştir',
        impact: 'Organik trafik artışı',
        effort: 'Orta - 2-3 ay',
        implementation: 'İçerik optimizasyonu ve link building'
      });
    }

    return recommendations;
  }

  // İçerik Boşluk Analizi
  private analyzeContentGaps(competitor: Competitor): ContentGap[] {
    const gaps: ContentGap[] = [
      {
        keyword: 'akıllı şehir veri analizi',
        searchVolume: 8500,
        difficulty: 35,
        competitors: ['Smart City Solutions'],
        opportunity: 85,
        suggestedContent: 'Akıllı şehirlerde veri analizi ve yapay zeka uygulamaları'
      },
      {
        keyword: 'toplu taşıma yapay zeka',
        searchVolume: 6200,
        difficulty: 42,
        competitors: ['Urban Mobility Pro'],
        opportunity: 78,
        suggestedContent: 'Yapay zeka ile toplu taşıma optimizasyonu'
      },
      {
        keyword: 'sürdürülebilir ulaşım teknolojileri',
        searchVolume: 4800,
        difficulty: 38,
        competitors: ['TransportTech'],
        opportunity: 82,
        suggestedContent: 'Sürdürülebilir ulaşım çözümleri ve teknolojileri'
      }
    ];

    return gaps;
  }

  // Anahtar Kelime Fırsat Analizi
  private analyzeKeywordOpportunities(competitor: Competitor): KeywordOpportunity[] {
    const opportunities: KeywordOpportunity[] = [
      {
        keyword: 'akıllı şehir IoT',
        searchVolume: 12000,
        difficulty: 45,
        cpc: 3.20,
        competition: 65,
        opportunity: 88,
        competitors: ['Smart City Solutions'],
        suggestedStrategy: 'Kapsamlı IoT rehberi ve vaka çalışmaları'
      },
      {
        keyword: 'trafik optimizasyonu yazılımı',
        searchVolume: 8500,
        difficulty: 38,
        cpc: 2.80,
        competition: 55,
        opportunity: 92,
        competitors: ['Urban Mobility Pro'],
        suggestedStrategy: 'Yazılım demo ve teknik makaleler'
      },
      {
        keyword: 'şehir planlama teknolojileri',
        searchVolume: 6800,
        difficulty: 42,
        cpc: 2.50,
        competition: 60,
        opportunity: 85,
        competitors: ['TransportTech'],
        suggestedStrategy: 'Şehir planlama vaka çalışmaları'
      }
    ];

    return opportunities;
  }

  // Pazar Analizi
  getMarketAnalysis(): MarketAnalysis {
    if (!this.marketData) {
      throw new Error('Pazar verisi bulunamadı');
    }
    return this.marketData;
  }

  // Rakip Karşılaştırması
  compareCompetitors(competitorIds: string[]): {
    comparison: any[];
    insights: string[];
    recommendations: string[];
  } {
    const selectedCompetitors = this.competitors.filter(c => competitorIds.includes(c.id));
    
    const comparison = selectedCompetitors.map(competitor => ({
      name: competitor.name,
      domainAuthority: competitor.metrics.domainAuthority,
      organicTraffic: competitor.metrics.organicTraffic,
      organicKeywords: competitor.metrics.organicKeywords,
      backlinks: competitor.metrics.backlinks,
      strength: competitor.strength
    }));

    const insights: string[] = [];
    const recommendations: string[] = [];

    // En güçlü rakip analizi
    const strongestCompetitor = selectedCompetitors.reduce((prev, current) => 
      prev.metrics.domainAuthority > current.metrics.domainAuthority ? prev : current
    );

    insights.push(`${strongestCompetitor.name} en güçlü rakibiniz`);
    recommendations.push(`${strongestCompetitor.name}'in zayıf yönlerini hedefleyin`);

    // Ortalama metrikler
    const avgDomainAuthority = selectedCompetitors.reduce((sum, c) => sum + c.metrics.domainAuthority, 0) / selectedCompetitors.length;
    insights.push(`Ortalama domain otoritesi: ${avgDomainAuthority.toFixed(1)}`);

    return { comparison, insights, recommendations };
  }

  // Rakip İzleme
  trackCompetitor(competitorId: string): {
    changes: any[];
    alerts: string[];
    trends: any[];
  } {
    const competitor = this.competitors.find(c => c.id === competitorId);
    if (!competitor) {
      throw new Error(`Rakip bulunamadı: ${competitorId}`);
    }

    const changes: any[] = [];
    const alerts: string[] = [];
    const trends: any[] = [];

    // Anahtar kelime değişiklikleri
    competitor.keywords.forEach(keyword => {
      if (keyword.change > 10) {
        changes.push({
          type: 'keyword_improvement',
          keyword: keyword.keyword,
          change: keyword.change,
          message: `${keyword.keyword} anahtar kelimesi ${keyword.change}% iyileşti`
        });
      } else if (keyword.change < -10) {
        alerts.push(`${keyword.keyword} anahtar kelimesi ${Math.abs(keyword.change)}% düştü`);
      }
    });

    // Trafik değişiklikleri
    if (competitor.metrics.organicTraffic > 50000) {
      alerts.push('Rakip trafiği kritik seviyeye ulaştı');
    }

    // Yeni içerik
    if (competitor.content.length > 0) {
      const recentContent = competitor.content.filter(c => 
        new Date().getTime() - c.publishDate.getTime() < 7 * 24 * 60 * 60 * 1000
      );
      
      if (recentContent.length > 0) {
        changes.push({
          type: 'new_content',
          count: recentContent.length,
          message: `${recentContent.length} yeni içerik yayınlandı`
        });
      }
    }

    return { changes, alerts, trends };
  }

  // Rakip Ekleme
  addCompetitor(competitor: Omit<Competitor, 'id' | 'lastAnalyzed'>): void {
    const newCompetitor: Competitor = {
      ...competitor,
      id: `competitor_${Date.now()}`,
      lastAnalyzed: new Date()
    };

    this.competitors.push(newCompetitor);
  }

  // Rakip Güncelleme
  updateCompetitor(competitorId: string, updates: Partial<Competitor>): void {
    const index = this.competitors.findIndex(c => c.id === competitorId);
    if (index === -1) {
      throw new Error(`Rakip bulunamadı: ${competitorId}`);
    }

    this.competitors[index] = {
      ...this.competitors[index],
      ...updates,
      lastAnalyzed: new Date()
    };
  }

  // Public Methods
  getCompetitors(): Competitor[] {
    return this.competitors;
  }

  getCompetitorById(id: string): Competitor | undefined {
    return this.competitors.find(c => c.id === id);
  }

  getTopCompetitors(limit: number = 5): Competitor[] {
    return this.competitors
      .sort((a, b) => b.metrics.domainAuthority - a.metrics.domainAuthority)
      .slice(0, limit);
  }
}

// Competitor Analysis Hook
export const useCompetitorAnalysis = () => {
  const analyzer = new CompetitorAnalyzer();

  const analyzeCompetitor = (competitorId: string) => {
    return analyzer.analyzeCompetitor(competitorId);
  };

  const getMarketAnalysis = () => {
    return analyzer.getMarketAnalysis();
  };

  const compareCompetitors = (competitorIds: string[]) => {
    return analyzer.compareCompetitors(competitorIds);
  };

  const trackCompetitor = (competitorId: string) => {
    return analyzer.trackCompetitor(competitorId);
  };

  const getCompetitors = () => {
    return analyzer.getCompetitors();
  };

  const getTopCompetitors = (limit: number = 5) => {
    return analyzer.getTopCompetitors(limit);
  };

  return {
    analyzeCompetitor,
    getMarketAnalysis,
    compareCompetitors,
    trackCompetitor,
    getCompetitors,
    getTopCompetitors
  };
}; 