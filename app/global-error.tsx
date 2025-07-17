'use client'

import { Button } from '@/components/ui/button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
          <div className="text-center space-y-8 p-8">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold text-red-600">Hata</h1>
              <h2 className="text-xl font-semibold text-gray-800">Bir şeyler yanlış gitti</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Beklenmeyen bir hata oluştu. Lütfen sayfayı yenilemeyi deneyin veya daha sonra tekrar gelin.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={reset}
                className="bg-red-600 hover:bg-red-700"
              >
                Sayfayı Yenile
              </Button>
              
              <div className="text-sm text-gray-500">
                <p>Hata devam ederse lütfen bizimle iletişime geçin:</p>
                <a 
                  href="mailto:info@ow.com" 
                  className="text-red-600 hover:underline"
                >
                  info@ow.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
} 