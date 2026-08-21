import Link from "next/link"
import {
  ArrowRight,
  ClipboardList,
  Map as MapIcon,
} from "lucide-react"
import { getShelters, MAP_CENTER } from "@/lib/shelters"
import { MapView } from "@/components/map/map-view"

export default function HomePage() {
  const shelters = getShelters()

  return (
    <div>
      {/* ヒーロー */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url(/images/hero-map.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <p className="mb-3 text-sm font-medium text-primary">
            宮崎県宮崎市 宮東地区
          </p>

          <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
            いざという時に、命を守る備えを。
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            宮東地区の避難所・ハザードマップをまとめた防災情報サイトです。
            日頃の備えと、災害時の迅速な行動にお役立てください。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shelters"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              避難所を探す
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 地図 */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">
              防災マップ
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              避難所の位置とその場所の詳細がわかります
            </p>
          </div>

          <Link
            href="/shelters"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
          >
            一覧で見る
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="h-[70vh] min-h-96 overflow-hidden rounded-lg border border-border shadow-sm">
          <MapView shelters={shelters} />
        </div>

        <p className="mt-2 text-xs text-muted-foreground">
          中心座標: 緯度 {MAP_CENTER[0]} / 経度 {MAP_CENTER[1]}（宮東地区）
        </p>
      </section>

      {/* クイックリンク */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="sr-only">主なコンテンツ</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <QuickCard
            href="/shelters"
            icon={
              <MapIcon className="size-6" aria-hidden="true" />
            }
            title="避難所一覧"
            text="地区内の避難所を検索・並び替えできます。"
          />

          <QuickCard
            href="/checklist"
            icon={
              <ClipboardList className="size-6" aria-hidden="true" />
            }
            title="備蓄チェックリスト"
            text="非常持ち出し品を確認しましょう。"
          />
        </div>
      </section>
    </div>
  )
}

function QuickCard({
  href,
  icon,
  title,
  text,
}: {
  href: string
  icon: React.ReactNode
  title: string
  text: string
}) {
  return (
    <Link
      href={href}
      className="group rounded-lg border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-3 text-primary">
        {icon}
      </div>

      <h3 className="font-semibold group-hover:text-primary">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        {text}
      </p>
    </Link>
  )
}