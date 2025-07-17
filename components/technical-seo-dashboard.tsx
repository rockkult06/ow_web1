'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText, 
  Globe, 
  Info, 
  Loader2, 
  Settings, 
  TrendingUp,
  Zap,
  Shield,
  Smartphone,
  Code,
  Database
} from 'lucide-react';
import { 
  TechnicalSEOReport, 
  TechnicalSEOIssue, 
  useTechnicalSEO 
} from '@/lib/technical-seo-analyzer';
import { 
  CoreWebVitalsReport, 
  useCoreWebVitals 
} from '@/lib/core-web-vitals-monitor';
import { 
  SpeedOptimizationReport, 
  usePageSpeedOptimizer 
} from '@/lib/page-speed-optimizer';

export default function TechnicalSEODashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const { report: seoReport, isLoading: seoLoading, error: seoError, analyzePage: analyzeSEO } = useTechnicalSEO();
  const { report: vitalsReport, isLoading: vitalsLoading, error: vitalsError, measureVitals } = useCoreWebVitals();
  const { report: speedReport, isLoading: speedLoading, error: speedError, analyzePage: analyzeSpeed } = usePageSpeedOptimizer();

  const runFullAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      await Promise.all([
        analyzeSEO(),
        measureVitals(),
        analyzeSpeed()
      ]);
    } catch (error) {
      console.error('Analiz hatası:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    runFullAnalysis();
  }, []);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-100';
      case 'B': return 'text-blue-600 bg-blue-100';
      case 'C': return 'text-yellow-600 bg-yellow-100';
      case 'D': return 'text-orange-600 bg-orange-100';
      case 'F': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <Info className="h-4 w-4 text-blue-500" />;
      default: return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'meta': return <FileText className="h-4 w-4" />;
      case 'structure': return <Code className="h-4 w-4" />;
      case 'performance': return <Zap className="h-4 w-4" />;
      case 'accessibility': return <Shield className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      default: return <Database className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teknik SEO Dashboard</h1>
          <p className="text-muted-foreground">
            Sayfa performansı, Core Web Vitals ve teknik SEO analizi
          </p>
        </div>
        <Button 
          onClick={runFullAnalysis} 
          disabled={isAnalyzing}
          className="flex items-center gap-2"
        >
          {isAnalyzing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Activity className="h-4 w-4" />
          )}
          {isAnalyzing ? 'Analiz Ediliyor...' : 'Yenile'}
        </Button>
      </div>

      {/* Error Alerts */}
      {(seoError || vitalsError || speedError) && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {seoError && `SEO Analizi Hatası: ${seoError}`}
            {vitalsError && `Core Web Vitals Hatası: ${vitalsError}`}
            {speedError && `Hız Analizi Hatası: ${speedError}`}
          </AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {(seoLoading || vitalsLoading || speedLoading) && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Analiz ediliyor...</span>
        </div>
      )}

      {/* Main Content */}
      {!seoLoading && !vitalsLoading && !speedLoading && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
            <TabsTrigger value="technical">Teknik SEO</TabsTrigger>
            <TabsTrigger value="performance">Performans</TabsTrigger>
            <TabsTrigger value="speed">Hız Optimizasyonu</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">SEO Skoru</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {seoReport?.score || 0}/100
                  </div>
                  <Badge className={`mt-2 ${getGradeColor(seoReport?.grade || 'F')}`}>
                    {seoReport?.grade || 'N/A'}
                  </Badge>
                  <Progress value={seoReport?.score || 0} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Core Web Vitals</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {vitalsReport?.overallScore || 0}/100
                  </div>
                  <Badge className={`mt-2 ${getGradeColor(vitalsReport?.performanceGrade || 'F')}`}>
                    {vitalsReport?.performanceGrade || 'N/A'}
                  </Badge>
                  <Progress value={vitalsReport?.overallScore || 0} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hız Tasarrufu</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {speedReport?.totalSavingsPercentage || 0}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {(speedReport?.totalSavings || 0) / 1024} KB tasarruf
                  </p>
                  <Progress value={speedReport?.totalSavingsPercentage || 0} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Toplam Sorun</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {seoReport?.summary.totalIssues || 0}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="destructive" className="text-xs">
                      {seoReport?.summary.errors || 0} Hata
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {seoReport?.summary.warnings || 0} Uyarı
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Hızlı Aksiyonlar</CardTitle>
                <CardDescription>
                  En kritik sorunları hemen çözün
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {seoReport?.improvements.immediate.slice(0, 3).map((issue) => (
                  <div key={issue.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getIssueIcon(issue.type)}
                      <div>
                        <p className="font-medium">{issue.title}</p>
                        <p className="text-sm text-muted-foreground">{issue.description}</p>
                      </div>
                    </div>
                    <Badge className={getPriorityColor(issue.priority)}>
                      {issue.priority}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Technical SEO Tab */}
          <TabsContent value="technical" className="space-y-6">
            {seoReport && (
              <>
                {/* Issues by Category */}
                <Card>
                  <CardHeader>
                    <CardTitle>Kategori Bazında Sorunlar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {['meta', 'structure', 'accessibility', 'mobile'].map((category) => {
                        const categoryIssues = seoReport.issues.filter(i => i.category === category);
                        return (
                          <div key={category} className="p-4 border rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              {getCategoryIcon(category)}
                              <span className="font-medium capitalize">{category}</span>
                            </div>
                            <div className="text-2xl font-bold">{categoryIssues.length}</div>
                            <div className="text-sm text-muted-foreground">sorun</div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* All Issues */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tüm Teknik SEO Sorunları</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {seoReport.issues.map((issue) => (
                        <div key={issue.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              {getIssueIcon(issue.type)}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium">{issue.title}</h4>
                                  <Badge className={getPriorityColor(issue.priority)}>
                                    {issue.priority}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {issue.description}
                                </p>
                                {issue.fixDescription && (
                                  <div className="bg-muted p-3 rounded text-sm">
                                    <strong>Çözüm:</strong> {issue.fixDescription}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            {vitalsReport && (
              <>
                {/* Core Web Vitals Scores */}
                <Card>
                  <CardHeader>
                    <CardTitle>Core Web Vitals Skorları</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {vitalsReport.scores.map((score) => (
                        <div key={score.metric} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium uppercase">{score.metric}</span>
                            <Badge variant={score.score === 'good' ? 'default' : score.score === 'needsImprovement' ? 'secondary' : 'destructive'}>
                              {score.score}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{score.value.toFixed(2)}</div>
                            <div className="text-xs text-muted-foreground">
                              Hedef: {score.threshold}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Optimizations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performans Optimizasyonları</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {vitalsReport.optimizations.map((optimization) => (
                        <div key={optimization.metric} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{optimization.description}</h4>
                            <Badge className={getPriorityColor(optimization.priority)}>
                              {optimization.priority}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Mevcut:</span>
                              <span className="ml-2 font-medium">{optimization.currentValue.toFixed(2)}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Hedef:</span>
                              <span className="ml-2 font-medium">{optimization.targetValue.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-muted-foreground">Tahmini İyileştirme:</span>
                            <span className="ml-2 font-medium text-green-600">
                              %{optimization.estimatedImpact}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Speed Optimization Tab */}
          <TabsContent value="speed" className="space-y-6">
            {speedReport && (
              <>
                {/* Speed Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Hız Optimizasyonu Özeti</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {speedReport.totalSavingsPercentage}%
                        </div>
                        <div className="text-sm text-muted-foreground">Tasarruf</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {(speedReport.totalSavings / 1024).toFixed(1)} KB
                        </div>
                        <div className="text-sm text-muted-foreground">Toplam Tasarruf</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {speedReport.estimatedImprovement} ms
                        </div>
                        <div className="text-sm text-muted-foreground">Tahmini İyileştirme</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Optimizations by Type */}
                <Card>
                  <CardHeader>
                    <CardTitle>Optimizasyon Türleri</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['image', 'script', 'css', 'font', 'caching'].map((type) => {
                        const typeOptimizations = speedReport.optimizations.filter(o => o.type === type);
                        if (typeOptimizations.length === 0) return null;

                        const totalSavings = typeOptimizations.reduce((sum, opt) => sum + opt.savings, 0);
                        return (
                          <div key={type} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium capitalize">{type} Optimizasyonları</h4>
                              <Badge>{typeOptimizations.length} adet</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Toplam Tasarruf:</span>
                                <span className="ml-2 font-medium">{(totalSavings / 1024).toFixed(1)} KB</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Kritik:</span>
                                <span className="ml-2 font-medium">
                                  {typeOptimizations.filter(o => o.priority === 'critical').length}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* All Optimizations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tüm Optimizasyonlar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {speedReport.optimizations.map((optimization) => (
                        <div key={optimization.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{optimization.title}</h4>
                            <Badge className={getPriorityColor(optimization.priority)}>
                              {optimization.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {optimization.description}
                          </p>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Mevcut:</span>
                              <span className="ml-2 font-medium">{(optimization.currentSize / 1024).toFixed(1)} KB</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Optimize:</span>
                              <span className="ml-2 font-medium">{(optimization.optimizedSize / 1024).toFixed(1)} KB</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Tasarruf:</span>
                              <span className="ml-2 font-medium text-green-600">
                                {(optimization.savings / 1024).toFixed(1)} KB
                              </span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Progress value={optimization.savingsPercentage} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
} 