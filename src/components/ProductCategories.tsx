import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { productCategories } from "@/data/catalog"

export default function ProductCategories() {
  const homeCategories = productCategories.slice(0, 4)

  return (
    <section className="w-full border-y border-[var(--border-subtle)] bg-[var(--surface-page)] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-balance text-[var(--text-primary)] md:text-4xl">
              Explora por Categoría
            </h2>
            <p className="text-pretty mt-2 text-sm text-[var(--text-secondary)] sm:text-base">
              Cajas temáticas, cuadros 3D iluminados, ramos eternos y llaveros acrílicos personalizados a tu gusto.
            </p>
          </div>
          <Link
            href="/productos"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[var(--text-accent-accessible)] underline underline-offset-4 hover:opacity-80"
          >
            <span>Ver las {productCategories.length} categorías</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {homeCategories.map((category) => (
            <article key={category.slug} className="group flex flex-col">
              <Link
                href={`/productos?categoria=${category.slug}`}
                className="flex flex-1 flex-col rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-3 shadow-sm transition-all hover:border-[var(--color-cta-primary)] hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[calc(var(--radius-card)-0.25rem)] bg-[var(--surface-blush)]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="studio-photo-adapt object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-3.5 flex flex-1 flex-col justify-between px-1 pb-1">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-bold tracking-tight text-[var(--text-primary)]">
                        {category.name}
                      </h3>
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--surface-blush)] text-[var(--text-accent-accessible)] transition-colors group-hover:bg-[var(--color-cta-primary)] group-hover:text-[var(--color-cta-primary-ink)]">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                    <p className="text-pretty mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                      {category.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
