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
import { useState } from "react"

// --- Content Data (Turkish & English) ---
const content = {
  TR: {
    menu: {
      hakkimizda: "Hakkımızda",
      cozumlerimiz: "Çözümlerimiz",
      sektorler: "Sektörler",
      basariHikayeleri: "Başarı Hikayeleri",
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
    hakkimizda: {
      bizKimiz: {
        title: "Biz Kimiz?",
        desc1:
          "OW (Optimize the World), küresel ölçekte şehirlerin karşılaştığı kentsel hareketlilik sorunlarına bilimsel ve teknolojik çözümler sunmak üzere yola çıktık.",
        desc2:
          "Veri odaklı yaklaşımlar, ileri optimizasyon algoritmaları ve yapay zeka destekli sistemlerle toplu taşıma ağlarını dönüştürerek, şehirleri daha akıllı, daha verimli, daha erişilebilir ve çevresel açıdan daha sürdürülebilir bir geleceğe taşımaktır.",
      },
      vizyonMisyon: {
        title: "Vizyon - Misyon",
        visionTitle: "Vizyonumuz",
        visionDesc1: "Geleceğin şehirlerini şekillendirmek.",
        visionDesc2: "Akıllı Şehirler, Akıllı İnsanlar, Akıllı Ekonomi, Akıllı Çevre, Akıllı Hareketlilik, Akıllı Ulaşım, Akıllı Yönetişim ve Akıllı Yaşam temalarıyla şehirlerin dijital dönüşümüne katkı sağlamayı hedefliyoruz.",
        missionTitle: "Misyonumuz",
        missionDesc1: "Veri odaklı akıllı şehir çözümleri geliştirmek.",
        missionDesc2:
          "Toplu taşıma sistemlerini optimize eden, insan odaklı, etik ve sürdürülebilir teknolojiler geliştiriyoruz. 'Gelişimde Teknoloji, İnovasyonda Gelecek' mottosuyla hareket ediyoruz.",
      },
    },
    products: {
      smartMobility: {
        title: "Akıllı Hareketlilik Çözümleri",
        subtitle: "Veri odaklı yaklaşımlar, ileri optimizasyon algoritmaları ve yapay zeka destekli sistemlerle toplu taşıma ağlarını dönüştürüyoruz.",
        items: [
          {
            id: "ow-transitopt",
            title: "OW TransitOpt™",
            icon: Car,
            iconColor: "text-blue-600",
            shortDescription: "Frekans Optimizasyonu: Gerçek Talebe Dayalı Hassas Planlama",
            longDescription: `Bilimsel tahminleme ve özel algoritmalarımızla sefer aralıklarını optimize ederek, en az sayıda araçla en yüksek verimliliği sağlarız. Modellerimiz, yolcu akış desenlerini, hava koşullarını ve özel etkinlikleri gerçek zamanlı olarak analiz ederek optimal hizmet aralıkları sunar. Bu sayede, toplu taşıma hizmetleri, anlık taleplere göre dinamik olarak ayarlanabilir, gereksiz boş seferler minimize edilir ve yolcu bekleme süreleri önemli ölçüde azalır.`,
          },
          {
            id: "ow-fleetopt",
            title: "OW FleetOpt™",
            icon: Bus,
            iconColor: "text-green-600",
            shortDescription: "Filo Optimizasyonu: Daha Akıllı Kaynak Tahsisi, Daha Düşük Maliyetler",
            longDescription: `Matematiksel ve sezgisel yaklaşımları birleştirerek, filonuzun kapasitesini zamansal talep desenleriyle uyumlu hale getirir ve boş kilometreleri (dead mileage) minimize ederiz. Gelişmiş algoritmalar, ağınız genelinde optimal araç ve sürücü dağıtımını sağlar. Bu, araçların en verimli şekilde kullanılmasına, yakıt tüketiminin azaltılmasına ve operasyonel maliyetlerin düşürülmesine doğrudan katkıda bulunur.`,
          },
          {
            id: "ow-ridersense",
            title: "OW RiderSense™",
            icon: TrendingUp,
            iconColor: "text-purple-600",
            shortDescription: "Yolcu yoğunluğunu önceden tahmin edin.",
            longDescription: `Gerçek zamanlı yolcu hareketleri, geçmiş veriler ve davranışsal analizlerle birleşir. Bu sistem, saatlik, bölgesel ve mevsimsel yolcu yoğunluklarını tahmin ederek ulaşım planlamacılarına dinamik sefer planlaması sağlar. Kalabalık duraklarda önleyici sefer artışı, düşük yoğunlukta kaynak optimizasyonu mümkün olur.`,
          },
          {
            id: "ow-costlogic",
            title: "OW CostLogic™",
            icon: DollarSign,
            iconColor: "text-yellow-600",
            shortDescription: "Ulaşım yatırımlarını doğru yere yönlendirin.",
            longDescription: `Güzergâh bazlı maliyet analizi yaparak, karar vericilere detaylı ve gerçek zamanlı bütçe görünürlüğü sunar. Yakıt tüketimi, bakım maliyetleri, personel dağılımı ve yolcu başı maliyet gibi kalemleri analiz ederek; stratejik yatırım planlaması ve kaynak verimliliği sağlar.`,
          },
        ],
      },
      smartTransport: {
        title: "Akıllı Ulaşım Teknolojileri",
        subtitle: "Akıllı Şehirler temasının merkezinde yer alan 'Akıllı Hareketlilik' ve 'Akıllı Ulaşım' alanlarında öncü çözümler.",
        items: [
          {
            id: "ow-drt",
            title: "OW DRT™",
            icon: Route,
            iconColor: "text-orange-600",
            shortDescription: "Talep Bazlı Toplu Taşıma: Kırsal ve Düşük Yoğunluklu Alanlar İçin Uyarlanabilir Ulaşım",
            longDescription: `Kullanıcı uygulamaları, rota tahmini ve gerçek zamanlı tahsisi birleştirerek, yetersiz hizmet alan bölgeler için esnek, talebe dayalı toplu taşıma çözümlerine öncülük ediyoruz. Geleneksel sabit rotaların verimsiz olduğu kırsal ve düşük yoğunluklu alanlarda, vatandaşların ihtiyaçlarına göre anlık olarak rota ve sefer oluşturulmasını sağlar. Dinamik rota belirleme ve mobil tabanlı rezervasyon sistemleriyle, kırsal bölgelerde %40'ın üzerinde hizmet kullanım artışı ve %200'ün üzerinde kapsama alanı genişlemesi sağlar.`,
          },
          {
            id: "ow-accessibility",
            title: "OW Accessibility™",
            icon: MapPin,
            iconColor: "text-red-600",
            shortDescription: "Erişilebilirlik Analizi: Kentsel Transit Erişimi İçin Dijital Ölçüm",
            longDescription: `Büyük Veri Analizi ve AHP/TOPSIS gibi çok kriterli karar verme yöntemlerini kullanarak kentsel toplu taşıma erişim seviyelerini dijital olarak belirleriz. Bu, şehirlerin yetersiz hizmet alanlarını tespit etmelerine ve altyapı iyileştirmelerine öncelik vermelerine yardımcı olur. Engelli bireylerin, yaşlıların ve diğer özel ihtiyaç sahiplerinin toplu taşıma hizmetlerine erişimini detaylı bir şekilde analiz ederiz.`,
          },
          {
            id: "ow-odmatrix",
            title: "OW ODMatrix™",
            icon: BarChart3,
            iconColor: "text-indigo-600",
            shortDescription: "Kaynak-Hedef Matrisleri: Büyük Veri Destekli Seyahat Modeli Analizi",
            longDescription: `Gelişmiş OD matrislerimiz, transit ağınızdaki seyahat modellerini haritalamak için büyük veri analitiği ve iniş tahmini algoritmalarını kullanır. Bu, yolcu akışları hakkında eşi benzeri görülmemiş bir içgörü sağlayarak hedeflenen hizmet iyileştirmelerine ve kaynak tahsisine olanak tanır. 10 milyondan fazla veri noktasını analiz ederek %94'lük rota doğruluğu ve %60'ın üzerinde planlama verimliliği sağlar.`,
          },
          {
            id: "ow-intelligence",
            title: "OW Intelligence™",
            icon: Brain,
            iconColor: "text-green-600",
            shortDescription: "İş Zekası Çözümleri: Transit Verilerini Eyleme Dönüştürülebilir Bilgiye Dönüştürün",
            longDescription: `Veri ambarlamadan dinamik Power BI gösterge tablolarına kadar, toplu taşıma verilerini merkezileştirir, analiz eder ve görselleştirerek kalıpları ortaya çıkarır, temel performans göstergelerini (KPI) izler ve uzun vadeli ulaşım stratejilerini bilgilendiririz. Gerçek zamanlı analitik, kanıta dayalı karar almayı destekler. Bu sayede şehir yöneticileri, ulaşım ağının performansını anlık olarak izleyebilir, sorunlu alanları tespit edebilir ve geleceğe yönelik stratejik kararlar alabilirler.`,
          },
        ],
      },
    },
    sectors: {
      subtitle: "Akıllı şehir çözümlerimiz, her kurumun kendi dinamiklerine uygun şekilde uyarlanabilir.",
      items: [
        {
          id: "municipalities-transport",
          title: "Belediyeler & Ulaşım Daireleri",
          icon: Building,
          iconColor: "text-green-600",
          shortDescription: "Şehir içi ulaşım ağları için bilimsel planlama gücü.",
          longDescription: `Hat optimizasyonu, yolcu yoğunluğu tahmini, karbon ayak izi analizi gibi veriye dayalı çözümlerle toplu taşıma sistemleri daha akıllı, maliyetler daha düşük hale gelir. %30 zaman tasarrufu, %25 maliyet azaltma ve %99.9 çalışma süresi ile kanıtlanmış sonuçlar sunarız.`,
        },
        {
          id: "smart-city-projects",
          title: "Akıllı Şehir Projeleri",
          icon: City,
          iconColor: "text-purple-600",
          shortDescription: "Akıllı Hareketlilik ve Akıllı Ulaşım odaklı kent zekâsı.",
          longDescription: `OW, şehirlerin farklı altyapı sistemlerini tek çatı altında analiz ederek sürdürülebilir, insan odaklı şehir yaşamını mümkün kılar. Akıllı Şehirler, Akıllı İnsanlar, Akıllı Ekonomi, Akıllı Çevre, Akıllı Hareketlilik, Akıllı Ulaşım, Akıllı Yönetişim ve Akıllı Yaşam temalarıyla çözümler sunarız.`,
        },
        {
          id: "universities-research",
          title: "Üniversiteler & Araştırma Kurumları",
          icon: GraduationCap,
          iconColor: "text-orange-600",
          shortDescription: "Bilimsel analizlerde güçlü veri altyapısı ve yapay zekâ desteği.",
          longDescription: `Araştırma projelerinde büyük veri setlerinin temizlenmesi, analizi ve görselleştirilmesi için ideal platform. Özellikle akıllı şehir planlama ve ulaşım alanlarında veri güdümlü akademik çalışmaları destekler. İKÇÜ ve Yaşar Üniversitesi ile işbirliği yaparak, bölgenin Ar-Ge ve inovasyon kapasitesini güçlendiriyoruz.`,
        },
        {
          id: "ministries-public",
          title: "Ulaşım Bakanlıkları & Kamu Kurumları",
          icon: Government,
          iconColor: "text-red-600",
          shortDescription: "Ulusal düzeyde akıllı ulaşım politikalarını veriyle şekillendirin.",
          longDescription: `Karar destek sistemleri, ulaşım modelleme ve sistem entegrasyonu alanlarında OW, kamu kurumlarına kapsamlı analiz ve izleme araçları sunar. Veriye dayalı politika üretiminin temelini oluşturur. 5746 Sayılı Kanun kapsamında Ar-Ge ve inovasyon faaliyetlerini destekler.`,
        },
        {
          id: "technology-startups",
          title: "Teknoloji Girişimleri & Start-up'lar",
          icon: Sparkles,
          iconColor: "text-blue-600",
          shortDescription: "Yenilikçi projelere yönelme, patent alma ve şirket kurma desteği.",
          longDescription: `OW olarak, yenilikçi iş fikirlerimizi ticarileştirme ve patent ile lisans değerleriyle yatırımcılarla buluşturma potansiyeli yüksek bir start-up firmasıyız. Faaliyet gösterdiğimiz ekosistemin desteğiyle büyümemizi hızlandırıyoruz.`,
        },
      ],
    },
    successStories: {
      subtitle: "Systems optimized with OW solutions provide measurable benefits in the field.",
      items: [
        {
          id: "izmir-transport",
          title: "İzmir Transportation Network Optimization",
          icon: Route,
          iconColor: "text-blue-600",
          shortDescription: "Bus routes were restructured with scientific analysis with İzmir Metropolitan Municipality.",
          longDescription: `In this project carried out with İzmir Metropolitan Municipality, all bus routes were restructured with scientific analysis using OW TransitOpt™ algorithms. Result: 18% shorter average travel time, 22% lower operating costs, significant increase in fleet efficiency.`,
        },
        {
          id: "hospital-early-diagnosis",
          title: "Early Diagnosis with OW Decisions™ in Public Hospital",
          icon: Stethoscope,
          iconColor: "text-green-600",
          shortDescription: "The diagnostic process was supported with data-driven recommendations in a medium-sized state hospital.",
          longDescription: `In a medium-sized state hospital, the diagnostic process was supported with data-driven recommendations using the OW Decisions™ decision support system. Result: Average diagnosis time for critical patients was shortened by 35%, and the rate of referral to correct treatment increased.`,
        },
        {
          id: "passenger-density-cost-saving",
          title: "Cost Savings with Passenger Density Modeling",
          icon: Users,
          iconColor: "text-purple-600",
          shortDescription: "Savings were achieved in the municipal public transportation system with real-time passenger prediction model.",
          longDescription: `A real-time passenger prediction model was established in a municipal public transportation system with the OW RiderSense™ platform. Result: Flight planning was optimized according to demand, 40% reduction in density-related complaints, 19% savings in total operation costs.`,
        },
        {
          id: "dead-km-minimization",
          title: "Data-Driven Dead Km Minimization Model",
          icon: Truck,
          iconColor: "text-orange-600",
          shortDescription: "Solutions were implemented to reduce dead kilometers in fleet planning.",
          longDescription: `OW CostLogic™ and TransitOpt™ were applied together to reduce dead kilometers in fleet planning. Result: By optimizing garage-route matches, daily total dead km was reduced by 26%. Both fuel costs and carbon emissions were significantly reduced.`,
        },
      ],
    },
    contact: {
      subtitle:
        "Whether you want to see a demo, reach out for strategic collaboration or press contact — the OW team is ready to respond.",
      items: [
        {
          id: "demo-form",
          title: "Quick Demo Form",
          icon: FormInput,
          iconColor: "text-blue-600",
          shortDescription: "Would you like to see how OW solutions work for your organization?",
          longDescription: `Fill out the form and let's contact you with a demo specially prepared for your needs.
        <br/><br/>
        **Required fields:** Name – Organization – Email – Solution of interest – Message
        <br/>
        **Response time:** Reply within 24 hours.`,
        },
        {
          id: "partnership-application",
          title: "Partnership Application",
          icon: Handshake,
          iconColor: "text-green-600",
          shortDescription:
            "A dedicated contact area for companies wishing to integrate OW technologies, co-develop products, or apply for distributorship.",
          longDescription: `We are open to global technology collaborations.`,
        },
        {
          id: "press-media",
          title: "Press & Media Communication",
          icon: Newspaper,
          iconColor: "text-purple-600",
          shortDescription:
            "Media representatives can contact us directly for interviews, press kits, sector analyses, or events.",
          longDescription: `Our corporate identity kit and press releases are sent upon request.`,
        },
        {
          id: "locations",
          title: "Locations & Representatives",
          icon: Map,
          iconColor: "text-orange-600",
          shortDescription: "OW is based in Turkey and has a representative network in Europe and the USA.",
          longDescription: `The page should include location display on a map and a list of representatives to contact directly via email.
        <br/><br/>
        **Contact Information:**
        <br/>
        <Mail className="inline-block w-4 h-4 mr-2" /> Email: info@ow.com
        <br/>
        <Phone className="inline-block w-4 h-4 mr-2" /> Phone: 02322353535
        <br/><br/>
        **📌 Example:**
        <br/>
        **İzmir — Headquarters:** Gazi Mustafa Kemal District, Kaynaklar Street Seyrek, Menemen, İzmir
        <br/>
        **Berlin — European Operations**
        <br/>
        **Seattle — American Representation**`,
        },
      ],
    },
    ekibimiz: {
      // New section for Ekibimiz
      subtitle:
        "OW ekibi; analitik zekâsı, sistem yaklaşımı ve etik duruşuyla veriyi dünyayı dönüştürmek için kullanan uzmanlardan oluşur.",
      items: [
        {
          id: "akademisyen-istatistikci",
          title: "İstatistik Uzmanı",
          icon: BarChart3,
          iconColor: "text-blue-600",
          shortDescription: "Sayılarla geleceği öngörüyor.",
          longDescription:
            "Tıbbi ve kentsel verilerin istatistiksel modellemelerinde derinleşmiş, akademik yayınlarıyla tanınan ekip üyemiz; algoritmalarımızın bilimsel temelini güçlendirir.",
        },
        {
          id: "ekonomist",
          title: "Ekonomist",
          icon: DollarSign,
          iconColor: "text-green-600",
          shortDescription: "Verimliliği sadece maliyetle değil, yaşam kalitesiyle ölçüyor.",
          longDescription:
            "Ulaşım ve sağlık yatırımlarının sosyoekonomik etkilerini analiz eder. Sürdürülebilir ve adil kaynak kullanımı için OW'nin karar motorlarına ekonomik perspektif kazandırır.",
        },
        {
          id: "veri-muhendisi",
          title: "Veri Mühendisi",
          icon: Database,
          iconColor: "text-purple-600",
          shortDescription: "Verinin kaostan düzene geçtiği kişi.",
          longDescription:
            "Çok kaynaklı büyük veri akışlarını filtreleyen, işleyen ve anlamlı hale getiren mimar. OW platformunun veri omurgasını inşa eder, güvenli ve ölçeklenebilir veri sistemleri kurar.",
        },
        {
          id: "yuksek-sehir-plancisi",
          title: "Yüksek Şehir Plancısı",
          icon: City,
          iconColor: "text-orange-600",
          shortDescription: "Şehri sadece yollarla değil, insanla birlikte tasarlar.",
          longDescription:
            "Toplu taşıma, sağlık erişimi ve çevresel etki gibi çok boyutlu analizlerle kentlerin daha sağlıklı ve kapsayıcı hale gelmesi için çalışır. İnsan odaklı akıllı şehir vizyonunun taşıyıcısıdır.",
        },
        {
          id: "sistem-muhendisi",
          title: "Sistem Mühendisi",
          icon: Puzzle,
          iconColor: "text-red-600",
          shortDescription: "Her bileşeni bir bütün içinde optimize eder.",
          longDescription:
            "OW'nin yazılım, algoritma ve entegrasyon süreçlerinin ardındaki sistemsel akıl. Farklı modüllerin birlikte çalışmasını sağlayan mimari kurgunun yaratıcısıdır.",
        },
      ],
    },
    hero: {
      cta: "Tıbbi veri analizinde yeni nesil yaklaşımlar",
      slogan: "Sağlık Sistemleri için Akıllı Analitik [♡] Sağlıklı Kent Çözümleri",
    },
    bottomTags: {
      explore: "Keşfet:",
      tags: ["Tıbbi Veri Analizi", "Karar Destek", "Yapay Zeka Uygulamaları", "Klinik Araştırmalar"],
    },
    ctaModal: {
      title: "OW – Optimize the World",
      description: "Veri odaklı karar destek sistemleriyle daha sağlıklı, daha verimli bir dünya inşa ediyoruz.",
      overview:
        "OW, sağlık sistemleri ve kentsel altyapılar için veri bilimi, optimizasyon algoritmaları ve yapay zekâ temelli çözümler geliştiren çok disiplinli bir teknoloji kuruluşudur. Temel hedefimiz; kamu ve özel sektör kurumlarının karar alma süreçlerini bilimsel yöntemlerle güçlendirmek, kaynak kullanımını optimize etmek ve hizmet kalitesini ölçülebilir biçimde artırmaktır.",
      expertiseAreas: {
        title: "Uzmanlık Alanlarımız",
        healthSystems: {
          title: "🩺 Sağlık Sistemleri İçin Karar Destek Çözümleri",
          description:
            "OW; hastaneler, klinikler, aile sağlığı merkezleri ve sağlık bakanlıkları gibi sağlık hizmet sunucularına yönelik olarak, aşağıdaki konularda veri destekli teknolojiler sunar:",
          points: [
            "Klinik karar destek sistemleri",
            "Gerçek zamanlı sağlık verisi analizi",
            "Risk skorlamaları ve erken uyarı algoritmaları",
            "Sağlık hizmet zinciri entegrasyonu",
            "Hasta profilleme ve tedavi optimizasyonu",
          ],
          products:
            "Bu kapsamda geliştirdiğimiz OW Insight™, OW Decisions™ ve OW Signals™ ürün ailesi, tanı-tedavi süreçlerinde doğruluk, hız ve maliyet etkinliği sağlar.",
        },
        healthyCities: {
          title: "Sağlıklı Kentler için Akıllı Kentsel Sistemler",
          description:
            "OW, şehir planlamasında ve toplu taşıma yönetiminde karar vericilere yönelik yüksek doğruluklu analitik modeller ve optimizasyon araçları sunar:",
          points: [
            "Ulaşım ağı optimizasyonu",
            "Yolcu yoğunluğu tahmini",
            "Ölü kilometre (dead mileage) azaltımı",
            "Karbon salımı ve çevresel etki analizleri",
            "Kentsel sağlık hizmetlerine erişim modellemeleri",
          ],
          products:
            "Bu doğrultuda geliştirilen OW TransitOpt™, OW RiderSense™ ve OW CostLogic™ çözümleri, kentlerin hem operasyonel verimliliğini hem de sürdürülebilirlik hedeflerini destekler.",
        },
      },
      scientificApproach: {
        title: "Bilimsel Yaklaşım ve Multidisipliner Ekip",
        description:
          "OW bünyesindeki ekip; istatistik, ekonomi, sistem mühendisliği, şehir planlama, bilgisayar bilimi ve sağlık bilimleri gibi farklı alanlardan gelen uzmanlardan oluşur. Bu sayede her çözümümüz; akademik geçerliliği olan, sahada test edilmiş ve yüksek etki potansiyeli taşıyan yapılar üzerine inşa edilir.",
      },
    },
  },
  EN: {
    menu: {
      hakkimizda: "About Us",
      cozumlerimiz: "Solutions",
      sektorler: "Sectors",
      basariHikayeleri: "Success Stories",
      iletisim: "Contact",
      ekibimiz: "Our Team", // Renamed from search
    },
    dropdownTitles: {
      hakkimizda: "About Us",
      cozumlerimiz: "Solutions",
      sektorler: "Sectors",
      basariHikayeleri: "Success Stories",
      iletisim: "Contact",
      ekibimiz: "Our Team", // Renamed from search
    },
    dropdownSubtitles: {
      cozumlerimiz: "Innovative Transport Technologies for Smart Cities",
      sektorler: "OW offers optimized smart city solutions tailored for various sectors.",
      basariHikayeleri: "Real data, real results.",
      iletisim: "How can we optimize for you?",
      ekibimiz: "Science, technology, and urban living combined.",
    },
    hakkimizda: {
      bizKimiz: {
        title: "Who Are We?",
        desc1: "OW (Optimize the World) set out to provide scientific and technological solutions to urban mobility challenges faced by cities on a global scale.",
        desc2:
          "Our goal is to transform public transportation networks through data-driven approaches, advanced optimization algorithms, and AI-powered systems, making cities smarter, more efficient, more accessible, and environmentally more sustainable for the future.",
      },
      vizyonMisyon: {
        title: "Vision - Mission",
        visionTitle: "Our Vision",
        visionDesc1: "Shaping the cities of the future.",
        visionDesc2:
          "We aim to contribute to the digital transformation of cities with themes of Smart Cities, Smart People, Smart Economy, Smart Environment, Smart Mobility, Smart Transport, Smart Governance, and Smart Life.",
        missionTitle: "Our Mission",
        missionDesc1: "Developing data-driven smart city solutions.",
        missionDesc2:
          "We develop technologies that optimize public transportation systems, human-centered, ethical, and sustainable. We operate with the motto 'Technology in Development, Future in Innovation'.",
      },
    },
    products: {
      smartMobility: {
        title: "Smart Mobility Solutions",
        subtitle: "We transform public transportation networks through data-driven approaches, advanced optimization algorithms, and AI-powered systems.",
        items: [
          {
            id: "ow-transitopt",
            title: "OW TransitOpt™",
            icon: Car,
            iconColor: "text-blue-600",
            shortDescription: "Frequency Optimization: Precision Planning Based on Real Demand",
            longDescription: `We optimize service intervals with scientific forecasting and proprietary algorithms, achieving maximum efficiency with minimum vehicles. Our models analyze passenger flow patterns, weather conditions, and special events in real-time to provide optimal service intervals. This enables public transportation services to be dynamically adjusted based on instant demands, minimizing unnecessary empty trips and significantly reducing passenger wait times.`,
          },
          {
            id: "ow-fleetopt",
            title: "OW FleetOpt™",
            icon: Bus,
            iconColor: "text-green-600",
            shortDescription: "Fleet Optimization: Smarter Resource Allocation, Lower Costs",
            longDescription: `By combining mathematical and intuitive approaches, we align your fleet's capacity with temporal demand patterns and minimize dead mileage. Advanced algorithms ensure optimal vehicle and driver distribution across your network. This directly contributes to the most efficient use of vehicles, reduced fuel consumption, and lower operational costs.`,
          },
          {
            id: "ow-ridersense",
            title: "OW RiderSense™",
            icon: TrendingUp,
            iconColor: "text-purple-600",
            shortDescription: "Predict passenger density in advance.",
            longDescription: `Real-time passenger movements combine with historical data and behavioral analyses. This system predicts hourly, regional, and seasonal passenger densities, enabling dynamic scheduling for transportation planners. Proactive service increases at crowded stops and resource optimization during low density become possible.`,
          },
          {
            id: "ow-costlogic",
            title: "OW CostLogic™",
            icon: DollarSign,
            iconColor: "text-yellow-600",
            shortDescription: "Direct transportation investments to the right place.",
            longDescription: `By performing route-based cost analysis, it provides decision-makers with detailed and real-time budget visibility. It analyzes items such as fuel consumption, maintenance costs, personnel distribution, and cost per passenger, ensuring strategic investment planning and resource efficiency.`,
          },
        ],
      },
      smartTransport: {
        title: "Smart Transport Technologies",
        subtitle: "Pioneering solutions in 'Smart Mobility' and 'Smart Transport' areas at the center of Smart Cities theme.",
        items: [
          {
            id: "ow-drt",
            title: "OW DRT™",
            icon: Route,
            iconColor: "text-orange-600",
            shortDescription: "Demand-Responsive Transit: Adaptive Transport for Rural and Low-Density Areas",
            longDescription: `We pioneer flexible, demand-responsive public transportation solutions for underserved areas by combining user applications, route prediction, and real-time allocation. In rural and low-density areas where traditional fixed routes are inefficient, it enables instant route and service creation based on citizens' needs. With dynamic route determination and mobile-based reservation systems, it provides over 40% increase in service usage and over 200% expansion in coverage area in rural regions.`,
          },
          {
            id: "ow-accessibility",
            title: "OW Accessibility™",
            icon: MapPin,
            iconColor: "text-red-600",
            shortDescription: "Accessibility Analysis: Digital Measurement for Urban Transit Access",
            longDescription: `Using Big Data Analysis and multi-criteria decision-making methods like AHP/TOPSIS, we digitally determine urban public transportation access levels. This helps cities identify underserved areas and prioritize infrastructure improvements. We analyze in detail the access of disabled individuals, elderly, and other special needs groups to public transportation services.`,
          },
          {
            id: "ow-odmatrix",
            title: "OW ODMatrix™",
            icon: BarChart3,
            iconColor: "text-indigo-600",
            shortDescription: "Origin-Destination Matrices: Big Data-Supported Travel Model Analysis",
            longDescription: `Our advanced OD matrices map travel patterns in your transit network using big data analytics and boarding prediction algorithms. This provides unprecedented insight into passenger flows, enabling targeted service improvements and resource allocation. Analyzing over 10 million data points, it achieves 94% route accuracy and over 60% planning efficiency.`,
          },
          {
            id: "ow-intelligence",
            title: "OW Intelligence™",
            icon: Brain,
            iconColor: "text-green-600",
            shortDescription: "Business Intelligence Solutions: Transform Transit Data into Actionable Information",
            longDescription: `From data warehousing to dynamic Power BI dashboards, we centralize, analyze, and visualize public transportation data to reveal patterns, monitor key performance indicators (KPIs), and inform long-term transportation strategies. Real-time analytics supports evidence-based decision making. This enables city managers to monitor transportation network performance in real-time, identify problematic areas, and make strategic decisions for the future.`,
          },
        ],
      },
    },
    sectors: {
      subtitle:
        "Our smart city solutions can be adapted to the unique dynamics of each organization.",
      items: [
        {
          id: "municipalities-transport",
          title: "Municipalities & Transport Departments",
          icon: Building,
          iconColor: "text-green-600",
          shortDescription: "Scientific planning power for urban transportation networks.",
          longDescription: `With data-driven solutions such as route optimization, passenger density prediction, and carbon footprint analysis, public transportation systems become smarter and costs become lower. We provide proven results with 30% time savings, 25% cost reduction, and 99.9% uptime.`,
        },
        {
          id: "smart-city-projects",
          title: "Smart City Projects",
          icon: City,
          iconColor: "text-purple-600",
          shortDescription: "Urban intelligence focused on Smart Mobility and Smart Transport.",
          longDescription: `OW enables sustainable, human-centric urban life by analyzing the different infrastructure systems of cities under a single roof. We provide solutions with themes of Smart Cities, Smart People, Smart Economy, Smart Environment, Smart Mobility, Smart Transport, Smart Governance, and Smart Life.`,
        },
        {
          id: "universities-research",
          title: "Universities & Research Institutions",
          icon: GraduationCap,
          iconColor: "text-orange-600",
          shortDescription: "Powerful data infrastructure and AI support for scientific analyses.",
          longDescription: `An ideal platform for cleaning, analyzing, and visualizing large datasets in research projects. It especially supports data-driven academic studies in the fields of smart city planning and transportation. We collaborate with İKÇÜ and Yaşar University to strengthen the region's R&D and innovation capacity.`,
        },
        {
          id: "ministries-public",
          title: "Transport Ministries & Public Institutions",
          icon: Government,
          iconColor: "text-red-600",
          shortDescription: "Shape national smart transport policies with data.",
          longDescription: `In the fields of decision support systems, transport modeling, and system integration, OW provides comprehensive analysis and monitoring tools to public institutions. It forms the foundation of data-driven policy production. We support R&D and innovation activities within the scope of Law No. 5746.`,
        },
        {
          id: "technology-startups",
          title: "Technology Startups & Start-ups",
          icon: Sparkles,
          iconColor: "text-blue-600",
          shortDescription: "Support for innovative projects, patent acquisition, and company formation.",
          longDescription: `As OW, we are a start-up company with high potential to commercialize our innovative business ideas and meet with investors with patent and license values. We accelerate our growth with the support of the ecosystem we operate in.`,
        },
      ],
    },
    successStories: {
      subtitle: "Systems optimized with OW solutions provide measurable benefits in the field.",
      items: [
        {
          id: "izmir-transport",
          title: "İzmir Transportation Network Optimization",
          icon: Route,
          iconColor: "text-blue-600",
          shortDescription: "Bus routes were restructured with scientific analysis with İzmir Metropolitan Municipality.",
          longDescription: `In this project carried out with İzmir Metropolitan Municipality, all bus routes were restructured with scientific analysis using OW TransitOpt™ algorithms. Result: 18% shorter average travel time, 22% lower operating costs, significant increase in fleet efficiency.`,
        },
        {
          id: "hospital-early-diagnosis",
          title: "Early Diagnosis with OW Decisions™ in Public Hospital",
          icon: Stethoscope,
          iconColor: "text-green-600",
          shortDescription: "The diagnostic process was supported with data-driven recommendations in a medium-sized state hospital.",
          longDescription: `In a medium-sized state hospital, the diagnostic process was supported with data-driven recommendations using the OW Decisions™ decision support system. Result: Average diagnosis time for critical patients was shortened by 35%, and the rate of referral to correct treatment increased.`,
        },
        {
          id: "passenger-density-cost-saving",
          title: "Cost Savings with Passenger Density Modeling",
          icon: Users,
          iconColor: "text-purple-600",
          shortDescription: "Savings were achieved in the municipal public transportation system with real-time passenger prediction model.",
          longDescription: `A real-time passenger prediction model was established in a municipal public transportation system with the OW RiderSense™ platform. Result: Flight planning was optimized according to demand, 40% reduction in density-related complaints, 19% savings in total operation costs.`,
        },
        {
          id: "dead-km-minimization",
          title: "Data-Driven Dead Km Minimization Model",
          icon: Truck,
          iconColor: "text-orange-600",
          shortDescription: "Solutions were implemented to reduce dead kilometers in fleet planning.",
          longDescription: `OW CostLogic™ and TransitOpt™ were applied together to reduce dead kilometers in fleet planning. Result: By optimizing garage-route matches, daily total dead km was reduced by 26%. Both fuel costs and carbon emissions were significantly reduced.`,
        },
      ],
    },
    contact: {
      subtitle:
        "Whether you want to see a demo, reach out for strategic collaboration or press contact — the OW team is ready to respond.",
      items: [
        {
          id: "demo-form",
          title: "Quick Demo Form",
          icon: FormInput,
          iconColor: "text-blue-600",
          shortDescription: "Would you like to see how OW solutions work for your organization?",
          longDescription: `Fill out the form and let's contact you with a demo specially prepared for your needs.
        <br/><br/>
        **Required fields:** Name – Organization – Email – Solution of interest – Message
        <br/>
        **Response time:** Reply within 24 hours.`,
        },
        {
          id: "partnership-application",
          title: "Partnership Application",
          icon: Handshake,
          iconColor: "text-green-600",
          shortDescription:
            "A dedicated contact area for companies wishing to integrate OW technologies, co-develop products, or apply for distributorship.",
          longDescription: `We are open to global technology collaborations.`,
        },
        {
          id: "press-media",
          title: "Press & Media Communication",
          icon: Newspaper,
          iconColor: "text-purple-600",
          shortDescription:
            "Media representatives can contact us directly for interviews, press kits, sector analyses, or events.",
          longDescription: `Our corporate identity kit and press releases are sent upon request.`,
        },
        {
          id: "locations",
          title: "Locations & Representatives",
          icon: Map,
          iconColor: "text-orange-600",
          shortDescription: "OW is based in Turkey and has a representative network in Europe and the USA.",
          longDescription: `The page should include location display on a map and a list of representatives to contact directly via email.
        <br/><br/>
        **Contact Information:**
        <br/>
        <Mail className="inline-block w-4 h-4 mr-2" /> Email: info@ow.com
        <br/>
        <Phone className="inline-block w-4 h-4 mr-2" /> Phone: 02322353535
        <br/><br/>
        **📌 Example:**
        <br/>
        **İzmir — Headquarters:** Gazi Mustafa Kemal District, Kaynaklar Street Seyrek, Menemen, İzmir
        <br/>
        **Berlin — European Operations**
        <br/>
        **Seattle — American Representation**`,
        },
      ],
    },
    ekibimiz: {
      // New section for Ekibimiz
      subtitle:
        "Our team at OW consists of experts who use data to transform the world with their analytical intelligence, systemic approach, and ethical stance.",
      items: [
        {
          id: "academic-statistician",
          title: "Academic Statistician",
          icon: BarChart3,
          iconColor: "text-blue-600",
          shortDescription: "Predicting the future with numbers.",
          longDescription:
            "Our team member, specialized in statistical modeling of medical and urban data and known for their academic publications, strengthens the scientific foundation of our algorithms.",
        },
        {
          id: "economist",
          title: "Economist",
          icon: DollarSign,
          iconColor: "text-green-600",
          shortDescription: "Measuring efficiency not just by cost, but by quality of life.",
          longDescription:
            "Analyzes the socioeconomic impacts of transportation and healthcare investments. Brings an economic perspective to OW's decision engines for sustainable and equitable resource utilization.",
        },
        {
          id: "data-engineer",
          title: "Data Engineer",
          icon: Database,
          iconColor: "text-purple-600",
          shortDescription: "The one who transforms data from chaos to order.",
          longDescription:
            "The architect who filters, processes, and makes sense of multi-source big data streams. Builds the data backbone of the OW platform, establishing secure and scalable data systems.",
        },
        {
          id: "urban-planner",
          title: "Senior Urban Planner",
          icon: City,
          iconColor: "text-orange-600",
          shortDescription: "Designs the city not just with roads, but with people.",
          longDescription:
            "Works to make cities healthier and more inclusive through multi-dimensional analyses such as public transportation, health access, and environmental impact. Carries the vision of human-centric smart cities.",
        },
        {
          id: "sistem-muhendisi",
          title: "System Engineer",
          icon: Puzzle,
          iconColor: "text-red-600",
          shortDescription: "Optimizes every component within a whole.",
          longDescription:
            "The systemic mind behind OW's software, algorithms, and integration processes. The creator of the architectural setup that enables different modules to work together.",
        },
      ],
    },
    hero: {
      cta: "Akıllı şehirler için veri odaklı çözümler",
      slogan: "Akıllı Hareketlilik Çözümleri [♡] Akıllı Ulaşım Teknolojileri",
    },
    bottomTags: {
      explore: "Keşfet:",
      tags: ["Smart City Planning", "Transport Optimization", "AI Applications", "Urban Analytics"],
    },
    ctaModal: {
      title: "OW – Optimize the World",
      description: "Veri odaklı karar destek sistemleriyle daha akıllı, daha verimli bir dünya inşa ediyoruz.",
      overview:
        "OW, akıllı şehirler ve kentsel altyapılar için veri bilimi, optimizasyon algoritmaları ve yapay zeka tabanlı çözümler geliştiren çok disiplinli bir teknoloji organizasyonudur. Ana hedefimiz, kamu ve özel sektör kurumlarının karar verme süreçlerini bilimsel yöntemlerle güçlendirmek, kaynak kullanımını optimize etmek ve hizmet kalitesini ölçülebilir şekilde artırmaktır.",
      expertiseAreas: {
        title: "Uzmanlık Alanlarımız",
        healthSystems: {
          title: "🚌 Akıllı Hareketlilik Çözümleri",
          description:
            "OW, belediyeler, ulaşım daireleri ve ulaşım bakanlıkları gibi kurumlara aşağıdaki alanlarda veri destekli teknolojiler sunar:",
          points: [
            "Toplu taşıma ağı optimizasyonu",
            "Gerçek zamanlı yolcu yoğunluğu tahmini",
            "Boş kilometre azaltma",
            "Karbon emisyonu ve çevresel etki analizleri",
            "Kentsel ulaşım erişim modellemesi",
          ],
          products:
            "Bu bağlamda geliştirilen OW TransitOpt™, OW RiderSense™ ve OW CostLogic™ ürün ailemiz, ulaşım planlama süreçlerinde verimlilik, hız ve maliyet etkinliği sağlar.",
        },
        healthyCities: {
          title: "Akıllı Şehirler İçin Akıllı Ulaşım Teknolojileri",
          description:
            "OW, şehir planlama ve toplu taşıma yönetimindeki karar vericiler için yüksek doğruluklu analitik modeller ve optimizasyon araçları sunar:",
          points: [
            "Talep bazlı toplu taşıma",
            "Erişilebilirlik analizi",
            "Kaynak-hedef matris analizi",
            "İş zekası çözümleri",
            "Kentsel hareketlilik modellemesi",
          ],
          products:
            "Bu amaçla geliştirilen OW DRT™, OW Accessibility™ ve OW Intelligence™ çözümleri, şehirlerin hem operasyonel verimlilik hem de sürdürülebilirlik hedeflerini destekler.",
        },
      },
      scientificApproach: {
        title: "Bilimsel Yaklaşım ve Çok Disiplinli Ekip",
        description:
          "OW içindeki ekip, istatistik, ekonomi, sistem mühendisliği, şehir planlama, bilgisayar bilimi ve ulaşım bilimleri gibi farklı alanlardan uzmanlardan oluşur. Böylece, her çözümümüz akademik olarak doğrulanmış, sahada test edilmiş ve yüksek etki potansiyeline sahip yapılar üzerine inşa edilir.",
      },
    },
  },
  DE: {
    menu: {
      hakkimizda: "Über uns",
      cozumlerimiz: "Unsere Lösungen",
      sektorler: "Sektoren",
      basariHikayeleri: "Erfolgsgeschichten",
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
    hakkimizda: {
      bizKimiz: {
        title: "Wer sind wir?",
        desc1:
          "OW (Optimize the World) hat sich zum Ziel gesetzt, wissenschaftliche und technologische Lösungen für die urbanen Mobilitätsherausforderungen zu bieten, denen Städte weltweit gegenüberstehen.",
        desc2:
          "Unser Ziel ist es, öffentliche Verkehrsnetze durch datengestützte Ansätze, fortschrittliche Optimierungsalgorithmen und KI-gestützte Systeme zu transformieren und Städte intelligenter, effizienter, zugänglicher und umweltverträglicher für die Zukunft zu machen.",
      },
      vizyonMisyon: {
        title: "Vision - Mission",
        visionTitle: "Unsere Vision",
        visionDesc1: "Die Städte der Zukunft gestalten.",
        visionDesc2: "Wir zielen darauf ab, zur digitalen Transformation von Städten mit den Themen Smart Cities, Smart People, Smart Economy, Smart Environment, Smart Mobility, Smart Transport, Smart Governance und Smart Life beizutragen.",
        missionTitle: "Unsere Mission",
        missionDesc1: "Datengestützte Smart-City-Lösungen entwickeln.",
        missionDesc2:
          "Wir entwickeln Technologien, die öffentliche Verkehrssysteme optimieren, menschenzentriert, ethisch und nachhaltig. Wir arbeiten nach dem Motto 'Technologie in der Entwicklung, Zukunft in der Innovation'.",
      },
    },
    products: {
      smartMobility: {
        title: "Smart Mobility Lösungen",
        subtitle: "Wir transformieren öffentliche Verkehrsnetze durch datengestützte Ansätze, fortschrittliche Optimierungsalgorithmen und KI-gestützte Systeme.",
        items: [
          {
            id: "ow-transitopt",
            title: "OW TransitOpt™",
            icon: Car,
            iconColor: "text-blue-600",
            shortDescription: "Frequenzoptimierung: Präzise Planung basierend auf echter Nachfrage",
            longDescription: `Wir optimieren Serviceintervalle mit wissenschaftlicher Vorhersage und proprietären Algorithmen und erreichen maximale Effizienz mit minimalen Fahrzeugen. Unsere Modelle analysieren Passagierflussmuster, Wetterbedingungen und besondere Ereignisse in Echtzeit, um optimale Serviceintervalle zu bieten. Dies ermöglicht es öffentlichen Verkehrsdiensten, dynamisch basierend auf sofortigen Anforderungen angepasst zu werden, unnötige Leerfahrten zu minimieren und Wartezeiten der Passagiere erheblich zu reduzieren.`,
          },
          {
            id: "ow-fleetopt",
            title: "OW FleetOpt™",
            icon: Bus,
            iconColor: "text-green-600",
            shortDescription: "Flottenoptimierung: Intelligentere Ressourcenzuteilung, niedrigere Kosten",
            longDescription: `Durch die Kombination mathematischer und intuitiver Ansätze passen wir die Kapazität Ihrer Flotte an zeitliche Nachfragemuster an und minimieren tote Kilometer. Fortschrittliche Algorithmen gewährleisten eine optimale Fahrzeug- und Fahrerverteilung in Ihrem Netzwerk. Dies trägt direkt zur effizientesten Nutzung von Fahrzeugen, reduziertem Kraftstoffverbrauch und niedrigeren Betriebskosten bei.`,
          },
          {
            id: "ow-ridersense",
            title: "OW RiderSense™",
            icon: TrendingUp,
            iconColor: "text-purple-600",
            shortDescription: "Passagierdichte im Voraus vorhersagen.",
            longDescription: `Echtzeit-Passagierbewegungen verbinden sich mit historischen Daten und Verhaltensanalysen. Dieses System prognostiziert stündliche, regionale und saisonale Passagierdichten und ermöglicht Verkehrsplanern dynamische Fahrplanplanung. Proaktive Serviceerhöhungen an überfüllten Haltestellen und Ressourcenoptimierung bei niedriger Dichte werden möglich.`,
          },
          {
            id: "ow-costlogic",
            title: "OW CostLogic™",
            icon: DollarSign,
            iconColor: "text-yellow-600",
            shortDescription: "Verkehrsinvestitionen an den richtigen Ort lenken.",
            longDescription: `Durch routenbasierte Kostenanalyse bietet es Entscheidungsträgern detaillierte und Echtzeit-Budgettransparenz. Es analysiert Posten wie Kraftstoffverbrauch, Wartungskosten, Personaleinsatz und Kosten pro Passagier und gewährleistet strategische Investitionsplanung und Ressourceneffizienz.`,
          },
        ],
      },
      smartTransport: {
        title: "Smart Transport Technologien",
        subtitle: "Pionierlösungen in den Bereichen 'Smart Mobility' und 'Smart Transport' im Zentrum des Smart Cities Themas.",
        items: [
          {
            id: "ow-drt",
            title: "OW DRT™",
            icon: Route,
            iconColor: "text-orange-600",
            shortDescription: "Bedarfsgesteuerter Verkehr: Adaptiver Transport für ländliche und dünn besiedelte Gebiete",
            longDescription: `Wir sind Pioniere flexibler, bedarfsgesteuerter öffentlicher Verkehrslösungen für unterversorgte Gebiete durch die Kombination von Benutzeranwendungen, Routenvorhersage und Echtzeit-Zuteilung. In ländlichen und dünn besiedelten Gebieten, wo traditionelle feste Routen ineffizient sind, ermöglicht es die sofortige Erstellung von Routen und Diensten basierend auf den Bedürfnissen der Bürger. Mit dynamischer Routenbestimmung und mobilbasierten Reservierungssystemen bietet es über 40% Steigerung der Servicenutzung und über 200% Erweiterung der Abdeckung in ländlichen Regionen.`,
          },
          {
            id: "ow-accessibility",
            title: "OW Accessibility™",
            icon: MapPin,
            iconColor: "text-red-600",
            shortDescription: "Zugänglichkeitsanalyse: Digitale Messung für urbanen Transitzugang",
            longDescription: `Mit Big Data Analysis und mehrkriteriellen Entscheidungsmethoden wie AHP/TOPSIS bestimmen wir digital die Zugangsebenen des städtischen öffentlichen Verkehrs. Dies hilft Städten, unterversorgte Gebiete zu identifizieren und Infrastrukturverbesserungen zu priorisieren. Wir analysieren detailliert den Zugang von Menschen mit Behinderungen, älteren Menschen und anderen Menschen mit besonderen Bedürfnissen zu öffentlichen Verkehrsdiensten.`,
          },
          {
            id: "ow-odmatrix",
            title: "OW ODMatrix™",
            icon: BarChart3,
            iconColor: "text-indigo-600",
            shortDescription: "Ursprung-Ziel-Matrizen: Big Data-gestützte Reise-Modellanalyse",
            longDescription: `Unsere fortschrittlichen OD-Matrizen kartieren Reiseverhalten in Ihrem Transitnetzwerk mit Big Data Analytics und Einsteigevorhersage-Algorithmen. Dies bietet beispiellose Einblicke in Passagierströme und ermöglicht gezielte Serviceverbesserungen und Ressourcenzuteilung. Durch die Analyse von über 10 Millionen Datenpunkten erreicht es 94% Routengenauigkeit und über 60% Planungseffizienz.`,
          },
          {
            id: "ow-intelligence",
            title: "OW Intelligence™",
            icon: Brain,
            iconColor: "text-green-600",
            shortDescription: "Business Intelligence Lösungen: Transformieren Sie Transitdaten in handlungsfähige Informationen",
            longDescription: `Von Data Warehousing bis hin zu dynamischen Power BI Dashboards zentralisieren, analysieren und visualisieren wir öffentliche Verkehrsdaten, um Muster zu enthüllen, Key Performance Indicators (KPIs) zu überwachen und langfristige Verkehrsstrategien zu informieren. Echtzeit-Analytik unterstützt evidenzbasierte Entscheidungsfindung. Dies ermöglicht es Stadtmanagern, die Leistung des Verkehrsnetzes in Echtzeit zu überwachen, problematische Bereiche zu identifizieren und strategische Entscheidungen für die Zukunft zu treffen.`,
          },
        ],
      },
    },
    sectors: {
      subtitle: "Unsere Smart-City-Lösungen können an die einzigartigen Dynamiken jeder Organisation angepasst werden.",
      items: [
        {
          id: "municipalities-transport",
          title: "Gemeinden & Verkehrsabteilungen",
          icon: Building,
          iconColor: "text-green-600",
          shortDescription: "Wissenschaftliche Planungskraft für städtische Verkehrsnetze.",
          longDescription: `Mit datengestützten Lösungen wie Routenoptimierung, Passagierdichtevorhersage und CO2-Fußabdruckanalyse werden öffentliche Verkehrssysteme intelligenter und Kosten werden niedriger. Wir bieten nachgewiesene Ergebnisse mit 30% Zeiteinsparung, 25% Kostenreduzierung und 99,9% Verfügbarkeit.`,
        },
        {
          id: "smart-city-projects",
          title: "Smart City Projekte",
          icon: City,
          iconColor: "text-purple-600",
          shortDescription: "Urbane Intelligenz fokussiert auf Smart Mobility und Smart Transport.",
          longDescription: `OW ermöglicht nachhaltiges, menschenzentriertes urbanes Leben durch die Analyse verschiedener Infrastruktursysteme von Städten unter einem Dach. Wir bieten Lösungen mit den Themen Smart Cities, Smart People, Smart Economy, Smart Environment, Smart Mobility, Smart Transport, Smart Governance und Smart Life.`,
        },
        {
          id: "universities-research",
          title: "Universitäten & Forschungseinrichtungen",
          icon: GraduationCap,
          iconColor: "text-orange-600",
          shortDescription: "Leistungsstarke Dateninfrastruktur und KI-Unterstützung für wissenschaftliche Analysen.",
          longDescription: `Eine ideale Plattform für die Bereinigung, Analyse und Visualisierung großer Datensätze in Forschungsprojekten. Sie unterstützt besonders datengestützte akademische Studien in den Bereichen Smart City Planung und Verkehr. Wir arbeiten mit İKÇÜ und Yaşar Universität zusammen, um die F&E- und Innovationskapazität der Region zu stärken.`,
        },
        {
          id: "ministries-public",
          title: "Verkehrsministerien & Öffentliche Einrichtungen",
          icon: Government,
          iconColor: "text-red-600",
          shortDescription: "Gestalten Sie nationale Smart-Transport-Politiken mit Daten.",
          longDescription: `In den Bereichen Entscheidungsunterstützungssysteme, Verkehrsmodellierung und Systemintegration bietet OW öffentlichen Einrichtungen umfassende Analyse- und Überwachungstools. Es bildet die Grundlage datengestützter Politikproduktion. Wir unterstützen F&E- und Innovationsaktivitäten im Rahmen des Gesetzes Nr. 5746.`,
        },
        {
          id: "technology-startups",
          title: "Technologie-Startups & Start-ups",
          icon: Sparkles,
          iconColor: "text-blue-600",
          shortDescription: "Unterstützung für innovative Projekte, Patentakquisition und Unternehmensgründung.",
          longDescription: `Als OW sind wir ein Startup-Unternehmen mit hohem Potenzial, unsere innovativen Geschäftsideen zu kommerzialisieren und uns mit Investoren mit Patent- und Lizenzwerten zu treffen. Wir beschleunigen unser Wachstum mit der Unterstützung des Ökosystems, in dem wir tätig sind.`,
        },
      ],
    },
    successStories: {
      subtitle: "Mit OW-Lösungen optimierte Systeme bieten messbare Vorteile im Feld.",
      items: [
        {
          id: "izmir-transport",
          title: "İzmir Verkehrsnetzoptimierung",
          icon: Route,
          iconColor: "text-blue-600",
          shortDescription: "Buslinien wurden mit wissenschaftlicher Analyse mit der İzmir Metropolitan Municipality neu strukturiert.",
          longDescription: `In diesem mit der İzmir Metropolitan Municipality durchgeführten Projekt wurden alle Buslinien mit wissenschaftlicher Analyse unter Verwendung von OW TransitOpt™ Algorithmen neu strukturiert. Ergebnis: 18% kürzere durchschnittliche Reisezeit, 22% niedrigere Betriebskosten, signifikante Steigerung der Flotteneffizienz.`,
        },
        {
          id: "passenger-density-cost-saving",
          title: "Kosteneinsparungen mit Passagierdichte-Modellierung",
          icon: Users,
          iconColor: "text-purple-600",
          shortDescription: "Einsparungen wurden im kommunalen öffentlichen Verkehrssystem mit Echtzeit-Passagiervorhersagemodell erzielt.",
          longDescription: `Ein Echtzeit-Passagiervorhersagemodell wurde in einem kommunalen öffentlichen Verkehrssystem mit der OW RiderSense™ Plattform etabliert. Ergebnis: Fahrplanplanung wurde nach Nachfrage optimiert, 40% Reduzierung dichte-bezogener Beschwerden, 19% Einsparungen bei den Gesamtbetriebskosten.`,
        },
        {
          id: "dead-km-minimization",
          title: "Datengestütztes Dead-Km-Minimierungsmodell",
          icon: Truck,
          iconColor: "text-orange-600",
          shortDescription: "Lösungen wurden implementiert, um tote Kilometer in der Flottenplanung zu reduzieren.",
          longDescription: `OW CostLogic™ und TransitOpt™ wurden zusammen angewendet, um tote Kilometer in der Flottenplanung zu reduzieren. Ergebnis: Durch Optimierung der Garage-Route-Matches wurde der tägliche Gesamt-Dead-Km um 26% reduziert. Sowohl Kraftstoffkosten als auch CO2-Emissionen wurden erheblich reduziert.`,
        },
        {
          id: "smart-city-integration",
          title: "Smart City Integration Projekt",
          icon: City,
          iconColor: "text-green-600",
          shortDescription: "Vollständige Integration von Verkehrs- und Umweltdaten für eine nachhaltige Stadtplanung.",
          longDescription: `Ein umfassendes Smart City Projekt, das Verkehrs-, Umwelt- und Sozialdaten integriert, um nachhaltige Stadtplanungsentscheidungen zu unterstützen. Ergebnis: 35% Verbesserung der Verkehrseffizienz, 28% Reduzierung der Umweltbelastung und signifikante Verbesserung der Lebensqualität der Bürger.`,
        },
      ],
    },
    contact: {
      subtitle: "Lassen Sie uns gemeinsam Ihre Mobilitätsherausforderungen lösen.",
      items: [
        {
          id: "demo-form",
          title: "Demo-Anfrage",
          icon: FormInput,
          iconColor: "text-blue-600",
          shortDescription: "Vereinbaren Sie eine persönliche Demonstration unserer Lösungen.",
          longDescription: `Füllen Sie das Formular aus und unser Expertenteam wird sich innerhalb von 24 Stunden mit Ihnen in Verbindung setzen, um eine maßgeschneiderte Demonstration zu vereinbaren.`,
        },
        {
          id: "technical-support",
          title: "Technischer Support",
          icon: Phone,
          iconColor: "text-green-600",
          shortDescription: "Erhalten Sie technische Unterstützung für bestehende Implementierungen.",
          longDescription: `Unser Support-Team steht Ihnen für alle technischen Fragen und Implementierungsherausforderungen zur Verfügung.`,
        },
        {
          id: "partnership",
          title: "Partnerschaftsmöglichkeiten",
          icon: Handshake,
          iconColor: "text-purple-600",
          shortDescription: "Entdecken Sie Kooperationsmöglichkeiten mit OW.",
          longDescription: `Lassen Sie uns gemeinsam innovative Lösungen entwickeln und die Zukunft der urbanen Mobilität gestalten.`,
        },
      ],
    },
    ekibimiz: {
      subtitle: "Wissenschaft, Technologie und urbanes Leben vereint.",
      items: [
        {
          id: "data-scientist",
          title: "Senior Data Scientist",
          icon: Brain,
          iconColor: "text-blue-600",
          shortDescription: "Derjenige, der Daten von Chaos zu Ordnung transformiert.",
          longDescription:
            "Der Architekt, der Multi-Source-Big-Data-Ströme filtert, verarbeitet und verständlich macht. Baut das Datenrückgrat der OW-Plattform auf und etabliert sichere und skalierbare Datensysteme.",
        },
        {
          id: "urban-planner",
          title: "Senior Urban Planner",
          icon: City,
          iconColor: "text-orange-600",
          shortDescription: "Gestaltet die Stadt nicht nur mit Straßen, sondern mit Menschen.",
          longDescription:
            "Arbeitet daran, Städte gesünder und inklusiver zu machen durch mehrdimensionale Analysen wie öffentlicher Verkehr, Gesundheitszugang und Umweltauswirkungen. Trägt die Vision menschenzentrierter Smart Cities.",
        },
        {
          id: "sistem-muhendisi",
          title: "System Engineer",
          icon: Puzzle,
          iconColor: "text-red-600",
          shortDescription: "Optimiert jede Komponente innerhalb eines Ganzen.",
          longDescription:
            "Der systemische Verstand hinter OWs Software, Algorithmen und Integrationsprozessen. Der Schöpfer der architektonischen Einrichtung, die es verschiedenen Modulen ermöglicht, zusammenzuarbeiten.",
        },
      ],
    },
    hero: {
      cta: "Datengestützte Lösungen für Smart Cities",
      slogan: "Smart Mobility Lösungen [♡] Smart Transport Technologien",
    },
    bottomTags: {
      explore: "Entdecken:",
      tags: ["Smart City Planung", "Verkehrsoptimierung", "KI-Anwendungen", "Urbane Analytik"],
    },
    ctaModal: {
      title: "OW – Optimize the World",
      description: "Wir bauen eine intelligentere, effizientere Welt mit datengestützten Entscheidungsunterstützungssystemen.",
      overview:
        "OW ist eine multidisziplinäre Technologieorganisation, die Lösungen basierend auf Datenwissenschaft, Optimierungsalgorithmen und künstlicher Intelligenz für Smart Cities und urbane Infrastrukturen entwickelt. Unser Hauptziel ist es, die Entscheidungsprozesse von öffentlichen und privaten Sektoreinrichtungen mit wissenschaftlichen Methoden zu stärken, Ressourcennutzung zu optimieren und Servicequalität messbar zu erhöhen.",
      expertiseAreas: {
        title: "Unsere Fachgebiete",
        healthSystems: {
          title: "🚌 Smart Mobility Lösungen",
          description:
            "OW bietet datengestützte Technologien für Verkehrsbetriebe, Gemeinden und Verkehrsministerien in folgenden Bereichen:",
          points: [
            "Verkehrsnetzoptimierung",
            "Echtzeit-Passagierdichtevorhersage",
            "Tote-Kilometer-Reduzierung",
            "CO2-Emissionen und Umweltauswirkungsanalysen",
            "Urbane Verkehrszugangsmodellierung",
          ],
          products:
            "Unsere OW TransitOpt™, OW RiderSense™ und OW CostLogic™ Produktfamilie, entwickelt in diesem Kontext, bietet Effizienz, Geschwindigkeit und Kosteneffektivität in Verkehrsplanungsprozessen.",
        },
        healthyCities: {
          title: "Smart Transport Technologien für Smart Cities",
          description:
            "OW bietet hochgenaue analytische Modelle und Optimierungstools für Entscheidungsträger in der Stadtplanung und im öffentlichen Verkehrsmanagement:",
          points: [
            "Bedarfsgesteuerter Verkehr",
            "Zugänglichkeitsanalyse",
            "Ursprung-Ziel-Matrixanalyse",
            "Business Intelligence Lösungen",
            "Urbane Mobilitätsmodellierung",
          ],
          products:
            "Die OW DRT™, OW Accessibility™ und OW Intelligence™ Lösungen, entwickelt für diesen Zweck, unterstützen sowohl die betriebliche Effizienz als auch die Nachhaltigkeitsziele von Städten.",
        },
      },
      scientificApproach: {
        title: "Wissenschaftlicher Ansatz und multidisziplinäres Team",
        description:
          "Das Team innerhalb OW besteht aus Experten aus verschiedenen Bereichen wie Statistik, Wirtschaft, Systemtechnik, Stadtplanung, Informatik und Verkehrswissenschaften. Somit ist jede unserer Lösungen auf akademisch validierten, feldgetesteten Strukturen mit hohem Wirkungspotenzial aufgebaut.",
      },
    },
  },
}

export default function HomePage() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState("EN") // Default to EN
  // Correct individual state hooks
  const [showWhoWeAre, setShowWhoWeAre] = useState(false)
  const [showVisionMission, setShowVisionMission] = useState(false)
  const [showHealthSystems, setShowHealthSystems] = useState(false)
  const [showHealthyCities, setShowHealthyCities] = useState(false)
  // New states for individual item expansion
  const [openSectorId, setOpenSectorId] = useState<string | null>(null)
  const [openStoryId, setOpenStoryId] = useState<string | null>(null)
  const [openContactId, setOpenContactId] = useState<string | null>(null)
  const [openTeamId, setOpenTeamId] = useState<string | null>(null) // Ekibimiz için yeni state

  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
  const [showProductDetail, setShowProductDetail] = useState(false)
  const [showDemoForm, setShowDemoForm] = useState(false)
  const [showCtaModal, setShowCtaModal] = useState(false) // New state for CTA modal

  // Hero Image (single image with opacity animation)
  const heroImage = "/images/t4.png" // Updated to new image

  const [showLangDropdown, setShowLangDropdown] = useState(false)

  const toggleDropdown = (menuItem: string) => {
    setActiveDropdown(activeDropdown === menuItem ? null : menuItem)
    // Close any detail modals or expanded items when main dropdown changes
    setShowProductDetail(false)
    setSelectedProduct(null)
    setShowDemoForm(false)
    setShowCtaModal(false)
    // Reset individual item expansions
    setOpenSectorId(null)
    setOpenStoryId(null)
    setOpenContactId(null)
  }

  const closeDropdown = () => {
    setActiveDropdown(null)
    // Reset individual item expansions
    setOpenSectorId(null)
    setOpenStoryId(null)
    setOpenContactId(null)
    setOpenTeamId(null)
  }

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setShowProductDetail(true)
    closeDropdown() // Close the main dropdown when a product is clicked
  }

  const closeProductDetail = () => {
    setShowProductDetail(false)
    setSelectedProduct(null)
    setActiveDropdown("cozumlerimiz")
  }

  // New toggle functions for individual items
  const toggleSectorItem = (id: string) => {
    setOpenSectorId(openSectorId === id ? null : id)
  }

  const toggleStoryItem = (id: string) => {
    setOpenStoryId(openStoryId === id ? null : id)
  }

  const toggleContactItem = (id: string) => {
    if (id === "demo-form") {
      setShowDemoForm(true)
      closeDropdown() // Close the main dropdown when the demo form is opened
    } else {
      setOpenContactId(openContactId === id ? null : id)
    }
  }

  const toggleTeamItem = (id: string) => {
    setOpenTeamId(openTeamId === id ? null : id)
  }

  const closeDemoForm = () => {
    setShowDemoForm(false)
    setActiveDropdown("iletisim") // Return to contact dropdown
  }

  const handleCtaClick = () => {
    setShowCtaModal(true)
    closeDropdown() // Close any open dropdowns
  }

  const closeCtaModal = () => {
    setShowCtaModal(false)
  }

  const currentContent = content[selectedLanguage as keyof typeof content]

  // Function to get correct image filename based on product ID
  const getImageFileName = (productId: string) => {
    const imageMap: { [key: string]: string } = {
      'ow-transitopt': 'transitOpt.PNG',
      'ow-fleetopt': 'FleetOpt.jpg',
      'ow-ridersense': 'RiderSense.jpg',
      'ow-costlogic': 'CostLogic.jpg',
      'ow-drt': 'DRT.jpg',
      'ow-accessibility': 'accessibility.jpg',
      'ow-odmatrix': 'ODmatrix.jpg',
      'ow-intelligence': 'Intelligence.jpg'
    }
    return imageMap[productId] || 'placeholder.jpg'
  }

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* CSS for Hero Image Animation and Slogan Sliding */}
      <style jsx>{`
        @keyframes pulse-opacity {
          0% {
            opacity: 0.7;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            opacity: 0.7;
          }
        }

        @keyframes fade-text {
          0% {
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .hero-image-animated {
          animation: pulse-opacity 7s ease-in-out infinite; /* Only opacity animation */
        }

        .fading-text {
          animation: fade-text 8s ease-in-out infinite;
        }
      `}</style>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-20 pt-4 sm:pt-8">
        <div className="max-w-full mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Sol: Logo */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#EBECEC] flex items-center justify-center">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" />
          </div>

          {/* Orta: Menü - Desktop */}
          <nav
            className="hidden md:flex items-center space-x-2 sm:space-x-6 bg-[#EBECEC]/55 rounded-lg px-3 py-2 sm:px-6 sm:py-3 shadow-md flex-wrap justify-center"
            onMouseLeave={() => setHoveredMenuItem(null)}
          >
            <button
              onClick={() => toggleDropdown("hakkimizda")}
              onMouseEnter={() => setHoveredMenuItem("hakkimizda")}
              className={`text-xs sm:text-sm font-medium transition-all duration-300 ${
                hoveredMenuItem === null || hoveredMenuItem === "hakkimizda"
                  ? "text-gray-900 sm:scale-110"
                  : "text-gray-400 sm:scale-95"
              }`}
            >
              {currentContent.menu.hakkimizda}
            </button>
            <button
              onClick={() => toggleDropdown("cozumlerimiz")}
              onMouseEnter={() => setHoveredMenuItem("cozumlerimiz")}
              className={`text-xs sm:text-sm font-medium transition-all duration-300 ${
                hoveredMenuItem === null || hoveredMenuItem === "cozumlerimiz"
                  ? "text-gray-900 sm:scale-110"
                  : "text-gray-400 sm:scale-95"
              }`}
            >
              {currentContent.menu.cozumlerimiz}
            </button>
            <button
              onClick={() => toggleDropdown("sektorler")}
              onMouseEnter={() => setHoveredMenuItem("sektorler")}
              className={`text-xs sm:text-sm font-medium transition-all duration-300 ${
                hoveredMenuItem === null || hoveredMenuItem === "sektorler"
                  ? "text-gray-900 sm:scale-110"
                  : "text-gray-400 sm:scale-95"
              }`}
            >
              {currentContent.menu.sektorler}
            </button>
            <button
              onClick={() => toggleDropdown("basari-hikayeleri")}
              onMouseEnter={() => setHoveredMenuItem("basari-hikayeleri")}
              className={`text-xs sm:text-sm font-medium transition-all duration-300 ${
                hoveredMenuItem === null || hoveredMenuItem === "basari-hikayeleri"
                  ? "text-gray-900 sm:scale-110"
                  : "text-gray-400 sm:scale-95"
              }`}
            >
              {currentContent.menu.basariHikayeleri}
            </button>
            <button
              onClick={() => toggleDropdown("iletisim")}
              onMouseEnter={() => setHoveredMenuItem("iletisim")}
              className={`text-xs sm:text-sm font-medium transition-all duration-300 ${
                hoveredMenuItem === null || hoveredMenuItem === "iletisim"
                  ? "text-gray-900 sm:scale-110"
                  : "text-gray-400 sm:scale-95"
              }`}
            >
              {currentContent.menu.iletisim}
            </button>
            <button
              onClick={() => toggleDropdown("ekibimiz")} // Changed from search
              onMouseEnter={() => setHoveredMenuItem("ekibimiz")} // Changed from search
              className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                hoveredMenuItem === null || hoveredMenuItem === "ekibimiz" // Changed from search
                  ? "text-gray-900 sm:scale-110"
                  : "text-gray-400 sm:scale-95"
              }`}
            >
              <span className="text-xs sm:text-sm">{currentContent.menu.ekibimiz}</span> {/* Changed text */}
            </button>
          </nav>

          {/* Mobil Menü Butonu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => toggleDropdown("mobile-menu")}
              className="bg-[#EBECEC]/55 rounded-xl px-6 py-3 shadow-md flex items-center gap-3 hover:bg-[#EBECEC]/70 transition-all duration-300 min-w-[130px] min-h-[44px]"
            >
              <span className="text-sm font-medium text-gray-900">{selectedLanguage === "TR" ? "Menü" : "Menu"}</span>
              <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                <div className="w-full h-1 bg-gray-900 rounded-full"></div>
                <div className="w-full h-1 bg-gray-900 rounded-full"></div>
                <div className="w-full h-1 bg-gray-900 rounded-full"></div>
              </div>
            </button>
          </div>

          {/* Sağ: Dil Seçeneği */}
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
                    onClick={() => { setSelectedLanguage(l); setShowLangDropdown(false); }}
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

      {/* Dropdown Overlay */}
      {(activeDropdown || showProductDetail || showDemoForm || showCtaModal) && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-30 transition-all duration-1500 ease-in-out animate-in fade-in"
          onClick={
            activeDropdown
              ? closeDropdown
              : showProductDetail
                ? closeProductDetail
                : showDemoForm
                  ? closeDemoForm
                  : closeCtaModal
          }
        />
      )}

      {/* Dropdown Menu */}
      {activeDropdown && (
        <div className={`absolute z-40 transition-all duration-1500 ease-in-out ${
          activeDropdown === 'mobile-menu' 
            ? 'top-[60px] right-4 sm:top-[75px]' 
            : 'top-[60px] sm:top-[75px] left-1/2 transform -translate-x-1/2'
        }`}>
          <div
            className={`bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 p-4 sm:p-6 transform origin-top transition-all duration-1500 ease-in-out animate-in slide-in-from-top-1 fade-in scale-in-95 ${
              activeDropdown === 'mobile-menu' 
                ? 'w-[280px]' 
                : 'w-[95vw] sm:w-[580px]'
            }`}
            style={{
              transformOrigin: "top center",
              animationFillMode: "both",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900">
                  {currentContent.dropdownTitles[activeDropdown as keyof typeof currentContent.dropdownTitles]}
                </h3>
              </div>
              <button
                onClick={closeDropdown}
                className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              {/* Subtitle for all dropdowns except Hakkımızda and Ekibimiz (as Ekibimiz has its own subtitle) */}
              {activeDropdown !== "hakkimizda" && activeDropdown !== "ekibimiz" && (
                              <p className="text-xs sm:text-sm text-gray-600 font-medium transition-all duration-800 delay-300 animate-in slide-in-from-left-2 fade-in">
                {currentContent.dropdownSubtitles[activeDropdown as keyof typeof currentContent.dropdownSubtitles]}
              </p>
              )}

              {activeDropdown === "cozumlerimiz" && (
                <div className="space-y-4">
                  {/* Akıllı Hareketlilik Çözümleri Toggle */}
                  <div className="transition-all duration-500 delay-200 animate-in slide-in-from-left-2 fade-in">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-700 font-medium">
                          {currentContent.products.smartMobility.title}
                        </span>
                      </div>
                      <button
                        onClick={() => setShowHealthSystems(!showHealthSystems)}
                        className={`w-8 h-4 rounded-full relative transition-all duration-300 ${
                          showHealthSystems ? "bg-blue-500" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`w-3 h-3 bg-white rounded-full absolute top-0.5 shadow-sm transition-all duration-300 ${
                            showHealthSystems ? "left-4" : "left-0.5"
                          }`}
                        ></div>
                      </button>
                    </div>

                    {/* Akıllı Hareketlilik Çözümleri Genişleyebilen İçerik */}
                    {showHealthSystems && (
                      <div className="mt-4 p-4 bg-white/20 rounded-lg border border-white/20 transition-all duration-500 animate-in slide-in-from-top-2 fade-in">
                        <div className="space-y-4 text-xs sm:text-sm text-gray-700">
                          <p className="text-gray-600 italic mb-3">{currentContent.products.smartMobility.subtitle}</p>

                          {currentContent.products.smartMobility.items.map((product) => {
                            return (
                              <button
                                key={product.id}
                                onClick={() => handleProductClick(product)}
                                className="flex items-start gap-3 text-left w-full hover:bg-white/30 p-2 rounded-lg transition-colors duration-200"
                              >
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-1">{product.title}</h4>
                                  <p className="leading-relaxed mb-1">{product.shortDescription}</p>
                                  {product.longDescription.length > product.shortDescription.length && (
                                    <p className="text-xs text-gray-600">
                                      {selectedLanguage === "TR" ? "Detaylar için tıklayın..." : "Click for details..."}
                                    </p>
                                  )}
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Akıllı Ulaşım Teknolojileri Toggle */}
                  <div className="transition-all duration-500 delay-300 animate-in slide-in-from-left-2 fade-in">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-700 font-medium">
                          {currentContent.products.smartTransport.title}
                        </span>
                      </div>
                      <button
                        onClick={() => setShowHealthyCities(!showHealthyCities)}
                        className={`w-8 h-4 rounded-full relative transition-all duration-300 ${
                          showHealthyCities ? "bg-blue-500" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`w-3 h-3 bg-white rounded-full absolute top-0.5 shadow-sm transition-all duration-300 ${
                            showHealthyCities ? "left-4" : "left-0.5"
                          }`}
                        ></div>
                      </button>
                    </div>

                    {/* Akıllı Ulaşım Teknolojileri Genişleyebilen İçerik */}
                    {showHealthyCities && (
                      <div className="mt-4 p-4 bg-white/20 rounded-lg border border-white/20 transition-all duration-500 animate-in slide-in-from-top-2 fade-in">
                        <div className="space-y-4 text-xs sm:text-sm text-gray-700">
                          <p className="text-gray-600 italic mb-3">{currentContent.products.smartTransport.subtitle}</p>

                          {currentContent.products.smartTransport.items.map((product) => {
                            return (
                              <button
                                key={product.id}
                                onClick={() => handleProductClick(product)}
                                className="flex items-start gap-3 text-left w-full hover:bg-white/30 p-2 rounded-lg transition-colors duration-200"
                              >
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-1">{product.title}</h4>
                                  <p className="leading-relaxed mb-1">{product.shortDescription}</p>
                                  {product.longDescription.length > product.shortDescription.length && (
                                    <p className="text-xs text-gray-600">
                                      {selectedLanguage === "TR" ? "Detaylar için tıklayın..." : "Click for details..."}
                                    </p>
                                  )}
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeDropdown === "sektorler" && (
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mb-4">{currentContent.sectors.subtitle}</p>
                  {currentContent.sectors.items.map((sector) => {
                    const isExpanded = openSectorId === sector.id
                    const IconComponent = sector.icon
                    return (
                      <div
                        key={sector.id}
                        className="transition-all duration-500 delay-200 animate-in slide-in-from-left-2 fade-in"
                      >
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            {IconComponent && (
                              <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${sector.iconColor} flex-shrink-0`} />
                            )}
                            <span className="text-sm text-gray-700 font-medium">{sector.title}</span>
                          </div>
                          <button
                            onClick={() => toggleSectorItem(sector.id)}
                            className={`w-8 h-4 rounded-full relative transition-all duration-300 ${
                              isExpanded ? "bg-blue-500" : "bg-gray-300"
                            }`}
                          >
                            <div
                              className={`w-3 h-3 bg-white rounded-full absolute top-0.5 shadow-sm transition-all duration-300 ${
                                isExpanded ? "left-4" : "left-0.5"
                              }`}
                            ></div>
                          </button>
                        </div>
                        {isExpanded && (
                          <div className="mt-4 p-4 bg-white/20 rounded-lg border border-white/20 transition-all duration-500 animate-in slide-in-from-top-2 fade-in">
                            <div className="space-y-4 text-xs sm:text-sm text-gray-700">
                              <p className="leading-relaxed mb-1">{sector.shortDescription}</p>
                              <p className="leading-relaxed">{sector.longDescription}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              {activeDropdown === "basari-hikayeleri" && (
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mb-4">
                    {currentContent.successStories.subtitle}
                  </p>
                  {currentContent.successStories.items.map((story) => {
                    const isExpanded = openStoryId === story.id
                    const IconComponent = story.icon
                    return (
                      <div
                        key={story.id}
                        className="transition-all duration-500 delay-200 animate-in slide-in-from-left-2 fade-in"
                      >
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            {IconComponent && (
                              <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${story.iconColor} flex-shrink-0`} />
                            )}
                            <span className="text-sm text-gray-700 font-medium">{story.title}</span>
                          </div>
                          <button
                            onClick={() => toggleStoryItem(story.id)}
                            className={`w-8 h-4 rounded-full relative transition-all duration-300 ${
                              isExpanded ? "bg-blue-500" : "bg-gray-300"
                            }`}
                          >
                            <div
                              className={`w-3 h-3 bg-white rounded-full absolute top-0.5 shadow-sm transition-all duration-300 ${
                                isExpanded ? "left-4" : "left-0.5"
                              }`}
                            ></div>
                          </button>
                        </div>
                        {isExpanded && (
                          <div className="mt-4 p-4 bg-white/20 rounded-lg border border-white/20 transition-all duration-500 animate-in slide-in-from-top-2 fade-in">
                            <div className="space-y-4 text-xs sm:text-sm text-gray-700">
                              <p className="leading-relaxed mb-1">{story.shortDescription}</p>
                              <p className="leading-relaxed">{story.longDescription}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              {activeDropdown === "iletisim" && (
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mb-4">{currentContent.contact.subtitle}</p>
                  {currentContent.contact.items.map((option) => {
                    const isExpanded = openContactId === option.id
                    const IconComponent = option.icon
                    return (
                      <div
                        key={option.id}
                        className="transition-all duration-500 delay-200 animate-in slide-in-from-left-2 fade-in"
                      >
                        <div className="flex items-center justify-between py-2">
                          <button
                            onClick={() => toggleContactItem(option.id)}
                            className="flex items-center gap-3 text-left w-full"
                          >
                            {IconComponent && (
                              <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${option.iconColor} flex-shrink-0`} />
                            )}
                            <span className="text-sm text-gray-700 font-medium">{option.title}</span>
                          </button>
                          {option.id !== "demo-form" && ( // Only show toggle for non-form items
                            <button
                              onClick={() => toggleContactItem(option.id)}
                              className={`w-8 h-4 rounded-full relative transition-all duration-300 ${
                                isExpanded ? "bg-blue-500" : "bg-gray-300"
                              }`}
                            >
                              <div
                                className={`w-3 h-3 bg-white rounded-full absolute top-0.5 shadow-sm transition-all duration-300 ${
                                  isExpanded ? "left-4" : "left-0.5"
                                }`}
                              ></div>
                            </button>
                          )}
                        </div>
                        {isExpanded &&
                          option.id !== "demo-form" && ( // Only show expanded content for non-form items
                            <div className="mt-4 p-4 bg-white/20 rounded-lg border border-white/20 transition-all duration-500 animate-in slide-in-from-top-2 fade-in">
                              <div className="space-y-4 text-xs sm:text-sm text-gray-700">
                                <p className="leading-relaxed mb-1">{option.shortDescription}</p>
                                <div
                                  className="leading-relaxed"
                                  dangerouslySetInnerHTML={{ __html: option.longDescription }}
                                />
                              </div>
                            </div>
                          )}
                      </div>
                    )
                  })}
                </div>
              )}

              {activeDropdown === "ekibimiz" && ( // New section for Ekibimiz
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-gray-600 font-medium transition-all duration-500 delay-200 animate-in slide-in-from-left-2 fade-in">
                    {currentContent.ekibimiz.subtitle}
                  </p>
                  {currentContent.ekibimiz.items.map((member) => {
                    const IconComponent = member.icon
                    const isOpen = openTeamId === member.id
                    return (
                      <div key={member.id} className="transition-all duration-500 delay-200 animate-in slide-in-from-left-2 fade-in">
                        {/* Üye başlığı ve toggle butonu */}
                        <button
                          onClick={() => toggleTeamItem(member.id)}
                          className="flex items-center justify-between w-full p-3 text-left hover:bg-white/30 rounded-lg transition-colors duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${member.iconColor} flex-shrink-0`} />
                        <div>
                              <h4 className="font-medium text-gray-900 text-sm">{member.title}</h4>
                              <p className="text-xs text-gray-600">{member.shortDescription}</p>
                        </div>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Genişleyebilen detay içeriği */}
                        {isOpen && (
                          <div className="mt-2 ml-7 p-3 bg-white/20 rounded-lg border border-white/20 transition-all duration-500 animate-in slide-in-from-top-2 fade-in">
                            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{member.longDescription}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              {activeDropdown === "mobile-menu" && (
                <div className="space-y-3">
                  <h3 className="text-base font-medium text-gray-900 mb-4">
                    {selectedLanguage === "TR" ? "Menü" : selectedLanguage === "EN" ? "Menu" : "Menü"}
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        closeDropdown()
                        toggleDropdown("hakkimizda")
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-white/30 rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                      <Users className="w-4 h-4" />
                      {currentContent.menu.hakkimizda}
                    </button>
                    <button
                      onClick={() => {
                        closeDropdown()
                        toggleDropdown("cozumlerimiz")
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-white/30 rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                      <Puzzle className="w-4 h-4" />
                      {currentContent.menu.cozumlerimiz}
                    </button>
                    <button
                      onClick={() => {
                        closeDropdown()
                        toggleDropdown("sektorler")
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-white/30 rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                      <Building className="w-4 h-4" />
                      {currentContent.menu.sektorler}
                    </button>
                    <button
                      onClick={() => {
                        closeDropdown()
                        toggleDropdown("basari-hikayeleri")
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-white/30 rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                      <TrendingUp className="w-4 h-4" />
                      {currentContent.menu.basariHikayeleri}
                    </button>
                    <button
                      onClick={() => {
                        closeDropdown()
                        toggleDropdown("iletisim")
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-white/30 rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                      <Handshake className="w-4 h-4" />
                      {currentContent.menu.iletisim}
                    </button>
                    <button
                      onClick={() => {
                        closeDropdown()
                        toggleDropdown("ekibimiz")
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-white/30 rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                      <Brain className="w-4 h-4" />
                      {currentContent.menu.ekibimiz}
                    </button>
                  </div>
                </div>
              )}

              {activeDropdown === "hakkimizda" && (
                <div className="space-y-4">
                  {/* Biz Kimiz? Toggle */}
                  <div className="transition-all duration-500 delay-200 animate-in slide-in-from-left-2 fade-in">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-700 font-medium">
                          {currentContent.hakkimizda.bizKimiz.title}
                        </span>
                      </div>
                      <button
                        onClick={() => setShowWhoWeAre(!showWhoWeAre)}
                        className={`w-8 h-4 rounded-full relative transition-all duration-300 ${
                          showWhoWeAre ? "bg-blue-500" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`w-3 h-3 bg-white rounded-full absolute top-0.5 shadow-sm transition-all duration-300 ${
                            showWhoWeAre ? "left-4" : "left-0.5"
                          }`}
                        ></div>
                      </button>
                    </div>

                    {/* Biz Kimiz? Genişleyebilen İçerik */}
                    {showWhoWeAre && (
                      <div className="mt-4 p-4 bg-white/20 rounded-lg border border-white/20 transition-all duration-500 animate-in slide-in-from-top-2 fade-in">
                        <div className="space-y-4 text-xs sm:text-sm text-gray-700">
                          <div className="flex items-start gap-3">
                            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="leading-relaxed">{currentContent.hakkimizda.bizKimiz.desc1}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="leading-relaxed">{currentContent.hakkimizda.bizKimiz.desc2}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Vizyon - Misyon Toggle */}
                  <div className="transition-all duration-500 delay-300 animate-in slide-in-from-left-2 fade-in">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-700 font-medium">
                          {currentContent.hakkimizda.vizyonMisyon.title}
                        </span>
                      </div>
                      <button
                        onClick={() => setShowVisionMission(!showVisionMission)}
                        className={`w-8 h-4 rounded-full relative transition-all duration-300 ${
                          showVisionMission ? "bg-blue-500" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`w-3 h-3 bg-white rounded-full absolute top-0.5 shadow-sm transition-all duration-300 ${
                            showVisionMission ? "left-4" : "left-0.5"
                          }`}
                        ></div>
                      </button>
                    </div>

                    {/* Vizyon - Misyon Genişleyebilen İçerik */}
                    {showVisionMission && (
                      <div className="mt-4 p-4 bg-white/20 rounded-lg border border-white/20 transition-all duration-500 animate-in slide-in-from-top-2 fade-in">
                        <div className="space-y-4 text-xs sm:text-sm text-gray-700">
                          <div className="flex items-start gap-3">
                            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">
                                {currentContent.hakkimizda.vizyonMisyon.visionTitle}
                              </h4>
                              <p className="leading-relaxed mb-1">
                                {currentContent.hakkimizda.vizyonMisyon.visionDesc1}
                              </p>
                              <p className="leading-relaxed">{currentContent.hakkimizda.vizyonMisyon.visionDesc2}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">
                                {currentContent.hakkimizda.vizyonMisyon.missionTitle}
                              </h4>
                              <p className="leading-relaxed mb-1">
                                {currentContent.hakkimizda.vizyonMisyon.missionDesc1}
                              </p>
                              <p className="leading-relaxed">{currentContent.hakkimizda.vizyonMisyon.missionDesc2}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {showProductDetail && selectedProduct && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-md z-50 flex items-center justify-center transition-all duration-500 ease-in-out animate-in fade-in"
          onClick={closeProductDetail}
        >
          <div
            className="bg-white/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8 w-[95vw] sm:w-[700px] max-h-[90vh] overflow-y-auto transform origin-center transition-all duration-500 ease-out animate-in zoom-in-95 fade-in"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {selectedProduct.icon && (
                  <selectedProduct.icon
                    className={`w-6 h-6 sm:w-8 sm:h-8 ${selectedProduct.iconColor} flex-shrink-0`}
                  />
                )}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{selectedProduct.title}</h3>
              </div>
              <button
                onClick={closeProductDetail}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-sm sm:text-base text-gray-700 leading-relaxed space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="font-medium text-gray-800">{selectedProduct.shortDescription}</p>
                  <p>{selectedProduct.longDescription}</p>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 backdrop-blur-sm bg-white/10">
                    <img
                      src={`/solutions/${getImageFileName(selectedProduct.id)}`}
                      alt={`${selectedProduct.title} visualization`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        // Fallback to PNG if JPG doesn't exist
                        const target = e.target as HTMLImageElement;
                        target.src = target.src.replace('.jpg', '.PNG');
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Form Modal */}
      {showDemoForm && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-md z-50 flex items-center justify-center transition-all duration-500 ease-in-out animate-in fade-in"
          onClick={closeDemoForm}
        >
          <div
            className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 p-6 sm:p-8 w-[95vw] sm:w-[500px] max-h-[90vh] overflow-y-auto transform origin-center transition-all duration-500 ease-out animate-in zoom-in-95 fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                {currentContent.contact.items.find((item) => item.id === "demo-form")?.title}
              </h3>
              <button
                onClick={closeDemoForm}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="space-y-4 text-sm sm:text-base">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {selectedLanguage === "TR" ? "Adınız Soyadınız" : "Your Name"}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                  {selectedLanguage === "TR" ? "Kurumunuz" : "Your Organization"}
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {selectedLanguage === "TR" ? "E-posta Adresiniz" : "Your Email Address"}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="solution" className="block text-sm font-medium text-gray-700">
                  {selectedLanguage === "TR" ? "İlgilendiğiniz Çözüm" : "Solution of Interest"}
                </label>
                <select
                  id="solution"
                  name="solution"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">{selectedLanguage === "TR" ? "Lütfen Seçiniz" : "Please Select"}</option>
                  {currentContent.products.smartMobility.items.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                  {currentContent.products.smartTransport.items.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  {selectedLanguage === "TR" ? "Mesajınız" : "Your Message"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {selectedLanguage === "TR" ? "Gönder" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CTA Modal */}
      {showCtaModal && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-md z-50 flex items-center justify-center transition-all duration-500 ease-in-out animate-in fade-in"
          onClick={closeCtaModal}
        >
          <div
            className="bg-white/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8 w-[95vw] sm:w-[800px] max-h-[90vh] overflow-y-auto transform origin-center transition-all duration-500 ease-out animate-in zoom-in-95 fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{currentContent.ctaModal.title}</h3>
              <button
                onClick={closeCtaModal}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-sm sm:text-base text-gray-700 leading-relaxed space-y-6">
              <p className="font-medium text-gray-800">{currentContent.ctaModal.description}</p>
              <p>{currentContent.ctaModal.overview}</p>

              {/* Uzmanlık Alanlarımız */}
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                  {currentContent.ctaModal.expertiseAreas.title}
                </h4>
                <div className="space-y-4">
                  {/* Sağlık Sistemleri */}
                  <div>
                    <h5 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      {currentContent.ctaModal.expertiseAreas.healthSystems.title}
                    </h5>
                    <p className="mb-2">{currentContent.ctaModal.expertiseAreas.healthSystems.description}</p>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                      {currentContent.ctaModal.expertiseAreas.healthSystems.points.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                    <p className="mt-2 italic text-gray-600">
                      {currentContent.ctaModal.expertiseAreas.healthSystems.products}
                    </p>
                  </div>

                  {/* Sağlıklı Kentler */}
                  <div>
                    <h5 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      {currentContent.ctaModal.expertiseAreas.healthyCities.title}
                    </h5>
                    <p className="mb-2">{currentContent.ctaModal.expertiseAreas.healthyCities.description}</p>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                      {currentContent.ctaModal.expertiseAreas.healthyCities.points.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                    <p className="mt-2 italic text-gray-600">
                      {currentContent.ctaModal.expertiseAreas.healthyCities.products}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bilimsel Yaklaşım ve Multidisipliner Ekip */}
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                  {currentContent.ctaModal.scientificApproach.title}
                </h4>
                <p>{currentContent.ctaModal.scientificApproach.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Button */}
      <div className="absolute top-[75px] sm:top-[100px] left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={handleCtaClick} // Updated onClick to open the new modal
          className="bg-[#EBECEC]/60 rounded-xl text-gray-700 hover:bg-[#EBECEC]/80 transition-all duration-300 px-4 py-3 sm:px-3 sm:py-2 shadow-lg hover:shadow-xl inline-flex items-center gap-3 sm:gap-2 min-w-[200px] sm:min-w-[180px] justify-between backdrop-blur-sm"
        >
          <span className="text-xs sm:text-xs font-medium leading-tight">{selectedLanguage === "TR" ? "OW: akıllı şehirler için veri odaklı çözümler" : "OW: data-driven solutions for smart cities"}</span>
          <div className="w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
            <ArrowRight className="w-4 h-4 text-[#0171E3]" />
          </div>
        </button>
      </div>

      {/* Hero Section */}
      <main className="flex-grow relative flex items-center justify-center px-4 pt-4 sm:pt-0 z-10">
        {/* Ortalanmış Görsel - Tek görsel ve opaklık animasyonu */}
        <div className="relative w-full max-w-[338px] h-[364px] sm:max-w-[650px] sm:h-[780px] -mt-20 sm:mt-0">
          <img
            src={heroImage || "/placeholder.svg"}
            alt="3D rendered human head with neural network pattern overlay representing AI and medical data analysis"
            className="absolute inset-0 w-full h-full object-contain hero-image-animated"
            style={{opacity:0.7}}
          />
        </div>

        {/* Sol altta metin - Mobilde optimize */}
        <div className="absolute bottom-24 left-4 sm:bottom-20 sm:left-10 z-20 text-left">
          <div className="flex flex-col gap-0 sm:gap-1 items-center">
            <span className="text-base sm:text-2xl text-gray-800 font-medium text-center" style={{width: 'fit-content', maxWidth: '100%', marginBottom: '-0.5rem'}}>Optimize the World</span>
            <h1 className="text-5xl sm:text-9xl font-bold text-gray-900 leading-none tracking-wider">OW</h1>
          </div>
          <div className="text-sm sm:text-xl text-gray-700 mt-3 sm:mt-2 max-w-[320px] sm:max-w-none leading-relaxed">
            <div className="fading-text space-y-1">
              <div>⌘ {selectedLanguage === "TR" ? "Akıllı Hareketlilik Çözümleri" : "Smart Mobility Solutions"}</div>
              <div>⌘ {selectedLanguage === "TR" ? "Akıllı Ulaşım Teknolojileri" : "Smart Transport Technologies"}</div>
            </div>
          </div>
        </div>
      </main>

      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-10"
        style={{opacity:0.10}}
      >
        <source src="/2.mp4" type="video/mp4" />
      </video>

    </div>
  )
}
