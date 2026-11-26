export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-[var(--surface-page)]">
      <section
        data-surface="obsidian"
        className="bg-[var(--surface-obsidian)] pt-8 pb-16 md:pt-10"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="h-5 w-60 rounded-full bg-white/10" />
            <div className="h-11 w-32 rounded-full bg-white/10" />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10 lg:gap-12">
            <div className="space-y-3 md:col-span-6">
              <div className="aspect-square w-full rounded-[var(--radius-stage)] bg-white/8" />
              <div className="grid grid-cols-4 gap-2.5">
                {[0, 1, 2, 3].map((idx) => (
                  <div key={idx} className="aspect-square rounded-xl bg-white/8" />
                ))}
              </div>
            </div>

            <div className="space-y-5 md:col-span-6">
              <div className="h-4 w-44 rounded-full bg-white/10" />
              <div className="h-12 w-4/5 rounded-2xl bg-white/10" />
              <div className="h-4 w-1/2 rounded-full bg-white/8" />
              <div className="h-9 w-36 rounded-xl bg-white/10" />
              <div className="h-20 w-full rounded-2xl bg-white/6" />
              <div className="space-y-3 border-y border-white/10 py-4">
                <div className="h-4 w-full rounded-full bg-white/8" />
                <div className="h-4 w-full rounded-full bg-white/8" />
                <div className="h-4 w-3/4 rounded-full bg-white/8" />
              </div>
              <div className="h-12 w-full rounded-full bg-[var(--color-cta-primary)]/40" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
