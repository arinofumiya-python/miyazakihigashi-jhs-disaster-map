import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Accessibility,
  ArrowLeft,
  Building2,
  Clock,
  ExternalLink,
  MapPin,
  Phone,
  StickyNote,
  Users,
} from "lucide-react"
import { LazyImage } from "@/components/lazy-image"
import { MapView } from "@/components/map/map-view"
import { getDisasterColor, getDisasterLabel } from "@/lib/disaster-types"
import { getShelterById, getShelters } from "@/lib/shelters"

export function generateStaticParams() {
  return getShelters().map((s) => ({ id: s.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const shelter = getShelterById(id)
  if (!shelter) return { title: "避難所が見つかりません" }
  return {
    title: shelter.name,
    description: shelter.description,
  }
}

export default async function ShelterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const shelter = getShelterById(id)
  if (!shelter) notFound()

  const allShelters = getShelters()

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link
        href="/shelters"
        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        避難所一覧に戻る
      </Link>

      <header className="mt-4">
        <h1 className="text-2xl font-bold text-balance sm:text-3xl">{shelter.name}</h1>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {shelter.disasterTypes.map((t) => (
            <li
              key={t}
              className="rounded-full px-2.5 py-0.5 text-sm font-medium text-white"
              style={{ backgroundColor: getDisasterColor(t) }}
            >
              {getDisasterLabel(t)}対応
            </li>
          ))}
        </ul>
      </header>

      {/* 写真 */}
      {shelter.photo.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {shelter.photo.map((src, i) => (
            <LazyImage
              key={src + i}
              src={src}
              alt={`${shelter.name}の写真 ${i + 1}`}
              wrapperClassName="aspect-[16/10] rounded-lg border border-border"
            />
          ))}
        </div>
      )}

      <p className="mt-6 leading-relaxed text-pretty">{shelter.description}</p>

      {/* 基本情報 */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoRow icon={<MapPin className="size-5" />} label="住所">
          {shelter.address}
        </InfoRow>
        <InfoRow icon={<Phone className="size-5" />} label="電話番号">
          <a href={`tel:${shelter.phone}`} className="text-primary underline">
            {shelter.phone}
          </a>
        </InfoRow>
        <InfoRow icon={<Users className="size-5" />} label="収容人数">
          約{shelter.capacity.toLocaleString()}人
        </InfoRow>
        <InfoRow icon={<Clock className="size-5" />} label="開設時間">
          {shelter.openingHours}
        </InfoRow>
      </div>

      {/* 設備 */}
      <Section icon={<Building2 className="size-5" />} title="設備">
        <ul className="flex flex-wrap gap-2">
          {shelter.facilities.map((f) => (
            <li
              key={f}
              className="rounded-md border border-border bg-secondary px-2.5 py-1 text-sm"
            >
              {f}
            </li>
          ))}
        </ul>
      </Section>

      {/* バリアフリー */}
      <Section icon={<Accessibility className="size-5" />} title="バリアフリー対応">
        <ul className="flex flex-wrap gap-2">
          {shelter.accessibility.map((a) => (
            <li
              key={a}
              className="rounded-md border border-border bg-secondary px-2.5 py-1 text-sm"
            >
              {a}
            </li>
          ))}
        </ul>
      </Section>

      {shelter.notes && (
        <Section icon={<StickyNote className="size-5" />} title="注意事項">
          <p className="leading-relaxed">{shelter.notes}</p>
        </Section>
      )}

      {shelter.website && (
        <p className="mt-4">
          <a
            href={shelter.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            公式サイト
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </p>
      )}

      {/* 位置 */}
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-bold">地図</h2>
        <div className="h-[50vh] min-h-72 overflow-hidden rounded-lg border border-border shadow-sm">
          <MapView shelters={allShelters} focusShelterId={shelter.id} />
        </div>
      </section>

      <p className="mt-6 text-xs text-muted-foreground">
        最終更新日: {shelter.lastUpdated}
      </p>
    </div>
  )
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
      <span className="mt-0.5 text-primary" aria-hidden="true">
        {icon}
      </span>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{children}</p>
      </div>
    </div>
  )
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-6">
      <h2 className="mb-2 flex items-center gap-2 text-lg font-bold">
        <span className="text-primary" aria-hidden="true">
          {icon}
        </span>
        {title}
      </h2>
      {children}
    </section>
  )
}
