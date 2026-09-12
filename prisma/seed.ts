import { PrismaClient, type Certification } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

const DEMO_PASSWORD = "demo1234";

async function hash(pw: string) {
  return bcrypt.hash(pw, 10);
}

const CARBON_FACTOR_BY_MATERIAL: { match: RegExp; factor: number; grade: string }[] = [
  { match: /cam/i, factor: 0.55, grade: "B — belediye toplama noktalarından kabul ediliyor" },
  { match: /pet|plastik|ldpe|hdpe|film/i, factor: 1.9, grade: "B — ayrıştırılmış plastik toplama noktalarından kabul ediliyor" },
  { match: /kraft|kağıt|karton/i, factor: 0.75, grade: "A — kapıdan toplama (belediye geri dönüşüm kutusu) ile kabul ediliyor" },
  { match: /mantar|bambu/i, factor: 0.3, grade: "C — özel toplama noktası gerektirir, yaygın altyapı sınırlı" },
  { match: /nişasta|kompost/i, factor: 0.2, grade: "C — yalnızca endüstriyel kompost tesislerinde işlenebilir" },
];

function deriveSustainabilityMetrics(material: string, weightGrams: number | null, recycledContentPercent: number | null) {
  const rule = CARBON_FACTOR_BY_MATERIAL.find((r) => r.match.test(material));
  const factor = rule?.factor ?? 1.0;
  const grade = rule?.grade ?? "B — yerel altyapıya bağlı, tedarikçiye danışın";
  const baseWeight = weightGrams ?? 50;
  const recycledDiscount = 1 - (recycledContentPercent ?? 0) / 200; // recycled content halves impact at 100%
  const carbonFootprintGramsCO2e = Math.max(1, Math.round(baseWeight * factor * recycledDiscount));
  return { recyclabilityGrade: grade, carbonFootprintGramsCO2e };
}

async function main() {
  console.log("Veritabanı temizleniyor...");
  await db.itemCertification.deleteMany();
  await db.supplierCertification.deleteMany();
  await db.quoteRequest.deleteMany();
  await db.catalogItem.deleteMany();
  await db.certification.deleteMany();
  await db.supplier.deleteMany();
  await db.buyer.deleteMany();
  await db.user.deleteMany();
  await db.testimonial.deleteMany();
  await db.caseStudy.deleteMany();
  await db.knowledgeArticle.deleteMany();
  await db.faqItem.deleteMany();

  console.log("Sertifikalar oluşturuluyor...");
  const certDefs = [
    {
      name: "Geri Dönüşüm Uygunluk Belgesi (örnek)",
      issuingBody: "Sürdürülebilir Ambalaj Derneği (temsili)",
      description:
        "Ürünün geri dönüşüm akışına uygun malzeme ve tasarımda üretildiğini gösteren temsili bir örnek sertifika.",
    },
    {
      name: "Sürdürülebilir Orman Kaynağı Belgesi (örnek)",
      issuingBody: "Orman Kaynakları Yönetim Kurumu (temsili)",
      description:
        "Kağıt/karton bazlı ürünlerin sorumlu orman kaynaklarından geldiğini belirten temsili bir örnek sertifika.",
    },
    {
      name: "Kompostlanabilirlik Test Raporu (örnek)",
      issuingBody: "Bağımsız Malzeme Test Laboratuvarı (temsili)",
      description:
        "Ürünün endüstriyel kompost koşullarında biyolojik olarak parçalandığını gösteren temsili bir örnek rapor.",
    },
    {
      name: "Karbon Ayak İzi Beyan Formu (örnek)",
      issuingBody: "Çevresel Etki Değerlendirme Kurumu (temsili)",
      description:
        "Ürünün üretim sürecindeki tahmini karbon ayak izini özetleyen temsili bir örnek beyan.",
    },
  ];
  const certs: Certification[] = [];
  for (const c of certDefs) {
    certs.push(await db.certification.create({ data: c }));
  }
  const certByName = (n: string) => certs.find((c) => c.name === n)!;

  console.log("Tedarikçiler ve ürünler oluşturuluyor...");
  const supplierDefs = [
    {
      companyName: "YeşilPak Ambalaj A.Ş.",
      slug: "yesilpak-ambalaj",
      city: "İstanbul",
      region: "Marmara",
      foundedYear: 2011,
      description:
        "İstanbul merkezli YeşilPak, gıda ve e-ticaret markaları için geri dönüştürülmüş kartondan üretilen kutu ve dolgu çözümleri sunar.",
      logoInitials: "YP",
      logoColor: "#2f6b3a",
      sustainabilityScore: 84,
      contactName: "Elif Kaya",
      email: "tedarikci@surdurulebilirmarket.com",
      items: [
        {
          name: "Geri Dönüştürülmüş Oluklu Karton Kutu, Orta Boy",
          category: "Karton Kutu",
          material: "Geri dönüştürülmüş oluklu karton",
          recycledContentPercent: 90,
          weightGrams: 180,
          dimensions: "30x20x15 cm",
          minOrderQuantity: 500,
          unitPriceMinTRY: 6.5,
          unitPriceMaxTRY: 9.2,
          leadTimeDays: 12,
          imageColor: "#8a6d4b",
          sustainabilityTags: "Geri Dönüştürülebilir,Geri Dönüştürülmüş İçerik",
          description:
            "E-ticaret gönderileri için dayanıklı, %90 geri dönüştürülmüş içerikli orta boy nakliye kutusu.",
          certifications: ["Geri Dönüşüm Uygunluk Belgesi (örnek)"],
        },
        {
          name: "Mısır Nişastası Bazlı Dolgu Malzemesi",
          category: "Dolgu Malzemesi",
          material: "Mısır nişastası bazlı biyobozunur polimer",
          recycledContentPercent: null,
          weightGrams: 15,
          dimensions: "Dökme, 100 L çuval",
          minOrderQuantity: 20,
          unitPriceMinTRY: 180,
          unitPriceMaxTRY: 240,
          leadTimeDays: 18,
          imageColor: "#d8c69a",
          sustainabilityTags: "Kompostlanabilir,Biyobozunur",
          description:
            "Suda çözünen, endüstriyel kompost koşullarında tamamen parçalanabilen paketleme dolgu malzemesi.",
          certifications: ["Kompostlanabilirlik Test Raporu (örnek)"],
        },
        {
          name: "Kraft Kağıt Nakliye Zarfı",
          category: "Kağıt Poşet",
          material: "Geri dönüştürülmüş kraft kağıt",
          recycledContentPercent: 80,
          weightGrams: 25,
          dimensions: "35x25 cm",
          minOrderQuantity: 1000,
          unitPriceMinTRY: 1.8,
          unitPriceMaxTRY: 2.6,
          leadTimeDays: 10,
          imageColor: "#b98f5e",
          sustainabilityTags: "Geri Dönüştürülebilir,Plastiksiz",
          description: "Hafif ürünler için plastiksiz, tamamen kağıt bazlı nakliye zarfı.",
          certifications: ["Sürdürülebilir Orman Kaynağı Belgesi (örnek)"],
        },
        {
          name: "Oluklu Karton Şarap Bölmeli Kutu",
          category: "Karton Kutu",
          material: "Geri dönüştürülmüş oluklu karton",
          recycledContentPercent: 85,
          weightGrams: 320,
          dimensions: "40x30x35 cm",
          minOrderQuantity: 250,
          unitPriceMinTRY: 14,
          unitPriceMaxTRY: 19,
          leadTimeDays: 15,
          imageColor: "#7a5c3e",
          sustainabilityTags: "Geri Dönüştürülebilir",
          description: "6'lı ve 12'li şişe taşımacılığı için bölmeli, dayanıklı karton kutu.",
          certifications: ["Geri Dönüşüm Uygunluk Belgesi (örnek)"],
        },
      ],
    },
    {
      companyName: "Anadolu Sürdürülebilir Ambalaj",
      slug: "anadolu-surdurulebilir-ambalaj",
      city: "Bursa",
      region: "Marmara",
      foundedYear: 2015,
      description:
        "Bursa Organize Sanayi Bölgesi'nde faaliyet gösteren Anadolu Sürdürülebilir Ambalaj, cam ve geri dönüştürülmüş plastik ambalaj üretiminde uzmanlaşmıştır.",
      logoInitials: "AS",
      logoColor: "#3b5f7a",
      sustainabilityScore: 78,
      contactName: "Murat Yıldız",
      email: "murat.yildiz@anadolusurdurulebilir.example.com",
      items: [
        {
          name: "Geri Dönüştürülmüş Cam Kavanoz, 250 ml",
          category: "Cam Şişe / Kavanoz",
          material: "Geri dönüştürülmüş cam",
          recycledContentPercent: 60,
          weightGrams: 145,
          dimensions: "6x9 cm",
          minOrderQuantity: 1000,
          unitPriceMinTRY: 3.2,
          unitPriceMaxTRY: 4.5,
          leadTimeDays: 20,
          imageColor: "#a9c7d4",
          sustainabilityTags: "Geri Dönüştürülebilir,Yeniden Kullanılabilir",
          description: "Reçel, bal ve baharat gibi gıda ürünleri için sonsuz geri dönüştürülebilir cam kavanoz.",
          certifications: ["Geri Dönüşüm Uygunluk Belgesi (örnek)"],
        },
        {
          name: "Geri Dönüştürülmüş PET Şişe, 500 ml",
          category: "Geri Dönüştürülmüş PET Şişe",
          material: "rPET (geri dönüştürülmüş PET)",
          recycledContentPercent: 100,
          weightGrams: 28,
          dimensions: "6.5x21 cm",
          minOrderQuantity: 2000,
          unitPriceMinTRY: 2.1,
          unitPriceMaxTRY: 2.9,
          leadTimeDays: 14,
          imageColor: "#cfe3ea",
          sustainabilityTags: "Geri Dönüştürülmüş İçerik,Geri Dönüştürülebilir",
          description: "İçecek ve kozmetik ürünleri için %100 geri dönüştürülmüş PET'ten üretilmiş şişe.",
          certifications: ["Karbon Ayak İzi Beyan Formu (örnek)"],
        },
        {
          name: "Cam Şişe, 750 ml, Kabartmalı",
          category: "Cam Şişe / Kavanoz",
          material: "Geri dönüştürülmüş cam",
          recycledContentPercent: 55,
          weightGrams: 410,
          dimensions: "8x30 cm",
          minOrderQuantity: 800,
          unitPriceMinTRY: 6.8,
          unitPriceMaxTRY: 8.9,
          leadTimeDays: 22,
          imageColor: "#8fb3c2",
          sustainabilityTags: "Geri Dönüştürülebilir",
          description: "Zeytinyağı ve sirke gibi ürünler için özel kabartma baskı seçenekli cam şişe.",
          certifications: ["Geri Dönüşüm Uygunluk Belgesi (örnek)"],
        },
      ],
    },
    {
      companyName: "EkoKarton Sanayi",
      slug: "ekokarton-sanayi",
      city: "Kayseri",
      region: "İç Anadolu",
      foundedYear: 2009,
      description:
        "Kayseri merkezli EkoKarton, tekstil ve elektronik sektörüne özel ölçülü karton ambalaj çözümleri üretir.",
      logoInitials: "EK",
      logoColor: "#7a4a2f",
      sustainabilityScore: 72,
      contactName: "Ayşe Demir",
      email: "ayse.demir@ekokarton.example.com",
      items: [
        {
          name: "Özel Ölçülü Tekstil Kutusu",
          category: "Karton Kutu",
          material: "Geri dönüştürülmüş oluklu karton",
          recycledContentPercent: 75,
          weightGrams: 210,
          dimensions: "Özel ölçü (min 20x20x10 cm)",
          minOrderQuantity: 300,
          unitPriceMinTRY: 8,
          unitPriceMaxTRY: 12,
          leadTimeDays: 16,
          imageColor: "#a88b6c",
          sustainabilityTags: "Geri Dönüştürülebilir,Özel Üretim",
          description: "Tekstil markaları için baskı ve iç köpük seçenekli özel ölçülü karton kutu.",
          certifications: ["Sürdürülebilir Orman Kaynağı Belgesi (örnek)"],
        },
        {
          name: "Elektronik Ürün Koruma Kutusu",
          category: "Karton Kutu",
          material: "Geri dönüştürülmüş çift oluklu karton",
          recycledContentPercent: 70,
          weightGrams: 340,
          dimensions: "25x25x20 cm",
          minOrderQuantity: 200,
          unitPriceMinTRY: 15,
          unitPriceMaxTRY: 21,
          leadTimeDays: 18,
          imageColor: "#96795c",
          sustainabilityTags: "Geri Dönüştürülebilir,Darbe Dayanımlı",
          description: "Hassas elektronik ürünler için iç bölmeli, darbe emici karton ambalaj.",
          certifications: ["Geri Dönüşüm Uygunluk Belgesi (örnek)"],
        },
        {
          name: "Kraft Karton Hediye Kutusu",
          category: "Karton Kutu",
          material: "Kraft karton",
          recycledContentPercent: 65,
          weightGrams: 150,
          dimensions: "20x15x8 cm",
          minOrderQuantity: 500,
          unitPriceMinTRY: 5.5,
          unitPriceMaxTRY: 7.8,
          leadTimeDays: 14,
          imageColor: "#b08d5f",
          sustainabilityTags: "Geri Dönüştürülebilir",
          description: "Kozmetik ve hediye ürünleri için manyetik kapaklı zarif kraft kutu.",
          certifications: ["Sürdürülebilir Orman Kaynağı Belgesi (örnek)"],
        },
      ],
    },
    {
      companyName: "Doğa Dostu Ambalaj Çözümleri",
      slug: "doga-dostu-ambalaj",
      city: "İzmir",
      region: "Ege",
      foundedYear: 2017,
      description:
        "İzmir Gaziemir'de konumlanan Doğa Dostu, kozmetik ve kişisel bakım markaları için biyobozunur film ve şişe üretir.",
      logoInitials: "DD",
      logoColor: "#4a7a4f",
      sustainabilityScore: 88,
      contactName: "Cem Aydın",
      email: "cem.aydin@dogadostu.example.com",
      items: [
        {
          name: "Biyobozunur Kozmetik Ambalaj Filmi",
          category: "Biyobozunur Plastik Film",
          material: "PLA bazlı biyobozunur film",
          recycledContentPercent: null,
          weightGrams: 8,
          dimensions: "Rulo, 500 m",
          minOrderQuantity: 50,
          unitPriceMinTRY: 95,
          unitPriceMaxTRY: 130,
          leadTimeDays: 20,
          imageColor: "#c9dfc7",
          sustainabilityTags: "Kompostlanabilir,Biyobozunur",
          description: "Kozmetik numune ve tekli paketleme için endüstriyel kompostlanabilir ambalaj filmi.",
          certifications: ["Kompostlanabilirlik Test Raporu (örnek)"],
        },
        {
          name: "Mantar Tıpalı Cam Şişe, 100 ml",
          category: "Mantar Tıpa",
          material: "Cam gövde + doğal mantar tıpa",
          recycledContentPercent: 40,
          weightGrams: 90,
          dimensions: "4x12 cm",
          minOrderQuantity: 600,
          unitPriceMinTRY: 7.5,
          unitPriceMaxTRY: 10.2,
          leadTimeDays: 24,
          imageColor: "#d9c9a3",
          sustainabilityTags: "Yenilenebilir Kaynak,Geri Dönüştürülebilir",
          description: "Serum ve yağ bazlı kozmetik ürünler için doğal mantar tıpalı zarif cam şişe.",
          certifications: ["Sürdürülebilir Orman Kaynağı Belgesi (örnek)"],
        },
        {
          name: "Bambu Kapaklı Krem Kavanozu",
          category: "Bambu Ambalaj",
          material: "Cam gövde + bambu kapak",
          recycledContentPercent: 30,
          weightGrams: 120,
          dimensions: "5x5 cm",
          minOrderQuantity: 800,
          unitPriceMinTRY: 9,
          unitPriceMaxTRY: 12.5,
          leadTimeDays: 22,
          imageColor: "#cdbb8e",
          sustainabilityTags: "Yenilenebilir Kaynak,Plastiksiz",
          description: "Doğal bambu kapaklı, plastiksiz krem ve merhem kavanozu.",
          certifications: ["Sürdürülebilir Orman Kaynağı Belgesi (örnek)"],
        },
      ],
    },
    {
      companyName: "Geri Döngü Ambalaj Teknolojileri",
      slug: "geri-dongu-ambalaj",
      city: "Kocaeli",
      region: "Marmara",
      foundedYear: 2013,
      description:
        "Kocaeli merkezli Geri Döngü, sanayi ve lojistik sektörüne yönelik geri dönüştürülmüş plastik palet örtüsü ve streç film üretir.",
      logoInitials: "GD",
      logoColor: "#5a5a5a",
      sustainabilityScore: 69,
      contactName: "Selin Arslan",
      email: "selin.arslan@geridongu.example.com",
      items: [
        {
          name: "Geri Dönüştürülmüş Streç Film",
          category: "Biyobozunur Plastik Film",
          material: "Geri dönüştürülmüş LDPE",
          recycledContentPercent: 50,
          weightGrams: 2500,
          dimensions: "Rulo, 500 mm x 300 m",
          minOrderQuantity: 100,
          unitPriceMinTRY: 65,
          unitPriceMaxTRY: 85,
          leadTimeDays: 10,
          imageColor: "#c7cdd6",
          sustainabilityTags: "Geri Dönüştürülmüş İçerik,Geri Dönüştürülebilir",
          description: "Palet sabitleme için %50 geri dönüştürülmüş içerikli endüstriyel streç film.",
          certifications: ["Geri Dönüşüm Uygunluk Belgesi (örnek)"],
        },
        {
          name: "Geri Dönüştürülmüş Plastik Palet Örtüsü",
          category: "Biyobozunur Plastik Film",
          material: "Geri dönüştürülmüş HDPE",
          recycledContentPercent: 60,
          weightGrams: 1800,
          dimensions: "120x100 cm",
          minOrderQuantity: 150,
          unitPriceMinTRY: 22,
          unitPriceMaxTRY: 30,
          leadTimeDays: 12,
          imageColor: "#b9c2cc",
          sustainabilityTags: "Geri Dönüştürülmüş İçerik",
          description: "Nakliye sırasında paletleri koruyan dayanıklı, geri dönüştürülmüş örtü.",
          certifications: ["Geri Dönüşüm Uygunluk Belgesi (örnek)"],
        },
      ],
    },
    {
      companyName: "Toprak Ana Ambalaj",
      slug: "toprak-ana-ambalaj",
      city: "Denizli",
      region: "Ege",
      foundedYear: 2019,
      description:
        "Denizli'de kurulan genç bir girişim olan Toprak Ana, tekstil ve ev tekstili markaları için kağıt bazlı, plastiksiz ambalaj geliştirir.",
      logoInitials: "TA",
      logoColor: "#8a5a3a",
      sustainabilityScore: 91,
      contactName: "Deniz Korkmaz",
      email: "deniz.korkmaz@topraka.example.com",
      items: [
        {
          name: "Plastiksiz Kağıt Bant",
          category: "Kağıt Poşet",
          material: "Kraft kağıt + su bazlı yapıştırıcı",
          recycledContentPercent: 70,
          weightGrams: 60,
          dimensions: "Rulo, 50 mm x 50 m",
          minOrderQuantity: 300,
          unitPriceMinTRY: 12,
          unitPriceMaxTRY: 16,
          leadTimeDays: 9,
          imageColor: "#c3a577",
          sustainabilityTags: "Plastiksiz,Geri Dönüştürülebilir",
          description: "Karton kutu kapatma için plastik içermeyen, geri dönüştürülebilir kağıt bant.",
          certifications: ["Sürdürülebilir Orman Kaynağı Belgesi (örnek)"],
        },
        {
          name: "Dokuma Kağıp İp ile Kapatmalı Tekstil Poşeti",
          category: "Kağıt Poşet",
          material: "Geri dönüştürülmüş kraft kağıt",
          recycledContentPercent: 85,
          weightGrams: 35,
          dimensions: "30x40 cm",
          minOrderQuantity: 1000,
          unitPriceMinTRY: 3.4,
          unitPriceMaxTRY: 4.6,
          leadTimeDays: 11,
          imageColor: "#cbb187",
          sustainabilityTags: "Plastiksiz,Geri Dönüştürülebilir",
          description: "Ev tekstili ürünleri için ip kapatmalı, plastiksiz kağıt poşet.",
          certifications: ["Geri Dönüşüm Uygunluk Belgesi (örnek)"],
        },
      ],
    },
  ];

  const createdSuppliers: { id: string; slug: string }[] = [];
  const createdItems: { id: string; slug: string; supplierId: string }[] = [];

  for (const s of supplierDefs) {
    const user = await db.user.create({
      data: {
        email: s.email,
        passwordHash: await hash(DEMO_PASSWORD),
        role: "SUPPLIER",
      },
    });
    const supplier = await db.supplier.create({
      data: {
        userId: user.id,
        companyName: s.companyName,
        slug: s.slug,
        city: s.city,
        region: s.region,
        foundedYear: s.foundedYear,
        description: s.description,
        logoInitials: s.logoInitials,
        logoColor: s.logoColor,
        sustainabilityScore: s.sustainabilityScore,
        contactName: s.contactName,
        contactEmail: s.email,
      },
    });
    createdSuppliers.push({ id: supplier.id, slug: supplier.slug });

    for (const it of s.items) {
      const slug = `${s.slug}-${it.name}`
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/ç/g, "c")
        .replace(/ğ/g, "g")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ş/g, "s")
        .replace(/ü/g, "u")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const sku = `SM-${slug.slice(0, 6).toUpperCase()}-${Math.floor(Math.random() * 9000 + 1000)}`;
      const { recyclabilityGrade, carbonFootprintGramsCO2e } = deriveSustainabilityMetrics(
        it.material,
        it.weightGrams,
        it.recycledContentPercent
      );

      const item = await db.catalogItem.create({
        data: {
          supplierId: supplier.id,
          name: it.name,
          sku,
          slug,
          category: it.category,
          material: it.material,
          recycledContentPercent: it.recycledContentPercent ?? undefined,
          weightGrams: it.weightGrams,
          dimensions: it.dimensions,
          minOrderQuantity: it.minOrderQuantity,
          unitPriceMinTRY: it.unitPriceMinTRY,
          unitPriceMaxTRY: it.unitPriceMaxTRY,
          leadTimeDays: it.leadTimeDays,
          imageColor: it.imageColor,
          sustainabilityTags: it.sustainabilityTags,
          description: it.description,
          recyclabilityGrade,
          carbonFootprintGramsCO2e,
          lastVerifiedAt: new Date(Date.now() - Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000),
        },
      });
      createdItems.push({ id: item.id, slug: item.slug, supplierId: supplier.id });

      for (const certName of it.certifications) {
        await db.itemCertification.create({
          data: { catalogItemId: item.id, certificationId: certByName(certName).id },
        });
      }
    }

    // Ana sertifika bağlantısı (şirket düzeyinde de bir sertifika göster)
    await db.supplierCertification.create({
      data: {
        supplierId: supplier.id,
        certificationId: certByName("Karbon Ayak İzi Beyan Formu (örnek)").id,
      },
    });
  }

  console.log("Alıcılar oluşturuluyor...");
  const buyerDefs = [
    {
      companyName: "Taze Bahçe Gıda",
      sector: "Gıda",
      city: "İstanbul",
      contactName: "Burak Şen",
      email: "alici@surdurulebilirmarket.com",
    },
    {
      companyName: "Anadolu Kozmetik",
      sector: "Kozmetik",
      city: "Ankara",
      contactName: "Zeynep Aksoy",
      email: "zeynep.aksoy@anadolukozmetik.example.com",
    },
  ];

  const createdBuyers: { id: string }[] = [];
  for (const b of buyerDefs) {
    const user = await db.user.create({
      data: { email: b.email, passwordHash: await hash(DEMO_PASSWORD), role: "BUYER" },
    });
    const buyer = await db.buyer.create({
      data: {
        userId: user.id,
        companyName: b.companyName,
        sector: b.sector,
        city: b.city,
        contactName: b.contactName,
        contactEmail: b.email,
      },
    });
    createdBuyers.push({ id: buyer.id });
  }

  console.log("Örnek teklif/numune talepleri oluşturuluyor...");
  const statuses = ["PENDING", "RESPONDED", "ACCEPTED", "DECLINED"] as const;
  const sampleRequests = [
    { buyerIdx: 0, itemIdx: 0, type: "QUOTE" as const, quantity: 2000, statusIdx: 1 },
    { buyerIdx: 0, itemIdx: 1, type: "SAMPLE" as const, quantity: 5, statusIdx: 0 },
    { buyerIdx: 0, itemIdx: 4, type: "QUOTE" as const, quantity: 5000, statusIdx: 2 },
    { buyerIdx: 1, itemIdx: 7, type: "QUOTE" as const, quantity: 1000, statusIdx: 0 },
    { buyerIdx: 1, itemIdx: 8, type: "SAMPLE" as const, quantity: 3, statusIdx: 3 },
    { buyerIdx: 1, itemIdx: 2, type: "QUOTE" as const, quantity: 800, statusIdx: 1 },
  ];
  for (const r of sampleRequests) {
    const item = createdItems[r.itemIdx];
    if (!item) continue;
    await db.quoteRequest.create({
      data: {
        buyerId: createdBuyers[r.buyerIdx].id,
        catalogItemId: item.id,
        type: r.type,
        quantity: r.quantity,
        message: r.type === "QUOTE" ? "Aylık düzenli sipariş için fiyat teklifi rica ediyoruz." : "Kalite değerlendirmesi için numune talep ediyoruz.",
        status: statuses[r.statusIdx],
      },
    });
  }

  console.log("Referanslar, vaka analizleri, bilgi merkezi ve SSS ekleniyor...");
  await db.testimonial.createMany({
    data: [
      {
        authorName: "Burak Şen",
        authorTitle: "Satın Alma Müdürü",
        companyName: "Taze Bahçe Gıda",
        quote:
          "Tedarikçi karşılaştırmasını tek ekrandan yapabilmek, ambalaj maliyetlerimizi üç ayda gözle görülür şekilde düşürdü.",
      },
      {
        authorName: "Zeynep Aksoy",
        authorTitle: "Operasyon Direktörü",
        companyName: "Anadolu Kozmetik",
        quote:
          "Numune talep süreci öncesinde haftalar süren tedarikçi görüşmeleri artık birkaç güne indi.",
      },
      {
        authorName: "Elif Kaya",
        authorTitle: "Kurucu Ortak",
        companyName: "YeşilPak Ambalaj A.Ş.",
        quote:
          "Platform sayesinde daha önce ulaşamadığımız markalarla doğrudan bağlantı kurabiliyoruz.",
      },
    ],
  });

  await db.caseStudy.createMany({
    data: [
      {
        slug: "taze-bahce-gida-maliyet-optimizasyonu",
        title: "Taze Bahçe Gıda, ambalaj maliyetlerini %34 azalttı",
        summary:
          "Gıda markası, tedarikçi konsolidasyonu ve standart kutu boyutlarına geçişle önemli bir maliyet avantajı sağladı.",
        body: `Taze Bahçe Gıda, İstanbul merkezli orta ölçekli bir gıda markası olarak, e-ticaret sevkiyatları için beş farklı bölgesel tedarikçiden dağınık şekilde karton kutu ve dolgu malzemesi satın alıyordu. Her tedarikçiyle ayrı ayrı fiyat görüşmesi yapmak ve teslim sürelerini takip etmek satın alma ekibinin önemli bir zamanını alıyordu.

## Süreç
Ekip, Sürdürülebilir Market üzerinden benzer özellikli (aynı FEFCO tipi, benzer geri dönüşüm içeriği) karton kutuları tek ekrandan karşılaştırdı. Üç farklı tedarikçiden numune talep ederek dayanıklılık ve baskı kalitesini yerinde test etti.

## Sonuç
Karşılaştırma sonucunda iki tedarikçiye konsolide oldular ve nakliye sırasında kutu boyutlarını standartlaştırarak palet doluluk oranını artırdılar. Tedarikçi sayısının azalması, birim başına pazarlık gücünü de artırdı. Toplamda ambalaj maliyetlerinde %34 azalma sağlandı; bu rakam, konsolidasyon öncesi ve sonrası üç aylık ortalama birim maliyet karşılaştırmasına dayanmaktadır.`,
        metricLabel: "Ambalaj maliyeti azalması",
        metricValue: "%34",
      },
      {
        slug: "anadolu-kozmetik-tedarik-suresi",
        title: "Anadolu Kozmetik, tedarikçi bulma süresini haftalardan günlere indirdi",
        summary:
          "Kozmetik markası, biyobozunur ambalaj arayışında birden fazla tedarikçiyi aynı anda değerlendirebildi.",
        body: `Ankara merkezli Anadolu Kozmetik, ürün gamını plastiksiz ve kompostlanabilir ambalaja geçirmeyi planlıyordu, ancak bu konuda uzmanlaşmış yerli tedarikçi bulmak zordu. Önceki süreçte tedarikçi araştırması e-posta ve telefon görüşmeleriyle yürütülüyor, her biriyle ayrı ayrı teknik özellik netleştirmek haftalar sürüyordu.

## Süreç
Platform üzerinden "Kompostlanabilir" ve "Plastiksiz" etiketli ürünleri filtreleyerek üç farklı tedarikçiyi aynı anda değerlendirdiler. Her tedarikçiden numune talebi gönderip malzeme performansını (nem direnci, kapatma kalitesi) kendi laboratuvarlarında karşılaştırdılar.

## Sonuç
Tedarikçi bulma ve ilk numune değerlendirme süreci, önceki haftalar mertebesinden yaklaşık 3 güne indi. Ekip, seçtikleri tedarikçiyle EN 13432 sertifikasını ve tedarik zinciri detaylarını doğrudan panel üzerinden gönderilen taleple netleştirdi.`,
        metricLabel: "Tedarikçi bulma süresi",
        metricValue: "Haftalardan 3 güne",
      },
    ],
  });

  await db.knowledgeArticle.createMany({
    data: [
      {
        slug: "yasam-dongusu-perspektifi-neden-onemli",
        title: "Yaşam Döngüsü Perspektifi Neden Önemli?",
        excerpt:
          "\"Hangi ambalaj daha sürdürülebilir?\" sorusunun tek kelimelik bir cevabı yok — doğru cevap, o ambalajın tüm yaşam döngüsüne bakmayı gerektiriyor.",
        body: `Bir ambalaj markete gelene kadar birçok aşamadan geçer: hammadde çıkarımı, üretim, baskı, taşıma, kullanım ve kullanım ömrü sonu (geri dönüşüm, kompostlama veya depolama). Bir malzemeyi "sürdürülebilir" ya da "sürdürülebilir değil" diye tek bir özelliğine bakarak etiketlemek, bu aşamaların çoğunu görmezden gelmek anlamına gelir. Bu bütüncül bakış açısına yaşam döngüsü değerlendirmesi (Life Cycle Assessment, LCA) denir ve uluslararası olarak ISO 14040 standardıyla tanımlanır.

## Tek bir özellik yeterli bir gösterge değil
Cam, teorik olarak sonsuz sayıda geri dönüştürülebilir bir malzemedir. Ama aynı zamanda ağırdır; bu da taşıma sırasında daha fazla yakıt tüketimi ve daha yüksek karbon emisyonu anlamına gelebilir. Kağıt hızlı bozunur ve tanıdık bir "doğal" imaj taşır, ama üretimi su ve enerji yoğun olabilir. Tek malzemeli bir plastik poşet, "plastik" olduğu için önyargıyla değerlendirilebilir, ama yerel geri dönüşüm altyapısı gerçekten var olan bir bölgede çok malzemeli bir alternatiften daha düşük toplam etkiye sahip olabilir.

## Sorulması gereken sorular
Hammadde nereden ve nasıl elde ediliyor (birincil mi, geri dönüştürülmüş mü)? Üretim süreci ne kadar enerji/su yoğun? Ambalajın ağırlığı ve hacmi taşıma etkisini nasıl değiştiriyor? Ürünün gideceği bölgede bu malzemeyi işleyecek gerçek bir altyapı var mı? Ambalaj, ürünün israfını önleyerek dolaylı bir fayda sağlıyor mu?

## Karbon ayak izi, LCA'nın bir çıktısıdır
Sık duyduğunuz "karbon ayak izi" aslında yaşam döngüsü değerlendirmesinin ürettiği ölçümlerden biridir. Bir ambalaj için tek başına bir karbon rakamı görmek yerine, bu rakamın hangi aşamaları kapsadığını (sadece üretim mi, yoksa taşıma ve kullanım ömrü sonu dahil mi) sormak, rakamın ne kadar güvenilir olduğunu anlamanıza yardımcı olur.

## Mevzuat da bu yöne gidiyor
AB'nin PPWR (Ambalaj ve Ambalaj Atığı Tüzüğü) düzenlemesi de tam olarak bu bütüncül bakışı zorunlu kılıyor: şirketlerden artık sadece "geri dönüştürülebilir mi" değil, ambalajın ağırlığı, hacmi ve malzeme kaynağı gibi birden fazla veri noktasını raporlamaları isteniyor.`,
        category: "Sürdürülebilirlik",
      },
      {
        slug: "geri-donusumun-gercek-orani-nedir",
        title: "Geri Dönüşümün Gerçek Oranı Nedir?",
        excerpt:
          "Türkiye'nin geri dönüşüm oranı hakkında birbirinden farklı rakamlar dolaşıyor. Bu farkın nereden geldiğini ve neden dikkatli okunması gerektiğini açıklıyoruz.",
        body: `"Geri dönüşüm oranı" tek bir sayı gibi görünse de, kaynağa göre çok farklı rakamlarla karşılaşabilirsiniz. Bunun nedeni, farklı kurumların farklı şeyleri ölçmesi ve farklı terimler kullanmasıdır.

## Resmi rakamlar ne diyor
Sıfır Atık Projesi kapsamında açıklanan verilere göre, Türkiye'de belediye atığı geri kazanım oranı 2017'de %13 iken 2024'te %36,08'e yükseldi; 2035 hedefi %60. Ayrıca 2025'te devreye giren Depozito Yönetim Sistemi (DYS), 0,1-3 litre aralığındaki cam, plastik ve alüminyum ambalajları kapsayarak yılda yaklaşık 25 milyar ambalajın geri kazanımını hedefliyor.

## Sektör kaynakları neden farklı rakam veriyor
Bazı sektör değerlendirmeleri, Türkiye'nin gerçek "geri dönüşüm" oranını (atığın fiilen yeniden malzemeye dönüştürülme oranı) %11-12 civarında olarak işaret ediyor — dünya ortalamasının (~%20) altında bir seviye. Bu fark büyük ölçüde "geri kazanım" ile "geri dönüşüm" terimlerinin karıştırılmasından kaynaklanıyor: geri kazanım, atığın kaynağında ayrıştırılıp bir sisteme dahil edilmesini kapsayan geniş bir kategori; geri dönüşüm ise o atığın fiilen yeni bir ürüne dönüştürülmesini ifade eden daha dar bir metrik.

## Bunun ambalaj kararlarınıza etkisi
Bir malzemeyi "geri dönüştürülebilir" olarak etiketlemek teknik olarak doğru olabilir, ama bu, o malzemenin sizin hedef pazarınızda gerçekten geri dönüştürüleceği anlamına gelmez. Ambalaj kararı verirken şunu sormak daha isabetli: "Bu ambalaj, ürünümün gideceği bölgede fiilen işlenebilecek bir altyapıya sahip mi?"

## Tedarikçinize sorabileceğiniz sorular
Bu malzeme hangi ülkelerde/şehirlerde fiilen geri dönüştürülüyor? Geri dönüşüm oranı hangi kaynağa dayanıyor? Ürün karışık malzemeden mi yoksa tek malzemeden mi üretiliyor — karışık malzemeler genellikle ayrıştırma gerektirdiği için geri dönüşüm oranını düşürür.`,
        category: "Geri Dönüşüm",
      },
      {
        slug: "ambalaj-sertifikalarini-okuma-rehberi",
        title: "Ambalaj Sertifikalarını Okuma Rehberi",
        excerpt:
          "FSC, EN 13432 ve geri dönüşüm sembolleri sık karşılaştığınız ama genelde tam anlaşılmayan işaretler. Ne anlama geldiklerini adım adım açıklıyoruz.",
        body: `## FSC — orman kaynaklı malzemeler için
FSC (Forest Stewardship Council) etiketi, kağıt/karton bazlı bir ambalajın sorumlu yönetilen ormanlardan geldiğini gösterir. Üç ana etiket türü vardır: FSC 100% (tamamen sertifikalı ormandan), FSC Recycled (tamamen geri dönüştürülmüş malzemeden) ve FSC Mix (karışım). Bir ambalajın FSC etiketi taşıyabilmesi için, tedarik zincirindeki her kuruluşun ayrıca FSC CoC (Gözetim Zinciri) sertifikasına sahip olması gerekir.

## EN 13432 — endüstriyel kompostlanabilirlik için
EN 13432 (Türkiye'de TS EN 13432), bir ambalajın endüstriyel kompost tesisinde gerçekten kompostlanabildiğini kanıtlamak için kullanılan standarttır. Bu standarda göre sertifikalanan bir malzeme, ~58°C'lik endüstriyel kompost ortamında 12 hafta içinde fiziksel olarak parçalanmalı ve 6 ay içinde en az %90'ı biyolojik olarak CO₂'ye dönüşmelidir. Önemli nokta: bu standart endüstriyel kompostlama için geçerlidir — ev tipi kompostlama için henüz ortak bir uluslararası standart yoktur.

## Geri dönüşüm üçgeni ve reçine kodları
Plastik ambalajlarda gördüğünüz numaralı üçgen sembol (1-7 arası) o plastiğin reçine türünü gösterir — tek başına "bu ürün geri dönüştürülür" anlamına gelmez, sadece malzeme ailesini belirtir. Bir plastiğin gerçekten geri dönüştürülüp dönüştürülemeyeceği, o bölgedeki tesisin o reçine türünü işleyip işlemediğine bağlıdır.

## Öz beyan mı, bağımsız sertifika mı?
Öz beyan (self-declared claim), üreticinin kendi ifadesidir — ambalaj üzerinde "çevre dostu" yazması bağımsız bir denetimden geçtiği anlamına gelmez. Üçüncü taraf sertifikalı bir iddia (FSC, EN 13432 gibi) ise akredite bağımsız bir kuruluş tarafından düzenli denetimlerle doğrulanır.

## Bir sertifikayı gördüğünüzde ne yapmalısınız
Sertifikanın hangi kapsamı belgelediğini anlayın (malzeme mi, süreç mi, tesis mi?). Koşullu iddialarda hangi koşulun kastedildiğini sorun. Mümkünse tedarikçiden güncel sertifika belgesini isteyin — logo görmek, belgeyi görmekle aynı şey değildir.`,
        category: "Sertifikasyon",
      },
      {
        slug: "tedarikci-secerken-sorulacak-10-soru",
        title: "Sürdürülebilir Ambalaj Tedarikçisi Seçerken Sorulacak 10 Soru",
        excerpt: "Karar öncesi kontrol listesi.",
        body:
          "Minimum sipariş miktarından teslim süresine, sertifikasyon geçerliliğinden fiyat bandına kadar tedarikçi değerlendirmesinde sorulması gereken pratik sorular.",
        category: "Rehber",
      },
    ],
  });

  await db.faqItem.createMany({
    data: [
      {
        order: 1,
        question: "Platform üzerinden doğrudan ödeme yapabilir miyim?",
        answer:
          "Hayır — platform, alıcı ve tedarikçiyi teklif/numune talebi üzerinden buluşturan bir eşleştirme hizmetidir. Ödeme, sözleşme ve teslimat şartları taraflar arasında doğrudan yürütülür; Sürdürülebilir Market bu işlemin tarafı değildir. Bu yaklaşım, tedarikçilerin kendi ödeme koşullarını (vade, para birimi, teslim şekli) esnek şekilde sunabilmesini sağlar.",
      },
      {
        order: 2,
        question: "Tedarikçi olarak nasıl katalog oluşturabilirim?",
        answer:
          "Önce /tedarikci-ol sayfasından firma hesabınızı oluşturursunuz. Ardından tedarikçi panelinizden ürün ekleyebilir; her ürün için kategori, malzeme, boyut, minimum sipariş miktarı, teslim süresi, fiyat bandı ve sürdürülebilirlik etiketlerini girebilirsiniz. Ürününüz kaydedildiği anda katalogda ve arama sonuçlarında görünür hale gelir.",
      },
      {
        order: 3,
        question: "Sertifikalar gerçek akreditasyon kurumlarından mı?",
        answer:
          "Bu erken sürümdeki sertifikalar temsili örneklerdir ve açıkça \"(örnek)\" etiketiyle işaretlenmiştir. Gerçek kullanımda tedarikçilerin FSC, EN 13432 gibi güncel ve doğrulanabilir belgelerini sisteme yüklemesi ve alıcıların bu belgeleri talep edebilmesi beklenir. Sertifikaların öz beyan mı yoksa üçüncü taraf doğrulamalı mı olduğunu değerlendirirken Sürdürülebilirlik sayfamızdaki rehbere bakabilirsiniz.",
      },
      {
        order: 4,
        question: "Minimum sipariş miktarının altında sipariş verebilir miyim?",
        answer:
          "Bu genellikle tedarikçiye ve malzeme türüne bağlıdır; kalıp/baskı maliyeti yüksek ürünlerde (örn. özel baskılı kutular) minimum miktar daha katı olabilirken, stoktan satılan standart ürünlerde esneklik daha olasıdır. Teklif talebi gönderirken ihtiyacınızı ve esneklik beklentinizi mesaj alanında belirtmenizi öneririz.",
      },
      {
        order: 5,
        question: "Uyumluluk/raporlama modülü hangi mevzuatı kapsıyor?",
        answer:
          "Bu modül; Türkiye'deki Genişletilmiş Üretici Sorumluluğu (GÜS) çerçevesi, Depozito Yönetim Sistemi (DYS) ve AB'nin PPWR düzenlemesiyle karşılaştırmasına genel ve güncel bir bakış sunar. Detaylar için Sürdürülebilirlik sayfamıza bakabilirsiniz; ancak bu içerik bağlayıcı hukuki danışmanlık yerine geçmez ve güncel mevzuat için resmi kurumlara başvurulmalıdır.",
      },
      {
        order: 6,
        question: "Numune talebi ne kadar sürede yanıtlanır?",
        answer:
          "Yanıt süresi tedarikçiye ve ürünün stok durumuna göre değişir; talebinizin durumunu (Beklemede / Yanıtlandı / Kabul Edildi / Reddedildi) alıcı panelinizden gerçek zamanlı takip edebilirsiniz.",
      },
      {
        order: 7,
        question: "Ürün sayfasındaki karbon ayak izi ve geri dönüştürülebilirlik notu nasıl hesaplanıyor?",
        answer:
          "Bu değerler, ürünün malzeme türü, birim ağırlığı ve geri dönüştürülmüş içerik oranına dayalı basitleştirilmiş bir tahmindir; bağımsız bir yaşam döngüsü değerlendirmesinin (LCA) yerine geçmez. Amacı, alıcıların ürünleri hızlıca kıyaslayabilmesi için bir başlangıç noktası sunmaktır. Bağlayıcı bir karar öncesinde tedarikçiden ürüne özel LCA raporu talep etmenizi öneririz.",
      },
      {
        order: 8,
        question: "Birden fazla tedarikçiden aynı anda teklif isteyebilir miyim?",
        answer:
          "Evet. Pazar yerinde farklı tedarikçilere ait benzer ürünleri karşılaştırıp her birine ayrı ayrı teklif talebi gönderebilirsiniz; tüm talepleriniz alıcı panelinizde tek listede görünür.",
      },
      {
        order: 9,
        question: "Tedarikçi olarak gelen bir talebi nasıl reddederim veya yanıtlarım?",
        answer:
          "Tedarikçi panelinizdeki \"Gelen Talepler\" sayfasında her talebin yanında durumunu güncelleyebileceğiniz butonlar bulunur (Yanıtlandı, Kabul Edildi veya Reddedildi olarak işaretleme). Bu güncelleme anında alıcının panelinde de yansır.",
      },
      {
        order: 10,
        question: "Verilerim ve iletişim bilgilerim kimlerle paylaşılıyor?",
        answer:
          "Bir teklif/numune talebi gönderdiğinizde, yalnızca talebe konu bilgiler (miktar, mesaj, iletişim bilgileriniz) ilgili tedarikçiyle paylaşılır. Detaylar için Gizlilik Politikamıza bakabilirsiniz.",
      },
    ],
  });

  console.log("Seed tamamlandı.");
  console.log("Demo alıcı girişi: alici@surdurulebilirmarket.com / " + DEMO_PASSWORD);
  console.log("Demo tedarikçi girişi: tedarikci@surdurulebilirmarket.com / " + DEMO_PASSWORD);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
