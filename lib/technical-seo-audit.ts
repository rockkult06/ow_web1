// Technical SEO Audit Functions
export interface SEOAuditResult {
  score: number;
  issues: SEOIssue[];
  recommendations: SEORecommendation[];
  passed: boolean;
}

export interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  priority: 'high' | 'medium' | 'low';
  element?: string;
  suggestion?: string;
}

export interface SEORecommendation {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  implementation?: string;
}

export class TechnicalSEOAuditor {
  private issues: SEOIssue[] = [];
  private recommendations: SEORecommendation[] = [];

  // Core Web Vitals Audit
  auditCoreWebVitals(metrics: any): SEOAuditResult {
    this.issues = [];
    this.recommendations = [];

    // LCP (Largest Contentful Paint)
    if (metrics.lcp > 2500) {
      this.issues.push({
        type: 'error',
        message: 'LCP değeri 2.5 saniyeden yüksek',
        priority: 'high',
        element: 'Largest Contentful Paint',
        suggestion: 'Görsel optimizasyonu ve CDN kullanımı önerilir'
      });
    } else if (metrics.lcp > 4000) {
      this.issues.push({
        type: 'error',
        message: 'LCP değeri 4 saniyeden yüksek - Kritik performans sorunu',
        priority: 'high',
        element: 'Largest Contentful Paint',
        suggestion: 'Acil görsel optimizasyonu ve sunucu yanıt süresi iyileştirmesi gerekli'
      });
    }

    // FID (First Input Delay)
    if (metrics.fid > 100) {
      this.issues.push({
        type: 'error',
        message: 'FID değeri 100ms\'den yüksek',
        priority: 'high',
        element: 'First Input Delay',
        suggestion: 'JavaScript optimizasyonu ve event listener iyileştirmesi gerekli'
      });
    }

    // CLS (Cumulative Layout Shift)
    if (metrics.cls > 0.1) {
      this.issues.push({
        type: 'error',
        message: 'CLS değeri 0.1\'den yüksek',
        priority: 'high',
        element: 'Cumulative Layout Shift',
        suggestion: 'Görsel boyutları ve font yükleme optimizasyonu gerekli'
      });
    }

    // Recommendations
    if (metrics.lcp > 2500) {
      this.recommendations.push({
        title: 'Görsel Optimizasyonu',
        description: 'LCP değerini iyileştirmek için görselleri optimize edin',
        impact: 'high',
        effort: 'medium',
        implementation: 'WebP formatı kullanın, lazy loading uygulayın'
      });
    }

    const score = this.calculateScore();
    return {
      score,
      issues: this.issues,
      recommendations: this.recommendations,
      passed: score >= 80
    };
  }

  // Meta Tags Audit
  auditMetaTags(document: Document): SEOAuditResult {
    this.issues = [];
    this.recommendations = [];

    const title = document.querySelector('title');
    const description = document.querySelector('meta[name="description"]');
    const viewport = document.querySelector('meta[name="viewport"]');
    const robots = document.querySelector('meta[name="robots"]');
    const canonical = document.querySelector('link[rel="canonical"]');

    // Title check
    if (!title || title.textContent!.length < 30) {
      this.issues.push({
        type: 'error',
        message: 'Title tag eksik veya çok kısa',
        priority: 'high',
        element: 'title',
        suggestion: 'Title 30-60 karakter arasında olmalı'
      });
    } else if (title.textContent!.length > 60) {
      this.issues.push({
        type: 'warning',
        message: 'Title tag çok uzun',
        priority: 'medium',
        element: 'title',
        suggestion: 'Title 60 karakterden az olmalı'
      });
    }

    // Description check
    if (!description) {
      this.issues.push({
        type: 'error',
        message: 'Meta description eksik',
        priority: 'high',
        element: 'meta[name="description"]',
        suggestion: 'Meta description ekleyin'
      });
    } else if (description.getAttribute('content')!.length < 120) {
      this.issues.push({
        type: 'warning',
        message: 'Meta description çok kısa',
        priority: 'medium',
        element: 'meta[name="description"]',
        suggestion: 'Description 120-160 karakter arasında olmalı'
      });
    }

    // Viewport check
    if (!viewport) {
      this.issues.push({
        type: 'error',
        message: 'Viewport meta tag eksik',
        priority: 'high',
        element: 'meta[name="viewport"]',
        suggestion: 'Mobil uyumluluk için viewport ekleyin'
      });
    }

    // Canonical check
    if (!canonical) {
      this.issues.push({
        type: 'warning',
        message: 'Canonical URL eksik',
        priority: 'medium',
        element: 'link[rel="canonical"]',
        suggestion: 'Duplicate content için canonical URL ekleyin'
      });
    }

    const score = this.calculateScore();
    return {
      score,
      issues: this.issues,
      recommendations: this.recommendations,
      passed: score >= 80
    };
  }

  // Structured Data Audit
  auditStructuredData(document: Document): SEOAuditResult {
    this.issues = [];
    this.recommendations = [];

    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    const microdata = document.querySelectorAll('[itemtype]');
    const rdfa = document.querySelectorAll('[typeof]');

    if (jsonLdScripts.length === 0 && microdata.length === 0 && rdfa.length === 0) {
      this.issues.push({
        type: 'warning',
        message: 'Structured data bulunamadı',
        priority: 'medium',
        element: 'structured-data',
        suggestion: 'JSON-LD, Microdata veya RDFa ekleyin'
      });
    }

    // Check for essential schemas
    const hasOrganization = Array.from(jsonLdScripts).some(script => {
      try {
        const data = JSON.parse(script.textContent || '');
        return data['@type'] === 'Organization';
      } catch {
        return false;
      }
    });

    if (!hasOrganization) {
      this.recommendations.push({
        title: 'Organization Schema Ekle',
        description: 'Şirket bilgileri için Organization schema ekleyin',
        impact: 'medium',
        effort: 'low'
      });
    }

    const score = this.calculateScore();
    return {
      score,
      issues: this.issues,
      recommendations: this.recommendations,
      passed: score >= 70
    };
  }

  // Performance Audit
  auditPerformance(metrics: any): SEOAuditResult {
    this.issues = [];
    this.recommendations = [];

    // Page load time
    if (metrics.loadTime > 3000) {
      this.issues.push({
        type: 'error',
        message: 'Sayfa yükleme süresi 3 saniyeden yüksek',
        priority: 'high',
        element: 'page-load-time',
        suggestion: 'Görsel ve script optimizasyonu gerekli'
      });
    }

    // Image optimization
    if (metrics.unoptimizedImages > 0) {
      this.issues.push({
        type: 'warning',
        message: `${metrics.unoptimizedImages} adet optimize edilmemiş görsel`,
        priority: 'medium',
        element: 'images',
        suggestion: 'WebP formatı ve lazy loading kullanın'
      });
    }

    // JavaScript optimization
    if (metrics.jsSize > 500000) {
      this.issues.push({
        type: 'warning',
        message: 'JavaScript dosya boyutu çok büyük',
        priority: 'medium',
        element: 'javascript',
        suggestion: 'Code splitting ve tree shaking uygulayın'
      });
    }

    const score = this.calculateScore();
    return {
      score,
      issues: this.issues,
      recommendations: this.recommendations,
      passed: score >= 80
    };
  }

  // Security Audit
  auditSecurity(document: Document): SEOAuditResult {
    this.issues = [];
    this.recommendations = [];

    const https = window.location.protocol === 'https:';
    const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    const hsts = document.querySelector('meta[http-equiv="Strict-Transport-Security"]');

    if (!https) {
      this.issues.push({
        type: 'error',
        message: 'HTTPS kullanılmıyor',
        priority: 'high',
        element: 'protocol',
        suggestion: 'SSL sertifikası kurun'
      });
    }

    if (!csp) {
      this.recommendations.push({
        title: 'Content Security Policy Ekle',
        description: 'Güvenlik için CSP header ekleyin',
        impact: 'medium',
        effort: 'medium'
      });
    }

    if (!hsts) {
      this.recommendations.push({
        title: 'HSTS Header Ekle',
        description: 'HTTPS zorunluluğu için HSTS ekleyin',
        impact: 'medium',
        effort: 'low'
      });
    }

    const score = this.calculateScore();
    return {
      score,
      issues: this.issues,
      recommendations: this.recommendations,
      passed: score >= 80
    };
  }

  private calculateScore(): number {
    const totalIssues = this.issues.length;
    const errorCount = this.issues.filter(issue => issue.type === 'error').length;
    const warningCount = this.issues.filter(issue => issue.type === 'warning').length;

    let score = 100;
    score -= errorCount * 20; // Her error 20 puan düşürür
    score -= warningCount * 10; // Her warning 10 puan düşürür

    return Math.max(0, score);
  }
}

// SEO Audit Hook
export const useSEOAudit = () => {
  const auditor = new TechnicalSEOAuditor();

  const runFullAudit = async (): Promise<{
    coreWebVitals: SEOAuditResult;
    metaTags: SEOAuditResult;
    structuredData: SEOAuditResult;
    performance: SEOAuditResult;
    security: SEOAuditResult;
    overallScore: number;
  }> => {
    // Simulate metrics (in real implementation, get from actual measurements)
    const metrics = {
      lcp: 2000,
      fid: 80,
      cls: 0.05,
      loadTime: 2500,
      unoptimizedImages: 2,
      jsSize: 400000
    };

    const coreWebVitals = auditor.auditCoreWebVitals(metrics);
    const metaTags = auditor.auditMetaTags(document);
    const structuredData = auditor.auditStructuredData(document);
    const performance = auditor.auditPerformance(metrics);
    const security = auditor.auditSecurity(document);

    const overallScore = Math.round(
      (coreWebVitals.score + metaTags.score + structuredData.score + 
       performance.score + security.score) / 5
    );

    return {
      coreWebVitals,
      metaTags,
      structuredData,
      performance,
      security,
      overallScore
    };
  };

  return { runFullAudit };
}; 