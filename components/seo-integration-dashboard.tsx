'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Activity, 
  Database, 
  Webhook, 
  Plug, 
  Settings, 
  Play, 
  Pause, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Server,
  Network,
  Zap,
  Shield,
  Users,
  Globe,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

// API Gateway ve Webhook sistemlerini import et
import { useSEOAPIGateway } from '@/lib/seo-api-gateway';
import { useSEOWebhookSystem } from '@/lib/seo-webhook-system';
import { useSEOPluginSystem } from '@/lib/seo-plugin-system';
import { useSEODataPipelineSystem } from '@/lib/seo-data-pipeline';

interface DashboardStats {
  totalIntegrations: number;
  activeIntegrations: number;
  totalWebhooks: number;
  activeWebhooks: number;
  totalPlugins: number;
  activePlugins: number;
  totalPipelines: number;
  runningPipelines: number;
  successRate: number;
  averageResponseTime: number;
  totalRequests: number;
  errorRate: number;
}

export default function SEOIntegrationDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<DashboardStats>({
    totalIntegrations: 0,
    activeIntegrations: 0,
    totalWebhooks: 0,
    activeWebhooks: 0,
    totalPlugins: 0,
    activePlugins: 0,
    totalPipelines: 0,
    runningPipelines: 0,
    successRate: 0,
    averageResponseTime: 0,
    totalRequests: 0,
    errorRate: 0
  });

  // Sistem hook'larını kullan
  const apiGateway = useSEOAPIGateway();
  const webhookSystem = useSEOWebhookSystem();
  const pluginSystem = useSEOPluginSystem();
  const pipelineSystem = useSEODataPipelineSystem();

  // İstatistikleri güncelle
  useEffect(() => {
    const updateStats = () => {
      const newStats: DashboardStats = {
        totalIntegrations: apiGateway.integrations.length,
        activeIntegrations: apiGateway.integrations.filter(i => i.status === 'active').length,
        totalWebhooks: webhookSystem.webhooks.length,
        activeWebhooks: webhookSystem.webhooks.filter(w => w.status === 'active').length,
        totalPlugins: pluginSystem.plugins.length,
        activePlugins: pluginSystem.plugins.filter(p => p.status === 'active').length,
        totalPipelines: pipelineSystem.pipelines.length,
        runningPipelines: pipelineSystem.pipelines.filter(p => p.status === 'processing').length,
        successRate: calculateSuccessRate(),
        averageResponseTime: calculateAverageResponseTime(),
        totalRequests: calculateTotalRequests(),
        errorRate: calculateErrorRate()
      };
      setStats(newStats);
    };

    updateStats();
    const interval = setInterval(updateStats, 5000); // 5 saniyede bir güncelle

    return () => clearInterval(interval);
  }, [apiGateway, webhookSystem, pluginSystem, pipelineSystem]);

  const calculateSuccessRate = (): number => {
    const totalDeliveries = webhookSystem.deliveries.length;
    const successfulDeliveries = webhookSystem.deliveries.filter(d => d.status === 'delivered').length;
    return totalDeliveries > 0 ? (successfulDeliveries / totalDeliveries) * 100 : 0;
  };

  const calculateAverageResponseTime = (): number => {
    const deliveries = webhookSystem.deliveries.filter(d => d.response);
    if (deliveries.length === 0) return 0;
    const totalTime = deliveries.reduce((sum, d) => sum + (d.response?.duration || 0), 0);
    return totalTime / deliveries.length;
  };

  const calculateTotalRequests = (): number => {
    return apiGateway.requests.length + webhookSystem.deliveries.length;
  };

  const calculateErrorRate = (): number => {
    const totalRequests = calculateTotalRequests();
    const failedRequests = apiGateway.requests.filter(r => r.status >= 400).length +
                          webhookSystem.deliveries.filter(d => d.status === 'failed').length;
    return totalRequests > 0 ? (failedRequests / totalRequests) * 100 : 0;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active':
      case 'running':
      case 'delivered':
        return 'bg-green-500';
      case 'inactive':
      case 'stopped':
      case 'failed':
        return 'bg-red-500';
      case 'processing':
      case 'pending':
      case 'retrying':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'inactive':
        return 'Pasif';
      case 'running':
        return 'Çalışıyor';
      case 'stopped':
        return 'Durduruldu';
      case 'processing':
        return 'İşleniyor';
      case 'pending':
        return 'Bekliyor';
      case 'delivered':
        return 'Gönderildi';
      case 'failed':
        return 'Başarısız';
      case 'retrying':
        return 'Tekrar Deneniyor';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SEO Entegrasyon Dashboard</h1>
          <p className="text-muted-foreground">
            Tüm SEO entegrasyonlarınızı, webhook'larınızı, plugin'lerinizi ve pipeline'larınızı yönetin
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Yenile
          </Button>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Ayarlar
          </Button>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Entegrasyon</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalIntegrations}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeIntegrations} aktif
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Webhook'lar</CardTitle>
            <Webhook className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalWebhooks}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeWebhooks} aktif
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plugin'ler</CardTitle>
            <Plug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPlugins}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activePlugins} aktif
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline'lar</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPipelines}</div>
            <p className="text-xs text-muted-foreground">
              {stats.runningPipelines} çalışıyor
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performans Metrikleri */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Başarı Oranı</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successRate.toFixed(1)}%</div>
            <Progress value={stats.successRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Yanıt Süresi</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageResponseTime.toFixed(0)}ms</div>
            <p className="text-xs text-muted-foreground">
              Son 24 saat
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam İstek</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRequests}</div>
            <p className="text-xs text-muted-foreground">
              Bu ay
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hata Oranı</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.errorRate.toFixed(1)}%</div>
            <Progress value={stats.errorRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Ana İçerik */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="integrations">Entegrasyonlar</TabsTrigger>
          <TabsTrigger value="webhooks">Webhook'lar</TabsTrigger>
          <TabsTrigger value="plugins">Plugin'ler</TabsTrigger>
          <TabsTrigger value="pipelines">Pipeline'lar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* API Gateway Durumu */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="h-5 w-5 mr-2" />
                  API Gateway Durumu
                </CardTitle>
                <CardDescription>
                  API endpoint'leri ve entegrasyonlar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Aktif Endpoint'ler</span>
                  <Badge variant="secondary">{apiGateway.endpoints.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Aktif Entegrasyonlar</span>
                  <Badge variant="secondary">{stats.activeIntegrations}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Son 24 Saat İstek</span>
                  <Badge variant="secondary">{apiGateway.requests.length}</Badge>
                </div>
                {apiGateway.alerts.length > 0 && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Uyarı</AlertTitle>
                    <AlertDescription>
                      {apiGateway.alerts.length} aktif uyarı var
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Webhook Durumu */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Webhook className="h-5 w-5 mr-2" />
                  Webhook Durumu
                </CardTitle>
                <CardDescription>
                  Webhook'lar ve teslimat durumları
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Aktif Webhook'lar</span>
                  <Badge variant="secondary">{stats.activeWebhooks}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Başarılı Teslimat</span>
                  <Badge variant="secondary">
                    {webhookSystem.deliveries.filter(d => d.status === 'delivered').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Başarısız Teslimat</span>
                  <Badge variant="destructive">
                    {webhookSystem.deliveries.filter(d => d.status === 'failed').length}
                  </Badge>
                </div>
                {webhookSystem.logs.filter(l => l.level === 'error').length > 0 && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Hata</AlertTitle>
                    <AlertDescription>
                      {webhookSystem.logs.filter(l => l.level === 'error').length} hata log'u var
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Plugin Durumu */}
            <Card>
              <CardHeader>
                                  <CardTitle className="flex items-center">
                    <Plug className="h-5 w-5 mr-2" />
                    Plugin Durumu
                  </CardTitle>
                <CardDescription>
                  Yüklü plugin'ler ve durumları
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Aktif Plugin'ler</span>
                  <Badge variant="secondary">{stats.activePlugins}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Toplam Kategori</span>
                  <Badge variant="secondary">
                    {new Set(pluginSystem.plugins.map(p => p.category)).size}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Ortalama Puan</span>
                  <Badge variant="secondary">
                    {(pluginSystem.plugins.reduce((sum, p) => sum + p.rating, 0) / pluginSystem.plugins.length).toFixed(1)}
                  </Badge>
                </div>
                {pluginSystem.plugins.filter(p => p.status === 'error').length > 0 && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Plugin Hatası</AlertTitle>
                    <AlertDescription>
                      {pluginSystem.plugins.filter(p => p.status === 'error').length} plugin hatası var
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Pipeline Durumu */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Pipeline Durumu
                </CardTitle>
                <CardDescription>
                  Veri pipeline'ları ve işlem durumları
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Çalışan Pipeline'lar</span>
                  <Badge variant="secondary">{stats.runningPipelines}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Aktif Stream'ler</span>
                  <Badge variant="secondary">
                    {pipelineSystem.streams.filter(s => s.status === 'active').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Sağlıklı Microservice'ler</span>
                  <Badge variant="secondary">
                    {pipelineSystem.microservices.filter(m => m.health.status === 'healthy').length}
                  </Badge>
                </div>
                {pipelineSystem.pipelines.filter(p => p.status === 'error').length > 0 && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Pipeline Hatası</AlertTitle>
                    <AlertDescription>
                      {pipelineSystem.pipelines.filter(p => p.status === 'error').length} pipeline hatası var
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Entegrasyonları</CardTitle>
              <CardDescription>
                Tüm API entegrasyonlarınızı yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiGateway.integrations.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(integration.status)}`} />
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={integration.status === 'active' ? 'default' : 'secondary'}>
                        {getStatusText(integration.status)}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Webhook'lar</CardTitle>
              <CardDescription>
                Webhook'larınızı ve teslimat durumlarını görüntüleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {webhookSystem.webhooks.map((webhook) => (
                  <div key={webhook.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(webhook.status)}`} />
                      <div>
                        <h3 className="font-medium">{webhook.name}</h3>
                        <p className="text-sm text-muted-foreground">{webhook.description}</p>
                        <p className="text-xs text-muted-foreground">{webhook.url}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={webhook.status === 'active' ? 'default' : 'secondary'}>
                        {getStatusText(webhook.status)}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {webhook.successCount} başarılı / {webhook.failureCount} başarısız
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plugins" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Plugin'ler</CardTitle>
              <CardDescription>
                Yüklü plugin'lerinizi ve durumlarını yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pluginSystem.plugins.map((plugin) => (
                  <div key={plugin.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(plugin.status)}`} />
                      <div>
                        <h3 className="font-medium">{plugin.name}</h3>
                        <p className="text-sm text-muted-foreground">{plugin.description}</p>
                        <p className="text-xs text-muted-foreground">v{plugin.version} - {plugin.author}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={plugin.status === 'active' ? 'default' : 'secondary'}>
                        {getStatusText(plugin.status)}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        ⭐ {plugin.rating.toFixed(1)}
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipelines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pipeline'lar</CardTitle>
              <CardDescription>
                Veri pipeline'larınızı ve işlem durumlarını izleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pipelineSystem.pipelines.map((pipeline) => (
                  <div key={pipeline.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(pipeline.status)}`} />
                      <div>
                        <h3 className="font-medium">{pipeline.name}</h3>
                        <p className="text-sm text-muted-foreground">{pipeline.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {pipeline.stages.length} aşama - {pipeline.metrics.successRate.toFixed(1)}% başarı
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={pipeline.status === 'active' ? 'default' : 'secondary'}>
                        {getStatusText(pipeline.status)}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 