import { useEffect, useState } from 'react';

// Teknik SEO Interface'leri
export interface TechnicalSEOIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  category: 'meta' | 'structure' | 'performance' | 'accessibility' | 'security' | 'mobile';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  priority: 'critical' | 'high' | 'medium' | 'low';
  fixable: boolean;
  fixDescription?: string;
  codeExample?: string;
  url?: string;
  lineNumber?: number;
}

export interface TechnicalSEOReport {
  timestamp: Date;
  url: string;
  issues: TechnicalSEOIssue[];
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  summary: {
    totalIssues: number;
    errors: number;
    warnings: number;
    info: number;
    criticalIssues: number;
    highPriorityIssues: number;
  };
  recommendations: string[];
  improvements: {
    immediate: TechnicalSEOIssue[];
    shortTerm: TechnicalSEOIssue[];
    longTerm: TechnicalSEOIssue[];
  };
}

export interface SEOElement {
  tag: string;
  attributes: Record<string, string>;
  content?: string;
  lineNumber?: number;
}

export interface PageStructure {
  title: string;
  metaDescription: string;
  metaKeywords: string[];
  headings: { level: number; text: string; id?: string }[];
  images: { src: string; alt?: string; title?: string }[];
  links: { href: string; text: string; rel?: string }[];
  scripts: { src?: string; inline?: string; async?: boolean; defer?: boolean }[];
  stylesheets: { href: string; media?: string }[];
  canonical: string;
  robots: string;
  language: string;
  charset: string;
  viewport: string;
}

export class TechnicalSEOAnalyzer {
  private static instance: TechnicalSEOAnalyzer;
  private observers: Set<(report: TechnicalSEOReport) => void> = new Set();

  private constructor() {}

  static getInstance(): TechnicalSEOAnalyzer {
    if (!TechnicalSEOAnalyzer.instance) {
      TechnicalSEOAnalyzer.instance = new TechnicalSEOAnalyzer();
    }
    return TechnicalSEOAnalyzer.instance;
  }

  // Sayfa yapısını analiz et
  async analyzePageStructure(url: string = window.location.href): Promise<PageStructure> {
    if (typeof window === 'undefined') {
      return {
        title: '',
        metaDescription: '',
        metaKeywords: [],
        headings: [],
        images: [],
        links: [],
        scripts: [],
        stylesheets: [],
        canonical: '',
        robots: '',
        language: '',
        charset: '',
        viewport: ''
      };
    }

    const doc = document;
    const structure: PageStructure = {
      title: doc.title || '',
      metaDescription: '',
      metaKeywords: [],
      headings: [],
      images: [],
      links: [],
      scripts: [],
      stylesheets: [],
      canonical: '',
      robots: '',
      language: doc.documentElement.lang || '',
      charset: doc.characterSet || '',
      viewport: ''
    };

    // Meta etiketleri analiz et
    const metaTags = doc.querySelectorAll('meta');
    metaTags.forEach(meta => {
      const name = meta.getAttribute('name') || meta.getAttribute('property');
      const content = meta.getAttribute('content');

      if (name === 'description') {
        structure.metaDescription = content || '';
      } else if (name === 'keywords') {
        structure.metaKeywords = content?.split(',').map(k => k.trim()) || [];
      } else if (name === 'robots') {
        structure.robots = content || '';
      } else if (name === 'viewport') {
        structure.viewport = content || '';
      }
    });

    // Canonical link
    const canonical = doc.querySelector('link[rel="canonical"]');
    if (canonical) {
      structure.canonical = canonical.getAttribute('href') || '';
    }

    // Başlıkları analiz et
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1));
      structure.headings.push({
        level,
        text: heading.textContent || '',
        id: heading.id || undefined
      });
    });

    // Görselleri analiz et
    const images = doc.querySelectorAll('img');
    images.forEach(img => {
      structure.images.push({
        src: img.src || '',
        alt: img.alt || undefined,
        title: img.title || undefined
      });
    });

    // Linkleri analiz et
    const links = doc.querySelectorAll('a');
    links.forEach(link => {
      structure.links.push({
        href: link.href || '',
        text: link.textContent || '',
        rel: link.rel || undefined
      });
    });

    // Scriptleri analiz et
    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => {
      structure.scripts.push({
        src: script.src || undefined,
        inline: script.innerHTML || undefined,
        async: script.async,
        defer: script.defer
      });
    });

    // Stylesheet'leri analiz et
    const stylesheets = doc.querySelectorAll('link[rel="stylesheet"]');
    stylesheets.forEach(link => {
      structure.stylesheets.push({
        href: link.getAttribute('href') || '',
        media: link.getAttribute('media') || undefined
      });
    });

    return structure;
  }

  // Teknik SEO sorunlarını tespit et
  detectIssues(structure: PageStructure): TechnicalSEOIssue[] {
    const issues: TechnicalSEOIssue[] = [];

    // Title analizi
    if (!structure.title) {
      issues.push({
        id: 'missing-title',
        type: 'error',
        category: 'meta',
        title: 'Eksik Sayfa Başlığı',
        description: 'Sayfa başlığı (title) eksik. Bu SEO için kritik bir sorundur.',
        impact: 'high',
        priority: 'critical',
        fixable: true,
        fixDescription: 'Sayfa başlığı ekleyin: <title>Sayfa Başlığı</title>'
      });
    } else if (structure.title.length < 30) {
      issues.push({
        id: 'short-title',
        type: 'warning',
        category: 'meta',
        title: 'Kısa Sayfa Başlığı',
        description: 'Sayfa başlığı çok kısa. 30-60 karakter arasında olmalı.',
        impact: 'medium',
        priority: 'high',
        fixable: true,
        fixDescription: 'Sayfa başlığını 30-60 karakter arasında yapın'
      });
    } else if (structure.title.length > 60) {
      issues.push({
        id: 'long-title',
        type: 'warning',
        category: 'meta',
        title: 'Uzun Sayfa Başlığı',
        description: 'Sayfa başlığı çok uzun. 60 karakterden az olmalı.',
        impact: 'medium',
        priority: 'medium',
        fixable: true,
        fixDescription: 'Sayfa başlığını 60 karakterden az yapın'
      });
    }

    // Meta description analizi
    if (!structure.metaDescription) {
      issues.push({
        id: 'missing-meta-description',
        type: 'error',
        category: 'meta',
        title: 'Eksik Meta Açıklama',
        description: 'Meta description eksik. Bu arama sonuçlarında görünür.',
        impact: 'high',
        priority: 'critical',
        fixable: true,
        fixDescription: 'Meta description ekleyin: <meta name="description" content="Açıklama">'
      });
    } else if (structure.metaDescription.length < 120) {
      issues.push({
        id: 'short-meta-description',
        type: 'warning',
        category: 'meta',
        title: 'Kısa Meta Açıklama',
        description: 'Meta description çok kısa. 120-160 karakter arasında olmalı.',
        impact: 'medium',
        priority: 'high',
        fixable: true,
        fixDescription: 'Meta description\'ı 120-160 karakter arasında yapın'
      });
    } else if (structure.metaDescription.length > 160) {
      issues.push({
        id: 'long-meta-description',
        type: 'warning',
        category: 'meta',
        title: 'Uzun Meta Açıklama',
        description: 'Meta description çok uzun. 160 karakterden az olmalı.',
        impact: 'medium',
        priority: 'medium',
        fixable: true,
        fixDescription: 'Meta description\'ı 160 karakterden az yapın'
      });
    }

    // Canonical URL analizi
    if (!structure.canonical) {
      issues.push({
        id: 'missing-canonical',
        type: 'warning',
        category: 'structure',
        title: 'Eksik Canonical URL',
        description: 'Canonical URL eksik. Duplicate content sorunlarına neden olabilir.',
        impact: 'medium',
        priority: 'high',
        fixable: true,
        fixDescription: 'Canonical URL ekleyin: <link rel="canonical" href="URL">'
      });
    }

    // H1 analizi
    const h1Count = structure.headings.filter(h => h.level === 1).length;
    if (h1Count === 0) {
      issues.push({
        id: 'missing-h1',
        type: 'error',
        category: 'structure',
        title: 'Eksik H1 Başlığı',
        description: 'Sayfada H1 başlığı yok. Her sayfada bir H1 olmalı.',
        impact: 'high',
        priority: 'critical',
        fixable: true,
        fixDescription: 'Sayfaya bir H1 başlığı ekleyin'
      });
    } else if (h1Count > 1) {
      issues.push({
        id: 'multiple-h1',
        type: 'warning',
        category: 'structure',
        title: 'Birden Fazla H1 Başlığı',
        description: 'Sayfada birden fazla H1 başlığı var. Tek H1 olmalı.',
        impact: 'medium',
        priority: 'high',
        fixable: true,
        fixDescription: 'Sadece bir H1 başlığı bırakın'
      });
    }

    // Görsel alt text analizi
    const imagesWithoutAlt = structure.images.filter(img => !img.alt);
    if (imagesWithoutAlt.length > 0) {
      issues.push({
        id: 'images-without-alt',
        type: 'warning',
        category: 'accessibility',
        title: 'Alt Text Eksik Görseller',
        description: `${imagesWithoutAlt.length} görselde alt text yok.`,
        impact: 'medium',
        priority: 'medium',
        fixable: true,
        fixDescription: 'Tüm görsellere alt text ekleyin'
      });
    }

    // Viewport analizi
    if (!structure.viewport) {
      issues.push({
        id: 'missing-viewport',
        type: 'error',
        category: 'mobile',
        title: 'Eksik Viewport Meta Tag',
        description: 'Viewport meta tag eksik. Mobil uyumluluk için gerekli.',
        impact: 'high',
        priority: 'critical',
        fixable: true,
        fixDescription: 'Viewport meta tag ekleyin: <meta name="viewport" content="width=device-width, initial-scale=1">'
      });
    }

    // Charset analizi
    if (!structure.charset) {
      issues.push({
        id: 'missing-charset',
        type: 'warning',
        category: 'meta',
        title: 'Eksik Charset',
        description: 'Charset tanımlanmamış. Karakter kodlama sorunlarına neden olabilir.',
        impact: 'low',
        priority: 'medium',
        fixable: true,
        fixDescription: 'Charset ekleyin: <meta charset="UTF-8">'
      });
    }

    // Robots meta tag analizi
    if (!structure.robots) {
      issues.push({
        id: 'missing-robots',
        type: 'info',
        category: 'meta',
        title: 'Eksik Robots Meta Tag',
        description: 'Robots meta tag eksik. Arama motoru indekslemesi için önerilir.',
        impact: 'low',
        priority: 'low',
        fixable: true,
        fixDescription: 'Robots meta tag ekleyin: <meta name="robots" content="index, follow">'
      });
    }

    return issues;
  }

  // SEO skoru hesapla
  calculateScore(issues: TechnicalSEOIssue[]): number {
    const weights = {
      error: 10,
      warning: 5,
      info: 2
    };

    const impactWeights = {
      high: 1.0,
      medium: 0.7,
      low: 0.3
    };

    let totalDeduction = 0;
    let maxPossibleScore = 100;

    issues.forEach(issue => {
      const baseDeduction = weights[issue.type];
      const impactMultiplier = impactWeights[issue.impact];
      const deduction = baseDeduction * impactMultiplier;
      totalDeduction += deduction;
    });

    const score = Math.max(0, maxPossibleScore - totalDeduction);
    return Math.round(score);
  }

  // Performans notu belirle
  getGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  // Önerileri oluştur
  generateRecommendations(issues: TechnicalSEOIssue[]): string[] {
    const recommendations: string[] = [];

    const criticalIssues = issues.filter(i => i.priority === 'critical');
    const highPriorityIssues = issues.filter(i => i.priority === 'high');

    if (criticalIssues.length > 0) {
      recommendations.push('Kritik sorunları hemen düzeltin');
    }

    if (highPriorityIssues.length > 0) {
      recommendations.push('Yüksek öncelikli sorunları kısa sürede çözün');
    }

    if (issues.filter(i => i.category === 'meta').length > 0) {
      recommendations.push('Meta etiketlerini optimize edin');
    }

    if (issues.filter(i => i.category === 'structure').length > 0) {
      recommendations.push('Sayfa yapısını iyileştirin');
    }

    if (issues.filter(i => i.category === 'accessibility').length > 0) {
      recommendations.push('Erişilebilirlik sorunlarını giderin');
    }

    if (issues.filter(i => i.category === 'mobile').length > 0) {
      recommendations.push('Mobil uyumluluğu artırın');
    }

    recommendations.push('Teknik SEO kontrollerini düzenli olarak yapın');
    recommendations.push('Performans metriklerini sürekli izleyin');

    return recommendations;
  }

  // İyileştirmeleri kategorize et
  categorizeImprovements(issues: TechnicalSEOIssue[]) {
    const immediate = issues.filter(i => i.priority === 'critical');
    const shortTerm = issues.filter(i => i.priority === 'high');
    const longTerm = issues.filter(i => i.priority === 'medium' || i.priority === 'low');

    return { immediate, shortTerm, longTerm };
  }

  // Teknik SEO raporu oluştur
  async generateReport(url: string = window.location.href): Promise<TechnicalSEOReport> {
    const structure = await this.analyzePageStructure(url);
    const issues = this.detectIssues(structure);
    const score = this.calculateScore(issues);
    const grade = this.getGrade(score);
    const recommendations = this.generateRecommendations(issues);
    const improvements = this.categorizeImprovements(issues);

    const summary = {
      totalIssues: issues.length,
      errors: issues.filter(i => i.type === 'error').length,
      warnings: issues.filter(i => i.type === 'warning').length,
      info: issues.filter(i => i.type === 'info').length,
      criticalIssues: issues.filter(i => i.priority === 'critical').length,
      highPriorityIssues: issues.filter(i => i.priority === 'high').length
    };

    const report: TechnicalSEOReport = {
      timestamp: new Date(),
      url,
      issues,
      score,
      grade,
      summary,
      recommendations,
      improvements
    };

    return report;
  }

  // Observer ekle
  addObserver(observer: (report: TechnicalSEOReport) => void): void {
    this.observers.add(observer);
  }

  // Observer kaldır
  removeObserver(observer: (report: TechnicalSEOReport) => void): void {
    this.observers.delete(observer);
  }

  // Observer'ları bilgilendir
  private notifyObservers(report: TechnicalSEOReport): void {
    this.observers.forEach(observer => {
      try {
        observer(report);
      } catch (error) {
        console.error('Observer hatası:', error);
      }
    });
  }

  // Otomatik düzeltme önerileri
  async suggestFixes(issue: TechnicalSEOIssue): Promise<string[]> {
    const fixes: string[] = [];

    switch (issue.id) {
      case 'missing-title':
        fixes.push('Sayfa başlığı ekleyin');
        fixes.push('Başlık 30-60 karakter arasında olmalı');
        fixes.push('Anahtar kelimeleri başlıkta kullanın');
        break;
      case 'missing-meta-description':
        fixes.push('Meta description ekleyin');
        fixes.push('Açıklama 120-160 karakter arasında olmalı');
        fixes.push('Anahtar kelimeleri açıklamada kullanın');
        break;
      case 'missing-canonical':
        fixes.push('Canonical URL ekleyin');
        fixes.push('Kendine referans veren canonical kullanın');
        break;
      case 'missing-h1':
        fixes.push('H1 başlığı ekleyin');
        fixes.push('Sadece bir H1 kullanın');
        fixes.push('Anahtar kelimeleri H1\'de kullanın');
        break;
      case 'images-without-alt':
        fixes.push('Tüm görsellere alt text ekleyin');
        fixes.push('Alt text açıklayıcı olmalı');
        break;
      case 'missing-viewport':
        fixes.push('Viewport meta tag ekleyin');
        fixes.push('Mobil uyumlu viewport kullanın');
        break;
      default:
        fixes.push('Sorunu manuel olarak kontrol edin');
        fixes.push('SEO best practice\'lerini takip edin');
    }

    return fixes;
  }
}

// React Hook
export function useTechnicalSEO() {
  const [report, setReport] = useState<TechnicalSEOReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzer = TechnicalSEOAnalyzer.getInstance();

  const analyzePage = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const newReport = await analyzer.generateReport();
      setReport(newReport);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
    } finally {
      setIsLoading(false);
    }
  };

  const suggestFixes = async (issue: TechnicalSEOIssue) => {
    return await analyzer.suggestFixes(issue);
  };

  return {
    report,
    isLoading,
    error,
    analyzePage,
    suggestFixes
  };
}

export default TechnicalSEOAnalyzer; 