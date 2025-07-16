import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Sayfa Bulunamadı
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Ana Sayfaya Dön
            </Button>
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Veya şu sayfaları ziyaret edebilirsiniz:</p>
            <div className="mt-2 space-x-4">
              <Link href="/about" className="text-blue-600 hover:underline">
                Hakkımızda
              </Link>
              <Link href="/solutions" className="text-blue-600 hover:underline">
                Çözümler
              </Link>
              <Link href="/contact" className="text-blue-600 hover:underline">
                İletişim
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 