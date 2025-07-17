// SEO Analytics Data Layer
export interface SEOAnalyticsEvent {
  id: string;
  timestamp: Date;
  url: string;
  eventType: 'pageview' | 'click' | 'conversion' | 'impression' | 'scroll' | 'engagement' | 'custom';
  userId?: string;
  sessionId?: string;
  referrer?: string;
  device: 'desktop' | 'mobile' | 'tablet';
  country?: string;
  city?: string;
  trafficSource?: string;
  campaign?: string;
  keyword?: string;
  value?: number;
  meta?: Record<string, any>;
}

export interface SEOAnalyticsMetric {
  id: string;
  url: string;
  date: Date;
  pageviews: number;
  uniqueVisitors: number;
  avgTimeOnPage: number;
  bounceRate: number;
  conversions: number;
  conversionRate: number;
  impressions: number;
  clicks: number;
  ctr: number;
  avgPosition: number;
  organicTraffic: number;
  paidTraffic: number;
  directTraffic: number;
  referralTraffic: number;
  socialTraffic: number;
  deviceStats: DeviceStats;
  countryStats: CountryStats[];
  keywordStats: KeywordStats[];
  score: number;
  trend: number;
}

export interface DeviceStats {
  desktop: number;
  mobile: number;
  tablet: number;
}

export interface CountryStats {
  country: string;
  visitors: number;
  conversions: number;
}

export interface KeywordStats {
  keyword: string;
  impressions: number;
  clicks: number;
  ctr: number;
  avgPosition: number;
}

export interface SEOAnalyticsConfig {
  enableTracking: boolean;
  anonymizeIP: boolean;
  retentionDays: number;
  autoReport: boolean;
  reportFrequency: 'daily' | 'weekly' | 'monthly';
  alertThresholds: SEOAlertThreshold[];
}

export interface SEOAlertThreshold {
  metric: keyof SEOAnalyticsMetric;
  type: 'increase' | 'decrease';
  value: number;
  period: number; // gün
  channel: 'email' | 'slack' | 'webhook';
  enabled: boolean;
}

export class SEOAnalyticsDataLayer {
  private events: SEOAnalyticsEvent[] = [];
  private metrics: SEOAnalyticsMetric[] = [];
  private config: SEOAnalyticsConfig;

  constructor(config: Partial<SEOAnalyticsConfig> = {}) {
    this.config = {
      enableTracking: true,
      anonymizeIP: true,
      retentionDays: 180,
      autoReport: true,
      reportFrequency: 'weekly',
      alertThresholds: [],
      ...config
    };
  }

  // Event Kaydet
  trackEvent(event: Omit<SEOAnalyticsEvent, 'id' | 'timestamp'>): string {
    const id = `event_${Date.now()}`;
    const newEvent: SEOAnalyticsEvent = {
      ...event,
      id,
      timestamp: new Date()
    };
    this.events.push(newEvent);
    return id;
  }

  // Günlük Metrik Kaydet
  saveMetric(metric: Omit<SEOAnalyticsMetric, 'id' | 'date'>): string {
    const id = `metric_${Date.now()}`;
    const newMetric: SEOAnalyticsMetric = {
      ...metric,
      id,
      date: new Date()
    };
    this.metrics.push(newMetric);
    return id;
  }

  // Metrik Getir
  getMetrics(url?: string, startDate?: Date, endDate?: Date): SEOAnalyticsMetric[] {
    let filtered = this.metrics;
    if (url) filtered = filtered.filter(m => m.url === url);
    if (startDate) filtered = filtered.filter(m => m.date >= startDate);
    if (endDate) filtered = filtered.filter(m => m.date <= endDate);
    return filtered;
  }

  // Event Getir
  getEvents(url?: string, eventType?: SEOAnalyticsEvent['eventType']): SEOAnalyticsEvent[] {
    let filtered = this.events;
    if (url) filtered = filtered.filter(e => e.url === url);
    if (eventType) filtered = filtered.filter(e => e.eventType === eventType);
    return filtered;
  }

  // Otomatik Temizlik
  cleanupOldData(): void {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - this.config.retentionDays);
    this.events = this.events.filter(e => e.timestamp >= cutoff);
    this.metrics = this.metrics.filter(m => m.date >= cutoff);
  }

  // Otomatik Raporlama (simülasyon)
  autoReport(): void {
    if (!this.config.autoReport) return;
    // Burada e-posta, Slack veya webhook ile rapor gönderimi yapılabilir
    console.log('SEO Analytics raporu otomatik olarak gönderildi.');
  }

  // Alert Kontrolü
  checkAlerts(): void {
    this.config.alertThresholds.forEach(threshold => {
      const recentMetrics = this.metrics.slice(-threshold.period);
      if (recentMetrics.length < threshold.period) return;
      const last = recentMetrics[recentMetrics.length - 1][threshold.metric] as number;
      const prev = recentMetrics[0][threshold.metric] as number;
      if (threshold.type === 'increase' && last - prev >= threshold.value) {
        this.sendAlert(threshold, last, prev);
      } else if (threshold.type === 'decrease' && prev - last >= threshold.value) {
        this.sendAlert(threshold, last, prev);
      }
    });
  }

  // Alert Gönderme (simülasyon)
  private sendAlert(threshold: SEOAlertThreshold, last: number, prev: number): void {
    console.log(`ALERT: ${threshold.metric} ${threshold.type} - Son: ${last}, Önceki: ${prev}`);
    // Gerçek sistemde e-posta, Slack veya webhook ile bildirim gönderilebilir
  }

  // Config Güncelle
  updateConfig(updates: Partial<SEOAnalyticsConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  // Public Methods
  getConfig(): SEOAnalyticsConfig {
    return this.config;
  }
}

// SEO Analytics Hook
export const useSEOAnalytics = () => {
  const analytics = new SEOAnalyticsDataLayer();

  const trackEvent = (event: Omit<SEOAnalyticsEvent, 'id' | 'timestamp'>) => {
    return analytics.trackEvent(event);
  };

  const saveMetric = (metric: Omit<SEOAnalyticsMetric, 'id' | 'date'>) => {
    return analytics.saveMetric(metric);
  };

  const getMetrics = (url?: string, startDate?: Date, endDate?: Date) => {
    return analytics.getMetrics(url, startDate, endDate);
  };

  const getEvents = (url?: string, eventType?: SEOAnalyticsEvent['eventType']) => {
    return analytics.getEvents(url, eventType);
  };

  const updateConfig = (updates: Partial<SEOAnalyticsConfig>) => {
    return analytics.updateConfig(updates);
  };

  const getConfig = () => {
    return analytics.getConfig();
  };

  return {
    trackEvent,
    saveMetric,
    getMetrics,
    getEvents,
    updateConfig,
    getConfig
  };
}; 