// Otomatik Schema Markup Sistemi
export interface SchemaMarkup {
  id: string;
  type: 'Organization' | 'WebSite' | 'WebPage' | 'Article' | 'Product' | 'Service' | 'FAQ' | 'LocalBusiness' | 'SoftwareApplication' | 'HowTo' | 'Video';
  url: string;
  data: any;
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'inactive' | 'error';
  createdAt: Date;
  lastUpdated: Date;
  validation: SchemaValidation;
}

export interface SchemaValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  score: number;
}

export interface AutoSchemaConfig {
  enableAutoGeneration: boolean;
  enableValidation: boolean;
  enableTesting: boolean;
  defaultLanguage: string;
  organizationInfo: OrganizationInfo;
  websiteInfo: WebsiteInfo;
}

export interface OrganizationInfo {
  name: string;
  url: string;
  logo: string;
  description: string;
  address: Address;
  contactPoint: ContactPoint;
  sameAs: string[];
}

export interface WebsiteInfo {
  name: string;
  url: string;
  description: string;
  potentialAction: PotentialAction;
}

export interface Address {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface ContactPoint {
  telephone: string;
  contactType: string;
  email: string;
}

export interface PotentialAction {
  type: string;
  target: string;
  name: string;
}

export interface SchemaGenerator {
  generateOrganizationSchema(): any;
  generateWebsiteSchema(): any;
  generateWebPageSchema(pageData: any): any;
  generateArticleSchema(articleData: any): any;
  generateProductSchema(productData: any): any;
  generateServiceSchema(serviceData: any): any;
  generateFAQSchema(faqData: any): any;
  generateLocalBusinessSchema(businessData: any): any;
  generateSoftwareApplicationSchema(appData: any): any;
  generateHowToSchema(howToData: any): any;
  generateVideoSchema(videoData: any): any;
}

export class AutoSchemaMarkup {
  private schemas: SchemaMarkup[] = [];
  private config!: AutoSchemaConfig;

  constructor() {
    this.initializeConfig();
    this.initializeDefaultSchemas();
  }

  private initializeConfig(): void {
    this.config = {
      enableAutoGeneration: true,
      enableValidation: true,
      enableTesting: true,
      defaultLanguage: 'tr-TR',
      organizationInfo: {
        name: 'OW - Optimize the World',
        url: 'https://optimizeworld.net',
        logo: 'https://optimizeworld.net/logo.png',
        description: 'Akıllı şehirler için veri odaklı çözümler sunan teknoloji şirketi',
        address: {
          streetAddress: 'Teknoloji Caddesi No:123',
          addressLocality: 'İstanbul',
          addressRegion: 'İstanbul',
          postalCode: '34000',
          addressCountry: 'TR'
        },
        contactPoint: {
          telephone: '+90-212-555-0123',
          contactType: 'Customer Service',
          email: 'info@optimizeworld.net'
        },
        sameAs: [
          'https://www.linkedin.com/company/ow-optimize-world',
          'https://twitter.com/optimizeworld',
          'https://www.facebook.com/optimizeworld'
        ]
      },
      websiteInfo: {
        name: 'OW - Optimize the World',
        url: 'https://optimizeworld.net',
        description: 'Akıllı şehir çözümleri ve teknolojileri',
        potentialAction: {
          type: 'SearchAction',
          target: 'https://optimizeworld.net/search?q={search_term_string}',
          name: 'Search'
        }
      }
    };
  }

  private initializeDefaultSchemas(): void {
    // Organization Schema
    this.schemas.push({
      id: 'organization_schema',
      type: 'Organization',
      url: 'https://optimizeworld.net',
      data: this.generateOrganizationSchema(),
      priority: 'high',
      status: 'active',
      createdAt: new Date(),
      lastUpdated: new Date(),
      validation: { isValid: true, errors: [], warnings: [], score: 100 }
    });

    // Website Schema
    this.schemas.push({
      id: 'website_schema',
      type: 'WebSite',
      url: 'https://optimizeworld.net',
      data: this.generateWebsiteSchema(),
      priority: 'high',
      status: 'active',
      createdAt: new Date(),
      lastUpdated: new Date(),
      validation: { isValid: true, errors: [], warnings: [], score: 100 }
    });
  }

  // Organization Schema Oluşturma
  generateOrganizationSchema(): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: this.config.organizationInfo.name,
      url: this.config.organizationInfo.url,
      logo: this.config.organizationInfo.logo,
      description: this.config.organizationInfo.description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: this.config.organizationInfo.address.streetAddress,
        addressLocality: this.config.organizationInfo.address.addressLocality,
        addressRegion: this.config.organizationInfo.address.addressRegion,
        postalCode: this.config.organizationInfo.address.postalCode,
        addressCountry: this.config.organizationInfo.address.addressCountry
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: this.config.organizationInfo.contactPoint.telephone,
        contactType: this.config.organizationInfo.contactPoint.contactType,
        email: this.config.organizationInfo.contactPoint.email
      },
      sameAs: this.config.organizationInfo.sameAs,
      foundingDate: '2020-01-01',
      numberOfEmployees: '50-100',
      industry: 'Technology',
      serviceType: 'Smart City Solutions'
    };
  }

  // Website Schema Oluşturma
  generateWebsiteSchema(): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: this.config.websiteInfo.name,
      url: this.config.websiteInfo.url,
      description: this.config.websiteInfo.description,
      potentialAction: {
        '@type': this.config.websiteInfo.potentialAction.type,
        target: this.config.websiteInfo.potentialAction.target,
        'query-input': 'required name=search_term_string'
      },
      publisher: {
        '@type': 'Organization',
        name: this.config.organizationInfo.name,
        url: this.config.organizationInfo.url
      }
    };
  }

  // WebPage Schema Oluşturma
  generateWebPageSchema(pageData: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: pageData.title,
      description: pageData.description,
      url: pageData.url,
      mainEntity: pageData.mainEntity,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: pageData.breadcrumbs?.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        })) || []
      },
      datePublished: pageData.publishDate,
      dateModified: pageData.lastModified,
      author: {
        '@type': 'Organization',
        name: this.config.organizationInfo.name
      }
    };
  }

  // Article Schema Oluşturma
  generateArticleSchema(articleData: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: articleData.title,
      description: articleData.description,
      image: articleData.image,
      author: {
        '@type': 'Organization',
        name: this.config.organizationInfo.name,
        url: this.config.organizationInfo.url
      },
      publisher: {
        '@type': 'Organization',
        name: this.config.organizationInfo.name,
        logo: {
          '@type': 'ImageObject',
          url: this.config.organizationInfo.logo
        }
      },
      datePublished: articleData.publishDate,
      dateModified: articleData.lastModified,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleData.url
      },
      articleSection: articleData.category,
      keywords: articleData.keywords?.join(', '),
      wordCount: articleData.wordCount
    };
  }

  // Product Schema Oluşturma
  generateProductSchema(productData: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: productData.name,
      description: productData.description,
      image: productData.images,
      brand: {
        '@type': 'Brand',
        name: this.config.organizationInfo.name
      },
      manufacturer: {
        '@type': 'Organization',
        name: this.config.organizationInfo.name
      },
      category: productData.category,
      offers: {
        '@type': 'Offer',
        price: productData.price,
        priceCurrency: productData.currency || 'USD',
        availability: productData.availability || 'https://schema.org/InStock',
        url: productData.url
      },
      aggregateRating: productData.rating ? {
        '@type': 'AggregateRating',
        ratingValue: productData.rating.value,
        reviewCount: productData.rating.count
      } : undefined
    };
  }

  // Service Schema Oluşturma
  generateServiceSchema(serviceData: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: serviceData.name,
      description: serviceData.description,
      provider: {
        '@type': 'Organization',
        name: this.config.organizationInfo.name,
        url: this.config.organizationInfo.url
      },
      areaServed: serviceData.areaServed,
      serviceType: serviceData.type,
      offers: {
        '@type': 'Offer',
        price: serviceData.price,
        priceCurrency: serviceData.currency || 'USD',
        url: serviceData.url
      }
    };
  }

  // FAQ Schema Oluşturma
  generateFAQSchema(faqData: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqData.questions.map((q: any) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer
        }
      }))
    };
  }

  // LocalBusiness Schema Oluşturma
  generateLocalBusinessSchema(businessData: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: businessData.name,
      description: businessData.description,
      url: businessData.url,
      telephone: businessData.phone,
      email: businessData.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: businessData.address.street,
        addressLocality: businessData.address.city,
        addressRegion: businessData.address.region,
        postalCode: businessData.address.postalCode,
        addressCountry: businessData.address.country
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: businessData.coordinates.lat,
        longitude: businessData.coordinates.lng
      },
      openingHours: businessData.openingHours,
      priceRange: businessData.priceRange
    };
  }

  // SoftwareApplication Schema Oluşturma
  generateSoftwareApplicationSchema(appData: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: appData.name,
      description: appData.description,
      applicationCategory: appData.category,
      operatingSystem: appData.os,
      softwareVersion: appData.version,
      releaseNotes: appData.releaseNotes,
      downloadUrl: appData.downloadUrl,
      installUrl: appData.installUrl,
      screenshot: appData.screenshots,
      author: {
        '@type': 'Organization',
        name: this.config.organizationInfo.name
      },
      offers: {
        '@type': 'Offer',
        price: appData.price,
        priceCurrency: appData.currency || 'USD'
      }
    };
  }

  // HowTo Schema Oluşturma
  generateHowToSchema(howToData: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: howToData.title,
      description: howToData.description,
      image: howToData.image,
      totalTime: howToData.totalTime,
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: howToData.currency || 'USD',
        value: howToData.cost
      },
      supply: howToData.supplies?.map((supply: any) => ({
        '@type': 'HowToSupply',
        name: supply.name
      })),
      tool: howToData.tools?.map((tool: any) => ({
        '@type': 'HowToTool',
        name: tool.name
      })),
      step: howToData.steps?.map((step: any, index: number) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
        image: step.image,
        url: step.url
      }))
    };
  }

  // Video Schema Oluşturma
  generateVideoSchema(videoData: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: videoData.title,
      description: videoData.description,
      thumbnailUrl: videoData.thumbnail,
      uploadDate: videoData.uploadDate,
      duration: videoData.duration,
      contentUrl: videoData.videoUrl,
      embedUrl: videoData.embedUrl,
      interactionStatistic: {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/WatchAction',
        userInteractionCount: videoData.views
      },
      author: {
        '@type': 'Organization',
        name: this.config.organizationInfo.name
      }
    };
  }

  // Otomatik Schema Oluşturma
  autoGenerateSchema(url: string, pageType: string, pageData: any): SchemaMarkup {
    let schemaData: any;
    let schemaType: SchemaMarkup['type'];

    switch (pageType) {
      case 'article':
        schemaData = this.generateArticleSchema(pageData);
        schemaType = 'Article';
        break;
      case 'product':
        schemaData = this.generateProductSchema(pageData);
        schemaType = 'Product';
        break;
      case 'service':
        schemaData = this.generateServiceSchema(pageData);
        schemaType = 'Service';
        break;
      case 'faq':
        schemaData = this.generateFAQSchema(pageData);
        schemaType = 'FAQ';
        break;
      case 'howto':
        schemaData = this.generateHowToSchema(pageData);
        schemaType = 'HowTo';
        break;
      case 'video':
        schemaData = this.generateVideoSchema(pageData);
        schemaType = 'Video';
        break;
      default:
        schemaData = this.generateWebPageSchema(pageData);
        schemaType = 'WebPage';
    }

    const schema: SchemaMarkup = {
      id: `schema_${Date.now()}`,
      type: schemaType,
      url: url,
      data: schemaData,
      priority: 'medium',
      status: 'active',
      createdAt: new Date(),
      lastUpdated: new Date(),
      validation: this.validateSchema(schemaData)
    };

    this.schemas.push(schema);
    return schema;
  }

  // Schema Doğrulama
  validateSchema(schemaData: any): SchemaValidation {
    const errors: string[] = [];
    const warnings: string[] = [];
    let score = 100;

    // Temel doğrulama
    if (!schemaData['@context']) {
      errors.push('@context eksik');
      score -= 20;
    }

    if (!schemaData['@type']) {
      errors.push('@type eksik');
      score -= 20;
    }

    // Schema tipine göre özel doğrulama
    switch (schemaData['@type']) {
      case 'Organization':
        if (!schemaData.name) {
          errors.push('Organization name eksik');
          score -= 15;
        }
        if (!schemaData.url) {
          warnings.push('Organization URL eksik');
          score -= 5;
        }
        break;

      case 'Article':
        if (!schemaData.headline) {
          errors.push('Article headline eksik');
          score -= 15;
        }
        if (!schemaData.author) {
          warnings.push('Article author eksik');
          score -= 5;
        }
        break;

      case 'Product':
        if (!schemaData.name) {
          errors.push('Product name eksik');
          score -= 15;
        }
        if (!schemaData.offers) {
          warnings.push('Product offers eksik');
          score -= 10;
        }
        break;

      case 'FAQPage':
        if (!schemaData.mainEntity || schemaData.mainEntity.length === 0) {
          errors.push('FAQ questions eksik');
          score -= 20;
        }
        break;
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      score: Math.max(0, score)
    };
  }

  // Schema Test Etme
  testSchema(schemaId: string): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
    score: number;
    richSnippetPreview: any;
  } {
    const schema = this.schemas.find(s => s.id === schemaId);
    if (!schema) {
      throw new Error(`Schema bulunamadı: ${schemaId}`);
    }

    const validation = this.validateSchema(schema.data);
    const richSnippetPreview = this.generateRichSnippetPreview(schema.data);

    return {
      ...validation,
      richSnippetPreview
    };
  }

  // Rich Snippet Önizleme
  generateRichSnippetPreview(schemaData: any): any {
    const preview: any = {
      title: '',
      description: '',
      image: '',
      rating: null,
      price: null,
      availability: null
    };

    switch (schemaData['@type']) {
      case 'Article':
        preview.title = schemaData.headline;
        preview.description = schemaData.description;
        preview.image = schemaData.image;
        break;

      case 'Product':
        preview.title = schemaData.name;
        preview.description = schemaData.description;
        preview.image = schemaData.image;
        preview.price = schemaData.offers?.price;
        preview.availability = schemaData.offers?.availability;
        if (schemaData.aggregateRating) {
          preview.rating = {
            value: schemaData.aggregateRating.ratingValue,
            count: schemaData.aggregateRating.reviewCount
          };
        }
        break;

      case 'FAQPage':
        preview.title = 'FAQ';
        preview.description = `${schemaData.mainEntity?.length || 0} soru`;
        break;

      case 'Organization':
        preview.title = schemaData.name;
        preview.description = schemaData.description;
        preview.image = schemaData.logo;
        break;
    }

    return preview;
  }

  // Schema Optimizasyonu
  optimizeSchema(schemaId: string): SchemaMarkup {
    const schema = this.schemas.find(s => s.id === schemaId);
    if (!schema) {
      throw new Error(`Schema bulunamadı: ${schemaId}`);
    }

    // Schema'ya eksik alanları ekle
    const optimizedData = { ...schema.data };

    // Organization için eksik alanları ekle
    if (schema.type === 'Organization' && !optimizedData.foundingDate) {
      optimizedData.foundingDate = '2020-01-01';
    }

    // Article için eksik alanları ekle
    if (schema.type === 'Article' && !optimizedData.datePublished) {
      optimizedData.datePublished = new Date().toISOString();
    }

    // Product için eksik alanları ekle
    if (schema.type === 'Product' && !optimizedData.offers) {
      optimizedData.offers = {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      };
    }

    const optimizedSchema: SchemaMarkup = {
      ...schema,
      data: optimizedData,
      lastUpdated: new Date(),
      validation: this.validateSchema(optimizedData)
    };

    // Schema'yı güncelle
    const index = this.schemas.findIndex(s => s.id === schemaId);
    this.schemas[index] = optimizedSchema;

    return optimizedSchema;
  }

  // Schema JSON Çıktısı
  generateSchemaJSON(schemaId: string): string {
    const schema = this.schemas.find(s => s.id === schemaId);
    if (!schema) {
      throw new Error(`Schema bulunamadı: ${schemaId}`);
    }

    return JSON.stringify(schema.data, null, 2);
  }

  // Tüm Schema'ları HTML'e Dönüştürme
  generateSchemaHTML(): string {
    const activeSchemas = this.schemas.filter(s => s.status === 'active');
    
    return activeSchemas.map(schema => 
      `<script type="application/ld+json">${JSON.stringify(schema.data)}</script>`
    ).join('\n');
  }

  // Public Methods
  getSchemas(): SchemaMarkup[] {
    return this.schemas;
  }

  getSchemaById(id: string): SchemaMarkup | undefined {
    return this.schemas.find(s => s.id === id);
  }

  getActiveSchemas(): SchemaMarkup[] {
    return this.schemas.filter(s => s.status === 'active');
  }

  updateSchema(schemaId: string, updates: Partial<SchemaMarkup>): void {
    const index = this.schemas.findIndex(s => s.id === schemaId);
    if (index === -1) {
      throw new Error(`Schema bulunamadı: ${schemaId}`);
    }

    this.schemas[index] = {
      ...this.schemas[index],
      ...updates,
      lastUpdated: new Date()
    };
  }

  deleteSchema(schemaId: string): void {
    const index = this.schemas.findIndex(s => s.id === schemaId);
    if (index !== -1) {
      this.schemas.splice(index, 1);
    }
  }
}

// Auto Schema Markup Hook
export const useAutoSchemaMarkup = () => {
  const schemaMarkup = new AutoSchemaMarkup();

  const autoGenerateSchema = (url: string, pageType: string, pageData: any) => {
    return schemaMarkup.autoGenerateSchema(url, pageType, pageData);
  };

  const testSchema = (schemaId: string) => {
    return schemaMarkup.testSchema(schemaId);
  };

  const optimizeSchema = (schemaId: string) => {
    return schemaMarkup.optimizeSchema(schemaId);
  };

  const generateSchemaJSON = (schemaId: string) => {
    return schemaMarkup.generateSchemaJSON(schemaId);
  };

  const generateSchemaHTML = () => {
    return schemaMarkup.generateSchemaHTML();
  };

  const getSchemas = () => {
    return schemaMarkup.getSchemas();
  };

  const getActiveSchemas = () => {
    return schemaMarkup.getActiveSchemas();
  };

  return {
    autoGenerateSchema,
    testSchema,
    optimizeSchema,
    generateSchemaJSON,
    generateSchemaHTML,
    getSchemas,
    getActiveSchemas
  };
}; 