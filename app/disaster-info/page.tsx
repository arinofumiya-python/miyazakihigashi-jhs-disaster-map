import { AlertTriangle, Droplets, Mountain, Waves } from "lucide-react"
import { PageHeader } from "@/components/page-header"

const hazards = [
  {
    title: "洪水・浸水",
    icon: Droplets,
    color: "text-blue-600",
    text: "大雨や河川の増水に備え、浸水想定区域と避難経路を事前に確認しましょう。",
  },
  {
    title: "津波",
    icon: Waves,
    color: "text-cyan-600",
    text: "強い揺れや長い揺れを感じたら、情報を待たずに高い場所へ避難してください。",
  },
  {
    title: "土砂災害",
    icon: Mountain,
    color: "text-amber-600",
    text: "斜面に近い地域では、雨が弱まった後も土砂災害に警戒してください。",
  },
  {
    title: "地震",
    icon: AlertTriangle,
    color: "text-rose-600",
    text: "家具の転倒防止、家族との連絡方法、避難先を平時から確認しておきましょう。",
  },
]

const referenceImageUrl =
  "https://raw.githubusercontent.com/arinofumiya-python/miyazaki-bousai-images/main/bousai%20picture.jpg"

export default function DisasterInfoPage() {
  return (
    <>
      <PageHeader
        eyebrow="HAZARD INFORMATION"
        title="災害情報"
        description="宮東地区で想定される災害と、日頃からできる備えを確認しましょう。"
      />

      <section className="mx-auto grid max-w-3xl gap-4 px-4 pb-8 sm:grid-cols-2">
        {hazards.map(({ title, icon: Icon, color, text }) => (
          <article
            key={title}
            className="rounded-lg border border-border bg-card p-6"
          >
            <Icon className={`size-8 ${color}`} aria-hidden="true" />

            <h2 className="mt-4 text-xl font-bold">{title}</h2>

            <p className="mt-2 leading-7 text-muted-foreground">
              {text}
            </p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-12">
        <article className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-bold">参考情報</h2>

          <p className="mt-2">
            <a
              href={referenceImageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline underline-offset-4 hover:opacity-80"
            >
              bousai picture.jpg
            </a>
          </p>

          <div className="mt-6 border-t border-border pt-6">
            <h3 className="font-semibold">備考</h3>

            <p className="mt-2 leading-7 text-muted-foreground">
              このURLは宮崎東中学校の生徒が制作した
              <br className="hidden sm:block" />
              災害に備える心構えを示すものです
            </p>
          </div>
        </article>
      </section>
    </>
  )
}