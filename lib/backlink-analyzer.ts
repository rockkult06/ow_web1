// Gelişmiş Backlink Analizi ve Yönetimi Sistemi
export interface Backlink {
  id: string;
  sourceUrl: string;
  sourceDomain: string;
  targetUrl: string;
  targetDomain: string;
  anchorText: string;
  followType: 'dofollow' | 'nofollow' | 'sponsored' | 'ugc';
  domainAuthority: number;
  pageAuthority: number;
  spamScore: number;
  trustFlow: number;
  citationFlow: number;
  firstSeen: Date;
  lastSeen: Date;
  status: 'active' | 'lost' | 'new' | 'discovered';
  quality: 'high' | 'medium' | 'low' | 'toxic';
  category: BacklinkCategory;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BacklinkCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  priority: 'high' | 'medium' | 'low';
}

export interface BacklinkAnalysis {
  totalBacklinks: number;
  activeBacklinks: number;
  lostBacklinks: number;
  newBacklinks: number;
  averageDomainAuthority: number;
  averagePageAuthority: number;
  dofollowPercentage: number;
  nofollowPercentage: number;
  toxicBacklinks: number;
  highQualityBacklinks: number;
  domainDiversity: number;
  anchorTextDistribution: AnchorTextDistribution[];
  topReferringDomains: TopReferringDomain[];
  backlinkGrowth: BacklinkGrowth[];
  recommendations: BacklinkRecommendation[];
}

export interface AnchorTextDistribution {
  anchorText: string;
  count: number;
  percentage: number;
  type: 'branded' | 'keyword' | 'generic' | 'naked';
}

export interface TopReferringDomain {
  domain: string;
  backlinkCount: number;
  averageAuthority: number;
  lastSeen: Date;
  category: string;
}

export interface BacklinkGrowth {
  date: Date;
  totalBacklinks: number;
  newBacklinks: number;
  lostBacklinks: number;
  netGrowth: number;
}

export interface BacklinkRecommendation {
  type: 'disavow' | 'outreach' | 'content' | 'monitoring';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action: string;
  impact: string;
  effort: string;
}

export interface BacklinkOutreach {
  id: string;
  targetDomain: string;
  contactEmail: string;
  contactName: string;
  outreachType: 'guest_post' | 'link_building' | 'partnership' | 'resource_link';
  status: 'pending' | 'sent' | 'replied' | 'accepted' | 'rejected';
  message: string;
  followUpDate: Date;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BacklinkMonitoring {
  id: string;
  backlinkId: string;
  checkDate: Date;
  status: 'active' | 'lost' | 'new' | 'discovered' | 'changed';
  changes: BacklinkChange[];
  alerts: string[];
}

export interface BacklinkChange {
  field: string;
  oldValue: any;
  newValue: any;
  changeDate: Date;
}

export class BacklinkAnalyzer {
  private backlinks: Backlink[] = [];
  private categories: BacklinkCategory[] = [];
  private outreach: BacklinkOutreach[] = [];
  private monitoring: BacklinkMonitoring[] = [];

  constructor() {
    this.initializeCategories();
    this.initializeSampleData();
  }

  private initializeCategories(): void {
    this.categories = [
      {
        id: 'guest_posts',
        name: 'Guest Posts',
        description: 'Misafir yazıları ve blog katkıları',
        color: '#3B82F6',
        priority: 'high'
      },
      {
        id: 'resource_links',
        name: 'Resource Links',
        description: 'Kaynak sayfalarından gelen linkler',
        color: '#10B981',
        priority: 'high'
      },
      {
        id: 'partnerships',
        name: 'Partnerships',
        description: 'İş ortaklığı linkleri',
        color: '#F59E0B',
        priority: 'medium'
      },
      {
        id: 'directories',
        name: 'Directories',
        description: 'Dizin ve liste siteleri',
        color: '#8B5CF6',
        priority: 'low'
      },
      {
        id: 'social_media',
        name: 'Social Media',
        description: 'Sosyal medya linkleri',
        color: '#EC4899',
        priority: 'low'
      },
      {
        id: 'toxic',
        name: 'Toxic Links',
        description: 'Zararlı ve spam linkler',
        color: '#EF4444',
        priority: 'high'
      }
    ];
  }

  private initializeSampleData(): void {
    this.backlinks = [
      {
        id: 'backlink_1',
        sourceUrl: 'https://techcrunch.com/smart-city-innovations',
        sourceDomain: 'techcrunch.com',
        targetUrl: 'https://optimizeworld.net/solutions/smart-city',
        targetDomain: 'optimizeworld.net',
        anchorText: 'akıllı şehir çözümleri',
        followType: 'dofollow',
        domainAuthority: 92,
        pageAuthority: 85,
        spamScore: 2,
        trustFlow: 85,
        citationFlow: 78,
        firstSeen: new Date('2024-01-15'),
        lastSeen: new Date('2024-01-20'),
        status: 'active',
        quality: 'high',
        category: this.categories[0],
        notes: 'Yüksek kaliteli guest post',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20')
      },
      {
        id: 'backlink_2',
        sourceUrl: 'https://mashable.com/urban-mobility-solutions',
        sourceDomain: 'mashable.com',
        targetUrl: 'https://optimizeworld.net/solutions/transport',
        targetDomain: 'optimizeworld.net',
        anchorText: 'OW',
        followType: 'dofollow',
        domainAuthority: 88,
        pageAuthority: 72,
        spamScore: 4,
        trustFlow: 82,
        citationFlow: 75,
        firstSeen: new Date('2024-01-10'),
        lastSeen: new Date('2024-01-18'),
        status: 'active',
        quality: 'high',
        category: this.categories[1],
        notes: 'Resource link from high authority site',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-18')
      },
      {
        id: 'backlink_3',
        sourceUrl: 'https://spam-site.com/fake-link',
        sourceDomain: 'spam-site.com',
        targetUrl: 'https://optimizeworld.net',
        targetDomain: 'optimizeworld.net',
        anchorText: 'click here',
        followType: 'dofollow',
        domainAuthority: 15,
        pageAuthority: 8,
        spamScore: 85,
        trustFlow: 12,
        citationFlow: 5,
        firstSeen: new Date('2024-01-05'),
        lastSeen: new Date('2024-01-05'),
        status: 'active',
        quality: 'toxic',
        category: this.categories[5],
        notes: 'Toxic spam link - should disavow',
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05')
      },
      {
        id: 'backlink_4',
        sourceUrl: 'https://startup-weekly.com/transportation-tech',
        sourceDomain: 'startup-weekly.com',
        targetUrl: 'https://optimizeworld.net/about',
        targetDomain: 'optimizeworld.net',
        anchorText: 'transportation optimization',
        followType: 'dofollow',
        domainAuthority: 65,
        pageAuthority: 58,
        spamScore: 8,
        trustFlow: 68,
        citationFlow: 62,
        firstSeen: new Date('2024-01-12'),
        lastSeen: new Date('2024-01-19'),
        status: 'active',
        quality: 'medium',
        category: this.categories[2],
        notes: 'Partnership link',
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date('2024-01-19')
      }
    ];
  }

  // Backlink Analizi
  analyzeBacklinks(): BacklinkAnalysis {
    const totalBacklinks = this.backlinks.length;
    const activeBacklinks = this.backlinks.filter(b => b.status === 'active').length;
    const lostBacklinks = this.backlinks.filter(b => b.status === 'lost').length;
    const newBacklinks = this.backlinks.filter(b => b.status === 'new').length;

    const averageDomainAuthority = this.backlinks.reduce((sum, b) => sum + b.domainAuthority, 0) / totalBacklinks;
    const averagePageAuthority = this.backlinks.reduce((sum, b) => sum + b.pageAuthority, 0) / totalBacklinks;

    const dofollowCount = this.backlinks.filter(b => b.followType === 'dofollow').length;
    const nofollowCount = this.backlinks.filter(b => b.followType === 'nofollow').length;
    const dofollowPercentage = (dofollowCount / totalBacklinks) * 100;
    const nofollowPercentage = (nofollowCount / totalBacklinks) * 100;

    const toxicBacklinks = this.backlinks.filter(b => b.quality === 'toxic').length;
    const highQualityBacklinks = this.backlinks.filter(b => b.quality === 'high').length;

    const uniqueDomains = new Set(this.backlinks.map(b => b.sourceDomain)).size;
    const domainDiversity = (uniqueDomains / totalBacklinks) * 100;

    const anchorTextDistribution = this.analyzeAnchorTextDistribution();
    const topReferringDomains = this.getTopReferringDomains();
    const backlinkGrowth = this.calculateBacklinkGrowth();
    const recommendations = this.generateBacklinkRecommendations();

    return {
      totalBacklinks,
      activeBacklinks,
      lostBacklinks,
      newBacklinks,
      averageDomainAuthority,
      averagePageAuthority,
      dofollowPercentage,
      nofollowPercentage,
      toxicBacklinks,
      highQualityBacklinks,
      domainDiversity,
      anchorTextDistribution,
      topReferringDomains,
      backlinkGrowth,
      recommendations
    };
  }

  // Anchor Text Dağılımı Analizi
  private analyzeAnchorTextDistribution(): AnchorTextDistribution[] {
    const anchorTexts = this.backlinks.map(b => b.anchorText);
    const distribution: { [key: string]: number } = {};

    anchorTexts.forEach(text => {
      distribution[text] = (distribution[text] || 0) + 1;
    });

    const total = anchorTexts.length;
    const result: AnchorTextDistribution[] = Object.entries(distribution).map(([text, count]) => {
      const percentage = (count / total) * 100;
      let type: 'branded' | 'keyword' | 'generic' | 'naked';

      if (text.toLowerCase().includes('ow') || text.toLowerCase().includes('optimize')) {
        type = 'branded';
      } else if (text.toLowerCase().includes('akıllı') || text.toLowerCase().includes('transport')) {
        type = 'keyword';
      } else if (text.toLowerCase().includes('click') || text.toLowerCase().includes('here')) {
        type = 'generic';
      } else {
        type = 'naked';
      }

      return {
        anchorText: text,
        count,
        percentage,
        type
      };
    });

    return result.sort((a, b) => b.count - a.count);
  }

  // En İyi Referans Eden Domainler
  private getTopReferringDomains(): TopReferringDomain[] {
    const domainStats: { [key: string]: { count: number; totalAuthority: number; lastSeen: Date } } = {};

    this.backlinks.forEach(backlink => {
      if (!domainStats[backlink.sourceDomain]) {
        domainStats[backlink.sourceDomain] = {
          count: 0,
          totalAuthority: 0,
          lastSeen: backlink.lastSeen
        };
      }

      domainStats[backlink.sourceDomain].count++;
      domainStats[backlink.sourceDomain].totalAuthority += backlink.domainAuthority;
      if (backlink.lastSeen > domainStats[backlink.sourceDomain].lastSeen) {
        domainStats[backlink.sourceDomain].lastSeen = backlink.lastSeen;
      }
    });

    return Object.entries(domainStats)
      .map(([domain, stats]) => ({
        domain,
        backlinkCount: stats.count,
        averageAuthority: stats.totalAuthority / stats.count,
        lastSeen: stats.lastSeen,
        category: this.getDomainCategory(domain)
      }))
      .sort((a, b) => b.backlinkCount - a.backlinkCount)
      .slice(0, 10);
  }

  // Domain Kategorisi Belirleme
  private getDomainCategory(domain: string): string {
    if (domain.includes('tech') || domain.includes('startup')) {
      return 'Technology';
    } else if (domain.includes('news') || domain.includes('media')) {
      return 'News & Media';
    } else if (domain.includes('spam')) {
      return 'Spam';
    } else {
      return 'Other';
    }
  }

  // Backlink Büyüme Analizi
  private calculateBacklinkGrowth(): BacklinkGrowth[] {
    const growth: BacklinkGrowth[] = [];
    const dates = this.getLast30Days();

    dates.forEach(date => {
      const backlinksOnDate = this.backlinks.filter(b => 
        b.firstSeen <= date && b.lastSeen >= date
      ).length;

      const newBacklinksOnDate = this.backlinks.filter(b => 
        b.firstSeen.toDateString() === date.toDateString()
      ).length;

      const lostBacklinksOnDate = this.backlinks.filter(b => 
        b.status === 'lost' && b.lastSeen.toDateString() === date.toDateString()
      ).length;

      growth.push({
        date,
        totalBacklinks: backlinksOnDate,
        newBacklinks: newBacklinksOnDate,
        lostBacklinks: lostBacklinksOnDate,
        netGrowth: newBacklinksOnDate - lostBacklinksOnDate
      });
    });

    return growth;
  }

  // Son 30 Günü Al
  private getLast30Days(): Date[] {
    const dates: Date[] = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      dates.push(date);
    }

    return dates;
  }

  // Backlink Önerileri
  private generateBacklinkRecommendations(): BacklinkRecommendation[] {
    const recommendations: BacklinkRecommendation[] = [];

    // Toxic backlink analizi
    const toxicBacklinks = this.backlinks.filter(b => b.quality === 'toxic');
    if (toxicBacklinks.length > 0) {
      recommendations.push({
        type: 'disavow',
        priority: 'high',
        title: 'Toxic Backlinkleri Disavow Et',
        description: `${toxicBacklinks.length} adet zararlı backlink tespit edildi`,
        action: 'Google Search Console\'da disavow dosyası oluştur',
        impact: 'Spam skorunu düşürür ve domain otoritesini korur',
        effort: 'Düşük - 1-2 saat'
      });
    }

    // Düşük kaliteli backlink analizi
    const lowQualityBacklinks = this.backlinks.filter(b => b.quality === 'low');
    if (lowQualityBacklinks.length > 5) {
      recommendations.push({
        type: 'outreach',
        priority: 'medium',
        title: 'Kaliteli Backlink Kampanyası Başlat',
        description: 'Düşük kaliteli backlinklerin yerine kaliteli linkler kazan',
        action: 'Guest posting ve partnership kampanyası başlat',
        impact: 'Domain otoritesini artırır',
        effort: 'Yüksek - 2-3 ay'
      });
    }

    // Anchor text çeşitliliği
    const brandedAnchors = this.backlinks.filter(b => 
      b.anchorText.toLowerCase().includes('ow') || 
      b.anchorText.toLowerCase().includes('optimize')
    ).length;

    if (brandedAnchors < this.backlinks.length * 0.3) {
      recommendations.push({
        type: 'content',
        priority: 'medium',
        title: 'Branded Anchor Text Çeşitliliği',
        description: 'Marka adı içeren anchor text oranını artır',
        action: 'İçerik stratejisini güncelle ve branded linkler için çalış',
        impact: 'Marka bilinirliğini artırır',
        effort: 'Orta - 1-2 ay'
      });
    }

    // Domain çeşitliliği
    const uniqueDomains = new Set(this.backlinks.map(b => b.sourceDomain)).size;
    if (uniqueDomains < this.backlinks.length * 0.8) {
      recommendations.push({
        type: 'outreach',
        priority: 'low',
        title: 'Domain Çeşitliliğini Artır',
        description: 'Farklı domainlerden backlink kazan',
        action: 'Yeni domainler için outreach kampanyası başlat',
        impact: 'Backlink profili çeşitliliğini artırır',
        effort: 'Yüksek - 3-6 ay'
      });
    }

    return recommendations;
  }

  // Backlink Ekleme
  addBacklink(backlinkData: Omit<Backlink, 'id' | 'createdAt' | 'updatedAt'>): string {
    const id = `backlink_${Date.now()}`;
    const backlink: Backlink = {
      ...backlinkData,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.backlinks.push(backlink);
    return id;
  }

  // Backlink Güncelleme
  updateBacklink(backlinkId: string, updates: Partial<Backlink>): void {
    const index = this.backlinks.findIndex(b => b.id === backlinkId);
    if (index === -1) {
      throw new Error(`Backlink bulunamadı: ${backlinkId}`);
    }

    this.backlinks[index] = {
      ...this.backlinks[index],
      ...updates,
      updatedAt: new Date()
    };
  }

  // Backlink Silme
  deleteBacklink(backlinkId: string): void {
    const index = this.backlinks.findIndex(b => b.id === backlinkId);
    if (index !== -1) {
      this.backlinks.splice(index, 1);
    }
  }

  // Outreach Kampanyası Oluşturma
  createOutreach(outreachData: Omit<BacklinkOutreach, 'id' | 'createdAt' | 'updatedAt'>): string {
    const id = `outreach_${Date.now()}`;
    const outreach: BacklinkOutreach = {
      ...outreachData,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.outreach.push(outreach);
    return id;
  }

  // Outreach Güncelleme
  updateOutreach(outreachId: string, updates: Partial<BacklinkOutreach>): void {
    const index = this.outreach.findIndex(o => o.id === outreachId);
    if (index === -1) {
      throw new Error(`Outreach bulunamadı: ${outreachId}`);
    }

    this.outreach[index] = {
      ...this.outreach[index],
      ...updates,
      updatedAt: new Date()
    };
  }

  // Backlink İzleme
  monitorBacklink(backlinkId: string): BacklinkMonitoring {
    const backlink = this.backlinks.find(b => b.id === backlinkId);
    if (!backlink) {
      throw new Error(`Backlink bulunamadı: ${backlinkId}`);
    }

    const monitoring: BacklinkMonitoring = {
      id: `monitoring_${Date.now()}`,
      backlinkId,
      checkDate: new Date(),
      status: backlink.status,
      changes: [],
      alerts: []
    };

    // Backlink durumunu kontrol et
    if (backlink.spamScore > 50) {
      monitoring.alerts.push('Yüksek spam skoru');
    }

    if (backlink.domainAuthority < 20) {
      monitoring.alerts.push('Düşük domain otoritesi');
    }

    if (backlink.quality === 'toxic') {
      monitoring.alerts.push('Toxic backlink - disavow önerilir');
    }

    this.monitoring.push(monitoring);
    return monitoring;
  }

  // Public Methods
  getBacklinks(): Backlink[] {
    return this.backlinks;
  }

  getBacklinkById(id: string): Backlink | undefined {
    return this.backlinks.find(b => b.id === id);
  }

  getCategories(): BacklinkCategory[] {
    return this.categories;
  }

  getOutreach(): BacklinkOutreach[] {
    return this.outreach;
  }

  getMonitoring(): BacklinkMonitoring[] {
    return this.monitoring;
  }

  getBacklinksByQuality(quality: Backlink['quality']): Backlink[] {
    return this.backlinks.filter(b => b.quality === quality);
  }

  getBacklinksByCategory(categoryId: string): Backlink[] {
    return this.backlinks.filter(b => b.category.id === categoryId);
  }
}

// Backlink Analyzer Hook
export const useBacklinkAnalyzer = () => {
  const analyzer = new BacklinkAnalyzer();

  const analyzeBacklinks = () => {
    return analyzer.analyzeBacklinks();
  };

  const addBacklink = (backlinkData: Omit<Backlink, 'id' | 'createdAt' | 'updatedAt'>) => {
    return analyzer.addBacklink(backlinkData);
  };

  const updateBacklink = (backlinkId: string, updates: Partial<Backlink>) => {
    return analyzer.updateBacklink(backlinkId, updates);
  };

  const deleteBacklink = (backlinkId: string) => {
    return analyzer.deleteBacklink(backlinkId);
  };

  const createOutreach = (outreachData: Omit<BacklinkOutreach, 'id' | 'createdAt' | 'updatedAt'>) => {
    return analyzer.createOutreach(outreachData);
  };

  const updateOutreach = (outreachId: string, updates: Partial<BacklinkOutreach>) => {
    return analyzer.updateOutreach(outreachId, updates);
  };

  const monitorBacklink = (backlinkId: string) => {
    return analyzer.monitorBacklink(backlinkId);
  };

  const getBacklinks = () => {
    return analyzer.getBacklinks();
  };

  const getCategories = () => {
    return analyzer.getCategories();
  };

  const getOutreach = () => {
    return analyzer.getOutreach();
  };

  return {
    analyzeBacklinks,
    addBacklink,
    updateBacklink,
    deleteBacklink,
    createOutreach,
    updateOutreach,
    monitorBacklink,
    getBacklinks,
    getCategories,
    getOutreach
  };
}; 