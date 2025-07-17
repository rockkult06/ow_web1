import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { generateBlogSchema } from '@/lib/structured-data'
import { BlogLink } from '@/components/blog-links'
import { SocialShare } from '@/components/social-share'

export const metadata: Metadata = {
  title: 'Blog - OptimizeWorld | Lojistik ve Optimizasyon Çözümleri',
  description: 'Lojistik optimizasyonu, sürü yönetimi, rota planlama ve veri analizi hakkında güncel blog yazıları.',
  keywords: 'lojistik blog, optimizasyon, sürü yönetimi, rota planlama, veri analizi',
  openGraph: {
    title: 'Blog - OptimizeWorld',
    description: 'Lojistik optimizasyonu ve veri analizi hakkında güncel blog yazıları',
    type: 'website',
  },
}

const blogPosts = [
  {
    id: 'lojistik-optimizasyonu-2024',
    title: '2024\'te Lojistik Optimizasyonu: Yeni Trendler',
    excerpt: 'Yapay zeka ve makine öğrenmesi ile lojistik süreçlerin nasıl optimize edileceğini keşfedin.',
    category: 'Optimizasyon',
    date: '2024-01-15',
    readTime: '5 dk',
    image: '/images/blog/lojistik-optimizasyon.jpg'
  },
  {
    id: 'suru-yonetimi-ipuclari',
    title: 'Etkili Sürü Yönetimi İçin 10 İpucu',
    excerpt: 'Sürü yönetiminde verimliliği artırmak için kanıtlanmış stratejiler.',
    category: 'Sürü Yönetimi',
    date: '2024-01-10',
    readTime: '7 dk',
    image: '/images/blog/suru-yonetimi.jpg'
  },
  {
    id: 'rota-planlama-algoritmalari',
    title: 'Rota Planlama Algoritmaları: Hangi Yöntem En İyi?',
    excerpt: 'Farklı rota planlama algoritmalarının karşılaştırması ve kullanım alanları.',
    category: 'Rota Planlama',
    date: '2024-01-05',
    readTime: '8 dk',
    image: '/images/blog/rota-planlama.jpg'
  },
  {
    id: 'veri-analizi-lojistik',
    title: 'Lojistikte Veri Analizi: Karar Verme Süreçleri',
    excerpt: 'Büyük veri analizi ile lojistik kararlarını nasıl iyileştirebilirsiniz.',
    category: 'Veri Analizi',
    date: '2024-01-01',
    readTime: '6 dk',
    image: '/images/blog/veri-analizi.jpg'
  }
]

export default function BlogPage() {
  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBlogSchema())
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            OptimizeWorld Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lojistik optimizasyonu, sürü yönetimi ve veri analizi hakkında güncel içerikler
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                  <BlogLink 
                    href={`/blog/${post.id}`}
                    eventName="blog_post_click"
                    eventData={{
                      post_id: post.id,
                      post_title: post.title,
                      post_category: post.category
                    }}
                  >
                    {post.title}
                  </BlogLink>
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {new Date(post.date).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  {post.excerpt}
                </p>
                <BlogLink 
                  href={`/blog/${post.id}`}
                  eventName="blog_read_more_click"
                  eventData={{
                    post_id: post.id,
                    post_title: post.title,
                    post_category: post.category
                  }}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
                >
                  Devamını Oku
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </BlogLink>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Güncel Kalın
          </h3>
          <p className="text-gray-600 mb-6">
            En son blog yazılarımızdan haberdar olmak için bültenimize abone olun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Abone Ol
            </button>
          </div>
          <div className="mt-4">
            <a 
              href="/feed.xml" 
              className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18v2.18a2.18 2.18 0 0 1-4.36 0v-2.18a2.18 2.18 0 0 1 2.18-2.18zM6.18 8.18a2.18 2.18 0 0 1 2.18 2.18v6.55c0 .6-.49 1.09-1.09 1.09s-1.09-.49-1.09-1.09V10.36a2.18 2.18 0 0 1 2.18-2.18zM6.18.73a2.18 2.18 0 0 1 2.18 2.18v6.55c0 .6-.49 1.09-1.09 1.09s-1.09-.49-1.09-1.09V2.91a2.18 2.18 0 0 1 2.18-2.18z"/>
              </svg>
              RSS Feed
            </a>
          </div>
        </div>

        {/* Social Share for Blog Page */}
        <div className="mt-8">
          <SocialShare 
            url="https://optimizeworld.net/blog"
            title="OptimizeWorld Blog"
            description="Lojistik optimizasyonu, sürü yönetimi ve veri analizi hakkında güncel blog yazıları"
            hashtags={['lojistik', 'optimizasyon', 'blog']}
          />
        </div>
      </div>
    </div>
    </>
  )
} 