import { Info } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function AboutPage() {
  return <><PageHeader eyebrow="ABOUT THIS PROJECT" title="このサイトについて" description="宮東地区の防災情報を、平時から確認しやすい形でまとめています。" /><section className="mx-auto max-w-3xl px-4 pb-12"><article className="rounded-lg border border-border bg-card p-6"><Info className="size-8 text-primary" aria-hidden="true" /><h2 className="mt-4 text-xl font-bold">目的</h2><p className="mt-3 leading-7 text-muted-foreground">避難所、ハザード情報、緊急連絡先、備蓄品を一つの場所で確認できるようにするための防災情報サイトです。災害が起きる前に、家族で避難先と連絡方法を確認しておきましょう。</p><h2 className="mt-8 text-xl font-bold">出典</h2><ul className="mt-3 grid gap-2 leading-7 text-muted-foreground sm:grid-cols-2">{["OpenStreetMap", "国土地理院", "ChatGPT", "v0", "Vercel", "Google Maps"].map((source) => <li key={source} className="rounded-md border border-border/70 bg-background px-3 py-2">{source}</li>)}</ul></article></section></>
}
