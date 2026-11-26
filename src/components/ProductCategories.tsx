import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { productCategories, products } from "@/data/catalog"

export default function ProductCategories() {
  return (
    <section className="w-full border-y border-[var(--border-subtle)] bg-[var(--surface-page)] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-balance text-[var(--text-primary)] sm:text-3xl md:text-4xl">
              Explora por Categoría
            </h2>
            <p className="text-pretty mt-1.5 text-sm text-[var(--text-secondary)] sm:text-base">
              Las 6 líneas de nuestro taller en Chimbote, personalizables en color, fotos y dedicatoria.
            </p>
          </div>
          <Link
            href="/productos"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[var(--text-accent-accessible)] underline underline-offset-4 hover:opacity-80"
          >
            <span>Ver catálogo completo</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {productCategories.map((category) => {
            const count = products.filter((p) => p.categorySlug === category.slug).length
            return (
              <article key={category.slug} className="group flex flex-col">
                <Link
                  href={`/productos?categoria=${category.slug}`}
                  className="flex flex-1 flex-col rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-2.5 shadow-sm transition-all hover:border-[var(--color-cta-primary)] hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[calc(var(--radius-card)-0.3rem)] bg-[var(--surface-blush)]">
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 16vw"
                      className="studio-photo-adapt object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-2.5 flex flex-1 items-center justify-between gap-1.5 px-0.5 pb-0.5">
                    <div className="min-w-0">
                      <h3 className="line-clamp-2 font-display text-sm leading-tight font-bold tracking-tight text-[var(--text-primary)]">
                        {category.name}
                      </h3>
                      <span className="mt-0.5 block text-[11px] font-medium text-[var(--text-secondary)] tabular-nums">
                        {count} {count === 1 ? "modelo" : "modelos"}
                      </span>
                    </div>
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--surface-blush)] text-[var(--text-accent-accessible)] transition-colors group-hover:bg-[var(--color-cta-primary)] group-hover:text-[var(--color-cta-primary-ink)]">
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
