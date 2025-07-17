import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib/structured-data'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OW - Optimize the World | Akıllı Şehir Çözümleri',
  description: 'OW, akıllı şehirler için veri odaklı çözümler sunan teknoloji şirketi. Toplu taşıma optimizasyonu, akıllı hareketlilik ve ulaşım teknolojileri.',
  keywords: 'akıllı şehir, toplu taşıma optimizasyonu, veri analizi, ulaşım teknolojileri, OW, Optimize the World',
  authors: [{ name: 'OW - Optimize the World' }],
  creator: 'OW - Optimize the World',
  publisher: 'OW - Optimize the World',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://optimizeworld.net'),
  alternates: {
    canonical: '/',
    // languages: {
    //   'tr-TR': '/tr',
    //   'en-US': '/en',
    //   'de-DE': '/de',
    // },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://optimizeworld.net',
    title: 'OW - Optimize the World | Akıllı Şehir Çözümleri',
    description: 'OW, akıllı şehirler için veri odaklı çözümler sunan teknoloji şirketi. Toplu taşıma optimizasyonu, akıllı hareketlilik ve ulaşım teknolojileri.',
    siteName: 'OW - Optimize the World',
    images: [
      {
        url: 'https://optimizeworld.net/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OW - Optimize the World',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OW - Optimize the World | Akıllı Şehir Çözümleri',
    description: 'OW, akıllı şehirler için veri odaklı çözümler sunan teknoloji şirketi.',
    images: ['https://optimizeworld.net/images/twitter-image.png'],
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
    google: 'G-30XM7GYBBH', // Google Analytics 4 Measurement ID
    // google: 'your-google-search-console-verification-code', // Google Search Console verification code
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Structured Data for SEO
  const organizationData = {
    name: "OW - Optimize the World",
    url: "https://optimizeworld.net",
    logo: "https://optimizeworld.net/images/logo.png",
    description: "OW, akıllı şehirler için veri odaklı çözümler sunan teknoloji şirketi. Toplu taşıma optimizasyonu, akıllı hareketlilik ve ulaşım teknolojileri.",
    address: {
      streetAddress: "Gazi Mustafa Kemal District, Kaynaklar Street Seyrek",
      addressLocality: "Menemen",
      addressRegion: "İzmir",
      postalCode: "35660",
      addressCountry: "TR"
    },
    contactPoint: {
      telephone: "+90-232-235-3535",
      contactType: "customer service",
      email: "info@ow.com"
    },
    sameAs: [
      "https://www.linkedin.com/company/ow-optimize-world",
      "https://twitter.com/optimizeworld",
      "https://www.facebook.com/optimizeworld"
    ],
    foundingDate: "2023",
    industry: "Technology"
  }

  const websiteData = {
    name: "OW - Optimize the World",
    url: "https://optimizeworld.net",
    description: "Akıllı şehirler için veri odaklı çözümler",
    potentialAction: {
      target: "https://optimizeworld.net/search?q={search_term_string}",
      queryInput: "required name=search_term_string"
    }
  }

  const organizationSchema = generateOrganizationSchema(organizationData)
  const websiteSchema = generateWebsiteSchema(websiteData)

  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* Google Analytics 4 */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-30XM7GYBBH`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-30XM7GYBBH', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />
        
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NZVQV734');
            `,
          }}
        />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Hreflang Tags (commented out until language pages are created) */}
        {/* <link rel="alternate" hrefLang="tr" href="https://optimizeworld.net/" />
        <link rel="alternate" hrefLang="en" href="https://optimizeworld.net/en/" />
        <link rel="alternate" hrefLang="de" href="https://optimizeworld.net/de/" />
        <link rel="alternate" hrefLang="x-default" href="https://optimizeworld.net/" /> */}
        
        {/* Additional Meta Tags */}
        <meta name="author" content="OW - Optimize the World" />
        <meta name="theme-color" content="#0171E3" />
        <meta name="msapplication-TileColor" content="#0171E3" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="OW" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="OW" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />
        

      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NZVQV734"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
