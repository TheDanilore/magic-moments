import type { Product, ProductCategory, ProductReview } from "@/types/catalog"

export const productCategories: ProductCategory[] = [
  {
    slug: "cajas-sorpresa",
    name: "Cajas Sorpresa",
    subtitle: "Cajas rígidas con dedicatoria, dulces y recuerdos curados.",
    image: "/images/prod-caja-cumpleanos.jpg",
  },
  {
    slug: "llaveros",
    name: "Llaveros",
    subtitle: "Cristal óptico y acero inoxidable con grabado a medida.",
    image: "/images/prod-llavero-cristal.jpg",
  },
  {
    slug: "tarjetas",
    name: "Tarjetas",
    subtitle: "Tarjetas 3D artesanales y papel algodón con sello de lacre.",
    image: "/images/prod-tarjeta-3d.jpg",
  },
  {
    slug: "kits-regalo",
    name: "Kits de Regalo",
    subtitle: "Conjuntos listos para sorprender en momentos únicos.",
    image: "/images/prod-kit-amistad.jpg",
  },
]

const defaultReviews: ProductReview[] = [
  {
    id: 1,
    user: "María Fernanda Quispe",
    rating: 5,
    comment:
      "La presentación con lazo rosa y tarjeta sellada superó todo lo que imaginaba. Llegó puntual por Shalom.",
    date: "15/09/2025",
  },
  {
    id: 2,
    user: "Carlos Mendoza",
    rating: 5,
    comment:
      "Coordiné la dedicatoria por WhatsApp y cuidaron cada detalle. Excelente acabado en el empaque.",
    date: "02/10/2025",
  },
  {
    id: 3,
    user: "Lucía Paredes",
    rating: 4,
    comment:
      "Muy buena calidad de materiales. Mi mejor amiga quedó fascinada con los recuerdos personalizados.",
    date: "18/10/2025",
  },
]

export const products: Product[] = [
  {
    id: 1,
    sku: "MM-CS-001",
    name: "Caja Sorpresa Cumpleaños",
    subtitle: "Caja rígida · Taza, fotos instantáneas y dulces",
    badge: "Más vendido",
    description:
      "Caja personalizada con regalos sorpresa para celebrar un cumpleaños especial.",
    longDescription: `
      <p>Nuestra Caja Sorpresa de Cumpleaños es el regalo ideal para sorprender en su día. Cada caja se arma a mano y se personaliza según los gustos del destinatario.</p>
      <p>Incluye una curaduría de detalles listos para emocionar:</p>
      <ul>
        <li>Taza o accesorio personalizado con nombre o frase</li>
        <li>Selección de dulces y chocolates artesanales</li>
        <li>Tira de fotos instantáneas impresas en alta nitidez</li>
        <li>Tarjeta con mensaje personalizado y sello de presentación</li>
      </ul>
      <p>Se entrega en caja rígida marfil con cinta de satén rosa atelier y papel seda.</p>
    `,
    priceCents: 5900,
    compareAtCents: 7200,
    stock: 12,
    weightGrams: 850,
    dimensionsCm: { length: 26, width: 18, height: 11 },
    category: "Cajas Sorpresa",
    categorySlug: "cajas-sorpresa",
    featured: true,
    image: "/images/prod-caja-cumpleanos.jpg",
    images: [
      "/images/prod-caja-cumpleanos.jpg",
      "/images/prod-caja-cumpleanos-detalle.jpg",
      "/images/prod-tarjeta-felicitacion.jpg",
      "/images/promo-sorteo-caja.jpg",
    ],
    options: {
      colors: ["Rosa Atelier", "Marfil", "Azul", "Lavanda"],
      sizes: ["Pequeña", "Mediana", "Grande"],
      themes: ["Cumpleaños", "Aniversario", "Graduación", "Amistad"],
    },
    reviews: defaultReviews,
  },
  {
    id: 2,
    sku: "MM-LL-002",
    name: "Llavero Personalizado",
    subtitle: "Cristal óptico · Foto HD y argolla cepillada",
    description: "Llavero con foto personalizada en cristal de alta calidad.",
    longDescription: `
      <p>Un recuerdo duradero para llevar siempre contigo. Nuestro Llavero Personalizado combina cristal óptico de alta transparencia con impresión nítida de tu fotografía favorita.</p>
      <ul>
        <li>Cristal óptico resistente a rayaduras</li>
        <li>Argolla metálica reforzada en acero cepillado</li>
        <li>Grabado opcional en la parte posterior</li>
        <li>Incluye cajita rígida de presentación Magic Moments</li>
      </ul>
    `,
    priceCents: 1800,
    stock: 25,
    weightGrams: 70,
    dimensionsCm: { length: 10, width: 8, height: 3 },
    category: "Llaveros",
    categorySlug: "llaveros",
    featured: true,
    image: "/images/prod-llavero-cristal.jpg",
    images: [
      "/images/prod-llavero-cristal.jpg",
      "/images/prod-llavero-pareja.jpg",
      "/images/prod-caja-cumpleanos-detalle.jpg",
      "/images/prod-tarjeta-felicitacion.jpg",
    ],
    options: {
      colors: ["Plateado", "Dorado", "Negro", "Rosa"],
      sizes: ["Estándar", "Mediano", "Grande"],
      themes: ["Amor", "Amistad", "Familia", "Minimalista"],
    },
    reviews: defaultReviews,
  },
  {
    id: 3,
    sku: "MM-TJ-003",
    name: "Tarjeta 3D Aniversario",
    subtitle: "Papel algodón 300 g · Corte tridimensional y lacre",
    badge: "Artesanal",
    description: "Tarjeta tridimensional con mensaje personalizado para aniversarios.",
    longDescription: `
      <p>Expresa tus sentimientos con nuestra Tarjeta 3D artesanal. Al abrirla, se despliega una escena tridimensional cortada con precisión sobre papel texturizado de alto gramaje.</p>
      <ul>
        <li>Papel artístico de algodón de 300 g/m²</li>
        <li>Mensaje interior impreso o caligrafiado a elección</li>
        <li>Sobre rosa empolvado con sello de lacre dorado incluido</li>
      </ul>
    `,
    priceCents: 1500,
    stock: 30,
    weightGrams: 60,
    dimensionsCm: { length: 15, width: 10, height: 2 },
    category: "Tarjetas",
    categorySlug: "tarjetas",
    featured: true,
    image: "/images/prod-tarjeta-3d.jpg",
    images: [
      "/images/prod-tarjeta-3d.jpg",
      "/images/prod-tarjeta-felicitacion.jpg",
      "/images/prod-caja-cumpleanos-detalle.jpg",
      "/images/nosotros-proceso.jpg",
    ],
    options: {
      colors: ["Rojo", "Rosa Atelier", "Crema", "Dorado"],
      sizes: ["Clásica", "Grande"],
      themes: ["Aniversario", "Amor", "Cumpleaños", "Agradecimiento"],
    },
    reviews: defaultReviews,
  },
  {
    id: 4,
    sku: "MM-KR-004",
    name: "Kit Regalo Amistad",
    subtitle: "Taza cerámica · Vela aromática, llavero y tarjeta",
    description: "Kit completo con detalles especiales para celebrar la amistad.",
    longDescription: `
      <p>Diseñado para agradecer a esa persona incondicional. El Kit Regalo Amistad reúne detalles cálidos y útiles dentro de una caja lista para obsequiar.</p>
      <ul>
        <li>Taza cerámica personalizada con frase o nombre</li>
        <li>Vela aromática en frasco ámbar artesanal</li>
        <li>Llavero metálico temático y tarjeta dedicatoria</li>
      </ul>
    `,
    priceCents: 4800,
    stock: 10,
    weightGrams: 750,
    dimensionsCm: { length: 24, width: 18, height: 10 },
    category: "Kits de Regalo",
    categorySlug: "kits-regalo",
    featured: true,
    image: "/images/prod-kit-amistad.jpg",
    images: [
      "/images/prod-kit-amistad.jpg",
      "/images/prod-caja-cumpleanos-detalle.jpg",
      "/images/prod-tarjeta-felicitacion.jpg",
      "/images/prod-llavero-cristal.jpg",
    ],
    options: {
      colors: ["Rosa Atelier", "Lavanda", "Menta", "Crema"],
      sizes: ["Estándar", "Deluxe"],
      themes: ["Amistad", "Cumpleaños", "Agradecimiento"],
    },
    reviews: defaultReviews,
  },
  {
    id: 5,
    sku: "MM-CS-005",
    name: "Caja Sorpresa Amor",
    subtitle: "Edición romántica · Trufas, fotos y flores secas",
    badge: "Edición Amor",
    description: "Caja romántica con detalles para sorprender a tu pareja.",
    longDescription: `
      <p>Pensada para crear un momento inolvidable en pareja. Nuestra Caja Sorpresa Amor combina bombones selectos, recuerdos fotográficos y flores preservadas.</p>
      <ul>
        <li>Selección de trufas y chocolates artesanales</li>
        <li>Tira de fotos estilo instantáneo personalizadas</li>
        <li>Ramo mini de flores secas y tarjeta dedicatoria</li>
        <li>Caja rígida en borgoña y rosa con cinta de satén</li>
      </ul>
    `,
    priceCents: 6500,
    compareAtCents: 7900,
    stock: 10,
    weightGrams: 950,
    dimensionsCm: { length: 28, width: 19, height: 11 },
    category: "Cajas Sorpresa",
    categorySlug: "cajas-sorpresa",
    image: "/images/prod-caja-amor.jpg",
    images: [
      "/images/prod-caja-amor.jpg",
      "/images/prod-caja-cumpleanos-detalle.jpg",
      "/images/prod-tarjeta-3d.jpg",
      "/images/promo-sorteo-caja.jpg",
    ],
    options: {
      colors: ["Borgoña", "Rosa Atelier", "Rojo", "Blanco"],
      sizes: ["Mediana", "Grande", "Premium"],
      themes: ["Amor", "Aniversario", "San Valentín"],
    },
    reviews: defaultReviews,
  },
  {
    id: 6,
    sku: "MM-LL-006",
    name: "Llavero Pareja",
    subtitle: "Set dúo acero · Estuche aterciopelado y grabado",
    description: "Set de dos llaveros personalizados para parejas.",
    longDescription: `
      <p>Dos mitades que se complementan. Este set de llaveros para pareja en acero inoxidable puede personalizarse con iniciales, fechas especiales o coordenadas.</p>
      <ul>
        <li>Set de 2 llaveros en acero inoxidable cepillado</li>
        <li>Grabado láser de alta precisión incluido</li>
        <li>Presentación en estuche doble aterciopelado</li>
      </ul>
    `,
    priceCents: 2900,
    stock: 20,
    weightGrams: 110,
    dimensionsCm: { length: 12, width: 9, height: 3 },
    category: "Llaveros",
    categorySlug: "llaveros",
    image: "/images/prod-llavero-pareja.jpg",
    images: [
      "/images/prod-llavero-pareja.jpg",
      "/images/prod-llavero-cristal.jpg",
      "/images/prod-caja-cumpleanos-detalle.jpg",
      "/images/prod-tarjeta-3d.jpg",
    ],
    options: {
      colors: ["Plateado", "Negro", "Oro Rosa"],
      sizes: ["Estándar"],
      themes: ["Amor", "Aniversario", "Parejas"],
    },
    reviews: defaultReviews,
  },
  {
    id: 7,
    sku: "MM-TJ-007",
    name: "Tarjeta Felicitación",
    subtitle: "Relieve botánico · Foil dorado y sobre sellado",
    description: "Tarjeta de felicitación personalizada para cualquier ocasión.",
    longDescription: `
      <p>El complemento ideal para cualquier obsequio. Personaliza la dedicatoria interior en fino papel algodón con relieve botánico y detalles en foil dorado.</p>
      <ul>
        <li>Papel algodón texturizado de alta densidad</li>
        <li>Sobre rosa empolvado con sello de lacre</li>
        <li>Diseño exclusivo Magic Moments</li>
      </ul>
    `,
    priceCents: 1200,
    stock: 35,
    weightGrams: 45,
    dimensionsCm: { length: 14, width: 10, height: 1 },
    category: "Tarjetas",
    categorySlug: "tarjetas",
    image: "/images/prod-tarjeta-felicitacion.jpg",
    images: [
      "/images/prod-tarjeta-felicitacion.jpg",
      "/images/prod-tarjeta-3d.jpg",
      "/images/nosotros-proceso.jpg",
      "/images/prod-caja-cumpleanos-detalle.jpg",
    ],
    options: {
      colors: ["Marfil", "Rosa Atelier", "Dorado", "Verde Salvia"],
      sizes: ["Estándar", "Grande"],
      themes: ["Cumpleaños", "Agradecimiento", "Celebración", "Amistad"],
    },
    reviews: defaultReviews,
  },
  {
    id: 8,
    sku: "MM-KR-008",
    name: "Kit Regalo Graduación",
    subtitle: "Termo mate · Libreta lino, llavero dorado y tarjeta",
    badge: "Nuevo",
    description: "Kit completo para celebrar una graduación con estilo.",
    longDescription: `
      <p>Celebra un gran logro académico con nuestro Kit Regalo Graduación en negro mate y champagne dorado, pensado para acompañar nuevos comienzos.</p>
      <ul>
        <li>Termo térmico negro mate personalizado con nombre</li>
        <li>Libreta de tapa dura en lino con detalle dorado</li>
        <li>Llavero metálico conmemorativo y tarjeta especial</li>
      </ul>
    `,
    priceCents: 5500,
    compareAtCents: 6500,
    stock: 8,
    weightGrams: 900,
    dimensionsCm: { length: 26, width: 19, height: 11 },
    category: "Kits de Regalo",
    categorySlug: "kits-regalo",
    image: "/images/prod-kit-graduacion.jpg",
    images: [
      "/images/prod-kit-graduacion.jpg",
      "/images/prod-caja-cumpleanos-detalle.jpg",
      "/images/prod-tarjeta-felicitacion.jpg",
      "/images/prod-llavero-pareja.jpg",
    ],
    options: {
      colors: ["Negro Mate", "Azul Marino", "Champagne"],
      sizes: ["Estándar", "Deluxe"],
      themes: ["Graduación", "Logros", "Profesional"],
    },
    reviews: defaultReviews,
  },
]

export const featuredProducts = products.filter((product) => product.featured)
