export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        {eyebrow && (
          <p className="mb-2 text-xs font-bold tracking-[0.18em] text-primary">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-bold text-balance sm:text-3xl">{title}</h1>
        {description && (
          <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
