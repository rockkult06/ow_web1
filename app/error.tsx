'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-red-600">500</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Sunucu Hatası
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Bir hata oluştu. Lütfen daha sonra tekrar deneyin.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="space-x-4">
            <Button 
              onClick={reset}
              size="lg" 
              className="bg-red-600 hover:bg-red-700"
            >
              Tekrar Dene
            </Button>
            
            <Link href="/">
              <Button size="lg" variant="outline">
                Ana Sayfaya Dön
              </Button>
            </Link>
          </div>
          
          <div className="text-sm text-gray-500 mt-4">
            <p>Hata devam ederse lütfen bizimle iletişime geçin:</p>
            <Link href="/contact" className="text-red-600 hover:underline">
              İletişim
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 