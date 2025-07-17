import { useEffect, useState } from 'react';

// Alert Interface'leri
export interface CoreWebVitalsAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  metric: 'lcp' | 'fid' | 'cls' | 'ttfb' | 'fcp' | 'fmp' | 'si' | 'tti' | 'tbt';
  title: string;
  message: string;
  currentValue: number;
  threshold: number;
  severity: 'high' | 'medium' | 'low';
  timestamp: Date;
  resolved: boolean;
  resolvedAt?: Date;
  actionRequired: boolean;
  suggestedActions: string[];
  impact: {
    userExperience: 'high' | 'medium' | 'low';
    seo: 'high' | 'medium' | 'low';
    conversion: 'high' | 'medium' | 'low';
  };
}

export interface AlertRule {
  id: string;
  metric: 'lcp' | 'fid' | 'cls' | 'ttfb' | 'fcp' | 'fmp' | 'si' | 'tti' | 'tbt';
  condition: 'above' | 'below' | 'equals';
  threshold: number;
  severity: 'critical' | 'warning' | 'info';
  enabled: boolean;
  description: string;
  actionRequired: boolean;
}

export interface AlertSettings {
  enabled: boolean;
  checkInterval: number; // milliseconds
  notificationMethods: {
    email: boolean;
    push: boolean;
    dashboard: boolean;
    slack: boolean;
  };
  thresholds: {
    lcp: { critical: number; warning: number };
    fid: { critical: number; warning: number };
    cls: { critical: number; warning: number };
    ttfb: { critical: number; warning: number };
    fcp: { critical: number; warning: number };
    fmp: { critical: number; warning: number };
    si: { critical: number; warning: number };
    tti: { critical: number; warning: number };
    tbt: { critical: number; warning: number };
  };
  autoResolve: boolean;
  autoResolveThreshold: number; // minutes
}

export interface AlertSummary {
  totalAlerts: number;
  criticalAlerts: number;
  warningAlerts: number;
  infoAlerts: number;
  resolvedAlerts: number;
  unresolvedAlerts: number;
  alertsByMetric: Record<string, number>;
  recentAlerts: CoreWebVitalsAlert[];
  trendingIssues: {
    metric: string;
    count: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  }[];
}

export class CoreWebVitalsAlertSystem {
  private static instance: CoreWebVitalsAlertSystem;
  private alerts: CoreWebVitalsAlert[] = [];
  private rules: AlertRule[] = [];
  private settings: AlertSettings;
  private observers: Set<(alerts: CoreWebVitalsAlert[]) => void> = new Set();
  private isMonitoring = false;
  private monitoringInterval: NodeJS.Timeout | null = null;

  private constructor() {
    this.settings = this.getDefaultSettings();
    this.initializeDefaultRules();
  }

  static getInstance(): CoreWebVitalsAlertSystem {
    if (!CoreWebVitalsAlertSystem.instance) {
      CoreWebVitalsAlertSystem.instance = new CoreWebVitalsAlertSystem();
    }
    return CoreWebVitalsAlertSystem.instance;
  }

  // Varsayılan ayarları al
  private getDefaultSettings(): AlertSettings {
    return {
      enabled: true,
      checkInterval: 60000, // 1 dakika
      notificationMethods: {
        email: false,
        push: true,
        dashboard: true,
        slack: false
      },
      thresholds: {
        lcp: { critical: 4.0, warning: 2.5 },
        fid: { critical: 300, warning: 100 },
        cls: { critical: 0.25, warning: 0.1 },
        ttfb: { critical: 1800, warning: 800 },
        fcp: { critical: 3.0, warning: 1.8 },
        fmp: { critical: 3.0, warning: 2.0 },
        si: { critical: 5.8, warning: 3.4 },
        tti: { critical: 7.3, warning: 3.8 },
        tbt: { critical: 600, warning: 200 }
      },
      autoResolve: true,
      autoResolveThreshold: 30 // 30 dakika
    };
  }

  // Varsayılan kuralları oluştur
  private initializeDefaultRules(): void {
    this.rules = [
      {
        id: 'lcp-critical',
        metric: 'lcp',
        condition: 'above',
        threshold: 4.0,
        severity: 'critical',
        enabled: true,
        description: 'LCP 4 saniyeden fazla',
        actionRequired: true
      },
      {
        id: 'lcp-warning',
        metric: 'lcp',
        condition: 'above',
        threshold: 2.5,
        severity: 'warning',
        enabled: true,
        description: 'LCP 2.5 saniyeden fazla',
        actionRequired: true
      },
      {
        id: 'fid-critical',
        metric: 'fid',
        condition: 'above',
        threshold: 300,
        severity: 'critical',
        enabled: true,
        description: 'FID 300ms\'den fazla',
        actionRequired: true
      },
      {
        id: 'fid-warning',
        metric: 'fid',
        condition: 'above',
        threshold: 100,
        severity: 'warning',
        enabled: true,
        description: 'FID 100ms\'den fazla',
        actionRequired: true
      },
      {
        id: 'cls-critical',
        metric: 'cls',
        condition: 'above',
        threshold: 0.25,
        severity: 'critical',
        enabled: true,
        description: 'CLS 0.25\'den fazla',
        actionRequired: true
      },
      {
        id: 'cls-warning',
        metric: 'cls',
        condition: 'above',
        threshold: 0.1,
        severity: 'warning',
        enabled: true,
        description: 'CLS 0.1\'den fazla',
        actionRequired: true
      }
    ];
  }

  // Alert oluştur
  private createAlert(
    metric: CoreWebVitalsAlert['metric'],
    value: number,
    threshold: number,
    severity: 'critical' | 'warning' | 'info'
  ): CoreWebVitalsAlert {
    const alert: CoreWebVitalsAlert = {
      id: `${metric}-${Date.now()}`,
      type: severity,
      metric,
      title: this.getAlertTitle(metric, severity),
      message: this.getAlertMessage(metric, value, threshold),
      currentValue: value,
      threshold,
      severity: severity === 'critical' ? 'high' : severity === 'warning' ? 'medium' : 'low',
      timestamp: new Date(),
      resolved: false,
      actionRequired: severity === 'critical' || severity === 'warning',
      suggestedActions: this.getSuggestedActions(metric, value),
      impact: this.calculateImpact(metric, value)
    };

    return alert;
  }

  // Alert başlığı oluştur
  private getAlertTitle(metric: string, severity: string): string {
    const metricNames = {
      lcp: 'Largest Contentful Paint',
      fid: 'First Input Delay',
      cls: 'Cumulative Layout Shift',
      ttfb: 'Time to First Byte',
      fcp: 'First Contentful Paint',
      fmp: 'First Meaningful Paint',
      si: 'Speed Index',
      tti: 'Time to Interactive',
      tbt: 'Total Blocking Time'
    };

    const severityText = severity === 'critical' ? 'Kritik' : severity === 'warning' ? 'Uyarı' : 'Bilgi';
    return `${severityText}: ${metricNames[metric as keyof typeof metricNames]}`;
  }

  // Alert mesajı oluştur
  private getAlertMessage(metric: string, value: number, threshold: number): string {
    const metricNames = {
      lcp: 'LCP',
      fid: 'FID',
      cls: 'CLS',
      ttfb: 'TTFB',
      fcp: 'FCP',
      fmp: 'FMP',
      si: 'SI',
      tti: 'TTI',
      tbt: 'TBT'
    };

    const unit = metric === 'cls' ? '' : metric === 'fid' || metric === 'ttfb' || metric === 'tbt' ? 'ms' : 's';
    return `${metricNames[metric as keyof typeof metricNames]} değeri ${value.toFixed(2)}${unit}, eşik değeri ${threshold}${unit} üzerinde.`;
  }

  // Önerilen aksiyonları al
  private getSuggestedActions(metric: string, value: number): string[] {
    const actions: Record<string, string[]> = {
      lcp: [
        'Görsel optimizasyonu yapın',
        'Lazy loading uygulayın',
        'CDN kullanın',
        'Görsel boyutlarını küçültün'
      ],
      fid: [
        'JavaScript bundle boyutunu küçültün',
        'Kritik olmayan scriptleri defer edin',
        'Code splitting uygulayın',
        'Third-party scriptleri optimize edin'
      ],
      cls: [
        'Görsel boyutlarını önceden belirleyin',
        'Layout shift\'leri önleyin',
        'Font loading optimizasyonu yapın',
        'CSS\'i kritik path\'e ekleyin'
      ],
      ttfb: [
        'Sunucu yanıt süresini optimize edin',
        'CDN kullanın',
        'Database sorgularını optimize edin',
        'Caching stratejilerini iyileştirin'
      ],
      fcp: [
        'Kritik CSS\'i inline edin',
        'Render-blocking kaynakları kaldırın',
        'Server-side rendering kullanın',
        'Resource prioritization uygulayın'
      ]
    };

    return actions[metric] || ['Performans optimizasyonu yapın'];
  }

  // Etki hesapla
  private calculateImpact(metric: string, value: number): CoreWebVitalsAlert['impact'] {
    const impact: CoreWebVitalsAlert['impact'] = {
      userExperience: 'medium',
      seo: 'medium',
      conversion: 'medium'
    };

    // Metrik bazında etki hesaplama
    switch (metric) {
      case 'lcp':
        if (value > 4.0) {
          impact.userExperience = 'high';
          impact.seo = 'high';
          impact.conversion = 'high';
        } else if (value > 2.5) {
          impact.userExperience = 'medium';
          impact.seo = 'medium';
          impact.conversion = 'medium';
        }
        break;
      case 'fid':
        if (value > 300) {
          impact.userExperience = 'high';
          impact.conversion = 'high';
        } else if (value > 100) {
          impact.userExperience = 'medium';
          impact.conversion = 'medium';
        }
        break;
      case 'cls':
        if (value > 0.25) {
          impact.userExperience = 'high';
          impact.conversion = 'high';
        } else if (value > 0.1) {
          impact.userExperience = 'medium';
          impact.conversion = 'medium';
        }
        break;
    }

    return impact;
  }

  // Core Web Vitals değerlerini kontrol et
  async checkCoreWebVitals(vitals: Record<string, number>): Promise<CoreWebVitalsAlert[]> {
    const newAlerts: CoreWebVitalsAlert[] = [];

    // Her metrik için kuralları kontrol et
    this.rules.forEach(rule => {
      if (!rule.enabled) return;

      const value = vitals[rule.metric];
      if (value === undefined) return;

      let shouldAlert = false;
      switch (rule.condition) {
        case 'above':
          shouldAlert = value > rule.threshold;
          break;
        case 'below':
          shouldAlert = value < rule.threshold;
          break;
        case 'equals':
          shouldAlert = value === rule.threshold;
          break;
      }

      if (shouldAlert) {
        // Aynı metrik için zaten aktif alert var mı kontrol et
        const existingAlert = this.alerts.find(
          alert => alert.metric === rule.metric && 
                   alert.type === rule.severity && 
                   !alert.resolved
        );

        if (!existingAlert) {
          const alert = this.createAlert(rule.metric, value, rule.threshold, rule.severity);
          newAlerts.push(alert);
          this.alerts.push(alert);
        }
      }
    });

    // Yeni alert'leri bildir
    if (newAlerts.length > 0) {
      this.notifyObservers(this.alerts);
      this.sendNotifications(newAlerts);
    }

    return newAlerts;
  }

  // Alert'i çöz
  resolveAlert(alertId: string): boolean {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert && !alert.resolved) {
      alert.resolved = true;
      alert.resolvedAt = new Date();
      this.notifyObservers(this.alerts);
      return true;
    }
    return false;
  }

  // Tüm alert'leri çöz
  resolveAllAlerts(): void {
    this.alerts.forEach(alert => {
      if (!alert.resolved) {
        alert.resolved = true;
        alert.resolvedAt = new Date();
      }
    });
    this.notifyObservers(this.alerts);
  }

  // Alert'leri temizle
  clearResolvedAlerts(): void {
    this.alerts = this.alerts.filter(alert => !alert.resolved);
    this.notifyObservers(this.alerts);
  }

  // Alert özeti oluştur
  getAlertSummary(): AlertSummary {
    const unresolvedAlerts = this.alerts.filter(a => !a.resolved);
    const resolvedAlerts = this.alerts.filter(a => a.resolved);
    const recentAlerts = this.alerts
      .filter(a => !a.resolved)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 10);

    const alertsByMetric: Record<string, number> = {};
    this.alerts.forEach(alert => {
      alertsByMetric[alert.metric] = (alertsByMetric[alert.metric] || 0) + 1;
    });

    // Trend analizi
    const trendingIssues = Object.entries(alertsByMetric)
      .map(([metric, count]) => ({
        metric,
        count,
        trend: 'stable' as const // Basit implementasyon
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalAlerts: this.alerts.length,
      criticalAlerts: unresolvedAlerts.filter(a => a.type === 'critical').length,
      warningAlerts: unresolvedAlerts.filter(a => a.type === 'warning').length,
      infoAlerts: unresolvedAlerts.filter(a => a.type === 'info').length,
      resolvedAlerts: resolvedAlerts.length,
      unresolvedAlerts: unresolvedAlerts.length,
      alertsByMetric,
      recentAlerts,
      trendingIssues
    };
  }

  // Kural ekle
  addRule(rule: AlertRule): void {
    this.rules.push(rule);
  }

  // Kural güncelle
  updateRule(ruleId: string, updates: Partial<AlertRule>): boolean {
    const ruleIndex = this.rules.findIndex(r => r.id === ruleId);
    if (ruleIndex !== -1) {
      this.rules[ruleIndex] = { ...this.rules[ruleIndex], ...updates };
      return true;
    }
    return false;
  }

  // Kural sil
  removeRule(ruleId: string): boolean {
    const initialLength = this.rules.length;
    this.rules = this.rules.filter(r => r.id !== ruleId);
    return this.rules.length < initialLength;
  }

  // Ayarları güncelle
  updateSettings(updates: Partial<AlertSettings>): void {
    this.settings = { ...this.settings, ...updates };
  }

  // İzlemeyi başlat
  startMonitoring(intervalMs?: number): void {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    const interval = intervalMs || this.settings.checkInterval;

    this.monitoringInterval = setInterval(async () => {
      try {
        // Core Web Vitals değerlerini al (gerçek implementasyonda)
        const vitals = {
          lcp: 2.1,
          fid: 85,
          cls: 0.08,
          ttfb: 750,
          fcp: 1.5,
          fmp: 1.8,
          si: 2.8,
          tti: 3.2,
          tbt: 150
        };

        await this.checkCoreWebVitals(vitals);
      } catch (error) {
        console.error('Core Web Vitals izleme hatası:', error);
      }
    }, interval);
  }

  // İzlemeyi durdur
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    this.isMonitoring = false;
  }

  // Bildirim gönder
  private sendNotifications(alerts: CoreWebVitalsAlert[]): void {
    if (this.settings.notificationMethods.dashboard) {
      console.log('Dashboard bildirimi gönderildi:', alerts);
    }

    if (this.settings.notificationMethods.push) {
      // Push notification implementasyonu
      console.log('Push bildirimi gönderildi:', alerts);
    }

    if (this.settings.notificationMethods.email) {
      // Email notification implementasyonu
      console.log('Email bildirimi gönderildi:', alerts);
    }

    if (this.settings.notificationMethods.slack) {
      // Slack notification implementasyonu
      console.log('Slack bildirimi gönderildi:', alerts);
    }
  }

  // Observer ekle
  addObserver(observer: (alerts: CoreWebVitalsAlert[]) => void): void {
    this.observers.add(observer);
  }

  // Observer kaldır
  removeObserver(observer: (alerts: CoreWebVitalsAlert[]) => void): void {
    this.observers.delete(observer);
  }

  // Observer'ları bilgilendir
  private notifyObservers(alerts: CoreWebVitalsAlert[]): void {
    this.observers.forEach(observer => {
      try {
        observer(alerts);
      } catch (error) {
        console.error('Observer hatası:', error);
      }
    });
  }

  // Getter metodları
  getAlerts(): CoreWebVitalsAlert[] {
    return [...this.alerts];
  }

  getRules(): AlertRule[] {
    return [...this.rules];
  }

  getSettings(): AlertSettings {
    return { ...this.settings };
  }

  isMonitoringActive(): boolean {
    return this.isMonitoring;
  }
}

// React Hook
export function useCoreWebVitalsAlerts() {
  const [alerts, setAlerts] = useState<CoreWebVitalsAlert[]>([]);
  const [summary, setSummary] = useState<AlertSummary | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const alertSystem = CoreWebVitalsAlertSystem.getInstance();

  useEffect(() => {
    const observer = (newAlerts: CoreWebVitalsAlert[]) => {
      setAlerts(newAlerts);
      setSummary(alertSystem.getAlertSummary());
    };

    alertSystem.addObserver(observer);
    setAlerts(alertSystem.getAlerts());
    setSummary(alertSystem.getAlertSummary());
    setIsMonitoring(alertSystem.isMonitoringActive());

    return () => {
      alertSystem.removeObserver(observer);
    };
  }, [alertSystem]);

  const startMonitoring = (intervalMs?: number) => {
    alertSystem.startMonitoring(intervalMs);
    setIsMonitoring(true);
  };

  const stopMonitoring = () => {
    alertSystem.stopMonitoring();
    setIsMonitoring(false);
  };

  const resolveAlert = (alertId: string) => {
    return alertSystem.resolveAlert(alertId);
  };

  const resolveAllAlerts = () => {
    alertSystem.resolveAllAlerts();
  };

  const clearResolvedAlerts = () => {
    alertSystem.clearResolvedAlerts();
  };

  const addRule = (rule: AlertRule) => {
    alertSystem.addRule(rule);
  };

  const updateSettings = (updates: Partial<AlertSettings>) => {
    alertSystem.updateSettings(updates);
  };

  return {
    alerts,
    summary,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    resolveAlert,
    resolveAllAlerts,
    clearResolvedAlerts,
    addRule,
    updateSettings,
    rules: alertSystem.getRules(),
    settings: alertSystem.getSettings()
  };
}

export default CoreWebVitalsAlertSystem; 