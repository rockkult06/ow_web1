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
      ekibimiz: "Ekibimiz", // Renamed from search
    },
    dropdownTitles: {
      hakkimizda: "Hakkımızda",
      cozumlerimiz: "Çözümlerimiz",
      sektorler: "Sektörler",
      basariHikayeleri: "Başarı Hikayeleri",
      iletisim: "İletişim",
      ekibimiz: "Ekibimiz", // Renamed from search
    },
    dropdownSubtitles: {
      cozumlerimiz: "Ürünleri Keşfedin",
      sektorler: "OW, farklı sektörlere özel optimize edilmiş çözümler sunar.",
      basariHikayeleri: "Gerçek veri, gerçek sonuçlar.",
      iletisim: "Sizin için nasıl optimize edebiliriz?",
      ekibimiz: "Bilim, teknoloji ve şehir yaşamı bir arada.", // New subtitle for Ekibimiz
    },
    hakkimizda: {
      bizKimiz: {
        title: "Biz Kimiz?",
        desc1:
          "OW, veriyi anlamlandırarak dünyayı daha sağlıklı ve daha yaşanabilir hale getiren teknoloji şirketidir.",
        desc2:
          "Sağlık sistemlerinden kent içi ulaşıma kadar uzanan çözümlerimizle, kararların daha hızlı, sistemlerin daha akıllı, şehirlerin daha insancıl olmasını sağlıyoruz.",
      },
      vizyonMisyon: {
        title: "Vizyon - Misyon",
        visionTitle: "Vizyonumuz",
        visionDesc1: "Veriyle şekillenen bir dünya kurmak.",
        visionDesc2: "Her bireyin, her şehrin ve her sistemin daha verimli çalıştığı bir gelecek tasarlıyoruz.",
        missionTitle: "Misyonumuz",
        missionDesc1: "Veriyi eyleme dönüştürmek.",
        missionDesc2:
          "Sağlık ve şehir yaşamında kararları optimize eden, insan odaklı, etik ve sürdürülebilir teknolojiler geliştiriyoruz.",
      },
    },
    products: {
      healthSystems: {
        title: "Sağlık Sistemleri",
        subtitle: "Veriyle güçlenen sağlık kararları.",
        items: [
          {
            id: "ow-insight",
            title: "OW Insight™",
            icon: Stethoscope,
            iconColor: "text-blue-600",
            shortDescription: "Karmaşık tıbbi verileri anında anlamlandırın.",
            longDescription: `Hasta geçmişi, laboratuvar sonuçları, görüntüleme verileri ve klinik notlar gibi çok kaynaklı verileri bir araya getirerek, kullanıcı dostu grafikler ve sezgisel panellerle analiz eder. Gerçek zamanlı analiz kabiliyeti, klinisyenlerin hızlı ve bilinçli karar almasını sağlar. Veriye dayalı şeffaflık, sadece tedavi süreçlerini değil, hasta güvenini de artırır.`,
          },
          {
            id: "ow-decisions",
            title: "OW Decisions™",
            icon: Activity,
            iconColor: "text-green-600",
            shortDescription: "Tedavi kararlarını yapay zekâ ile destekleyin.",
            longDescription: `Klinik karar destek sistemi, hastaya özgü sağlık verilerini analiz ederek en uygun teşhis ve tedavi önerilerini sunar. Güncel medikal protokollerle uyumlu olan bu sistem, ölçülebilir risk analizleri ve senaryo bazlı öneriler sunarak doktorlara bir adım önde karar alma yeteneği kazandırır.`,
          },
          {
            id: "ow-signals",
            title: "OW Signals™",
            icon: AlertTriangle,
            iconColor: "text-red-600",
            shortDescription: "Kritik verilerle önceden harekete geçin.",
            longDescription: `Yoğun bakım ve kronik hasta takiplerinde hayati önem taşıyan sürekli verileri işler. Kalp atış hızı, oksijen seviyesi, solunum gibi vital parametrelerdeki anormallikleri gerçek zamanlı olarak tespit eder ve klinik personeli önceden uyarır. Bu sayede komplikasyonların önlenmesi ve acil müdahale süresi kısaltılır.`,
          },
          {
            id: "clinical-data-analysis",
            title: "Klinik Veri Analizi ve Karar Destek",
            icon: Hospital,
            iconColor: "text-purple-600",
            shortDescription: "Veriler artık sadece kayıt değil, bir yol gösterici.",
            longDescription: `Sağlık kuruluşlarının günlük veri yığını içinde kaybolmasını önler. Veri analitiği sayesinde teşhis doğruluğu artar, tedavi süreçleri kişiselleşir, kaynak kullanımı ise daha verimli hale gelir. Makine öğrenimi destekli analizler, karar alma süreçlerinde doktorlara veri temelli netlik sağlar.`,
          },
          {
            id: "hospital-integration",
            title: "Hastane, Klinik ve Aile Hekimliği Entegrasyonu",
            icon: Dna,
            iconColor: "text-indigo-600",
            shortDescription: "Tüm sağlık kademelerini tek bir zeka çatısı altında birleştirin.",
            longDescription: `OW platformu, sağlık hizmet zincirinin tüm katmanlarını entegre eder: Hastane, poliklinik, aile hekimliği ve laboratuvar sistemleri birbiriyle veri uyumlu şekilde çalışır. Bu entegrasyon, hastanın yaşam döngüsü boyunca bütüncül bir sağlık takibi sağlar ve tekrar eden testleri, bilgi kayıplarını, zaman ve maliyet israfını ortadan kaldırır.`,
          },
        ],
      },
      healthyCities: {
        title: "Sağlıklı Kent Çözümleri",
        subtitle: "Veriyle planlanan, insan odaklı kentler.",
        items: [
          {
            id: "ow-transitopt",
            title: "OW TransitOpt™",
            icon: Car,
            iconColor: "text-blue-600",
            shortDescription: "Ulaşım hatlarını bilimsel olarak yeniden düşünün.",
            longDescription: `Toplu taşıma hatlarının veriye dayalı şekilde yeniden yapılandırılmasını sağlar. Araç-güzergâh eşlemesi, garaj-hat uzaklık optimizasyonu ve filo kapasite dengesi ile hem işletme maliyetlerini azaltır, hem de yolcu memnuniyetini artırır. Simülasyon destekli planlama ile doğru kaynak, doğru hatta, doğru zamanda.`,
          },
          {
            id: "ow-ridersense",
            title: "OW RiderSense™",
            icon: TrendingUp,
            iconColor: "text-green-600",
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
          {
            id: "transportation-network-optimization",
            title: "Ulaşım Ağı Optimizasyonu",
            icon: Bus,
            iconColor: "text-orange-600",
            shortDescription: "Şehrinizdeki her hattı veriye göre yeniden şekillendirin.",
            longDescription: `OW'nin optimizasyon motoru, tüm şehir ulaşım haritasını algoritmalarla yeniden değerlendirir. Boş seferleri tespit eder, düşük verimli hatları önerilerle iyileştirir ve toplu taşımanın hem etkinliğini hem de erişilebilirliğini artırır. Yolcular daha az bekler, sistem daha az harcar.`,
          },
          {
            id: "urban-health-access-analysis",
            title: "Kentsel Sağlık Erişimi Analizi",
            icon: MapPin,
            iconColor: "text-red-600",
            shortDescription: "Herkesin sağlık hizmetine adil erişimini sağlayın.",
            longDescription: `Toplu taşıma–sağlık erişim entegrasyonu.`,
          },
          {
            id: "passenger-behavior-analysis",
            title: "Yolcu Davranışı Analizi",
            icon: BarChart3,
            iconColor: "text-purple-600",
            shortDescription: "Şehir sakinlerini daha iyi anlayın, akışı ona göre yönetin.",
            longDescription: `Veriye dayalı kullanıcı profilleri ve tahminler.`,
          },
          {
            id: "carbon-environmental-impact-modeling",
            title: "Karbon ve Çevresel Etki Modellemesi",
            icon: Leaf,
            iconColor: "text-green-600",
            shortDescription: "Kent politikalarını sürdürülebilirlik odağında optimize edin.",
            longDescription: `Emisyon azaltımı, çevresel risk haritaları, planlama desteği.`,
          },
        ],
      },
    },
    sectors: {
      subtitle: "Veriye dayalı karar destek altyapımız, her kurumun kendi dinamiklerine uygun şekilde uyarlanabilir.",
      items: [
        {
          id: "hospitals-clinics",
          title: "Hastaneler & Klinikler",
          icon: BriefcaseMedical,
          iconColor: "text-blue-600",
          shortDescription: "Tanıdan tedaviye, veriyle güçlenen sağlık hizmetleri.",
          longDescription: `OW ürünleriyle hasta verileri anında analiz edilir, riskler öngörülür, tedavi süreçleri hızlandırılır. Klinik kararlar artık daha doğru, sistemler daha verimli.`,
        },
        {
          id: "municipalities-transport",
          title: "Belediyeler & Ulaşım Daireleri",
          icon: Building,
          iconColor: "text-green-600",
          shortDescription: "Şehir içi ulaşım ağları için bilimsel planlama gücü.",
          longDescription: `Hat optimizasyonu, yolcu yoğunluğu tahmini, karbon ayak izi analizi gibi veriye dayalı çözümlerle toplu taşıma sistemleri daha akıllı, maliyetler daha düşük hale gelir.`,
        },
        {
          id: "smart-city-projects",
          title: "Akıllı Şehir Projeleri",
          icon: City,
          iconColor: "text-purple-600",
          shortDescription: "Sağlık, ulaşım ve çevre verisini entegre eden kent zekâsı.",
          longDescription: `OW, şehirlerin farklı altyapı sistemlerini tek çatı altında analiz ederek sürdürülebilir, insan odaklı şehir yaşamını mümkün kılar.`,
        },
        {
          id: "universities-research",
          title: "Üniversiteler & Araştırma Kurumları",
          icon: GraduationCap,
          iconColor: "text-orange-600",
          shortDescription: "Bilimsel analizlerde güçlü veri altyapısı ve yapay zekâ desteği.",
          longDescription: `Araştırma projelerinde büyük veri setlerinin temizlenmesi, analizi ve görselleştirilmesi için ideal platform. Özellikle sağlık ve şehir planlama alanlarında veri güdümlü akademik çalışmaları destekler.`,
        },
        {
          id: "ministries-public",
          title: "Sağlık Bakanlıkları & Kamu Kurumları",
          icon: Government,
          iconColor: "text-red-600",
          shortDescription: "Ulusal düzeyde sağlık politikalarını veriyle şekillendirin.",
          longDescription: `Karar destek sistemleri, epidemiyolojik modelleme ve sistem entegrasyonu alanlarında OW, kamu kurumlarına kapsamlı analiz ve izleme araçları sunar. Veriye dayalı politika üretiminin temelini oluşturur.`,
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
      cozumlerimiz: "Explore Products",
      sektorler: "OW offers optimized solutions tailored for various sectors.",
      basariHikayeleri: "Real data, real results.",
      iletisim: "How can we optimize for you?",
      ekibimiz: "Science, technology, and urban living combined.", // New subtitle for Ekibimiz
    },
    hakkimizda: {
      bizKimiz: {
        title: "Who Are We?",
        desc1: "OW is a technology company that makes the world healthier and more livable by giving meaning to data.",
        desc2:
          "With our solutions ranging from healthcare systems to urban transportation, we enable faster decisions, smarter systems, and more humane cities.",
      },
      vizyonMisyon: {
        title: "Vision - Mission",
        visionTitle: "Our Vision",
        visionDesc1: "To build a data-driven world.",
        visionDesc2:
          "We are designing a future where every individual, every city, and every system operates more efficiently.",
        missionTitle: "Our Mission",
        missionDesc1: "To transform data into action.",
        missionDesc2:
          "We develop human-centric, ethical, and sustainable technologies that optimize decisions in healthcare and urban living.",
      },
    },
    products: {
      healthSystems: {
        title: "Health Systems",
        subtitle: "Data-powered healthcare decisions.",
        items: [
          {
            id: "ow-insight",
            title: "OW Insight™",
            icon: Stethoscope,
            iconColor: "text-blue-600",
            shortDescription: "Instantly make sense of complex medical data.",
            longDescription: `It gathers multi-source data such as patient history, lab results, imaging data, and clinical notes, analyzing them with user-friendly graphics and intuitive dashboards. Real-time analysis capability enables clinicians to make quick and informed decisions. Data-driven transparency increases not only treatment processes but also patient trust.`,
          },
          {
            id: "ow-decisions",
            title: "OW Decisions™",
            icon: Activity,
            iconColor: "text-green-600",
            shortDescription: "Support treatment decisions with artificial intelligence.",
            longDescription: `The clinical decision support system analyzes patient-specific health data to provide the most appropriate diagnosis and treatment recommendations. Compatible with current medical protocols, this system offers measurable risk analyses and scenario-based recommendations, empowering doctors to make decisions one step ahead.`,
          },
          {
            id: "ow-signals",
            title: "OW Signals™",
            icon: AlertTriangle,
            iconColor: "text-red-600",
            shortDescription: "Act proactively with critical data.",
            longDescription: `It processes continuous data vital for intensive care and chronic patient monitoring. It detects anomalies in vital parameters such as heart rate, oxygen levels, and respiration in real-time, alerting clinical staff in advance. This prevents complications and shortens emergency response times.`,
          },
          {
            id: "clinical-data-analysis",
            title: "Clinical Data Analysis & Decision Support",
            icon: Hospital,
            iconColor: "text-purple-600",
            shortDescription: "Data is no longer just a record, but a guide.",
            longDescription: `It prevents healthcare organizations from getting lost in their daily data deluge. Data analytics increases diagnostic accuracy, personalizes treatment processes, and makes resource utilization more efficient. Machine learning-backed analyses provide doctors with data-driven clarity in decision-making processes.`,
          },
          {
            id: "hospital-integration",
            title: "Hospital, Clinic & Family Medicine Integration",
            icon: Dna,
            iconColor: "text-indigo-600",
            shortDescription: "Unite all levels of healthcare under one intelligent umbrella.",
            longDescription: `The OW platform integrates all layers of the healthcare service chain: Hospital, polyclinic, family medicine, and laboratory systems work in data harmony. This integration provides holistic health monitoring throughout the patient's life cycle and eliminates repetitive tests, information loss, and waste of time and cost.`,
          },
        ],
      },
      healthyCities: {
        title: "Healthy City Solutions",
        subtitle: "Data-planned, human-centric cities.",
        items: [
          {
            id: "ow-transitopt",
            title: "OW TransitOpt™",
            icon: Car,
            iconColor: "text-blue-600",
            shortDescription: "Rethink transportation lines scientifically.",
            longDescription: `It enables the data-driven restructuring of public transportation lines. With vehicle-route matching, garage-route distance optimization, and fleet capacity balance, it reduces operating costs and increases passenger satisfaction. Simulation-backed planning ensures the right resources, on the right line, at the right time.`,
          },
          {
            id: "ow-ridersense",
            title: "OW RiderSense™",
            icon: TrendingUp,
            iconColor: "text-green-600",
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
          {
            id: "transportation-network-optimization",
            title: "Transportation Network Optimization",
            icon: Bus,
            iconColor: "text-orange-600",
            shortDescription: "Reshape every line in your city based on data.",
            longDescription: `OW's optimization engine re-evaluates the entire city transportation map with algorithms. It identifies empty trips, improves low-efficiency lines with recommendations, and increases both the effectiveness and accessibility of public transportation. Passengers wait less, and the system spends less.`,
          },
          {
            id: "urban-health-access-analysis",
            title: "Urban Health Access Analysis",
            icon: MapPin,
            iconColor: "text-red-600",
            shortDescription: "Ensure fair access to healthcare for everyone.",
            longDescription: `Public transport–health access integration.`,
          },
          {
            id: "passenger-behavior-analysis",
            title: "Passenger Behavior Analysis",
            icon: BarChart3,
            iconColor: "text-purple-600",
            shortDescription: "Better understand city residents, manage flow accordingly.",
            longDescription: `Data-driven user profiles and predictions.`,
          },
          {
            id: "carbon-environmental-impact-modeling",
            title: "Carbon & Environmental Impact Modeling",
            icon: Leaf,
            iconColor: "text-green-600",
            shortDescription: "Optimize urban policies with a focus on sustainability.",
            longDescription: `Emisyon azaltımı, çevresel risk haritaları, planlama desteği.`,
          },
        ],
      },
    },
    sectors: {
      subtitle:
        "Our data-driven decision support infrastructure can be adapted to the unique dynamics of each organization.",
      items: [
        {
          id: "hospitals-clinics",
          title: "Hospitals & Clinics",
          icon: BriefcaseMedical,
          iconColor: "text-blue-600",
          shortDescription: "Data-powered healthcare services from diagnosis to treatment.",
          longDescription: `With OW products, patient data is instantly analyzed, risks are predicted, and treatment processes are accelerated. Clinical decisions are now more accurate, and systems are more efficient.`,
        },
        {
          id: "municipalities-transport",
          title: "Municipalities & Transport Departments",
          icon: Building,
          iconColor: "text-green-600",
          shortDescription: "Scientific planning power for urban transportation networks.",
          longDescription: `With data-driven solutions such as route optimization, passenger density prediction, and carbon footprint analysis, public transportation systems become smarter and costs become lower.`,
        },
        {
          id: "smart-city-projects",
          title: "Smart City Projects",
          icon: City,
          iconColor: "text-purple-600",
          shortDescription: "Urban intelligence that integrates health, transportation, and environmental data.",
          longDescription: `OW enables sustainable, human-centric urban life by analyzing the different infrastructure systems of cities under a single roof.`,
        },
        {
          id: "universities-research",
          title: "Universities & Research Institutions",
          icon: GraduationCap,
          iconColor: "text-orange-600",
          shortDescription: "Powerful data infrastructure and AI support for scientific analyses.",
          longDescription: `An ideal platform for cleaning, analyzing, and visualizing large datasets in research projects. It especially supports data-driven academic studies in the fields of health and urban planning.`,
        },
        {
          id: "ministries-public",
          title: "Ministries & Public Institutions",
          icon: Government,
          iconColor: "text-red-600",
          shortDescription: "Shape national health policies with data.",
          longDescription: `OW offers comprehensive analysis and monitoring tools to public institutions in the areas of decision support systems, epidemiological modeling, and system integration. It forms the basis of data-driven policy production.`,
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
      cta: "Tıbbi veri analizinde yeni nesil yaklaşımlar",
      slogan: "Sağlık Sistemleri için Akıllı Analitik [♡] Sağlıklı Kent Çözümleri",
    },
    bottomTags: {
      explore: "Keşfet:",
      tags: ["Medical Data Analysis", "Decision Support", "AI Applications", "Clinical Research"],
    },
    ctaModal: {
      title: "OW – Optimize the World",
      description: "We are building a healthier, more efficient world with data-driven decision support systems.",
      overview:
        "OW is a multidisciplinary technology organization that develops solutions based on data science, optimization algorithms, and artificial intelligence for healthcare systems and urban infrastructures. Our main goal is to strengthen the decision-making processes of public and private sector institutions with scientific methods, optimize resource utilization, and measurably increase service quality.",
      expertiseAreas: {
        title: "Our Areas of Expertise",
        healthSystems: {
          title: "🩺 Decision Support Solutions for Health Systems",
          description:
            "OW offers data-supported technologies to healthcare providers such as hospitals, clinics, family health centers, and ministries of health in the following areas:",
          points: [
            "Clinical decision support systems",
            "Real-time health data analysis",
            "Risk scoring and early warning algorithms",
            "Healthcare service chain integration",
            "Patient profiling and treatment optimization",
          ],
          products:
            "Our OW Insight™, OW Decisions™, and OW Signals™ product family, developed in this context, provides accuracy, speed, and cost-effectiveness in diagnosis and treatment processes.",
        },
        healthyCities: {
          title: "Smart Urban Systems for Healthy Cities",
          description:
            "OW offers high-accuracy analytical models and optimization tools for decision-makers in urban planning and public transportation management:",
          points: [
            "Transportation network optimization",
            "Passenger density prediction",
            "Dead mileage reduction",
            "Carbon emission and environmental impact analyses",
            "Urban healthcare access modeling",
          ],
          products:
            "The OW TransitOpt™, OW RiderSense™, and OW CostLogic™ solutions developed for this purpose support both the operational efficiency and sustainability goals of cities.",
        },
      },
      scientificApproach: {
        title: "Scientific Approach and Multidisciplinary Team",
        description:
          "The team within OW consists of experts from different fields such as statistics, economics, systems engineering, urban planning, computer science, and health sciences. Thus, each of our solutions is built on academically validated, field-tested structures with high impact potential.",
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

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* CSS for Hero Image Animation and Slogan Sliding */}
      <style jsx>{`
        @keyframes pulse-opacity {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
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
          <div className="flex items-center">
            <button
              onClick={() => setSelectedLanguage(selectedLanguage === "TR" ? "EN" : "TR")}
              className="bg-[#EBECEC]/55 rounded-lg px-3 py-2 sm:px-4 sm:py-3 shadow-md flex items-center gap-1 sm:gap-2 hover:bg-[#EBECEC]/70 transition-all duration-300 hover:scale-105"
            >
              <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
              <span className="text-xs sm:text-sm font-medium text-gray-900">{selectedLanguage}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Dropdown Overlay */}
      {(activeDropdown || showProductDetail || showDemoForm || showCtaModal) && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-30 transition-all duration-1000 ease-in-out animate-in fade-in"
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
        <div className={`absolute z-40 transition-all duration-1000 ease-out ${
          activeDropdown === 'mobile-menu' 
            ? 'top-[60px] right-4 sm:top-[75px]' 
            : 'top-[60px] sm:top-[75px] left-1/2 transform -translate-x-1/2'
        }`}>
          <div
            className={`bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 p-4 sm:p-6 transform origin-top transition-all duration-1000 ease-out animate-in slide-in-from-top-1 fade-in scale-in-95 ${
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
                <p className="text-xs sm:text-sm text-gray-600 font-medium transition-all duration-500 delay-200 animate-in slide-in-from-left-2 fade-in">
                  {currentContent.dropdownSubtitles[activeDropdown as keyof typeof currentContent.dropdownSubtitles]}
                </p>
              )}

              {activeDropdown === "cozumlerimiz" && (
                <div className="space-y-4">
                  {/* Sağlık Sistemleri Toggle */}
                  <div className="transition-all duration-500 delay-200 animate-in slide-in-from-left-2 fade-in">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-700 font-medium">
                          {currentContent.products.healthSystems.title}
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

                    {/* Sağlık Sistemleri Genişleyebilen İçerik */}
                    {showHealthSystems && (
                      <div className="mt-4 p-4 bg-white/20 rounded-lg border border-white/20 transition-all duration-500 animate-in slide-in-from-top-2 fade-in">
                        <div className="space-y-4 text-xs sm:text-sm text-gray-700">
                          <p className="text-gray-600 italic mb-3">{currentContent.products.healthSystems.subtitle}</p>

                          {currentContent.products.healthSystems.items.map((product) => {
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

                  {/* Sağlıklı Kent Çözümleri Toggle */}
                  <div className="transition-all duration-500 delay-300 animate-in slide-in-from-left-2 fade-in">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-700 font-medium">
                          {currentContent.products.healthyCities.title}
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

                    {/* Sağlıklı Kent Çözümleri Genişleyebilen İçerik */}
                    {showHealthyCities && (
                      <div className="mt-4 p-4 bg-white/20 rounded-lg border border-white/20 transition-all duration-500 animate-in slide-in-from-top-2 fade-in">
                        <div className="space-y-4 text-xs sm:text-sm text-gray-700">
                          <p className="text-gray-600 italic mb-3">{currentContent.products.healthyCities.subtitle}</p>

                          {currentContent.products.healthyCities.items.map((product) => {
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
                  <h3 className="text-base font-medium text-gray-900 mb-4">Menü</h3>
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
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 p-6 sm:p-8 w-[95vw] sm:w-[700px] max-h-[90vh] overflow-y-auto transform origin-center transition-all duration-500 ease-out animate-in zoom-in-95 fade-in"
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
            <div className="text-sm sm:text-base text-gray-700 leading-relaxed space-y-4">
              <p className="font-medium text-gray-800">{selectedProduct.shortDescription}</p>
              <p>{selectedProduct.longDescription}</p>
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
                  {currentContent.products.healthSystems.items.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                  {currentContent.products.healthyCities.items.map((p) => (
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
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 p-6 sm:p-8 w-[95vw] sm:w-[800px] max-h-[90vh] overflow-y-auto transform origin-center transition-all duration-500 ease-out animate-in zoom-in-95 fade-in"
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
      <div className="absolute top-[75px] sm:top-[100px] left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={handleCtaClick} // Updated onClick to open the new modal
          className="bg-[#EBECEC]/60 rounded-xl text-gray-700 hover:bg-[#EBECEC]/80 transition-all duration-300 px-4 py-3 sm:px-3 sm:py-2 shadow-lg hover:shadow-xl inline-flex items-center gap-3 sm:gap-2 min-w-[200px] sm:min-w-[180px] justify-between backdrop-blur-sm"
        >
          <span className="text-xs sm:text-xs font-medium leading-tight">{selectedLanguage === "TR" ? "OW: veri analizinde yeni nesil yaklaşımlar" : "OW: next-generation approaches in data analysis"}</span>
          <div className="w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
            <ArrowRight className="w-4 h-4 text-[#0171E3]" />
          </div>
        </button>
      </div>

      {/* Hero Section */}
      <main className="flex-grow relative flex items-center justify-center px-4 pt-4 sm:pt-0">
        {/* Ortalanmış Görsel - Tek görsel ve opaklık animasyonu */}
        <div className="relative w-full max-w-[260px] h-[280px] sm:max-w-[500px] sm:h-[600px] -mt-20 sm:mt-0">
          <img
            src={heroImage || "/placeholder.svg"}
            alt="3D rendered human head with neural network pattern overlay representing AI and medical data analysis"
            className="absolute inset-0 w-full h-full object-contain hero-image-animated"
          />
        </div>

        {/* Sol altta metin - Mobilde optimize */}
        <div className="absolute bottom-24 left-4 sm:bottom-20 sm:left-10 z-20 text-left">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
            <h1 className="text-4xl sm:text-8xl font-bold text-gray-900 leading-none">OW</h1>
            <span className="text-base sm:text-2xl text-gray-800 font-medium">♡ Optimize the World ♡</span>
          </div>
          <div className="text-sm sm:text-xl text-gray-700 mt-3 sm:mt-2 max-w-[320px] sm:max-w-none leading-relaxed">
            <div className="fading-text space-y-1">
              <div>⌘ {selectedLanguage === "TR" ? "Sağlık Sistemleri için Akıllı Analitik" : "Smart Analytics for Health Systems"}</div>
              <div>⌘ {selectedLanguage === "TR" ? "Sağlıklı Kent Çözümleri" : "Healthy City Solutions"}</div>
            </div>
          </div>
        </div>
      </main>


    </div>
  )
}
