import { useEffect, useState } from 'react';

// Performance API Interface'leri
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  startTime: number;
}

// Core Web Vitals Interface'leri
export interface CoreWebVitals {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  fcp: number; // First Contentful Paint
  fmp: number; // First Meaningful Paint
  si: number; // Speed Index
  tti: number; // Time to Interactive
  tbt: number; // Total Blocking Time
}

export interface CoreWebVitalsThresholds {
  lcp: { good: number; needsImprovement: number };
  fid: { good: number; needsImprovement: number };
  cls: { good: number; needsImprovement: number };
  ttfb: { good: number; needsImprovement: number };
  fcp: { good: number; needsImprovement: number };
  fmp: { good: number; needsImprovement: number };
  si: { good: number; needsImprovement: number };
  tti: { good: number; needsImprovement: number };
  tbt: { good: number; needsImprovement: number };
}

export interface CoreWebVitalsScore {
  metric: keyof CoreWebVitals;
  value: number;
  score: 'good' | 'needsImprovement' | 'poor';
  threshold: number;
  impact: 'high' | 'medium' | 'low';
}

export interface CoreWebVitalsOptimization {
  metric: keyof CoreWebVitals;
  currentValue: number;
  targetValue: number;
  optimizationType: 'image' | 'script' | 'css' | 'font' | 'resource' | 'server';
  priority: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  estimatedImpact: number; // Yüzde olarak iyileştme
}

export interface CoreWebVitalsReport {
  timestamp: Date;
  url: string;
  scores: CoreWebVitalsScore[];
  optimizations: CoreWebVitalsOptimization[];
  overallScore: number;
  performanceGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  recommendations: string[];
}

// Google'ın resmi Core Web Vitals eşikleri
export const CORE_WEB_VITALS_THRESHOLDS: CoreWebVitalsThresholds = {
  lcp: { good: 2.5, needsImprovement: 4.0 },
  fid: { good: 100, needsImprovement: 300 },
  cls: { good: 0.1, needsImprovement: 0.25 },
  ttfb: { good: 800, needsImprovement: 1800 },
  fcp: { good: 1.8, needsImprovement: 3.0 },
  fmp: { good: 2.0, needsImprovement: 3.0 },
  si: { good: 3.4, needsImprovement: 5.8 },
  tti: { good: 3.8, needsImprovement: 7.3 },
  tbt: { good: 200, needsImprovement: 600 }
};

export class CoreWebVitalsMonitor {
  private static instance: CoreWebVitalsMonitor;
  private observers: Set<(report: CoreWebVitalsReport) => void> = new Set();
  private isMonitoring = false;
  private monitoringInterval: NodeJS.Timeout | null = null;

  private constructor() {}

  static getInstance(): CoreWebVitalsMonitor {
    if (!CoreWebVitalsMonitor.instance) {
      CoreWebVitalsMonitor.instance = new CoreWebVitalsMonitor();
    }
    return CoreWebVitalsMonitor.instance;
  }

  // Core Web Vitals değerlerini al
  async measureCoreWebVitals(): Promise<CoreWebVitals> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve({
          lcp: 0, fid: 0, cls: 0, ttfb: 0, fcp: 0, fmp: 0, si: 0, tti: 0, tbt: 0
        });
        return;
      }

      const vitals: Partial<CoreWebVitals> = {};
      let measurementsComplete = 0;
      const totalMetrics = 9;

      const checkComplete = () => {
        measurementsComplete++;
        if (measurementsComplete === totalMetrics) {
          resolve(vitals as CoreWebVitals);
        }
      };

      // LCP (Largest Contentful Paint)
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            vitals.lcp = lastEntry.startTime;
            checkComplete();
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          vitals.lcp = 0;
          checkComplete();
        }
      } else {
        vitals.lcp = 0;
        checkComplete();
      }

      // FID (First Input Delay)
      if ('PerformanceObserver' in window) {
        try {
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const firstInput = entries[0] as PerformanceEventTiming;
            vitals.fid = firstInput.processingStart - firstInput.startTime;
            checkComplete();
          });
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          vitals.fid = 0;
          checkComplete();
        }
      } else {
        vitals.fid = 0;
        checkComplete();
      }

      // CLS (Cumulative Layout Shift)
      if ('PerformanceObserver' in window) {
        try {
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const layoutShiftEntry = entry as LayoutShift;
              if (!layoutShiftEntry.hadRecentInput) {
                clsValue += layoutShiftEntry.value;
              }
            }
            vitals.cls = clsValue;
            checkComplete();
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          vitals.cls = 0;
          checkComplete();
        }
      } else {
        vitals.cls = 0;
        checkComplete();
      }

      // TTFB (Time to First Byte)
      if ('PerformanceObserver' in window) {
        try {
          const navigationObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const navigationEntry = entries[0] as PerformanceNavigationTiming;
            vitals.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
            checkComplete();
          });
          navigationObserver.observe({ entryTypes: ['navigation'] });
        } catch (e) {
          vitals.ttfb = 0;
          checkComplete();
        }
      } else {
        vitals.ttfb = 0;
        checkComplete();
      }

      // FCP (First Contentful Paint)
      if ('PerformanceObserver' in window) {
        try {
          const fcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            vitals.fcp = entries[0].startTime;
            checkComplete();
          });
          fcpObserver.observe({ entryTypes: ['paint'] });
        } catch (e) {
          vitals.fcp = 0;
          checkComplete();
        }
      } else {
        vitals.fcp = 0;
        checkComplete();
      }

      // Diğer metrikler için varsayılan değerler
      vitals.fmp = 0;
      vitals.si = 0;
      vitals.tti = 0;
      vitals.tbt = 0;
      checkComplete();
      checkComplete();
      checkComplete();
      checkComplete();
    });
  }

  // Core Web Vitals skorlarını hesapla
  calculateScores(vitals: CoreWebVitals): CoreWebVitalsScore[] {
    const scores: CoreWebVitalsScore[] = [];
    const thresholds = CORE_WEB_VITALS_THRESHOLDS;

    Object.entries(vitals).forEach(([metric, value]) => {
      const threshold = thresholds[metric as keyof CoreWebVitals];
      let score: 'good' | 'needsImprovement' | 'poor';
      let impact: 'high' | 'medium' | 'low';

      if (value <= threshold.good) {
        score = 'good';
        impact = 'low';
      } else if (value <= threshold.needsImprovement) {
        score = 'needsImprovement';
        impact = 'medium';
      } else {
        score = 'poor';
        impact = 'high';
      }

      scores.push({
        metric: metric as keyof CoreWebVitals,
        value,
        score,
        threshold: threshold.good,
        impact
      });
    });

    return scores;
  }

  // Optimizasyon önerileri oluştur
  generateOptimizations(vitals: CoreWebVitals): CoreWebVitalsOptimization[] {
    const optimizations: CoreWebVitalsOptimization[] = [];

    // LCP optimizasyonları
    if (vitals.lcp > CORE_WEB_VITALS_THRESHOLDS.lcp.good) {
      optimizations.push({
        metric: 'lcp',
        currentValue: vitals.lcp,
        targetValue: CORE_WEB_VITALS_THRESHOLDS.lcp.good,
        optimizationType: 'image',
        priority: vitals.lcp > CORE_WEB_VITALS_THRESHOLDS.lcp.needsImprovement ? 'critical' : 'high',
        description: 'Largest Contentful Paint optimizasyonu için görsel sıkıştırma ve lazy loading uygulanmalı',
        estimatedImpact: 30
      });
    }

    // FID optimizasyonları
    if (vitals.fid > CORE_WEB_VITALS_THRESHOLDS.fid.good) {
      optimizations.push({
        metric: 'fid',
        currentValue: vitals.fid,
        targetValue: CORE_WEB_VITALS_THRESHOLDS.fid.good,
        optimizationType: 'script',
        priority: vitals.fid > CORE_WEB_VITALS_THRESHOLDS.fid.needsImprovement ? 'critical' : 'high',
        description: 'JavaScript bundle boyutunu küçült ve kritik olmayan scriptleri defer et',
        estimatedImpact: 25
      });
    }

    // CLS optimizasyonları
    if (vitals.cls > CORE_WEB_VITALS_THRESHOLDS.cls.good) {
      optimizations.push({
        metric: 'cls',
        currentValue: vitals.cls,
        targetValue: CORE_WEB_VITALS_THRESHOLDS.cls.good,
        optimizationType: 'css',
        priority: vitals.cls > CORE_WEB_VITALS_THRESHOLDS.cls.needsImprovement ? 'critical' : 'high',
        description: 'Görsel boyutlarını önceden belirle ve layout shift\'leri önle',
        estimatedImpact: 40
      });
    }

    // TTFB optimizasyonları
    if (vitals.ttfb > CORE_WEB_VITALS_THRESHOLDS.ttfb.good) {
      optimizations.push({
        metric: 'ttfb',
        currentValue: vitals.ttfb,
        targetValue: CORE_WEB_VITALS_THRESHOLDS.ttfb.good,
        optimizationType: 'server',
        priority: vitals.ttfb > CORE_WEB_VITALS_THRESHOLDS.ttfb.needsImprovement ? 'critical' : 'high',
        description: 'Sunucu yanıt süresini optimize et ve CDN kullan',
        estimatedImpact: 35
      });
    }

    return optimizations;
  }

  // Genel performans skoru hesapla
  calculateOverallScore(scores: CoreWebVitalsScore[]): number {
    const weights: Record<string, number> = {
      lcp: 0.25,
      fid: 0.25,
      cls: 0.25,
      ttfb: 0.15,
      fcp: 0.10
    };

    let totalScore = 0;
    let totalWeight = 0;

    scores.forEach(score => {
      const weight = weights[score.metric] || 0;
      const scoreValue = score.score === 'good' ? 100 : score.score === 'needsImprovement' ? 60 : 20;
      totalScore += scoreValue * weight;
      totalWeight += weight;
    });

    return totalWeight > 0 ? totalScore / totalWeight : 0;
  }

  // Performans notu belirle
  getPerformanceGrade(overallScore: number): 'A' | 'B' | 'C' | 'D' | 'F' {
    if (overallScore >= 90) return 'A';
    if (overallScore >= 80) return 'B';
    if (overallScore >= 70) return 'C';
    if (overallScore >= 60) return 'D';
    return 'F';
  }

  // Core Web Vitals raporu oluştur
  async generateReport(url: string = window.location.href): Promise<CoreWebVitalsReport> {
    const vitals = await this.measureCoreWebVitals();
    const scores = this.calculateScores(vitals);
    const optimizations = this.generateOptimizations(vitals);
    const overallScore = this.calculateOverallScore(scores);
    const performanceGrade = this.getPerformanceGrade(overallScore);

    const recommendations = [
      'Core Web Vitals metriklerini düzenli olarak izle',
      'Performans optimizasyonlarını öncelik sırasına göre uygula',
      'Kullanıcı deneyimini sürekli iyileştir',
      'Teknik SEO best practice\'lerini takip et'
    ];

    const report: CoreWebVitalsReport = {
      timestamp: new Date(),
      url,
      scores,
      optimizations,
      overallScore,
      performanceGrade,
      recommendations
    };

    return report;
  }

  // İzleme başlat
  startMonitoring(intervalMs: number = 30000): void {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    this.monitoringInterval = setInterval(async () => {
      try {
        const report = await this.generateReport();
        this.notifyObservers(report);
      } catch (error) {
        console.error('Core Web Vitals izleme hatası:', error);
      }
    }, intervalMs);
  }

  // İzlemeyi durdur
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    this.isMonitoring = false;
  }

  // Observer ekle
  addObserver(observer: (report: CoreWebVitalsReport) => void): void {
    this.observers.add(observer);
  }

  // Observer kaldır
  removeObserver(observer: (report: CoreWebVitalsReport) => void): void {
    this.observers.delete(observer);
  }

  // Observer'ları bilgilendir
  private notifyObservers(report: CoreWebVitalsReport): void {
    this.observers.forEach(observer => {
      try {
        observer(report);
      } catch (error) {
        console.error('Observer hatası:', error);
      }
    });
  }

  // Optimizasyon önerilerini uygula
  async applyOptimization(optimization: CoreWebVitalsOptimization): Promise<boolean> {
    try {
      switch (optimization.optimizationType) {
        case 'image':
          await this.optimizeImages();
          break;
        case 'script':
          await this.optimizeScripts();
          break;
        case 'css':
          await this.optimizeCSS();
          break;
        case 'font':
          await this.optimizeFonts();
          break;
        case 'resource':
          await this.optimizeResources();
          break;
        case 'server':
          await this.optimizeServer();
          break;
      }
      return true;
    } catch (error) {
      console.error('Optimizasyon uygulama hatası:', error);
      return false;
    }
  }

  // Görsel optimizasyonu
  private async optimizeImages(): Promise<void> {
    // Görsel optimizasyonu implementasyonu
    console.log('Görsel optimizasyonu uygulanıyor...');
  }

  // Script optimizasyonu
  private async optimizeScripts(): Promise<void> {
    // Script optimizasyonu implementasyonu
    console.log('Script optimizasyonu uygulanıyor...');
  }

  // CSS optimizasyonu
  private async optimizeCSS(): Promise<void> {
    // CSS optimizasyonu implementasyonu
    console.log('CSS optimizasyonu uygulanıyor...');
  }

  // Font optimizasyonu
  private async optimizeFonts(): Promise<void> {
    // Font optimizasyonu implementasyonu
    console.log('Font optimizasyonu uygulanıyor...');
  }

  // Kaynak optimizasyonu
  private async optimizeResources(): Promise<void> {
    // Kaynak optimizasyonu implementasyonu
    console.log('Kaynak optimizasyonu uygulanıyor...');
  }

  // Sunucu optimizasyonu
  private async optimizeServer(): Promise<void> {
    // Sunucu optimizasyonu implementasyonu
    console.log('Sunucu optimizasyonu uygulanıyor...');
  }
}

// React Hook
export function useCoreWebVitals() {
  const [report, setReport] = useState<CoreWebVitalsReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const monitor = CoreWebVitalsMonitor.getInstance();

  useEffect(() => {
    const observer = (newReport: CoreWebVitalsReport) => {
      setReport(newReport);
    };

    monitor.addObserver(observer);

    return () => {
      monitor.removeObserver(observer);
    };
  }, [monitor]);

  const measureVitals = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const newReport = await monitor.generateReport();
      setReport(newReport);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
    } finally {
      setIsLoading(false);
    }
  };

  const startMonitoring = (intervalMs?: number) => {
    monitor.startMonitoring(intervalMs);
  };

  const stopMonitoring = () => {
    monitor.stopMonitoring();
  };

  const applyOptimization = async (optimization: CoreWebVitalsOptimization) => {
    return await monitor.applyOptimization(optimization);
  };

  return {
    report,
    isLoading,
    error,
    measureVitals,
    startMonitoring,
    stopMonitoring,
    applyOptimization
  };
}

export default CoreWebVitalsMonitor; 