// AI Destekli SEO Analiz ve Öneri Sistemi
export interface ContentAnalysis {
  readability: ReadabilityScore;
  keywordDensity: KeywordDensity[];
  seoScore: number;
  suggestions: SEOSuggestion[];
  missingElements: MissingElement[];
}

export interface ReadabilityScore {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  level: 'Elementary' | 'Middle School' | 'High School' | 'College' | 'Graduate';
  suggestions: string[];
}

export interface KeywordDensity {
  keyword: string;
  density: number;
  count: number;
  position: number[];
  suggestion: 'optimal' | 'low' | 'high';
}

export interface SEOSuggestion {
  type: 'title' | 'description' | 'heading' | 'alt' | 'internal_link' | 'keyword';
  priority: 'high' | 'medium' | 'low';
  message: string;
  implementation: string;
  impact: string;
}

export interface MissingElement {
  type: 'meta' | 'heading' | 'image' | 'link' | 'schema';
  element: string;
  description: string;
  importance: 'critical' | 'important' | 'nice_to_have';
}

export interface AIContentOptimization {
  originalContent: string;
  optimizedContent: string;
  changes: ContentChange[];
  seoImprovements: SEOSuggestion[];
}

export interface ContentChange {
  type: 'add' | 'modify' | 'remove';
  element: string;
  original?: string;
  suggested: string;
  reason: string;
}

export class AISEOAnalyzer {
  private readonly optimalKeywordDensity = 1.5; // %1.5
  private readonly maxKeywordDensity = 3.0; // %3.0
  private readonly minKeywordDensity = 0.5; // %0.5

  // İçerik Analizi
  analyzeContent(content: string, targetKeywords: string[]): ContentAnalysis {
    const readability = this.calculateReadability(content);
    const keywordDensity = this.analyzeKeywordDensity(content, targetKeywords);
    const seoScore = this.calculateSEOScore(content, readability, keywordDensity);
    const suggestions = this.generateSuggestions(content, targetKeywords, readability, keywordDensity);
    const missingElements = this.findMissingElements(content);

    return {
      readability,
      keywordDensity,
      seoScore,
      suggestions,
      missingElements
    };
  }

  // Okunabilirlik Analizi (Flesch Reading Ease)
  private calculateReadability(text: string): ReadabilityScore {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const syllables = this.countSyllables(text);

    const avgSentenceLength = words.length / sentences.length;
    const avgSyllablesPerWord = syllables / words.length;

    // Flesch Reading Ease Formula
    const score = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);

    let grade: ReadabilityScore['grade'];
    let level: ReadabilityScore['level'];

    if (score >= 90) {
      grade = 'A';
      level = 'Elementary';
    } else if (score >= 80) {
      grade = 'B';
      level = 'Middle School';
    } else if (score >= 70) {
      grade = 'C';
      level = 'High School';
    } else if (score >= 60) {
      grade = 'D';
      level = 'College';
    } else {
      grade = 'F';
      level = 'Graduate';
    }

    const suggestions: string[] = [];
    if (avgSentenceLength > 20) {
      suggestions.push('Cümleler çok uzun. Daha kısa cümleler kullanın.');
    }
    if (avgSyllablesPerWord > 2) {
      suggestions.push('Karmaşık kelimeler kullanılmış. Daha basit kelimeler tercih edin.');
    }
    if (score < 60) {
      suggestions.push('İçerik çok karmaşık. Hedef kitlenize uygun dil kullanın.');
    }

    return { score, grade, level, suggestions };
  }

  // Hece Sayısı Hesaplama
  private countSyllables(text: string): number {
    const words = text.toLowerCase().split(/\s+/);
    let syllableCount = 0;

    words.forEach(word => {
      if (word.length <= 3) {
        syllableCount += 1;
      } else {
        // Basit hece sayısı hesaplama
        const vowels = word.match(/[aeıioöuü]/g);
        syllableCount += vowels ? vowels.length : 1;
      }
    });

    return syllableCount;
  }

  // Anahtar Kelime Yoğunluğu Analizi
  private analyzeKeywordDensity(content: string, keywords: string[]): KeywordDensity[] {
    const lowerContent = content.toLowerCase();
    const totalWords = content.split(/\s+/).length;

    return keywords.map(keyword => {
      const lowerKeyword = keyword.toLowerCase();
      const regex = new RegExp(lowerKeyword, 'gi');
      const matches = lowerContent.match(regex);
      const count = matches ? matches.length : 0;
      const density = (count / totalWords) * 100;

      let suggestion: 'optimal' | 'low' | 'high';
      if (density >= this.minKeywordDensity && density <= this.maxKeywordDensity) {
        suggestion = 'optimal';
      } else if (density < this.minKeywordDensity) {
        suggestion = 'low';
      } else {
        suggestion = 'high';
      }

      // Anahtar kelimenin pozisyonlarını bul
      const positions: number[] = [];
      let match;
      const regex2 = new RegExp(lowerKeyword, 'gi');
      while ((match = regex2.exec(lowerContent)) !== null) {
        positions.push(match.index);
      }

      return {
        keyword,
        density,
        count,
        position: positions,
        suggestion
      };
    });
  }

  // SEO Skoru Hesaplama
  private calculateSEOScore(content: string, readability: ReadabilityScore, keywordDensity: KeywordDensity[]): number {
    let score = 100;

    // Okunabilirlik puanı (30%)
    const readabilityScore = Math.max(0, Math.min(100, readability.score));
    score += (readabilityScore - 50) * 0.3;

    // Anahtar kelime optimizasyonu (40%)
    const optimalKeywords = keywordDensity.filter(k => k.suggestion === 'optimal').length;
    const totalKeywords = keywordDensity.length;
    const keywordScore = totalKeywords > 0 ? (optimalKeywords / totalKeywords) * 100 : 100;
    score += (keywordScore - 50) * 0.4;

    // İçerik uzunluğu (20%)
    const wordCount = content.split(/\s+/).length;
    const lengthScore = wordCount >= 300 ? 100 : (wordCount / 300) * 100;
    score += (lengthScore - 50) * 0.2;

    // Heading yapısı (10%)
    const headings = content.match(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi);
    const headingScore = headings && headings.length >= 2 ? 100 : 50;
    score += (headingScore - 50) * 0.1;

    return Math.max(0, Math.min(100, score));
  }

  // SEO Önerileri Oluşturma
  private generateSuggestions(
    content: string, 
    keywords: string[], 
    readability: ReadabilityScore, 
    keywordDensity: KeywordDensity[]
  ): SEOSuggestion[] {
    const suggestions: SEOSuggestion[] = [];

    // Anahtar kelime önerileri
    keywordDensity.forEach(kw => {
      if (kw.suggestion === 'low') {
        suggestions.push({
          type: 'keyword',
          priority: 'high',
          message: `"${kw.keyword}" anahtar kelimesi çok az kullanılmış (%${kw.density.toFixed(2)})`,
          implementation: `Bu anahtar kelimeyi içerikte ${Math.ceil(kw.count * 2)} kez kullanın`,
          impact: 'Anahtar kelime optimizasyonu ile sıralama iyileşmesi'
        });
      } else if (kw.suggestion === 'high') {
        suggestions.push({
          type: 'keyword',
          priority: 'medium',
          message: `"${kw.keyword}" anahtar kelimesi çok fazla kullanılmış (%${kw.density.toFixed(2)})`,
          implementation: 'Anahtar kelime yoğunluğunu azaltın',
          impact: 'Spam algılanmasını önleme'
        });
      }
    });

    // Okunabilirlik önerileri
    if (readability.score < 60) {
      suggestions.push({
        type: 'keyword',
        priority: 'medium',
        message: 'İçerik okunabilirlik açısından zor',
        implementation: 'Daha basit cümleler ve kelimeler kullanın',
        impact: 'Kullanıcı deneyimi iyileşmesi'
      });
    }

    // Heading yapısı önerileri
    const headings = content.match(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi);
    if (!headings || headings.length < 2) {
      suggestions.push({
        type: 'heading',
        priority: 'high',
        message: 'Heading yapısı eksik',
        implementation: 'H2, H3, H4 başlıkları ekleyin',
        impact: 'SEO ve kullanıcı deneyimi iyileşmesi'
      });
    }

    // İçerik uzunluğu önerileri
    const wordCount = content.split(/\s+/).length;
    if (wordCount < 300) {
      suggestions.push({
        type: 'keyword',
        priority: 'medium',
        message: 'İçerik çok kısa',
        implementation: 'En az 300 kelime olacak şekilde genişletin',
        impact: 'SEO performansı artışı'
      });
    }

    return suggestions;
  }

  // Eksik Elementleri Bulma
  private findMissingElements(content: string): MissingElement[] {
    const missing: MissingElement[] = [];

    // Meta description kontrolü
    if (!content.includes('meta name="description"')) {
      missing.push({
        type: 'meta',
        element: 'meta description',
        description: 'Meta description eksik',
        importance: 'critical'
      });
    }

    // Heading yapısı kontrolü
    const headings = content.match(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi);
    if (!headings || headings.length < 2) {
      missing.push({
        type: 'heading',
        element: 'H2, H3 başlıkları',
        description: 'Heading yapısı eksik',
        importance: 'important'
      });
    }

    // Görsel alt text kontrolü
    const images = content.match(/<img[^>]*>/gi);
    if (images) {
      const imagesWithoutAlt = images.filter(img => !img.includes('alt='));
      if (imagesWithoutAlt.length > 0) {
        missing.push({
          type: 'image',
          element: 'alt text',
          description: `${imagesWithoutAlt.length} görselde alt text eksik`,
          importance: 'important'
        });
      }
    }

    // İç link kontrolü
    const internalLinks = content.match(/href="[^"]*"/gi);
    if (!internalLinks || internalLinks.length < 2) {
      missing.push({
        type: 'link',
        element: 'internal links',
        description: 'İç linkleme eksik',
        importance: 'nice_to_have'
      });
    }

    return missing;
  }

  // AI Destekli İçerik Optimizasyonu
  optimizeContent(content: string, targetKeywords: string[]): AIContentOptimization {
    const analysis = this.analyzeContent(content, targetKeywords);
    const changes: ContentChange[] = [];
    let optimizedContent = content;

    // Anahtar kelime optimizasyonu
    analysis.keywordDensity.forEach(kw => {
      if (kw.suggestion === 'low') {
        const targetCount = Math.ceil(kw.count * 2);
        const additionalCount = targetCount - kw.count;
        
        // Anahtar kelimeyi doğal şekilde ekle
        for (let i = 0; i < additionalCount; i++) {
          const insertionPoint = Math.floor(Math.random() * optimizedContent.length);
          const insertion = ` ${kw.keyword}`;
          optimizedContent = optimizedContent.slice(0, insertionPoint) + insertion + optimizedContent.slice(insertionPoint);
          
          changes.push({
            type: 'add',
            element: 'keyword',
            suggested: kw.keyword,
            reason: 'Anahtar kelime yoğunluğunu artırmak için'
          });
        }
      }
    });

    // Heading yapısı ekleme
    if (!optimizedContent.includes('<h2>')) {
      const firstParagraph = optimizedContent.indexOf('<p>');
      if (firstParagraph !== -1) {
        const heading = `<h2>${targetKeywords[0] || 'Ana Başlık'}</h2>`;
        optimizedContent = optimizedContent.slice(0, firstParagraph) + heading + optimizedContent.slice(firstParagraph);
        
        changes.push({
          type: 'add',
          element: 'H2 heading',
          suggested: heading,
          reason: 'SEO için heading yapısı eklemek'
        });
      }
    }

    return {
      originalContent: content,
      optimizedContent,
      changes,
      seoImprovements: analysis.suggestions
    };
  }

  // Meta Description Önerisi
  generateMetaDescription(content: string, targetKeywords: string[]): string {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const relevantSentences = sentences.filter(sentence => 
      targetKeywords.some(keyword => 
        sentence.toLowerCase().includes(keyword.toLowerCase())
      )
    );

    let description = relevantSentences[0] || sentences[0] || content.substring(0, 160);
    description = description.replace(/<[^>]*>/g, '').trim();

    if (description.length > 160) {
      description = description.substring(0, 157) + '...';
    }

    return description;
  }

  // Title Önerisi
  generateTitle(content: string, targetKeywords: string[]): string {
    const primaryKeyword = targetKeywords[0] || 'OW';
    const brandName = 'OW - Optimize the World';
    
    let title = `${primaryKeyword} | ${brandName}`;
    
    if (title.length > 60) {
      title = `${primaryKeyword} | OW`;
    }
    
    return title;
  }
}

// AI SEO Hook
export const useAISEO = () => {
  const analyzer = new AISEOAnalyzer();

  const analyzeContent = (content: string, keywords: string[]) => {
    return analyzer.analyzeContent(content, keywords);
  };

  const optimizeContent = (content: string, keywords: string[]) => {
    return analyzer.optimizeContent(content, keywords);
  };

  const generateMetaDescription = (content: string, keywords: string[]) => {
    return analyzer.generateMetaDescription(content, keywords);
  };

  const generateTitle = (content: string, keywords: string[]) => {
    return analyzer.generateTitle(content, keywords);
  };

  return {
    analyzeContent,
    optimizeContent,
    generateMetaDescription,
    generateTitle
  };
}; 