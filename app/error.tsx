'use client'

import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-orange-600">Oops!</h1>
          <h2 className="text-xl font-semibold text-gray-800">Bir hata oluştu</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Bu sayfada beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={reset}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Tekrar Dene
          </Button>
          
          <div className="text-sm text-gray-500">
            <p>Veya ana sayfaya dönebilirsiniz:</p>
            <a 
              href="/" 
              className="text-orange-600 hover:underline"
            >
              Ana Sayfa
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 