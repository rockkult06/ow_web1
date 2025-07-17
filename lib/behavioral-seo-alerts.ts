// Davranışsal SEO Alert Sistemi
export interface BehavioralAlert {
  id: string;
  type: 'bounce_rate' | 'scroll_depth' | 'session_duration' | 'exit_intent' | 'conversion_drop' | 'mobile_behavior';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  url: string;
  metric: string;
  currentValue: number;
  previousValue: number;
  threshold: number;
  change: number;
  timestamp: Date;
  status: 'active' | 'acknowledged' | 'resolved';
  seoImpact: {
    ranking: number;
    traffic: number;
    conversion: number;
  };
  recommendations: string[];
  actions: AlertAction[];
}

export interface AlertAction {
  id: string;
  name: string;
  description: string;
  type: 'automatic' | 'manual';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  priority: 'high' | 'medium' | 'low';
}

export interface BehavioralThreshold {
  metric: string;
  warning: number;
  critical: number;
  direction: 'above' | 'below';
  seoImpact: 'high' | 'medium' | 'low';
}

export interface AlertConfig {
  enabled: boolean;
  checkInterval: number; // dakika
  thresholds: BehavioralThreshold[];
  notifications: AlertNotification[];
  autoResolve: boolean;
  escalationRules: EscalationRule[];
}

export interface AlertNotification {
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

export interface BehavioralData {
  url: string;
  bounceRate: number;
  avgSessionDuration: number;
  avgScrollDepth: number;
  exitIntentRate: number;
  conversionRate: number;
  mobileUsage: number;
  pageLoadTime: number;
  timestamp: Date;
}

export class BehavioralSEOAlertSystem {
  private alerts: BehavioralAlert[] = [];
  private config: AlertConfig;
  private isMonitoring: boolean = false;
  private monitoringInterval: NodeJS.Timeout | null = null;
  private historicalData: BehavioralData[] = [];

  constructor(config: AlertConfig) {
    this.config = config;
  }

  // Davranış verisi ekle
  addBehavioralData(data: BehavioralData): void {
    this.historicalData.push(data);
    
    // Son 30 günlük veriyi tut
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    this.historicalData = this.historicalData.filter(d => d.timestamp > thirtyDaysAgo);

    // Alert kontrolü yap
    this.checkBehavioralAlerts(data);
  }

  // Davranışsal alert kontrolü
  private checkBehavioralAlerts(currentData: BehavioralData): void {
    const previousData = this.getPreviousData(currentData.url);
    if (!previousData) return;

    // Bounce rate kontrolü
    this.checkBounceRateAlert(currentData, previousData);

    // Scroll depth kontrolü
    this.checkScrollDepthAlert(currentData, previousData);

    // Session duration kontrolü
    this.checkSessionDurationAlert(currentData, previousData);

    // Exit intent kontrolü
    this.checkExitIntentAlert(currentData, previousData);

    // Conversion rate kontrolü
    this.checkConversionRateAlert(currentData, previousData);

    // Mobile behavior kontrolü
    this.checkMobileBehaviorAlert(currentData, previousData);
  }

  // Bounce rate alert kontrolü
  private checkBounceRateAlert(current: BehavioralData, previous: BehavioralData): void {
    const change = ((current.bounceRate - previous.bounceRate) / previous.bounceRate) * 100;
    
    if (current.bounceRate > 70 || change > 20) {
      this.createAlert({
        type: 'bounce_rate',
        severity: current.bounceRate > 80 ? 'critical' : change > 30 ? 'high' : 'medium',
        title: 'Hemen Çıkma Oranı Yüksek',
        description: `Hemen çıkma oranı ${current.bounceRate.toFixed(1)}% seviyesine ulaştı. Bu durum SEO performansını olumsuz etkileyebilir.`,
        url: current.url,
        metric: 'bounce_rate',
        currentValue: current.bounceRate,
        previousValue: previous.bounceRate,
        threshold: 70,
        change,
        seoImpact: {
          ranking: -15,
          traffic: -20,
          conversion: -25
        },
        recommendations: [
          'Sayfa yükleme hızını optimize edin',
          'İlk görünen alanı (above the fold) iyileştirin',
          'İçerik kalitesini artırın',
          'CTA butonlarını daha belirgin yapın',
          'Kullanıcı deneyimini iyileştirin'
        ]
      });
    }
  }

  // Scroll depth alert kontrolü
  private checkScrollDepthAlert(current: BehavioralData, previous: BehavioralData): void {
    const change = ((current.avgScrollDepth - previous.avgScrollDepth) / previous.avgScrollDepth) * 100;
    
    if (current.avgScrollDepth < 30 || change < -25) {
      this.createAlert({
        type: 'scroll_depth',
        severity: current.avgScrollDepth < 20 ? 'high' : change < -40 ? 'medium' : 'low',
        title: 'Scroll Derinliği Düşük',
        description: `Ortalama scroll derinliği ${current.avgScrollDepth.toFixed(1)}% seviyesine düştü. Kullanıcılar içeriği tam olarak görüntülemiyor.`,
        url: current.url,
        metric: 'scroll_depth',
        currentValue: current.avgScrollDepth,
        previousValue: previous.avgScrollDepth,
        threshold: 30,
        change,
        seoImpact: {
          ranking: -8,
          traffic: -12,
          conversion: -15
        },
        recommendations: [
          'İçerik yapısını gözden geçirin',
          'Alt başlıklar ekleyin',
          'Görsel içerikler ekleyin',
          'İçerik bölümlerini kısaltın',
          'İlgi çekici alt başlıklar kullanın'
        ]
      });
    }
  }

  // Session duration alert kontrolü
  private checkSessionDurationAlert(current: BehavioralData, previous: BehavioralData): void {
    const change = ((current.avgSessionDuration - previous.avgSessionDuration) / previous.avgSessionDuration) * 100;
    
    if (current.avgSessionDuration < 30 || change < -30) {
      this.createAlert({
        type: 'session_duration',
        severity: current.avgSessionDuration < 20 ? 'high' : change < -50 ? 'medium' : 'low',
        title: 'Oturum Süresi Kısa',
        description: `Ortalama oturum süresi ${current.avgSessionDuration.toFixed(1)} saniyeye düştü. Kullanıcılar sayfada çok az zaman geçiriyor.`,
        url: current.url,
        metric: 'session_duration',
        currentValue: current.avgSessionDuration,
        previousValue: previous.avgSessionDuration,
        threshold: 30,
        change,
        seoImpact: {
          ranking: -10,
          traffic: -15,
          conversion: -18
        },
        recommendations: [
          'İçerik kalitesini artırın',
          'Etkileşimli elementler ekleyin',
          'Kullanıcı deneyimini iyileştirin',
          'İçerik uzunluğunu optimize edin',
          'Görsel içerikler ekleyin'
        ]
      });
    }
  }

  // Exit intent alert kontrolü
  private checkExitIntentAlert(current: BehavioralData, previous: BehavioralData): void {
    const change = ((current.exitIntentRate - previous.exitIntentRate) / previous.exitIntentRate) * 100;
    
    if (current.exitIntentRate > 25 || change > 40) {
      this.createAlert({
        type: 'exit_intent',
        severity: current.exitIntentRate > 35 ? 'high' : change > 60 ? 'medium' : 'low',
        title: 'Çıkış Niyeti Yüksek',
        description: `Çıkış niyeti oranı ${current.exitIntentRate.toFixed(1)}% seviyesine ulaştı. Kullanıcılar sayfayı terk etmeye hazırlanıyor.`,
        url: current.url,
        metric: 'exit_intent',
        currentValue: current.exitIntentRate,
        previousValue: previous.exitIntentRate,
        threshold: 25,
        change,
        seoImpact: {
          ranking: -5,
          traffic: -8,
          conversion: -20
        },
        recommendations: [
          'Exit-intent pop-up ekleyin',
          'Özel teklifler sunun',
          'Kullanıcıyı tutacak içerik ekleyin',
          'CTA butonlarını optimize edin',
          'Kullanıcı deneyimini iyileştirin'
        ]
      });
    }
  }

  // Conversion rate alert kontrolü
  private checkConversionRateAlert(current: BehavioralData, previous: BehavioralData): void {
    const change = ((current.conversionRate - previous.conversionRate) / previous.conversionRate) * 100;
    
    if (current.conversionRate < 1.0 || change < -25) {
      this.createAlert({
        type: 'conversion_drop',
        severity: current.conversionRate < 0.5 ? 'critical' : change < -40 ? 'high' : 'medium',
        title: 'Dönüşüm Oranı Düşük',
        description: `Dönüşüm oranı ${current.conversionRate.toFixed(2)}% seviyesine düştü. Bu durum SEO ve iş hedeflerini olumsuz etkileyebilir.`,
        url: current.url,
        metric: 'conversion_rate',
        currentValue: current.conversionRate,
        previousValue: previous.conversionRate,
        threshold: 1.0,
        change,
        seoImpact: {
          ranking: -12,
          traffic: -10,
          conversion: -30
        },
        recommendations: [
          'CTA butonlarını optimize edin',
          'Form alanlarını iyileştirin',
          'Güven sinyalleri ekleyin',
          'Fiyatlandırma stratejisini gözden geçirin',
          'A/B testleri yapın'
        ]
      });
    }
  }

  // Mobile behavior alert kontrolü
  private checkMobileBehaviorAlert(current: BehavioralData, previous: BehavioralData): void {
    if (current.mobileUsage > 60 && current.pageLoadTime > 3) {
      this.createAlert({
        type: 'mobile_behavior',
        severity: current.pageLoadTime > 5 ? 'high' : 'medium',
        title: 'Mobil Performans Sorunu',
        description: `Mobil kullanıcıların %${current.mobileUsage.toFixed(1)}'i yavaş sayfa yükleme süresi yaşıyor. Bu durum mobil SEO'yu olumsuz etkileyebilir.`,
        url: current.url,
        metric: 'mobile_performance',
        currentValue: current.pageLoadTime,
        previousValue: previous.pageLoadTime,
        threshold: 3,
        change: ((current.pageLoadTime - previous.pageLoadTime) / previous.pageLoadTime) * 100,
        seoImpact: {
          ranking: -20,
          traffic: -25,
          conversion: -15
        },
        recommendations: [
          'Mobil sayfa hızını optimize edin',
          'Görselleri sıkıştırın',
          'CSS ve JS dosyalarını minify edin',
          'CDN kullanın',
          'Mobil-first tasarım uygulayın'
        ]
      });
    }
  }

  // Alert oluştur
  private createAlert(alertData: Omit<BehavioralAlert, 'id' | 'timestamp' | 'status' | 'actions'>): void {
    const alert: BehavioralAlert = {
      ...alertData,
      id: `alert_${Date.now()}_${Math.random()}`,
      timestamp: new Date(),
      status: 'active',
      actions: [
        {
          id: `action_${Date.now()}`,
          name: 'Otomatik Analiz',
          description: 'Davranışsal veriler analiz edilecek',
          type: 'automatic',
          status: 'pending',
          priority: 'medium'
        }
      ]
    };

    this.alerts.push(alert);
    this.sendAlert(alert);
  }

  // Alert gönder
  private sendAlert(alert: BehavioralAlert): void {
    console.log(`Davranışsal SEO Alert: ${alert.title}`);
    
    this.config.notifications.forEach(notification => {
      if (notification.enabled) {
        switch (notification.type) {
          case 'email':
            this.sendEmailAlert(alert, notification.config);
            break;
          case 'slack':
            this.sendSlackAlert(alert, notification.config);
            break;
          case 'webhook':
            this.sendWebhookAlert(alert, notification.config);
            break;
          case 'sms':
            this.sendSMSAlert(alert, notification.config);
            break;
        }
      }
    });
  }

  // E-posta alert gönderme
  private sendEmailAlert(alert: BehavioralAlert, config: any): void {
    console.log(`E-posta davranışsal alert gönderiliyor: ${alert.title}`);
    // E-posta gönderme simülasyonu
  }

  // Slack alert gönderme
  private sendSlackAlert(alert: BehavioralAlert, config: any): void {
    console.log(`Slack davranışsal alert gönderiliyor: ${alert.title}`);
    // Slack webhook simülasyonu
  }

  // Webhook alert gönderme
  private sendWebhookAlert(alert: BehavioralAlert, config: any): void {
    console.log(`Webhook davranışsal alert gönderiliyor: ${alert.title}`);
    // Webhook simülasyonu
  }

  // SMS alert gönderme
  private sendSMSAlert(alert: BehavioralAlert, config: any): void {
    console.log(`SMS davranışsal alert gönderiliyor: ${alert.title}`);
    // SMS simülasyonu
  }

  // Önceki veriyi getir
  private getPreviousData(url: string): BehavioralData | undefined {
    const urlData = this.historicalData.filter(d => d.url === url);
    if (urlData.length < 2) return undefined;
    
    return urlData[urlData.length - 2];
  }

  // Monitoring başlat
  startMonitoring(): void {
    if (this.isMonitoring) {
      console.log('Davranışsal SEO monitoring zaten aktif');
      return;
    }

    this.isMonitoring = true;
    this.monitoringInterval = setInterval(() => {
      this.cleanupOldAlerts();
    }, this.config.checkInterval * 60 * 1000);

    console.log('Davranışsal SEO monitoring başlatıldı');
  }

  // Monitoring durdur
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    this.isMonitoring = false;
    console.log('Davranışsal SEO monitoring durduruldu');
  }

  // Eski alertleri temizle
  private cleanupOldAlerts(): void {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    this.alerts = this.alerts.filter(alert => 
      alert.timestamp > thirtyDaysAgo || alert.status === 'active'
    );
  }

  // Alert durumunu güncelle
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

  // Public API Methods
  getAlerts(): BehavioralAlert[] {
    return this.alerts;
  }

  getActiveAlerts(): BehavioralAlert[] {
    return this.alerts.filter(alert => alert.status === 'active');
  }

  getAlertsByType(type: string): BehavioralAlert[] {
    return this.alerts.filter(alert => alert.type === type);
  }

  getAlertsBySeverity(severity: string): BehavioralAlert[] {
    return this.alerts.filter(alert => alert.severity === severity);
  }

  updateConfig(newConfig: Partial<AlertConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  getConfig(): AlertConfig {
    return this.config;
  }

  isMonitoringActive(): boolean {
    return this.isMonitoring;
  }

  getHistoricalData(): BehavioralData[] {
    return this.historicalData;
  }
}

// Behavioral SEO Alert Hook
export const useBehavioralSEOAlert = (config?: AlertConfig) => {
  const defaultConfig: AlertConfig = {
    enabled: true,
    checkInterval: 5, // 5 dakika
    thresholds: [
      { metric: 'bounce_rate', warning: 60, critical: 80, direction: 'above', seoImpact: 'high' },
      { metric: 'scroll_depth', warning: 40, critical: 20, direction: 'below', seoImpact: 'medium' },
      { metric: 'session_duration', warning: 30, critical: 15, direction: 'below', seoImpact: 'medium' },
      { metric: 'exit_intent', warning: 25, critical: 35, direction: 'above', seoImpact: 'medium' },
      { metric: 'conversion_rate', warning: 1.0, critical: 0.5, direction: 'below', seoImpact: 'high' }
    ],
    notifications: [
      {
        type: 'email',
        config: { recipients: ['seo@optimizeworld.net'] },
        enabled: true
      },
      {
        type: 'slack',
        config: { webhook: 'https://hooks.slack.com/services/...' },
        enabled: false
      }
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

  const alertSystem = new BehavioralSEOAlertSystem(config || defaultConfig);

  return {
    alertSystem,
    addBehavioralData: (data: BehavioralData) => alertSystem.addBehavioralData(data),
    startMonitoring: () => alertSystem.startMonitoring(),
    stopMonitoring: () => alertSystem.stopMonitoring(),
    getAlerts: () => alertSystem.getAlerts(),
    getActiveAlerts: () => alertSystem.getActiveAlerts(),
    getAlertsByType: (type: string) => alertSystem.getAlertsByType(type),
    getAlertsBySeverity: (severity: string) => alertSystem.getAlertsBySeverity(severity),
    acknowledgeAlert: (alertId: string) => alertSystem.acknowledgeAlert(alertId),
    resolveAlert: (alertId: string) => alertSystem.resolveAlert(alertId),
    updateConfig: (newConfig: Partial<AlertConfig>) => alertSystem.updateConfig(newConfig),
    getConfig: () => alertSystem.getConfig(),
    isMonitoringActive: () => alertSystem.isMonitoringActive(),
    getHistoricalData: () => alertSystem.getHistoricalData()
  };
}; 