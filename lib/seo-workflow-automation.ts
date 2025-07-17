import { useEffect, useState } from 'react';

// SEO Workflow Interface'leri
export interface SEOWorkflow {
  id: string;
  name: string;
  description: string;
  category: 'content' | 'technical' | 'link-building' | 'local' | 'ecommerce' | 'custom';
  status: 'draft' | 'active' | 'paused' | 'completed' | 'failed';
  priority: 'critical' | 'high' | 'medium' | 'low';
  triggers: WorkflowTrigger[];
  steps: WorkflowStep[];
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  schedule: {
    type: 'manual' | 'daily' | 'weekly' | 'monthly' | 'custom';
    interval?: number; // minutes
    startDate?: Date;
    endDate?: Date;
    timezone: string;
  };
  settings: {
    autoStart: boolean;
    retryOnFailure: boolean;
    maxRetries: number;
    timeout: number; // seconds
    parallelExecution: boolean;
    notifications: {
      email: boolean;
      slack: boolean;
      dashboard: boolean;
    };
  };
  metrics: {
    totalRuns: number;
    successfulRuns: number;
    failedRuns: number;
    averageDuration: number;
    lastRun?: Date;
    nextRun?: Date;
  };
}

export interface WorkflowTrigger {
  id: string;
  type: 'schedule' | 'event' | 'condition' | 'manual';
  name: string;
  description: string;
  enabled: boolean;
  config: {
    cron?: string;
    event?: string;
    condition?: string;
    threshold?: number;
  };
}

export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  type: 'analysis' | 'optimization' | 'content' | 'technical' | 'reporting' | 'notification';
  order: number;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  dependencies: string[]; // step IDs
  timeout: number; // seconds
  retryCount: number;
  maxRetries: number;
  config: {
    action: string;
    parameters: Record<string, any>;
    conditions: string[];
  };
  results?: {
    success: boolean;
    data: any;
    error?: string;
    duration: number;
    timestamp: Date;
  };
}

export interface WorkflowCondition {
  id: string;
  name: string;
  description: string;
  type: 'if' | 'else' | 'while' | 'switch';
  expression: string;
  enabled: boolean;
  actions: string[]; // action IDs
}

export interface WorkflowAction {
  id: string;
  name: string;
  description: string;
  type: 'seo' | 'content' | 'technical' | 'reporting' | 'notification' | 'custom';
  category: 'analysis' | 'optimization' | 'creation' | 'monitoring' | 'communication';
  enabled: boolean;
  config: {
    method: string;
    url?: string;
    headers?: Record<string, string>;
    body?: any;
    timeout: number;
  };
  results?: {
    success: boolean;
    data: any;
    error?: string;
    timestamp: Date;
  };
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: Date;
  endTime?: Date;
  duration?: number;
  steps: WorkflowStepExecution[];
  logs: WorkflowLog[];
  results: {
    success: boolean;
    summary: string;
    data: any;
    errors: string[];
  };
}

export interface WorkflowStepExecution {
  stepId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  startTime: Date;
  endTime?: Date;
  duration?: number;
  results?: any;
  error?: string;
  retries: number;
}

export interface WorkflowLog {
  id: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  timestamp: Date;
  stepId?: string;
  data?: any;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // minutes
  steps: {
    name: string;
    description: string;
    type: string;
    config: any;
  }[];
  triggers: {
    type: string;
    config: any;
  }[];
  conditions: {
    expression: string;
    actions: string[];
  }[];
}

export class SEOWorkflowAutomation {
  private static instance: SEOWorkflowAutomation;
  private workflows: SEOWorkflow[] = [];
  private executions: WorkflowExecution[] = [];
  private templates: WorkflowTemplate[] = [];
  private observers: Set<(data: any) => void> = new Set();

  private constructor() {
    this.initializeTemplates();
  }

  static getInstance(): SEOWorkflowAutomation {
    if (!SEOWorkflowAutomation.instance) {
      SEOWorkflowAutomation.instance = new SEOWorkflowAutomation();
    }
    return SEOWorkflowAutomation.instance;
  }

  // Varsayılan şablonları oluştur
  private initializeTemplates(): void {
    this.templates = [
      {
        id: 'content-optimization-workflow',
        name: 'İçerik Optimizasyonu Workflow',
        description: 'Otomatik içerik analizi ve optimizasyonu',
        category: 'content',
        difficulty: 'medium',
        estimatedTime: 30,
        steps: [
          {
            name: 'İçerik Analizi',
            description: 'Mevcut içerikleri SEO açısından analiz et',
            type: 'analysis',
            config: {
              action: 'analyzeContent',
              parameters: { includeKeywords: true, checkReadability: true }
            }
          },
          {
            name: 'Anahtar Kelime Analizi',
            description: 'Anahtar kelime performansını kontrol et',
            type: 'analysis',
            config: {
              action: 'analyzeKeywords',
              parameters: { checkRankings: true, analyzeCompetition: true }
            }
          },
          {
            name: 'İçerik Optimizasyonu',
            description: 'İçerikleri SEO açısından optimize et',
            type: 'optimization',
            config: {
              action: 'optimizeContent',
              parameters: { updateMetaTags: true, improveReadability: true }
            }
          },
          {
            name: 'Rapor Oluştur',
            description: 'Optimizasyon raporu oluştur',
            type: 'reporting',
            config: {
              action: 'generateReport',
              parameters: { includeRecommendations: true }
            }
          }
        ],
        triggers: [
          {
            type: 'schedule',
            config: { cron: '0 9 * * 1' } // Her Pazartesi saat 9
          }
        ],
        conditions: [
          {
            expression: 'contentNeedsOptimization',
            actions: ['optimizeContent', 'generateReport']
          }
        ]
      },
      {
        id: 'technical-seo-workflow',
        name: 'Teknik SEO Workflow',
        description: 'Teknik SEO sorunlarını otomatik tespit et ve çöz',
        category: 'technical',
        difficulty: 'hard',
        estimatedTime: 45,
        steps: [
          {
            name: 'Teknik SEO Denetimi',
            description: 'Site genelinde teknik SEO denetimi yap',
            type: 'analysis',
            config: {
              action: 'technicalAudit',
              parameters: { checkCoreWebVitals: true, analyzePerformance: true }
            }
          },
          {
            name: 'Hız Optimizasyonu',
            description: 'Sayfa hızı optimizasyonları uygula',
            type: 'optimization',
            config: {
              action: 'optimizeSpeed',
              parameters: { compressImages: true, minifyCode: true }
            }
          },
          {
            name: 'Schema Markup Kontrolü',
            description: 'Schema markup\'ları kontrol et ve güncelle',
            type: 'technical',
            config: {
              action: 'checkSchemaMarkup',
              parameters: { validateSchema: true, updateMissing: true }
            }
          },
          {
            name: 'Core Web Vitals İzleme',
            description: 'Core Web Vitals metriklerini izle',
            type: 'monitoring',
            config: {
              action: 'monitorCoreWebVitals',
              parameters: { trackLCP: true, trackFID: true, trackCLS: true }
            }
          }
        ],
        triggers: [
          {
            type: 'schedule',
            config: { cron: '0 6 * * *' } // Her gün saat 6
          }
        ],
        conditions: [
          {
            expression: 'performanceIssuesDetected',
            actions: ['optimizeSpeed', 'sendAlert']
          }
        ]
      },
      {
        id: 'link-building-workflow',
        name: 'Link Building Workflow',
        description: 'Otomatik link building süreçleri',
        category: 'link-building',
        difficulty: 'hard',
        estimatedTime: 60,
        steps: [
          {
            name: 'Rakip Link Analizi',
            description: 'Rakip backlink profillerini analiz et',
            type: 'analysis',
            config: {
              action: 'analyzeCompetitorLinks',
              parameters: { topCompetitors: 5, analyzeQuality: true }
            }
          },
          {
            name: 'Link Fırsatları Tespit',
            description: 'Potansiyel link fırsatlarını belirle',
            type: 'analysis',
            config: {
              action: 'findLinkOpportunities',
              parameters: { outreachTargets: 20, checkDomainAuthority: true }
            }
          },
          {
            name: 'Outreach Kampanyası',
            description: 'Otomatik outreach mesajları gönder',
            type: 'communication',
            config: {
              action: 'sendOutreachEmails',
              parameters: { personalizedMessages: true, followUp: true }
            }
          },
          {
            name: 'Link Takibi',
            description: 'Link kazanımlarını takip et',
            type: 'monitoring',
            config: {
              action: 'trackLinkAcquisitions',
              parameters: { monitorIndexing: true, checkQuality: true }
            }
          }
        ],
        triggers: [
          {
            type: 'schedule',
            config: { cron: '0 10 * * 2' } // Her Salı saat 10
          }
        ],
        conditions: [
          {
            expression: 'newLinkOpportunitiesFound',
            actions: ['sendOutreachEmails', 'trackResults']
          }
        ]
      }
    ];
  }

  // Workflow oluştur
  createWorkflow(workflow: Omit<SEOWorkflow, 'id' | 'metrics'>): SEOWorkflow {
    const newWorkflow: SEOWorkflow = {
      ...workflow,
      id: `workflow-${Date.now()}`,
      metrics: {
        totalRuns: 0,
        successfulRuns: 0,
        failedRuns: 0,
        averageDuration: 0
      }
    };

    this.workflows.push(newWorkflow);
    this.notifyObservers({ type: 'workflow-created', data: newWorkflow });
    return newWorkflow;
  }

  // Şablon tabanlı workflow oluştur
  createWorkflowFromTemplate(templateId: string, customizations?: Partial<SEOWorkflow>): SEOWorkflow | null {
    const template = this.templates.find(t => t.id === templateId);
    if (!template) return null;

    const steps: WorkflowStep[] = template.steps.map((step, index) => ({
      id: `step-${Date.now()}-${index}`,
      name: step.name,
      description: step.description,
      type: step.type as any,
      order: index + 1,
      status: 'pending',
      dependencies: [],
      timeout: 300,
      retryCount: 0,
      maxRetries: 3,
      config: step.config
    }));

    const triggers: WorkflowTrigger[] = template.triggers.map((trigger, index) => ({
      id: `trigger-${Date.now()}-${index}`,
      type: trigger.type as any,
      name: `${trigger.type} Trigger`,
      description: `Otomatik tetikleyici`,
      enabled: true,
      config: trigger.config
    }));

    const conditions: WorkflowCondition[] = template.conditions.map((condition, index) => ({
      id: `condition-${Date.now()}-${index}`,
      name: `Condition ${index + 1}`,
      description: condition.expression,
      type: 'if',
      expression: condition.expression,
      enabled: true,
      actions: condition.actions
    }));

    const workflow: SEOWorkflow = {
      id: `workflow-${Date.now()}`,
      name: template.name,
      description: template.description,
      category: template.category as any,
      status: 'draft',
      priority: 'medium',
      triggers,
      steps,
      conditions,
      actions: [],
      schedule: {
        type: 'weekly',
        timezone: 'Europe/Istanbul'
      },
      settings: {
        autoStart: false,
        retryOnFailure: true,
        maxRetries: 3,
        timeout: 3600,
        parallelExecution: false,
        notifications: {
          email: true,
          slack: false,
          dashboard: true
        }
      },
      metrics: {
        totalRuns: 0,
        successfulRuns: 0,
        failedRuns: 0,
        averageDuration: 0
      },
      ...customizations
    };

    this.workflows.push(workflow);
    this.notifyObservers({ type: 'workflow-created', data: workflow });
    return workflow;
  }

  // Workflow başlat
  async startWorkflow(workflowId: string): Promise<WorkflowExecution | null> {
    const workflow = this.workflows.find(w => w.id === workflowId);
    if (!workflow || workflow.status !== 'active') return null;

    const execution: WorkflowExecution = {
      id: `execution-${Date.now()}`,
      workflowId,
      status: 'running',
      startTime: new Date(),
      steps: workflow.steps.map(step => ({
        stepId: step.id,
        status: 'pending',
        startTime: new Date(),
        retries: 0
      })),
      logs: [],
      results: {
        success: false,
        summary: '',
        data: {},
        errors: []
      }
    };

    this.executions.push(execution);
    workflow.status = 'active';
    workflow.metrics.totalRuns++;

    // Workflow adımlarını sırayla çalıştır
    try {
      for (const step of workflow.steps) {
        const stepExecution = execution.steps.find(s => s.stepId === step.id);
        if (!stepExecution) continue;

        stepExecution.status = 'running';
        stepExecution.startTime = new Date();

        try {
          // Adım çalıştırma simülasyonu
          await this.executeStep(step, execution);
          
          stepExecution.status = 'completed';
          stepExecution.endTime = new Date();
          stepExecution.duration = stepExecution.endTime.getTime() - stepExecution.startTime.getTime();
        } catch (error) {
          stepExecution.status = 'failed';
          stepExecution.error = error instanceof Error ? error.message : 'Bilinmeyen hata';
          stepExecution.endTime = new Date();
          
          execution.logs.push({
            id: `log-${Date.now()}`,
            level: 'error',
            message: `Adım başarısız: ${step.name}`,
            timestamp: new Date(),
            stepId: step.id,
            data: { error: stepExecution.error }
          });
        }
      }

      // Workflow tamamlandı
      execution.status = 'completed';
      execution.endTime = new Date();
      execution.duration = execution.endTime.getTime() - execution.startTime.getTime();
      execution.results.success = true;
      execution.results.summary = 'Workflow başarıyla tamamlandı';

      workflow.metrics.successfulRuns++;
      workflow.metrics.averageDuration = this.calculateAverageDuration(workflow);

    } catch (error) {
      execution.status = 'failed';
      execution.endTime = new Date();
      execution.results.success = false;
      execution.results.summary = 'Workflow başarısız oldu';
      execution.results.errors.push(error instanceof Error ? error.message : 'Bilinmeyen hata');

      workflow.metrics.failedRuns++;
    }

    this.notifyObservers({ type: 'workflow-executed', data: execution });
    return execution;
  }

  // Adım çalıştır
  private async executeStep(step: WorkflowStep, execution: WorkflowExecution): Promise<void> {
    // Adım çalıştırma simülasyonu
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = {
      success: true,
      data: { message: `${step.name} başarıyla tamamlandı` },
      error: undefined,
      duration: 1000,
      timestamp: new Date()
    };

    step.results = result;

    execution.logs.push({
      id: `log-${Date.now()}`,
      level: 'info',
      message: `${step.name} tamamlandı`,
      timestamp: new Date(),
      stepId: step.id,
      data: result.data
    });
  }

  // Ortalama süre hesapla
  private calculateAverageDuration(workflow: SEOWorkflow): number {
    const completedExecutions = this.executions.filter(e => 
      e.workflowId === workflow.id && e.status === 'completed' && e.duration
    );

    if (completedExecutions.length === 0) return 0;

    const totalDuration = completedExecutions.reduce((sum, e) => sum + (e.duration || 0), 0);
    return totalDuration / completedExecutions.length;
  }

  // Workflow durdur
  stopWorkflow(workflowId: string): boolean {
    const workflow = this.workflows.find(w => w.id === workflowId);
    if (workflow && workflow.status === 'active') {
      workflow.status = 'paused';
      this.notifyObservers({ type: 'workflow-stopped', data: workflow });
      return true;
    }
    return false;
  }

  // Workflow güncelle
  updateWorkflow(workflowId: string, updates: Partial<SEOWorkflow>): boolean {
    const workflowIndex = this.workflows.findIndex(w => w.id === workflowId);
    if (workflowIndex !== -1) {
      this.workflows[workflowIndex] = { ...this.workflows[workflowIndex], ...updates };
      this.notifyObservers({ type: 'workflow-updated', data: this.workflows[workflowIndex] });
      return true;
    }
    return false;
  }

  // Workflow sil
  deleteWorkflow(workflowId: string): boolean {
    const initialLength = this.workflows.length;
    this.workflows = this.workflows.filter(w => w.id !== workflowId);
    if (this.workflows.length < initialLength) {
      this.notifyObservers({ type: 'workflow-deleted', data: workflowId });
      return true;
    }
    return false;
  }

  // Workflow raporu oluştur
  generateWorkflowReport(): {
    totalWorkflows: number;
    activeWorkflows: number;
    completedExecutions: number;
    successRate: number;
    averageExecutionTime: number;
    topWorkflows: SEOWorkflow[];
  } {
    const activeWorkflows = this.workflows.filter(w => w.status === 'active').length;
    const completedExecutions = this.executions.filter(e => e.status === 'completed').length;
    const totalExecutions = this.executions.length;
    const successRate = totalExecutions > 0 ? (completedExecutions / totalExecutions) * 100 : 0;

    const averageExecutionTime = this.executions.length > 0
      ? this.executions.reduce((sum, e) => sum + (e.duration || 0), 0) / this.executions.length
      : 0;

    const topWorkflows = this.workflows
      .sort((a, b) => b.metrics.successfulRuns - a.metrics.successfulRuns)
      .slice(0, 5);

    return {
      totalWorkflows: this.workflows.length,
      activeWorkflows,
      completedExecutions,
      successRate,
      averageExecutionTime,
      topWorkflows
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
  getWorkflows(): SEOWorkflow[] {
    return [...this.workflows];
  }

  getExecutions(): WorkflowExecution[] {
    return [...this.executions];
  }

  getTemplates(): WorkflowTemplate[] {
    return [...this.templates];
  }

  getWorkflowById(id: string): SEOWorkflow | undefined {
    return this.workflows.find(w => w.id === id);
  }

  getExecutionById(id: string): WorkflowExecution | undefined {
    return this.executions.find(e => e.id === id);
  }
}

// React Hook
export function useSEOWorkflowAutomation() {
  const [workflows, setWorkflows] = useState<SEOWorkflow[]>([]);
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);
  const [templates, setTemplates] = useState<WorkflowTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const automation = SEOWorkflowAutomation.getInstance();

  useEffect(() => {
    const observer = (data: any) => {
      if (data.type.includes('workflow')) {
        setWorkflows(automation.getWorkflows());
      }
      if (data.type.includes('execution')) {
        setExecutions(automation.getExecutions());
      }
    };

    automation.addObserver(observer);
    setWorkflows(automation.getWorkflows());
    setExecutions(automation.getExecutions());
    setTemplates(automation.getTemplates());

    return () => {
      automation.removeObserver(observer);
    };
  }, [automation]);

  const createWorkflow = (workflow: Omit<SEOWorkflow, 'id' | 'metrics'>) => {
    return automation.createWorkflow(workflow);
  };

  const createWorkflowFromTemplate = (templateId: string, customizations?: Partial<SEOWorkflow>) => {
    return automation.createWorkflowFromTemplate(templateId, customizations);
  };

  const startWorkflow = async (workflowId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const execution = await automation.startWorkflow(workflowId);
      return execution;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Workflow başlatma hatası');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const stopWorkflow = (workflowId: string) => {
    return automation.stopWorkflow(workflowId);
  };

  const generateReport = () => {
    return automation.generateWorkflowReport();
  };

  return {
    workflows,
    executions,
    templates,
    isLoading,
    error,
    createWorkflow,
    createWorkflowFromTemplate,
    startWorkflow,
    stopWorkflow,
    generateReport,
    getWorkflowById: automation.getWorkflowById.bind(automation),
    getExecutionById: automation.getExecutionById.bind(automation)
  };
}

export default SEOWorkflowAutomation; 