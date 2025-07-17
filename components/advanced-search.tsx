'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, Filter, MapPin, Building, Users, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { trackEvent } from '@/lib/analytics'

interface SearchResult {
  id: string
  title: string
  description: string
  category: 'product' | 'solution' | 'team' | 'content'
  url: string
  tags: string[]
  relevance: number
}

const searchData: SearchResult[] = [
  {
    id: 'transitopt',
    title: 'OW TransitOpt™',
    description: 'Frekans optimizasyonu ile toplu taşıma verimliliğini artırın',
    category: 'product',
    url: '/solutions/transitopt',
    tags: ['frekans optimizasyonu', 'toplu taşıma', 'planlama'],
    relevance: 95
  },
  {
    id: 'fleetopt',
    title: 'OW FleetOpt™',
    description: 'Filo optimizasyonu ve akıllı kaynak tahsisi',
    category: 'product',
    url: '/solutions/fleetopt',
    tags: ['filo optimizasyonu', 'kaynak tahsisi', 'maliyet'],
    relevance: 90
  },
  {
    id: 'ridersense',
    title: 'OW RiderSense™',
    description: 'Yolcu yoğunluğu tahmini ve dinamik planlama',
    category: 'product',
    url: '/solutions/ridersense',
    tags: ['yolcu yoğunluğu', 'tahmin', 'dinamik planlama'],
    relevance: 88
  },
  {
    id: 'costlogic',
    title: 'OW CostLogic™',
    description: 'Maliyet analizi ve yatırım planlama',
    category: 'product',
    url: '/solutions/costlogic',
    tags: ['maliyet analizi', 'yatırım', 'planlama'],
    relevance: 85
  },
  {
    id: 'team',
    title: 'OW Ekibi',
    description: 'İstatistik uzmanları, veri mühendisleri ve şehir plancıları',
    category: 'team',
    url: '/team',
    tags: ['ekip', 'uzmanlar', 'deneyim'],
    relevance: 80
  },
  {
    id: 'about',
    title: 'Hakkımızda',
    description: 'OW vizyonu ve misyonu hakkında bilgi',
    category: 'content',
    url: '/about',
    tags: ['vizyon', 'misyon', 'hakkımızda'],
    relevance: 75
  }
]

export function AdvancedSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Search functionality
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const filteredResults = searchData
      .filter(item => {
        const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
        
        return matchesQuery && matchesCategory
      })
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 6)

    setResults(filteredResults)
    
    // Track search event
    trackEvent('search', {
      search_query: searchQuery,
      results_count: filteredResults.length,
      selected_category: selectedCategory
    })
  }

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query, selectedCategory])

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleResultClick = (result: SearchResult) => {
    trackEvent('search_result_click', {
      result_id: result.id,
      result_title: result.title,
      result_category: result.category
    })
    
    window.location.href = result.url
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'product': return <Building className="w-4 h-4" />
      case 'team': return <Users className="w-4 h-4" />
      case 'content': return <TrendingUp className="w-4 h-4" />
      default: return <MapPin className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'product': return 'bg-blue-100 text-blue-800'
      case 'team': return 'bg-green-100 text-green-800'
      case 'content': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="OW çözümlerini ara..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10 w-full md:w-80"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setResults([])
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results */}
      {isOpen && (query || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
          {/* Filters */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">Filtreler</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="text-xs"
              >
                <Filter className="w-3 h-3 mr-1" />
                {showFilters ? 'Gizle' : 'Göster'}
              </Button>
            </div>
            
            {showFilters && (
              <div className="flex flex-wrap gap-2">
                {['all', 'product', 'team', 'content'].map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? 'Tümü' : 
                     category === 'product' ? 'Ürünler' :
                     category === 'team' ? 'Ekip' : 'İçerik'}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Results */}
          <div className="p-2">
            {results.length > 0 ? (
              results.map((result) => (
                <div
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getCategoryIcon(result.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {result.title}
                        </h4>
                        <Badge className={`text-xs ${getCategoryColor(result.category)}`}>
                          {result.category === 'product' ? 'Ürün' :
                           result.category === 'team' ? 'Ekip' : 'İçerik'}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                        {result.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {result.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : query ? (
              <div className="p-4 text-center text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">"{query}" için sonuç bulunamadı</p>
                <p className="text-xs mt-1">Farklı anahtar kelimeler deneyin</p>
              </div>
            ) : null}
          </div>

          {/* Search Suggestions */}
          {!query && (
            <div className="p-4 border-t border-gray-100">
              <h4 className="text-xs font-medium text-gray-700 mb-2">Popüler Aramalar</h4>
              <div className="flex flex-wrap gap-1">
                {['frekans optimizasyonu', 'filo yönetimi', 'yolcu analizi', 'maliyet analizi'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 