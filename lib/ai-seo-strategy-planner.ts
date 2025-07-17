import { useEffect, useState } from 'react';

// SEO Strateji Interface'leri
export interface SEOStrategy {
  id: string;
  name: string;
  description: string;
  category: 'on-page' | 'off-page' | 'technical' | 'content' | 'local' | 'ecommerce';
  priority: 'critical' | 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  estimatedTime: number; // hours
  estimatedImpact: number; // percentage
  cost: 'free' | 'low' | 'medium' | 'high';
  status: 'planned' | 'in-progress' | 'completed' | 'paused' | 'cancelled';
  startDate?: Date;
  endDate?: Date;
  completionDate?: Date;
  progress: number; // percentage
  dependencies: string[]; // other strategy IDs
  requirements: string[];
  actions: SEOAction[];
  metrics: {
    traffic: number;
    rankings: number;
    conversions: number;
    revenue: number;
  };
  aiRecommendations: AIRecommendation[];
}

export interface SEOAction {
  id: string;
  title: string;
  description: string;
  type: 'content' | 'technical' | 'link-building' | 'social' | 'analytics' | 'optimization';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  estimatedTime: number; // minutes
  assignedTo?: string;
  dueDate?: Date;
  completedAt?: Date;
  notes?: string;
  checklist: {
    item: string;
    completed: boolean;
  }[];
}

export interface AIRecommendation {
  id: string;
  type: 'strategy' | 'action' | 'optimization' | 'content' | 'technical';
  title: string;
  description: string;
  reasoning: string;
  confidence: number; // 0-100
  priority: 'critical' | 'high' | 'medium' | 'low';
  impact: {
    traffic: number;
    rankings: number;
    conversions: number;
    revenue: number;
  };
  implementation: {
    steps: string[];
    timeRequired: number;
    resources: string[];
    cost: number;
  };
  alternatives: string[];
  risks: string[];
  successMetrics: string[];
}

export interface SEOAudit {
  id: string;
  timestamp: Date;
  url: string;
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  issues: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  recommendations: AIRecommendation[];
  competitors: {
    domain: string;
    score: number;
    strengths: string[];
    weaknesses: string[];
  }[];
}

export interface SEOGoal {
  id: string;
  name: string;
  description: string;
  type: 'traffic' | 'rankings' | 'conversions' | 'revenue' | 'brand' | 'local';
  target: number;
  current: number;
  unit: string;
  timeframe: '1month' | '3months' | '6months' | '1year';
  deadline: Date;
  status: 'on-track' | 'behind' | 'ahead' | 'completed';
  progress: number; // percentage
  strategies: string[]; // strategy IDs
}

export interface SEOProject {
  id: string;
  name: string;
  description: string;
  client?: string;
  website: string;
  industry: string;
  budget: number;
  timeline: {
    start: Date;
    end: Date;
  };
  goals: SEOGoal[];
  strategies: SEOStrategy[];
  team: {
    role: string;
    name: string;
    email: string;
  }[];
  status: 'planning' | 'active' | 'paused' | 'completed' | 'cancelled';
  progress: number;
  budgetDetails: {
    allocated: number;
    spent: number;
    remaining: number;
  };
}

export class AISEOStrategyPlanner {
  private static instance: AISEOStrategyPlanner;
  private strategies: SEOStrategy[] = [];
  private projects: SEOProject[] = [];
  private observers: Set<(data: any) => void> = new Set();

  private constructor() {
    this.initializeDefaultStrategies();
  }

  static getInstance(): AISEOStrategyPlanner {
    if (!AISEOStrategyPlanner.instance) {
      AISEOStrategyPlanner.instance = new AISEOStrategyPlanner();
    }
    return AISEOStrategyPlanner.instance;
  }

  // Varsayılan stratejileri oluştur
  private initializeDefaultStrategies(): void {
    this.strategies = [
      {
        id: 'content-optimization',
        name: 'İçerik Optimizasyonu',
        description: 'Mevcut içerikleri SEO açısından optimize et ve yeni içerik stratejisi geliştir',
        category: 'content',
        priority: 'high',
        difficulty: 'medium',
        estimatedTime: 40,
        estimatedImpact: 25,
        cost: 'low',
        status: 'planned',
        progress: 0,
        dependencies: [],
        requirements: ['İçerik analizi', 'Anahtar kelime araştırması'],
        actions: [
          {
            id: 'content-audit',
            title: 'İçerik Denetimi',
            description: 'Mevcut içerikleri analiz et ve iyileştirme fırsatlarını belirle',
            type: 'content',
            priority: 'high',
            status: 'pending',
            estimatedTime: 120,
            checklist: [
              { item: 'Ana sayfa içeriğini kontrol et', completed: false },
              { item: 'Ürün sayfalarını optimize et', completed: false },
              { item: 'Blog içeriklerini güncelle', completed: false },
              { item: 'Meta açıklamaları iyileştir', completed: false }
            ]
          }
        ],
        metrics: { traffic: 0, rankings: 0, conversions: 0, revenue: 0 },
        aiRecommendations: []
      },
      {
        id: 'technical-seo',
        name: 'Teknik SEO İyileştirmeleri',
        description: 'Site hızı, Core Web Vitals ve teknik SEO sorunlarını çöz',
        category: 'technical',
        priority: 'critical',
        difficulty: 'hard',
        estimatedTime: 60,
        estimatedImpact: 30,
        cost: 'medium',
        status: 'planned',
        progress: 0,
        dependencies: [],
        requirements: ['Teknik SEO denetimi', 'Performans analizi'],
        actions: [
          {
            id: 'speed-optimization',
            title: 'Hız Optimizasyonu',
            description: 'Sayfa yükleme hızını iyileştir',
            type: 'technical',
            priority: 'critical',
            status: 'pending',
            estimatedTime: 180,
            checklist: [
              { item: 'Görsel optimizasyonu yap', completed: false },
              { item: 'CSS/JS sıkıştırma uygula', completed: false },
              { item: 'CDN kurulumu yap', completed: false },
              { item: 'Browser caching ayarla', completed: false }
            ]
          }
        ],
        metrics: { traffic: 0, rankings: 0, conversions: 0, revenue: 0 },
        aiRecommendations: []
      },
      {
        id: 'link-building',
        name: 'Backlink Stratejisi',
        description: 'Kaliteli backlink\'ler oluştur ve domain otoritesini artır',
        category: 'off-page',
        priority: 'high',
        difficulty: 'hard',
        estimatedTime: 80,
        estimatedImpact: 35,
        cost: 'high',
        status: 'planned',
        progress: 0,
        dependencies: ['content-optimization'],
        requirements: ['İçerik hazır', 'Rakip analizi'],
        actions: [
          {
            id: 'outreach-campaign',
            title: 'Outreach Kampanyası',
            description: 'Hedef sitelerle iletişime geç ve link fırsatları yarat',
            type: 'link-building',
            priority: 'high',
            status: 'pending',
            estimatedTime: 240,
            checklist: [
              { item: 'Hedef siteleri belirle', completed: false },
              { item: 'Outreach listesi oluştur', completed: false },
              { item: 'Kişiselleştirilmiş mesajlar hazırla', completed: false },
              { item: 'Takip süreci başlat', completed: false }
            ]
          }
        ],
        metrics: { traffic: 0, rankings: 0, conversions: 0, revenue: 0 },
        aiRecommendations: []
      },
      {
        id: 'local-seo',
        name: 'Yerel SEO Optimizasyonu',
        description: 'Yerel arama sonuçlarında görünürlüğü artır',
        category: 'local',
        priority: 'medium',
        difficulty: 'medium',
        estimatedTime: 30,
        estimatedImpact: 20,
        cost: 'low',
        status: 'planned',
        progress: 0,
        dependencies: [],
        requirements: ['Google My Business hesabı'],
        actions: [
          {
            id: 'gmb-optimization',
            title: 'Google My Business Optimizasyonu',
            description: 'GMB profilini optimize et ve yerel aramalarda öne çık',
            type: 'optimization',
            priority: 'medium',
            status: 'pending',
            estimatedTime: 90,
            checklist: [
              { item: 'Profil bilgilerini güncelle', completed: false },
              { item: 'Fotoğraflar ekle', completed: false },
              { item: 'Müşteri yorumlarını yanıtla', completed: false },
              { item: 'Posts oluştur', completed: false }
            ]
          }
        ],
        metrics: { traffic: 0, rankings: 0, conversions: 0, revenue: 0 },
        aiRecommendations: []
      }
    ];
  }

  // AI destekli strateji önerisi oluştur
  async generateAIStrategyRecommendation(
    website: string,
    industry: string,
    goals: string[],
    budget: number,
    timeline: string
  ): Promise<AIRecommendation[]> {
    // AI analizi simülasyonu
    const recommendations: AIRecommendation[] = [];

    // İçerik stratejisi önerisi
    if (goals.includes('traffic') || goals.includes('rankings')) {
      recommendations.push({
        id: 'ai-content-strategy',
        type: 'strategy',
        title: 'AI Destekli İçerik Stratejisi',
        description: 'Yapay zeka ile optimize edilmiş içerik planı ve üretimi',
        reasoning: 'Hedef anahtar kelimeleriniz için yüksek kaliteli, kullanıcı odaklı içerik üretimi',
        confidence: 85,
        priority: 'high',
        impact: { traffic: 40, rankings: 35, conversions: 20, revenue: 25 },
        implementation: {
          steps: [
            'Anahtar kelime araştırması yap',
            'İçerik takvimi oluştur',
            'AI destekli içerik üret',
            'SEO optimizasyonu uygula',
            'Performans takibi yap'
          ],
          timeRequired: 20,
          resources: ['İçerik yazarı', 'SEO uzmanı', 'AI araçları'],
          cost: 2000
        },
        alternatives: ['Manuel içerik üretimi', 'Outsourcing'],
        risks: ['İçerik kalitesi', 'AI bağımlılığı'],
        successMetrics: ['Organik trafik artışı', 'Sıralama iyileşmesi', 'Kullanıcı etkileşimi']
      });
    }

    // Teknik SEO önerisi
    if (goals.includes('performance') || goals.includes('user-experience')) {
      recommendations.push({
        id: 'ai-technical-optimization',
        type: 'technical',
        title: 'AI Destekli Teknik SEO Optimizasyonu',
        description: 'Yapay zeka ile otomatik teknik SEO iyileştirmeleri',
        reasoning: 'Core Web Vitals ve teknik SEO sorunlarını AI ile tespit et ve çöz',
        confidence: 90,
        priority: 'critical',
        impact: { traffic: 25, rankings: 30, conversions: 15, revenue: 20 },
        implementation: {
          steps: [
            'Teknik SEO denetimi yap',
            'AI ile sorun tespiti',
            'Otomatik optimizasyonlar',
            'Performans izleme',
            'Sürekli iyileştirme'
          ],
          timeRequired: 15,
          resources: ['Teknik SEO uzmanı', 'AI araçları', 'Monitoring sistemi'],
          cost: 1500
        },
        alternatives: ['Manuel teknik SEO', 'Plugin tabanlı çözümler'],
        risks: ['Otomasyon hataları', 'Karmaşık yapı'],
        successMetrics: ['Core Web Vitals skorları', 'Sayfa hızı', 'Teknik SEO puanı']
      });
    }

    // Backlink stratejisi önerisi
    if (goals.includes('authority') || goals.includes('rankings')) {
      recommendations.push({
        id: 'ai-link-building',
        type: 'action',
        title: 'AI Destekli Link Building',
        description: 'Yapay zeka ile kaliteli backlink fırsatları tespit et',
        reasoning: 'Domain otoritesini artırmak için kaliteli backlink\'ler oluştur',
        confidence: 75,
        priority: 'high',
        impact: { traffic: 30, rankings: 40, conversions: 10, revenue: 15 },
        implementation: {
          steps: [
            'Rakip backlink analizi',
            'AI ile fırsat tespiti',
            'Outreach kampanyası',
            'Link kalitesi kontrolü',
            'Sonuç takibi'
          ],
          timeRequired: 40,
          resources: ['Link building uzmanı', 'AI araçları', 'Outreach platformu'],
          cost: 3000
        },
        alternatives: ['Manuel link building', 'Link satın alma'],
        risks: ['Kalitesiz linkler', 'Google cezaları'],
        successMetrics: ['Domain Authority', 'Backlink sayısı', 'Sıralama iyileşmesi']
      });
    }

    return recommendations;
  }

  // Strateji oluştur
  createStrategy(strategy: Omit<SEOStrategy, 'id' | 'progress' | 'metrics' | 'aiRecommendations'>): SEOStrategy {
    const newStrategy: SEOStrategy = {
      ...strategy,
      id: `strategy-${Date.now()}`,
      progress: 0,
      metrics: { traffic: 0, rankings: 0, conversions: 0, revenue: 0 },
      aiRecommendations: []
    };

    this.strategies.push(newStrategy);
    this.notifyObservers({ type: 'strategy-created', data: newStrategy });
    return newStrategy;
  }

  // Strateji güncelle
  updateStrategy(strategyId: string, updates: Partial<SEOStrategy>): boolean {
    const strategyIndex = this.strategies.findIndex(s => s.id === strategyId);
    if (strategyIndex !== -1) {
      this.strategies[strategyIndex] = { ...this.strategies[strategyIndex], ...updates };
      this.notifyObservers({ type: 'strategy-updated', data: this.strategies[strategyIndex] });
      return true;
    }
    return false;
  }

  // Strateji sil
  deleteStrategy(strategyId: string): boolean {
    const initialLength = this.strategies.length;
    this.strategies = this.strategies.filter(s => s.id !== strategyId);
    if (this.strategies.length < initialLength) {
      this.notifyObservers({ type: 'strategy-deleted', data: strategyId });
      return true;
    }
    return false;
  }

  // Aksiyon ekle
  addAction(strategyId: string, action: Omit<SEOAction, 'id'>): boolean {
    const strategy = this.strategies.find(s => s.id === strategyId);
    if (strategy) {
      const newAction: SEOAction = {
        ...action,
        id: `action-${Date.now()}`
      };
      strategy.actions.push(newAction);
      this.notifyObservers({ type: 'action-added', data: { strategyId, action: newAction } });
      return true;
    }
    return false;
  }

  // Aksiyon güncelle
  updateAction(strategyId: string, actionId: string, updates: Partial<SEOAction>): boolean {
    const strategy = this.strategies.find(s => s.id === strategyId);
    if (strategy) {
      const actionIndex = strategy.actions.findIndex(a => a.id === actionId);
      if (actionIndex !== -1) {
        strategy.actions[actionIndex] = { ...strategy.actions[actionIndex], ...updates };
        this.notifyObservers({ type: 'action-updated', data: { strategyId, action: strategy.actions[actionIndex] } });
        return true;
      }
    }
    return false;
  }

  // Proje oluştur
  createProject(project: Omit<SEOProject, 'id' | 'progress' | 'budgetDetails'>): SEOProject {
    const newProject: SEOProject = {
      ...project,
      id: `project-${Date.now()}`,
      progress: 0,
      budgetDetails: {
        allocated: project.budget,
        spent: 0,
        remaining: project.budget
      }
    };

    this.projects.push(newProject);
    this.notifyObservers({ type: 'project-created', data: newProject });
    return newProject;
  }

  // Proje güncelle
  updateProject(projectId: string, updates: Partial<SEOProject>): boolean {
    const projectIndex = this.projects.findIndex(p => p.id === projectId);
    if (projectIndex !== -1) {
      this.projects[projectIndex] = { ...this.projects[projectIndex], ...updates };
      this.notifyObservers({ type: 'project-updated', data: this.projects[projectIndex] });
      return true;
    }
    return false;
  }

  // SEO denetimi oluştur
  async createSEOAudit(url: string): Promise<SEOAudit> {
    // SEO denetimi simülasyonu
    const audit: SEOAudit = {
      id: `audit-${Date.now()}`,
      timestamp: new Date(),
      url,
      score: Math.floor(Math.random() * 40) + 60, // 60-100 arası
      grade: 'B',
      issues: {
        critical: Math.floor(Math.random() * 5),
        high: Math.floor(Math.random() * 10),
        medium: Math.floor(Math.random() * 15),
        low: Math.floor(Math.random() * 20)
      },
      recommendations: [],
      competitors: [
        {
          domain: 'competitor1.com',
          score: 75,
          strengths: ['Hızlı sayfa yükleme', 'Kaliteli içerik'],
          weaknesses: ['Eksik meta açıklamalar', 'Yavaş mobil performans']
        }
      ]
    };

    return audit;
  }

  // İlerleme hesapla
  calculateProgress(strategy: SEOStrategy): number {
    if (strategy.actions.length === 0) return 0;

    const completedActions = strategy.actions.filter(a => a.status === 'completed').length;
    return Math.round((completedActions / strategy.actions.length) * 100);
  }

  // Strateji önceliklerini güncelle
  updateStrategyPriorities(): void {
    this.strategies.forEach(strategy => {
      // AI ile öncelik güncelleme simülasyonu
      if (strategy.category === 'technical' && strategy.priority !== 'critical') {
        strategy.priority = 'critical';
      }
    });
  }

  // Observer ekle
  addObserver(observer: (data: any) => void): void {
    this.observers.add(observer);
  }

  // Observer kaldır
  removeObserver(observer: (data: any) => void): void {
    this.observers.delete(observer);
  }

  // Observer'ları bilgilendir
  private notifyObservers(data: any): void {
    this.observers.forEach(observer => {
      try {
        observer(data);
      } catch (error) {
        console.error('Observer hatası:', error);
      }
    });
  }

  // Getter metodları
  getStrategies(): SEOStrategy[] {
    return [...this.strategies];
  }

  getProjects(): SEOProject[] {
    return [...this.projects];
  }

  getStrategyById(id: string): SEOStrategy | undefined {
    return this.strategies.find(s => s.id === id);
  }

  getProjectById(id: string): SEOProject | undefined {
    return this.projects.find(p => p.id === id);
  }
}

// React Hook
export function useAISEOStrategyPlanner() {
  const [strategies, setStrategies] = useState<SEOStrategy[]>([]);
  const [projects, setProjects] = useState<SEOProject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const planner = AISEOStrategyPlanner.getInstance();

  useEffect(() => {
    const observer = (data: any) => {
      if (data.type === 'strategy-created' || data.type === 'strategy-updated' || data.type === 'strategy-deleted') {
        setStrategies(planner.getStrategies());
      } else if (data.type === 'project-created' || data.type === 'project-updated') {
        setProjects(planner.getProjects());
      }
    };

    planner.addObserver(observer);
    setStrategies(planner.getStrategies());
    setProjects(planner.getProjects());

    return () => {
      planner.removeObserver(observer);
    };
  }, [planner]);

  const createStrategy = (strategy: Omit<SEOStrategy, 'id' | 'progress' | 'metrics' | 'aiRecommendations'>) => {
    return planner.createStrategy(strategy);
  };

  const updateStrategy = (strategyId: string, updates: Partial<SEOStrategy>) => {
    return planner.updateStrategy(strategyId, updates);
  };

  const deleteStrategy = (strategyId: string) => {
    return planner.deleteStrategy(strategyId);
  };

  const generateAIRecommendations = async (
    website: string,
    industry: string,
    goals: string[],
    budget: number,
    timeline: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const recommendations = await planner.generateAIStrategyRecommendation(
        website,
        industry,
        goals,
        budget,
        timeline
      );
      return recommendations;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'AI önerisi oluşturma hatası');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const createProject = (project: Omit<SEOProject, 'id' | 'progress' | 'budgetDetails'>) => {
    return planner.createProject(project);
  };

  const createSEOAudit = async (url: string) => {
    return await planner.createSEOAudit(url);
  };

  return {
    strategies,
    projects,
    isLoading,
    error,
    createStrategy,
    updateStrategy,
    deleteStrategy,
    generateAIRecommendations,
    createProject,
    createSEOAudit,
    getStrategyById: planner.getStrategyById.bind(planner),
    getProjectById: planner.getProjectById.bind(planner)
  };
}

export default AISEOStrategyPlanner; 