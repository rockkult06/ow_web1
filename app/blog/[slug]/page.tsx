import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { generateBlogPostingSchema } from '@/lib/structured-data'
import { BlogAnalytics } from '@/components/blog-analytics'
import { BlogLink } from '@/components/blog-links'

// Blog post verileri
const blogPosts = {
  'lojistik-optimizasyonu-2024': {
    title: '2024\'te Lojistik Optimizasyonu: Yeni Trendler',
    excerpt: 'Yapay zeka ve makine öğrenmesi ile lojistik süreçlerin nasıl optimize edileceğini keşfedin.',
    content: `
      <h2>Giriş</h2>
      <p>2024 yılında lojistik sektörü, teknolojik gelişmelerle birlikte büyük bir dönüşüm geçiriyor. Yapay zeka, makine öğrenmesi ve IoT teknolojileri, geleneksel lojistik süreçlerini optimize etmek için kullanılıyor.</p>
      
      <h2>Yapay Zeka ve Makine Öğrenmesi</h2>
      <p>Yapay zeka, lojistik süreçlerde tahminleme, rota optimizasyonu ve stok yönetimi konularında devrim yaratıyor. Makine öğrenmesi algoritmaları, geçmiş verileri analiz ederek gelecekteki talepleri tahmin edebiliyor.</p>
      
      <h2>IoT ve Gerçek Zamanlı Takip</h2>
      <p>IoT sensörleri sayesinde araçların konumu, yakıt durumu ve sürücü davranışları gerçek zamanlı olarak takip edilebiliyor. Bu veriler, operasyonel verimliliği artırmak için kullanılıyor.</p>
      
      <h2>Sonuç</h2>
      <p>2024'te lojistik optimizasyonu, teknoloji odaklı bir yaklaşım gerektiriyor. Şirketler, bu yenilikleri benimseyerek rekabet avantajı elde edebilir.</p>
    `,
    category: 'Optimizasyon',
    date: '2024-01-15',
    readTime: '5 dk',
    author: 'OptimizeWorld Ekibi',
    tags: ['Lojistik', 'Optimizasyon', 'Yapay Zeka', '2024']
  },
  'suru-yonetimi-ipuclari': {
    title: 'Etkili Sürü Yönetimi İçin 10 İpucu',
    excerpt: 'Sürü yönetiminde verimliliği artırmak için kanıtlanmış stratejiler.',
    content: `
      <h2>Giriş</h2>
      <p>Etkili sürü yönetimi, modern lojistik operasyonlarının temel taşıdır. Bu yazıda, sürü yönetiminde verimliliği artırmak için 10 kanıtlanmış ipucunu paylaşıyoruz.</p>
      
      <h2>1. Gerçek Zamanlı Takip Sistemi</h2>
      <p>Araçlarınızın konumunu ve durumunu gerçek zamanlı olarak takip edin. Bu, hızlı karar verme ve problem çözme imkanı sağlar.</p>
      
      <h2>2. Sürücü Performans Analizi</h2>
      <p>Sürücülerin performansını düzenli olarak analiz edin ve iyileştirme önerileri sunun.</p>
      
      <h2>3. Yakıt Optimizasyonu</h2>
      <p>Yakıt tüketimini optimize etmek için rota planlama ve sürüş tekniklerini iyileştirin.</p>
      
      <h2>4. Bakım Planlaması</h2>
      <p>Düzenli bakım planlaması ile araç arızalarını minimize edin.</p>
      
      <h2>5. Müşteri İletişimi</h2>
      <p>Müşterilerinize gerçek zamanlı teslimat bilgileri sağlayın.</p>
      
      <h2>Sonuç</h2>
      <p>Bu ipuçlarını uygulayarak sürü yönetiminizi optimize edebilir ve operasyonel verimliliğinizi artırabilirsiniz.</p>
    `,
    category: 'Sürü Yönetimi',
    date: '2024-01-10',
    readTime: '7 dk',
    author: 'OptimizeWorld Ekibi',
    tags: ['Sürü Yönetimi', 'Verimlilik', 'Optimizasyon', 'Lojistik']
  },
  'rota-planlama-algoritmalari': {
    title: 'Rota Planlama Algoritmaları: Hangi Yöntem En İyi?',
    excerpt: 'Farklı rota planlama algoritmalarının karşılaştırması ve kullanım alanları.',
    content: `
      <h2>Giriş</h2>
      <p>Rota planlama, lojistik operasyonların en kritik bileşenlerinden biridir. Bu yazıda, farklı rota planlama algoritmalarını ve kullanım alanlarını inceleyeceğiz.</p>
      
      <h2>Greedy Algorithm (Açgözlü Algoritma)</h2>
      <p>En yakın noktaya giderek rota oluşturur. Hızlı ama optimal olmayan sonuçlar verir.</p>
      
      <h2>Genetic Algorithm (Genetik Algoritma)</h2>
      <p>Doğal seçim prensiplerini kullanarak optimal rotalar bulur. Büyük problemler için etkilidir.</p>
      
      <h2>Ant Colony Optimization (Karınca Kolonisi Optimizasyonu)</h2>
      <p>Karıncaların yiyecek arama davranışını taklit eder. Dinamik ortamlarda etkilidir.</p>
      
      <h2>Machine Learning Based Routing</h2>
      <p>Makine öğrenmesi ile geçmiş verilerden öğrenerek rota optimizasyonu yapar.</p>
      
      <h2>Sonuç</h2>
      <p>Her algoritmanın kendine özgü avantajları vardır. İhtiyaçlarınıza göre en uygun algoritmayı seçmelisiniz.</p>
    `,
    category: 'Rota Planlama',
    date: '2024-01-05',
    readTime: '8 dk',
    author: 'OptimizeWorld Ekibi',
    tags: ['Rota Planlama', 'Algoritma', 'Optimizasyon', 'Lojistik']
  },
  'veri-analizi-lojistik': {
    title: 'Lojistikte Veri Analizi: Karar Verme Süreçleri',
    excerpt: 'Büyük veri analizi ile lojistik kararlarını nasıl iyileştirebilirsiniz.',
    content: `
      <h2>Giriş</h2>
      <p>Veri analizi, modern lojistik operasyonlarının vazgeçilmez bir parçasıdır. Bu yazıda, veri analizinin lojistik karar verme süreçlerindeki rolünü inceleyeceğiz.</p>
      
      <h2>Veri Toplama Stratejileri</h2>
      <p>IoT sensörleri, GPS verileri ve müşteri geri bildirimleri gibi çeşitli kaynaklardan veri toplanabilir.</p>
      
      <h2>Veri Analizi Teknikleri</h2>
      <p>Descriptive, diagnostic, predictive ve prescriptive analiz teknikleri kullanılarak veriler analiz edilir.</p>
      
      <h2>Karar Verme Süreçleri</h2>
      <p>Analiz sonuçları, rota optimizasyonu, stok yönetimi ve müşteri hizmetleri kararlarında kullanılır.</p>
      
      <h2>Sonuç</h2>
      <p>Veri analizi, lojistik operasyonlarını optimize etmek ve rekabet avantajı elde etmek için kritik öneme sahiptir.</p>
    `,
    category: 'Veri Analizi',
    date: '2024-01-01',
    readTime: '6 dk',
    author: 'OptimizeWorld Ekibi',
    tags: ['Veri Analizi', 'Lojistik', 'Karar Verme', 'Optimizasyon']
  }
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts[params.slug as keyof typeof blogPosts]
  
  if (!post) {
    return {
      title: 'Blog Yazısı Bulunamadı - OptimizeWorld',
    }
  }

  return {
    title: `${post.title} - OptimizeWorld Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]
  
  if (!post) {
    notFound()
  }

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBlogPostingSchema({
            title: post.title,
            description: post.excerpt,
            url: `https://optimizeworld.net/blog/${params.slug}`,
            author: post.author,
            datePublished: post.date,
            dateModified: post.date,
            category: post.category,
            tags: post.tags
          }))
        }}
      />
      
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <BlogAnalytics 
          postId={params.slug}
          postTitle={post.title}
          postCategory={post.category}
          postAuthor={post.author}
        />
        <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <BlogLink 
            href="/blog" 
            eventName="blog_back_to_list"
            eventData={{ current_post: params.slug }}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Blog'a Dön
          </BlogLink>
        </nav>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
              <span className="text-sm text-gray-500">{post.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Yazar: {post.author}</span>
              <span>
                {new Date(post.date).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Tags */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Etiketler:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold mb-6">İlgili Yazılar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(blogPosts)
                .filter(([slug]) => slug !== params.slug)
                .slice(0, 2)
                .map(([slug, relatedPost]) => (
                  <Card key={slug} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-2">
                        {relatedPost.category}
                      </Badge>
                                             <h4 className="font-semibold mb-2">
                         <BlogLink 
                           href={`/blog/${slug}`} 
                           eventName="blog_related_post_click"
                           eventData={{
                             current_post: params.slug,
                             related_post: slug,
                             related_post_title: relatedPost.title
                           }}
                           className="hover:text-blue-600"
                         >
                           {relatedPost.title}
                         </BlogLink>
                       </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {relatedPost.excerpt}
                      </p>
                      <span className="text-xs text-gray-500">
                        {new Date(relatedPost.date).toLocaleDateString('tr-TR')}
                      </span>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </article>
      </div>
    </div>
    </>
  )
} 