import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Security Headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')

  // Performance Headers
  response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400')
  response.headers.set('Vary', 'Accept-Encoding')

  // SEO Headers
  response.headers.set('X-Robots-Tag', 'index, follow')
  response.headers.set('X-Sitemap-Location', 'https://optimizeworld.net/sitemap.xml')

  // Language Detection and Redirect (temporarily disabled)
  // const acceptLanguage = request.headers.get('accept-language')
  // const pathname = request.nextUrl.pathname

  // // If no language is specified in URL, redirect to Turkish (default)
  // if (pathname === '/') {
  //   const userLanguage = acceptLanguage?.includes('en') ? 'en' : 
  //                       acceptLanguage?.includes('de') ? 'de' : 'tr'
    
  //   if (userLanguage !== 'tr') {
  //     return NextResponse.redirect(new URL(`/${userLanguage}`, request.url))
  //   }
  // }

  return response
}

// Temporarily disabled middleware
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// } 