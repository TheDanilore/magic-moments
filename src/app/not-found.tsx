import Link from "next/link"

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-start justify-center px-4 py-20 text-[var(--text-primary)] sm:px-8">
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
        No encontramos esa página.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
        Error 404 · Ruta no encontrada. Vuelve a la tienda principal o explora los detalles personalizados disponibles.
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex min-h-12 items-center rounded-full bg-[var(--color-cta-dark)] px-6 text-xs font-semibold text-[var(--color-cta-dark-ink)] transition-colors hover:bg-[var(--color-cta-primary)] hover:text-[var(--color-cta-primary-ink)] lg:min-h-11"
      >
        Volver a Magic Moments
      </Link>
    </div>
  )
}
