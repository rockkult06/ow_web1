import { LoadingSpinner } from '@/components/loading-spinner'

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            OptimizeWorld Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lojistik optimizasyonu, sürü yönetimi ve veri analizi hakkında güncel içerikler
          </p>
        </div>
        
        <LoadingSpinner />
      </div>
    </div>
  )
} 