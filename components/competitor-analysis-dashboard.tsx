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
  Users, 
  Eye, 
  Target,
  BarChart3,
  PieChart,
  Map,
  Search,
  Globe,
  Zap,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Download,
  Filter,
  Settings,
  Lightbulb,
  Shield,
  Star,
  FileText
} from 'lucide-react'
import { useCompetitorAnalysis } from '@/lib/competitor-analysis'

export default function CompetitorAnalysisDashboard() {
  const [selectedCompetitor, setSelectedCompetitor] = useState('competitor_1')
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [marketData, setMarketData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const { 
    analyzeCompetitor, 
    getMarketAnalysis, 
    compareCompetitors, 
    trackCompetitor,
    getCompetitors,
    getTopCompetitors 
  } = useCompetitorAnalysis()

  useEffect(() => {
    loadData()
  }, [selectedCompetitor])

  const loadData = async () => {
    setLoading(true)
    try {
      // Load competitor analysis
      const analysis = analyzeCompetitor(selectedCompetitor)
      setAnalysisData(analysis)

      // Load market analysis
      const market = getMarketAnalysis()
      setMarketData(market)
    } catch (error) {
      console.error('Data loading error:', error)
    } finally {
      setLoading(false)
    }
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

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'dominant':
        return 'bg-red-100 text-red-800'
      case 'strong':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'weak':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
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
        <h1 className="text-3xl font-bold mb-2">Rakip Analizi Dashboard</h1>
        <p className="text-gray-600">Rakip analizi ve pazar araştırması</p>
      </div>

      {/* Competitor Selection */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Rakip Seçimi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Rakip</label>
              <select
                value={selectedCompetitor}
                onChange={(e) => setSelectedCompetitor(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="competitor_1">Smart City Solutions</option>
                <option value="competitor_2">Urban Mobility Pro</option>
                <option value="competitor_3">TransportTech</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button onClick={loadData} className="flex items-center gap-2 w-full">
                <RefreshCw className="h-4 w-4" />
                Analizi Yenile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {analysisData && (
        <div className="space-y-6">
          {/* Competitor Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Domain Authority</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analysisData.competitor.metrics.domainAuthority}</div>
                <div className="flex items-center gap-2 mt-2">
                  {getChangeIcon(5)}
                  <span className={`text-sm ${getChangeColor(5)}`}>+5</span>
                  <span className="text-xs text-muted-foreground">geçen ay</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Organik Trafik</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(analysisData.competitor.metrics.organicTraffic)}</div>
                <div className="flex items-center gap-2 mt-2">
                  {getChangeIcon(12)}
                  <span className={`text-sm ${getChangeColor(12)}`}>+12%</span>
                  <span className="text-xs text-muted-foreground">geçen ay</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Backlinks</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(analysisData.competitor.metrics.backlinks)}</div>
                <div className="flex items-center gap-2 mt-2">
                  {getChangeIcon(8)}
                  <span className={`text-sm ${getChangeColor(8)}`}>+8%</span>
                  <span className="text-xs text-muted-foreground">geçen ay</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Güç Seviyesi</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{analysisData.competitor.strength}</div>
                <Badge className={`mt-2 ${getStrengthColor(analysisData.competitor.strength)}`}>
                  {analysisData.competitor.strength === 'dominant' && 'Dominant'}
                  {analysisData.competitor.strength === 'strong' && 'Güçlü'}
                  {analysisData.competitor.strength === 'medium' && 'Orta'}
                  {analysisData.competitor.strength === 'weak' && 'Zayıf'}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
              <TabsTrigger value="swot">SWOT Analizi</TabsTrigger>
              <TabsTrigger value="keywords">Anahtar Kelimeler</TabsTrigger>
              <TabsTrigger value="content">İçerik Analizi</TabsTrigger>
              <TabsTrigger value="market">Pazar Analizi</TabsTrigger>
              <TabsTrigger value="recommendations">Öneriler</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Rakip Metrikleri
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Domain Authority</span>
                        <span className="font-medium">{analysisData.competitor.metrics.domainAuthority}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Page Authority</span>
                        <span className="font-medium">{analysisData.competitor.metrics.pageAuthority}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Organik Anahtar Kelimeler</span>
                        <span className="font-medium">{formatNumber(analysisData.competitor.metrics.organicKeywords)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Referring Domains</span>
                        <span className="font-medium">{formatNumber(analysisData.competitor.metrics.referringDomains)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Sosyal Paylaşımlar</span>
                        <span className="font-medium">{formatNumber(analysisData.competitor.metrics.socialShares)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Tahmini Değer</span>
                        <span className="font-medium">${formatNumber(analysisData.competitor.metrics.estimatedValue)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Anahtar Kelime Performansı
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisData.competitor.keywords.slice(0, 5).map((keyword: any, index: number) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{keyword.keyword}</span>
                            <span>#{keyword.position}</span>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{formatNumber(keyword.traffic)} trafik</span>
                            <span className={getChangeColor(keyword.change)}>
                              {keyword.change > 0 ? '+' : ''}{keyword.change}%
                            </span>
                          </div>
                          <Progress value={100 - keyword.position} className="h-1" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="swot" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Güçlü Yönler
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisData.strengths.map((strength: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>{strength}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-600" />
                      Zayıf Yönler
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisData.weaknesses.map((weakness: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span>{weakness}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-blue-600" />
                      Fırsatlar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisData.opportunities.map((opportunity: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-blue-600" />
                          <span>{opportunity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      Tehditler
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisData.threats.map((threat: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <span>{threat}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="keywords" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Anahtar Kelime Analizi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisData.competitor.keywords.map((keyword: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                          </div>
                          <div>
                            <div className="font-medium">{keyword.keyword}</div>
                            <div className="text-sm text-muted-foreground">
                              Pozisyon: #{keyword.position}
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

            <TabsContent value="content" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      İçerik Analizi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisData.competitor.content.map((content: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="font-medium mb-2">{content.title}</div>
                          <div className="text-sm text-muted-foreground mb-2">
                            {content.type} • {content.wordCount} kelime
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{content.socialShares} paylaşım</span>
                            <span>{content.backlinks} backlink</span>
                            <span>{new Date(content.publishDate).toLocaleDateString()}</span>
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
                      Backlink Analizi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisData.competitor.backlinks.slice(0, 5).map((backlink: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="font-medium mb-2">{backlink.domain}</div>
                          <div className="text-sm text-muted-foreground mb-2">
                            Authority: {backlink.authority}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {backlink.anchorText}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="market" className="space-y-6">
              {marketData && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Pazar Payı
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(marketData.marketShare).map(([competitor, share]: [string, any]) => (
                          <div key={competitor} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{competitor}</span>
                              <span>{share}%</span>
                            </div>
                            <Progress value={share} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Yükselen Trendler
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {marketData.emergingTrends.map((trend: string, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span>{trend}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Stratejik Öneriler
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisData.recommendations.map((rec: any, index: number) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={
                            rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                            rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }>
                            {rec.priority === 'high' ? 'Yüksek' :
                             rec.priority === 'medium' ? 'Orta' : 'Düşük'}
                          </Badge>
                          <span className="font-medium">{rec.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="font-medium">Etki:</span> {rec.impact}
                          </div>
                          <div>
                            <span className="font-medium">Çaba:</span> {rec.effort}
                          </div>
                          <div>
                            <span className="font-medium">Uygulama:</span> {rec.implementation}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Raporu İndir
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Analizi Yenile
            </Button>
          </div>
        </div>
      )}
    </div>
  )
} 