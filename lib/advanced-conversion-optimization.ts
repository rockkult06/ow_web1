// Advanced Conversion Optimization Functions
export interface ConversionEvent {
  type: 'page_view' | 'button_click' | 'form_submit' | 'scroll' | 'time_on_page' | 'exit_intent';
  element?: string;
  value?: any;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

export interface ConversionGoal {
  id: string;
  name: string;
  type: 'page_view' | 'button_click' | 'form_submit' | 'scroll' | 'time_on_page';
  target: string;
  value: number;
  achieved: boolean;
}

export interface ABTest {
  id: string;
  name: string;
  description: string;
  variants: ABTestVariant[];
  trafficSplit: number;
  startDate: Date;
  endDate?: Date;
  active: boolean;
  winner?: string;
}

export interface ABTestVariant {
  id: string;
  name: string;
  changes: ABTestChange[];
  conversionRate: number;
  visitors: number;
  conversions: number;
}

export interface ABTestChange {
  element: string;
  property: string;
  value: string;
  type: 'css' | 'content' | 'layout';
}

export class ConversionOptimizer {
  private events: ConversionEvent[] = [];
  private goals: ConversionGoal[] = [];
  private abTests: ABTest[] = [];
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeGoals();
    this.initializeABTests();
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private initializeGoals(): void {
    this.goals = [
      {
        id: 'contact_form',
        name: 'İletişim Formu Gönderimi',
        type: 'form_submit',
        target: 'contact-form',
        value: 1,
        achieved: false
      },
      {
        id: 'demo_request',
        name: 'Demo Talep',
        type: 'button_click',
        target: 'demo-button',
        value: 1,
        achieved: false
      },
      {
        id: 'product_view',
        name: 'Ürün Detay Görüntüleme',
        type: 'page_view',
        target: 'product-detail',
        value: 1,
        achieved: false
      },
      {
        id: 'scroll_depth',
        name: 'Sayfa Derinliği',
        type: 'scroll',
        target: '75%',
        value: 75,
        achieved: false
      },
      {
        id: 'time_on_page',
        name: 'Sayfa Zamanı',
        type: 'time_on_page',
        target: '120s',
        value: 120,
        achieved: false
      }
    ];
  }

  private initializeABTests(): void {
    this.abTests = [
      {
        id: 'cta-button-test',
        name: 'CTA Button Test',
        description: 'Farklı CTA button stilleri test ediliyor',
        variants: [
          {
            id: 'control',
            name: 'Kontrol',
            changes: [],
            conversionRate: 0,
            visitors: 0,
            conversions: 0
          },
          {
            id: 'variant-a',
            name: 'Varyant A - Büyük Button',
            changes: [
              {
                element: '.cta-button',
                property: 'padding',
                value: '16px 32px',
                type: 'css'
              },
              {
                element: '.cta-button',
                property: 'font-size',
                value: '18px',
                type: 'css'
              }
            ],
            conversionRate: 0,
            visitors: 0,
            conversions: 0
          },
          {
            id: 'variant-b',
            name: 'Varyant B - Gradient Button',
            changes: [
              {
                element: '.cta-button',
                property: 'background',
                value: 'linear-gradient(45deg, #0171E3, #0056b3)',
                type: 'css'
              },
              {
                element: '.cta-button',
                property: 'box-shadow',
                value: '0 4px 15px rgba(1, 113, 227, 0.3)',
                type: 'css'
              }
            ],
            conversionRate: 0,
            visitors: 0,
            conversions: 0
          }
        ],
        trafficSplit: 0.3,
        startDate: new Date(),
        active: true
      }
    ];
  }

  // Event Tracking
  trackEvent(event: Omit<ConversionEvent, 'timestamp' | 'sessionId'>): void {
    const fullEvent: ConversionEvent = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.sessionId
    };

    this.events.push(fullEvent);
    this.checkGoals(fullEvent);
    this.updateABTestMetrics(fullEvent);
  }

  // Goal Tracking
  private checkGoals(event: ConversionEvent): void {
    this.goals.forEach(goal => {
      if (goal.type === event.type && goal.target === event.element) {
        goal.achieved = true;
        this.trackConversion(goal);
      }
    });
  }

  private trackConversion(goal: ConversionGoal): void {
    // Google Analytics conversion tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: 'G-30XM7GYBBH/conversion',
        value: goal.value,
        currency: 'TRY',
        transaction_id: this.sessionId
      });
    }

    // Custom conversion tracking
    console.log(`Conversion achieved: ${goal.name}`);
  }

  // A/B Testing
  getActiveABTests(): ABTest[] {
    return this.abTests.filter(test => test.active);
  }

  applyABTestChanges(testId: string, variantId: string): void {
    const test = this.abTests.find(t => t.id === testId);
    if (!test) return;

    const variant = test.variants.find(v => v.id === variantId);
    if (!variant) return;

    variant.changes.forEach(change => {
      const elements = document.querySelectorAll(change.element);
      elements.forEach(element => {
        if (change.type === 'css') {
          (element as HTMLElement).style[change.property as any] = change.value;
        } else if (change.type === 'content') {
          element.textContent = change.value;
        }
      });
    });

    // Track variant view
    this.trackEvent({
      type: 'page_view',
      element: `ab-test-${testId}-${variantId}`,
      value: { testId, variantId }
    });
  }

  private updateABTestMetrics(event: ConversionEvent): void {
    this.abTests.forEach(test => {
      if (!test.active) return;

      test.variants.forEach(variant => {
        // Track visitors
        if (event.type === 'page_view' && event.element?.includes(`ab-test-${test.id}-${variant.id}`)) {
          variant.visitors++;
        }

        // Track conversions
        if (event.type === 'button_click' && event.element === 'cta-button') {
          variant.conversions++;
          variant.conversionRate = (variant.conversions / variant.visitors) * 100;
        }
      });
    });
  }

  // Scroll Depth Tracking
  trackScrollDepth(): void {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    if (scrollPercent >= 25 && scrollPercent < 50) {
      this.trackEvent({
        type: 'scroll',
        element: '25%',
        value: scrollPercent
      });
    } else if (scrollPercent >= 50 && scrollPercent < 75) {
      this.trackEvent({
        type: 'scroll',
        element: '50%',
        value: scrollPercent
      });
    } else if (scrollPercent >= 75) {
      this.trackEvent({
        type: 'scroll',
        element: '75%',
        value: scrollPercent
      });
    }
  }

  // Exit Intent Tracking
  trackExitIntent(): void {
    this.trackEvent({
      type: 'exit_intent',
      element: 'page-exit',
      value: { url: window.location.href }
    });
  }

  // Form Analytics
  trackFormInteraction(formId: string, fieldName: string, action: 'focus' | 'blur' | 'input'): void {
    this.trackEvent({
      type: 'button_click',
      element: `form-${formId}-${fieldName}-${action}`,
      value: { formId, fieldName, action }
    });
  }

  // Performance Tracking
  trackPageLoadTime(): void {
    const loadTime = performance.now();
    
    this.trackEvent({
      type: 'page_view',
      element: 'page-load-time',
      value: loadTime
    });

    // Core Web Vitals tracking
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name === 'LCP') {
            this.trackEvent({
              type: 'page_view',
              element: 'lcp',
              value: entry.startTime
            });
          }
        });
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  // Get Analytics Data
  getConversionData(): {
    events: ConversionEvent[];
    goals: ConversionGoal[];
    abTests: ABTest[];
    conversionRate: number;
    totalVisitors: number;
    totalConversions: number;
  } {
    const totalVisitors = this.events.filter(e => e.type === 'page_view').length;
    const totalConversions = this.goals.filter(g => g.achieved).length;
    const conversionRate = totalVisitors > 0 ? (totalConversions / totalVisitors) * 100 : 0;

    return {
      events: this.events,
      goals: this.goals,
      abTests: this.abTests,
      conversionRate,
      totalVisitors,
      totalConversions
    };
  }
}

// Conversion Optimization Hook
export const useConversionOptimization = () => {
  const optimizer = new ConversionOptimizer();

  const trackButtonClick = (buttonId: string, value?: any) => {
    optimizer.trackEvent({
      type: 'button_click',
      element: buttonId,
      value
    });
  };

  const trackFormSubmit = (formId: string, formData?: any) => {
    optimizer.trackEvent({
      type: 'form_submit',
      element: formId,
      value: formData
    });
  };

  const trackPageView = (pageId: string) => {
    optimizer.trackEvent({
      type: 'page_view',
      element: pageId
    });
  };

  const getABTestVariant = (testId: string): string => {
    const test = optimizer.getActiveABTests().find(t => t.id === testId);
    if (!test) return 'control';

    const random = Math.random();
    const variantIndex = Math.floor(random * test.variants.length);
    return test.variants[variantIndex].id;
  };

  const applyABTest = (testId: string) => {
    const variantId = getABTestVariant(testId);
    optimizer.applyABTestChanges(testId, variantId);
  };

  return {
    trackButtonClick,
    trackFormSubmit,
    trackPageView,
    getABTestVariant,
    applyABTest,
    getConversionData: () => optimizer.getConversionData()
  };
}; 