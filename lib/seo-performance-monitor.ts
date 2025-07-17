// Gelişmiş SEO Performans İzleme ve Alert Sistemi
export interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  threshold: {
    warning: number;
    critical: number;
  };
  trend: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  lastUpdated: Date;
  history: PerformanceDataPoint[];
}

export interface PerformanceDataPoint {
  timestamp: Date;
  value: number;
  change: number;
}

export interface SEOAlert {
  id: string;
  type: 'performance' | 'technical' | 'content' | 'security' | 'traffic';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  metric: string;
  currentValue: number;
  threshold: number;
  timestamp: Date;
  status: 'active' | 'resolved' | 'acknowledged';
  actions: AlertAction[];
}

export interface AlertAction {
  id: string;
  name: string;
  description: string;
  type: 'automatic' | 'manual';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
}

export interface PerformanceThreshold {
  metric: string;
  warning: number;
  critical: number;
  direction: 'above' | 'below';
}

export interface MonitoringConfig {
  checkInterval: number; // dakika
  alertChannels: AlertChannel[];
  thresholds: PerformanceThreshold[];
  autoResolve: boolean;
  escalationRules: EscalationRule[];
}

export interface AlertChannel {
  type: 'email' | 'slack' | 'webhook' | 'sms';
  config: any;
  enabled: boolean;
}

export interface EscalationRule {
  condition: string;
  action: string;
  delay: number; // dakika
  recipients: string[];
}

export interface PerformanceReport {
  period: string;
  generatedAt: Date;
  summary: PerformanceSummary;
  metrics: PerformanceMetric[];
  alerts: SEOAlert[];
  recommendations: PerformanceRecommendation[];
  trends: PerformanceTrend[];
}

export interface PerformanceSummary {
  overallScore: number;
  totalAlerts: number;
  criticalAlerts: number;
  resolvedAlerts: number;
  uptime: number;
  averageResponseTime: number;
  availability: number;
}

export interface PerformanceRecommendation {
  priority: 'high' | 'medium' | 'low';
  category: string;
  title: string;
  description: string;
  impact: string;
  effort: string;
  estimatedImprovement: number;
}

export interface PerformanceTrend {
  metric: string;
  period: string;
  data: PerformanceDataPoint[];
  analysis: string;
  prediction: number;
}

export class SEOPerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private alerts: SEOAlert[] = [];
  private config: MonitoringConfig;
  private isMonitoring: boolean = false;
  private monitoringInterval: NodeJS.Timeout | null = null;

  constructor(config: MonitoringConfig) {
    this.config = config;
    this.initializeMetrics();
  }

  private initializeMetrics(): void {
    this.metrics = [
      {
        id: 'page_speed',
        name: 'Sayfa Hızı',
        value: 89,
        unit: 'puan',
        threshold: { warning: 80, critical: 60 },
        trend: 2.1,
        status: 'good',
        lastUpdated: new Date(),
        history: []
      },
      {
        id: 'organic_traffic',
        name: 'Organik Trafik',
        value: 15420,
        unit: 'ziyaretçi',
        threshold: { warning: 12000, critical: 8000 },
        trend: 8.6,
        status: 'excellent',
        lastUpdated: new Date(),
        history: []
      },
      {
        id: 'conversion_rate',
        name: 'Dönüşüm Oranı',
        value: 2.2,
        unit: '%',
        threshold: { warning: 1.5, critical: 1.0 },
        trend: 14.8,
        status: 'excellent',
        lastUpdated: new Date(),
        history: []
      },
      {
        id: 'bounce_rate',
        name: 'Hemen Çıkma Oranı',
        value: 42.3,
        unit: '%',
        threshold: { warning: 50, critical: 70 },
        trend: -6.2,
        status: 'good',
        lastUpdated: new Date(),
        history: []
      },
      {
        id: 'avg_position',
        name: 'Ortalama Pozisyon',
        value: 12.4,
        unit: 'pozisyon',
        threshold: { warning: 20, critical: 30 },
        trend: -18.4,
        status: 'excellent',
        lastUpdated: new Date(),
        history: []
      },
      {
        id: 'core_web_vitals',
        name: 'Core Web Vitals',
        value: 85,
        unit: 'puan',
        threshold: { warning: 70, critical: 50 },
        trend: 5.2,
        status: 'good',
        lastUpdated: new Date(),
        history: []
      },
      {
        id: 'mobile_score',
        name: 'Mobil Skor',
        value: 94,
        unit: 'puan',
        threshold: { warning: 80, critical: 60 },
        trend: 1.8,
        status: 'excellent',
        lastUpdated: new Date(),
        history: []
      },
      {
        id: 'accessibility_score',
        name: 'Erişilebilirlik',
        value: 82,
        unit: 'puan',
        threshold: { warning: 70, critical: 50 },
        trend: 3.1,
        status: 'good',
        lastUpdated: new Date(),
        history: []
      }
    ];
  }

  // Performans İzleme Başlatma
  startMonitoring(): void {
    if (this.isMonitoring) {
      console.log('Performans izleme zaten aktif');
      return;
    }

    this.isMonitoring = true;
    this.monitoringInterval = setInterval(() => {
      this.checkPerformance();
    }, this.config.checkInterval * 60 * 1000);

    console.log('SEO performans izleme başlatıldı');
  }

  // Performans İzleme Durdurma
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    this.isMonitoring = false;
    console.log('SEO performans izleme durduruldu');
  }

  // Performans Kontrolü
  private checkPerformance(): void {
    console.log('Performans kontrolü yapılıyor...');
    
    this.metrics.forEach(metric => {
      this.updateMetric(metric);
      this.checkThresholds(metric);
    });

    this.cleanupOldAlerts();
    this.generatePerformanceReport();
  }

  // Metrik Güncelleme
  private updateMetric(metric: PerformanceMetric): void {
    // Simüle edilmiş metrik güncelleme
    const change = (Math.random() - 0.5) * 10;
    const newValue = Math.max(0, metric.value + change);
    
    metric.history.push({
      timestamp: new Date(),
      value: metric.value,
      change: change
    });

    // Son 30 veri noktasını tut
    if (metric.history.length > 30) {
      metric.history = metric.history.slice(-30);
    }

    metric.value = newValue;
    metric.trend = change;
    metric.lastUpdated = new Date();

    // Trend hesaplama
    if (metric.history.length >= 2) {
      const recent = metric.history.slice(-5);
      const previous = metric.history.slice(-10, -5);
      const recentAvg = recent.reduce((sum, point) => sum + point.value, 0) / recent.length;
      const previousAvg = previous.reduce((sum, point) => sum + point.value, 0) / previous.length;
      metric.trend = ((recentAvg - previousAvg) / previousAvg) * 100;
    }

    // Durum güncelleme
    metric.status = this.calculateStatus(metric);
  }

  // Durum Hesaplama
  private calculateStatus(metric: PerformanceMetric): 'excellent' | 'good' | 'warning' | 'critical' {
    const { value, threshold } = metric;
    
    if (value >= threshold.critical) {
      return 'critical';
    } else if (value >= threshold.warning) {
      return 'warning';
    } else if (value >= threshold.warning * 0.8) {
      return 'good';
    } else {
      return 'excellent';
    }
  }

  // Eşik Kontrolü
  private checkThresholds(metric: PerformanceMetric): void {
    const { value, threshold } = metric;
    
    if (value <= threshold.critical) {
      this.createAlert(metric, 'critical', 'Kritik seviyeye düştü');
    } else if (value <= threshold.warning) {
      this.createAlert(metric, 'high', 'Uyarı seviyesine düştü');
    }
  }

  // Alert Oluşturma
  private createAlert(metric: PerformanceMetric, severity: 'low' | 'medium' | 'high' | 'critical', message: string): void {
    const alert: SEOAlert = {
      id: `alert_${Date.now()}_${Math.random()}`,
      type: 'performance',
      severity,
      title: `${metric.name} - ${message}`,
      description: `${metric.name} metrik değeri ${metric.value} ${metric.unit} seviyesine düştü. Bu durum SEO performansını olumsuz etkileyebilir.`,
      metric: metric.id,
      currentValue: metric.value,
      threshold: severity === 'critical' ? metric.threshold.critical : metric.threshold.warning,
      timestamp: new Date(),
      status: 'active',
      actions: [
        {
          id: `action_${Date.now()}`,
          name: 'Performans Analizi',
          description: 'Detaylı performans analizi yapılacak',
          type: 'automatic',
          status: 'pending'
        }
      ]
    };

    this.alerts.push(alert);
    this.sendAlert(alert);
  }

  // Alert Gönderme
  private sendAlert(alert: SEOAlert): void {
    console.log(`Alert gönderiliyor: ${alert.title}`);
    
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
          case 'sms':
            this.sendSMSAlert(alert, channel.config);
            break;
        }
      }
    });
  }

  // E-posta Alert Gönderme
  private sendEmailAlert(alert: SEOAlert, config: any): void {
    console.log(`E-posta alert gönderiliyor: ${alert.title}`);
    // E-posta gönderme simülasyonu
  }

  // Slack Alert Gönderme
  private sendSlackAlert(alert: SEOAlert, config: any): void {
    console.log(`Slack alert gönderiliyor: ${alert.title}`);
    // Slack webhook simülasyonu
  }

  // Webhook Alert Gönderme
  private sendWebhookAlert(alert: SEOAlert, config: any): void {
    console.log(`Webhook alert gönderiliyor: ${alert.title}`);
    // Webhook simülasyonu
  }

  // SMS Alert Gönderme
  private sendSMSAlert(alert: SEOAlert, config: any): void {
    console.log(`SMS alert gönderiliyor: ${alert.title}`);
    // SMS simülasyonu
  }

  // Eski Alert Temizleme
  private cleanupOldAlerts(): void {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    this.alerts = this.alerts.filter(alert => 
      alert.timestamp > thirtyDaysAgo || alert.status === 'active'
    );
  }

  // Performans Raporu Oluşturma
  private generatePerformanceReport(): PerformanceReport {
    const activeAlerts = this.alerts.filter(alert => alert.status === 'active');
    const criticalAlerts = activeAlerts.filter(alert => alert.severity === 'critical');
    const resolvedAlerts = this.alerts.filter(alert => alert.status === 'resolved');

    const summary: PerformanceSummary = {
      overallScore: this.calculateOverallScore(),
      totalAlerts: activeAlerts.length,
      criticalAlerts: criticalAlerts.length,
      resolvedAlerts: resolvedAlerts.length,
      uptime: 99.8,
      averageResponseTime: 245,
      availability: 99.9
    };

    const recommendations: PerformanceRecommendation[] = this.generateRecommendations();
    const trends: PerformanceTrend[] = this.generateTrends();

    return {
      period: 'Son 30 gün',
      generatedAt: new Date(),
      summary,
      metrics: this.metrics,
      alerts: activeAlerts,
      recommendations,
      trends
    };
  }

  // Genel Skor Hesaplama
  private calculateOverallScore(): number {
    const scores = this.metrics.map(metric => {
      switch (metric.status) {
        case 'excellent': return 100;
        case 'good': return 80;
        case 'warning': return 60;
        case 'critical': return 30;
        default: return 50;
      }
    });

    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  }

  // Öneriler Oluşturma
  private generateRecommendations(): PerformanceRecommendation[] {
    const recommendations: PerformanceRecommendation[] = [];

    // Kritik alert varsa yüksek öncelikli öneri
    const criticalAlerts = this.alerts.filter(alert => 
      alert.severity === 'critical' && alert.status === 'active'
    );

    if (criticalAlerts.length > 0) {
      recommendations.push({
        priority: 'high',
        category: 'performance',
        title: 'Kritik Performans Sorunları',
        description: `${criticalAlerts.length} kritik performans sorunu tespit edildi. Acil müdahale gerekiyor.`,
        impact: 'Yüksek - SEO sıralamasını olumsuz etkiler',
        effort: 'Acil - 1-2 gün',
        estimatedImprovement: 25
      });
    }

    // Düşük performanslı metrikler için öneriler
    const lowPerformingMetrics = this.metrics.filter(metric => 
      metric.status === 'warning' || metric.status === 'critical'
    );

    lowPerformingMetrics.forEach(metric => {
      recommendations.push({
        priority: metric.status === 'critical' ? 'high' : 'medium',
        category: 'optimization',
        title: `${metric.name} Optimizasyonu`,
        description: `${metric.name} metrik değeri ${metric.value} ${metric.unit} seviyesinde. İyileştirme gerekli.`,
        impact: 'Orta - Performansı artırır',
        effort: 'Orta - 1-2 hafta',
        estimatedImprovement: 15
      });
    });

    return recommendations;
  }

  // Trend Analizi
  private generateTrends(): PerformanceTrend[] {
    return this.metrics.map(metric => {
      const recentData = metric.history.slice(-10);
      const analysis = this.analyzeTrend(recentData);
      const prediction = this.predictNextValue(recentData);

      return {
        metric: metric.id,
        period: 'Son 10 gün',
        data: recentData,
        analysis,
        prediction
      };
    });
  }

  // Trend Analizi
  private analyzeTrend(data: PerformanceDataPoint[]): string {
    if (data.length < 2) return 'Yetersiz veri';

    const changes = data.slice(1).map((point, index) => 
      point.value - data[index].value
    );

    const avgChange = changes.reduce((sum, change) => sum + change, 0) / changes.length;

    if (avgChange > 0) {
      return 'Pozitif trend - Performans iyileşiyor';
    } else if (avgChange < 0) {
      return 'Negatif trend - Performans düşüyor';
    } else {
      return 'Stabil trend - Performans sabit';
    }
  }

  // Gelecek Değer Tahmini
  private predictNextValue(data: PerformanceDataPoint[]): number {
    if (data.length < 3) return data[data.length - 1]?.value || 0;

    const recentValues = data.slice(-3).map(point => point.value);
    const avgChange = (recentValues[2] - recentValues[0]) / 2;
    
    return Math.max(0, recentValues[2] + avgChange);
  }

  // Public API Methods
  getMetrics(): PerformanceMetric[] {
    return this.metrics;
  }

  getAlerts(): SEOAlert[] {
    return this.alerts;
  }

  getActiveAlerts(): SEOAlert[] {
    return this.alerts.filter(alert => alert.status === 'active');
  }

  acknowledgeAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = 'acknowledged';
    }
  }

  resolveAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = 'resolved';
    }
  }

  updateConfig(newConfig: Partial<MonitoringConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  getConfig(): MonitoringConfig {
    return this.config;
  }

  isMonitoringActive(): boolean {
    return this.isMonitoring;
  }

  getPerformanceReport(): PerformanceReport {
    return this.generatePerformanceReport();
  }
}

// SEO Performance Monitor Hook
export const useSEOPerformanceMonitor = (config?: MonitoringConfig) => {
  const defaultConfig: MonitoringConfig = {
    checkInterval: 5, // 5 dakika
    alertChannels: [
      {
        type: 'email',
        config: { recipients: ['admin@optimizeworld.net'] },
        enabled: true
      },
      {
        type: 'slack',
        config: { webhook: 'https://hooks.slack.com/services/...' },
        enabled: false
      }
    ],
    thresholds: [
      { metric: 'page_speed', warning: 80, critical: 60, direction: 'below' },
      { metric: 'organic_traffic', warning: 12000, critical: 8000, direction: 'below' },
      { metric: 'conversion_rate', warning: 1.5, critical: 1.0, direction: 'below' }
    ],
    autoResolve: true,
    escalationRules: [
      {
        condition: 'critical_alerts > 3',
        action: 'notify_management',
        delay: 30,
        recipients: ['ceo@optimizeworld.net']
      }
    ]
  };

  const monitor = new SEOPerformanceMonitor(config || defaultConfig);

  return {
    monitor,
    startMonitoring: () => monitor.startMonitoring(),
    stopMonitoring: () => monitor.stopMonitoring(),
    getMetrics: () => monitor.getMetrics(),
    getAlerts: () => monitor.getAlerts(),
    getActiveAlerts: () => monitor.getActiveAlerts(),
    acknowledgeAlert: (alertId: string) => monitor.acknowledgeAlert(alertId),
    resolveAlert: (alertId: string) => monitor.resolveAlert(alertId),
    updateConfig: (newConfig: Partial<MonitoringConfig>) => monitor.updateConfig(newConfig),
    getConfig: () => monitor.getConfig(),
    isMonitoringActive: () => monitor.isMonitoringActive(),
    getPerformanceReport: () => monitor.getPerformanceReport()
  };
}; 