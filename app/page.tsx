"use client"

import {
  ArrowRight,
  Sparkles,
  X,
  RotateCcw,
  Globe,
  Users,
  Target,
  Heart,
  Building2,
  Stethoscope,
  Activity,
  AlertTriangle,
  Hospital,
  Dna,
  Car,
  TrendingUp,
  DollarSign,
  Bus,
  MapPin,
  BarChart3,
  Leaf,
  BriefcaseMedical,
  Building,
  MapIcon as City,
  GraduationCap,
  FlagIcon as Government,
  Route,
  Truck,
  FormInput,
  Handshake,
  Newspaper,
  Map,
  Database,
  Puzzle,
  FlaskConical,
  Brain,
  ChevronDown,
  Mail,
  Phone,
} from "lucide-react"
import { useState, useEffect } from "react"
import { trackEvent, trackButtonClick, trackMenuInteraction, trackProductView, trackContactInteraction, trackLanguageChange, trackDemoRequest } from "@/lib/analytics"
import { generateOrganizationSchema, generateWebSiteSchema, generateWebPageSchema, generateFAQSchema } from "@/lib/structured-data"

// --- Content Data (Turkish & English) ---
const content = {
  TR: {
    menu: {
      hakkimizda: "Hakkımızda",
      cozumlerimiz: "Çözümlerimiz",
      sektorler: "Sektörler",
      basariHikayeleri: "Başarı Hikayeleri",
      blog: "Blog",
      iletisim: "İletişim",
      ekibimiz: "Ekibimiz",
    },
    dropdownTitles: {
      hakkimizda: "Hakkımızda",
      cozumlerimiz: "Çözümlerimiz",
      sektorler: "Sektörler",
      basariHikayeleri: "Başarı Hikayeleri",
      iletisim: "İletişim",
      ekibimiz: "Ekibimiz",
    },
    dropdownSubtitles: {
      cozumlerimiz: "Akıllı Şehirler İçin Yenilikçi Ulaşım Teknolojileri",
      sektorler: "OW, farklı sektörlere özel optimize edilmiş akıllı şehir çözümleri sunar.",
      basariHikayeleri: "Gerçek veri, gerçek sonuçlar.",
      iletisim: "Sizin için nasıl optimize edebiliriz?",
      ekibimiz: "Bilim, teknoloji ve şehir yaşamı bir arada.",
    },
    hero: {
      cta: "Akıllı şehirler için veri odaklı çözümler",
      slogan: "Akıllı Hareketlilik Çözümleri [♡] Akıllı Ulaşım Teknolojileri",
    },
  },
  EN: {
    menu: {
      hakkimizda: "About Us",
      cozumlerimiz: "Solutions",
      sektorler: "Sectors",
      basariHikayeleri: "Success Stories",
      blog: "Blog",
      iletisim: "Contact",
      ekibimiz: "Our Team",
    },
    dropdownTitles: {
      hakkimizda: "About Us",
      cozumlerimiz: "Solutions",
      sektorler: "Sectors",
      basariHikayeleri: "Success Stories",
      iletisim: "Contact",
      ekibimiz: "Our Team",
    },
    dropdownSubtitles: {
      cozumlerimiz: "Innovative Transport Technologies for Smart Cities",
      sektorler: "OW offers optimized smart city solutions tailored for various sectors.",
      basariHikayeleri: "Real data, real results.",
      iletisim: "How can we optimize for you?",
      ekibimiz: "Science, technology, and urban living combined.",
    },
    hero: {
      cta: "Data-driven solutions for smart cities",
      slogan: "Smart Mobility Solutions [♡] Smart Transport Technologies",
    },
  },
  DE: {
    menu: {
      hakkimizda: "Über uns",
      cozumlerimiz: "Unsere Lösungen",
      sektorler: "Sektoren",
      basariHikayeleri: "Erfolgsgeschichten",
      blog: "Blog",
      iletisim: "Kontakt",
      ekibimiz: "Unser Team",
    },
    dropdownTitles: {
      hakkimizda: "Über uns",
      cozumlerimiz: "Unsere Lösungen",
      sektorler: "Sektoren",
      basariHikayeleri: "Erfolgsgeschichten",
      iletisim: "Kontakt",
      ekibimiz: "Unser Team",
    },
    dropdownSubtitles: {
      cozumlerimiz: "Innovative Verkehrstechnologien für Smart Cities",
      sektorler: "OW bietet optimierte Smart-City-Lösungen für verschiedene Sektoren.",
      basariHikayeleri: "Echte Daten, echte Ergebnisse.",
      iletisim: "Wie können wir für Sie optimieren?",
      ekibimiz: "Wissenschaft, Technologie und urbanes Leben vereint.",
    },
    hero: {
      cta: "Datengestützte Lösungen für Smart Cities",
      slogan: "Smart Mobility Lösungen [♡] Smart Transport Technologien",
    },
  },
}

export default function HomePage() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState("EN")
  const [showLangDropdown, setShowLangDropdown] = useState(false)

  const currentContent = content[selectedLanguage as keyof typeof content]

  const toggleDropdown = (menuItem: string) => {
    const isOpening = activeDropdown !== menuItem
    setActiveDropdown(activeDropdown === menuItem ? null : menuItem)
    
    // Track menu interaction
    if (isOpening) {
      trackMenuInteraction(menuItem, 'open')
    } else {
      trackMenuInteraction(menuItem, 'close')
    }
  }

  const closeDropdown = () => {
    setActiveDropdown(null)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !(event.target as Element).closest('nav')) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeDropdown])

  const handleCtaClick = () => {
    trackButtonClick('cta_button', 'hero_section')
  }

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationSchema())
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebSiteSchema())
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebPageSchema(
            "OW - Optimize the World | Akıllı Şehir Çözümleri",
            "OW, akıllı şehirler için veri odaklı çözümler sunan teknoloji şirketi. Toplu taşıma optimizasyonu, akıllı hareketlilik ve ulaşım teknolojileri.",
            "https://optimizeworld.net"
          ))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema())
        }}
      />
      
      <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="absolute top-0 left-0 w-full z-20 pt-4 sm:pt-8">
          <div className="max-w-full mx-auto px-4 sm:px-6 flex items-center justify-between">
            {/* Logo */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#EBECEC] flex items-center justify-center">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" />
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-2 sm:space-x-6 bg-[#EBECEC]/55 rounded-lg px-3 py-2 sm:px-6 sm:py-3 shadow-md flex-wrap justify-center">
              <button
                onClick={() => toggleDropdown("hakkimizda")}
                data-menu="hakkimizda"
                className="text-xs sm:text-sm font-medium transition-all duration-300 text-gray-900"
              >
                {currentContent.menu.hakkimizda}
              </button>
              <button
                onClick={() => toggleDropdown("cozumlerimiz")}
                data-menu="cozumlerimiz"
                className="text-xs sm:text-sm font-medium transition-all duration-300 text-gray-900"
              >
                {currentContent.menu.cozumlerimiz}
              </button>
              <button
                onClick={() => toggleDropdown("sektorler")}
                data-menu="sektorler"
                className="text-xs sm:text-sm font-medium transition-all duration-300 text-gray-900"
              >
                {currentContent.menu.sektorler}
              </button>
              <button
                onClick={() => toggleDropdown("basari-hikayeleri")}
                data-menu="basari-hikayeleri"
                className="text-xs sm:text-sm font-medium transition-all duration-300 text-gray-900"
              >
                {currentContent.menu.basariHikayeleri}
              </button>
              <a
                href="/blog"
                className="text-xs sm:text-sm font-medium transition-all duration-300 text-gray-900 hover:text-blue-600"
              >
                {currentContent.menu.blog}
              </a>
              <button
                onClick={() => toggleDropdown("iletisim")}
                data-menu="iletisim"
                className="text-xs sm:text-sm font-medium transition-all duration-300 text-gray-900"
              >
                {currentContent.menu.iletisim}
              </button>
              <button
                onClick={() => toggleDropdown("ekibimiz")}
                data-menu="ekibimiz"
                className="text-xs sm:text-sm font-medium transition-all duration-300 text-gray-900"
              >
                {currentContent.menu.ekibimiz}
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => toggleDropdown("mobile-menu")}
                className="bg-[#EBECEC]/55 rounded-xl px-4 py-3 sm:px-6 sm:py-3 shadow-md flex items-center gap-2 sm:gap-3 hover:bg-[#EBECEC]/70 transition-all duration-300 min-w-[120px] sm:min-w-[130px] min-h-[44px]"
              >
                <span className="text-sm font-medium text-gray-900">{selectedLanguage === "TR" ? "Menü" : "Menu"}</span>
                <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                  <div className="w-full h-1 bg-gray-900 rounded-full"></div>
                  <div className="w-full h-1 bg-gray-900 rounded-full"></div>
                  <div className="w-full h-1 bg-gray-900 rounded-full"></div>
                </div>
              </button>
            </div>

            {/* Language Selector */}
            <div className="flex items-center relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="bg-[#EBECEC]/55 rounded-lg px-3 py-2 sm:px-4 sm:py-3 shadow-md flex items-center gap-1 sm:gap-2 hover:bg-[#EBECEC]/70 transition-all duration-300 hover:scale-105"
              >
                <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                <span className="text-xs sm:text-sm font-medium text-gray-900">{selectedLanguage}</span>
                <ChevronDown className="w-3 h-3 text-gray-600" />
              </button>
              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-28 bg-white/40 backdrop-blur-md rounded-lg shadow-xl border border-white/20 z-50">
                  {["TR", "EN", "DE"].filter(l => l !== selectedLanguage).map(l => (
                    <button
                      key={l}
                      onClick={() => { 
                        trackLanguageChange(selectedLanguage, l);
                        setSelectedLanguage(l); 
                        setShowLangDropdown(false); 
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-white/30 rounded-lg transition-colors duration-200"
                    >
                      {l === "TR" ? "Türkçe" : l === "EN" ? "English" : "Deutsch"}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* CTA Button */}
        <div className="absolute top-[75px] sm:top-[100px] left-1/2 -translate-x-1/2 z-30 px-4">
          <button
            onClick={handleCtaClick}
            className="bg-[#EBECEC]/60 rounded-xl text-gray-700 hover:bg-[#EBECEC]/80 transition-all duration-300 px-3 py-2 sm:px-4 sm:py-3 shadow-lg hover:shadow-xl inline-flex items-center gap-2 sm:gap-3 min-w-[180px] sm:min-w-[200px] justify-between backdrop-blur-sm"
          >
            <span className="text-xs sm:text-sm font-medium leading-tight">
              {currentContent.hero.cta}
            </span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#0171E3]" />
            </div>
          </button>
        </div>

        {/* Hero Section */}
        <main className="flex-grow relative flex items-center justify-center px-4 pt-4 sm:pt-0 z-10">
          <div className="relative w-full max-w-[380px] h-[420px] sm:max-w-[338px] sm:h-[364px] lg:max-w-[650px] lg:h-[780px] -mt-16 sm:-mt-20 lg:mt-0">
            <img
              src="/images/t4.png"
              alt="3D rendered human head with neural network pattern overlay representing AI and smart city data analysis"
              className="absolute inset-0 w-full h-full object-contain"
              style={{opacity:0.7}}
            />
          </div>

          <div className="absolute top-[calc(50%+200px)] sm:bottom-24 lg:bottom-20 left-1/2 -translate-x-1/2 sm:left-10 sm:translate-x-0 z-20 text-center sm:text-left">
            <div className="flex flex-col gap-0 sm:gap-1 items-center sm:items-start justify-center">
              <span className="text-sm sm:text-base lg:text-2xl text-gray-800 font-medium text-center sm:text-left" style={{width: 'fit-content', maxWidth: '100%'}}>Optimize the World</span>
              <h1 className="text-4xl sm:text-5xl lg:text-9xl font-bold text-gray-900 leading-none tracking-wider">OW</h1>
            </div>
            <div className="text-xs sm:text-sm lg:text-xl text-gray-700 mt-2 sm:mt-3 lg:mt-2 max-w-[280px] sm:max-w-[320px] lg:max-w-none leading-relaxed">
              <div className="space-y-1">
                <p>{currentContent.hero.slogan}</p>
              </div>
            </div>
          </div>
        </main>

        {/* Desktop Dropdown Menus */}
        {activeDropdown && activeDropdown !== "mobile-menu" && (
          <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200 z-30">
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeDropdown === "hakkimizda" && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">{currentContent.dropdownTitles.hakkimizda}</h3>
                    <p className="text-gray-600">OW hakkında detaylı bilgi alın.</p>
                    <div className="space-y-2">
                      <a href="/about" className="block text-blue-600 hover:text-blue-800">Hakkımızda</a>
                      <a href="/team" className="block text-blue-600 hover:text-blue-800">Ekibimiz</a>
                      <a href="/mission" className="block text-blue-600 hover:text-blue-800">Misyonumuz</a>
                    </div>
                  </div>
                )}
                
                {activeDropdown === "cozumlerimiz" && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">{currentContent.dropdownTitles.cozumlerimiz}</h3>
                    <p className="text-gray-600">{currentContent.dropdownSubtitles.cozumlerimiz}</p>
                    <div className="space-y-2">
                      <a href="/solutions/transitopt" className="block text-blue-600 hover:text-blue-800">OW TransitOpt™</a>
                      <a href="/solutions/fleetopt" className="block text-blue-600 hover:text-blue-800">OW FleetOpt™</a>
                      <a href="/solutions/ridersense" className="block text-blue-600 hover:text-blue-800">OW RiderSense™</a>
                      <a href="/solutions/costlogic" className="block text-blue-600 hover:text-blue-800">OW CostLogic™</a>
                    </div>
                  </div>
                )}
                
                {activeDropdown === "sektorler" && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">{currentContent.dropdownTitles.sektorler}</h3>
                    <p className="text-gray-600">{currentContent.dropdownSubtitles.sektorler}</p>
                    <div className="space-y-2">
                      <a href="/sectors/municipalities" className="block text-blue-600 hover:text-blue-800">Belediyeler</a>
                      <a href="/sectors/transport" className="block text-blue-600 hover:text-blue-800">Ulaşım Daireleri</a>
                      <a href="/sectors/smart-cities" className="block text-blue-600 hover:text-blue-800">Akıllı Şehirler</a>
                      <a href="/sectors/universities" className="block text-blue-600 hover:text-blue-800">Üniversiteler</a>
                    </div>
                  </div>
                )}
                
                {activeDropdown === "basari-hikayeleri" && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">{currentContent.dropdownTitles.basariHikayeleri}</h3>
                    <p className="text-gray-600">{currentContent.dropdownSubtitles.basariHikayeleri}</p>
                    <div className="space-y-2">
                      <a href="/success-stories/case-1" className="block text-blue-600 hover:text-blue-800">Vaka Çalışması 1</a>
                      <a href="/success-stories/case-2" className="block text-blue-600 hover:text-blue-800">Vaka Çalışması 2</a>
                      <a href="/success-stories/case-3" className="block text-blue-600 hover:text-blue-800">Vaka Çalışması 3</a>
                    </div>
                  </div>
                )}
                
                {activeDropdown === "iletisim" && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">{currentContent.dropdownTitles.iletisim}</h3>
                    <p className="text-gray-600">{currentContent.dropdownSubtitles.iletisim}</p>
                    <div className="space-y-2">
                      <a href="/contact" className="block text-blue-600 hover:text-blue-800">İletişim</a>
                      <a href="/demo" className="block text-blue-600 hover:text-blue-800">Demo Talep Et</a>
                      <a href="/support" className="block text-blue-600 hover:text-blue-800">Destek</a>
                    </div>
                  </div>
                )}
                
                {activeDropdown === "ekibimiz" && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">{currentContent.dropdownTitles.ekibimiz}</h3>
                    <p className="text-gray-600">{currentContent.dropdownSubtitles.ekibimiz}</p>
                    <div className="space-y-2">
                      <a href="/team" className="block text-blue-600 hover:text-blue-800">Ekibimiz</a>
                      <a href="/careers" className="block text-blue-600 hover:text-blue-800">Kariyer</a>
                      <a href="/partners" className="block text-blue-600 hover:text-blue-800">Ortaklarımız</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-10"
          style={{opacity:0.1}}
        >
          <source src="/2.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  )
} 