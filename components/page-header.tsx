export function PageHeader({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
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
