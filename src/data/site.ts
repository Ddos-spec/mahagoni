const uploadRoot = 'https://mahoganiutama.com/wp-content/uploads/';

export const sourceAsset = (path: string) => `${uploadRoot}${path}`;
export const media = (path: string, width = 1800) => {
  const source = sourceAsset(path);
  return `https://images.weserv.nl/?url=${encodeURIComponent(source)}&output=webp&q=84&w=${width}`;
};

export const site = {
  name: 'PT Mahogani Utama Indonesia',
  shortName: 'Mahogani',
  logo: '/brand/mahogani-logo.png',
  office: 'Jl. Panglima Polim Raya No.36, Jakarta Selatan, Indonesia',
  factory: 'Komplek Kavling DPR Serua, Jalan Kavling DPR Serua No.38, Serua, Kec. Bojongsari, Kota Depok, Jawa Barat 16517',
  phone: ['021-7231215', '021-7232477'],
  whatsapp: '6287747603739',
  email: 'sales@mahoganiutama.com',
  instagram: 'https://www.instagram.com/mahoganiutama/',
};

export const assets = {
  hero: media('2022/09/MAHOGANI_COMPRO-DETAIL_by-Priambodoyusuf-4.jpg', 2200),
  heroFallback: media('2025/02/easy-ordering-and-customization.webp', 2200),
  about: media('2022/09/services-content-1-1024x682.jpg', 1600),
  factory: media('2022/09/MAHOGANI_COMPROFILE_by-Priambodoyusuf-33-1024x682.jpg', 1800),
  scheduling: media('2022/09/IMG-20200310-WA0088.jpg', 1600),
  quality: media('2022/09/services-4.jpg', 1600),
  service1: media('2022/09/services-1.jpg', 1600),
  service2: media('2022/09/services-2.jpg', 1600),
  service5: media('2022/09/services-5.jpg', 1600),
  service6: media('2022/09/services-6.jpg', 1600),
  easyOrdering: media('2025/02/easy-ordering-and-customization.webp', 1800),
};

const oct = '2022/10/';

// Full public portfolio sequence from the original Interior Contractor page.
export const interiorGallery = [
  'KONT1A.jpg','KONT1B.jpg','KONT1C.jpg','KONT1D.jpg','KONT1E.jpg','KONT1F.jpg',
  'KONT2A.jpg','KONT2B.jpg','KONT2C.jpg','KONT2D.jpg',
  'KONT3A.jpeg','KONT3B.jpeg','KONT3C.jpeg','KONT3D.jpeg','KONT3E.jpeg','KONT3F.jpeg',
  'KONT4A.jpeg','KONT4B.jpeg','KONT4C.jpeg',
  'KONT5A.jpeg','KONT5B-1.jpeg','KONT5C.jpeg','KONT5D.jpeg','KONT5E.jpeg','KONT5F.jpeg','KONT5G-1.jpeg',
  'KONT6A.jpg','KONT6B.jpg','KONT6C.jpg','KONT6D.jpg','KONT6E.jpg','KONT6F.jpg','KONT6G.jpg',
  'KONT7A.jpeg','KONT7B.jpeg','KONT7C.jpeg','KONT7D-1.jpeg','KONT7E.jpeg',
  'KONT8A.jpg','KONT8B.jpg','KONT8C.jpg'
].map((name) => media(oct + name, 1600));

// Full public sequence from the original Home and Commercial page.
export const commercialGallery = [
  'COM1A.jpg','COM1B.jpg','COM1C.jpg',
  'COM2A.jpg','COM2B.jpg','COM2C.jpg','COM2D.jpg','COM2E.jpg','COM2F.jpg',
  'COM3A.jpg','COM3B.jpg','COM3C.jpg','COM3D.jpg','COM3E.jpg','COM3F.jpg',
  'COM4A.jpg','COM4B.jpg','COM4C.jpg','COM4D.jpg','COM4E.jpg',
  'HOME1A.jpg','HOME1B.jpg','HOME1C.jpg',
  'HOME2A.jpg','HOME2B.jpg','HOME2C.jpg','HOME2D.jpg',
  'HOME3A.jpg','HOME3B.jpg','HOME3C.jpg','HOME3D.jpg','HOME3E.jpg',
  'HOME4A.jpg','HOME4B.jpg','HOME4C.jpg','HOME4D.jpg','HOME4E.jpg',
  'HOME5A.jpg','HOME5B.jpg','HOME5C.jpg','HOME5D.jpg','HOME5E.jpg',
  'HOME6A.jpg','HOME6B.jpg','HOME6C.jpg','HOME6D.jpg'
].map((name) => media(oct + name, 1600));

// Complete image sets exposed by the original OEM / ODM page.
export const oemGroups = [
  {
    title: 'Kitchen & Wardrobe Cabinet',
    body: 'With quality that meets export requirements, Mahogani produces kitchen and wardrobe cabinets using American and European standard references.',
    images: [
      '20190824_120336.jpg','20191116_114024.jpg','IMG_20220301_132750_337.jpg','IMG_20220301_132750_374.jpg','IMG_20220301_132750_382.jpg','IMG_20220301_132750_407.jpg','IMG_20220301_132750_424.jpg','IMG_20220315_184635_012.jpg',
      'WhatsApp-Image-2022-06-28-at-10.49.09.jpeg','WhatsApp-Image-2022-06-28-at-10.49.10.jpeg','WhatsApp-Image-2022-06-28-at-10.49.10-1.jpeg','WhatsApp-Image-2022-06-28-at-10.49.11.jpeg','WhatsApp-Image-2022-06-28-at-10.49.11-1.jpeg'
    ].map((n) => media(oct + n, 1600))
  },
  {
    title: 'Retail Furniture',
    body: 'With the growth of marketplaces and retail programs, Mahogani provides furniture products with consistent quality and competitive production economics.',
    images: ['RETAIL1.jpg','RETAIL2.jpg','RETAIL3.jpg','RETAIL4.jpg','RETAIL-5.jpg','RETAIL-6.jpg','RETAIL-7.jpg'].map((n) => media(oct + n, 1600))
  },
  {
    title: 'Office Furniture',
    body: 'Custom and standard office furniture for commercial, institutional, local, and government requirements.',
    images: ['20180821_105840.jpg','CREDENSA.jpeg','IMG_20210326_153740_751.jpg','IMG_20210329_183715_469.jpg','IMG_20210329_183715_485.jpg','IMG_20210413_112816_365.jpg','IMG_20210413_112959_404.jpg','OFFICE1.jpeg'].map((n) => media(oct + n, 1600))
  },
  {
    title: 'Special Furniture',
    body: 'Mahogani supports product designers with wood-based furniture, fixtures, and special-purpose products developed from custom concepts.',
    images: [
      'etc1.jpeg','etc2.jpeg','etc3.jpg','etc4.jpg','KURSI1.jpeg','KURSI2.jpeg','KURSI3.jpg','KURSI4.jpg',
      'MEJA-GAME1A.jpg','MEJA-GAME1B.jpeg','MEJA-GAME1C.jpg','SMOKE-CABIN1A.jpg','SMOKE-CABIN1B.png','SMOKE-CABIN1D.jpg','SMOKE-CABIN-1E.jpg','uvc-box1.jpg','uvc-box2.jpg','uvc-box3.jpg','uvc-box4.jpg'
    ].map((n) => media(oct + n, 1600))
  }
];

const logo2025 = (name: string) => media(`2025/02/${name}`, 520);
const logo2022 = (name: string) => media(`2022/09/${name}`, 520);

export const clientLogos = [
  ['Trinity', logo2025('trinity-logo.webp')],
  ['STIN', logo2025('stin-logo.webp')],
  ['UIII', logo2025('uiii-logo.webp')],
  ['Swiss-Belhotel', logo2025('swiss-belhotel-logo.webp')],
  ['Puri 11', logo2025('puri-11-logo.webp')],
  ['Pacific Paint', logo2025('pacific-paint-logo.webp')],
  ['Amman Mineral', logo2025('amman-mineral-logo.webp')],
  ['AEON', logo2025('aeon-logo.webp')],
  ['BRI', logo2022('bank-bri-logo.jpg')],
  ['Bank Mandiri', logo2022('bank-mandiri-logo.jpg')],
  ['PermataBank', logo2022('bank-permata-logo.jpg')],
  ['BNI', logo2022('bni-logo.jpg')],
  ['Branz', logo2022('branz-logo.jpg')],
  ['Ciputra', logo2022('ciputra-logo.jpg')],
  ['Deltasindo', logo2022('deltasindo-logo.jpg')],
  ['DZ Bank', logo2022('dz-bank-logo.jpg')],
  ['Grand Sahid', logo2022('grand-sahid-logo.jpg')],
  ['Jaya Konstruksi', logo2022('jaya-konstruksi-logo.jpg')],
  ['Kartika Sari', logo2022('kartika-sari-logo.jpg')],
  ['Orang Tua Group', logo2022('ot-logo.jpg')],
  ['PappaRich', logo2022('papparich-logo.jpg')],
  ['Samsung', logo2022('samsung-logo.jpg')],
  ['Siloam', logo2022('siloam-logo.jpg')],
  ['Smoke Solution', logo2022('smokesolution-logo.jpg')],
  ['Westin', logo2022('westin-logo-1.jpg')],
  ['WIKA', logo2022('wika-logo.jpg')],
  ['Yamaha Music School', logo2022('yamaha-music-school-logo.jpg')],
  ['Bobobox', media('2022/10/bobox.jpeg', 520)]
] as const;

export const blogPosts = [
  {
    title: 'Jenis Material Filling Cabinet Berdasarkan Kualitasnya',
    excerpt: 'Memilih filling cabinet bukan hanya soal model, tetapi juga material, kekuatan, harga, dan kesesuaiannya dengan kebutuhan penyimpanan kantor.',
    image: media('2023/01/jenis-material-filling-cabinet-berdasarkan-kualitasnya.jpg', 1200),
    href: 'https://mahoganiutama.com/en/jenis-material-filling-cabinet-berdasarkan-kualitasnya-2/'
  },
  {
    title: '5 Perbedaan Furniture dari Kayu Mahogani dan Kayu Cendana',
    excerpt: 'Perbandingan karakter kayu mahogani dan cendana dari sisi tampilan, tekstur, bobot, harga, serta penggunaannya pada furnitur.',
    image: media('2023/01/5-perbedaan-furniture-dari-kayu-mahogani-dan-kayu-cendana.jpg', 1200),
    href: 'https://mahoganiutama.com/en/5-perbedaan-furniture-dari-kayu-mahogani-dan-kayu-cendana-2/'
  },
  {
    title: 'Tips Memilih Rak Dinding Kayu Unik untuk Hiasan',
    excerpt: 'Panduan memilih rak dinding kayu berdasarkan penempatan, ukuran, kekuatan, fungsi penyimpanan, dan karakter ruang.',
    image: media('2023/01/tips-memilih-rak-dinding-kayu-unik-untuk-hiasan.jpg', 1200),
    href: 'https://mahoganiutama.com/en/tips-memilih-rak-dinding-kayu-unik-untuk-hiasan-2/'
  },
  {
    title: '7 Ide Dekorasi Ruangan untuk Membuat Kamar Estetik',
    excerpt: 'Ide dekorasi praktis untuk membuat kamar terasa lebih estetik melalui penataan, kombinasi warna, dan detail interior yang tepat.',
    image: media('2023/01/7-ide-dekorasi-ruangan-untuk-membuat-kamar-estetik.jpg', 1200),
    href: 'https://mahoganiutama.com/7-ide-dekorasi-ruangan-untuk-membuat-kamar-estetik/'
  },
  {
    title: 'Mengenal 5 Jenis Lemari Kayu dan Cara Merawatnya',
    excerpt: 'Referensi jenis lemari kayu dan cara perawatan agar tampilan, fungsi, dan kualitas permukaan tetap terjaga dari waktu ke waktu.',
    image: media('2023/01/mengenal-5-jenis-lemari-kayu-dan-cara-merawatnya.jpg', 1200),
    href: 'https://mahoganiutama.com/mengenal-5-jenis-lemari-kayu-dan-cara-merawatnya/'
  }
];