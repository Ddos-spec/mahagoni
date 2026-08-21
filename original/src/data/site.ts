const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const uploads = `${base}/wp-content/uploads/`;

export const sourceAsset = (path: string) => `${uploads}${path}`;
// Keep the existing media() API, but serve the scraped files from this build.
// Width is intentionally ignored here: WordPress already scraped multiple resized variants,
// and the page templates pick the original file so nothing depends on the old live site.
export const media = (path: string, _width = 1800) => sourceAsset(path);

export const site = {
  name: 'PT Mahogani Utama Indonesia',
  shortName: 'Mahogani',
  logo: '/brand/mahogani-logo.png',
  office: 'Jl. Panglima Polim Raya No.36, Jakarta Selatan, Indonesia',
  factory: 'Komplek Kavling DPR Serua, Jalan Kavling DPR Serua No.38, Serua, Kec. Bojongsari, Kota Depok, Jawa Barat 16517',
  phone: ['021-7231215', '021-7232477'],
  whatsapp: '6287747603739',
  email: 'sales@mahoganiutama.com',
  legacyEmail: 'catimo2@gmail.com',
  instagram: 'https://www.instagram.com/mahoganiutama/',
};

export const assets = {
  banner: media('2022/09/banner.jpg'),
  hero: media('2022/09/MAHOGANI_COMPRO-DETAIL_by-Priambodoyusuf-4.jpg'),
  about: media('2022/09/services-content-1-1024x682.jpg'),
  factory: media('2022/09/MAHOGANI_COMPROFILE_by-Priambodoyusuf-33-1024x682.jpg'),
  internalHero: media('2022/09/MAHOGANI_COMPROFILE_by-Priambodoyusuf-14.jpg'),
  video: media('2022/09/MAHOGANI_COMPROFILE_by-Priambodoyusuf-2.jpg'),
  worldwide: media('2022/09/why-us-removebg-preview.png'),
  values: [1, 2, 3].map((n) => media(`2022/09/why-us-${n}-removebg-preview.png`)),
  capabilities: [1, 2, 3, 4].map((n) => media(`2022/09/about-icon-${n}-removebg-preview.png`)),
};

export const whyUsGalleries = [
  [
    media('2025/02/easy-ordering-and-customization.webp'),
    media('2025/02/easy-ordering-and-customization-slide-3.webp'),
    media('2025/02/easy-ordering-and-customization-slide-2.webp'),
    media('2025/02/easy-ordering-and-customization-slide-1.webp'),
  ],
  [
    media('2022/09/services-content-1-1024x682.jpg'),
    media('2022/09/IMG-20200310-WA0088.jpg'),
    media('2022/09/services-1.jpg'),
    media('2022/09/services-2.jpg'),
  ],
  [
    media('2022/09/MAHOGANI_COMPROFILE_by-Priambodoyusuf-33-1024x682.jpg'),
    media('2022/09/services-4.jpg'),
    media('2022/09/services-5.jpg'),
    media('2022/09/services-6.jpg'),
  ],
];

export const serviceDifferentiators = [
  'Automation', 'On Schedule', 'Precision', 'Price',
  'Quality', 'Custom Design', 'Capacity', 'Export'
] as const;

const oct = '2022/10/';

export const interiorGallery = [
  'KONT1A.jpg','KONT1B.jpg','KONT1C.jpg','KONT1D.jpg','KONT1E.jpg','KONT1F.jpg',
  'KONT2A.jpg','KONT2B.jpg','KONT2C.jpg','KONT2D.jpg',
  'KONT3A.jpeg','KONT3B.jpeg','KONT3C.jpeg','KONT3D.jpeg','KONT3E.jpeg','KONT3F.jpeg',
  'KONT4A.jpeg','KONT4B.jpeg','KONT4C.jpeg',
  'KONT5A.jpeg','KONT5B-1.jpeg','KONT5C.jpeg','KONT5D.jpeg','KONT5E.jpeg','KONT5F.jpeg','KONT5G-1.jpeg',
  'KONT6A.jpg','KONT6B.jpg','KONT6C.jpg','KONT6D.jpg','KONT6E.jpg','KONT6F.jpg','KONT6G.jpg',
  'KONT7A.jpeg','KONT7B.jpeg','KONT7C.jpeg','KONT7D-1.jpeg','KONT7E.jpeg',
  'KONT8A.jpg','KONT8B.jpg','KONT8C.jpg'
].map((name) => media(oct + name));

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
].map((name) => media(oct + name));

export const oemGroups = [
  {
    title: 'Kitchen and wardrobe Cabinet',
    body: 'With quality that meets the requirements we export for the kitchen and wardrobe cabinets using American Standard and Euro Standard.',
    images: [
      '20190824_120336.jpg','20191116_114024.jpg','IMG_20220301_132750_337.jpg','IMG_20220301_132750_374.jpg','IMG_20220301_132750_382.jpg','IMG_20220301_132750_407.jpg','IMG_20220301_132750_424.jpg','IMG_20220315_184635_012.jpg',
      'WhatsApp-Image-2022-06-28-at-10.49.09.jpeg','WhatsApp-Image-2022-06-28-at-10.49.10.jpeg','WhatsApp-Image-2022-06-28-at-10.49.10-1.jpeg','WhatsApp-Image-2022-06-28-at-10.49.11.jpeg','WhatsApp-Image-2022-06-28-at-10.49.11-1.jpeg'
    ].map((n) => media(oct + n))
  },
  {
    title: 'Retail Furniture',
    body: 'With so many marketplaces, we provide furniture products with good quality and affordable prices.',
    images: ['RETAIL1.jpg','RETAIL2.jpg','RETAIL3.jpg','RETAIL4.jpg','RETAIL-5.jpg','RETAIL-6.jpg','RETAIL-7.jpg'].map((n) => media(oct + n))
  },
  {
    title: 'Office Furniture',
    body: 'Custom and standard office furniture for commercial, institutional, local, and government requirements.',
    images: ['20180821_105840.jpg','CREDENSA.jpeg','IMG_20210326_153740_751.jpg','IMG_20210329_183715_469.jpg','IMG_20210329_183715_485.jpg','IMG_20210413_112816_365.jpg','IMG_20210413_112959_404.jpg','OFFICE1.jpeg'].map((n) => media(oct + n))
  },
  {
    title: 'Special Furniture',
    body: 'We support product designers to realize ideas into wood-based furniture, fixtures and special-purpose products.',
    images: [
      'etc1.jpeg','etc2.jpeg','etc3.jpg','etc4.jpg','KURSI1.jpeg','KURSI2.jpeg','KURSI3.jpg','KURSI4.jpg',
      'MEJA-GAME1A.jpg','MEJA-GAME1B.jpeg','MEJA-GAME1C.jpg','SMOKE-CABIN1A.jpg','SMOKE-CABIN1B.png','SMOKE-CABIN1D.jpg','SMOKE-CABIN-1E.jpg','uvc-box1.jpg','uvc-box2.jpg','uvc-box3.jpg','uvc-box4.jpg'
    ].map((n) => media(oct + n))
  }
];

const logo2025 = (name: string) => media(`2025/02/${name}`);
const logo2022 = (name: string) => media(`2022/09/${name}`);

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
  ['Bobobox', media('2022/10/bobox.jpeg')]
] as const;

export const blogPosts = [
  {
    title: 'Jenis Material Filling Cabinet Berdasarkan Kualitasnya',
    category: 'Uncategorized', author: 'Mahogani', comments: 'Leave a Comment',
    excerpt: 'Memilih filling cabinet untuk menyimpan berbagai dokumen dan alat kerja bisa dibilang sulit. Biasanya ketika Anda mencari lemari kantor, bukan hanya tentang modelnya saja, tapi juga tentang harga, kekuatan, dan kemampuan untuk menggabungkan berbagai konsep tempat kerja yang ada.',
    image: media('2023/01/jenis-material-filling-cabinet-berdasarkan-kualitasnya.jpg'),
    href: 'https://mahoganiutama.com/en/jenis-material-filling-cabinet-berdasarkan-kualitasnya-2/'
  },
  {
    title: '5 Perbedaan Furniture dari Kayu Mahogani dan Kayu Cendana',
    category: 'Tips', author: 'Mahogani', comments: 'Leave a Comment',
    excerpt: 'Perbandingan kayu mahogani dan cendana dari sisi karakter, tekstur, bobot, harga, asal, dan penggunaannya pada furnitur.',
    image: media('2023/01/5-perbedaan-furniture-dari-kayu-mahogani-dan-kayu-cendana.jpg'),
    href: 'https://mahoganiutama.com/en/5-perbedaan-furniture-dari-kayu-mahogani-dan-kayu-cendana-2/'
  },
  {
    title: 'Tips Memilih Rak Dinding Kayu Unik untuk Hiasan',
    category: 'Tips', author: 'Mahogani', comments: 'Leave a Comment',
    excerpt: 'Rak dinding kayu dapat membantu ruang terasa lebih rapi dan luas. Pemilihannya perlu mempertimbangkan penempatan, kekuatan, ukuran, dan karakter ruang.',
    image: media('2023/01/tips-memilih-rak-dinding-kayu-unik-untuk-hiasan.jpg'),
    href: 'https://mahoganiutama.com/en/tips-memilih-rak-dinding-kayu-unik-untuk-hiasan-2/'
  },
  {
    title: '7 Ide Dekorasi Ruangan untuk Membuat Kamar Estetik',
    category: 'Tips', author: 'Mahogani', comments: 'Leave a Comment',
    excerpt: 'Ide dekorasi praktis untuk membuat kamar terasa lebih estetik melalui penataan, palet warna, dan detail interior yang tepat.',
    image: media('2023/01/7-ide-dekorasi-ruangan-untuk-membuat-kamar-estetik.jpg'),
    href: 'https://mahoganiutama.com/7-ide-dekorasi-ruangan-untuk-membuat-kamar-estetik/'
  },
  {
    title: 'Mengenal 5 Jenis Lemari Kayu dan Cara Merawatnya',
    category: 'Tips', author: 'Mahogani', comments: 'Leave a Comment',
    excerpt: 'Referensi jenis lemari kayu dan perawatan yang membantu mempertahankan tampilan, fungsi, serta kualitas permukaan dari waktu ke waktu.',
    image: media('2023/01/mengenal-5-jenis-lemari-kayu-dan-cara-merawatnya.jpg'),
    href: 'https://mahoganiutama.com/mengenal-5-jenis-lemari-kayu-dan-cara-merawatnya/'
  }
];
