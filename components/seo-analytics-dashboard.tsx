'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useConversionTracking, useABTesting } from '@/hooks/use-conversion'
import { trackEvent } from '@/lib/analytics'

interface SEOAnalyticsData {
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  avgSessionDuration: number
  conversionRate: number
  organicTraffic: number
  searchRankings: {
    keyword: string
    position: number
    volume: number
  }[]
  topPages: {
    url: string
    views: number
    conversions: number
  }[]
}

export function SEOAnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<SEOAnalyticsData>({
    pageViews: 0,
    uniqueVisitors: 0,
    bounceRate: 0,
    avgSessionDuration: 0,
    conversionRate: 0,
    organicTraffic: 0,
    searchRankings: [],
    topPages: []
  })
  const [isVisible, setIsVisible] = useState(false)
  const { conversionGoals, getConversionRate } = useConversionTracking()
  const { variant, testActive } = useABTesting()

  useEffect(() => {
    // Only show in development or with debug parameter
    if (process.env.NODE_ENV === 'development' || window.location.search.includes('debug=analytics')) {
      setIsVisible(true)
      loadAnalyticsData()
    }
  }, [])

  const loadAnalyticsData = () => {
    // Simulate analytics data loading
    setAnalyticsData({
      pageViews: 1250,
      uniqueVisitors: 890,
      bounceRate: 35.2,
      avgSessionDuration: 145,
      conversionRate: 2.8,
      organicTraffic: 650,
      searchRankings: [
        { keyword: 'akıllı şehir çözümleri', position: 3, volume: 1200 },
        { keyword: 'toplu taşıma optimizasyonu', position: 5, volume: 800 },
        { keyword: 'OW transitopt', position: 2, volume: 500 },
        { keyword: 'frekans optimizasyonu', position: 7, volume: 300 }
      ],
      topPages: [
        { url: '/', views: 450, conversions: 12 },
        { url: '/solutions', views: 320, conversions: 8 },
        { url: '/about', views: 180, conversions: 3 },
        { url: '/contact', views: 150, conversions: 15 }
      ]
    })
  }

  if (!isVisible) return null

  const getBounceRateColor = (rate: number) => {
    if (rate < 30) return 'text-green-600'
    if (rate < 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getConversionRateColor = (rate: number) => {
    if (rate > 3) return 'text-green-600'
    if (rate > 1) return 'text-yellow-600'
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
        <h3 className="text-sm font-semibold text-gray-900">SEO Analytics</h3>
        <Badge variant="outline" className="text-xs">
          {variant} Test
        </Badge>
      </div>

      <div className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3">
            <CardTitle className="text-xs text-gray-600">Sayfa Görüntüleme</CardTitle>
            <CardContent className="p-0 pt-1">
              <div className="text-lg font-bold">{analyticsData.pageViews.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card className="p-3">
            <CardTitle className="text-xs text-gray-600">Benzersiz Ziyaretçi</CardTitle>
            <CardContent className="p-0 pt-1">
              <div className="text-lg font-bold">{analyticsData.uniqueVisitors.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card className="p-3">
            <CardTitle className="text-xs text-gray-600">Hemen Çıkma Oranı</CardTitle>
            <CardContent className="p-0 pt-1">
              <div className={`text-lg font-bold ${getBounceRateColor(analyticsData.bounceRate)}`}>
                %{analyticsData.bounceRate}
              </div>
            </CardContent>
          </Card>
          
          <Card className="p-3">
            <CardTitle className="text-xs text-gray-600">Ortalama Süre</CardTitle>
            <CardContent className="p-0 pt-1">
              <div className="text-lg font-bold">{formatDuration(analyticsData.avgSessionDuration)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Conversion Rate */}
        <Card className="p-3">
          <CardTitle className="text-xs text-gray-600 mb-2">Dönüşüm Oranı</CardTitle>
          <div className="flex items-center justify-between">
            <div className={`text-lg font-bold ${getConversionRateColor(analyticsData.conversionRate)}`}>
              %{analyticsData.conversionRate}
            </div>
            <Progress value={analyticsData.conversionRate * 10} className="w-24 h-2" />
          </div>
        </Card>

        {/* Search Rankings */}
        <Card className="p-3">
          <CardTitle className="text-xs text-gray-600 mb-2">Arama Sıralaması</CardTitle>
          <div className="space-y-2">
            {analyticsData.searchRankings.slice(0, 3).map((ranking, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="truncate flex-1">{ranking.keyword}</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    #{ranking.position}
                  </Badge>
                  <span className="text-gray-500">{ranking.volume}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Pages */}
        <Card className="p-3">
          <CardTitle className="text-xs text-gray-600 mb-2">En İyi Sayfalar</CardTitle>
          <div className="space-y-2">
            {analyticsData.topPages.slice(0, 3).map((page, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="truncate flex-1">{page.url}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">{page.views}</span>
                  <Badge variant="outline" className="text-xs">
                    {page.conversions}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Conversion Goals */}
        <Card className="p-3">
          <CardTitle className="text-xs text-gray-600 mb-2">Dönüşüm Hedefleri</CardTitle>
          <div className="space-y-2">
            {conversionGoals.slice(0, 3).map((goal) => (
              <div key={goal.id} className="flex items-center justify-between text-xs">
                <span className="truncate flex-1">{goal.name}</span>
                <Badge 
                  variant={goal.completed ? 'default' : 'outline'} 
                  className={`text-xs ${goal.completed ? 'bg-green-100 text-green-800' : ''}`}
                >
                  {goal.completed ? 'Tamamlandı' : 'Bekliyor'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        ×
      </button>
    </div>
  )
}

// Real-time SEO monitoring component
export function RealTimeSEOMonitor() {
  const [seoMetrics, setSeoMetrics] = useState({
    pageSpeed: 0,
    mobileFriendly: true,
    seoScore: 0,
    accessibility: 0
  })

  useEffect(() => {
    // Simulate real-time SEO monitoring
    const interval = setInterval(() => {
      setSeoMetrics({
        pageSpeed: Math.random() * 100,
        mobileFriendly: Math.random() > 0.1,
        seoScore: 85 + Math.random() * 15,
        accessibility: 90 + Math.random() * 10
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-4 left-4 z-40">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
        <h4 className="text-xs font-medium mb-2">SEO Monitör</h4>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span>Hız:</span>
            <span className={seoMetrics.pageSpeed > 80 ? 'text-green-600' : 'text-red-600'}>
              {seoMetrics.pageSpeed.toFixed(0)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span>Mobil:</span>
            <span className={seoMetrics.mobileFriendly ? 'text-green-600' : 'text-red-600'}>
              {seoMetrics.mobileFriendly ? '✓' : '✗'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>SEO:</span>
            <span className={seoMetrics.seoScore > 80 ? 'text-green-600' : 'text-yellow-600'}>
              {seoMetrics.seoScore.toFixed(0)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span>Erişilebilirlik:</span>
            <span className={seoMetrics.accessibility > 90 ? 'text-green-600' : 'text-yellow-600'}>
              {seoMetrics.accessibility.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 