import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ShelterBrowser } from "@/components/shelters/shelter-browser"
import { MapView } from "@/components/map/map-view"
import { getShelters } from "@/lib/shelters"

export const metadata: Metadata = {
  title: "避難所一覧",
  description:
    "宮崎市宮東地区の避難所を地図と一覧で確認できます。名称・住所での検索、災害種別での絞り込み、現在地からの最寄り検索に対応しています。",
}

export default function SheltersPage() {
  const shelters = getShelters()

  return (
    <div>
      <PageHeader
        title="避難所一覧"
        description={
          <>
            地区内の避難所を地図と一覧で確認できます。検索・絞り込み・最寄り検索をご利用ください。
            <br />
            最新情報はこちらの{" "}
            <a
              href="https://www.city.miyazaki.miyazaki.jp/life/fire_department/shelter_info/o_shelter.html#%E6%8C%87%E5%AE%9A%E9%81%BF%E9%9B%A3%E6%89%80%E3%81%AE%E9%96%8B%E8%A8%AD%E7%8A%B6%E6%B3%81"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              宮崎市ホームページ
            </a>
            内からご確認ください。
          </>
        }
      />

      {/* ペット同行避難について */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="rounded-xl border border-border bg-muted/40 p-5">
          <h2 className="mb-4 text-lg font-bold">🐾 ペット同行避難について</h2>

          <div className="space-y-4 text-sm leading-7">
            <p>
              災害時にペットと一緒に避難する場合は、各避難所の受け入れ条件を事前に確認してください。
            </p>

            <p>
              避難所では、原則としてペットと人が同じスペースで過ごすことはできません。
              ケージやキャリーなどを準備し、必要なペット用品も各自で用意してください。
            </p>

            <p>
              ペット同行避難の可否や詳しいルールについては、災害発生時に宮崎市から発表される最新情報を確認してください。
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-3 text-lg font-bold">地図で見る</h2>

        <div className="h-[60vh] min-h-80 overflow-hidden rounded-lg border border-border shadow-sm">
          <MapView shelters={shelters} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="mb-3 text-lg font-bold">一覧から探す</h2>

        <ShelterBrowser shelters={shelters} />
      </section>
    </div>
  )
}