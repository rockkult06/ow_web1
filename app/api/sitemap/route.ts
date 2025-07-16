import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://www.optimizeworld.net'
  const currentDate = new Date().toISOString().split('T')[0]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Ana Sayfa -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="tr" href="${baseUrl}/"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en"/>
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de"/>
  </url>

  <!-- Hakkımızda Sayfası -->
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="tr" href="${baseUrl}/about"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/about"/>
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de/about"/>
  </url>

  <!-- Hizmetler Sayfası -->
  <url>
    <loc>${baseUrl}/services</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="tr" href="${baseUrl}/services"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/services"/>
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de/services"/>
  </url>

  <!-- Çözümler Sayfası -->
  <url>
    <loc>${baseUrl}/solutions</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="tr" href="${baseUrl}/solutions"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/solutions"/>
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de/solutions"/>
  </url>

  <!-- İletişim Sayfası -->
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="tr" href="${baseUrl}/contact"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/contact"/>
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de/contact"/>
  </url>

  <!-- Blog Sayfası -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="tr" href="${baseUrl}/blog"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/blog"/>
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de/blog"/>
  </url>

  <!-- Haberler Sayfası -->
  <url>
    <loc>${baseUrl}/news</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="tr" href="${baseUrl}/news"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/news"/>
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de/news"/>
  </url>

  <!-- Akıllı Hareketlilik Çözümleri -->
  <url>
    <loc>${baseUrl}/solutions/smart-mobility</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="tr" href="${baseUrl}/solutions/smart-mobility"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/solutions/smart-mobility"/>
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de/solutions/smart-mobility"/>
  </url>

  <!-- Akıllı Ulaşım Teknolojileri -->
  <url>
    <loc>${baseUrl}/solutions/smart-transport</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="tr" href="${baseUrl}/solutions/smart-transport"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/solutions/smart-transport"/>
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de/solutions/smart-transport"/>
  </url>

  <!-- Veri Entegrasyonu -->
  <url>
    <loc>${baseUrl}/solutions/data-integration</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="tr" href="${baseUrl}/solutions/data-integration"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/solutions/data-integration"/>
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de/solutions/data-integration"/>
  </url>

  <!-- Sürdürülebilir Şehir Çözümleri -->
  <url>
    <loc>${baseUrl}/solutions/sustainable-city</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="tr" href="${baseUrl}/solutions/sustainable-city"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/solutions/sustainable-city"/>
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de/solutions/sustainable-city"/>
  </url>

</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
} 