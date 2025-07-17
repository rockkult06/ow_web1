// SEO Chatbot ve Asistan Sistemi
export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  attachments?: ChatAttachment[];
  quickReplies?: QuickReply[];
}

export interface ChatAttachment {
  type: 'image' | 'file' | 'link';
  url: string;
  title: string;
  description?: string;
}

export interface QuickReply {
  text: string;
  action: string;
  payload?: any;
}

export interface ChatSession {
  id: string;
  userId: string;
  messages: ChatMessage[];
  context: ChatContext;
  status: 'active' | 'closed' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatContext {
  currentTopic: string;
  userIntent: string;
  previousQuestions: string[];
  userPreferences: {
    language: string;
    expertise: 'beginner' | 'intermediate' | 'expert';
    focus: string[];
  };
  sessionData: {
    analyzedUrl?: string;
    seoIssues?: string[];
    recommendations?: string[];
  };
}

export interface SEOKnowledge {
  id: string;
  category: string;
  topic: string;
  question: string;
  answer: string;
  keywords: string[];
  relatedTopics: string[];
  difficulty: 'beginner' | 'intermediate' | 'expert';
  lastUpdated: Date;
  relevance?: number;
}

export interface ChatbotResponse {
  message: string;
  suggestions: string[];
  actions: ChatbotAction[];
  confidence: number;
}

export interface ChatbotAction {
  type: 'analyze' | 'recommend' | 'explain' | 'guide' | 'report';
  title: string;
  description: string;
  url?: string;
  payload?: any;
}

export class SEOChatbot {
  private sessions: ChatSession[] = [];
  private knowledge: SEOKnowledge[] = [];
  private responses: Map<string, ChatbotResponse> = new Map();

  constructor() {
    this.initializeKnowledge();
  }

  private initializeKnowledge(): void {
    this.knowledge = [
      {
        id: 'seo_basics',
        category: 'Fundamentals',
        topic: 'SEO Temelleri',
        question: 'SEO nedir ve neden önemlidir?',
        answer: 'SEO (Search Engine Optimization), web sitelerinin arama motorlarında daha iyi sıralanması için yapılan optimizasyon çalışmalarıdır. Organik trafik artışı, marka bilinirliği ve dönüşüm oranlarını artırır.',
        keywords: ['seo', 'arama motoru', 'optimizasyon', 'organik trafik'],
        relatedTopics: ['keyword research', 'on-page seo', 'technical seo'],
        difficulty: 'beginner',
        lastUpdated: new Date()
      },
      {
        id: 'keyword_research',
        category: 'Research',
        topic: 'Anahtar Kelime Araştırması',
        question: 'Anahtar kelime araştırması nasıl yapılır?',
        answer: 'Anahtar kelime araştırması için Google Keyword Planner, Ahrefs, SEMrush gibi araçlar kullanılır. Arama hacmi, rekabet seviyesi ve uzun kuyruk anahtar kelimeler analiz edilmelidir.',
        keywords: ['keyword research', 'anahtar kelime', 'arama hacmi', 'rekabet'],
        relatedTopics: ['long-tail keywords', 'keyword difficulty', 'search intent'],
        difficulty: 'intermediate',
        lastUpdated: new Date()
      },
      {
        id: 'on_page_seo',
        category: 'On-Page',
        topic: 'Sayfa İçi SEO',
        question: 'Sayfa içi SEO optimizasyonu nasıl yapılır?',
        answer: 'Sayfa içi SEO için title tag, meta description, heading yapısı, içerik kalitesi, URL yapısı, görsel optimizasyonu ve internal linking önemlidir.',
        keywords: ['on-page seo', 'title tag', 'meta description', 'heading'],
        relatedTopics: ['content optimization', 'technical seo', 'user experience'],
        difficulty: 'intermediate',
        lastUpdated: new Date()
      },
      {
        id: 'technical_seo',
        category: 'Technical',
        topic: 'Teknik SEO',
        question: 'Teknik SEO nedir ve hangi konuları kapsar?',
        answer: 'Teknik SEO, site hızı, mobile uyumluluk, SSL sertifikası, XML sitemap, robots.txt, schema markup, core web vitals gibi teknik konuları kapsar.',
        keywords: ['technical seo', 'site hızı', 'mobile', 'core web vitals'],
        relatedTopics: ['page speed', 'mobile optimization', 'schema markup'],
        difficulty: 'expert',
        lastUpdated: new Date()
      },
      {
        id: 'backlink_building',
        category: 'Off-Page',
        topic: 'Backlink Oluşturma',
        question: 'Kaliteli backlink nasıl kazanılır?',
        answer: 'Kaliteli backlink için guest posting, broken link building, resource link building, influencer outreach ve partnership çalışmaları yapılmalıdır.',
        keywords: ['backlink', 'link building', 'guest posting', 'outreach'],
        relatedTopics: ['link building strategies', 'domain authority', 'spam score'],
        difficulty: 'expert',
        lastUpdated: new Date()
      },
      {
        id: 'content_marketing',
        category: 'Content',
        topic: 'İçerik Pazarlaması',
        question: 'SEO için içerik stratejisi nasıl oluşturulur?',
        answer: 'SEO odaklı içerik stratejisi için hedef kitle analizi, anahtar kelime araştırması, içerik takvimi, kaliteli içerik üretimi ve düzenli güncelleme yapılmalıdır.',
        keywords: ['content marketing', 'içerik stratejisi', 'blog', 'içerik'],
        relatedTopics: ['content calendar', 'content optimization', 'user intent'],
        difficulty: 'intermediate',
        lastUpdated: new Date()
      }
    ];
  }

  // Yeni Chat Oturumu Oluşturma
  createSession(userId: string): string {
    const sessionId = `session_${Date.now()}`;
    const session: ChatSession = {
      id: sessionId,
      userId,
      messages: [],
      context: {
        currentTopic: 'general',
        userIntent: 'information',
        previousQuestions: [],
        userPreferences: {
          language: 'tr',
          expertise: 'beginner',
          focus: ['general']
        },
        sessionData: {}
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.sessions.push(session);
    return sessionId;
  }

  // Mesaj Gönderme ve Yanıt Alma
  async sendMessage(sessionId: string, message: string): Promise<ChatMessage[]> {
    const session = this.sessions.find(s => s.id === sessionId);
    if (!session) {
      throw new Error(`Oturum bulunamadı: ${sessionId}`);
    }

    // Kullanıcı mesajını ekle
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    session.messages.push(userMessage);

    // Bot yanıtını oluştur
    const botResponse = await this.generateResponse(message, session);
    const botMessage: ChatMessage = {
      id: `msg_${Date.now()}_bot`,
      type: 'bot',
      content: botResponse.message,
      timestamp: new Date(),
      quickReplies: botResponse.suggestions.map(suggestion => ({
        text: suggestion,
        action: 'quick_reply',
        payload: { suggestion }
      }))
    };

    session.messages.push(botMessage);
    session.updatedAt = new Date();

    // Bağlamı güncelle
    this.updateContext(session, message, botResponse);

    return session.messages;
  }

  // Bot Yanıtı Oluşturma
  private async generateResponse(message: string, session: ChatSession): Promise<ChatbotResponse> {
    const lowerMessage = message.toLowerCase();
    let response: ChatbotResponse;

    // Anahtar kelime tabanlı yanıt sistemi
    if (lowerMessage.includes('seo') || lowerMessage.includes('arama motoru')) {
      response = {
        message: 'SEO, web sitelerinin arama motorlarında daha iyi sıralanması için yapılan optimizasyon çalışmalarıdır. Size hangi konuda yardımcı olabilirim?',
        suggestions: [
          'SEO temelleri hakkında bilgi al',
          'Anahtar kelime araştırması yap',
          'Sayfa içi SEO optimizasyonu',
          'Teknik SEO konuları'
        ],
        actions: [
          {
            type: 'explain',
            title: 'SEO Temelleri',
            description: 'SEO hakkında detaylı bilgi',
            url: '/seo-basics'
          }
        ],
        confidence: 0.9
      };
    } else if (lowerMessage.includes('anahtar kelime') || lowerMessage.includes('keyword')) {
      response = {
        message: 'Anahtar kelime araştırması SEO\'nun temelidir. Google Keyword Planner, Ahrefs gibi araçlar kullanarak arama hacmi ve rekabet analizi yapabilirsiniz.',
        suggestions: [
          'Anahtar kelime araştırma araçları',
          'Long-tail anahtar kelimeler',
          'Anahtar kelime zorluğu',
          'Arama niyeti analizi'
        ],
        actions: [
          {
            type: 'analyze',
            title: 'Anahtar Kelime Analizi',
            description: 'Siteniz için anahtar kelime önerileri',
            payload: { action: 'keyword_analysis' }
          }
        ],
        confidence: 0.85
      };
    } else if (lowerMessage.includes('backlink') || lowerMessage.includes('link')) {
      response = {
        message: 'Backlink, sitenize başka sitelerden verilen linklerdir. Kaliteli backlinkler domain otoritesini artırır. Guest posting, broken link building gibi yöntemler kullanılır.',
        suggestions: [
          'Backlink analizi yap',
          'Link building stratejileri',
          'Toxic backlink tespiti',
          'Domain otoritesi kontrolü'
        ],
        actions: [
          {
            type: 'analyze',
            title: 'Backlink Analizi',
            description: 'Mevcut backlink profilinizi analiz edin',
            payload: { action: 'backlink_analysis' }
          }
        ],
        confidence: 0.8
      };
    } else if (lowerMessage.includes('hız') || lowerMessage.includes('performans')) {
      response = {
        message: 'Site hızı SEO için kritik önem taşır. Core Web Vitals, page speed, mobile optimization gibi konulara odaklanmalısınız.',
        suggestions: [
          'Site hızı testi yap',
          'Core Web Vitals analizi',
          'Mobile uyumluluk kontrolü',
          'Performans optimizasyonu'
        ],
        actions: [
          {
            type: 'analyze',
            title: 'Performans Analizi',
            description: 'Site hızı ve performans analizi',
            payload: { action: 'performance_analysis' }
          }
        ],
        confidence: 0.85
      };
    } else if (lowerMessage.includes('içerik') || lowerMessage.includes('content')) {
      response = {
        message: 'Kaliteli içerik SEO\'nun temelidir. Hedef kitleye uygun, anahtar kelime odaklı ve düzenli güncellenen içerik üretmelisiniz.',
        suggestions: [
          'İçerik stratejisi oluştur',
          'İçerik takvimi planla',
          'İçerik optimizasyonu',
          'Blog yazısı önerileri'
        ],
        actions: [
          {
            type: 'recommend',
            title: 'İçerik Önerileri',
            description: 'Siteniz için içerik önerileri',
            payload: { action: 'content_recommendations' }
          }
        ],
        confidence: 0.8
      };
    } else {
      // Genel yanıt
      response = {
        message: 'Merhaba! SEO konusunda size nasıl yardımcı olabilirim? Anahtar kelime araştırması, sayfa optimizasyonu, backlink analizi gibi konularda destek verebilirim.',
        suggestions: [
          'SEO temelleri hakkında bilgi al',
          'Site analizi yap',
          'Anahtar kelime araştırması',
          'Backlink analizi'
        ],
        actions: [
          {
            type: 'guide',
            title: 'SEO Rehberi',
            description: 'Kapsamlı SEO rehberi',
            url: '/seo-guide'
          }
        ],
        confidence: 0.7
      };
    }

    return response;
  }

  // Bağlam Güncelleme
  private updateContext(session: ChatSession, message: string, response: ChatbotResponse): void {
    session.context.previousQuestions.push(message);
    
    // Kullanıcı niyetini belirle
    if (message.includes('nasıl') || message.includes('yapılır')) {
      session.context.userIntent = 'how_to';
    } else if (message.includes('nedir') || message.includes('ne demek')) {
      session.context.userIntent = 'definition';
    } else if (message.includes('analiz') || message.includes('test')) {
      session.context.userIntent = 'analysis';
    } else {
      session.context.userIntent = 'information';
    }

    // Uzmanlık seviyesini güncelle
    if (message.includes('teknik') || message.includes('advanced')) {
      session.context.userPreferences.expertise = 'expert';
    } else if (message.includes('temel') || message.includes('basit')) {
      session.context.userPreferences.expertise = 'beginner';
    }
  }

  // Hızlı Yanıt İşleme
  async handleQuickReply(sessionId: string, action: string, payload?: any): Promise<ChatMessage[]> {
    const session = this.sessions.find(s => s.id === sessionId);
    if (!session) {
      throw new Error(`Oturum bulunamadı: ${sessionId}`);
    }

    let response: ChatbotResponse;

    switch (action) {
      case 'keyword_analysis':
        response = {
          message: 'Anahtar kelime analizi için sitenizin URL\'sini paylaşın. Size uygun anahtar kelime önerileri sunabilirim.',
          suggestions: [
            'URL paylaş',
            'Manuel anahtar kelime girişi',
            'Rakip analizi',
            'Trend analizi'
          ],
          actions: [
            {
              type: 'analyze',
              title: 'URL Analizi',
              description: 'Sitenizi analiz ederek anahtar kelime önerileri',
              payload: { action: 'url_analysis' }
            }
          ],
          confidence: 0.9
        };
        break;

      case 'backlink_analysis':
        response = {
          message: 'Backlink analizi için sitenizin domain adını paylaşın. Mevcut backlink profilinizi analiz edebilirim.',
          suggestions: [
            'Domain paylaş',
            'Toxic backlink kontrolü',
            'Domain otoritesi kontrolü',
            'Link building önerileri'
          ],
          actions: [
            {
              type: 'analyze',
              title: 'Backlink Analizi',
              description: 'Backlink profilinizi analiz edin',
              payload: { action: 'backlink_analysis' }
            }
          ],
          confidence: 0.9
        };
        break;

      case 'performance_analysis':
        response = {
          message: 'Site performans analizi için URL\'nizi paylaşın. Hız, Core Web Vitals ve mobile uyumluluk analizi yapabilirim.',
          suggestions: [
            'URL paylaş',
            'PageSpeed Insights',
            'Core Web Vitals',
            'Mobile uyumluluk'
          ],
          actions: [
            {
              type: 'analyze',
              title: 'Performans Analizi',
              description: 'Site performansını analiz edin',
              payload: { action: 'performance_analysis' }
            }
          ],
          confidence: 0.9
        };
        break;

      default:
        response = {
          message: 'Bu konuda size nasıl yardımcı olabilirim?',
          suggestions: [
            'SEO analizi yap',
            'Anahtar kelime araştırması',
            'İçerik önerileri',
            'Teknik SEO kontrolü'
          ],
          actions: [],
          confidence: 0.7
        };
    }

    const botMessage: ChatMessage = {
      id: `msg_${Date.now()}_bot`,
      type: 'bot',
      content: response.message,
      timestamp: new Date(),
      quickReplies: response.suggestions.map(suggestion => ({
        text: suggestion,
        action: 'quick_reply',
        payload: { suggestion }
      }))
    };

    session.messages.push(botMessage);
    session.updatedAt = new Date();

    return session.messages;
  }

  // Bilgi Tabanından Yanıt Arama
  searchKnowledge(query: string): SEOKnowledge[] {
    const lowerQuery = query.toLowerCase();
    const results: SEOKnowledge[] = [];

    this.knowledge.forEach(item => {
      const relevance = this.calculateRelevance(lowerQuery, item);
      if (relevance > 0.3) {
        results.push({ ...item, relevance });
      }
    });

    return results.sort((a, b) => (b as any).relevance - (a as any).relevance);
  }

  // İlgi Skoru Hesaplama
  private calculateRelevance(query: string, knowledge: SEOKnowledge): number {
    let score = 0;
    const keywords = knowledge.keywords.join(' ').toLowerCase();
    const topic = knowledge.topic.toLowerCase();
    const question = knowledge.question.toLowerCase();

    // Anahtar kelime eşleşmesi
    knowledge.keywords.forEach(keyword => {
      if (query.includes(keyword.toLowerCase())) {
        score += 0.4;
      }
    });

    // Konu eşleşmesi
    if (query.includes(topic)) {
      score += 0.3;
    }

    // Soru eşleşmesi
    if (query.includes(question)) {
      score += 0.2;
    }

    return Math.min(1, score);
  }

  // Oturum Yönetimi
  getSession(sessionId: string): ChatSession | undefined {
    return this.sessions.find(s => s.id === sessionId);
  }

  closeSession(sessionId: string): void {
    const session = this.sessions.find(s => s.id === sessionId);
    if (session) {
      session.status = 'closed';
      session.updatedAt = new Date();
    }
  }

  getActiveSessions(): ChatSession[] {
    return this.sessions.filter(s => s.status === 'active');
  }

  // Bilgi Tabanı Yönetimi
  addKnowledge(knowledge: Omit<SEOKnowledge, 'id' | 'lastUpdated'>): void {
    const newKnowledge: SEOKnowledge = {
      ...knowledge,
      id: `knowledge_${Date.now()}`,
      lastUpdated: new Date()
    };

    this.knowledge.push(newKnowledge);
  }

  updateKnowledge(id: string, updates: Partial<SEOKnowledge>): void {
    const index = this.knowledge.findIndex(k => k.id === id);
    if (index !== -1) {
      this.knowledge[index] = {
        ...this.knowledge[index],
        ...updates,
        lastUpdated: new Date()
      };
    }
  }

  getKnowledge(): SEOKnowledge[] {
    return this.knowledge;
  }

  getKnowledgeByCategory(category: string): SEOKnowledge[] {
    return this.knowledge.filter(k => k.category === category);
  }
}

// SEO Chatbot Hook
export const useSEOChatbot = () => {
  const chatbot = new SEOChatbot();

  const createSession = (userId: string) => {
    return chatbot.createSession(userId);
  };

  const sendMessage = async (sessionId: string, message: string) => {
    return chatbot.sendMessage(sessionId, message);
  };

  const handleQuickReply = async (sessionId: string, action: string, payload?: any) => {
    return chatbot.handleQuickReply(sessionId, action, payload);
  };

  const getSession = (sessionId: string) => {
    return chatbot.getSession(sessionId);
  };

  const closeSession = (sessionId: string) => {
    return chatbot.closeSession(sessionId);
  };

  const searchKnowledge = (query: string) => {
    return chatbot.searchKnowledge(query);
  };

  return {
    createSession,
    sendMessage,
    handleQuickReply,
    getSession,
    closeSession,
    searchKnowledge
  };
}; 