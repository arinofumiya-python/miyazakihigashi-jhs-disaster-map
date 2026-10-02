import type { Shelter } from "@/lib/types"

type GoogleMapsEmbedProps = {
  shelters: Shelter[]
  focusShelterId?: string
}

export function GoogleMapsEmbed({ shelters, focusShelterId }: GoogleMapsEmbedProps) {
  const focusedShelter = focusShelterId
    ? shelters.find((shelter) => shelter.id === focusShelterId)
    : undefined
  const center = focusedShelter ?? shelters[0]

  if (!center) return null

  const query = `${center.latitude},${center.longitude}`
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
  const title = focusedShelter
    ? `${focusedShelter.name}のGoogle Maps`
    : "避難所周辺のGoogle Maps"

  return (
    <iframe
      src={mapUrl}
      title={title}
      className="size-full border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  )
}
