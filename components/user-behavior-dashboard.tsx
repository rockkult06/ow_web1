'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  MousePointer, 
  Scroll, 
  Clock,
  TrendingUp,
  TrendingDown,
  Eye,
  Activity,
  Target,
  BarChart3,
  Smartphone,
  Globe,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Share2
} from 'lucide-react';
import { 
  useUserBehaviorAnalytics, 
  BehaviorAnalyticsReport,
  HeatmapDataPoint,
  ClickMapData 
} from '@/lib/user-behavior-analytics';
import { 
  useUXSEORecommender, 
  UXSEORecommendation,
  UserBehaviorData,
  SEOFactors 
} from '@/lib/ux-seo-recommender';

export default function UserBehaviorDashboard() {
  const [selectedUrl, setSelectedUrl] = useState<string>('https://optimizeworld.net');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('30d');
  const [behaviorReport, setBehaviorReport] = useState<BehaviorAnalyticsReport | null>(null);
  const [recommendations, setRecommendations] = useState<UXSEORecommendation[]>([]);
  const [implementationPlan, setImplementationPlan] = useState<any>(null);

  const analytics = useUserBehaviorAnalytics();
  const { generateRecommendations, generateImplementationPlan } = useUXSEORecommender();

  useEffect(() => {
    generateReport();
  }, [selectedUrl, selectedPeriod]);

  const generateReport = () => {
    // Simüle edilmiş davranış verisi
    const mockBehaviorData: UserBehaviorData = {
      bounceRate: 42.3,
      avgSessionDuration: 145,
      avgScrollDepth: 65,
      exitIntentRate: 15.2,
      clickMap: {
        'cta-button': 156,
        'navigation-menu': 89,
        'contact-form': 67,
        'read-more': 45,
        'social-share': 23
      },
      scrollMap: [100, 85, 72, 58, 45, 32, 28, 15, 8, 3],
      heatmap: [
        { x: 100, y: 200, count: 45 },
        { x: 300, y: 150, count: 32 },
        { x: 500, y: 300, count: 28 },
        { x: 200, y: 400, count: 15 },
        { x: 400, y: 500, count: 8 }
      ],
      formAbandonmentRate: 25.4,
      mobileUsage: 68,
      pageLoadTime: 2.1
    };

    const mockSEOFactors: SEOFactors = {
      pageSpeed: 89,
      mobileScore: 94,
      accessibilityScore: 82,
      contentLength: 1200,
      internalLinks: 15,
      externalLinks: 8,
      images: 12,
      videos: 2,
      forms: 3
    };

    // Davranış raporu oluştur
    const report = analytics.generateReport(selectedUrl, selectedPeriod);
    setBehaviorReport(report);

    // UX/SEO önerileri oluştur
    const recs = generateRecommendations(mockBehaviorData, mockSEOFactors);
    setRecommendations(recs);

    // Uygulama planı oluştur
    const plan = generateImplementationPlan(recs);
    setImplementationPlan(plan);
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">Yüksek</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Orta</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Düşük</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Bilinmiyor</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance':
        return <Zap className="h-4 w-4" />;
      case 'content':
        return <BarChart3 className="h-4 w-4" />;
      case 'layout':
        return <Globe className="h-4 w-4" />;
      case 'navigation':
        return <Target className="h-4 w-4" />;
      case 'conversion':
        return <MousePointer className="h-4 w-4" />;
      case 'accessibility':
        return <Eye className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kullanıcı Davranışı Analizi</h1>
          <p className="text-gray-600">Kullanıcı davranışları ve UX/SEO önerileri</p>
        </div>
        <div className="flex items-center space-x-2">
          <select 
            value={selectedUrl}
            onChange={(e) => setSelectedUrl(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="https://optimizeworld.net">Ana Sayfa</option>
            <option value="https://optimizeworld.net/solutions">Çözümler</option>
            <option value="https://optimizeworld.net/about">Hakkımızda</option>
            <option value="https://optimizeworld.net/contact">İletişim</option>
          </select>
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Son 7 Gün</option>
            <option value="30d">Son 30 Gün</option>
            <option value="90d">Son 90 Gün</option>
          </select>
          <Button onClick={generateReport}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Yenile
          </Button>
        </div>
      </div>

      {/* Davranış Metrikleri */}
      {behaviorReport && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{behaviorReport.totalSessions.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Toplam Oturum</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">{Math.round(behaviorReport.avgSessionDuration)}s</div>
                  <div className="text-sm text-gray-600">Ort. Oturum Süresi</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Scroll className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">{Math.round(behaviorReport.avgScrollDepth)}%</div>
                  <div className="text-sm text-gray-600">Ort. Scroll Derinliği</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold">{behaviorReport.bounceRate.toFixed(1)}%</div>
                  <div className="text-sm text-gray-600">Hemen Çıkma Oranı</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Ana Dashboard */}
      <Tabs defaultValue="behavior" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="behavior">Davranış Analizi</TabsTrigger>
          <TabsTrigger value="recommendations">UX/SEO Önerileri</TabsTrigger>
          <TabsTrigger value="implementation">Uygulama Planı</TabsTrigger>
          <TabsTrigger value="heatmap">Isı Haritası</TabsTrigger>
        </TabsList>

        <TabsContent value="behavior" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Scroll Derinliği Dağılımı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {behaviorReport?.scrollDepth.distribution.map((count, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-12 text-sm text-gray-600">
                        {index * 10}-{(index + 1) * 10}%
                      </div>
                      <div className="flex-1">
                        <Progress value={(count / Math.max(...behaviorReport.scrollDepth.distribution)) * 100} className="h-2" />
                      </div>
                      <div className="w-8 text-sm text-gray-600">{count}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>En Çok Tıklanan Elementler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {behaviorReport?.topClickedElements.map((element, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                          {index + 1}
                        </div>
                        <span className="font-medium">{element.element}</span>
                      </div>
                      <div className="text-sm text-gray-600">{element.count} tıklama</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Davranışsal Öneriler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {behaviorReport?.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-1" />
                    <span className="text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <Card key={rec.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getCategoryIcon(rec.category)}
                      <CardTitle className="text-lg">{rec.title}</CardTitle>
                    </div>
                    {getPriorityBadge(rec.priority)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600">{rec.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Etki</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>SEO</span>
                            <span>{rec.impact.seo}%</span>
                          </div>
                          <Progress value={rec.impact.seo} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>UX</span>
                            <span>{rec.impact.ux}%</span>
                          </div>
                          <Progress value={rec.impact.ux} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Dönüşüm</span>
                            <span>{rec.impact.conversion}%</span>
                          </div>
                          <Progress value={rec.impact.conversion} className="h-2" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Uygulama</h4>
                        <div className="text-sm space-y-1">
                          <div><span className="font-medium">Çaba:</span> {rec.effort}</div>
                          <div><span className="font-medium">Süre:</span> {rec.estimatedTime}</div>
                          <div><span className="font-medium">Maliyet:</span> {rec.cost}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">SEO Faktörleri</h4>
                        <div className="text-sm space-y-1">
                          {rec.seoFactors.map((factor, index) => (
                            <div key={index} className="flex items-center space-x-1">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>{factor}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Uygulama Adımları</h4>
                      <div className="space-y-1">
                        {rec.implementation.map((step, index) => (
                          <div key={index} className="flex items-start space-x-2 text-sm">
                            <span className="text-blue-500">•</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="implementation" className="space-y-4">
          {implementationPlan && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Uygulama Planı Özeti</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{implementationPlan.timeline}</div>
                      <div className="text-sm text-gray-600">Toplam Süre</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{implementationPlan.totalEffort}</div>
                      <div className="text-sm text-gray-600">Toplam Çaba</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{implementationPlan.totalCost}</div>
                      <div className="text-sm text-gray-600">Toplam Maliyet</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {implementationPlan.phases.map((phase: any) => (
                  <Card key={phase.phase}>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                          {phase.phase}
                        </div>
                        <span>{phase.title}</span>
                        <Badge variant="outline">{phase.duration}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {phase.recommendations.map((rec: UXSEORecommendation) => (
                          <div key={rec.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              {getCategoryIcon(rec.category)}
                              <span className="font-medium">{rec.title}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getPriorityBadge(rec.priority)}
                              <span className="text-sm text-gray-600">{rec.estimatedTime}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Isı Haritası Simülasyonu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-96 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Eye className="h-12 w-12 mx-auto mb-2" />
                    <p>Isı haritası görselleştirmesi</p>
                    <p className="text-sm">Gerçek verilerle entegre edilecek</p>
                  </div>
                </div>
                {behaviorReport?.heatmap.map((point, index) => (
                  <div
                    key={index}
                    className="absolute w-4 h-4 bg-red-500 rounded-full opacity-60"
                    style={{
                      left: `${(point.x / 800) * 100}%`,
                      top: `${(point.y / 600) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                      opacity: Math.min(0.8, point.count / 50)
                    }}
                    title={`${point.count} tıklama`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 