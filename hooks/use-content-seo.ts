'use client'

import { useState, useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

interface ContentSEOData {
  title: string
  description: string
  keywords: string[]
  headings: string[]
  wordCount: number
  readabilityScore: number
  seoScore: number
  suggestions: string[]
}

export function useContentSEO() {
  const [contentData, setContentData] = useState<ContentSEOData>({
    title: '',
    description: '',
    keywords: [],
    headings: [],
    wordCount: 0,
    readabilityScore: 0,
    seoScore: 0,
    suggestions: []
  })

  // Analyze content for SEO
  const analyzeContent = (content: string, title: string = '', description: string = '') => {
    const words = content.split(/\s+/).filter(word => word.length > 0)
    const wordCount = words.length
    
    // Extract headings
    const headingMatches = content.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi) || []
    const headings = headingMatches.map(heading => 
      heading.replace(/<[^>]*>/g, '').trim()
    )
    
    // Extract keywords
    const keywordPattern = /\b(akıllı şehir|toplu taşıma|optimizasyon|veri analizi|ulaşım|teknoloji|OW|frekans|filo|yolcu|maliyet)\b/gi
    const keywordMatches = content.match(keywordPattern) || []
    const keywords = [...new Set(keywordMatches.map(k => k.toLowerCase()))]
    
    // Calculate readability score (Flesch Reading Ease)
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const syllables = words.reduce((count, word) => {
      return count + countSyllables(word)
    }, 0)
    
    const readabilityScore = Math.max(0, Math.min(100, 
      206.835 - (1.015 * (words.length / sentences.length)) - (84.6 * (syllables / words.length))
    ))
    
    // Calculate SEO score
    let seoScore = 0
    
    // Title optimization
    if (title.length >= 30 && title.length <= 60) seoScore += 20
    if (title.includes('OW') || title.includes('Optimize')) seoScore += 10
    
    // Description optimization
    if (description.length >= 120 && description.length <= 160) seoScore += 20
    if (description.includes('akıllı şehir') || description.includes('toplu taşıma')) seoScore += 10
    
    // Content optimization
    if (wordCount >= 300) seoScore += 15
    if (headings.length >= 2) seoScore += 10
    if (keywords.length >= 3) seoScore += 15
    if (readabilityScore >= 60) seoScore += 10
    
    // Generate suggestions
    const suggestions: string[] = []
    
    if (title.length < 30) suggestions.push('Başlık çok kısa (en az 30 karakter)')
    if (title.length > 60) suggestions.push('Başlık çok uzun (en fazla 60 karakter)')
    if (description.length < 120) suggestions.push('Açıklama çok kısa (en az 120 karakter)')
    if (description.length > 160) suggestions.push('Açıklama çok uzun (en fazla 160 karakter)')
    if (wordCount < 300) suggestions.push('İçerik çok kısa (en az 300 kelime)')
    if (headings.length < 2) suggestions.push('Daha fazla başlık ekleyin')
    if (keywords.length < 3) suggestions.push('Daha fazla anahtar kelime kullanın')
    if (readabilityScore < 60) suggestions.push('Okunabilirliği artırın')
    
    setContentData({
      title,
      description,
      keywords,
      headings,
      wordCount,
      readabilityScore,
      seoScore,
      suggestions
    })
    
    // Track content analysis
    trackEvent('content_analysis', {
      word_count: wordCount,
      seo_score: seoScore,
      readability_score: readabilityScore,
      keywords_count: keywords.length,
      headings_count: headings.length
    })
  }
  
  // Count syllables in a word
  const countSyllables = (word: string): number => {
    word = word.toLowerCase()
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    word = word.replace(/^y/, '')
    const matches = word.match(/[aeiouy]{1,2}/g)
    return matches ? matches.length : 1
  }
  
  // Generate meta description
  const generateMetaDescription = (content: string, maxLength: number = 160): string => {
    const cleanContent = content.replace(/<[^>]*>/g, '').trim()
    if (cleanContent.length <= maxLength) return cleanContent
    
    const sentences = cleanContent.split(/[.!?]+/).filter(s => s.trim().length > 0)
    let description = ''
    
    for (const sentence of sentences) {
      if ((description + sentence).length <= maxLength) {
        description += sentence + '. '
      } else {
        break
      }
    }
    
    return description.trim()
  }
  
  // Generate title suggestions
  const generateTitleSuggestions = (content: string): string[] => {
    const suggestions: string[] = []
    const keywords = ['OW', 'Optimize', 'akıllı şehir', 'toplu taşıma', 'veri analizi']
    
    keywords.forEach(keyword => {
      if (content.toLowerCase().includes(keyword.toLowerCase())) {
        suggestions.push(`${keyword} - OW Çözümleri`)
        suggestions.push(`OW ${keyword} Teknolojileri`)
      }
    })
    
    return suggestions.slice(0, 3)
  }
  
  // Check content for SEO best practices
  const checkSEOBestPractices = (content: string) => {
    const checks = {
      hasTitle: content.includes('<h1>') || content.includes('<h2>'),
      hasImages: content.includes('<img'),
      hasLinks: content.includes('<a href'),
      hasKeywords: content.toLowerCase().includes('akıllı şehir') || content.toLowerCase().includes('toplu taşıma'),
      hasStructuredData: content.includes('application/ld+json'),
      isMobileFriendly: true, // Would need more complex checking
      hasMetaDescription: true // Would need to check meta tags
    }
    
    return checks
  }
  
  return {
    contentData,
    analyzeContent,
    generateMetaDescription,
    generateTitleSuggestions,
    checkSEOBestPractices
  }
}

// Content readability analyzer
export function useReadabilityAnalyzer() {
  const [readabilityData, setReadabilityData] = useState({
    fleschScore: 0,
    gradeLevel: '',
    readingTime: 0,
    complexity: 'easy'
  })
  
  const analyzeReadability = (content: string) => {
    const words = content.split(/\s+/).filter(word => word.length > 0)
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const syllables = words.reduce((count, word) => count + countSyllables(word), 0)
    
    const fleschScore = Math.max(0, Math.min(100, 
      206.835 - (1.015 * (words.length / sentences.length)) - (84.6 * (syllables / words.length))
    ))
    
    const gradeLevel = getGradeLevel(fleschScore)
    const readingTime = Math.ceil(words.length / 200) // Average reading speed
    const complexity = fleschScore >= 80 ? 'easy' : fleschScore >= 60 ? 'medium' : 'hard'
    
    setReadabilityData({
      fleschScore,
      gradeLevel,
      readingTime,
      complexity
    })
  }
  
  const countSyllables = (word: string): number => {
    word = word.toLowerCase()
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    word = word.replace(/^y/, '')
    const matches = word.match(/[aeiouy]{1,2}/g)
    return matches ? matches.length : 1
  }
  
  const getGradeLevel = (fleschScore: number): string => {
    if (fleschScore >= 90) return '5. sınıf'
    if (fleschScore >= 80) return '6. sınıf'
    if (fleschScore >= 70) return '7. sınıf'
    if (fleschScore >= 60) return '8-9. sınıf'
    if (fleschScore >= 50) return '10-12. sınıf'
    if (fleschScore >= 30) return 'Üniversite'
    return 'Uzman'
  }
  
  return {
    readabilityData,
    analyzeReadability
  }
} 