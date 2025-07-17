// Otomatik İç Linkleme Sistemi
export interface InternalLink {
  id: string;
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  keyword: string;
  relevance: number;
  suggested: boolean;
  implemented: boolean;
  createdAt: Date;
  implementedAt?: Date;
}

export interface LinkOpportunity {
  id: string;
  sourcePage: string;
  targetPage: string;
  keyword: string;
  context: string;
  relevance: number;
  impact: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
  suggestedAnchorText: string;
  reason: string;
}

export interface PageContent {
  url: string;
  title: string;
  content: string;
  keywords: string[];
  category: string;
  lastUpdated: Date;
}

export interface LinkAnalysis {
  totalLinks: number;
  internalLinks: number;
  externalLinks: number;
  brokenLinks: number;
  opportunities: LinkOpportunity[];
  recommendations: string[];
}

export class InternalLinker {
  private pages: PageContent[] = [];
  private links: InternalLink[] = [];
  private keywords: string[] = [];

  constructor() {
    this.initializePages();
    this.initializeKeywords();
  }

  private initializePages(): void {
    this.pages = [
      {
        url: '/',
        title: 'OW - Optimize the World | Akıllı Şehir Çözümleri',
        content: 'OW, akıllı şehirler için veri odaklı çözümler sunan teknoloji şirketi. Toplu taşıma optimizasyonu, akıllı hareketlilik ve ulaşım teknolojileri.',
        keywords: ['akıllı şehir', 'toplu taşıma', 'ulaşım optimizasyonu', 'OW'],
        category: 'home',
        lastUpdated: new Date()
      },
      {
        url: '/solutions',
        title: 'Çözümlerimiz | OW',
        content: 'Akıllı şehir çözümlerimiz: OW TransitOpt™, OW FleetOpt™, OW RiderSense™, OW CostLogic™, OW DRT™, OW Accessibility™, OW ODMatrix™, OW Intelligence™.',
        keywords: ['akıllı şehir çözümleri', 'transit optimizasyonu', 'fleet yönetimi', 'yolcu analizi'],
        category: 'solutions',
        lastUpdated: new Date()
      },
      {
        url: '/about',
        title: 'Hakkımızda | OW',
        content: 'OW (Optimize the World), küresel ölçekte şehirlerin karşılaştığı kentsel hareketlilik sorunlarına bilimsel ve teknolojik çözümler sunmak üzere yola çıktık.',
        keywords: ['OW', 'Optimize the World', 'akıllı şehir', 'kentsel hareketlilik'],
        category: 'about',
        lastUpdated: new Date()
      },
      {
        url: '/contact',
        title: 'İletişim | OW',
        content: 'OW ile iletişime geçin. Akıllı şehir çözümlerimiz hakkında bilgi alın ve demo talep edin.',
        keywords: ['iletişim', 'demo', 'OW iletişim', 'akıllı şehir çözümleri'],
        category: 'contact',
        lastUpdated: new Date()
      }
    ];
  }

  private initializeKeywords(): void {
    this.keywords = [
      'akıllı şehir',
      'toplu taşıma',
      'ulaşım optimizasyonu',
      'OW',
      'transit optimizasyonu',
      'fleet yönetimi',
      'yolcu analizi',
      'kentsel hareketlilik',
      'veri analizi',
      'yapay zeka',
      'sürdürülebilir ulaşım',
      'şehir planlama',
      'trafik yönetimi',
      'mobilite',
      'teknoloji çözümleri'
    ];
  }

  // İçerik Analizi ve Link Fırsatları Bulma
  analyzeContent(content: string, currentUrl: string): LinkOpportunity[] {
    const opportunities: LinkOpportunity[] = [];
    const lowerContent = content.toLowerCase();

    // Her sayfa için potansiyel link fırsatlarını kontrol et
    this.pages.forEach(page => {
      if (page.url === currentUrl) return; // Kendine link verme

      // Sayfa anahtar kelimelerini kontrol et
      page.keywords.forEach(keyword => {
        const keywordRegex = new RegExp(keyword, 'gi');
        const matches = lowerContent.match(keywordRegex);
        
        if (matches && matches.length > 0) {
          // Anahtar kelime bulundu, link fırsatı var
          const context = this.extractContext(content, keyword);
          const relevance = this.calculateRelevance(keyword, page.keywords);
          
          opportunities.push({
            id: `link_${Date.now()}_${Math.random()}`,
            sourcePage: currentUrl,
            targetPage: page.url,
            keyword: keyword,
            context: context,
            relevance: relevance,
            impact: this.calculateImpact(relevance, page.category),
            difficulty: this.calculateDifficulty(keyword, content),
            suggestedAnchorText: this.generateAnchorText(keyword, page.title),
            reason: `"${keyword}" anahtar kelimesi bulundu ve "${page.title}" sayfasına link verilebilir`
          });
        }
      });
    });

    // Relevance'a göre sırala
    return opportunities.sort((a, b) => b.relevance - a.relevance);
  }

  // İçerikten Bağlam Çıkarma
  private extractContext(content: string, keyword: string): string {
    const keywordIndex = content.toLowerCase().indexOf(keyword.toLowerCase());
    if (keywordIndex === -1) return '';

    const start = Math.max(0, keywordIndex - 50);
    const end = Math.min(content.length, keywordIndex + keyword.length + 50);
    
    return content.substring(start, end).trim();
  }

  // İlgi Skoru Hesaplama
  private calculateRelevance(keyword: string, targetKeywords: string[]): number {
    let relevance = 0;

    // Anahtar kelime eşleşmesi
    if (targetKeywords.includes(keyword)) {
      relevance += 50;
    }

    // Benzer anahtar kelimeler
    const similarKeywords = targetKeywords.filter(k => 
      k.includes(keyword) || keyword.includes(k)
    );
    relevance += similarKeywords.length * 20;

    // Kategori uyumu
    relevance += 10;

    return Math.min(100, relevance);
  }

  // Etki Hesaplama
  private calculateImpact(relevance: number, category: string): 'high' | 'medium' | 'low' {
    if (relevance >= 70) return 'high';
    if (relevance >= 40) return 'medium';
    return 'low';
  }

  // Zorluk Hesaplama
  private calculateDifficulty(keyword: string, content: string): 'easy' | 'medium' | 'hard' {
    const keywordCount = (content.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
    
    if (keywordCount >= 3) return 'easy';
    if (keywordCount >= 1) return 'medium';
    return 'hard';
  }

  // Anchor Text Önerisi
  private generateAnchorText(keyword: string, pageTitle: string): string {
    // Sayfa başlığından uygun anchor text oluştur
    const titleWords = pageTitle.split(' ').slice(0, 3);
    return titleWords.join(' ');
  }

  // Otomatik Link Ekleme
  addInternalLinks(content: string, currentUrl: string): {
    optimizedContent: string;
    addedLinks: InternalLink[];
    removedLinks: InternalLink[];
  } {
    const opportunities = this.analyzeContent(content, currentUrl);
    let optimizedContent = content;
    const addedLinks: InternalLink[] = [];
    const removedLinks: InternalLink[] = [];

    // Yüksek öncelikli fırsatları uygula
    opportunities
      .filter(opp => opp.impact === 'high' && opp.relevance >= 70)
      .slice(0, 3) // En fazla 3 link ekle
      .forEach(opportunity => {
        const link = this.createInternalLink(opportunity);
        
        // İçeriğe link ekle
        optimizedContent = this.insertLink(optimizedContent, opportunity);
        
        addedLinks.push(link);
        this.links.push(link);
      });

    return {
      optimizedContent,
      addedLinks,
      removedLinks
    };
  }

  // İç Link Oluşturma
  private createInternalLink(opportunity: LinkOpportunity): InternalLink {
    return {
      id: opportunity.id,
      sourceUrl: opportunity.sourcePage,
      targetUrl: opportunity.targetPage,
      anchorText: opportunity.suggestedAnchorText,
      keyword: opportunity.keyword,
      relevance: opportunity.relevance,
      suggested: true,
      implemented: true,
      createdAt: new Date(),
      implementedAt: new Date()
    };
  }

  // İçeriğe Link Ekleme
  private insertLink(content: string, opportunity: LinkOpportunity): string {
    const keywordRegex = new RegExp(`(${opportunity.keyword})`, 'gi');
    const replacement = `<a href="${opportunity.targetPage}" title="${opportunity.suggestedAnchorText}">$1</a>`;
    
    // İlk eşleşmeyi değiştir
    return content.replace(keywordRegex, replacement);
  }

  // Link Analizi
  analyzeLinks(url: string): LinkAnalysis {
    const pageLinks = this.links.filter(link => link.sourceUrl === url);
    const totalLinks = pageLinks.length;
    const internalLinks = pageLinks.filter(link => link.targetUrl.startsWith('/')).length;
    const externalLinks = totalLinks - internalLinks;
    const brokenLinks = this.checkBrokenLinks(pageLinks);

    const opportunities = this.analyzeContent('', url); // Boş içerik ile fırsatları analiz et

    const recommendations: string[] = [];
    
    if (internalLinks < 3) {
      recommendations.push('Daha fazla iç link ekleyin (en az 3 önerilir)');
    }
    
    if (brokenLinks > 0) {
      recommendations.push(`${brokenLinks} bozuk link tespit edildi, düzeltin`);
    }

    return {
      totalLinks,
      internalLinks,
      externalLinks,
      brokenLinks,
      opportunities,
      recommendations
    };
  }

  // Bozuk Link Kontrolü
  private checkBrokenLinks(links: InternalLink[]): number {
    // Gerçek uygulamada burada HTTP istekleri yapılır
    // Şimdilik mock data
    return 0;
  }

  // Sayfa İçeriklerini Güncelleme
  updatePageContent(url: string, content: PageContent): void {
    const existingIndex = this.pages.findIndex(page => page.url === url);
    
    if (existingIndex >= 0) {
      this.pages[existingIndex] = content;
    } else {
      this.pages.push(content);
    }
  }

  // Anahtar Kelime Ekleme
  addKeyword(keyword: string): void {
    if (!this.keywords.includes(keyword)) {
      this.keywords.push(keyword);
    }
  }

  // Link Önerilerini Alma
  getLinkSuggestions(url: string): LinkOpportunity[] {
    return this.analyzeContent('', url)
      .filter(opp => opp.impact === 'high' || opp.impact === 'medium')
      .sort((a, b) => b.relevance - a.relevance);
  }

  // Uygulanmış Linkleri Alma
  getImplementedLinks(url: string): InternalLink[] {
    return this.links.filter(link => 
      link.sourceUrl === url && link.implemented
    );
  }

  // Link İstatistikleri
  getLinkStatistics(): {
    totalLinks: number;
    internalLinks: number;
    externalLinks: number;
    averageRelevance: number;
    topKeywords: string[];
  } {
    const totalLinks = this.links.length;
    const internalLinks = this.links.filter(link => link.targetUrl.startsWith('/')).length;
    const externalLinks = totalLinks - internalLinks;
    const averageRelevance = this.links.reduce((sum, link) => sum + link.relevance, 0) / totalLinks || 0;
    
    // En çok kullanılan anahtar kelimeler
    const keywordCounts: { [key: string]: number } = {};
    this.links.forEach(link => {
      keywordCounts[link.keyword] = (keywordCounts[link.keyword] || 0) + 1;
    });
    
    const topKeywords = Object.entries(keywordCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([keyword]) => keyword);

    return {
      totalLinks,
      internalLinks,
      externalLinks,
      averageRelevance,
      topKeywords
    };
  }

  // Akıllı Link Önerisi
  suggestSmartLinks(content: string, currentUrl: string): {
    suggestedLinks: LinkOpportunity[];
    contentWithLinks: string;
    seoImpact: number;
  } {
    const opportunities = this.analyzeContent(content, currentUrl);
    let contentWithLinks = content;
    let seoImpact = 0;

    // En iyi fırsatları uygula
    opportunities
      .filter(opp => opp.impact === 'high' && opp.relevance >= 60)
      .slice(0, 2)
      .forEach(opportunity => {
        contentWithLinks = this.insertLink(contentWithLinks, opportunity);
        seoImpact += opportunity.relevance * 0.1; // SEO etkisi hesaplama
      });

    return {
      suggestedLinks: opportunities.filter(opp => opp.impact === 'high'),
      contentWithLinks,
      seoImpact: Math.min(100, seoImpact)
    };
  }
}

// Internal Linker Hook
export const useInternalLinker = () => {
  const linker = new InternalLinker();

  const analyzeContent = (content: string, url: string) => {
    return linker.analyzeContent(content, url);
  };

  const addInternalLinks = (content: string, url: string) => {
    return linker.addInternalLinks(content, url);
  };

  const analyzeLinks = (url: string) => {
    return linker.analyzeLinks(url);
  };

  const getLinkSuggestions = (url: string) => {
    return linker.getLinkSuggestions(url);
  };

  const getImplementedLinks = (url: string) => {
    return linker.getImplementedLinks(url);
  };

  const getLinkStatistics = () => {
    return linker.getLinkStatistics();
  };

  const suggestSmartLinks = (content: string, url: string) => {
    return linker.suggestSmartLinks(content, url);
  };

  return {
    analyzeContent,
    addInternalLinks,
    analyzeLinks,
    getLinkSuggestions,
    getImplementedLinks,
    getLinkStatistics,
    suggestSmartLinks
  };
}; 