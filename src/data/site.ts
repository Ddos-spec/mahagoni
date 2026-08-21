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
  about: media('2022/09/services-content-1-1024x682.jpg', 1400),
  factory: media('2022/09/MAHOGANI_COMPROFILE_by-Priambodoyusuf-33-1024x682.jpg', 1600),
  scheduling: media('2022/09/IMG-20200310-WA0088.jpg', 1400),
  quality: media('2022/09/services-4.jpg', 1400),
  service1: media('2022/09/services-1.jpg', 1400),
  service2: media('2022/09/services-2.jpg', 1400),
  service5: media('2022/09/services-5.jpg', 1400),
  service6: media('2022/09/services-6.jpg', 1400),
  easyOrdering: media('2025/02/easy-ordering-and-customization.webp', 1600),
};

const oct = '2022/10/';

export const interiorGallery = [
  'KONT1A.jpg','KONT1B.jpg','KONT1C.jpg','KONT1D.jpg','KONT1E.jpg','KONT1F.jpg',
  'KONT2A.jpg','KONT2B.jpg','KONT2C.jpg','KONT2D.jpg',
  'KONT3A.jpeg','KONT3B.jpeg','KONT3C.jpeg','KONT3D.jpeg','KONT3E.jpeg','KONT3F.jpeg'
].map((name) => media(oct + name, 1500));

export const commercialGallery = [
  'COM1A.jpg','COM1B.jpg','COM1C.jpg','COM2A.jpg','COM2B.jpg','COM2C.jpg','COM2D.jpg','COM2E.jpg','COM2F.jpg',
  'COM3A.jpg','COM3B.jpg','COM3C.jpg','COM3D.jpg','COM3E.jpg','COM3F.jpg','COM4A.jpg'
].map((name) => media(oct + name, 1500));

export const oemGroups = [
  {
    title: 'Kitchen & Wardrobe Cabinet',
    body: 'Cabinet production engineered for repeatability, export requirements and consistent finishing across batch quantities.',
    images: ['20190824_120336.jpg','20191116_114024.jpg','IMG_20220301_132750_337.jpg','IMG_20220301_132750_374.jpg','IMG_20220301_132750_382.jpg','IMG_20220301_132750_407.jpg'].map((n) => media(oct + n, 1500))
  },
  {
    title: 'Retail Furniture',
    body: 'Scalable furniture manufacturing for retail programs, marketplace brands and volume-driven collections.',
    images: ['RETAIL1.jpg','RETAIL2.jpg','RETAIL3.jpg','RETAIL4.jpg','RETAIL%205.jpg','RETAIL%206.jpg','RETAIL%207.jpg'].map((n) => media(oct + n, 1500))
  },
  {
    title: 'Office Furniture',
    body: 'Custom and standardized office furniture for commercial, institutional and government requirements.',
    images: ['20180821_105840.jpg','CREDENSA.jpg','IMG_20210326_153740_751.jpg','IMG_20210329_183715_469.jpg','IMG_20210329_183715_485.jpg','IMG_20210413_112816_365.jpg'].map((n) => media(oct + n, 1500))
  },
  {
    title: 'Special Furniture',
    body: 'Production support for designers and product teams developing unconventional wood-based furniture and fixtures.',
    images: ['etc1.jpg','etc2.jpg','etc3.jpg','etc4.jpg','KURSI1.jpg','KURSI2.jpg'].map((n) => media(oct + n, 1500))
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
    excerpt: 'A practical look at common filing-cabinet materials and what to consider when specifying storage for an office environment.',
    image: media('2023/01/jenis-material-filling-cabinet-berdasarkan-kualitasnya-300x200.jpg', 1000),
    href: 'https://mahoganiutama.com/en/jenis-material-filling-cabinet-berdasarkan-kualitasnya-2/'
  },
  {
    title: '5 Perbedaan Furniture dari Kayu Mahogani dan Kayu Cendana',
    excerpt: 'A comparison of mahogany and sandalwood across characteristics, texture, weight, price and origin.',
    image: media('2023/01/5-perbedaan-furniture-dari-kayu-mahogani-dan-kayu-cendana-300x200.jpg', 1000),
    href: 'https://mahoganiutama.com/en/5-perbedaan-furniture-dari-kayu-mahogani-dan-kayu-cendana-2/'
  },
  {
    title: 'Tips Memilih Rak Dinding Kayu Unik untuk Hiasan',
    excerpt: 'A guide to choosing wall shelving based on placement, strength, scale, room character and ease of maintenance.',
    image: media('2023/01/tips-memilih-rak-dinding-kayu-unik-untuk-hiasan-300x200.jpg', 1000),
    href: 'https://mahoganiutama.com/en/tips-memilih-rak-dinding-kayu-unik-untuk-hiasan-2/'
  }
];
