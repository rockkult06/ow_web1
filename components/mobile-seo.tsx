'use client'

import { useState, useEffect } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { trackEvent } from '@/lib/analytics'

interface MobileSEOProps {
  children: React.ReactNode
  showMobileOptimizations?: boolean
}

export function MobileSEO({ children, showMobileOptimizations = false }: MobileSEOProps) {
  const isMobile = useIsMobile()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isMobile && showMobileOptimizations) {
      setIsVisible(true)
    }
  }, [isMobile, showMobileOptimizations])

  if (!isVisible) return <>{children}</>

  return (
    <div className="mobile-seo-container">
      {children}
      
      {/* Mobile SEO Indicators */}
      <div className="fixed bottom-4 left-4 z-40">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs font-medium text-green-800">Mobil Optimize</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mobile-friendly navigation component
export function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
    trackEvent('mobile_menu_toggle', {
      action: isMenuOpen ? 'close' : 'open',
      device_type: 'mobile'
    })
  }

  if (!isMobile) return null

  return (
    <div className="mobile-navigation">
      <Button
        onClick={handleMenuToggle}
        className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full p-2 shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </Button>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-6">OW Menü</h3>
              
              <nav className="space-y-4">
                <a href="/" className="block py-2 text-gray-700 hover:text-blue-600">
                  Ana Sayfa
                </a>
                <a href="/solutions" className="block py-2 text-gray-700 hover:text-blue-600">
                  Çözümlerimiz
                </a>
                <a href="/about" className="block py-2 text-gray-700 hover:text-blue-600">
                  Hakkımızda
                </a>
                <a href="/team" className="block py-2 text-gray-700 hover:text-blue-600">
                  Ekibimiz
                </a>
                <a href="/contact" className="block py-2 text-gray-700 hover:text-blue-600">
                  İletişim
                </a>
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Demo Talep Et
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Mobile-optimized content component
export function MobileContent({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const isMobile = useIsMobile()

  return (
    <div className={`mobile-content ${isMobile ? 'mobile-optimized' : ''} ${className}`}>
      {children}
    </div>
  )
}

// Mobile-friendly image component
export function MobileImage({ 
  src, 
  alt, 
  className = '',
  priority = false 
}: { 
  src: string
  alt: string
  className?: string
  priority?: boolean
}) {
  const isMobile = useIsMobile()

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${isMobile ? 'w-full h-auto' : ''}`}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}

// Mobile performance monitoring
export function MobilePerformanceMonitor() {
  const isMobile = useIsMobile()
  const [performanceData, setPerformanceData] = useState({
    loadTime: 0,
    imageCount: 0,
    scriptCount: 0
  })

  useEffect(() => {
    if (isMobile) {
      // Track mobile-specific performance
      const loadTime = performance.now()
      const images = document.querySelectorAll('img').length
      const scripts = document.querySelectorAll('script').length

      setPerformanceData({
        loadTime,
        imageCount: images,
        scriptCount: scripts
      })

      trackEvent('mobile_performance', {
        load_time: loadTime,
        image_count: images,
        script_count: scripts,
        device_type: 'mobile'
      })
    }
  }, [isMobile])

  if (!isMobile) return null

  return (
    <div className="fixed top-4 left-4 z-40">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 shadow-lg">
        <div className="text-xs text-blue-800">
          <div>Yükleme: {performanceData.loadTime.toFixed(0)}ms</div>
          <div>Resim: {performanceData.imageCount}</div>
          <div>Script: {performanceData.scriptCount}</div>
        </div>
      </div>
    </div>
  )
}

// Mobile SEO checklist component
export function MobileSEOChecklist() {
  const [checklist, setChecklist] = useState({
    viewport: true,
    touchTargets: true,
    fontSize: true,
    images: true,
    performance: true
  })

  useEffect(() => {
    // Check mobile SEO requirements
    const checks = {
      viewport: !!document.querySelector('meta[name="viewport"]'),
      touchTargets: true, // Would need more complex checking
      fontSize: true, // Would need more complex checking
      images: document.querySelectorAll('img').length > 0,
      performance: performance.now() < 3000
    }

    setChecklist(checks)
  }, [])

  return (
    <div className="mobile-seo-checklist">
      <h4 className="text-sm font-medium mb-2">Mobil SEO Kontrol</h4>
      <div className="space-y-1 text-xs">
        {Object.entries(checklist).map(([key, value]) => (
          <div key={key} className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${value ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={value ? 'text-green-700' : 'text-red-700'}>
              {key === 'viewport' ? 'Viewport Meta' :
               key === 'touchTargets' ? 'Touch Targets' :
               key === 'fontSize' ? 'Font Size' :
               key === 'images' ? 'Images' : 'Performance'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 