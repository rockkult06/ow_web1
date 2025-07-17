// Gelişmiş Performans İzleme ve Alert Sistemi
export interface PerformanceMetric {
  id: string;
  url: string;
  timestamp: Date;
  loadTime: number; // milliseconds
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  totalBlockingTime: number;
  speedIndex: number;
  timeToInteractive: number;
  domContentLoaded: number;
  windowLoad: number;
  resourceCount: number;
  totalSize: number; // bytes
  score: number; // 0-100
  device: 'desktop' | 'mobile';
  location: string;
  userAgent: string;
}

export interface PerformanceAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  metric: string;
  threshold: number;
  currentValue: number;
  url: string;
  timestamp: Date;
  status: 'active' | 'resolved' | 'acknowledged';
  priority: 'high' | 'medium' | 'low';
  recommendations: string[];
}

export interface PerformanceThreshold {
  metric: string;
  warning: number;
  critical: number;
  unit: string;
}

export interface PerformanceReport {
  url: string;
  date: Date;
  metrics: PerformanceMetric[];
  alerts: PerformanceAlert[];
  summary: PerformanceSummary;
  trends: PerformanceTrend[];
  recommendations: PerformanceRecommendation[];
}

export interface PerformanceSummary {
  averageLoadTime: number;
  averageScore: number;
  alertCount: number;
  criticalAlerts: number;
  warningAlerts: number;
  improvement: number; // % improvement
  status: 'excellent' | 'good' | 'needs_improvement' | 'poor';
}

export interface PerformanceTrend {
  date: Date;
  loadTime: number;
  score: number;
  alertCount: number;
}

export interface PerformanceRecommendation {
  type: 'optimization' | 'monitoring' | 'alert';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  effort: string;
  implementation: string[];
}

export interface MonitoringConfig {
  urls: string[];
  checkInterval: number; // minutes
  thresholds: PerformanceThreshold[];
  alertChannels: AlertChannel[];
  autoResolve: boolean;
  retentionDays: number;
}

export interface AlertChannel {
  type: 'email' | 'slack' | 'webhook' | 'sms';
  config: any;
  enabled: boolean;
}

export class PerformanceMonitor {
  private config: MonitoringConfig;
  private metrics: PerformanceMetric[] = [];
  private alerts: PerformanceAlert[] = [];
  private thresholds: PerformanceThreshold[] = [];

  constructor(config: Partial<MonitoringConfig> = {}) {
    this.config = {
      urls: [
        'https://optimizeworld.net',
        'https://optimizeworld.net/solutions/smart-city',
        'https://optimizeworld.net/solutions/transport',
        'https://optimizeworld.net/about',
        'https://optimizeworld.net/contact'
      ],
      checkInterval: 60, // 1 saat
      thresholds: [
        { metric: 'loadTime', warning: 3000, critical: 5000, unit: 'ms' },
        { metric: 'firstContentfulPaint', warning: 1800, critical: 3000, unit: 'ms' },
        { metric: 'largestContentfulPaint', warning: 2500, critical: 4000, unit: 'ms' },
        { metric: 'firstInputDelay', warning: 100, critical: 300, unit: 'ms' },
        { metric: 'cumulativeLayoutShift', warning: 0.1, critical: 0.25, unit: '' },
        { metric: 'score', warning: 80, critical: 60, unit: '' }
      ],
      alertChannels: [],
      autoResolve: true,
      retentionDays: 30,
      ...config
    };

    this.thresholds = this.config.thresholds;
  }

  // Performans Metriği Ekleme
  addMetric(metric: Omit<PerformanceMetric, 'id'>): string {
    const id = `metric_${Date.now()}`;
    const newMetric: PerformanceMetric = {
      ...metric,
      id
    };

    this.metrics.push(newMetric);
    this.checkAlerts(newMetric);
    this.cleanupOldData();

    return id;
  }

  // Alert Kontrolü
  private checkAlerts(metric: PerformanceMetric): void {
    this.thresholds.forEach(threshold => {
      const value = (metric as any)[threshold.metric];
      if (value === undefined) return;

      let alertType: 'critical' | 'warning' | 'info' | null = null;
      let priority: 'high' | 'medium' | 'low' = 'medium';

      if (value >= threshold.critical) {
        alertType = 'critical';
        priority = 'high';
      } else if (value >= threshold.warning) {
        alertType = 'warning';
        priority = 'medium';
      }

      if (alertType) {
        const alert: PerformanceAlert = {
          id: `alert_${Date.now()}`,
          type: alertType,
          title: `${threshold.metric} ${alertType} seviyesinde`,
          description: `${metric.url} için ${threshold.metric} değeri ${value}${threshold.unit} olarak ölçüldü. Eşik değeri: ${threshold.critical}${threshold.unit}`,
          metric: threshold.metric,
          threshold: threshold.critical,
          currentValue: value,
          url: metric.url,
          timestamp: new Date(),
          status: 'active',
          priority,
          recommendations: this.generateRecommendations(threshold.metric, value)
        };

        this.alerts.push(alert);
        this.sendAlert(alert);
      }
    });
  }

  // Öneriler Oluşturma
  private generateRecommendations(metric: string, value: number): string[] {
    const recommendations: string[] = [];

    switch (metric) {
      case 'loadTime':
        if (value > 5000) {
          recommendations.push('Sayfa yükleme süresini azaltmak için görsel optimizasyonu yapın');
          recommendations.push('CDN kullanarak statik dosyaları hızlandırın');
          recommendations.push('Gereksiz JavaScript ve CSS dosyalarını kaldırın');
        } else if (value > 3000) {
          recommendations.push('Sayfa yükleme süresini iyileştirmek için performans optimizasyonu yapın');
        }
        break;

      case 'firstContentfulPaint':
        if (value > 3000) {
          recommendations.push('İlk içerik gösterimi için kritik CSS\'i inline yapın');
          recommendations.push('Görsel optimizasyonu ve lazy loading uygulayın');
          recommendations.push('Sunucu yanıt süresini iyileştirin');
        }
        break;

      case 'largestContentfulPaint':
        if (value > 4000) {
          recommendations.push('En büyük içerik öğesini optimize edin');
          recommendations.push('Görsel boyutlarını küçültün ve WebP formatı kullanın');
          recommendations.push('Font yükleme stratejisini iyileştirin');
        }
        break;

      case 'firstInputDelay':
        if (value > 300) {
          recommendations.push('JavaScript yürütme süresini azaltın');
          recommendations.push('Uzun görevleri bölün ve async/await kullanın');
          recommendations.push('Gereksiz JavaScript kodunu kaldırın');
        }
        break;

      case 'cumulativeLayoutShift':
        if (value > 0.25) {
          recommendations.push('Görsel boyutlarını önceden belirleyin');
          recommendations.push('Reklam alanlarını rezerve edin');
          recommendations.push('Font yükleme stratejisini iyileştirin');
        }
        break;

      case 'score':
        if (value < 60) {
          recommendations.push('Core Web Vitals metriklerini iyileştirin');
          recommendations.push('Sayfa hızını artırın');
          recommendations.push('Kullanıcı deneyimini geliştirin');
        }
        break;
    }

    return recommendations;
  }

  // Alert Gönderme
  private sendAlert(alert: PerformanceAlert): void {
    this.config.alertChannels.forEach(channel => {
      if (channel.enabled) {
        switch (channel.type) {
          case 'email':
            this.sendEmailAlert(alert, channel.config);
            break;
          case 'slack':
            this.sendSlackAlert(alert, channel.config);
            break;
          case 'webhook':
            this.sendWebhookAlert(alert, channel.config);
            break;
        }
      }
    });
  }

  // Email Alert
  private sendEmailAlert(alert: PerformanceAlert, config: any): void {
    // Email gönderme simülasyonu
    console.log(`Email Alert: ${alert.title} - ${alert.description}`);
  }

  // Slack Alert
  private sendSlackAlert(alert: PerformanceAlert, config: any): void {
    // Slack gönderme simülasyonu
    console.log(`Slack Alert: ${alert.title} - ${alert.description}`);
  }

  // Webhook Alert
  private sendWebhookAlert(alert: PerformanceAlert, config: any): void {
    // Webhook gönderme simülasyonu
    console.log(`Webhook Alert: ${alert.title} - ${alert.description}`);
  }

  // Performans Raporu Oluşturma
  generateReport(url: string, days: number = 7): PerformanceReport {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);

    const urlMetrics = this.metrics.filter(m => 
      m.url === url && m.timestamp >= startDate && m.timestamp <= endDate
    );

    const urlAlerts = this.alerts.filter(a => 
      a.url === url && a.timestamp >= startDate && a.timestamp <= endDate
    );

    const summary = this.calculateSummary(urlMetrics, urlAlerts);
    const trends = this.calculateTrends(urlMetrics, days);
    const recommendations = this.generateReportRecommendations(summary, urlAlerts);

    return {
      url,
      date: endDate,
      metrics: urlMetrics,
      alerts: urlAlerts,
      summary,
      trends,
      recommendations
    };
  }

  // Özet Hesaplama
  private calculateSummary(metrics: PerformanceMetric[], alerts: PerformanceAlert[]): PerformanceSummary {
    if (metrics.length === 0) {
      return {
        averageLoadTime: 0,
        averageScore: 0,
        alertCount: alerts.length,
        criticalAlerts: alerts.filter(a => a.type === 'critical').length,
        warningAlerts: alerts.filter(a => a.type === 'warning').length,
        improvement: 0,
        status: 'poor'
      };
    }

    const averageLoadTime = metrics.reduce((sum, m) => sum + m.loadTime, 0) / metrics.length;
    const averageScore = metrics.reduce((sum, m) => sum + m.score, 0) / metrics.length;
    const alertCount = alerts.length;
    const criticalAlerts = alerts.filter(a => a.type === 'critical').length;
    const warningAlerts = alerts.filter(a => a.type === 'warning').length;

    // İyileştirme hesaplama (son 7 gün vs önceki 7 gün)
    const recentMetrics = metrics.slice(-Math.floor(metrics.length / 2));
    const olderMetrics = metrics.slice(0, Math.floor(metrics.length / 2));
    
    const recentAvg = recentMetrics.reduce((sum, m) => sum + m.score, 0) / recentMetrics.length;
    const olderAvg = olderMetrics.reduce((sum, m) => sum + m.score, 0) / olderMetrics.length;
    const improvement = olderAvg > 0 ? ((recentAvg - olderAvg) / olderAvg) * 100 : 0;

    // Durum belirleme
    let status: PerformanceSummary['status'];
    if (averageScore >= 90) status = 'excellent';
    else if (averageScore >= 80) status = 'good';
    else if (averageScore >= 60) status = 'needs_improvement';
    else status = 'poor';

    return {
      averageLoadTime,
      averageScore,
      alertCount,
      criticalAlerts,
      warningAlerts,
      improvement,
      status
    };
  }

  // Trend Hesaplama
  private calculateTrends(metrics: PerformanceMetric[], days: number): PerformanceTrend[] {
    const trends: PerformanceTrend[] = [];
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);

    for (let i = 0; i < days; i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

      const dayMetrics = metrics.filter(m => m.timestamp >= dayStart && m.timestamp < dayEnd);
      
      if (dayMetrics.length > 0) {
        const avgLoadTime = dayMetrics.reduce((sum, m) => sum + m.loadTime, 0) / dayMetrics.length;
        const avgScore = dayMetrics.reduce((sum, m) => sum + m.score, 0) / dayMetrics.length;
        const alertCount = this.alerts.filter(a => 
          a.url === dayMetrics[0].url && 
          a.timestamp >= dayStart && 
          a.timestamp < dayEnd
        ).length;

        trends.push({
          date,
          loadTime: avgLoadTime,
          score: avgScore,
          alertCount
        });
      }
    }

    return trends;
  }

  // Rapor Önerileri
  private generateReportRecommendations(summary: PerformanceSummary, alerts: PerformanceAlert[]): PerformanceRecommendation[] {
    const recommendations: PerformanceRecommendation[] = [];

    // Skor tabanlı öneriler
    if (summary.averageScore < 60) {
      recommendations.push({
        type: 'optimization',
        priority: 'high',
        title: 'Kritik Performans İyileştirmesi',
        description: 'Sayfa skoru çok düşük. Acil optimizasyon gerekli.',
        impact: 'Yüksek - Kullanıcı deneyimi ve SEO skorunu artırır',
        effort: 'Yüksek - 2-4 hafta',
        implementation: [
          'Core Web Vitals optimizasyonu',
          'Görsel ve script optimizasyonu',
          'CDN implementasyonu',
          'Sunucu yanıt süresi iyileştirmesi'
        ]
      });
    } else if (summary.averageScore < 80) {
      recommendations.push({
        type: 'optimization',
        priority: 'medium',
        title: 'Performans İyileştirmesi',
        description: 'Sayfa skoru iyileştirilebilir.',
        impact: 'Orta - Kullanıcı deneyimini artırır',
        effort: 'Orta - 1-2 hafta',
        implementation: [
          'Görsel optimizasyonu',
          'JavaScript optimizasyonu',
          'CSS optimizasyonu'
        ]
      });
    }

    // Alert tabanlı öneriler
    const criticalAlerts = alerts.filter(a => a.type === 'critical');
    if (criticalAlerts.length > 0) {
      recommendations.push({
        type: 'monitoring',
        priority: 'high',
        title: 'Kritik Alert Yönetimi',
        description: `${criticalAlerts.length} adet kritik alert mevcut.`,
        impact: 'Yüksek - Sistem stabilitesini sağlar',
        effort: 'Düşük - 1-2 gün',
        implementation: [
          'Alert kurallarını gözden geçirin',
          'Performans eşiklerini ayarlayın',
          'Otomatik çözüm süreçleri oluşturun'
        ]
      });
    }

    // İyileştirme tabanlı öneriler
    if (summary.improvement < 0) {
      recommendations.push({
        type: 'optimization',
        priority: 'medium',
        title: 'Performans Gerilemesi',
        description: 'Son dönemde performans geriledi.',
        impact: 'Orta - Kullanıcı deneyimini korur',
        effort: 'Orta - 1 hafta',
        implementation: [
          'Son değişiklikleri gözden geçirin',
          'Performans testleri yapın',
          'Optimizasyon süreçlerini iyileştirin'
        ]
      });
    }

    return recommendations;
  }

  // Eski Veri Temizleme
  private cleanupOldData(): void {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - this.config.retentionDays);

    this.metrics = this.metrics.filter(m => m.timestamp >= cutoffDate);
    this.alerts = this.alerts.filter(a => a.timestamp >= cutoffDate);
  }

  // Alert Yönetimi
  resolveAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = 'resolved';
    }
  }

  acknowledgeAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = 'acknowledged';
    }
  }

  // Threshold Yönetimi
  updateThreshold(metric: string, warning: number, critical: number): void {
    const threshold = this.thresholds.find(t => t.metric === metric);
    if (threshold) {
      threshold.warning = warning;
      threshold.critical = critical;
    } else {
      this.thresholds.push({
        metric,
        warning,
        critical,
        unit: this.getUnitForMetric(metric)
      });
    }
  }

  private getUnitForMetric(metric: string): string {
    switch (metric) {
      case 'loadTime':
      case 'firstContentfulPaint':
      case 'largestContentfulPaint':
      case 'firstInputDelay':
      case 'timeToInteractive':
      case 'domContentLoaded':
      case 'windowLoad':
        return 'ms';
      case 'cumulativeLayoutShift':
      case 'score':
        return '';
      case 'totalSize':
        return 'bytes';
      default:
        return '';
    }
  }

  // Public Methods
  getMetrics(): PerformanceMetric[] {
    return this.metrics;
  }

  getAlerts(): PerformanceAlert[] {
    return this.alerts;
  }

  getConfig(): MonitoringConfig {
    return this.config;
  }

  getThresholds(): PerformanceThreshold[] {
    return this.thresholds;
  }

  updateConfig(updates: Partial<MonitoringConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  // Simüle Edilmiş Performans Metriği
  simulateMetric(url: string): PerformanceMetric {
    const baseLoadTime = 1500 + Math.random() * 2000;
    const baseScore = 70 + Math.random() * 25;

    return {
      id: `metric_${Date.now()}`,
      url,
      timestamp: new Date(),
      loadTime: baseLoadTime,
      firstContentfulPaint: baseLoadTime * 0.6,
      largestContentfulPaint: baseLoadTime * 0.8,
      firstInputDelay: 50 + Math.random() * 200,
      cumulativeLayoutShift: Math.random() * 0.2,
      totalBlockingTime: 100 + Math.random() * 300,
      speedIndex: baseLoadTime * 0.7,
      timeToInteractive: baseLoadTime * 1.2,
      domContentLoaded: baseLoadTime * 0.5,
      windowLoad: baseLoadTime * 1.1,
      resourceCount: 20 + Math.floor(Math.random() * 30),
      totalSize: 500000 + Math.random() * 1000000,
      score: baseScore,
      device: Math.random() > 0.5 ? 'desktop' : 'mobile',
      location: 'Istanbul, TR',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    };
  }
}

// Performance Monitor Hook
export const usePerformanceMonitor = () => {
  const monitor = new PerformanceMonitor();

  const addMetric = (metric: Omit<PerformanceMetric, 'id'>) => {
    return monitor.addMetric(metric);
  };

  const generateReport = (url: string, days?: number) => {
    return monitor.generateReport(url, days);
  };

  const resolveAlert = (alertId: string) => {
    return monitor.resolveAlert(alertId);
  };

  const acknowledgeAlert = (alertId: string) => {
    return monitor.acknowledgeAlert(alertId);
  };

  const updateThreshold = (metric: string, warning: number, critical: number) => {
    return monitor.updateThreshold(metric, warning, critical);
  };

  const simulateMetric = (url: string) => {
    return monitor.simulateMetric(url);
  };

  const getMetrics = () => {
    return monitor.getMetrics();
  };

  const getAlerts = () => {
    return monitor.getAlerts();
  };

  const getConfig = () => {
    return monitor.getConfig();
  };

  return {
    addMetric,
    generateReport,
    resolveAlert,
    acknowledgeAlert,
    updateThreshold,
    simulateMetric,
    getMetrics,
    getAlerts,
    getConfig
  };
}; 