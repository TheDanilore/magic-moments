import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { productCategories } from "@/data/catalog"

export default function ProductCategories() {
  return (
    <section className="w-full border-b border-[var(--border-subtle)] bg-[var(--surface-page)] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)] md:text-4xl">
            Explora por Categoría
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)] sm:text-base">
            Elige el formato ideal según la ocasión y personalízalo al detalle.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((category) => (
            <article key={category.slug} className="group flex flex-col">
              <Link
                href={`/productos?categoria=${category.slug}`}
                className="flex flex-1 flex-col rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-3 transition-colors hover:border-[var(--color-cta-primary)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[calc(var(--radius-card)-0.25rem)] bg-[var(--surface-card)]">
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
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-[var(--text-accent-accessible)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
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
