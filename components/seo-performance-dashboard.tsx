'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  Shield,
  Users,
  Target,
  BarChart3,
  Eye,
  Globe,
  Smartphone,
  Accessibility,
  Settings,
  Bell,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';
import { 
  useSEOPerformanceMonitor, 
  PerformanceMetric, 
  SEOAlert, 
  PerformanceReport 
} from '@/lib/seo-performance-monitor';

export default function SEOPerformanceDashboard() {
  const [isMonitoring, setIsMonitoring] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [alerts, setAlerts] = useState<SEOAlert[]>([]);
  const [performanceReport, setPerformanceReport] = useState<PerformanceReport | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string>('all');

  const {
    startMonitoring,
    stopMonitoring,
    getMetrics,
    getAlerts,
    getActiveAlerts,
    acknowledgeAlert,
    resolveAlert,
    isMonitoringActive,
    getPerformanceReport
  } = useSEOPerformanceMonitor();

  useEffect(() => {
    updateData();
    const interval = setInterval(updateData, 30000); // 30 saniyede bir güncelle
    return () => clearInterval(interval);
  }, []);

  const updateData = () => {
    setMetrics(getMetrics());
    setAlerts(getAlerts());
    setPerformanceReport(getPerformanceReport());
    setIsMonitoring(isMonitoringActive());
  };

  const handleStartMonitoring = () => {
    startMonitoring();
    updateData();
  };

  const handleStopMonitoring = () => {
    stopMonitoring();
    updateData();
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    acknowledgeAlert(alertId);
    updateData();
  };

  const handleResolveAlert = (alertId: string) => {
    resolveAlert(alertId);
    updateData();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'good':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return <Badge className="bg-green-100 text-green-800">Mükemmel</Badge>;
      case 'good':
        return <Badge className="bg-blue-100 text-blue-800">İyi</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Uyarı</Badge>;
      case 'critical':
        return <Badge className="bg-red-100 text-red-800">Kritik</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Bilinmiyor</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800">Kritik</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800">Yüksek</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Orta</Badge>;
      case 'low':
        return <Badge className="bg-blue-100 text-blue-800">Düşük</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Bilinmiyor</Badge>;
    }
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <div className="h-4 w-4" />;
  };

  const filteredMetrics = selectedMetric === 'all' 
    ? metrics 
    : metrics.filter(metric => metric.status === selectedMetric);

  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  const criticalAlerts = activeAlerts.filter(alert => alert.severity === 'critical');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO Performans İzleme</h1>
          <p className="text-gray-600">Gerçek zamanlı SEO performans metrikleri ve alert sistemi</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            onClick={isMonitoring ? handleStopMonitoring : handleStartMonitoring}
            variant={isMonitoring ? "destructive" : "default"}
          >
            {isMonitoring ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                İzlemeyi Durdur
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                İzlemeyi Başlat
              </>
            )}
          </Button>
          <Button variant="outline" onClick={updateData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Yenile
          </Button>
        </div>
      </div>

      {/* Genel Durum Kartları */}
      {performanceReport && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{performanceReport.summary.overallScore}</div>
                  <div className="text-sm text-gray-600">Genel Skor</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-red-600" />
                <div>
                  <div className="text-2xl font-bold">{performanceReport.summary.totalAlerts}</div>
                  <div className="text-sm text-gray-600">Aktif Alert</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">{performanceReport.summary.uptime}%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">{performanceReport.summary.averageResponseTime}ms</div>
                  <div className="text-sm text-gray-600">Ort. Yanıt Süresi</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Kritik Alertler */}
      {criticalAlerts.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              <span>Kritik Alertler</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                  <div className="flex items-center space-x-3">
                    <XCircle className="h-5 w-5 text-red-500" />
                    <div>
                      <div className="font-medium text-red-800">{alert.title}</div>
                      <div className="text-sm text-red-600">{alert.description}</div>
                      <div className="text-xs text-red-500">
                        {alert.timestamp.toLocaleDateString('tr-TR')} {alert.timestamp.toLocaleTimeString('tr-TR')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getSeverityBadge(alert.severity)}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAcknowledgeAlert(alert.id)}
                    >
                      Kabul Et
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleResolveAlert(alert.id)}
                    >
                      Çözüldü
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ana Dashboard */}
      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="metrics">Performans Metrikleri</TabsTrigger>
          <TabsTrigger value="alerts">Alertler</TabsTrigger>
          <TabsTrigger value="trends">Trendler</TabsTrigger>
          <TabsTrigger value="settings">Ayarlar</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          {/* Filtre */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Durum Filtresi:</span>
            <select 
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">Tümü</option>
              <option value="excellent">Mükemmel</option>
              <option value="good">İyi</option>
              <option value="warning">Uyarı</option>
              <option value="critical">Kritik</option>
            </select>
          </div>

          {/* Metrikler Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMetrics.map((metric) => (
              <Card key={metric.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(metric.status)}
                      <CardTitle className="text-lg">{metric.name}</CardTitle>
                    </div>
                    {getTrendIcon(metric.trend)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-end space-x-2">
                      <span className="text-3xl font-bold text-gray-900">
                        {metric.value.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-600 mb-1">{metric.unit}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${
                        metric.trend > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.trend > 0 ? '+' : ''}{metric.trend.toFixed(1)}%
                      </span>
                      <span className="text-sm text-gray-500">trend</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Uyarı: {metric.threshold.warning}</span>
                        <span>Kritik: {metric.threshold.critical}</span>
                      </div>
                      <Progress 
                        value={Math.min(100, (metric.value / metric.threshold.warning) * 100)} 
                        className="h-2"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      {getStatusBadge(metric.status)}
                      <span className="text-xs text-gray-500">
                        Son güncelleme: {metric.lastUpdated.toLocaleTimeString('tr-TR')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="space-y-4">
            {activeAlerts.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aktif Alert Yok</h3>
                  <p className="text-gray-600">Tüm sistemler normal çalışıyor.</p>
                </CardContent>
              </Card>
            ) : (
              activeAlerts.map((alert) => (
                <Card key={alert.id} className={
                  alert.severity === 'critical' ? 'border-red-200' :
                  alert.severity === 'high' ? 'border-orange-200' :
                  'border-yellow-200'
                }>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {alert.severity === 'critical' ? (
                          <XCircle className="h-5 w-5 text-red-500 mt-1" />
                        ) : alert.severity === 'high' ? (
                          <AlertTriangle className="h-5 w-5 text-orange-500 mt-1" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium">{alert.title}</h4>
                            {getSeverityBadge(alert.severity)}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                          <div className="text-xs text-gray-500">
                            {alert.timestamp.toLocaleDateString('tr-TR')} {alert.timestamp.toLocaleTimeString('tr-TR')}
                          </div>
                          {alert.actions.length > 0 && (
                            <div className="mt-2">
                              <span className="text-xs font-medium text-gray-700">Aksiyonlar:</span>
                              <div className="mt-1 space-y-1">
                                {alert.actions.map((action) => (
                                  <div key={action.id} className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-600">• {action.name}</span>
                                    <Badge className="text-xs" variant="outline">
                                      {action.status}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAcknowledgeAlert(alert.id)}
                        >
                          Kabul Et
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleResolveAlert(alert.id)}
                        >
                          Çözüldü
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics.slice(0, 6).map((metric) => (
              <Card key={metric.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{metric.name} Trendi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Mevcut Değer</span>
                      <span className="font-medium">{metric.value.toLocaleString()} {metric.unit}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Trend</span>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(metric.trend)}
                        <span className={`text-sm font-medium ${
                          metric.trend > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.trend > 0 ? '+' : ''}{metric.trend.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Durum</span>
                      {getStatusBadge(metric.status)}
                    </div>
                    {metric.history.length > 0 && (
                      <div className="mt-3">
                        <div className="text-xs text-gray-600 mb-2">Son 5 gün:</div>
                        <div className="flex items-end space-x-1 h-16">
                          {metric.history.slice(-5).map((point, index) => (
                            <div
                              key={index}
                              className="flex-1 bg-blue-100 rounded-t"
                              style={{
                                height: `${Math.max(10, (point.value / Math.max(...metric.history.map(p => p.value))) * 100)}%`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>İzleme Ayarları</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">İzleme Durumu</div>
                    <div className="text-sm text-gray-600">
                      {isMonitoring ? 'Aktif' : 'Pasif'}
                    </div>
                  </div>
                  <Button 
                    onClick={isMonitoring ? handleStopMonitoring : handleStartMonitoring}
                    variant={isMonitoring ? "destructive" : "default"}
                    size="sm"
                  >
                    {isMonitoring ? 'Durdur' : 'Başlat'}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Kontrol Aralığı</div>
                    <div className="text-sm text-gray-600">5 dakika</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Düzenle
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Alert Kanalları</div>
                    <div className="text-sm text-gray-600">E-posta aktif</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Yapılandır
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 