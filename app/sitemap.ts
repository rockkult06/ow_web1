import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://optimizeworld.net'
  const currentDate = new Date()

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/tr`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/de`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Product pages
  const products = [
    'ow-transitopt',
    'ow-fleetopt',
    'ow-ridersense',
    'ow-costlogic',
    'ow-drt',
    'ow-accessibility',
    'ow-odmatrix',
    'ow-intelligence',
  ]

  const productPages = products.map((product) => ({
    url: `${baseUrl}/solutions/${product}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Sector pages
  const sectors = [
    'municipalities-transport',
    'smart-city-projects',
    'universities-research',
    'ministries-public',
    'technology-startups',
  ]

  const sectorPages = sectors.map((sector) => ({
    url: `${baseUrl}/sectors/${sector}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Success story pages
  const stories = [
    'izmir-transport',
    'hospital-early-diagnosis',
    'passenger-density-cost-saving',
    'dead-km-minimization',
  ]

  const storyPages = stories.map((story) => ({
    url: `${baseUrl}/success-stories/${story}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Contact pages
  const contactPages = [
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  return [
    ...staticPages,
    ...productPages,
    ...sectorPages,
    ...storyPages,
    ...contactPages,
  ]
} 