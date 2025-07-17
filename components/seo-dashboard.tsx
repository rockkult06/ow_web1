'use client'

import { useState, useEffect } from 'react'
import { usePerformance, useResourcePerformance } from '@/hooks/use-performance'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

export function SEODashboard() {
  const { metrics, score, grade } = usePerformance()
  const resourceMetrics = useResourcePerformance()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show dashboard in development or for admin users
    if (process.env.NODE_ENV === 'development' || window.location.search.includes('debug=seo')) {
      setIsVisible(true)
    }
  }, [])

  if (!isVisible) return null

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    if (score >= 70) return 'text-orange-600'
    return 'text-red-600'
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-800'
      case 'B': return 'bg-yellow-100 text-yellow-800'
      case 'C': return 'bg-orange-100 text-orange-800'
      case 'D': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`
    return `${(ms / 1000).toFixed(2)}s`
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">SEO Performance</h3>
        <Badge className={getGradeColor(grade)}>{grade}</Badge>
      </div>

      <div className="space-y-3">
        {/* Overall Score */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Performance Score</span>
            <span className={getScoreColor(score)}>{score}/100</span>
          </div>
          <Progress value={score} className="h-2" />
        </div>

        {/* Core Web Vitals */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>LCP</span>
              <span className={metrics.lcp && metrics.lcp < 2500 ? 'text-green-600' : 'text-red-600'}>
                {metrics.lcp ? formatTime(metrics.lcp) : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>FID</span>
              <span className={metrics.fid && metrics.fid < 100 ? 'text-green-600' : 'text-red-600'}>
                {metrics.fid ? formatTime(metrics.fid) : 'N/A'}
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>CLS</span>
              <span className={metrics.cls && metrics.cls < 0.1 ? 'text-green-600' : 'text-red-600'}>
                {metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>TTFB</span>
              <span className={metrics.ttfb && metrics.ttfb < 600 ? 'text-green-600' : 'text-red-600'}>
                {metrics.ttfb ? formatTime(metrics.ttfb) : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Resource Metrics */}
        <div className="pt-2 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="text-gray-500">Resources</div>
              <div className="font-medium">{resourceMetrics.totalResources}</div>
            </div>
            <div>
              <div className="text-gray-500">Size</div>
              <div className="font-medium">{formatBytes(resourceMetrics.totalSize)}</div>
            </div>
          </div>
        </div>

        {/* SEO Status */}
        <div className="pt-2 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs">
            <span>SEO Status</span>
            <Badge variant="outline" className="text-green-600 border-green-600">
              Optimized
            </Badge>
          </div>
        </div>
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

// SEO Status Indicator Component
export function SEOStatusIndicator() {
  const { score, grade } = usePerformance()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-md border">
        <div className={`w-2 h-2 rounded-full ${
          score >= 90 ? 'bg-green-500' : 
          score >= 80 ? 'bg-yellow-500' : 
          score >= 70 ? 'bg-orange-500' : 'bg-red-500'
        }`} />
        <span className="text-xs font-medium text-gray-700">
          SEO: {grade} ({score})
        </span>
      </div>
    </div>
  )
}

// Performance Alert Component
export function PerformanceAlert() {
  const { score, metrics } = usePerformance()
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    // Show alert if performance is poor
    if (score < 70 || 
        (metrics.lcp && metrics.lcp > 4000) ||
        (metrics.fid && metrics.fid > 300) ||
        (metrics.cls && metrics.cls > 0.25)) {
      setShowAlert(true)
    }
  }, [score, metrics])

  if (!showAlert) return null

  return (
    <div className="fixed top-4 left-4 z-50 max-w-sm bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">Performance Issue Detected</h3>
          <p className="mt-1 text-sm text-red-700">
            Page performance score is {score}/100. Consider optimizing images, reducing bundle size, or implementing lazy loading.
          </p>
        </div>
        <button
          onClick={() => setShowAlert(false)}
          className="flex-shrink-0 text-red-400 hover:text-red-600"
        >
          ×
        </button>
      </div>
    </div>
  )
} 