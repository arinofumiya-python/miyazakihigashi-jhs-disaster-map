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
        description="地区内の避難所を地図と一覧で確認できます。検索・絞り込み・最寄り検索をご利用ください。"
      />

      {/* ========================================
          ペット同行避難について
      ======================================== */}

      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="rounded-xl border border-border bg-muted/40 p-5">
          <h2 className="mb-4 text-lg font-bold">
            🐾 ペット同行避難について
          </h2>

          <div className="space-y-4 text-sm leading-7">
            <div>
              <h3 className="font-bold">
                ペット不可
              </h3>
              <p className="text-muted-foreground">
                ペットを連れて避難所へ避難することはできません。
              </p>
            </div>

            <div>
              <h3 className="font-bold">
                同行避難
              </h3>
              <p className="text-muted-foreground">
                ペットを連れて避難所まで来ることができます。
                避難所に到着した後は、ケージなどに入れて、
                指定された場所でまとめて管理します。
              </p>
            </div>

            <div>
              <h3 className="font-bold">
                同室避難不可
              </h3>
              <p className="text-muted-foreground">
                ペットと人が同じ部屋で過ごすことはできません。
              </p>
            </div>

            <div>
              <h3 className="font-bold">
                同室避難
              </h3>
              <p className="text-muted-foreground">
                ペットと一緒に避難所内部で過ごすことができます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          地図
      ======================================== */}

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-3 text-lg font-bold">地図で見る</h2>

        <div className="h-[60vh] min-h-80 overflow-hidden rounded-lg border border-border shadow-sm">
          <MapView shelters={shelters} />
        </div>
      </section>

      {/* ========================================
          避難所一覧
      ======================================== */}

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="mb-3 text-lg font-bold">
          一覧から探す
        </h2>

        <ShelterBrowser shelters={shelters} />
      </section>
    </div>
  )
}