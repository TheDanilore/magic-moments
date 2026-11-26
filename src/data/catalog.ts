import type { Product, ProductCategory } from "@/types/catalog"

export const productCategories: ProductCategory[] = [
  {
    slug: "cajas-sorpresa",
    name: "Cajas Personalizadas",
    subtitle: "Cajas temáticas y explosivas con fotos, dulces y lazos satinados.",
    image: "/images/prod-caja-amor.jpg",
  },
  {
    slug: "cuadros-3d-led",
    name: "Cuadros 3D LED",
    subtitle: "Marcos de madera en 2 modelos con luces LED cálidas y fotos.",
    image: "/images/prod-cuadro-3d-led.jpg",
  },
  {
    slug: "ramos-tematicos",
    name: "Ramos Temáticos",
    subtitle: "Rosas eternas satinadas con tarjetas, brillos y temática a elección.",
    image: "/images/prod-ramo-eterno.jpg",
  },
  {
    slug: "llaveros",
    name: "Llaveros Acrílicos",
    subtitle: "Personalizados con foto o diseño por unidad o lotes de 12+.",
    image: "/images/prod-llaveros-acrilicos.jpg",
  },
  {
    slug: "tarjetas",
    name: "Tarjetas 3D",
    subtitle: "Papel algodón y cortes tridimensionales con sello de lacre.",
    image: "/images/prod-tarjeta-3d.jpg",
  },
  {
    slug: "kits-regalo",
    name: "Kits de Regalo",
    subtitle: "Conjuntos curados con taza, vela, recuerdos y dedicatoria.",
    image: "/images/prod-kit-amistad.jpg",
  },
]

export const products: Product[] = [
  {
    id: 1,
    sku: "MM-CS-001",
    name: "Caja Personalizada Temática",
    subtitle: "Caja rígida · Fotos instantáneas, dulces y dedicatoria",
    badge: "Favorito",
    description:
      "Caja personalizada hecha a mano según tu temática favorita (Flores Amarillas, Hot Wheels, Cumpleaños o Amor).",
    longDescription: `
      <p>Nuestra Caja Personalizada Temática se arma a mano en nuestro taller de Chimbote y se adapta al estilo de la persona que quieres sorprender.</p>
      <p>Incluye una curaduría lista para emocionar:</p>
      <ul>
        <li>Diseño exterior e interior personalizado con frase y temática a elección</li>
        <li>Selección de dulces y chocolates o detalle principal coordinado</li>
        <li>Tira de fotos impresas y tarjeta dedicatoria</li>
        <li>Acabado con cinta de satén y papel seda en los colores del pedido</li>
      </ul>
    `,
    priceCents: 5900,
    compareAtCents: 7200,
    stock: 15,
    weightGrams: 850,
    dimensionsCm: { length: 26, width: 18, height: 11 },
    category: "Cajas Personalizadas",
    categorySlug: "cajas-sorpresa",
    featured: true,
    image: "/images/prod-caja-cumpleanos.jpg",
    images: [
      "/images/prod-caja-cumpleanos.jpg",
      "/images/prod-caja-cumpleanos-detalle.jpg",
      "/images/prod-tarjeta-felicitacion.jpg",
      "/images/prod-caja-amor.jpg",
    ],
    options: {
      colors: ["Rosa Pétalo", "Amarillo Girasol", "Azul Rey", "Lila"],
      sizes: ["Pequeña", "Mediana", "Grande"],
      themes: ["Cumpleaños", "Flores Amarillas", "Hot Wheels", "Aniversario"],
    },
    reviews: [],
  },
  {
    id: 2,
    sku: "MM-LL-002",
    name: "Llavero Acrílico Personalizado",
    subtitle: "Acrílico cristalino · Unidad o lote para eventos (12+)",
    badge: "Por unidad o lote",
    description:
      "Llavero acrílico personalizado con fotografía, ilustración o iniciales. Ideal para regalo individual o recuerdos en lote.",
    longDescription: `
      <p>Un recuerdo ligero, duradero y colorido para llevar a todas partes. Trabajamos tus llaveros acrílicos con impresión nítida y herraje dorado o plateado.</p>
      <ul>
        <li>Acrílico transparente de alta nitidez (formato rectangular o circular)</li>
        <li>Personalización con foto, pareja, mascota, nombre o logo de evento</li>
        <li>Disponible por unidad o en lotes pequeños (6, 12 o más recuerdos)</li>
        <li>Incluye borla decorativa a tono y presentación lista para entregar</li>
      </ul>
    `,
    priceCents: 1200,
    stock: 60,
    weightGrams: 35,
    dimensionsCm: { length: 9, width: 6, height: 2 },
    category: "Llaveros Acrílicos",
    categorySlug: "llaveros",
    featured: true,
    image: "/images/prod-llaveros-acrilicos.jpg",
    images: [
      "/images/prod-llaveros-acrilicos.jpg",
      "/images/prod-llavero-cristal.jpg",
      "/images/prod-llavero-pareja.jpg",
    ],
    options: {
      colors: ["Rosa Pétalo", "Dorado", "Crema", "Celeste"],
      sizes: ["Circular 5 cm", "Rectangular 4×6 cm"],
      themes: ["Foto Pareja / Mascota", "Recuerdo Evento (Lote)", "Iniciales Florales", "Temática Libre"],
    },
    reviews: [],
  },
  {
    id: 9,
    sku: "MM-CL-009",
    name: "Cuadro 3D con Luces LED",
    subtitle: "Disponible en 2 modelos · Marco de madera y luz cálida",
    badge: "2 modelos",
    description:
      "Cuadro tridimensional de madera iluminado con luces LED cálidas, lámina temática y fotografía personalizada.",
    longDescription: `
      <p>Uno de los detalles más pedidos en @magic_moments050. Combina profundidad 3D en papel arte, tu fotografía favorita y una guirnalda de luces LED cálidas en el interior.</p>
      <ul>
        <li>Disponible en 2 modelos de marco profundo en madera natural o clara</li>
        <li>Iluminación LED cálida interior lista para encender</li>
        <li>Personalizable con temáticas (Girasoles, Snoopy, Spider-Man, Fútbol, Parejas)</li>
        <li>Empaque protegido para envío seguro por Shalom a todo el Perú</li>
      </ul>
    `,
    priceCents: 5500,
    compareAtCents: 6400,
    stock: 14,
    weightGrams: 680,
    dimensionsCm: { length: 24, width: 19, height: 6 },
    category: "Cuadros 3D LED",
    categorySlug: "cuadros-3d-led",
    featured: true,
    image: "/images/prod-cuadro-3d-led.jpg",
    images: [
      "/images/prod-cuadro-3d-led.jpg",
      "/images/prod-caja-cumpleanos-detalle.jpg",
      "/images/prod-tarjeta-3d.jpg",
    ],
    options: {
      colors: ["Madera Natural", "Rosa Suave", "Blanco"],
      sizes: ["Modelo Clásico (20×25 cm)", "Modelo Grande (25×30 cm)"],
      themes: ["Girasoles / 21 Sept", "Pareja & Fotos", "Superhéroes / Fútbol", "Cumpleaños"],
    },
    reviews: [],
  },
  {
    id: 10,
    sku: "MM-RM-010",
    name: "Ramo Temático Rosas Eternas",
    subtitle: "Rosas de satén hechas a mano · Envoltura y tarjetas",
    badge: "Hecho a mano",
    description:
      "Ramo personalizado elaborado con rosas eternas de cinta satinada, aplicaciones brillantes y temática a elección.",
    longDescription: `
      <p>Sorprende con flores que nunca se marchitan. Cada ramo se arma pétalo a pétalo con cinta satinada y se combina con detalles temáticos y tarjeta dedicatoria.</p>
      <ul>
        <li>Rosas eternas artesanales en paleta combinada a elección</li>
        <li>Envoltura coreana mate con lazo de satén y toppers decorativos</li>
        <li>Opcional: incorporación de autos de colección, fotos o peluche</li>
      </ul>
    `,
    priceCents: 6800,
    stock: 10,
    weightGrams: 620,
    dimensionsCm: { length: 34, width: 24, height: 14 },
    category: "Ramos Temáticos",
    categorySlug: "ramos-tematicos",
    featured: true,
    image: "/images/prod-ramo-eterno.jpg",
    images: [
      "/images/prod-ramo-eterno.jpg",
      "/images/prod-caja-amor.jpg",
      "/images/prod-tarjeta-felicitacion.jpg",
    ],
    options: {
      colors: ["Azul Rey & Rosa", "Rosa Pétalo", "Amarillo Girasol", "Rojo Pasión"],
      sizes: ["6 Rosas", "12 Rosas", "Especial con Detalles"],
      themes: ["Aniversario", "Hot Wheels", "Flores Amarillas", "Cumpleaños"],
    },
    reviews: [],
  },
  {
    id: 3,
    sku: "MM-TJ-003",
    name: "Tarjeta 3D Aniversario",
    subtitle: "Papel algodón 300 g · Corte tridimensional y lacre",
    badge: "Artesanal",
    description: "Tarjeta tridimensional con mensaje personalizado para aniversarios y fechas especiales.",
    longDescription: `
      <p>Expresa tus sentimientos con nuestra Tarjeta 3D artesanal. Al abrirla, se despliega una escena tridimensional cortada con precisión sobre papel texturizado.</p>
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
    category: "Tarjetas 3D",
    categorySlug: "tarjetas",
    image: "/images/prod-tarjeta-3d.jpg",
    images: [
      "/images/prod-tarjeta-3d.jpg",
      "/images/prod-tarjeta-felicitacion.jpg",
      "/images/prod-caja-cumpleanos-detalle.jpg",
      "/images/nosotros-proceso.jpg",
    ],
    options: {
      colors: ["Rosa Pétalo", "Rojo", "Crema", "Dorado"],
      sizes: ["Clásica", "Grande"],
      themes: ["Aniversario", "Amor", "Cumpleaños", "Agradecimiento"],
    },
    reviews: [],
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
        <li>Llavero temático y tarjeta dedicatoria</li>
      </ul>
    `,
    priceCents: 4800,
    stock: 10,
    weightGrams: 750,
    dimensionsCm: { length: 24, width: 18, height: 10 },
    category: "Kits de Regalo",
    categorySlug: "kits-regalo",
    image: "/images/prod-kit-amistad.jpg",
    images: [
      "/images/prod-kit-amistad.jpg",
      "/images/prod-caja-cumpleanos-detalle.jpg",
      "/images/prod-tarjeta-felicitacion.jpg",
      "/images/prod-llaveros-acrilicos.jpg",
    ],
    options: {
      colors: ["Rosa Pétalo", "Lavanda", "Menta", "Crema"],
      sizes: ["Estándar", "Deluxe"],
      themes: ["Amistad", "Cumpleaños", "Agradecimiento"],
    },
    reviews: [],
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
        <li>Caja rígida en frambuesa y rosa con cinta de satén</li>
      </ul>
    `,
    priceCents: 6500,
    compareAtCents: 7900,
    stock: 10,
    weightGrams: 950,
    dimensionsCm: { length: 28, width: 19, height: 11 },
    category: "Cajas Personalizadas",
    categorySlug: "cajas-sorpresa",
    image: "/images/prod-caja-amor.jpg",
    images: [
      "/images/prod-caja-amor.jpg",
      "/images/prod-caja-cumpleanos-detalle.jpg",
      "/images/prod-tarjeta-3d.jpg",
      "/images/prod-ramo-eterno.jpg",
    ],
    options: {
      colors: ["Frambuesa", "Rosa Pétalo", "Rojo", "Blanco"],
      sizes: ["Mediana", "Grande", "Premium"],
      themes: ["Amor", "Aniversario", "San Valentín"],
    },
    reviews: [],
  },
  {
    id: 6,
    sku: "MM-LL-006",
    name: "Llavero Pareja",
    subtitle: "Set dúo · Estuche de regalo y grabado a medida",
    description: "Set de dos llaveros personalizados para parejas con iniciales o fechas.",
    longDescription: `
      <p>Dos mitades que se complementan. Este set de llaveros para pareja puede personalizarse con iniciales, fechas especiales o coordenadas.</p>
      <ul>
        <li>Set de 2 llaveros personalizados con acabado cepillado</li>
        <li>Grabado de alta precisión incluido</li>
        <li>Presentación en estuche doble listo para regalar</li>
      </ul>
    `,
    priceCents: 2900,
    stock: 20,
    weightGrams: 110,
    dimensionsCm: { length: 12, width: 9, height: 3 },
    category: "Llaveros Acrílicos",
    categorySlug: "llaveros",
    image: "/images/prod-llavero-pareja.jpg",
    images: [
      "/images/prod-llavero-pareja.jpg",
      "/images/prod-llaveros-acrilicos.jpg",
      "/images/prod-llavero-cristal.jpg",
    ],
    options: {
      colors: ["Plateado", "Oro Rosa", "Dorado"],
      sizes: ["Estándar"],
      themes: ["Amor", "Aniversario", "Parejas"],
    },
    reviews: [],
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
    category: "Tarjetas 3D",
    categorySlug: "tarjetas",
    image: "/images/prod-tarjeta-felicitacion.jpg",
    images: [
      "/images/prod-tarjeta-felicitacion.jpg",
      "/images/prod-tarjeta-3d.jpg",
      "/images/nosotros-proceso.jpg",
      "/images/prod-caja-cumpleanos-detalle.jpg",
    ],
    options: {
      colors: ["Marfil", "Rosa Pétalo", "Dorado", "Verde Salvia"],
      sizes: ["Estándar", "Grande"],
      themes: ["Cumpleaños", "Agradecimiento", "Celebración", "Amistad"],
    },
    reviews: [],
  },
  {
    id: 8,
    sku: "MM-KR-008",
    name: "Kit Regalo Graduación",
    subtitle: "Termo personalizado · Libreta, llavero y tarjeta",
    badge: "Nuevo",
    description: "Kit completo para celebrar una graduación o logro profesional.",
    longDescription: `
      <p>Celebra un gran logro académico con nuestro Kit Regalo Graduación con detalles dorados, pensado para acompañar nuevos comienzos.</p>
      <ul>
        <li>Termo térmico personalizado con nombre</li>
        <li>Libreta de tapa dura con detalle dorado</li>
        <li>Llavero conmemorativo y tarjeta especial</li>
      </ul>
    `,
    priceCents: 5500,
    compareAtCents: 6500,
    stock: 12,
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
      colors: ["Azul Marino", "Champagne", "Frambuesa"],
      sizes: ["Estándar", "Deluxe"],
      themes: ["Graduación", "Logros", "Profesional"],
    },
    reviews: [],
  },
]

export const featuredProducts = products.filter((product) => product.featured)
