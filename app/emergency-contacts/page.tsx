import { Phone } from "lucide-react"
import { PageHeader } from "@/components/page-header"

const contacts = [
  ["警察", "110", "事件・事故"], ["消防・救急", "119", "火災・救急・救助"], ["海上保安庁", "118", "海の事故・事件"], ["災害用伝言ダイヤル", "171", "安否情報の録音・再生"],
]

export default function EmergencyContactsPage() {
  return <><PageHeader eyebrow="EMERGENCY CONTACTS" title="緊急連絡先" description="緊急時にすぐ連絡できるよう、家族と一緒に確認しておきましょう。" /><section className="mx-auto grid max-w-6xl gap-4 px-4 pb-12 sm:grid-cols-2">{contacts.map(([name, number, note]) => <a key={number} href={`tel:${number}`} className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary"><div className="flex items-center gap-3"><Phone className="size-5 text-primary" aria-hidden="true" /><h2 className="font-bold">{name}</h2></div><p className="mt-4 text-4xl font-bold tracking-wide text-primary">{number}</p><p className="mt-2 text-sm text-muted-foreground">{note}</p></a>)}</section></>
}
