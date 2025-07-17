import { useEffect, useState } from 'react';

// SEO Trend Interface'leri
export interface SEOTrend {
  id: string;
  name: string;
  description: string;
  category: 'algorithm' | 'user-behavior' | 'content' | 'technical' | 'local' | 'mobile';
  type: 'emerging' | 'growing' | 'stable' | 'declining' | 'disruptive';
  impact: 'high' | 'medium' | 'low';
  confidence: number; // 0-100
  startDate: Date;
  endDate?: Date;
  duration: number; // days
  dataPoints: TrendDataPoint[];
  analysis: {
    summary: string;
    keyInsights: string[];
    recommendations: string[];
    risks: string[];
    opportunities: string[];
  };
  metrics: {
    searchVolume: number;
    competition: number;
    difficulty: number;
    opportunity: number;
  };
  competitors: {
    domain: string;
    adoption: 'early' | 'adopted' | 'late' | 'none';
    impact: number;
  }[];
}

export interface TrendDataPoint {
  date: Date;
  value: number;
  change: number; // percentage
  volume: number;
  competition: number;
  notes?: string;
}

export interface SEOTrendReport {
  id: string;
  timestamp: Date;
  period: {
    start: Date;
    end: Date;
  };
  summary: {
    totalTrends: number;
    emergingTrends: number;
    growingTrends: number;
    decliningTrends: number;
    highImpactTrends: number;
  };
  trends: SEOTrend[];
  insights: {
    keyFindings: string[];
    opportunities: string[];
    threats: string[];
    recommendations: string[];
  };
  predictions: {
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
  };
  actionItems: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
}

export interface TrendAlert {
  id: string;
  trendId: string;
  type: 'emerging' | 'spike' | 'decline' | 'opportunity' | 'threat';
  title: string;
  message: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  timestamp: Date;
  read: boolean;
  actionRequired: boolean;
  suggestedActions: string[];
}

export interface TrendPrediction {
  id: string;
  trendId: string;
  prediction: string;
  confidence: number;
  timeframe: '1month' | '3months' | '6months' | '1year';
  reasoning: string;
  factors: string[];
  impact: {
    traffic: number;
    rankings: number;
    conversions: number;
    revenue: number;
  };
}

export interface TrendComparison {
  id: string;
  trend1: string;
  trend2: string;
  comparison: {
    similarity: number;
    correlation: number;
    differences: string[];
    combinedOpportunity: number;
  };
  recommendations: string[];
}

export class SEOTrendAnalyzer {
  private static instance: SEOTrendAnalyzer;
  private trends: SEOTrend[] = [];
  private alerts: TrendAlert[] = [];
  private predictions: TrendPrediction[] = [];
  private observers: Set<(data: any) => void> = new Set();

  private constructor() {
    this.initializeDefaultTrends();
  }

  static getInstance(): SEOTrendAnalyzer {
    if (!SEOTrendAnalyzer.instance) {
      SEOTrendAnalyzer.instance = new SEOTrendAnalyzer();
    }
    return SEOTrendAnalyzer.instance;
  }

  // Varsayılan trendleri oluştur
  private initializeDefaultTrends(): void {
    this.trends = [
      {
        id: 'core-web-vitals',
        name: 'Core Web Vitals Önemi',
        description: 'Google\'ın Core Web Vitals metriklerinin SEO\'daki artan önemi',
        category: 'technical',
        type: 'growing',
        impact: 'high',
        confidence: 95,
        startDate: new Date('2023-01-01'),
        duration: 365,
        dataPoints: [
          { date: new Date('2023-01-01'), value: 60, change: 0, volume: 1000, competition: 70 },
          { date: new Date('2023-06-01'), value: 75, change: 25, volume: 1500, competition: 75 },
          { date: new Date('2023-12-01'), value: 85, change: 33, volume: 2000, competition: 80 }
        ],
        analysis: {
          summary: 'Core Web Vitals metrikleri SEO sıralamalarında giderek daha kritik hale geliyor',
          keyInsights: [
            'LCP, FID ve CLS metrikleri doğrudan sıralama faktörü',
            'Mobil performans özellikle önemli',
            'Kullanıcı deneyimi ile SEO arasındaki bağ güçleniyor'
          ],
          recommendations: [
            'Core Web Vitals metriklerini sürekli izleyin',
            'Performans optimizasyonlarını önceliklendirin',
            'Mobil kullanıcı deneyimini iyileştirin'
          ],
          risks: [
            'Yavaş sayfalar sıralamada düşebilir',
            'Kullanıcı deneyimi kötü olan siteler ceza alabilir'
          ],
          opportunities: [
            'Hızlı siteler avantaj sağlayabilir',
            'Performans optimizasyonu rekabet avantajı yaratır'
          ]
        },
        metrics: {
          searchVolume: 2000,
          competition: 80,
          difficulty: 70,
          opportunity: 85
        },
        competitors: [
          { domain: 'competitor1.com', adoption: 'adopted', impact: 85 },
          { domain: 'competitor2.com', adoption: 'early', impact: 90 },
          { domain: 'competitor3.com', adoption: 'late', impact: 60 }
        ]
      },
      {
        id: 'ai-content',
        name: 'AI Destekli İçerik',
        description: 'Yapay zeka ile üretilen içeriklerin SEO\'daki rolü',
        category: 'content',
        type: 'emerging',
        impact: 'high',
        confidence: 80,
        startDate: new Date('2023-06-01'),
        duration: 180,
        dataPoints: [
          { date: new Date('2023-06-01'), value: 30, change: 0, volume: 500, competition: 40 },
          { date: new Date('2023-09-01'), value: 50, change: 67, volume: 800, competition: 55 },
          { date: new Date('2023-12-01'), value: 70, change: 40, volume: 1200, competition: 70 }
        ],
        analysis: {
          summary: 'AI destekli içerik üretimi SEO stratejilerinde giderek daha yaygın hale geliyor',
          keyInsights: [
            'AI içerikleri kalite kontrolü gerektiriyor',
            'İnsan editörlüğü hala kritik',
            'Özgünlük ve değer önemini koruyor'
          ],
          recommendations: [
            'AI araçlarını içerik üretiminde kullanın',
            'Kalite kontrolü için insan editörlüğü yapın',
            'Özgün ve değerli içerik odaklanın'
          ],
          risks: [
            'Düşük kaliteli AI içerikleri ceza alabilir',
            'Aşırı AI kullanımı spam olarak algılanabilir'
          ],
          opportunities: [
            'İçerik üretim hızını artırabilir',
            'Maliyetleri düşürebilir',
            'Ölçeklenebilir içerik stratejisi'
          ]
        },
        metrics: {
          searchVolume: 1200,
          competition: 70,
          difficulty: 60,
          opportunity: 75
        },
        competitors: [
          { domain: 'competitor1.com', adoption: 'early', impact: 80 },
          { domain: 'competitor2.com', adoption: 'none', impact: 40 },
          { domain: 'competitor3.com', adoption: 'adopted', impact: 85 }
        ]
      },
      {
        id: 'voice-search',
        name: 'Sesli Arama Optimizasyonu',
        description: 'Sesli arama sorguları için SEO optimizasyonu',
        category: 'user-behavior',
        type: 'growing',
        impact: 'medium',
        confidence: 85,
        startDate: new Date('2022-01-01'),
        duration: 730,
        dataPoints: [
          { date: new Date('2022-01-01'), value: 40, change: 0, volume: 800, competition: 50 },
          { date: new Date('2022-12-01'), value: 60, change: 50, volume: 1200, competition: 65 },
          { date: new Date('2023-12-01'), value: 75, change: 25, volume: 1500, competition: 75 }
        ],
        analysis: {
          summary: 'Sesli arama kullanımı artıyor ve SEO stratejilerini etkiliyor',
          keyInsights: [
            'Soru formatında sorgular artıyor',
            'Yerel arama ile güçlü bağlantı',
            'Doğal dil kullanımı önemli'
          ],
          recommendations: [
            'FAQ sayfaları oluşturun',
            'Soru formatında içerik üretin',
            'Yerel SEO\'yu güçlendirin'
          ],
          risks: [
            'Sesli arama optimizasyonu yapmayan siteler geride kalabilir',
            'Mobil optimizasyon daha kritik hale geliyor'
          ],
          opportunities: [
            'Sesli arama için özel içerik stratejisi',
            'Yerel arama avantajı',
            'Mobil kullanıcı deneyimi iyileştirme'
          ]
        },
        metrics: {
          searchVolume: 1500,
          competition: 75,
          difficulty: 65,
          opportunity: 70
        },
        competitors: [
          { domain: 'competitor1.com', adoption: 'adopted', impact: 80 },
          { domain: 'competitor2.com', adoption: 'early', impact: 75 },
          { domain: 'competitor3.com', adoption: 'late', impact: 60 }
        ]
      }
    ];
  }

  // Trend analizi yap
  async analyzeTrends(period: { start: Date; end: Date }): Promise<SEOTrend[]> {
    // Trend analizi simülasyonu
    const analyzedTrends = this.trends.map(trend => {
      const recentDataPoints = trend.dataPoints.filter(dp => 
        dp.date >= period.start && dp.date <= period.end
      );

      if (recentDataPoints.length > 0) {
        const latest = recentDataPoints[recentDataPoints.length - 1];
        const previous = recentDataPoints[recentDataPoints.length - 2];

        if (previous) {
          const change = ((latest.value - previous.value) / previous.value) * 100;
          
          // Trend tipini güncelle
          if (change > 20) trend.type = 'emerging';
          else if (change > 10) trend.type = 'growing';
          else if (change > -10) trend.type = 'stable';
          else trend.type = 'declining';

          // Alert oluştur
          if (Math.abs(change) > 30) {
            this.createAlert(trend, change > 0 ? 'spike' : 'decline', change);
          }
        }
      }

      return trend;
    });

    return analyzedTrends;
  }

  // Alert oluştur
  private createAlert(trend: SEOTrend, type: string, change: number): void {
    const alert: TrendAlert = {
      id: `alert-${Date.now()}`,
      trendId: trend.id,
      type: type as any,
      title: `${trend.name} Trendi ${type === 'spike' ? 'Yükseliş' : 'Düşüş'} Gösteriyor`,
      message: `${trend.name} trendi %${Math.abs(change).toFixed(1)} ${type === 'spike' ? 'artış' : 'azalış'} gösterdi.`,
      severity: Math.abs(change) > 50 ? 'critical' : Math.abs(change) > 30 ? 'high' : 'medium',
      timestamp: new Date(),
      read: false,
      actionRequired: true,
      suggestedActions: [
        'Trendi detaylı analiz edin',
        'Rakip analizi yapın',
        'Strateji güncellemesi planlayın'
      ]
    };

    this.alerts.push(alert);
    this.notifyObservers({ type: 'alert-created', data: alert });
  }

  // Trend tahmini oluştur
  async generatePredictions(trendId: string): Promise<TrendPrediction[]> {
    const trend = this.trends.find(t => t.id === trendId);
    if (!trend) return [];

    const predictions: TrendPrediction[] = [
      {
        id: `prediction-${Date.now()}`,
        trendId,
        prediction: `${trend.name} trendi önümüzdeki 3 ayda %15-25 artış gösterecek`,
        confidence: 75,
        timeframe: '3months',
        reasoning: 'Mevcut veri noktaları ve pazar analizi',
        factors: [
          'Teknoloji benimseme oranı artıyor',
          'Rakip analizi pozitif',
          'Kullanıcı davranışı değişiklikleri'
        ],
        impact: {
          traffic: 20,
          rankings: 15,
          conversions: 10,
          revenue: 15
        }
      },
      {
        id: `prediction-${Date.now()}-2`,
        trendId,
        prediction: `${trend.name} trendi 6 ay içinde ana akım haline gelecek`,
        confidence: 85,
        timeframe: '6months',
        reasoning: 'Pazar büyüme trendleri ve benimseme oranları',
        factors: [
          'Pazar büyüme hızı',
          'Teknoloji olgunluğu',
          'Kullanıcı kabulü'
        ],
        impact: {
          traffic: 35,
          rankings: 25,
          conversions: 20,
          revenue: 30
        }
      }
    ];

    this.predictions.push(...predictions);
    return predictions;
  }

  // Trend karşılaştırması yap
  compareTrends(trend1Id: string, trend2Id: string): TrendComparison | null {
    const trend1 = this.trends.find(t => t.id === trend1Id);
    const trend2 = this.trends.find(t => t.id === trend2Id);

    if (!trend1 || !trend2) return null;

    // Basit benzerlik hesaplama
    const similarity = this.calculateSimilarity(trend1, trend2);
    const correlation = this.calculateCorrelation(trend1, trend2);

    const comparison: TrendComparison = {
      id: `comparison-${Date.now()}`,
      trend1: trend1Id,
      trend2: trend2Id,
      comparison: {
        similarity: similarity,
        correlation: correlation,
        differences: [
          `${trend1.name} daha ${trend1.impact} etkiye sahip`,
          `${trend2.name} daha ${trend2.type} trend`,
          'Farklı kategorilerde yer alıyorlar'
        ],
        combinedOpportunity: (trend1.metrics.opportunity + trend2.metrics.opportunity) / 2
      },
      recommendations: [
        'Her iki trendi de takip edin',
        'Kombine strateji geliştirin',
        'Kaynakları dengeli dağıtın'
      ]
    };

    return comparison;
  }

  // Benzerlik hesapla
  private calculateSimilarity(trend1: SEOTrend, trend2: SEOTrend): number {
    let similarity = 0;
    
    if (trend1.category === trend2.category) similarity += 30;
    if (trend1.impact === trend2.impact) similarity += 25;
    if (trend1.type === trend2.type) similarity += 25;
    
    const impactDiff = Math.abs(trend1.metrics.opportunity - trend2.metrics.opportunity);
    similarity += Math.max(0, 20 - impactDiff);
    
    return Math.min(100, similarity);
  }

  // Korelasyon hesapla
  private calculateCorrelation(trend1: SEOTrend, trend2: SEOTrend): number {
    // Basit korelasyon hesaplama
    const data1 = trend1.dataPoints.map(dp => dp.value);
    const data2 = trend2.dataPoints.map(dp => dp.value);
    
    if (data1.length !== data2.length) return 0;
    
    const mean1 = data1.reduce((sum, val) => sum + val, 0) / data1.length;
    const mean2 = data2.reduce((sum, val) => sum + val, 0) / data2.length;
    
    let numerator = 0;
    let denominator1 = 0;
    let denominator2 = 0;
    
    for (let i = 0; i < data1.length; i++) {
      const diff1 = data1[i] - mean1;
      const diff2 = data2[i] - mean2;
      numerator += diff1 * diff2;
      denominator1 += diff1 * diff1;
      denominator2 += diff2 * diff2;
    }
    
    const correlation = numerator / Math.sqrt(denominator1 * denominator2);
    return Math.abs(correlation);
  }

  // Trend raporu oluştur
  async generateTrendReport(period: { start: Date; end: Date }): Promise<SEOTrendReport> {
    const analyzedTrends = await this.analyzeTrends(period);
    
    const summary = {
      totalTrends: analyzedTrends.length,
      emergingTrends: analyzedTrends.filter(t => t.type === 'emerging').length,
      growingTrends: analyzedTrends.filter(t => t.type === 'growing').length,
      decliningTrends: analyzedTrends.filter(t => t.type === 'declining').length,
      highImpactTrends: analyzedTrends.filter(t => t.impact === 'high').length
    };

    const insights = {
      keyFindings: [
        'Teknik SEO trendleri güçleniyor',
        'AI içerik üretimi yaygınlaşıyor',
        'Kullanıcı deneyimi kritik hale geliyor'
      ],
      opportunities: [
        'Core Web Vitals optimizasyonu',
        'AI destekli içerik stratejisi',
        'Sesli arama optimizasyonu'
      ],
      threats: [
        'Yavaş siteler geride kalabilir',
        'AI içerik kalitesi riski',
                'Rekabet artışı'
      ],
      recommendations: [
        'Performans optimizasyonuna odaklanın',
        'AI araçlarını stratejik kullanın',
        'Kullanıcı deneyimini iyileştirin'
      ]
    };

    const predictions = {
      shortTerm: [
        'Core Web Vitals daha kritik olacak',
        'AI içerik araçları yaygınlaşacak'
      ],
      mediumTerm: [
        'Sesli arama optimizasyonu gerekli olacak',
        'Yerel SEO daha önemli hale gelecek'
      ],
      longTerm: [
        'AI destekli SEO otomasyonu',
        'Kişiselleştirilmiş arama deneyimi'
      ]
    };

    const actionItems = {
      immediate: [
        'Core Web Vitals metriklerini optimize edin',
        'AI içerik araçlarını değerlendirin'
      ],
      shortTerm: [
        'Sesli arama stratejisi geliştirin',
        'Yerel SEO optimizasyonu yapın'
      ],
      longTerm: [
        'AI destekli SEO sistemi kurun',
        'Kişiselleştirme stratejisi geliştirin'
      ]
    };

    const report: SEOTrendReport = {
      id: `report-${Date.now()}`,
      timestamp: new Date(),
      period,
      summary,
      trends: analyzedTrends,
      insights,
      predictions,
      actionItems
    };

    return report;
  }

  // Trend ekle
  addTrend(trend: Omit<SEOTrend, 'id'>): SEOTrend {
    const newTrend: SEOTrend = {
      ...trend,
      id: `trend-${Date.now()}`
    };

    this.trends.push(newTrend);
    this.notifyObservers({ type: 'trend-added', data: newTrend });
    return newTrend;
  }

  // Trend güncelle
  updateTrend(trendId: string, updates: Partial<SEOTrend>): boolean {
    const trendIndex = this.trends.findIndex(t => t.id === trendId);
    if (trendIndex !== -1) {
      this.trends[trendIndex] = { ...this.trends[trendIndex], ...updates };
      this.notifyObservers({ type: 'trend-updated', data: this.trends[trendIndex] });
      return true;
    }
    return false;
  }

  // Alert'leri oku
  markAlertAsRead(alertId: string): boolean {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.read = true;
      this.notifyObservers({ type: 'alert-read', data: alert });
      return true;
    }
    return false;
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
  getTrends(): SEOTrend[] {
    return [...this.trends];
  }

  getAlerts(): TrendAlert[] {
    return [...this.alerts];
  }

  getPredictions(): TrendPrediction[] {
    return [...this.predictions];
  }

  getTrendById(id: string): SEOTrend | undefined {
    return this.trends.find(t => t.id === id);
  }
}

// React Hook
export function useSEOTrendAnalyzer() {
  const [trends, setTrends] = useState<SEOTrend[]>([]);
  const [alerts, setAlerts] = useState<TrendAlert[]>([]);
  const [predictions, setPredictions] = useState<TrendPrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzer = SEOTrendAnalyzer.getInstance();

  useEffect(() => {
    const observer = (data: any) => {
      if (data.type.includes('trend')) {
        setTrends(analyzer.getTrends());
      } else if (data.type.includes('alert')) {
        setAlerts(analyzer.getAlerts());
      }
    };

    analyzer.addObserver(observer);
    setTrends(analyzer.getTrends());
    setAlerts(analyzer.getAlerts());
    setPredictions(analyzer.getPredictions());

    return () => {
      analyzer.removeObserver(observer);
    };
  }, [analyzer]);

  const analyzeTrends = async (period: { start: Date; end: Date }) => {
    setIsLoading(true);
    setError(null);

    try {
      const analyzedTrends = await analyzer.analyzeTrends(period);
      return analyzedTrends;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Trend analizi hatası');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const generatePredictions = async (trendId: string) => {
    return await analyzer.generatePredictions(trendId);
  };

  const compareTrends = (trend1Id: string, trend2Id: string) => {
    return analyzer.compareTrends(trend1Id, trend2Id);
  };

  const generateTrendReport = async (period: { start: Date; end: Date }) => {
    return await analyzer.generateTrendReport(period);
  };

  const markAlertAsRead = (alertId: string) => {
    return analyzer.markAlertAsRead(alertId);
  };

  return {
    trends,
    alerts,
    predictions,
    isLoading,
    error,
    analyzeTrends,
    generatePredictions,
    compareTrends,
    generateTrendReport,
    markAlertAsRead,
    getTrendById: analyzer.getTrendById.bind(analyzer)
  };
}

export default SEOTrendAnalyzer; 