export interface ProductReview {
  id: number
  user: string
  rating: number
  comment: string
  date: string
}

export interface ProductCategory {
  slug: string
  name: string
  subtitle: string
  image: string
}

export interface ProductDimensionsCm {
  length: number
  width: number
  height: number
}

export interface ProductSelectionOptions {
  color: string
  size: string
  theme: string
}

export interface Product {
  id: number
  sku: string
  name: string
  subtitle: string
  badge?: string
  description: string
  longDescription: string
  priceCents: number
  compareAtCents?: number
  stock: number
  weightGrams: number
  dimensionsCm: ProductDimensionsCm
  category: string
  categorySlug: string
  featured?: boolean
  image: string
  images: string[]
  options: {
    colors: string[]
    sizes: string[]
    themes: string[]
  }
  reviews: ProductReview[]
}

export const productCategories: ProductCategory[] = [
  {
    slug: "cajas-sorpresa",
    name: "Cajas Sorpresa",
    subtitle: "Cajas rÃ­gidas con dedicatoria, dulces y recuerdos curados.",
    image: "/images/prod-caja-cumpleanos.jpg",
  },
  {
    slug: "llaveros",
    name: "Llaveros",
    subtitle: "Cristal Ã³ptico y acero inoxidable con grabado a medida.",
    image: "/images/prod-llavero-cristal.jpg",
  },
  {
    slug: "tarjetas",
    name: "Tarjetas",
    subtitle: "Tarjetas 3D artesanales y papel algodÃ³n con sello de lacre.",
    image: "/images/prod-tarjeta-3d.jpg",
  },
  {
    slug: "kits-regalo",
    name: "Kits de Regalo",
    subtitle: "Conjuntos listos para sorprender en momentos Ãºnicos.",
    image: "/images/prod-kit-amistad.jpg",
  },
]

const defaultReviews: ProductReview[] = [
  {
    id: 1,
    user: "MarÃ­a Fernanda Quispe",
    rating: 5,
    comment:
      "La presentaciÃ³n con lazo rosa y tarjeta sellada superÃ³ todo lo que imaginaba. LlegÃ³ puntual por Shalom.",
    date: "15/09/2025",
  },
  {
    id: 2,
    user: "Carlos Mendoza",
    rating: 5,
    comment:
      "CoordinÃ© la dedicatoria por WhatsApp y cuidaron cada detalle. Excelente acabado en el empaque.",
    date: "02/10/2025",
  },
  {
    id: 3,
    user: "LucÃ­a Paredes",
    rating: 4,
    comment:
      "Muy buena calidad de materiales. Mi mejor amiga quedÃ³ fascinada con los recuerdos personalizados.",
    date: "18/10/2025",
  },
]

export const products: Product[] = [
  {
    id: 1,
    sku: "MM-CS-001",
    name: "Caja Sorpresa CumpleaÃ±os",
    subtitle: "Caja rÃ­gida Â· Taza, fotos instantÃ¡neas y dulces",
    badge: "MÃ¡s vendido",
    description:
      "Caja personalizada con regalos sorpresa para celebrar un cumpleaÃ±os especial.",
    longDescription: `
      <p>Nuestra Caja Sorpresa de CumpleaÃ±os es el regalo ideal para sorprender en su dÃ­a. Cada caja se arma a mano y se personaliza segÃºn los gustos del destinatario.</p>
      <p>Incluye una curadurÃ­a de detalles listos para emocionar:</p>
      <ul>
        <li>Taza o accesorio personalizado con nombre o frase</li>
        <li>SelecciÃ³n de dulces y chocolates artesanales</li>
        <li>Tira de fotos instantÃ¡neas impresas en alta nitidez</li>
        <li>Tarjeta con mensaje personalizado y sello de presentaciÃ³n</li>
      </ul>
      <p>Se entrega en caja rÃ­gida marfil con cinta de satÃ©n rosa atelier y papel seda.</p>
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
      sizes: ["PequeÃ±a", "Mediana", "Grande"],
      themes: ["CumpleaÃ±os", "Aniversario", "GraduaciÃ³n", "Amistad"],
    },
    reviews: defaultReviews,
  },
  {
    id: 2,
    sku: "MM-LL-002",
    name: "Llavero Personalizado",
    subtitle: "Cristal Ã³ptico Â· Foto HD y argolla cepillada",
    description: "Llavero con foto personalizada en cristal de alta calidad.",
    longDescription: `
      <p>Un recuerdo duradero para llevar siempre contigo. Nuestro Llavero Personalizado combina cristal Ã³ptico de alta transparencia con impresiÃ³n nÃ­tida de tu fotografÃ­a favorita.</p>
      <ul>
        <li>Cristal Ã³ptico resistente a rayaduras</li>
        <li>Argolla metÃ¡lica reforzada en acero cepillado</li>
        <li>Grabado opcional en la parte posterior</li>
        <li>Incluye cajita rÃ­gida de presentaciÃ³n Magic Moments</li>
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
      sizes: ["EstÃ¡ndar", "Mediano", "Grande"],
      themes: ["Amor", "Amistad", "Familia", "Minimalista"],
    },
    reviews: defaultReviews,
  },
  {
    id: 3,
    sku: "MM-TJ-003",
    name: "Tarjeta 3D Aniversario",
    subtitle: "Papel algodÃ³n 300 g Â· Corte tridimensional y lacre",
    badge: "Artesanal",
    description: "Tarjeta tridimensional con mensaje personalizado para aniversarios.",
    longDescription: `
      <p>Expresa tus sentimientos con nuestra Tarjeta 3D artesanal. Al abrirla, se despliega una escena tridimensional cortada con precisiÃ³n sobre papel texturizado de alto gramaje.</p>
      <ul>
        <li>Papel artÃ­stico de algodÃ³n de 300 g/mÂ²</li>
        <li>Mensaje interior impreso o caligrafiado a elecciÃ³n</li>
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
      sizes: ["ClÃ¡sica", "Grande"],
      themes: ["Aniversario", "Amor", "CumpleaÃ±os", "Agradecimiento"],
    },
    reviews: defaultReviews,
  },
  {
    id: 4,
    sku: "MM-KR-004",
    name: "Kit Regalo Amistad",
    subtitle: "Taza cerÃ¡mica Â· Vela aromÃ¡tica, llavero y tarjeta",
    description: "Kit completo con detalles especiales para celebrar la amistad.",
    longDescription: `
      <p>DiseÃ±ado para agradecer a esa persona incondicional. El Kit Regalo Amistad reÃºne detalles cÃ¡lidos y Ãºtiles dentro de una caja lista para obsequiar.</p>
      <ul>
        <li>Taza cerÃ¡mica personalizada con frase o nombre</li>
        <li>Vela aromÃ¡tica en frasco Ã¡mbar artesanal</li>
        <li>Llavero metÃ¡lico temÃ¡tico y tarjeta dedicatoria</li>
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
      sizes: ["EstÃ¡ndar", "Deluxe"],
      themes: ["Amistad", "CumpleaÃ±os", "Agradecimiento"],
    },
    reviews: defaultReviews,
  },
  {
    id: 5,
    sku: "MM-CS-005",
    name: "Caja Sorpresa Amor",
    subtitle: "EdiciÃ³n romÃ¡ntica Â· Trufas, fotos y flores secas",
    badge: "EdiciÃ³n Amor",
    description: "Caja romÃ¡ntica con detalles para sorprender a tu pareja.",
    longDescription: `
      <p>Pensada para crear un momento inolvidable en pareja. Nuestra Caja Sorpresa Amor combina bombones selectos, recuerdos fotogrÃ¡ficos y flores preservadas.</p>
      <ul>
        <li>SelecciÃ³n de trufas y chocolates artesanales</li>
        <li>Tira de fotos estilo instantÃ¡neo personalizadas</li>
        <li>Ramo mini de flores secas y tarjeta dedicatoria</li>
        <li>Caja rÃ­gida en borgoÃ±a y rosa con cinta de satÃ©n</li>
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
      colors: ["BorgoÃ±a", "Rosa Atelier", "Rojo", "Blanco"],
      sizes: ["Mediana", "Grande", "Premium"],
      themes: ["Amor", "Aniversario", "San ValentÃ­n"],
    },
    reviews: defaultReviews,
  },
  {
    id: 6,
    sku: "MM-LL-006",
    name: "Llavero Pareja",
    subtitle: "Set dÃºo acero Â· Estuche aterciopelado y grabado",
    description: "Set de dos llaveros personalizados para parejas.",
    longDescription: `
      <p>Dos mitades que se complementan. Este set de llaveros para pareja en acero inoxidable puede personalizarse con iniciales, fechas especiales o coordenadas.</p>
      <ul>
        <li>Set de 2 llaveros en acero inoxidable cepillado</li>
        <li>Grabado lÃ¡ser de alta precisiÃ³n incluido</li>
        <li>PresentaciÃ³n en estuche doble aterciopelado</li>
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
      sizes: ["EstÃ¡ndar"],
      themes: ["Amor", "Aniversario", "Parejas"],
    },
    reviews: defaultReviews,
  },
  {
    id: 7,
    sku: "MM-TJ-007",
    name: "Tarjeta FelicitaciÃ³n",
    subtitle: "Relieve botÃ¡nico Â· Foil dorado y sobre sellado",
    description: "Tarjeta de felicitaciÃ³n personalizada para cualquier ocasiÃ³n.",
    longDescription: `
      <p>El complemento ideal para cualquier obsequio. Personaliza la dedicatoria interior en fino papel algodÃ³n con relieve botÃ¡nico y detalles en foil dorado.</p>
      <ul>
        <li>Papel algodÃ³n texturizado de alta densidad</li>
        <li>Sobre rosa empolvado con sello de lacre</li>
        <li>DiseÃ±o exclusivo Magic Moments</li>
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
      sizes: ["EstÃ¡ndar", "Grande"],
      themes: ["CumpleaÃ±os", "Agradecimiento", "CelebraciÃ³n", "Amistad"],
    },
    reviews: defaultReviews,
  },
  {
    id: 8,
    sku: "MM-KR-008",
    name: "Kit Regalo GraduaciÃ³n",
    subtitle: "Termo mate Â· Libreta lino, llavero dorado y tarjeta",
    badge: "Nuevo",
    description: "Kit completo para celebrar una graduaciÃ³n con estilo.",
    longDescription: `
      <p>Celebra un gran logro acadÃ©mico con nuestro Kit Regalo GraduaciÃ³n en negro mate y champagne dorado, pensado para acompaÃ±ar nuevos comienzos.</p>
      <ul>
        <li>Termo tÃ©rmico negro mate personalizado con nombre</li>
        <li>Libreta de tapa dura en lino con detalle dorado</li>
        <li>Llavero metÃ¡lico conmemorativo y tarjeta especial</li>
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
      sizes: ["EstÃ¡ndar", "Deluxe"],
      themes: ["GraduaciÃ³n", "Logros", "Profesional"],
    },
    reviews: defaultReviews,
  },
]

export const featuredProducts = products.filter((product) => product.featured)

/**
 * Devuelve las opciones iniciales por defecto de un producto.
 */
export function getDefaultProductOptions(product: Product): ProductSelectionOptions {
  const middleSizeIndex = product.options.sizes.length > 1 ? 1 : 0
  return {
    color: product.options.colors[0] ?? "EstÃ¡ndar",
    size: product.options.sizes[middleSizeIndex] ?? product.options.sizes[0] ?? "EstÃ¡ndar",
    theme: product.options.themes[0] ?? "Personalizado",
  }
}

/**
 * Genera una clave Ãºnica para agrupar lÃ­neas del carrito por producto y opciones elegidas.
 */
export function buildCartLineKey(productId: number, options: ProductSelectionOptions): string {
  return `${productId}::${options.color}::${options.size}::${options.theme}`
}

/**
 * Busca un producto por su ID numÃ©rico estricto.
 */
export function getProductById(id: string | number): Product | undefined {
  const numericId =
    typeof id === "number"
      ? id
      : /^\d+$/.test(id.trim())
        ? Number.parseInt(id.trim(), 10)
        : Number.NaN

  if (!Number.isInteger(numericId)) {
    return undefined
  }

  return products.find((product) => product.id === numericId)
}

/**
 * Obtiene la categorÃ­a correspondiente a un slug, si existe.
 */
export function getCategoryBySlug(slug?: string): ProductCategory | undefined {
  if (!slug) {
    return undefined
  }

  return productCategories.find((category) => category.slug === slug)
}

/**
 * Filtra los productos por slug de categorÃ­a; si no coincide o no se indica, devuelve todos.
 */
export function getProductsByCategory(categorySlug?: string): Product[] {
  const category = getCategoryBySlug(categorySlug)
  if (!category) {
    return products
  }

  return products.filter((product) => product.categorySlug === category.slug)
}

/**
 * Devuelve productos relacionados excluyendo el producto actual.
 */
export function getRelatedProducts(productId: number, limit = 3): Product[] {
  return products.filter((product) => product.id !== productId).slice(0, limit)
}

