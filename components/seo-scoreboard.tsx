'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  MousePointer, 
  Target,
  Globe,
  Search,
  BarChart3,
  Activity,
  Zap,
  Shield
} from 'lucide-react';

interface KPIMetric {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  unit: string;
  trend: number; // % değişim
  status: 'positive' | 'negative' | 'neutral';
  target: number;
  icon: React.ReactNode;
  color: string;
}

interface SEOScore {
  overall: number;
  technical: number;
  content: number;
  backlinks: number;
  performance: number;
  mobile: number;
  accessibility: number;
  lastUpdated: Date;
}

interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
  trend: number;
  color: string;
}

interface TopKeyword {
  keyword: string;
  position: number;
  searchVolume: number;
  ctr: number;
  trend: number;
}

export default function SEOScoreboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedUrl, setSelectedUrl] = useState<string>('all');

  // KPI Metrikleri
  const kpiMetrics: KPIMetric[] = [
    {
      id: 'organic_traffic',
      name: 'Organik Trafik',
      value: 15420,
      previousValue: 14200,
      unit: 'ziyaretçi',
      trend: 8.6,
      status: 'positive',
      target: 20000,
      icon: <Users className="h-4 w-4" />,
      color: 'bg-blue-500'
    },
    {
      id: 'conversions',
      name: 'Dönüşümler',
      value: 342,
      previousValue: 298,
      unit: 'dönüşüm',
      trend: 14.8,
      status: 'positive',
      target: 500,
      icon: <Target className="h-4 w-4" />,
      color: 'bg-green-500'
    },
    {
      id: 'avg_position',
      name: 'Ortalama Pozisyon',
      value: 12.4,
      previousValue: 15.2,
      unit: 'pozisyon',
      trend: -18.4,
      status: 'positive',
      target: 10,
      icon: <BarChart3 className="h-4 w-4" />,
      color: 'bg-purple-500'
    },
    {
      id: 'ctr',
      name: 'Tıklama Oranı',
      value: 3.2,
      previousValue: 2.8,
      unit: '%',
      trend: 14.3,
      status: 'positive',
      target: 5,
      icon: <MousePointer className="h-4 w-4" />,
      color: 'bg-orange-500'
    },
    {
      id: 'page_views',
      name: 'Sayfa Görüntülemeleri',
      value: 45600,
      previousValue: 42300,
      unit: 'görüntüleme',
      trend: 7.8,
      status: 'positive',
      target: 60000,
      icon: <Eye className="h-4 w-4" />,
      color: 'bg-indigo-500'
    },
    {
      id: 'bounce_rate',
      name: 'Hemen Çıkma Oranı',
      value: 42.3,
      previousValue: 45.1,
      unit: '%',
      trend: -6.2,
      status: 'positive',
      target: 35,
      icon: <Activity className="h-4 w-4" />,
      color: 'bg-red-500'
    }
  ];

  // SEO Skorları
  const seoScores: SEOScore = {
    overall: 87,
    technical: 92,
    content: 85,
    backlinks: 78,
    performance: 89,
    mobile: 94,
    accessibility: 82,
    lastUpdated: new Date()
  };

  // Trafik Kaynakları
  const trafficSources: TrafficSource[] = [
    { source: 'Organik Arama', visitors: 15420, percentage: 65, trend: 8.6, color: 'bg-blue-500' },
    { source: 'Direkt', visitors: 4200, percentage: 18, trend: 2.1, color: 'bg-green-500' },
    { source: 'Sosyal Medya', visitors: 2800, percentage: 12, trend: 15.3, color: 'bg-purple-500' },
    { source: 'Referans', visitors: 1200, percentage: 5, trend: -3.2, color: 'bg-orange-500' }
  ];

  // En İyi Anahtar Kelimeler
  const topKeywords: TopKeyword[] = [
    { keyword: 'akıllı şehir çözümleri', position: 3, searchVolume: 1200, ctr: 8.5, trend: 12.3 },
    { keyword: 'toplu taşıma optimizasyonu', position: 5, searchVolume: 890, ctr: 6.2, trend: 8.7 },
    { keyword: 'veri analizi hizmetleri', position: 8, searchVolume: 650, ctr: 4.1, trend: 15.2 },
    { keyword: 'IoT çözümleri', position: 12, searchVolume: 420, ctr: 3.8, trend: 5.6 },
    { keyword: 'yapay zeka optimizasyonu', position: 15, searchVolume: 380, ctr: 2.9, trend: 22.1 }
  ];

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <div className="h-4 w-4" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-yellow-100 text-yellow-800';
    if (score >= 70) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO Scoreboard</h1>
          <p className="text-gray-600">Anahtar performans göstergeleri ve SEO metrikleri</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as '7d' | '30d' | '90d')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Son 7 Gün</option>
            <option value="30d">Son 30 Gün</option>
            <option value="90d">Son 90 Gün</option>
          </select>
          <select 
            value={selectedUrl}
            onChange={(e) => setSelectedUrl(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tüm Sayfalar</option>
            <option value="home">Ana Sayfa</option>
            <option value="solutions">Çözümler</option>
            <option value="about">Hakkımızda</option>
          </select>
        </div>
      </div>

      {/* SEO Skor Kartı */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span>Genel SEO Skoru</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{seoScores.overall}</div>
              <div className="text-sm text-gray-600">Genel Skor</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{seoScores.technical}</div>
              <div className="text-sm text-gray-600">Teknik SEO</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{seoScores.content}</div>
              <div className="text-sm text-gray-600">İçerik</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{seoScores.performance}</div>
              <div className="text-sm text-gray-600">Performans</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Son güncelleme: {seoScores.lastUpdated.toLocaleDateString('tr-TR')}</span>
              <Badge className={getScoreBadgeColor(seoScores.overall)}>
                {seoScores.overall >= 90 ? 'Mükemmel' : seoScores.overall >= 80 ? 'İyi' : 'Geliştirilebilir'}
              </Badge>
            </div>
            <Progress value={seoScores.overall} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* KPI Metrikleri */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiMetrics.map((metric) => (
          <Card key={metric.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg ${metric.color} text-white`}>
                    {metric.icon}
                  </div>
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
                    metric.status === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend > 0 ? '+' : ''}{metric.trend}%
                  </span>
                  <span className="text-sm text-gray-500">
                    önceki döneme göre
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Hedef</span>
                    <span className="font-medium">{metric.target.toLocaleString()} {metric.unit}</span>
                  </div>
                  <Progress 
                    value={(metric.value / metric.target) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detaylı Analizler */}
      <Tabs defaultValue="traffic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="traffic">Trafik Kaynakları</TabsTrigger>
          <TabsTrigger value="keywords">Anahtar Kelimeler</TabsTrigger>
          <TabsTrigger value="performance">Performans</TabsTrigger>
          <TabsTrigger value="technical">Teknik SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trafik Kaynakları Dağılımı</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source) => (
                  <div key={source.source} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${source.color}`}></div>
                      <div>
                        <div className="font-medium">{source.source}</div>
                        <div className="text-sm text-gray-600">
                          {source.visitors.toLocaleString()} ziyaretçi ({source.percentage}%)
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(source.trend)}
                      <span className={`text-sm font-medium ${
                        source.trend > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {source.trend > 0 ? '+' : ''}{source.trend}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>En İyi Anahtar Kelimeler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topKeywords.map((keyword, index) => (
                  <div key={keyword.keyword} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{keyword.keyword}</div>
                        <div className="text-sm text-gray-600">
                          Pozisyon: {keyword.position} | Arama Hacmi: {keyword.searchVolume}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-600">CTR</div>
                        <div className="font-medium">{keyword.ctr}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Trend</div>
                        <div className={`font-medium ${
                          keyword.trend > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {keyword.trend > 0 ? '+' : ''}{keyword.trend}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  <span>Core Web Vitals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>LCP (Largest Contentful Paint)</span>
                      <span className="font-medium">2.1s</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>FID (First Input Delay)</span>
                      <span className="font-medium">45ms</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CLS (Cumulative Layout Shift)</span>
                      <span className="font-medium">0.08</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <span>Mobil Uyumluluk</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Mobil Hız</span>
                      <span className="font-medium">94/100</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Responsive Tasarım</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Touch Friendly</span>
                      <span className="font-medium">98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teknik SEO Durumu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">SSL Sertifikası</span>
                    <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">XML Sitemap</span>
                    <Badge className="bg-green-100 text-green-800">Mevcut</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Robots.txt</span>
                    <Badge className="bg-green-100 text-green-800">Mevcut</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium">Schema Markup</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Kısmi</Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Meta Tags</span>
                    <Badge className="bg-green-100 text-green-800">Tam</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Alt Tags</span>
                    <Badge className="bg-green-100 text-green-800">Tam</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="font-medium">Broken Links</span>
                    <Badge className="bg-red-100 text-red-800">3 Link</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Page Speed</span>
                    <Badge className="bg-green-100 text-green-800">89/100</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 