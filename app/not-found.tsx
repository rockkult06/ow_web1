import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800">Sayfa Bulunamadı</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya dönmek için aşağıdaki butonu kullanabilirsiniz.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/">
              Ana Sayfaya Dön
            </Link>
          </Button>
          
          <div className="text-sm text-gray-500">
            <p>Veya şu sayfaları ziyaret edebilirsiniz:</p>
            <div className="flex justify-center space-x-4 mt-2">
              <Link href="/solutions" className="text-blue-600 hover:underline">
                Çözümlerimiz
              </Link>
              <Link href="/about" className="text-blue-600 hover:underline">
                Hakkımızda
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