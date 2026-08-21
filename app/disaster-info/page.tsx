import { AlertTriangle, Droplets, Mountain, Waves } from "lucide-react"
import { PageHeader } from "@/components/page-header"

const hazards = [
  { title: "洪水・浸水", icon: Droplets, color: "text-blue-600", text: "大雨や河川の増水に備え、浸水想定区域と避難経路を事前に確認しましょう。" },
  { title: "津波", icon: Waves, color: "text-cyan-600", text: "強い揺れや長い揺れを感じたら、情報を待たずに高い場所へ避難してください。" },
  { title: "土砂災害", icon: Mountain, color: "text-amber-600", text: "斜面に近い地域では、雨が弱まった後も土砂災害に警戒してください。" },
  { title: "地震", icon: AlertTriangle, color: "text-rose-600", text: "家具の転倒防止、家族との連絡方法、避難先を平時から確認しておきましょう。" },
]

export default function DisasterInfoPage() {
  return <><PageHeader eyebrow="HAZARD INFORMATION" title="災害情報" description="宮東地区で想定される災害と、日頃からできる備えを確認しましょう。" /><section className="mx-auto grid max-w-6xl gap-4 px-4 pb-12 sm:grid-cols-2">{hazards.map(({ title, icon: Icon, color, text }) => <article key={title} className="rounded-lg border border-border bg-card p-6"><Icon className={`size-8 ${color}`} aria-hidden="true" /><h2 className="mt-4 text-xl font-bold">{title}</h2><p className="mt-2 leading-7 text-muted-foreground">{text}</p></article>)}</section></>
}
