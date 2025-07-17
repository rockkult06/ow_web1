"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Heart,
  Shield,
  Zap,
  Search,
  Link,
  FileText,
  Eye,
  Bell,
  Settings,
  RefreshCw
} from 'lucide-react'
import { useSEOHealth } from '@/lib/seo-health'
import { useAISEO } from '@/lib/ai-seo'
import { useInternalLinker } from '@/lib/internal-linker'

export default function SEOHealthDashboard() {
  const [healthStatus, setHealthStatus] = useState<any>(null)
  const [alerts, setAlerts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const { getHealthStatus, getAlerts, acknowledgeAlert, resolveAlert, getSearchConsoleData, getAnalyticsData } = useSEOHealth()
  const { analyzeContent } = useAISEO()
  const { getLinkStatistics } = useInternalLinker()

  useEffect(() => {
    loadHealthData()
  }, [])

  const loadHealthData = async () => {
    setLoading(true)
    try {
      const [status, currentAlerts] = await Promise.all([
        getHealthStatus(),
        Promise.resolve(getAlerts())
      ])

      setHealthStatus(status)
      setAlerts(currentAlerts)
    } catch (error) {
      console.error('Health data loading error:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'critical': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy': 
        return <Badge className="bg-green-100 text-green-800">Sağlıklı</Badge>
      case 'warning': 
        return <Badge className="bg-yellow-100 text-yellow-800">Uyarı</Badge>
      case 'critical': 
        return <Badge className="bg-red-100 text-red-800">Kritik</Badge>
      default: 
        return <Badge className="bg-gray-100 text-gray-800">Bilinmiyor</Badge>
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600'
      case 'high': return 'text-orange-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': 
        return <Badge className="bg-red-100 text-red-800">Kritik</Badge>
      case 'high': 
        return <Badge className="bg-orange-100 text-orange-800">Yüksek</Badge>
      case 'medium': 
        return <Badge className="bg-yellow-100 text-yellow-800">Orta</Badge>
      case 'low': 
        return <Badge className="bg-blue-100 text-blue-800">Düşük</Badge>
      default: 
        return <Badge className="bg-gray-100 text-gray-800">Bilinmiyor</Badge>
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(6)].map((_, i) => (
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
        <h1 className="text-3xl font-bold mb-2">SEO Health Dashboard</h1>
        <p className="text-gray-600">Site sağlığı ve performans izleme</p>
      </div>

      {/* Health Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Genel Durum</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold">
                {healthStatus?.overall ? getStatusBadge(healthStatus.overall) : 'Yükleniyor...'}
              </div>
            </div>
            <Progress value={healthStatus?.score || 0} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Skor: {healthStatus?.score || 0}/100
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Uyarılar</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {alerts.filter(alert => !alert.resolvedAt).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Çözülmemiş uyarı
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SEO Sorunları</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {healthStatus?.issues?.filter((issue: any) => issue.severity === 'critical' || issue.severity === 'high').length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Kritik/Yüksek öncelikli
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Son Kontrol</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {healthStatus?.lastChecked ? new Date(healthStatus.lastChecked).toLocaleTimeString() : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              Son güncelleme
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              SEO Sorunları
            </CardTitle>
            <CardDescription>
              Tespit edilen sorunlar ve çözüm önerileri
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthStatus?.issues?.map((issue: any, index: number) => (
                <Alert key={index} variant={issue.severity === 'critical' ? 'destructive' : 'default'}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex items-center justify-between mb-2">
                      <strong>{issue.title}</strong>
                      {getSeverityBadge(issue.severity)}
                    </div>
                    <p className="text-sm mb-2">{issue.description}</p>
                    <div className="text-xs text-muted-foreground">
                      <strong>Etki:</strong> {issue.impact}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <strong>Çözüm:</strong> {issue.solution}
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Aktif Uyarılar
            </CardTitle>
            <CardDescription>
              Sistem tarafından tespit edilen uyarılar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.filter(alert => !alert.resolvedAt).map((alert, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{alert.title}</h4>
                    {getSeverityBadge(alert.severity)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => acknowledgeAlert(alert.id)}
                    >
                      Onayla
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => resolveAlert(alert.id)}
                    >
                      Çözüldü
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(alert.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Öneriler
          </CardTitle>
          <CardDescription>
            SEO performansını iyileştirmek için öneriler
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {healthStatus?.recommendations?.map((rec: any, index: number) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{rec.title}</h4>
                  {getSeverityBadge(rec.priority)}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                <div className="space-y-1 text-xs">
                  <div><strong>Etki:</strong> {rec.impact}</div>
                  <div><strong>Çaba:</strong> {rec.effort}</div>
                  <div><strong>Süre:</strong> {rec.estimatedTime}</div>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  <strong>Uygulama:</strong> {rec.implementation}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Console
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Tıklama</span>
                <span className="font-medium">1,250</span>
              </div>
              <div className="flex justify-between">
                <span>Gösterim</span>
                <span className="font-medium">15,000</span>
              </div>
              <div className="flex justify-between">
                <span>CTR</span>
                <span className="font-medium">8.33%</span>
              </div>
              <div className="flex justify-between">
                <span>Ortalama Pozisyon</span>
                <span className="font-medium">15.5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Oturum</span>
                <span className="font-medium">5,000</span>
              </div>
              <div className="flex justify-between">
                <span>Kullanıcı</span>
                <span className="font-medium">3,500</span>
              </div>
              <div className="flex justify-between">
                <span>Sayfa Görüntüleme</span>
                <span className="font-medium">15,000</span>
              </div>
              <div className="flex justify-between">
                <span>Bounce Rate</span>
                <span className="font-medium">45.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5" />
              İç Linkleme
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Toplam Link</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex justify-between">
                <span>İç Link</span>
                <span className="font-medium">18</span>
              </div>
              <div className="flex justify-between">
                <span>Dış Link</span>
                <span className="font-medium">6</span>
              </div>
              <div className="flex justify-between">
                <span>Ortalama İlgi</span>
                <span className="font-medium">75%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Refresh Button */}
      <div className="mt-6 flex justify-center">
        <Button onClick={loadHealthData} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Verileri Yenile
        </Button>
      </div>
    </div>
  )
} 