"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Brain, 
  TrendingUp, 
  Target, 
  BookOpen, 
  Zap,
  CheckCircle,
  AlertTriangle,
  Info,
  Lightbulb,
  BarChart3,
  Edit3,
  Copy,
  Download
} from 'lucide-react'
import { useAISEO } from '@/lib/ai-seo'

export default function AIContentAnalyzer() {
  const [content, setContent] = useState('')
  const [keywords, setKeywords] = useState('')
  const [analysis, setAnalysis] = useState<any>(null)
  const [optimizedContent, setOptimizedContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('analyze')

  const { analyzeContent, optimizeContent, generateMetaDescription, generateTitle } = useAISEO()

  const handleAnalyze = async () => {
    if (!content.trim()) return

    setLoading(true)
    try {
      const keywordArray = keywords.split(',').map(k => k.trim()).filter(k => k)
      const result = analyzeContent(content, keywordArray)
      setAnalysis(result)
    } catch (error) {
      console.error('Analysis error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOptimize = async () => {
    if (!content.trim()) return

    setLoading(true)
    try {
      const keywordArray = keywords.split(',').map(k => k.trim()).filter(k => k)
      const result = optimizeContent(content, keywordArray)
      setOptimizedContent(result.optimizedContent)
    } catch (error) {
      console.error('Optimization error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateMeta = async () => {
    if (!content.trim()) return

    setLoading(true)
    try {
      const keywordArray = keywords.split(',').map(k => k.trim()).filter(k => k)
      const description = generateMetaDescription(content, keywordArray)
      const title = generateTitle(content, keywordArray)
      
      setAnalysis((prev: any) => ({
        ...prev,
        metaDescription: description,
        title: title
      }))
    } catch (error) {
      console.error('Meta generation error:', error)
    } finally {
      setLoading(false)
    }
  }

  const getReadabilityColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-600'
      case 'B': return 'text-blue-600'
      case 'C': return 'text-yellow-600'
      case 'D': return 'text-orange-600'
      case 'F': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getReadabilityBadge = (grade: string) => {
    switch (grade) {
      case 'A': 
        return <Badge className="bg-green-100 text-green-800">Mükemmel</Badge>
      case 'B': 
        return <Badge className="bg-blue-100 text-blue-800">İyi</Badge>
      case 'C': 
        return <Badge className="bg-yellow-100 text-yellow-800">Orta</Badge>
      case 'D': 
        return <Badge className="bg-orange-100 text-orange-800">Zor</Badge>
      case 'F': 
        return <Badge className="bg-red-100 text-red-800">Çok Zor</Badge>
      default: 
        return <Badge className="bg-gray-100 text-gray-800">Bilinmiyor</Badge>
    }
  }

  const getSuggestionPriority = (priority: string) => {
    switch (priority) {
      case 'high': 
        return <Badge className="bg-red-100 text-red-800">Yüksek</Badge>
      case 'medium': 
        return <Badge className="bg-yellow-100 text-yellow-800">Orta</Badge>
      case 'low': 
        return <Badge className="bg-blue-100 text-blue-800">Düşük</Badge>
      default: 
        return <Badge className="bg-gray-100 text-gray-800">Bilinmiyor</Badge>
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Brain className="h-8 w-8" />
          AI İçerik Analizi
        </h1>
        <p className="text-gray-600">İçeriğinizi AI destekli araçlarla analiz edin ve optimize edin</p>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5" />
              İçerik Girişi
            </CardTitle>
            <CardDescription>
              Analiz edilecek içeriği buraya yapıştırın
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Anahtar Kelimeler</label>
              <Input
                placeholder="akıllı şehir, toplu taşıma, ulaşım optimizasyonu"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Virgülle ayırarak birden fazla anahtar kelime ekleyebilirsiniz
              </p>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">İçerik</label>
              <Textarea
                placeholder="Analiz edilecek içeriği buraya yapıştırın..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleAnalyze} 
                disabled={loading || !content.trim()}
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Analiz Et
              </Button>
              <Button 
                onClick={handleOptimize} 
                disabled={loading || !content.trim()}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Zap className="h-4 w-4" />
                Optimize Et
              </Button>
              <Button 
                onClick={handleGenerateMeta} 
                disabled={loading || !content.trim()}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Target className="h-4 w-4" />
                Meta Oluştur
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Hızlı İstatistikler
            </CardTitle>
            <CardDescription>
              İçerik hakkında temel bilgiler
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Kelime Sayısı</span>
                <span className="font-medium">{content.split(/\s+/).filter(w => w.length > 0).length}</span>
              </div>
              <div className="flex justify-between">
                <span>Karakter Sayısı</span>
                <span className="font-medium">{content.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Cümle Sayısı</span>
                <span className="font-medium">{content.split(/[.!?]+/).filter(s => s.trim().length > 0).length}</span>
              </div>
              <div className="flex justify-between">
                <span>Paragraf Sayısı</span>
                <span className="font-medium">{content.split(/\n\s*\n/).filter(p => p.trim().length > 0).length}</span>
              </div>
              <div className="flex justify-between">
                <span>Anahtar Kelime</span>
                <span className="font-medium">{keywords.split(',').filter(k => k.trim().length > 0).length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* SEO Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                SEO Skoru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl font-bold">{analysis.seoScore}/100</div>
                <Progress value={analysis.seoScore} className="flex-1 h-3" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{analysis.readability?.score?.toFixed(1) || 0}</div>
                  <div className="text-sm text-muted-foreground">Okunabilirlik</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{analysis.readability?.grade || 'N/A'}</div>
                  <div className="text-sm text-muted-foreground">Seviye</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{analysis.keywordDensity?.length || 0}</div>
                  <div className="text-sm text-muted-foreground">Anahtar Kelime</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Readability Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Okunabilirlik Analizi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Okunabilirlik Skoru</h4>
                    {getReadabilityBadge(analysis.readability?.grade)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Skor:</span>
                      <span className="font-medium">{analysis.readability?.score?.toFixed(1) || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Seviye:</span>
                      <span className="font-medium">{analysis.readability?.level || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Öneriler</h4>
                  <div className="space-y-2">
                    {analysis.readability?.suggestions?.map((suggestion: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span>{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Keyword Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Anahtar Kelime Analizi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.keywordDensity?.map((keyword: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{keyword.keyword}</h4>
                      <Badge variant={keyword.suggestion === 'optimal' ? 'default' : keyword.suggestion === 'low' ? 'secondary' : 'destructive'}>
                        {keyword.suggestion === 'optimal' ? 'Optimal' : keyword.suggestion === 'low' ? 'Düşük' : 'Yüksek'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Yoğunluk:</span>
                        <div className="font-medium">{keyword.density.toFixed(2)}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Sayı:</span>
                        <div className="font-medium">{keyword.count}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Önerilen:</span>
                        <div className="font-medium">{keyword.suggestion === 'low' ? 'Artır' : keyword.suggestion === 'high' ? 'Azalt' : 'İyi'}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Pozisyon:</span>
                        <div className="font-medium">{keyword.position.length} adet</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SEO Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                SEO Önerileri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.suggestions?.map((suggestion: any, index: number) => (
                  <Alert key={index} variant={suggestion.priority === 'high' ? 'destructive' : 'default'}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex items-center justify-between mb-2">
                        <strong>{suggestion.message}</strong>
                        {getSuggestionPriority(suggestion.priority)}
                      </div>
                      <div className="text-sm mb-2">
                        <strong>Uygulama:</strong> {suggestion.implementation}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <strong>Etki:</strong> {suggestion.impact}
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Missing Elements */}
          {analysis.missingElements && analysis.missingElements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Eksik Elementler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.missingElements.map((element: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{element.element}</h4>
                        <p className="text-sm text-muted-foreground">{element.description}</p>
                      </div>
                      <Badge variant={element.importance === 'critical' ? 'destructive' : element.importance === 'important' ? 'secondary' : 'outline'}>
                        {element.importance === 'critical' ? 'Kritik' : element.importance === 'important' ? 'Önemli' : 'İsteğe Bağlı'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Meta Tags */}
          {analysis.metaDescription && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Meta Tag Önerileri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Title</label>
                    <div className="p-3 bg-gray-50 rounded-lg text-sm">
                      {analysis.title}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Meta Description</label>
                    <div className="p-3 bg-gray-50 rounded-lg text-sm">
                      {analysis.metaDescription}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Optimized Content */}
          {optimizedContent && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Optimize Edilmiş İçerik
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Copy className="h-4 w-4" />
                      Kopyala
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      İndir
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <pre className="whitespace-pre-wrap text-sm">{optimizedContent}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Analiz ediliyor...</span>
        </div>
      )}
    </div>
  )
} 