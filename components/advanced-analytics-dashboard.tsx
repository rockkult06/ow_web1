'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  MousePointer, 
  Clock,
  Search,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

interface AnalyticsData {
  traffic: {
    total: number
    organic: number
    direct: number
    referral: number
    social: number
  }
  engagement: {
    bounceRate: number
    avgSessionDuration: number
    pagesPerSession: number
    conversionRate: number
  }
  seo: {
    searchRankings: Array<{
      keyword: string
      position: number
      volume: number
      change: number
    }>
    indexedPages: number
    crawlErrors: number
    mobileScore: number
  }
  performance: {
    pageSpeed: number
    coreWebVitals: {
      lcp: number
      fid: number
      cls: number
    }
    serverResponse: number
  }
  devices: {
    desktop: number
    mobile: number
    tablet: number
  }
  countries: Array<{
    country: string
    visitors: number
    percentage: number
  }>
}

export function AdvancedAnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    traffic: {
      total: 0,
      organic: 0,
      direct: 0,
      referral: 0,
      social: 0
    },
    engagement: {
      bounceRate: 0,
      avgSessionDuration: 0,
      pagesPerSession: 0,
      conversionRate: 0
    },
    seo: {
      searchRankings: [],
      indexedPages: 0,
      crawlErrors: 0,
      mobileScore: 0
    },
    performance: {
      pageSpeed: 0,
      coreWebVitals: {
        lcp: 0,
        fid: 0,
        cls: 0
      },
      serverResponse: 0
    },
    devices: {
      desktop: 0,
      mobile: 0,
      tablet: 0
    },
    countries: []
  })
  const [isVisible, setIsVisible] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('30d')

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' || window.location.search.includes('debug=analytics')) {
      setIsVisible(true)
      loadAnalyticsData()
    }
  }, [])

  const loadAnalyticsData = () => {
    // Simulate analytics data
    setAnalyticsData({
      traffic: {
        total: 12500,
        organic: 8200,
        direct: 2800,
        referral: 1200,
        social: 300
      },
      engagement: {
        bounceRate: 32.5,
        avgSessionDuration: 145,
        pagesPerSession: 2.8,
        conversionRate: 3.2
      },
      seo: {
        searchRankings: [
          { keyword: 'akıllı şehir çözümleri', position: 3, volume: 1200, change: 2 },
          { keyword: 'toplu taşıma optimizasyonu', position: 5, volume: 800, change: -1 },
          { keyword: 'OW transitopt', position: 2, volume: 500, change: 1 },
          { keyword: 'frekans optimizasyonu', position: 7, volume: 300, change: 0 }
        ],
        indexedPages: 15,
        crawlErrors: 2,
        mobileScore: 92
      },
      performance: {
        pageSpeed: 85,
        coreWebVitals: {
          lcp: 2.1,
          fid: 45,
          cls: 0.08
        },
        serverResponse: 180
      },
      devices: {
        desktop: 45,
        mobile: 48,
        tablet: 7
      },
      countries: [
        { country: 'Türkiye', visitors: 8500, percentage: 68 },
        { country: 'Almanya', visitors: 2200, percentage: 17.6 },
        { country: 'ABD', visitors: 1200, percentage: 9.6 },
        { country: 'Diğer', visitors: 600, percentage: 4.8 }
      ]
    })
  }

  if (!isVisible) return null

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />
    return <div className="w-4 h-4" />
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-200 p-4 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Advanced Analytics</h3>
        <div className="flex items-center space-x-2">
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="text-xs border rounded px-2 py-1"
          >
            <option value="7d">7 gün</option>
            <option value="30d">30 gün</option>
            <option value="90d">90 gün</option>
          </select>
          <Button
            onClick={() => setIsVisible(false)}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Traffic Overview */}
        <Card className="p-3">
          <CardTitle className="text-xs text-gray-600 mb-2">Trafik Genel Bakış</CardTitle>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <Globe className="w-3 h-3 text-blue-500" />
              <span>Toplam: {analyticsData.traffic.total.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="w-3 h-3 text-green-500" />
              <span>Organik: {analyticsData.traffic.organic.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-3 h-3 text-purple-500" />
              <span>Direkt: {analyticsData.traffic.direct.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MousePointer className="w-3 h-3 text-orange-500" />
              <span>Referans: {analyticsData.traffic.referral.toLocaleString()}</span>
            </div>
          </div>
        </Card>

        {/* Engagement Metrics */}
        <Card className="p-3">
          <CardTitle className="text-xs text-gray-600 mb-2">Etkileşim Metrikleri</CardTitle>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Hemen Çıkma Oranı</span>
              <span className={analyticsData.engagement.bounceRate < 40 ? 'text-green-600' : 'text-red-600'}>
                %{analyticsData.engagement.bounceRate}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Ortalama Süre</span>
              <span>{formatDuration(analyticsData.engagement.avgSessionDuration)}</span>
            </div>
            <div className="flex justify-between">
              <span>Sayfa/Session</span>
              <span>{analyticsData.engagement.pagesPerSession}</span>
            </div>
            <div className="flex justify-between">
              <span>Dönüşüm Oranı</span>
              <span className={getPerformanceColor(analyticsData.engagement.conversionRate * 10)}>
                %{analyticsData.engagement.conversionRate}
              </span>
            </div>
          </div>
        </Card>

        {/* SEO Rankings */}
        <Card className="p-3">
          <CardTitle className="text-xs text-gray-600 mb-2">Arama Sıralaması</CardTitle>
          <div className="space-y-2">
            {analyticsData.seo.searchRankings.slice(0, 3).map((ranking, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="truncate flex-1">{ranking.keyword}</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    #{ranking.position}
                  </Badge>
                  {getTrendIcon(ranking.change)}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Performance */}
        <Card className="p-3">
          <CardTitle className="text-xs text-gray-600 mb-2">Performans</CardTitle>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Sayfa Hızı</span>
              <span className={getPerformanceColor(analyticsData.performance.pageSpeed)}>
                {analyticsData.performance.pageSpeed}/100
              </span>
            </div>
            <div className="flex justify-between">
              <span>Mobil Skor</span>
              <span className={getPerformanceColor(analyticsData.seo.mobileScore)}>
                {analyticsData.seo.mobileScore}/100
              </span>
            </div>
            <div className="flex justify-between">
              <span>LCP</span>
              <span className={analyticsData.performance.coreWebVitals.lcp < 2.5 ? 'text-green-600' : 'text-red-600'}>
                {analyticsData.performance.coreWebVitals.lcp}s
              </span>
            </div>
          </div>
        </Card>

        {/* Device Distribution */}
        <Card className="p-3">
          <CardTitle className="text-xs text-gray-600 mb-2">Cihaz Dağılımı</CardTitle>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <div className="flex items-center space-x-1">
                <Monitor className="w-3 h-3" />
                <span>Desktop</span>
              </div>
              <span>%{analyticsData.devices.desktop}</span>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center space-x-1">
                <Smartphone className="w-3 h-3" />
                <span>Mobile</span>
              </div>
              <span>%{analyticsData.devices.mobile}</span>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center space-x-1">
                <Monitor className="w-3 h-3" />
                <span>Tablet</span>
              </div>
              <span>%{analyticsData.devices.tablet}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

// Real-time analytics component
export function RealTimeAnalytics() {
  const [realTimeData, setRealTimeData] = useState({
    activeUsers: 0,
    pageViews: 0,
    conversions: 0,
    topPages: [] as string[]
  })

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setRealTimeData({
        activeUsers: Math.floor(Math.random() * 50) + 10,
        pageViews: Math.floor(Math.random() * 100) + 50,
        conversions: Math.floor(Math.random() * 5),
        topPages: ['/', '/solutions', '/about']
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-4 right-4 z-40">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
        <h4 className="text-xs font-medium mb-2">Real-time Analytics</h4>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span>Aktif Kullanıcı:</span>
            <span className="text-green-600">{realTimeData.activeUsers}</span>
          </div>
          <div className="flex justify-between">
            <span>Sayfa Görüntüleme:</span>
            <span>{realTimeData.pageViews}</span>
          </div>
          <div className="flex justify-between">
            <span>Dönüşüm:</span>
            <span className="text-blue-600">{realTimeData.conversions}</span>
          </div>
        </div>
      </div>
    </div>
  )
} 