import type { Product, ProductCategory } from "@/types/catalog"

export const productCategories: ProductCategory[] = [
  {
    slug: "cajas-sorpresa",
    name: "Cajas Personalizadas",
    subtitle: "Boxes Hot Wheels, Flores Amarillas y temáticas con fotos, dulces y lazos.",
    image: "/images/productos/box-hot-wheels-abierta.jpg",
  },
  {
    slug: "cuadros-3d-led",
    name: "Cuadros 3D LED",
    subtitle: "Marcos profundos de madera con luces LED cálidas, girasoles y fotos.",
    image: "/images/productos/cuadro-3d-led-girasoles.jpg",
  },
  {
    slug: "ramos-tematicos",
    name: "Ramos Temáticos",
    subtitle: "Rosas eternas satinadas con carritos Hot Wheels, fotos y tarjetas.",
    image: "/images/productos/ramo-hot-wheels.jpg",
  },
  {
    slug: "llaveros",
    name: "Llaveros Acrílicos",
    subtitle: "Personalizados con foto, Spotify, calendario o personajes por unidad o lote.",
    image: "/images/productos/llavero-duo-llevame-contigo.jpg",
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
    id: 11,
    sku: "MM-CS-011",
    name: "Box Hot Wheels Personalizado",
    subtitle: "Carrito Hot Wheels · Llavero acrílico, fotos, dulces y tarjeta",
    badge: "Edición Hot Wheels",
    description:
      "Box personalizado estilo Hot Wheels con lazo azul rey, carrito coleccionable, llavero acrílico con foto, tira polaroid, dulces y mensajes dedicatorios.",
    longDescription: `
      <p>Pensado para hacer feliz a su niño interior. Este box personalizado se arma a mano con estética racing Hot Wheels, cinta satinada azul rey y acabados listos para sorprender.</p>
      <ul>
        <li>Caja rígida blanca personalizada con bandera a cuadros, flamas y frase exterior</li>
        <li>1 o 2 carritos Hot Wheels originales según modelo elegido</li>
        <li>Llavero acrílico personalizado con foto y tarjeta temática incluida</li>
        <li>Fotos estilo polaroid con ganchitos de corazón, chocolates y tarjeta interior</li>
      </ul>
    `,
    priceCents: 6900,
    stock: 12,
    weightGrams: 950,
    dimensionsCm: { length: 28, width: 20, height: 11 },
    category: "Cajas Personalizadas",
    categorySlug: "cajas-sorpresa",
    featured: true,
    image: "/images/productos/box-hot-wheels-abierta.jpg",
    images: [
      "/images/productos/box-hot-wheels-abierta.jpg",
      "/images/productos/box-hot-wheels-cerrada.jpg",
      "/images/productos/box-hot-wheels-detalle.jpg",
      "/images/productos/box-hot-wheels-duo.jpg",
    ],
    video: "/videos/magic-moments-detalle.mp4",
    options: {
      colors: ["Azul Rey", "Rojo Racing", "Negro", "Personalizado"],
      sizes: ["1 Carrito + Llavero", "2 Carritos + Fotos", "Box Dúo"],
      themes: ["Niño Interior", "Hot Wheels Clásico", "Aniversario", "Cumpleaños"],
    },
    reviews: [],
  },
  {
    id: 12,
    sku: "MM-CS-012",
    name: "Box Flores Amarillas «Para la más hermosa»",
    subtitle: "Girasol tejido · Tarjetas desplegables, chocolates y fotos",
    badge: "Flores Amarillas",
    description:
      "Box temático de flores amarillas con tapa ilustrada, lazo satinado amarillo, ramo de girasol tejido a mano, chocolates y tarjetas desplegables con dedicatoria.",
    longDescription: `
      <p>Un detalle luminoso para el 21 de septiembre, cumpleaños o aniversarios. Combina un diseño tierno en tapa con un interior repleto de mensajes y un girasol eterno tejido.</p>
      <ul>
        <li>Caja rígida personalizada con lazo amarillo satinado e ilustración a medida</li>
        <li>Girasol tejido artesanal con margaritas y mariposa decorativa en papel kraft</li>
        <li>Set de 3 tarjetas desplegables unidas con cinta y dedicatorias románticas</li>
        <li>Selección de chocolates y fotografía personalizada en el interior</li>
      </ul>
    `,
    priceCents: 6500,
    stock: 14,
    weightGrams: 900,
    dimensionsCm: { length: 28, width: 20, height: 11 },
    category: "Cajas Personalizadas",
    categorySlug: "cajas-sorpresa",
    featured: true,
    image: "/images/productos/box-flores-amarillas-abierta.jpg",
    images: [
      "/images/productos/box-flores-amarillas-abierta.jpg",
      "/images/productos/box-flores-amarillas-tapa.jpg",
      "/images/productos/box-flores-amarillas-tarjetas.jpg",
    ],
    options: {
      colors: ["Amarillo Girasol", "Crema & Dorado", "Rosa Pétalo"],
      sizes: ["Box Clásico + Girasol", "Box Completo + Chocolates"],
      themes: ["Flores Amarillas (21 Sept)", "Para la más hermosa", "Pollito Tierno", "Aniversario"],
    },
    reviews: [],
  },
  {
    id: 18,
    sku: "MM-CS-018",
    name: "Box Dragon Ball Z «6 Maneras de Amar»",
    subtitle: "Tarjetas desplegables DBZ · QR Spotify, fotos polaroid y chocolates",
    badge: "Anime · DBZ",
    description:
      "Box personalizada de Dragon Ball Z con tapa «Te amo de las 6 maneras de amar en DBZ», tarjetas desplegables de Vegeta, Piccolo y Goku, código Spotify, fotos y dulces.",
    longDescription: `
      <p>Ideal para fans de Dragon Ball Z. Combina una tapa llena de color con tarjetas desplegables interiores dedicadas con frases de la serie, chocolates y código QR de canción.</p>
      <ul>
        <li>Caja rígida blanca personalizada con lazo rojo satinado y broche dorado</li>
        <li>Set desplegable de 3 tarjetas con frases de Vegeta, Piccolo y Goku</li>
        <li>Tira de fotos estilo polaroid, tarjeta QR Spotify y carta dedicatoria interior</li>
        <li>Cama de papel seda rojo y selección de dulces y snacks</li>
      </ul>
    `,
    priceCents: 6800,
    stock: 12,
    weightGrams: 920,
    dimensionsCm: { length: 28, width: 20, height: 11 },
    category: "Cajas Personalizadas",
    categorySlug: "cajas-sorpresa",
    featured: true,
    image: "/images/productos/box-dragon-ball-abierta.jpg",
    images: [
      "/images/productos/box-dragon-ball-abierta.jpg",
      "/images/productos/box-dragon-ball-cerrada.jpg",
    ],
    options: {
      colors: ["Rojo Racing", "Azul Rey", "Negro", "Personalizado"],
      sizes: ["Box Estándar + Dulces", "Box Completo + Llavero DBZ"],
      themes: ["6 Maneras de Amar (DBZ)", "Goku & Milk", "Aniversario", "Cumpleaños"],
    },
    reviews: [],
  },
  {
    id: 21,
    sku: "MM-CS-021",
    name: "Box Troquelada Clash Royale (Corona + Llavero)",
    subtitle: "Caja en forma de corona · Tarjetas Clash, llavero acrílico y fotos",
    badge: "Forma Corona",
    description:
      "Box artesanal troquelada con la forma exacta de la corona de Clash Royale, incluye llavero acrílico «Contigo cada batalla vale la pena», tarjetas temáticas, fotos y dulces.",
    longDescription: `
      <p>Una caja única diseñada a medida en forma de corona Clash Royale. Al abrirla despliega tarjetas temáticas con personajes y un llavero acrílico personalizado incluido.</p>
      <ul>
        <li>Estructura rígida troquelada en forma de escudo y corona Clash Royale</li>
        <li>Incluye llavero acrílico en tarjeta «Llévame siempre contigo» con lazo azul rey</li>
        <li>Tarjetas desplegables («Tú eres mi...»), fotos polaroid con ganchito de corazón</li>
        <li>Relleno de papel seda amarillo, carta dedicatoria y chocolates</li>
      </ul>
    `,
    priceCents: 7500,
    stock: 10,
    weightGrams: 950,
    dimensionsCm: { length: 28, width: 24, height: 11 },
    category: "Cajas Personalizadas",
    categorySlug: "cajas-sorpresa",
    featured: true,
    image: "/images/productos/box-clash-royale-abierta.jpg",
    images: [
      "/images/productos/box-clash-royale-abierta.jpg",
      "/images/productos/box-clash-royale-cerrada.jpg",
    ],
    options: {
      colors: ["Azul Rey", "Dorado", "Rojo Racing"],
      sizes: ["Box Corona + Llavero", "Box Corona + 2 Llaveros Dúo"],
      themes: ["Clash Royale", "Contigo cada batalla", "San Valentín", "Aniversario"],
    },
    reviews: [],
  },
  {
    id: 19,
    sku: "MM-CS-019",
    name: "Box Bob Esponja & Arenita «Te Amo»",
    subtitle: "Tarjetas desplegables · QR Spotify, fotos polaroid y snacks",
    badge: "Personalizada",
    description:
      "Box personalizada con Bob Esponja y Arenita, lazo rojo satinado, tarjetas desplegables con mensajes de amor, código Spotify, fotos y dulces favoritos.",
    longDescription: `
      <p>Un detalle tierno y divertido con la pareja más icónica de Fondo de Bikini. Totalmente personalizable con tu carta dedicatoria, canción favorita en Spotify y fotografías.</p>
      <ul>
        <li>Tapa personalizada con Bob Esponja y Arenita, corazones y lazo rojo con broche</li>
        <li>Tarjetas desplegables unidas con cinta roja («No hay otra persona que prefiera...»)</li>
        <li>Carta extensa personalizada en el interior, tira polaroid y tarjeta QR Spotify</li>
        <li>Cama de papel seda amarillo y surtido de galletas y chocolates</li>
      </ul>
    `,
    priceCents: 6500,
    stock: 12,
    weightGrams: 900,
    dimensionsCm: { length: 28, width: 20, height: 11 },
    category: "Cajas Personalizadas",
    categorySlug: "cajas-sorpresa",
    image: "/images/productos/box-bob-esponja-abierta.jpg",
    images: [
      "/images/productos/box-bob-esponja-abierta.jpg",
      "/images/productos/box-bob-esponja-cerrada.jpg",
    ],
    options: {
      colors: ["Rojo", "Amarillo Girasol", "Rosa Pétalo"],
      sizes: ["Box Clásico + Dulces", "Box Completo + Llavero"],
      themes: ["Bob Esponja & Arenita", "Amor / Reconciliación", "Aniversario"],
    },
    reviews: [],
  },
  {
    id: 20,
    sku: "MM-CS-020",
    name: "Box Aniversario «Solo Queden las Fotografías»",
    subtitle: "Ilustración pareja + cámara · Fotos, QR Spotify y tarjetas desplegables",
    badge: "Aniversario",
    description:
      "Box romántica «Cuando nos falle la memoria y solo queden las fotografías» con ilustración de pareja, tarjetas desplegables, pila de fotos polaroid, QR Spotify y dulces.",
    longDescription: `
      <p>Diseñada para celebrar aniversarios y fechas inolvidables. Reúne sus fotografías favoritas junto a mensajes románticos desplegables y la canción que marca su historia.</p>
      <ul>
        <li>Tapa ilustrada con frase «Cuando nos falle la memoria y solo queden las fotografías»</li>
        <li>Lazo rojo satinado con detalle brillante y tarjeta de aniversario interior</li>
        <li>Acordeón de fotos estilo polaroid con ganchito de corazón y código QR Spotify</li>
        <li>Tarjetas desplegables con la frase «Cuando los años nos pesen...» y dulces</li>
      </ul>
    `,
    priceCents: 6500,
    stock: 14,
    weightGrams: 900,
    dimensionsCm: { length: 28, width: 20, height: 11 },
    category: "Cajas Personalizadas",
    categorySlug: "cajas-sorpresa",
    image: "/images/productos/box-fotografias-abierta.jpg",
    images: [
      "/images/productos/box-fotografias-abierta.jpg",
      "/images/productos/box-fotografias-cerrada.jpg",
    ],
    options: {
      colors: ["Rojo", "Rosa Pétalo", "Azul Rey", "Lila"],
      sizes: ["Box Clásico + Fotos", "Box Completo + Llavero"],
      themes: ["Aniversario", "Recuerdos & Fotos", "San Valentín", "Cásate Conmigo"],
    },
    reviews: [],
  },
  {
    id: 13,
    sku: "MM-RM-013",
    name: "Ramo Hot Wheels con Rosas Eternas",
    subtitle: "2 carritos Hot Wheels · Rosas satinadas azul rey y fotos",
    badge: "Más pedido",
    description:
      "Ramo temático en envoltura coreana negra con 2 carritos Hot Wheels originales, rosas eternas de satén azul rey, fotos personalizadas y toppers racing.",
    longDescription: `
      <p>La combinación perfecta entre flores eternas y pasión por los autos. Cada ramo se envuelve a mano con papel coreano mate y lazo satinado con broche brillante.</p>
      <ul>
        <li>Rosas eternas hechas a mano en cinta satinada azul rey o color a elección</li>
        <li>1 o 2 carritos Hot Wheels en empaque original integrados en el ramo</li>
        <li>Tarjeta dedicatoria «Para el amor de mi vida» y fotos estilo polaroid</li>
        <li>Apliques temáticos (banderas a cuadros, copa, llanta en llamas y corazón)</li>
      </ul>
    `,
    priceCents: 7500,
    stock: 10,
    weightGrams: 720,
    dimensionsCm: { length: 36, width: 26, height: 15 },
    category: "Ramos Temáticos",
    categorySlug: "ramos-tematicos",
    featured: true,
    image: "/images/productos/ramo-hot-wheels.jpg",
    images: [
      "/images/productos/ramo-hot-wheels.jpg",
      "/images/productos/ramo-hot-wheels-detalle.jpg",
      "/images/productos/ramo-hot-wheels-superior.jpg",
    ],
    options: {
      colors: ["Negro & Azul Rey", "Negro & Rojo", "Azul & Dorado"],
      sizes: ["1 Carrito + 3 Rosas", "2 Carritos + 3 Rosas", "Especial + 6 Rosas"],
      themes: ["Para el amor de mi vida", "Hot Wheels Pareja", "Aniversario", "Cumpleaños"],
    },
    reviews: [],
  },
  {
    id: 14,
    sku: "MM-CL-014",
    name: "Cuadro 3D LED «Entre tantos girasoles»",
    subtitle: "Noche Estrellada & Snoopy · Foto polaroid, ramo 3D y luz LED",
    badge: "Con luz LED",
    description:
      "Cuadro tridimensional en marco de madera natural con fondo Noche Estrellada, ramo de girasoles en relieve, ilustración de Snoopy, foto polaroid y luces LED cálidas.",
    longDescription: `
      <p>Uno de nuestros cuadros 3D más especiales: une el cielo estrellado con un campo de girasoles, tu fotografía estilo polaroid y un ramillete tridimensional iluminado desde el interior.</p>
      <ul>
        <li>Marco profundo en madera natural con guirnalda de luces LED cálidas integrada</li>
        <li>Ramo de girasoles 3D artesanal con lazo de organza y detalle de Snoopy</li>
        <li>Frase personalizada «Entre tantos girasoles, siempre te elegiré a ti»</li>
        <li>Opción disponible en combo junto con osito de peluche blanco</li>
      </ul>
    `,
    priceCents: 5800,
    stock: 12,
    weightGrams: 700,
    dimensionsCm: { length: 25, width: 20, height: 6 },
    category: "Cuadros 3D LED",
    categorySlug: "cuadros-3d-led",
    featured: true,
    image: "/images/productos/cuadro-3d-led-girasoles.jpg",
    images: [
      "/images/productos/cuadro-3d-led-girasoles.jpg",
      "/images/productos/cuadro-3d-led-girasoles-osito.jpg",
      "/images/productos/cuadro-3d-led-florecer.jpg",
    ],
    options: {
      colors: ["Madera Natural", "Blanco", "Negro"],
      sizes: ["Solo Cuadro 3D LED", "Combo Cuadro + Osito"],
      themes: ["Noche Estrellada + Snoopy", "Girasoles + Polaroid", "21 de Septiembre"],
    },
    reviews: [],
  },
  {
    id: 15,
    sku: "MM-CL-015",
    name: "Cuadro 3D LED «Tú haces florecer mi vida»",
    subtitle: "Tira de 3 fotos · Ramo de girasoles 3D, cinta y luces cálidas",
    badge: "3 Fotos",
    description:
      "Cuadro 3D iluminado con luces LED cálidas, espacio para 3 fotografías de pareja, ramo artesanal de girasoles con lazo satinado y banner «Gracias por existir».",
    longDescription: `
      <p>Ideal para revivir sus mejores momentos juntos en un solo marco iluminado. Incluye tres fotografías personalizadas junto a un ramo tridimensional de girasoles.</p>
      <ul>
        <li>Marco profundo de madera clara con iluminación LED cálida perimetral</li>
        <li>3 fotografías personalizadas impresas en alta nitidez</li>
        <li>Ramo de girasoles 3D en relieve con lazo blanco y mensaje «Gracias por existir»</li>
        <li>Empaque protector listo para envío seguro por Shalom a todo el Perú</li>
      </ul>
    `,
    priceCents: 5500,
    stock: 12,
    weightGrams: 680,
    dimensionsCm: { length: 25, width: 20, height: 6 },
    category: "Cuadros 3D LED",
    categorySlug: "cuadros-3d-led",
    image: "/images/productos/cuadro-3d-led-florecer.jpg",
    images: [
      "/images/productos/cuadro-3d-led-florecer.jpg",
      "/images/productos/cuadro-3d-led-girasoles.jpg",
      "/images/productos/cuadro-3d-led-girasoles-osito.jpg",
    ],
    options: {
      colors: ["Madera Natural", "Blanco", "Rosa Pétalo"],
      sizes: ["Modelo Clásico (20×25 cm)", "Modelo Grande (25×30 cm)"],
      themes: ["Tú haces florecer mi vida", "Gracias por existir", "Aniversario"],
    },
    reviews: [],
  },
  {
    id: 2,
    sku: "MM-LL-002",
    name: "Llavero Acrílico Spotify & Foto",
    subtitle: "Tarjeta «Llévame siempre contigo» · Lazo satinado y unidad o lote (12+)",
    badge: "Unidad o lote 12+",
    description:
      "Llavero acrílico con tu foto y canción favorita en código Spotify, o diseño personalizado, presentado en tarjeta «Llévame siempre contigo» con lazo satinado.",
    longDescription: `
      <p>Un recuerdo duradero y lleno de significado para llevar a todas partes. Incluye presentación en tarjeta impresa con lazo de satén a elección.</p>
      <ul>
        <li>Acrílico cristalino de alta nitidez (doble cara con foto, canción Spotify o frase)</li>
        <li>Presentación en tarjeta «Llévame siempre contigo» con lazo azul rey o rojo</li>
        <li>Disponible por unidad o en lotes pequeños (6, 12 o más recuerdos para eventos)</li>
        <li>Consulta el Catálogo de Llaveros 2026 con decenas de plantillas disponibles</li>
      </ul>
    `,
    priceCents: 1200,
    stock: 60,
    weightGrams: 35,
    dimensionsCm: { length: 9, width: 6, height: 2 },
    category: "Llaveros Acrílicos",
    categorySlug: "llaveros",
    featured: true,
    image: "/images/productos/llavero-spotify-azul.jpg",
    images: [
      "/images/productos/llavero-spotify-azul.jpg",
      "/images/productos/llavero-duo-llevame-contigo.jpg",
      "/images/productos/box-hot-wheels-detalle.jpg",
      "/images/productos/llavero-foto-calendario.jpg",
    ],
    options: {
      colors: ["Lazo Azul Rey", "Lazo Rojo", "Lazo Rosa", "Dorado"],
      sizes: ["Individual + Tarjeta y Lazo", "Lote 6 u.", "Docena 12+ u."],
      themes: ["Código Spotify + Foto", "Foto Polaroid", "Maneja con Cuidado", "Recuerdo Evento (Lote)"],
    },
    reviews: [],
  },
  {
    id: 6,
    sku: "MM-LL-006",
    name: "Dúo de Llaveros «Llévame siempre contigo»",
    subtitle: "Set 2 llaveros · Tarjeta doble, lazos rojos y bolsa kraft Magic Moments",
    badge: "Pack Dúo",
    description:
      "Set de dos llaveros acrílicos con fotos de pareja o familia, doble lazo rojo satinado en tarjeta «Llévame siempre contigo» y bolsa de regalo kraft con logo.",
    longDescription: `
      <p>Nuestra presentación estrella para parejas, mamá, familia o mejores amigos. Dos llaveros acrílicos listos para regalar en empaque sellado y bolsita kraft Magic Moments.</p>
      <ul>
        <li>Set de 2 llaveros acrílicos rectangulares personalizados por ambas caras</li>
        <li>Tarjeta dedicatoria «Llévame siempre contigo» con dos lazos de satén</li>
        <li>Incluye bolsa kraft con sello de la marca lista para entregar</li>
        <li>Personalizable con fotos, dedicatorias («Te amo», fechas) o ilustraciones</li>
      </ul>
    `,
    priceCents: 2400,
    stock: 25,
    weightGrams: 95,
    dimensionsCm: { length: 16, width: 12, height: 3 },
    category: "Llaveros Acrílicos",
    categorySlug: "llaveros",
    featured: true,
    image: "/images/productos/llavero-duo-llevame-contigo.jpg",
    images: [
      "/images/productos/llavero-duo-llevame-contigo.jpg",
      "/images/productos/llavero-duo-familia-kraft.jpg",
      "/images/productos/llavero-spotify-azul.jpg",
      "/images/productos/llavero-foto-calendario.jpg",
    ],
    options: {
      colors: ["Lazo Rojo", "Lazo Azul Rey", "Lazo Rosa"],
      sizes: ["Dúo + Tarjeta + Bolsa Kraft", "Solo Tarjeta en Celofán"],
      themes: ["Fotos de Pareja", "Mamá / Familia", "Aniversario / Fechas", "Amistad"],
    },
    reviews: [],
  },
  {
    id: 16,
    sku: "MM-LL-016",
    name: "Llavero Dúo Foto + Calendario Especial",
    subtitle: "Foto «Te Amo» + mes con fecha marcada · Diseño Spotify o Google",
    badge: "Fecha Especial",
    description:
      "Llaveros acrílicos con tu fotografía favorita y el calendario del mes marcando con un corazón su fecha especial (aniversario, cumpleaños o mesversario).",
    longDescription: `
      <p>Guarda esa fecha inolvidable en un detalle diario. Combina tu foto favorita con el calendario personalizado del mes y el día señalado con un corazón rojo.</p>
      <ul>
        <li>Cara frontal con foto polaroid y frase («Te Amo» o dedicatoria corta)</li>
        <li>Segundo llavero o reverso con calendario del mes y fecha destacada</li>
        <li>También disponible en formato búsqueda Google o reproductor Spotify</li>
        <li>Opción con tarjeta «Llévame siempre contigo» y lazo satinado</li>
      </ul>
    `,
    priceCents: 2400,
    stock: 30,
    weightGrams: 80,
    dimensionsCm: { length: 12, width: 9, height: 2 },
    category: "Llaveros Acrílicos",
    categorySlug: "llaveros",
    image: "/images/productos/llavero-foto-calendario.jpg",
    images: [
      "/images/productos/llavero-foto-calendario.jpg",
      "/images/productos/llavero-duo-llevame-contigo.jpg",
      "/images/productos/llavero-spotify-azul.jpg",
    ],
    options: {
      colors: ["Transparente", "Lazo Rojo", "Lazo Azul Rey", "Lazo Rosa"],
      sizes: ["Set Dúo (Foto + Calendario)", "Individual (Doble Cara)"],
      themes: ["Foto + Calendario", "Búsqueda Google + Foto", "Iniciales Spotify (I Love U)", "Día del Padre"],
    },
    reviews: [],
  },
  {
    id: 17,
    sku: "MM-LL-017",
    name: "Dúo de Llaveros Personajes & Anime",
    subtitle: "Goku & Milk, Spider-Man, Cars, Simpsons, Shrek y Superhéroes Chibi",
    badge: "Catálogo 2026",
    description:
      "Llaveros dúo compartidos con tus personajes favoritos (Goku & Milk, Spider-Man & Gwen / Hello Kitty, Rayo McQueen & Sally, Homero & Marge, Shrek & Fiona).",
    longDescription: `
      <p>Diseños del Catálogo de Llaveros 2026 pensados para compartir «Uno para ti, uno para mí». Elige entre anime, películas, caricaturas o superhéroes chibi.</p>
      <ul>
        <li>Par de llaveros acrílicos con impresión a color de alta definición</li>
        <li>Más de 20 temáticas en catálogo: Goku & Milk, Spider-Man, Cars, Simpsons, Shrek, La Princesa y el Sapo, Danny Phantom, Clash Royale y Superhéroes Chibi</li>
        <li>Presentación en tarjeta temática «Feliz primer mes juntos» o «Uno para ti / Uno para mí»</li>
        <li>Ideal para parejas, mejores amigos o recuerdos temáticos</li>
      </ul>
    `,
    priceCents: 2200,
    stock: 35,
    weightGrams: 85,
    dimensionsCm: { length: 14, width: 11, height: 2 },
    category: "Llaveros Acrílicos",
    categorySlug: "llaveros",
    image: "/images/productos/llavero-duo-anime-goku.jpg",
    images: [
      "/images/productos/llavero-duo-anime-goku.jpg",
      "/images/productos/llavero-duo-llevame-contigo.jpg",
      "/images/productos/llavero-duo-familia-kraft.jpg",
    ],
    options: {
      colors: ["Lazo Rojo", "Lazo Azul Rey", "Negro", "Lazo Rosa"],
      sizes: ["Set Dúo + Tarjeta Temática", "Set Dúo + Bolsa Kraft"],
      themes: [
        "Goku & Milk (Dragon Ball)",
        "Spider-Man & Gwen / Hello Kitty",
        "Cars (McQueen & Sally)",
        "Simpsons / Shrek / Superhéroes Chibi",
      ],
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
    badge: "Kit Curado",
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
    stock: 15,
    weightGrams: 850,
    dimensionsCm: { length: 26, width: 18, height: 11 },
    category: "Cajas Personalizadas",
    categorySlug: "cajas-sorpresa",
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
    id: 9,
    sku: "MM-CL-009",
    name: "Cuadro 3D LED Superhéroes & Temático",
    subtitle: "Personalizado con nombre · Fondo cómic y luces LED cálidas",
    badge: "A medida",
    description:
      "Cuadro tridimensional de madera iluminado con luces LED cálidas, nombre en relieve y temática favorita (Spider-Man, Fútbol, Parejas).",
    longDescription: `
      <p>Uno de los detalles más pedidos en @magic_moments050. Combina profundidad 3D con el nombre de esa persona especial, lámina temática y luces LED cálidas en el interior.</p>
      <ul>
        <li>Disponible en marco profundo negro o madera natural</li>
        <li>Iluminación LED cálida interior lista para encender</li>
        <li>Personalizable con temáticas (Spider-Man / Marvel, Fútbol, Girasoles, Parejas)</li>
        <li>Empaque protegido para envío seguro por Shalom a todo el Perú</li>
      </ul>
    `,
    priceCents: 5500,
    stock: 14,
    weightGrams: 680,
    dimensionsCm: { length: 24, width: 19, height: 6 },
    category: "Cuadros 3D LED",
    categorySlug: "cuadros-3d-led",
    image: "/images/prod-cuadro-3d-led.jpg",
    images: [
      "/images/prod-cuadro-3d-led.jpg",
      "/images/productos/cuadro-3d-led-girasoles.jpg",
      "/images/productos/cuadro-3d-led-florecer.jpg",
    ],
    options: {
      colors: ["Negro", "Madera Natural", "Blanco"],
      sizes: ["Modelo Clásico (20×25 cm)", "Modelo Grande (25×30 cm)"],
      themes: ["Superhéroes / Spider-Man", "Fútbol", "Girasoles / 21 Sept", "Pareja & Fotos"],
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
    image: "/images/prod-ramo-eterno.jpg",
    images: [
      "/images/prod-ramo-eterno.jpg",
      "/images/productos/ramo-hot-wheels.jpg",
      "/images/prod-caja-amor.jpg",
    ],
    options: {
      colors: ["Rosa Pétalo", "Azul Rey & Rosa", "Amarillo Girasol", "Rojo Pasión"],
      sizes: ["6 Rosas", "12 Rosas", "Especial con Detalles"],
      themes: ["Aniversario", "Flores Amarillas", "Hot Wheels", "Cumpleaños"],
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
