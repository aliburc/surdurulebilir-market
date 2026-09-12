import { PrismaClient, type Certification } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

const DEMO_PASSWORD = "demo1234";

async function hash(pw: string) {
  return bcrypt.hash(pw, 10);
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
        body:
          "Taze Bahçe Gıda, dağınık tedarikçi ilişkilerini tek bir platform üzerinden yönetmeye başladıktan sonra, benzer özellikli kutuları karşılaştırarak daha uygun fiyatlı tedarikçilere geçiş yaptı. Standartlaştırılmış kutu boyutları sayesinde nakliye doluluk oranı da arttı.",
        metricLabel: "Ambalaj maliyeti azalması",
        metricValue: "%34",
      },
      {
        slug: "anadolu-kozmetik-tedarik-suresi",
        title: "Anadolu Kozmetik, tedarikçi bulma süresini haftalardan günlere indirdi",
        summary:
          "Kozmetik markası, biyobozunur ambalaj arayışında birden fazla tedarikçiyi aynı anda değerlendirebildi.",
        body:
          "Daha önce e-posta ve telefonla yürütülen tedarikçi araştırması, katalog üzerinden filtreleme ile saatler içine indi. Numune talep akışı sayesinde karar verme süreci de hızlandı.",
        metricLabel: "Tedarikçi bulma süresi",
        metricValue: "Haftalardan 3 güne",
      },
    ],
  });

  await db.knowledgeArticle.createMany({
    data: [
      {
        slug: "turkiyede-ambalaj-atigi-mevzuatina-giris",
        title: "Türkiye'de Ambalaj Atığı Mevzuatına Genel Bir Bakış",
        excerpt: "Genişletilmiş üretici sorumluluğu kapsamında markaların bilmesi gereken temel kavramlar.",
        body:
          "Bu içerik, Türkiye'deki ambalaj atığı yönetimi çerçevesine genel bir giriş sunar ve temsili örnekler içerir; güncel ve bağlayıcı mevzuat için ilgili resmi kurumlara ve hukuk danışmanlarına başvurulmalıdır.",
        category: "Mevzuat",
      },
      {
        slug: "geri-donusturulmus-icerik-nasil-dogrulanir",
        title: "Geri Dönüştürülmüş İçerik Oranı Nasıl Doğrulanır?",
        excerpt: "Tedarikçi beyanlarını değerlendirirken dikkat edilmesi gereken noktalar.",
        body:
          "Geri dönüştürülmüş içerik oranı iddialarını değerlendirirken bağımsız test raporları ve izlenebilirlik belgeleri talep etmek önemlidir. Bu makale, alıcıların tedarikçi seçerken sorabileceği örnek soruları listeler.",
        category: "Rehber",
      },
      {
        slug: "kompostlanabilir-ambalaj-ne-zaman-doğru-secim",
        title: "Kompostlanabilir Ambalaj Ne Zaman Doğru Seçimdir?",
        excerpt: "Kompostlanabilir malzemelerin avantaj ve sınırlamaları.",
        body:
          "Kompostlanabilir ambalajlar her senaryoda en sürdürülebilir seçenek olmayabilir; yerel atık altyapısının kompost tesislerine erişimi olup olmadığı değerlendirilmelidir.",
        category: "Rehber",
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
          "Şu an için platform, alıcı ve tedarikçiyi teklif/numune talebi üzerinden buluşturuyor; ödeme ve sözleşme süreçleri taraflar arasında doğrudan yürütülüyor.",
      },
      {
        order: 2,
        question: "Tedarikçi olarak nasıl katalog oluşturabilirim?",
        answer: "Tedarikçi panelinden ürünlerinizi ekleyebilir, sertifikalarınızı ve fiyat bandınızı belirtebilirsiniz.",
      },
      {
        order: 3,
        question: "Sertifikalar gerçek akreditasyon kurumlarından mı?",
        answer:
          "Bu demo sürümdeki sertifikalar temsili örneklerdir; gerçek kullanımda tedarikçilerin güncel ve doğrulanabilir belgeleri sisteme yüklemesi beklenir.",
      },
      {
        order: 4,
        question: "Minimum sipariş miktarının altında sipariş verebilir miyim?",
        answer: "Bu genellikle tedarikçiye bağlıdır; teklif talebi sırasında ihtiyacınızı belirterek esneklik olup olmadığını sorabilirsiniz.",
      },
      {
        order: 5,
        question: "Uyumluluk/raporlama modülü hangi mevzuatı kapsıyor?",
        answer:
          "Bu modül, Türkiye'deki ambalaj atığı ve genişletilmiş üretici sorumluluğu çerçevesine genel ve temsili bir bakış sunar; bağlayıcı hukuki danışmanlık yerine geçmez.",
      },
      {
        order: 6,
        question: "Numune talebi ne kadar sürede yanıtlanır?",
        answer: "Yanıt süresi tedarikçiye göre değişir; talep durumunuzu alıcı panelinizden takip edebilirsiniz.",
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
