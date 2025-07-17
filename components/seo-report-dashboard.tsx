'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Mail, 
  Calendar,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Users,
  Target,
  BarChart3,
  Activity,
  Zap,
  Globe,
  Search,
  Shield,
  Clock,
  Star
} from 'lucide-react';
import { useSEOReportGenerator, SEOReportData, ReportTemplate } from '@/lib/seo-report-generator';

export default function SEOReportDashboard() {
  const [selectedUrl, setSelectedUrl] = useState<string>('https://optimizeworld.net');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('30d');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('comprehensive_report');
  const [recipients, setRecipients] = useState<string>('');
  const [reportFormat, setReportFormat] = useState<'pdf' | 'excel' | 'both'>('pdf');
  const [generatedReport, setGeneratedReport] = useState<SEOReportData | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [reports, setReports] = useState<SEOReportData[]>([]);

  const {
    generateReport,
    generatePDFReport,
    generateExcelReport,
    sendReport,
    getTemplates,
    getReports
  } = useSEOReportGenerator();

  const templates = getTemplates();

  useEffect(() => {
    setReports(getReports());
  }, []);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const report = generateReport(selectedUrl, selectedPeriod, selectedTemplate);
      setGeneratedReport(report);
      setReports(getReports());
    } catch (error) {
      console.error('Rapor oluşturma hatası:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = () => {
    if (generatedReport) {
      const pdfFile = generatePDFReport(generatedReport);
      console.log('PDF indiriliyor:', pdfFile);
      // Gerçek uygulamada dosya indirme işlemi yapılır
    }
  };

  const handleDownloadExcel = () => {
    if (generatedReport) {
      const excelFile = generateExcelReport(generatedReport);
      console.log('Excel indiriliyor:', excelFile);
      // Gerçek uygulamada dosya indirme işlemi yapılır
    }
  };

  const handleSendReport = () => {
    if (generatedReport && recipients) {
      const recipientList = recipients.split(',').map(email => email.trim());
      sendReport(generatedReport, recipientList, reportFormat);
      alert('Rapor başarıyla gönderildi!');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <Star className="h-4 w-4 text-green-500" />;
      case 'good':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'needs_improvement':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'poor':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return <Badge className="bg-green-100 text-green-800">Mükemmel</Badge>;
      case 'good':
        return <Badge className="bg-blue-100 text-blue-800">İyi</Badge>;
      case 'needs_improvement':
        return <Badge className="bg-yellow-100 text-yellow-800">Geliştirilebilir</Badge>;
      case 'poor':
        return <Badge className="bg-red-100 text-red-800">Zayıf</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Bilinmiyor</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO Rapor Dashboard</h1>
          <p className="text-gray-600">Otomatik SEO raporları oluşturun ve yönetin</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setReports(getReports())}>
            <Eye className="h-4 w-4 mr-2" />
            Raporları Görüntüle
          </Button>
        </div>
      </div>

      {/* Rapor Oluşturma Formu */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Yeni Rapor Oluştur</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={selectedUrl}
                onChange={(e) => setSelectedUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Dönem</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Son 7 Gün</SelectItem>
                  <SelectItem value="30d">Son 30 Gün</SelectItem>
                  <SelectItem value="90d">Son 90 Gün</SelectItem>
                  <SelectItem value="1y">Son 1 Yıl</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="template">Rapor Şablonu</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>&nbsp;</Label>
              <Button 
                onClick={handleGenerateReport} 
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? 'Oluşturuluyor...' : 'Rapor Oluştur'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Oluşturulan Rapor */}
      {generatedReport && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Oluşturulan Rapor</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                {getStatusIcon(generatedReport.summary.status)}
                {getStatusBadge(generatedReport.summary.status)}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary" className="space-y-4">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="summary">Özet</TabsTrigger>
                <TabsTrigger value="metrics">Metrikler</TabsTrigger>
                <TabsTrigger value="insights">İçgörüler</TabsTrigger>
                <TabsTrigger value="recommendations">Öneriler</TabsTrigger>
                <TabsTrigger value="technical">Teknik</TabsTrigger>
                <TabsTrigger value="actions">İşlemler</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="text-2xl font-bold">{generatedReport.summary.overallScore}</div>
                          <div className="text-sm text-gray-600">Genel Skor</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="text-2xl font-bold">{generatedReport.summary.organicTraffic.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">Organik Trafik</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Target className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="text-2xl font-bold">{generatedReport.summary.conversions}</div>
                          <div className="text-sm text-gray-600">Dönüşümler</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5 text-orange-600" />
                        <div>
                          <div className="text-2xl font-bold">{generatedReport.summary.avgPosition}</div>
                          <div className="text-sm text-gray-600">Ort. Pozisyon</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="metrics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Trafik Kaynakları</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Organik</span>
                          <span className="font-medium">{generatedReport.metrics.traffic.organic.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Direkt</span>
                          <span className="font-medium">{generatedReport.metrics.traffic.direct.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sosyal</span>
                          <span className="font-medium">{generatedReport.metrics.traffic.social.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Referans</span>
                          <span className="font-medium">{generatedReport.metrics.traffic.referral.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Engagement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Sayfa Görüntülemeleri</span>
                          <span className="font-medium">{generatedReport.metrics.engagement.pageviews.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ort. Sayfa Süresi</span>
                          <span className="font-medium">{generatedReport.metrics.engagement.avgTimeOnPage}s</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hemen Çıkma Oranı</span>
                          <span className="font-medium">{generatedReport.metrics.engagement.bounceRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sayfa/Session</span>
                          <span className="font-medium">{generatedReport.metrics.engagement.pagesPerSession}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="insights" className="space-y-4">
                <div className="space-y-4">
                  {generatedReport.insights.map((insight, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          {insight.type === 'positive' ? (
                            <TrendingUp className="h-5 w-5 text-green-500 mt-1" />
                          ) : insight.type === 'negative' ? (
                            <TrendingDown className="h-5 w-5 text-red-500 mt-1" />
                          ) : (
                            <Activity className="h-5 w-5 text-gray-500 mt-1" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium">{insight.title}</h4>
                              <Badge className={
                                insight.impact === 'high' ? 'bg-red-100 text-red-800' :
                                insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }>
                                {insight.impact === 'high' ? 'Yüksek' : insight.impact === 'medium' ? 'Orta' : 'Düşük'}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                            <div className="text-sm text-gray-500">
                              {insight.previousValue} → {insight.value} ({insight.change > 0 ? '+' : ''}{insight.change}%)
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                <div className="space-y-4">
                  {generatedReport.recommendations.map((rec, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${
                            rec.priority === 'high' ? 'bg-red-100 text-red-600' :
                            rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            {rec.priority === 'high' ? <AlertCircle className="h-4 w-4" /> :
                             rec.priority === 'medium' ? <Clock className="h-4 w-4" /> :
                             <CheckCircle className="h-4 w-4" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium">{rec.title}</h4>
                              <Badge className={
                                rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                                rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }>
                                {rec.priority === 'high' ? 'Yüksek' : rec.priority === 'medium' ? 'Orta' : 'Düşük'}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="font-medium">Etki:</span> {rec.impact}
                              </div>
                              <div>
                                <span className="font-medium">Çaba:</span> {rec.effort}
                              </div>
                            </div>
                            <div className="mt-2">
                              <span className="text-sm font-medium">Uygulama Adımları:</span>
                              <ul className="text-sm text-gray-600 mt-1 space-y-1">
                                {rec.implementation.map((step, stepIndex) => (
                                  <li key={stepIndex} className="flex items-start space-x-2">
                                    <span className="text-blue-500">•</span>
                                    <span>{step}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="technical" className="space-y-4">
                <div className="space-y-4">
                  {generatedReport.technicalAudit.map((audit, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{audit.category}</CardTitle>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{audit.score}/100</span>
                            <Badge className={
                              audit.status === 'pass' ? 'bg-green-100 text-green-800' :
                              audit.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {audit.status === 'pass' ? 'Geçti' : audit.status === 'warning' ? 'Uyarı' : 'Başarısız'}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {audit.checks.map((check, checkIndex) => (
                            <div key={checkIndex} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                              {check.status === 'pass' ? (
                                <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                              ) : check.status === 'warning' ? (
                                <AlertCircle className="h-4 w-4 text-yellow-500 mt-1" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-500 mt-1" />
                              )}
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium">{check.name}</span>
                                  {check.value && <span className="text-sm text-gray-600">{check.value}</span>}
                                </div>
                                <p className="text-sm text-gray-600 mb-1">{check.description}</p>
                                {check.recommendation && (
                                  <p className="text-sm text-blue-600">{check.recommendation}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="actions" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Rapor İndirme</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button onClick={handleDownloadPDF} className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        PDF İndir
                      </Button>
                      <Button onClick={handleDownloadExcel} className="w-full" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Excel İndir
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Rapor Gönderme</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="recipients">E-posta Adresleri</Label>
                        <Input
                          id="recipients"
                          value={recipients}
                          onChange={(e) => setRecipients(e.target.value)}
                          placeholder="email1@example.com, email2@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="format">Format</Label>
                        <Select value={reportFormat} onValueChange={(value: 'pdf' | 'excel' | 'both') => setReportFormat(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="both">Her İkisi</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleSendReport} className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Rapor Gönder
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Rapor Geçmişi */}
      {reports.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Rapor Geçmişi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">{report.url}</div>
                      <div className="text-sm text-gray-600">
                        {report.period} • {report.generatedAt.toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(report.summary.status)}
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 