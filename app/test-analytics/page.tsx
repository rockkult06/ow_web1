'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function TestAnalytics() {
  useEffect(() => {
    // Sayfa yüklendiğinde test event'i gönder
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Analytics Test Page',
        page_location: 'https://www.optimizeworld.net/test-analytics'
      })
    }
  }, [])

  const testEvent = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'button_click', {
        event_category: 'test',
        event_label: 'analytics_test_button'
      })
      alert('Test event gönderildi! Google Analytics\'te kontrol edin.')
    } else {
      alert('Google Analytics yüklenmemiş!')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center max-w-md mx-auto p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Google Analytics Test
        </h1>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            Bu sayfa Google Analytics'in çalışıp çalışmadığını test etmek için oluşturulmuştur.
          </p>
          
          <Button 
            onClick={testEvent}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Test Event Gönder
          </Button>
          
          <div className="text-sm text-gray-500 mt-4">
            <p>Kontrol edilecek noktalar:</p>
            <ul className="mt-2 text-left">
              <li>• Console'da "Google Analytics loaded" mesajı</li>
              <li>• Google Analytics'te Gerçek Zamanlı rapor</li>
              <li>• Network sekmesinde analytics istekleri</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 