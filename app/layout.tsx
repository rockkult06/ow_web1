import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Optimize the World (OW) - Akıllı Şehir ve Ulaşım Teknolojileri',
    template: '%s | Optimize the World'
  },
  description: 'OW (Optimize the World), akıllı şehir teknolojileri ve akıllı ulaşım çözümleri sunan lider teknoloji firması. Akıllı hareketlilik, veri entegrasyonu, sürdürülebilir şehir çözümleri ve IoT teknolojileri ile geleceğin şehirlerini inşa ediyoruz. İstanbul merkezli, global çözümler.',
  keywords: [
    'akıllı şehir',
    'akıllı ulaşım',
    'akıllı hareketlilik',
    'şehir teknolojileri',
    'ulaşım optimizasyonu',
    'veri entegrasyonu',
    'sürdürülebilir şehir',
    'OW',
    'Optimize the World',
    'smart city',
    'smart mobility',
    'smart transport',
    'urban technology',
    'transportation optimization',
    'data integration',
    'sustainable city',
    'IoT',
    'artificial intelligence',
    'machine learning',
    'big data',
    'urban planning',
    'traffic management',
    'public transportation',
    'energy efficiency',
    'environmental sustainability',
    'digital transformation',
    'smart infrastructure',
    'connected cities',
    'urban innovation',
    'technology consulting',
    'digital solutions'
  ],
  authors: [{ name: 'Optimize the World' }],
  creator: 'Optimize the World',
  publisher: 'Optimize the World',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.optimizeworld.net'),
  alternates: {
    canonical: '/',
    languages: {
      'tr-TR': '/tr',
      'en-US': '/en',
      'de-DE': '/de',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://www.optimizeworld.net',
    title: 'Optimize the World (OW) - Akıllı Şehir ve Ulaşım Teknolojileri',
    description: 'OW (Optimize the World), akıllı şehir teknolojileri ve akıllı ulaşım çözümleri sunan lider teknoloji firması.',
    siteName: 'Optimize the World',
    images: [
      {
        url: '/images/hero-serenity-head.png',
        width: 1200,
        height: 630,
        alt: 'Optimize the World - Akıllı Şehir Teknolojileri',
      },
      {
        url: '/images/hero-futuristic-intelligence.png',
        width: 1200,
        height: 630,
        alt: 'OW - Futuristik Akıllı Şehir Teknolojileri',
      },
      {
        url: '/images/hero-data-harmony.png',
        width: 1200,
        height: 630,
        alt: 'OW - Veri Entegrasyonu ve Akıllı Çözümler',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Optimize the World (OW) - Akıllı Şehir ve Ulaşım Teknolojileri',
    description: 'OW (Optimize the World), akıllı şehir teknolojileri ve akıllı ulaşım çözümleri sunan lider teknoloji firması.',
    images: [
      '/images/hero-serenity-head.png',
      '/images/hero-futuristic-intelligence.png',
      '/images/hero-data-harmony.png'
    ],
    creator: '@optimizeworld',
    site: '@optimizeworld',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'business',
  other: {
    'geo.region': 'TR',
    'geo.placename': 'Istanbul',
    'geo.position': '41.0082;28.9784',
    'ICBM': '41.0082, 28.9784',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://snap.licdn.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.facebook.com" />
        <link rel="dns-prefetch" href="//px.ads.linkedin.com" />
        
        {/* Preload Critical Resources */}
        <link rel="preload" href="/images/hero-serenity-head.png" as="image" />
        <link rel="preload" href="/images/hero-futuristic-intelligence.png" as="image" />
        <link rel="preload" href="/images/hero-data-harmony.png" as="image" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.optimizeworld.net" />
        
        {/* Hreflang Links */}
        <link rel="alternate" hreflang="tr" href="https://www.optimizeworld.net" />
        <link rel="alternate" hreflang="en" href="https://www.optimizeworld.net/en" />
        <link rel="alternate" hreflang="de" href="https://www.optimizeworld.net/de" />
        <link rel="alternate" hreflang="x-default" href="https://www.optimizeworld.net" />
        
        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title="OW RSS Feed" href="https://www.optimizeworld.net/feed.xml" />
        
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-30XM7GYBBH"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-30XM7GYBBH', {
                page_title: 'Optimize the World - Akıllı Şehir Teknolojileri',
                page_location: 'https://www.optimizeworld.net',
                send_page_view: true,
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure',
                debug_mode: true
              });
              
              // Debug için console log
              console.log('Google Analytics loaded with ID: G-30XM7GYBBH');
            `,
          }}
        />
        
        {/* Facebook Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '000000000000000');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=000000000000000&ev=PageView&noscript=1"
          />
        </noscript>
        
        {/* LinkedIn Insight Tag */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(l) {
                if (l.search[1] === '/' ) {
                  var decoded = l.search.slice(1).split('&').map(function(s) { 
                    return s.replace(/~and~/g, '&')
                  }).join('?');
                  window.history.replaceState(null, null,
                      l.pathname.slice(0, -1) + decoded + l.hash
                  );
                }
              }(window.location))
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(i,s,o,g,r,a,m){i['LinkedInObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','https://snap.licdn.com/li.lms-analytics/insight.min.js','linkedin');
              linkedin('init', '00000000');
              linkedin('track', { conversion_id: 0000000 });
            `,
          }}
        />
        <noscript>
          <img height="1" width="1" style="display:none" alt="" src="https://px.ads.linkedin.com/collect/?pid=00000000&fmt=gif" />
        </noscript>
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Optimize the World (OW)",
              "url": "https://www.optimizeworld.net",
              "logo": "https://www.optimizeworld.net/images/placeholder-logo.png",
              "description": "OW (Optimize the World), akıllı şehir teknolojileri ve akıllı ulaşım çözümleri sunan lider teknoloji firması.",
              "foundingDate": "2020",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "TR",
                "addressLocality": "Istanbul"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["Turkish", "English", "German"]
              },
              "sameAs": [
                "https://www.linkedin.com/company/optimize-the-world",
                "https://twitter.com/optimizeworld",
                "https://www.facebook.com/optimizeworld"
              ],
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 41.0082,
                  "longitude": 28.9784
                },
                "geoRadius": "10000"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Akıllı Şehir Çözümleri",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Akıllı Hareketlilik Çözümleri",
                      "description": "Akıllı şehir hareketlilik teknolojileri ve optimizasyon çözümleri"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Akıllı Ulaşım Teknolojileri",
                      "description": "Gelişmiş ulaşım teknolojileri ve veri entegrasyonu çözümleri"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
