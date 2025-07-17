import { useEffect, useState } from 'react';

// SEO API Gateway Interface'leri
export interface SEOAPIGatewayConfig {
  id: string;
  name: string;
  version: string;
  description: string;
  baseUrl: string;
  endpoints: APIEndpoint[];
  authentication: {
    type: 'api-key' | 'oauth2' | 'jwt' | 'basic';
    config: Record<string, any>;
  };
  rateLimiting: {
    enabled: boolean;
    requestsPerMinute: number;
    requestsPerHour: number;
  };
  monitoring: {
    enabled: boolean;
    metrics: string[];
    alerts: APIAlert[];
  };
  status: 'active' | 'maintenance' | 'deprecated';
  lastUpdated: Date;
}

export interface APIEndpoint {
  id: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  name: string;
  description: string;
  category: 'analysis' | 'optimization' | 'monitoring' | 'reporting' | 'automation';
  parameters: APIParameter[];
  responses: APIResponse[];
  rateLimit: number;
  authentication: boolean;
  deprecated: boolean;
  version: string;
  examples: APIExample[];
}

export interface APIParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  required: boolean;
  description: string;
  defaultValue?: any;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    enum?: string[];
  };
}

export interface APIResponse {
  code: number;
  description: string;
  schema: any;
  examples: {
    [key: string]: any;
  };
}

export interface APIExample {
  name: string;
  description: string;
  request: {
    method: string;
    url: string;
    headers: Record<string, string>;
    body?: any;
  };
  response: {
    status: number;
    headers: Record<string, string>;
    body: any;
  };
}

export interface APIAlert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  endpoint?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
}

export interface APIRequest {
  id: string;
  endpoint: string;
  method: string;
  timestamp: Date;
  duration: number;
  status: number;
  userAgent: string;
  ipAddress: string;
  requestSize: number;
  responseSize: number;
  error?: string;
}

export interface APIUsage {
  endpoint: string;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  lastUsed: Date;
  uniqueUsers: number;
}

export interface SEOIntegration {
  id: string;
  name: string;
  description: string;
  type: 'google-analytics' | 'search-console' | 'semrush' | 'ahrefs' | 'moz' | 'custom';
  status: 'active' | 'inactive' | 'error';
  config: {
    apiKey?: string;
    apiSecret?: string;
    baseUrl?: string;
    viewId?: string;
    credentials?: Record<string, any>;
  };
  capabilities: string[];
  lastSync: Date;
  syncInterval: number; // minutes
  dataMapping: {
    [key: string]: string;
  };
}

export class SEOAPIGateway {
  private static instance: SEOAPIGateway;
  private endpoints: APIEndpoint[] = [];
  private requests: APIRequest[] = [];
  private alerts: APIAlert[] = [];
  private integrations: SEOIntegration[] = [];
  private observers: Set<(data: any) => void> = new Set();

  private constructor() {
    this.initializeEndpoints();
    this.initializeIntegrations();
  }

  static getInstance(): SEOAPIGateway {
    if (!SEOAPIGateway.instance) {
      SEOAPIGateway.instance = new SEOAPIGateway();
    }
    return SEOAPIGateway.instance;
  }

  // Varsayılan endpoint'leri oluştur
  private initializeEndpoints(): void {
    this.endpoints = [
      {
        id: 'seo-analysis',
        path: '/api/v1/seo/analysis',
        method: 'POST',
        name: 'SEO Analizi',
        description: 'Website SEO analizi yapar ve detaylı rapor döner',
        category: 'analysis',
        parameters: [
          {
            name: 'url',
            type: 'string',
            required: true,
            description: 'Analiz edilecek website URL\'i',
            validation: {
              pattern: '^https?://.+'
            }
          },
          {
            name: 'depth',
            type: 'number',
            required: false,
            description: 'Analiz derinliği (1-10)',
            defaultValue: 5,
            validation: {
              min: 1,
              max: 10
            }
          }
        ],
        responses: [
          {
            code: 200,
            description: 'Başarılı analiz',
            schema: {
              type: 'object',
              properties: {
                score: { type: 'number' },
                issues: { type: 'array' },
                recommendations: { type: 'array' }
              }
            },
            examples: {
              success: {
                score: 85,
                issues: ['Yavaş sayfa hızı', 'Eksik meta açıklamalar'],
                recommendations: ['Core Web Vitals optimizasyonu', 'Meta tag güncellemesi']
              }
            }
          }
        ],
        rateLimit: 10,
        authentication: true,
        deprecated: false,
        version: '1.0',
        examples: [
          {
            name: 'Temel Analiz',
            description: 'Website için temel SEO analizi',
            request: {
              method: 'POST',
              url: '/api/v1/seo/analysis',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY'
              },
              body: {
                url: 'https://example.com',
                depth: 5
              }
            },
            response: {
              status: 200,
              headers: {
                'Content-Type': 'application/json'
              },
              body: {
                score: 85,
                issues: ['Yavaş sayfa hızı'],
                recommendations: ['Core Web Vitals optimizasyonu']
              }
            }
          }
        ]
      },
      {
        id: 'seo-optimization',
        path: '/api/v1/seo/optimize',
        method: 'POST',
        name: 'SEO Optimizasyonu',
        description: 'Website SEO optimizasyonu yapar',
        category: 'optimization',
        parameters: [
          {
            name: 'url',
            type: 'string',
            required: true,
            description: 'Optimize edilecek website URL\'i'
          },
          {
            name: 'optimizations',
            type: 'array',
            required: true,
            description: 'Uygulanacak optimizasyonlar listesi'
          }
        ],
        responses: [
          {
            code: 200,
            description: 'Başarılı optimizasyon',
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                changes: { type: 'array' },
                impact: { type: 'object' }
              }
            },
            examples: {
              success: {
                success: true,
                changes: ['Meta açıklamalar güncellendi', 'Başlıklar optimize edildi'],
                impact: { traffic: 15, rankings: 20 }
              }
            }
          }
        ],
        rateLimit: 5,
        authentication: true,
        deprecated: false,
        version: '1.0',
        examples: []
      },
      {
        id: 'seo-monitoring',
        path: '/api/v1/seo/monitor',
        method: 'GET',
        name: 'SEO İzleme',
        description: 'Website SEO performansını izler',
        category: 'monitoring',
        parameters: [
          {
            name: 'url',
            type: 'string',
            required: true,
            description: 'İzlenecek website URL\'i'
          },
          {
            name: 'period',
            type: 'string',
            required: false,
            description: 'İzleme periyodu (daily, weekly, monthly)',
            defaultValue: 'daily',
            validation: {
              enum: ['daily', 'weekly', 'monthly']
            }
          }
        ],
        responses: [
          {
            code: 200,
            description: 'İzleme verileri',
            schema: {
              type: 'object',
              properties: {
                metrics: { type: 'object' },
                trends: { type: 'array' },
                alerts: { type: 'array' }
              }
            },
            examples: {
              success: {
                metrics: {
                  traffic: 15000,
                  rankings: 85,
                  conversions: 250
                },
                trends: ['Trafik artışı', 'Sıralama iyileşmesi'],
                alerts: ['Yavaş sayfa hızı tespit edildi']
              }
            }
          }
        ],
        rateLimit: 20,
        authentication: true,
        deprecated: false,
        version: '1.0',
        examples: []
      },
      {
        id: 'seo-reports',
        path: '/api/v1/seo/reports',
        method: 'GET',
        name: 'SEO Raporları',
        description: 'SEO raporları oluşturur ve döner',
        category: 'reporting',
        parameters: [
          {
            name: 'type',
            type: 'string',
            required: true,
            description: 'Rapor türü',
            validation: {
              enum: ['performance', 'technical', 'content', 'competitor']
            }
          },
          {
            name: 'format',
            type: 'string',
            required: false,
            description: 'Rapor formatı',
            defaultValue: 'json',
            validation: {
              enum: ['json', 'pdf', 'csv', 'excel']
            }
          }
        ],
        responses: [
          {
            code: 200,
            description: 'SEO raporu',
            schema: {
              type: 'object',
              properties: {
                report: { type: 'object' },
                generated: { type: 'string' },
                summary: { type: 'object' }
              }
            },
            examples: {
              success: {
                report: {
                  type: 'performance',
                  data: { /* rapor verileri */ }
                },
                generated: '2024-01-15T10:30:00Z',
                summary: {
                  score: 85,
                  recommendations: 5,
                  issues: 2
                }
              }
            }
          }
        ],
        rateLimit: 15,
        authentication: true,
        deprecated: false,
        version: '1.0',
        examples: []
      }
    ];
  }

  // Varsayılan entegrasyonları oluştur
  private initializeIntegrations(): void {
    this.integrations = [
      {
        id: 'google-analytics',
        name: 'Google Analytics',
        description: 'Google Analytics entegrasyonu',
        type: 'google-analytics',
        status: 'active',
        config: {
          apiKey: process.env.GOOGLE_ANALYTICS_API_KEY,
          viewId: process.env.GA_VIEW_ID
        },
        capabilities: ['traffic-analysis', 'user-behavior', 'conversion-tracking'],
        lastSync: new Date(),
        syncInterval: 60,
        dataMapping: {
          'pageviews': 'ga:pageviews',
          'sessions': 'ga:sessions',
          'bounceRate': 'ga:bounceRate'
        }
      },
      {
        id: 'search-console',
        name: 'Google Search Console',
        description: 'Google Search Console entegrasyonu',
        type: 'search-console',
        status: 'active',
        config: {
          apiKey: process.env.SEARCH_CONSOLE_API_KEY,
          baseUrl: process.env.SC_SITE_URL
        },
        capabilities: ['search-performance', 'indexing-status', 'core-web-vitals'],
        lastSync: new Date(),
        syncInterval: 120,
        dataMapping: {
          'clicks': 'clicks',
          'impressions': 'impressions',
          'ctr': 'ctr'
        }
      },
      {
        id: 'semrush',
        name: 'SEMrush',
        description: 'SEMrush entegrasyonu',
        type: 'semrush',
        status: 'inactive',
        config: {
          apiKey: process.env.SEMRUSH_API_KEY
        },
        capabilities: ['keyword-research', 'competitor-analysis', 'backlink-analysis'],
        lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 gün önce
        syncInterval: 1440, // 24 saat
        dataMapping: {
          'keyword': 'keyword',
          'volume': 'search_volume',
          'difficulty': 'keyword_difficulty'
        }
      }
    ];
  }

  // API isteği işle
  async processRequest(endpoint: string, method: string, data: any, headers: Record<string, string>): Promise<any> {
    const requestId = `req-${Date.now()}`;
    const startTime = Date.now();

    try {
      // Rate limiting kontrolü
      if (!this.checkRateLimit(endpoint)) {
        throw new Error('Rate limit exceeded');
      }

      // Authentication kontrolü
      if (!this.authenticateRequest(headers)) {
        throw new Error('Authentication failed');
      }

      // Endpoint bul ve işle
      const endpointConfig = this.endpoints.find(e => e.path === endpoint && e.method === method);
      if (!endpointConfig) {
        throw new Error('Endpoint not found');
      }

      // İsteği işle
      const result = await this.executeEndpoint(endpointConfig, data);

      // İstek kaydını oluştur
      const request: APIRequest = {
        id: requestId,
        endpoint,
        method,
        timestamp: new Date(),
        duration: Date.now() - startTime,
        status: 200,
        userAgent: headers['user-agent'] || 'unknown',
        ipAddress: headers['x-forwarded-for'] || 'unknown',
        requestSize: JSON.stringify(data).length,
        responseSize: JSON.stringify(result).length
      };

      this.requests.push(request);
      this.notifyObservers({ type: 'request-processed', data: request });

      return result;

    } catch (error) {
      // Hata kaydını oluştur
      const request: APIRequest = {
        id: requestId,
        endpoint,
        method,
        timestamp: new Date(),
        duration: Date.now() - startTime,
        status: 400,
        userAgent: headers['user-agent'] || 'unknown',
        ipAddress: headers['x-forwarded-for'] || 'unknown',
        requestSize: JSON.stringify(data).length,
        responseSize: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      };

      this.requests.push(request);
      this.createAlert('error', 'API Request Failed', error instanceof Error ? error.message : 'Unknown error', endpoint);
      this.notifyObservers({ type: 'request-failed', data: request });

      throw error;
    }
  }

  // Rate limiting kontrolü
  private checkRateLimit(endpoint: string): boolean {
    const endpointConfig = this.endpoints.find(e => e.path === endpoint);
    if (!endpointConfig) return false;

    const recentRequests = this.requests.filter(r => 
      r.endpoint === endpoint && 
      r.timestamp > new Date(Date.now() - 60 * 1000) // Son 1 dakika
    );

    return recentRequests.length < endpointConfig.rateLimit;
  }

  // Authentication kontrolü
  private authenticateRequest(headers: Record<string, string>): boolean {
    const authHeader = headers['authorization'];
    if (!authHeader) return false;

    // Basit API key kontrolü
    const apiKey = authHeader.replace('Bearer ', '');
    return apiKey === process.env.SEO_API_KEY;
  }

  // Endpoint'i çalıştır
  private async executeEndpoint(endpoint: APIEndpoint, data: any): Promise<any> {
    switch (endpoint.id) {
      case 'seo-analysis':
        return await this.performSEOAnalysis(data);
      case 'seo-optimization':
        return await this.performSEOOptimization(data);
      case 'seo-monitoring':
        return await this.getSEOMonitoring(data);
      case 'seo-reports':
        return await this.generateSEOReport(data);
      default:
        throw new Error('Unknown endpoint');
    }
  }

  // SEO Analizi yap
  private async performSEOAnalysis(data: any): Promise<any> {
    // SEO analizi simülasyonu
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
      score: Math.floor(Math.random() * 30) + 70,
      issues: [
        'Yavaş sayfa hızı',
        'Eksik meta açıklamalar',
        'Zayıf iç linkleme'
      ],
      recommendations: [
        'Core Web Vitals optimizasyonu',
        'Meta tag güncellemesi',
        'İç linkleme stratejisi'
      ],
      details: {
        technical: { score: 75, issues: 3 },
        content: { score: 80, issues: 2 },
        onPage: { score: 85, issues: 1 }
      }
    };
  }

  // SEO Optimizasyonu yap
  private async performSEOOptimization(data: any): Promise<any> {
    // SEO optimizasyonu simülasyonu
    await new Promise(resolve => setTimeout(resolve, 3000));

    return {
      success: true,
      changes: [
        'Meta açıklamalar güncellendi',
        'Başlıklar optimize edildi',
        'İç linkleme iyileştirildi'
      ],
      impact: {
        traffic: 15,
        rankings: 20,
        conversions: 10
      },
      nextSteps: [
        'Performansı izleyin',
        'Sonuçları takip edin',
        'Gerekirse ek optimizasyonlar yapın'
      ]
    };
  }

  // SEO İzleme verilerini getir
  private async getSEOMonitoring(data: any): Promise<any> {
    // SEO izleme simülasyonu
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      metrics: {
        traffic: 15000,
        rankings: 85,
        conversions: 250,
        bounceRate: 45,
        pageSpeed: 2.3
      },
      trends: [
        { metric: 'traffic', change: 12, period: 'week' },
        { metric: 'rankings', change: 5, period: 'week' },
        { metric: 'conversions', change: 8, period: 'week' }
      ],
      alerts: [
        'Yavaş sayfa hızı tespit edildi',
        'Bounce rate artışı gözlemlendi'
      ]
    };
  }

  // SEO Raporu oluştur
  private async generateSEOReport(data: any): Promise<any> {
    // SEO raporu simülasyonu
    await new Promise(resolve => setTimeout(resolve, 2500));

    return {
      report: {
        type: data.type || 'performance',
        generated: new Date().toISOString(),
        data: {
          summary: {
            score: 85,
            recommendations: 5,
            issues: 2,
            opportunities: 3
          },
          details: {
            technical: { score: 80, issues: 2 },
            content: { score: 85, issues: 1 },
            onPage: { score: 90, issues: 0 }
          }
        }
      },
      format: data.format || 'json',
      downloadUrl: `/api/v1/seo/reports/download/${Date.now()}`
    };
  }

  // Alert oluştur
  private createAlert(type: string, title: string, message: string, endpoint?: string): void {
    const alert: APIAlert = {
      id: `alert-${Date.now()}`,
      type: type as any,
      title,
      message,
      timestamp: new Date(),
      endpoint,
      severity: type === 'error' ? 'high' : type === 'warning' ? 'medium' : 'low',
      resolved: false
    };

    this.alerts.push(alert);
    this.notifyObservers({ type: 'alert-created', data: alert });
  }

  // Entegrasyon ekle
  addIntegration(integration: Omit<SEOIntegration, 'id'>): SEOIntegration {
    const newIntegration: SEOIntegration = {
      ...integration,
      id: `integration-${Date.now()}`
    };

    this.integrations.push(newIntegration);
    this.notifyObservers({ type: 'integration-added', data: newIntegration });
    return newIntegration;
  }

  // Entegrasyon güncelle
  updateIntegration(integrationId: string, updates: Partial<SEOIntegration>): boolean {
    const integrationIndex = this.integrations.findIndex(i => i.id === integrationId);
    if (integrationIndex !== -1) {
      this.integrations[integrationIndex] = { ...this.integrations[integrationIndex], ...updates };
      this.notifyObservers({ type: 'integration-updated', data: this.integrations[integrationIndex] });
      return true;
    }
    return false;
  }

  // API kullanım istatistikleri
  getAPIUsage(): APIUsage[] {
    const usageMap = new Map<string, APIUsage>();

    this.requests.forEach(request => {
      const existing = usageMap.get(request.endpoint);
      if (existing) {
        existing.totalRequests++;
        if (request.status < 400) {
          existing.successfulRequests++;
        } else {
          existing.failedRequests++;
        }
        existing.averageResponseTime = (existing.averageResponseTime + request.duration) / 2;
        existing.lastUsed = request.timestamp;
      } else {
        usageMap.set(request.endpoint, {
          endpoint: request.endpoint,
          totalRequests: 1,
          successfulRequests: request.status < 400 ? 1 : 0,
          failedRequests: request.status >= 400 ? 1 : 0,
          averageResponseTime: request.duration,
          lastUsed: request.timestamp,
          uniqueUsers: 1
        });
      }
    });

    return Array.from(usageMap.values());
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
  getEndpoints(): APIEndpoint[] {
    return [...this.endpoints];
  }

  getIntegrations(): SEOIntegration[] {
    return [...this.integrations];
  }

  getRequests(): APIRequest[] {
    return [...this.requests];
  }

  getAlerts(): APIAlert[] {
    return [...this.alerts];
  }

  getEndpointById(id: string): APIEndpoint | undefined {
    return this.endpoints.find(e => e.id === id);
  }

  getIntegrationById(id: string): SEOIntegration | undefined {
    return this.integrations.find(i => i.id === id);
  }
}

// React Hook
export function useSEOAPIGateway() {
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>([]);
  const [integrations, setIntegrations] = useState<SEOIntegration[]>([]);
  const [requests, setRequests] = useState<APIRequest[]>([]);
  const [alerts, setAlerts] = useState<APIAlert[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gateway = SEOAPIGateway.getInstance();

  useEffect(() => {
    const observer = (data: any) => {
      if (data.type.includes('request')) {
        setRequests(gateway.getRequests());
      }
      if (data.type.includes('alert')) {
        setAlerts(gateway.getAlerts());
      }
      if (data.type.includes('integration')) {
        setIntegrations(gateway.getIntegrations());
      }
    };

    gateway.addObserver(observer);
    setEndpoints(gateway.getEndpoints());
    setIntegrations(gateway.getIntegrations());
    setRequests(gateway.getRequests());
    setAlerts(gateway.getAlerts());

    return () => {
      gateway.removeObserver(observer);
    };
  }, [gateway]);

  const processRequest = async (endpoint: string, method: string, data: any, headers: Record<string, string>) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await gateway.processRequest(endpoint, method, data, headers);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'API isteği hatası');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const addIntegration = (integration: Omit<SEOIntegration, 'id'>) => {
    return gateway.addIntegration(integration);
  };

  const updateIntegration = (integrationId: string, updates: Partial<SEOIntegration>) => {
    return gateway.updateIntegration(integrationId, updates);
  };

  const getAPIUsage = () => {
    return gateway.getAPIUsage();
  };

  return {
    endpoints,
    integrations,
    requests,
    alerts,
    isLoading,
    error,
    processRequest,
    addIntegration,
    updateIntegration,
    getAPIUsage,
    getEndpointById: gateway.getEndpointById.bind(gateway),
    getIntegrationById: gateway.getIntegrationById.bind(gateway)
  };
}

export default SEOAPIGateway; 