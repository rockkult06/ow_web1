"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Play, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Settings,
  BarChart3,
  Zap,
  TestTube,
  Target,
  Shield,
  Search,
  FileText,
  Globe,
  Smartphone,
  Monitor,
  RefreshCw,
  Download,
  Eye,
  Lightbulb
} from 'lucide-react'
import { useSEOTestAutomation } from '@/lib/seo-test-automation'

export default function SEOTestDashboard() {
  const [selectedSuite, setSelectedSuite] = useState('critical_seo_suite')
  const [testResults, setTestResults] = useState<any>(null)
  const [runningTests, setRunningTests] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState('https://optimizeworld.net')

  const { runTestSuite, getTestSuites, getTests } = useSEOTestAutomation()

  useEffect(() => {
    loadTestSuites()
  }, [])

  const loadTestSuites = () => {
    const suites = getTestSuites()
    console.log('Available test suites:', suites)
  }

  const runTests = async () => {
    if (!url.trim()) return

    setLoading(true)
    setRunningTests([])
    
    try {
      const suite = getTestSuites().find(s => s.id === selectedSuite)
      if (!suite) return

      // Simulate running tests
      for (const test of suite.tests) {
        setRunningTests(prev => [...prev, test.id])
        
        // Simulate test execution time
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setRunningTests(prev => prev.filter(id => id !== test.id))
      }

      // Mock test results
      const results = {
        suiteId: selectedSuite,
        url: url,
        startTime: new Date(),
        endTime: new Date(),
        summary: {
          total: suite.tests.length,
          passed: Math.floor(suite.tests.length * 0.8),
          failed: Math.floor(suite.tests.length * 0.15),
          skipped: Math.floor(suite.tests.length * 0.05),
          score: 85
        },
        tests: suite.tests.map(test => ({
          id: test.id,
          name: test.name,
          status: Math.random() > 0.2 ? 'passed' : 'failed',
          score: Math.floor(Math.random() * 40) + 60,
          details: `Test ${test.name} completed`,
          recommendations: Math.random() > 0.5 ? ['Optimize this area'] : []
        }))
      }

      setTestResults(results)
    } catch (error) {
      console.error('Test execution error:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'running':
        return <Clock className="h-4 w-4 text-blue-600 animate-spin" />
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'passed':
        return <Badge className="bg-green-100 text-green-800">Başarılı</Badge>
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Başarısız</Badge>
      case 'running':
        return <Badge className="bg-blue-100 text-blue-800">Çalışıyor</Badge>
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Bekliyor</Badge>
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
    return <Badge className="bg-red-100 text-red-800">Düşük</Badge>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">SEO Test Dashboard</h1>
        <p className="text-gray-600">Otomatik SEO testleri ve performans analizi</p>
      </div>

      {/* Test Configuration */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Test Konfigürasyonu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Test URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Test Paketi</label>
              <select
                value={selectedSuite}
                onChange={(e) => setSelectedSuite(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="critical_seo_suite">Kritik SEO Test Paketi</option>
                <option value="full_seo_suite">Tam SEO Test Paketi</option>
                <option value="performance_suite">Performans Test Paketi</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={runTests} 
                disabled={loading || !url.trim()}
                className="flex items-center gap-2 w-full"
              >
                <Play className="h-4 w-4" />
                {loading ? 'Testler Çalışıyor...' : 'Testleri Başlat'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      {testResults && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Test</CardTitle>
                <TestTube className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{testResults.summary.total}</div>
                <p className="text-xs text-muted-foreground">Test sayısı</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Başarılı</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{testResults.summary.passed}</div>
                <p className="text-xs text-muted-foreground">
                  %{((testResults.summary.passed / testResults.summary.total) * 100).toFixed(1)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Başarısız</CardTitle>
                <XCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{testResults.summary.failed}</div>
                <p className="text-xs text-muted-foreground">
                  %{((testResults.summary.failed / testResults.summary.total) * 100).toFixed(1)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Genel Skor</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{testResults.summary.score}/100</div>
                <Progress value={testResults.summary.score} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Detailed Results */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
              <TabsTrigger value="technical">Teknik SEO</TabsTrigger>
              <TabsTrigger value="content">İçerik SEO</TabsTrigger>
              <TabsTrigger value="performance">Performans</TabsTrigger>
              <TabsTrigger value="security">Güvenlik</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Test Sonuçları
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {testResults.tests.map((test: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          {getStatusIcon(test.status)}
                          <div>
                            <div className="font-medium">{test.name}</div>
                            <div className="text-sm text-muted-foreground">{test.details}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-medium">{test.score}/100</div>
                            {getScoreBadge(test.score)}
                          </div>
                          {getStatusBadge(test.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technical" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      Meta Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Title Tag</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Meta Description</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Structured Data</span>
                        <XCircle className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Canonical URL</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Indexing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Robots.txt</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Sitemap.xml</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>HTTPS</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>SSL Certificate</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Heading Structure</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Alt Text</span>
                        <XCircle className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Internal Links</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Content Length</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      Öneriler
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Görsellere alt text ekleyin
                        </AlertDescription>
                      </Alert>
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Structured data ekleyin
                        </AlertDescription>
                      </Alert>
                      <Alert>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription>
                          Heading yapısı iyi
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Core Web Vitals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>LCP (Largest Contentful Paint)</span>
                          <span className="text-green-600">2.1s</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>FID (First Input Delay)</span>
                          <span className="text-green-600">45ms</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>CLS (Cumulative Layout Shift)</span>
                          <span className="text-yellow-600">0.08</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Monitor className="h-5 w-5" />
                      Mobil Uyumluluk
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Responsive Design</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Touch Targets</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Viewport Meta</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Mobile Speed</span>
                        <span className="text-green-600">85/100</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Güvenlik Kontrolleri
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>HTTPS</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Security Headers</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>SSL Certificate</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Content Security Policy</span>
                        <XCircle className="h-4 w-4 text-red-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Güvenlik Önerileri
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Content Security Policy (CSP) header'ı ekleyin
                        </AlertDescription>
                      </Alert>
                      <Alert>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription>
                          HTTPS kullanımı doğru
                        </AlertDescription>
                      </Alert>
                      <Alert>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription>
                          Security headers mevcut
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
              Testleri Yeniden Çalıştır
            </Button>
          </div>
        </div>
      )}

      {/* Running Tests Indicator */}
      {runningTests.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 animate-spin" />
              Çalışan Testler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {runningTests.map((testId, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">{testId}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 