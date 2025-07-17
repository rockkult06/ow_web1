"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  MousePointer,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Map,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Search,
  Globe,
  Smartphone,
  Monitor,
  Zap,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

export default function AdvancedAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('30d')
  const [loading, setLoading] = useState(false)
  const [analyticsData, setAnalyticsData] = useState<any>(null)

  useEffect(() => {
    loadAnalyticsData()
  }, [timeRange])

  const loadAnalyticsData = async () => {
    setLoading(true)
    try {
      // Mock analytics data
      const data = {
        overview: {
          sessions: 125000,
          users: 89000,
          pageViews: 450000,
          bounceRate: 42.5,
          avgSessionDuration: 185,
          conversionRate: 3.2,
          revenue: 125000
        },
        traffic: {
          organic: 65000,
          direct: 25000,
          social: 15000,
          referral: 10000,
          paid: 10000
        },
        topPages: [
          { page: '/', views: 45000, sessions: 38000, bounceRate: 35 },
          { page: '/solutions', views: 28000, sessions: 22000, bounceRate: 45 },
          { page: '/about', views: 18000, sessions: 15000, bounceRate: 50 },
          { page: '/contact', views: 12000, sessions: 10000, bounceRate: 40 }
        ],
        topKeywords: [
          { keyword: 'akıllı şehir', position: 3, traffic: 8500, change: 15 },
          { keyword: 'toplu taşıma', position: 5, traffic: 6200, change: 8 },
          { keyword: 'ulaşım optimizasyonu', position: 2, traffic: 4800, change: 22 },
          { keyword: 'OW', position: 1, traffic: 3200, change: 5 }
        ],
        devices: [
          { device: 'Desktop', sessions: 65000, percentage: 52 },
          { device: 'Mobile', sessions: 52000, percentage: 41.6 },
          { device: 'Tablet', sessions: 8000, percentage: 6.4 }
        ],
        countries: [
          { country: 'Türkiye', sessions: 85000, percentage: 68 },
          { country: 'Almanya', sessions: 15000, percentage: 12 },
          { country: 'Hollanda', sessions: 12000, percentage: 9.6 },
          { country: 'Diğer', sessions: 13000, percentage: 10.4 }
        ],
        trends: {
          sessions: [120000, 125000, 130000, 128000, 125000],
          conversions: [3800, 4000, 4200, 4100, 4000],
          revenue: [120000, 125000, 130000, 128000, 125000]
        }
      }

      setAnalyticsData(data)
    } catch (error) {
      console.error('Analytics data loading error:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) {
      return <ArrowUpRight className="h-4 w-4 text-green-600" />
    } else if (change < 0) {
      return <ArrowDownRight className="h-4 w-4 text-red-600" />
    }
    return null
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gelişmiş Analytics Dashboard</h1>
        <p className="text-gray-600">Detaylı performans analizi ve raporlama</p>
      </div>

      {/* Time Range Selector */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant={timeRange === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('7d')}
          >
            7 Gün
          </Button>
          <Button
            variant={timeRange === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('30d')}
          >
            30 Gün
          </Button>
          <Button
            variant={timeRange === '90d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('90d')}
          >
            90 Gün
          </Button>
        </div>
        <Button onClick={loadAnalyticsData} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Yenile
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Oturum</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analyticsData?.overview.sessions)}</div>
            <div className="flex items-center gap-2 mt-2">
              {getChangeIcon(5)}
              <span className={`text-sm ${getChangeColor(5)}`}>+5%</span>
              <span className="text-xs text-muted-foreground">geçen dönem</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kullanıcı</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analyticsData?.overview.users)}</div>
            <div className="flex items-center gap-2 mt-2">
              {getChangeIcon(3)}
              <span className={`text-sm ${getChangeColor(3)}`}>+3%</span>
              <span className="text-xs text-muted-foreground">geçen dönem</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sayfa Görüntüleme</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analyticsData?.overview.pageViews)}</div>
            <div className="flex items-center gap-2 mt-2">
              {getChangeIcon(8)}
              <span className={`text-sm ${getChangeColor(8)}`}>+8%</span>
              <span className="text-xs text-muted-foreground">geçen dönem</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dönüşüm Oranı</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData?.overview.conversionRate}%</div>
            <div className="flex items-center gap-2 mt-2">
              {getChangeIcon(2)}
              <span className={`text-sm ${getChangeColor(2)}`}>+2%</span>
              <span className="text-xs text-muted-foreground">geçen dönem</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="traffic" className="space-y-6">
        <TabsList>
          <TabsTrigger value="traffic">Trafik Kaynakları</TabsTrigger>
          <TabsTrigger value="pages">En İyi Sayfalar</TabsTrigger>
          <TabsTrigger value="keywords">Anahtar Kelimeler</TabsTrigger>
          <TabsTrigger value="devices">Cihazlar</TabsTrigger>
          <TabsTrigger value="geography">Coğrafya</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Trafik Kaynakları
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData?.traffic && Object.entries(analyticsData.traffic).map(([source, traffic]: [string, any]) => (
                    <div key={source} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="capitalize">{source}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{formatNumber(traffic)}</span>
                        <span className="text-sm text-muted-foreground">
                          {((traffic / analyticsData.overview.sessions) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Trafik Dağılımı
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData?.traffic && Object.entries(analyticsData.traffic).map(([source, traffic]: [string, any], index) => {
                    const percentage = (traffic / analyticsData.overview.sessions) * 100
                    const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500']
                    return (
                      <div key={source} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{source}</span>
                          <span>{percentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${colors[index % colors.length]}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                En İyi Sayfalar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData?.topPages.map((page: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium">{page.page}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatNumber(page.sessions)} oturum
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatNumber(page.views)} görüntüleme</div>
                      <div className="text-sm text-muted-foreground">
                        {page.bounceRate}% bounce rate
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                En İyi Anahtar Kelimeler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData?.topKeywords.map((keyword: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-green-600">{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium">{keyword.keyword}</div>
                        <div className="text-sm text-muted-foreground">
                          Pozisyon: {keyword.position}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatNumber(keyword.traffic)} trafik</div>
                      <div className="flex items-center gap-1 text-sm">
                        {getChangeIcon(keyword.change)}
                        <span className={getChangeColor(keyword.change)}>
                          {keyword.change > 0 ? '+' : ''}{keyword.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Cihaz Dağılımı
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData?.devices.map((device: any) => (
                    <div key={device.device} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>{device.device}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{formatNumber(device.sessions)}</span>
                        <span className="text-sm text-muted-foreground">
                          {device.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Ülke Dağılımı
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData?.countries.map((country: any) => (
                    <div key={country.country} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>{country.country}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{formatNumber(country.sessions)}</span>
                        <span className="text-sm text-muted-foreground">
                          {country.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                Coğrafi Dağılım
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData?.countries.map((country: any, index: number) => {
                  const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500']
                  return (
                    <div key={country.country} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{country.country}</span>
                        <span>{country.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${colors[index % colors.length]}`}
                          style={{ width: `${country.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Ortalama Oturum Süresi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.floor(analyticsData?.overview.avgSessionDuration / 60)}:{String(analyticsData?.overview.avgSessionDuration % 60).padStart(2, '0')}
            </div>
            <p className="text-sm text-muted-foreground">dakika:saniye</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MousePointer className="h-5 w-5" />
              Bounce Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analyticsData?.overview.bounceRate}%</div>
            <Progress value={analyticsData?.overview.bounceRate} className="mt-2" />
            <p className="text-sm text-muted-foreground">Ziyaretçi oranı</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Toplam Gelir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${formatNumber(analyticsData?.overview.revenue)}</div>
            <div className="flex items-center gap-2 mt-2">
              {getChangeIcon(12)}
              <span className="text-sm text-green-600">+12%</span>
              <span className="text-xs text-muted-foreground">geçen dönem</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 