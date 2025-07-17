"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Search,
  Link,
  Zap,
  Target,
  BarChart3,
  Users,
  Globe,
  Activity,
  Shield,
  FileText,
  Lightbulb
} from 'lucide-react'
import { useSEOAudit } from '@/lib/technical-seo-audit'
import { useConversionOptimization } from '@/lib/advanced-conversion-optimization'
import { useEnterpriseSEO } from '@/lib/enterprise-seo'

export default function SEODashboard() {
  const [auditResults, setAuditResults] = useState<any>(null)
  const [conversionData, setConversionData] = useState<any>(null)
  const [seoReport, setSeoReport] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const { runFullAudit } = useSEOAudit()
  const { getConversionData } = useConversionOptimization()
  const { generateReport } = useEnterpriseSEO()

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      const [audit, conversion, report] = await Promise.all([
        runFullAudit(),
        Promise.resolve(getConversionData()),
        generateReport()
      ])

      setAuditResults(audit)
      setConversionData(conversion)
      setSeoReport(report)
    } catch (error) {
      console.error('Dashboard data loading error:', error)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-green-100 text-green-800">Mükemmel</Badge>
    if (score >= 70) return <Badge className="bg-yellow-100 text-yellow-800">İyi</Badge>
    return <Badge className="bg-red-100 text-red-800">İyileştirme Gerekli</Badge>
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
        <h1 className="text-3xl font-bold mb-2">SEO Dashboard</h1>
        <p className="text-gray-600">Optimizeworld.net SEO performans analizi ve öneriler</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="technical">Teknik SEO</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
          <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Genel SEO Skoru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl font-bold text-blue-600">
                  {auditResults?.overallScore || 85}
                </div>
                {getScoreBadge(auditResults?.overallScore || 85)}
              </div>
              <Progress value={auditResults?.overallScore || 85} className="h-3" />
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Organik Trafik</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{seoReport?.metrics?.organicTraffic || 0}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12%</span> geçen aya göre
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Anahtar Kelimeler</CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{seoReport?.metrics?.keywordRankings?.length || 0}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+5</span> yeni kelime
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Backlink</CardTitle>
                <Link className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{seoReport?.metrics?.backlinks?.length || 0}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+3</span> yeni link
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sayfa Hızı</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {seoReport?.metrics?.pageSpeed?.desktop?.overall || 85}
                </div>
                <p className="text-xs text-muted-foreground">
                  Desktop performans
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Hızlı Aksiyonlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start">
                  <Target className="mr-2 h-4 w-4" />
                  Teknik SEO Audit
                </Button>
                <Button variant="outline" className="justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Conversion Analizi
                </Button>
                <Button variant="outline" className="justify-start">
                  <Globe className="mr-2 h-4 w-4" />
                  Rakip Analizi
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          {/* Technical SEO Audit Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {auditResults && Object.entries(auditResults).map(([key, result]: [string, any]) => {
              if (key === 'overallScore') return null
              return (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {key === 'coreWebVitals' && <Activity className="h-5 w-5" />}
                      {key === 'metaTags' && <FileText className="h-5 w-5" />}
                      {key === 'structuredData' && <Shield className="h-5 w-5" />}
                      {key === 'performance' && <Zap className="h-5 w-5" />}
                      {key === 'security' && <Shield className="h-5 w-5" />}
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </CardTitle>
                    <CardDescription>
                      Skor: <span className={getScoreColor(result.score)}>{result.score}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {result.issues?.map((issue: any, index: number) => (
                        <Alert key={index} variant={issue.type === 'error' ? 'destructive' : 'default'}>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>{issue.message}</strong>
                            {issue.suggestion && (
                              <p className="text-sm mt-1">{issue.suggestion}</p>
                            )}
                          </AlertDescription>
                        </Alert>
                      ))}
                      {result.recommendations?.map((rec: any, index: number) => (
                        <div key={index} className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-900">{rec.title}</h4>
                          <p className="text-sm text-blue-700 mt-1">{rec.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="conversion" className="space-y-6">
          {/* Conversion Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {conversionData?.conversionRate?.toFixed(2) || '2.5'}%
                </div>
                <p className="text-sm text-muted-foreground">Toplam conversion oranı</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Toplam Ziyaretçi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {conversionData?.totalVisitors || 1250}
                </div>
                <p className="text-sm text-muted-foreground">Bu ay</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">
                  {conversionData?.totalConversions || 31}
                </div>
                <p className="text-sm text-muted-foreground">Bu ay</p>
              </CardContent>
            </Card>
          </div>

          {/* Conversion Goals */}
          <Card>
            <CardHeader>
              <CardTitle>Conversion Hedefleri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionData?.goals?.map((goal: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {goal.achieved ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Target className="h-5 w-5 text-gray-400" />
                      )}
                      <div>
                        <p className="font-medium">{goal.name}</p>
                        <p className="text-sm text-muted-foreground">{goal.target}</p>
                      </div>
                    </div>
                    <Badge variant={goal.achieved ? 'default' : 'secondary'}>
                      {goal.achieved ? 'Başarılı' : 'Beklemede'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enterprise" className="space-y-6">
          {/* Enterprise SEO Report */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rakip Analizi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {seoReport?.competitors?.map((comp: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{comp.competitor}</h4>
                        <Badge>DA: {comp.domainAuthority}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Trafik</p>
                          <p className="font-medium">{comp.organicTraffic.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Keywords</p>
                          <p className="font-medium">{comp.keywords}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Backlinks</p>
                          <p className="font-medium">{comp.backlinks}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO Önerileri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {seoReport?.recommendations?.map((rec: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{rec.title}</h4>
                        <Badge variant={
                          rec.priority === 'high' ? 'destructive' : 
                          rec.priority === 'medium' ? 'default' : 'secondary'
                        }>
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                      <div className="flex gap-4 text-xs">
                        <span><strong>Etki:</strong> {rec.impact}</span>
                        <span><strong>Çaba:</strong> {rec.effort}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Gap Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>İçerik Gap Analizi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Eksik Anahtar Kelimeler</h4>
                  <div className="space-y-2">
                    {seoReport?.contentGaps?.missingKeywords?.map((keyword: string, index: number) => (
                      <Badge key={index} variant="outline" className="mr-2 mb-2">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">İçerik Fırsatları</h4>
                  <div className="space-y-2">
                    {seoReport?.contentGaps?.contentOpportunities?.map((opportunity: string, index: number) => (
                      <div key={index} className="p-2 bg-blue-50 rounded text-sm">
                        {opportunity}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Rakip Gap'leri</h4>
                  <div className="space-y-2">
                    {seoReport?.contentGaps?.competitorGaps?.map((gap: string, index: number) => (
                      <Badge key={index} variant="secondary" className="mr-2 mb-2">
                        {gap}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 