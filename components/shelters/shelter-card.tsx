import Link from "next/link"
import { MapPin, Navigation, Users } from "lucide-react"
import { LazyImage } from "@/components/lazy-image"
import { getDisasterColor, getDisasterLabel } from "@/lib/disaster-types"
import { formatDistance } from "@/lib/geo"
import type { ShelterWithDistance } from "@/lib/types"

export function ShelterCard({ shelter }: { shelter: ShelterWithDistance }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={`/shelters/${shelter.id}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`${shelter.name} の詳細を見る`}
      >
        <LazyImage
          src={shelter.photo?.[0] ?? "/placeholder.svg"}
          alt={`${shelter.name}の写真`}
          wrapperClassName="aspect-[16/10]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-bold leading-snug">
          <Link
            href={`/shelters/${shelter.id}`}
            className="hover:text-primary focus:outline-none focus-visible:underline"
          >
            {shelter.name}
          </Link>
        </h3>

        <p className="mt-1 flex items-start gap-1.5 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {shelter.address}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="flex items-center gap-1.5">
            <Users className="size-4 text-muted-foreground" aria-hidden="true" />
            約{shelter.capacity.toLocaleString()}人
          </span>
          {shelter.distance !== null && (
            <span className="flex items-center gap-1.5 font-medium text-accent">
              <Navigation className="size-4" aria-hidden="true" />
              {formatDistance(shelter.distance)}
            </span>
          )}
        </div>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {shelter.disasterTypes.map((t) => (
            <li
              key={t}
              className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
              style={{ backgroundColor: getDisasterColor(t) }}
            >
              {getDisasterLabel(t)}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
