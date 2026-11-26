import Link from "next/link"
import { productCategories } from "@/data/catalog"

export default function ProductNotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-start justify-center px-4 py-20 text-[var(--text-primary)] sm:px-8">
      <p className="text-xs font-semibold tracking-wider text-[var(--text-accent-accessible)] uppercase">
        Detalle no disponible · 404
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Este detalle ya no está en vitrina.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
        Es posible que el enlace esté incompleto o que esta edición personalizada haya salido de catálogo. Explora nuestras categorías activas o vuelve a la tienda.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {productCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/productos?categoria=${cat.slug}`}
            className="inline-flex min-h-12 items-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--color-cta-primary)] lg:min-h-11"
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <Link
          href="/productos"
          className="inline-flex min-h-12 items-center rounded-full bg-[var(--color-cta-dark)] px-6 text-xs font-semibold text-[var(--color-cta-dark-ink)] transition-colors hover:bg-[var(--color-cta-primary)] hover:text-[var(--color-cta-primary-ink)] lg:min-h-11"
        >
          Explorar productos
        </Link>
        <Link
          href="/promociones"
          className="inline-flex min-h-12 items-center rounded-full border border-[var(--border-strong)] px-6 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-card)] lg:min-h-11"
        >
          Ver promociones
        </Link>
      </div>
    </div>
  )
}
