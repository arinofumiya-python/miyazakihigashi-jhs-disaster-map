"use client"

import { MapPin, Phone, Users } from "lucide-react"
import { getDisasterColor, getDisasterLabel } from "@/lib/disaster-types"
import { formatDistance } from "@/lib/geo"
import type { ShelterWithDistance } from "@/lib/types"

export function ShelterPopup({
  shelter,
}: {
  shelter: ShelterWithDistance
}) {
  return (
    <div className="min-w-56 max-w-72 text-foreground">

      {/* =========================
          Google Maps
      ========================== */}
      {shelter.googleMapEmbedUrl && (
        <div className="mb-3 overflow-hidden rounded-md">
          <iframe
            src={shelter.googleMapEmbedUrl}
            width="100%"
            height="220"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title={`${shelter.name}のGoogle Maps`}
          />
        </div>
      )}

      {/* =========================
          避難所名
      ========================== */}
      <h3 className="text-base font-bold leading-tight">
        {shelter.name}
      </h3>

      {/* =========================
          基本情報
      ========================== */}
      <ul className="mt-2 flex flex-col gap-1 text-sm">

        <li className="flex items-start gap-1.5">
          <MapPin
            className="mt-0.5 size-3.5 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <span>{shelter.address}</span>
        </li>

        <li className="flex items-center gap-1.5">
          <Phone
            className="size-3.5 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />

          <a
            href={`tel:${shelter.phone}`}
            className="text-primary underline"
          >
            {shelter.phone}
          </a>
        </li>

        <li className="flex items-center gap-1.5">
          <Users
            className="size-3.5 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />

          <span>
            収容 約{shelter.capacity.toLocaleString()}人
          </span>
        </li>

      </ul>

      {/* =========================
          対応災害
      ========================== */}
      <div className="mt-2 flex flex-wrap gap-1">
        {shelter.disasterTypes.map((t) => (
          <span
            key={t}
            className="rounded-full px-2 py-0.5 text-[11px] font-medium text-white"
            style={{
              backgroundColor: getDisasterColor(t),
            }}
          >
            {getDisasterLabel(t)}
          </span>
        ))}
      </div>

      {/* =========================
          現在地からの距離
      ========================== */}
      {shelter.distance !== null && (
        <p className="mt-2 text-sm font-medium text-accent">
          現在地から {formatDistance(shelter.distance)}
        </p>
      )}

      {/* =========================
          詳細ページ
      ========================== */}
      <a
        href={`/shelters/${shelter.id}`}
        className="mt-2 inline-block rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
      >
        詳細を見る
      </a>

    </div>
  )
}