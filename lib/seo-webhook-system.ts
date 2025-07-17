import { useEffect, useState } from 'react';

// SEO Webhook Interface'leri
export interface SEOWebhook {
  id: string;
  name: string;
  description: string;
  url: string;
  events: WebhookEvent[];
  headers: Record<string, string>;
  authentication: {
    type: 'none' | 'basic' | 'bearer' | 'custom';
    credentials?: Record<string, string>;
  };
  status: 'active' | 'inactive' | 'error';
  retryPolicy: {
    enabled: boolean;
    maxRetries: number;
    retryDelay: number; // seconds
    backoffMultiplier: number;
  };
  rateLimiting: {
    enabled: boolean;
    requestsPerMinute: number;
    requestsPerHour: number;
  };
  security: {
    signatureVerification: boolean;
    secretKey?: string;
    ipWhitelist?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
  lastTriggered?: Date;
  successCount: number;
  failureCount: number;
}

export interface WebhookEvent {
  id: string;
  name: string;
  description: string;
  category: 'seo' | 'performance' | 'content' | 'technical' | 'monitoring' | 'automation';
  triggers: string[];
  payload: {
    schema: any;
    example: any;
  };
  enabled: boolean;
  filters?: WebhookFilter[];
}

export interface WebhookFilter {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'in' | 'not_in';
  value: any;
}

export interface WebhookDelivery {
  id: string;
  webhookId: string;
  eventId: string;
  timestamp: Date;
  status: 'pending' | 'delivered' | 'failed' | 'retrying';
  attempts: number;
  maxAttempts: number;
  payload: any;
  response?: {
    statusCode: number;
    headers: Record<string, string>;
    body: string;
    duration: number;
  };
  error?: string;
  nextRetry?: Date;
}

export interface WebhookLog {
  id: string;
  webhookId: string;
  eventId: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  data?: any;
}

export interface WebhookStatistics {
  webhookId: string;
  totalDeliveries: number;
  successfulDeliveries: number;
  failedDeliveries: number;
  averageResponseTime: number;
  lastDelivery?: Date;
  successRate: number;
  events: {
    [eventId: string]: {
      count: number;
      successRate: number;
    };
  };
}

export interface WebhookTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  events: string[];
  headers: Record<string, string>;
  authentication: {
    type: 'none' | 'basic' | 'bearer' | 'custom';
    credentials?: Record<string, string>;
  };
  retryPolicy: {
    enabled: boolean;
    maxRetries: number;
    retryDelay: number;
    backoffMultiplier: number;
  };
}

export class SEOWebhookSystem {
  private static instance: SEOWebhookSystem;
  private webhooks: SEOWebhook[] = [];
  private deliveries: WebhookDelivery[] = [];
  private logs: WebhookLog[] = [];
  private templates: WebhookTemplate[] = [];
  private observers: Set<(data: any) => void> = new Set();

  private constructor() {
    this.initializeTemplates();
  }

  static getInstance(): SEOWebhookSystem {
    if (!SEOWebhookSystem.instance) {
      SEOWebhookSystem.instance = new SEOWebhookSystem();
    }
    return SEOWebhookSystem.instance;
  }

  // Varsayılan şablonları oluştur
  private initializeTemplates(): void {
    this.templates = [
      {
        id: 'seo-alerts',
        name: 'SEO Alert Webhook',
        description: 'SEO sorunları ve uyarıları için webhook',
        category: 'seo',
        events: ['seo_issue_detected', 'seo_score_changed', 'ranking_dropped'],
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'SEO-Webhook-System/1.0'
        },
        authentication: {
          type: 'bearer' as const,
          credentials: {
            token: 'YOUR_WEBHOOK_TOKEN'
          }
        },
        retryPolicy: {
          enabled: true,
          maxRetries: 3,
          retryDelay: 60,
          backoffMultiplier: 1.5
        }
      },
      {
        id: 'performance-monitoring',
        name: 'Performance Monitoring Webhook',
        description: 'Performans metrikleri için webhook',
        category: 'performance',
        events: ['core_web_vitals_changed', 'page_speed_degraded', 'lighthouse_score_updated'],
        headers: {
          'Content-Type': 'application/json'
        },
              authentication: {
        type: 'basic' as const
      },
      retryPolicy: {
        enabled: true,
        maxRetries: 5,
        retryDelay: 30,
        backoffMultiplier: 1.5
      }
      },
      {
        id: 'content-updates',
        name: 'Content Update Webhook',
        description: 'İçerik güncellemeleri için webhook',
        category: 'content',
        events: ['content_published', 'content_updated', 'meta_tags_changed'],
        headers: {
          'Content-Type': 'application/json'
        },
        authentication: {
          type: 'custom' as const
        },
        retryPolicy: {
          enabled: false,
          maxRetries: 1,
          retryDelay: 0,
          backoffMultiplier: 1.0
        }
      }
    ];
  }

  // Webhook oluştur
  createWebhook(webhook: Omit<SEOWebhook, 'id' | 'createdAt' | 'updatedAt' | 'successCount' | 'failureCount'>): SEOWebhook {
    const newWebhook: SEOWebhook = {
      ...webhook,
      id: `webhook-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      successCount: 0,
      failureCount: 0
    };

    this.webhooks.push(newWebhook);
    this.notifyObservers({ type: 'webhook-created', data: newWebhook });
    return newWebhook;
  }

  // Şablon tabanlı webhook oluştur
  createWebhookFromTemplate(templateId: string, url: string, customizations?: Partial<SEOWebhook>): SEOWebhook | null {
    const template = this.templates.find(t => t.id === templateId);
    if (!template) return null;

    const events: WebhookEvent[] = template.events.map(eventId => ({
      id: `event-${Date.now()}-${eventId}`,
      name: eventId,
      description: `${eventId} eventi`,
      category: 'seo',
      triggers: [eventId],
      payload: {
        schema: {
          type: 'object',
          properties: {
            event: { type: 'string' },
            timestamp: { type: 'string' },
            data: { type: 'object' }
          }
        },
        example: {
          event: eventId,
          timestamp: new Date().toISOString(),
          data: { /* örnek veri */ }
        }
      },
      enabled: true
    }));

    const webhook: SEOWebhook = {
      id: `webhook-${Date.now()}`,
      name: template.name,
      description: template.description,
      url,
      events,
      headers: template.headers,
      authentication: template.authentication,
      status: 'active',
      retryPolicy: template.retryPolicy,
      rateLimiting: {
        enabled: true,
        requestsPerMinute: 60,
        requestsPerHour: 1000
      },
      security: {
        signatureVerification: false
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      successCount: 0,
      failureCount: 0,
      ...customizations
    };

    this.webhooks.push(webhook);
    this.notifyObservers({ type: 'webhook-created', data: webhook });
    return webhook;
  }

  // Webhook tetikle
  async triggerWebhook(webhookId: string, eventId: string, payload: any): Promise<WebhookDelivery> {
    const webhook = this.webhooks.find(w => w.id === webhookId);
    if (!webhook || webhook.status !== 'active') {
      throw new Error('Webhook not found or inactive');
    }

    const event = webhook.events.find(e => e.id === eventId);
    if (!event || !event.enabled) {
      throw new Error('Event not found or disabled');
    }

    // Rate limiting kontrolü
    if (!this.checkRateLimit(webhook)) {
      throw new Error('Rate limit exceeded');
    }

    // Delivery oluştur
    const delivery: WebhookDelivery = {
      id: `delivery-${Date.now()}`,
      webhookId,
      eventId,
      timestamp: new Date(),
      status: 'pending',
      attempts: 0,
      maxAttempts: webhook.retryPolicy.maxRetries,
      payload
    };

    this.deliveries.push(delivery);

    // Webhook'u gönder
    try {
      await this.sendWebhook(webhook, delivery);
      
      delivery.status = 'delivered';
      webhook.successCount++;
      webhook.lastTriggered = new Date();
      
      this.logWebhook(webhookId, eventId, 'info', 'Webhook delivered successfully', { delivery });
      
    } catch (error) {
      delivery.status = 'failed';
      delivery.error = error instanceof Error ? error.message : 'Unknown error';
      webhook.failureCount++;
      
      this.logWebhook(webhookId, eventId, 'error', 'Webhook delivery failed', { error: delivery.error });
      
      // Retry logic
      if (webhook.retryPolicy.enabled && delivery.attempts < delivery.maxAttempts) {
        delivery.status = 'retrying';
        delivery.attempts++;
        delivery.nextRetry = new Date(Date.now() + webhook.retryPolicy.retryDelay * 1000);
        
        // Retry'ı zamanla
        setTimeout(() => {
          this.retryWebhook(delivery.id);
        }, webhook.retryPolicy.retryDelay * 1000);
      }
    }

    this.notifyObservers({ type: 'webhook-triggered', data: delivery });
    return delivery;
  }

  // Webhook gönder
  private async sendWebhook(webhook: SEOWebhook, delivery: WebhookDelivery): Promise<void> {
    const startTime = Date.now();

    // Headers hazırla
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...webhook.headers
    };

    // Authentication ekle
    if (webhook.authentication.type === 'bearer' && webhook.authentication.credentials?.token) {
      headers['Authorization'] = `Bearer ${webhook.authentication.credentials.token}`;
    } else if (webhook.authentication.type === 'basic' && webhook.authentication.credentials) {
      const { username, password } = webhook.authentication.credentials;
      const auth = Buffer.from(`${username}:${password}`).toString('base64');
      headers['Authorization'] = `Basic ${auth}`;
    }

    // Signature ekle
    if (webhook.security.signatureVerification && webhook.security.secretKey) {
      const signature = this.generateSignature(delivery.payload, webhook.security.secretKey);
      headers['X-Webhook-Signature'] = signature;
    }

    // Webhook gönder
    const response = await fetch(webhook.url, {
      method: 'POST',
      headers,
      body: JSON.stringify(delivery.payload)
    });

    const responseBody = await response.text();
    const duration = Date.now() - startTime;

    delivery.response = {
      statusCode: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseBody,
      duration
    };

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${responseBody}`);
    }
  }

  // Retry webhook
  private async retryWebhook(deliveryId: string): Promise<void> {
    const delivery = this.deliveries.find(d => d.id === deliveryId);
    if (!delivery) return;

    const webhook = this.webhooks.find(w => w.id === delivery.webhookId);
    if (!webhook) return;

    try {
      await this.sendWebhook(webhook, delivery);
      
      delivery.status = 'delivered';
      webhook.successCount++;
      
      this.logWebhook(delivery.webhookId, delivery.eventId, 'info', 'Webhook retry successful', { delivery });
      
    } catch (error) {
      delivery.status = 'failed';
      delivery.error = error instanceof Error ? error.message : 'Unknown error';
      webhook.failureCount++;
      
      this.logWebhook(delivery.webhookId, delivery.eventId, 'error', 'Webhook retry failed', { error: delivery.error });
      
      // Daha fazla retry
      if (delivery.attempts < delivery.maxAttempts) {
        delivery.status = 'retrying';
        delivery.attempts++;
        const delay = webhook.retryPolicy.retryDelay * Math.pow(webhook.retryPolicy.backoffMultiplier || 1, delivery.attempts);
        delivery.nextRetry = new Date(Date.now() + delay * 1000);
        
        setTimeout(() => {
          this.retryWebhook(delivery.id);
        }, delay * 1000);
      }
    }
  }

  // Rate limiting kontrolü
  private checkRateLimit(webhook: SEOWebhook): boolean {
    if (!webhook.rateLimiting.enabled) return true;

    const recentDeliveries = this.deliveries.filter(d => 
      d.webhookId === webhook.id && 
      d.timestamp > new Date(Date.now() - 60 * 1000) // Son 1 dakika
    );

    return recentDeliveries.length < webhook.rateLimiting.requestsPerMinute;
  }

  // Signature oluştur
  private generateSignature(payload: any, secretKey: string): string {
    const crypto = require('crypto');
    const data = JSON.stringify(payload);
    return crypto.createHmac('sha256', secretKey).update(data).digest('hex');
  }

  // Webhook log oluştur
  private logWebhook(webhookId: string, eventId: string, level: string, message: string, data?: any): void {
    const log: WebhookLog = {
      id: `log-${Date.now()}`,
      webhookId,
      eventId,
      timestamp: new Date(),
      level: level as any,
      message,
      data
    };

    this.logs.push(log);
    this.notifyObservers({ type: 'webhook-logged', data: log });
  }

  // Webhook güncelle
  updateWebhook(webhookId: string, updates: Partial<SEOWebhook>): boolean {
    const webhookIndex = this.webhooks.findIndex(w => w.id === webhookId);
    if (webhookIndex !== -1) {
      this.webhooks[webhookIndex] = { 
        ...this.webhooks[webhookIndex], 
        ...updates, 
        updatedAt: new Date() 
      };
      this.notifyObservers({ type: 'webhook-updated', data: this.webhooks[webhookIndex] });
      return true;
    }
    return false;
  }

  // Webhook sil
  deleteWebhook(webhookId: string): boolean {
    const initialLength = this.webhooks.length;
    this.webhooks = this.webhooks.filter(w => w.id !== webhookId);
    if (this.webhooks.length < initialLength) {
      this.notifyObservers({ type: 'webhook-deleted', data: webhookId });
      return true;
    }
    return false;
  }

  // Webhook istatistikleri
  getWebhookStatistics(webhookId: string): WebhookStatistics | null {
    const webhook = this.webhooks.find(w => w.id === webhookId);
    if (!webhook) return null;

    const webhookDeliveries = this.deliveries.filter(d => d.webhookId === webhookId);
    const successfulDeliveries = webhookDeliveries.filter(d => d.status === 'delivered');
    const failedDeliveries = webhookDeliveries.filter(d => d.status === 'failed');

    const averageResponseTime = webhookDeliveries.length > 0
      ? webhookDeliveries.reduce((sum, d) => sum + (d.response?.duration || 0), 0) / webhookDeliveries.length
      : 0;

    const events: { [eventId: string]: { count: number; successRate: number } } = {};
    webhook.events.forEach(event => {
      const eventDeliveries = webhookDeliveries.filter(d => d.eventId === event.id);
      const eventSuccessful = eventDeliveries.filter(d => d.status === 'delivered');
      
      events[event.id] = {
        count: eventDeliveries.length,
        successRate: eventDeliveries.length > 0 ? (eventSuccessful.length / eventDeliveries.length) * 100 : 0
      };
    });

    return {
      webhookId,
      totalDeliveries: webhookDeliveries.length,
      successfulDeliveries: successfulDeliveries.length,
      failedDeliveries: failedDeliveries.length,
      averageResponseTime,
      lastDelivery: webhookDeliveries.length > 0 ? webhookDeliveries[webhookDeliveries.length - 1].timestamp : undefined,
      successRate: webhookDeliveries.length > 0 ? (successfulDeliveries.length / webhookDeliveries.length) * 100 : 0,
      events
    };
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
  getWebhooks(): SEOWebhook[] {
    return [...this.webhooks];
  }

  getDeliveries(): WebhookDelivery[] {
    return [...this.deliveries];
  }

  getLogs(): WebhookLog[] {
    return [...this.logs];
  }

  getTemplates(): WebhookTemplate[] {
    return [...this.templates];
  }

  getWebhookById(id: string): SEOWebhook | undefined {
    return this.webhooks.find(w => w.id === id);
  }

  getDeliveryById(id: string): WebhookDelivery | undefined {
    return this.deliveries.find(d => d.id === id);
  }
}

// React Hook
export function useSEOWebhookSystem() {
  const [webhooks, setWebhooks] = useState<SEOWebhook[]>([]);
  const [deliveries, setDeliveries] = useState<WebhookDelivery[]>([]);
  const [logs, setLogs] = useState<WebhookLog[]>([]);
  const [templates, setTemplates] = useState<WebhookTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const webhookSystem = SEOWebhookSystem.getInstance();

  useEffect(() => {
    const observer = (data: any) => {
      if (data.type.includes('webhook')) {
        setWebhooks(webhookSystem.getWebhooks());
      }
      if (data.type.includes('delivery')) {
        setDeliveries(webhookSystem.getDeliveries());
      }
      if (data.type.includes('log')) {
        setLogs(webhookSystem.getLogs());
      }
    };

    webhookSystem.addObserver(observer);
    setWebhooks(webhookSystem.getWebhooks());
    setDeliveries(webhookSystem.getDeliveries());
    setLogs(webhookSystem.getLogs());
    setTemplates(webhookSystem.getTemplates());

    return () => {
      webhookSystem.removeObserver(observer);
    };
  }, [webhookSystem]);

  const createWebhook = (webhook: Omit<SEOWebhook, 'id' | 'createdAt' | 'updatedAt' | 'successCount' | 'failureCount'>) => {
    return webhookSystem.createWebhook(webhook);
  };

  const createWebhookFromTemplate = (templateId: string, url: string, customizations?: Partial<SEOWebhook>) => {
    return webhookSystem.createWebhookFromTemplate(templateId, url, customizations);
  };

  const triggerWebhook = async (webhookId: string, eventId: string, payload: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const delivery = await webhookSystem.triggerWebhook(webhookId, eventId, payload);
      return delivery;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Webhook tetikleme hatası');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateWebhook = (webhookId: string, updates: Partial<SEOWebhook>) => {
    return webhookSystem.updateWebhook(webhookId, updates);
  };

  const deleteWebhook = (webhookId: string) => {
    return webhookSystem.deleteWebhook(webhookId);
  };

  const getWebhookStatistics = (webhookId: string) => {
    return webhookSystem.getWebhookStatistics(webhookId);
  };

  return {
    webhooks,
    deliveries,
    logs,
    templates,
    isLoading,
    error,
    createWebhook,
    createWebhookFromTemplate,
    triggerWebhook,
    updateWebhook,
    deleteWebhook,
    getWebhookStatistics,
    getWebhookById: webhookSystem.getWebhookById.bind(webhookSystem),
    getDeliveryById: webhookSystem.getDeliveryById.bind(webhookSystem)
  };
}

export default SEOWebhookSystem; 